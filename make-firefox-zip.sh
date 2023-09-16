mv manifest.json manifest-vivaldi.json
mv manifest-firefox.json manifest.json
zip -r -FS ./new-tab.zip * --exclude '*.git*' --exclude 'manifest-vivaldi.json' --exclude '*node_modules*'
mv manifest.json manifest-firefox.json
mv manifest-vivaldi.json manifest.json