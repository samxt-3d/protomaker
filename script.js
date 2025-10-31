
// Language modal
const modal = document.querySelector('#lang-modal');
document.querySelector('#open-lang')?.addEventListener('click', ()=> modal.showModal());
document.querySelector('#close-lang')?.addEventListener('click', ()=> modal.close());
Array.from(document.querySelectorAll('[data-lang]')).forEach(b=>{
  b.addEventListener('click', ()=>{ applyLang(b.dataset.lang); modal.close(); });
});

// Contact form
const form = document.querySelector('#contact-form');
const notice = document.querySelector('#form-msg');
function show(msg, err){ if(!notice) return; notice.style.display='block'; notice.textContent=msg; notice.style.color = err?'#ff8fb0':'#22c55e'; setTimeout(()=>notice.style.display='none', 4000); }
function openMail(){
  const n = encodeURIComponent(document.querySelector('#name')?.value || '');
  const t = encodeURIComponent(document.querySelector('#type')?.value || '');
  const m = encodeURIComponent(document.querySelector('#message')?.value || '');
  const subject = `Proto‑Maker inquiry — ${t}`;
  const body = `Name: ${n}%0D%0AType: ${t}%0D%0A%0D%0A${m}`;
  location.href = `mailto:samxt37@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  show('Opening your mail app…', false);
}
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = (document.querySelector('#name')?.value || '').trim();
  const email = (document.querySelector('#email')?.value || '').trim();
  const message = (document.querySelector('#message')?.value || '').trim();
  if(!name || !email || !message){ show('Please fill in all required fields.', true); return; }
  openMail();
});
document.querySelector('#mailto')?.addEventListener('click', openMail);

// Year
const y = document.querySelector('#y'); if (y) y.textContent = new Date().getFullYear();
