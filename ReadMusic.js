/* Variable used to call functions in nextQuestion array in order */

var questionCounter = 0

function questionAdvance() {
    questionCounter += 1
}

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

/* Shift notes horizontally */
function moveHoriz() {
    var horiz = (Math.floor(Math.random() * 200)) + 140;
    document.getElementById("whole_note").style.left = (horiz)+"px";
}

/* Array to index functions */
var nextQuestion = []

function buttonText(buttonA, buttonB) {
    this.correct = (buttonA);
    document.getElementById("A").innerHTML = (buttonA);
    document.getElementById("B").innerHTML = (buttonB);
}

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

//Notes Array
var notes = ["A", "B", "C", "D", "E", "F", "G"]
var notesTemp = ["A", "B", "C", "D", "E", "F", "G"]


//Function to choose wrong note (button B)
function wrongNote(notesTempPosition) {
    temp = notesTemp.splice(notesTempPosition, 1);
    this.randNote = notesTemp[Math.floor(Math.random() * notesTemp.length)];
    notesTemp.splice(notesTempPosition, 0, temp);
    return this.randNote;
}

//New wrong note function
function wrongNote2(correctNote) {
    var correct = correctNote;
    var randomWrong = notes[Math.floor(Math.random * notes.length)]

    while (randomWrong == correct) {
        randomWrong = notes[Math.floor(Math.random * notes.length)]
    }
    return randomWrong   
} 

// Jeff's wrong note function
function jeffsRandom(note) {
    var output = note;

    while (notes.indexOf(note) == notes.indexOf(output)) {
        output = notes[Math.floor(Math.random() * notes.length)]
    }
    return output
} 

// Load new example with these functions
function question2() {
    document.getElementById("oval").style.left = "60px";
    document.getElementById("A").innerHTML = "Time Signature";
    document.getElementById("B").innerHTML = "Music Clock";
}
nextQuestion.push(question2);

function question3() {
    document.getElementById("oval").style.display = "none";
    document.getElementById("whole_note").style.display = "inline-block";
    document.getElementById("question").innerHTML = "Choose the correct note name";
    buttonText(notes[notes.indexOf("F")], jeffsRandom("F"));
}
nextQuestion.push(question3);

function question4() {
    document.getElementById("whole_note").style.marginTop = "61px";
    document.getElementById("question").innerHTML = "Choose the correct note name";
    buttonText(notes[notes.indexOf("B")], jeffsRandom("B"));
}
nextQuestion.push(question4);

function question5() {
    document.getElementById("whole_note").style.marginTop = "42px";
    document.getElementById("question").innerHTML = "Choose the correct note name";
    buttonText(notes[notes.indexOf("E")], jeffsRandom("E"));
}
nextQuestion.push(question5);

/*
var notemap = {E4:"86px", F4:"80px", G4:"74px", A4:"68px", B4:"62px", 
    C5:"55px", D5:"49px", E5:"42px", F5:"37"}

var randomNote = function() {
    document.getElementById("whole_note").style.marginTop = 
    notemap[Object.keys(notemap)[Math.floor((Math.random() * Object.keys(notemap).length))]];
}
*/

//Used to identify note positions
function moveVert(pixels) {
    document.getElementById("whole_note").style.marginTop = (pixels)
}

//Question properties
function Question(noteName, symbolBool, position, auxInfo) {
    this.noteName = noteName;
    this.symbolBool = symbolBool;
    this.position = position;
    this.auxInfo = auxInfo;
}

var e4 = new Question("E", false, "86px")
var f4 = new Question("F", false, "80px")
var g4 = new Question("G", false, "74px")
var a4 = new Question("A", false, "68px")
var b4 = new Question("B", false, "62px")
var c5 = new Question("C", false, "55px")
var d5 = new Question("D", false, "49px")
var e5 = new Question("E", false, "42px")
var f5 = new Question("F", false, "37px")
var trebleClef = new Question("Treble Clef", true, "15px", "Bass Clef")
var timeSignature = new Question("Time Signature", true, "60px", "Music Clock")

//Array to hold questions
var questionText = ["Choose the correct note name",
    "Choose the name of the symbol in the red oval"]

function loadQuestion(obj) {
    var name = obj.name

    if (obj.symbolBool === false) {
        document.getElementById("oval").style.display = "none";
        document.getElementById("whole_note").style.display = "inline-block";
        document.getElementById("question").innerHTML = "Choose the correct note name";
        document.getElementById("whole_note").style.marginTop = obj.position;
        buttonText(obj.noteName, jeffsRandom(obj.noteName));
    } else {
        document.getElementById("oval").style.display = "inline-block";
        document.getElementById("whole_note").style.display = "none";
        document.getElementById("question").innerHTML = "Choose the name of the symbol in the red oval";
        document.getElementById("oval").style.left = obj.position;
        document.getElementById("A").innerHTML = obj.noteName;
        document.getElementById("B").innerHTML = obj.auxInfo;
    }
}