default:
	@just --list

[group("util")]
generate-icons image:
	#!/usr/bin/env bash
	set -euxo pipefail

	WIDTH=$(magick identify -ping -format "%w" "{{image}}")
	HALF_WIDTH=$(($WIDTH/2))

	magick "{{image}}" \
	-gravity Center \
	\( -size ${WIDTH}x${WIDTH} xc:Black -fill White \
		-draw "circle $HALF_WIDTH $HALF_WIDTH $HALF_WIDTH 1" -alpha Copy \
	\) -compose CopyOpacity -composite \
	-trim icon.png

	for size in 16 48 128; do
		magick icon.png -resize ${size}x${size} -filter Lanczos2 \
		icon${size}.png
	done

	rm -f icon.png

[group("firefox")]
build-firefox:
	mv manifest-firefox.json manifest.json

	zip -r -FS ./new-tab.zip * \
	--exclude '*.lock' --exclude '*.zip' --exclude '*.sh' --exclude '*.ts' \
	--exclude '*.git*' --exclude 'manifest-chromium.json' --exclude 'Justfile' \
	--exclude '*node_modules*' --exclude 'unused/*'

	mv new-tab.zip new-tab.xpi

	mv manifest.json manifest-firefox.json

	7z l new-tab.xpi

[group("firefox")]
install-firefox:
	firefox-developer-edition new-tab.xpi

