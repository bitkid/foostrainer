class TimeDiv {
    constructor(ui) {
        this.timeDiv = ui;
        this.setReady();
    }

    setTime(txt, time) {
        this.setText(txt + " <span class=\"redFont\">" + (time / 1000).toFixed(1) + "</span> seconds");
    }

    setReady() {
        this.setText("Ready?")
    }

    setText(txt) {
        this.timeDiv.innerHTML = "<p>" + txt + "</p>";
    }

    setRedText(txt) {
        this.timeDiv.innerHTML = "<p><span class=\"redFont\">" + txt + "</span></p>";
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
        this.timeUntilSecondTouch = 2000;
        this.passExecutionTime = 4000;
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
            if (txt !== null)
                this.speak(txt);
            this.timeout = setTimeout(fun, interval, this);
        }
    }

    shoot(obj) {
        obj.speakAndSchedule(obj.getRandomThree(), obj.readyFive, obj.resetTime * 1000);
        obj.timeDiv.setRedText("Shoot!");
    }

    executePass(obj) {
        let timeTillShot = Math.random() * (obj.maxTimeOnThreeBar - obj.shotExecutionTime);
        obj.speakAndSchedule(null, obj.shoot, timeTillShot);

        obj.timeDiv.setTime("Shoot in", timeTillShot);
    }

    pass(obj) {
        obj.speakAndSchedule(obj.getRandomFive(), obj.executePass, obj.passExecutionTime);
        obj.timeDiv.setRedText("Pass!");
    }

    secondTouch(obj) {
        let timeTillPass = Math.random() * (obj.maxTimeOnFiveBar - obj.passExecutionTime);
        obj.speakAndSchedule(null, obj.pass, timeTillPass);

        obj.timeDiv.setTime("Pass in", timeTillPass);
    }

    startFiveBar(obj) {
        obj.speakAndSchedule("Go!", obj.secondTouch, obj.timeUntilSecondTouch);
        obj.timeDiv.setRedText("Go!");
    }

    readyFive(obj) {
        obj.speakAndSchedule("Ready?", obj.startFiveBar, obj.setupTimeout);
        obj.timeDiv.setReady();
    }

    start() {
        this.playing = true;
        // noinspection JSCheckFunctionSignatures
        this.noSleep.enable();
        // in some browsers speech initialisation is just too slow, so try again here
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
        this.timeDiv.setReady();
    }
}
