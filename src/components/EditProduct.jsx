import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_ALL_CATEGORIES,
  GET_PRODUCT_ID,
  PUT_EDIT_PRODUCT,
} from "../api/apiService";

function EditProduct() {
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
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [product, setProduct] = useState({
    idProduct: "",
    title: "",
    body: "",
    slug: "",
    category: 0,
  });
  const [categories, setCategories] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  //   BEFORE RUN
  useEffect(() => {
    //   GET PRODUCT ID
    GET_PRODUCT_ID("Products", id)
      .then((res) => {
        const { idProduct, title, body, slug, category } = res.data;
        setProduct({
          idProduct: idProduct,
          title: title,
          body: body,
          slug: slug,
          category: category.idCategory,
        });
      })
      .catch((e) => {
        console.error(e);
      });
    // GET API CATEGORIES
    GET_ALL_CATEGORIES("categories").then((res) => {
      setCategories(res.data);
    });
  }, [id]);
  useEffect(() => {
    console.log(checkUpdate);
    if (checkUpdate) {
      return navigate("/", { replace: true });
    }
  }, [checkUpdate, navigate]);

  //   EVENT CHANGE TEXTFIELD IN FORM
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    console.table(product);
  };
  //   EVENT BUTTON SUBMIT FORM ADD PRODUCT
  const editProduct = (event) => {
    event.preventDefault();
    if (
      product.title !== "" &&
      product.body !== "" &&
      product.slug !== "" &&
      product.category > 0 &&
      product.idProduct > 0
    ) {
      PUT_EDIT_PRODUCT(`products/${product.idProduct}`, product).then((res) => {
        if (res.data === 1) {
          setCheckUpdate(true);
        }
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
              Edit Product
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
                  name="title"
                  label="Title"
                  variant="outlined"
                  style={s.txtInput}
                  value={product.title}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle">
                  Body
                </Typography>
                <TextField
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
                  label="Slug"
                  name="slug"
                  variant="outlined"
                  value={product.slug}
                  style={s.txtInput}
                  size="small"
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
                  onClick={editProduct}
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={s.submit}
                >
                  Edit product
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditProduct;
