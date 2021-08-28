import styled from "styled-components";

const CoinMetadataContainer = ({ items }) => {
  return (
    <Container>
      <PaddingBox>
        <h3>Metadata</h3>
        <h5>Last updated: {items.last_updated}</h5>
        <Item>
          <p className="l">Market Capitalization</p>
          <p className="r">{items.market_cap.euro} €</p>
        </Item>
        <Item>
          <p className="l">change 24h</p>
          <p
            className="r"
            style={{ color: items.market_cap.change < 0 ? "red" : "green" }}
          >
            {items.market_cap.change} %
          </p>
        </Item>
        <ItemLine />
        <Item>
          <p className="l">Total Volume</p>
          <p className="r">{items.total_volume.euro} €</p>
        </Item>
        <ItemLine />
        <Item>
          <p className="l">Fully Diluted Valuation</p>
          <p className="r">{items.fully_diluted_valuation.euro} €</p>
        </Item>
        <ItemLine />
        <LinkContainer>
          <h3 id="links">Links</h3>
          <div id="linkdiv"></div>
        </LinkContainer>
      </PaddingBox>
    </Container>
  );
};

const LinkContainer = styled.div`
  width: 100%;
  #links {
    margin-top: 40px;
  }
  #linkdiv {
    display: flex;
  }
`;

const Item = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
  }
  .l {
    padding-left: 5px;
  }
  .r {
    padding-right: 5px;
  }
`;

const ItemLine = styled.div`
  width: 100%;
  height: 1px;
  background: #3b3d41;
  margin-bottom: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  background: #202225;
  border-radius: 10px;
`;

const PaddingBox = styled.div`
  padding: 20px;
  position: relative;
  h3,
  h5 {
    margin: 0;
  }
  h5 {
    margin: 10px 0 20px 0;
    color: #6c6f75;
  }
`;

export default CoinMetadataContainer;
