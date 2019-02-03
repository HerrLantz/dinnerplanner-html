class HeaderView {
  constructor(container, model) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `<h1>Dinner Planner</h1>`;
  }
}
