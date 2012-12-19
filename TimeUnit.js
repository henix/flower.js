(function() {

var TimeUnit = {};
TimeUnit.MILLISECONDS = 1;
TimeUnit.SECONDS = 1000 * TimeUnit.MILLISECONDS;
TimeUnit.MINUTES = 60 * TimeUnit.SECONDS;
TimeUnit.HOURS = 60 * TimeUnit.MINUTES;
TimeUnit.DAYS = 24 * TimeUnit.HOURS;

Flower.TimeUnit = TimeUnit;

})();
