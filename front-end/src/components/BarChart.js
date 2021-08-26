import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data /* see data tab */ }) => (
  <ResponsiveBar
    data={data}
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
    margin={{ top: 50, right: 100, bottom: 50, left: 60 }}
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    valueFormat={{ format: "", enabled: false }}
    colors={data.map((c) => c.color)}
    colorBy="index"
    borderColor={{ theme: "background" }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "price",
      legendPosition: "middle",
      legendOffset: 32,
    }}
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
        data: data
          .slice(0)
          .reverse()
          .map((d) => ({
            color: d.color,
            label: d.x,
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
    tooltip={({ y, data }) => (
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

export default BarChart;
