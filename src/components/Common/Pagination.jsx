import React from "react";
import { Menu } from "semantic-ui-react";

const Pagination = ({ rowsPerPage, totalRows, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Menu floated="right" pagination>
      {pageNumbers.map((number) => (
        <Menu.Item key={number} as="a" onClick={() => paginate(number)}>
          {number}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Pagination;
