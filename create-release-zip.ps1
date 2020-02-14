#$REV=git rev-parse --short HEAD
$version = (Get-Content package.json) -join "`n" | ConvertFrom-Json | Select -ExpandProperty "version"
Compress-Archive -Path advanced-worldmap\* -DestinationPath advanced-worldmap-panel-$version.zip