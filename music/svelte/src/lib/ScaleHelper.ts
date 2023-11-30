import type {PotentialNote, Scale} from "$lib/MusicData"
import {allFlats, allSharps, majorIntervals, minorIntervals, notesDisambiguation, ScaleType} from "$lib/MusicData"

export class ScaleHelper {

    public static getIntervals(scale: Scale): number[] {
        if (scale.type == ScaleType.MAJOR) {
            return majorIntervals
        } else {
            return minorIntervals
        }
    }

    public static getKeySignature(scale: Scale) {
        if (scale.type == ScaleType.MINOR) {
            return scale.note + "m"
        } else {
            return scale.note
        }
    }

    public static getNotes(scale: Scale) {
        let accidentals: string[]
        if (scale.accidental == undefined) {
            accidentals = []
        } else if (scale.accidental == "#") {
            accidentals = allSharps.slice(0, scale.numAccidental)
        } else {
            accidentals = allFlats.slice(0, scale.numAccidental)
        }

        const intervals = ScaleHelper.getIntervals(scale)

        return intervals.map((i: number): PotentialNote => {
            const canBees = notesDisambiguation.get((i + scale.offset) % 12)!!
            if (accidentals.length == 0) {
                const cb = canBees.filter((x) => x.with == undefined)
                if (cb.length != 1)
                    throw new Error("should be exactly on note matching but found " + cb)
                return cb[0]
            } else {
                const cb = canBees.filter((x) => accidentals.indexOf(x.what) != -1)
                if (cb.length == 1)
                    return cb[0]
                const cb1 = canBees.filter((x) => x.with === undefined)
                if (cb1.length != 1)
                    throw new Error("should be exactly on note matching but found " + cb1)
                return cb1[0]
            }
        }).map((c) => c.what)
    }
}