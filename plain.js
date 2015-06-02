// Variables and Arrays
// Array of keycodes to keys
var listofKeys = [
    {letter: " ", kcode: 32},
    {letter: "a", kcode: 65},
    {letter: "A", kcode: 65},
    {letter: "b", kcode: 66},
    {letter: "B", kcode: 66},
    {letter: "c", kcode: 67},
    {letter: "C", kcode: 67},
    {letter: "d", kcode: 68},
    {letter: "D", kcode: 68},
    {letter: "e", kcode: 69},
    {letter: "E", kcode: 69},
    {letter: "f", kcode: 70},
    {letter: "F", kcode: 70},
    {letter: "g", kcode: 71},
    {letter: "G", kcode: 71},
    {letter: "h", kcode: 72},
    {letter: "H", kcode: 72},
    {letter: "i", kcode: 73},
    {letter: "í", kcode: 73},
    {letter: "I", kcode: 73},
    {letter: "j", kcode: 74},
    {letter: "J", kcode: 74},
    {letter: "k", kcode: 75},
    {letter: "K", kcode: 75},
    {letter: "l", kcode: 76},
    {letter: "L", kcode: 76},
    {letter: "m", kcode: 77},
    {letter: "M", kcode: 77},
    {letter: "n", kcode: 78},
    {letter: "N", kcode: 78},
    {letter: "o", kcode: 79},
    {letter: "O", kcode: 79},
    {letter: "p", kcode: 80},
    {letter: "P", kcode: 80},
    {letter: "q", kcode: 81},
    {letter: "Q", kcode: 81},
    {letter: "r", kcode: 82},
    {letter: "R", kcode: 82},
    {letter: "s", kcode: 83},
    {letter: "S", kcode: 83},
    {letter: "t", kcode: 84},
    {letter: "T", kcode: 84},
    {letter: "u", kcode: 85},
    {letter: "U", kcode: 85},
    {letter: "v", kcode: 86},
    {letter: "V", kcode: 86},
    {letter: "w", kcode: 87},
    {letter: "W", kcode: 87},
    {letter: "x", kcode: 88},
    {letter: "X", kcode: 88},
    {letter: "y", kcode: 89},
    {letter: "Y", kcode: 89},
    {letter: "z", kcode: 90},
    {letter: "Z", kcode: 90},
    {letter: "0", kcode: 48},
    {letter: "1", kcode: 49},
    {letter: "2", kcode: 50},
    {letter: "3", kcode: 51},
    {letter: "4", kcode: 52},
    {letter: "5", kcode: 53},
    {letter: "6", kcode: 54},
    {letter: "7", kcode: 55},
    {letter: "8", kcode: 56},
    {letter: "9", kcode: 57},
    {letter: ";", kcode: 186},
    {letter: ":", kcode: 186},
    {letter: ",", kcode: 188},
    {letter: "-", kcode: 189},
    {letter: ".", kcode: 190},
    {letter: "'", kcode: 222},
    {letter: "‘", kcode: 222},
    {letter: "’", kcode: 222},
    {letter: "‘", kcode: 222},
    {letter: "“", kcode: 222},
    {letter: "”", kcode: 222},
    {letter: "$", kcode: 52}
];
// Array of month names for current date
var monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var testString;
var titleorb = []; // used to parse JSON responseText
var jstring;
var elapsed;
var pageArr = []; //master array with content
var imgArr = [];
var imgCount = [];
var charsOne = 0;
var charsTwo = 0;
var currentArt = 0;
var secondsRemain;
var pagearrCount;
var creIma;
var xmlhttp = new XMLHttpRequest();
var wpmUpdated = false;
var noImage = true;
var originTime;
var initTime = 0;
var postTime;
var postOrigin;
var totalTypetime = 0;
var intervalHandle;
var totalTypekeys;
var brokenTitle;
var endGame;
var brokenAbstract;
var currentKey = 0; //current key of array
var idCount = 0;
var toPress; //keycode to press for current
var pWrong = 0;
var pRight = 0;
var percNow = 0; // perc based on current keys typed
var percTot = 0; // perc based on all keys to be typed
var percWPM; // 5 chars per min timer
var currentdate = new Date(); 
var datetime = "TypeTheTimes - " + monthArr[currentdate.getMonth()] + " " + currentdate.getDate() + ", " + currentdate.getFullYear();
// Set date and initial stats for test
document.getElementById('date').innerHTML = datetime;
document.getElementById('percnow').innerHTML = "Right/Wrong: "+ percNow;
document.getElementById('perctot').innerHTML = "Completed: "+ percTot + "%";

