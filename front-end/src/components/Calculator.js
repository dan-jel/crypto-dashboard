import React from "react";
import styled from "styled-components";

import { ReactComponent as Arrows } from "../icons/arrows.svg";

const Calculator = () => {
  return (
    <Container>
      {" "}
      <Headline>
        <h3>Coin Calculator</h3>
        <h4>Quelle: coingecko</h4>
      </Headline>
      <Main>
        <h3>Pay</h3>
        <Pay>
          <input type="float" name="from"></input>
        </Pay>
        <Icon>
          <Arrows />
        </Icon>
        <h3>Receive</h3>
        <Receive>
          <input type="float" name="to"></input>
        </Receive>
        <Submit>
          <input type="submit" value="calculate"></input>
        </Submit>
      </Main>
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
  right: 10%;
  border-radius: 10px;
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 0 0 0 20px;
  h3 {
    font-size: 1.1rem;
    margin: 10px 0 10px 0;
  }
`;

const Pay = styled.div`
  input {
    width: 390px;
    height: 75px;
    border-radius: 10px;
    border: none;
    padding: 0 0 0 20px;
    font-size: 1.3rem;
    background: #313538;
    color: white;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
    :focus {
      outline: none;
    }
  }
`;

const Receive = styled.div`
  input {
    width: 390px;
    height: 75px;
    border-radius: 10px;
    border: none;
    padding: 0 0 0 20px;
    font-size: 1.3rem;
    background: #313538;
    color: white;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
    :focus {
      outline: none;
    }
  }
  margin: 0 0 20px 0;
`;

const Icon = styled.div`
  display: flex;
  height: 75px;
  width: 75px;
  margin: 30px 0 10px 0;
  :hover {
    cursor: pointer;
  }
  svg {
    position: relative;
    left: 167.5px;
    height: 100%;
    width: 100%;
  }
`;

const Submit = styled.div`
  padding: 0 0 30px 0;
  input {
    width: 410px;
    height: 75px;
    font-size: 1.1rem;
    border-radius: 10px;
    border: none;
    background: #6adb94;

    :hover {
      cursor: pointer;
      background: #4a9968;
    }
  }
`;

export default Calculator;
