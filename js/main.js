const registertoken = localStorage.getItem("register-token")

if (!registertoken) {
  window.location.replace("/login.html");
}


const elList = document.querySelector(".main-hero-list-js");
const elTempLi = document.querySelector(".product-temp").content;
const elOrderTempLi = document.querySelector(".order-temp").content;


const slickList = document.querySelector(".slick-track");
const elOrderList = document.querySelector(".order-list");

// render product to mian page
function renderArr(arr, node){  
  arr.forEach(element => {
    
    const elCloneTemp = elTempLi.cloneNode(true);
    const elImg = `http://localhost:5000/${element.product_img}`
    elCloneTemp.querySelector(".product-order").dataset.id = element.id;         
    elCloneTemp.querySelector(".product-img").src = elImg;
    elCloneTemp.querySelector(".product-img").alt = element.product_name;
    
    elCloneTemp.querySelector(".product-name").textContent = element.product_name;
    elCloneTemp.querySelector(".product-desc").textContent = element.product_desc;
    elCloneTemp.querySelector(".product-price").textContent = element.product_price;
    node.appendChild(elCloneTemp)
  });
}

// get product to mian page
async function getArr(){
  try {
    const res = await fetch(`http://localhost:5000/product`, {
    
    headers:{
      Authorization: registertoken,
    },
  });
  const data = await res.json()
  renderArr(data, elList);
} catch (error) {
  console.log(error);    
}
}

// post order to mian page
async function orderProduct(id){
  const newFormData = new FormData();
  
  newFormData.append("product_id", id)
  
  try {
    const res = await fetch(`http://localhost:5000/order`, {
    method: "Post",
    headers:{
      Authorization: registertoken,
    },
    body: newFormData,
    
  });
  orderGetArr()
} catch (error) {
  console.log(error);    
}
}

// render order to mian page
function orderRenderArr(arr, node){  
  node.innerHTML = "";
  arr.forEach(element => {
    
    const elCloneTemp = elOrderTempLi.cloneNode(true);
    const elImg = `http://localhost:5000/${element.product_img}`
    elCloneTemp.querySelector(".order-img").src = elImg;
    elCloneTemp.querySelector(".order-title").textContent = element.product_name;
    elCloneTemp.querySelector(".order-delet-btn").dataset.id = element.id;
    node.appendChild(elCloneTemp)
  });
  // orderGetArr()
  
}

// get order to mian page
async function orderGetArr(){
  try {
    const res = await fetch(`http://localhost:5000/order`, {
    
    headers:{
      Authorization: registertoken,
    },
  });
  const data = await res.json()
  orderRenderArr(data, elOrderList);
} catch (error) {
  console.log(error);    
}
}

// delete product fnc
async function orderDelete(id){
  try {
    const res = await fetch(`http://localhost:5000/order/${id}`, {
    method: "DELETE",
    headers:{
      Authorization: registertoken,
    },
  });
  const data = await res.json()
  alert(data)
  orderGetArr()
} catch (error) {
  console.log(error);    
}
}

// events
elOrderList.addEventListener("click", evt => {
  if (evt.target.matches(".order-delet-btn")) {
    const productDeletBtb = evt.target.dataset.id;
    console.log(productDeletBtb);
    orderDelete(productDeletBtb);
    
  }
})

elList.addEventListener("click", evt => {
  if (evt.target.matches(".product-order")) {
    const productEditBtb = evt.target.dataset.id;
    orderProduct(productEditBtb);
  }
})

orderGetArr()

getArr()

// carusel
$('.site-list').slick({
  dots: true,
  infinite: true,
  speed: 300,
  arrows: false,
  slidesToShow: 1,
  centerMode: true,
  easing: 'easy',
  variableWidth: true,
  autoplay: true,
  autoplaySpeed: 1000,
});
