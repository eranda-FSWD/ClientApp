import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Icon } from "semantic-ui-react";

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Price: 0,
    };
  }

  deleteProduct = (id) => {
    axios
      .delete(`/Products/DeleteProduct/${id}`)
      .then((res) => {
        this.props.fetchProducts();
        this.props.toggleProductModal(false);
      })
      .catch((err) => {
        alert("This Product is in Sales and can not be Deleted.");
        this.props.toggleProductModal(false);
        console.log(err);
      });
  };

  addProduct = () => {
    axios
      .post("/Products/PostProduct", {
        name: this.state.Name,
        price: this.state.Price,
      })
      .then((res) => {
        this.props.fetchProducts();
        this.props.toggleProductModal(false);
        this.setState({ Name: "", Price: 0 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editProduct = (id) => {
    const pId = id === undefined ? this.props.sale.id : id;
    axios
      .put(`/Products/PutProduct/${id}`, {
        id: pId,
        name:
          this.state.Name === "" ? this.props.product.name : this.state.Name,
        price:
          this.state.Price === 0 ? this.props.product.price : this.state.Price,
      })
      .then((res) => {
        // console.log(res.data);
        this.props.fetchProducts();
        this.props.toggleProductModal(false);
        this.setState({ Name: "", Price: 0 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { open, button, product, toggleProductModal } = this.props;

    if (button === "Add")
      return (
        <Modal centered={true} open={open}>
          <Modal.Header>Create Product</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="Product Name"
                  onChange={(e) => this.setState({ Name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input
                  placeholder="Product Price"
                  onChange={(e) => this.setState({ Price: e.target.value })}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleProductModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              disabled={this.state.Price === 0 || this.state.Name === ""}
              color="green"
              labelPosition="right"
              icon
              onClick={this.addProduct}
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
          <Modal.Header>Edit Product</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  defaultValue={product.name}
                  onChange={(e) => this.setState({ Name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input
                  defaultValue={product.price}
                  onChange={(e) => this.setState({ Price: e.target.value })}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleProductModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              labelPosition="right"
              color="green"
              icon
              onClick={() => this.editProduct(product.id)}
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
          <Modal.Header>Delete Product</Modal.Header>
          <Modal.Content>Are you sure?</Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleProductModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              labelPosition="right"
              icon
              onClick={() => this.deleteProduct(product.id)}
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

export default ProductModal;
