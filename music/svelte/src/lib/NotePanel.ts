import {Formatter, RenderContext, Renderer, Stave, StaveNote, Voice} from "vexflow";
import type {Scale} from "$lib/MusicData";
import {ScaleHelper} from "$lib/ScaleHelper";

export class NotePanel {

    private readonly _context: RenderContext
    private readonly _element: HTMLDivElement

    constructor(element: HTMLDivElement) {
        const renderer = new Renderer(element, Renderer.Backends.SVG)
        renderer.resize(element.clientWidth, element.clientHeight)
        this._context = renderer.getContext()
        this._element = element
    }

    drawLines(scale?: Scale, clef?: string): Stave {
        this._context.clear()
        const stave = new Stave(0, 0, this._element.clientWidth - 8)
        stave.setTimeSignature("4/4")
        if (clef)
            stave.setClef(clef)
        if (scale)
            stave.setKeySignature(ScaleHelper.getKeySignature(scale))
        stave.setContext(this._context).draw()
        stave.setNoteStartX(stave.getNoteStartX() + 1)
        return stave
    }

    drawLinesAndNotes(notes: StaveNote[], clef: string, scale?: Scale, maxDistance: number = 100) {
        const stave = this.drawLines(scale, clef)
        const voice = new Voice({num_beats: notes.length, beat_value: 4})
        voice.addTickables(notes)
        const maxJustifyWidth = this._element.clientWidth - 16 - stave.getNoteStartX();
        const width = Math.min(notes.length * maxDistance, maxJustifyWidth)
        new Formatter().joinVoices([voice]).format([voice], width)
        voice.draw(this._context, stave)
    }
}