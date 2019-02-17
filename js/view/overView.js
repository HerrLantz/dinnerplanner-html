class OverView {
  constructor(container, model) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.selectedDishes = model.getSelectedDishes();

    // for (let type in selectedDishes) {
    //   new DishView($('#resultPanel'), model, selectedDishes[type], true);
    // }

    // $('.total').html('Total:<br/>' + model.getTotalMenuPrice() + ' SEK');
  }

  hide() {
    this.container.style.display = 'none';
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'cart_update') {
      this.model = model;
      var dishes = model.getSelectedDishes();

      // Clear recent search
      this.container.querySelector('#resultPanel').innerHTML = '';

      // dishes.forEach(dishID => {
      for (const dishType in dishes) {
        let dishID = model.getSelectedDishes()[dishType];
        new DishView(
          this.container.querySelector('#resultPanel'),
          model,
          dishID,
          true
        ).render();
      }

      this.container.querySelector('#total').innerHTML =
        'Total:<br/>' + model.getTotalMenuPrice() + ' SEK';
    }
  }

  render() {
    this.container.style.displayProperty = this.displayProperty;
    this.container.innerHTML = `
      <div id="resultPanel"></div>
      <div id="total"></div>
      <hr>
      <button class="primaryButton">Print Full Recipe</button>
    `;
  }
}
