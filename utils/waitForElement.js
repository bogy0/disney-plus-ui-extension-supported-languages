export const waitForElement = (selector) => (
  // episode thumbnails rendering lazily
  // the mutation observer helps to inject data into
  // the episode items when they are in the DOM

  new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  })
);
