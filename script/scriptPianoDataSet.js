
function piano( note, octave, tempo) {
    if(note != "off"){
    let audio = new Audio(`pianoDataSet/${note}${octave}_${tempo}.mp3`)
    audio.play().then();
    }

}

// end of function

/**************************************************************************************************************/

 let musiqueJSON =
     [{
        "rightChord": "Do Majeur",
        "leftChord": "Do",
        "id": 1,
        "time": 4,
        "position": {
            "leftHand": {
                "finger1": {
                    "key": "SOL",
                    "status": "up",
                    "octave": 0
                },
                "finger2": {
                    "key": "FA",
                    "status": "up",
                    "octave": 0
                },
                "finger3": {
                    "key": "MI",
                    "status": "up",
                    "octave": 0
                },
                "finger4": {
                    "key": "RE",
                    "status": "up",
                    "octave": 0
                },
                "finger5": {
                    "key": "DO",
                    "status": "down",
                    "octave": 0
                }
            },
            "rightHand": {
                "finger1": {
                    "key": "DO",
                    "status": "down",
                    "octave": 1
                },
                "finger2": {
                    "key": "RE",
                    "status": "up",
                    "octave": 1
                },
                "finger3": {
                    "key": "MI",
                    "status": "down",
                    "octave": 1
                },
                "finger4": {
                    "key": "FA",
                    "status": "up",
                    "octave": 1
                },
                "finger5": {
                    "key": "SOL",
                    "status": "down",
                    "octave": 1
                }
            }
        }
    },
    {
        "rightChord": "SOL Majeur",
        "leftChord": "SOL",
        "id": 2,
        "time": 4,
        "position": {
            "leftHand": {
                "finger1": {
                    "key": "SOL",
                    "status": "down",
                    "octave": 0
                },
                "finger2": {
                    "key": "FA",
                    "status": "up",
                    "octave": 0
                },
                "finger3": {
                    "key": "MI",
                    "status": "up",
                    "octave": 0
                },
                "finger4": {
                    "key": "RE",
                    "status": "up",
                    "octave": 0
                },
                "finger5": {
                    "key": "DO",
                    "status": "up",
                    "octave": 0
                }
            },
            "rightHand": {
                "finger1": {
                    "key": "SOL",
                    "status": "down",
                    "octave": 1
                },
                "finger2": {
                    "key": "LA",
                    "status": "up",
                    "octave": 1
                },
                "finger3": {
                    "key": "SI",
                    "status": "down",
                    "octave": 1
                },
                "finger4": {
                    "key": "DO",
                    "status": "up",
                    "octave": 2
                },
                "finger5": {
                    "key": "RE",
                    "status": "down",
                    "octave": 2
                }
            }
        }
    },
    {
        "rightChord": "RE mineur",
        "leftChord": "RE",
        "id": 2,
        "time": 4,
        "position": {
            "leftHand": {
                "finger1": {
                    "key": "LA",
                    "status": "up",
                    "octave": 0
                },
                "finger2": {
                    "key": "SOL",
                    "status": "up",
                    "octave": 0
                },
                "finger3": {
                    "key": "FA",
                    "status": "up",
                    "octave": 0
                },
                "finger4": {
                    "key": "MI",
                    "status": "up",
                    "octave": 0
                },
                "finger5": {
                    "key": "RE",
                    "status": "down",
                    "octave": 0
                }
            },
            "rightHand": {
                "finger1": {
                    "key": "RE",
                    "status": "down",
                    "octave": 1
                },
                "finger2": {
                    "key": "MI",
                    "status": "up",
                    "octave": 1
                },
                "finger3": {
                    "key": "FA",
                    "status": "down",
                    "octave": 1
                },
                "finger4": {
                    "key": "SOL",
                    "status": "up",
                    "octave": 1
                },
                "finger5": {
                    "key": "LA",
                    "status": "down",
                    "octave": 1
                }
            }
        }
    },
    {
        "rightChord": "LA mineur",
        "leftChord": "LA",
        "id": 2,
        "time": 4,
        "position": {
            "leftHand": {
                "finger1": {
                    "key": "LA",
                    "status": "down",
                    "octave": 0
                },
                "finger2": {
                    "key": "SOL",
                    "status": "up",
                    "octave": 0
                },
                "finger3": {
                    "key": "FA",
                    "status": "up",
                    "octave": 0
                },
                "finger4": {
                    "key": "MI",
                    "status": "up",
                    "octave": 0
                },
                "finger5": {
                    "key": "RE",
                    "status": "up",
                    "octave": 0
                }
            },
            "rightHand": {
                "finger1": {
                    "key": "LA",
                    "status": "down",
                    "octave": 1
                },
                "finger2": {
                    "key": "SI",
                    "status": "up",
                    "octave": 1
                },
                "finger3": {
                    "key": "DO",
                    "status": "down",
                    "octave": 2
                },
                "finger4": {
                    "key": "RE",
                    "status": "up",
                    "octave": 2
                },
                "finger5": {
                    "key": "MI",
                    "status": "down",
                    "octave": 2
                }
            }
        }
    }, {
        "rightChord": "MI mineur",
        "leftChord": "MI",
        "id": 2,
        "time": 4,
        "position": {
            "leftHand": {
                "finger1": {
                    "key": "SI",
                    "status": "up",
                    "octave": 0
                },
                "finger2": {
                    "key": "LA",
                    "status": "up",
                    "octave": 0
                },
                "finger3": {
                    "key": "SOL",
                    "status": "up",
                    "octave": 0
                },
                "finger4": {
                    "key": "FA",
                    "status": "up",
                    "octave": 0
                },
                "finger5": {
                    "key": "MI",
                    "status": "down",
                    "octave": 0
                }
            },
            "rightHand": {
                "finger1": {
                    "key": "MI",
                    "status": "down",
                    "octave": 1
                },
                "finger2": {
                    "key": "FA",
                    "status": "up",
                    "octave": 1
                },
                "finger3": {
                    "key": "SOL",
                    "status": "down",
                    "octave": 1
                },
                "finger4": {
                    "key": "LA",
                    "status": "up",
                    "octave": 1
                },
                "finger5": {
                    "key": "SI",
                    "status": "down",
                    "octave": 1
                }
            }
        }
    },
    {
        "rightChord": "SI mineur 5-",
        "leftChord": "SI",
        "id": 2,
        "time": 4,
        "position": {
            "leftHand": {
                "finger1": {
                    "key": "SI",
                    "status": "down",
                    "octave": 0
                },
                "finger2": {
                    "key": "LA",
                    "status": "up",
                    "octave": 0
                },
                "finger3": {
                    "key": "SOL",
                    "status": "up",
                    "octave": 0
                },
                "finger4": {
                    "key": "FA",
                    "status": "up",
                    "octave": 0
                },
                "finger5": {
                    "key": "MI",
                    "status": "up",
                    "octave": 0
                }
            },
            "rightHand": {
                "finger1": {
                    "key": "SI",
                    "status": "down",
                    "octave": 1
                },
                "finger2": {
                    "key": "DO",
                    "status": "up",
                    "octave": 2
                },
                "finger3": {
                    "key": "RE",
                    "status": "down",
                    "octave": 2
                },
                "finger4": {
                    "key": "MI",
                    "status": "up",
                    "octave": 2
                },
                "finger5": {
                    "key": "FA",
                    "status": "down",
                    "octave": 2
                }
            }
        }
    },
    {
        "rightChord": "FA Majeur",
        "leftChord": "FA",
        "id": 2,
        "time": 4,
        "position": {
            "leftHand": {
                "finger1": {
                    "key": "DO",
                    "status": "up",
                    "octave": 1
                },
                "finger2": {
                    "key": "SI",
                    "status": "up",
                    "octave": 0
                },
                "finger3": {
                    "key": "LA",
                    "status": "up",
                    "octave": 0
                },
                "finger4": {
                    "key": "SOL",
                    "status": "up",
                    "octave": 0
                },
                "finger5": {
                    "key": "FA",
                    "status": "down",
                    "octave": 0
                }
            },
            "rightHand": {
                "finger1": {
                    "key": "FA",
                    "status": "down",
                    "octave": 1
                },
                "finger2": {
                    "key": "SOL",
                    "status": "up",
                    "octave": 1
                },
                "finger3": {
                    "key": "LA",
                    "status": "down",
                    "octave": 1
                },
                "finger4": {
                    "key": "SI",
                    "status": "up",
                    "octave": 1
                },
                "finger5": {
                    "key": "DO",
                    "status": "down",
                    "octave": 2
                }
            }
        }
    },
    {
        "rightChord": "DO Majeur",
        "leftChord": "DO8",
        "id": 2,
        "time": 4,
        "position": {
            "leftHand": {
                "finger1": {
                    "key": "DO",
                    "status": "down",
                    "octave": 1
                },
                "finger2": {
                    "key": "SI",
                    "status": "up",
                    "octave": 0
                },
                "finger3": {
                    "key": "LA",
                    "status": "up",
                    "octave": 0
                },
                "finger4": {
                    "key": "SOL",
                    "status": "up",
                    "octave": 0
                },
                "finger5": {
                    "key": "FA",
                    "status": "up",
                    "octave": 0
                }
            },
            "rightHand": {
                "finger1": {
                    "key": "DO",
                    "status": "down",
                    "octave": 2
                },
                "finger2": {
                    "key": "RE",
                    "status": "up",
                    "octave": 2
                },
                "finger3": {
                    "key": "MI",
                    "status": "down",
                    "octave": 2
                },
                "finger4": {
                    "key": "FA",
                    "status": "up",
                    "octave": 2
                },
                "finger5": {
                    "key": "SOL",
                    "status": "down",
                    "octave": 2
                }
            }
        }
    }

];


