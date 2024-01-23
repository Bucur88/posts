async function init() {
  const response = await fetch('https://dummyjson.com/posts?limit=5');
  const result = await response.json();
  render(result.posts);
}

function render(posts) {
  const itemsContainer = document.querySelector('ul');
  posts.forEach((item) => {
    const title = document.createElement('h4');
    const titleContent = document.createTextNode(item.title);
    title.appendChild(titleContent);
    const itemLink = document.createElement('a');
    itemLink.setAttribute('href', '#');
    itemLink.appendChild(title);
    const itemCard = document.createElement('li');
    itemCard.appendChild(itemLink);
    itemsContainer.appendChild(itemCard);
    itemLink.addEventListener('click', () => toggleModal(item.id));
  });
}

async function toggleModal(itemId) {
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  modal.classList.add('open');

  const response = await fetch(`https://dummyjson.com/posts/${itemId}`);
  const result = await response.json();

  const title = document.createElement('h1');
  const titleContent = document.createTextNode(result.title);
  title.appendChild(titleContent);
  modalContent.appendChild(title);

  const body = document.createElement('p');
  const bodyContent = document.createTextNode(result.body);
  body.appendChild(bodyContent);
  modalContent.appendChild(body);
  body.style.color = 'pink';

  const buttonEdit = document.createElement('button');
  buttonEdit.innerHTML = 'EDIT';
  buttonEdit.classList.add('edit-btn');
  modalContent.appendChild(buttonEdit);
  buttonEdit.addEventListener('click', () =>
    window.open(`/edit-post?postId=${itemId}`, '_blank'),
  );

  const exitModal = document.querySelectorAll('.modal-exit');
  exitModal.forEach((exit) => {
    exit.addEventListener('click', () => {
      modal.classList.remove('open');
      modalContent.remove();
    });
  });
}
