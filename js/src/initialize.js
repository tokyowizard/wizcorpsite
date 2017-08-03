jQuery(document).ready(function() {
    jQuery('a.confirm').click(function() {
        return confirm('Are you sure?');
    });

    jQuery('.show-popup').magnificPopup({
        type: 'inline',
        midClick: true,
        removalDelay: 300,
        mainClass: 'mfp-fade',
        callbacks: {
            open: function () {
                if (this.content.selector === '#portfolio-dofus') {
                    // if dofus popup, wait 1 second and launch video
                    setTimeout(function () {
                        dofusPlayer.playVideo();
                    }, 1000);
                }

                if (this.content.selector === '#portfolio-gundam') {
                    // if gundam popup, wait 1 second and launch video
                    setTimeout(function () {
                        gundamPlayer.playVideo();
                    }, 1000);
                }

                if (this.content.selector === '#portfolio-pochamogu') {
                    // if pochamogu popup, wait 1 second and launch video
                    setTimeout(function () {
                        pochamoguPlayer.playVideo();
                    }, 1000);
                }
            }
        }
    });
});
