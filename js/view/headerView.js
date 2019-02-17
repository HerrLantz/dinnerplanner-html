class HeaderView {
  constructor(container, model) {
    this.container = container;

    this.displayProperty = container.style.display;
  }

  hide() {
    this.container.style.display = 'none';
  }

  render() {
    this.container.style.display = this.displayProperty;
    this.container.innerHTML = `<h1>Dinner Planner</h1>`;
  }
}
