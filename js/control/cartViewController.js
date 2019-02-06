class CartViewController {
  constructor(view, model, searchPanel) {
    this.visible = true;
    this.view = view;
    this.model = model;
    this.searchPanel = searchPanel;

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 800) {
        this.expandMenu();
      }
    });

    /**
     * Event listener for burger menu to expand/collapse the menu
     */
    view.querySelector('#burgerMenu').addEventListener('click', () => {
      if (this.visible) {
        this.collapseMenu();
        this.visible = false;
      } else {
        this.expandMenu();
        this.visible = true;
      }
    });
  }

  collapseMenu() {
    this.view.querySelector('#confirmationBox').style.display = 'none';
    this.view.querySelector('#peopleSelector').style.display = 'none';
    this.view.querySelector('#cartViewHeader span').style.display = 'flex';
    this.searchPanel.style.display = 'none';
  }

  expandMenu() {
    this.view.querySelector('#confirmationBox').style.display = 'flex';
    this.view.querySelector('#peopleSelector').style.display = 'flex';
    this.view.querySelector('#cartViewHeader span').style.display = 'none';
    this.searchPanel.style.display = 'flex';
  }
}
