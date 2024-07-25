#!/usr/bin/env -S deno run -A

import sharp from "npm:sharp";
import { Buffer } from "node:buffer";

if (Deno.args.length == 0) {
	console.log("Provide image as argument");
	Deno.exit(1);
}

const image = sharp(await Deno.readFile(Deno.args[0]));

const rounded = (s: number) =>
	`<svg><rect x="0" y="0" width="${s}" height="${s}" rx="${s * 0.5}" ry="${
		s * 0.5
	}"/></svg>`;

for (const size of [16, 48, 128]) {
	await image
		.clone()
		.resize({
			width: size,
			height: size,
			kernel: "lanczos3",
		})
		.composite([
			{
				input: Buffer.from(rounded(size)),
				blend: "dest-in",
			},
		])
		.png()
		.toFile(`icon${size}.png`);
}
