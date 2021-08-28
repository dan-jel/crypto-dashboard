import React from "react";
import styled from "styled-components";
import axios from "axios";

import LineGraph from "../components/LineGraph";
import linedata from "./linedata";
import PriceChangeBarChart from "../components/PriceChangeBarChart";
import ATBarChart from "../components/ATBarChart";
import CoinMetadataContainer from "../components/CoinMetadataContainer";
import PriceChangeContainer from "../components/PriceChangeContainer";

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
      return <ErrorContainer>Error: {error.message}</ErrorContainer>;
    } else if (!isLoaded) {
      return <ErrorContainer>Loading...</ErrorContainer>;
    } else {
      console.log(items);

      const changeBarData = [
        {
          y: "24h high",
          x: items.high_24h.euro,
          color: "#60B455",
        },
        {
          y: "current",
          x: items.price.euro,
          color: "#F6C43C",
        },
        {
          y: "24h low",
          x: items.low_24h.euro,
          color: "#FE7648",
        },
      ];

      const atBarData = [
        {
          y: "ATH",
          x: items.ath.euro,
          color: "#60B455",
          date: items.ath.date,
        },
        {
          y: "current",
          x: items.price.euro,
          color: "#F6C43C",
          date: items.last_updated,
        },
        {
          y: "ATL",
          x: items.atl.euro,
          color: "#FE7648",
          date: items.ath.date,
        },
      ];

      return (
        <Container>
          <Border>
            <Filler />
            <Body>
              <div className="left">
                <Description>
                  <h2>Description</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: items.description }}
                  ></div>
                </Description>
                <Spacing />
                <Graph>
                  <LineGraph data={linedata} />
                </Graph>
              </div>
              <div className="middle"></div>
              <div className="right">
                <BarChartContainer>
                  <PriceChangeBarChart changeBarData={changeBarData} />
                </BarChartContainer>
                <Spacing />
                <CoinMetadataContainer items={items} />
                <Spacing />
                <PriceChangeContainer items={items} />
                <Spacing />
                <BarChartContainer>
                  <ATBarChart atBarData={atBarData} />
                </BarChartContainer>
              </div>
            </Body>
          </Border>
        </Container>
      );
    }
  }
}

const Spacing = styled.div`
  height: 20px;
  width: 100%;
`;

const Description = styled.div`
  background: #202225;
  border-radius: 10px;
  padding: 20px;
  h2 {
    margin: 0 0 10px 0;
  }
`;

const BarChartContainer = styled.div`
  height: 300px;
  width: 100%;
  background: #202225;
  border-radius: 10px;
`;

const ErrorContainer = styled.div`
  background: #2d3237;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const Graph = styled.div`
  background: #202225;
  border-radius: 10px;
  width: 100%;
  height: 500px;
`;

const Body = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  align-items: space-between;
  .left {
    width: 65%;
  }
  .middle {
    width: 2%;
  }
  .right {
    width: 33%;
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
