/**
 *  https://stackoverflow.com/questions/17432899/javascript-bfcache-pageshow-event-event-persisted-always-set-to-false
 */

if (document.addEventListener) {
    window.addEventListener('pageshow', function (event) {
        if (event.persisted || window.performance && 
            window.performance.navigation.type == 2) 
        {
            location.reload();
        }
    },
   false);
}