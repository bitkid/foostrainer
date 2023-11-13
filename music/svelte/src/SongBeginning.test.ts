import {describe, expect, it} from 'vitest';
import {
    bundesHymneSong,
    majorScalesMap,
    ScaleHelper,
    scales,
    SongBeginning,
    songStart,
    usaSong,
    vogelSong
} from "$lib/MusicData";

describe('song beginning', () => {
    it('knows root note', () => {
        const s = new SongBeginning("treble", "C#", vogelSong);
        expect(s.getScaleRootMidiNote()).toBe(61);
    });
    it('knows clef', () => {
        const s = new SongBeginning("treble", "C#", vogelSong);
        expect(s.clef).toStrictEqual("treble");
    });
    it('knows scale', () => {
        const s = new SongBeginning("treble", "C#", vogelSong);
        expect(s.scale).toStrictEqual("C#");
    });
    it('knows description', () => {
        const s = new SongBeginning("treble", "C#", vogelSong);
        expect(s.getSongDescription()).toStrictEqual("Kommt ein Vogel in C# [3,4,5]");
    });
    it('knows midi notes', () => {
        const s = new SongBeginning("treble", "C#", vogelSong);
        expect(s.getMidiNotes()).toStrictEqual([65, 66, 68]);
    });
    it('knows stave notes in C for USA', () => {
        const s = new SongBeginning("treble", "C", usaSong);
        const keys: string[] = s.getStaveNotes().map((x) => x.keys[0]);
        expect(keys).toStrictEqual(["G/4", "E/4", "C/4"]);
    });
    it('never has 2 notes on the same line for all songs', () => {
        songStart.forEach((s) => {
            scales.forEach((sc) => {
                ["treble", "bass"].forEach((c) => {
                    const song = new SongBeginning(c, sc, s);
                    const keys: string[] = song.getStaveNotes().map((x) => x.keys[0]);
                    expect([...new Set(keys)].length == keys.length).toBeTruthy()
                })
            })
        });
    });
    it('knows correct stave notes', () => {
        const s = new SongBeginning("treble", "C#", vogelSong);
        const keys: string[] = s.getStaveNotes().map((x) => x.keys[0]);
        expect(keys).toStrictEqual(["E/4", "F/4", "G/4"]);

        const sg = new SongBeginning("treble", "Gb", vogelSong);
        const keysg: string[] = sg.getStaveNotes().map((x) => x.keys[0]);
        expect(keysg).toStrictEqual(['B/4', 'C/4', 'D/5']);

        const sb = new SongBeginning("treble", "C#", bundesHymneSong);
        const keysb: string[] = sb.getStaveNotes().map((x) => x.keys[0]);
        expect(keysb).toStrictEqual(['G/4', 'F/4', 'E/4']);

        const ssb = new SongBeginning("treble", "Gb", bundesHymneSong);
        const keysgsb: string[] = ssb.getStaveNotes().map((x) => x.keys[0]);
        expect(keysgsb).toStrictEqual(['D/5', 'C/4', 'B/4']);
    });
    it('knows correct notes for scale', () => {
        expect(ScaleHelper.getNotesForScale(majorScalesMap.get("A")!!)).toStrictEqual(['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']);
        expect(ScaleHelper.getNotesForScale(majorScalesMap.get("Eb")!!)).toStrictEqual(["Eb", "F", "G", "Ab", "Bb", "C", "D"]);
        expect(ScaleHelper.getNotesForScale(majorScalesMap.get("C")!!)).toStrictEqual(["C", "D", "E", "F", "G", "A", "B"]);
        expect(ScaleHelper.getNotesForScale(majorScalesMap.get("C#")!!)).toStrictEqual(["C#", "D#", "E#", "F#", "G#", "A#", "B#"]);
        expect(ScaleHelper.getNotesForScale(majorScalesMap.get("Gb")!!)).toStrictEqual(["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"]);
    });
});
