class HomeViewController {
  constructor(view, model, newView, hideView) {
    view
      .getElementsByClassName('primaryButton')[0]
      .addEventListener('click', () => {
        hideView();
        newView();
      });
  }
}
