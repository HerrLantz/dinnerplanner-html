var PrintView = function(container, model) {
  $(document).ready(function() {
    var selectedDishes = model.getSelectedDishes();

    for (let type in selectedDishes) {
      new DishPrintView(
        $('#dishPrinter'),
        model,
        model.getDish(selectedDishes[type])
      );
    }
  });

  container.html(`
    <div id="dishPrinter"></div>
  `);
};
