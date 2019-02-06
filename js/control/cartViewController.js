class CartViewController {
  constructor(view, model, searchPanel) {
    this.visible = true;

    /**
     * Event listener for burger menu to expand/collapse the menu
     */
    view.querySelector('#burgerMenu').addEventListener('click', () => {
      if (this.visible) {
        // TODO: Add hide(), cartViewHeader span in views
        view.querySelector('#confirmationBox').style.display = 'none';
        view.querySelector('#peopleSelector').style.display = 'none';
        view.querySelector('#cartViewHeader span').style.display = 'none';
        searchPanel.style.display = 'none';
        this.visible = false;
      } else {
        view.querySelector('#confirmationBox').style.display = 'flex';
        view.querySelector('#peopleSelector').style.display = 'flex';
        view.querySelector('#cartViewHeader span').style.display = 'flex';
        searchPanel.style.display = 'flex';
        this.visible = true;
      }
    });
  }
}
