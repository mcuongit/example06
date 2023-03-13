import {
  Alert,
  Button,
  Grid,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DELETE_PRODUCT_ID, GET_ALL_PRODUCTS } from "../api/apiService";
import CloseIcon from "@mui/icons-material/Close";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
function Home() {
  const s = {
    root: {
      flexGrow: 1,
      marginTop: 10,
    },
    paper: {
      width: "100%",
      margin: "auto",
    },
    removeLink: {
      textDecoration: "none",
    },
  };
  const [products, setProducts] = useState({});
  const [checkDeleteProduct, setCheckDeleteProduct] = useState(false);
  useEffect(() => {
    // GET ALL PRODUCT
    GET_ALL_PRODUCTS("products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  //   show body html
  const RawHTML = (body, className) => (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, "<br/>") }}
    ></div>
  );
  //   delete product id
  const deleteProductId = (id) => {
    DELETE_PRODUCT_ID(`products/${id}`).then((res) => {
      if (res.data === 1) {
        setCheckDeleteProduct(true);
        // update product
        setProducts(products.filter((key) => key.idProduct !== id));
      }
    });
  };
  return (
    <div style={s.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={s.paper}>
            {checkDeleteProduct && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setCheckDeleteProduct(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Delete successfully
              </Alert>
            )}
            <TableContainer component={Paper}>
              <Table style={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="center">Body</TableCell>
                    <TableCell align="center">Slug</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Modify</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.length > 0 &&
                    products.map((row) => (
                      <TableRow
                        key={row.idProduct}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="left">
                          {RawHTML(row.body, "body")}
                        </TableCell>
                        <TableCell align="left">{row.slug}</TableCell>
                        <TableCell align="left">{row.category.name}</TableCell>
                        <TableCell align="center">
                          <Link
                            to={`edit/product/${row.idProduct}`}
                            style={s.removeLink}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Edit
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => {
                              deleteProductId(row.idProduct);
                            }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
