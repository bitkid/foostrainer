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
]

export interface PotentialNote {
    what: string,
    with: string | undefined,
    noteLine: string,
    direction: number
}

export const notesDisambiguation = new Map<number, PotentialNote[]>([
    [0, [{noteLine: "B", what: "B#", with: "#", direction: -1}, {noteLine: "C", what: "C", with: undefined, direction: 0}]],
    [1, [{noteLine: "C", what: "C#", with: "#", direction: 0}, {noteLine: "D", what: "Db", with: "b", direction: 0}]],
    [2, [{noteLine: "D", what: "D", with: undefined, direction: 0}]],
    [3, [{noteLine: "D", what: "D#", with: "#", direction: 0}, {noteLine: "E", what: "Eb", with: "b", direction: 0}]],
    [4, [{noteLine: "E", what: "E", with: undefined, direction: 0}, {noteLine: "F", what: "Fb", with: "b", direction: 0}]],
    [5, [{noteLine: "F", what: "F", with: undefined, direction: 0}, {noteLine: "E", what: "E#", with: "#", direction: 0}]],
    [6, [{noteLine: "F", what: "F#", with: "#", direction: 0}, {noteLine: "G", what: "Gb", with: "b", direction: 0}]],
    [7, [{noteLine: "G", what: "G", with: undefined, direction: 0}]],
    [8, [{noteLine: "G", what: "G#", with: "#", direction: 0}, {noteLine: "A", what: "Ab", with: "b", direction: 0}]],
    [9, [{noteLine: "A", what: "A", with: undefined, direction: 0}]],
    [10, [{noteLine: "A", what: "A#", with: "#", direction: 0}, {noteLine: "B", what: "Bb", with: "b", direction: 0}]],
    [11, [{noteLine: "B", what: "B", with: undefined, direction: 0}, {noteLine: "C", what: "Cb", with: "b", direction: 1}]],
])

export interface Scale {
    offset: number
    note: string
    enharmonic: string | undefined
    accidental: string | undefined,
    numAccidental: number,
    type: ScaleType
}

export enum ScaleType {
    MAJOR = "major", MINOR = "minor"
}

export const majorScalesMap: Map<string, Scale> = new Map<string, Scale>([
    ["C", {offset: 0, note: "C", enharmonic: undefined, accidental: undefined, numAccidental: 0, type: ScaleType.MAJOR}],
    ["C#", {offset: 1, note: "C#", enharmonic: "Db", accidental: "#", numAccidental: 7, type: ScaleType.MAJOR}],
    ["Db", {offset: 1, note: "Db", enharmonic: "C#", accidental: "b", numAccidental: 5, type: ScaleType.MAJOR}],
    ["D", {offset: 2, note: "D", enharmonic: undefined, accidental: "#", numAccidental: 2, type: ScaleType.MAJOR}],
    ["Eb", {offset: 3, note: "Eb", enharmonic: undefined, accidental: "b", numAccidental: 3, type: ScaleType.MAJOR}],
    ["E", {offset: 4, note: "E", enharmonic: undefined, accidental: "#", numAccidental: 4, type: ScaleType.MAJOR}],
    ["F", {offset: 5, note: "F", enharmonic: undefined, accidental: "b", numAccidental: 1, type: ScaleType.MAJOR}],
    ["F#", {offset: 6, note: "F#", enharmonic: "Gb", accidental: "#", numAccidental: 6, type: ScaleType.MAJOR}],
    ["Gb", {offset: 6, note: "Gb", enharmonic: "F#", accidental: "b", numAccidental: 6, type: ScaleType.MAJOR}],
    ["G", {offset: 7, note: "G", enharmonic: undefined, accidental: "#", numAccidental: 1, type: ScaleType.MAJOR}],
    ["Ab", {offset: 8, note: "Ab", enharmonic: undefined, accidental: "b", numAccidental: 4, type: ScaleType.MAJOR}],
    ["A", {offset: 9, note: "A", enharmonic: undefined, accidental: "#", numAccidental: 3, type: ScaleType.MAJOR}],
    ["Bb", {offset: 10, note: "Bb", enharmonic: undefined, accidental: "b", numAccidental: 2, type: ScaleType.MAJOR}],
    ["Cb", {offset: 11, note: "Cb", enharmonic: "B", accidental: "b", numAccidental: 7, type: ScaleType.MAJOR}],
    ["B", {offset: 11, note: "B", enharmonic: "Cb", accidental: "#", numAccidental: 5, type: ScaleType.MAJOR}]
])

export const majorScales: string[] = ["C", "C#", "Db", "D", "Eb", "E", "F", "F#", "Gb", "G", "Ab", "A", "Bb", "B", "Cb"]


