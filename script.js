document.addEventListener('DOMContentLoaded', function() {
  const enBtn = document.getElementById('switch-en');
  const koBtn = document.getElementById('switch-ko');

  if (enBtn) {
    enBtn.addEventListener('click', function() {
      document.body.classList.remove('lang-ko');
      document.body.classList.add('lang-en');
    });
  }

  if (koBtn) {
    koBtn.addEventListener('click', function() {
      document.body.classList.remove('lang-en');
      document.body.classList.add('lang-ko');
    });
  }
});
