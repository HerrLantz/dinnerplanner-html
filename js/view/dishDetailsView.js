var DishDetailsView = function(container, model, dish) {
  container.html(`
        <h1>${dish.name}</h1>
        <img src="${model.imagePath + dish.image}"/>
        <p>${dish.description}</p>
        <button class="primaryButton">back to search</button>
        <div class="ingredients">
            ${new IngredientsView($('.ingredients'), model, dish)}
        </div>
    `);
};
