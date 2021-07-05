import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Container>
        <h1>Talent Project</h1>
        <p>Welcome to onbording task Talent Project</p>
        <ul>
          <li>Customers: Add, Update, Delete</li>
          <li>Products: Add, Update, Delete</li>
          <li>Stores: Add, Update, Delete</li>
          <li>Sales: Add, Update, Delete</li>
        </ul>
        <p>
          The Navigationbar on the top will take you to the relavant page by
          clicking the on the name.
        </p>
        <ul>
          <li>
            <strong>Customer</strong>. For example, click <em>Add Customer</em>{" "}
            then <em>Fill All the fields</em> click the Create button. Moving
            on, click <em>Edit</em> then <em>Change All the fields</em> click
            the Edit button. Finally, click <em>Delete</em> then{" "}
            <em>Conform the deleting customer</em> click the Delete button.
          </li>
          <li>
            <strong>Product</strong>. For example, click <em>Add Product</em>{" "}
            then <em>Fill All the fields</em> click the Create button. Moving
            on, click <em>Edit</em> then <em>Change All the fields</em> click
            the Edit button. Finally, click <em>Delete</em> then{" "}
            <em>Conform the deleting Product</em> click the Delete button.
          </li>
          <li>
            <strong>Stores</strong>. For example, click <em>Add Stores</em> then{" "}
            <em>Fill All the fields</em> click the Create button. Moving on,
            click <em>Edit</em> then <em>Change All the fields</em> click the
            Edit button. Finally, click <em>Delete</em> then{" "}
            <em>Conform the deleting Stores</em> click the Delete button.
          </li>
          <li>
            <strong>Sales</strong>. For example, click <em>Add Sales</em> then{" "}
            <em>Fill All the fields</em> click the Create button. Moving on,
            click <em>Edit</em> then <em>Change All the fields</em> click the
            Edit button. Finally, click <em>Delete</em> then{" "}
            <em>Conform the deleting Sales</em> click the Delete button.
          </li>
        </ul>
        <p>
          The <code>Talant</code> subdirectory is a standard React application
          based on the <code>create-react-app</code> template. If you open a
          command prompt in that directory, you can run <code>npm</code>{" "}
          commands such as <code>npm test</code> or <code>npm install</code>.
        </p>
      </Container>
    );
  }
}
