var SubHeaderView = function(container, model) {
  container.html(`
  <h1>
    My Dinner: ${model.getNumberOfGuests()} people
  </h1>

  <button class="backButton">Go back and edit dinner</button>
  `);
};
