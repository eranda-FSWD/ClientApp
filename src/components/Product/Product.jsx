import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { Button, Container, Table, Dropdown, Icon } from "semantic-ui-react";
import ProductModal from "./ProductModal";
import Pagination from "../Common/Pagination";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      producr: {},
      open: false,
      button: "",
      rowsPerPage: 10,
      totalRows: 0,
      curruntPage: 1,
      column: null,
      direction: null,
      // value: 0,

      options: [
        { key: 10, text: "10", value: 10 },
        { key: 20, text: "20", value: 20 },
        { key: 30, text: "30", value: 30 },
      ],
      selected: 10,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios
      .get("/Products/GetProduct")
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          products: data,
          totalRows: data,
        });
        this.fetchRecordsPerPage(
          this.state.curruntPage,
          this.state.rowsPerPage
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleProductModal = (value, button, product) => {
    this.setState({
      open: value,
      button: button,
      product: product,
    });
  };

  handleDropdown = (event, data) => {
    this.setState({
      curruntPage: 1,
      rowsPerPage: data.value,
    });
    this.fetchProducts();
  };

  // Records per the page
  fetchRecordsPerPage = (curruntPage, rowsPerPage) => {
    const indexOfLastRow = curruntPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const productsPerPage = this.state.products.slice(
      indexOfFirstRow,
      indexOfLastRow
    );
    this.setState({ products: productsPerPage });
  };

  paginate = (pageNumber) => {
    this.setState({ curruntPage: pageNumber });
    this.fetchProducts();
  };

  // Column Sorting
  handleSort = (clickedColumn) => {
    const { column, products, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        products: _.sortBy(products, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }
    this.setState({
      products: products.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };
  // End Column Sorting

  render() {
    const { open, button, product, column, direction } = this.state;

    return (
      <Container>
        <ProductModal
          open={open}
          button={button}
          product={product}
          fetchProducts={this.fetchProducts}
          toggleProductModal={this.toggleProductModal}
        />
        <Button
          color="blue"
          onClick={() => this.toggleProductModal(true, "Add", null)}
        >
          New Product
        </Button>
        {/* Table */}
        <Table sortable celled striped fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={() => this.handleSort("name")}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "price" ? direction : null}
                onClick={() => this.handleSort("price")}
              >
                Price
              </Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.products.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() =>
                      this.toggleProductModal(true, "Edit", product)
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
                    onClick={() => this.toggleProductModal(true, "", product)}
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
        {/* Pagination */}
        <Pagination
          totalRows={this.state.totalRows.length}
          rowsPerPage={this.state.rowsPerPage}
          paginate={this.paginate}
        />
        {/* drpdown selection */}
        <Dropdown
          compact
          selection
          defaultValue={this.state.selected}
          options={this.state.options}
          onChange={this.handleDropdown}
        />
      </Container>
    );
  }
}

export default Product;
