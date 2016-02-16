carShowroom.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});
carShowroom.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1): '';
    }
});
carShowroom.filter('ifTrue', function() {
    return function(input) {
      return input==true;
    }
});