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
    this.correct = (buttonA);
    document.getElementById("A").innerHTML = (buttonA);
    document.getElementById("B").innerHTML = (buttonB);
}

//Reset Buttons
function buttonReset() {
    document.getElementById("B").disabled = false;
    document.getElementById("next").disabled = true;
    document.getElementById("ansArea").style.color = "white";
    moveButtons();
}

// Check answer with this function
function checkAns(rightOrWrong) {
    document.getElementById("ansArea").style.color = "DimGrey";

    if (rightOrWrong) {
        document.getElementById("next").disabled = false;
        var num = (Math.floor)(Math.random()*4);

        switch (num) {
            case 0: document.getElementById("answer").innerHTML = "Yes!";
                    break;
            case 1: document.getElementById("answer").innerHTML = "Great!";
                    break;
            case 2: document.getElementById("answer").innerHTML = "Perfect!";
                    break;
            default: document.getElementById("answer").innerHTML = "Wonderful!";
        }

    } else {

        document.getElementById("B").disabled = true;
        var num = (Math.floor)(Math.random()*4);

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
var notesTemp = ["A", "B", "C", "D", "E", "F", "G"]

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
var d4 = new Question("D", false, "92px")
var e4 = new Question("E", false, "86px")
var f4 = new Question("F", false, "80px")
var g4 = new Question("G", false, "74px")
var a4 = new Question("A", false, "68px")
var b4 = new Question("B", false, "62px")
var c5 = new Question("C", false, "56px")
var d5 = new Question("D", false, "49px")
var e5 = new Question("E", false, "43px")
var f5 = new Question("F", false, "37px")
var g5 = new Question("G", false, "31px")
var trebleClef = new Question("Treble Clef", true, "15px", "Bass Clef")
var timeSignature = new Question("Time Signature", true, "60px", "Music Clock")

var nextQuestion = []
nextQuestion.push(d4, e4, f4, g4, a4, b4, c5, d5, e5, f5, g5, trebleClef, timeSignature)
var answeredQuestion =[]

function loadQuestion(parameter) {
    if (parameter === undefined) {
        var obj = nextQuestion[Math.floor(Math.random() * nextQuestion.length)]
    } else {
        var obj = parameter
    }

    if (obj.symbolBool === false) {
        document.getElementById("oval").style.display = "none";
        document.getElementById("whole_note").style.display = "inline-block";
        document.getElementById("question").innerHTML = "Choose the correct note name";
        document.getElementById("whole_note").style.marginTop = obj.position;
        moveHoriz();
        buttonText(obj.noteName, jeffsRandom(obj.noteName));
    } else {
        document.getElementById("oval").style.display = "inline-block";
        document.getElementById("whole_note").style.display = "none";
        document.getElementById("question").innerHTML = "Choose the name of the symbol in the red oval";
        document.getElementById("oval").style.left = obj.position;
        document.getElementById("A").innerHTML = obj.noteName;
        document.getElementById("B").innerHTML = obj.auxInfo;
    }

    nextQuestion.splice(indexOf(obj), 1)
    answeredQuestion.push(obj)
}