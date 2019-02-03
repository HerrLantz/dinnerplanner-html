class HomeViewController {
  constructor(view, model, newView) {
    view
      .getElementsByClassName('primaryButton')[0]
      .addEventListener('click', () => {
        newView();
      });
  }
}
