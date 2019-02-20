class DishViewController {
  constructor(view, model, newView, hideView) {
    model.addObserver(this);
    this.view = view;
    this.model = model;
    // this.update(this.model, { type: 'search_update' });
    this.newView = newView;
    this.hideView = hideView;
  }

  update(model, changeDetails) {
    
    if (changeDetails.type === 'search_update' || changeDetails.type === 'cart_update') {
      console.log("dishViewController UPDATE");
      console.log(this.view.length);
      console.log(this.view);
      
      for (let dish of this.view) {
        console.log(this.view);
        
        console.log(dish);
        
        dish.addEventListener('click', () => {
          console.log("MUUUUUUUU");
          
          let dishID = dish.getAttribute('dishID');
          model.setDishDetailsID(dishID);
          this.hideView();
          this.newView();
        });
      }
    }
  }
}
