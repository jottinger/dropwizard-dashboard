/*
The MIT License

Copyright 2017 Lutz Horn lutz.horn@posteo.de.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
$(document).ready(function () {

    $.get("../healthcheck", function (data) {
        $.each(data, function (name, healthcheck) {
            var alrt = $('<div class="alert" role="alert">' + name + '</div>');
            if (healthcheck.healthy) {
                alrt.addClass("alert-success");
            } else {
                alrt.addClass("alert-danger");
                alrt.html(alrt.html() + ": " + healthcheck.message);
            }
            $("#health_checks").append(alrt);
        });

        $("#health_checks_loading").hide();
    });

    $.get("../metrics", function (data) {

        /*
         * A bar chart for the 'max', 'mean', and 'min' values of the slowest ten timers.
         */
        var timers = [];
        var duration_units;
        $.each(data.timers, function (name, timer) {
            if (!name.startsWith('io.dropwizard') && !name.startsWith('org.eclipse')) {
                timers.push({
                    name: name + " (" + timer.count + " calls)",
                    max: timer.max,
                    mean: timer.mean,
                    min: timer.min
                });
            }
            duration_units = timer.duration_units;
        });

        timers = _.sortBy(timers, 'max');
        timers.reverse();
        timers = timers.slice(0, 10);

        var ctx = document.getElementById('timers_max_10').getContext('2d');
        var chart_data = {
            labels: _.map(timers, function (t) {
                return t.name;
            }),
            datasets: [{
                    label: "max (" + duration_units + ")",
                    backgroundColor: 'rgb(255, 0, 0)',
                    data: _.map(timers, function (t) {
                        return t.max;
                    })
                }, {
                    label: "mean (" + duration_units + ")",
                    backgroundColor: 'rgb(0, 0, 255)',
                    data: _.map(timers, function (t) {
                        return t.mean;
                    })
                }, {
                    label: "min (" + duration_units + ")",
                    backgroundColor: 'rgb(0, 255, 0)',
                    data: _.map(timers, function (t) {
                        return t.min;
                    })
                }]
        };
        var chart = new Chart(ctx, {
            type: 'horizontalBar',
            data: chart_data,
            options: {}
        });

        $("#timers_max_10_loading").hide();


        /*
         * A bar chart for every timer.
         */
        $.each(data.timers, function (name, timer) {
            var div = $("<div/>");
            div.addClass("meter");
            var canvas = $("<canvas/>", {
                id: name
            });
            div.append(canvas);
            $("#timers").append(div);

            var keys = _.filter(Object.keys(timer), function (key) {
                return key !== 'count' && key !== 'duration_units' && key !== 'rate_units' && !key.endsWith("_rate");
            });

            var data = {
                labels: keys,
                datasets: [{
                        label: name + " (" + timer.duration_units + ")",
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgb(255, 99, 132)',
                        data: []
                    }]
            };
            $.each(keys, function (idx, key) {
                data.datasets[0].data.push(timer[key]);
            });

            var ctx = document.getElementById(name).getContext('2d');
            var chart = new Chart(ctx, {
                type: 'horizontalBar',
                data: data,
                options: {}
            });
        });

        $("#timers_loading").hide();
    });
});
