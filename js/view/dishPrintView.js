var DishPrintView = function(container, model, dish) {
  container.append(`
      <div class="printDish">
      <div class="printDishDescription">
        <h1>${dish.name}</h1>
        <div class="dishImagePrinter">
          <img src="${model.imgPath + dish.image}" class="dishImage"/>
        </div>
        <p>
          ${dish.description}
        </p>
      </div>
      <div class="printPreparation">
        <h1>
          Preparation
        </h1>
        <p>
          ${dish.preparation}
        </p>
      </div>
      </div>
    `);
};
