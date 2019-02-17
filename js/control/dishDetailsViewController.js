class DishDetailsViewController {
  constructor(view, model, newView, hideView) {   
    this.newView = newView;
    this.hideView = hideView;   
  }
  
  addBackButtonListener(backBut) {
    backBut.addEventListener('click', () => {
        this.hideView();
        this.newView();
      });
  }
}
  