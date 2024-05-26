"use strict";

const box = document.querySelector(".box");
const jumpShadow = document.querySelector(".jump-shadow");
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