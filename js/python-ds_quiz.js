const questions = [
    {
        question: "Which of the following is the correct way to define a list in Python?",
        answers: [
            { text: "list = ()", correct: false},
            { text: "list = []", correct: true},
            { text: "list = {}", correct: false},
            { text: "list = < >", correct: false},
        ]
    },
    {
        question: "How do you access the first element of a list in Python?",
        answers: [
            { text: "list[0]", correct: true},
            { text: "list(1)", correct: false},
            { text: "list.first()", correct: false},
            { text: "list[1]", correct: false},
        ]
    },
    {
        question: "Which of the following is used to add an element to the end of a list?",
        answers: [
            { text: "list.add()", correct: false},
            { text: "list.append()", correct: true},
            { text: "list.insert()", correct: false},
            { text: "list.push()", correct: false},
        ]
    },
    {
        question: "What will be the output of the following code: x = [1, 2, 3]; print(x[1:3])?",
        answers: [
            { text: "[1, 2]", correct: false},
            { text: "[2, 3]", correct: true},
            { text: "[1, 3]", correct: false},
            { text: "[1, 2, 3]", correct: false},
        ]
    },
    {
        question: "Which of the following data structures in Python is unordered and does not allow duplicate values?",
        answers: [
            { text: "List", correct: false},
            { text: "Set", correct: true},
            { text: "Tuple", correct: false},
            { text: "Dictionary", correct: false},
        ]
    },
    {
        question: "How do you create a dictionary in Python?",
        answers: [
            { text: "dict = []", correct: false},
            { text: "dict = {}", correct: true},
            { text: "dict = ()", correct: false},
            { text: "dict = <", correct: false},
        ]
    },
    {
        question: "Which method is used to add an element to the beginning of a list in Python?",
        answers: [
            { text: "list.append()", correct: false},
            { text: "list.insert(0, element)", correct: true},
            { text: "list.push()", correct: false},
            { text: "list.add()", correct: false},
        ]
    },    
    {
        question: "What is the output of the following code: x = {'a': 1, 'b': 2}; print(x['a'])?",
        answers: [
            { text: "1", correct: true},
            { text: "a", correct: false},
            { text: "{'a': 1}", correct: false},
            { text: "KeyError", correct: false},
        ]
    },
    {
        question: "What will be the output of the following code: x = [10, 20, 30]; print(len(x))?",
        answers: [
            { text: "3", correct: true},
            { text: "30", correct: false},
            { text: "None", correct: false},
            { text: "Error", correct: false},
        ]
    },
    {
        question: "Which of the following statements is true about tuples in Python?",
        answers: [
            { text: "Tuples are mutable", correct: false},
            { text: "Tuples are unordered", correct: false},
            { text: "Tuples allow duplicate elements", correct: true},
            { text: "Tuples cannot contain mixed data types", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function  resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function showScore()
{
      resetState();
      questionElement.innerHTML =` You scored ${score} out of ${questions.length}!<br>`;
      let perc = score*10;
      if(score>=8){
        questionElement.innerHTML += `Congratulations. <br>Score = ${perc}%`;
      }
      else if(score>=5){
        questionElement.innerHTML +=` Good Work. <br>Score = ${perc}%`;
      }
      else{
        questionElement.innerHTML +=` <br>You can do better. <br> Score = ${perc}% <br>Try Again`;
      }
      nextButton.innerHTML = "Attempt Again";
      nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();