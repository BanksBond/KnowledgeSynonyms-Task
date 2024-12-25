import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import TetrisLoader from "../components/TetrisLoader";
import { FaSearch } from "react-icons/fa";

type Booking = {
  bookingid: number;
};

function BookingsList() {
  // State to store the list of bookings fetched from the server
  const [bookings, setBookings] = useState<Booking[]>([]);

  // State to store the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");

  // State to manage the current page in pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Number of items to display per page
  const [itemsPerPage] = useState(6);

  // State to manage loading state while fetching data
  const [loading, setLoading] = useState(true);

  // State to handle errors during data fetching
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch bookings data from the server on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking"); // Fetch bookings data
        const result = await response.json();

        if (response.ok) {
          // If the response is successful, update bookings state
          setBookings(result);
          setLoading(false);
        } else {
          // If the response fails, set an error message
          setError("Failed to fetch bookings");
          setLoading(false);
        }
      } catch (err: any) {
        // Handle network or unexpected errors
        setError("Error fetching bookings: " + err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to update the current page in pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter bookings based on the search term
  const filteredBookings = bookings.filter((booking) =>
    booking.bookingid.toString().includes(searchTerm)
  );

  // Logic to calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <div className="p-8 bg-[#272A37]">
      <div className="flex justify-between">
        <h1 className="text-5xl text-[#00ADB5] font-bold mb-4">
          List of Bookings
        </h1>

        {/* Search Box */}
        <div className="mb-8 flex items-center">
          <FaSearch className="text-4xl text-white pr-2" />
          <input
            type="text"
            placeholder="Search by Booking ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Show loader while fetching data */}
      {loading && <TetrisLoader />}

      {/* Show error message if there's an error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Booking List */}
      {!loading && !error && (
        <>
          {currentBookings.length > 0 ? (
            <div className="space-y-4">
              {currentBookings.map((booking) => (
                <div
                  key={booking.bookingid}
                  className="p-4 rounded shadow bg-[#323644] hover:bg-[#2e353f] flex justify-between items-center"
                >
                  {/* Display booking details */}
                  <div>
                    <h2 className="text-lg text-[#E2DFD0] font-semibold">
                      Booking ID: {booking.bookingid}
                    </h2>
                    <p className="text-[#A6E3E9]">
                      Details available via Edit or specific fetch calls.
                    </p>
                  </div>

                  {/* Edit button to navigate to the booking edit page */}
                  <button
                    className="bg-[#00ADB5] text-white px-4 py-2 rounded hover:shadow-all-sides hover:shadow-[#00ADB5] transition ease-in-out delay-50"
                    onClick={() => navigate(`/edit/${booking.bookingid}`)}
                  >
                    Edit Booking
                  </button>
                </div>
              ))}
            </div>
          ) : (
            // Show message if no bookings are found
            <p>No bookings found.</p>
          )}

          {/* Pagination component to navigate between pages */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default BookingsList;
