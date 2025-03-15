import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from 'axios';



import Header from "./pages/Header"
import Home from "./pages/Home"
import CarSlider from "./components/CarSlider"
import Footer from "./components/Footer"
import Counter from "./components/Counter"
import Services from "./components/Services"
import Login from './components/Login'
import Register from './components/Register'
import Navbar from "./components/NavBar";
import Admin from "./components/Admin"
import ChangeCar from "./components/ChangeCar"
import CreateCar from "./components/CreateCar"
import UpdateCar from "./components/UpdateCar"
import Contacts from './components/Contacts'
import ChangeContacts from './components/ChageContacts'
import ChangeMessages from './components/ChangeMessages'
import ChangeUsers from './components/ChangeUsers'
import ChangeAdmin from './components/ChangeAdmin'
import ChangeBlog from './components/ChangeBlog'
import ChangePassword from "./components/ChangePassword"
import OTP from './components/OTP'
import Bookings from "./components/Bookings";
import MyBookings from "./components/MyBookings";
import Blog from "./components/Blog";
import CarDetails from "./components/CarDetails";
import Car from "./components/Car";
import Price from './components/Price';
import About from "./components/About";
import Booking from "./pages/Booking";
import PaymentCompleted from "./components/Payment/PaymentCompleted";
import BookingHistory from "./components/BookingHistory/BookingHistory";
import Blogs from "./components/Blogs";
function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<><Header page={'home'} /> <Home /> <CarSlider /> <About /> <Services /> <Counter /> <Footer /> </>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cab-book" element={<> <Header /> <Booking /> <Footer /></>} />
          <Route path="/payment-completed" element={<PaymentCompleted />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/services" element={<> <Header page={''} /> <Services /> <Footer /> </>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/changecar" element={<ChangeCar />} />
          <Route path="/createcar" element={<CreateCar />} />
          <Route path="/updatecar/:id" element={<UpdateCar />} />
          <Route path='/contacts' element={<><Header page={''} /> <Contacts /> <Footer /> </>} />
          <Route path='/changecontacts' element={<ChangeContacts />} />
          <Route path='/changemesseges' element={<ChangeMessages />} />
          <Route path='/changeusers' element={<ChangeUsers />} />
          <Route path='/changeadmin' element={<ChangeAdmin />} />
          <Route path='/changeblog' element={<ChangeBlog />} />
          <Route path='/reset-password' element={<ChangePassword />} />
          <Route path='/otp' element={<OTP />} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/mybookings' element={<MyBookings />} />
            <Route path='/blogs' element={<><Header page={''} /> <Blogs /> <Footer /> </>} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/pricing' element={<><Header page={''} /> <><Price /></>  </>} />
          <Route path='/about' element={<><Header page={''} /> <About /> <Footer /> </>} />
          <Route
            path="/details"
            element={
              <>
                <Header />
                <CarDetails />
                <Footer />
              </>
            }
          />
          <Route
            path="/cars"
            element={
              <>
                <Header page={''} />
                <Car />
                <Footer />
              </>
            }
          />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
