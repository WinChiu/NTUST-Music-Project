const leftDrum = $(".leftDrum");
const rightDrum = $(".rightDrum");
const string = $(".string");
const god_button_1 = $(".god_button_1");
const god_button_2 = $(".god_button_2");
const flag_cut_top = $(".flag_cut_top");
const flag_cut_bottom = $(".flag_cut_bottom");
const head_flag = $(".head_flag");
const long_flag = $(".long_flag");
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
const umbrellaDelay1 = ["#delay1", "#delay2", "#delay3"];
const umbrellaDelay2 = ["#delay4-1", "#delay4-2", "#delay4-3"];
const tracks = ["#track1", "#track2", "#track3", "#track4"];
let function1Pressing = false;
let function2Pressing = true;

const stopPlaying = () => {
  $("audio").each(function () {
    this.pause();
    this.currentTime = 0;
  });
};
const alignSoundTracks = () => {
  $("audio").each(function () {
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
const playPausedSound = (soundCode) => {
  $(soundCode)[0].currentTime = 0;
  $(soundCode)[0].play();
};
const pauseSound = (soundCode) => {
  $(soundCode)[0].pause();
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

let player1 = new Tone.Player({
  url: "./assets/audio/菜刀旗/sona0 0_noStop.mp3",
  loop: true,
});
let player2 = new Tone.Player({
  url: "./assets/audio/菜刀旗/sona0 0_noStop.mp3",
  loop: true,
});

var pitchShift1 = new Tone.PitchShift({
  pitch: 0,
}).toMaster();
var pitchShift2 = new Tone.PitchShift({
  pitch: 0,
}).toMaster();

player1.connect(pitchShift1);
player2.connect(pitchShift2);

string.on("touchstart", () => {
  //playSound(stringSound);
  player1.start();
  setTimeout(() => {
    player2.start();
  }, 5);
});
string.on("touchmove", function (e) {
  let stringRightBoundary = this.getBoundingClientRect().right - 30;
  let stringLeftBoundary = this.getBoundingClientRect().left + 50;
  let mousePosition = e.touches[0].clientX;
  let middle = (stringRightBoundary + stringLeftBoundary) / 2;
  if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
    pitchShift1.pitch = mousePosition / 650 + (mousePosition - middle) / 150;
    pitchShift2.pitch = mousePosition / 650 + (mousePosition - middle) / 150;
  } else {
    player1.stop();
    player2.stop();
  }
});
string.on("touchend", () => {
  player1.stop();
  player2.stop();
});
string.unbind();
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
//Nothing happen

//=====================
//step7

let nowPlayingUmbrellaASound = 0;

umbrella1.click(() => {
  console.log(nowPlayingUmbrellaASound);
  if (nowPlayingUmbrellaASound === umbrellaA.length - 1) {
    nowPlayingUmbrellaASound = 0;
  } else {
    nowPlayingUmbrellaASound++;
  }
  playSound(umbrellaA[nowPlayingUmbrellaASound]);
});

umbrella1.unbind();
//=====================
//step8

let nowPlayingUmbrellaDSound = 0;

umbrella2.click(() => {
  if (nowPlayingUmbrellaDSound === umbrellaD.length - 1) {
    nowPlayingUmbrellaDSound = 0;
  } else {
    nowPlayingUmbrellaDSound++;
  }
  playSound(umbrellaD[nowPlayingUmbrellaDSound]);
});

umbrella2.unbind();

//=====================
//step9
let nowPlayingUmbrellaDelay1Sound = 0;

umbrella3.click(() => {
  if (nowPlayingUmbrellaDelay1Sound === umbrellaDelay1.length - 1) {
    nowPlayingUmbrellaDelay1Sound = 0;
  } else {
    nowPlayingUmbrellaDelay1Sound++;
  }
  playSound(umbrellaDelay1[nowPlayingUmbrellaDelay1Sound]);
});

umbrella3.unbind();
//=====================
//step10
let nowPlayingUmbrellaDelay2Sound = 0;

umbrella4.click(() => {
  if (nowPlayingUmbrellaDelay2Sound === umbrellaDelay2.length - 1) {
    nowPlayingUmbrellaDelay2Sound = 0;
  } else {
    nowPlayingUmbrellaDelay2Sound++;
  }
  playSound(umbrellaDelay2[nowPlayingUmbrellaDelay2Sound]);
});

umbrella4.unbind();
//=====================
//step11

document.querySelector("#sonahigh").playbackRate = 8;
long_flag.click(() => {
  document.querySelector("#sonahigh").play();
  //$("#sonahigh")[0].playbackRate = 3;
  //playSound("#sonahigh");
});
long_flag.unbind();
//=====================
//step12
//Nothing happen
//=====================
//step13
//Nothing happen
//=====================
//step14
//Nothing happen
//=====================
//step15
let step15IsPlaying = false;

function_1.on("touchstart", () => {
  function1Pressing = true;
});

function_1.on("touchend", () => {
  function1Pressing = false;
});

leftDrum.click(() => {
  $("#BeiguanD1")[0].loop = true;
  $("#BeiguanD1")[0].playbackRate = 4.58;
  if (function1Pressing) {
    if (step15IsPlaying) {
      pauseSound("#BeiguanD1");
      step15IsPlaying = !step15IsPlaying;
    } else {
      playPausedSound("#BeiguanD1");
      step15IsPlaying = !step15IsPlaying;
    }
  }
});
function_1.unbind();
leftDrum.unbind();
//=====================
//step16

let isRecording = false;

function_2.on("touchstart", () => {
  function2Pressing = true;
});

function_2.on("touchend", () => {
  function2Pressing = false;
});

leftDrum.click(() => {
  console.log(123);
  $("#BeiguanD1")[0].loop = true;
  $("#BeiguanD1")[0].playbackRate = 4.58;
  $("#BeiguanD1")[0].volume = 0.3;
  if (function1Pressing) {
    if (isRecording) {
      pauseSound("#BeiguanD1");
      isRecording = !isRecording;
    } else {
      playPausedSound("#BeiguanD1");
      isRecording = !isRecording;
    }
  }
});

leftDrum.unbind();
function_2.unbind();

//=====================
//step17

let godButtonMode = 1; // 1 or 2

//Directly play BeiguanD1
function_1.click(() => {
  $("#BeiguanD1")[0].loop = true;
  $("#BeiguanD1")[0].playbackRate = 4.58;
  $("#BeiguanD1")[0].volume = 1;
  playPausedSound("#BeiguanD1");
});

god_button_1.click(() => {
  godButtonMode = 1;
});
god_button_2.click(() => {
  godButtonMode = 2;
});
leftDrum.click(() => {
  if (godButtonMode === 1) playPausedSound(drumSound[5]);
});
rightDrum.click(() => {
  if (godButtonMode === 1) playPausedSound(drumSound[5]);
});
function_1.unbind();
god_button_1.unbind();
god_button_2.unbind();
leftDrum.unbind();
rightDrum.unbind();

//Add the function the same as step3

//=====================
//step18
//Nothing happen
//=====================
//step19
//Nothing happen

//=====================
//step20

//Should be twitch

head_flag.click(() => {
  $("#track1")[0].loop = true;
  playPausedSound("#track1");
});

//=====================
//step21
let track2Playing = false;
function_1.on("touchstart", () => {
  function1Pressing = true;
});
function_1.on("touchend", () => {
  function1Pressing = false;
});
rightDrum.click(() => {
  if (function1Pressing) {
    $("#track2")[0].loop = true;
    alignSoundTracks();
    playPausedSound("#track2");
    track2Playing = true;
  }
});
leftDrum.click(() => {
  if (function1Pressing) {
    pauseSound("#track2");
    track2Playing = false;
  }
});

head_flag.unbind();
function_1.unbind();
rightDrum.unbind();
leftDrum.unbind();

//=====================
//step22

let unMutedTracks = ["#track1", "#track4"];
let isHeadFlagOpen = false;
let selectedTrack = 0;
tracks.forEach((track) => {
  $(`${track}`)[0].loop = true;
});

function_1.on("touchstart", () => {
  function1Pressing = true;
});
function_1.on("touchend", () => {
  function1Pressing = false;
});
head_flag.click(() => {
  stopPlaying();
  if (!isHeadFlagOpen) {
    alignSoundTracks();
    unMutedTracks.forEach((track) => {
      playPausedSound(track);
    });
    isHeadFlagOpen = true;
  } else {
    unMutedTracks.forEach((track) => {
      pauseSound(track);
    });
    isHeadFlagOpen = false;
  }
});
string.on("swiped-left", () => {
  if (function1Pressing) {
    if (selectedTrack === 0) {
      selectedTrack = tracks.length - 1;
    } else {
      selectedTrack--;
    }
    console.log(tracks[selectedTrack]);
  }
});
string.on("swiped-right", () => {
  if (function1Pressing) {
    if (selectedTrack === tracks.length - 1) {
      selectedTrack = 0;
    } else {
      selectedTrack++;
    }
    console.log(tracks[selectedTrack]);
  }
});

leftDrum.click(() => {
  if (function1Pressing) {
    unMutedTracks = unMutedTracks.filter((track) => track !== tracks[selectedTrack]);
  } else {
    playPausedSound(drumSound[0]);
  }
  console.log(unMutedTracks);
});
rightDrum.click(() => {
  if (function1Pressing) {
    if (!unMutedTracks.find((track) => track === tracks[selectedTrack])) unMutedTracks.push(tracks[selectedTrack]);
  }
  console.log(unMutedTracks);
});

//=====================
//step23

//=====================
//step24

//=====================
//step25