function moveHomePageUp_Hand() {
  $(".home .bigBackground img.background").css("transform", "translateY(0)");
  $(".home .bigBackground .introContainer").css("top", "100vh");
  $("#logoRed").css("opacity", "1");
  $("#logoRed").css("top", "105vh");
};

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
};

function moveHomePageDown_Hand() {
  $(".home .bigBackground img.background").css("transform", "translateY(-46%)");
  $(".home .bigBackground .introContainer").css("top", "0vh");
  $("#logoRed").css("top", "1vh");
};

function controlInstrumentSize() {
  var vw = window.innerWidth;
  console.log("controllingSize");
  console.log(vw);
  $("section.tutorial article.displayArea .instrument").css("transform", "scale(" + (0.9 * vw / 1280) + ")");
};

function closeOpeningPage() {
  $(".openingPage").fadeOut();
}

function OpeningPage() {
  $(".openingPage").fadeIn();
}


let arrowClick = false;

$("#logoRed #menu img.arrow").click(function () {
  console.log(arrowClick);
  if (!arrowClick) {
    $("#logoRed #menu .toggle").fadeIn();
    $("#logoRed #menu .toggle").css("display", "flex");
  } else {
    $("#logoRed #menu .toggle").fadeOut();
  }
  arrowClick = !arrowClick;
});

var mainPage = true;
window.addEventListener("wheel", moveHomePage_Scroll);
window.addEventListener("swiped-up", moveHomePageDown_Hand);
window.addEventListener("swiped-down", moveHomePageUp_Hand);


$(".arrowIcon").click(function () {
  window.removeEventListener("wheel", moveHomePage_Scroll);
  window.removeEventListener("swiped-up", moveHomePageDown_Hand);
  window.removeEventListener("swiped-down", moveHomePageUp_Hand);
  $("#logoRed").css("top", "0vh");
  $("#logoRed").css("padding-top", "2vh");
  $(".home .bigBackground img.background").css("top", "-100vh");
  $(".home .bigBackground .introContainer").css("transform", "translateY(50vh)");
  $(".home .bigBackground .introContainer").css({
    // top: "120vh",
    opacity: "0"
  });

  $(".tutorial").fadeIn();
  $(".tutorial").css("display", "flex");
  $("#logoRed #menu .arrow").fadeIn();
  $("#logoRed #menu").fadeIn();

  // $("html").css("background-color", "#d32b2d");
  // $("body").css("background-color", "#d32b2d");
});

$(window).resize(controlInstrumentSize);
$(".openingPage").click(closeOpeningPage);
$(".manual").click(OpeningPage);

//Menu Control
$("#logoRed #menu .home").click(function () {
  $(".home .bigBackground img.background").css("transform", "translateY(0)");
  $(".home .bigBackground .introContainer").css("top", "100vh");
  $("#logoRed").css("opacity", "0");
  $("#logoRed").css("top", "1vh");
  $("#logoRed").css("padding-top", "6vh");
  window.addEventListener("wheel", moveHomePage_Scroll);
  window.addEventListener("swiped-up", moveHomePageDown_Hand);
  window.addEventListener("swiped-down", moveHomePageUp_Hand);
  $(".tutorial").fadeOut();
  $("#logoRed #menu").fadeOut();
  $("#logoRed #menu .toggle").fadeOut();
  $(".home .bigBackground img.background").css("top", "0");
  $(".home .bigBackground .introContainer").css({
    top: "100vh",
    opacity: "1"
  });
  $(".home .bigBackground .introContainer").css("transform", "translateY(0vh)");

})

// $(".arrowIcon").click(function () {
//   $("img.logo").attr("src", "./assets/img/brandRed.svg");
// });