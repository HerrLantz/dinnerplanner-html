//DinnerModel Object constructor
class DinnerModel extends Observable {
  constructor() {
    super();

    this.dinnerPlan = {
      nrOfGuests: 2,
      selectedDishes: []
    };

    // Results from a search
    this.searchResult;
    // What dish to show the details of
    this.dishDetailsID = 1;

    this.imgPath = 'images/';
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
  getSelectedDish(type) {
    return this.dinnerPlan.selectedDishes[type];
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

  //function that returns a dish of specific ID
  getDish(id) {
    for (let dish of this.dishes()) {
      if (dish.id == id) {
        return dish;
      }
    }
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    let allDishes = [];
    for (let id in this.dinnerPlan.selectedDishes) {
      allDishes.push(this.getDish(id));
    }
    return allDishes;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    let allIngredients;

    for (let id in this.dinnerPlan.selectedDishes) {
      this.getDish(id).ingredients.forEach(ingredient => {
        // If undefined or null then false, otherwise true.
        if (allIngredients[ingredient]) {
          allIngredients[ingredient.name].price += ingredient.price;
          allIngredients[ingredient.name].quantity += ingredient.price;
        } else {
          allIngredients[ingredient.name] = {
            price: ingredient.price,
            unit: ingredient.unit,
            quantity: ingredient.quantity
          };
        }
      });
    }
    return allIngredients;
  }

  //Returns the total price of the dish with the given dishID (for 1 person)
  getDishPrice(dishID) {
    let sum = 0;
    this.getDish(dishID).ingredients.forEach(ingredient => {
      sum += ingredient.price;
    });
    return sum;
  }

  getTotalDishPrice(dishID) {
    return this.dinnerPlan.nrOfGuests * this.getDishPrice(dishID);
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  getTotalMenuPrice() {
    let sum = 0;

    for (const dishType in this.dinnerPlan.selectedDishes) {
      var dishID = this.dinnerPlan.selectedDishes[dishType];
      sum += this.getDishPrice(dishID);
    }

    return sum * this.dinnerPlan.nrOfGuests;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  addDishToMenu(id) {
    this.dinnerPlan.selectedDishes[this.getDish(id).type] = id;
    this.notifyObservers({
      type: 'cart_update'
    });
  }

  //Removes dish from menu
  removeDishFromMenu(id) {
    delete this.dinnerPlan.selectedDishes[this.getDish(id).type];
    this.notifyObservers({ type: 'cart_update' });
  }

  //function that returns all dish types available
  getAllTypes() {
    var allTypes = [];
    this.dishes().forEach(dish => {
      allTypes[dish.type] = dish.type;
    });
    return allTypes;
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned
  getAllDishes(type, filter) {
    this.searchResult = this.dishes().filter(function(dish) {
      var found = true;
      if (filter) {
        found = false;
        dish.ingredients.forEach(function(ingredient) {
          if (ingredient.name.indexOf(filter) != -1) {
            found = true;
          }
        });
        if (dish.name.indexOf(filter) != -1) {
          found = true;
        }
      }
      if (type === 'All') {
        return found;
      } else {
        return dish.type === type && found;
      }
    });
    this.notifyObservers({ type: 'search_update' });
  }

  // the dishes variable contains an array of all the
  // dishes in the database. each dish has id, name, type,
  // image (name of the image file), description and
  // array of ingredients. Each ingredient has name,
  // quantity (a number), price (a number) and unit (string
  // defining the unit i.e. "g", "slices", "ml". Unit
  // can sometimes be empty like in the example of eggs where
  // you just say "5 eggs" and not "5 pieces of eggs" or anything else.
  dishes() {
    return [
      {
        id: 1,
        name: 'French toast',
        type: 'starter',
        image: 'toast.jpg',
        description:
          'In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'eggs',
            quantity: 0.5,
            unit: '',
            price: 10
          },
          {
            name: 'milk',
            quantity: 30,
            unit: 'ml',
            price: 6
          },
          {
            name: 'brown sugar',
            quantity: 7,
            unit: 'g',
            price: 1
          },
          {
            name: 'ground nutmeg',
            quantity: 0.5,
            unit: 'g',
            price: 12
          },
          {
            name: 'white bread',
            quantity: 2,
            unit: 'slices',
            price: 2
          }
        ]
      },
      {
        id: 2,
        name: 'Sourdough Starter',
        type: 'starter',
        image: 'sourdough.jpg',
        description: 'Here is how you make it... Lore ipsum...',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'active dry yeast',
            quantity: 0.5,
            unit: 'g',
            price: 4
          },
          {
            name: 'warm water',
            quantity: 30,
            unit: 'ml',
            price: 0
          },
          {
            name: 'all-purpose flour',
            quantity: 15,
            unit: 'g',
            price: 2
          }
        ]
      },
      {
        id: 3,
        name: 'Baked Brie with Peaches',
        type: 'starter',
        image: 'bakedbrie.jpg',
        description: 'Here is how you make it... Lore ipsum...',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'round Brie cheese',
            quantity: 10,
            unit: 'g',
            price: 8
          },
          {
            name: 'raspberry preserves',
            quantity: 15,
            unit: 'g',
            price: 10
          },
          {
            name: 'peaches',
            quantity: 1,
            unit: '',
            price: 4
          }
        ]
      },
      {
        id: 100,
        name: 'Meat balls',
        type: 'main dish',
        image: 'meatballs.jpg',
        description:
          'Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'extra lean ground beef',
            quantity: 115,
            unit: 'g',
            price: 20
          },
          {
            name: 'sea salt',
            quantity: 0.7,
            unit: 'g',
            price: 3
          },
          {
            name: 'small onion, diced',
            quantity: 0.25,
            unit: '',
            price: 2
          },
          {
            name: 'garlic salt',
            quantity: 0.7,
            unit: 'g',
            price: 2
          },
          {
            name: 'Italian seasoning',
            quantity: 0.6,
            unit: 'g',
            price: 3
          },
          {
            name: 'dried oregano',
            quantity: 0.3,
            unit: 'g',
            price: 3
          },
          {
            name: 'crushed red pepper flakes',
            quantity: 0.6,
            unit: 'g',
            price: 3
          },
          {
            name: 'Worcestershire sauce',
            quantity: 6,
            unit: 'ml',
            price: 7
          },
          {
            name: 'milk',
            quantity: 20,
            unit: 'ml',
            price: 4
          },
          {
            name: 'grated Parmesan cheese',
            quantity: 5,
            unit: 'g',
            price: 8
          },
          {
            name: 'seasoned bread crumbs',
            quantity: 15,
            unit: 'g',
            price: 4
          }
        ]
      },
      {
        id: 101,
        name: 'MD 2',
        type: 'main dish',
        image: 'bakedbrie.jpg',
        description: 'Here is how you make it... Lore ipsum...',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'ingredient 1',
            quantity: 1,
            unit: 'pieces',
            price: 8
          },
          {
            name: 'ingredient 2',
            quantity: 15,
            unit: 'g',
            price: 7
          },
          {
            name: 'ingredient 3',
            quantity: 10,
            unit: 'ml',
            price: 4
          }
        ]
      },
      {
        id: 102,
        name: 'MD 3',
        type: 'main dish',
        image: 'meatballs.jpg',
        description: 'Here is how you make it... Lore ipsum...',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'ingredient 1',
            quantity: 2,
            unit: 'pieces',
            price: 8
          },
          {
            name: 'ingredient 2',
            quantity: 10,
            unit: 'g',
            price: 7
          },
          {
            name: 'ingredient 3',
            quantity: 5,
            unit: 'ml',
            price: 4
          }
        ]
      },
      {
        id: 103,
        name: 'MD 4',
        type: 'main dish',
        image: 'meatballs.jpg',
        description: 'Here is how you make it... Lore ipsum...',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'ingredient 1',
            quantity: 1,
            unit: 'pieces',
            price: 4
          },
          {
            name: 'ingredient 2',
            quantity: 12,
            unit: 'g',
            price: 7
          },
          {
            name: 'ingredient 3',
            quantity: 6,
            unit: 'ml',
            price: 4
          }
        ]
      },
      {
        id: 200,
        name: 'Chocolat Ice cream',
        type: 'dessert',
        image: 'icecream.jpg',
        description: 'Here is how you make it... Lore ipsum...',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'ice cream',
            quantity: 100,
            unit: 'ml',
            price: 6
          }
        ]
      },
      {
        id: 201,
        name: 'Vanilla Ice cream',
        type: 'dessert',
        image: 'icecream.jpg',
        description: 'Here is how you make it... Lore ipsum...',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'ice cream',
            quantity: 100,
            unit: 'ml',
            price: 6
          }
        ]
      },
      {
        id: 202,
        name: 'Strawberry',
        type: 'dessert',
        image: 'icecream.jpg',
        description: 'Here is how you make it... Lore ipsum...',
        preparation: 'Lorem ipsum sit dolor amet',
        ingredients: [
          {
            name: 'ice cream',
            quantity: 100,
            unit: 'ml',
            price: 6
          }
        ]
      }
    ];
  }
}
