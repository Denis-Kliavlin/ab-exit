' build-docs.vbs — скрытая сборка MkDocs без всплывающего консольного окна.
' Папка проекта = папка этого скрипта (работает в любом клоне ab-exit).
' Запуск (предпочтительный способ для Claude Code и руками):
'   wscript "<...>\build-docs.vbs"            (strict, по умолчанию)
'   wscript "<...>\build-docs.vbs" plain      (без --strict)
'   wscript "<...>\build-docs.vbs" serve       (mkdocs serve, скрыто, в фоне)
' Лог: build.log / serve.log в папке проекта. Код возврата mkdocs -> exit code.
' WScript.Shell.Run(cmd, 0, True): 0 = окно скрыто, True = ждать завершения.
Option Explicit
Dim sh, fso, proj, mode, cmd, rc
Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
proj = fso.GetParentFolderName(WScript.ScriptFullName)
sh.CurrentDirectory = proj

mode = "strict"
If WScript.Arguments.Count > 0 Then mode = LCase(WScript.Arguments(0))

Select Case mode
  Case "plain"
    cmd = "cmd /c python -m mkdocs build > ""build.log"" 2>&1"
  Case "serve"
    sh.Run "cmd /c python -m mkdocs serve > ""serve.log"" 2>&1", 0, False
    WScript.Quit 0
  Case Else
    cmd = "cmd /c python -m mkdocs build --strict > ""build.log"" 2>&1"
End Select

rc = sh.Run(cmd, 0, True)
WScript.Quit rc
