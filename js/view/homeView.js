/**
 * Welcome page for the dinnerplanner app
 */
class HomeView {
  /**
   * Constructs a HomeView
   */
  constructor(container, model) {
    this.loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at metus dui. Morbi consectetur lorem risus. 
    Pellentesque vel ante sit amet nisl dictum dictum eu vel odio. Morbi sit amet massa nunc. Praesent sagittis tortor non diam rhoncus
     blandit et eget sapien. Nulla ligula enim, lobortis quis enim et, aliquet pulvinar dolor. Aliquam sem lacus, porttitor vel nibh vel,
      consequat congue orci. Pellentesque quis lorem et orci efficitur egestas. Quisque cursus ligula felis, nec congue ante placerat at.`;

    this.container = container;
  }

  /**
   * Returns welcome text in a paragraph
   */
  welcomeText() {
    return `<p>${this.loremIpsum}</p>`;
  }

  /**
   * Returns a button that takes the user to the page where he/she can create a dinnerplan
   */
  createDinnerButton() {
    return `<button class="primaryButton">Create new dinner</button>`;
  }

  /**
   * Updates the view with new data
   */
  update() {
    render();
  }

  /**
   * Render the homeView with a welcome text and a button that takes the user to
   * the page where he/she can create a dinner plan
   */
  render() {
    this.container.innerHTML = `${this.welcomeText() +
      this.createDinnerButton()}`;
  }
}
