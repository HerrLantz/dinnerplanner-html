var HomeView = function(container, model) {
  const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at metus dui. Morbi consectetur lorem risus. Pellentesque vel ante sit amet nisl dictum dictum eu vel odio. Morbi sit amet massa nunc. Praesent sagittis tortor non diam rhoncus blandit et eget sapien. Nulla ligula enim, lobortis quis enim et, aliquet pulvinar dolor. Aliquam sem lacus, porttitor vel nibh vel, consequat congue orci. Pellentesque quis lorem et orci efficitur egestas. Quisque cursus ligula felis, nec congue ante placerat at.'

  container.html(
    `<p> ${loremIpsum}</p>
    <button id="createDinner">
        Create new dinner
    </button>`
  )
}
