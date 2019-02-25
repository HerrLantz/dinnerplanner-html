class DishPrintView {
  constructor(container, model, dish) {
    //model.addObserver(this);
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.dish = dish;
  }

  hide() {
    this.container.style.display = 'none';
  }

  // Not needed since we dont update each dish. We instead remove all dishes and then add them again.
  // update(model, changeDetails) {
  //   if (changeDetails.type === 'cart_update') {
  //     this.container.querySelector(`#header${this.dish.id}`).innerHTML = this.dish.name.toUpperCase();
  //     this.container.querySelector(`#image${this.dish.id}`).setAttribute('src', this.dish.image);
  //     this.container.querySelector(`#dishDescription${this.dish.id}`).innerHTML = this.dish.description;
  //     this.container.querySelector(`#dishPreparation${this.dish.id}`).innerHTML = this.dish.preparation;
  //   }
  // }

  render() {
    this.container.insertAdjacentHTML(
      'beforeend',
      `
      <div class="printDish">
        <div class="dishImagePrinter">
          <img src="${this.dish.image}" class="dishPrintImage" id="image${
        this.dish.id
      }"/>
        </div>
        <div class="printDishDescription">
          <h1 class="dishNameHeader" id="header${this.dish.id}">
          ${this.dish.name.toUpperCase()}
          </h1>
          <p id="dishDescription${this.dish.id}">
          ${this.dish.description}
          </p>
        </div>
        <div class="printPreparation">
          <h1 class="preparation">
            PREPARATION
          </h1>
          <p id="dishPreparation${this.dish.id}">
          ${this.dish.preparation}
          </p>
        </div>
      </div>
    `
    );
  }
}
