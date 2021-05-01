"use strict";

var arrowClick = false;
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

if (mainPage) {
  window.addEventListener("swiped-up", function () {
    $(".home .bigBackground img.background").css("transform", "translateY(-46%)");
    $(".home .bigBackground .introContainer").css("top", "0vh");
    $("#logoRed").css("top", "1vh");
  });
  window.addEventListener("swiped-down", function () {
    $(".home .bigBackground img.background").css("transform", "translateY(0)");
    $(".home .bigBackground .introContainer").css("top", "100vh");
    $("#logoRed").css("top", "105vh");
  });
}

$(".arrowIcon").click(function () {
  mainPage = !mainPage;
  console.log(mainPage);
  $("#logoRed").css("top", "0vh");
  $("#logoRed").css("padding-top", "2vh");
  $(".home .bigBackground img.background").css("top", "-100vh");
  $(".home .bigBackground .introContainer").css({
    top: "20vh",
    opacity: "0"
  });
  $(".tutorial").fadeIn();
  $(".tutorial").css("display", "flex");
  $("#logoRed #menu .arrow").fadeIn();
}); // $(".arrowIcon").click(function () {
//   $("img.logo").attr("src", "./assets/img/brandRed.svg");
// });