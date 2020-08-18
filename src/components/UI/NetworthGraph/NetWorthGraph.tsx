import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import {
  fetchTransactionHistory,
} from "../../../apis/ShakePayApi";
import { transaction } from "../../../models/transactions";

interface Props {}
interface chartData {
  name: string;
}
interface State {
  bitcoinBalance: number;
  etheriumBalance: number;
  data: object[] | null;
  netWorthTracker: {
    [year: number]: { [month: number]: number };
  };
}

class NetWorthGraph extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      bitcoinBalance: 0,
      etheriumBalance: 0,
      data: null,
      netWorthTracker: {},
    };
  }

  componentDidMount() {
    let netWorthTracker: {
      [year: number]: { [month: number]: number };
    } = {};
    fetchTransactionHistory().then(async (response) => {
      let transactionHistory = response as transaction[];
      let transactionIndex = transactionHistory.length - 1;

      let lastTransactionDate = new Date(
        Date.parse(transactionHistory[transactionIndex].createdAt)
      );
      let netWorth = 0;

      while (transactionIndex >= 0) {
        const transaction = transactionHistory[transactionIndex];
        const transactionDate = new Date(Date.parse(transaction.createdAt));

        // I didnt account for the different coins because I ran out of time
        if (netWorthTracker[transactionDate.getFullYear()]) {
          if (
            netWorthTracker[transactionDate.getFullYear()][
              transactionDate.getMonth()
            ]
          ) {
            if (transaction.direction === "credits") {
              netWorthTracker[transactionDate.getFullYear()][
                transactionDate.getMonth()
              ] += transaction.amount;
            } else if (transaction.direction === "debits") {
              netWorthTracker[transactionDate.getFullYear()][
                transactionDate.getMonth()
              ] -= transaction.amount;
            }
          } else {
            netWorthTracker[transactionDate.getFullYear()][
              transactionDate.getMonth()
            ] = transaction.amount;
          }
        } else {
          netWorthTracker[transactionDate.getFullYear()] = {};
          netWorthTracker[transactionDate.getFullYear()][
            transactionDate.getMonth()
          ] = transaction.amount;
        }
        transactionIndex--;
      }

      this.setState({
        netWorthTracker: netWorthTracker,
      });
    });
  }

  render() {
    return (
      <>
        <p>Graph Place Holder</p>
        {/* {data === null ? (
          "Loading..."
        ) : (
        
        <LineChart
          width={500}
          height={300}
          data={this.state.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={{ stroke: "red", strokeWidth: 2 }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="basis" dataKey="x" stroke="#BCC18A" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
        )} */}
      </>
    );
  }
}

export default NetWorthGraph;
