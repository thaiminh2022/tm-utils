import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  money_data: number[];
  width: number;
  height: number;
};

function MoneyGraph({ money_data, width, height }: Props) {
  const data = money_data.map((d, i) => ({ year: i, money: d / 1000 }));
  console.log(width, height);
  return (
    <LineChart width={width} height={height == 0 ? 500 : height} data={data}>
      <Line type="monotone" dataKey="money" name="Tiền lãi"></Line>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="year">
        <Label value="Năm" position="insideBottomRight" />
      </XAxis>
      <Legend />
      <YAxis>
        <Label value="Nghìn Đồng" angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip />
    </LineChart>
  );
}

export default MoneyGraph;
