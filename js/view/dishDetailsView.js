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
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
  }

  hide() {
    this.container.style.display = 'none';
  }

  render() {
    this.container.style.display = this.displayProperty;
    this.container.innerHTML = `
    <div id="dishDesc">
      <div id="dishDetails">
        <h1>${dish.name}</h1>
        <div class="dishImageWrapper">
          <img src="${model.imgPath + dish.image}" class="dishImage"/>
        </div>
        <p>${dish.description}</p>
      <button class="backButton">back to search</button>
    </div>
    <div class="ingredients">
    </div>
  </div>
  <h1>PREPARATION</h1>
  <p>${dish.preparation}</p>
    `;
  }
}
