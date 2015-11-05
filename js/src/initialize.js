jQuery( document ).ready( function() {
    jQuery( 'a.confirm').click( function() {
        if ( confirm( 'Are you sure?' ) )
        return true; else return false;
    });

    jQuery('.show-popup').magnificPopup({
        type:'inline',
        midClick: true,
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
});