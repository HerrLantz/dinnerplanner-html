$(function() {
  //We instantiate our model
  const model = new DinnerModel();
  // Show Home View
  showHomeView = () => {
    //hideAllViews();
    $('#homeView').show();
  };

  // @TODO: Correctly implement selectdish view.
  // Show SelectDish View
  showSelectDishView = () => {
    //hideAllViews();
    $('#dinnerOverview').show(0, 'linear', () => {
      $('#cartView').show();
      $('#finderView').show();
    });
  };

  // Show DishDetails View
  showDishDetailsView = () => {
    //hideAllViews();
    $('#dinnerOverview').show(0, 'linear', () => {
      $('#cartView').show();
      $('#dishDetailsView').show();
    });
    $('#overView').show();
  };

  // @TODO: Correctly implement dinner overview.
  // Show Dinner Overview View
  showDinnerOverView = () => {
    //hideAllViews();
    $('#subHeaderView').show();
    $('#dinnerOverview').show();

    $('#overView').show();
  };

  // Show Print View
  showPrintView = () => {
    //hideAllViews();
    $('#subHeaderView').show();
    $('#printView').show();
  };

  hideAllViews = () => {
    //headerView.hide();
    homeView.hide();
    cartView.hide();
    finderView.hide();
    dishDetailsView.hide();
    subHeaderView.hide();
    printView.hide();
  };

  var headerView = new HeaderView(document.getElementById('headerView'), model);

  /* All that is needed for the index.html page: */
  // var homeView = new HomeView($('#homeView'), model);
  var homeView = new HomeView(document.getElementById('homeView'), model);

  /* Start of selectdish.html assets: */
  var finderView = new FinderView(document.getElementById('finderView'), model);

  /* Start of dishdetails.html assets: */
  var cartView = new CartView(document.getElementById('cartView'), model);
  /* End of selectdish.html assets: */
  
  var dishDetailsView = new DishDetailsView(
    document.getElementById('dishDetailsView'),
    model,
    dishDetailsViewController
    );
    
  /* End of dishdetails.html assets: */

  /* Start of overview.html assets: */
  var overView = new OverView($('#overView'), model);

  /* Start of printout.html assets: */
  var subHeaderView = new SubHeaderView(
    document.getElementById('subHeaderView'),
    model
  );
  /* End of overview.html assets: */

  var printView = new PrintView(document.getElementById('printView'), model);
  /* End of printout.html assets: */

  // Render all views here
  headerView.render();
  homeView.render();
  cartView.render();
  finderView.render();
  subHeaderView.render();
  printView.render();
  dishDetailsView.render();
  
  // Hide views here
  cartView.hide();
  finderView.hide();
  subHeaderView.hide();
  dishDetailsView.hide();


  var homeViewController = new HomeViewController(
    document.getElementById('homeView'),
    model,
    showSelectDishView,
    hideAllViews
  );

  var headerViewController = new HeaderViewController(
    document.getElementById('headerView'),
    model,
    showHomeView,
    hideAllViews
  );

  var cartViewController = new CartViewController(
    document.getElementById('cartView'),
    model,
    document.getElementById('searchPanel')
  );

  var finderViewController = new FinderViewController(
    document.getElementById('finderView'),
    model
  );

  var dishViewController = new DishViewController(
    document.getElementsByClassName('dishItem'),
    model,
    showDishDetailsView,
    hideAllViews
  );

  var dishDetailsViewController = new DishDetailsViewController(
    document.getElementById('dishDetailsView'),
    model,
    showSelectDishView,
    hideAllViews
  );

  var ingredientsViewController = new IngredientsViewController(
    document.getElementById('ingredients'),
    model
  );

  // showSelectDishView();
  // showDinnerOverView();
  // showDishDetailsView();
  // showPrintView();

  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * use the $('someSelector') to search for elements in the whole HTML.
   * In other places you should limit the search only to the children
   * of the specific view you're working with (see exampleView.js).
   */
});
