
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskTimers = {};

function createTimer(taskId){
    let [seconds, minutes, hours] = [0, 0, 0];
    let timer = null;

    // let displayTime = document.getElementById("displayTime");
    function stopwatch(timeDisplay) {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
        let h = hours<10 ? "0" + hours : hours;
        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        timeDisplay.textContent = h + ":" + m + ":" + s;
    }

    function watchStart(timeDisplay) {
        if (timer != null) {
            clearInterval(timer);
        }
        timer = setInterval(function() {
            stopwatch(timeDisplay)}
            , 1000); // Corrected the capitalization here
    }

    function watchStop() {
        clearInterval(timer);
    }

    function watchReset(timeDisplay) {
        [seconds, minutes, hours] = [0, 0, 0];
        timeDisplay.textContent = "00:00:00";
        clearInterval(timer);
    }
    taskTimers[taskId] = {
        start: watchStart,
        stop: watchStop,
        reset:watchReset,
    };
}


function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let taskId = Date.now().toString();// generate an Id for the task
    let li = document.createElement("li");
    li.innerHTML = inputBox.value; //text added in the inout field will go into the li
    listContainer.appendChild(li); // li will be displayed under list-container

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; //add cross icon

    const timeDisplay = document.createElement("h1");
    timeDisplay.id = "displayTime";
    timeDisplay.textContent = "00:00:00";

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start";
    startBtn.onclick = () => taskTimers[taskId].start(timeDisplay);
    // startBtn.addEventListener("click", ()=> {
    //     watchStart();
    // })

    const stopBtn = document.createElement("button");
    stopBtn.textContent = "Stop";
    stopBtn.onclick = () => taskTimers[taskId].stop(timeDisplay);


    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    resetBtn.onclick = () => taskTimers[taskId].reset(timeDisplay);

    li.appendChild(timeDisplay);
    li.appendChild(startBtn);
    li.appendChild(stopBtn);
    li.appendChild(resetBtn);
    li.appendChild(span);

    createTimer(taskId);
  }
  //clear input field after add
  inputBox.value = "";
  saveData();
}



listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      //check if we clicked on li
      e.target.classList.toggle("checked"); // add checked classname if it is there or remove it if it is already there: toggle
      saveData();
    } else if (e.target.tagName === "SPAN") {
      //if clicked on span, delete.
      e.target.parentElement.remove(); //delete parentElement(li element)
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();


