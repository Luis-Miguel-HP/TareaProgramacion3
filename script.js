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