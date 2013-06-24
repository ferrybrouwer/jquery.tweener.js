jquery.tweener.js
=================

A lightweight jQuery plugin which uses the TweenLite library for animate elements defined by 
data attribute fieldset data-init and data-to. The advantage of using this library 
is that your code will be clean by using data-fieldsets to provide tweening properties in specified states (init, to, from).


**Dependency**:
___________
  * <a href="http://jquery.com/" target="_blank" title="jQuery">jQuery 1.8+</a>
  * <a href="http://underscorejs.org/" target="_blank" title="Underscore">Underscore</a>
  * <a href="http://www.greensock.com/tweenlite/" target="_blank" title="TweenLite">TweenLite</a>


**Usage HTML**:
__________
    <!-- javascripts -->
    <script src="js/jquery.js"></script>
    <script src="js/underscore.js"></script>
    <script src="js/jquery.tweener.js"></script>
    
    <!-- element to tween -->
    <div id="tween_element" data-init="{x:-100, y:-100, alpha:0}" data-to="{x:0, y:0, ease:'Elastic.easeOut'}">
        This is a tweenable element
    </div>


**Usage JavaScript**:
________________
    <script>
        // initialize all data-init elements
        // this will set the element to the initialize state provided by the data-init value
        var $div = $('div#tween_element[data-init]').tweener();
       
        // animate to the position data-to
        // as argument you can override or add properties
        $div.tweener('animateTo', {
           delay : .3,
           speed : .5,
           ease  : 'Back.easeOut'
        });
        
        // after 2s animate back to it's initialize state
        // the duration of animation must be 2s
        setTimeout(function(){
           $div.tweener('animateInit', {
              speed : 2
           });
        }, 2000);
    </script>
