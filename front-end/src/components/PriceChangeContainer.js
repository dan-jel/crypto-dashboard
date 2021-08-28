import styled from "styled-components";

const PriceChangeContainer = ({ items }) => {
  return (
    <Container>
      <PaddingBox>
        <h2>
          Price Change in <strong>%</strong>
        </h2>
        <h5>Last updated: {items.last_updated}</h5>
        <Item>
          <p className="l">1 hour</p>
          <p
            id="hour"
            className="r"
            style={{
              color: items.change_percentage["1h"] < 0 ? "red" : "green",
            }}
          >
            {items.change_percentage["1h"].toFixed(2)} %
          </p>
        </Item>
        <ItemLine />
        <Item>
          <p className="l">1 day</p>
          <p
            id="day"
            className="r"
            style={{
              color: items.change_percentage["1d"] < 0 ? "red" : "green",
            }}
          >
            {items.change_percentage["1d"].toFixed(2)} %
          </p>
        </Item>
        <ItemLine />
        <Item>
          <p className="l">1 week</p>
          <p
            id="week"
            className="r"
            style={{
              color: items.change_percentage["1w"] < 0 ? "red" : "green",
            }}
          >
            {items.change_percentage["1w"].toFixed(2)} %
          </p>
        </Item>
        <ItemLine />
        <Item>
          <p className="l">1 month</p>
          <p
            id="month"
            className="r"
            style={{
              color: items.change_percentage["1m"] < 0 ? "red" : "green",
            }}
          >
            {items.change_percentage["1m"].toFixed(2)} %
          </p>
        </Item>
        <ItemLine />
        <Item>
          <p className="l">6 months</p>
          <p
            id="months"
            className="r"
            style={{
              color: items.change_percentage["16m"] < 0 ? "red" : "green",
            }}
          >
            {items.change_percentage["6m"].toFixed(2)} %
          </p>
        </Item>
        <ItemLine />
        <Item>
          <p className="l">1 year</p>
          <p
            id="year"
            className="r"
            style={{
              color: items.change_percentage["1y"] < 0 ? "red" : "green",
            }}
          >
            {items.change_percentage["1y"].toFixed(2)} %
          </p>
        </Item>
        <ItemLine />
      </PaddingBox>
    </Container>
  );
};
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
  h2,
  h5 {
    margin: 0;
  }
  h5 {
    margin: 10px 0 20px 0;
    color: #6c6f75;
  }
`;

export default PriceChangeContainer;
