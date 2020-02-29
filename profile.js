// create constructor function

function Profile(name, email, profession) {
  this.name = name;
  this.email = email;
  this.profession = profession;
}

function UI() { }

UI.prototype.addProfileToUi = function ({ name, email, profession }) {
  let sl = 1;
  const tr = document.createElement('tr');
  tr.className = 'profile-list'
  document.querySelectorAll('.profile-list').forEach(() => {
    sl++
  })
  tr.innerHTML = `
  <th scope="row">${sl}</th>
  <td>${name}</td>
  <td>${email}</td>
  <td>${profession}</td>
  <td>Delete <i class="fas fa-trash delete"></i></td>
  `;
  document.querySelector('#profile-output').appendChild(tr);
};
UI.prototype.clearField = function () {
  document.querySelector('#name').value = '';
  document.querySelector('#email').value ='';
  document.querySelector('#profession').value = '';
}

UI.prototype.deleteProfile = function(target){
  if(target.classList.contains('delete')){
    target.parentElement.parentElement.remove();
  }
  
}
// Show Alert 
UI.prototype.showAlert = function(msgs, className){
  const div = document.createElement('div');
  const form = document.querySelector('form');
  div.textContent = msgs;
  div.className = `alert alert-${className}`;
  document.querySelector('.container').insertBefore(div,form);
  setTimeout(()=>{
    document.querySelector('.alert').remove();
  },2000)

}

document.querySelector('form').addEventListener('submit', e => {

  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const profession = document.querySelector('#profession').value;

  const profile = new Profile(name, email, profession);

  const ui = new UI();
  if (name === '' || email === '' || profession === '') {
    ui.showAlert('please fill the required field', 'danger')
  } else {
    ui.addProfileToUi(profile)
    ui.clearField();
    ui.showAlert('Profile is added successfully', 'success');
  }
  e.preventDefault();
});

// deleting item

document.querySelector('#profile-output').addEventListener('click', e =>{
  const ui = new UI();
  ui.deleteProfile(e.target);
  ui.showAlert('Profile deleted successfully', 'warning')
});


