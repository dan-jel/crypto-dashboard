import { ResponsiveLine } from "@nivo/line";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const LineGraph = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    theme={{
      textColor: "#ffffff",
      fontSize: 11,
      axis: {
        domain: {
          line: {
            stroke: "#777777",
            strokeWidth: 1,
          },
        },
        ticks: {
          line: {
            stroke: "#000000",
            strokeWidth: 1,
          },
        },
      },
      grid: {
        line: {
          stroke: "#dddddd",
          strokeWidth: 1,
        },
      },
      tooltip: {
        container: {
          color: "#000000",
        },
      },
    }}
    margin={{ top: 50, right: 25, bottom: 60, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: 0,
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.0f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "date",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "price",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    enableGridY={false}
    pointSize={7}
    pointColor={{ from: "color", modifiers: [] }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    enableArea={true}
    areaBaselineValue={0}
    enableCrosshair={false}
    useMesh={true}
  />
);

export default LineGraph;
