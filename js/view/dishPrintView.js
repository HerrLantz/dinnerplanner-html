class DishPrintView {
  constructor(container, model, dish) {
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.dish = dish;
  }

  hide() {
    this.container.style.display = 'none';
  }

  render() {
    this.container.insertAdjacentHTML('beforeend', `
      <div class="printDish">
        <div class="dishImagePrinter">
          <img src="${this.model.imgPath + this.dish.image}" class="dishPrintImage"/>
        </div>
        <div class="printDishDescription">
          <h1 class="dishNameHeader">${this.dish.name.toUpperCase()}</h1>
          <p>
            ${this.dish.description}
          </p>
        </div>
        <div class="printPreparation">
          <h1 class="preparation">
            PREPARATION
          </h1>
          <p>
            ${this.dish.preparation}
          </p>
        </div>
      </div>
    `);
  }
}
