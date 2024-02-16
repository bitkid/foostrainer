import NoSleep from "nosleep.js"
// @ts-ignore
import EasySpeech from "easy-speech"

export interface Execution {
    name: string
    shortName: string
}

export const allPasses: Execution[] = [
    {name: "Wall pass", shortName: "1"},
    {name: "Lane pass", shortName: "2"},
    {name: "Center pass", shortName: "3"}
]

export const allShots: Execution[] = [
    {name: "Far side long", shortName: "1"},
    {name: "Far side short", shortName: "2"},
    {name: "Middle", shortName: "3"},
    {name: "Near side short", shortName: "4"},
    {name: "Near side long", shortName: "5"},
    {name: "Cutback far side", shortName: "6"},
    {name: "Cutback near side", shortName: "7"}
]

export class FoosballRoutine {
    private _noSleep: NoSleep
    private readonly _voice: SpeechSynthesisVoice

    constructor(p: string[], s: string[], statusChange: Function) {
        this._statusChange = statusChange
        this._passes = p
        this._shots = s
        const englishSpeakers = EasySpeech.filterVoices({"language": "en"});
        const potentialFemale: SpeechSynthesisVoice[] = englishSpeakers.filter((s: SpeechSynthesisVoice) => s.name.toLowerCase().indexOf("female") != -1)
        if (potentialFemale.length > 0)
            this._voice = potentialFemale[0]
        else
            this._voice = englishSpeakers[0]
        console.log("set voice to " + this._voice.name)
        this._noSleep = new NoSleep()
    }

    private _timeUntilSecondTouch = 2000

    set timeUntilSecondTouch(value: number) {
        this._timeUntilSecondTouch = value * 1000
    }

    private _passExecutionTime = 2000

    private readonly _maxTimeOnFiveBar = 10000
    private readonly _maxTimeOnThreeBar = 15000
    private readonly _passes: string[]
    private readonly _shots: string[]
    private readonly _statusChange: Function
    private timer?: number

    set passExecutionTime(value: number) {
        this._passExecutionTime = value * 1000
    }

    private _ballSetupTime = 2000

    private _playing = false

    get playing(): boolean {
        return this._playing
    }

    set ballSetupTime(value: number) {
        this._ballSetupTime = value * 1000
    }

    private _shotExecutionTime = 2000

    set shotExecutionTime(value: number) {
        this._shotExecutionTime = value * 1000
    }

    private _ballResetTime = 2000

    set ballResetTime(value: number) {
        this._ballResetTime = value * 1000
    }

    stop() {
        this._playing = false
        clearTimeout(this.timer)
        this._noSleep.disable()
        this.speak("OK ciao")
    }

    async start() {
        this._playing = true
        await this._noSleep.enable()
        this.readyFive()
    }

    private readyFive() {
        this.speakThenSchedule(this.schedulePass, this._timeUntilSecondTouch, "ready? go!")
        this._statusChange("Ready? Go!")
    }

    private schedulePass() {
        let timeTillPass = Math.max(2000, Math.random() * (this._maxTimeOnFiveBar - this._passExecutionTime))
        this.speakAndSchedule(this.pass, timeTillPass)
        this._statusChange("Pass in " + (timeTillPass / 1000).toPrecision(2) + " seconds")
    }

    private pass() {
        const randomPass = this.getRandomPass();
        this.speakAndSchedule(this.setupBall, this._passExecutionTime, randomPass)
        this._statusChange(allPasses.find((s) => s.shortName == randomPass)?.name + " (" + randomPass + ")")
    }

    private setupBall() {
        this.speakAndSchedule(this.scheduleShot, this._ballSetupTime)
        this._statusChange("Setup ball")
    }

    private scheduleShot() {
        let timeTillShot = Math.max(2000, Math.random() * (this._maxTimeOnThreeBar - this._shotExecutionTime - this._ballSetupTime))
        this.speakAndSchedule(this.shoot, timeTillShot)
        this._statusChange("Shoot in " + (timeTillShot / 1000).toPrecision(2) + " seconds")
    }

    private shoot() {
        const randomShot = this.getRandomShot();
        this.speakThenSchedule(this.readyFive, this._ballResetTime, randomShot)
        this._statusChange(allShots.find((s) => s.shortName == randomShot)?.name + " (" + randomShot + ")")
    }

    private speakAndSchedule(fun: Function, interval: number, txt?: string) {
        if (this.playing) {
            if (txt != null)
                this.speak(txt).catch(() => {
                })
            this.timer = setTimeout(fun.bind(this), interval, this)
        }
    }

    private speakThenSchedule(fun: Function, interval: number, txt: string) {
        if (this.playing) {
            this.speak(txt).then(() => this.timer = setTimeout(fun.bind(this), interval, this)).catch(() => {
            })
        }
    }

    private speak(myTxt: string): Promise<any> {
        return EasySpeech.speak({"text": myTxt, "voice": this._voice})
    }

    private getRandomPass(): string {
        return this._passes[Math.floor(Math.random() * this._passes.length)]
    }

    private getRandomShot(): string {
        return this._shots[Math.floor(Math.random() * this._shots.length)]
    }
}