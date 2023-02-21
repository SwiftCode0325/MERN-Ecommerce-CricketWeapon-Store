import React ,{useEffect} from "react";
import "./Products.css";
import {useDispatch , useSelector} from "react-redux"
import Loader from "../layouts/loader/Loader"
import { useAlert } from "react-alert";
import { useRouteMatch } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData"
import { clearErrors , getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard"
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
  import { Typography } from "@mui/material";
// import { withStyles } from "@mui/material/styles";



function Products(){
const match = useRouteMatch();
let keyword = match.params.keyword;
const dispatch = useDispatch();
const {
  products,
  loading,
  productsCount,
  error,
  resultPerPage,
  filterdProductCount,
} = useSelector((state) => state.products);
const alert = useAlert();


 const [currentPage , setCurrentPage] = React.useState();
 const [price , setPrice] = React.useState([0 ,100000]);// intial limit from min=0  to max =30000

useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }
  dispatch(getProduct(keyword , currentPage , price));
}, [dispatch, keyword, currentPage ,price]);


 const setCurrentPageNoHandler =(e) =>{
 // this is inbuild pageHanalder so . this is how does it works
 setCurrentPage(e); // e is cliked page value
 } 

// these parameter come from Slider and its inbuild component so newPrice is here new Range here in between 0--->30000 
function valuetext(value) {
  return `${value}°C`;
}

 const priceHandler =(event , newPrice) =>{
   setPrice(newPrice);
 }

return (
  <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <MetaData title="PRODUCTS --Ecart" />

        <h2 className="productsHeading">Products</h2>
        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        {/* slider for price filter */}

        <div className="filterBox">
          {/* Typography => just like paragraph tag but with matrial ui css inbuild*/}
          <Typography>Price</Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={100000}
          />
        </div>

        {/* pagination */}
        {resultPerPage < filterdProductCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNoHandler}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="First"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </>
    )}
  </>
);

}

export default Products