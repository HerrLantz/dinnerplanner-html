var DishPrintView = function(container, model, dish) {
  container.append(`
        <h1>${dish.name}</h1>
        <div class="dishImageWrapper">
          <img src="${model.imgPath + dish.image}" class="dishImage"/>
        </div>
        <p>
          ${dish.description}
        </p>
        <h1>
          Preparation
        </h1>
        <p>
          ${dish.preparation}
        </p>
    `);
};
