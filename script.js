let score = 0;
let timer = 0;
let num1, num2, correctAnswer;
let level = 1; // Start at level 1 (Addition)

// Function to generate random numbers based on level
function generateNumbers() {
    if (level === 1) {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
        document.getElementById("question").textContent = `${num1} + ${num2}`;
    } else if (level === 2) {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2;
        document.getElementById("question").textContent = `${num1} * ${num2}`;
    } else if (level === 3) {
        num1 = Math.floor(Math.random() * 100) + 10;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = Math.floor(num1 / num2);
        document.getElementById("question").textContent = `${num1} ÷ ${num2} (rounded)`;
    }
}

// Initialize the game with level 1
generateNumbers();

// Start timer and stop game after 60 seconds
const interval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer + " seconds";
    if (timer >= 120) {
        clearInterval(interval);
        document.getElementById("feedback").textContent = "Time's up! Game over.";
        document.getElementById("submit-btn").disabled = true;
        document.getElementById("user-answer").disabled = true;
    }
}, 1000);

// Function to handle answer submission
function submitAnswer() {
    const userAnswer = parseInt(document.getElementById("user-answer").value);
    
    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("score").textContent = score;
        document.getElementById("feedback").textContent = "Correct!";
    } else {
        document.getElementById("feedback").textContent = `Incorrect, the correct answer is ${correctAnswer}.`;
    }

    // Increase level based on score
    if (score >= 10 && score < 25) {
        level = 2; // Move to multiplication
        document.getElementById("level").textContent = "Level 2: Multiplication";
    } else if (score >= 40) {
        level = 3; // Move to division
        document.getElementById("level").textContent = "Level 3: Division";
    }

    // Generate new question
    generateNumbers();

    // Clear the input field for the next answer
    document.getElementById("user-answer").value = '';
}

// Add event listener to submit button
document.getElementById("submit-btn").addEventListener("click", submitAnswer);

// Add event listener for "Enter" key press
document.getElementById("user-answer").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        submitAnswer();
    }
});
