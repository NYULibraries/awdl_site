/* jshint laxcomma: true */
YUI().use(
  'node', 'event', 'anim', 'tabview',
  function(Y) {
    'use strict';
    var html = Y.one('html');
    var body = Y.one('body');
    var tabs = new Y.TabView({
      srcNode: '#YUItabs'
    }).render();
    tabs.on('render', function() {
      var anim = new Y.Anim({
        node: this.get("srcNode"),
        to: {
          opacity: 1
        },
        duration: 0.3
      });
      anim.run();
    });
    if (html.hasClass('nojs')) {
      html.removeClass('nojs');
    }
    if (body.hasClass('io-loading')) {
      body.removeClass('io-loading');
    }
  }
);