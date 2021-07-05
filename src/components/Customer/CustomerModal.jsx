import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Icon } from "semantic-ui-react";

class CustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Address: "",
    };
  }

  deleteCustomer = (id) => {
    axios
      .delete(`/Customers/DeleteCustomer/${id}`)
      .then((res) => {
        this.props.fetchCustomers();
        this.props.toggleCustomerModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addCustomer = () => {
    axios
      .post("/Customers/PostCustomer", {
        name: this.state.Name,
        address: this.state.Address,
      })
      .then((res) => {
        this.props.fetchCustomers();
        this.props.toggleCustomerModal(false);
        this.setState({ Address: "", Name: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editCustomer = (id) => {
    const cId = id === undefined ? this.props.sale.id : id;
    axios
      .put(`/Customers/PutCustomer/${id}`, {
        id: cId,
        name:
          this.state.Name === "" ? this.props.customer.name : this.state.Name,
        address:
          this.state.Address === ""
            ? this.props.customer.address
            : this.state.Address,
      })
      .then((res) => {
        this.props.fetchCustomers();
        this.props.toggleCustomerModal(false);
        this.setState({ Address: "", Name: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { open, button, customer, toggleCustomerModal } = this.props;

    if (button === "Add")
      return (
        <Modal centered={true} open={open}>
          <Modal.Header>Create Customer</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="Customer Name"
                  onChange={(e) => this.setState({ Name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input
                  placeholder="Customer Address"
                  onChange={(e) => this.setState({ Address: e.target.value })}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleCustomerModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              disabled={this.state.Address === "" || this.state.Name === ""}
              color="green"
              labelPosition="right"
              icon
              onClick={this.addCustomer}
            >
              <Icon name="checkmark" />
              Create
            </Button>
          </Modal.Actions>
        </Modal>
      );
    else if (button === "Edit")
      return (
        <Modal centered={true} open={open}>
          <Modal.Header>Edit Customer</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  defaultValue={customer.name}
                  onChange={(e) => this.setState({ Name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input
                  defaultValue={customer.address}
                  onChange={(e) => this.setState({ Address: e.target.value })}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleCustomerModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              labelPosition="right"
              color="green"
              icon
              onClick={() => this.editCustomer(customer.id)}
            >
              <Icon name="checkmark" />
              Edit
            </Button>
          </Modal.Actions>
        </Modal>
      );
    else
      return (
        <Modal open={open}>
          <Modal.Header>Delete Customer</Modal.Header>
          <Modal.Content>Are you sure?</Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleCustomerModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              labelPosition="right"
              icon
              onClick={() => this.deleteCustomer(customer.id)}
              positive
            >
              <Icon name="times" />
              Delete
            </Button>
          </Modal.Actions>
        </Modal>
      );
  }
}

export default CustomerModal;
