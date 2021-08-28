import { ResponsiveBar } from "@nivo/bar";

const ATBarChart = ({ atBarData }) => (
  <ResponsiveBar
    data={atBarData}
    theme={{
      textColor: "#ffffff",
      fontSize: 11,
      axis: {
        domain: {
          line: {
            stroke: "#ffffff",
            strokeWidth: 1,
          },
        },
        ticks: {
          line: {
            stroke: "#ffffff",
            strokeWidth: 1,
          },
        },
      },
      grid: {
        line: {
          stroke: "#808080",
          strokeWidth: 1,
        },
      },
      tooltip: {
        container: {
          color: "#000000",
        },
      },
    }}
    keys={["x"]}
    indexBy="y"
    margin={{ top: 25, right: 110, bottom: 35, left: 60 }}
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    valueFormat={{ format: "", enabled: false }}
    colors={atBarData.map((c) => c.color)}
    colorBy="index"
    padding={0.3}
    borderColor={{ theme: "background" }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickValues: 5,
      tickSize: 5,
      tickPadding: 5,
      legendPosition: "middle",
      legendOffset: 32,
    }}
    gridXValues={5}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    enableGridX={true}
    enableGridY={false}
    enableLabel={false}
    labelSkipHeight={12}
    labelTextColor="#000000"
    isInteractive={true}
    legends={[
      {
        dataFrom: "keys",
        data: atBarData
          .slice(0)
          .reverse()
          .map((cbd) => ({
            color: cbd.color,
            label: cbd.x.toFixed(2) + " €",
          })),
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 10,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 25,
      },
    ]}
    tooltip={({ data }) => (
      <div
        style={{
          padding: 5,
          borderRadius: 5,
          background: "white",
          color: "black",
        }}
      >
        {data.date}
      </div>
    )}
  />
);

export default ATBarChart;
