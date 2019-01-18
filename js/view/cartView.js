var CartView = function(container, model) {
  container.html(`
    <h1>My Dinner</h1>
    <label>
        People
        <input type="number" value="${model.getNumberOfGuests()}"/>
    </label>
    `)
}
