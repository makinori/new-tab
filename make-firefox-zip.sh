#!/bin/bash

mv manifest.json manifest-chromium.json
mv manifest-firefox.json manifest.json

zip -r -FS ./new-tab.zip * \
	--exclude '*.git*' --exclude '*.*' \
	--exclude 'manifest-chromium.json' \
	--exclude '*.zip' --exclude '*.lock' \
	--exclude '*node_modules*'

mv manifest.json manifest-firefox.json
mv manifest-chromium.json manifest.json