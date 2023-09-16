const links = document.querySelectorAll('.table-cover a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
    const offsetNav = document.querySelector("#navbar").offsetHeight;
    const offset = offsetTop - offsetNav - 20;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  });
  window.addEventListener("scroll", function () {
    const linkObject = link.offsetTop;
    const href = link.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
    console.log(offsetTop);

    if (linkObject == offsetTop) {
      link.style.opacity = "1";
    } else {
      link.style.opacity = ".5";
    }
  });
});

// Nav Sipilku
window.onscroll = function () {
  const navbar = document.querySelector("#navbar");
  if (this.scrollY === 0) {
    navbar.style.backgroundColor = "transparent";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  }
};
