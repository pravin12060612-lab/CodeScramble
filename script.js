// ==========================================
// COMPUTER SCIENCE JUMBLED WORD GAME
// ==========================================


// 10 difficult Computer Science words

const questions = [

    {
        word: "cryptography",
        hint: "The science of protecting information by transforming it into a secure form."
    },

    {
        word: "virtualization",
        hint: "Technology that creates virtual versions of computers, servers, storage or operating systems."
    },

    {
        word: "authentication",
        hint: "The security process used to verify the identity of a user."
    },

    {
        word: "polymorphism",
        hint: "An OOP concept where one interface can represent many different forms."
    },

    {
        word: "encapsulation",
        hint: "An OOP concept that bundles data and methods together while restricting direct access."
    },

    {
        word: "concurrency",
        hint: "The ability of multiple tasks or processes to make progress during overlapping periods."
    },

    {
        word: "serialization",
        hint: "The process of converting an object or data structure into a format that can be stored or transmitted."
    },

    {
        word: "normalization",
        hint: "A database technique used to organize data and reduce redundancy."
    },

    {
        word: "asynchronous",
        hint: "A programming approach where operations can continue without waiting for another operation to finish."
    },

    {
        word: "microprocessor",
        hint: "A programmable integrated circuit that performs CPU-related operations."
    }

];


// ==========================================
// GAME VARIABLES
// ==========================================

let currentQuestionIndex = 0;

let score = 0;

let timeLeft = 20;

let timerInterval;

let questionAnswered = false;


// ==========================================
// HTML ELEMENTS
// ==========================================

const jumbledWord =
    document.getElementById("jumbledWord");

const hintText =
    document.getElementById("hintText");

const answerInput =
    document.getElementById("answerInput");

const timerDisplay =
    document.getElementById("timer");

const timerBox =
    document.getElementById("timerBox");

const scoreDisplay =
    document.getElementById("score");

const currentQuestion =
    document.getElementById("currentQuestion");

const progressBar =
    document.getElementById("progressBar");

const message =
    document.getElementById("message");

const submitBtn =
    document.getElementById("submitBtn");

const timePopup =
    document.getElementById("timePopup");

const hiddenAnswer =
    document.getElementById("hiddenAnswer");

const correctAnswer =
    document.getElementById("correctAnswer");

const revealBtn =
    document.getElementById("revealBtn");

const nextBtn =
    document.getElementById("nextBtn");

const resultPopup =
    document.getElementById("resultPopup");

const finalScore =
    document.getElementById("finalScore");

const performanceMessage =
    document.getElementById("performanceMessage");


// ==========================================
// SHUFFLE WORD
// ==========================================

function shuffleWord(word) {

    let shuffled;

    do {

        shuffled =
            word
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");

    }
    while (
        shuffled.toLowerCase() === word.toLowerCase()
    );

    return shuffled;
}


// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    clearInterval(timerInterval);

    questionAnswered = false;

    answerInput.disabled = false;

    submitBtn.disabled = false;

    message.textContent = "";

    message.className = "message";

    answerInput.value = "";

    timerBox.classList.remove(
        "timer-warning"
    );


    const current =
        questions[currentQuestionIndex];


    // Display shuffled word

    jumbledWord.textContent =
        shuffleWord(current.word);


    // Display hint

    hintText.textContent =
        current.hint;


    // Question number

    currentQuestion.textContent =
        currentQuestionIndex + 1;


    // Progress bar

    progressBar.style.width =
        ((currentQuestionIndex + 1) /
        questions.length) * 100 + "%";


    // Focus input

    answerInput.focus();


    // Start timer

    startTimer();
}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    timeLeft = 20;

    timerDisplay.textContent =
        timeLeft;


    timerInterval =
        setInterval(() => {

            timeLeft--;

            timerDisplay.textContent =
                timeLeft;


            // Timer warning

            if (timeLeft <= 5) {

                timerBox.classList.add(
                    "timer-warning"
                );

            }


            // Time finished

            if (timeLeft <= 0) {

                clearInterval(
                    timerInterval
                );

                timerDisplay.textContent =
                    "0";

                timeExpired();

            }

        }, 1000);
}


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer() {

    if (questionAnswered) {
        return;
    }


    const userAnswer =
        answerInput.value
        .trim()
        .toLowerCase();


    const correct =
        questions[currentQuestionIndex]
        .word
        .toLowerCase();


    if (userAnswer === "") {

        message.textContent =
            "Please enter an answer.";

        message.className =
            "message wrong";

        return;
    }


    if (userAnswer === correct) {

        questionAnswered = true;

        clearInterval(timerInterval);


        score++;

        scoreDisplay.textContent =
            score;


        message.textContent =
            "✓ Excellent! That's correct.";

        message.className =
            "message correct";


        answerInput.disabled = true;

        submitBtn.disabled = true;


        // Automatically move to next
        // question after a short pause.

        setTimeout(() => {

            moveForward();

        }, 1200);

    }

    else {

        message.textContent =
            "✕ Incorrect. Try again before the timer ends!";

        message.className =
            "message wrong";


        answerInput.select();

    }

}


// ==========================================
// ENTER KEY SUPPORT
// ==========================================

answerInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            checkAnswer();

        }

    }
);


// ==========================================
// TIME EXPIRED
// ==========================================

function timeExpired() {

    questionAnswered = true;

    answerInput.disabled = true;

    submitBtn.disabled = true;


    // Do NOT display answer here.

    correctAnswer.textContent = "";

    hiddenAnswer.classList.remove(
        "show"
    );

    revealBtn.classList.remove(
        "hidden"
    );

    nextBtn.classList.add(
        "hidden"
    );


    // Show popup

    timePopup.classList.add(
        "active"
    );
}


// ==========================================
// REVEAL ANSWER
// ==========================================

function revealAnswer() {

    const answer =
        questions[currentQuestionIndex]
        .word;


    correctAnswer.textContent =
        answer;


    // Now reveal answer

    hiddenAnswer.classList.add(
        "show"
    );


    // Hide reveal button

    revealBtn.classList.add(
        "hidden"
    );


    // Show Next Question button

    nextBtn.classList.remove(
        "hidden"
    );

}


// ==========================================
// NEXT QUESTION FROM POPUP
// ==========================================

function nextQuestion() {

    timePopup.classList.remove(
        "active"
    );


    moveForward();

}


// ==========================================
// MOVE FORWARD
// ==========================================

function moveForward() {

    if (
        currentQuestionIndex <
        questions.length - 1
    ) {

        currentQuestionIndex++;

        loadQuestion();

    }

    else {

        showResults();

    }

}


// ==========================================
// RESULTS
// ==========================================

function showResults() {

    clearInterval(timerInterval);


    finalScore.textContent =
        score + " / " + questions.length;


    let performance;


    if (score === 10) {

        performance =
            "Perfect! You're a Computer Science master! 🚀";

    }

    else if (score >= 8) {

        performance =
            "Excellent! Your Computer Science knowledge is impressive. 🔥";

    }

    else if (score >= 6) {

        performance =
            "Great work! You have strong technical knowledge. 💻";

    }

    else if (score >= 4) {

        performance =
            "Good attempt! Keep learning and try again. 📚";

    }

    else {

        performance =
            "These were difficult words! Practice and challenge yourself again. 💡";

    }


    performanceMessage.textContent =
        performance;


    resultPopup.classList.add(
        "active"
    );

}


// ==========================================
// RESTART GAME
// ==========================================

function restartGame() {

    clearInterval(timerInterval);


    currentQuestionIndex = 0;

    score = 0;

    scoreDisplay.textContent = 0;


    resultPopup.classList.remove(
        "active"
    );


    loadQuestion();

}


// ==========================================
// START GAME
// ==========================================

loadQuestion();