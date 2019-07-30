var clockInterval; // This'll be the timer for the clock
var mode = "stop"; // or sweep
var hour = 0;
var minute = 0;
var second = 0;

var hourHand = document.getElementById("hour");
var minuteHand = document.getElementById("minute");
var secondHand = document.getElementById("second");
var stopButton = document.getElementById("stop-button");
	stopButton.addEventListener("click", function () { selectMode("stop");});
var sweepButton = document.getElementById("sweep-button");
	sweepButton.addEventListener("click", function () { selectMode("sweep");});


function startClock () {
	selectMode(mode);
	tick(); // Call tick once, otherwise the display just hangs there for a second
}

function tick () {
	// Get the current time
	var time = new Date();

	hour = (time.getHours() % 12) + (time.getMinutes() / 60); 
	minute = time.getMinutes() + (time.getSeconds() / 60) + (time.getMilliseconds() / 60000);
	second = time.getSeconds() + (time.getMilliseconds() / 1000);

	updateDisplay();
}

function updateDisplay() {
	hourHand.setAttribute("style", "transform: rotate(" + rotateHour() + "deg);");
	minuteHand.setAttribute("style", "transform: rotate(" + rotateMinute() + "deg);");
	secondHand.setAttribute("style", "transform: rotate(" + rotateSecond() + "deg);");
}

function rotateHour() {
	return hour * 360 / 12;
}

function rotateMinute() {
	return minute * 360 / 60;
}

function rotateSecond() {
	return second * 360 / 60;
}

function selectMode(mode) {
	if (clockInterval != undefined) {
		clearInterval(clockInterval);
	}
	switch (mode) {
		case "stop": // ticking hands
			clockInterval = setInterval (tick, 1000);
			break;
		case "sweep": // sweeping hands
			clockInterval = setInterval (tick, 50);
			break;
	}

}

startClock();