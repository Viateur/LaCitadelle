import {createChord, musique1} from './module/musique1.js'

var Synth, AudioSynth, AudioSynthInstrument;


! function() {
    var URL = window.URL || window.webkitURL;
    var Blob = window.Blob;

    if (!URL || !Blob) {

        throw new Error('This browser does not support AudioSynth');
    }

    var _encapsulated = false;

    var AudioSynthInstance = null;

    var pack = function(c, arg) {
        return [new Uint8Array([arg, arg >> 8]), new Uint8Array([arg, arg >> 8, arg >> 16, arg >> 24])][c];
    };

    var setPrivateVar = function(n, v, w, e) {
        Object.defineProperty(this, n, {
            value: v,
            writable: !!w,
            enumerable: !!e
        });
    };

    var setPublicVar = function(n, v, w) {
        setPrivateVar.call(this, n, v, w, true);
    };

    AudioSynthInstrument = function AudioSynthInstrument() {

        this.__init__.apply(this, arguments);

    };

    var setPriv = setPrivateVar.bind(AudioSynthInstrument.prototype);

    var setPub = setPublicVar.bind(AudioSynthInstrument.prototype);

    //Private methode  __init__
    setPriv('__init__', function(a, b, c) {
        if (!_encapsulated) {
            throw new Error('AudioSynthInstrument can only be instantiated from the createInstrument method of the AudioSynth object.');
        }
        setPrivateVar.call(this, '_parent', a);
        setPublicVar.call(this, 'name', b);
        setPrivateVar.call(this, '_soundID', c);
    });


    // public methode play
    setPub('play', function(note, octave, duration) {
        if (note != undefined)
            return this._parent.play(this._soundID, note, octave, duration);
    });

    //public methode generate
    setPub('generate', function(note, octave, duration) {
        return this._parent.generate(this._soundID, note, octave, duration);
    });


    AudioSynth = function AudioSynth() {

        if (AudioSynthInstance instanceof AudioSynth) {
            return AudioSynthInstance;
        } else {
            this.__init__();
            return this;
        }
    };

    setPriv = setPrivateVar.bind(AudioSynth.prototype);

    setPub = setPublicVar.bind(AudioSynth.prototype);

    setPriv('_debug', false, true);

    setPriv('_bitsPerSample', 16);

    setPriv('_channels', 1);

    setPriv('_sampleRate', 44100, true);

    setPub('setSampleRate', function(v) {
        this._sampleRate = Math.max(Math.min(v | 0, 44100), 4000);
        this._clearCache();
        return this._sampleRate;
    });

    setPub('getSampleRate', function() {
        return this._sampleRate;
    });

    setPriv('_volume', 32768, true);

    setPub('setVolume', function(v) {
        v = parseFloat(v);
        if (isNaN(v)) {
            v = 0;
        }
        v = Math.round(v * 32768);
        this._volume = Math.max(Math.min(v | 0, 32768), 0);
        this._clearCache();
        return this._volume;
    });

    setPub('getVolume', function() {
        return Math.round(this._volume / 32768 * 10000) / 10000;
    });

    setPriv('_notes', {
        'C': 261.63,
        'C#': 277.18,
        'D': 293.66,
        'D#': 311.13,
        'E': 329.63,
        'F': 346.23,
        'F#': 369.99,
        'G': 392.00,
        'G#': 415.30,
        'A': 440.00,
        'A#': 466.16,
        'B': 493.88
    });

    setPriv('_fileCache', [], true);

    setPriv('_temp', {}, true);

    setPriv('_sounds', [], true);

    setPriv('_mod', [function(i, s, f, x) {
        return Math.sin((2 * Math.PI) * (i / s) * f + x);
    }]);

    setPriv('_resizeCache', function() {
        var f = this._fileCache;
        var l = this._sounds.length;

        while (f.length < l) {
            var octaveList = [];
            for (var i = 0; i < 8; i++) {
                var noteList = {};
                for (var k in this._notes) {
                    noteList[k] = {};
                }
                octaveList.push(noteList);
            }
            f.push(octaveList);
        }
    });

    setPriv('_clearCache', function() {
        this._fileCache = [];
        this._resizeCache();
    });

    setPub('generate', function(sound, note, octave, duration) {
        var thisSound = this._sounds[sound];

        console.log(thisSound);

        // search the sound in database
        if (!thisSound) {
            for (var i = 0; i < this._sounds.length; i++) {
                if (this._sounds[i].name == sound) {
                    thisSound = this._sounds[i];
                    sound = i;
                    break;
                }
            }
        }

        // execute this statement if sound no found in date base
        if (!thisSound) {
            throw new Error('Invalid sound or sound ID: ' + sound);
        }



        var t = (new Date).valueOf(); // start time in timestamp.


        this._temp = {};

        octave |= 0;


        octave = Math.min(8, Math.max(1, octave)); // if octave > 8 , octave = 8; if octave < 1 so octave = 1


        var time = !duration ? 2 : parseFloat(duration); // if duration is undefined, duration = 2 and affect to time variable 


        // test if note exist.
        if (typeof(this._notes[note]) == 'undefined') {
            throw new Error(note + ' is not a valid note.');
        }


        if (typeof(this._fileCache[sound][octave - 1][note][time]) != 'undefined') {

            if (this._debug) {
                console.log((new Date).valueOf() - t, 'ms to retrieve (cached)');
            }
            return this._fileCache[sound][octave - 1][note][time];

        } else {

            var frequency = this._notes[note] * Math.pow(2, octave - 4);
            var sampleRate = this._sampleRate;
            var volume = this._volume;
            var channels = this._channels;
            var bitsPerSample = this._bitsPerSample;

            var attack = thisSound.attack(sampleRate, frequency, volume);
            var dampen = thisSound.dampen(sampleRate, frequency, volume);
            var waveFunc = thisSound.wave;
            var waveBind = {
                modulate: this._mod,
                vars: this._temp
            };
            var val = 0;
            var curVol = 0;

            var data = new Uint8Array(new ArrayBuffer(Math.ceil(sampleRate * time * 2)));
            var attackLen = (sampleRate * attack) | 0;
            var decayLen = (sampleRate * time) | 0;

            for (var i = 0 | 0; i !== attackLen; i++) {

                val = volume * (i / (sampleRate * attack)) * waveFunc.call(waveBind, i, sampleRate, frequency, volume);

                data[i << 1] = val;
                data[(i << 1) + 1] = val >> 8;

            }

            for (; i !== decayLen; i++) {

                val = volume * Math.pow((1 - ((i - (sampleRate * attack)) / (sampleRate * (time - attack)))), dampen) * waveFunc.call(waveBind, i, sampleRate, frequency, volume);

                data[i << 1] = val;
                data[(i << 1) + 1] = val >> 8;

            }

            var out = [
                'RIFF',
                pack(1, 4 + (8 + 24 /* chunk 1 length */ ) + (8 + 8 /* chunk 2 length */ )), // Length
                'WAVE',
                // chunk 1
                'fmt ', // Sub-chunk identifier
                pack(1, 16), // Chunk length
                pack(0, 1), // Audio format (1 is linear quantization)
                pack(0, channels),
                pack(1, sampleRate),
                pack(1, sampleRate * channels * bitsPerSample / 8), // Byte rate
                pack(0, channels * bitsPerSample / 8),
                pack(0, bitsPerSample),
                // chunk 2
                'data', // Sub-chunk identifier
                pack(1, data.length * channels * bitsPerSample / 8), // Chunk length
                data
            ];


            var blob = new Blob(out, {
                type: 'audio/wav'
            });

            var dataURI = URL.createObjectURL(blob);

            this._fileCache[sound][octave - 1][note][time] = dataURI;

            console.log((new Date).valueOf() - t, 'ms to generate');

            if (this._debug) {
                console.log((new Date).valueOf() - t, 'ms to generate');
            }

            return dataURI;
        }
    });

    setPub('play', function(sound, note, octave, duration) {
        var src = this.generate(sound, note, octave, duration);
        var audio = new Audio(src);
        audio.play();
        return true;
    });

    setPub('debug', function() {
        this._debug = true;
    });

    setPub('createInstrument', function(sound) {
        var n = 0;
        var found = false;
        if (typeof(sound) == 'string') {
            for (var i = 0; i < this._sounds.length; i++) {
                if (this._sounds[i].name == sound) {
                    found = true;
                    n = i;
                    break;
                }
            }
        } else {
            if (this._sounds[sound]) {
                n = sound;
                sound = this._sounds[n].name;
                found = true;
            }
        }
        if (!found) {
            throw new Error('Invalid sound or sound ID: ' + sound);
        }
        _encapsulated = true;
        var ins = new AudioSynthInstrument(this, sound, n);
        _encapsulated = false;
        return ins;
    });


    setPub('listSounds', function() {
        var r = [];
        for (var i = 0; i < this._sounds.length; i++) {
            r.push(this._sounds[i].name);
        }
        return r;
    });


    setPriv('__init__', function() {
        this._resizeCache();
    });


    setPub('loadSoundProfile', function() {
        for (var i = 0, len = arguments.length; i < len; i++) {
            let o;
            o = arguments[i];
            if (!(o instanceof Object)) {
                throw new Error('Invalid sound profile.');
            }
            this._sounds.push(o);
        }
        this._resizeCache();
        return true;
    });


    setPub('loadModulationFunction', function() {
        for (var i = 0, len = arguments.length; i < len; i++) {
            let f;
            f = arguments[i];
            if (typeof(f) != 'function') {
                throw new Error('Invalid modulation function.');
            }
            this._mod.push(f);
        }
        return true;
    });


    AudioSynthInstance = new AudioSynth();
    Synth = AudioSynthInstance;

}();


