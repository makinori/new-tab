import axios from "axios";
import { writeFile, mkdir } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const imgurLink = "https://imgur.com/a/SF3Fc";
const saveDir = resolve(__dirname, "images/lain");

await mkdir(saveDir, { recursive: true });

const res = await axios(imgurLink, {
	responseType: "text",
});

const postDataJson = res.data.match(
	/<script>window\.postDataJSON=("(?:[^]+)")<\/script>/i,
)[1];

const data = JSON.parse(eval(postDataJson));

for (const media of data.media) {
	const imgRes = await axios(media.url, { responseType: "arraybuffer" });
	await writeFile(resolve(saveDir, media.id) + "." + media.ext, imgRes.data);
}

const filenames = data.media.map(media => media.id + "." + media.ext);

await writeFile(
	resolve(saveDir, "images.js"),
	"window.images = " + JSON.stringify(filenames),
);
