class DishPrintView {
  constructor(container, model, dish) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.dish = dish;
  }

  hide() {
    this.container.style.display = 'none';
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'cart_update') {
      this.container.querySelector('.dishNameHeader').innerHTML = this.dish.name.toUpperCase();
      this.container.querySelector('.dishPrintImage').setAttribute('src', this.dish.image);
      this.container.querySelector('#dishDescription').innerHTML = this.dish.description;
      this.container.querySelector('#dishPreparation').innerHTML = this.dish.preparation;
    }
  }

  render() {
    this.container.insertAdjacentHTML('beforeend', `
      <div class="printDish">
        <div class="dishImagePrinter">
          <img src="" class="dishPrintImage"/>
        </div>
        <div class="printDishDescription">
          <h1 class="dishNameHeader"></h1>
          <p id="dishDescription">
          </p>
        </div>
        <div class="printPreparation">
          <h1 class="preparation">
            PREPARATION
          </h1>
          <p id="dishPreparation">
          </p>
        </div>
      </div>
    `);
  }
}
