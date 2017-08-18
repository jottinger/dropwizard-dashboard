[![Build Status](https://travis-ci.org/lutzhorn/dropwizard-dashboard.svg?branch=master)](https://travis-ci.org/lutzhorn/dropwizard-dashboard)
[![codecov](https://codecov.io/gh/lutzhorn/dropwizard-dashboard/branch/master/graph/badge.svg)](https://codecov.io/gh/lutzhorn/dropwizard-dashboard)

# dropwizard-dashboard
Admin Dashboard for Dropwizard.

Add as Maven dependency:

    <dependency>
      <groupId>de.lhorn</groupId>
      <artifactId>dropwizard-dashboard</artifactId>
      <version>1.0</version>
    </dependency>

Use it in your Dropwizard `Application`:

    @Override
    public void initialize(final Bootstrap<MyConfiguration> bootstrap) {
        bootstrap.addBundle(new DashboardBundle());
    }

Access it on your admin port as http://host:8081/dashboard/

## JavaScript and CSS libraries used

### Underscore.js

    //     Underscore.js 1.8.3
    //     http://underscorejs.org
    //     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
    //     Underscore may be freely distributed under the MIT license.


### jQuery

    /*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */

### Chart.js

    /*!
     * Chart.js
     * http://chartjs.org/
     * Version: 2.4.0
     *
     * Copyright 2016 Nick Downie
     * Released under the MIT license
     * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
     */

### Bootstrap

    /*!
     * Bootstrap v3.3.7 (http://getbootstrap.com)
     * Copyright 2011-2016 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     *//*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */

