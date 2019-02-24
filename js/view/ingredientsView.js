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

  update(model, changeDetails) {
    if (changeDetails.type === 'cart_update' || changeDetails.type === 'dish_details') {
      this.model = model;
      this.guests = model.getNumberOfGuests();
      this.model.getDish(this.model.getDishDetailsID()).then((dish) => {
        this.dish = dish;
        this.container.querySelector('#tableOfIngredients').innerHTML = this.createTableOfIngredients();
        this.container.querySelector('#numberOfPeople').innerHTML = `INGREDIENTS FOR ${this.guests} PEOPLE`;
        this.container.querySelector('#totalDishPrice').innerHTML = `SEK ${model.getDishPrice(this.dish.id) * this.guests}`;
      });
    }
  }

  render() {
    this.container.innerHTML = `
      <h2 id="numberOfPeople">
        INGREDIENTS FOR ${this.guests} PEOPLE
      </h2>
      <hr>
      <table id="tableOfIngredients">
        ${this.createTableOfIngredients()}
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
  