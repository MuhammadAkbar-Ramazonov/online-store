const registertoken = localStorage.getItem("register-token")
const elForm = document.querySelector(".admin-form");
const elFormName = document.querySelector(".input-name");
const elFormDesc = document.querySelector(".input-desc");
const elFormImg = document.querySelector(".input-img");
const elFormPrice = document.querySelector(".input-price");

const elEditForm = document.querySelector(".admin-edit-form");
const elEditFormName = document.querySelector(".input-edit-name");
const elEditFormDesc = document.querySelector(".input-edit-desc");
const elEditFormImg = document.querySelector(".input-edit-img");
const elEditFormPrice = document.querySelector(".input-edit-price");

const elTempLi = document.querySelector(".admin-temp").content;

const productList = document.querySelector(".poroduct-list");

function renderArr(arr, node){
    node.innerHTML = "";
    arr.forEach(element => {
        const elImg = `http://localhost:5000/${element.product_img}`
        const elCloneTemp = elTempLi.cloneNode(true);
        elCloneTemp.querySelector(".product-img").src = elImg;
        elCloneTemp.querySelector(".product-name").textContent = element.product_name;
        elCloneTemp.querySelector(".product-desc").textContent = element.product_desc;
        elCloneTemp.querySelector(".product-price").textContent = element.product_price;
        elCloneTemp.querySelector(".btn-edit").dataset.id = element.id;
        elCloneTemp.querySelector(".btn-delete").dataset.id = element.id;     
        node.appendChild(elCloneTemp);
    });
}

async function getArr(){
    try {
        const res = await fetch(`http://localhost:5000/product`, {
        
        headers:{
            Authorization: registertoken,
        },
    });
    const data = await res.json()
    renderArr(data, productList);
} catch (error) {
    console.log(error);    
}
}

async function postArr(){
    const newFormData = new FormData();
    
    newFormData.append("product_name", elFormName.value.trim())
    newFormData.append("product_desc", elFormDesc.value.trim())
    newFormData.append("product_img", elFormImg.files[0])
    newFormData.append("product_price", elFormPrice.value.trim())
    
    console.log(newFormData);
    try {
        const res = await fetch(`http://localhost:5000/product`, {
        method: "Post",
        headers:{
            Authorization: registertoken,
        },
        body: newFormData,
    });
    getArr()
} catch (error) {
    console.log(error);    
}
}

elForm.addEventListener("submit", evt=> {
    evt.preventDefault();
    
    postArr()
    getArr()
    
})

// delete product fnc
async function deleteProduct(id){
    try {
        const res = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers:{
            Authorization: registertoken,
        },
    });
    const data = await res.json()
    
    console.log(data);
    alert(data)
    getArr()
} catch (error) {
    console.log(error);    
}
}

// edit product fnc
async function editProduct(id){
    const newEditFormData = new FormData();
    
    newEditFormData.append("product_name", elEditFormName.value.trim())
    newEditFormData.append("product_desc", elEditFormDesc.value.trim())
    newEditFormData.append("product_img",  elEditFormImg.files[0])
    newEditFormData.append("product_price",elEditFormPrice.value.trim())
    try {
        const res = await fetch(`http://localhost:5000/product/${id}`, {
        method: "PUT",
        headers:{
            Authorization: registertoken,
        },
        
        body: newEditFormData,
    })
    
    const data = await res.json()
    
    console.log(data);
    alert(data)
    getArr()
    
} catch (error) {
    console.log(error);    
}
}

productList.addEventListener("click", evt => {
    if (evt.target.matches(".btn-edit")) {
        const productEditBtb = evt.target.dataset.id;
        console.log(productEditBtb);
        elEditForm.addEventListener("submit", evt => {
            evt.preventDefault();
            
            editProduct(productEditBtb);
        })
    }
    if (evt.target.matches(".btn-delete")) {
        const productDeletBtb = evt.target.dataset.id;
        console.log(productDeletBtb);
        deleteProduct(productDeletBtb);
        
    }
})

getArr()
