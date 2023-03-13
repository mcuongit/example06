import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_CATEGORIES, POST_ADD_PRODUCT } from "../api/apiService";
function Product() {
  const s = {
    root: {
      flexGrow: 1,
      marginTop: 20,
    },
    paper: {
      padding: "10px",
      margin: "auto",
      maxWidth: 600,
    },
    title: {
      fontSize: 30,
      textAlign: "center",
    },
    link: {
      padding: 10,
      display: "inline-block",
    },
    txtInput: {
      width: "98%",
      margin: "1%",
    },
    submit: {
      margin: "10px 0",
    },
  };
  //   SET ATTRIBUTE FORM ADD PRODUCT
  const [checkAdd, setCheckAdd] = useState(false);
  const init = {
    title: "",
    body: "body",
    slug: "",
    idCategory: 0,
  };
  const [product, setProduct] = useState(init);
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();
  //   BEFORE RUN
  useEffect(() => {
    //   GET API CATEGORIES
    GET_ALL_CATEGORIES("categories").then((res) => {
      setCategories(res.data);
    });
  }, []);
  //   EVENT CHANGE TEXTFIELD IN FORM
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(checkAdd);
    if (checkAdd) {
      return navigate("/", { replace: true });
    }
  }, [checkAdd, navigate]);

  //   EVENT BUTTON SUBMIT FORM ADD PRODUCT
  const addProduct = (event) => {
    event.preventDefault();
    if (
      product.title !== "" &&
      product.body !== "" &&
      product.slug !== "" &&
      product.idCategory !== 0
    ) {
      POST_ADD_PRODUCT(`products`, product)
        .then((res) => {
          console.log(res);
          const d = Number(res.data);
          if (res.data === d) {
            setCheckAdd(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Bạn chưa nhập đủ thông tin");
    }
  };

  return (
    <div style={s.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={s.paper}>
            <Typography style={s.title} variant="h4">
              Add Product
            </Typography>
            <Grid item xs={12} sm container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle">
                  Title
                </Typography>
                <TextField
                  id="Title"
                  onChange={(event) => {
                    handleInputChange(event);
                  }}
                  value={product.title}
                  name="title"
                  label="Title"
                  variant="outlined"
                  style={s.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle">
                  Body
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  label="Body"
                  name="body"
                  variant="outlined"
                  style={s.txtInput}
                  size="small"
                  multiline
                  rows={4}
                  value={product.body}
                  onChange={(event) => {
                    handleInputChange(event);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle">
                  Slug
                </Typography>
                <TextField
                  id="slug"
                  label="Slug"
                  name="slug"
                  variant="outlined"
                  style={s.txtInput}
                  size="small"
                  value={product.slug}
                  onChange={(event) => {
                    handleInputChange(event);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle">
                  Choose Category
                </Typography>
                <TextField
                  id="outlined-select-currency-native"
                  name="idCategory"
                  select
                  value={product.category}
                  variant="outlined"
                  style={s.txtInput}
                  size="small"
                  onChange={(event) => {
                    handleInputChange(event);
                  }}
                  SelectProps={{ native: true }}
                  helperText="Please select your currency"
                >
                  <option value="0">Choose category</option>
                  {categories.length > 0 &&
                    categories.map((option) => (
                      <option key={option.idCategory} value={option.idCategory}>
                        {option.name}
                      </option>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  onClick={addProduct}
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={s.submit}
                >
                  Add product
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Product;
