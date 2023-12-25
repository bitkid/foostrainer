import type {StaveNote} from "vexflow"
import type {Scale, Song} from "$lib/MusicData"
import {ScaleHelper} from "$lib/ScaleHelper"

export class SongBeginning {
    private readonly _song: Song
    private readonly _scaleNotes: string[]
    private readonly _clef: string
    private readonly _scale: Scale
    private readonly _clefOffset: number

    constructor(clef: string, scale: Scale, song: Song) {
        this._clef = clef
        this._scale = scale
        this._song = song
        this._scaleNotes = ScaleHelper.getNotes(this._scale)
        if (this._clef == "treble")
            this._clefOffset = 60
        else
            this._clefOffset = 36
    }

    get clef(): string {
        return this._clef
    }

    get scale(): Scale {
        return this._scale
    }

    getMidiNotes(): number[] {
        return this._song.halfTones.map((x) => this._clefOffset + this._scale.offset + x)
    }

    getScaleRootMidiNote(): number {
        return this._clefOffset + this._scale.offset
    }

    getStaveNotes(): StaveNote[] {
        return this.getMidiNotes().map((x) => this.getStaveNoteForValue(x))
    }

    getSongDescription(): string {
        return this._song.name + " [" + this._song.scaleTones + "] in " + ScaleHelper.getScaleName(this._scale)
    }

    private getStaveNoteForValue(val: number): StaveNote {
        return ScaleHelper.getStaveNoteForValue(val, this._scaleNotes, this._clef)
    }
}