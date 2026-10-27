document.getElementById('y').textContent=new Date().getFullYear();
// Submits forms via fetch when a real Formspree endpoint is configured.
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',async e=>{
  const s=f.querySelector('.status');
  if(f.action.includes('YOUR_')){e.preventDefault();s.textContent='Form not connected yet (TODO: set endpoint — see README).';return;}
  e.preventDefault();
  try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});
    s.textContent=r.ok?'Thanks — we\'ll be in touch.':'Something went wrong. Please email us.';if(r.ok)f.reset();}
  catch{s.textContent='Network error. Please try again.';}
}));
