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
