#!/usr/bin/env python3
"""Validate integrity of docs/ sections.

Checks:
1. All 57 expected sections are present
2. Markdown is not broken (escaped headers, bold, etc.)
3. Each section starts with a heading
"""

import re
import sys
from pathlib import Path

DOCS = Path(__file__).parent.parent / 'docs'
EXPECTED_SECTIONS = set(range(1, 58))  # 1-57


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

    for chapter_dir in sorted(DOCS.iterdir()):
        if not chapter_dir.is_dir():
            continue

        for md_file in sorted(chapter_dir.glob('[0-9]*.md')):
            # Extract section number from filename: NNN-name.md
            match = re.match(r'^(\d{3})-', md_file.name)
            if not match:
                continue
            section_num = int(match.group(1))
            found_sections.add(section_num)

            # Check markdown
            content = md_file.read_text(encoding='utf-8')
            broken = check_markdown_broken(content)
            if broken:
                for b in broken:
                    errors.append(f"{md_file.relative_to(DOCS)}: {b}")

            # Check starts with heading
            stripped = content.lstrip()
            if not stripped.startswith('#'):
                errors.append(f"{md_file.relative_to(DOCS)}: does not start with heading")

    # Coverage check
    missing = EXPECTED_SECTIONS - found_sections
    extra = found_sections - EXPECTED_SECTIONS
    if missing:
        for m in sorted(missing):
            errors.append(f"Missing section: {m}")
    if extra:
        for e in sorted(extra):
            errors.append(f"Extra section: {e}")

    if errors:
        print("VALIDATION ERRORS:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)

    print(f"OK: {len(found_sections)} sections found, markdown clean")


if __name__ == '__main__':
    main()
