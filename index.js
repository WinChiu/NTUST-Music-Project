let arrowClick = false;

function moveHomePageUp_Hand() {
  $(".home .bigBackground img.background").css("transform", "translateY(0)");
  $(".home .bigBackground .introContainer").css("top", "100vh");
  $("#logoRed").css("opacity", "1");
  $("#logoRed").css("top", "105vh");
}
function moveHomePage_Scroll(e) {
  if (e.deltaY > 0) {
    $(".home .bigBackground img.background").css("transform", "translateY(-46%)");
    $(".home .bigBackground .introContainer").css("top", "0vh");
    $("#logoRed").css("top", "1vh");
    $("#logoRed").css("opacity", "1");
  } else {
    $(".home .bigBackground img.background").css("transform", "translateY(0)");
    $(".home .bigBackground .introContainer").css("top", "100vh");
    $("#logoRed").css("top", "105vh");
    $("#logoRed").css("opacity", "1");
  }
}
function moveHomePageDown_Hand() {
  $(".home .bigBackground img.background").css("transform", "translateY(-46%)");
  $(".home .bigBackground .introContainer").css("top", "0vh");
  $("#logoRed").css("top", "1vh");
}
function controlInstrumentSize() {
  var vw = window.innerWidth;
  console.log("controllingSize");
  console.log(vw);
  $("section.tutorial article.displayArea .instrument").css("transform", "scale(" + (0.9 * vw) / 1280 + ")");
}
function closeOpeningPage() {
  $(".openingPage").fadeOut();
}
function openingPage() {
  $("#logoRed #menu .toggle").fadeOut();
  $(".openingPage").fadeIn();
}
function controlArrow() {
  // $("#logoRed #menu .description").click(function(){
  //   $("#logoRed #menu .toggle").fadeOut();
  //   arrowClick = !arrowClick;
  // });
  $(".manual").click(function () {
    arrowClick = !arrowClick;
  });
  // $("section.tutorial").click(function(){
  //   $("#logoRed #menu .toggle").fadeOut();
  //   arrowClick = !arrowClick;
  // });
  if (!arrowClick) {
    $("#logoRed #menu .toggle").fadeIn();
    $("#logoRed #menu .toggle").css("display", "flex");
  } else {
    $("#logoRed #menu .toggle").fadeOut();
  }
  arrowClick = !arrowClick;
}
function removeWindowScrollControl() {
  window.removeEventListener("wheel", moveHomePage_Scroll);
  window.removeEventListener("swiped-up", moveHomePageDown_Hand);
  window.removeEventListener("swiped-down", moveHomePageUp_Hand);
}
function addWindowScrollControl() {
  window.addEventListener("wheel", moveHomePage_Scroll);
  window.addEventListener("swiped-up", moveHomePageDown_Hand);
  window.addEventListener("swiped-down", moveHomePageUp_Hand);
}
function toHome() {
  $("#logoRed #menu .toggle h3.home").css("color", "rgba(0,0,0,0.6)");
  $("section.home").fadeIn();
  $("#logoRed").fadeIn(1000);
  $("#logoRed").css("display", "flex");
  $(".home .bigBackground img.background").css("transform", "translateY(0)");
  $("#logoRed").css("opacity", "0");
  $("#logoRed").css("top", "105vh");
  $("#logoRed").css("padding-top", "6vh");
  $("#logoRed #menu").fadeOut();
  $("#logoRed #menu .toggle").fadeOut();
  $(".home .bigBackground img.background").css("top", "0");
  $(".home .bigBackground .introContainer").css({
    top: "100vh",
    opacity: "1",
  });
  $(".home .bigBackground .introContainer").css("transform", "translateY(0vh)");
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

function toTutorial() {
  $("#logoRed #menu h3.play").css("color", "rgba(0,0,0,0.6)");
  $("#logoRed #menu .toggle").fadeOut();
  $(".tutorial").fadeIn();
  $(".tutorial").css("display", "flex");
  $("#logoRed #menu .arrow").fadeIn();
  $("#logoRed #menu").fadeIn();
}
function leaveTutorialToHome() {
  $(".tutorial").fadeOut();
  $(".tutorial").css("transform", "translateY(100vh)");
  setTimeout(function () {
    $(".tutorial").css("transform", "translateY(0vh)");
  }, 600);
}
function leaveTutorial() {
  $("#logoRed #menu h3.play").css("color", "#DBDBDD");
  $(".tutorial").fadeOut();
}
function leaveHome() {
  $("#logoRed #menu .toggle h3.home").css("color", "#DBDBDD");
  $("#logoRed").css("top", "0vh");
  $("#logoRed").css("padding-top", "2vh");
  $(".home .bigBackground img.background").css("top", "-100vh");
  $(".home .bigBackground .introContainer").css("transform", "translateY(10vh)");
  $(".home .bigBackground .introContainer").css({
    opacity: "0",
  });
  setTimeout(function () {
    $("section.home").fadeOut();
  }, 600);
}
function leaveDescription() {
  $("#logoRed #menu .toggle h3.description").css("color", "#B13234");
  $("body").css("overflow-y", "hidden");
  $("html").css("overflow-y", "hidden");
  $("body").css("background", "#d32b2d");
  $("#logoRed #menu .toggle h3").css("color", "#DBDBDD");
  $("#logoRed img.logo").attr("src", "./assets/img/brand.svg");
  $("#logoRed #menu img.arrow").attr("src", "./assets/img/menu/meun_arrow.svg");
  $("#sectionDescription").fadeOut();
}

//Lock Rotation
// screen.orientation.lock();
//Arrow Control
$("#logoRed #menu").click(controlArrow);
//Home Page Control
addWindowScrollControl();

//To Tutorial
$(".arrowIcon").click(function () {
  removeWindowScrollControl();
  leaveHome();
  toTutorial();
});

//Instrument Sizing & Manual Controlling
$(window).resize(controlInstrumentSize);
$(".openingPage").click(closeOpeningPage);
$(".manual").click(openingPage);

//To Home
$("#logoRed #menu .home").click(function () {
  $("#logoRed").fadeOut(100);
  addWindowScrollControl();
  leaveTutorialToHome();
  leaveDescription();
  toHome();
});
//To description
$("#logoRed #menu .description").click(function () {
  leaveTutorial();
  leaveHome();
  toDescription();
});
//To Tutorial
$("#logoRed #menu .play").click(function () {
  leaveDescription();
  toTutorial();
});

//BackTop Transition
$(document).on("click", "a", function (e) {
  e.preventDefault();
  var target = $(this).attr("href");
  $("html, body").animate(
    {
      scrollTop: $(target).offset().top,
    },
    500
  );
});
