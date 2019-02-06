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
  constructor(container, model, dish) {
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
    this.dish = dish;
  }

  hide() {
    this.container.style.display = 'none';
  }

  render() {
    this.container.style.display = this.displayProperty;
    this.container.innerHTML = `
    <div id="dishDesc">
      <div id="dishDetails">
        <h1>TODO: UPDATE WITH DISH</h1>
        <div class="dishImageWrapper">
          TODO: UPDATE WITH DISH IMAGE
        </div>
        <p>TODO: UPDATE WITH DESCRIPTION</p>
      <button class="backButton">back to search</button>
    </div>
    <div class="ingredients">
    </div>
  </div>
  <h1>PREPARATION</h1>
  <p>TODO: UPDATE WITH PREPARATION</p>
    `;
  }
}
