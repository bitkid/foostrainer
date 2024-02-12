import NoSleep from "nosleep.js"

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
    private readonly _utterThis: SpeechSynthesisUtterance
    private readonly _synth: SpeechSynthesis
    private _noSleep: NoSleep
    private readonly _setupTimeout = 2000
    private readonly _timeUntilSecondTouch = 2000
    private readonly _passExecutionTime = 4000
    private readonly _shotExecutionTime = 2000
    private readonly _maxTimeOnFiveBar = 10000
    private readonly _maxTimeOnThreeBar = 15000
    private readonly _passes: string[]
    private readonly _shots: string[]
    private readonly _statusChange: Function
    private _resetTime = 2000
    private timer?: number

    constructor(p: string[], s: string[], statusChange: Function) {
        this._statusChange = statusChange
        this._passes = p
        this._shots = s
        this._synth = window.speechSynthesis
        const t = this
        speechSynthesis.onvoiceschanged = function () {
            t.setVoice()
        }
        this._utterThis = new SpeechSynthesisUtterance()
        this._utterThis.pitch = 1
        this._utterThis.rate = 1
        this._utterThis.onerror = function (e) {
            console.error('SpeechSynthesisUtterance.onerror' + e)
        }
        this._noSleep = new NoSleep()
    }

    private _playing = false

    get playing(): boolean {
        return this._playing
    }

    setVoice() {
        this._utterThis.voice = this._synth
            .getVoices()
            .find(voice => voice.lang.toLowerCase().indexOf("-gb") != -1 || voice.lang.toLowerCase().indexOf("-us") != -1)!!
        console.log(this._utterThis.voice)
    }

    speakAndSchedule(fun: Function, interval: number, txt?: string) {
        if (this.playing) {
            if (txt != null)
                this.speak(txt)
            this.timer = setTimeout(fun.bind(this), interval, this)
        }
    }

    speak(myTxt: string) {
        this._utterThis.text = myTxt
        this._synth.speak(this._utterThis)
    }

    secondTouch() {
        let timeTillPass = Math.random() * (this._maxTimeOnFiveBar - this._passExecutionTime)
        this.speakAndSchedule(this.pass, timeTillPass)
        this._statusChange("Pass in " + (timeTillPass / 1000).toPrecision(2) + " seconds")
    }

    startFiveBar() {
        this.speakAndSchedule(this.secondTouch, this._timeUntilSecondTouch, "go")
        this._statusChange("Go!")
    }

    pass() {
        const randomPass = this.getRandomPass();
        this.speakAndSchedule(this.executePass, this._passExecutionTime, randomPass)
        this._statusChange(allPasses.find((s) => s.shortName == randomPass)?.name + " (" + randomPass + ")")
    }

    getRandomPass(): string {
        return this._passes[Math.floor(Math.random() * this._passes.length)]
    }

    getRandomShot(): string {
        return this._shots[Math.floor(Math.random() * this._shots.length)]
    }

    shoot() {
        const randomShot = this.getRandomShot();
        this.speakAndSchedule(this.readyFive, this._resetTime, randomShot)
        this._statusChange(allShots.find((s) => s.shortName == randomShot)?.name + " (" + randomShot + ")")
    }

    readyFive() {
        this.speakAndSchedule(this.startFiveBar, this._setupTimeout, "ready")
        this._statusChange("Get ready!")
    }

    executePass() {
        let timeTillShot = Math.random() * (this._maxTimeOnThreeBar - this._shotExecutionTime)
        this.speakAndSchedule(this.shoot, timeTillShot)
        this._statusChange("Shoot in " + (timeTillShot / 1000).toPrecision(2) + " seconds")
    }

    start() {
        this._playing = true
        // noinspection JSIgnoredPromiseFromCall
        this._noSleep.enable()
        this.startFiveBar()
    }

    stop() {
        this._playing = false
        clearTimeout(this.timer)
        this._noSleep.disable()
        this.speak("bye bye")
    }
}