
jQuery(window).load(function(){
    var modal_id = '#modal-post',
            modal = jQuery( modal_id );

    // Show popup of project infomation
    var onAction = false, onModal = false;
    modal.on('hide',function(){
        jQuery('body').css('overflow','auto');
    });
    jQuery('.thumbnail a.show-popup').on('click',function(e){
        e.preventDefault();
        if( onAction ) return;
        onAction = true;
        var t = jQuery(this),
            postID = t.data('post');
        jQuery.ajax({
            url: "portfolio_info.json", /*dw_page_script.ajax_url,*/
            type: 'GET',
            dataType: 'json',
            data: { 
                action: 'dw_page_get_project',
                postID : postID
            },
            success: function(data) {
                onAction = false;
                if( data.status === true ){
                    modal.find('.modal-title').text(data[postID].title);
                    if( data[postID].image ){
                        var image = data[postID].image;
                        modal.find('.modal-image').html(image);
                    }
                    modal.find('.modal-data').html(data[postID].detail);
                    modal.find('.modal-content').html(data[postID].content);
                    jQuery('body').css('overflow','hidden');
                    modal.modal('show');
                }
            }
        });
        
    });

})