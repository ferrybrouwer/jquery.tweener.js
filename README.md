jquery.tweener.js
=================

jQuery plugin which uses the TweenLite library for animate elements defined by 
data attribute fieldset data-init and data-to.

Dependency:
___________
  - jQuery 1.8+
  - underscore.js
  - TweenLite.js (greensock)
  
Usage:
______
  `<div id="tween_element" data-init="{x:-100, y:-100, alpha:0}" data-to="{x:0, y:0, ease:'Elastic.easeOut'}">
    This is a tweenable element
  </div>`
