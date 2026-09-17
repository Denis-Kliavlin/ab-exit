#!/usr/bin/env python3
"""Validate integrity of docs/ sections.

Checks:
1. All expected base sections (1-59) are present
2. Markdown is not broken (escaped headers, bold, etc.)
3. Each section starts with a heading
4. No duplicate section id inside one chapter

Note on numbering: base numbers 1-59 are unique per chapter, not globally —
chapter 06 carries 033-040 (adversarial block) while chapter 07 carries its own
033-040, and chapter 08 carries 045-048 alongside chapter 09's 045-048. That
collision is deliberate (paths differ, H1s carry no numbers); see
SESSION_UPDATE_2026-08-12_batch15. Letter suffixes (011b, 036c, 048b) mark
sections appended next to an existing one and are validated but not required.
"""

import re
import sys
from pathlib import Path

DOCS = Path(__file__).parent.parent / 'docs'
EXPECTED_SECTIONS = set(range(1, 60))  # 1-59

# NNN-name.md or NNNx-name.md (x = letter suffix for an appended section)
SECTION_FILE = re.compile(r'^(\d{3})([a-z]?)-')

# Directories under docs/ that are not book chapters and carry no section numbers
NON_CHAPTER_DIRS = {'assets', 'qa', 'simulation'}


def check_markdown_broken(content):
    """Check for broken markdown escaping."""
    broken = []
    if re.search(r'\\#+\s', content):
        broken.append("Found `\\#` (escaped header)")
    if re.search(r'\\\*\\\*', content):
        broken.append("Found `\\*\\*` (escaped bold)")
    return broken


def main():
    errors = []
    found_sections = set()
    suffixed = 0

    for chapter_dir in sorted(DOCS.iterdir()):
        if not chapter_dir.is_dir() or chapter_dir.name in NON_CHAPTER_DIRS:
            continue

        seen_in_chapter = {}
        for md_file in sorted(chapter_dir.glob('[0-9]*.md')):
            if md_file.name.endswith('.en.md'):
                continue
            match = SECTION_FILE.match(md_file.name)
            if not match:
                errors.append(f"{md_file.relative_to(DOCS)}: unparsable section filename")
                continue

            section_num = int(match.group(1))
            suffix = match.group(2)
            key = f"{section_num:03d}{suffix}"

            if key in seen_in_chapter:
                errors.append(
                    f"{md_file.relative_to(DOCS)}: duplicate section {key} "
                    f"(already {seen_in_chapter[key]})"
                )
            seen_in_chapter[key] = md_file.name

            if suffix:
                suffixed += 1
            else:
                found_sections.add(section_num)

            content = md_file.read_text(encoding='utf-8')
            for b in check_markdown_broken(content):
                errors.append(f"{md_file.relative_to(DOCS)}: {b}")

            if not content.lstrip().startswith('#'):
                errors.append(f"{md_file.relative_to(DOCS)}: does not start with heading")

    missing = EXPECTED_SECTIONS - found_sections
    extra = found_sections - EXPECTED_SECTIONS
    for m in sorted(missing):
        errors.append(f"Missing section: {m}")
    for e in sorted(extra):
        errors.append(f"Extra section: {e}")

    if errors:
        print("VALIDATION ERRORS:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)

    print(f"OK: {len(found_sections)} base sections + {suffixed} suffixed, markdown clean")


if __name__ == '__main__':
    main()
