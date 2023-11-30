import type {Interval, Note, PotentialNote, Song} from "$lib/MusicData"
import {intervals, majorScales, minorScales, notes, notesDisambiguation, songStart} from "$lib/MusicData"
import {SongBeginning} from "$lib/SongBeginning"

export class RandomHelper {
    public static getRandomSongBeginning(): SongBeginning {
        return new SongBeginning(RandomHelper.getRandomClef(), RandomHelper.getRandomMajorScale(), RandomHelper.getRandomSong())
    }

    public static getRandomClef(): string {
        if (Math.random() < 0.5) {
            return "treble"
        } else {
            return "bass"
        }
    }

    public static getRandomMajorScale(): string {
        let r = Math.floor(Math.random() * majorScales.length)
        return majorScales[r]
    }

    public static getRandomInterval(): Interval {
        let r = Math.floor(Math.random() * intervals.length)
        return intervals[r]
    }

    public static getRandomMinorScale(): string {
        let r = Math.floor(Math.random() * minorScales.length)
        return minorScales[r]
    }

    public static getRandomSong(): Song {
        let r = Math.floor(Math.random() * songStart.length)
        return songStart[r]
    }

    public static getRandomNote(): Note {
        let r = Math.floor(Math.random() * notes.length)
        return notes[r]
    }

    public static getRandomPotentialNote(): PotentialNote {
        let r = Math.floor(Math.random() * notesDisambiguation.size)
        let notes = notesDisambiguation.get(r)!!
        let rr = Math.floor(Math.random() * notes.length)
        return notes[rr]
    }
}