import {StaveNote} from "vexflow"
import type {Song} from "$lib/MusicData"
import {majorScalesMap, notesDisambiguation} from "$lib/MusicData"
import {ScaleHelper} from "$lib/ScaleHelper"

export class SongBeginning {
    private readonly _song: Song
    private readonly _scaleNotes: string[]
    private readonly _clef: string
    private readonly _scale: string
    private readonly _clefOffset: number

    constructor(clef: string, scale: string, song: Song) {
        this._clef = clef
        this._scale = scale
        this._song = song
        this._scaleNotes = ScaleHelper.getNotes(majorScalesMap.get(this._scale)!!)
        if (this._clef == "treble")
            this._clefOffset = 60
        else
            this._clefOffset = 36
    }

    get clef(): string {
        return this._clef
    }

    get scale(): string {
        return this._scale
    }

    public static getStaveNoteForValue(val: number, scaleNotes: string[], clef: string = "treble"): StaveNote {
        const n = notesDisambiguation.get(val % 12)!!
        const notes = n.filter((x) => scaleNotes.indexOf(x.what) !== -1)
        if (notes.length != 1)
            throw Error("there should be exactly one note matching but found" + notes)
        const actualNote = notes[0]
        const octave = SongBeginning.getOctaveForValue(val + actualNote.direction)
        return new StaveNote({keys: [actualNote.noteLine + "/" + octave], duration: "q", clef: clef})
    }

    public static getOctaveForValue(val: number): number {
        return Math.floor(val / 12) - 1
    }

    getMidiNotes(): number[] {
        let scalesMapElement = majorScalesMap.get(this._scale)!!
        return this._song.halfTones.map((x) => this._clefOffset + scalesMapElement.offset + x)
    }

    getScaleRootMidiNote(): number {
        return this._clefOffset + majorScalesMap.get(this._scale)!!.offset
    }

    getStaveNotes(): StaveNote[] {
        return this.getMidiNotes().map((x) => this.getStaveNoteForValue(x))
    }

    getSongDescription(): string {
        return this._song.name + " [" + this._song.scaleTones + "] in " + this._scale
    }

    private getStaveNoteForValue(val: number): StaveNote {
        return SongBeginning.getStaveNoteForValue(val, this._scaleNotes, this._clef)
    }
}