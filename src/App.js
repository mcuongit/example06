import { Container, CssBaseline } from "@mui/material";
import MenuTop from "./components/MenuTop";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import EditProduct from "./components/EditProduct";
import Category from "./components/Category";

function App() {
  return (
    <>
      <CssBaseline />
      <MenuTop />
      <Container maxWidth="md">
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/home" Component={Home} />
          <Route path="/products" Component={Product} />
          <Route path="/edit/product/:id" Component={EditProduct} />
          <Route path="/categories" Component={Category} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
