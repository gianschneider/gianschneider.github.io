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

  function createChoiceContent(choice, index, modelName) {
    var number = document.createElement("span");
    var name = document.createElement("span");

    number.className = "sketchfab-choice-index";
    number.textContent = "Modell " + String(index + 1).padStart(2, "0");
    name.className = "sketchfab-choice-name";
    name.textContent = modelName;

    choice.textContent = "";
    choice.appendChild(number);
    choice.appendChild(name);
  }

  function initGallery(gallery) {
    var stage = gallery.querySelector(".sketchfab-stage");
    var choices = gallery.querySelectorAll(".sketchfab-facade");

    if (!stage) {
      return;
    }

    choices.forEach(function (choice, index) {
      var modelName = choice.getAttribute("data-model-name") || "Sketchfab";

      choice.setAttribute("aria-controls", stage.id);
      choice.setAttribute("aria-pressed", "false");
      createChoiceContent(choice, index, modelName);

      choice.addEventListener("click", function () {
        var modelId = choice.getAttribute("data-model-id");

        if (!modelId) {
          return;
        }

        choices.forEach(function (item) {
          item.setAttribute("aria-pressed", String(item === choice));
        });

        stage.textContent = "";
        stage.appendChild(createIframe(modelId, modelName));
      });
    });
  }

  function initSketchfabGalleries() {
    document.querySelectorAll(".sketchfab-gallery").forEach(initGallery);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSketchfabGalleries);
  } else {
    initSketchfabGalleries();
  }
})();
