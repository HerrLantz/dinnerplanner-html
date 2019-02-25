class DishDetailsView {
  constructor(container, model, controller) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.controller = controller;
    this.displayProperty = container.style.display;
    this.dish = {};
  }

  hide() {
    this.container.style.display = 'none';
  }

  // Update the dish details
  updateDishDetails() {
    this.container.querySelector('.dishNameHeader').innerHTML = this.dish.name;
    this.container.querySelector('.dishImage').setAttribute('src', this.dish.image);
    this.container.querySelector('#dishDescription').innerHTML = this.dish.description;
    this.container.querySelector('#dishPreparation').innerHTML = this.dish.preparation;
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'dish_details') {
      let id = model.getDishDetailsID();
      if (id in model.dishes) {
        this.dish = model.dishes[id];
        this.updateDishDetails();
      } else {
        let spinner = this.container.querySelector('#spinner');
        let details = this.container.querySelector('#details');
        details.style.display = 'none';
        spinner.style.display = 'flex';
        spinner.innerHTML = `<img src="images/loading.gif" width="64" height="64"/>`;

        model.getDish(id, `DishDetailsView(${id}:${changeDetails.type})`).then(dish => {
          details.style.display = this.displayProperty;
          spinner.innerHTML = "";
          model.dishes[id] = dish;
          this.dish = dish;
          this.updateDishDetails();
        });      
      }
    }
  }

  render() {
    this.container.style.display = this.displayProperty;
    this.container.innerHTML = `
      <div id="spinner"></div>
      <div id="details">
        <div id="dishDesc">
        <div id="dishDetails">
        <h1 class="dishNameHeader"></h1>
        <div class="dishImageWrapper">
        <img src="" class="dishImage"/>
        </div>
        <p id="dishDescription"></p>
        <button class="backButton">back to search</button>
        </div>
        <div id="ingredients">
        </div>
        </div>
        <h1>PREPARATION</h1>
        <p id="dishPreparation"></p>
      </div>
      `;
      new IngredientsView(this.container.querySelector('#ingredients') , this.model, this.dish).render(); 
    }
  }
  