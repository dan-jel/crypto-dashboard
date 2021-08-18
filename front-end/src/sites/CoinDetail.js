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
        console.log(typeof res["data"]);
        console.log(res["data"]);
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
          <p>id: {items["symbol"]}</p>
          <p>name: {items["name"]}</p>
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
