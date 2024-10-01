let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
let result = document.getElementById("result");
const squares = document.querySelectorAll('.square');
let squareContainer = document.getElementById("square-container");
let p1 = document.getElementById("s1");
let p2 = document.getElementById("s2");
let p3 = document.getElementById("s3");
let p4 = document.getElementById("s4");
let p5 = document.getElementById("s5");
let p6 = document.getElementById("s6");
let p7 = document.getElementById("s7");
let p8 = document.getElementById("s8");
let p9 = document.getElementById("s9");
let player = "x";
let Player1Stats = document.getElementById("p1Stats");
let Player2Stats = document.getElementById("p2Stats");
let ties = document.getElementById("ties");
let P1Stats = 0;
let P2Stats = 0;
let tieStats = 0;

//load Name And Stats
window.onload = function() {
    if(localStorage.getItem('P1Stats')) {
        P1Stats = parseInt(localStorage.getItem('P1Stats'));
        Player1Stats.textContent = P1Stats;
    }
    if(localStorage.getItem('P2Stats')) {
        P2Stats = parseInt(localStorage.getItem('P2Stats'));
        Player2Stats.textContent = P2Stats;
    }
    if(localStorage.getItem('tieStats')) {
        tieStats = parseInt(localStorage.getItem('tieStats'));
        ties.textContent = tieStats;
    }
    if(localStorage.getItem('name1')) {
        name1.value = localStorage.getItem('name1');
    }
    if(localStorage.getItem('name2')) {
        name2.value = localStorage.getItem('name2');
    }
}

//player switch
function cycle(){
    player = player === "x" ? "o" : "x"
}

function handleClick(){
    if (this.textContent === ""){
        this.textContent = player;
        this.style.color = player === "x" ? "skyblue" : "lightcoral"
        cycle()
        check()
    }
}

squares.forEach(square => {
    square.addEventListener('click', handleClick);
});

function reset(){
    squares.forEach(square => {
        square.addEventListener('click', handleClick);
    });
    player = "x"
    p1.textContent = ""
    p2.textContent = ""
    p3.textContent = ""
    p4.textContent = ""
    p5.textContent = ""
    p6.textContent = ""
    p7.textContent = ""
    p8.textContent = ""
    p9.textContent = ""
    result.value = ""
}

function winAnimation(){
    squareContainer.style.transform = "scale(0.9)";
    setTimeout(() => {
        squareContainer.style.transform = "scale(1)";
    }, 500);
}

function saveScore(){
    localStorage.setItem('P1Stats', P1Stats);
    localStorage.setItem('P2Stats', P2Stats);
    localStorage.setItem('tieStats', tieStats);
    localStorage.setItem('name1', name1.value);
    localStorage.setItem('name2', name2.value);
}

function deleteScore(){
    localStorage.removeItem('P1Stats')
    localStorage.removeItem('P2Stats')
    localStorage.removeItem('tieStats')
    localStorage.removeItem('name1')
    localStorage.removeItem('name2')
    name1.value = "";
    name2.value = "";
    P1Stats = 0;
    P2Stats = 0;
    tieStats = 0;
    ties.textContent = tieStats
    Player1Stats.textContent = P1Stats;
    Player2Stats.textContent = P2Stats;
}

//win scenerios
function check(){
    //x scenerios
    if (p1.textContent === "x" && p2.textContent === "x" && p3.textContent === "x" ||
        p1.textContent === "x" && p5.textContent === "x" && p9.textContent === "x" ||
        p7.textContent === "x" && p5.textContent === "x" && p3.textContent === "x" ||
        p1.textContent === "x" && p4.textContent === "x" && p7.textContent === "x" ||
        p2.textContent === "x" && p5.textContent === "x" && p8.textContent === "x" ||
        p4.textContent === "x" && p5.textContent === "x" && p6.textContent === "x" ||
        p7.textContent === "x" && p8.textContent === "x" && p9.textContent === "x" ||
        p3.textContent === "x" && p6.textContent === "x" && p9.textContent === "x") {
        result.value = `${name1.value} Wins`;
        P1Stats++
        Player1Stats.textContent = P1Stats;
        removeClickHandlers()
        winAnimation()
    }
    //o scenerios
    else if (p1.textContent === "o" && p2.textContent === "o" && p3.textContent === "o" ||
        p1.textContent === "o" && p5.textContent === "o" && p9.textContent === "o" ||
        p7.textContent === "o" && p5.textContent === "o" && p3.textContent === "o" ||
        p1.textContent === "o" && p4.textContent === "o" && p7.textContent === "o" ||
        p2.textContent === "o" && p5.textContent === "o" && p8.textContent === "o" ||
        p4.textContent === "o" && p5.textContent === "o" && p6.textContent === "o" ||
        p7.textContent === "o" && p8.textContent === "o" && p9.textContent === "o" ||
        p3.textContent === "o" && p6.textContent === "o" && p9.textContent === "o") {
        result.value = `${name2.value} Wins`;
        P2Stats++
        Player2Stats.textContent = P2Stats;
        removeClickHandlers()
        winAnimation()
    }
    //tie scenerios
    else if ([p1,p2,p3,p4,p5,p6,p7,p8,p9].every(square => square.textContent !== "")){
        result.value = "Tie"
        tieStats++
        ties.textContent = tieStats
        removeClickHandlers()
        winAnimation()
    }
    else{
        result.value = ""
    }

    function removeClickHandlers() {
        squares.forEach(square => {
            square.removeEventListener('click', handleClick);
        });
    }
}