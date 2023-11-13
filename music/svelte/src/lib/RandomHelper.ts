import type {Note, Song} from "$lib/MusicData";
import {notes, scales, songStart} from "$lib/MusicData";
import {SongBeginning} from "$lib/SongBeginning";

export class RandomHelper {
    public static getRandomSongBeginning(): SongBeginning {
        return new SongBeginning(RandomHelper.getRandomClef(), RandomHelper.getRandomScale(), RandomHelper.getRandomSong());
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

    public static getRandomNote(): Note {
        let r = Math.floor(Math.random() * notes.length);
        return notes[r];
    }
}