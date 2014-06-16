jQuery(function($){
	$(document).ready(function(){
		$('#whats-new').focus(function(){
			$('#whats-new-options').addClass('active');
		});

		// Add placeholder for whot new form
		var what_new_form = $('#buddypress form#whats-new-form textarea');
		var what_new_val = 'What\'s new ?';
		what_new_form
			.val('What\'s new ?')
			.focusout(function(){
				what_new_val = what_new_form.val();
				if ( what_new_val  == '' ) {
					what_new_form.val('What\'s new ?');
				}; 
			})
			.focusin(function(){
				what_new_val = what_new_form.val();
				if ( what_new_val  == 'What\'s new ?' ) {
					$(this).val('');
				}
			})
		;
	});
});