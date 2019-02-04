// var SubHeaderView = function(container, model) {
//   container.html(`
//   <h1>
//     My Dinner: ${model.getNumberOfGuests()} people
//   </h1>

//   <button class="backButton">Go back and edit dinner</button>
//   `);
// };

class SubHeaderView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
  }

  hide() {
    this.container.style.display = 'none';
  }

  render() {
    this.container.innerHTML = `
    <h1>
      My Dinner: ${this.model.getNumberOfGuests()} people
    </h1>
    <button class="backButton">Go back and edit dinner</button>
    `;
  }
}
