const uploadForm=document.getElementById("uploadForm");

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

getAllUsers();

uploadForm.addEventListener("submit",async(e)=>{
    e.preventDefault();

    const fileInput=document.getElementById("fileInput");

    if(fileInput.files.length>0){
        const file=fileInput.files[0];
        
        const reader=new FileReader();

        reader.onload=(ev)=>{
           const fileContent=ev.target.result; 

           const workbook=XLSX.read(fileContent,{type:"binary"});

           const sheetName = workbook.SheetNames[0];

           const sheet = workbook.Sheets[sheetName];

           const excelData = XLSX.utils.sheet_to_json(sheet, { header: 2 });

           sendData(excelData)
        }
        
        reader.readAsBinaryString(file);
    }    
    else{
        alert("Pls Upload The File")
    }
})
const sendData=async(excelData)=>{
    try{
        const response=await fetch("http://localhost:3001/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(excelData)
        })
        if(!response.ok) {
            throw new Error(`Erorr in parsing data! Status: ${response.status}`);
        }

        const responseData=await response.json();

        renderUsers(responseData.users);
    }
    catch(error){
        console.log("Erorr in Sending Data",error.message);
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