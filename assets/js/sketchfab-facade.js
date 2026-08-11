(function () {
  "use strict";

  function createIframe(modelId, modelNumber) {
    var iframe = document.createElement("iframe");

    iframe.src =
      "https://sketchfab.com/models/" + modelId + "/embed?autostart=1";
    iframe.title = "Interaktives 3D-Modell " + modelNumber;
    iframe.allow = "autoplay; fullscreen; xr-spatial-tracking";
    iframe.allowFullscreen = true;
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    return iframe;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var facades = document.querySelectorAll(".sketchfab-facade");

    facades.forEach(function (facade, index) {
      facade.addEventListener("click", function () {
        var modelId = facade.getAttribute("data-model-id");

        if (!modelId || !facade.parentNode) {
          return;
        }

        facade.parentNode.replaceChild(
          createIframe(modelId, index + 1),
          facade,
        );
      });
    });
  });
})();
