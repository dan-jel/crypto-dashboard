import React from "react";
import styled from "styled-components";

const GasTracker = () => {
  return (
    <Container>
      <Headline>
        <h3>Gas Fee Tracker</h3>
        <h4>Gwei per Transaction</h4>
      </Headline>
      <Table>
        <Column>
          <p className="one">fast</p>
          <p className="two">20 gwei</p>
          <p className="three">(~ 15 sec)</p>
        </Column>
        <Line />
        <Column>
          <p className="one">average</p>
          <p className="two">14 gwei</p>
          <p className="three">(~ 1 min)</p>
        </Column>
        <Line />
        <Column>
          <p className="one">slow</p>
          <p className="two">10 gwei</p>
          <p className="three">({">"} 10 min)</p>
        </Column>
        <Line />
      </Table>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 450px;
  background: #36393f;
  position: absolute;
  top: 125px;
  left: 10%;
  border-radius: 10px;
`;

const Line = styled.div`
  display: flex;
  height: 1px;
  width: 100%;
  background: #6d7177;
`;

const Column = styled.div`
  display: flex;
  width: 390px;
  justify-content: space-between;
  padding-left: 10px;
  p {
    margin: 15px 0 10px 0;
    width: 30%;
    font-size: 1.1rem;
  }
  .one {
    text-align: left;
  }
  .two {
    text-align: center;
  }
  .three {
    color: #60ca93;
    text-align: right;
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 410px;
  padding-left: 20px;
  padding-bottom: 30px;
`;

const Headline = styled.div`
  h3 {
    margin: 30px 0 0 20px;
    font-size: 1.1rem;
  }
  h4 {
    margin: 0;
    color: #6d7177;
    margin: 5px 0 10px 20px;
    font-weight: lighter;
    font-size: 1rem;
  }
`;

export default GasTracker;
