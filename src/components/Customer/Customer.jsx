import React, { Component } from "react";
import { Table, Button, Icon, Container } from "semantic-ui-react";
import axios from "axios";
import CustomerModal from "./CustomerModal";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      open: false,
    };
  }
  componentDidMount() {
    this.fetchCustomer();
  }

  fetchCustomer = () => {
    axios
      .get("/Customers/GetCustomer")
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          customers: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleCustomerModal = (
    value,
    button,
    customerId,
    customerName,
    customerAddress
  ) => {
    this.setState({
      open: value,
      button: button,
      customerId: customerId,
      customerName: customerName,
      customerAddress: customerAddress,
    });
  };

  render() {
    const {
      customers,
      customerId,
      open,
      button,
      customerName,
      customerAddress,
    } = this.state;

    return (
      <Container>
        <CustomerModal
          open={open}
          button={button}
          customerId={customerId}
          customerName={customerName}
          customerAddress={customerAddress}
          toggleCustomerModal={this.toggleCustomerModal}
          fetchCustomer={this.fetchCustomer}
        />
        <Button
          color="blue"
          onClick={() => this.toggleCustomerModal(true, "Add")}
        >
          New Customer
        </Button>
        <Table celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {customers.map((customer) => (
              <Table.Row key={customer.id}>
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell>{customer.address}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() =>
                      this.toggleCustomerModal(
                        true,
                        "Edit",
                        customer.id,
                        customer.name,
                        customer.address
                      )
                    }
                    color="yellow"
                    icon
                    labelPosition="left"
                  >
                    <Icon name="edit" />
                    EDIT
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() =>
                      this.toggleCustomerModal(true, "", customer.id, "", "")
                    }
                    color="red"
                    icon
                    labelPosition="left"
                  >
                    <Icon name="trash" />
                    DELETE
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default Customer;
