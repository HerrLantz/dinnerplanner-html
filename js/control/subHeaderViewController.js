class SubHeaderViewController{
    constructor(view, model, newView, hideView) {    
      view.querySelector('.backButton').addEventListener('click', () => {
        hideView();
        newView();
      });
    }
  }