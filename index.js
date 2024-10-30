"use strict";

const box = document.querySelector(".box");
const jumpShadow = document.querySelector(".jump-shadow");
const redBox = document.querySelector(".box-container");
const title = document.querySelector(".title")

if(window.matchMedia("(pointer: coarse)").matches) {
    title.innerHTML = `
        <span class="nowrap">Swipe / tap</span>
        <span class="nowrap">(inside the red box)</span>
        to move the blue box
    `
} else {
    title.innerHTML = `
        Press
        <span class="nowrap">(&uparrow; / &downarrow; / &leftarrow; / &rightarrow; / &UnderBracket;)</span>
        <span class="nowrap">inside the red box</span>
        to move the blue box
    `
}

redBox.addEventListener("mouseenter", () => {
    document.body.classList.add("no-scroll");
});

redBox.addEventListener("mouseleave", () => {
    document.body.classList.remove("no-scroll");
});

redBox.addEventListener("touchstart", () => {
    document.body.classList.add("no-scroll");
});

redBox.addEventListener("touchend", () => {
    document.body.classList.remove("no-scroll");
});

let axisY = 0,
    axisX = 0,
    movingLength = 15;

window.onkeyup = (e) => {
    if (e.code == "ArrowUp") {
        if (axisY > 0) {
            axisY -= movingLength;
            box.style.top = axisY + "%";
            animateBox(box, jumpShadow);
        }
    } else if (e.code == "ArrowRight") {
        if (axisX < 90) {
            axisX += movingLength;
            box.style.left = axisX + "%";
            animateBox(box, jumpShadow);
        }
    } else if (e.code == "ArrowDown") {
        if (axisY < 90) {
            axisY += movingLength;
            box.style.top = axisY + "%";
            animateBox(box, jumpShadow);
        }
    } else if (e.code == "ArrowLeft") {
        if (axisX > 0) {
            axisX -= movingLength;
            box.style.left = axisX + "%";
            animateBox(box, jumpShadow);
        }
    } else if (e.code == "Space") {
        animateBox(box, jumpShadow);
    }
};

function animateBox(htmlElem, htmlElemTwo) {
    htmlElem.className += " moveFade";
    htmlElemTwo.className += " jumpShadow";
    htmlElem.addEventListener("animationend", () => {
        htmlElem.classList.remove("moveFade");
    });
    htmlElemTwo.addEventListener("animationend", () => {
        htmlElemTwo.classList.remove("jumpShadow");
    });
}

let pageWidth = window.innerWidth || document.body.clientWidth;
let treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
const gestureZone = document.querySelector(".box-container");

gestureZone.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
}, false);

function handleGesture() {
    let x = touchendX - touchstartX;
    let y = touchendY - touchstartY;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (yx <= limit) {
            if (x < 0) {
                if (axisX > 0) {
                    axisX -= movingLength;
                    box.style.left = axisX + "%";
                    animateBox(box, jumpShadow);
                }
            } else {
                if (axisX < 90) {
                    axisX += movingLength;
                    box.style.left = axisX + "%";
                    animateBox(box, jumpShadow);
                }
            }
        }
        if (xy <= limit) {
            if (y < 0) {
                if (axisY > 0) {
                    axisY -= movingLength;
                    box.style.top = axisY + "%";
                    animateBox(box, jumpShadow);
                }
            } else {
                if (axisY < 90) {
                    axisY += movingLength;
                    box.style.top = axisY + "%";
                    animateBox(box, jumpShadow);
                }
            }
        }
    } else {
        animateBox(box, jumpShadow);
    }
}