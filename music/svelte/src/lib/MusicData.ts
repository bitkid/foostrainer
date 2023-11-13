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

interface CanBe {
    what: string,
    with: string | undefined,
    noteLine: string
}

export const notesDisambiguation = new Map<number, CanBe[]>([
    [0, [{noteLine: "B", what: "B#", with: "#"}, {noteLine: "C", what: "C", with: undefined}]],
    [1, [{noteLine: "C", what: "C#", with: "#"}, {noteLine: "D", what: "Db", with: "b"}]],
    [2, [{noteLine: "D", what: "D", with: undefined}]],
    [3, [{noteLine: "D", what: "D#", with: "#"}, {noteLine: "E", what: "Eb", with: "b"}]],
    [4, [{noteLine: "E", what: "E", with: undefined}, {noteLine: "F", what: "Fb", with: "b"}]],
    [5, [{noteLine: "F", what: "F", with: undefined}, {noteLine: "E", what: "E#", with: "#"}]],
    [6, [{noteLine: "F", what: "F#", with: "#"}, {noteLine: "G", what: "Gb", with: "b"}]],
    [7, [{noteLine: "G", what: "G", with: undefined}]],
    [8, [{noteLine: "G", what: "G#", with: "#"}, {noteLine: "A", what: "Ab", with: "b"}]],
    [9, [{noteLine: "A", what: "A", with: undefined}]],
    [10, [{noteLine: "A", what: "A#", with: "#"}, {noteLine: "B", what: "Bb", with: "b"}]],
    [11, [{noteLine: "B", what: "B", with: undefined}, {noteLine: "C", what: "Cb", with: "b"}]],
]);

export const scales: string[] = ["C", "C#", "Db", "D", "Eb", "E", "F", "F#", "Gb", "G", "Ab", "A", "Bb", "B"];

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

export const majorCircleOf5thsSharp: string[] = ["F#", "C#", "G#", "D#", "A#", "E#", "B#"];
export const majorCircleOf5thsFlat: string[] = ["Bb", "Eb", "Ab", "Db", "Gb", "Cb", "Fb"];

export const majorIntervals: number[] = [0, 2, 4, 5, 7, 9, 11];

export class ScaleHelper {
    public static getNotesForScale(scale: Scale): string[] {
        let accidentals: string[];
        if (scale.accidental == undefined) {
            accidentals = [];
        } else if (scale.accidental == "#") {
            accidentals = majorCircleOf5thsSharp.slice(0, scale.numAccidental);
        } else {
            accidentals = majorCircleOf5thsFlat.slice(0, scale.numAccidental);
        }
        return majorIntervals.map((i: number): CanBe => {
            const canBees = notesDisambiguation.get((i + scale.offset) % 12)!!;
            if (accidentals.length == 0) {
                const cb = canBees.filter((x) => x.with == undefined)
                if (cb.length != 1)
                    throw new Error()
                return cb[0];
            } else {
                const cb = canBees.filter((x) => accidentals.indexOf(x.what) != -1)
                if (cb.length == 1)
                    return cb[0];
                const cb1 = canBees.filter((x) => x.with === undefined)
                if (cb1.length != 1)
                    throw new Error()
                return cb1[0];
            }
        }).map((c) => c.what);
    }
}

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
    private readonly _song: Song = vogelSong;
    private readonly _scaleNotes: string[];
    private readonly _clef: string;
    private readonly _scale: string;

    constructor(clef: string, scale: string, song: Song) {
        this._clef = clef;
        this._scale = scale;
        this._song = song;
        this._scaleNotes = ScaleHelper.getNotesForScale(majorScalesMap.get(this._scale)!!);
    }

    public static getRandom(): SongBeginning {
        return new SongBeginning(SongBeginning.getRandomClef(), SongBeginning.getRandomScale(), SongBeginning.getRandomSong());
    }

    get clef(): string {
        return this._clef;
    }


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

    private getStaveNoteForValue(val: number): StaveNote {
        const n = notesDisambiguation.get(val % 12)!!;
        const octave = Math.floor(val / 12) - 1;
        const notes = n.filter((x) => this._scaleNotes.indexOf(x.what) !== -1)
        if (notes.length != 1)
            throw Error();
        return new StaveNote({keys: [notes[0].noteLine + "/" + octave], duration: "q"});
    }
}