// end of function
/********************************************************/
var myVar;

function startMelodie() {

    var cpt = 0;
    var tab = [{
        note: 'C',
        dur: 4
    }, {
        note: 'G',
        dur: 4
    }, {
        note: 'D',
        dur: 4
    }, {
        note: 'A',
        dur: 4
    }];

    function myTimer(i) {
        var piano = Synth.createInstrument('piano');
        piano.play(tab[i].note, 5, tab[i].dur);
        var piano2 = Synth.createInstrument('piano');
        piano2.play('C', 4, tab[i].dur);
    }

    myVar = setInterval(
        function() {
            myTimer(cpt);
            cpt++;
            if (cpt === tab.length) cpt = 0;
        }, tab[cpt].dur * 300);


} //end loop

function stopMelodie() {
    clearInterval(myVar); // DON'T WORK
}


function playNote1() {
    console.log("hello")
    var piano = Synth.createInstrument('piano');
    piano.play('C', 5, 4);
    piano.play('E', 5, 4);
    piano.play('G', 5, 4);
}

function playNote2() {
    console.log("hello")
    var piano = Synth.createInstrument('piano');
    piano.play('D', 5, 1);
}

/*******************************************************/
Synth.loadModulationFunction(
    function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
    },
    function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
    },
    function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
    },
    function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
    },
    function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
    },
    function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
    },
    function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
    },
    function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
    },
    function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
    },
    function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
    }
);

