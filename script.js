window.onload
let startbtn = document.querySelector("#start-btn")
let questionCard = document.querySelector("#question-card")
let cardbody = document.getElementById("cardbody")
let cardQuestion = document.getElementById("card-question")
let optionslist = document.getElementById("options-list")
let nextBtn = document.getElementById("nextbtn")
let questionCountBadge = document.getElementById("questionCountBadge")
let finishBtn = document.getElementById("finishbtn")
let finishCard = document.getElementById("finish-card")
let finishCardText = document.getElementById("score")
let startAgain = document.getElementById("start-again")
let listanswers = document.getElementsByClassName("list-group-item")


startAgain.addEventListener("click", function(){
    correctQuestion = 0;
    optionslist.innerHTML = ""
    cardQuestion.innerHTML =""
    questionCount = 0
    finishCard.classList.remove("active")
    startAgain.classList.remove("active")
    finishBtn.classList.remove("active")
    startbtn.click();
    
})

let correctQuestion = 0;
startbtn.addEventListener('click', function(){
    questionCard.classList.add("active")
    questionCountBadge.innerText = `${questionCount+1}/${questions.length}`
    startTimer(15);
    printQuestion(questions[0])
})
nextBtn.addEventListener("click",function(){      
    timerLine.style.width = `0px`;   
    nextQuestion()
})
finishBtn.addEventListener("click", function(){
    finishCard.classList.add("active")
    questionCard.classList.remove("active")
    finishCardText.innerText = `You have ${correctQuestion} correct answers and ${questions.length-correctQuestion} wrong answers.`;
})


function Question(soruMetni, cevapSecenekleri, dogruCevap) {
    this.questionText = soruMetni;
    this.options = cevapSecenekleri;
    this.correctAnswer = dogruCevap;
    
}

let questions = [
    new Question("1-Question", { a: "Node.js", b: "Typescript", c: "Npm" , d: "Nuget" }, "c"),
    new Question("2-Question ", { a: "css", b: "html", c: "javascipt", d: "sql" }, "d"),
    new Question("3-Question ", { a: "node.js", b: "typescript", c: "angular", d: "react" }, "a"),
    new Question("4-Question", { a: "react", b: "angular", c: "vuejs", d: "asp.net" }, "d")
];

function printQuestion(question){
    
    cardQuestion.innerText= question.questionText;
    
    for (var key in question.options) {
        
        optionslist.insertAdjacentHTML("beforeend", `<li class="list-group-item border border-dark rounded"><b>${key}</b>:${question.options[key]}</li>`)
    }
    
    
    for (var i = 0; i < listanswers.length; i++) {

        listanswers[i].addEventListener('click', function(){
            clearInterval(counter)
            let correctanswer = `${question.correctAnswer}:${question.options[question.correctAnswer]}`;
            let useranswer = this.innerText;
            
            if(answerCheck(useranswer,correctanswer)){
                this.classList.add("correct")
                correctQuestion++
                if (questionCount != questions.length-1){
                    nextBtn.classList.add("active")
                } else{
                    finishBtn.classList.add("active")
                }
                
            }else{
                this.classList.add("wrong")
                
                if (questionCount!= questions.length-1){
                    nextBtn.classList.add("active")
                } else{
                    finishBtn.classList.add("active")
                }
            }
            for (var i = 0; i < listanswers.length; i++){
                listanswers[i].classList.add("disable");
            }
            
        });
    }
}

function answerCheck(answer,rightanswer){
    if (answer == rightanswer){
        return true;

    }else{
        return false;
    }

}
let questionCount = 0
function nextQuestion(){
    clearInterval(counter)
    questionCount++
    startTimer(15);
    questionCountBadge.innerText = `${questionCount+1}/${questions.length}`
    optionslist.innerHTML = ""
    cardQuestion.innerHTML =""
    nextBtn.classList.remove("active")
    printQuestion(questions[questionCount]);

}



let timerBadge= document.getElementById("timer")
let timerLine =document.getElementById("timer-line")
let counter;
let width =0;
function startTimer(time) {
    width =0;
    timerBadge.innerHTML= time;
    counter = setInterval(timer, 1000);

    function timer() {
        time--;
        timerBadge.innerHTML= time;
        
        width = width+37;
        timerLine.style.width = `${width}px`;
        if (time == 0){1
            clearInterval(counter)
            if (questionCount != questions.length-1){
                nextBtn.classList.add("active")
            } else{
                finishBtn.classList.add("active")
            }
            let correctanswer = questions[questionCount].correctAnswer
            
            for (let a=0; a<=listanswers.length; a++) {                
                console.log(listanswers[a].innerText)
                console.log(`${correctanswer}:${questions[questionCount].options[correctanswer]}`)
                if(listanswers[a].innerText == `${correctanswer}:${questions[questionCount].options[correctanswer]}`){
                    listanswers[a].classList.add("correct")
                    for (var i = 0; i < listanswers.length; i++){
                        listanswers[i].classList.add("disable");
                    }
                    return;
                }
            }

        }
    }
}

