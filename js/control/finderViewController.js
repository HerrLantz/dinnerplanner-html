class FinderViewController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    view.querySelector('#searchButton').addEventListener('click', () => {
      let searchString = view.querySelector('#searchField').value;
      let dishType = view.querySelector('#dishes').value;

      console.log('SearchString: ' + searchString);
      console.log('dishType: ' + dishType);

      model.getAllDishes(dishType, searchString);
      model.notifyObservers({ type: 'search' });
    });
  }
}
