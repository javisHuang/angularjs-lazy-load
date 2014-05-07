Angular lazy load
=================

This directive help you to make lazy load (in ngRepeat for example). It's best way to improve render speed i found. Done for PhoneGap app and directive really accelerated it. 

__My AngularJs ver. 1.2.16__

## Instalation
* Include angular-lazy-load.js in index.html
* Add ```angularLazyLoad``` into depedency list. Like this ``` angular.module('myApp', ['angularLazyLoad']);  ```

## How to use
* Insert __us-lazy-load-repeatable__ tag in container before repeatable contents. 
* Specify ``` lazy-list ``` tag with some your scope property that is repeats. Example: ``` lazy-list="list" ```.
* Use in your ng-repeat __cuttedList__ property. Like: ``` <li ng-repeat="item in cuttedList">  ```
* To specify item count in one load iteration use __lazy-item-count__ like     ``` <div ng-show="cuttedList" us-lazy-load-repeatable lazy-list="list" lazy-item-count="30"> ```. __Defaults 15__.

## Full example
```
<div ng-show="cuttedList" us-lazy-load-repeatable lazy-list="list">
	<li ng-repeat="item in cuttedList">
		<div>{{ item.name }}</div>
	</li>
</div>
```

## P.S.
For improve render speed more precompile your repeatable template like [here](https://gist.github.com/vojtajina/3354046). 
