import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { Button, Container, Table, Dropdown, Icon } from "semantic-ui-react";
import StoreModal from "./StoreModal";
import Pagination from "../Common/Pagination";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      store: {},
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
    this.fetchStores();
  }

  fetchStores = () => {
    axios
      .get("/Stores/GetStore")
      .then(({ data }) => {
        this.setState({
          stores: data,
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

  toggleStoreModal = (value, button, store) => {
    this.setState({
      open: value,
      button: button,
      store: store,
    });
  };

  handleDropdown = (event, data) => {
    this.setState({
      curruntPage: 1,
      rowsPerPage: data.value,
    });
    this.fetchStores();
  };

  // Records per the page
  fetchRecordsPerPage = (curruntPage, rowsPerPage) => {
    const indexOfLastRow = curruntPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const storesPerPage = this.state.stores.slice(
      indexOfFirstRow,
      indexOfLastRow
    );
    this.setState({ stores: storesPerPage });
  };

  paginate = (pageNumber) => {
    this.setState({ curruntPage: pageNumber });
    this.fetchStores();
  };

  // Column Sorting
  handleSort = (clickedColumn) => {
    const { column, stores, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        stores: _.sortBy(stores, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }
    this.setState({
      stores: stores.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };
  // End Column Sorting

  render() {
    const { open, button, store, column, direction } = this.state;

    return (
      <Container>
        <StoreModal
          open={open}
          button={button}
          store={store}
          fetchStores={this.fetchStores}
          toggleStoreModal={this.toggleStoreModal}
        />
        <Button
          color="blue"
          onClick={() => this.toggleStoreModal(true, "Add", null)}
        >
          New Store
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
            {this.state.stores.map((store) => (
              <Table.Row key={store.id}>
                <Table.Cell>{store.name}</Table.Cell>
                <Table.Cell>{store.address}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => this.toggleStoreModal(true, "Edit", store)}
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
                    onClick={() => this.toggleStoreModal(true, "", store)}
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

export default Store;
