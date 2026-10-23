const $ = (selector) => document.querySelector(selector);
let currentPhoto = 1;
const descriptions = ['Общий вид', 'Вид с другой стороны', 'Детали стола', 'Вид основания', 'Габаритный чертёж'];
const hero = $('#hero-image');
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  currentPhoto = Number(button.dataset.photo);
  hero.src = `assets/product-${currentPhoto}.webp`;
  hero.alt = `CORMAK KP202 — ${descriptions[currentPhoto - 1]}`;
  $('#photo-count').textContent = `0${currentPhoto} / 05`;
  document.querySelectorAll('[data-photo]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
}));
function showPhoto(number) {
  $('#large-image').src = `assets/product-${number}.webp`;
  $('#large-image').alt = `CORMAK KP202 — ${descriptions[number - 1]}`;
  $('#photo-dialog').showModal();
}
$('.zoom').addEventListener('click', () => showPhoto(currentPhoto));
$('.drawing-button').addEventListener('click', () => showPhoto(5));
document.querySelectorAll('.request').forEach(b => b.addEventListener('click', () => $('#request-dialog').showModal()));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
$('.print').addEventListener('click', () => window.print());
let requestText = '';
$('#request-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  requestText = `Добрый день!\n\nИнтересует крестовой стол CORMAK KP202 225 × 175 мм.\nКоличество: ${data.get('quantity')} шт.\nГород доставки: ${String(data.get('city')).trim()}.\n\nПрошу подтвердить наличие, срок поставки и итоговую стоимость с НСО и доставкой. Также прошу уточнить комплектацию и гарантию.\nПожалуйста, уточните соотношение указанных на сайте параметров: верниер 2,5 мм / 0,02 мм и шаг винта 2 мм.\n${data.get('question') ? '\nЗадача / вопрос: ' + String(data.get('question')).trim() + '\n' : ''}\nКарточка: https://www.lintsaed.ee/ru/detalnaia_informatsiia/cross-slide-table-cormak-kp202-225175-mm`;
  $('#email-link').href = `mailto:info@lintsaed.ee?subject=${encodeURIComponent('Запрос по CORMAK KP202')}&body=${encodeURIComponent(requestText)}`;
  $('#email-result').hidden = false;
  $('#email-link').focus();
});
$('#copy-request').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(requestText); $('#copy-status').textContent = 'Текст скопирован. Отправьте его на info@lintsaed.ee.'; }
  catch { $('#copy-status').textContent = 'Копирование недоступно. Откройте запрос в почтовой программе.'; }
});
const links = [...document.querySelectorAll('.section-nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => { const active = link.hash === '#' + entry.target.id; link.classList.toggle('active', active); if(active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); }); });
}, { rootMargin: '-80px 0px -55% 0px', threshold: 0 });
document.querySelectorAll('.detail-section').forEach(section => observer.observe(section));
