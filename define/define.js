//Pass the dollar sign (Jquery object to an immediately invoked function expression)
//
(function($) {

	var methods = {
		'init': function(options) {

			var settings = $.extend({
				css_class: 'tooltip'
			}, options);

			var dictionary = settings.dictionary;

			return this.each(function() { //returns one(or more, if multiple are selected) element for chainable calls.
				
				//using a $('span>data-define').each(function() {}):
				$(this).find("span[data-define]").each(function() {
					
					//extract value
					var value = $(this).attr('data-define');

					//check against dictionary
					if (typeof dictionary[value] != 'undefined') {
						$(this).contents().unwrap().wrap("<a href='#' class=" + settings.css_class + " title='" + dictionary[value] + "'/>");
					}
				});
				
			});
		}
	};

	//called by the $jquery object.
	$.fn.define = function(method) {

		//method calling logic
		if (methods[method]) {
			//if the method exists, then call it with this being set as the selected object, and the arguments in a JSO. 
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || !method) { //if method is actually init arguments (passed in form of an object, or if no arguments are passed
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('Method ' + method + ' does not exist');
		}
	};
})(jQuery);
