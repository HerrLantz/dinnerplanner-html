$(function() {
  //We instantiate our model
  var model = new DinnerModel();

  // And create the instance of ExampleView
  // var exampleView = new ExampleView($('#exampleView'), model)

  var headerView = new HeaderView($('#headerView'), model);

  /* All that is needed for the index.html page: */
  // var homeView = new HomeView($('#homeView'), model);

  /* Start of selectdish.html assets: */
  // var finderView = new FinderView($('#finderView'), model);

  /* Start of dishdetails.html assets: */
  // var cartView = new CartView($('#cartView'), model);
  /* End of selectdish.html assets: */

  // var dishDetailsView = new DishDetailsView(
  //   $('#dishDetailsView'),
  //   model,
  //   model.getDish(1)
  // );
  /* End of dishdetails.html assets: */

  /* Start of overview.html assets: */
  // var overView = new OverView($('#overView'), model);

  /* Start of printout.html assets: */
  var subHeaderView = new SubHeaderView($('#subHeaderView'), model);
  /* End of overview.html assets: */

  var printView = new PrintView($('#printView'), model);
  /* End of printout.html assets: */

  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * use the $('someSelector') to search for elements in the whole HTML.
   * In other places you should limit the search only to the children
   * of the specific view you're working with (see exampleView.js).
   */
});
