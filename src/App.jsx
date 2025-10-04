import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TandC from "./Components/TandC";
import Refund from "./Components/Refund";
import Shipping from "./Components/Shipping";
import ContactUs from "./Components/ContactUs";
import Premium from "./Components/Premium";
import Chat from "./Components/Chat";

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/connections" element={<Connections/>}></Route>
            <Route path="/requests" element={<Requests/>}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
            <Route path="/terms" element={<TandC/>}></Route>
            <Route path="/cancellation-refund" element={<Refund/>}></Route>
            <Route path="/shipping-delivery" element={<Shipping/>}></Route>
            <Route path="/contact-us" element={<ContactUs/>}></Route>
            <Route path="/premium" element={<Premium/>}></Route>
            <Route path="/chat/:targetUserId" element={<Chat/>}></Route>
            Connections
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
