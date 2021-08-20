import React from "react";
import styled from "styled-components";
import axios from "axios";

import LineGraph from "../components/LineGraph";
import data from "./linedata";

class CoinDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: "",
    };
  }

  componentDidMount() {
    const inputSymbol = window.location.href.split("/").pop();

    axios.post("http://localhost:5000/coininfo", { symbol: inputSymbol }).then(
      (res) => {
        const response = res["data"];
        this.setState({
          error: null,
          isLoaded: true,
          items: response,
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <Container>Error: {error.message}</Container>;
    } else if (!isLoaded) {
      return <Container>Loading...</Container>;
    } else {
      return (
        <Container>
          <Border>
            <Filler />
            <Header>
              <div className="image">
                <img
                  src={`http://localhost:5000/get-image/${items.symbol}_large.png`}
                />
              </div>
              <Banner></Banner>
            </Header>
            <Line />
            <Body>
              <div className="left">
                <Graph>
                  <LineGraph data={data} />
                </Graph>
              </div>
              <div className="right"></div>
            </Body>
          </Border>
        </Container>
      );
    }
  }
}

const Graph = styled.div`
  width: 100%;
  height: 500px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: white;
  margin: 5px 0 5px 0;
`;

const Body = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  .left {
    width: 66.5%;
  }
  .right {
    width: 33.5%;
  }
`;

const Banner = styled.div`
  height: 100%;
  width: 100%;
  background: red;
`;

const Header = styled.div`
  height: 250px;

  display: flex;
  img {
    display: inline-block;
    height: 250px;
    width: 250px;
  }
`;

const Filler = styled.div`
  height: 150px;
`;

const Border = styled.div`
  position: relative;
  width: 80%;
  left: 10%;
  height: auto;
`;

const Container = styled.div`
  background: #2d3237;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  position: relative;
  color: white;
`;

export default CoinDetail;
