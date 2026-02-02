const playbutton = document.getElementsByClassName("play")[0];
const resetbutton = document.getElementsByClassName("reset")[0];
const clearbutton = document.getElementsByClassName("lap-clear-button")[0];
const lapbutton = document.getElementsByClassName("lap")[0];

const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centisecond = document.getElementsByClassName("msec")[0];

const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isPlay = false;

let minInterval;
let secInterval;
let centiInterval;

let minCounter = 0;
let secCounter = 0;
let centiCounter = 0;

let lapCount = 0;

/* ---------------- BUTTON TOGGLE ---------------- */

const showButtons = () => {
    lapbutton.classList.remove("hidden");
    resetbutton.classList.remove("hidden");
};

/* ---------------- PLAY / PAUSE ---------------- */

const play = () => {
    if (!isPlay) {
        playbutton.innerText = "Pause";
        bg.classList.add("animation-bg");

        centiInterval = setInterval(() => {
            centiCounter++;
            if (centiCounter === 100) {
                centiCounter = 0;
                secCounter++;
            }

            if (secCounter === 60) {
                secCounter = 0;
                minCounter++;
            }

            minute.innerHTML = `${minCounter} :`;
            second.innerHTML = `&nbsp;${secCounter} :`;
            centisecond.innerHTML = `&nbsp;${centiCounter}`;
        }, 10);

        isPlay = true;
        showButtons();
    } else {
        pause();
    }
};

/* ---------------- PAUSE ---------------- */

const pause = () => {
    clearInterval(centiInterval);
    playbutton.innerText = "Play";
    bg.classList.remove("animation-bg");
    isPlay = false;
};

/* ---------------- RESET ---------------- */

const reset = () => {
    clearInterval(centiInterval);

    isPlay = false;

    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;

    minute.innerHTML = "0 :";
    second.innerHTML = "&nbsp;0 :";
    centisecond.innerHTML = "&nbsp;0";

    playbutton.innerText = "Play";
    bg.classList.remove("animation-bg");

    lapbutton.classList.add("hidden");
    resetbutton.classList.add("hidden");
};

/* ---------------- LAP ---------------- */

const lap = () => {
    lapCount++;

    const li = document.createElement("li");
    li.className = "lap-item";

    const number = document.createElement("span");
    number.className = "number";
    number.innerText = `#${lapCount}`;

    const timeStamp = document.createElement("span");
    timeStamp.className = "time-stamp";
    timeStamp.innerText = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearbutton.classList.remove("hidden");
};

/* ---------------- CLEAR ALL LAPS ---------------- */

const clearAll = () => {
    laps.innerHTML = "";
    laps.append(clearbutton);
    clearbutton.classList.add("hidden");
    lapCount = 0;
};

/* ---------------- EVENTS ---------------- */

playbutton.addEventListener("click", play);
resetbutton.addEventListener("click", reset);
lapbutton.addEventListener("click", lap);
clearbutton.addEventListener("click", clearAll);
