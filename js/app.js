$(function() {
  //We instantiate our model
  var model = new DinnerModel();

  // Hides all views.
  hideAllViews = () => {
    $('#homeView').hide();
    $('#dinnerOverview').hide();
    $('#cartView').hide();
    $('#finderView').hide();
    $('#dishDetailsView').hide();
    $('#subHeaderView').hide();
    $('#printView').hide();
  };

  // Show Home View
  showHomeView = () => {
    hideAllViews();
    $('#homeView').show();
  };

  // @TODO: Correctly implement selectdish view.
  // Show SelectDish View
  showSelectDishView = () => {
    hideAllViews();
    $('#dinnerOverview').show(0, 'linear', () => {
      $('#cartView').show();
      $('#finderView').show();
    });
  };

  // Show DishDetails View
  showDishDetailsView = () => {
    hideAllViews();
    $('#dinnerOverview').show(0, 'linear', () => {
      $('#cartView').show();
      $('#dishDetailsView').show();
    });
    $('#overView').show();
  };

  // @TODO: Correctly implement dinner overview.
  // Show Dinner Overview View
  showDinnerOverView = () => {
    hideAllViews();
    $('#subHeaderView').show();
    $('#dinnerOverview').show();

    $('#overView').show();
  };

  // Show Print View
  showPrintView = () => {
    hideAllViews();
    $('#subHeaderView').show();
    $('#printView').show();
  };

  var headerView = new HeaderView(document.getElementById('headerView'), model);

  /* All that is needed for the index.html page: */
  // var homeView = new HomeView($('#homeView'), model);
  var homeView = new HomeView(document.getElementById('homeView'), model);

  /* Start of selectdish.html assets: */
  var finderView = new FinderView($('#finderView'), model);

  /* Start of dishdetails.html assets: */
  var cartView = new CartView($('#cartView'), model);
  /* End of selectdish.html assets: */

  var dishDetailsView = new DishDetailsView(
    $('#dishDetailsView'),
    model,
    model.getDish(1)
  );
  /* End of dishdetails.html assets: */

  /* Start of overview.html assets: */
  var overView = new OverView($('#overView'), model);

  /* Start of printout.html assets: */
  var subHeaderView = new SubHeaderView($('#subHeaderView'), model);
  /* End of overview.html assets: */

  var printView = new PrintView($('#printView'), model);
  /* End of printout.html assets: */

  hideAllViews();
  showHomeView();
  headerView.render();
  homeView.render();

  var homeViewController = new HomeViewController(
    document.getElementById('homeView'),
    model,
    showSelectDishView
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
