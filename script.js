
// Language modal
const modal = document.querySelector('#lang-modal');
document.querySelector('#open-lang')?.addEventListener('click', ()=> modal.showModal());
document.querySelector('#close-lang')?.addEventListener('click', ()=> modal.close());
Array.from(document.querySelectorAll('[data-lang]')).forEach(b=>{
  b.addEventListener('click', ()=>{ applyLang(b.dataset.lang); modal.close(); });
});

// Initialize EmailJS
(function(){
  emailjs.init({
    publicKey: "61Rz4pNz7NnOzC5Ig", 
  });
})();

// Contact form
const form = document.querySelector('#contact-form');
const notice = document.querySelector('#form-msg');
function show(msg, err){ if(!notice) return; notice.style.display='block'; notice.textContent=msg; notice.style.color = err?'#ff8fb0':'#22c55e'; setTimeout(()=>notice.style.display='none', 4000); }

function sendEmail(){
  console.log('sendEmail called - attempting to send via EmailJS');
  const name = (document.querySelector('#name')?.value || '').trim();
  const email = (document.querySelector('#email')?.value || '').trim();
  const type = (document.querySelector('#type')?.value || '').trim();
  const message = (document.querySelector('#message')?.value || '').trim();

  const templateParams = {
    from_name: name,
    from_email: email,
    project_type: type,
    message: message,
    to_email: 'samxt37@gmail.com'
  };

  console.log('Sending email with params:', templateParams);

  emailjs.send('service_9zhgup4', 'template_qoh446q', templateParams) 
    .then(function(response) {
      console.log('Email sent successfully:', response);
      show('Message sent successfully!', false);
      form.reset();
    }, function(error) {
      console.error('Email send failed:', error);
      show('Failed to send message. Please try again.', true);
    });
}

function openMail(){
  console.log('openMail called - fallback to mailto link');
  const n = encodeURIComponent(document.querySelector('#name')?.value || '');
  const t = encodeURIComponent(document.querySelector('#type')?.value || '');
  const m = encodeURIComponent(document.querySelector('#message')?.value || '');
  const subject = `Proto‑Maker inquiry — ${t}`;
  const body = `Name: ${n}%0D%0AType: ${t}%0D%0A%0D%0A${m}`;
  console.log('Mailto URL:', `mailto:samxt37@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`);
  location.href = `mailto:samxt37@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  show('Opening your mail app…', false);
  console.log('Mailto link opened, showing success message');
}

form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  console.log('Form submitted, preventing default');
  const name = (document.querySelector('#name')?.value || '').trim();
  const email = (document.querySelector('#email')?.value || '').trim();
  const message = (document.querySelector('#message')?.value || '').trim();
  console.log('Form values:', { name, email, message });
  if(!name || !email || !message){
    console.log('Validation failed - missing required fields');
    show('Please fill in all required fields.', true);
    return;
  }
  console.log('Validation passed, calling sendEmail');
  sendEmail();
});
document.querySelector('#mailto')?.addEventListener('click', openMail);

// Year
const y = document.querySelector('#y'); if (y) y.textContent = new Date().getFullYear();
