/// <reference path="jquery-2.1.3.intellisense.js" />
/// <reference path="knockout-3.3.0.debug.js" />

$(function () {
    var SearchPageViewModel = function() {
        var self = this;

        self.templateName = ko.observable("homePage");

        self.value = ko.observable("");
        self.value.subscribe(function() {
            self.templateName("searchPage");
        });
        self.results = ko.observableArray();
        self.selectedResult = ko.observable();

        self.filteredResults = ko.pureComputed(function() {
            return ko.utils.arrayFilter(self.results(), function (item) {
                var filter = self.value();
                if (!filter) {
                    return true;
                }

                var name = item.name;
                if (!name) {
                    return false;
                }

                return name.indexOf(filter) != -1;
            });
        });

        self.reversedValue = ko.pureComputed({
            read: function() {
                return self.value().split("").reverse().join("");
            },
            write: function(value) {
                self.value(value.split("").reverse().join(""));
            }
        });

        self.search = function () {
            $.ajax({
                url: "/api/unicorns",
                success: function (results) {
                    var vms = ko.utils.arrayMap(results, function (result) {
                        result.isSelected = ko.observable();
                        return result;
                    });
                    self.results(vms);
                }
            });

            return false;
        };

        self.select = function (item) {
            var previousSelectedResult = self.selectedResult();
            if (previousSelectedResult) {
                previousSelectedResult.isSelected(false);
            }

            self.selectedResult(item);
            item.isSelected(true);
        };

        self.search();
    };

    var vm = new SearchPageViewModel();
    ko.applyBindings(vm);
});