// class Profile
class Profile {
  constructor(id, name, email, profession) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profession = profession
  }
}
// local storage
class Storage{
  static addToStorage(profile){
    let profiles;
    if(localStorage.getItem('profiles') === null){
      profiles = []
    }else{
      profiles =JSON.parse(localStorage.getItem('profiles'))
    }
    profiles.push(profile);
    localStorage.setItem('profiles', JSON.stringify(profiles))
  };
  static getProfileFromStor(){
    let profiles;
    if(localStorage.getItem('profiles')=== null){
      profiles = []
    }else{
      profiles = JSON.parse(localStorage.getItem('profiles'))
    }
    return profiles;
  }
  static displayProfiles(){
    const profiles = Storage.getProfileFromStor();
    profiles.forEach(profile =>{
      const ui = new UI;
      ui.addProfileToUI(profile);
    })
  };
  static deleteFromStorage(id){
    const profiles = Storage.getProfileFromStor();
    profiles.forEach((profile, index)=>{
      if(profile.id === id){
        profiles.splice(index,1);
      }else{
        console.log('no match')
      }
    })
  //  let result =  profiles.filter(profile=>{
  //       return profile.id !== id;
  //   })
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }
}
window.addEventListener('DOMContentLoaded', Storage.displayProfiles);
  
// class UI
class UI {
  constructor() {};
  

  // all prototype added here

  // added profile to the UI 
  addProfileToUI({id, name, email, profession }) {
    // crating tr
    const tr = document.createElement('tr');
    tr.className = 'profile-list'
    tr.innerHTML = `
    <th scope="row">${id}</th>
    <td>${name}</td>
    <td>${email}</td>
    <td>${profession}</td>
    <input type ="hidden" data-id = ${id}>
    <td">Delete <i class="fas fa-trash delete"></i></td>
    `
    document.querySelector('#profile-output').appendChild(tr);
  };
  // clear input field
  clearField(){
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#profession').value = '';
  }
  // delete profile
  deleteProfile(target){
    if(target.classList.contains('delete')){
      const id = Number(target.parentElement.previousElementSibling.dataset.id);
      Storage.deleteFromStorage(id);
      target.parentElement.parentElement.remove()
      const ui = new UI;
      ui.showAlert('Profile successfully deleted', 'warning');
    }
  };
  // show alert
  showAlert(msgs, className){
    const div = document.createElement('div');
    const form = document.querySelector('form');
    div.className = `alert alert-${className}`;
    div.textContent = msgs;

    document.querySelector('.container').insertBefore(div, form);
    setTimeout(()=>{
      document.querySelector('.alert').remove()
    },2000)
  }
  getId(){
    return document.querySelectorAll('tr').length;
  }
  // // search
  searchProfile(search){
    let searchLength = 0;
    document.querySelectorAll('.profile-list').forEach(profName =>{
      const name = (profName.firstElementChild.nextElementSibling.textContent).toLocaleLowerCase();
      if(name.indexOf(search) === -1){
        profName.style.display = 'none';
      }else{
        profName.style.display = 'table-row'
        searchLength++
      }
    })
    const ui = new UI();
    searchLength > 0 ? ui.showAlert(null) : ui.showAlert('No Match', 'danger')
  }
}

// add event listener
document.querySelector('form').addEventListener('submit', e => {

  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const profession = document.querySelector('#profession').value;
  const ui = new UI();
  const id = ui.getId();
  const profile = new Profile(id, name, email, profession);
  if(name === '' || email === '' || profession === ''){
    ui.showAlert('Fill the required filed', 'danger');

  }else{
    ui.addProfileToUI(profile);
    Storage.addToStorage(profile)
    ui.clearField()
    ui.showAlert('Profile Successfully Added', 'success');
  }

  e.preventDefault();
})

// delete profile 
document.querySelector('#profile-output').addEventListener('click', (e)=>{
  const ui = new UI();
  ui.deleteProfile(e.target);
})
// search product
document.querySelector('#search').addEventListener('keyup', e =>{
  const ui = new UI;
  ui.searchProfile((e.target.value).toLocaleLowerCase());
})