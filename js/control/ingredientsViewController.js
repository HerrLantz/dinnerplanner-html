class IngredientsViewController{
  constructor(view, model) {    
    view.querySelector('.primaryButton').addEventListener('click', () => {
      model.addDishToMenu(model.getDishDetailsID());
    });
  }
}