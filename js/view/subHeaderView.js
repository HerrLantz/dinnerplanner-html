class SubHeaderView {
  constructor(container, model) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
  }

  hide() {
    this.container.style.display = 'none';
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'cart_update') {
      this.model = model;
      this.container.querySelector('#numberOfGuestsHeader').innerHTML = `My Dinner: ${this.model.getNumberOfGuests()} people`;
    }
  }

  render() {
    this.container.innerHTML = `
    <h1 id="numberOfGuestsHeader">
      My Dinner: ${this.model.getNumberOfGuests()} people
    </h1>
    <button class="backButton">Go back and edit dinner</button>
    `;
  }
}
