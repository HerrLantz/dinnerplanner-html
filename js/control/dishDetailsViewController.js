class DishDetailsViewController {
  constructor(view, model, newView, hideView) {      
    // view
    //   .getElementsByClassName('backButton')[0]
  }
  
  addBackButtonListener(backBut) {
    backBut.addEventListener('click', () => {
        console.log("CLICKETYCLACKBACK");
        
          hideView();
          newView();
      });
  }
}
  