const uploadForm=document.getElementById("uploadForm");

let loading=false;
const getAllUsers=async()=>{
    try{
        const response=await fetch("http://localhost:3001/all",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(!response.ok) {
            throw new Error(`Erorr in parsing data! Status: ${response.status}`);
        }
        const responseData=await response.json();
        renderUsers(responseData.users) 
    }
    catch(error){
        console.log("Error in getting users")
    }
}
uploadForm.addEventListener("submit",async(e)=>{
    e.preventDefault();

    const fileInput=document.getElementById("fileInput");

    if(fileInput.files.length>0){
        window.loading=true;
        
        const file=fileInput.files[0];
        
        const formData=new FormData();

        formData.append("file",file)

        await sendData(formData);
    }    
    else{
        window.loading=false;
        alert("Pls Upload The File")
    }
})
const sendData=async(formData)=>{
    try{
        const response=await fetch("http://localhost:3001/create",{
            method:"POST",
            body:formData
        })

        const responseData=await response.json();

        window.loading=false;

        alert("Certificate Sent Successfully")

        renderUsers(responseData.users);
    }
    catch(error){
        window.loading=false;
        alert("Eror in Sending Email");
    }
}
const renderUsers=(usersData)=>{
    let usersContainer=document.getElementById("usersContainer");
    usersContainer.innerText="";
    usersData.forEach((eachUser)=>{
        usersContainer.insertAdjacentHTML("beforeend",`
        <div class="eachUser">
            <p>${eachUser.name}</p> 
            <p>${eachUser.email}</p> 
            <p>${eachUser.phone}</p> 
            <p>${eachUser.amount}</p> 
            <p>${eachUser.no_of_trees}</p> 
        </div>
    `)
    })
}
// getAllUsers();

function onVariableChange(newValue) {
  console.log('Variable changed to:', newValue);
  let submitBtn=document.getElementById("submitBtn");
  if(loading){
    submitBtn.innerText="Submitting...";
  }
  else{
    submitBtn.innerText="Submit";
  }
}

Object.defineProperty(window, 'loading', {
  get: function() {
    return loading;
  },
  set: function(newValue) {
    if (newValue !== loading) {
       loading = newValue;
       onVariableChange(newValue);
    }
  },
  enumerable: true,
  configurable: true
});