Synth.loadSoundProfile({
    name: 'piano',
    attack: function() {
        return 0.002;
    },
    dampen: function(sampleRate, frequency, volume) {
        return Math.pow(0.5 * Math.log((frequency * volume) / sampleRate), 2);
    },
    wave: function(i, sampleRate, frequency, volume) {
        var base = this.modulate[0];
        return this.modulate[1](
            i,
            sampleRate,
            frequency,
            Math.pow(base(i, sampleRate, frequency, 0), 2) +
            (0.75 * base(i, sampleRate, frequency, 0.25)) +
            (0.1 * base(i, sampleRate, frequency, 0.5))
        );
    }
}, {
    name: 'pianoCustom',
    attack: function() {
        return 0.02;
    },
    dampen: function(sampleRate, frequency, volume) {
        return Math.pow(0.5 * Math.log((frequency * volume) / sampleRate), 3.5);
    },
    wave: function(i, sampleRate, frequency, volume) {
        var base = this.modulate[0];
        return this.modulate[1](
            i,
            sampleRate,
            frequency,
            Math.pow(base(i, sampleRate, frequency, 0), 50) +
            (1 * base(i, sampleRate, frequency, 0.25)) +
            (0.7 * base(i, sampleRate, frequency, 0.5))
        );
    }
}, {
    name: 'organ',
    attack: function() {
        return 0.3
    },
    dampen: function(sampleRate, frequency) {
        return 1 + (frequency * 0.01);
    },
    wave: function(i, sampleRate, frequency) {
        var base = this.modulate[0];
        return this.modulate[1](
            i,
            sampleRate,
            frequency,
            base(i, sampleRate, frequency, 0) +
            0.5 * base(i, sampleRate, frequency, 0.25) +
            0.25 * base(i, sampleRate, frequency, 0.5)
        );
    }
}, {
    name: 'acoustic',
    attack: function() {
        return 0.002;
    },
    dampen: function() {
        return 1;
    },
    wave: function(i, sampleRate, frequency) {

        var vars = this.vars;
        vars.valueTable = !vars.valueTable ? [] : vars.valueTable;
        if (typeof(vars.playVal) == 'undefined') {
            vars.playVal = 0;
        }
        if (typeof(vars.periodCount) == 'undefined') {
            vars.periodCount = 0;
        }

        var valueTable = vars.valueTable;
        var playVal = vars.playVal;
        var periodCount = vars.periodCount;

        var period = sampleRate / frequency;
        var p_hundredth = Math.floor((period - Math.floor(period)) * 100);

        var resetPlay = false;

        if (valueTable.length <= Math.ceil(period)) {

            valueTable.push(Math.round(Math.random()) * 2 - 1);

            return valueTable[valueTable.length - 1];

        } else {

            valueTable[playVal] = (valueTable[playVal >= (valueTable.length - 1) ? 0 : playVal + 1] + valueTable[playVal]) * 0.5;

            if (playVal >= Math.floor(period)) {
                if (playVal < Math.ceil(period)) {
                    if ((periodCount % 100) >= p_hundredth) {
                        // Reset
                        resetPlay = true;
                        valueTable[playVal + 1] = (valueTable[0] + valueTable[playVal + 1]) * 0.5;
                        vars.periodCount++;
                    }
                } else {
                    resetPlay = true;
                }
            }
            var _return = valueTable[playVal];
            if (resetPlay) {
                vars.playVal = 0;
            } else {
                vars.playVal++;
            }
            return _return;
        }
    }
}, {
    name: 'edm',
    attack: function() {
        return 0.002;
    },
    dampen: function() {
        return 1;
    },
    wave: function(i, sampleRate, frequency) {
        var base = this.modulate[0];
        var mod = this.modulate.slice(1);
        return mod[0](
            i,
            sampleRate,
            frequency,
            mod[9](
                i,
                sampleRate,
                frequency,
                mod[2](
                    i,
                    sampleRate,
                    frequency,
                    Math.pow(base(i, sampleRate, frequency, 0), 3) +
                    Math.pow(base(i, sampleRate, frequency, 0.5), 5) +
                    Math.pow(base(i, sampleRate, frequency, 1), 7)
                )
            ) +
            mod[8](
                i,
                sampleRate,
                frequency,
                base(i, sampleRate, frequency, 1.75)
            )
        );
    }
});

let musiqueJSON = musique1;

let i = 0;/* compteur dans la liste des accords*/
let j = 0;/* compteur du l'execution des accords */
let k = 0; /* k==0 stop et k==1 play*/
let l = 0; /*compteur des note de l'arpege*/
let t =0; /*durée du prochain cycle */
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

let kr1p = ""
let kr2p = ""
let kr3p = ""
let kr4p = ""
let kr5p = ""
let kl1p = ""
let kl2p = ""
let kl3p = ""
let kl4p = ""
let kl5p = ""
let song;
let songArpegio;
let songArpegioStep;
let songArpegioStepNext;
let songArpegioStepPrevious;
let reg="([d])";
let keyboard = ["DO","RE", "MI", "FA", "SOL","LA", "SI", "DOd", "REd", "FAd", "SOLd", "LAd"];
let octaveNumber = [0,1,2];
let cycleDuration = 150;

