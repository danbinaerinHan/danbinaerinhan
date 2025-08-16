document.getElementById('switch-en').addEventListener('click', function() {
  document.body.classList.remove('lang-ko');
  document.body.classList.add('lang-en');
});

document.getElementById('switch-ko').addEventListener('click', function() {
  document.body.classList.remove('lang-en');
  document.body.classList.add('lang-ko');
});
