class TimeDiv {
    constructor(ui) {
        this.timeDiv = ui;
    }

    setTime(name, time) {
        this.timeDiv.innerHTML = "<p>" + name + " in <span class=\"redFont\">" + (time / 1000).toFixed(1) + "</span> seconds" + "</p>";
    }
}

class FoosballRoutine {
    constructor(fbGoals, tbGoals, afterGoalDelay, showTime) {
        this.synth = window.speechSynthesis;

        this.utterThis = new SpeechSynthesisUtterance();
        this.utterThis.pitch = 1;
        this.utterThis.rate = 1;
        this.utterThis.onerror = function () {
            console.error('SpeechSynthesisUtterance.onerror');
        }

        this.setVoice();

        this.setupTimeout = 2000;
        this.timeUntilSecondTouch = 1500;
        this.passExecutionTime = 2000;
        this.shotExecutionTime = 2000;
        this.maxTimeOnFiveBar = 10000;
        this.maxTimeOnThreeBar = 15000;
        this.fiveBarGoals = fbGoals;
        this.threeBarGoals = tbGoals;
        this.resetTime = afterGoalDelay;
        this.playing = false;

        this.timeDiv = showTime;
        this.noSleep = new NoSleep();

        this.timeout = null;
    }

    setVoice() {
        console.log(speechSynthesis.getVoices());
        this.utterThis.voice = speechSynthesis
            .getVoices()
            .find(voice => voice.lang.toLowerCase().indexOf("gb") !== -1);
        console.log(this.utterThis.voice);
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
        this.speak("well done");
    }

    speakAndSchedule(txt, fun, interval) {
        if (this.playing) {
            this.speak(txt);
            this.timeout = setTimeout(fun, interval, this);
        }
    }

    shoot(obj) {
        obj.speakAndSchedule(obj.getRandomThree(), obj.readyFive, obj.resetTime * 1000);
    }

    pass(obj) {
        let timeTillShot = obj.passExecutionTime + Math.random() * (obj.maxTimeOnThreeBar - obj.shotExecutionTime);
        obj.timeDiv.setTime("Shoot", timeTillShot);
        obj.speakAndSchedule(obj.getRandomFive(), obj.shoot, timeTillShot);
    }

    startFiveBar(obj) {
        let timeTillPass = obj.timeUntilSecondTouch + Math.random() * (obj.maxTimeOnFiveBar - obj.passExecutionTime);
        obj.timeDiv.setTime("Pass", timeTillPass);
        obj.speakAndSchedule("go", obj.pass, timeTillPass);
    }

    readyFive(obj) {
        obj.speakAndSchedule("ready", obj.startFiveBar, obj.setupTimeout);
    }

    start() {
        this.playing = true;
        // noinspection JSCheckFunctionSignatures
        this.noSleep.enable();
        if (this.utterThis.voice === null)
            this.setVoice();
        this.readyFive(this);
    }

    stop() {
        this.playing = false;
        clearTimeout(this.timeout);
        this.timeout = null;
        // noinspection JSCheckFunctionSignatures
        this.noSleep.disable();
        this.endRoutine();
    }
}
