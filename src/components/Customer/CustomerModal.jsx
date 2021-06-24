import React, { useState } from "react";
import { Button, Modal, Form, Icon } from "semantic-ui-react";
import axios from "axios";
import { render } from "react-dom";

const CustomerModal = (props) => {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");

  const {
    open,
    button,
    customerId,
    customerName,
    customerAddress,
    toggleCustomerModal,
    fetchCustomer,
  } = props;

  const deleteCustomer = (id) => {
    axios
      .delete(`/Customers/DeleteCustomer/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchCustomer();
        toggleCustomerModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCustomer = () => {
    axios
      .post("/Customers/PostCustomer", {
        name: Name,
        address: Address,
      })
      .then((res) => {
        console.log(res.data);
        fetchCustomer();
        toggleCustomerModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editCustomer = (id) => {
    axios
      .put(`/Customers/PutCustomer/${id}`, {
        id: id,
        name: Name,
        address: Address,
      })
      .then((res) => {
        console.log(res.data);
        fetchCustomer();
        toggleCustomerModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                placeholder="Customer Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => toggleCustomerModal(false)}>
            Cancel
          </Button>
          <Button
            disabled={Address.length === 0 ? true : false}
            color="green"
            icon
            onClick={addCustomer}
          >
            <Icon name="check" />
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
                type="text"
                value={customerName}
                onChange={(e) => setName(e.target.Name)}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setAddress(e.target.Address)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => toggleCustomerModal(false)}>
            Cancel
          </Button>
          <Button color="green" icon onClick={() => editCustomer(customerId)}>
            <Icon name="check" />
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
          <Button color="black" onClick={() => toggleCustomerModal(false)}>
            Cancel
          </Button>
          <Button
            labelPosition="right"
            icon
            onClick={() => deleteCustomer(customerId)}
            positive
          >
            <Icon name="times" />
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
};

export default CustomerModal;
