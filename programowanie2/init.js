model = null;
const MODELPATH = "/src/model.json";
tf.loadLayersModel(MODELPATH)
  .then(function (model_) {
    model = model_;
  })
  .catch((error) => console.log(error));

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
