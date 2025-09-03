const timezones = [
	["SFO", "America/Los_Angeles"],
	["CLE", "America/New_York"],
	["TFS", "Atlantic/Canary"],
];

// const imagesUrl = "images/lain/";

// const randomImageUrl =
// 	imagesUrl +
// 	window.images[Math.floor(Math.random() * window.images.length)];

// document.getElementById(
// 	"bg",
// ).style.backgroundImage = `url(${randomImageUrl})`;

function updateBg() {
	const bgEl = document.getElementById("bg");
	const meshGradient = generateJSXMeshGradient(64);
	bgEl.style.backgroundColor = meshGradient.backgroundColor;
	bgEl.style.backgroundImage = meshGradient.backgroundImage;
	// can fix banding by rendering to canvas and do
	/*
		// https://github.com/godotengine/godot/blob/master/servers/rendering/renderer_rd/shaders/effects/tonemap.glsl
		// From https://alex.vlachos.com/graphics/Alex_Vlachos_Advanced_VR_Rendering_GDC2015.pdf
		// and https://www.shadertoy.com/view/MslGR8 (5th one starting from the bottom)
		// NOTE: `frag_coord` is in pixels (i.e. not normalized UV).
		vec3 screenSpaceDither(vec2 frag_coord, float bit_alignment_diviser) {
			// Iestyn's RGB dither (7 asm instructions) from Portal 2 X360, slightly modified for VR.
			vec3 dither = vec3(dot(vec2(171.0, 231.0), frag_coord));
			dither.rgb = fract(dither.rgb / vec3(103.0, 71.0, 97.0));

			// Subtract 0.5 to avoid slightly brightening the whole viewport.
			return (dither.rgb - 0.5) / bit_alignment_diviser;
		}
	*/
}

const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const months = [
	"jan",
	"feb",
	"mar",
	"apr",
	"may",
	"jun",
	"jul",
	"aug",
	"sep",
	"oct",
	"nov",
	"dec",
];

const stNdRdTh = n => {
	n = n % 10;
	if (n == 1) return n + "st";
	if (n == 2) return n + "nd";
	if (n == 3) return n + "rd";
	return n + "th";
};

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const timezonesEl = document.getElementById("timezones");

let lastTimeStr = "";

const timeString = (date, connector) =>
	String(date.getHours()).padStart(2, "0") +
	connector +
	String(date.getMinutes()).padStart(2, "0");

const getTZ = tz =>
	new Date(new Date().toLocaleString(undefined, { timeZone: tz }));

function updateTimeDate() {
	const now = new Date();

	const timeHTML = timeString(now, "<span>:</span>");
	if (lastTimeStr == timeHTML) {
		return;
	}

	lastTimeStr = timeHTML;
	timeEl.innerHTML = timeHTML;
	updateBg();

	dateEl.textContent = [
		weekdays[now.getDay()],
		months[now.getMonth()],
		// stNdRdTh(now.getDate()),
		now.getDate(),
	].join(" ");

	let timezonesHTML = [];

	for (const [name, tz] of timezones) {
		let time = getTZ(tz);

		if (Math.abs(now - time) < 1000 * 10) {
			// within 10 seconds of now
			continue;
		}

		timezonesHTML.push(name + " " + timeString(time, ":"));
	}

	timezonesEl.innerHTML = timezonesHTML.join("</br>");
}

updateTimeDate();
setInterval(updateTimeDate, 100);
