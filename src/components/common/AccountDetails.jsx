import { useProductContext } from "../../contexts/ProductContext";

export default function AccountDetails() {

  const {allAddressList} = useProductContext()
    
  const user = {
    name: "Badal Tomar",
    email: " support@clyora.com",
    memberId: "#CLY12345",
    phone: "+917310925207",
    address: "Flat No. 502, Silver Oaks Apartments, Sector 12, Dwarka, New Delhi, Delhi - 110091",
    country: "India",
    paymentMethod: "Visa ending with ****9827"
  };

  return (
    <div className="pageLoadAnimation row justify-content-center">
      <div className="col-md-10 col-lg-8">
        {/* <!-- Profile Card --> */}
        <div className="card shadow-sm border-0 overflow-hidden">
          <div className="bg-dark bg-gradient p-4">
            <div className="d-flex align-items-center">
              <img
                src="https://placehold.co/100x100?text=User"
                alt="Profile"
                className="rounded-circle border border-3 border-light me-3"
                width="100"
                height="100"
              />
              <div>
                <h4 className="mb-1 fw-semibold text-light">{user.name}</h4>
                <p className="mb-0 text-light">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="card-body bg-light">
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent">
                <strong>Member ID:</strong> {user.memberId}
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Country:</strong> {user.country}
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Default Payment Method:</strong> {user.paymentMethod}
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Phone:</strong> {user.phone}
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Saved Addresses:</strong> {allAddressList.length >= 0 && allAddressList.length}
              </li>
            </ul>
            <div className="text-center mt-3">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
