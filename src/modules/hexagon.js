export default class Hexagon {
  constructor({ centerX, centerY, radius, opacity, expand }) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.opacity = opacity;
    this.expand = expand;
  }

  #calculateVertices() {
    const toRadians = (angle) => {
      return angle * (Math.PI / 180);
    };

    const calcX = (angle) => {
      return this.radius * Math.cos(toRadians(angle)) + this.centerX;
    };

    const calcY = (angle) => {
      return this.radius * Math.sin(toRadians(angle)) + this.centerY;
    };

    let vertices = {
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
        x: this.centerX,
        y: this.centerY,
      },
    };

    return vertices;
  }

  #createPath(vertices) {
    let path = new Path2D();
    path.moveTo(vertices.p1.x, vertices.p1.y);
    path.lineTo(vertices.p2.x, vertices.p2.y);
    path.lineTo(vertices.p3.x, vertices.p3.y);
    path.lineTo(vertices.p4.x, vertices.p4.y);
    path.lineTo(vertices.p5.x, vertices.p5.y);
    path.lineTo(vertices.p6.x, vertices.p6.y);
    path.lineTo(vertices.p1.x, vertices.p1.y);
    path.closePath();
    return {
      path: path,
      center: vertices.center,
      opacity: this.opacity,
      radius: this.radius,
      expand: this.expand,
    };
  }

  create() {
    let vertices = this.#calculateVertices();
    let hexagon = this.#createPath(vertices);
    return hexagon;
  }
}
