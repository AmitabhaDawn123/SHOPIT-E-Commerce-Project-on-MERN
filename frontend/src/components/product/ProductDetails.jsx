import React, { useEffect } from 'react'
import { useGetProductDetailsQuery } from '../../redux/api/productsApi'
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

const ProductDetails = () => {

debugger;
    const params=useParams();
    const {data,isError,error,isLoading}=useGetProductDetailsQuery(params?.id)
    
    const product= data?.product;


    useEffect(()=>{
        if(isError){
    toast.error(error?.data?.message)
        }
    },[error?.data?.message, isError])
    
    console.log(data,isLoading);
        // console.log(data,isLoading);
    
        if(isLoading) return <Loader/>;

       


  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src="./images//default_product.png"
            alt=""
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          <div className="col-2 ms-4 mt-2">
            <Link role="button">
              <img
                className="d-block border rounded p-3 cursor-pointer"
                height="100"
                width="100"
                src="./images//default_product.png"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product # {product?._id}</p>

        <hr />

        <div className="d-flex">
          <div className="star-ratings">
            <i className="fa fa-star star-active"></i>
            <i className="fa fa-star star-active"></i>
            <i className="fa fa-star star-active"></i>
            <i className="fa fa-star star-active"></i>
            <i className="fa fa-star star-active"></i>
          </div>
          <span id="no-of-reviews" className="pt-1 ps-2"> ({product?.numOfReviews} Reviews) </span>
        </div>
        <hr />

        <p id="product_price">${product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus">-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value="1"
            readonly
          />
          <span className="btn btn-primary plus">+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled=""
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status: <span id="stock_status" className="greenColor">In Stock</span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>
          {product?.description}
        </p>
        <hr />
        <p id="product_seller mb-3">Sold by: <strong>{product?.seller}</strong></p>

        <div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  )
}

export default ProductDetails