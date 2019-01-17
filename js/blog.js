var app = angular.module('epBlog', []);

app.controller('BlogController', ['$scope', function($scope) {
  // vm = "view-model" as shortcut for "this"
  var vm = $scope;

  vm.makeNumberDate = function(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return month.toString() + "/" + day.toString() + "/" + year.toString();
  }

  // return array of blogMap keys, sorted with most recent date first
  vm.getIdsSortedByDate = function(blogMap) {
    var sortByDate = function(key1, key2) {
      var date1 = blogMap[key1]["date"];
      var date2 = blogMap[key2]["date"];
      return (date1 > date2) ? -1 : 1; // more recent date goes first
    }
    var keyArray = Object.keys(blogMap);
    keyArray.sort(sortByDate);
    return keyArray;
  }

  // returns array of objects
  vm.getBlogObjsFromKeys = function(blogMap, keyArray) {
    var objArray = keyArray.map(function(key) {
      return blogMap[key];
    });
    return objArray;
  }

  vm.doShowEntry = function(blog) {
    for (var i = 0; i < blog.tags.length; i++) {
      var tag = blog.tags[i];
      if (vm.tagFilter[tag]) {
        return true;
      }
    }
    return false;
  }

  vm.selectOnlyTag = function(tag) {
    for (tagKey in vm.tagFilter) {
      if (tagKey === tag) {
        vm.tagFilter[tagKey] = true;
      }
      else {
        vm.tagFilter[tagKey] = false;
      }
    }
  }

  vm.selectAllTags = function() {
    for (tagKey in vm.tagFilter) {
      vm.tagFilter[tagKey] = true;
    }
  }

  vm.allTagsSelected = function() {
    tagsAllSelected = true;
    for (tagKey in vm.tagFilter) {
      tagsAllSelected &= vm.tagFilter[tagKey];
    }
    return tagsAllSelected;
  }

  vm.onlySelectedTag = function(tag) {
    isOnlySelectedTag = true;
    for (tagKey in vm.tagFilter) {
      if (tagKey === tag) {
        isOnlySelectedTag &= vm.tagFilter[tagKey];
      }
      else {
        isOnlySelectedTag &= !vm.tagFilter[tagKey];
      }
    }
    return isOnlySelectedTag;
  }

  vm.init = function() {
    vm.blogMap = blogMap;
    vm.blogOrder = vm.getIdsSortedByDate(blogMap);
    vm.blogs = vm.getBlogObjsFromKeys(blogMap, vm.blogOrder);
    // set up all tags as visible
    vm.tags = tags;
    vm.tagFilter = {};
    for (var i = 0; i < tags.length; i++) {
      vm.tagFilter[tags[i]] = true;
    }
  }

  vm.init();

}]);