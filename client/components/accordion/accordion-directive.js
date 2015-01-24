'use strict';

angular.module('evtrsScrollApp').directive('accordion', function () {

    return {
        restrict: 'E',
        templateUrl: 'components/accordion/accordion.html',
        allowMultipleOpen: '@',
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs) {
            var toggleCollapse = attrs.allowMultipleOpen;
            scope.panelBaseId = attrs.collapsePanelBodyId;
            scope.panelId = attrs.collapsePanelId;
            //TODO rename
            scope.toggleCollapsedStates = function (index) {

                var contentEl = element.find('#' + scope.panelBaseId + '-' + index);
                var titleEl = element.find('#' + scope.panelBaseId + '-title' + index);

                //TODO rework. iterate over view elements, and remove collapsed property from model
                //rename ngModel , panelBase
                angular.forEach(scope.ngModel, function (value, key) {
                    if (key == index) {
                        var contentEl = element.find('#' + scope.panelBaseId + '-' + index);
                        var titleEl = element.find('#' + scope.panelBaseId + '-title' + index);
                        titleEl.toggleClass('accordionTitleActive');
                        contentEl.toggleClass('accordionItemCollapsed');
                        if (scope.ngModel[key].collapsed) {
                            contentEl.addClass('animateOut');
                            contentEl.removeClass('animateIn');
                        } else {
                            contentEl.addClass('animateIn');
                            contentEl.removeClass('animateOut');
                        }
                        scope.ngModel[key].collapsed = !scope.ngModel[key].collapsed;
                    }
                    else {
//                        if (toggleCollapse !== true) {
//                            scope.ngModel[key].collapsed = true;
//                        }
                    }
                });
            }
        }
    };
});
