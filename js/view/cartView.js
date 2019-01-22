var CartView = function(container, model) {
  const populateResultPanel = (type, filter) => {
    // Get all types of dishes
    var dishes = model.getAllDishes('', '');

    dishes.forEach(dish => {
      new DishView($('#resultPanel'), model, dish.id);
    });
  };

  $(document).ready(function() {
    $('#burgerMenu').click(function() {
      if ($('#confirmationBox').hasClass('collapsed')) {
        $('#confirmationBox').removeClass('collapsed');
        $('#peopleSelector').removeClass('collapsed');
      } else {
        $('#confirmationBox').addClass('collapsed');
        $('#peopleSelector').addClass('collapsed');
      }
    });
    new FinderView($('#finderView'), model);

    populateResultPanel('b', 'b');
  });

  container.html(`
    <div id="dinnerOverview">
      <div id="dinnerPlan">
          <div id="cartViewHeader">
              <h1>My Dinner</h1>
              <div id="burgerMenu">
              <svg id="burgerIcon" height="21" width="30">
                  <line x1="0" y1="5" x2="30" y2="5" />
                  <line x1="0" y1="12" x2="30" y2="12" />
                  <line x1="0" y1="19" x2="30" y2="19" />
              </svg>
              </div>
          </div>
          <div id="peopleSelector">
              <label>
              People
              <input
                  type="number"
                  value="${model.getNumberOfGuests()}"
                  max="999"
                  min="0"
              />
              </label>
          </div>
          <div id="confirmationBox">
              <div class="divider">
              <span>Dish name</span>
              <span>Cost</span>
              </div>

              <table id="dinnerTable">
              <tr>
                  <td>Korvstroganoff</td>
                  <td>7000kr</td>
              </tr>
              <tr>
                  <td>Korvstroganoff</td>
                  <td>7000kr</td>
              </tr>
              <tr>
                  <td>Korvstroganoff</td>
                  <td>7000kr</td>
              </tr>
              <tr>
                  <td>Korvstroganoff</td>
                  <td>7000kr</td>
              </tr>
              </table>
              <p id="totalPrice">SEK 100000</p>
              <div id="confirmDinner">
              <button class="primaryButton" disabled>
              Confirm Dinner
              </button>
              </div>
          </div>
      </div>
    <div id="finderView"/>
    </div>
  `);
};
