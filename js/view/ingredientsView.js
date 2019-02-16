class IngredientsView {
  constructor(container, model, dish) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.dish = dish

    this.update(this.model, {type: 'cart_update'});
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
    return rows;
  };

  update(model, changeDetails) {
    if (changeDetails.type === 'cart_update') {
      this.guests = model.getNumberOfGuests();
      this.render();
    }
  }

  render() {
    this.container.innerHTML = `
      <h2>
        INGREDIENTS FOR ${this.guests} PEOPLE
      </h2>
      <hr>
      <table>
        ${this.createTableOfIngredients()}
      </table>
      <hr>
      <div id="totalRow">
        <button class="primaryButton">
          Add to menu
        </button>
        <b>SEK ${this.model.getDishPrice(this.dish.id) * this.guests}</b>
      </div>
    `;
    this.container.getElementsByClassName('primaryButton')[0].addEventListener('click', () => {
      this.model.addDishToMenu(this.dish.id);
    });
  }
}
  