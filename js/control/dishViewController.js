class DishViewController {
  constructor(view, model) {
    model.addObserver(this);
    this.view = view;
    this.model = model;
    this.update(this.model, { type: 'search_update' });
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'search_update') {
      for (let dish of this.view) {
        console.log(dish.getAttribute('dishid'));
        dish.addEventListener('click', () => {
          let dishID = dish.getAttribute('dishid');
          model.addDishToMenu(dishID);
        });
      }
    }
  }
}
