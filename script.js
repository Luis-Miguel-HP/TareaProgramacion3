const userList = document.getElementById('user-list');
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
let users = [];

function addUser(name, email) {
  const user = {
    id: Date.now().toString(),
    name,
    email,
  };
  users.push(user);
  renderUsers();
}
function renderUsers() {
    userList.innerHTML = '';
    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="btn-edit" data-id="${user.id}">Editar</button>
          <button class="btn-delete" data-id="${user.id}">Eliminar</button>
        </td>
      `;
      userList.appendChild(tr);
    });
  }
  
  function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderUsers();
  }
  
  function editUser(id) {
    const user = users.find(user => user.id === id);
    nameInput.value = user.name;
    emailInput.value = user.email;
    form.setAttribute('data-edit-id', id);
  }
  
  function updateUser(id, name, email) {
    users = users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          name,
          email,
        };
      }
      return user;
    });
    renderUsers();
  }
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name || !email) return;
    const editId = form.getAttribute('data-edit-id');
    if (editId) {
      updateUser(editId, name, email);
      form.removeAttribute('data-edit-id');
    } else {
      addUser(name, email);
    }
    nameInput.value = '';
    emailInput.value = '';
  });
  
  userList.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('btn-delete')) {
      const id = target.getAttribute('data-id');
      deleteUser(id);
    } else if (target.classList.contains('btn-edit')) {
      const id = target.getAttribute('data-id');
      editUser(id);
    }
  });