(function($) {
	"use strict";

	var RemovableArea = {
		_opts : {
			label       : 'Supprimer',
			img         : 'imgs/delete.png',
			warning     : 'Voulez-vous supprimer cet élément?',
			hoverClass  : 'half-opac'
		},
		_ctrlClass : 'removable-ctrl',
		_init: function(options){
			var opts = $.extend(true, {}, RemovableArea._opts, options),
				ctrlClass = RemovableArea._ctrlClass;

			return this.each(function() {
				var $elt = $(this);
				if($elt.css('position') != 'relative'){
					$elt.css('position', 'relative');
				}
				var $ctrl = $("<img class='"+ctrlClass+"' src='"+opts.img+"' alt='"+opts.label+"' title='"+opts.label+"'>");
				$ctrl.css({
						'display'   : 'none',
						'position'  : 'absolute',
						'right'     : '5px',
						'top'       : '5px',
						'cursor'    : 'pointer'
					})
			   		.hover(function(){
						$(this).addClass(opts.hoverClass);
					}, function(){
						$(this).removeClass(opts.hoverClass);
					});
				
				$elt.append($ctrl)
					.mouseover(function(){
						$('.' + ctrlClass, this).show();
					}) 
					.mouseout(function(){
						$('.' + ctrlClass, this).hide();
					});
				$ctrl.click(function(){
					if(opts.warning === false || confirm(opts.warning)){
						$elt.trigger('removed.removablearea');
						$elt.remove();
					}
				});
				$elt.trigger('init.removablearea');
			});
		},
		destroy : function(){
			this.each(function() {
				$('.' + RemovableArea._ctrlClass, $(this)).remove();
			});
		}
	};

	$.fn.removableArea = function( method ) {
		if (RemovableArea[method]) {
			if(/^_/.test(method)){
				$.error( 'Trying to call a private method ' + method + ' on jQuery.pluginName' );
			} else {
				return RemovableArea[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			}	
		} else if ( typeof method === 'object' || ! method ) {
			return RemovableArea._init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.removableArea' );
		}
	};

}(jQuery));
