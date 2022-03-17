class FoosballRoutine {
    constructor(fbGoals, tbGoals, afterGoalDelay) {
        this.synth = window.speechSynthesis;

        this.utterThis = new SpeechSynthesisUtterance();
        this.utterThis.pitch = 1;
        this.utterThis.rate = 1;
        this.utterThis.onerror = function () {
            console.error('SpeechSynthesisUtterance.onerror');
        }

        this.utterThis.voice = speechSynthesis
            .getVoices()
            .find(voice => voice.lang.toLowerCase().indexOf("gb") !== -1);
        console.log(this.utterThis.voice);

        this.setupTimeout = 3000;
        this.minimumPassDelay = 2000;
        this.minimumShootDelay = 4000;
        this.maxTimeOnFiveBar = 10000;
        this.maxTimeOnThreeBar = 17000;
        this.fiveBarGoals = fbGoals;
        this.threeBarGoals = tbGoals;
        this.resetTime = afterGoalDelay;
        this.playing = false;

        this.noSleep = new NoSleep();
    }

    speak(myTxt) {
        this.utterThis.text = myTxt;
        this.synth.speak(this.utterThis);
    }

    setResetTimeInSeconds(t) {
        this.resetTime = t;
    }

    getRandomFive() {
        return this.fiveBarGoals[Math.floor(Math.random() * this.fiveBarGoals.length)];
    }

    getRandomThree() {
        return this.threeBarGoals[Math.floor(Math.random() * this.threeBarGoals.length)];
    }

    endRoutine() {
        this.speak("You are done!");
    }

    setCancellableTimeout(fun, interval) {
        if (!this.playing) {
            this.endRoutine();
        } else {
            setTimeout(fun, interval, this);
        }
    }

    speakAndSchedule(txt, fun, interval) {
        if (!this.playing) {
            this.endRoutine();
        } else {
            this.speak(txt)
            this.setCancellableTimeout(fun, interval);
        }
    }

    shoot(obj) {
        obj.speakAndSchedule(obj.getRandomThree(), obj.readyFive, obj.resetTime * 1000);
    }

    pass(obj) {
        obj.speakAndSchedule(obj.getRandomFive(), obj.shoot, Math.max(Math.random() * obj.maxTimeOnThreeBar, obj.minimumShootDelay));
    }

    startFiveBar(obj) {
        obj.speakAndSchedule("go", obj.pass, Math.max(Math.random() * obj.maxTimeOnFiveBar, obj.minimumPassDelay));
    }

    readyFive(obj) {
        obj.speakAndSchedule("setup five bar", obj.startFiveBar, obj.setupTimeout);
    }

    start() {
        this.playing = true;
        // noinspection JSCheckFunctionSignatures
        this.noSleep.enable();
        this.readyFive(this);
    }

    stop() {
        this.playing = false;
        // noinspection JSCheckFunctionSignatures
        this.noSleep.disable();
    }
}
