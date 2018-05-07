// ==UserScript==
// @name         YouWaqt
// @version      3.9
// @description  Displays the time remaining on a YouTube video, also estimates it for your convenience.
// @author       Yameromn
// @match        http*://www.youtube.com/watch?v=*
// @grant        none

// ==/UserScript==
let approx;
let controlbar = document.querySelector(".ytp-chrome-controls");
let leftcontrol = document.querySelector(".ytp-left-controls");
let rightcontrol = document.querySelector(".ytp-right-controls");

rightcontrol.insertAdjacentHTML("beforeBegin", "<span class='ytp-time-remaining'></span>");

let remainingSpan = document.querySelector(".ytp-time-remaining");
let totalSpan = document.querySelector(".ytp-time-duration");
let currentSpan = document.querySelector(".ytp-time-current")

let observer = new MutationObserver(
	function(){
        let extra = "";
		let current = currentSpan.innerHTML.split(":");
		let total = totalSpan.innerHTML.split(":");
		let lastIndexTotal = total.length-1;
		let lastIndexCurrent = current.length-1;

		let secs = parseInt(total[lastIndexTotal]) - parseInt(current[lastIndexCurrent]);
		let mins = parseInt(total[lastIndexTotal-1]) - parseInt(current[lastIndexCurrent-1]);
		let hrs = (parseInt(total[lastIndexTotal-2]) || 0) - (parseInt(current[lastIndexCurrent-2]) || 0);

		if (secs<0){
			secs += 60;
			mins -= 1;
		}
		if (mins<0){
			mins += 60;
			hrs -= 1;
		}

        if (secs < 20) approx = 60*hrs + mins;
        else if (secs > 40) approx = 60*hrs + mins + 1;
        else approx = 60*hrs + mins + 0.5;

        if (hrs) extra = hrs + ":";
        if (hrs < 10) hrs = "0" + hrs;
		if (mins < 10) mins = "0" + mins;
		if (secs < 10) secs = "0" + secs;

		remainingSpan.innerHTML = "-" + extra + mins + ":" + secs + " ≈ -" + approx + " mins";
	}
);

observer.observe(currentSpan, {childList: true})