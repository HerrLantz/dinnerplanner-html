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
      
      let selectedDishes = model.getSelectedDishes();
      let dishPrinter = this.container.querySelector('#dishPrinter');
      dishPrinter.innerHTML = '';
            
      for (let dishID in selectedDishes) {        
        new DishPrintView(
          dishPrinter,
          model,
          selectedDishes[dishID]
        ).render();
      }
    }
  }

  render() {
    this.container.innerHTML = `
      <div id="dishPrinter"></div>
    `;
  }
}
