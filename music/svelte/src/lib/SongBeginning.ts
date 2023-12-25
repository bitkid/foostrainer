import type {StaveNote} from "vexflow"
import type {Song} from "$lib/MusicData"
import {majorScalesMap} from "$lib/MusicData"
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
        return ScaleHelper.getStaveNoteForValue(val, this._scaleNotes, this._clef)
    }
}