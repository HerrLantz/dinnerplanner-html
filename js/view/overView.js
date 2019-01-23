var OverView = function(container, model) {
  $(document).ready(function() {
    var selectedDishes = model.getSelectedDishes();

    for (let type in selectedDishes) {
      new DishView($('#resultPanel'), model, selectedDishes[type], true);
      $('#overView').append(`
        <div>
          ${model.getTotalDishPrice(selectedDishes[type])}
        </div>
      `);
    }
  });

  container.html(`

    <div id="resultPanel"></div>
    <hr> 
    <div class="total">Total: <span></span></div>
  `);
};
