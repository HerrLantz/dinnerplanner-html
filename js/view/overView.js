class OverView {
  constructor(container, model) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.selectedDishes = model.getSelectedDishes();
  }

  hide() {
    this.container.style.display = 'none';
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'cart_update') {
      this.model = model;
      let dishes = model.getSelectedDishes();

      // Clear recent search
      this.container.querySelector('#resultPanel').innerHTML = '';

      for (const dishID in dishes) {
        new DishView(
          this.container.querySelector('#resultPanel'),
          model,
          dishes[dishID],
          true
        ).render();
      }

      this.container.querySelector('#total').innerHTML = `<p>Total: <br>
          <span class="showPrice">
            ${model.getTotalMenuPrice()} SEK
          </span>
        <p/>
      `;
    }
  }

  render() {
    this.container.style.displayProperty = this.displayProperty;
    this.container.innerHTML = `
      <div id="dinnerOverViewPanel">
        <div id="resultPanel"></div>
        <div id="total"></div>
      </div>
      <button class="primaryButton" id="printButton">Print Full Recipe</button>
    `;
  }
}
