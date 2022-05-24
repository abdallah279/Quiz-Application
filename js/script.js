//selecting all required elements//selecting all required elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const quitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const optionList = document.querySelector(".option_list");
const nextBtn = quizBox.querySelector(".next_btn");
const timerSec = quizBox.querySelector("header .timer_sec");
const timeLine = quizBox.querySelector("header .time_line");
const timeText = quizBox.querySelector("header .time_left_txt");
const resultBox = document.querySelector(".result_box");
const restartBtn = resultBox.querySelector(".restart");
const resultQuitBtn = resultBox.querySelector(".quit");

// if startQuiz button clicked
startBtn.addEventListener("click", ()=>{
    infoBox.classList.add("activeInfo");
});

// if exitQuiz button clicked
quitBtn.addEventListener("click", ()=>{
    infoBox.classList.remove("activeInfo");
});

// if continueQuiz button clicked
continueBtn.addEventListener("click", ()=>{
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    getQuestions(0);
    queCounter(1);
    startTimer(15);
    startLiner(0);
});

let queCount = 0;
let queNum = 1;
let counter;
let counterLine;
let timecount = 15;
let lineWidth = 0;
let userScore = 0;

// if restartQuiz button clicked
restartBtn.addEventListener("click", ()=>{
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    queCount = 0;
    queNum = 1;
    timecount = 15;
    lineWidth = 0;
    userScore = 0;
    getQuestions(queCount);
    queCounter(queNum);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timecount);
    startLiner(lineWidth);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
});

// if quitQuiz button clicked
resultQuitBtn.addEventListener("click", ()=>{
    window.location.reload();
});

// if Next Que button clicked
nextBtn.addEventListener("click", ()=>{
    if(queCount < questions.length - 1){
        queCount++;
        queNum++;
        getQuestions(queCount);
        queCounter(queNum);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timecount);
        startLiner(lineWidth);
        timeText.textContent = "Time Left";
        nextBtn.classList.remove("show");
    }else{
        resultBoxShow();
        clearInterval(counter);
        clearInterval(counterLine);
    }
});

// getting questions and options from array
function getQuestions(index){
    const queText = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let queTag = `<span>${questions[index].num}. ${questions[index].ques}</span>`;
    queText.innerHTML = queTag;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;
    optionList.innerHTML = optionTag;

    const options = optionList.querySelectorAll(".option");
    // set onclick attribute to all available options
    options.forEach(option => {
        option.setAttribute("onclick", "optionSelected(this)");
    });
}

// creating the new div tags which for icons
const tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
const crossIcon = `<div class="icon tick"><i class="fas fa-times"></i></div>`;

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[queCount].answer;
    //if user selected option is equal to array's correct answer
    if(userAnswer == correctAnswer){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend" ,tickIcon); //adding tick icon to correct selected option
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);  //adding cross icon to correct selected option
        for(let i=0; i < optionList.children.length; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].classList.add("correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);  //adding tick icon to matched option
            }
        }
    }
    for(let i=0; i < optionList.children.length; i++){
        optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    nextBtn.classList.add("show"); //show the next button if user selected any option
}

function resultBoxShow(){
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = document.querySelector(".score_text");
    if(userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = `<span>and congrats! You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = `<span>and nice! You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scored less than 1
        let scoreTag = `<span>and sorry! you got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer , 1000);
    function timer(){
        timerSec.textContent = time;  //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            timerSec.textContent = "0" + time;  //add a 0 before time value
        }
        if(time < 0){  //if timer is less than 0
            clearInterval(counter);
            timerSec.textContent = "00";
            timeText.textContent = "Time Off";
            let correctAnswer = questions[queCount].answer; //getting correct answer from array
            for(let i=0; i < optionList.children.length; i++){
                if(optionList.children[i].textContent == correctAnswer){
                    optionList.children[i].classList.add("correct");
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon); //adding tick icon to matched option
                }
            }
            for(let i=0; i < optionList.children.length; i++){
                optionList.children[i].classList.add("disabled");
            }
            nextBtn.classList.add("show");
        }
    }
}

function startLiner(line){
    counterLine = setInterval(liner , 28);
    function liner(){
        line++;
        timeLine.style.width = line + "px";  //increasing width of time_line with px by time value
        if(line > 549){ //if time value is greater than 549
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    const totalQue = document.querySelector('.total_que');
    let totalQueCounTag = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
    totalQue.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}