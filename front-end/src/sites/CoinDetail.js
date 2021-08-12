import React from "react";
import styled from "styled-components";
import axios from "axios";

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
        const response = JSON.parse(res["data"]);
        console.log(response);
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
          <img src={items["logo"]} alt="LOGO" />
          <ul>
            <li>{items["id"]}</li>
            <li>{items["slug"]}</li>
            <li>{items["symbol"]}</li>
            <li>{items["cmc_rank"]}</li>
            <li>{items["EUR"]["price"]} €</li>
            <li>
              <a href={items["website"][0]}>website</a>
            </li>
          </ul>
        </Container>
      );
    }
  }
}

const Container = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 1.5rem;
  img {
    height: 64px;
    width: 64px;
    display: inline-block;
  }
`;

export default CoinDetail;
