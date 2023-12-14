import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import './App.css'

function App() {
  const [excelFile,setExcelFile]=useState();
  const [loading,setLoading]=useState(false);

  const successToast=(message)=>{
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      toastId:"id1"
    });
  }
  const errorToast=(message)=>{
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      toastId:"id1"
    });
  }
  const handleFileInput=(e)=>{
     let files=e.target.files;
     if(files && files.length>0) setExcelFile(files[0]);
  }

  const handleSubmitFile=async(e)=>{
    try{
      setLoading(true);

      e.preventDefault();
  
      const formData=new FormData();
  
      formData.append("file",excelFile);
  
      await axios({
        url:`${import.meta.env.VITE_BASE_URL}/users/create`,
        method:"POST",
        data:formData
      });

      setLoading(false);

      successToast("Send Certificates to Emails Successfully!")
    }
    catch(error){
      setLoading(false);
      errorToast("Erorr in Sending certificates");
    }
  }
  return (
    <>
      <form id="uploadForm" onSubmit={handleSubmitFile} >
        <div className="card">
          <h3>Upload Excel File</h3>
          <div className="drop_box">
            <header>
              <h4>Select File here</h4>
            </header>
            <p>Files Supported: XLSX</p>
            <input
              type="file"
              onChange={handleFileInput}
              hidden
              id="fileInput"
              accept=".xlsx"
              style={{ display: "none" }}
            />
            <label className="btn" htmlFor="fileInput">
              Choose File
            </label>
            <span id="file-chosen">{excelFile?excelFile.name:"No file chosen"}</span>
          </div>
        </div>
        <button id="submitBtn">{loading ? "Sending..." : "Send certificates"}</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
