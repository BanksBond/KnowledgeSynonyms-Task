import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBooking from "./pages/CreateBooking";
import BookingList from "./pages/BookingList";
import EditBooking from "./pages/EditBooking";
import Background from "./components/Background";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Background>
        <div className="px-[5%] pt-4 bg-[transparent] ubuntu-regular">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<CreateBooking />} />
              <Route path="/list" element={<BookingList />} />
              <Route path="/edit/:id" element={<EditBooking />} />
            </Routes>
          </div>
        </div>
      </Background>
    </Router>
  );
}

export default App;
