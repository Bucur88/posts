


async function init(){
  const response = await fetch('https://dummyjson.com/posts?limit=5');
  const result = await response.json();
  render(result.posts);
 
}

function render(posts){
  const itemsContainer = document.querySelector("ul");
  posts.forEach(item =>{
    const title = document.createElement("h4");
    const titleContent = document.createTextNode(item.title);
    title.appendChild(titleContent);
    const itemLink = document.createElement("a");
    itemLink.setAttribute("href" , "#");
    itemLink.appendChild(title);
    const itemCard = document.createElement("li");
    itemCard.appendChild(itemLink);
    itemsContainer.appendChild(itemCard);
    const pageTitle = document.querySelector("title")
    pageTitle.innerHTML = item.title;
    itemLink.addEventListener("click", ()=>toggleModal(item.id))

    });
};

async function toggleModal(itemId) {
  const modal = document.querySelector(".modal");
  const modalContainer = document.querySelector(".modal-container");
  modal.classList.add("open");
  
  const response = await fetch(`https://dummyjson.com/posts/${itemId}`);
  const result = await response.json();
  console.log(result);
  
  const title = document.createElement("h1");
  const titleContent = document.createTextNode(result.title);
  title.appendChild(titleContent);
  modalContainer.appendChild(title);
  const resultBody = document.createElement("p");
  const bodyContentResult = document.createTextNode(result.body);
  resultBody.appendChild(bodyContentResult);
  modalContainer.appendChild(resultBody);
  resultBody.style.color = "pink";
  const text = document.createElement("textarea");
  text.innerHTML = result.body;
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "CANCEL";
  const btnContainer =document.createElement("div");
  btnContainer.classList.add("btn-container");
  
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "EDIT";
  modalContainer.appendChild(buttonEdit);
  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "SAVE";
  btnContainer.append(buttonCancel, buttonSave);
  buttonEdit.addEventListener("click" ,()=> {
    
    resultBody.replaceWith(text);

    
    buttonEdit.replaceWith(btnContainer);
  })
  buttonSave.addEventListener("click" ,()=> updatePost(itemId, text.value ))
  buttonCancel.addEventListener("click", ()=> {
    
    modal.classList.remove("open");

  })
  const exitModal = document.querySelectorAll(".modal-exit");
  exitModal.forEach((exit) => {
  exit.addEventListener("click", function (event) {
    modal.classList.remove("open");
    const modalChildren = modalContainer.childNodes;
   modalChildren.forEach(element => {
    if(element.classList && !element.classList.contains("modal-close") ){
      element.remove();
    }
    
   });


   
    
  });
});
}

async function updatePost(itemId, textValue) {
  const result = await fetch(`https://dummyjson.com/posts/${itemId}`, {
  method: 'PUT', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    body: textValue,
  })
})
const response = await result.json();
//updateModal(response);
}






