import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {getPriceQueryParams} from "../../helpers/helpers.js"
import { PRODUCT_CATEGORIES } from '../../constants/constants.js'
import StarRatings from "react-star-ratings"
const Filters = () => {

const [min,setMin]=useState(0)
const [max,setMax]=useState(0)
const navigate=useNavigate();

let[searchPrarams]=useSearchParams();

useEffect(()=>{
  searchPrarams.has("min")&&setMin(searchPrarams.get("min"));
  searchPrarams.has("max")&&setMax(searchPrarams.get("max"));
},[])

const handleButtonClick=(e)=>{
  e.preventDefault()

  searchPrarams=getPriceQueryParams(searchPrarams,"min",min);
  searchPrarams=getPriceQueryParams(searchPrarams,"max",max);

  const path =window.location.pathname+"?"+searchPrarams.toString()
  navigate(path);
};



const handleClick=(checkbox)=>{
  const checkboxes=document.getElementsByName(checkbox.name)
  checkboxes.forEach((item)=>{
    if(item!==checkbox)
    item.checked=false;
  })

  if(checkbox.checked===false){
if(searchPrarams.has(checkbox.name)){
  searchPrarams.delete(checkbox.name);
  const path =window.location.pathname+"?"+searchPrarams.toString()
  navigate(path);
}
  }else{
if(searchPrarams.has(checkbox.name)){
  searchPrarams.set(checkbox.name,checkbox.value)
}else{
  searchPrarams.append(checkbox.name,checkbox.value)
}

const path =window.location.pathname+"?"+searchPrarams.toString()
navigate(path);
}
  }

  const defaultCheckHandler=(checkboxType,checkBoxValue)=>{
    const value=searchPrarams.get(checkboxType)

    if (checkBoxValue===value)return true;
    return false;
  }


 return (
    <div ClassName="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 ClassName="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        ClassName="px-2"
        onSubmit={handleButtonClick}
      >
        <div ClassName="row">
          <div ClassName="col">
            <input
              type="text"
              ClassName="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e)=>setMin(e.target.value)}
            />
          </div>
          <div ClassName="col">
            <input
              type="text"
              ClassName="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e)=>setMax(e.target.value)}
            />
          </div>
          <div ClassName="col">
            <button type="submit" ClassName="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 ClassName="mb-3">Category</h5>
{PRODUCT_CATEGORIES?.map((category)=>(
  <div ClassName="form-check">
        <input
          ClassName="form-check-input"
          type="checkbox"
          name="category"
          id="check4"
          value={category}
          defaultChecked={defaultCheckHandler("category",category)}
          onClick={(e)=> handleClick(e.target)}
        />
        <label ClassName="form-check-label" for="check4"> {category} </label>
      </div>
))}
      
      

      <hr />
      <h5 ClassName="mb-3">Ratings</h5>
{[5,4,3,2,1].map((rating)=>(
  <div ClassName="form-check">
  <input
    ClassName="form-check-input"
    type="checkbox"
    name="ratings"
    id="check8"
    value={rating}
    defaultChecked={defaultCheckHandler("ratings",rating?.toString())}
    onClick={(e)=> handleClick(e.target)}
  />
  <label ClassName="form-check-label" for="check8">
  <StarRatings
          rating={rating}
          starRatedColor="#ffb829"
          
          numberOfStars={5}
          name='rating'
          starDimension='20px'
          starSpacing='1px'
        />
  </label>
</div>
))}
      <div ClassName="form-check">
        {/* <input
          ClassName="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value="5"
        /> */}
        <label ClassName="form-check-label" for="check7">
          {/* <span ClassName="star-rating">★ ★ ★ ★ ★</span> */}
        </label>
      </div>
      
    </div>
  )
}

export default Filters