var instrument = Synth.createInstrument('pianoCustom');
/*step by step*/
function chord() {

    myTimer();
    i++;
    if (i === musiqueJSON.length) {
        i = 0;
    }

}

function chordArpegioStep() {
    console.log("chordArpegioStep"+i);
    console.log("chordArpegioStep note "+l);
    t++;
    myTimerArpegioStep();
    if (i == musiqueJSON.length) {
        i = 0;
    }
}

function chordArpegioStepPrevious() {
    console.log("chordArpegioStep Previous"+i);
    console.log("chordArpegioStepPrevious note "+l);
    myTimerArpegioStep();
    if (i == musiqueJSON.length) {
        i = 0;
    }
    if (l == musiqueJSON[i].arpegio.length) {
        clearInterval(songArpegioStepPrevious);
    }
}

function chordArpegioStepNext() {
    console.log("chordArpegioStepNext"+i);
    console.log("chordArpegioStepNext note "+l);
    myTimerArpegioStep();
    if (i == musiqueJSON.length) {
        i = 0;
    }
    if (l == musiqueJSON[i].arpegio.length) {
        clearInterval(songArpegioStepNext);
    }
}


function nextChordArpegio() {
    /* se lance uniquement si le stop est activé donc k==0*/
    if (k === 0) {
        i++;
        if (i == musiqueJSON.length) {
            i = 0;
        }
        l=0;
        songArpegioStepNext = setInterval(chordArpegioStepNext, 250);
    }
}



function previousChordArpegio() {
    /* se lance uniquement si le stop est activé donc k==0*/
    if (k === 0) {
        i--;
        if (i < 0) {
            i = musiqueJSON.length - 1;
        }
        l=0;
        songArpegioStepPrevious = setInterval(chordArpegioStepPrevious, 250);
    }
}


function playArpegioStep() {
    console.log("play arpegio step"+i);
    /* se lance seulement si le stop est activé cad k ==0 */
    if (k == 0) {
        if (i == 0) chordArpegioStep();
        k = 1;
        songArpegioStep = setInterval(chordArpegioStep, cycleDuration);
    }
}

function playArpegio() {
    console.log("play arpegio"+i);
    playArpegioStep();
}


function stopArpegio() {
    k = 0; /* inndicateur que stop est activé*/
    clearInterval(songArpegio);
    clearInterval(songArpegioStep);
    /* button stop active*/
}


/*control keyboard*/

document.getElementById("play").addEventListener("click", playArpegio);
document.getElementById("stop").addEventListener("click", stopArpegio);
document.getElementById("next").addEventListener("click", nextChordArpegio);
document.getElementById("previous").addEventListener("click", previousChordArpegio);
console.log(i);

