import React from "react";
import styled from "styled-components";

import Gastracker from "../components/GasTracker";

const Home = () => {
  return (
    <Container>
      <h1>Home</h1>
      <Gastracker />
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