// Knuth shuffle function
  function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};



function getTimes() {
xmlhttp.open('GET', 'https://api.nytimes.com/svc/topstories/v1/home.json?api-key='+constant, true);

// API call to NY Times to grab and parse JSON
xmlhttp.onreadystatechange = function(response) {
    if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
            titleorb = JSON.parse(xmlhttp.responseText);
            pagearrCount = titleorb.results.length;
            for (var i = 0; i < titleorb.results.length; i++) {
                var jstring = titleorb.results[i].title;
                replacer(jstring);
                var txt = document.createElement('span');
                document.body.appendChild(txt);
                txt.id = 'title' + i;
                txt.className = "none";
                var jstrin = document.createTextNode(replacer(jstring));
                txt.appendChild(jstrin);
                // Loops through all titles to append to HTML
                var jstring = " " +titleorb.results[i].abstract+ " ";
                replacer(jstring);
                var txt = document.createElement('span');
                document.body.appendChild(txt);
                txt.id = 'abstract' + i;
                txt.className = "none";
                var jstrin = document.createTextNode(replacer(jstring));
                txt.appendChild(jstrin);
                // Loops through abstracts to append to HTML
                var jurlp;
                if (titleorb.results[i].multimedia[1] != undefined) {
                    // removes articles with no images
                    var jurl = titleorb.results[i].multimedia[1].url;
                    var txt = document.createElement('span');
                    document.body.appendChild(txt);
                    txt.id = 'imgurl' + i;
                    txt.className = 'none';
                    var jurlo = document.createTextNode(jurl);
                    txt.appendChild(jurlo);
                    //scrape HTML nodes for char values to push to array
                    jurlp = document.getElementById('imgurl'+i).innerHTML;
                    pageArr.push({
                        title: document.getElementById('title'+i).innerHTML,
                        abstract: document.getElementById('abstract'+i).innerHTML,
                        artnum: i, //scrape HTML children for values
                        imgurl: jurlp
                    });
                };
            };
            shuffle(pageArr); //shuffles page array for article order
            shrinkArr(pageArr); // shrinks to 5 articles
            createTiab(pageArr); // creates letters for test
        }
    }
};
    xmlhttp.send(null);
};

// Regex to test and replace for special characters
function replacer(string){
    var regE = /&eacute;/;
    var regA = /&#821\d;/;
    var regB = /&#822[0-2];/;
    var regC = /&amp;/;
    while (regB.test(string) || regA.test(string) || regE.test(string) || regC.test(string)){
        string = string.replace(regA, "\'");
        string = string.replace(regB, "\"");
        string = string.replace(regE, "é");
        string = string.replace(regC, "&");
    };
    return string;
}

// Shrinks array from NYT JSON to 5 articles
function shrinkArr(array){
    for (var i = 0; i < 20 ; i++) {
        array.pop();
        if(array.length = 5){
            return array;   
        };
    };
    return array;
};

// Creates individual characters and determines length to determine when image should change, also starts game
function createTiab(array){
    array.forEach(function(array, i){
        brokenTitle = pageArr[i].title.split("");
        brokenAbstract = pageArr[i].abstract.split("");
        var artnum = pageArr[i].imgurl;
        var a = brokenTitle.length;
        var b = brokenAbstract.length;
        charsOne += a;
        charsTwo += b;
        createBrokenlets(brokenTitle, i);
        createBrokenlets(brokenAbstract, i);
        imgCount.push({
            imgurl: artnum,
            switch: charsOne + charsTwo
        });
    });
    endGame = idCount - 1;
    startTest();
};
// Creates an image from NYT API URL and checks if it exists
function createImage(array){
        if (noImage == true) {
            creIma = new Image(150, 150);
            creIma.src = imgCount[currentArt].imgurl;
            creIma.class = 'asideimg';
            document.getElementById('imgbar').appendChild(creIma);
            noImage = false;
        };
};

// Creates individual chars and appends them to HTML with unique id and class identifier
function createBrokenlets(string, i, artnum){
    var v = string;
    string.forEach(function(string, i) {
    var crelet = document.createElement('span');
    document.getElementById('nodes').appendChild(crelet);
    crelet.id = 'crelet' + idCount;
        if (v.length == brokenTitle.length){
            crelet.className = 'nyttitle';
        }else {
            crelet.className = 'nytabstract';
        };
    var t = document.createTextNode(v[i]);
    crelet.appendChild(t);
    i += 1;
    idCount +=1;
    });
};

