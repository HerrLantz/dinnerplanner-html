class DishDetailsViewController {
  constructor(view, model, newView, hideView) {   
    this.newView = newView;
    this.hideView = hideView;   
    let bb = view.querySelector('.backButton')
    
    bb.addEventListener('click', () => {
      this.hideView();
      this.newView();
    });
  }
}
  