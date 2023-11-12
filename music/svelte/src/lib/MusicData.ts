import {StaveNote} from "vexflow";

export interface Note {
    name: string
    midiNote: number
}

export const notes: Note[] = [
    {name: "C", midiNote: 60},
    {name: "C# (Db)", midiNote: 61},
    {name: "D", midiNote: 62},
    {name: "D# (Eb)", midiNote: 63},
    {name: "E", midiNote: 64},
    {name: "F", midiNote: 65},
    {name: "F# (Gb)", midiNote: 66},
    {name: "G", midiNote: 67},
    {name: "G# (Ab)", midiNote: 68},
    {name: "A", midiNote: 69},
    {name: "A# (B)", midiNote: 70},
    {name: "H", midiNote: 71}
];

export const scales: string[] = ["C", "C#", "Db", "D", "Eb", "E", "F", "F#", "Gb", "G", "Ab", "A", "Bb", "B"];

export const notesNoSign: string[][] = [
    ["C"],
    ["C", "D"],
    ["D"],
    ["D", "E"],
    ["E"],
    ["F"],
    ["F", "G"],
    ["G"],
    ["G", "A"],
    ["A"],
    ["A", "B"],
    ["B"]
];

export interface Scale {
    offset: number
    note: string
    enharmonic: string | undefined
    accidental: string | undefined,
    numAccidental: number
}

export const majorScalesMap: Map<string, Scale> = new Map<string, Scale>([
    ["C", {offset: 0, note: "C", enharmonic: undefined, accidental: undefined, numAccidental: 0}],
    ["C#", {offset: 1, note: "C#", enharmonic: "Db", accidental: "#", numAccidental: 7}],
    ["Db", {offset: 1, note: "Db", enharmonic: "C#", accidental: "b", numAccidental: 5}],
    ["D", {offset: 2, note: "D", enharmonic: undefined, accidental: "#", numAccidental: 2}],
    ["Eb", {offset: 3, note: "Eb", enharmonic: undefined, accidental: "b", numAccidental: 3}],
    ["E", {offset: 4, note: "E", enharmonic: undefined, accidental: "#", numAccidental: 4}],
    ["F", {offset: 5, note: "F", enharmonic: undefined, accidental: "b", numAccidental: 1}],
    ["F#", {offset: 6, note: "F#", enharmonic: "Gb", accidental: "#", numAccidental: 6}],
    ["Gb", {offset: 6, note: "Gb", enharmonic: "F#", accidental: "b", numAccidental: 6}],
    ["G", {offset: 7, note: "G", enharmonic: undefined, accidental: "#", numAccidental: 1}],
    ["Ab", {offset: 8, note: "Ab", enharmonic: undefined, accidental: "b", numAccidental: 4}],
    ["A", {offset: 9, note: "A", enharmonic: undefined, accidental: "#", numAccidental: 3}],
    ["Bb", {offset: 10, note: "Bb", enharmonic: undefined, accidental: "b", numAccidental: 2}],
    ["Cb", {offset: 11, note: "Cb", enharmonic: "B", accidental: "b", numAccidental: 7}],
    ["B", {offset: 11, note: "B", enharmonic: "Cb", accidental: "#", numAccidental: 5}]
])

export const majorCircleOf5thsRight: string[] = ["G", "D", "A", "E", "B", "F#", "C#"];
export const majorCircleOf5thsLeft: string[] = ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];

export interface Song {
    scaleTones: number[],
    name: string,
    halfTones: number[]
}

export const bruderJakobSong: Song = {scaleTones: [1, 2, 3], name: "Bruder Jakob", halfTones: [0, 2, 4]};
export const zylinderHutSong: Song = {scaleTones: [3, 2, 1], name: "Zylinder Hut", halfTones: [4, 2, 0]};
export const vogelSong: Song = {scaleTones: [3, 4, 5], name: "Kommt ein Vogel", halfTones: [4, 5, 7]};
export const bundesHymneSong: Song = {scaleTones: [5, 4, 3], name: "Bundeshymne", halfTones: [7, 5, 4]};
export const paukeSong: Song = {scaleTones: [3, 1], name: "Pauke", halfTones: [4, 0]};
export const abcSong: Song = {scaleTones: [1, 5], name: "ABC", halfTones: [0, 7]};
export const beethovenSong: Song = {scaleTones: [3, 1], name: "Beethoven", halfTones: [4, 0]};
export const miauSong: Song = {scaleTones: [5, 15], name: "Miau", halfTones: [7, 16]};
export const geigeSong: Song = {scaleTones: [5, 12], name: "Geige", halfTones: [7, 12]};
export const mozartSong: Song = {scaleTones: [12, 5], name: "Mozart", halfTones: [12, 7]};
export const usaSong: Song = {scaleTones: [5, 3, 1], name: "USA", halfTones: [7, 4, 0]};
export const wachetAufSong: Song = {scaleTones: [1, 3, 5], name: "Wachet auf", halfTones: [0, 4, 7]};
export const kuckuckSong: Song = {scaleTones: [5, 3], name: "Kuckuck", halfTones: [7, 4]};
export const vogelHochzeitSong: Song = {scaleTones: [3, 5], name: "Vogelhochzeit", halfTones: [4, 7]};


export const songStart: Song[] = [bruderJakobSong, zylinderHutSong, vogelSong, bundesHymneSong, paukeSong, abcSong, beethovenSong, miauSong,
    geigeSong, mozartSong, usaSong, wachetAufSong, kuckuckSong, vogelHochzeitSong];

export class SongBeginning {
    private _song: Song = vogelSong;

    constructor(clef: string, scale: string, song: Song) {
        this._clef = clef;
        this._scale = scale;
        this._song = song;
    }

    private _clef: string = "treble";

    get clef(): string {
        return this._clef;
    }

    private _scale: string = "C#";

    get scale(): string {
        return this._scale;
    }

    public static getRandomClef(): string {
        if (Math.random() < 0.5) {
            return "treble";
        } else {
            return "bass";
        }
    }

    public static getRandomScale(): string {
        let r = Math.floor(Math.random() * scales.length);
        return scales[r];
    }

    public static getRandomSong(): Song {
        let r = Math.floor(Math.random() * songStart.length);
        return songStart[r];
    }

    randomize() {
        this._song = SongBeginning.getRandomSong();
        this._scale = SongBeginning.getRandomScale();
        this._clef = SongBeginning.getRandomClef();
    }

    getMidiNotes(): number[] {
        let scalesMapElement = majorScalesMap.get(this._scale)!!;
        return this._song.halfTones.map((x) => 60 + scalesMapElement.offset + x);
    }

    getScaleRootMidiNote(): number {
        return 60 + majorScalesMap.get(this._scale)!!.offset;
    }

    getStaveNotes(): StaveNote[] {
        return this.getMidiNotes().map((x) => this.getStaveNoteForValue(x));
    }

    getSongDescription(): string {
        return this._song.name + " in " + this._scale + " [" + this._song.scaleTones + "]";
    }

    scaleContains(note: number) {
        const scale = majorScalesMap.get(this._scale)!!;
    }

    private getStaveNoteForValue(val: number): StaveNote {
        let n = notesNoSign[val % 12];
        let octave = Math.floor(val / 12) - 1;
        let note;
        if (n.length === 1) {
            note = n[0];
        } else {
            let sign = majorScalesMap.get(this._scale)!!.accidental;
            if (sign === "#") {
                note = n[0];
            } else {
                note = n[1];
            }
        }
        return new StaveNote({keys: [note + "/" + octave], duration: "q"});
    }
}