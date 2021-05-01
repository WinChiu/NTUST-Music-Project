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

// $(window).on("wheel", function () {
//   $(".home .bigBackground img.background").css("top", "-92vh");
//   $(".home .bigBackground .introContainer").css("top", "0vh");
// });

document.addEventListener("swiped-up", function () {
  $(".home .bigBackground img.background").css("top", "-92vh");
  $(".home .bigBackground .introContainer").css("top", "0vh");
  $("#logoRed").css("top", "0vh");
});

document.addEventListener("swiped-down", function () {
  $(".home .bigBackground img.background").css("top", "0vh");
  $(".home .bigBackground .introContainer").css("top", "100vh");
});

$(".arrowIcon").click(function () {
  $(".home .bigBackground img.background").css("top", "-100vh");
  $(".home .bigBackground .introContainer").css({ top: "20vh", opacity: "0" });
  $(".tutorial").fadeIn();
  $(".tutorial").css("display", "flex");
});

// $(".arrowIcon").click(function () {
//   $("img.logo").attr("src", "./assets/img/brandRed.svg");
// });
