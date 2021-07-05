import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { Button, Container, Table, Dropdown, Icon } from "semantic-ui-react";
import CustomerModal from "./CustomerModal";
import Pagination from "../Common/Pagination";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      customer: {},
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
    this.fetchCustomers();
  }

  fetchCustomers = () => {
    axios
      .get("/Customers/GetCustomer")
      .then(({ data }) => {
        this.setState({
          customers: data,
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

  toggleCustomerModal = (value, button, customer) => {
    this.setState({
      open: value,
      button: button,
      customer: customer,
    });
  };

  handleDropdown = (event, data) => {
    this.setState({
      curruntPage: 1,
      rowsPerPage: data.value,
    });
    this.fetchCustomers();
  };

  // Records per the page
  fetchRecordsPerPage = (curruntPage, rowsPerPage) => {
    const indexOfLastRow = curruntPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const customersPerPage = this.state.customers.slice(
      indexOfFirstRow,
      indexOfLastRow
    );
    this.setState({ customers: customersPerPage });
  };

  paginate = (pageNumber) => {
    this.setState({ curruntPage: pageNumber });
    this.fetchCustomers();
  };

  // Column Sorting
  handleSort = (clickedColumn) => {
    const { column, customers, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        customers: _.sortBy(customers, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }
    this.setState({
      customers: customers.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };
  // End Column Sorting

  render() {
    const { open, button, customer, column, direction } = this.state;

    return (
      <Container>
        <CustomerModal
          open={open}
          button={button}
          customer={customer}
          fetchCustomers={this.fetchCustomers}
          toggleCustomerModal={this.toggleCustomerModal}
        />
        <Button
          color="blue"
          onClick={() => this.toggleCustomerModal(true, "Add", null)}
        >
          New Customer
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
                sorted={column === "address" ? direction : null}
                onClick={() => this.handleSort("address")}
              >
                Address
              </Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.customers.map((customer) => (
              <Table.Row key={customer.id}>
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell>{customer.address}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() =>
                      this.toggleCustomerModal(true, "Edit", customer)
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
                    onClick={() => this.toggleCustomerModal(true, "", customer)}
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

export default Customer;
