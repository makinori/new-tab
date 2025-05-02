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
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
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

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

let lastTimeStr = "";

function updateTimeDate() {
	const time = new Date();
	const timeHTML =
		String(time.getHours()).padStart(2, "0") +
		"<span>:</span>" +
		String(time.getMinutes()).padStart(2, "0");

	if (lastTimeStr != timeHTML) {
		lastTimeStr = timeHTML;
		timeEl.innerHTML = timeHTML;
		updateBg();
	}

	dateEl.textContent = `${weekdays[date.getDay()]} ${
		months[date.getMonth()]
	} ${stNdRdTh(date.getDate())}`;
}

updateTimeDate();
setInterval(updateTimeDate, 100);