export const minorScalesMap: Map<string, Scale> = new Map<string, Scale>([
    ["A", {offset: 9, note: "A", enharmonic: undefined, accidental: undefined, numAccidental: 0, type: ScaleType.MINOR}],
    ["D", {offset: 2, note: "D", enharmonic: undefined, accidental: "b", numAccidental: 1, type: ScaleType.MINOR}],
    ["G", {offset: 7, note: "G", enharmonic: undefined, accidental: "b", numAccidental: 2, type: ScaleType.MINOR}],
    ["C", {offset: 0, note: "C", enharmonic: undefined, accidental: "b", numAccidental: 3, type: ScaleType.MINOR}],
    ["F", {offset: 5, note: "F", enharmonic: undefined, accidental: "b", numAccidental: 4, type: ScaleType.MINOR}],
    ["Bb", {offset: 10, note: "Bb", enharmonic: undefined, accidental: "b", numAccidental: 5, type: ScaleType.MINOR}],
    ["Eb", {offset: 3, note: "Eb", enharmonic: "D#", accidental: "b", numAccidental: 6, type: ScaleType.MINOR}],
    ["D#", {offset: 3, note: "D#", enharmonic: "Eb", accidental: "#", numAccidental: 6, type: ScaleType.MINOR}],
    ["G#", {offset: 8, note: "G#", enharmonic: undefined, accidental: "#", numAccidental: 5, type: ScaleType.MINOR}],
    ["C#", {offset: 1, note: "C#", enharmonic: undefined, accidental: "#", numAccidental: 4, type: ScaleType.MINOR}],
    ["F#", {offset: 6, note: "F#", enharmonic: undefined, accidental: "#", numAccidental: 3, type: ScaleType.MINOR}],
    ["B", {offset: 11, note: "B", enharmonic: undefined, accidental: "#", numAccidental: 2, type: ScaleType.MINOR}],
    ["E", {offset: 4, note: "E", enharmonic: undefined, accidental: "#", numAccidental: 1, type: ScaleType.MINOR}]
])

export const minorScales: string[] = ["A", "D", "G", "C", "F", "Bb", "Eb", "D#", "G#", "C#", "F#", "B", "E"]


export const allSharps: string[] = ["F#", "C#", "G#", "D#", "A#", "E#", "B#"]
export const allFlats: string[] = ["Bb", "Eb", "Ab", "Db", "Gb", "Cb", "Fb"]

export const majorIntervals: number[] = [0, 2, 4, 5, 7, 9, 11]

export const majorIntervalHalfTone = [[3, 4], [7, 8]]

export const minorIntervals: number[] = [0, 2, 3, 5, 7, 8, 10]

export const minorIntervalHalfTone = [[2, 3], [5, 6]]

export interface Song {
    scaleTones: number[],
    name: string,
    halfTones: number[]
}

export const bruderJakobSong: Song = {scaleTones: [1, 2, 3], name: "Bruder Jakob", halfTones: [0, 2, 4]}
export const zylinderHutSong: Song = {scaleTones: [3, 2, 1], name: "Zylinder Hut", halfTones: [4, 2, 0]}
export const vogelSong: Song = {scaleTones: [3, 4, 5], name: "Kommt ein Vogel", halfTones: [4, 5, 7]}
export const bundesHymneSong: Song = {scaleTones: [5, 4, 3], name: "Bundeshymne", halfTones: [7, 5, 4]}
export const paukeSong: Song = {scaleTones: [3, 1], name: "Pauke", halfTones: [4, 0]}
export const abcSong: Song = {scaleTones: [1, 5], name: "ABC", halfTones: [0, 7]}
export const beethovenSong: Song = {scaleTones: [3, 1], name: "Beethoven", halfTones: [4, 0]}
export const miauSong: Song = {scaleTones: [5, 15], name: "Miau", halfTones: [7, 16]}
export const geigeSong: Song = {scaleTones: [5, 12], name: "Geige", halfTones: [7, 12]}
export const mozartSong: Song = {scaleTones: [12, 5], name: "Mozart", halfTones: [12, 7]}
export const usaSong: Song = {scaleTones: [5, 3, 1], name: "USA", halfTones: [7, 4, 0]}
export const wachetAufSong: Song = {scaleTones: [1, 3, 5], name: "Wachet auf", halfTones: [0, 4, 7]}
export const kuckuckSong: Song = {scaleTones: [5, 3], name: "Kuckuck", halfTones: [7, 4]}
export const vogelHochzeitSong: Song = {scaleTones: [3, 5], name: "Vogelhochzeit", halfTones: [4, 7]}


export const songStart: Song[] = [bruderJakobSong, zylinderHutSong, vogelSong, bundesHymneSong, paukeSong, abcSong, beethovenSong, miauSong,
    geigeSong, mozartSong, usaSong, wachetAufSong, kuckuckSong, vogelHochzeitSong]

