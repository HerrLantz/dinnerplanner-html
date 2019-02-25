//DinnerModel Object constructor
class DinnerModel extends Observable {
  constructor() {
    super();

    this.dinnerPlan = {
      nrOfGuests: 2,
      selectedDishes: []
    };

    // Results from a search
    this.searchResult = [];
    // What dish to show the details of
    this.dishDetailsID;

    // this.imgPath = 'images/';
    this.imgPath = API.API_IMAGE_URL;

    // Dishes saved on disk
    this.dishes = [];

    // All dish types
    this.styledTypes = ['Main course', 'Side dish', 'Dessert', 'Appetizer', 'Salad', 'Bread', 'Breakfast', 'Soup', 'Beverage', 'Sauce', 'Drink'];
    this.allTypes = ['main+course', 'side+dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'drink'];
  }

  setNumberOfGuests(num) {
    this.dinnerPlan.nrOfGuests = num;
    this.notifyObservers({ type: 'cart_update' });
  }

  addGuest() {
    this.dinnerPlan.nrOfGuests++;
    this.notifyObservers({ type: 'cart_update' });
  }

  removeGuest() {
    this.dinnerPlan.nrOfGuests--;
    this.notifyObservers({ type: 'cart_update' });
  }

  getNumberOfGuests() {
    return this.dinnerPlan.nrOfGuests;
  }

  getSelectedDishes() {
    return this.dinnerPlan.selectedDishes;
  }

  //Returns the dish that is on the menu for selected type
  getSelectedDish(id) {
    return this.dinnerPlan.selectedDishes[id];
  }

  getSearchResult() {
    return this.searchResult;
  }

  setDishDetailsID(dishID) {
    this.dishDetailsID = dishID;
    this.notifyObservers({ type: 'dish_details' });
  }

  getDishDetailsID() {
    return this.dishDetailsID;
  }

  getTotalDishPrice(dishID) {
    let dish = this.dishes[dishID];
    if (dish) {
      return this.dinnerPlan.nrOfGuests * dish.ingredients.length;
    }
    return 0;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  getTotalMenuPrice() {
    let sum = 0;

    for (const dishID in this.dinnerPlan.selectedDishes) {
      sum += this.getTotalDishPrice(dishID);
    }

    return sum;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  addDishToMenu(id) {
    if (id in this.dishes) {   
      this.dinnerPlan.selectedDishes[id] = this.dishes[id];
      this.notifyObservers({ type: 'cart_update' });
    }
    else {
      this.getDish(id, `addDishToMenu(${id})`).then(fetchedDish => {   
        this.dishes[id] = fetchedDish;
        this.dinnerPlan.selectedDishes[id] = fetchedDish;
        this.notifyObservers({ type: 'cart_update' });
      });
    } 

  }

  //Removes dish from menu
  removeDishFromMenu(id) {
    delete this.dinnerPlan.selectedDishes[id];
    this.notifyObservers({ type: 'cart_update' });
  }
  
  //function that returns a dish of specific ID
  getDish(id, caller) {
    console.log(`API call: getDish(${id}) - caller: ${caller}`);
    
    return  fetch(`${API.API_URL}recipes/${id}/information`, {
        mode: 'cors',
        headers: {   
          'X-Mashape-Key': API.API_KEY,
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response => response.json())
        .then(dish => {                    
          let ingredients = [];
          for (const ingredient of dish.extendedIngredients) {
            let ingredientToAdd = {
              name: ingredient.name || 'XXXXXXXXXXXX',
              quantity: ingredient.amount || '?????????????',
              unit: ingredient.measures.metric.unitShort || '',
              price: 1
            };
            ingredients.push(ingredientToAdd);
          }
          let instructions = "<ol>";
          if (dish.analyzedInstructions.length > 0) {
            for (const instruction of dish.analyzedInstructions[0].steps) {
              instructions += `<li>${instruction.step}</li>`;
            }
          } else {
            instructions += `<li> Preparation instructions missing. </li>`
          }
          instructions += "</ol>";

          let dishToAdd = {
            id: dish.id,
            name: dish.title,
            image: dish.image,
            description: `Ready in ${dish.readyInMinutes} min.` || 'This is a description.',
            preparation: instructions || 'This is a preparation.',
            ingredients: ingredients
          }         

          if (!dish.id in this.dishes) {
            this.dishes[dish.id] = dishToAdd;
          }
          return dishToAdd;
        }).catch(err => {
          alert("Could not retrieve dish information.\n", err);
        });
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned
  getAllDishes(type, filter) {
    console.log(`API call: getAllDishes(${type}, ${filter})`);
    if(type === "All") {
      type = "";
    }
    return fetch(`${API.API_URL}recipes/search?number=100&instructionsRequired=true${type ? "&type=" + type : ""}${filter ? "&query="+filter : ""}`,{ 
        mode: 'cors',
        headers: {   
            'X-Mashape-Key': API.API_KEY
        }
      }).then(response => response.json())
        .then(dishes => {                    
          this.searchResult = [];
          for (const dish of dishes.results) {
            let dishToAdd = {
              id: dish.id,
              name: dish.title,
              image: dish.image
            };
            this.searchResult.push(dishToAdd);
          }
          this.notifyObservers({ type: 'search_update'});
          return this.searchResult;
        }).catch(err => {
          alert("Could not retrieve dishes.\n", err);
        });

    // this.searchResult = this.dishes().filter(function(dish) {
    //   var found = true;
    //   if (filter) {
    //     found = false;
    //     dish.ingredients.forEach(function(ingredient) {
    //       if (ingredient.name.indexOf(filter) != -1) {
    //         found = true;
    //       }
    //     });
    //     if (dish.name.indexOf(filter) != -1) {
    //       found = true;
    //     }
    //   }
    //   if (type === 'All') {
    //     return found;
    //   } else {
    //     return dish.type === type && found;
    //   }
    // });
  }

  // the dishes variable contains an array of all the
  // dishes in the database. each dish has id, name, type,
  // image (name of the image file), description and
  // array of ingredients. Each ingredient has name,
  // quantity (a number), price (a number) and unit (string
  // defining the unit i.e. "g", "slices", "ml". Unit
  // can sometimes be empty like in the example of eggs where
  // you just say "5 eggs" and not "5 pieces of eggs" or anything else.
  // dishes() {
  //   return [
  //     {
  //       id: 1,
  //       name: 'French toast',
  //       type: 'starter',
  //       image: 'toast.jpg',
  //       description:
  //         'In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'eggs',
  //           quantity: 0.5,
  //           unit: '',
  //           price: 10
  //         },
  //         {
  //           name: 'milk',
  //           quantity: 30,
  //           unit: 'ml',
  //           price: 6
  //         },
  //         {
  //           name: 'brown sugar',
  //           quantity: 7,
  //           unit: 'g',
  //           price: 1
  //         },
  //         {
  //           name: 'ground nutmeg',
  //           quantity: 0.5,
  //           unit: 'g',
  //           price: 12
  //         },
  //         {
  //           name: 'white bread',
  //           quantity: 2,
  //           unit: 'slices',
  //           price: 2
  //         }
  //       ]
  //     },
  //     {
  //       id: 2,
  //       name: 'Sourdough Starter',
  //       type: 'starter',
  //       image: 'sourdough.jpg',
  //       description: 'Here is how you make it... Lore ipsum...',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'active dry yeast',
  //           quantity: 0.5,
  //           unit: 'g',
  //           price: 4
  //         },
  //         {
  //           name: 'warm water',
  //           quantity: 30,
  //           unit: 'ml',
  //           price: 0
  //         },
  //         {
  //           name: 'all-purpose flour',
  //           quantity: 15,
  //           unit: 'g',
  //           price: 2
  //         }
  //       ]
  //     },
  //     {
  //       id: 3,
  //       name: 'Baked Brie with Peaches',
  //       type: 'starter',
  //       image: 'bakedbrie.jpg',
  //       description: 'Here is how you make it... Lore ipsum...',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'round Brie cheese',
  //           quantity: 10,
  //           unit: 'g',
  //           price: 8
  //         },
  //         {
  //           name: 'raspberry preserves',
  //           quantity: 15,
  //           unit: 'g',
  //           price: 10
  //         },
  //         {
  //           name: 'peaches',
  //           quantity: 1,
  //           unit: '',
  //           price: 4
  //         }
  //       ]
  //     },
  //     {
  //       id: 100,
  //       name: 'Meat balls',
  //       type: 'main dish',
  //       image: 'meatballs.jpg',
  //       description:
  //         'Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'extra lean ground beef',
  //           quantity: 115,
  //           unit: 'g',
  //           price: 20
  //         },
  //         {
  //           name: 'sea salt',
  //           quantity: 0.7,
  //           unit: 'g',
  //           price: 3
  //         },
  //         {
  //           name: 'small onion, diced',
  //           quantity: 0.25,
  //           unit: '',
  //           price: 2
  //         },
  //         {
  //           name: 'garlic salt',
  //           quantity: 0.7,
  //           unit: 'g',
  //           price: 2
  //         },
  //         {
  //           name: 'Italian seasoning',
  //           quantity: 0.6,
  //           unit: 'g',
  //           price: 3
  //         },
  //         {
  //           name: 'dried oregano',
  //           quantity: 0.3,
  //           unit: 'g',
  //           price: 3
  //         },
  //         {
  //           name: 'crushed red pepper flakes',
  //           quantity: 0.6,
  //           unit: 'g',
  //           price: 3
  //         },
  //         {
  //           name: 'Worcestershire sauce',
  //           quantity: 6,
  //           unit: 'ml',
  //           price: 7
  //         },
  //         {
  //           name: 'milk',
  //           quantity: 20,
  //           unit: 'ml',
  //           price: 4
  //         },
  //         {
  //           name: 'grated Parmesan cheese',
  //           quantity: 5,
  //           unit: 'g',
  //           price: 8
  //         },
  //         {
  //           name: 'seasoned bread crumbs',
  //           quantity: 15,
  //           unit: 'g',
  //           price: 4
  //         }
  //       ]
  //     },
  //     {
  //       id: 101,
  //       name: 'MD 2',
  //       type: 'main dish',
  //       image: 'bakedbrie.jpg',
  //       description: 'Here is how you make it... Lore ipsum...',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'ingredient 1',
  //           quantity: 1,
  //           unit: 'pieces',
  //           price: 8
  //         },
  //         {
  //           name: 'ingredient 2',
  //           quantity: 15,
  //           unit: 'g',
  //           price: 7
  //         },
  //         {
  //           name: 'ingredient 3',
  //           quantity: 10,
  //           unit: 'ml',
  //           price: 4
  //         }
  //       ]
  //     },
  //     {
  //       id: 102,
  //       name: 'MD 3',
  //       type: 'main dish',
  //       image: 'meatballs.jpg',
  //       description: 'Here is how you make it... Lore ipsum...',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'ingredient 1',
  //           quantity: 2,
  //           unit: 'pieces',
  //           price: 8
  //         },
  //         {
  //           name: 'ingredient 2',
  //           quantity: 10,
  //           unit: 'g',
  //           price: 7
  //         },
  //         {
  //           name: 'ingredient 3',
  //           quantity: 5,
  //           unit: 'ml',
  //           price: 4
  //         }
  //       ]
  //     },
  //     {
  //       id: 103,
  //       name: 'MD 4',
  //       type: 'main dish',
  //       image: 'meatballs.jpg',
  //       description: 'Here is how you make it... Lore ipsum...',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'ingredient 1',
  //           quantity: 1,
  //           unit: 'pieces',
  //           price: 4
  //         },
  //         {
  //           name: 'ingredient 2',
  //           quantity: 12,
  //           unit: 'g',
  //           price: 7
  //         },
  //         {
  //           name: 'ingredient 3',
  //           quantity: 6,
  //           unit: 'ml',
  //           price: 4
  //         }
  //       ]
  //     },
  //     {
  //       id: 200,
  //       name: 'Chocolat Ice cream',
  //       type: 'dessert',
  //       image: 'icecream.jpg',
  //       description: 'Here is how you make it... Lore ipsum...',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'ice cream',
  //           quantity: 100,
  //           unit: 'ml',
  //           price: 6
  //         }
  //       ]
  //     },
  //     {
  //       id: 201,
  //       name: 'Vanilla Ice cream',
  //       type: 'dessert',
  //       image: 'icecream.jpg',
  //       description: 'Here is how you make it... Lore ipsum...',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'ice cream',
  //           quantity: 100,
  //           unit: 'ml',
  //           price: 6
  //         }
  //       ]
  //     },
  //     {
  //       id: 202,
  //       name: 'Strawberry',
  //       type: 'dessert',
  //       image: 'icecream.jpg',
  //       description: 'Here is how you make it... Lore ipsum...',
  //       preparation: 'Lorem ipsum sit dolor amet',
  //       ingredients: [
  //         {
  //           name: 'ice cream',
  //           quantity: 100,
  //           unit: 'ml',
  //           price: 6
  //         }
  //       ]
  //     }
    // ];
  // }
}
