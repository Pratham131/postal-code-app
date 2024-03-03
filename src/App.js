import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import myImage from "./images/Vector.png";

function App() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedPincode, setSelectedPincode] = useState();
  const [filterOffice, setFilterOffice] = [];
  const [filter, setFilter] = useState("");

  const handlePincode = (e) => {
    setPincode(e.target.value);
    setError(null);
    setResponse([]);
    setMessage("");
  };

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const fetchData = async () => {
    try {
      if (pincode.length === 6) {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = response.data;
        // console.log(response.data)
        // console.log(data[0].Status)
        console.log(data[0].PostOffice);
        if (data[0].Status === "Success") {
          setResponse(data);
          setMessage(data[0].Message);
          setSelectedPincode(pincode);
          // console.log(data)
        } else {
          setError(data[0].Message);
          // console.log(data[0].Message)
        }
      } else {
        alert("Postal code should be 6 digits.");
      }
    } catch (error) {
      return setError(error);
    }
  };

  useEffect(() => {
    const filteredResponse = response.filter((office) =>
      office.Name.toLowerCase().includes(filter)
    );
    if (JSON.stringify(filteredResponse) !== JSON.stringify(response)) {
      setResponse(filteredResponse);
    }
  }, [filter, response]);

  return (
    <div className="App">
      <div className="container">
        <div className="form-container">
          <label>Enter Pincode</label>
          <input type="text" placeholder="Pincode" onChange={handlePincode} />
          <button onClick={fetchData}>Lookup</button>
          {error && <p className="err-p">Error: {error}</p>}
        </div>

        {/* <div>
          {response && (
            <div className="card-container">
              <h3>Pincode: {pincode}</h3>
              {message && <p>Message: {message}</p>}

              <div>
                <img src={myImage} />
                <input
                  type="text"
                  placeholder="Filter"
                  value={filter}
                  onChange={handleFilter}
                />
              </div>

              {response.map((office) => (
                <div className="office-card">
                  <h3>Name: {office.Name}</h3>
                  <p>Branch Type: {office.BranchType}</p>
                  <p>Delivery Status: {office.DeliveryStatus}</p>
                  <p>District: {office.District}</p>
                  <p>State: {office.State}</p>
                </div>
              ))}
            </div>
          )}
        </div> */}

<div>
          {response && (
            <div className="card-container">
              <h3>Pincode: {pincode}</h3>
              {message && <p>Message: {message}</p>}

              <div>
                <img src={myImage} />
                <input
                  type="text"
                  placeholder="Filter"
                  value={filter}
                  onChange={handleFilter}
                />
              </div>

              {response.map((office) => (
                <div className="office-card">
                  <h3>Name: {office.Name}</h3>
                  <p>Branch Type: {office.BranchType}</p>
                  <p>Delivery Status: {office.DeliveryStatus}</p>
                  <p>District: {office.District}</p>
                  <p>State: {office.State}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
