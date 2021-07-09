import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Icon } from "semantic-ui-react";

class StoreModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Address: "",
    };
  }

  deleteStore = (id) => {
    axios
      .delete(`/Stores/DeleteStore/${id}`)
      .then((res) => {
        //console.log(res.data);
        this.props.fetchStores();
        this.props.toggleStoreModal(false);
      })
      .catch((err) => {
        alert("This Store is used to make Sales and it can NOT be Deleted.");
        this.props.toggleStoreModal(false);
        console.log(err);
      });
  };

  addStore = () => {
    //console.log(this.state.Name, this.state.Address);
    axios
      .post("/Stores/PostStore", {
        name: this.state.Name,
        address: this.state.Address,
      })
      .then((res) => {
        //console.log(res.data);
        this.props.fetchStores();
        this.props.toggleStoreModal(false);
        this.setState({ Name: "", Address: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editStore = (id) => {
    const sId = id === undefined ? this.props.sale.id : id;
    axios
      .put(`/Stores/PutStore/${id}`, {
        id: sId,
        name:
          this.state.Name === "" ? this.props.customer.name : this.state.Name,
        address:
          this.state.Address === ""
            ? this.props.customer.address
            : this.state.Address,
      })
      .then((res) => {
        this.props.fetchStores();
        this.props.toggleStoreModal(false);
        this.setState({ Name: "", Address: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { open, button, store, toggleStoreModal } = this.props;

    if (button === "Add")
      return (
        <Modal centered={true} open={open}>
          <Modal.Header>Create Store</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="Store Name"
                  onChange={(e) => this.setState({ Name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input
                  placeholder="Store Address"
                  onChange={(e) => this.setState({ Address: e.target.value })}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleStoreModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              disabled={this.state.Name === "" || this.state.Address === ""}
              color="green"
              labelPosition="right"
              icon
              onClick={this.addStore}
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
          <Modal.Header>Edit Store</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  defaultValue={store.name}
                  onChange={(e) => this.setState({ Name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input
                  defaultValue={store.address}
                  onChange={(e) => this.setState({ Address: e.target.value })}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleStoreModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              labelPosition="right"
              color="green"
              icon
              onClick={() => this.editStore(store.id)}
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
          <Modal.Header>Delete Store</Modal.Header>
          <Modal.Content>Are you sure?</Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleStoreModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              labelPosition="right"
              icon
              onClick={() => this.deleteStore(store.id)}
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

export default StoreModal;
