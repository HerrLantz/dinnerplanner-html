class FinderViewController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // Populate result page with all dishes
    model.getAllDishes('All', '');
    model.notifyObservers({ type: 'on pageload search' });

    function search() {
      let searchString = view.querySelector('#searchField').value;
      let dishType = view.querySelector('#dishes').value;

      let spinner = view.querySelector('#resultPanel');
      spinner.innerHTML = `<img src="images/loading.gif" width="64" height="64"/>`;
      model.getAllDishes(dishType, searchString);
    }

    view.querySelector('#searchButton').addEventListener('click', () => {
      search();
    });

    view.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        search();
      }
    });

    view.querySelector('#dishes').addEventListener('change', () => {
      search();
    }, false);
  }
}
