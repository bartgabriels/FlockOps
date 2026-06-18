$p = Join-Path $PSScriptRoot '..\styles.css'
$c = [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8)
$o = [regex]::Replace($c, '(\r?\n[ \t]*){3,}', "`r`n`r`n")
[IO.File]::WriteAllText($p, $o, [Text.Encoding]::UTF8)
Write-Output "Lines: $(($o -split '\n').Count)"
