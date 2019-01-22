var OverView = function(container, model) {
  $(document).ready(function() {
    var selectedDishes = model.getSelectedDishes();

    for (let type in selectedDishes) {
      new DishView($('#overview'), model, selectedDishes[type]);
      $('#overview').append(`
        <div>
          ${model.getTotalDishPrice(selectedDishes[type])}
        </div>
      `);
    }
  });

  container.html(`

    <div id="overview"></div>
    <hr> 
    <div class="total">Total: <span></span></div>
  `);
};
