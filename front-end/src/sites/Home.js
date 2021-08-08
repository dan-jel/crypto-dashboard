import React from "react";
import styled from "styled-components";

import Gastracker from "../components/GasTracker";
import Calculator from "../components/Calculator";

const Home = () => {
  return (
    <Container>
      <h1>Home</h1>
      <Gastracker />
      <Calculator />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #2d3237;
  color: white;
`;

export default Home;
