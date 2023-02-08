window.onscroll = function () {
  const navbar = document.querySelector("#navbar");
  if (this.scrollY === 0) {
    navbar.style.backgroundColor = "transparent";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  }
};
