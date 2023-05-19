import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Analytics } from '@vercel/analytics/react';
import "./App.css";
function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      <Analytics/>
    </>
  );
}

export default App;
