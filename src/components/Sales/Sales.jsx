import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { Button, Container, Table, Dropdown, Icon } from "semantic-ui-react";
import SalesModal from "./SalesModal";
import Pagination from "../Common/Pagination";

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      products: [],
      stores: [],

      sales: [],
      sale: {},
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
    this.fetchSales();
    this.fetchCustomers();
    this.fetchProducts();
    this.fetchStores();
  }

  fetchSales = () => {
    axios
      .get("/Sales/GetSales")
      .then(({ data }) => {
        this.setState({
          sales: data,
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

  // Getting all Customers, Products, Stores
  fetchCustomers = () => {
    axios
      .get("/Customers/GetCustomer")
      .then(({ data }) => {
        this.setState({
          customers: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchProducts = () => {
    axios
      .get("/Products/GetProduct")
      .then(({ data }) => {
        this.setState({
          products: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchStores = () => {
    axios
      .get("/Stores/GetStore")
      .then(({ data }) => {
        this.setState({
          stores: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // End Getting all Customers, Products, Stores

  toggleSalesModal = (value, button, sale) => {
    this.setState({
      open: value,
      button: button,
      sale: sale,
    });
  };

  handleDropdown = (event, data) => {
    this.setState({
      curruntPage: 1,
      rowsPerPage: data.value,
    });
    this.fetchSales();
  };

  // Records per the page
  fetchRecordsPerPage = (curruntPage, rowsPerPage) => {
    const indexOfLastRow = curruntPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const salesPerPage = this.state.sales.slice(
      indexOfFirstRow,
      indexOfLastRow
    );
    this.setState({ sales: salesPerPage });
  };

  paginate = (pageNumber) => {
    this.setState({ curruntPage: pageNumber });
    this.fetchSales();
  };

  // Column Sorting
  handleSort = (clickedColumn) => {
    const { column, sales, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        sales: _.sortBy(sales, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }
    this.setState({
      sales: sales.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };
  // End Column Sorting

  render() {
    const {
      open,
      button,
      sale,
      sales,
      column,
      direction,
      customers,
      products,
      stores,
    } = this.state;

    return (
      <Container>
        <SalesModal
          open={open}
          button={button}
          sales={sales}
          sale={sale}
          fetchSales={this.fetchSales}
          toggleSalesModal={this.toggleSalesModal}
          customers={customers}
          products={products}
          stores={stores}
        />
        <Button
          color="blue"
          onClick={() => this.toggleSalesModal(true, "Add", null)}
        >
          New Sales
        </Button>
        {/* Table */}
        <Table sortable celled striped fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "customer" ? direction : null}
                onClick={() => this.handleSort("customer")}
              >
                Customer
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "product" ? direction : null}
                onClick={() => this.handleSort("product")}
              >
                Product
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "store" ? direction : null}
                onClick={() => this.handleSort("store")}
              >
                Store
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "dateSold" ? direction : null}
                onClick={() => this.handleSort("dateSold")}
              >
                Date Sold
              </Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.sales.map((sale) => (
              <Table.Row key={sale.id}>
                <Table.Cell>{sale.customer.name}</Table.Cell>
                <Table.Cell>{sale.product.name}</Table.Cell>
                <Table.Cell>{sale.store.name}</Table.Cell>
                <Table.Cell>
                  {moment(sale.dateSold).format("DD MMM, YYYY")}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => this.toggleSalesModal(true, "Edit", sale)}
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
                    onClick={() => this.toggleSalesModal(true, "", sale)}
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

export default Sales;
