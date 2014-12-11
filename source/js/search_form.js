YUI().use("node", "event", function(Y) {

    "use strict";

    var body = Y.one("body");
    
    function onSubmit(event) {

        event.preventDefault();

        var currentTarget = event.currentTarget
          , input = currentTarget.one('[type="text"]')
          , value = input.get("value");
        
        if ( value.length ) {
            
            //location.href = currentTarget.get("action") + "?q=" + value.trim().replace(/\s/g, '+').toLowerCase();
            location.href = currentTarget.get("action") + "?q=" + value.trim().replace(/\s/g, '+');
        }

    }
    
    body.delegate("submit", onSubmit, "form");
 
});