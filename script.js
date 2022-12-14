class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = './sounds/kick-classic.wav'
    this.currentSnare = './sounds/snare-acoustic01.wav';
    this.currentHihat = './sounds/hihat-acoustic01.wav'
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isplaying = null;
    this.selects = document.querySelectorAll('select');
    this.muteBtns = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if pads are active and play that sound
      if (bar.classList.contains("active")) {
        //check for what pad
        if (bar.classList.contains("kick-pad")) {
          //to restart timer (since before, previous beat won't stop and new wount play)
          this.kickAudio.currentTime = 0;
          //playing audio
          this.kickAudio.play();
        }
      }
      if (bar.classList.contains("active")) {
        //check for what pad
        if (bar.classList.contains("snare-pad")) {
          //to restart timer (since before, previous beat won't stop and new wount play)
          this.snareAudio.currentTime = 0;
          //playing aodio
          this.snareAudio.play();
        }
      }
      if (bar.classList.contains("active")) {
        //check for what pad
        if (bar.classList.contains("hihat-pad")) {
          //to restart timer (since before, previous beat won't stop and new wount play)
          this.hihatAudio.currentTime = 0;
          //playing aodio
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    //check if it is playing
    if (this.isplaying) {
      //stoping the interval
      clearInterval(this.isplaying);
      this.isplaying = null;
    } else {
      this.isplaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    if (this.isplaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e){
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName){
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  mute(e){
    const muteIndex = e.target.getAttribute('data-track');
    e.target.classList.toggle('active');
    if(e.target.classList.contains('active')){
      switch(muteIndex){
        case '0':
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    }else{
      switch(muteIndex){
        case '0':
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e){
    const tempoText = document.querySelector('.tempo-nr');
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }
  updateTempo(e){
    clearInterval(this.isplaying);
    this.isplaying = null;
    const playBtn = document.querySelector('.play');
    if(playBtn.classList.contains('active')){
      this.start()
    }
  }
}

const drumKit = new Drumkit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
  drumKit.updateBtn();
});

drumKit.selects.forEach(select => {
  select.addEventListener('change', function(e){
    drumKit.changeSound(e);
  });
});
drumKit.muteBtns.forEach(btn => {
  btn.addEventListener('click', function(e){
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener('input', function(e){
  drumKit.changeTempo(e);
})

drumKit.tempoSlider.addEventListener("change", function(e){
  drumKit.updateTempo(e);
})