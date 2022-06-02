const modal = document.querySelector('.modal-container')
const modal2 = document.querySelector('.modal-container_two')

function openModal() {
  modal.classList.add('active')
}

function closeModal() {
  modal.classList.remove('active')
}

function openModalTwo() {
    modal2.classList.add('active')
  }
  
  function closeModalTwo() {
    modal2.classList.remove('active')
  }