// Neha Dadarwala - neha.dadarwala@dal.ca

import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import CustomButton from '../../Components/CustomButton';

const columns = [
  {
    field: 'productName',
    headerName: 'Product',
    width: '570',
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 250,
    align: 'left',
    headerAlign: "left",
  },
];

const BillDetails = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let role = localStorage.getItem('role')
    if (role !== 'admin' && role !== 'sales associate') {
      navigate('/Login')
    }
  },[navigate]);
  


  const location = useLocation();

  let bill = ""
  let billnumber = ""
  let rows = []
  
  if(location.state){
    bill = location.state.bill
    billnumber = bill._id;
    rows = bill.products  
  }
  const Swal = require('sweetalert2')

  const [selectedRows, setSelectedRows] = useState([]);

 
  const getRefundProducts = () => {
    if (selectedRows.length === 0) {
      Swal.fire('Please select Products to refund')
    } else {
      navigate('/refundBillDetails', {
        state: {
          customerName: bill.customerName,
          selectedRows: selectedRows,
        }
      });
    }
  };


  return (

    <div style={{ height: 400, width: '60%', margin: 'auto', marginTop: '3%' }}>
      <TextField
        variant="standard"
        value={"Bill Number: " + billnumber}
        disabled
        type="text"
        sx={{
          alignItems: 'center',
          display: 'flex',
          marginTop: '3%',
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#444454",
            width: '300px'
          },
        }}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <DataGrid
        GridLinesVisibility="None"
        rows={rows} // from the database call
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            borderRadius: '20px 20px 0px 0px',
            backgroundColor: '#bab79d',
            color: '#444454',
            fontSize: 20,
            fontWeight: 'bold',
          },
          borderRadius: '20px',
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) =>
            selectedIDs.has(row._id),
          );
          setSelectedRows(selectedRows);
        }}
      />
      <CustomButton label="Proceed" type="submit" onclickFunction={getRefundProducts}></CustomButton>
    </div>
  )
}

export default BillDetails