/* */
var note = {
    "DO": "C",
    "DOd":"C#",
    "RE": "D",
    "REd": "D#",
    "MI": "E",
    "FA": "F",
    "FAd": "F#",
    "SOL": "G",
    "SOLd": "G#",
    "LA": "A",
    "LAd": "A#",
    "SI": "B",
    "off":undefined
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

    document.querySelector('#rightFinger1 strong').innerHTML = musiqueJSON[i].position.R1.key;
    document.querySelector('#rightFinger1').className = musiqueJSON[i].position.R1.status;
    document.querySelector('#rightFinger1').style.backgroundColor = (musiqueJSON[i].position.R1.status === "down") ? "red" : "white";

    document.querySelector('#rightFinger2 strong').innerHTML = musiqueJSON[i].position.R2.key;
    document.querySelector('#rightFinger2').className = musiqueJSON[i].position.R2.status;
    document.querySelector('#rightFinger2').style.backgroundColor = (musiqueJSON[i].position.R2.status === "down") ? "red" : "white";

    document.querySelector('#rightFinger3 strong').innerHTML = musiqueJSON[i].position.R3.key;
    document.querySelector('#rightFinger3').className = musiqueJSON[i].position.R3.status;
    document.querySelector('#rightFinger3').style.backgroundColor = (musiqueJSON[i].position.R3.status === "down") ? "red" : "white";

    document.querySelector('#rightFinger4 strong').innerHTML = musiqueJSON[i].position.R4.key;
    document.querySelector('#rightFinger4').className = musiqueJSON[i].position.R4.status;
    document.querySelector('#rightFinger4').style.backgroundColor = (musiqueJSON[i].position.R4.status === "down") ? "red" : "white";

    document.querySelector('#rightFinger5 strong').innerHTML = musiqueJSON[i].R5.key;
    document.querySelector('#rightFinger5').className = musiqueJSON[i].position.R5.status;
    document.querySelector('#rightFinger5').style.backgroundColor = (musiqueJSON[i].position.R5.status === "down") ? "red" : "white";

    document.querySelector('.rightChord strong').innerHTML = musiqueJSON[i].rightChord;

    /*left*/
    document.querySelector('#leftFinger1 strong').innerHTML = musiqueJSON[i].position.L1.key;
    document.querySelector('#leftFinger1').className = musiqueJSON[i].position.L1.status;
    document.querySelector('#leftFinger1').style.backgroundColor = (musiqueJSON[i].position.L1.status === "down") ? "blue" : "white";


    document.querySelector('#leftFinger2 strong').innerHTML = musiqueJSON[i].position.L2.key;
    document.querySelector('#leftFinger2').className = musiqueJSON[i].position.L2.status;
    document.querySelector('#leftFinger2').style.backgroundColor = (musiqueJSON[i].position.L2.status === "down") ? "blue" : "white";

    document.querySelector('#leftFinger3 strong').innerHTML = musiqueJSON[i].position.L3.key;
    document.querySelector('#leftFinger3').className = musiqueJSON[i].position.L3.status;
    document.querySelector('#leftFinger3').style.backgroundColor = (musiqueJSON[i].position.L3.status === "down") ? "blue" : "white";

    document.querySelector('#leftFinger4 strong').innerHTML = musiqueJSON[i].position.L4.key;
    document.querySelector('#leftFinger4').className = musiqueJSON[i].position.L4.status;
    document.querySelector('#leftFinger4').style.backgroundColor = (musiqueJSON[i].position.L4.status === "down") ? "blue" : "white";

    document.querySelector('#leftFinger5 strong').innerHTML = musiqueJSON[i].position.L5.key;
    document.querySelector('#leftFinger5').className = musiqueJSON[i].position.L5.status;
    document.querySelector('#leftFinger5').style.backgroundColor = (musiqueJSON[i].position.L5.status === "down") ? "blue" : "white";


    document.querySelector('.leftChord strong').innerHTML = musiqueJSON[i].leftChord;

    /*clavier*/
    kr1 = "#" + musiqueJSON[i].position.R1.key + musiqueJSON[i].position.R1.octave;
    kr2 = "#" + musiqueJSON[i].position.R2.key + musiqueJSON[i].position.R2.octave;
    kr3 = "#" + musiqueJSON[i].position.R3.key + musiqueJSON[i].position.R3.octave;
    kr4 = "#" + musiqueJSON[i].position.R4.key + musiqueJSON[i].position.R4.octave;
    kr5 = "#" + musiqueJSON[i].position.R5.key + musiqueJSON[i].position.R5.octave;
    kl1 = "#" + musiqueJSON[i].position.L1.key + musiqueJSON[i].position.L1.octave;
    kl2 = "#" + musiqueJSON[i].position.L2.key + musiqueJSON[i].position.L2.octave;
    kl3 = "#" + musiqueJSON[i].position.L3.key + musiqueJSON[i].position.L3.octave;
    kl4 = "#" + musiqueJSON[i].position.L4.key + musiqueJSON[i].position.L4.octave;
    kl5 = "#" + musiqueJSON[i].position.L5.key + musiqueJSON[i].position.L5.octave;


    document.querySelector(kr1).style.backgroundColor = (musiqueJSON[i].position.R1.status === "down") ? "red" : "white";
    document.querySelector(kr2).style.backgroundColor = (musiqueJSON[i].position.R2.status === "down") ? "red" : "white";
    document.querySelector(kr3).style.backgroundColor = (musiqueJSON[i].position.R3.status === "down") ? "red" : "white";
    document.querySelector(kr4).style.backgroundColor = (musiqueJSON[i].position.R4.status === "down") ? "red" : "white";
    document.querySelector(kr5).style.backgroundColor = (musiqueJSON[i].position.R5.status === "down") ? "red" : "white";
    document.querySelector(kl1).style.backgroundColor = (musiqueJSON[i].position.L1.status === "down") ? "blue" : "white";
    document.querySelector(kl2).style.backgroundColor = (musiqueJSON[i].position.L2.status === "down") ? "blue" : "white";
    document.querySelector(kl3).style.backgroundColor = (musiqueJSON[i].position.L3.status === "down") ? "blue" : "white";
    document.querySelector(kl4).style.backgroundColor = (musiqueJSON[i].position.L4.status === "down") ? "blue" : "white";
    document.querySelector(kl5).style.backgroundColor = (musiqueJSON[i].position.L5.status === "down") ? "blue" : "white";

    /*note*/
    let nr1 = (musiqueJSON[i].position.R1.status === "down") ? musiqueJSON[i].position.R1.key : "off" ;
    let nr2 = (musiqueJSON[i].position.R2.status === "down") ? musiqueJSON[i].position.R2.key : "off" ;
    let nr3 = (musiqueJSON[i].position.R3.status === "down") ? musiqueJSON[i].position.R3.key : "off" ;
    let nr4 = (musiqueJSON[i].position.R4.status === "down") ? musiqueJSON[i].position.R4.key : "off" ;
    let nr5 = (musiqueJSON[i].position.R5.status === "down") ? musiqueJSON[i].position.R5.key : "off" ;
    let nl1 = (musiqueJSON[i].position.L1.status === "down") ? musiqueJSON[i].position.L1.key : "off" ;
    let nl2 = (musiqueJSON[i].position.L2.status === "down") ? musiqueJSON[i].position.L2.key : "off" ;
    let nl3 = (musiqueJSON[i].position.L3.status === "down") ? musiqueJSON[i].position.L3.key : "off" ;
    let nl4 = (musiqueJSON[i].position.L4.status === "down") ? musiqueJSON[i].position.L4.key : "off" ;
    let nl5 = (musiqueJSON[i].position.L5.status === "down") ? musiqueJSON[i].position.L5.key : "off" ;


    /*octave*/
    let pr1 = musiqueJSON[i].position.R1.octave + 3;
    let pr2 = musiqueJSON[i].position.R2.octave + 3;
    let pr3 = musiqueJSON[i].position.R3.octave + 3;
    let pr4 = musiqueJSON[i].position.R4.octave + 3;
    let pr5 = musiqueJSON[i].position.R5.octave + 3;
    let pl1 = musiqueJSON[i].position.L1.octave + 3;
    let pl2 = musiqueJSON[i].position.L2.octave + 3;
    let pl3 = musiqueJSON[i].position.L3.octave + 3;
    let pl4 = musiqueJSON[i].position.L4.octave + 3;
    let pl5 = musiqueJSON[i].position.L5.octave + 3;



    var instrument = Synth.createInstrument('pianoCustom');
    instrument.play(note[nr1], pr1, 8);
    instrument.play(note[nr2], pr2, 8);
    instrument.play(note[nr3], pr3, 8);
    instrument.play(note[nr4], pr4, 8);
    instrument.play(note[nr5], pr5, 8);
    instrument.play(note[nl1], pl1, 8);
    instrument.play(note[nl2], pl2, 8);
    instrument.play(note[nl3], pl3, 8);
    instrument.play(note[nl4], pl4, 8);
    instrument.play(note[nl5], pl5, 8);



    /*musiqueJSON[1].position.rightHand.finger1.status;*/

}


