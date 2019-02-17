class CartView {
  constructor(container, model) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
  }

  hide() {
    this.container.style.display = 'none';
  }

  burgerMenu() {
    return `
    <div id="burgerMenu">
      <svg id="burgerIcon" height="21" width="30">
        <line x1="0" y1="5" x2="30" y2="5" />
        <line x1="0" y1="12" x2="30" y2="12" />
        <line x1="0" y1="19" x2="30" y2="19" />
      </svg>
    </div>
    `;
  }

  update(model, changeDetails) {
    // Model has not changed items in cart; don't update
    if (changeDetails.type !== 'cart_update') {
      return;
    }

    // Update total price
    this.container.querySelector(
      '#cartViewHeader span'
    ).innerHTML = `SEK ${model.getTotalMenuPrice()}`;

    this.container.querySelector('#totalPrice').innerHTML = `
      SEK ${model.getTotalMenuPrice()}
    `;

    // Update cart with new items
    var dishes = model.getSelectedDishes();
    this.container.querySelector('#dinnerTable').innerHTML = '';
    for (const dishType in dishes) {
      let dishID = model.getSelectedDishes()[dishType];
      let dish = model.getDish(dishID);

      this.container.querySelector('#dinnerTable').insertAdjacentHTML(
        'beforeend',
        `
        <tr>
          <td>${dish.name}</td>
          <td>SEK ${model.getTotalDishPrice(dishID)}</td>
          <td class='removeDish' dishid=${dishID}>X</td>
        </tr>
        `
      );
    }

    // Update the number of guest displayed
    this.container.querySelector(
      '#peopleSelector input'
    ).value = model.getNumberOfGuests();

    // If there exists dishes, enable checkout of dinner
    if (dishes) {
      this.container.querySelector(
        '#confirmDinner .primaryButton'
      ).disabled = false;
    } else {
      this.container.querySelector(
        '#confirmDinner .primaryButton'
      ).disabled = true;
    }
  }

  render() {
    this.container.style.displayProperty = this.displayProperty;
    this.container.innerHTML = `
      <div id="cartViewHeader">
        <h1>My Dinner</h1>
        <span>SEK ${this.model.getTotalMenuPrice()}</span>
        ${this.burgerMenu()}
      </div>
      <div id="peopleSelector">
        <label>
          People
          <input
              type="number"
              value="${this.model.getNumberOfGuests()}"
              max="999"
              min="0"
          />
          </label>
          <div id='arrowButtons'>
            <div class='arrow' direction='up'></div>
            <div class='arrow' direction='down'></div>
          </div>
      </div>
      <div id="confirmationBox">
        <div class="divider">
          <span>Dish name</span>
          <span>Cost</span>
        </div>
        <table id="dinnerTable">
        </table>
        <p id="totalPrice"></p>
        <div id="confirmDinner">
          <button class="primaryButton" disabled>
            Confirm Dinner
          </button>
        </div>
      </div>`;
  }
}
