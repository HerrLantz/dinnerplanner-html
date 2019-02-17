class DishDetailsView {
  constructor(container, model, controller) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.controller = controller;
    this.displayProperty = container.style.display;
    this.dish = model.getDish(model.getDishDetailsID());  
  }

  hide() {
    this.container.style.display = 'none';
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'dish_details') {      
      this.dish = model.getDish(model.getDishDetailsID());      
      
      // Update the dish details
      this.container.querySelector('#dishNameHeader').innerHTML = this.dish.name;
      this.container.querySelector('.dishImage').setAttribute('src', this.model.imgPath + this.dish.image);
      this.container.querySelector('#dishDescription').innerHTML = this.dish.description;
      this.container.querySelector('#dishPreparation').innerHTML = this.dish.preparation;
    }
  }

  render() {
    this.container.style.display = this.displayProperty;
    this.container.innerHTML = `
      <div id="dishDesc">
        <div id="dishDetails">
          <h1 id="dishNameHeader">${this.dish.name}</h1>
          <div class="dishImageWrapper">
            <img src="${this.model.imgPath + this.dish.image}" class="dishImage"/>
          </div>
          <p id="dishDescription">${this.dish.description}</p>
          <button class="backButton">back to search</button>
        </div>
        <div id="ingredients">
        </div>
      </div>
      <h1>PREPARATION</h1>
      <p id="dishPreparation">${this.dish.preparation}</p>
    `;
    new IngredientsView(this.container.querySelector('#ingredients') , this.model, this.dish).render();
  }
}
