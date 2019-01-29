var OverView = function(container, model) {
  $(document).ready(function() {
    var selectedDishes = model.getSelectedDishes();

    for (let type in selectedDishes) {
      new DishView($('#resultPanel'), model, selectedDishes[type], true);
    }

    $('.total').html('Total:<br/>' + model.getTotalMenuPrice() + ' SEK');
  });

  container.html(`

    <div id="resultPanel"></div>
    <div class="total"><span></span></div>
    <hr>
  `);
};
