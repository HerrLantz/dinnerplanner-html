class PrintView {
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
      
      let selectedDishes = model.getSelectedDishes();
      let dishPrinter = this.container.querySelector('#dishPrinter');
      dishPrinter.innerHTML = '';
      for (let type in selectedDishes) {
        getDish(selectedDishes[type]).then(dish => {
          new DishPrintView(
            dishPrinter,
            model,
            model.dish
          ).render();
        });
      }
    }
  }

  render() {
    this.container.innerHTML = `
      <div id="dishPrinter"></div>
    `;
  }
}
