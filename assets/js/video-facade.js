(function () {
  function createIframe(videoId) {
    var iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube.com/embed/" +
      videoId +
      "?rel=0&autoplay=1&modestbranding=1";
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;
    return iframe;
  }

  function initVideoFacades() {
    document.querySelectorAll(".youtube-facade").forEach(function (facade) {
      if (facade.dataset.ready === "true") {
        return;
      }

      facade.dataset.ready = "true";
      facade.addEventListener("click", function () {
        var videoId = facade.getAttribute("data-id");

        if (!videoId) {
          return;
        }

        facade.textContent = "";
        facade.appendChild(createIframe(videoId));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVideoFacades);
  } else {
    initVideoFacades();
  }
})();
