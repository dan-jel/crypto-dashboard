import React, { useState } from "react";
import styled from "styled-components";

import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();
  const [tokenInput, setTokenInput] = useState();

  return (
    <LineContainer>
      <Container>
        <Logo>
          <h1>Crypto Dashboard</h1>
        </Logo>
        <Box>
          <Links>
            <ul>
              <li>
                <Link to="/" class={pathname === "/" ? "current" : ""}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/coins"
                  class={pathname === "/coins" ? "current" : ""}
                >
                  Coins
                </Link>
              </li>
              <li>
                <Link to="/gas" class={pathname === "/gas" ? "current" : ""}>
                  Gas
                </Link>
              </li>
              <li>
                <Link to="/farm" class={pathname === "/farm" ? "current" : ""}>
                  Farm
                </Link>
              </li>
            </ul>
          </Links>
          <Search>
            <div>
              <TextInput
                type="text"
                name="token"
                placeholder="Search for Tokens"
                onChange={(e) => setTokenInput(e.target.value)}
              />
              <button
                onClick={() => {
                  window.location = `../coin/${tokenInput}`;
                }}
              >
                search
              </button>
            </div>
          </Search>
        </Box>
      </Container>
    </LineContainer>
  );
};

const LineContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
`;

const Container = styled.div`
  display: flex;
  background: #202225;
  color: white;
  width: 100%;
  height: 99px;
  align-items: center;
  z-index: 100;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 5%;
`;

const Logo = styled.div`
  display: flex;
  position: absolute;
  left: 5%;
  font-family: "Bebas Neue";
  font-size: 1.5rem;
`;

const Links = styled.div`
  ul {
    list-style: none;
    display: flex;
    padding: 0;
    li {
      margin: 0 30px 0 0;
      font-size: 1.75rem;
      .current {
        color: white;
      }
      a {
        text-decoration: none;
        color: grey;
      }
    }
  }
`;

const Search = styled.div`
  display: flex;
  height: 40px;
  div {
    height: 100%;
    display: flex;
    input {
      top: 0;
      font-size: 0.9rem;
      height: 100%;
      border-radius: 5px;
    }
    button {
      width: 75px;
      height: 40px;
      background: #202225;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      margin-left: 7px;
      font-size: 0.9rem;
      :hover {
        color: #202225;
        background: white;
        border: 1px solid #202225;
        cursor: pointer;
      }
    }
  }
`;

const TextInput = styled.input`
  width: 250px;
  border: none;
  padding: 0 0 0 10px;
  :focus {
    outline: none;
  }
`;

export default Nav;
