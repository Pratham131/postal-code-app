import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import myImage from "./images/Vector.png";

function App() {
  const [pincode, setPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(true);

  const handlePincode = (e) => {
    setPincode(e.target.value);
    setError(null);
    setResponse([]);
    // setMessage("");
  };

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (pincode.length === 6) {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = response.data;
        // console.log(response.data);
        if (data[0].Status === "Success") {
          setResponse(data);
          setShow(false);
        } else {
          setError(data[0].Message);
        }
      } else {
        alert("Postal code should be 6 digits.");
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (response.length > 0) {
      const filteredResponse =
        response[0].PostOffice &&
        response[0].PostOffice.filter((office) =>
          office.Name.toLowerCase().includes(filter)
        );
      if (
        JSON.stringify(filteredResponse) !==
        JSON.stringify(response[0].PostOffice)
      ) {
        setResponse([{ ...response[0], PostOffice: filteredResponse }]);
      }
    }
  }, [filter, response]);

  return (
    <div className="App">
      {show && (
        <div className="form-container">
          <label>Enter Pincode</label>
          <input type="text" placeholder="Pincode" onChange={handlePincode} />
          <button onClick={fetchData}>Lookup</button>
          {error && <p className="err-p">Error: {error}</p>}
        </div>
      )}

      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {response.length > 0 && (
        <div className="res-container">
          <h2>Pincode: {pincode}</h2>
          <p>Message: {response[0].Message}</p>

          <div className="search-div">
            <img src={myImage} />
            <input
              style={{ border: "none" }}
              type="text"
              placeholder="Filter"
              value={filter}
              onChange={handleFilter}
            />
          </div>

          <div className="card-container">
            {response[0].PostOffice.map((office) => (
              <div key={office.Name} className="office-card">
                <h3>Name: {office.Name}</h3>
                <p>Branch Type: {office.BranchType}</p>
                <p>Delivery Status: {office.DeliveryStatus}</p>
                <p>District: {office.District}</p>
                <p>State: {office.State}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
