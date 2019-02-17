class FinderViewController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // Populate result page with all dishes
    model.getAllDishes('All', '');
    model.notifyObservers({ type: 'on pageload search' });

    view.querySelector('#searchButton').addEventListener('click', () => {
      let searchString = view.querySelector('#searchField').value;
      let dishType = view.querySelector('#dishes').value;

      model.getAllDishes(dishType, searchString);
    });
  }
}
