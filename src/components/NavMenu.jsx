import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "./NavMenu.css";

export class NavMenu extends Component {
  state = { activeItem: "Customers" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="huge" inverted>
        <Menu.Item header>React</Menu.Item>
        <Menu.Item
          name="Customers"
          as={NavLink}
          to="/Customer"
          active={activeItem === "Customers"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Produsts"
          as={NavLink}
          to="/Product"
          active={activeItem === "Produsts"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Stores"
          as={NavLink}
          to="/Store"
          active={activeItem === "Stores"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Sales"
          as={NavLink}
          to="/Sales"
          active={activeItem === "Sales"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
