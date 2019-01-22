var IngredientsView = function(container, model, dish) {
  var guests = model.getNumberOfGuests();

  var createTableOfIngredients = function() {
    let rows = '';
    dish.ingredients.forEach(ingredient => {
      rows += `
            <tr>
                <td>
                    ${ingredient.quantity * guests} ${ingredient.unit}
                </td>
                <td>
                    ${ingredient.name}
                </td>
                <td>
                    SEK ${ingredient.price * guests}
                </td>
            </tr>`;
    });
    return rows;
  };

  container.html(`
        <h2>INGREDIENTS FOR ${guests} PEOPLE</h2>
        <table>
            ${createTableOfIngredients()}
        </table>`);
};
