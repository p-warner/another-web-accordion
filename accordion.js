(function ($) {
	var state = [];
	
	$.fn.accordion = function( options ) {
		
		var container = this;

		settings = $.extend( {
			'containerId' : container.selector,
			'collapseables' : 'section',
			'handle' : 'h2'
		}, options);

		sections = this.find(settings.collapseables);

		$.each( sections, function(i){
			
			state.push( {
				'openedHeight' : $(this).height(), 
				'closedHeight' : $(this).find(settings.handle).outerHeight(),
				'currentState': 'closed'
				 } );
			
			$(this).css({
				height: state[i].closedHeight+'px',
				overflow:'hidden'
			});

			$(this).children(settings.handle).eq(0).on('click',function(){
				change($(this).parent(settings.collapseables), i);
			}).append(' <img src="/cgi-bin/images/expandDark.png" />');

		});

		styleHandles();
	}

	function change(section, i){
		if(state[i].currentState == 'closed'){
			state[i].currentState = 'open';
			//console.log('open ' + i);
			expand(section, i);
		}else{
			state[i].currentState = 'closed';
			//console.log('close ' + i);
			collapse(section, i);
		}
	}

	function expand(section, i){
		console.log( $(section).children(settings.handle).children('img').attr('src') );
		$(section)
			.animate({height: state[i].openedHeight+'px'})
			.children(settings.handle)
			.children('img')
			.attr('src','/cgi-bin/images/collapseDark.png');
	}
	function collapse(section, i){
		$(section).animate({height: state[i].closedHeight+'px'})
			.children(settings.handle)
			.children('img')
			.attr('src','/cgi-bin/images/expandDark.png');
	}
	function styleHandles(){
		//console.log( $(settings.containerId + ' ' + settings.collapseables + ' > ' + settings.handle).width() );
		//we only want to change the first occurance of the handle in the event of multiples.
		$(settings.containerId).children(settings.collapseables).children(settings.handle).css({
			cursor:'pointer'
		});
	}
	
})(jQuery);
