import { Route, Routes } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from "./components/Template/Header/Header";
import { Footer } from "./components/Template/Footer/Footer";
import { NotFound } from "./components/Template/NotFound/NotFound";
import { ProductType } from "./components/Registers/ProductType";

function App() {
  return (
    <>
      <Header />
      <div style={{position:"relative", minHeight: "88vh" }}>
        <Routes>
          <Route path="/" element={<h1 className="text-center">Welcome to my App. Choose a menu</h1>}></Route>
          <Route path="/register-product" element={<ProductType/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
        <Footer />
    </>
  );
}

export default App;
