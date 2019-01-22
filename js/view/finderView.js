var FinderView = function(container, model) {
  var dishTypesToString = function() {
    var types = `<option value="All" selected>All</option>\n`;
    for (const dishType in model.getAllTypes()) {
      types += `<option value="${dishType}">${dishType}</option>\n`;
    }
    return types;
  };

  container.html(`
    <div id="dinnerFinder">
      <div id="searchPanel">
        <h1>FIND A DISH</h1>
        <div id="filterOptions">
          <input type="text" placeholder="Enter keywords" />
          <select id="dishes">${dishTypesToString()}</select>
          <button class="primaryButton">search</button>
        </div>
      </div>
      <div id="resultPanelWrapper">
        <div id="resultPanel" />
      </div>
    </div>
  `);
};