import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import "semantic-ui-css/semantic.min.css";

import "./custom.css";
import Customer from "./components/Customer/Customer";
import Product from "./components/Product/Product";
import Store from "./components/Store/Store";
import Sales from "./components/Sales/Sales";
import { Home } from "./components/Home";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/Customer" component={Customer} />
        <Route exact path="/Product" component={Product} />
        <Route exact path="/Store" component={Store} />
        <Route exact path="/Sales" component={Sales} />
      </Layout>
    );
  }
}
