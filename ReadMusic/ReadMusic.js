//Function to switch button locations
function moveButtons() {
    var num = (Math.floor)(Math.random()*2);

    if (num === 0) {
        document.getElementById("buttonAdiv").style.float = "left";
        document.getElementById("buttonBdiv").style.float = "right";
    } else {
        document.getElementById("buttonAdiv").style.float = "right";
        document.getElementById("buttonBdiv").style.float = "left";
    }
}

// Shift notes horizontally 
function moveHoriz() {
    var horiz = (Math.floor(Math.random() * 200)) + 140;
    document.getElementById("whole_note").style.left = (horiz)+"px";
}

// Shortcut for button text
function buttonText(buttonA, buttonB) {
    document.getElementById("A").innerHTML = (buttonA);
    document.getElementById("B").innerHTML = (buttonB);
}

//Reset Buttons
function buttonReset() {
    document.getElementById("B").disabled = false;
    document.getElementById("next").disabled = true;
    document.getElementById("ansArea").style.visibility = "hidden";
    correctPressed = false
    moveButtons();
}

var correctPressed = false

// Check answer with this function
function checkAns(rightOrWrong) {
    document.getElementById("ansArea").style.visibility = "visible";

    if (rightOrWrong) {
        document.getElementById("next").disabled = false;
        if (correctPressed === false) {
            score += 1
            correctPressed = true
        }

        var num = (Math.floor)(Math.random()*4);
        document.getElementById(score).style.backgroundColor = "#C0C0C0"

        switch (num) {
            case 0: document.getElementById("answer").innerHTML = "Yes!";
                    break;
            case 1: document.getElementById("answer").innerHTML = "Great!";
                    break;
            case 2: document.getElementById("answer").innerHTML = "Perfect!";
                    break;
            default: document.getElementById("answer").innerHTML = "Wonderful!";
        }

        if (score == currentLevel.length) {
            alert("Level Up!")
            levelLoad(levelArray[currentLevelIndex])
        } else if (score != currentLevel.length) {
            setTimeout(newQuesAndButRst, 1000)
        }

        
    } else {

        document.getElementById("B").disabled = true;
        var num = (Math.floor)(Math.random()*4);
        for (i = score; i > 0; i--) {
            document.getElementById(i).style.backgroundColor = "white"
        }
        score = 0

        switch (num) {
            case 0: document.getElementById("answer").innerHTML = "No, not that one";
                    break;
            case 1: document.getElementById("answer").innerHTML = "I don't think so";
                    break;
            case 2: document.getElementById("answer").innerHTML = "Try again";
                    break;
            default: document.getElementById("answer").innerHTML = "Give it one more try";
        }
    }
}

//Notes Arrays
var notes = ["A", "B", "C", "D", "E", "F", "G"]

// Jeff's wrong note function
function jeffsRandom(note) {
    var output = note;

    while (notes.indexOf(note) == notes.indexOf(output)) {
        output = notes[Math.floor(Math.random() * notes.length)]
    }
    return output
} 

//Question prototype
function Question(noteName, symbolBool, position, auxInfo) {
    this.noteName = noteName;
    this.symbolBool = symbolBool;
    this.position = position;
    this.auxInfo = auxInfo;
}

//Questions
var d4 = new Question("D", false, "126px")
var e4 = new Question("E", false, "120px")
var f4 = new Question("F", false, "112px")
var g4 = new Question("G", false, "106px")
var a4 = new Question("A", false, "98px")
var b4 = new Question("B", false, "91px")
var c5 = new Question("C", false, "84px")
var d5 = new Question("D", false, "77px")
var e5 = new Question("E", false, "70px")
var f5 = new Question("F", false, "63px")
var g5 = new Question("G", false, "54px")
var trebleClef = new Question("Treble Clef", true, "10px", "Bass Clef")
var timeSignature = new Question("Time Signature", true, "50px", "Music Clock")

//levels
var currentLevel
var currentLevelIndex = 0
var score = 0

//Level prototype
function Level(levelName, levelIndex, Questions) {
    this.levelName = levelName
    this.levelIndex = levelIndex
    this.questions = []

    for (i = 2; i < arguments.length; i++) {
            this.questions.push(arguments[i])
        }   
}

var level1 = new Level("level1", 1, f4, a4, c5, e5, trebleClef, timeSignature)
var level2 = new Level("level2", 2, e4, g4, b4, d5, f5)
var level3 = new Level("level3", 3, e4, g4, b4, d5, f5, f4, a4, 
    c5, e5, trebleClef, timeSignature)

var levelArray = []
levelArray.push(level1, level2, level3)

//Array to hold unasked questions
var nextQuestion = []

//Array to hold asked questions
var answeredQuestion =[]


//Load a new level
function levelLoad(level) {
    currentLevelIndex = level.levelIndex
    document.getElementById("level_holder").innerHTML = "LEVEL" + " " + (currentLevelIndex);
    currentLevel = level.questions

    if (nextQuestion.length > 0) {
        for (i = (nextQuestion.length - 1); i >= 0; i--) {
            nextQuestion.splice(i, 1)
        }
    } 

    for (j = 1; j <= level.questions.length; j++) {
        document.getElementById(j).style.visibility = "visible"
        document.getElementById(j).style.display = "inline-block"
    }

    for (k = 18; k > level.questions.length; k--) {
        document.getElementById(k).style.visibility = "hidden"
        document.getElementById(k).style.display = "none"
    }

    for (l = score; l > 0; l--) {
        document.getElementById(l).style.backgroundColor = "white"
    }

    for (m = 0; m < level.questions.length; m++) {
        nextQuestion.push(level.questions[m])
    }

    loadQuestion()
    buttonReset()
    score = 0
}


var showingButtons = false

function loadQuestion(parameter) {
    if (showingButtons == false) {
        document.getElementById("buttonDiv").style.visibility = "visible";
        document.getElementById("level_holder").style.visibility = "visible";
        document.getElementById("block_holder").style.visibility = "visible";
        showingButtons = true
    }

    if (score != currentLevel.length) {
        if (nextQuestion.length === 0) {
            while (answeredQuestion.length > 0) {
                nextQuestion.push(answeredQuestion[0])
                answeredQuestion.splice(0, 1)
            }
        }
    }

    if (parameter === undefined) {
        var localQuestion = nextQuestion[Math.floor(Math.random() * nextQuestion.length)]
    } else {
        var localQuestion = parameter
    }

    if (localQuestion.symbolBool === false) {
        document.getElementById("oval").style.display = "none";
        document.getElementById("whole_note").style.display = "inline-block";
        document.getElementById("question").innerHTML = "Choose the correct note name";
        document.getElementById("whole_note").style.marginTop = localQuestion.position;
        moveHoriz();
        buttonText(localQuestion.noteName, jeffsRandom(localQuestion.noteName));
    } else {
        document.getElementById("oval").style.display = "inline-block";
        document.getElementById("whole_note").style.display = "none";
        document.getElementById("question").innerHTML = "Choose the name of the symbol in the red oval";
        document.getElementById("oval").style.left = localQuestion.position;
        document.getElementById("A").innerHTML = localQuestion.noteName;
        document.getElementById("B").innerHTML = localQuestion.auxInfo;
    }

    nextQuestion.splice(nextQuestion.indexOf(localQuestion), 1)
    answeredQuestion.push(localQuestion)
}

function newQuesAndButRst() {
    buttonReset();
    loadQuestion();
}