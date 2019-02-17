class HeaderViewController {
  constructor(view, model, newView, hideView) {
    view.getElementsByTagName('h1')[0].addEventListener('click', () => {
      hideView();
      newView();
    });
  }
}
