var CartView = function(container, model) {
  var dishTypesToString = function() {
    var types = `<option value="All" selected>All</option>\n`;
    for (const dishType in model.getAllTypes()) {
      types += `<option value="${dishType}">${dishType}</option>\n`;
    }
    return types;
  };

  const imageFolderPath = 'images/';
  var showResults = function(type, filter) {
    var allDishes = model.getAllDishes(type, filter);
    results = '';
    allDishes.forEach(dish => {
      results += `<div>
      <img src="${imageFolderPath + dish.image}">
      <p>"${dish.name}"</p>
      </div>`;
    });
    return results;
  };

  const populateResultPanel = (type, filter) => {
    var dishes = model.getAllDishes('starter', '');

    dishes.forEach(dish => {
      new DishView($('#resultPanel'), model, dish.id);
    });
    
    console.log(dishes);
  };

  /**
   * This does not work for some reason
   */
  // const toggleCart = function() {
  //   if ($('#confirmationBox').hasClass('collapsed')) {
  //     console.log('Removed collapsed');
  //     $('#confirmationBox').removeClass('collapsed');
  //   } else {
  //     console.log('Fuck collapsed');
  //     $('#confirmationBox').addClass('collapsed');
  //   }
  // };

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

    showResults('', '');

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
      <div id="dinnerFinder">
          <div id="searchPanel">
              <h1>FIND A DISH</h1>
              <div id="filterOptions">
                <input type="text" placeholder="Enter keywords"/>
                <select id="dishes">
                    ${dishTypesToString()}
                </select>
                <button class="primaryButton">
                search
                </button>
              </div>
          </div>
          <div id="resultPanel">
          </div>
      </div>
    </div>
  `);
};
