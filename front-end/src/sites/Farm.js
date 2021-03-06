import React from "react";
import styled from "styled-components";

const Farm = () => {
  return (
    <Container>
      <h1>Farm</h1>
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

export default Farm;
