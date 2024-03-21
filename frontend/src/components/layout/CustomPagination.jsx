import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from "react-js-pagination"

const CustomPagination = ({resPerPage,filteredProductsCount}) => {
    
    const [currentPage,setCurrentPage] = useState();

   
    let [searchPrarams] = useSearchParams();

    const navigate= useNavigate()
    const page=Number(searchPrarams.get('page')) || 1;
    useEffect(()=>{
        setCurrentPage(page);
    },[page]
    );
const setCurrentPageNo= (pageNumber)=>{
    setCurrentPage(pageNumber)
    if(searchPrarams.has("page")){
        searchPrarams.set("page",pageNumber)
    }
    else{
        searchPrarams.append("page",pageNumber)
    }


    const path =window.location.pathname+"?"+searchPrarams.toString()
    navigate(path);

}


  return (
    <div className='d-flex justify-content-center my-5'>
      {filteredProductsCount>resPerPage && 
      <Pagination
      activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Previous"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass='page-item'
          linkClass='page-link'
      />}</div>
  )
}

export default CustomPagination;
