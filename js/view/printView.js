// var PrintView = function(container, model) {
//   $(document).ready(function() {
//     var selectedDishes = model.getSelectedDishes();

//     for (let type in selectedDishes) {
//       new DishPrintView(
//         $('#dishPrinter'),
//         model,
//         model.getDish(selectedDishes[type])
//       );
//     }
//   });

//   container.html(`
//     <div id="dishPrinter"></div>
//   `);
// };

class PrintView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
  }

  hide() {
    this.container.style.display = 'none';
  }

  render() {
    this.container.innerHTML = `
      <div id="dishPrinter"></div>
    `;
  }
}
