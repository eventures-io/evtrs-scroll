'use strict';

angular.module('evtrsScrollApp').directive('accordion', function () {

    return {
        restrict: 'E',
        templateUrl: 'components/accordion/accordion.html',
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs) {
            scope.panelBaseId = attrs.collapsePanelBodyId;
            scope.panelId = attrs.collapsePanelId;


            scope.toggleCollapsedStates = function(ind){

                angular.forEach(scope.ngModel, function(value, key){
                    if (key == ind)
                    {
                        var contentEl = element.find('#' + scope.panelBaseId + '-' + ind);
                        var titleEl = element.find('#' + scope.panelBaseId + '-title' + ind);
                        titleEl.toggleClass('accordionTitleActive');
                        contentEl.toggleClass('accordionItemCollapsed');
                        if(scope.ngModel[key].collapsed){
                            contentEl.addClass('animateOut');
                            contentEl.removeClass('animateIn');
                        } else {
                            contentEl.addClass('animateIn');
                            contentEl.removeClass('animateOut');
                        }
                        scope.ngModel[key].collapsed = !scope.ngModel[key].collapsed;
                    }
                    else {
                     //   scope.ngModel[key].collapsed = false;
                    }
                });
            }
        }
    };
});
