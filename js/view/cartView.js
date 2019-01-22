var CartView = function(container, model) {
  const populateCart = () => {
    console.log(model.getSelectedDishes());

    model.getSelectedDishes().forEach(dishID => {
      let dish = model.getDish(dishID.id);
      console.log('DISH ' + dish);

      $('#dinnerTable').append(`
        <tr>
          <td>${dish.name}</td>
          <td>500kr</td>
        </tr>
      `);
    });
  };

  $(document).ready(function() {
    if ($(window).width() > 800) {
      $('#confirmationBox').show();
      $('#peopleSelector').show();
      $('#searchPanel').show();
      $('#cartViewHeader span').hide();
    }

    $('#burgerMenu').click(function() {
      if ($('#confirmationBox').is(':visible')) {
        $('#confirmationBox').hide();
        $('#peopleSelector').hide();
        $('#searchPanel').hide();
        $('#cartViewHeader span').show();
      } else {
        $('#confirmationBox').show();
        $('#peopleSelector').show();
        $('#searchPanel').show();
        $('#cartViewHeader span').hide();
      }
    });

    $(window).resize(function() {
      if ($(window).width() > 800) {
        $('#confirmationBox').show();
        $('#peopleSelector').show();
        $('#searchPanel').show();
        $('#cartViewHeader span').hide();
      }
    });

    populateCart();
  });

  container.html(`
      <div id="dinnerPlan">
          <div id="cartViewHeader">
              <h1>My Dinner</h1>
              <span>SEK 100000</span>
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
              </table>
              <p id="totalPrice">SEK 100000</p>
              <div id="confirmDinner">
              <button class="primaryButton" disabled>
              Confirm Dinner
              </button>
              </div>
          </div>
      </div>
  `);
};
