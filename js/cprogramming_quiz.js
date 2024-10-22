const questions = [
    {
        question: 'Which of the following is a valid data type in C?',
        answers: [
            { text: "integer", correct: false },
            { text: "float", correct: false },
            { text: "character", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: 'How do you write a single-line comment in C?',
        answers: [
            { text: "// This is a comment", correct: true },
            { text: "/* This is a comment */", correct: false },
            { text: "# This is a comment", correct: false },
            { text: "-- This is a comment", correct: false }
        ]
    },
    {
        question: 'Which operator is used to assign a value to a variable in C?',
        answers: [
            { text: "=", correct: true },
            { text: "==" , correct: false },
            { text: ":=", correct: false },
            { text: "=>", correct: false }
        ]
    },        
    {
        question: 'Which of the following is used to create a loop in C?',
        answers: [
            { text: "if statement", correct: false },
            { text: "switch statement", correct: false },
            { text: "for loop", correct: true },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: 'What keyword is used to define a function in C?',
        answers: [
            { text: "func", correct: false },
            { text: "define", correct: false },
            { text: "void", correct: true },
            { text: "function", correct: false }
        ]
   },
   {
    question: 'What will be the output of the following C code?<br><pre>#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}</pre>',
    answers: [
        { text: "Hello, World!", correct: true },
        { text: "Hello World!", correct: false },
        { text: "Syntax Error", correct: false },
        { text: "None of these", correct: false },
    ]
   },  
   {
    question: 'What is the correct way to declare an integer variable in c',
    answers: [
        { text: "num int;", correct: false },
        { text: "int num;", correct: true },
        { text: "int = num;", correct: false },
        { text: "declare num as int;", correct: false },
    ]
   },
   {
    question: 'What will be the output of the following C code?<br><pre>for (int i = 1; i <= 5; i++) {\n    printf("%d ", i);\n}</pre>',
    answers: [
        { text: "1 2 3 4 5", correct: true },
        { text: "1 2 3 4 5 6", correct: false },
        { text: "5 4 3 2 1", correct: false },
        { text: "No output", correct: false },
    ]
   },
   {
    question: 'What will be the output of the following C code?<br><pre>int arr[] = {1, 2, 3, 4};\nprintf("%d", arr[2]);</pre>',
    answers: [
        { text: "3", correct: true },
        { text: "2", correct: false },
        { text: "4", correct: false },
        { text: "1", correct: false },
    ]
   },          
   {
    question: 'What will be the output of the following C code?<br><pre>#include <stdio.h>\n\nint main() {\n    int num1 = 5;\n    int num2 = 10;\n    int result = num1 + num2;\n    printf("%d", result);\n    return 0;\n}</pre>',
    answers: [
        { text: "15", correct: true },
        { text: "5", correct: false },
        { text: "10", correct: false },
        { text: "Syntax Error", correct: false },
    ]
}, 
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

function selectAnswer(e){
const selectedBtn = e.target;
const isCorrect = selectedBtn.dataset.correct === "true";
if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
}else{
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
});
nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>`;
  let perc = score*10;
  if(score>=8){
    questionElement.innerHTML +=` Congratulations. <br>Score = ${perc}%`;
  }
  else if(score>=5){
    questionElement.innerHTML += `Good Work. <br>Score = ${perc}%`;
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