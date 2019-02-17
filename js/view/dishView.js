class DishView {
  constructor(container, model, dishID, showPrice) {
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.dishID = dishID;
    this.showPrice = showPrice;
  }

  hide() {
    this.container.style.display = 'none';
  }

  getPrice() {
    if (this.showPrice) {      
      return `<span class="showPrice" attr="${this.dishID}">${this.model.getTotalDishPrice(this.dishID)} SEK</span>`
    }
    return '';
  }

  render() {
    this.container.style.display = this.displayProperty;
    this.container.insertAdjacentHTML(
      'beforeend',
      `
      <div class="priceAndDishItem">
        <div class="dishItem" dishID="${this.dishID}">
          <div class="thumbnail">
            <img class="thumbnailImage" src="${this.model.imgPath +
            this.model.getDish(this.dishID).image}">
          </div>
          <p>${this.model.getDish(this.dishID).name}</p>
        </div>
        ${this.getPrice()}
      </div>
    `
    );
  }
}
