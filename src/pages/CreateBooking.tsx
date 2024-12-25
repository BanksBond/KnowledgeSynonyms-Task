import { useState } from "react";
import Form from "../components/Form";

type FormData = {
  firstname: string;
  lastname: string;
  totalprice: number | null;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
};

function CreateBooking() {
  // State to hold form data for the booking
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    totalprice: null,
    depositpaid: false,
    bookingdates: {
      checkin: "",
      checkout: "",
    },
    additionalneeds: "",
  });

  // State to hold feedback messages (success or error)
  const [message, setMessage] = useState("");

  // State to handle loading status during form submission
  const [loading, setLoading] = useState(false);

  // Function to handle input changes and update the corresponding state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "depositpaid") {
      // For checkbox input (deposit paid status)
      setFormData({ ...formData, [name]: checked });
    } else if (name === "checkin" || name === "checkout") {
      // For nested booking dates (check-in and check-out)
      setFormData({
        ...formData,
        bookingdates: { ...formData.bookingdates, [name]: value },
      });
    } else {
      // For all other inputs (first name, last name, etc.)
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while processing

    try {
      // Send a POST request to the API with the form data
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful booking creation
        setMessage(
          "Booking created successfully! Booking ID: " +
            result.bookingid +
            " Copied!"
        );
        handleCopy(result.bookingid); // Copy the booking ID to the clipboard
        setLoading(false);
      } else {
        // Handle errors from the server
        setMessage("Failed to create booking: " + result.message);
        setLoading(false);
      }
    } catch (error: any) {
      // Handle network or unexpected errors
      setMessage("Error: " + error.message);
      setLoading(false);
    }
  };

  // Function to copy the booking ID to the clipboard
  const handleCopy = (id: string): void => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        alert(
          "Booking ID copied to clipboard! You can go paste ID in Booking List's Search Bar"
        );
      })
      .catch((err: Error) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="">
      {/* Main container for the booking creation form */}
      <div className="text-[#EEEEEE] max-w-lg">
        <h3 className="text-[#7A8392] font-bold pt-16 pb-8">You are Admin </h3>

        <h1 className="text-5xl font-bold pt-4 pb-8 mb-6">
          Create new booking
          <span className="text-[#00ADB5]">.</span>
        </h1>

        {/* Form component for user input */}
        <Form
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
          isLoading={loading}
        />

        {/* Feedback message displayed after form submission */}
        {message && (
          <p className="mt-4 text-center font-semibold text-green-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default CreateBooking;
