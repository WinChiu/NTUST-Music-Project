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
