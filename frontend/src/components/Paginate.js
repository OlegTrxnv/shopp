import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  pageNumber,
  pagesTotal = 0,
  searchTerm = "",
  isAdmin = false,
}) => {
  const pagesNumsArray = [...Array(pagesTotal + 1).keys()].slice(1);

  return (
    pagesTotal > 1 && (
      <Pagination className="d-flex justify-content-center">
        {pagesNumsArray.map((num) => (
          <LinkContainer
            key={num}
            to={
              !isAdmin
                ? searchTerm
                  ? `/search/${searchTerm}/page/${num}`
                  : `/page/${num}`
                : `/admin/productlist/${num}`
            }
          >
            <Pagination.Item active={pageNumber === num}>{num}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