function jeu(finger) {


        let fingerNotes = finger.note;
        let fingerDuration = finger.duration;

    fingerNotes.forEach((fingerNote) => {
        switch (fingerNote) {

             case 'R1':

                /*doigt*/
                 if(musiqueJSON[i].position.R1.status === "down") {
                document.querySelector('#rightFinger1 strong').innerHTML = musiqueJSON[i].position.R1.key;
                document.querySelector('#rightFinger1').className = musiqueJSON[i].position.R1.status;
                if(document.querySelector('#rightFinger1').style.backgroundColor==="tomato"){
                    document.querySelector('#rightFinger1').style.backgroundColor = (musiqueJSON[i].position.R1.status === "down") ? "magenta" : "white";
                }
                else{
                    document.querySelector('#rightFinger1').style.backgroundColor = (musiqueJSON[i].position.R1.status === "down") ? "tomato" : "white";
                }
                /*clavier*/

                     if( document.querySelector(kr1).style.backgroundColor==="tomato"){
                         document.querySelector(kr1).style.backgroundColor = (musiqueJSON[i].position.R1.status === "down") ? "magenta" : "white";

                     }else{
                         document.querySelector(kr1).style.backgroundColor = (musiqueJSON[i].position.R1.status === "down") ? "tomato" : "white";
                     }


                /*note*/
                let nr1 = (musiqueJSON[i].position.R1.status === "down") ? musiqueJSON[i].position.R1.key : "off" ;
                /*octave*/
                let pr1 = musiqueJSON[i].position.R1.octave + 2;
                /*generation du son*/
                instrument.play(note[nr1], pr1, fingerDuration);
                 }
                break;


            case 'R2':
                if(musiqueJSON[i].position.R2.status === "down") {
                /*doigt*/
                document.querySelector('#rightFinger2 strong').innerHTML = musiqueJSON[i].position.R2.key;
                document.querySelector('#rightFinger2').className = musiqueJSON[i].position.R2.status;
                document.querySelector('#rightFinger2').style.backgroundColor = (musiqueJSON[i].position.R2.status === "down") ? "red" : "white";
                /*clavier*/
                document.querySelector(kr2).style.backgroundColor = (musiqueJSON[i].position.R2.status === "down") ? "red" : "white";
                /*note*/
                let nr2 = (musiqueJSON[i].position.rightHand.finger2.status === "down") ? musiqueJSON[i].position.R2.key : "off" ;
                /*octave*/
                let pr2 = musiqueJSON[i].position.R2.octave + 2;
                /*generation du son*/
                instrument.play(note[nr2], pr2, fingerDuration);
                }
                break;

            case 'R3':
                if(musiqueJSON[i].position.R3.status === "down") {
                /*doigt*/
                document.querySelector('#rightFinger3 strong').innerHTML = musiqueJSON[i].position.R3.key;
                document.querySelector('#rightFinger3').className = musiqueJSON[i].position.R3.status;
                document.querySelector('#rightFinger3').style.backgroundColor = (musiqueJSON[i].position.R3.status === "down") ? "red" : "white";
                /*clavier*/
                document.querySelector(kr3).style.backgroundColor = (musiqueJSON[i].position.R3.status === "down") ? "red" : "white";
                /*note*/
                let nr3 = (musiqueJSON[i].position.R3.status === "down") ? musiqueJSON[i].position.R3.key : "off" ;
                /*octave*/
                let pr3 = musiqueJSON[i].position.R3.octave + 2;
                /*generation du son*/
                instrument.play(note[nr3], pr3, fingerDuration);
                }
                break;


            case 'R4':
                if(musiqueJSON[i].position.R4.status === "down") {
                /*doigt*/
                document.querySelector('#rightFinger4 strong').innerHTML = musiqueJSON[i].position.R4.key;
                document.querySelector('#rightFinger4').className = musiqueJSON[i].position.R4.status;
                document.querySelector('#rightFinger4').style.backgroundColor = (musiqueJSON[i].position.R4.status === "down") ? "red" : "white";
                /*clavier*/
                document.querySelector(kr4).style.backgroundColor = (musiqueJSON[i].position.R4.status === "down") ? "red" : "white";
                /*note*/
                let nr4 = (musiqueJSON[i].position.R4.status === "down") ? musiqueJSON[i].position.R4.key : "off" ;
                /*octave*/
                let pr4 = musiqueJSON[i].position.R4.octave + 2;
                /*generation du son*/
                instrument.play(note[nr4], pr4, fingerDuration);
                }
                break;

            case 'R5':
                if(musiqueJSON[i].position.R5.status === "down") {
                /*doigt*/
                document.querySelector('#rightFinger5 strong').innerHTML = musiqueJSON[i].position.R5.key;
                document.querySelector('#rightFinger5').className = musiqueJSON[i].position.R5.status;
                document.querySelector('#rightFinger5').style.backgroundColor = (musiqueJSON[i].position.R5.status === "down") ? "red" : "white";
                /*clavier*/
                document.querySelector(kr5).style.backgroundColor = (musiqueJSON[i].position.R5.status === "down") ? "red" : "white";
                /*note*/
                let nr5 = (musiqueJSON[i].position.R5.status === "down") ? musiqueJSON[i].position.R5.key : "off" ;
                /*octave*/
                let pr5 = musiqueJSON[i].position.R5.octave + 2;
                /*generation du son*/
                instrument.play(note[nr5], pr5, fingerDuration);
                }
                break;

            case 'L1':
                if(musiqueJSON[i].position.L1.status === "down"){
                    /*doigt*/
                document.querySelector('#leftFinger1 strong').innerHTML = musiqueJSON[i].position.L1.key;
                document.querySelector('#leftFinger1').className = musiqueJSON[i].position.L1.status;
                document.querySelector('#leftFinger1').style.backgroundColor = (musiqueJSON[i].position.L1.status === "down") ? "blue" : "white";
                /*clavier*/
                document.querySelector(kl1).style.backgroundColor = (musiqueJSON[i].position.L1.status === "down") ? "blue" : "white";
                /*note*/
                let nl1 = (musiqueJSON[i].position.L1.status === "down") ? musiqueJSON[i].position.L1.key : "off" ;
                /*octave*/
                let pl1 = musiqueJSON[i].position.L1.octave + 2;
                /*generation du son*/
                instrument.play(note[nl1], pl1, fingerDuration);
                }
                break;

            case 'L2':
                if(musiqueJSON[i].position.L2.status === "down"){
                /*doigt*/
                document.querySelector('#leftFinger2 strong').innerHTML = musiqueJSON[i].position.L2.key;
                document.querySelector('#leftFinger2').className = musiqueJSON[i].position.L2.status;
                document.querySelector('#leftFinger2').style.backgroundColor = (musiqueJSON[i].position.L2.status === "down") ? "blue" : "white";
                /*clavier*/
                document.querySelector(kl2).style.backgroundColor = (musiqueJSON[i].position.L2.status === "down") ? "blue" : "white";
                /*note*/
                let nl2 = (musiqueJSON[i].position.L2.status === "down") ? musiqueJSON[i].position.L2.key : "off" ;
                /*octave*/
                let pl2 = musiqueJSON[i].position.L2.octave + 2;
                /*generation du son*/
                instrument.play(note[nl2], pl2, fingerDuration);
                }
                break;


            case 'L3':
                    if(musiqueJSON[i].position.L3.status === "down"){
                /*doigt*/
                document.querySelector('#leftFinger3 strong').innerHTML = musiqueJSON[i].position.L3.key;
                document.querySelector('#leftFinger3').className = musiqueJSON[i].position.L3.status;
                document.querySelector('#leftFinger3').style.backgroundColor = (musiqueJSON[i].position.L3.status === "down") ? "blue" : "white";
                /*clavier*/
                console.log("finger 3 down");
                document.querySelector(kl3).style.backgroundColor = (musiqueJSON[i].position.L3.status === "down") ? "blue" : "white";
                /*note*/
                let nl3 = (musiqueJSON[i].position.L3.status === "down") ? musiqueJSON[i].position.L3.key : "off" ;
                /*octave*/
                let pl3 = musiqueJSON[i].position.L3.octave + 2;
                /*generation du son*/
                instrument.play(note[nl3], pl3, fingerDuration);
                    }
                break;


            case 'L4':
                        if(musiqueJSON[i].position.L4.status === "down"){
                /*doigt*/
                document.querySelector('#leftFinger4 strong').innerHTML = musiqueJSON[i].position.L4.key;
                document.querySelector('#leftFinger4').className = musiqueJSON[i].position.L4.status;
                document.querySelector('#leftFinger4').style.backgroundColor = (musiqueJSON[i].position.L4.status === "down") ? "blue" : "white";
                /*clavier*/
                document.querySelector(kl4).style.backgroundColor = (musiqueJSON[i].position.L4.status === "down") ? "blue" : "white";
                /*note*/
                let nl4 = (musiqueJSON[i].position.L4.status === "down") ? musiqueJSON[i].position.L4.key : "off" ;
                /*octave*/
                let pl4 = musiqueJSON[i].position.L4.octave + 2;
                /*generation du son*/
                instrument.play(note[nl4], pl4, fingerDuration);
                        }
                break;


            case 'L5':
                            if(musiqueJSON[i].position.L5.status === "down"){
                /*doigt*/
                document.querySelector('#leftFinger5 strong').innerHTML = musiqueJSON[i].position.L5.key;
                document.querySelector('#leftFinger5').className = musiqueJSON[i].position.L5.status;
                document.querySelector('#leftFinger5').style.backgroundColor = (musiqueJSON[i].position.L5.status === "down") ? "blue" : "white";
                /*clavier*/
                document.querySelector(kl5).style.backgroundColor = (musiqueJSON[i].position.L5.status === "down") ? "blue" : "white";
                /*note*/
                let nl5 = (musiqueJSON[i].position.L5.status === "down") ? musiqueJSON[i].position.L5.key : "off" ;
                /*octave*/
                let pl5 = musiqueJSON[i].position.L5.octave + 2;
                /*generation du son*/
                instrument.play(note[nl5], pl5, fingerDuration);
                            }
                break;

            case 'silence':
                break;

            default:
             console.log("Sorry"+finger+" not found");

        }
    });

}


