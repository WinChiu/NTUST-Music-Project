const leftDrum = $(".leftDrum");
const rightDrum = $(".rightDrum");
const string = $(".string");
const god_button_1 = $(".god_button_1");
const god_button_2 = $(".god_button_2");
const flag_cut_top = $(".flag_cut_top");
const flag_cut_bottom = $(".flag_cut_bottom");
const head_flag = $(".head_flag");
const long_flag_r = $(".long_flag_r");
const long_flag_l = $(".long_flag_l");
const umbrella1 = $(".umbrella1");
const umbrella2 = $(".umbrella2");
const umbrella3 = $(".umbrella3");
const umbrella4 = $(".umbrella4");
const level_switch = $(".level_switch");
const function_1 = $(".function_1");
const function_2 = $(".function_2");

const drumSound = ["#BeiguanC1", "#BeiguanC4", "#BeiguanC6", "#BeiguanC8", "#BeiguanD1", "#BeiguanD3", "#BeiguanD7"];
const melodySound = []; //to be added
const umbrellaA = ["#A1", "#A2", "#A3", "#A4"];
const umbrellaD = ["#D1", "#D2", "#D3", "#D4", "#D5"];
const umbrellaDelay1 = [];
const umbrellaDelay2 = [];

const stopPlaying = () => {
  $("audio").each(function () {
    this.pause();
    this.currentTime = 0;
  });
};
const playSound = (soundCode) => {
  stopPlaying();
  if ($(soundCode)[0]) {
    $(soundCode)[0].currentTime = 0;
    $(soundCode)[0].play();
  }
};

//step1
leftDrum.click(() => {
  playSound(drumSound[0]);
});
rightDrum.click(() => {
  playSound(drumSound[0]);
});

leftDrum.unbind("click");
rightDrum.unbind("click");

//=====================
//step2

let function1Pressing = false;
let nowPlayingDrumSound = 0;
function_1.on("touchstart", () => {
  function1Pressing = true;
});

function_1.on("touchend", () => {
  function1Pressing = false;
});

leftDrum.click(() => {
  if (function1Pressing) {
    if (nowPlayingDrumSound === 0) {
      nowPlayingDrumSound = drumSound.length - 1;
    } else {
      nowPlayingDrumSound--;
    }
    playSound(drumSound[nowPlayingDrumSound]);
  } else {
    playSound(drumSound[nowPlayingDrumSound]);
  }
});

rightDrum.click(() => {
  if (function1Pressing) {
    if (nowPlayingDrumSound === drumSound.length - 1) {
      nowPlayingDrumSound = 0;
    } else {
      nowPlayingDrumSound++;
    }
    playSound(drumSound[nowPlayingDrumSound]);
  } else {
    playSound(drumSound[nowPlayingDrumSound]);
  }
});

function_1.unbind();
leftDrum.unbind();
rightDrum.unbind();
//=====================
//step3

//=====================
//step4

let nowPlayingMelodySound = 0;
function_1.on("touchstart", () => {
  function1Pressing = true;
});

function_1.on("touchend", () => {
  function1Pressing = false;
});

string.on("swiped-left", () => {
  if (function1Pressing) {
    if (nowPlayingMelodySound === 0) {
      nowPlayingMelodySound = melodySound.length - 1;
    } else {
      nowPlayingMelodySound--;
    }
    playSound(melodySound[nowPlayingMelodySound]);
  } else {
    playSound(melodySound[nowPlayingMelodySound]);
  }
});

string.on("swiped-right", () => {
  if (function1Pressing) {
    if (nowPlayingMelodySound === melodySound.length - 1) {
      nowPlayingMelodySound = 0;
    } else {
      nowPlayingMelodySound++;
    }
    playSound(melodySound[nowPlayingMelodySound]);
  } else {
    playSound(melodySound[nowPlayingMelodySound]);
  }
});

function_1.unbind();
string.unbind();

//=====================
//step5
let flagCutTopStatus = 1;
let flagCutBottomStatus = 1;

flag_cut_top.on("swiped-down", () => {
  if (flagCutTopStatus === 1) {
    flag_cut_top.css("top", "113px");
    flagCutTopStatus = 0;
    stopPlaying();
    playSound(`.${flagCutTopStatus}_${flagCutBottomStatus}`);
    return;
  }
  if (flagCutTopStatus === 0) {
    flag_cut_top.css("top", "125px");
    flagCutTopStatus = -1;
    stopPlaying();
    playSound(`.${flagCutTopStatus}_${flagCutBottomStatus}`);
    return;
  }
});

flag_cut_top.on("swiped-up", () => {
  if (flagCutTopStatus === -1) {
    flag_cut_top.css("top", "113px");
    flagCutTopStatus = 0;
    stopPlaying();
    playSound(`.${flagCutTopStatus}_${flagCutBottomStatus}`);
    return;
  }
  if (flagCutTopStatus === 0) {
    flag_cut_top.css("top", "101px");
    flagCutTopStatus = 1;
    stopPlaying();
    playSound(`.${flagCutTopStatus}_${flagCutBottomStatus}`);
    return;
  }
});

flag_cut_bottom.on("swiped-down", () => {
  if (flagCutBottomStatus === 1) {
    flag_cut_bottom.css("top", "164px");
    flagCutBottomStatus = 0;
    stopPlaying();
    playSound(`.${flagCutTopStatus}_${flagCutBottomStatus}`);
    return;
  }
  if (flagCutBottomStatus === 0) {
    flag_cut_bottom.css("top", "176px");
    flagCutBottomStatus = -1;
    stopPlaying();
    playSound(`.${flagCutTopStatus}_${flagCutBottomStatus}`);
    return;
  }
});

flag_cut_bottom.on("swiped-up", () => {
  if (flagCutBottomStatus === -1) {
    flag_cut_bottom.css("top", "164px");
    flagCutBottomStatus = 0;
    stopPlaying();
    playSound(`.${flagCutTopStatus}_${flagCutBottomStatus}`);
    return;
  }
  if (flagCutBottomStatus === 0) {
    flag_cut_bottom.css("top", "152px");
    flagCutBottomStatus = 1;
    stopPlaying();
    playSound(`.${flagCutTopStatus}_${flagCutBottomStatus}`);
    return;
  }
});

flag_cut_top.unbind();
flag_cut_bottom.unbind();
//=====================
//step6

//=====================
//step7

//=====================
//step8
