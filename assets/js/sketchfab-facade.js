(function () {
  "use strict";

  function createIframe(modelId, modelName) {
    var iframe = document.createElement("iframe");

    iframe.src =
      "https://sketchfab.com/models/" + modelId + "/embed?autostart=1";
    iframe.title = "Interaktives 3D-Modell: " + modelName;
    iframe.allow = "autoplay; fullscreen; xr-spatial-tracking";
    iframe.allowFullscreen = true;
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    return iframe;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var facades = document.querySelectorAll(".sketchfab-facade");

    facades.forEach(function (facade) {
      facade.addEventListener("click", function () {
        var modelId = facade.getAttribute("data-model-id");
        var modelName = facade.getAttribute("data-model-name") || "Sketchfab";

        if (!modelId || !facade.parentNode) {
          return;
        }

        facade.parentNode.replaceChild(
          createIframe(modelId, modelName),
          facade,
        );
      });
    });
  });
})();
