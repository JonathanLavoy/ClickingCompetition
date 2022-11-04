var user;

function start(){
    document.getElementById("nameForm").style.display="none";
    document.getElementById("menu").style.display="block";

    user = document.getElementById("nameInput").value;
    document.getElementById("name").innerHTML=user;

    getID();
    getAllData();
}


function name(){
    document.getElementById("menu").style.display="none";
    document.getElementById("nameForm").style.display="block";
}

function done(){
    document.getElementById("keys").style.display="none";
    document.getElementById("menu").style.display="block";
}

function keys(){
    document.getElementById("menu").style.display="none";
    document.getElementById("keys").style.display="block";
}

function menu(){
    gameReset();
    document.getElementById("game").style.display="none";
    document.getElementById("ldrWrapper").style.display="none"
    document.getElementById("menu").style.display="block";
    end.style.display="none";
}

function leaderboard(){
    document.getElementById("menu").style.display="none";
    document.getElementById("ldrWrapper").style.display="block";

}

function tryAgain(){
    gameReset();
    end.style.display="none";
}

var submitScore, submitMode, submitTime ;
var submitArray;
function submit(){
    insertData(submitArray);
    gameReset();
    clearLeaderboard();
    document.getElementById("game").style.display="none";
    document.getElementById("menu").style.display="block";
    end.style.display="none";

    setTimeout(() => {
        getID();
    getAllData(); 
    }, 300);  
}



var mode;
var instructions = document.getElementById("instructions");

function game1(){
    mode=1;
    instructions.innerHTML="When the timer starts click " + button1.toUpperCase() + " as fast as possible!";
    submitMode = "1 Button";
    document.getElementById("menu").style.display="none";
    document.getElementById("game").style.display="block";
}

function game2(){
    mode=2;
    instructions.innerHTML="When the timer starts click " + button1.toUpperCase() + " and " + button2.toUpperCase() + " as fast as possible!";
    submitMode = "2 Buttons";
    document.getElementById("menu").style.display="none";
    document.getElementById("game").style.display="block";
}

function game3(){
    mode=3;
    instructions.innerHTML="When the timer starts click your mouse as fast as possible!"
    submitMode = "Mouse";
    document.getElementById("menu").style.display="none";
    document.getElementById("game").style.display="block";
}

function drop(){
    document.getElementById("drop1").style.display="block";
    document.getElementById("drop2").style.display="block";
    document.getElementById("drop3").style.display="block";
}

function nodrop(){
    document.getElementById("drop1").style.display="none";
    document.getElementById("drop2").style.display="none";
    document.getElementById("drop3").style.display="none";
}

function setTime1(){
    dm.innerHTML="15 Seconds";
}
function setTime2(){
    dm.innerHTML="30 Seconds";
}
function setTime3(){
    dm.innerHTML="60 Seconds";
}

var intervalID;

function gameReset(){
    clearInterval(intervalID);
    document.removeEventListener("keyup", cpmCalc);
    document.removeEventListener("click", cpmCalc);
    clicks=0;
    clicksTxt.innerHTML= "Clicks: " + clicks;
    cpmTxt.innerHTML="CPM: 0";
    document.getElementById("countdown").style.display="none";
    document.getElementById("start").style.display="block";
    time.innerHTML=3;
}

var button1 = "Z", button2 = "X";

const k = document.getElementById("btn1");
function key1(){
    k.innerHTML="...";

    document.addEventListener("keydown", function(e){
        if(k.innerHTML==="..."){
            k.innerHTML=e.key;
            button1=e.key;
        }
    });
}

const k2 = document.getElementById("btn2");
function key2(){
    k2.innerHTML="...";

    document.addEventListener("keydown", function(e){
        if(k2.innerHTML==="..."){
            k2.innerHTML=e.key;
            button2=e.key;
        }
    });
}

var elapsed;
var end = document.getElementById("endBtns");

function timer(count, display){
    let x = 3;
    let n = 0;
    elapsed = 0;
    count++;
    intervalID = setInterval(function(){
        if(x>1){
            display.innerHTML=--x;
        }
        else if(count>0){
            elapsed++;
            display.innerHTML=--count;
            cpmTxt.innerHTML="CPM: " + Math.round((60/elapsed)*clicks);
            if(n === 0){
                if(mode===1 || mode===2){
                    document.addEventListener("keyup", cpmCalc);
                    n++;
                }
                else if(mode===3){
                    document.addEventListener("click", cpmCalc);
                    n++;
                }
            }
            else if(count===0){
                if(mode===1 || mode===2){
                    document.removeEventListener("keyup", cpmCalc);
                    end.style.display="inline-flex";
                    higherScore(Math.round((60/elapsed)*clicks));
                    submitArray = [user, submitScore, submitMode, submitTime];
                }
                else if(mode===3){
                    document.removeEventListener("click", cpmCalc);
                    end.style.display="inline-flex";
                    higherScore(Math.round((60/elapsed)*clicks));
                    submitArray = [user, submitScore, submitMode, submitTime];
                }
            }
        }
    }, 1000);
}
var clicks = 0;
var cpmTxt = document.getElementById("cpm");
var clicksTxt = document.getElementById("clicks");
var cpmCalc = function(event){
    if(mode===1){
        if(event.key.toUpperCase() === button1.toUpperCase()){
            clicks++;
            clicksTxt.innerHTML= "Clicks: " + clicks;
            cpmTxt.innerHTML="CPM: " + Math.round((60/elapsed)*clicks);
        }
    }
    else if(mode===2){
        if(event.key.toUpperCase() === button1.toUpperCase() || event.key.toUpperCase() === button2.toUpperCase()){
            clicks++;
            clicksTxt.innerHTML= "Clicks: " + clicks;
            cpmTxt.innerHTML="CPM: " + Math.round((60/elapsed)*clicks);
        }
    }
    else if(mode===3){
        clicks++;
        clicksTxt.innerHTML= "Clicks: " + clicks;
        cpmTxt.innerHTML="CPM: " + Math.round((60/elapsed)*clicks);
    }
};


