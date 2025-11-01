
// Language modal
console.log('Script starting...');
const modal = document.querySelector('#lang-modal');
console.log('Modal found:', !!modal);
document.querySelector('#open-lang')?.addEventListener('click', ()=> modal.showModal());
document.querySelector('#close-lang')?.addEventListener('click', ()=> modal.close());
Array.from(document.querySelectorAll('[data-lang]')).forEach(b=>{
  b.addEventListener('click', ()=>{ applyLang(b.dataset.lang); modal.close(); });
});
console.log('Language modal setup complete');

// Contact form
const form = document.querySelector('#contact-form');
const notice = document.querySelector('#form-msg');
function show(msg, err){ if(!notice) return; notice.style.display='block'; notice.textContent=msg; notice.style.color = err?'#ff8fb0':'#22c55e'; setTimeout(()=>notice.style.display='none', 4000); }


// GetForm integration
form?.addEventListener('submit', (e)=>{
  const name = (document.querySelector('#name')?.value || '').trim();
  const email = (document.querySelector('#email')?.value || '').trim();
  const message = (document.querySelector('#message')?.value || '').trim();

  if(!name || !email || !message){
    e.preventDefault();
    show('Please fill in all required fields.', true);
    return;
  }

  show('Sending message...', false);
});

// Year
const y = document.querySelector('#y'); if (y) y.textContent = new Date().getFullYear();
