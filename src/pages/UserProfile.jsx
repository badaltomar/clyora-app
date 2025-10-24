import { useState } from "react";
import Header from "../components/common/Header";
import { useProductContext } from "../contexts/ProductContext";
import AccountDetails from "../components/common/AccountDetails";
import Footer from "../components/common/Footer";

function UserProfileMain() {
  const { allAddressList, setAllAddressList } = useProductContext();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  function resetFormData() {
    setName("");
    setPhone("");
    setPincode("");
    setCity("");
    setState("");
    setAddress("");
    setAddressType("");
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const newAddress = {
      name: name,
      phone: Number(phone),
      pincode: Number(pincode),
      city: city,
      state: state,
      address: address,
      addressType: addressType,
      isDefault: false,
    };

    if (editIndex !== null) {
      // Update existing address
      setAllAddressList((prevList) =>
        prevList.map((item, i) => (i === editIndex ? newAddress : item))
      );
      setEditIndex(null);
      alert("Address updated successfully ✅");
      resetFormData();
    } else {
      // Add new address
      const exist = allAddressList.find(
        (adrs) =>
          adrs.address.toLowerCase() === newAddress.address.toLowerCase()
      );

      if (exist) {
        alert(
          "This address already exist in saved address, Change Area or Street :)"
        );
      } else {
        setAllAddressList((prevList) => [...prevList, newAddress]);
        resetFormData();
      }
    }
  }

  function handleSetDefault(index) {
    setAllAddressList((prevList) =>
      prevList.map((adrs, i) => ({ ...adrs, isDefault: i === index }))
    );
  }

  function handleDeleteAddress(index) {
    setAllAddressList((prevList) => prevList.filter((_, i) => i !== index));
  }

  function handleEditAddress(index) {
    const adrs = allAddressList[index];

    setName(adrs.name);
    setPhone(adrs.phone);
    setPincode(adrs.pincode);
    setCity(adrs.city);
    setState(adrs.state);
    setAddress(adrs.address);
    setAddressType(adrs.addressType);

    setEditIndex(index);
  }

  return (
    <main className="container py-3 pb-5">
      <h2 className="text-center pb-4 fw-normal">My Profile</h2>
      <AccountDetails />

      {/* Address Form */}
      <div className="pageLoadAnimation row my-5">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <form
            className={`border p-5 rounded shadow-sm ${
              editIndex !== null && "bg-body-secondary border-dark"
            }`}
            onSubmit={handleFormSubmit}
            onReset={resetFormData}
          >
            <h5 className="text-center pb-4 mt-0 ">
              {editIndex !== null ? "EDIT ADDRESS" : "ADD NEW ADDRESS"}
            </h5>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <br />
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
                <br />

                <div className="form-floating">
                  <select
                    id="state"
                    className="form-select"
                    aria-label="Floating label select example"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Haryana">Haryana</option>
                  </select>
                  <br />

                  <label htmlFor="state">State</label>
                </div>

                <label className="form-label">Address Type</label>
                <div className="form-check">
                  <input
                    type="radio"
                    name="addressType"
                    id="home"
                    className="form-check-input"
                    value={"Home (All day delivery)"}
                    onChange={(e) => setAddressType(e.target.value)}
                    checked={addressType === "Home (All day delivery)"}
                    required
                  />
                  <label htmlFor="home" className="form-check-label">
                    Home (All day delivery)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="addressType"
                    id="work"
                    className="form-check-input"
                    value={"Work (Delivery between 10 AM - 5 PM)"}
                    onChange={(e) => setAddressType(e.target.value)}
                    checked={
                      addressType === "Work (Delivery between 10 AM - 5 PM)"
                    }
                    required
                  />
                  <label htmlFor="work" className="form-check-label">
                    Work (Delivery between 10 AM - 5 PM)
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <br />
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <br />
                <textarea
                  id="address"
                  className="form-control"
                  placeholder="Address (Area and Street)"
                  value={address}
                  rows={4}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
                <br />
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-dark me-3">
              {editIndex !== null ? "Update Address" : "Save Address"}
            </button>
            <button type="reset" className="btn btn-danger me-3">
              Clear
            </button>
            {editIndex !== null && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  resetFormData();
                  setEditIndex(null);
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>
      </div>
      

      <div className="pageLoadAnimation mt-4">
        <h3 className="mb-3">Saved Addresses</h3>

        {allAddressList.length === 0 ? (
          <p className="text-muted">No saved addresses yet.</p>
        ) : (
          allAddressList.map((adrs, index) => (
            <div
              key={index}
              className={`card mb-3 shadow-sm ${
                editIndex === index
                  ? "bg-body-secondary border-dark"
                  : "border-0"
              }`}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1">{adrs.name}</h5>
                    <p className="mb-1">📍{adrs.address}</p>
                    <p className="mb-1">
                      🏙️ {adrs.city}, {adrs.state} - {adrs.pincode}
                    </p>
                    <p className="mb-1">📲 {adrs.phone}</p>
                    <small className="text-secondary">
                      🚚 {adrs.addressType}
                    </small>
                  </div>

                  <div>
                    {adrs.isDefault ? (
                      <span className="badge bg-success">Default</span>
                    ) : (
                      <button
                        className="btn btn-outline-success rounded-3 btn-sm"
                        onClick={() => handleSetDefault(index)}
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      className={`btn btn-sm rounded-3 mx-3 ${
                        editIndex === index ? "btn-dark" : "btn-outline-dark"
                      }`}
                      onClick={() => handleEditAddress(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm rounded-3"
                      onClick={() => handleDeleteAddress(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <br /><br />
      </div>
    </main>
  );
}

export default function UserProfile() {
  return (
    <div style={{ backgroundColor: "#f7faff" }}>
      <Header />
      <UserProfileMain />
      <Footer/>
    </div>
  );
}
