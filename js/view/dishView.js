var DishView = function(container, model, dishID) {
  container.html(`
    <div class="thumbnail">
        <img src="images/${model.getDish(dishID).image}">
        <p>${model.getDish(dishID).name}</p>
    </div>
    `);
};
