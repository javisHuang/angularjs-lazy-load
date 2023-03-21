(function(window, angular, undefined) {
    'use strict';

    angular.module('angularLazyLoad', [])
        .directive('usLazyLoadRepeatable', function($timeout){
            var lazyLoad = {};

            lazyLoad.itemCount = 15;
            lazyLoad.factor = 2;

            return {
                scope: {
                    lazyList: '=',
                    lazyItemCount: '=',
                    lazyCuttedlist: '='
                },
                link: function(scope, element, attr) {
                    lazyLoad.element = element;

                    lazyLoad.itemCount = (scope.lazyItemCount == null || scope.lazyItemCount == undefined) ? lazyLoad.itemCount : scope.lazyItemCount;

                    lazyLoad.handler = function() {

                        if (scope.lazyList == null || scope.lazyList == undefined)
                            return;

                        var shouldExtend, windowBottom;

                        windowBottom = element[0].clientHeight + element[0].scrollTop+element[0].offsetTop;
                        shouldExtend = windowBottom >= element[0].scrollHeight;

                        if (shouldExtend) {
                            $timeout(function(){
                                scope.lazyCuttedlist = scope.lazyList.slice(0, lazyLoad.itemCount * lazyLoad.factor);

                                if (scope.lazyList.length <= lazyLoad.itemCount * lazyLoad.factor) {

                                    lazyLoad.element.off('scroll', lazyLoad.handler);
                                }

                                lazyLoad.factor += 1;
                            });
                        }
                    };

                    scope.$on('$destroy', function() {

                        scope.lazyList = undefined;
                        return lazyLoad.element.off('scroll', lazyLoad.handler);
                    });

                    lazyLoad.element.bind('scroll', lazyLoad.handler);

                    if (scope.lazyList != null && scope.lazyList != undefined)
                        scope.lazyCuttedlist = scope.lazyList.slice(0, lazyLoad.itemCount);
                },
                controller: function($scope) {
                    $scope.$watch('lazyList', function(newV, oldV){
                        $timeout(function(){
                            if (newV != null && newV != undefined) {

                                $scope.lazyCuttedlist = undefined;
                                lazyLoad.element.off('scroll', lazyLoad.handler);
                                lazyLoad.element.bind('scroll', lazyLoad.handler);
                                $scope.lazyCuttedlist = newV.slice(0, lazyLoad.itemCount);
                                lazyLoad.factor = 2;
                            }
                        });
                    });
                }
            };
        });

})(window, window.angular);
