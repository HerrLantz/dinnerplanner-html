// var DishDetailsView = function(container, model, dish) {
//   $(document).ready(function() {
//     new IngredientsView($('.ingredients'), model, dish);
//   });
//   container.html(`
//       <div id="dishDesc">
//         <div id="dishDetails">
//           <h1>${dish.name}</h1>
//           <div class="dishImageWrapper">
//             <img src="${model.imgPath + dish.image}" class="dishImage"/>
//           </div>
//           <p>${dish.description}</p>
//           <button class="backButton">back to search</button>
//         </div>
//         <div class="ingredients">
//         </div>
//       </div>
//       <h1>PREPARATION</h1>
//       <p>${dish.preparation}</p>
//     `);
// };

class DishDetailsView {
  constructor(container, model, controller) {
    model.addObserver(this);
    this.container = container;
    this.model = model;
    this.controller = controller;
    this.displayProperty = container.style.display;
    this.dish = {}
    this.update(model, {type: 'dish_details'});
  }

  hide() {
    this.container.style.display = 'none';
  }

  update(model, changeDetails) {
    if (changeDetails.type === 'dish_details') {      
      this.dish = model.getDish(model.getDishDetailsID());      
      this.render();
    }
  }

  render() {
    this.container.style.display = this.displayProperty;
    this.container.innerHTML = `
      <div id="dishDesc">
        <div id="dishDetails">
          <h1>${this.dish.name}</h1>
          <div class="dishImageWrapper">
            <img src="${this.model.imgPath + this.dish.image}" class="dishImage"/>
          </div>
          <p>${this.dish.description}</p>
          <button class="backButton">back to search</button>
        </div>
        <div class="ingredients">
        </div>
      </div>
      <h1>PREPARATION</h1>
      <p>${this.dish.preparation}</p>
    `;
    new IngredientsView(this.container.getElementsByClassName('ingredients')[0] , this.model, this.dish);
    this.controller.addBackButtonListener(this.container.getElementsByClassName('backButton')[0]);
  }
}
