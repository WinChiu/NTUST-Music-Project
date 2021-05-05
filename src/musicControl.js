const leftDrum = $(".leftDrum");
const rightDrum = $(".rightDrum");
const string = $(".string");
const god_button_1 = $(".god_button_1");
const god_button_2 = $(".god_button_2");
const flag_cut_top = $(".flag_cut_top");
const flag_cut_bottom = $(".flag_cut_bottom");
const head_flag = $(".head_flag");
const long_flag = $(".long_flag");
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

const instrumentContainer = $(".instrument");
const instrumentDisplayArea = $(".displayArea");
const originalSize = () => {
  instrumentContainer.css("transform", "translate(0,0) scale(0.9) rotate(0)");
  instrumentDisplayArea.css("margin-bottom", "6vh");
};
const cutFlagZoomIn = () => {
  instrumentContainer.css("transform", "translate(10vw, 30vh) scale(1.5)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};
const longFlagZoomIn = () => {
  instrumentContainer.css("transform", "translate(-3vw, 5vh) scale(1.2) rotate(4deg)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};
const umbrellaZoomIn = () => {
  instrumentContainer.css("transform", "translate(10vw, 10vh) scale(1.2) ");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};
const headFlagZoomIn = () => {
  instrumentContainer.css("transform", "translate(20vw, 50vh) scale(1.8)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};
let rotate = 0;
let function1Pressing = true;
let function2Pressing = true;
let godButtonMode = 1;
let nowPlayingUmbrellaDSound = 0;
let nowPlayingUmbrellaDelay1Sound = 0;
let nowPlayingUmbrellaDelay2Sound = 0;
let unMutedTracks = [];
let isHeadFlagOpen = false;
let selectedTrack = [];
let step15IsPlaying = false;
let instrumentComponentSrc = "./assets/img/instrumentComponent/";
let longFlagMode = false;

function leaveTutorial() {
  $("#logoRed #menu h3.play").css("color", "#DBDBDD");
  $(".tutorial").fadeOut();
}

function toDescription() {
  $("body").css("overflow-y", "initial");
  $("html").css("overflow-y", "initial");
  $("body").css("background", "#DBDBDD");
  $("#logoRed #menu .toggle h3").css("color", "#B13234");
  $("#logoRed #menu .toggle h3.description").css("color", "rgba(0,0,0,0.6)");

  $("#logoRed img.logo").attr("src", "./assets/img/brandRed.svg");
  $("#logoRed #menu img.arrow").attr("src", "./assets/img/menu/menuArrowRed.svg");
  $("#sectionDescription").fadeIn();
}

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
const unBindAll = () => {
  leftDrum.unbind();
  rightDrum.unbind();
  string.unbind();
  god_button_1.unbind();
  god_button_2.unbind();
  flag_cut_top.unbind();
  flag_cut_bottom.unbind();
  head_flag.unbind();
  long_flag.unbind();
  umbrella1.unbind();
  umbrella2.unbind();
  umbrella3.unbind();
  umbrella4.unbind();
  level_switch.unbind();
};
const selectInstrumentComponent = (target, fileName, isDouble) => {
  if (isDouble) {
    // target.css("filter", "drop-shadow(0px 0px 0vh #ee8948) drop-shadow(0px 0px 0vh #ee8948)");
    target.css("animation", "shadowBreath_Double 1s alternate infinite");
  } else {
    // target.css("filter", "drop-shadow(0px 0px 0vh #ee8948)");
    target.css("animation", "shadowBreath 1s alternate infinite");
  }
  target.attr("src", instrumentComponentSrc + fileName);
  // setTimeout(() => {
  //   target.attr("src", instrumentComponentSrc + fileName);
  // }, 10);
};
const unSelectInstrumentComponent = (target, fileName) => {
  target.attr("src", instrumentComponentSrc + fileName);
  // target.css("filter", "none");
  target.css("animation", "none");
};
const unSelectAll = () => {
  unSelectInstrumentComponent(leftDrum, "left_drum.svg");
  unSelectInstrumentComponent(rightDrum, "right_drum.svg");
  unSelectInstrumentComponent(string, "string.svg");
  unSelectInstrumentComponent(god_button_1, "god_button_1.svg");
  unSelectInstrumentComponent(god_button_2, "god_button_2.svg");
  unSelectInstrumentComponent(flag_cut_top, "flag_cut.svg");
  unSelectInstrumentComponent(flag_cut_bottom, "flag_cut.svg");
  unSelectInstrumentComponent(head_flag, "head_flag.svg");
  unSelectInstrumentComponent(long_flag, "long_flag_l.svg");
  unSelectInstrumentComponent(umbrella1, "umbrella.svg");
  unSelectInstrumentComponent(umbrella2, "umbrella.svg");
  unSelectInstrumentComponent(umbrella3, "umbrella.svg");
  unSelectInstrumentComponent(umbrella4, "umbrella.svg");
  unSelectInstrumentComponent(level_switch, "level_switch.svg");
  unSelectInstrumentComponent(function_1, "function_1.svg");
  unSelectInstrumentComponent(function_2, "function_2.svg");
};
//For string==============
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

let player3 = new Tone.Player({
  url: "./assets/audio/壓帆旗/sonahigh_noStop.mp3",
  loop: true,
});
let player4 = new Tone.Player({
  url: "./assets/audio/菜刀旗/sonahigh_noStop.mp3",
  loop: true,
});

var pitchShift3 = new Tone.PitchShift({
  pitch: 0,
}).toMaster();
var pitchShift4 = new Tone.PitchShift({
  pitch: 0,
}).toMaster();

player3.connect(pitchShift3);
player4.connect(pitchShift4);
//===========================

let currentStep = 0;

const setListener = (step) => {
  switch (step) {
    case 0:
      unSelectAll();
      originalSize();
      break;
    case 1:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      leftDrum.click(() => {
        playSound(drumSound[0]);
      });
      rightDrum.click(() => {
        playSound(drumSound[0]);
      });
      break;
    case 2:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      unBindAll();
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
      break;
    case 3:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();

      string.on("touchstart", () => {
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
          pitchShift1.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          pitchShift2.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
        } else {
          player1.stop();
          player2.stop();
        }
      });
      string.on("touchend", () => {
        player1.stop();
        player2.stop();
      });
      break;
    case 4:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(string, "string_select.svg", false);
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      unBindAll();
      let nowPlayingMelodySound = 0;
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
      break;
    case 5:
      unSelectAll();
      originalSize();
      cutFlagZoomIn();
      selectInstrumentComponent(string, "string_select.svg", false);
      selectInstrumentComponent(flag_cut_top, "flag_cut.svg", true);
      selectInstrumentComponent(flag_cut_bottom, "flag_cut.svg", true);
      unBindAll();
      let flagCutTopStatus = 1;
      let flagCutBottomStatus = 1;

      flag_cut_top.on("swiped-down", () => {
        if (flagCutTopStatus === 1) {
          flag_cut_top.css("top", "113px");
          flagCutTopStatus = 0;
          stopPlaying();

          return;
        }
        if (flagCutTopStatus === 0) {
          flag_cut_top.css("top", "125px");
          flagCutTopStatus = -1;
          stopPlaying();

          return;
        }
      });

      flag_cut_top.on("swiped-up", () => {
        if (flagCutTopStatus === -1) {
          flag_cut_top.css("top", "113px");
          flagCutTopStatus = 0;
          stopPlaying();

          return;
        }
        if (flagCutTopStatus === 0) {
          flag_cut_top.css("top", "101px");
          flagCutTopStatus = 1;
          stopPlaying();

          return;
        }
      });

      flag_cut_bottom.on("swiped-down", () => {
        if (flagCutBottomStatus === 1) {
          flag_cut_bottom.css("top", "164px");
          flagCutBottomStatus = 0;
          stopPlaying();

          return;
        }
        if (flagCutBottomStatus === 0) {
          flag_cut_bottom.css("top", "176px");
          flagCutBottomStatus = -1;
          stopPlaying();

          return;
        }
      });

      flag_cut_bottom.on("swiped-up", () => {
        if (flagCutBottomStatus === -1) {
          flag_cut_bottom.css("top", "164px");
          flagCutBottomStatus = 0;
          stopPlaying();

          return;
        }
        if (flagCutBottomStatus === 0) {
          flag_cut_bottom.css("top", "152px");
          flagCutBottomStatus = 1;
          stopPlaying();

          return;
        }
      });
      string.on("touchstart", () => {
        $(`#${flagCutTopStatus}_${flagCutBottomStatus}`)[0].loop = true;
        playSound(`#${flagCutTopStatus}_${flagCutBottomStatus}`);
      });
      string.on("touchend", () => {
        $(`#${flagCutTopStatus}_${flagCutBottomStatus}`)[0].loop = false;
        pauseSound(`#${flagCutTopStatus}_${flagCutBottomStatus}`);
      });
      break;
    case 6:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(function_2, "function_2_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      stopPlaying();
      unBindAll();
      //Nothing happen
      break;
    case 7:
      unSelectAll();
      originalSize();
      umbrellaZoomIn();
      selectInstrumentComponent(umbrella1, "umbrella.svg", true);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      let nowPlayingUmbrellaASound = 0;

      umbrella1.click(() => {
        console.log(nowPlayingUmbrellaASound);
        if (nowPlayingUmbrellaASound === umbrellaA.length - 1) {
          nowPlayingUmbrellaASound = 0;
        } else {
          nowPlayingUmbrellaASound++;
        }

        rotate += 90;
        umbrella1.css("transform", `rotate(${rotate}deg)`);
      });
      leftDrum.click(() => {
        playSound(umbrellaA[nowPlayingUmbrellaASound]);
      });
      rightDrum.click(() => {
        playSound(umbrellaA[nowPlayingUmbrellaASound]);
      });
      break;
    case 8:
      unSelectAll();
      selectInstrumentComponent(umbrella2, "umbrella.svg", true);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      rotate = 0;
      umbrella1.css("transform", `rotate(${rotate}deg)`);

      umbrella2.click(() => {
        if (nowPlayingUmbrellaDSound === umbrellaD.length - 1) {
          nowPlayingUmbrellaDSound = 0;
        } else {
          nowPlayingUmbrellaDSound++;
        }
        rotate += 90;
        umbrella2.css("transform", `rotate(${rotate}deg)`);
      });
      leftDrum.click(() => {
        playSound(umbrellaD[nowPlayingUmbrellaDSound]);
      });
      rightDrum.click(() => {
        playSound(umbrellaD[nowPlayingUmbrellaDSound]);
      });

      break;
    case 9:
      unSelectAll();
      selectInstrumentComponent(umbrella3, "umbrella.svg", true);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();

      rotate = 0;
      umbrella2.css("transform", `rotate(${rotate}deg)`);

      umbrella3.click(() => {
        if (nowPlayingUmbrellaDelay1Sound === umbrellaDelay1.length - 1) {
          nowPlayingUmbrellaDelay1Sound = 0;
        } else {
          nowPlayingUmbrellaDelay1Sound++;
        }
        rotate += 90;
        umbrella3.css("transform", `rotate(${rotate}deg)`);
      });
      leftDrum.click(() => {
        playSound(umbrellaDelay1[nowPlayingUmbrellaDelay1Sound]);
      });
      rightDrum.click(() => {
        playSound(umbrellaDelay1[nowPlayingUmbrellaDelay1Sound]);
      });
      break;
    case 10:
      unSelectAll();
      umbrellaZoomIn();
      selectInstrumentComponent(umbrella4, "umbrella.svg", true);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      rotate = 0;
      umbrella3.css("transform", `rotate(${rotate}deg)`);
      umbrella4.click(() => {
        if (nowPlayingUmbrellaDelay2Sound === umbrellaDelay2.length - 1) {
          nowPlayingUmbrellaDelay2Sound = 0;
        } else {
          nowPlayingUmbrellaDelay2Sound++;
        }
        rotate += 90;
        umbrella4.css("transform", `rotate(${rotate}deg)`);
      });
      leftDrum.click(() => {
        playSound(umbrellaDelay2[nowPlayingUmbrellaDelay2Sound]);
      });
      rightDrum.click(() => {
        playSound(umbrellaDelay2[nowPlayingUmbrellaDelay2Sound]);
      });
      break;
    case 11:
      unSelectAll();
      originalSize();
      longFlagZoomIn();
      selectInstrumentComponent(string, "string_select.svg", false);
      selectInstrumentComponent(long_flag, "long_flag_l.svg", true);

      unBindAll();
      rotate = 0;
      umbrella4.css("transform", `rotate(${rotate}deg)`);

      document.querySelector("#sonahigh").playbackRate = 8;
      long_flag.click(() => {
        if (!longFlagMode) {
          $(".long_flag").attr("src", "./assets/img/instrumentComponent/long_flag_r.svg");
        } else {
          $(".long_flag").attr("src", "./assets/img/instrumentComponent/long_flag_l.svg");
        }
        longFlagMode = !longFlagMode;
      });

      string.on("touchstart", () => {
        if (longFlagMode) {
          player3.start();
          setTimeout(() => {
            player4.start();
          }, 5);
        } else {
          player1.start();
          setTimeout(() => {
            player2.start();
          }, 5);
        }
      });
      string.on("touchmove", function (e) {
        let stringRightBoundary = this.getBoundingClientRect().right - 30;
        let stringLeftBoundary = this.getBoundingClientRect().left + 50;
        let mousePosition = e.touches[0].clientX;
        let middle = (stringRightBoundary + stringLeftBoundary) / 2;

        if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
          if (longFlagMode) {
            pitchShift3.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
            pitchShift4.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          } else {
            pitchShift1.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
            pitchShift2.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          }
        } else {
          if (longFlagMode) {
            player3.stop();
            player4.stop();
          } else {
            player1.stop();
            player2.stop();
          }
        }
      });
      string.on("touchend", () => {
        if (longFlagMode) {
          player3.stop();
          player4.stop();
        } else {
          player1.stop();
          player2.stop();
        }
      });
      break;
    case 12:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
      selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
      unBindAll();
      // //Nothing happen
      break;
    case 13:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(level_switch, "level_switch.svg", true);
      unBindAll();
      level_switch.css({
        top: "262px",
        left: "70px",
      });
      level_switch.on("swiped-up", function () {
        level_switch.css({
          top: "252px",
          left: "80px",
        });
      });
      // //Nothing happen
      break;
    case 14:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
      level_switch.css({
        top: "252px",
        left: "80px",
      });
      // //Nothing happen
      break;
    case 15:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      $("#BeiguanD1")[0].loop = true;
      $("#BeiguanD1")[0].playbackRate = 4.58;
      rightDrum.click(() => {
        if (function1Pressing && !step15IsPlaying) {
          step15IsPlaying = true;
          playPausedSound("#BeiguanD1");
        }
      });

      leftDrum.click(() => {
        if (function1Pressing) {
          step15IsPlaying = false;
          pauseSound("#BeiguanD1");
        }
      });
      break;
    case 16:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(function_2, "function_2_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      $("#BeiguanD1")[0].loop = false;
      unBindAll();
      let isRecording = false;

      function_2.on("touchstart", () => {
        if (godButtonMode === 1) playPausedSound(drumSound[5]);
      });

      string.on("touchstart", () => {
        if (godButtonMode === 2) {
          player1.start();
          setTimeout(() => {
            player2.start();
          }, 5);
        }
      });
      string.on("touchmove", function (e) {
        let stringRightBoundary = this.getBoundingClientRect().right - 30;
        let stringLeftBoundary = this.getBoundingClientRect().left + 50;
        let mousePosition = e.touches[0].clientX;
        let middle = (stringRightBoundary + stringLeftBoundary) / 2;

        if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
          pitchShift1.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          pitchShift2.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
        } else {
          player1.stop();
          player2.stop();
        }
      });
      string.on("touchend", () => {
        player1.stop();
        player2.stop();
      });

      break;
    case 17:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
      selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(string, "string_select.svg", false);
      $("#BeiguanD1")[0].loop = true;
      $("#BeiguanD1")[0].playbackRate = 4.58;
      $("#BeiguanD1")[0].volume = 1;
      playPausedSound("#BeiguanD1");

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

      string.on("touchstart", () => {
        if (godButtonMode === 2) {
          player1.start();
          setTimeout(() => {
            player2.start();
          }, 5);
        }
      });
      string.on("touchmove", function (e) {
        let stringRightBoundary = this.getBoundingClientRect().right - 30;
        let stringLeftBoundary = this.getBoundingClientRect().left + 50;
        let mousePosition = e.touches[0].clientX;
        let middle = (stringRightBoundary + stringLeftBoundary) / 2;

        if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
          pitchShift1.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          pitchShift2.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
        } else {
          player1.stop();
          player2.stop();
        }
      });
      string.on("touchend", () => {
        player1.stop();
        player2.stop();
      });
      break;
    case 18:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(level_switch, "level_switch.svg", true);
      unBindAll();
      stopPlaying();
      $("#BeiguanD1")[0].loop = false;
      level_switch.css({ top: "252px", left: "80px" });
      level_switch.on("swiped-up", function () {
        level_switch.css({
          top: "242px",
          left: "90px",
        });
      });
      //Nothing happen
      break;
    case 19:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
      level_switch.css({
        top: "242px",
        left: "90px",
      });
      //Nothing happen
      break;
    case 20:
      unSelectAll();
      headFlagZoomIn();
      selectInstrumentComponent(head_flag, "head_flag.svg", true);

      unBindAll();
      $("#track1")[0].loop = true;
      $("#track2")[0].loop = true;
      head_flag.click(() => {
        if (!isHeadFlagOpen) {
          playPausedSound("#track1");
          playPausedSound("#track2");
          head_flag.css("transform", "rotate(90deg)");
          isHeadFlagOpen = true;
        } else {
          pauseSound("#track1");
          pauseSound("#track2");
          head_flag.css("transform", "rotate(0deg)");
          isHeadFlagOpen = false;
        }
      });

      break;
    case 21:
      isHeadFlagOpen = false;
      unSelectAll();
      originalSize();
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      unBindAll();
      stopPlaying();
      let track2Playing = false;
      head_flag.css("transform", "rotate(90deg)");
      playPausedSound("#track1");
      playPausedSound("#track2");
      rightDrum.click(() => {
        if (function1Pressing) {
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

      break;
    case 22:
      unSelectAll();
      originalSize();
      stopPlaying();
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(head_flag, "head_flag.svg", true);
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
      head_flag.css("transform", "rotate(0deg)");
      tracks.forEach((track) => {
        $(`${track}`)[0].loop = true;
      });
      head_flag.click(() => {
        stopPlaying();
        if (!isHeadFlagOpen) {
          alignSoundTracks();

          head_flag.css("transform", "rotate(90deg)");
          unMutedTracks.forEach((track) => {
            playPausedSound(track);
          });
          isHeadFlagOpen = true;
        } else {
          head_flag.css("transform", "rotate(0deg)");
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
      string.on("touchstart", () => {
        selectedTrack = [];
      });
      string.on("touchmove", function (e) {
        let stringRightBoundary = this.getBoundingClientRect().right - 30;
        let stringLeftBoundary = this.getBoundingClientRect().left + 50;
        let oneSectionWidth = (stringRightBoundary - stringLeftBoundary) / 4;
        let mousePosition = e.touches[0].clientX;

        if (stringLeftBoundary < mousePosition && mousePosition < stringLeftBoundary + oneSectionWidth) {
          if (!selectedTrack.find((track) => track === tracks[0])) selectedTrack.push(tracks[0]);
          console.log(selectedTrack);
        } else if (
          stringLeftBoundary + oneSectionWidth < mousePosition &&
          mousePosition < stringLeftBoundary + oneSectionWidth * 2
        ) {
          if (!selectedTrack.find((track) => track === tracks[1])) selectedTrack.push(tracks[1]);
          console.log(selectedTrack);
        } else if (
          stringLeftBoundary + oneSectionWidth * 2 < mousePosition &&
          mousePosition < stringLeftBoundary + oneSectionWidth * 3
        ) {
          if (!selectedTrack.find((track) => track === tracks[2])) selectedTrack.push(tracks[2]);
          console.log(selectedTrack);
        } else if (
          stringLeftBoundary + oneSectionWidth * 3 < mousePosition &&
          mousePosition < stringLeftBoundary + oneSectionWidth * 4
        ) {
          if (!selectedTrack.find((track) => track === tracks[3])) selectedTrack.push(tracks[3]);
          console.log(selectedTrack);
        }
      });
      leftDrum.click(() => {
        if (function1Pressing) {
          selectedTrack.forEach((track) => {
            unMutedTracks = unMutedTracks.filter((unmuteTrack) => !selectedTrack.find((item) => item === unmuteTrack));
          });
        }
        console.log(unMutedTracks);
      });
      rightDrum.click(() => {
        if (function1Pressing) {
          selectedTrack.forEach((track) => {
            if (!unMutedTracks.find((unmuteTrack) => unmuteTrack === track)) unMutedTracks.push(track);
          });
        }
        console.log(unMutedTracks);
      });

      break;
    case 23:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(head_flag, "head_flag.svg", true);
      selectInstrumentComponent(string, "string_select.svg", false);
      selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
      selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
      unBindAll();
      if (unMutedTracks.length === 0) unMutedTracks = ["#track1", "#track2"];
      head_flag.click(() => {
        stopPlaying();
        if (!isHeadFlagOpen) {
          alignSoundTracks();
          head_flag.css("transform", "rotate(90deg)");
          unMutedTracks.forEach((track) => {
            playPausedSound(track);
          });
          isHeadFlagOpen = true;
        } else {
          head_flag.css("transform", "rotate(0deg)");
          unMutedTracks.forEach((track) => {
            pauseSound(track);
          });
          isHeadFlagOpen = false;
        }
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

      string.on("touchstart", () => {
        if (godButtonMode === 2) {
          player1.start();
          setTimeout(() => {
            player2.start();
          }, 5);
        }
      });
      string.on("touchmove", function (e) {
        let stringRightBoundary = this.getBoundingClientRect().right - 30;
        let stringLeftBoundary = this.getBoundingClientRect().left + 50;
        let mousePosition = e.touches[0].clientX;
        let middle = (stringRightBoundary + stringLeftBoundary) / 2;

        if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
          pitchShift1.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          pitchShift2.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
        } else {
          player1.stop();
          player2.stop();
        }
      });
      string.on("touchend", () => {
        player1.stop();
        player2.stop();
      });
      break;
    case 24:
      unBindAll();
      originalSize();
      stopPlaying();
      $(".stepBtn.next").css("display", "none");
      $(".stepBtn.review").css("display", "none");
      $(".stepBtn.jump").css("display", "block");
      break;
    default:
      console.log("error");
  }
};
$(".stepBtn.next").css("display", "none");
$(".stepBtn.review").css("display", "none");
$(".stepBtn.jump").css("display", "none");
$(".stepBtn.next").click(() => {
  if (currentStep < 24) currentStep++;
  console.log(currentStep);
  $(".instructionContainer .step").css(
    "background-image",
    `url("../../assets/img/order_full_img/order_full_img_${currentStep + 1}.svg")`
  );
  $(".instructionContainer .instruction").css(
    "background-image",
    `url("../../assets/img/detail_full_img/detail_full_img_${currentStep + 1}.png")`
  );
  setListener(currentStep);
});

$(".stepBtn.review").click(() => {
  stopPlaying();
  if (currentStep >= 1) currentStep--;
  $(".instructionContainer .step").css(
    "background-image",
    `url("../../assets/img/order_full_img/order_full_img_${currentStep + 1}.svg")`
  );
  $(".instructionContainer .instruction").css(
    "background-image",
    `url("../../assets/img/detail_full_img/detail_full_img_${currentStep + 1}.png")`
  );
  setListener(currentStep);
});

$(".stepBtn.start").click(() => {
  unSelectAll();

  currentStep = 1;

  $(".stepBtn.next").css("display", "block");
  $(".stepBtn.review").css("display", "block");
  $(".stepBtn.start").css("display", "none");
  $(".instructionContainer .step").css(
    "background-image",
    `url("../../assets/img/order_full_img/order_full_img_2.svg")`
  );
  $(".instructionContainer .instruction").css(
    "background-image",
    `url("../../assets/img/detail_full_img/detail_full_img_2.png")`
  );

  setListener(currentStep);
});
$(".stepBtn.jump").click(() => {
  unSelectAll();
  leaveTutorial();
  toDescription();
  currentStep = 0;

  $(".stepBtn.start").css("display", "block");
  $(".stepBtn.jump").css("display", "none");
  $(".instructionContainer .step").css(
    "background-image",
    `url("../../assets/img/order_full_img/order_full_img_1.svg")`
  );
  $(".instructionContainer .instruction").css(
    "background-image",
    `url("../../assets/img/detail_full_img/detail_full_img_1.png")`
  );
  setListener(currentStep);
});
