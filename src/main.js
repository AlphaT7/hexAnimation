import Canvas from "./modules/canvas.js";
import Animation from "./modules/animation.js";
import Circles from "./modules/circles.js";
import HexagonGrid from "./modules/hexagongrid.js";

const canvas = new Canvas("canvas").create();

let circles = new Circles({ canvas });
let hexagonGrid = new HexagonGrid({ canvas });

let objArr = [circles, hexagonGrid];

let animate = new Animation({ canvas, objArr });
animate.animationLoop.start();
