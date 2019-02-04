// var DishPrintView = function(container, model, dish) {
//   container.append(`
//       <div class="printDish">
//       <div class="printDishDescription">
//         <h1>${dish.name}</h1>
//         <div class="dishImagePrinter">
//           <img src="${model.imgPath + dish.image}" class="dishImage"/>
//         </div>
//         <p>
//           ${dish.description}
//         </p>
//       </div>
//       <div class="printPreparation">
//         <h1>
//           Preparation
//         </h1>
//         <p>
//           ${dish.preparation}
//         </p>
//       </div>
//       </div>
//     `);
// };

class DishPrintView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.displayProperty = container.style.display;
  }

  hide() {
    this.container.style.display = 'none';
  }

  render() {
    this.container.innerHTML = `
      <div class="printDish">
        <div class="printDishDescription">
          <h1>${dish.name}</h1>
          <div class="dishImagePrinter">
            <img src="${model.imgPath + dish.image}" class="dishImage"/>
          </div>
        <p>
          ${dish.description}
        </p>
        </div>
        <div class="printPreparation">
          <h1>
            Preparation
          </h1>
          <p>
            ${dish.preparation}
          </p>
        </div>
      </div>
    `;
  }
}
