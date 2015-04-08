/// <reference path="jquery-2.1.3.intellisense.js" />
/// <reference path="knockout-3.3.0.debug.js" />

$(function() {
    var SearchPageViewModel = function() {
        var self = this;

        self.value = ko.observable("");

        self.search = function() {
            alert(self.value());

            return false;
        };
    };

    var vm = new SearchPageViewModel();
    ko.applyBindings(vm);
});