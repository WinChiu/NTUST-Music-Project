"use strict";

var leftDrum = $(".leftDrum");
var rightDrum = $(".rightDrum");
var string = $(".string");
var god_button_1 = $(".god_button_1");
var god_button_2 = $(".god_button_2");
var flag_cut_top = $(".flag_cut_top");
var flag_cut_bottom = $(".flag_cut_bottom");
var head_flag = $(".head_flag");
var long_flag = $(".long_flag");
var umbrella1 = $(".umbrella1");
var umbrella2 = $(".umbrella2");
var umbrella3 = $(".umbrella3");
var umbrella4 = $(".umbrella4");
var level_switch = $(".level_switch");
var function_1 = $(".function_1");
var function_2 = $(".function_2");
var drumSound = ["#BeiguanC1", "#BeiguanC4", "#BeiguanC6", "#BeiguanC8", "#BeiguanD1", "#BeiguanD3", "#BeiguanD7"];
var melodySound = []; //to be added

var umbrellaA = ["#A1", "#A2", "#A3", "#A4"];
var umbrellaD = ["#D1", "#D2", "#D3", "#D4", "#D5"];
var umbrellaDelay1 = ["#delay1", "#delay2", "#delay3"];
var umbrellaDelay2 = ["#delay4-1", "#delay4-2", "#delay4-3"];
var tracks = ["#track1", "#track2", "#track3", "#track4"];
var instrumentContainer = $(".instrument");
var instrumentDisplayArea = $(".displayArea");

var originalSize = function originalSize() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(0,0) scale(" + 0.9 * vw / 1280 + ") rotate(0)");
  instrumentDisplayArea.css("margin-bottom", "6vh");
};

var case_2_ZoomIn = function case_2_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(30vw, 35vh) scale(" + vw / 1280 * 1.4 + ")");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_15_ZoomIn = function case_15_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(30vw, 35vh) scale(" + vw / 1280 * 1.4 + ")");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_16_ZoomIn = function case_16_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(30vw, 35vh) scale(" + vw / 1280 * 1.4 + ")");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_21_ZoomIn = function case_21_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(30vw, 35vh) scale(" + vw / 1280 * 1.4 + ")");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_3_ZoomIn = function case_3_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(-5vw, 10vh) scale(" + vw / 1280 * 1.2 + ") rotate(10deg)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_4_ZoomIn = function case_4_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(5vw, -20vh) scale(" + vw / 1280 * 1.1 + ") rotate(-12deg)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_14_ZoomIn = function case_14_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(5vw, -20vh) scale(" + vw / 1280 * 1.1 + ") rotate(-12deg)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_19_ZoomIn = function case_19_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(5vw, -20vh) scale(" + vw / 1280 * 1.1 + ") rotate(-12deg)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_6_ZoomIn = function case_6_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(30vw, 35vh) scale(" + vw / 1280 * 1.4 + ")");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_12_ZoomIn = function case_12_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(30vw, 0) scale(" + vw / 1280 * 1.4 + ") rotate(0)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_13_ZoomIn = function case_13_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(40vw, 5vh) scale(" + vw / 1280 * 1.5 + ") rotate(0)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var case_18_ZoomIn = function case_18_ZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(40vw, 5vh) scale(" + vw / 1280 * 1.5 + ") rotate(0)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var cutFlagZoomIn = function cutFlagZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(10vw, 30vh) scale(" + vw / 1280 * 1.5 + ")");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var longFlagZoomIn = function longFlagZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(-3vw, 5vh) scale(" + vw / 1280 * 1.2 + ") rotate(4deg)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var umbrellaZoomIn = function umbrellaZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(19vw, 32vh) scale(" + vw / 1280 * 1.35 + ") ");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var headFlagZoomIn = function headFlagZoomIn() {
  var vw = window.innerWidth;
  instrumentContainer.css("transform", "translate(20vw, 50vh) scale(" + vw / 1280 * 1.8 + ")");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var rotate = 0;
