let canvas = document.querySelector("#canvas");
canvas.width = 691;
canvas.height = 691;
const cx = canvas.width / 2 + 1;
const cy = canvas.height / 2 + 1;
const hexSideLength = 55;
const hexAngle = toRadians(30);
let hexRadius = 85;
let focus = 0;
let expand = false;
let hexProperties = [
  { r: hexRadius, opacity: 1, expand: false },
  { r: hexRadius, opacity: 1, expand: false },
  { r: hexRadius, opacity: 1, expand: false },
  { r: hexRadius, opacity: 1, expand: false },
  { r: hexRadius, opacity: 1, expand: false },
  { r: hexRadius, opacity: 1, expand: false },
  { r: hexRadius, opacity: 1, expand: false },
];
let hexArray = [];
let hexSpaceBetween = 12;
const ctx = canvas.getContext("2d");
const log = console.log.bind(console);

function calculateX(angle) {
  return (
    (Math.cos(toRadians(30)) * hexRadius * 2 + hexSpaceBetween) *
      Math.cos(toRadians(angle)) +
    cx
  );
}

function calculateY(angle) {
  return (
    (Math.cos(toRadians(30)) * hexRadius * 2 + hexSpaceBetween) *
      Math.sin(toRadians(angle)) +
    cy
  );
}

const hexGrid = {
  coordinates: [
    {
      x: calculateX(240),
      y: calculateY(240),
    },
    {
      x: calculateX(300),
      y: calculateY(300),
    },
    {
      x: calculateX(0),
      y: calculateY(0),
    },
    {
      x: calculateX(60),
      y: calculateY(60),
    },
    {
      x: calculateX(120),
      y: calculateY(120),
    },
    {
      x: calculateX(180),
      y: calculateY(180),
    },
    {
      x: cx,
      y: cy,
    },
  ],
};

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function drawHexagon() {
  let gridCoordinates = [];
  if (!expand) {
    hexGrid.coordinates.forEach((center, i) => {
      hexProperties[i].r =
        hexProperties[i].r >= hexRadius / 2 && focus == i
          ? hexProperties[i].r - 3
          : hexProperties[i].r;

      hexProperties[i].opacity =
        hexProperties[i].opacity > 0 && focus == i
          ? hexProperties[i].opacity - 0.08
          : hexProperties[i].opacity < 0.5 && focus == i
          ? 0
          : hexProperties[i].opacity;

      focus =
        hexProperties[i].opacity > 0 && focus == i && i < 6
          ? focus
          : hexProperties[i].opacity <= 0 && focus == i && i < 6
          ? focus + 1
          : 0;

      expand = hexProperties[6].opacity == 0 ? true : false;
    });
  } else {
    hexGrid.coordinates.forEach((center, i) => {
      hexProperties[i].r =
        hexProperties[i].r < hexRadius && focus == i
          ? hexProperties[i].r + 3
          : hexProperties[i].r;

      hexProperties[i].opacity =
        hexProperties[i].opacity < 1 && focus == i
          ? hexProperties[i].opacity + 0.08
          : hexProperties[i].opacity > 1 && focus == i
          ? 1
          : hexProperties[i].opacity;

      focus =
        hexProperties[i].opacity <= 0 && focus == i && i < 6
          ? focus
          : hexProperties[i].opacity >= 1 && focus == i && i < 6
          ? focus + 1
          : 0;

      expand = hexProperties[6].opacity >= 1 ? false : true;
    });
  }
  hexGrid.coordinates.forEach((center, i) => {
    gridCoordinates.push(
      generateHexByRadius(center.x, center.y, hexProperties[i])
    );
  });

  gridCoordinates.forEach((pathpoints) => {
    hexagon(pathpoints);
  });

  drawHexArray();
}

function hexagon(hex) {
  let path = new Path2D();
  path.moveTo(hex.p1.x, hex.p1.y);
  path.lineTo(hex.p2.x, hex.p2.y);
  path.lineTo(hex.p3.x, hex.p3.y);
  path.lineTo(hex.p4.x, hex.p4.y);
  path.lineTo(hex.p5.x, hex.p5.y);
  path.lineTo(hex.p6.x, hex.p6.y);
  path.lineTo(hex.p1.x, hex.p1.y);
  path.closePath();
  hexArray.push({ path: path, center: hex.center });
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hexArray.length = 0;
  drawHexagon();
  window.requestAnimationFrame(render);
}

function drawHexArray() {
  hexArray.forEach((hex, i) => {
    ctx.globalAlpha = hexProperties[i].opacity;
    ctx.strokeStyle = "#fff";
    ctx.strokeWidth = 1;
    ctx.stroke(hex.path);

    for (let i = 0; i <= 0; i++) {
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 11;
    }

    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "rgba(252,252,252,1)");
    gradient.addColorStop(1, "rgba(0,191,254,1)");
    ctx.fillStyle = gradient;
    ctx.fill(hex.path);
    // ctx.globalAlpha = 1;
    ctx.font = "48px serif";
    // ctx.fillStyle = "#000";
    // ctx.fillText(i, hex.center.x, hex.center.y);
    ctx.globalAlpha = 1;
  });
}

function generateHexByRadius(cx, cy, hexProperties) {
  let r = hexProperties.r;
  let opacity = hexProperties.opacity;

  let calcX = (angle) => {
    return r * Math.cos(toRadians(angle)) + cx;
  };
  let calcY = (angle) => {
    return r * Math.sin(toRadians(angle)) + cy;
  };

  let hex = {
    p1: {
      x: calcX(30),
      y: calcY(30),
    },

    p2: {
      x: calcX(90),
      y: calcY(90),
    },

    p3: {
      x: calcX(150),
      y: calcY(150),
    },

    p4: {
      x: calcX(210),
      y: calcY(210),
    },

    p5: {
      x: calcX(270),
      y: calcY(270),
    },

    p6: {
      x: calcX(330),
      y: calcY(330),
    },

    center: {
      x: cx,
      y: cy,
    },
  };
  return hex;
}

render();
