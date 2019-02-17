class OverViewController{
    constructor(view, model, newView, hideView) {    
      view.querySelector('.primaryButton').addEventListener('click', () => {
        hideView();
        newView();
      });
    }
  }