import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {getPriceQueryParams} from "../../helpers/helpers.js"
const Filters = () => {

const [min,setMin]=useState(0)
const [max,setMax]=useState(0)
const navigate=useNavigate();

let[searchPrarams]=useSearchParams()

const handleButtonClick=(e)=>{
    e.preventDefault()

    searchPrarams=getPriceQueryParams(searchPrarams,"min",min);
    searchPrarams=getPriceQueryParams(searchPrarams,"max",max);

    const path =window.location.pathname+"?"+searchPrarams.toString()
    navigate(path);
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

      <div ClassName="form-check">
        <input
          ClassName="form-check-input"
          type="checkbox"
          name="category"
          id="check4"
          value="Category 1"
        />
        <label ClassName="form-check-label" for="check4"> Category 1 </label>
      </div>
      <div ClassName="form-check">
        <input
          ClassName="form-check-input"
          type="checkbox"
          name="category"
          id="check5"
          value="Category 2"
        />
        <label ClassName="form-check-label" for="check5"> Category 2 </label>
      </div>

      <hr />
      <h5 ClassName="mb-3">Ratings</h5>

      <div ClassName="form-check">
        <input
          ClassName="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value="5"
        />
        <label ClassName="form-check-label" for="check7">
          <span ClassName="star-rating">★ ★ ★ ★ ★</span>
        </label>
      </div>
      <div ClassName="form-check">
        <input
          ClassName="form-check-input"
          type="checkbox"
          name="ratings"
          id="check8"
          value="4"
        />
        <label ClassName="form-check-label" for="check8">
          <span ClassName="star-rating">★ ★ ★ ★ ☆</span>
        </label>
      </div>
    </div>
  )
}

export default Filters
