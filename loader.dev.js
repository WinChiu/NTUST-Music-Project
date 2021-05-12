"use strict";

function circleToCenter() {
  $("svg circle").css("animation", "none");
  var loaderTimelineCenter = new TimelineMax({
    repeat: 0
  });
  loaderTimelineCenter.to(".loader-top", 0.85, {
    attr: {
      cx: 25,
      cy: 25
    }
  }, "l12_1").to(".loader-left", 0.85, {
    attr: {
      cx: 25,
      cy: 25
    }
  }, "l12_1").to(".loader-right", 0.85, {
    attr: {
      cx: 25,
      cy: 25
    }
  }, "l12_1");
}

function loaderFaded() {
  setTimeout(function () {
    circleToCenter();
    $("svg circle").css("r", "6");
    $("svg circle").css("opacity", "0.5");
    setTimeout(function () {
      $("#loader").fadeOut();
    }, 300);
  }, 2700);
} //PreLoader


$(document).ready(loaderFaded);