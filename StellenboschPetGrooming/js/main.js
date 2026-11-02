document.addEventListener('DOMContentLoaded', () => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if(a.getAttribute('href') === current) a.classList.add('active');
  });
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = '<span id="lightbox-close">&times;</span><img id="lightbox-img">';
  document.body.appendChild(lightbox);
  const lbImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src.replace('w=400','w=1200');
      lightbox.style.display = 'flex';
    });
  });
  document.getElementById('lightbox-close').onclick = () => lightbox.style.display='none';
  lightbox.onclick = (e) => { if(e.target===lightbox) lightbox.style.display='none'; }
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
      const body = h.nextElementSibling;
      body.style.display = body.style.display === 'block' ? 'none' : 'block';
      h.classList.toggle('open');
    });
  });
  const services = [
    {name:'Basic Grooming', price:'R250', desc:'Wash, brush, nail trim for dogs & cats in Stellenbosch.'},
    {name:'Full Spa Package', price:'R450', desc:'Full groom, de-shed, teeth, cologne.'},
    {name:'Puppy First Groom', price:'R200', desc:'Gentle intro for puppies.'},
    {name:'Cat Grooming', price:'R350', desc:'Stress-free cat grooming.'}
  ];
  const listContainer = document.getElementById('dynamic-services');
  if(listContainer){
    const render = (filter='') => {
      listContainer.innerHTML='';
      services.filter(s=> s.name.toLowerCase().includes(filter.toLowerCase())).forEach(s=>{
        const card = document.createElement('div');
        card.className='card fade-in';
        card.innerHTML=`<h3>${s.name}</h3><p>${s.desc}</p><strong>${s.price}</strong><br><button class="btn" onclick="openModal('${s.name}')">Enquire</button>`;
        listContainer.appendChild(card);
      });
    };
    render();
    const searchInput = document.getElementById('service-search');
    if(searchInput) searchInput.addEventListener('input', e=> render(e.target.value));
  }
  window.openModal = (serviceName) => {
    document.getElementById('booking-modal').style.display='flex';
    document.getElementById('modal-service').value = serviceName;
  }
  window.closeModal = () => document.getElementById('booking-modal').style.display='none';
  if(document.getElementById('map')){
    const map = L.map('map').setView([-33.9321, 18.8602], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([-33.9321, 18.8602]).addTo(map).bindPopup('Stellenbosch Pet Grooming<br>8 Bird St, Stellenbosch').openPopup();
  }
  const enquiryForm = document.getElementById('enquiryForm');
  if(enquiryForm){
    enquiryForm.addEventListener('submit', e=>{
      e.preventDefault();
      let valid = true; let msg='';
      const name = document.getElementById('enq-name').value.trim();
      const email = document.getElementById('enq-email').value.trim();
      const phone = document.getElementById('enq-phone').value.trim();
      if(name.length < 3){ valid=false; msg+='Name must be 3+ chars<br>'; }
      if(!/^\S+@\S+\.\S+$/.test(email)){ valid=false; msg+='Valid email required<br>'; }
      if(!/^\d{10}$/.test(phone.replace(/\s/g,''))){ valid=false; msg+='10 digit phone required<br>'; }
      const errorBox = document.getElementById('form-error');
      const successBox = document.getElementById('form-success');
      if(!valid){ errorBox.innerHTML=msg; errorBox.style.display='block'; successBox.style.display='none'; return; }
      errorBox.style.display='none';
      successBox.innerHTML=`Thanks ${name}! Your enquiry for ${document.getElementById('enq-service')?.value} received.<br>Cost: R250-R450, Available: Mon-Sat 8am-5pm. We'll email you at ${email} within 2 hours.`;
      successBox.style.display='block';
      enquiryForm.reset();
    });
  }
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', e=>{
      e.preventDefault();
      const email = document.getElementById('cont-email').value;
      const message = document.getElementById('cont-message').value;
      if(message.length < 10){ alert('Message must be 10+ characters'); return; }
      document.getElementById('contact-success').innerHTML=`Message compiled! To: info@stellenboschpetgrooming.co.za<br>From: ${email}`;
      document.getElementById('contact-success').style.display='block';
      window.location.href = `mailto:info@stellenboschpetgrooming.co.za?subject=Enquiry from ${email}&body=${encodeURIComponent(message)}`;
    });
  }
});
