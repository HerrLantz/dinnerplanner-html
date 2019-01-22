var DishDetailsView = function(container, model, dish) {
  $(document).ready(function() {
    new IngredientsView($('.ingredients'), model, dish);
  });
  container.html(`
        <h1>${dish.name}</h1>
        <img src="${model.imgPath + dish.image}"/>
        <p>${dish.description}</p>
        <button class="primaryButton">back to search</button>
        <div class="ingredients">
        </div>
        <h1>PREPARATION</h1>
    `);
};
