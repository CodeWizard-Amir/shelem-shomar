window.addEventListener("load", () => {
  var btn = document.getElementById("btn");
  var defferdprompt;
  window.addEventListener("beforeinstallprompt", function (event) {
    console.log("first");
    event.preventDefault;
    defferdprompt = event;
    return false;
  });
  btn.addEventListener("click", () => {
    defferdprompt.prompt();
  });
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => {
        console.log("service worker registerd !");
      })
      .catch((err) => {
        console.log(err, "servic worker error !");
      });
  }
});
