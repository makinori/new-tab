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

const date = new Date();

const weekdays = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];

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

document.getElementById("date").textContent = `${weekdays[date.getDay() - 1]} ${
	months[date.getMonth()]
} ${stNdRdTh(date.getDate())}`;

const timeEl = document.getElementById("time");

let lastTimeStr = "";

function updateTime() {
	const time = new Date();
	const timeStr =
		String(time.getHours()).padStart(2, "0") +
		":" +
		String(time.getMinutes()).padStart(2, "0");

	if (lastTimeStr != timeStr) {
		lastTimeStr = timeStr;
		timeEl.textContent = timeStr;
		updateBg();
	}
}

updateTime();
setInterval(updateTime, 100);
