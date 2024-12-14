import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import TetrisLoader from "../components/TetrisLoader";

function EditBooking() {
  // Extract the booking ID from the URL parameters
  const { id } = useParams();
  // Hook to navigate between routes programmatically
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    totalprice: 0,
    depositpaid: false,
    bookingdates: { checkin: "", checkout: "" },
    additionalneeds: "",
  });

  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to store error messages
  const [error, setError] = useState("");
  // State to store success message upon successful submission
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch booking details when the component mounts
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/booking/${id}`); // API call to fetch booking details
        const result = await response.json();

        if (response.ok) {
          setFormData(result); // Populate the form data state with the fetched booking details
          setLoading(false); // Stop the loading spinner
        } else {
          setError("Failed to fetch booking details"); // Handle failed responses
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching booking: " + err.message); // Handle errors from the API call
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]); // Re-run the effect if the ID changes

  // Update the form data when a user modifies any input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "checkin" || name === "checkout") {
      // Update nested booking dates
      setFormData((prev) => ({
        ...prev,
        bookingdates: { ...prev.bookingdates, [name]: value },
      }));
    } else if (name === "depositpaid") {
      // Handle checkbox changes
      setFormData((prev) => ({
        ...prev,
        depositpaid: e.target.checked,
      }));
    } else {
      // Update other form fields
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loading spinner during API call
    try {
      const response = await fetch(`/api/booking/${id}`, {
        method: "PUT", // Update booking details using the PUT method
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=", // Replace with appropriate credentials
        },
        body: JSON.stringify(formData), // Send updated booking data
      });

      if (response.ok) {
        setSuccessMessage("Booking updated successfully!"); // Display success message
        setTimeout(() => {
          navigate("/list"); // Redirect to booking list after a short delay
        }, 2000);
        setLoading(false);
      } else {
        setError("Failed to update booking. Please try again."); // Handle failed responses
        setLoading(false);
      }
    } catch (err) {
      setError("Error updating booking: " + err.message); // Handle errors during the API call
      setLoading(false);
    }
  };

  return (
    <div className=" ">
      <div className="text-[#EEEEEE] max-w-lg">
        {/* Display the booking ID for user reference */}
        <h3 className="text-[#7A8392] font-bold pt-16 pb-8">
          Booking ID : {id}
        </h3>

        {/* Page heading */}
        <h1 className="text-5xl  font-bold pt-4 pb-8 mb-6">
          Edit Booking<span className="text-[#00ADB5] ">.</span>
        </h1>

        {/* Display loading spinner while data is being fetched or submitted */}
        {loading && (
          <div className="flex items-center">
            <TetrisLoader />
          </div>
        )}

        {/* Display error messages if any */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display success message after successful submission */}
        {successMessage && (
          <p className="text-green-500 font-bold text-xl p-8">
            {successMessage}
          </p>
        )}

        {/* Render the form when data is loaded and there are no errors */}
        {!loading && !error && (
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  );
}

export default EditBooking;
