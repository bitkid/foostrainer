import {
    type Interval,
    intervals,
    majorScalesMap,
    minorScalesMap,
    type Note,
    notes,
    notesDisambiguation,
    type PotentialNote,
    type Scale,
    type Song,
    songStart
} from "$lib/MusicData"
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

    public static getRandomMajorScale(): Scale {
        const k = Array.from(majorScalesMap.keys())
        const r = Math.floor(Math.random() * k.length)
        return majorScalesMap.get(k[r])!!
    }

    public static getRandomInterval(): Interval {
        let r = Math.floor(Math.random() * intervals.length)
        return intervals[r]
    }

    public static getRandomMinorScale(): Scale {
        const k = Array.from(minorScalesMap.keys())
        const r = Math.floor(Math.random() * k.length)
        return minorScalesMap.get(k[r])!!
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