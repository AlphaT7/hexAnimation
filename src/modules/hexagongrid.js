import Hexagon from "./hexagon.js";

export default class HexagonGrid {
  constructor({ canvas }) {
    this.canvas = canvas.element;
    this.centerX = canvas.centerX;
    this.centerY = canvas.centerY;
    this.hexagonExpand = true;
    this.hexagonExpandRate = 2;
    this.hexagonMaximumRadius = canvas.hexRadius;
    this.spaceBetweenHexagons = 7;
    this.hexagonFocus = 0;

    this.hexagonProperties = [
      {
        centerX: this.calculateX(240),
        centerY: this.calculateY(240),
        radius: 0,
        opacity: 0,
      },
      {
        centerX: this.calculateX(300),
        centerY: this.calculateY(300),
        radius: 0,
        opacity: 0,
      },
      {
        centerX: this.calculateX(0),
        centerY: this.calculateY(0),
        radius: 0,
        opacity: 0,
      },
      {
        centerX: this.calculateX(60),
        centerY: this.calculateY(60),
        radius: 0,
        opacity: 0,
      },
      {
        centerX: this.calculateX(120),
        centerY: this.calculateY(120),
        radius: 0,
        opacity: 0,
      },
      {
        centerX: this.calculateX(180),
        centerY: this.calculateY(180),
        radius: 0,
        opacity: 0,
      },
      {
        centerX: this.centerX,
        centerY: this.centerY,
        radius: 0,
        opacity: 0,
      },
    ];

    this.hexagonArray = [];
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  calculateX(angle) {
    return (
      (Math.cos(this.toRadians(30)) * this.hexagonMaximumRadius * 2 +
        this.spaceBetweenHexagons) *
        Math.cos(this.toRadians(angle)) +
      this.centerX
    );
  }

  calculateY(angle) {
    return (
      (Math.cos(this.toRadians(30)) * this.hexagonMaximumRadius * 2 +
        this.spaceBetweenHexagons) *
        Math.sin(this.toRadians(angle)) +
      this.centerY
    );
  }

  update() {
    this.hexagonArray = [];
    this.hexagonProperties.forEach((hexagon, i) => {
      if (this.hexagonExpand) {
        // calculate the individual hexagon radius while expanding;
        if (
          hexagon.radius < this.hexagonMaximumRadius &&
          this.hexagonFocus == i
        )
          hexagon.radius += this.hexagonExpandRate;

        // calculate which hexagon is being rendered;
        if (
          hexagon.radius >= this.hexagonMaximumRadius &&
          this.hexagonFocus == i &&
          i < 6
        )
          this.hexagonFocus++;

        // calculate the individual hexagon opacity while expanding;
        if (hexagon.opacity < 1 && this.hexagonFocus == i) {
          hexagon.opacity += 0.05;
        }

        // set the hexagonExpand variable;
        this.hexagonExpand =
          this.hexagonProperties[6].radius >= this.hexagonMaximumRadius
            ? false
            : true;
      } else {
        // calculate the individual hexagon radius while contracting;
        if (hexagon.radius >= 0 && this.hexagonFocus == i)
          hexagon.radius -= this.hexagonExpandRate;

        // calculate which hexagon is being rendered;
        if (hexagon.radius <= 0 && this.hexagonFocus == i && i > 0)
          this.hexagonFocus--;

        // calculate the individual hexagon opacity while expanding;
        if (hexagon.opacity >= 1 && this.hexagonFocus == i) {
          hexagon.opacity -= 0.05;
        }

        // set the hexagonExpand variable;
        this.hexagonExpand =
          this.hexagonProperties[0].radius <= 0 ? true : false;
      }

      let centerX = hexagon.centerX;
      let centerY = hexagon.centerY;
      let radius = hexagon.radius;
      let opacity = hexagon.opacity;
      let expand = hexagon.expand;
      this.hexagonArray.push(
        new Hexagon({ centerX, centerY, radius, opacity, expand }).create()
      );
    });
  }

  render(ctx) {
    this.hexagonArray.forEach((hexagon) => {
      ctx.globalAlpha = hexagon.opacity;

      for (let i = 0; i <= 5; i++) {
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 11;
      }

      let gradient = ctx.createLinearGradient(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      gradient.addColorStop(0, "rgba(252,252,252,1)");
      gradient.addColorStop(1, "rgba(0,191,254,1)");

      ctx.fillStyle = gradient;
      ctx.fill(hexagon.path);
      ctx.globalAlpha = 1;
    });
  }
}