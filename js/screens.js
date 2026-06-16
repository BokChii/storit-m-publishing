(function () {
  const views = {};

  window.StoritScreenRegistry = {
    register(screenMap) {
      Object.assign(views, screenMap);
    },
    has(name) {
      return Boolean(views[name]);
    },
    render(name) {
      const view = views[name] || views.home;

      if (!view) {
        throw new Error(`No screen registered for "${name}" and no home fallback exists`);
      }

      return view();
    },
    names() {
      return Object.keys(views);
    },
  };

  window.StoritScreens = window.StoritScreenRegistry;
})();