let i = 0;
let j = 0;
let k = 0;
let kr1 = ""
let kr2 = ""
let kr3 = ""
let kr4 = ""
let kr5 = ""
let kl1 = ""
let kl2 = ""
let kl3 = ""
let kl4 = ""
let kl5 = ""
let song;

/*step by step*/
function chord() {

    myTimer();
    i++;
    if (i == musiqueJSON.length) {
        i = 0;
    }

}

function nextChord() {
    if (k === 0) {
        i++;
        if (i == musiqueJSON.length) {
            i = 0;
        }
        myTimer();
    }
}


function previousChord() {
    if (k === 0) {

        i--;
        if (i < 0) {
            i = musiqueJSON.length - 1;
        }
        myTimer();

    }
}

function play() {
    if (k == 0) {
        if (i == 0) chord();
        k = 1;
        song = setInterval(chord, 2000);
    }
}

function stop() {
    k = 0;
    clearInterval(song);
}

/*control keyboard*/

document.getElementById("play").addEventListener("click", play);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("next").addEventListener("click", nextChord);
document.getElementById("previous").addEventListener("click", previousChord);
console.log(i);

/* */
var note = {
    "DO": "C",
    "RE": "D",
    "MI": "E",
    "FA": "F",
    "SOL": "G",
    "LA": "A",
    "SI": "B"
}


