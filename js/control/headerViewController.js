class HeaderViewController {
  constructor(view, model, newView) {
    view.getElementsByTagName('h1')[0].addEventListener('click', () => {
      newView();
    });
  }
}
