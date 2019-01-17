var app = angular.module('epBlog', []);

app.directive('und', function() {
  return {
    restrict: 'E',
  }
})

app.controller('BlogEntryController', ['$scope', '$location', 
    function($scope, $location) {
  // vm = "view-model" as shortcut for "this"
  var vm = $scope;

  vm.makeNumberDate = function(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return month.toString() + "/" + day.toString() + "/" + year.toString();
  }

  vm.makeWrittenDate = function(date) {
    var month = date.getMonth() + 1;
    var months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };
    var monthStr = months[month];
    var day = date.getDate();
    var year = date.getFullYear();
    return monthStr + " " + day.toString() + ", " + year.toString();
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

  vm.getCurBlogId = function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var blogId = page.split(".")[0];
    return blogId;
  }

  vm.getPrevBlogId = function() {
    var blogi = vm.blogOrder.indexOf(vm.curBlogId);
    if (blogi === 0) {
      return null;
    }
    else return vm.blogOrder[blogi - 1];
  }

  vm.getNextBlogId = function() {
    var blogi = vm.blogOrder.indexOf(vm.curBlogId);
    if (blogi === (vm.blogOrder.length - 1)) {
      return null;
    }
    else return vm.blogOrder[blogi + 1];
  }

  vm.goToNextPage = function() {
    vm.pageNum++;
    //$location.search(vm.pageUrlParam, vm.pageNum.toString());
    // replace the current history record, instead of adding a new one
    //$location.replace();
    vm.scrollToTop();
  }

  vm.goToPrevPage = function() {
    vm.pageNum--;
    //$location.search(vm.pageUrlParam, vm.pageNum.toString());
    // replace the current history record, instead of adding a new one
    //$location.replace();
    vm.scrollToBottom();
  }

  vm.scrollToTop = function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1200, "easeOutQuint");
  }

  vm.scrollToBottom = function() {
    $('html, body').animate({
      scrollTop: ($('html').height() - $(window).height())
    }, 1200, "easeOutQuint");
  }

  // from http://stackoverflow.com/questions/9622207/
  //      updating-existing-url-querystring-values-with-jquery
  vm.getUrlParam = function(urlParam) {
    var query = window.location.search.substr(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] == urlParam) {
        return pair[1];
      }
    }
    return false;
  }

  vm.init = function() {
    vm.blogMap = blogMap;
    vm.blogOrder = vm.getIdsSortedByDate(blogMap);
    vm.blogs = vm.getBlogObjsFromKeys(blogMap, vm.blogOrder);

    vm.curBlogId = vm.getCurBlogId();
    vm.prevBlogId = vm.getPrevBlogId();
    vm.nextBlogId = vm.getNextBlogId();

    vm.curBlog = vm.blogMap[vm.curBlogId];
    vm.prevBlog = vm.blogMap[vm.prevBlogId];
    vm.nextBlog = vm.blogMap[vm.nextBlogId];

    if (vm.curBlog.subtitle) {
      document.title = vm.curBlog.title + ": " + vm.curBlog.subtitle;
    } else {
      document.title = vm.curBlog.title;
    }

    // for blogs with "pages"
    vm.pageUrlParam = 'page';
    var maybePageNum = vm.getUrlParam(vm.pageUrlParam);
    vm.pageNum = maybePageNum ? parseInt(maybePageNum) : 0;

    // for the sentence "This post written/created by Erik Pintar"
    vm.verbForPost = "written";
    if (vm.curBlog.tags.indexOf("art") != -1) {
      vm.verbForPost = "created";
    }

    vm.editors = vm.curBlog.editors;
    
  }

  vm.init();

}]);