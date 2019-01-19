var CartView = function(container, model) {
  var dishTypesToString = function() {
    var types = '';
    for (const dishType in model.getAllTypes()) {
      types += `<option value="${dishType}">\n`;
    }
    return types;
  };

  container.html(`
    <div id="dinnerOverview">
      <div id="cartViewHeader">
        <h1>My Dinner</h1>
        <div id="burgerMenu">
          <svg id="burgerIcon" height="25" width="30">
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
            value="${model.getNumberOfGuests()} "
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
        <input type="text"/>
        <input list="dishes" name="dishes">
          <datalist id="dishes">
            ${dishTypesToString()}
          </datalist>
        <button class="primaryButton">
          search
        </button>

      </div>
      
      <div id="resultPanel">
      </div>
    </div>
  `);
};