var time = document.getElementById("time");
function gameMain(){
    document.getElementById("start").style.display="none";
    document.getElementById("countdown").style.display="block";

    submitTime = document.getElementById("dropmenu").innerHTML;

    var duration = parseInt(document.getElementById("dropmenu").innerHTML);

    timer(duration, time);
    
}

var highscore = 0;

function higherScore(score){
    submitScore = score;
    if(score > highscore){
        highscore = score;
        document.getElementById("highScore").innerHTML= "High Score: " + score + " CPM";
    }
}


function addRow(data){
    const ldr = document.getElementById("leaderboard");
    const score = document.createElement("div");
    score.className="scores";
    const cat = document.createElement("div");
    cat.className="category";
    var numb = document.querySelectorAll('.scores').length + 1;
    cat.appendChild(document.createTextNode(numb.toString()));
    score.appendChild(cat);
    for(let i = 0; i<data.length; i++){
        const cat = document.createElement("div");
        cat.className="category";
        cat.appendChild(document.createTextNode(data[i]));
        score.appendChild(cat);
    }
    ldr.appendChild(score);
}

function clearLeaderboard(){
    const scores = document.querySelectorAll('.scores');
    scores.forEach(score => {
        score.remove();
    });
}

const startBtn = document.getElementById("startBtn");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const nm = document.getElementById("changeName");
const ck = document.getElementById("changeKeys");
const ldb = document.getElementById("leader-board");
const dn = document.getElementById("done");
const pb = document.getElementById("playBtn");
const dm = document.getElementById("dropmenu");
const d1 = document.getElementById("drop1");
const d2 = document.getElementById("drop2");
const d3 = document.getElementById("drop3");
const ta = document.getElementById("tryAgain");
const sub = document.getElementById("submit");
const men = document.getElementById("menu-button");
const men2 = document.getElementById("menubtn2");


startBtn.addEventListener("click", start);
b1.addEventListener("click", game1);
b2.addEventListener("click", game2);
b3.addEventListener("click", game3);
nm.addEventListener("click", name);
ck.addEventListener("click", keys);
ldb.addEventListener("click", leaderboard);
k.addEventListener("click", key1);
k2.addEventListener("click", key2);
dn.addEventListener("click", done);
pb.addEventListener("click", gameMain);
dm.addEventListener("mouseenter", drop);
dm.addEventListener("mouseleave", nodrop);
d1.addEventListener("mouseenter", drop);
d1.addEventListener("mouseleave", nodrop);
d1.addEventListener("click", setTime1);
d2.addEventListener("mouseenter", drop);
d2.addEventListener("mouseleave", nodrop);
d2.addEventListener("click", setTime2);
d3.addEventListener("mouseenter", drop);
d3.addEventListener("mouseleave", nodrop);
d3.addEventListener("click", setTime3);
ta.addEventListener("click", tryAgain);
sub.addEventListener("click", submit);
men.addEventListener("click", menu);
men2.addEventListener("click", menu);


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAaVtsTRk2_MwHT-WYiHTTNgbPORJg7ZQ8",
    authDomain: "clicking-competition.firebaseapp.com",
    databaseURL: "https://clicking-competition-default-rtdb.firebaseio.com",
    projectId: "clicking-competition",
    storageBucket: "clicking-competition.appspot.com",
    messagingSenderId: "969895859883",
    appId: "1:969895859883:web:c8c8c387ce14731fae09ee",
    measurementId: "G-4306SBM1QM"
};
      
        // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


import{getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

const db = getDatabase();


var currentId;
function getID(){
    var dbref = ref(db);
    get(child(dbref, "ID")).then((snapshot)=>{
        if(snapshot.exists()){
            currentId = snapshot.val();
        }
    });
}



function insertData(data){
    getID();
    set(ref(db, "Scores/" + (currentId+1)),{
        PlayerName: data[0],
        CPM: data[1],
        Mode: data[2],
        TimeLimit: data[3]
    });

    set(ref(db, "ID"), (currentId+1));
    
}


function getAllData(){
    setTimeout(() => {
        for(let i = 0; i <= currentId; i++){
            getData(i);
        }
    }, 500);
    setTimeout(() => {
        sortData();
    }, 550);
}


var scoreData = [];
function getData(i){
    var dbref = ref(db);
        get(child(dbref, "Scores/" + i)).then(function(snapshot){
            if(snapshot.exists()){
                scoreData[i] = snapshot.val()
            }   
        });
}

function sortData(){
    scoreData.sort((a,b) =>{
        return b.CPM - a.CPM;
    });
    setTimeout(() => {
        buildLeaderboard();
    }, 100);
}

function buildLeaderboard(){
    setTimeout(() => {
        for(let i = 0; (i <= currentId) && (i<10); i++){
            let tempArray = Object.values(scoreData[i]);
            let correctArray = [tempArray[2], tempArray[0] + " CPM", tempArray[1], tempArray[3]];
            addRow(correctArray);
        }
    }, 100);
}



