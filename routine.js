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

        this.utterThis.voice = speechSynthesis
            .getVoices()
            .find(voice => voice.lang.toLowerCase().indexOf("gb") !== -1);
        console.log(this.utterThis.voice);

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
        let timeTillShot = obj.passExecutionTime + Math.random() * (obj.maxTimeOnThreeBar - obj.shotExecutionTime);
        obj.timeDiv.setTime("Shoot", timeTillShot)
        obj.speakAndSchedule(obj.getRandomFive(), obj.shoot, timeTillShot);
    }

    startFiveBar(obj) {
        let timeTillPass = obj.timeUntilSecondTouch + Math.random() * (obj.maxTimeOnFiveBar - obj.passExecutionTime);
        obj.timeDiv.setTime("Pass", timeTillPass)
        obj.speakAndSchedule("go", obj.pass, timeTillPass);
    }

    readyFive(obj) {
        obj.speakAndSchedule("ready", obj.startFiveBar, obj.setupTimeout);
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
