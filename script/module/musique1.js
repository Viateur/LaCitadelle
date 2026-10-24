
let listNote =["DO","DOd","RE","REd","MI","FA","FAd","SOL","SOLd","LA","LAd","SI"]

let noteToOrder =
    {
        "DO": 1,
        "DOd": 2,
        "RE":3,
        "REd": 4,
        "MI": 5,
        "FA": 6,
        "FAd": 7,
        "SOL": 8,
        "SOLd": 9,
        "LA": 10,
        "LAd": 11,
        "SI": 12
    };


let chordType ={
    "Majeur": [1,5,8],
    "mineur": [1,4,8],
    "sus2":[1,3,8],
    "sus":[1,6,8],
    "6": [1,6,10],
    "note":[1],
    "quinte+":[1,5,9],
    "dim":[1,4,7],
    "4":[1,5,6,8],
    "ma7":[1,5,8,12],
    "m7":[1,4,8,11],
    "7":[1,5,8,11],
    "mineur5+":[1,4,9],
    "5":[1,8],
    "2":[1,3,5,8],
    "m2":[1,3,4,8],
    "m4":[1,4,6,8],
    "m6":[1,4,8,10],
    "m(maj7)":[1,4,8,12],
    "7sus":[1,6,8,11],
    "ma7(b5)":[1,5,7,12],
    "ma7(#5)":[1,5,9,12],
    "m7(b5)":[1,4,7,11],
    "dim7":[1,4,7,10],
    "7(b5)":[1,5,7,11],
    "7(#5)":[1,5,9,11]
};

let duration={
    "r" : 4, // ronde
    "b": 2, // blanche
    "n" : 1, // noire
    "c": 0.5 // croche
};


let plaquage ={
    "ioioi":[1,0,1,0,1],
    "iiooi":[1,1,0,0,1],
    "iooii":[1,0,0,1,1],
    "ioooo":[1,0,0,0,0],
    "oiooo":[0,1,0,0,0],
    "ooioo":[0,0,1,0,0],
    "oooio":[0,0,0,1,0],
    "ooooi":[0,0,0,0,1],
    "iiioi":[1,1,1,0,1]
}

export function createChord ( baseNote, chordTypeName, baseOctave, myPlaquage){
    let octave;
    let chord = [];
    let chord_current_type_after_plaquage =[] ;
    let chord_current_type = chordType [chordTypeName];
    let current_plaquage = plaquage[myPlaquage];
    let position = noteToOrder[baseNote];
    let nb = chord_current_type.length;
    let cp=0;

    current_plaquage.forEach((plaq) =>{
        if(plaq == 1){
            let x  =  chord_current_type[cp];
            chord_current_type_after_plaquage.push(x);
            cp++;
            } else{
            chord_current_type_after_plaquage.push(0);
        }
    })
    cp =0;
    console.log(chord_current_type_after_plaquage);

    chord_current_type_after_plaquage.forEach((type) =>{

            let notePosition = type+(position-2);
            let noteName;
            let currentNote;

            if(type != 0){

                if(notePosition < 12){
                    octave =baseOctave
                    noteName =listNote[notePosition];
                } else{
                    octave =baseOctave+1;
                    noteName =listNote[notePosition-12];
                }
                currentNote = {
                    "key": noteName,
                    "status": "down",
                    "octave": octave

                };
            } else {
                currentNote = {
                    "key": "",
                    "status": "up",
                    "octave": octave
                };
            }
            chord.push(currentNote)
            console.log(chord);
        })
    return chord;
}

function leftChord (baseNote, chordTypeName, baseOctave, myPlaquage){

    let chord = createChord ( baseNote, chordTypeName, baseOctave, myPlaquage)
    return {
        "fingers": {
            "finger5": chord[0],
            "finger4": chord[1],
            "finger3": chord[2],
            "finger2": chord[3],
            "finger1": chord[4]
        },
        "name": baseNote+chordTypeName
    };
}

function rightChord (baseNote, chordTypeName, baseOctave, myPlaquage){

    let chord = createChord ( baseNote, chordTypeName, baseOctave, myPlaquage)
    return {
        "fingers": {
            "finger1": chord[0],
            "finger2": chord[1],
            "finger3": chord[2],
            "finger4": chord[3],
            "finger5": chord[4]
        },
        "name": baseNote+chordTypeName
    };
}

function chord (leftChord, rightChord, arpegio, time){
    return     {
        "rightChord": rightChord.name,
        "leftChord": leftChord.name,
        "time": time,
        "arpegio":arpegio,
        "position": {
            "leftHand":leftChord.fingers ,
            "rightHand": rightChord.fingers
        }
    };
}


function chord1 (note,octave,time,finger){
    rightChord.name ="";
    leftChord.name ="";
    let arpegio = time[time];
    let position= {finger: {
            "key": note,
            "status": "down",
            "octave": octave
        }
    };

    return     {
        "rightChord": rightChord.name,
        "leftChord": leftChord.name,
        "time": time,
        "arpegio":arpegio,
        "position": position
    };
}


let arpegio8 = [
    {note :["L1" ], duration: 8},
    {note :["silence"], duration: 1},
    {note :["L1" ], duration: 8},
    {note :["silence"], duration: 1},
    {note :["R1"], duration: 8},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["R1"], duration: 16},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["R3"], duration: 16},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["R1"], duration: 16},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["R5"], duration: 16},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1},
    {note :["silence"], duration: 1}
]


export let musique1 =[
{
    "rightChord": "Do Majeur",
    "leftChord": "Do Majeur",
    "id": 1,
    "time": 4,
    "arpegio":arpegio8,
    "position": {
        "L1": {
            "key": "SOL",
                "status": "down",
                "octave": 0
        },
        "L2": {
            "key": "FA",
                "status": "up",
                "octave": 0
        },
        "L3": {
            "key": "MI",
                "status": "down",
                "octave": 0
        },
        "L4": {
            "key": "RE",
                "status": "up",
                "octave": 0
        },
        "L5": {
            "key": "DO",
                "status": "down",
                "octave": 0
        },
        "R1": {
            "key": "DO",
                "status": "down",
                "octave": 1
        },
        "R2": {
               "key": "RE",
                "status": "up",
                "octave": 1
        },
        "R3": {
                "key": "MI",
                "status": "down",
                "octave": 1
        },
        "R4": {
            "key": "FA",
                "status": "up",
                "octave": 1
        },
        "R5": {
            "key": "SOL",
                "status": "down",
                "octave": 1
        }
    }
}];
