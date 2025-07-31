let gameSeq =[];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is Started");
        started = true;
    
        levelUp();
    }
});

// For mobile: tap anywhere to start
document.addEventListener("touchstart", function () {
    if (!started) {
        console.log("Game is Started (Mobile)");
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
};

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
};

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //RANDOM BUTTON TO CHOOSE
    let randIdx = Math.floor(Math.random()*btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    btnFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else{
        let highScore = localStorage.getItem("highScore") || 0;
        if (level > highScore) {
        localStorage.setItem("highScore", level);
        h2.innerHTML = `🎉 New High Score: <b>${level}</b> <br> Press any key to restart.`;
        } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> High Score: ${highScore} <br> Press any key to start.`;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn); 

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
 
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

