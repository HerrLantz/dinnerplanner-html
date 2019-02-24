class IngredientsView {
  constructor(container, model, dish) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.dish = dish
  }
  
  hide() {
    this.container.style.display = 'none';
  }

  // Set the amount of decimals based on ingredient unit.
  formatQuantity(ingredient) {
    let amount = ingredient.quantity * this.guests;
    let unitIsGramsOrMls = ingredient.unit === 'g' || ingredient.unit === 'ml';
    return unitIsGramsOrMls ? amount.toFixed() : amount.toFixed(1);
  }

  createTableOfIngredients() {
    let rows = '';
    if(this.dish) {
      if (this.dish.ingredients) {
        this.dish.ingredients.forEach(ingredient => {
          rows += `
          <tr>
          <td>
          ${this.formatQuantity(ingredient)} ${ingredient.unit}
          </td>
          <td>
          ${ingredient.name}
          </td>
          <td>
          SEK
          </td>
          <td align="right">
          ${ingredient.price * this.guests}
          </td>
          </tr>`;
        });
      }
    }
    return rows;
  };


  updateFields() {    
    this.container.querySelector('#tableOfIngredients').innerHTML = this.createTableOfIngredients();
    this.container.querySelector('#numberOfPeople').innerHTML = `INGREDIENTS FOR ${this.guests} PEOPLE`;
    this.container.querySelector('#totalDishPrice').innerHTML = `SEK ${this.dish.ingredients.length * this.guests}`;
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'cart_update' || changeDetails.type === 'dish_details') {
      this.guests = model.getNumberOfGuests();
      let selectedDishes = model.getSelectedDishes();
      let id = model.getDishDetailsID();
      if (id in model.dishes) {
        this.dish = model.dishes[id];
        this.updateFields();
      } else {
        model.getDish(id, `ingredientsView(${this.dish ? this.dish.id : 'undef'})`).then((dish) => {
          this.dish = dish;
          this.updateFields();
        });
      }
    }
  }

  render() {
    this.container.innerHTML = `
      <h2 id="numberOfPeople">
        INGREDIENTS FOR SOME AMOUNT OF PEOPLE
      </h2>
      <hr>
      <table id="tableOfIngredients">
      </table>
      <hr>
      <div id="totalRow">
        <button class="primaryButton">
          Add to menu
        </button>
        <b id="totalDishPrice" ></b>
      </div>
    `;
  }
}
  