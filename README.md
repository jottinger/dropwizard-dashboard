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

## JavaScript and CSS libraries used

### Underscore.js

### jQuery

### Chart.js

### Bootstrap

