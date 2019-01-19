var DishView = function(container, model, dishID) {
  container.html(`
    <div>
        <img src="${model.getDish(dishID).image}">
        <p>"${model.getDish(dishID).name}"</p>
    </div>
    `);
};
