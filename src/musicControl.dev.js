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
  instrumentContainer.css("transform", "translate(0,0) scale(0.9) rotate(0)");
  instrumentDisplayArea.css("margin-bottom", "6vh");
};

var cutFlagZoomIn = function cutFlagZoomIn() {
  instrumentContainer.css("transform", "translate(10vw, 30vh) scale(1.5)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var longFlagZoomIn = function longFlagZoomIn() {
  instrumentContainer.css("transform", "translate(-3vw, 5vh) scale(1.2) rotate(4deg)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var umbrellaZoomIn = function umbrellaZoomIn() {
  instrumentContainer.css("transform", "translate(0vw, 45vh) scale(1.8) rotate(0deg)");
  instrumentDisplayArea.css("margin-bottom", "4vh");
};

var headFlagZoomIn = function headFlagZoomIn() {
  instrumentContainer.css("transform", "translate(20vw, 50vh) scale(1.8)");
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
var selectedTrack = 0;
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
  } else {
    // target.css("filter", "drop-shadow(0px 0px 0vh #ee8948)");
    target.css("animation", "shadowBreath 1s alternate infinite");
  }

  target.attr("src", instrumentComponentSrc + fileName); // setTimeout(() => {
  //   target.attr("src", instrumentComponentSrc + fileName);
  // }, 10);
};

var unSelectInstrumentComponent = function unSelectInstrumentComponent(target, fileName) {
  target.attr("src", instrumentComponentSrc + fileName); // target.css("filter", "none");

  target.css("animation", "none");
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
      break;

    case 1:
      unSelectAll();
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
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      unBindAll();
      var nowPlayingDrumSound = 0;
      function_1.on("touchstart", function () {
        function1Pressing = true;
      });
      function_1.on("touchend", function () {
        function1Pressing = false;
      });
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
          playSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
          return;
        }

        if (flagCutTopStatus === 0) {
          flag_cut_top.css("top", "125px");
          flagCutTopStatus = -1;
          stopPlaying();
          playSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
          return;
        }
      });
      flag_cut_top.on("swiped-up", function () {
        if (flagCutTopStatus === -1) {
          flag_cut_top.css("top", "113px");
          flagCutTopStatus = 0;
          stopPlaying();
          playSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
          return;
        }

        if (flagCutTopStatus === 0) {
          flag_cut_top.css("top", "101px");
          flagCutTopStatus = 1;
          stopPlaying();
          playSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
          return;
        }
      });
      flag_cut_bottom.on("swiped-down", function () {
        if (flagCutBottomStatus === 1) {
          flag_cut_bottom.css("top", "164px");
          flagCutBottomStatus = 0;
          stopPlaying();
          playSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
          return;
        }

        if (flagCutBottomStatus === 0) {
          flag_cut_bottom.css("top", "176px");
          flagCutBottomStatus = -1;
          stopPlaying();
          playSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
          return;
        }
      });
      flag_cut_bottom.on("swiped-up", function () {
        if (flagCutBottomStatus === -1) {
          flag_cut_bottom.css("top", "164px");
          flagCutBottomStatus = 0;
          stopPlaying();
          playSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
          return;
        }

        if (flagCutBottomStatus === 0) {
          flag_cut_bottom.css("top", "152px");
          flagCutBottomStatus = 1;
          stopPlaying();
          playSound("#".concat(flagCutTopStatus, "_").concat(flagCutBottomStatus));
          return;
        }
      });
      break;

    case 6:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(function_2, "function_2_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll(); //Nothing happen

      break;

    case 7:
      unSelectAll();
      originalSize();
      umbrellaZoomIn();
      selectInstrumentComponent(umbrella1, "umbrella.svg", true);
      unBindAll();
      var nowPlayingUmbrellaASound = 0;
      umbrella1.click(function () {
        console.log(nowPlayingUmbrellaASound);

        if (nowPlayingUmbrellaASound === umbrellaA.length - 1) {
          nowPlayingUmbrellaASound = 0;
        } else {
          nowPlayingUmbrellaASound++;
        }

        rotate += 90;
        umbrella1.css("transform", "rotate(".concat(rotate, "deg)"));
        playSound(umbrellaA[nowPlayingUmbrellaASound]);
      });
      break;

    case 8:
      unSelectAll();
      selectInstrumentComponent(umbrella2, "umbrella.svg", true);
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
        playSound(umbrellaD[nowPlayingUmbrellaDSound]);
      });
      break;

    case 9:
      unSelectAll();
      selectInstrumentComponent(umbrella3, "umbrella.svg", true);
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
        playSound(umbrellaDelay1[nowPlayingUmbrellaDelay1Sound]);
      });
      break;

    case 10:
      unSelectAll();
      selectInstrumentComponent(umbrella4, "umbrella.svg", true);
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
        }
      });
      string.on("touchmove", function (e) {
        var stringRightBoundary = this.getBoundingClientRect().right - 30;
        var stringLeftBoundary = this.getBoundingClientRect().left + 50;
        var mousePosition = e.touches[0].clientX;
        var middle = (stringRightBoundary + stringLeftBoundary) / 2;

        if (longFlagMode) {
          if (mousePosition < stringRightBoundary && mousePosition > stringLeftBoundary) {
            pitchShift3.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
            pitchShift4.pitch = mousePosition / 1000 + (mousePosition - middle) / 300;
          } else {
            player3.stop();
            player4.stop();
          }
        }
      });
      string.on("touchend", function () {
        if (longFlagMode) {
          player3.stop();
          player4.stop();
        }
      });
      break;

    case 12:
      unSelectAll();
      originalSize();
      selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
      selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
      unBindAll(); // //Nothing happen

      break;

    case 13:
      unSelectAll();
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
      }); // //Nothing happen

      break;

    case 14:
      unSelectAll();
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
      level_switch.css({
        top: "252px",
        left: "80px"
      }); // //Nothing happen

      break;

    case 15:
      unSelectAll();
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      rightDrum.click(function () {
        $("#BeiguanD1")[0].loop = true;
        $("#BeiguanD1")[0].playbackRate = 4.58;

        if (function1Pressing && !step15IsPlaying) {
          step15IsPlaying = true;
          playPausedSound("#BeiguanD1");
        }
      });
      leftDrum.click(function () {
        $("#BeiguanD1")[0].loop = true;
        $("#BeiguanD1")[0].playbackRate = 4.58;

        if (function1Pressing) {
          step15IsPlaying = false;
          pauseSound("#BeiguanD1");
        }
      });
      break;

    case 16:
      unSelectAll();
      selectInstrumentComponent(function_2, "function_2_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      unBindAll();
      var isRecording = false;
      function_2.on("touchstart", function () {
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

    case 17:
      unSelectAll();
      selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
      selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(string, "string_select.svg", false);
      $("#BeiguanD1")[0].loop = true;
      $("#BeiguanD1")[0].playbackRate = 4.58;
      $("#BeiguanD1")[0].volume = 1;
      playPausedSound("#BeiguanD1");
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
      selectInstrumentComponent(level_switch, "level_switch.svg", true);
      unBindAll();
      stopPlaying();
      level_switch.css({
        top: "252px",
        left: "80px"
      });
      level_switch.on("swiped-up", function () {
        level_switch.css({
          top: "242px",
          left: "90px"
        });
      }); //Nothing happen

      break;

    case 19:
      unSelectAll();
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
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
      head_flag.click(function () {
        if (!isHeadFlagOpen) {
          playPausedSound("#track1");
          head_flag.css("transform", "rotate(90deg)");
          isHeadFlagOpen = true;
        } else {
          pauseSound("#track1");
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
      var track2Playing = false;
      head_flag.css("transform", "rotate(0deg)");
      rightDrum.click(function () {
        if (function1Pressing) {
          $("#track2")[0].loop = true;
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
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(function_1, "function_1_select.svg", false);
      selectInstrumentComponent(head_flag, "head_flag.svg", true);
      selectInstrumentComponent(string, "string_select.svg", false);
      unBindAll();
      tracks.forEach(function (track) {
        $("".concat(track))[0].loop = true;
      });
      head_flag.click(function () {
        stopPlaying();

        if (!isHeadFlagOpen) {
          alignSoundTracks();
          unMutedTracks.forEach(function (track) {
            playPausedSound(track);
          });
          isHeadFlagOpen = true;
        } else {
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

          console.log(tracks[selectedTrack]);
        }
      });
      string.on("swiped-right", function () {
        if (function1Pressing) {
          if (selectedTrack === tracks.length - 1) {
            selectedTrack = 0;
          } else {
            selectedTrack++;
          }

          console.log(tracks[selectedTrack]);
        }
      });
      leftDrum.click(function () {
        if (function1Pressing) {
          unMutedTracks = unMutedTracks.filter(function (track) {
            return track !== tracks[selectedTrack];
          });
        }

        console.log(unMutedTracks);
      });
      rightDrum.click(function () {
        if (function1Pressing) {
          if (!unMutedTracks.find(function (track) {
            return track === tracks[selectedTrack];
          })) unMutedTracks.push(tracks[selectedTrack]);
        }

        console.log(unMutedTracks);
      });
      break;

    case 23:
      unSelectAll();
      selectInstrumentComponent(leftDrum, "left_drum_select.svg", false);
      selectInstrumentComponent(rightDrum, "right_drum_select.svg", false);
      selectInstrumentComponent(head_flag, "head_flag.svg", true);
      selectInstrumentComponent(string, "string_select.svg", false);
      selectInstrumentComponent(god_button_1, "god_button_1_select.svg", false);
      selectInstrumentComponent(god_button_2, "god_button_2_select.svg", false);
      unBindAll();
      head_flag.click(function () {
        stopPlaying();

        if (!isHeadFlagOpen) {
          alignSoundTracks();
          unMutedTracks.forEach(function (track) {
            playPausedSound(track);
          });
          isHeadFlagOpen = true;
        } else {
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
      stopPlaying();
      $(".stepBtn.next").css("display", "none");
      $(".stepBtn.review").css("display", "none");
      $(".stepBtn.start").css("display", "block");
      break;

    default:
      console.log("error");
  }
};

$(".stepBtn.next").css("display", "none");
$(".stepBtn.review").css("display", "none");
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

  if (currentStep === 24) {
    leaveTutorial();
    toDescription();
    currentStep = 0;
  } else {
    currentStep = 1;
  }

  $(".stepBtn.next").css("display", "block");
  $(".stepBtn.review").css("display", "block");
  $(".stepBtn.start").css("display", "none");
  $(".instructionContainer .step").css("background-image", "url(\"../../assets/img/order_full_img/order_full_img_".concat(currentStep + 1, ".svg\")"));
  $(".instructionContainer .instruction").css("background-image", "url(\"../../assets/img/detail_full_img/detail_full_img_".concat(currentStep + 1, ".png\")"));
  setListener(currentStep);
});