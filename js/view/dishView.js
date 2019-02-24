class DishView {
  constructor(container, model, dish, showPrice) {
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.dish = dish;    
    this.showPrice = showPrice;
  }

  hide() {
    this.container.style.display = 'none';
  }

  getPrice() {
    if (this.showPrice) {      
      return `<span class="showPrice" attr="${this.dish.id}">${this.model.getTotalDishPrice(this.dish.id)} SEK</span>`
    }
    return '';
  }

  render() {
    this.container.style.display = this.displayProperty;
    this.container.insertAdjacentHTML(
      'beforeend',
      `
      <div class="priceAndDishItem">
        <div class="dishItem" dishID="${this.dish.id}">
          <div class="thumbnail">
            <img class="thumbnailImage" src="${(this.showPrice ? '' : API.API_IMAGE_URL) + this.dish.image}">
          </div>
          <p>${this.dish.name}</p>
        </div>
        ${this.getPrice()}
      </div>
    `
    );
  }
}
