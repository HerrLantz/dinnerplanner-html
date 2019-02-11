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

    var peopleSelectorBox = view.querySelector('#peopleSelector input');

    // Add guest to dinner
    view
      .querySelector('.arrow[direction="up"]')
      .addEventListener('click', () => {
        if (model.getNumberOfGuests() < 999) {
          model.addGuest();
        }
      });

    // Remove guest from dinner
    view
      .querySelector('.arrow[direction="down"]')
      .addEventListener('click', () => {
        if (model.getNumberOfGuests() > 1) {
          model.removeGuest();
        }
      });

    // Add eventlistener on input box
    peopleSelectorBox.addEventListener('input', () => {
      let validInput = '^[1-9][0-9]{0,2}$'; // Matches numbers between 1-999
      let boxInput = peopleSelectorBox.value;
      let isValid = new RegExp(validInput).test(boxInput);
      if (isValid) {
        model.setNumberOfGuests(boxInput);
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
