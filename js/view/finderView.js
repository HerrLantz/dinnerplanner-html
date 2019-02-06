class FinderView {
  constructor(container, model) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
  }

  /**
   * Hides the view
   */
  hide() {
    this.container.style.display = 'none';
  }

  /**
   * Populates a select element with all the types of dishes
   */
  dishTypesToString() {
    var types = `<option value="All" selected>All</option>\n`;
    for (const dishType in this.model.getAllTypes()) {
      types += `<option value="${dishType}">${dishType}</option>\n`;
    }
    return types;
  }

  update(model, changeDetails) {
    var dishes = model.getSearchResult();

    // Clear recent search
    this.container.querySelector('#resultPanel').innerHTML = '';

    dishes.forEach(dish => {
      new DishView(
        this.container.querySelector('#resultPanel'),
        model,
        dish.id,
        true
      ).render();
    });
  }

  /**
   * Renders the view
   */
  render() {
    this.container.style.display = this.displayProperty;
    this.container.innerHTML = `
    <div id="dinnerFinder">
      <div id="searchPanel">
        <h1>FIND A DISH</h1>
        <div id="filterOptions">
          <input type="text" id="searchField" placeholder="Enter keywords" />
          <select id="dishes">${this.dishTypesToString()}</select>
          <button class="primaryButton" id="searchButton">search</button>
        </div>
      </div>
      <div id="resultPanelWrapper">
        <div id="resultPanel" />
      </div>
    </div>`;
  }
}
