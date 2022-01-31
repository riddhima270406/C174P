AFRAME.registerComponent("model", {
  init: async function () {

    //Get the compund details of the element
    var elements = await this.getElements();

    var barcodes = Object.keys(compounds);

    barcodes.map(barcode => {
      var element = compounds[barcode];

      //Call the function
      this.createAtoms(element);
    });

  },
  getElements: function () {
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);
  },
  getElementModel: function () {
    return fetch("js/createModel.js")
      .then(res => res.js())
      .then(data => data);
  },
  createElements: async function (element) {

    //Element data
    var modelName = model.model_name;
    var barcodeValue = model.barcode_value;

    //Get the color of the element
    var model = await this.getElementModel();

    //Scene
    var scene = document.querySelector("a-scene");

    //Add marker entity for BARCODE marker
    var marker = document.createElement("a-marker");

    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("model_name", modelName);
    marker.setAttribute("value", barcodeValue);

    scene.appendChild(marker);

    var atom = document.createElement("a-entity");
    elements.setAttribute("id", `${modelName}-${barcodeValue}`);
    marker.appendChild(elements);

    //Create atom card
    var card = document.createElement("a-entity");
    card.setAttribute("id", `card-${modelName}`);
    card.setAttribute("geometry", {
      primitive: "plane",
      width: 1,
      height: 1
    });

    card.setAttribute("material", {
      src: `./assets/3dModel/${modelName}.gltf`
    });

    element.appendChild(card);

      var electron = document.createElement("a-entity");
  }  
});