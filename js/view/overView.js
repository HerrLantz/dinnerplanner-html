class OverView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    var selectedDishes = model.getSelectedDishes();

    // for (let type in selectedDishes) {
    //   new DishView($('#resultPanel'), model, selectedDishes[type], true);
    // }

    // $('.total').html('Total:<br/>' + model.getTotalMenuPrice() + ' SEK');
  }

  hide() {
    this.container.style.display = 'none';
  }

  update(model, changeDetails) {
    if (changeDetails.type !== 'search_update') {
      return;
    }

    var dishes = model.getSearchResult();

    // Clear recent search
    this.container.querySelector('#resultPanel').innerHTML = '';

    dishes.forEach(dish => {
      new DishView(
        this.container.querySelector('#resultPanel'),
        model,
        dish.id,
        true
      ).render();
    });
  }

  render() {
    this.container.style.displayProperty = this.displayProperty;
    this.container.innerHTML = `
      <div id="resultPanel"></div>
      <div class="total"></div>
      <hr>
      <button class="primaryButton">Print Full Recipe</button>
    `;
  }
}