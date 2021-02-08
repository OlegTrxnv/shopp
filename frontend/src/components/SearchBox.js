import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const SearchBox = ({ history, location }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced, setDebounced] = useState(searchTerm);

  const search = useCallback(
    (term) => {
      term.trim()
        ? history.push(`/search/${encodeURIComponent(term)}`)
        : history.push("/");
    },
    [history]
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    search(debounced);
  }, [debounced, search]);

  const submitHandler = (e) => {
    e.preventDefault();
    search(searchTerm);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchTerm("");
    }
  }, [location]);

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Go!
      </Button>
    </Form>
  );
};

export default withRouter(SearchBox);
