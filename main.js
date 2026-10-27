document.getElementById('y').textContent=new Date().getFullYear();
// Forms open a prefilled email to hello@ (no third-party form service).
const TO='hello@enversecreative.com';
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(f), s=f.querySelector('.status');
  let subject, body;
  if(f.name==='newsletter'){
    subject='Newsletter signup';
    body='Please add me to The Enverse brief.\n\nEmail: '+(d.get('email')||'');
  }else{
    subject=d.get('_subject')||'New Enverse booking request';
    body=['Name: '+(d.get('name')||''),'Email: '+(d.get('email')||''),'Company: '+(d.get('company')||''),'Monthly ad budget: '+(d.get('budget')||''),'','What we need:',(d.get('message')||'')].join('\n');
  }
  window.location.href='mailto:'+TO+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  if(s)s.textContent='Your email app should open with your message. If not, email us at '+TO+'.';
}));
