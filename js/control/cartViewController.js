class CartViewController {
  constructor(view, model, newView) {
    this.visible = true;

    /**
     * Event listener for burger menu to expand/collapse the menu
     */
    view.querySelector('#burgerMenu').addEventListener('click', () => {
      if (visible) {
        // TODO: Add hide() for confirmationBox, peopleSelector, searchPanel, cartViewHeader span in views
      }
    });
  }
}
