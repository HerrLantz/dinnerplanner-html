var DishView = function(container, model, dishID) {
  var imgPath = 'images/';

  container.append(`
    <div class="dishItem" dishID="${dishID}">
        <div class="thumbnail">
            <img class="thumbnailImage" src="${imgPath +
              model.getDish(dishID).image}">
        </div>
            <p>${model.getDish(dishID).name}</p>
    </div>
    `);
};
