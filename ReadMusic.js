/* Variable used to call functions in nextQuestion array in order */

var questionCounter = 0

function questionAdvance() {
    questionCounter += 1
}

/* Function to switch button locations */
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
function checkAns(trueFalse) {
    document.getElementById("ansArea").style.color = "DimGrey";

    if (trueFalse) {
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
    buttonText(notes[5], wrongNote(5))
}
nextQuestion.push(question3);

function question4() {
    document.getElementById("whole_note").style.marginTop = "61px";
    document.getElementById("question").innerHTML = "Choose the correct note name";
    buttonText(notes[1], wrongNote(1));
}
nextQuestion.push(question4);

function question5() {
    document.getElementById("whole_note").style.marginTop = "42px";
    document.getElementById("question").innerHTML = "Choose the correct note name";
    buttonText(notes[4], wrongNote(4));
}
nextQuestion.push(question5);


var notemap = {c4:"100px", d4:"92px", e4:"84px", f4:"76px", g4:"68px", a5:"60px", g5:"52px"}

var randomNote = function() {
    document.getElementById("whole_note").style.marginTop = notemap[Object.keys(notemap)[Math.floor((Math.random() * Object.keys(notemap).length))]];
}

