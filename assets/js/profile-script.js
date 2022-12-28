const btn = document.querySelector('.hamburger');
const box = document.querySelector('.box');

btn.addEventListener('click', function() {
  btn.querySelectorAll('.icon').forEach(function(spanEl) {
    spanEl.classList.toggle('hidden');    
  });
  box.classList.toggle('open');
})
