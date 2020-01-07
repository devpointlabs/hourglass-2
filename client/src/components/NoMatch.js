import React from 'react';
import { Link, } from "react-router-dom";
import { Button, Header, } from "semantic-ui-react";

const NoMatch = () => (
  <div style={styles.container}>
    <Header as="h1" style={styles.header}>404 Bukaroo</Header>
    <Header as="h1" style={styles.header}>You Best Get On Outta Here</Header>
    <Header as="h3">Before We Have Ourselves An Accident</Header>
    <Header as="h3">*shoots finger guns*</Header>
    <Link to="/">
      <Button color="red">Home</Button>
    </Link>
  </div>
)

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  header: {
    fontSize: "50px",
  },
};

export default NoMatch;