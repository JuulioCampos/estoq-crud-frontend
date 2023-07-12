import { Route, Routes, useLocation } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from "./components/Template/Header/Header";
import { Footer } from "./components/Template/Footer/Footer";
import { NotFound } from "./components/Template/NotFound/NotFound";
import { RegistersProduct } from "./components/Registers";
import { RegisterSale } from "./components/Registers/Sale";
import React, { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { ProductTypeContext } from "./providers/ProductType";
import { Loading as LoadingComponent } from "./components/Template/Loading";
import { LoadingContext } from "./providers/Loading";
import { ProductContext } from "./providers/Product";

function App() {
  const location = useLocation().pathname;
  const { productType, setProductType } = useContext(ProductTypeContext);
  const { product, setProduct } = useContext(ProductContext);
  const {isLoading, setIsLoading} = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!productType) {
        try {
          const response = await fetch('http://localhost:8080/api/product-type');
          const json = await response.json();
          setProductType(json);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      }
      
      setIsLoading(false);
    };

    fetchData();

    return () => {
      // Cancelar a requisição, se necessário
    };
  }, [productType, setIsLoading, setProductType]);

  useEffect(() => {
    const fetchData = async () => {
      if (!product) {
        try {
          const response = await fetch('http://localhost:8080/api/product');
          const json = await response.json();
          setProduct(json);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      }
      
      setIsLoading(false);
    };

    fetchData();

    return () => {
      // Cancelar a requisição, se necessário
    };
  }, [product, setIsLoading, setProduct]);


  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Header location={location}/>
      <div style={{position:"relative", minHeight: "88vh" }}>
        <Routes>
          <Route path="/" element={<h1 className="text-center">Welcome to my App. Choose a menu</h1>}></Route>
          <Route path="/register-product/product-type" element={<RegistersProduct/>}></Route>
          <Route path="/register-product/product" element={<RegistersProduct/>}></Route>
          <Route path="/register-sale" element={<RegisterSale />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