function myTimerArpegioStep() {

    console.log("myTimerArpegioStep"+i)
    if(i==musiqueJSON.length) /*Si je ne suis au premier accord */
    {
        i=0;
    }

        if(i==0) /*Si je ne suis au premier accord */
    {
        if (j == 0)
            /*Et Si on est au debut d'un arpege */
        {
            console.log("clear1"+l);
            /* Alors je reinitialise les touches du clavier jouer précédement a la fin de la boucle*/
            keyboard.forEach((n) =>  {
                octaveNumber.forEach((oct) =>  {
                    /*ecalcule de locator des touches du clavier jouer */
                    let k ="#"+n+oct
                    // reinitialiser tout le clavier
                    document.querySelector(k).style.backgroundColor = (k.match(reg))?"black":"white";
                });
            });


            /* Et je renitialise  le doigté */

            document.querySelector('#rightFinger1').style.backgroundColor ="transparent";
            document.querySelector('#rightFinger2').style.backgroundColor ="transparent";
            document.querySelector('#rightFinger3').style.backgroundColor ="transparent";
            document.querySelector('#rightFinger4').style.backgroundColor ="transparent";
            document.querySelector('#rightFinger5').style.backgroundColor ="transparent";
            document.querySelector('#leftFinger1').style.backgroundColor ="transparent";
            document.querySelector('#leftFinger2').style.backgroundColor ="transparent";
            document.querySelector('#leftFinger3').style.backgroundColor ="transparent";
            document.querySelector('#leftFinger4').style.backgroundColor ="transparent";
            document.querySelector('#leftFinger5').style.backgroundColor ="transparent";

        }
    }

    if(i>0) /*Si je ne suis pas au premier accord */
          {
          if (j == 0) /*Et Si on est au debut d'un arpege */
                {
                console.log("clear1"+l);
                    /* Alors je reinitialise les touches du clavier jouer précédement a la fin de la boucle*/
                    keyboard.forEach((n) =>  {
                        octaveNumber.forEach((oct) =>  {
                            /*ecalcule de locator des touches du clavier jouer */
                            let k ="#"+n+oct
                            // reinitialiser tout le clavier
                            document.querySelector(k).style.backgroundColor = (k.match(reg))?"black":"white";
                        });
                    });


                    document.querySelector('#rightFinger1').style.backgroundColor ="transparent";
                    document.querySelector('#rightFinger2').style.backgroundColor ="transparent";
                    document.querySelector('#rightFinger3').style.backgroundColor ="transparent";
                    document.querySelector('#rightFinger4').style.backgroundColor ="transparent";
                    document.querySelector('#rightFinger5').style.backgroundColor ="transparent";
                    document.querySelector('#leftFinger1').style.backgroundColor ="transparent";
                    document.querySelector('#leftFinger2').style.backgroundColor ="transparent";
                    document.querySelector('#leftFinger3').style.backgroundColor ="transparent";
                    document.querySelector('#leftFinger4').style.backgroundColor ="transparent";
                    document.querySelector('#leftFinger5').style.backgroundColor ="transparent";

                }
         }

                /*clavier courant*/
                kr1 = "#" + musiqueJSON[i].position.R1.key + musiqueJSON[i].position.R1.octave;
                kr2 = "#" + musiqueJSON[i].position.R2.key + musiqueJSON[i].position.R2.octave;
                kr3 = "#" + musiqueJSON[i].position.R3.key + musiqueJSON[i].position.R3.octave;
                kr4 = "#" + musiqueJSON[i].position.R4.key + musiqueJSON[i].position.R4.octave;
                kr5 = "#" + musiqueJSON[i].position.R5.key + musiqueJSON[i].position.R5.octave;
                kl1 = "#" + musiqueJSON[i].position.L1.key + musiqueJSON[i].position.L1.octave;
                kl2 = "#" + musiqueJSON[i].position.L2.key + musiqueJSON[i].position.L2.octave;
                kl3 = "#" + musiqueJSON[i].position.L3.key + musiqueJSON[i].position.L3.octave;
                kl4 = "#" + musiqueJSON[i].position.L4.key + musiqueJSON[i].position.L4.octave;
                kl5 = "#" + musiqueJSON[i].position.L5.key + musiqueJSON[i].position.L5.octave;

                /* j'affiche les accord a jouer */
                document.querySelector('.rightChord strong').innerHTML = musiqueJSON[i].rightChord;
                document.querySelector('.leftChord strong').innerHTML = musiqueJSON[i].leftChord;

    let finger = musiqueJSON[i].arpegio[l];
    jeu (finger); /* recupere le jeuxx de l'accord*/

    l++; /* compteur des notes de l'arpege*/
    j++;

    if (l == musiqueJSON[i].arpegio.length) {
               console.log("clear2"+l)
             l=0; /*reinitialiser le tableau du modele d'arpege*/
             i++; /* passer à l'accord suivant */
             j=0;
             t=0;
    }

    k=0;
}