// Splits the string into an array of individual characters and passes it for player's keystroke
function splitLine(title, abstract){
    brokenLine = title.split("");
    toPress = brokenLine[currentKey];
};

//loads image URL from Times API JSON to match current article based on typed keys
function setcurrentImage() {
    imgCount.forEach(function(h, i){
        if (window.currentKey > window.imgCount[i].switch - 1) {
            creIma.src = window.imgCount[i + 1].imgurl;
       }
    });
};

// Typing test
function startTest(){
    getKcode();
    createImage();
    setcurrentImage();
    var t = document.getElementById('crelet'+currentKey);
    t.style.border = '1px solid black';
    document.addEventListener('keydown', function _keyPress(event){
        startTimer();
        if (event.keyCode == 16 || event.keyCode == 17 || event.keyCode == 8) {
            // Ignores enter, backspace and tab
            event.preventDefault();
        } else if (event.keyCode == 32 && event.target == document.body && event.keyCode != toPress) {
            // Player is given a negative point if they hit the spacebar at the wrong time
            event.preventDefault();
            pWrong += 1;
            currentKey += 1;
            t.style.color = 'red';
            this.removeEventListener('keydown', _keyPress);
            t.style.textDecoration = 'line-through';
            t.style.border = 'none';
            calcTime();
            updateTots();
            startTest();
        } else if (event.keyCode == 32 && event.target == document.body && event.keyCode == toPress){
            // Player is given a point for hitting the spacebar correctly
            event.preventDefault();
            pRight += 1;
            currentKey += 1;
            this.removeEventListener('keydown', _keyPress);
            t.style.border = 'none';
            calcTime();
            updateTots();
            startTest();     
        } else if (event.keyCode == toPress){
            // Points for hitting right keys
            t.style.color = 'lightsteelblue';
            pRight += 1;
            currentKey += 1;
            this.removeEventListener('keydown', _keyPress);
            t.style.border = 'none';
            calcTime();
            updateTots();
            startTest();
        } else {
            // Or else they hit the wrong thing
            t.style.color = 'red';
            pWrong += 1;
            currentKey += 1;
            this.removeEventListener('keydown', _keyPress);
            t.style.textDecoration = 'line-through';
            t.style.border = 'none';
            calcTime();
            updateTots();
            startTest();
        };
    });
};
// 60 second timer for WPM calculation -- once timer hits 60, the WPM is added
function calcTime(){
    postOrigin = new Date().getTime();   
    postTime = Math.floor(postOrigin / 1000);
    elapsed = postTime - initTime;
    if (elapsed >= 60 && wpmUpdated == false) {
        var wpm = (pRight / 5);
    document.getElementById('percwpm').innerHTML = "WPM: "+wpm;
    wpmUpdated = true;
    }
};
// Start timer when keystroke is first registered
document.addEventListener('keydown', function _startTime(event){
    secondsRemain = 60;
    document.getElementById('percwpm').innerHTML = 'WPM: 00:'+secondsRemain;
    intervalHandle = setInterval(countDown, 1000);
    this.removeEventListener('keydown', _startTime);
});
// Countdown text update
function countDown(){
    var timeDisp = document.getElementById('percwpm');
	var sec = secondsRemain;
    if (sec < 10) {
		sec = "0" + sec;
	}
    var message = "00:" + sec;
    timeDisp.innerHTML = "WPM: "+message;
    secondsRemain--;
    if (secondsRemain == 1){
        clearInterval(intervalHandle);   
    }
};
// Start timer
function startTimer() {
    if (initTime == 0) {
    originTime = new Date().getTime();
    initTime = Math.floor((originTime / 1000));
    };  
};
// Update stats for user's typing
function updateTots(){
    percNow = (pRight / currentKey) * 100;
    percTot = (currentKey / idCount) * 100;
    document.getElementById('percnow').innerHTML = "Right/Wrong: "+pRight+"/"+pWrong;
    document.getElementById('perctot').innerHTML = "Completed: "+ percTot.toFixed() + "%";
    if (window.currentKey == window.endGame) {
        alert('End of articles'); 
    };
}
// Grabs HTML character and converts it to a keycode to check against user's input
function getKcode(){
    var keyTrans;
    var t = document.getElementById('crelet'+currentKey).innerHTML.toLowerCase();
    listofKeys.forEach(function(d, i){
        if ( t == listofKeys[i].letter) {
            keyTrans = listofKeys[i].kcode;
        };
    });
    toPress = keyTrans;
};

getTimes(); //Starts app