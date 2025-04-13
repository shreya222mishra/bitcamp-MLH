window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("page1").classList.remove("active");
    //document.getElementById("page2").classList.add("active");
  }, 3500);
});

function navigateTo(page) {
  window.location.href = page + ".html";
}
