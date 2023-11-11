export class SynthWrapper {
    private synth: any;

    constructor(synth: any) {
        this.synth = synth;
    }

    play(note: number, call: () => void = function () {
    }) {
        this.synth.send([0x90, note, 100]);
        setTimeout(this.stopNote.bind(this), 700, note, call);
    }

    private stopNote(note: number, call: () => void) {
        this.synth.send([0x90, note, 0]);
        call();
    }
}