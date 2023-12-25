import {describe, expect, it} from "vitest"
import {majorIntervals, majorScalesMap, minorIntervals, minorScalesMap} from "$lib/MusicData"
import type {StaveNote} from "vexflow"
import {ScaleHelper} from "$lib/ScaleHelper"

describe("ScaleHelper", () => {
    it("knows correct notes for major scales", () => {
        expect(ScaleHelper.getNotes(majorScalesMap.get("A")!!)).toStrictEqual(["A", "B", "C#", "D", "E", "F#", "G#"])
        expect(ScaleHelper.getNotes(majorScalesMap.get("Eb")!!)).toStrictEqual(["Eb", "F", "G", "Ab", "Bb", "C", "D"])
        expect(ScaleHelper.getNotes(majorScalesMap.get("C")!!)).toStrictEqual(["C", "D", "E", "F", "G", "A", "B"])
        expect(ScaleHelper.getNotes(majorScalesMap.get("C#")!!)).toStrictEqual(["C#", "D#", "E#", "F#", "G#", "A#", "B#"])
        expect(ScaleHelper.getNotes(majorScalesMap.get("Gb")!!)).toStrictEqual(["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"])
    })
    it("knows correct notes for minor scales", () => {
        expect(ScaleHelper.getNotes(minorScalesMap.get("C")!!)).toStrictEqual(["C", "D", "Eb", "F", "G", "Ab", "Bb"])
    })
    it("knows stave notes for for C#", () => {
        const scale = majorScalesMap.get("C#")!!
        const scaleNotes = ScaleHelper.getNotes(scale)
        const listOfNotes = majorIntervals.map((i: number): StaveNote => {
            return ScaleHelper.getStaveNoteForValue(60 + scale.offset + i, scaleNotes)
        })
        expect(listOfNotes.map((x) => x.keys[0])).toStrictEqual(["C/4", "D/4", "E/4", "F/4", "G/4", "A/4", "B/4"])
    })
    it("knows stave notes for for Gb", () => {
        const scale = majorScalesMap.get("Gb")!!
        const scaleNotes = ScaleHelper.getNotes(scale)
        const listOfNotes = majorIntervals.map((i: number): StaveNote => {
            return ScaleHelper.getStaveNoteForValue(60 + scale.offset + i, scaleNotes)
        })
        expect(listOfNotes.map((x) => x.keys[0])).toStrictEqual(["G/4", "A/4", "B/4", "C/5", "D/5", "E/5", "F/5"])
    })
    it("knows stave notes for for Fm", () => {
        const scale = minorScalesMap.get("C")!!
        const scaleNotes = ScaleHelper.getNotes(scale)
        const listOfNotes = minorIntervals.map((i: number): StaveNote => {
            return ScaleHelper.getStaveNoteForValue(60 + scale.offset + i, scaleNotes)
        })
        expect(listOfNotes.map((x) => x.keys[0])).toStrictEqual(["C/4", "D/4", "E/4", "F/4", "G/4", "A/4", "B/4"])
    })
    it("knows full scale name", () => {
        expect(ScaleHelper.getFullScaleName(minorScalesMap.get("B")!!)).toEqual("Hm")
        expect(ScaleHelper.getFullScaleName(minorScalesMap.get("Bb")!!)).toEqual("Bm")
    })
})