/*position a l'instant t*/
function myTimer() {

    if (j > 0) {
        document.querySelector(kr1).style.backgroundColor = "white";
        document.querySelector(kr2).style.backgroundColor = "white";
        document.querySelector(kr3).style.backgroundColor = "white";
        document.querySelector(kr4).style.backgroundColor = "white";
        document.querySelector(kr5).style.backgroundColor = "white";
        document.querySelector(kl1).style.backgroundColor = "white";
        document.querySelector(kl2).style.backgroundColor = "white";
        document.querySelector(kl3).style.backgroundColor = "white";
        document.querySelector(kl4).style.backgroundColor = "white";
        document.querySelector(kl5).style.backgroundColor = "white";
    }

    j++;

    document.querySelector('#rightFinger1 strong').innerHTML = musiqueJSON[i].position.rightHand.finger1.key;
    document.querySelector('#rightFinger1').className = musiqueJSON[i].position.rightHand.finger1.status;
    document.querySelector('#rightFinger1').style.backgroundColor = (musiqueJSON[i].position.rightHand.finger1.status === "down") ? "red" : "white";

    document.querySelector('#rightFinger2 strong').innerHTML = musiqueJSON[i].position.rightHand.finger2.key;
    document.querySelector('#rightFinger2').className = musiqueJSON[i].position.rightHand.finger2.status;
    document.querySelector('#rightFinger2').style.backgroundColor = (musiqueJSON[i].position.rightHand.finger2.status === "down") ? "red" : "white";

    document.querySelector('#rightFinger3 strong').innerHTML = musiqueJSON[i].position.rightHand.finger3.key;
    document.querySelector('#rightFinger3').className = musiqueJSON[i].position.rightHand.finger3.status;
    document.querySelector('#rightFinger3').style.backgroundColor = (musiqueJSON[i].position.rightHand.finger3.status === "down") ? "red" : "white";

    document.querySelector('#rightFinger4 strong').innerHTML = musiqueJSON[i].position.rightHand.finger4.key;
    document.querySelector('#rightFinger4').className = musiqueJSON[i].position.rightHand.finger4.status;
    document.querySelector('#rightFinger4').style.backgroundColor = (musiqueJSON[i].position.rightHand.finger4.status === "down") ? "red" : "white";

    document.querySelector('#rightFinger5 strong').innerHTML = musiqueJSON[i].position.rightHand.finger5.key;
    document.querySelector('#rightFinger5').className = musiqueJSON[i].position.rightHand.finger5.status;
    document.querySelector('#rightFinger5').style.backgroundColor = (musiqueJSON[i].position.rightHand.finger5.status === "down") ? "red" : "white";

    document.querySelector('.rightChord strong').innerHTML = musiqueJSON[i].rightChord;

    /*left*/
    document.querySelector('#leftFinger1 strong').innerHTML = musiqueJSON[i].position.leftHand.finger1.key;
    document.querySelector('#leftFinger1').className = musiqueJSON[i].position.leftHand.finger1.status;
    document.querySelector('#leftFinger1').style.backgroundColor = (musiqueJSON[i].position.leftHand.finger1.status === "down") ? "blue" : "white";


    document.querySelector('#leftFinger2 strong').innerHTML = musiqueJSON[i].position.leftHand.finger2.key;
    document.querySelector('#leftFinger2').className = musiqueJSON[i].position.leftHand.finger2.status;
    document.querySelector('#leftFinger2').style.backgroundColor = (musiqueJSON[i].position.leftHand.finger2.status === "down") ? "blue" : "white";

    document.querySelector('#leftFinger3 strong').innerHTML = musiqueJSON[i].position.leftHand.finger3.key;
    document.querySelector('#leftFinger3').className = musiqueJSON[i].position.leftHand.finger3.status;
    document.querySelector('#leftFinger3').style.backgroundColor = (musiqueJSON[i].position.leftHand.finger3.status === "down") ? "blue" : "white";

    document.querySelector('#leftFinger4 strong').innerHTML = musiqueJSON[i].position.leftHand.finger4.key;
    document.querySelector('#leftFinger4').className = musiqueJSON[i].position.leftHand.finger4.status;
    document.querySelector('#leftFinger4').style.backgroundColor = (musiqueJSON[i].position.leftHand.finger4.status === "down") ? "blue" : "white";

    document.querySelector('#leftFinger5 strong').innerHTML = musiqueJSON[i].position.leftHand.finger5.key;
    document.querySelector('#leftFinger5').className = musiqueJSON[i].position.leftHand.finger5.status;
    document.querySelector('#leftFinger5').style.backgroundColor = (musiqueJSON[i].position.leftHand.finger5.status === "down") ? "blue" : "white";


    document.querySelector('.leftChord strong').innerHTML = musiqueJSON[i].leftChord;

    /*clavier*/
    kr1 = "#" + musiqueJSON[i].position.rightHand.finger1.key + musiqueJSON[i].position.rightHand.finger1.octave;
    kr2 = "#" + musiqueJSON[i].position.rightHand.finger2.key + musiqueJSON[i].position.rightHand.finger2.octave;
    kr3 = "#" + musiqueJSON[i].position.rightHand.finger3.key + musiqueJSON[i].position.rightHand.finger3.octave;
    kr4 = "#" + musiqueJSON[i].position.rightHand.finger4.key + musiqueJSON[i].position.rightHand.finger4.octave;
    kr5 = "#" + musiqueJSON[i].position.rightHand.finger5.key + musiqueJSON[i].position.rightHand.finger5.octave;
    kl1 = "#" + musiqueJSON[i].position.leftHand.finger1.key + musiqueJSON[i].position.leftHand.finger1.octave;
    kl2 = "#" + musiqueJSON[i].position.leftHand.finger2.key + musiqueJSON[i].position.leftHand.finger2.octave;
    kl3 = "#" + musiqueJSON[i].position.leftHand.finger3.key + musiqueJSON[i].position.leftHand.finger3.octave;
    kl4 = "#" + musiqueJSON[i].position.leftHand.finger4.key + musiqueJSON[i].position.leftHand.finger4.octave;
    kl5 = "#" + musiqueJSON[i].position.leftHand.finger5.key + musiqueJSON[i].position.leftHand.finger5.octave;


    document.querySelector(kr1).style.backgroundColor = (musiqueJSON[i].position.rightHand.finger1.status === "down") ? "red" : "white";
    document.querySelector(kr2).style.backgroundColor = (musiqueJSON[i].position.rightHand.finger2.status === "down") ? "red" : "white";
    document.querySelector(kr3).style.backgroundColor = (musiqueJSON[i].position.rightHand.finger3.status === "down") ? "red" : "white";
    document.querySelector(kr4).style.backgroundColor = (musiqueJSON[i].position.rightHand.finger4.status === "down") ? "red" : "white";
    document.querySelector(kr5).style.backgroundColor = (musiqueJSON[i].position.rightHand.finger5.status === "down") ? "red" : "white";
    document.querySelector(kl1).style.backgroundColor = (musiqueJSON[i].position.leftHand.finger1.status === "down") ? "blue" : "white";
    document.querySelector(kl2).style.backgroundColor = (musiqueJSON[i].position.leftHand.finger2.status === "down") ? "blue" : "white";
    document.querySelector(kl3).style.backgroundColor = (musiqueJSON[i].position.leftHand.finger3.status === "down") ? "blue" : "white";
    document.querySelector(kl4).style.backgroundColor = (musiqueJSON[i].position.leftHand.finger4.status === "down") ? "blue" : "white";
    document.querySelector(kl5).style.backgroundColor = (musiqueJSON[i].position.leftHand.finger5.status === "down") ? "blue" : "white";

    /*note*/
    nr1 = (musiqueJSON[i].position.rightHand.finger5.status === "down") ? musiqueJSON[i].position.rightHand.finger1.key : "off" ;
    nr2 = (musiqueJSON[i].position.rightHand.finger5.status === "down") ? musiqueJSON[i].position.rightHand.finger2.key : "off" ;
    nr3 = (musiqueJSON[i].position.rightHand.finger5.status === "down") ? musiqueJSON[i].position.rightHand.finger3.key : "off" ;
    nr4 = (musiqueJSON[i].position.rightHand.finger5.status === "down") ? musiqueJSON[i].position.rightHand.finger4.key : "off" ;
    nr5 = (musiqueJSON[i].position.rightHand.finger5.status === "down") ? musiqueJSON[i].position.rightHand.finger5.key : "off" ;
    nl1 = (musiqueJSON[i].position.leftHand.finger1.status === "down") ? musiqueJSON[i].position.leftHand.finger1.key : "off" ;
    nl2 = (musiqueJSON[i].position.leftHand.finger2.status === "down") ? musiqueJSON[i].position.leftHand.finger2.key : "off" ;
    nl3 = (musiqueJSON[i].position.leftHand.finger3.status === "down") ? musiqueJSON[i].position.leftHand.finger3.key : "off" ;
    nl4 = (musiqueJSON[i].position.leftHand.finger4.status === "down") ? musiqueJSON[i].position.leftHand.finger4.key : "off" ;
    nl5 = (musiqueJSON[i].position.leftHand.finger5.status === "down") ? musiqueJSON[i].position.leftHand.finger5.key : "off" ;

    /*octave*/
    pr1 = musiqueJSON[i].position.rightHand.finger1.octave;
    pr2 = musiqueJSON[i].position.rightHand.finger2.octave;
    pr3 = musiqueJSON[i].position.rightHand.finger3.octave;
    pr4 = musiqueJSON[i].position.rightHand.finger4.octave;
    pr5 = musiqueJSON[i].position.rightHand.finger5.octave;
    pl1 = musiqueJSON[i].position.leftHand.finger1.octave;
    pl2 = musiqueJSON[i].position.leftHand.finger2.octave;
    pl3 = musiqueJSON[i].position.leftHand.finger3.octave;
    pl4 = musiqueJSON[i].position.leftHand.finger4.octave;
    pl5 = musiqueJSON[i].position.leftHand.finger5.octave;



    piano(note[nr1], pr1, 4);
    piano(note[nr2], pr2, 4);
    piano(note[nr3], pr3, 4);
    piano(note[nr4], pr4, 4);
    piano(note[nr5], pr5, 4);
    piano(note[nl1], pl1, 4);
    piano(note[nl2], pl2, 4);
    piano(note[nl3], pl3, 4);
    piano(note[nl4], pl4, 4);
    piano(note[nl5], pl5, 4);



    /*musiqueJSON[1].position.rightHand.finger1.status;*/

}