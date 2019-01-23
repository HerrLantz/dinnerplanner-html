var DishView = function(container, model, dishID, showPrice) {
  $('.dishItem').click(function() {
    var id = $(this).attr('dishID');
    model.addDishToMenu(id);
  });

  $(document).ready(function() {
    if (showPrice) {
      $('.showPrice[attr="' + dishID + '"]').html(
        'SEK' + model.getTotalDishPrice(dishID)
      );
    }
  });

  container.append(`
    <div class="dishItem" dishID="${dishID}">
        <div class="thumbnail">
            <img class="thumbnailImage" src="${model.imgPath +
              model.getDish(dishID).image}">
        </div>
        <p>${model.getDish(dishID).name}</p>
        </div>
    <span class="showPrice" attr="${dishID}"></span>
    `);
};
