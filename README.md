jquery.tweener.js
=================

jQuery plugin which uses the TweenLite library for animate elements defined by 
data attribute fieldset data-init and data-to.

Dependency:
___________
  * jQuery 1.8+ (http://jquery.com/)
  * underscore.js (http://underscorejs.org/)
  * TweenLite.js (http://www.greensock.com/tweenlite/)
  

Usage HTML:
__________
    <div id="tween_element" data-init="{x:-100, y:-100, alpha:0}" data-to="{x:0, y:0, ease:'Elastic.easeOut'}">
        This is a tweenable element
    </div>


Usage JavaScript:
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
