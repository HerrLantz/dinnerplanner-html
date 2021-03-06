class DishViewController {
  constructor(view, model, newView, hideView) {
    model.addObserver(this);
    this.view = view;
    this.model = model;
    this.update(this.model, { type: 'search_update' });
    this.newView = newView;
    this.hideView = hideView;
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'search_update' || changeDetails.type === 'cart_update') {
      for (let dish of this.view) {
        dish.addEventListener('click', () => {
          let dishID = dish.getAttribute('dishid');
          model.setDishDetailsID(dishID);
          this.hideView();
          this.newView();
        });
      }
    }
  }
}
