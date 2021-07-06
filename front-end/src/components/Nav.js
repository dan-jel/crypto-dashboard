import React from "react";
import styled from "styled-components";

const Nav = () => {
  return (
    <Container>
      <h1>Test</h1>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background: lightblue;
  width: 100%;
  height: 100px;
`;

export default Nav;
