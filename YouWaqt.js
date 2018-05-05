// ==UserScript==
// @name         YouWaqt
// @version      2.6
// @description  Displays the time remaining on a YouTube video, also estimates it for your convenience.
// @author       Yameromn
// @match        http*://www.youtube.com/watch?v=*
// @grant        none

// ==/UserScript==
let approx;
var controlbar = document.querySelector(".ytp-chrome-controls");
var leftcontrol = document.querySelector(".ytp-left-controls");
var rightcontrol = document.querySelector(".ytp-right-controls");

rightcontrol.insertAdjacentHTML("beforeBegin", "<span class='ytp-time-remaining'></span>");

var remainingSpan = document.querySelector(".ytp-time-remaining");
var total = document.querySelector(".ytp-time-duration").innerHTML.split(":");
var currentSpan = document.querySelector(".ytp-time-current")

var observer = new MutationObserver(
	function(){
		var current = currentSpan.innerHTML.split(":");

		var secs = parseInt(total[1]) - parseInt(current[1]);
		var mins = parseInt(total[0]) - parseInt(current[0]);

		if (secs<0){
			secs += 60;
			mins -= 1;
		}
        
        if (secs < 20) approx = mins;
        else if (secs > 40) approx = mins + 1;
        else approx = mins + 0.5;
		
		if (mins < 10) mins = "0" + mins;
		if (secs < 10) secs = "0" + secs;

		remainingSpan.innerHTML = "-" + mins + ":" + secs + "    ≈ -" + approx + " mins";
	}
);

observer.observe(currentSpan, {childList: true})