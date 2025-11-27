' VBScript wrapper to run sync_all_claude_md.py hidden (no window)
' This prevents the CMD/Python window from flashing when Claude MD sync runs

Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c python ""D:\1337\.claude\hooks\sync_all_claude_md.py""", 0, True
Set WshShell = Nothing
