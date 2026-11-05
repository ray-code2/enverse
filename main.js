document.getElementById('y').textContent=new Date().getFullYear();
// Newsletter posts to the Enverse Google Apps Script, which saves the subscriber and sends the welcome note.
function nlDone(f){
  f.classList.add('is-done');
  const s=f.querySelector('.status');
  if(s)s.textContent='Thank you. Your welcome note is on its way.';
}
document.querySelectorAll('form[name=newsletter]').forEach(f=>f.addEventListener('submit',e=>{
  const hp=f.querySelector('[name=_honey]');
  if(hp&&hp.value){e.preventDefault();return;}
  if(!window.fetch)return;
  e.preventDefault();
  const b=f.querySelector('[type=submit]'), label=b?b.textContent:'';
  if(b){b.setAttribute('aria-busy','true');b.disabled=true;b.textContent='Subscribing';}
  fetch(f.action,{method:'POST',mode:'no-cors',body:new URLSearchParams(new FormData(f))})
    .then(()=>{nlDone(f);f.reset();})
    .catch(()=>{const s=f.querySelector('.status');if(s)s.textContent='Something went wrong. Please try again in a moment.';})
    .finally(()=>{if(b){b.removeAttribute('aria-busy');b.disabled=false;b.textContent=label;}});
}));
if(new URLSearchParams(location.search).get('subscribed')==='1'){
  document.querySelectorAll('form[name=newsletter]').forEach(nlDone);
  const n=document.getElementById('newsletter');
  if(n&&!location.hash)n.scrollIntoView();
}

// Hero spec ad carousel.
// HERO_SLIDES is the single list of hero ads, shown in this order.
// To add the Enverse company profile ad as the FIRST slide, put its files in
// assets/hero-ad/ and add one entry at the top of the array, e.g.:
//   {src:'assets/hero-ad/enverse-profile.mp4', poster:'assets/hero-ad/enverse-profile-poster.jpg',
//    title:'Enverse: "Company profile"', label:'Enverse company profile ad', caption:'Made by Enverse.'},
// The counter, arrows and captions update automatically. Set ratio:'4/5' for 4:5 videos (default is 9:16); leave caption '' to show the title only.
const HERO_SLIDES=[
  {src:'assets/hero-ad/company-v4.mp4',poster:'assets/hero-ad/company-v4-poster.webp',title:'Enverse: Behind the company',label:'Enverse ad, Behind the company',caption:'',ratio:'9/16'},
  {src:'work/media/poppi-3pm-issue.mp4',poster:'work/media/poppi-3pm-issue.webp',title:'Poppi: "The 3 PM Issue"',label:'Poppi spec ad, The 3 PM Issue',caption:'Spec ad by Enverse, not affiliated with Poppi.'},
  {src:'assets/spec/lexus-everyone-fits-now-v4.mp4',poster:'assets/spec/lexus-everyone-fits-now-v4-poster.webp',title:'Lexus: "Everyone Fits Now"',label:'Lexus spec ad, Everyone Fits Now',caption:'Concept work by Enverse, not affiliated with Lexus.'},
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
    w.classList.toggle('is-45',s.ratio==='4/5');v.width=1080;v.height=s.ratio==='4/5'?1350:1920;
    cap.textContent='';const b=document.createElement('strong');b.textContent=s.title;cap.append(b);if(s.caption)cap.append(' · '+s.caption);
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

// Simple poster + play button players (e.g. About section company ad)
document.querySelectorAll('.vplayer').forEach(w=>{
  const v=w.querySelector('video'),b=w.querySelector('.play-btn');
  b.addEventListener('click',()=>{w.classList.add('playing');v.controls=true;v.muted=false;v.play().catch(()=>w.classList.remove('playing'));});
  v.addEventListener('ended',()=>{w.classList.remove('playing');v.controls=false;v.load();});
});
