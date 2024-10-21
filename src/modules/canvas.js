export default class Canvas {
  constructor({ canvasName }) {
    this.canvasName = canvasName;
  }

  create() {
    let canvasObj = document.createElement("canvas");
    let ratio =
      window.innerHeight < window.innerWidth
        ? window.innerHeight
        : window.innerWidth;

    canvasObj.id = this.canvasName;
    document.body.append(canvasObj);

    const element = document.getElementById(this.canvasName);
    element.width = ratio;
    element.height = ratio;

    const hexRadius = ratio * 0.07;
    const centerX = canvasObj.width / 2 + 1;
    const centerY = canvasObj.height / 2 + 1;
    return { element, hexRadius, centerX, centerY };
  }
}
