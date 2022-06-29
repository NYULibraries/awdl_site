YUI().use('node', 'router', 'event-resize', Y => {
 
  'use strict';
  
  const body = document.querySelector('body');
  
  const widget = Y.one('.widget.book');
  
  const { approot } = body.dataset;
 
  body.classList.add('io-loading');
  
  const calculateAvailableHeight = () => {
    const body = document.querySelector('body')
    let loaderHeight = 0;    
    var viewport = Y.DOM.viewportRegion();
    var availableHeight = viewport.height;
    var siblings = widget.siblings();
    var loadingAnimation = Y.one('.bubblingG');
    // Push the iframe down 5px to make up for the 5 pixels
    // space created by the curved corners of the browser?
    // Not elegant but to consider.
    // availableHeight += 5;
    siblings.each(node => {
      availableHeight = availableHeight - node.get('offsetHeight');
    });
    if (body.classList.contains('io-loading')) {
      loaderHeight = loadingAnimation.get('offsetHeight');
      availableHeight = availableHeight + loaderHeight;
    }
    return availableHeight;
  }
  
  function resizeBookView() {
    const elem = document.querySelector('.widget.book');
    const height = calculateAvailableHeight();
    elem.style.height = `${height}px`;
  }

  function hideSiblings() {  
    widget.siblings().each(node => {
      node.addClass('hiddenSiblings');
    });
    resizeBookView();
  }
  
  function showSiblings() {
    widget.siblings().each(node => {
      node.removeClass('hiddenSiblings');
    });
    resizeBookView();
  }
  
  function requestReplaceLoadBook(request) {
    const elem = document.querySelector('.widget.book');
    const viewer = elem.dataset.sourceurl;
    const { identifier } = request.params;
    const page = request.params.page ? request.params.page : 1;
    elem.dataset.identifier = identifier;
    if (request.src === 'replace') {
      elem.setAttribute('src', `${viewer}/books/${identifier}/${page}`);
    }
  }
  
  var router = new Y.Router({
    root: approot,
    routes: [
      {
        path: '/books/:identifier/:page',
        callbacks: requestReplaceLoadBook
      },
      {
        path: '/books/:identifier',
        callbacks: requestReplaceLoadBook
      }
    ]
  });

  Y.on('windowresize', resizeBookView);

  Y.on('button:button-fullscreen:on', hideSiblings);

  Y.on('button:button-fullscreen:off', showSiblings);

  Y.on('openlayers:change', data => {
    router.save('/books/' + widget.getAttribute('data-identifier') + '/' + data.sequence);
  });

  Y.on('viewer:sequence:change', data => {
    const identifier = widget.getAttribute('data-identifier');
    router.save(`/books/${identifier}/${data.sequence}`);
  });

  Y.on('viewer:sequence:increase', data => {
    const identifier = widget.getAttribute('data-identifier');
    router.save(`/books/${identifier}/${data.sequence}`);
  });

  Y.on('viewer:sequence:decrease', data => {
    const identifier = widget.getAttribute('data-identifier');
    router.save(`/books/${identifier}/${data.sequence}`);
  });

  Y.on('viewer:contentready', data => {
    const elem = document.querySelector('.widget.book');
    resizeBookView();
    elem.style.transition = 'all 1s';
    elem.style.opacity = 1;
    body.classList.remove('io-loading');
  });

  Y.on('change:option:multivolume', data => {
    const args = data.split('/');
    if ((typeof args[2] !=='undefined') && (typeof args[3] !=='undefined')) {
      window.location = `${approot}/books/${args[3]}/1`;
    }
  });
    
  Y.on('change:option:multivolume', data => {
    const parts = data.split('/');
    if (parts[3]) {
      router.replace(`/books/${parts[3]}/1`);
    }
  });

  window.addEventListener('message', event => {
    const data = JSON.parse(event.data)
    if (data.fire) {
      Y.fire(data.fire, data.message)
    }
  }, false);

  // initial request
  router.replace(router.getPath());
  
});
