/**
 * Author : Dev Prtap Singh Rajawat
 * Banner No : B00922348
 * Email: dv269119@dal.ca
 */
import React from 'react'
import axiosApi from '../../../Common/AxiosApi';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Productlist from '../../../Components/ProductList';
const ProductListing = () => {

  const [stock, setStock] = useState([]);
  const location = useLocation();
    useEffect(() => {

        const stockUrl = "/inventory/viewStock"

        axiosApi.get(stockUrl)
            .then(res => {
              console.log(res.data.stock);
                const stockDet = [];
                stockDet.push(res.data.stock);
                console.log("productDetails Page");
                console.log(location.state);
                console.log(stock)
                stockDet.map((stock) => {
                    setStock(stock);
                    return(<></>)
                });
            });
        console.log(stock);
        console.log(location.state);
    },[location.state,stock]

    );
  return (
    <div>
        <Productlist stock = {stock} searchinput = {location.state}/>
    </div>
  )
}

export default ProductListing;