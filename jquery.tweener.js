/*********************************************************************************
	   _  ___                          _                                     
	  (_)/ _ \ _   _  ___ _ __ _   _  | |___      _____  ___ _ __   ___ _ __ 
	  | | | | | | | |/ _ \ '__| | | | | __\ \ /\ / / _ \/ _ \ '_ \ / _ \ '__|
	  | | |_| | |_| |  __/ |  | |_| | | |_ \ V  V /  __/  __/ | | |  __/ |   
	 _/ |\__\_\\__,_|\___|_|   \__, |  \__| \_/\_/ \___|\___|_| |_|\___|_|   
	|__/                       |___/                                         

		@author Ferry Brouwer
		Enable animation with TweenLite on element with data attributes (x, y, alpha)
			data-init 	-> set properties on initialize document
			data-from 	-> animate from
			data-to 	-> animate to

*********************************************************************************/

(function(){
	$.fn.tweener = function( method ){
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || !method ){
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tweener' );
		}  
	}

	/*********************************************************************************
		 ____        _     _ _                       _   _               _     
		|  _ \ _   _| |__ | (_) ___   _ __ ___   ___| |_| |__   ___   __| |___ 
		| |_) | | | | '_ \| | |/ __| | '_ ` _ \ / _ \ __| '_ \ / _ \ / _` / __|
		|  __/| |_| | |_) | | | (__  | | | | | |  __/ |_| | | | (_) | (_| \__ \
		|_|    \__,_|_.__/|_|_|\___| |_| |_| |_|\___|\__|_| |_|\___/ \__,_|___/

	*********************************************************************************/

	var methods = {

		init : function( obj ){
			return this.each(function(){
				var $this = $(this),
					o = obj,
					states = {
						'init' 	: getTweenProperties( $this.attr('data-init') ),
						'from' 	: getTweenProperties( $this.attr('data-from') ),
						'to' 	: getTweenProperties( $this.attr('data-to') )
					},
					default_properties = {
						speed 	: .5,
						ease 	: 'Power4.easeOut'
					};

				// merge default properties
				if ( !_.isUndefined(o) ){
					default_properties = _.extend(default_properties, o);
				}

				// enable rendering through GPU
				if ( Modernizr.csstransforms ){
					$this.get(0).style[Modernizr.prefixed('backfaceVisibility')] = "hidden";
					$this.get(0).style[Modernizr.prefixed('transformStyle')] = "preserve-3d";
					$this.get(0).style[Modernizr.prefixed('perspective')] = 400;
				}

				// set from state if it isn't provided
				if ( _.isEmpty(states.from) && !_.isEmpty(states.init) ){
					states.from = states.init;
				}

				// set to state to original values
				if ( _.isEmpty(states.to) && !_.isEmpty(states.init) ){
					for ( var i in states.init ){
						if ( !_.isUndefined($this.css(i)) ){
							states.to[i] = ($.trim($this.css(i)).toLowerCase() == 'auto') ? '0px' : $this.css(i);
						}else{
							switch (i){
								case 'x' : 
								case 'y' :
								case 'marginLeft':
								case 'marginTop':
									states.to[i] = 0;
								break;
								case 'alpha':
									states.to[i] = 1;
								break;
							}
						}
					}
				}

				// set initialize state
				if ( !_.isEmpty(states.init) ){
					TweenLite.set($this, states.init);
					$this.css('visibility', 'visible');
				}

				// save data into object
				$this.data('tweener-states', states);
				$this.data('tweener-default', default_properties);
			});
		},

		animateTo : function( props ){
			return this.each(function(){
				var $this = $(this),
					states = $this.data('tweener-states'),
					default_properties = $this.data('tweener-default'),
					properties = props;

				// merge basic properties with 'state to' properties 	
				default_properties = _.defaults(states.to, default_properties);

				// if custom properties is provided as argument, merge properties
				if ( !_.isUndefined(properties) ){
					default_properties = _.defaults(properties, default_properties);
				}

				// do Tween
				TweenLite.to($this, default_properties.speed, default_properties);
			});
		},

		animateFrom : function( props ){
			return this.each(function(){
				var $this = $(this),
					states = $this.data('tweener-states'),
					default_properties = $this.data('tweener-default'),
					properties = props;

				// merge basic properties with 'state from' properties 	
				default_properties = _.extend(default_properties, states.from);

				// if custom properties is provided as argument, merge properties
				if ( !_.isUndefined(properties) ){
					default_properties = _.extend(default_properties, properties);
				}

				// do Tween
				TweenLite.to($this, default_properties.speed, default_properties);
			});
		},

		animateInit : function( props ){
			return this.each(function(){
				var $this = $(this),
					states = $this.data('tweener-states'),
					default_properties = $this.data('tweener-default'),
					properties = props;

				// merge basic properties with 'state from' properties 	
				default_properties = _.extend(default_properties, states.init);

				// if custom properties is provided as argument, merge properties
				if ( !_.isUndefined(properties) ){
					default_properties = _.extend(default_properties, properties);
				}

				// do Tween
				TweenLite.to($this, default_properties.speed, default_properties);
			});
		}
	};


	/*********************************************************************************
		 ____       _            _                        _   _               _     
		|  _ \ _ __(_)_   ____ _| |_ ___   _ __ ___   ___| |_| |__   ___   __| |___ 
		| |_) | '__| \ \ / / _` | __/ _ \ | '_ ` _ \ / _ \ __| '_ \ / _ \ / _` / __|
		|  __/| |  | |\ V / (_| | ||  __/ | | | | | |  __/ |_| | | | (_) | (_| \__ \
		|_|   |_|  |_| \_/ \__,_|\__\___| |_| |_| |_|\___|\__|_| |_|\___/ \__,_|___/
		                                                                            
	*********************************************************************************/

	/**
	 * Get tween properties form string
	 * 
	 * @private
	 * @param {string} str
	 * @return {object}
	 */
	function getTweenProperties( str ){
		if ( _.isUndefined(str) ){
			return {};
		}

		var props = str.replace(/[\{\}]+/g, '').split(','),
			obj = {};

		_.each(props, function(str){
			var value = str.split(':'),
				key = $.trim(value[0]);

			if ( !Modernizr.csstransforms ){
				switch ( key ){
					case 'x': 	key = 'marginLeft';		break;
					case 'y': 	key = 'marginTop';		break;
				}
			}

			if ( _.isNaN(parseInt(value[1])) ){
				obj[key] = value[1].replace(/[']+/g, '');
			}else{
				obj[key] = Modernizr.csstransforms ? parseInt(value[1]) : parseInt(value[1]) + 'px';
			}
		});

		// delete alpha rendering for ie (otherwise alpha channel of png will be black)
		if ( 
			!Modernizr.csstransforms && 
			obj.hasOwnProperty('alpha') &&
			!(obj.hasOwnProperty('forceAlpha') && $.trim(obj.forceAlpha) == 'true')
		){
			delete obj.alpha;
		}
			
		// delete forceAlpha value
		if ( obj.hasOwnProperty('forceAlpha') ){
			delete obj.forceAlpha;
		}

		// reconstruct object for ie (which doesn't support the object delete)
		if ( !Modernizr.csstransforms ){
			var s = {};
			for ( var i in obj){
				if ( i !== 'undefined' ){
					s[i] = obj[i];
				}
			}
			obj = s;
		}

		return obj;
	}
})();