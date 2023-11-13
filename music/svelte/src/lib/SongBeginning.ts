import {StaveNote} from "vexflow";
import type {Song} from "$lib/MusicData";
import {majorScalesMap, notesDisambiguation, ScaleHelper, scales, songStart} from "$lib/MusicData";

export class SongBeginning {
    private readonly _song: Song;
    private readonly _scaleNotes: string[];
    private readonly _clef: string;
    private readonly _scale: string;

    constructor(clef: string, scale: string, song: Song) {
        this._clef = clef;
        this._scale = scale;
        this._song = song;
        this._scaleNotes = ScaleHelper.getNotesForScale(majorScalesMap.get(this._scale)!!);
    }

    get clef(): string {
        return this._clef;
    }

    get scale(): string {
        return this._scale;
    }

    public static getRandom(): SongBeginning {
        return new SongBeginning(SongBeginning.getRandomClef(), SongBeginning.getRandomScale(), SongBeginning.getRandomSong());
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