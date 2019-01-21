var DishView = function(container, model, dishID) {
  container.append(`
    <div class="dishItem">
        <div class="thumbnail">
            <img class="thumbnailImage" src="images/${
              model.getDish(dishID).image
            }">
        </div>
            <p>${model.getDish(dishID).name}</p>
    </div>
    `);
};
