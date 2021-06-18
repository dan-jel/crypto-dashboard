import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Container>
      <Logo>
        <h1>~Crypto Dashboard~</h1>
      </Logo>
      <NavList>
        <li>Home</li>
        <li>Coins</li>
        <li>Farm</li>
        <li>Gas</li>
      </NavList>
      <Searchbar>
        <form>
          <input
            class="text"
            type="text"
            name="name"
            placeholder="search a token..."
          />
          <input class="button" type="submit" value="search" />
        </form>
      </Searchbar>
    </Container>
  );
};

const Logo = styled.div`
  h1 {
    font-size: 1.5rem;
  }
`;

const Searchbar = styled.div`
  position: absolute;
  right: 0;
  padding-right: 10px;
  form {
    input {
      height: 30px;
      border: 0;
      padding: 0;
      margin: 0;
    }
    .text {
      width: 130px;
      background: white;
      padding: 0px 5px 0px 5px;
      border-radius: 5px 0px 0px 5px;
    }
    .button {
      padding: 0px 7px 0px 7px;
      border-radius: 0px 5px 5px 0px;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background: #202225;
  color: white;
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  li {
    padding-left: 30px;
  }
`;

export default Navbar;
