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
	switch (n % 10) {
		case 1:
			return n + "st";
		case 2:
			return n + "nd";
		case 3:
			return n + "rd";
		default:
			return n + "th";
	}
};

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const timezonesEl = document.getElementById("timezones");

let lastTimeStr = "";

function timeString(date, connector) {
	return (
		String(date.getHours()).padStart(2, "0") +
		connector +
		String(date.getMinutes()).padStart(2, "0")
	);
}

function getTZ(tz) {
	return new Date(new Date().toLocaleString(undefined, { timeZone: tz }));
}

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

	timezonesEl.innerHTML = [
		"SFO " + timeString(getTZ("America/Los_Angeles"), ":"),
		"CLE " + timeString(getTZ("America/New_York"), ":"),
		"TFS " + timeString(getTZ("Atlantic/Canary"), ":"),
	].join("</br>");
}

updateTimeDate();
setInterval(updateTimeDate, 100);
