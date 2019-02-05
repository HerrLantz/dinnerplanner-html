class HeaderViewController {
  constructor(view, model, newView, hideView) {
    console.log(view);

    view.getElementsByTagName('h1')[0].addEventListener('click', () => {
      hideView();
      newView();
    });
  }
}
