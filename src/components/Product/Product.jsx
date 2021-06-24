import React, { Component } from "react";
import { Table, Button, Icon } from "semantic-ui-react";

class Product extends Component {
  componentDidMount() {}

  state = {};
  render() {
    return (
      <div>
        <Button color="blue">New Product</Button>
        <Table celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>
                <Button color="yellow" icon labelPosition="left">
                  <Icon name="edit" />
                  EDIT
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" icon labelPosition="left">
                  <Icon name="trash" />
                  DELETE
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Product;
