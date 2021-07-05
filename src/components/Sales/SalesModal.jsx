import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Modal, Form, Icon, Dropdown } from "semantic-ui-react";

class SalesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      product: {},
      store: {},
      dateSale: "",
      cusId: 0,
      proId: 0,
      stId: 0,
    };
  }
  /*   componentDidMount() {
    this.setState({
      cusId: 0,
      proId: 0,
      stId: 0,
    });
  } */

  deleteSale = (id) => {
    axios
      .delete(`/Sales/DeleteSales/${id}`)
      .then((res) => {
        this.props.fetchSales();
        this.props.toggleSalesModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addSale = () => {
    const fDate = moment(this.state.dateSale).format("DD MMM, YYYY");

    axios
      .post("/Sales/PostSales", {
        productId: this.state.proId,
        customerId: this.state.cusId,
        storeId: this.state.stId,
        dateSold: fDate,
      })
      .then((res) => {
        //console.log(res.data);
        this.props.fetchSales();
        this.props.toggleSalesModal(false);
        this.setState({ proId: 0, cusId: 0, stId: 0, dateSale: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editSale = (id) => {
    const { proId, cusId, stId, dateSale } = this.state;
    const fDate =
      dateSale === "" ? dateSale : moment(dateSale).format("DD MMM, YYYY");
    const saleId = id === undefined ? this.props.sale.id : id;
    console.log(dateSale);
    axios
      .put(`/Sales/PutSales/${id}`, {
        id: saleId,
        productId: proId === 0 ? this.props.sale.product.id : proId,
        customerId: cusId === 0 ? this.props.sale.customer.id : cusId,
        storeId: stId === 0 ? this.props.sale.store.id : stId,
        dateSold: fDate === "" ? this.props.sale.dateSold : fDate,
      })
      .then((res) => {
        this.props.fetchSales();
        this.props.toggleSalesModal(false);
        this.setState({ proId: 0, cusId: 0, stId: 0, dateSale: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCusDropdown = (event, data) => {
    console.log(data.value);
    this.setState({
      cusId: data.value,
    });
  };

  handleProDropdown = (event, data) => {
    console.log(data.value);
    this.setState({
      proId: data.value,
    });
  };

  handleStoDropdown = (event, data) => {
    console.log(data.value);
    this.setState({
      stId: data.value,
    });
  };

  render() {
    const {
      open,
      button,
      sale,
      toggleSalesModal,
      customers,
      products,
      stores,
    } = this.props;

    if (button === "Add") {
      return (
        <Modal centered={true} open={open}>
          <Modal.Header>Create Sale</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Date sold</label>
                <input
                  placeholder="MM/DD/YYYY"
                  onChange={(e) => this.setState({ dateSale: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Customer</label>
                <Dropdown
                  placeholder="Select Customer"
                  fluid
                  selection
                  options={customers.map((c) => ({
                    key: c.id,
                    text: c.name,
                    value: c.id,
                  }))}
                  onChange={this.handleCusDropdown}
                />
              </Form.Field>
              <Form.Field>
                <label>Product</label>
                <Dropdown
                  placeholder="Select Product"
                  fluid
                  selection
                  options={products.map((p) => ({
                    key: p.id,
                    text: p.name,
                    value: p.id,
                  }))}
                  onChange={this.handleProDropdown}
                />
              </Form.Field>
              <Form.Field>
                <label>Store</label>
                <Dropdown
                  placeholder="Select Store"
                  fluid
                  selection
                  options={stores.map((s) => ({
                    key: s.id,
                    text: s.name,
                    value: s.id,
                  }))}
                  onChange={this.handleStoDropdown}
                />
              </Form.Field>
            </Form>
            <Modal.Description>
              <p>Note: Date format must be like this MM/DD/YYYY</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleSalesModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              disabled={
                this.state.dateSale.length < 10 ||
                this.state.stId === 0 ||
                this.state.cusId === 0 ||
                this.state.proId === 0
              }
              color="green"
              labelPosition="right"
              icon
              onClick={this.addSale}
            >
              <Icon name="checkmark" />
              Create
            </Button>
          </Modal.Actions>
        </Modal>
      );
    } else if (button === "Edit") {
      return (
        <Modal centered={true} open={open}>
          <Modal.Header>Edit Sale</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Date sold</label>
                <input
                  size="small"
                  defaultValue={moment(sale.dateSold).format("L")}
                  onChange={(e) => this.setState({ dateSale: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Customer</label>
                <Dropdown
                  fluid
                  selection
                  defaultValue={sale.customerId}
                  options={customers.map((c) => ({
                    key: c.id,
                    text: c.name,
                    value: c.id,
                  }))}
                  onChange={this.handleCusDropdown}
                />
              </Form.Field>
              <Form.Field>
                <label>Product</label>
                <Dropdown
                  defaultValue={sale.productId}
                  fluid
                  selection
                  options={products.map((p) => ({
                    key: p.id,
                    text: p.name,
                    value: p.id,
                  }))}
                  onChange={this.handleProDropdown}
                />
              </Form.Field>
              <Form.Field>
                <label>Store</label>
                <Dropdown
                  defaultValue={sale.storeId}
                  fluid
                  selection
                  options={stores.map((s) => ({
                    key: s.id,
                    text: s.name,
                    value: s.id,
                  }))}
                  onChange={this.handleStoDropdown}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleSalesModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              labelPosition="right"
              color="green"
              icon
              onClick={() => this.editSale(sale.id)}
            >
              <Icon name="checkmark" />
              Edit
            </Button>
          </Modal.Actions>
        </Modal>
      );
    } else
      return (
        <Modal open={open}>
          <Modal.Header>Delete Sale</Modal.Header>
          <Modal.Content>Are you sure?</Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleSalesModal(false, "", "")}
            >
              Cancel
            </Button>
            <Button
              labelPosition="right"
              icon
              onClick={() => this.deleteSale(sale.id)}
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

export default SalesModal;
