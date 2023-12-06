import {Formatter, RenderContext, Renderer, Stave, StaveNote, Voice} from "vexflow";

export class NotePanel {

    private readonly _context: RenderContext
    private readonly _element: HTMLDivElement

    constructor(element: HTMLDivElement) {
        const renderer = new Renderer(element, Renderer.Backends.SVG)
        renderer.resize(element.clientWidth, element.clientHeight)
        this._context = renderer.getContext()
        this._element = element
    }

    drawLines(signature: string | undefined, clef: string | undefined): Stave {
        this._context.clear()
        const stave = new Stave(0, 0, this._element.clientWidth - 8)
        stave.setTimeSignature("4/4")
        if (clef !== undefined)
            stave.setClef(clef)
        if (signature !== undefined)
            stave.setKeySignature(signature)
        stave.setContext(this._context).draw()
        stave.setNoteStartX(stave.getNoteStartX() + 1)
        return stave
    }

    drawLinesAndNotes(notes: StaveNote[], clef: string, keySignature: string | undefined) {
        const stave = this.drawLines(keySignature, clef)
        const voice = new Voice({num_beats: notes.length, beat_value: 4})
        voice.addTickables(notes)
        new Formatter().joinVoices([voice]).format([voice], this._element.clientWidth - 16 - stave.getNoteStartX())
        voice.draw(this._context, stave)
    }
}