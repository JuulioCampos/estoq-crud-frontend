import { Route, Routes, useLocation } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from "./components/Template/Header/Header";
import { Footer } from "./components/Template/Footer/Footer";
import { NotFound } from "./components/Template/NotFound/NotFound";
import { RegistersProduct } from "./components/Registers";

function App() {
  const location = useLocation().pathname;
  console.log(location)
  return (
    <>
      <Header location={location}/>
      <div style={{position:"relative", minHeight: "88vh" }}>
        <Routes>
          <Route path="/" element={<h1 className="text-center">Welcome to my App. Choose a menu</h1>}></Route>
          <Route path="/register-product" element={<RegistersProduct/>}></Route>
          <Route path="/register-sale" element={<RegistersProduct isCurrent={location === "/register-sale"}/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
        <Footer />
    </>
  );
}

export default App;
