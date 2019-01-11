#!/bin/bash

REV=`git rev-parse --short HEAD`
mv advanced-worldmap advanced-worldmap-panel-$REV
zip -r advanced-worldmap-panel-$REV advanced-worldmap-panel-$REV
