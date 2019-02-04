class HeaderViewController {
  constructor(view, model, newView) {
    console.log(view);

    view.getElementsByTagName('h1')[0].addEventListener('click', () => {
      newView();
    });
  }
}
