/* jshint laxcomma: true */
YUI().use(
    'node'
  , 'event'
  , 'anim'
  , 'tabview'
  , function(Y) {
  
    'use strict';
    
    var tabs = new Y.TabView({ srcNode: '#YUItabs' }).render();
    
    tabs.on('render', function () {
    
        var html = Y.one('html');
    
        if ( html.hasClass('nojs') ) {
      
            var anim = new Y.Anim({
                node: this.get("srcNode"),
                to: { opacity: 1 },
                duration: 0.3
            });

            html.removeClass('nojs');

            anim.run();

        }

    });

  }
);
