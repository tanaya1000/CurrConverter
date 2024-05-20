import { useEffect, useState } from "react";
import logo from "../src/images/logo.png";
import axios from "axios";
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [info, setInfo] = useState([]);
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState();

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.4.25/v1/currencies/${from}.json`
      )
      .then((res) => {
        setInfo(res.data[from]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    Convert();
  }, [info]);

  const Convert = () => {
    const rate = info[to];
    setOutput(amount * rate);
  };
  return (
    <>
      <div
        className="container bg-dark"
        style={{ width: "600px", height: "600px" }}>
        <div className="logo text-center mt-3">
          <h4 className="fst-italic fs-5 text-white ">
            <img src={logo} alt="" style={{ width: "80px" }} className="mt-3" />
            Currency Converter
          </h4>
        </div>
        <div
          className="container1 bg-light rounded-3 mt-4"
          style={{ margin: "60px", width: "450px", height: "400px" }}>
          <div className="ms-4">
            <h4>Amount</h4>
            <input
              type="text"
              className="form-control"
              id="basic-url"
              placeholder="Enter Amount"
              aria-describedby="basic-addon3"
              style={{ width: "400px" }}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="ms-4 mt-3">
            <h4>From</h4>
            <select
              onChange={(e) => setFrom(e.target.value)}
              className="form-select"
              style={{ width: "400px" }}
              value={from}>
              {options.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="ms-4 mt-3">
            <h4>To</h4>
            <select
              onChange={(e) => setTo(e.target.value)}
              className="form-select"
              style={{ width: "400px" }}
              value={to}>
              {options.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="ms-4 mt-3 text-center">
            <h4>Converted Amount</h4>
            <h5>{amount + " " + from + " = " + output + " " + to}</h5>
            <button type="button" onClick={Convert} class="btn btn-dark mt-2">
              Convert
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