var function1Pressing = true;
var function2Pressing = true;
var godButtonMode = 1;
var nowPlayingUmbrellaDSound = 0;
var nowPlayingUmbrellaDelay1Sound = 0;
var nowPlayingUmbrellaDelay2Sound = 0;
var unMutedTracks = [];
var isHeadFlagOpen = false;
var selectedTrack = [];
var step15IsPlaying = false;
var instrumentComponentSrc = "./assets/img/instrumentComponent/";
var longFlagMode = false;

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

var stopPlaying = function stopPlaying() {
  $("audio").each(function () {
    this.pause();
    this.currentTime = 0;
  });
};

var alignSoundTracks = function alignSoundTracks() {
  $("audio").each(function () {
    this.currentTime = 0;
  });
};

var playSound = function playSound(soundCode) {
  stopPlaying();

  if ($(soundCode)[0]) {
    $(soundCode)[0].currentTime = 0;
    $(soundCode)[0].play();
  }
};

var playPausedSound = function playPausedSound(soundCode) {
  $(soundCode)[0].currentTime = 0;
  $(soundCode)[0].play();
};

var pauseSound = function pauseSound(soundCode) {
  $(soundCode)[0].pause();
};

var unBindAll = function unBindAll() {
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

var selectInstrumentComponent = function selectInstrumentComponent(target, fileName, isDouble) {
  if (isDouble) {
    // target.css("filter", "drop-shadow(0px 0px 0vh #ee8948) drop-shadow(0px 0px 0vh #ee8948)");
    target.css("animation", "shadowBreath_Double 1s alternate infinite");
    target.css("cursor", "pointer");
    target.addClass("select");
  } else {
    // target.css("filter", "drop-shadow(0px 0px 0vh #ee8948)");
    target.css("animation", "shadowBreath 1s alternate infinite");
    target.css("cursor", "pointer");
    target.addClass("select");
  }

  target.attr("src", instrumentComponentSrc + fileName); // setTimeout(() => {
  //   target.attr("src", instrumentComponentSrc + fileName);
  // }, 10);
};

var unSelectInstrumentComponent = function unSelectInstrumentComponent(target, fileName) {
  target.attr("src", instrumentComponentSrc + fileName); // target.css("filter", "none");

  target.css("animation", "none");
  target.css("cursor", "initial");
  target.removeClass("select");
};

var unSelectAll = function unSelectAll() {
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
}; //For string==============


var player1 = new Tone.Player({
  url: "./assets/audio/菜刀旗/sona0 0_noStop.mp3",
  loop: true
});
var player2 = new Tone.Player({
  url: "./assets/audio/菜刀旗/sona0 0_noStop.mp3",
  loop: true
});
var pitchShift1 = new Tone.PitchShift({
  pitch: 0
}).toMaster();
var pitchShift2 = new Tone.PitchShift({
  pitch: 0
}).toMaster();
player1.connect(pitchShift1);
player2.connect(pitchShift2);
var player3 = new Tone.Player({
  url: "./assets/audio/壓帆旗/sonahigh_noStop.mp3",
  loop: true
});
var player4 = new Tone.Player({
  url: "./assets/audio/菜刀旗/sonahigh_noStop.mp3",
  loop: true
});
var pitchShift3 = new Tone.PitchShift({
  pitch: 0
}).toMaster();
var pitchShift4 = new Tone.PitchShift({
  pitch: 0
}).toMaster();
player3.connect(pitchShift3);
player4.connect(pitchShift4); //===========================

var currentStep = 0;

var setListener = function setListener(step) {
  switch (step) {
    case 0:
      unSelectAll();
      originalSize();
      unBindAll();
      break;

    case 1:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      leftDrum.click(function () {
        playSound(drumSound[0]);
      });
      rightDrum.click(function () {
        playSound(drumSound[0]);
      });
      break;

    case 2:
      unSelectAll();
      case_2_ZoomIn();
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      unBindAll();
      var nowPlayingDrumSound = 0; // function_1.on("touchstart", () => {
      //   function1Pressing = true;
      // });
      // function_1.on("touchend", () => {
      //   function1Pressing = false;
      // });

      leftDrum.click(function () {
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
      rightDrum.click(function () {
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
      case_3_ZoomIn();
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
      string.on("touchstart", function () {
        player1.start();
        setTimeout(function () {
          player2.start();
        }, 5);
      });
      string.on("touchmove", function (e) {
        var stringRightBoundary = this.getBoundingClientRect().right - 30;
        var stringLeftBoundary = this.getBoundingClientRect().left + 50;
        var mousePosition = e.touches[0].clientX;
        var middle = (stringRightBoundary + stringLeftBoundary) / 2;

        if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
          pitchShift1.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          pitchShift2.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
        } else {
          player1.stop();
          player2.stop();
        }
      });
      string.on("touchend", function () {
        player1.stop();
        player2.stop();
      });
      break;

    case 4:
      unSelectAll();
      case_4_ZoomIn();
      selectInstrumentComponent(string, "string_select.svg", false);
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      unBindAll();
      var nowPlayingMelodySound = 0;
      string.on("swiped-left", function () {
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
      string.on("swiped-right", function () {
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
      var flagCutTopStatus = 1;
      var flagCutBottomStatus = 1;
      flag_cut_top.on("swiped-down", function () {
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
      flag_cut_top.on("swiped-up", function () {
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
      flag_cut_bottom.on("swiped-down", function () {
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
      flag_cut_bottom.on("swiped-up", function () {
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
      string.on("touchstart", function () {
        $("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus))[0].loop = true;
        playSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
        console.log("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
      });
      string.on("touchend", function () {
        $("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus))[0].loop = false;
        pauseSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
      });
      break;

    case 6:
      unSelectAll();
      case_6_ZoomIn();
      selectInstrumentComponent(function_2, "function_2_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      stopPlaying();
      unBindAll(); //Nothing happen

      break;

    case 7:
      unSelectAll();
      originalSize();
      umbrellaZoomIn();
      selectInstrumentComponent(umbrella1, "umbrella.svg", true);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      var nowPlayingUmbrellaASound = 0;
      umbrella1.click(function () {
        if (nowPlayingUmbrellaASound === umbrellaA.length - 1) {
          nowPlayingUmbrellaASound = 0;
        } else {
          nowPlayingUmbrellaASound++;
        }

        rotate += 90;
        umbrella1.css("transform", "rotate(".concat(rotate, "deg)"));
      });
      leftDrum.click(function () {
        playSound(umbrellaA[nowPlayingUmbrellaASound]);
      });
      rightDrum.click(function () {
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
      umbrella1.css("transform", "rotate(".concat(rotate, "deg)"));
      umbrella2.click(function () {
        if (nowPlayingUmbrellaDSound === umbrellaD.length - 1) {
          nowPlayingUmbrellaDSound = 0;
        } else {
          nowPlayingUmbrellaDSound++;
        }

        rotate += 90;
        umbrella2.css("transform", "rotate(".concat(rotate, "deg)"));
      });
      leftDrum.click(function () {
        playSound(umbrellaD[nowPlayingUmbrellaDSound]);
      });
      rightDrum.click(function () {
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
      umbrella2.css("transform", "rotate(".concat(rotate, "deg)"));
      umbrella3.click(function () {
        if (nowPlayingUmbrellaDelay1Sound === umbrellaDelay1.length - 1) {
          nowPlayingUmbrellaDelay1Sound = 0;
        } else {
          nowPlayingUmbrellaDelay1Sound++;
        }

        rotate += 90;
        umbrella3.css("transform", "rotate(".concat(rotate, "deg)"));
      });
      leftDrum.click(function () {
        playSound(umbrellaDelay1[nowPlayingUmbrellaDelay1Sound]);
      });
      rightDrum.click(function () {
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
      umbrella3.css("transform", "rotate(".concat(rotate, "deg)"));
      umbrella4.click(function () {
        if (nowPlayingUmbrellaDelay2Sound === umbrellaDelay2.length - 1) {
          nowPlayingUmbrellaDelay2Sound = 0;
        } else {
          nowPlayingUmbrellaDelay2Sound++;
        }

        rotate += 90;
        umbrella4.css("transform", "rotate(".concat(rotate, "deg)"));
      });
      leftDrum.click(function () {
        playSound(umbrellaDelay2[nowPlayingUmbrellaDelay2Sound]);
      });
      rightDrum.click(function () {
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
      umbrella4.css("transform", "rotate(".concat(rotate, "deg)"));
      document.querySelector("#sonahigh").playbackRate = 8;
      long_flag.click(function () {
        if (!longFlagMode) {
          $(".long_flag").attr("src", "./assets/img/instrumentComponent/long_flag_r.svg");
        } else {
          $(".long_flag").attr("src", "./assets/img/instrumentComponent/long_flag_l.svg");
        }

        longFlagMode = !longFlagMode;
      });
      string.on("touchstart", function () {
        if (longFlagMode) {
          player3.start();
          setTimeout(function () {
            player4.start();
          }, 5);
        } else {
          player1.start();
          setTimeout(function () {
            player2.start();
          }, 5);
        }
      });
      string.on("touchmove", function (e) {
        var stringRightBoundary = this.getBoundingClientRect().right - 30;
        var stringLeftBoundary = this.getBoundingClientRect().left + 50;
        var mousePosition = e.touches[0].clientX;
        var middle = (stringRightBoundary + stringLeftBoundary) / 2;

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
      string.on("touchend", function () {
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
      case_12_ZoomIn();
      selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
      selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
      unBindAll();
      $(".god_button_1").click(function () {
        unSelectInstrumentComponent(god_button_1, "god_button_1.svg");
      });
      $(".god_button_2").click(function () {
        unSelectInstrumentComponent(god_button_2, "god_button_2.svg");
      }); // //Nothing happen

      break;

    case 13:
      unSelectAll();
      case_13_ZoomIn();
      selectInstrumentComponent(level_switch, "level_switch.svg", true);
      unBindAll();
      level_switch.css({
        top: "262px",
        left: "70px"
      });
      level_switch.on("swiped-up", function () {
        level_switch.css({
          top: "252px",
          left: "80px"
        });
      });
      level_switch.click(function () {
        level_switch.css({
          top: "252px",
          left: "80px"
        });
      }); // //Nothing happen

      break;

    case 14:
      unSelectAll();
      case_14_ZoomIn();
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
      $("#BeiguanD1")[0].loop = false;
      $("#BeiguanD1")[0].playbackRate = 1;
      level_switch.css({
        top: "252px",
        left: "80px"
      }); // //Nothing happen

      break;

    case 15:
      unSelectAll();
      case_15_ZoomIn();
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      $("#BeiguanD1")[0].loop = true;
      $("#BeiguanD1")[0].playbackRate = 4.58;
      rightDrum.click(function () {
        if (function1Pressing && !step15IsPlaying) {
          step15IsPlaying = true;
          playPausedSound("#BeiguanD1");
        }
      });
      leftDrum.click(function () {
        if (function1Pressing) {
          step15IsPlaying = false;
          pauseSound("#BeiguanD1");
        }
      });
      break;

    case 16:
      unSelectAll();
      case_16_ZoomIn();
      selectInstrumentComponent(function_2, "function_2_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      $("#BeiguanD1")[0].loop = true;
      $("#BeiguanD1")[0].playbackRate = 4.68;
      $("#BeiguanD1")[0].volume = 0.5;
      unBindAll();
      var isRecording = false; // function_2.on("touchstart", () => {
      //   function2Pressing = true;
      // });
      // function_2.on("touchend", () => {
      //   function2Pressing = false;
      // });

      rightDrum.click(function () {
        if (function2Pressing) playPausedSound("#BeiguanD1");
      });
      leftDrum.click(function () {
        if (function2Pressing) pauseSound("#BeiguanD1");
      }); // string.on("touchstart", () => {
      //   if (godButtonMode === 2) {
      //     player1.start();
      //     setTimeout(() => {
      //       player2.start();
      //     }, 5);
      //   }
      // });
      // string.on("touchmove", function (e) {
      //   let stringRightBoundary = this.getBoundingClientRect().right - 30;
      //   let stringLeftBoundary = this.getBoundingClientRect().left + 50;
      //   let mousePosition = e.touches[0].clientX;
      //   let middle = (stringRightBoundary + stringLeftBoundary) / 2;
      //   if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
      //     pitchShift1.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
      //     pitchShift2.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
      //   } else {
      //     player1.stop();
      //     player2.stop();
      //   }
      // });
      // string.on("touchend", () => {
      //   player1.stop();
      //   player2.stop();
      // });

      break;

    case 17:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
      selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
      $("#BeiguanD1")[0].loop = true;
      $("#BeiguanD1")[0].playbackRate = 4.58;
      $("#BeiguanD1")[0].volume = 1;
      playPausedSound("#BeiguanD1");
      $(".god_button_1").click(function () {
        selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
        unSelectInstrumentComponent(god_button_2, "god_button_2.svg");
      });
      $(".god_button_2").click(function () {
        selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
        unSelectInstrumentComponent(god_button_1, "god_button_1.svg");
      });
      god_button_1.click(function () {
        godButtonMode = 1;
      });
      god_button_2.click(function () {
        godButtonMode = 2;
      });
      leftDrum.click(function () {
        if (godButtonMode === 1) playPausedSound(drumSound[5]);
      });
      rightDrum.click(function () {
        if (godButtonMode === 1) playPausedSound(drumSound[5]);
      });
      string.on("touchstart", function () {
        if (godButtonMode === 2) {
          player1.start();
          setTimeout(function () {
            player2.start();
          }, 5);
        }
      });
      string.on("touchmove", function (e) {
        var stringRightBoundary = this.getBoundingClientRect().right - 30;
        var stringLeftBoundary = this.getBoundingClientRect().left + 50;
        var mousePosition = e.touches[0].clientX;
        var middle = (stringRightBoundary + stringLeftBoundary) / 2;

        if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
          pitchShift1.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          pitchShift2.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
        } else {
          player1.stop();
          player2.stop();
        }
      });
      string.on("touchend", function () {
        player1.stop();
        player2.stop();
      });
      break;

    case 18:
      unSelectAll();
      case_18_ZoomIn();
      selectInstrumentComponent(level_switch, "level_switch.svg", true);
      unBindAll();
      stopPlaying();
      $("#BeiguanD1")[0].loop = false;
      $("#BeiguanD1")[0].playbackRate = 1;
      level_switch.css({
        top: "252px",
        left: "80px"
      });
      level_switch.on("swiped-up", function () {
        level_switch.css({
          top: "242px",
          left: "90px"
        });
      });
      level_switch.click(function () {
        level_switch.css({
          top: "242px",
          left: "90px"
        });
      }); //Nothing happen

      break;

    case 19:
      unSelectAll();
      case_19_ZoomIn();
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
      $("#track1")[0].loop = false;
      $("#track2")[0].loop = false;
      level_switch.css({
        top: "242px",
        left: "90px"
      }); //Nothing happen

      break;

    case 20:
      unSelectAll();
      headFlagZoomIn();
      selectInstrumentComponent(head_flag, "head_flag.svg", true);
      unBindAll();
      $("#track1")[0].loop = true;
      $("#track2")[0].loop = true;
      head_flag.click(function () {
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
      case_21_ZoomIn();
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      unBindAll();
      stopPlaying();
      var track2Playing = false;
      head_flag.css("transform", "rotate(90deg)");
      playPausedSound("#track1");
      playPausedSound("#track2");
      rightDrum.click(function () {
        if (function1Pressing) {
          alignSoundTracks();
          playPausedSound("#track2");
          track2Playing = true;
        }
      });
      leftDrum.click(function () {
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
      tracks.forEach(function (track) {
        $("".concat(track))[0].loop = true;
      });
      head_flag.click(function () {
        stopPlaying();

        if (!isHeadFlagOpen) {
          alignSoundTracks();
          head_flag.css("transform", "rotate(90deg)");
          unMutedTracks.forEach(function (track) {
            playPausedSound(track);
          });
          isHeadFlagOpen = true;
        } else {
          head_flag.css("transform", "rotate(0deg)");
          unMutedTracks.forEach(function (track) {
            pauseSound(track);
          });
          isHeadFlagOpen = false;
        }
      });
      string.on("swiped-left", function () {
        if (function1Pressing) {
          if (selectedTrack === 0) {
            selectedTrack = tracks.length - 1;
          } else {
            selectedTrack--;
          }
        }
      });
      string.on("swiped-right", function () {
        if (function1Pressing) {
          if (selectedTrack === tracks.length - 1) {
            selectedTrack = 0;
          } else {
            selectedTrack++;
          }
        }
      });
      string.on("touchstart", function () {
        selectedTrack = [];
      });
      string.on("touchmove", function (e) {
        var stringRightBoundary = this.getBoundingClientRect().right - 30;
        var stringLeftBoundary = this.getBoundingClientRect().left + 50;
        var oneSectionWidth = (stringRightBoundary - stringLeftBoundary) / 4;
        var mousePosition = e.touches[0].clientX;

        if (stringLeftBoundary < mousePosition && mousePosition < stringLeftBoundary + oneSectionWidth) {
          if (!selectedTrack.find(function (track) {
            return track === tracks[0];
          })) selectedTrack.push(tracks[0]);
        } else if (stringLeftBoundary + oneSectionWidth < mousePosition && mousePosition < stringLeftBoundary + oneSectionWidth * 2) {
          if (!selectedTrack.find(function (track) {
            return track === tracks[1];
          })) selectedTrack.push(tracks[1]);
        } else if (stringLeftBoundary + oneSectionWidth * 2 < mousePosition && mousePosition < stringLeftBoundary + oneSectionWidth * 3) {
          if (!selectedTrack.find(function (track) {
            return track === tracks[2];
          })) selectedTrack.push(tracks[2]);
        } else if (stringLeftBoundary + oneSectionWidth * 3 < mousePosition && mousePosition < stringLeftBoundary + oneSectionWidth * 4) {
          if (!selectedTrack.find(function (track) {
            return track === tracks[3];
          })) selectedTrack.push(tracks[3]);
        }
      });
      leftDrum.click(function () {
        if (function1Pressing) {
          selectedTrack.forEach(function (track) {
            unMutedTracks = unMutedTracks.filter(function (unmuteTrack) {
              return !selectedTrack.find(function (item) {
                return item === unmuteTrack;
              });
            });
          });
        }
      });
      rightDrum.click(function () {
        if (function1Pressing) {
          selectedTrack.forEach(function (track) {
            if (!unMutedTracks.find(function (unmuteTrack) {
              return unmuteTrack === track;
            })) unMutedTracks.push(track);
          });
        }
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
      $(".god_button_1").click(function () {
        selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
        unSelectInstrumentComponent(god_button_2, "god_button_2.svg");
      });
      $(".god_button_2").click(function () {
        selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
        unSelectInstrumentComponent(god_button_1, "god_button_1.svg");
      });
      if (unMutedTracks.length === 0) unMutedTracks = ["#track1", "#track2"];
      head_flag.click(function () {
        stopPlaying();

        if (!isHeadFlagOpen) {
          alignSoundTracks();
          head_flag.css("transform", "rotate(90deg)");
          unMutedTracks.forEach(function (track) {
            playPausedSound(track);
          });
          isHeadFlagOpen = true;
        } else {
          head_flag.css("transform", "rotate(0deg)");
          unMutedTracks.forEach(function (track) {
            pauseSound(track);
          });
          isHeadFlagOpen = false;
        }
      });
      god_button_1.click(function () {
        godButtonMode = 1;
      });
      god_button_2.click(function () {
        godButtonMode = 2;
      });
      leftDrum.click(function () {
        if (godButtonMode === 1) playPausedSound(drumSound[5]);
      });
      rightDrum.click(function () {
        if (godButtonMode === 1) playPausedSound(drumSound[5]);
      });
      string.on("touchstart", function () {
        if (godButtonMode === 2) {
          player1.start();
          setTimeout(function () {
            player2.start();
          }, 5);
        }
      });
      string.on("touchmove", function (e) {
        var stringRightBoundary = this.getBoundingClientRect().right - 30;
        var stringLeftBoundary = this.getBoundingClientRect().left + 50;
        var mousePosition = e.touches[0].clientX;
        var middle = (stringRightBoundary + stringLeftBoundary) / 2;

        if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
          pitchShift1.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          pitchShift2.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
        } else {
          player1.stop();
          player2.stop();
        }
      });
      string.on("touchend", function () {
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
$(".stepBtn.next").click(function () {
  if (currentStep < 24) currentStep++;
  console.log(currentStep);
  $(".instructionContainer .step").css("background-image", "url(\"../../assets/img/order_full_img/order_full_img_".concat(currentStep + 1, ".svg\")"));
  $(".instructionContainer .instruction").css("background-image", "url(\"../../assets/img/detail_full_img/detail_full_img_".concat(currentStep + 1, ".png\")"));
  setListener(currentStep);
});
$(".stepBtn.review").click(function () {
  stopPlaying();
  if (currentStep >= 1) currentStep--;
  $(".instructionContainer .step").css("background-image", "url(\"../../assets/img/order_full_img/order_full_img_".concat(currentStep + 1, ".svg\")"));
  $(".instructionContainer .instruction").css("background-image", "url(\"../../assets/img/detail_full_img/detail_full_img_".concat(currentStep + 1, ".png\")"));
  setListener(currentStep);
});
$(".stepBtn.start").click(function () {
  unSelectAll();
  currentStep = 1;
  $(".stepBtn.next").css("display", "block");
  $(".stepBtn.review").css("display", "block");
  $(".stepBtn.start").css("display", "none");
  $(".instructionContainer .step").css("background-image", "url(\"../../assets/img/order_full_img/order_full_img_2.svg\")");
  $(".instructionContainer .instruction").css("background-image", "url(\"../../assets/img/detail_full_img/detail_full_img_2.png\")"); // $(".instructionContainer .step").css(
  //   "background-image",
  //   `url("NTUST-Music-Project/assets/img/order_full_img/order_full_img_2.svg")`
  // );
  // $(".instructionContainer .instruction").css(
  //   "background-image",
  //   `url("NTUST-Music-Project/assets/img/detail_full_img/detail_full_img_2.png")`
  // );

  setListener(currentStep);
});
$(".stepBtn.jump").click(function () {
  unSelectAll();
  leaveTutorial();
  toDescription();
  currentStep = 0;
  $(".stepBtn.start").css("display", "block");
  $(".stepBtn.jump").css("display", "none");
  $(".instructionContainer .step").css("background-image", "url(\"../../assets/img/order_full_img/order_full_img_1.svg\")");
  $(".instructionContainer .instruction").css("background-image", "url(\"../../assets/img/detail_full_img/detail_full_img_1.png\")");
  setListener(currentStep);
});