#!/bin/bash

mv manifest.json manifest-chromium.json
mv manifest-firefox.json manifest.json

zip -r -FS ./new-tab.zip * \
	--exclude '*.lock' --exclude '*.zip' --exclude '*.sh' --exclude '*.ts' \
	--exclude '*.git*' --exclude 'manifest-chromium.json' \
	--exclude '*node_modules*' --exclude 'unused/*'

mv manifest.json manifest-firefox.json
mv manifest-chromium.json manifest.json