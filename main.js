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

// Hero spec ad carousel.
// HERO_SLIDES is the single list of hero ads, shown in this order.
// To add the Enverse company profile ad as the FIRST slide, put its files in
// assets/hero-ad/ and add one entry at the top of the array, e.g.:
//   {src:'assets/hero-ad/enverse-profile.mp4', poster:'assets/hero-ad/enverse-profile-poster.jpg',
//    title:'Enverse: "Company profile"', label:'Enverse company profile ad', caption:'Made by Enverse.'},
// The counter, arrows and captions update automatically.
const HERO_SLIDES=[
  {src:'work/media/ad3.mp4',poster:'assets/hero-ad/ad3-poster.jpg',title:'Poppi: "The 3 PM Issue"',label:'Poppi spec ad, The 3 PM Issue',caption:'Spec ad by Enverse, not affiliated with Poppi.'},
  {src:'work/media/ad4.mp4',poster:'assets/hero-ad/ad4-poster.jpg',title:'Lexus: "Earned, Not Given"',label:'Lexus spec ad, Earned, Not Given',caption:'Spec ad by Enverse, not affiliated with Lexus.'},
  {src:'work/media/ad1.mp4',poster:'assets/hero-ad/ad1-poster.jpg',title:'Chewy: "The Last Scoop"',label:'Chewy spec ad, The Last Scoop',caption:'Spec ad by Enverse, not affiliated with Chewy.'},
  {src:'work/media/ad2.mp4',poster:'assets/hero-ad/ad2-poster.jpg',title:'Duolingo: "Same Café"',label:'Duolingo spec ad, Same Café',caption:'Spec ad by Enverse, not affiliated with Duolingo.'},
];
document.querySelectorAll('.hero-media').forEach(fig=>{
  const w=fig.querySelector('.hero-player'),v=w.querySelector('video'),play=w.querySelector('.hero-play'),
        cap=fig.querySelector('figcaption'),count=fig.querySelector('.hero-count');
  let i=0;
  const reset=()=>{v.pause();w.classList.remove('playing');v.controls=false;};
  const show=n=>{
    reset();i=(n+HERO_SLIDES.length)%HERO_SLIDES.length;const s=HERO_SLIDES[i];
    v.poster=s.poster;v.src=s.src;v.preload='none';v.setAttribute('aria-label',s.label);
    play.setAttribute('aria-label','Play the '+s.label+' with sound');
    cap.textContent='';const b=document.createElement('strong');b.textContent=s.title;cap.append(b,' · '+s.caption);
    count.textContent=(i+1)+' / '+HERO_SLIDES.length;
  };
  play.addEventListener('click',()=>{w.classList.add('playing');v.controls=true;v.muted=false;v.play().catch(()=>w.classList.remove('playing'));});
  v.addEventListener('ended',()=>{reset();v.load();});
  fig.querySelector('.hero-prev').addEventListener('click',()=>show(i-1));
  fig.querySelector('.hero-next').addEventListener('click',()=>show(i+1));
  fig.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(i+1);}else if(e.key==='ArrowLeft'){e.preventDefault();show(i-1);}});
  let x0=null;
  w.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true});
  w.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50)show(dx<0?i+1:i-1);});
  show(0);
});
