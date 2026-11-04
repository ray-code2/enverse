// Homepage redesign: poster previews, lightbox, Approach scene, process line, story rail, sticky CTA, form state.
(function(){
  var d=document,rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  function load(v){if(!v.src&&v.dataset.src){v.src=v.dataset.src}}
  // Muted hover previews (mouse only, never with reduced motion)
  d.querySelectorAll('.spec').forEach(function(s){
    var v=s.querySelector('video');if(!v)return;
    function on(){if(rm)return;load(v);s.classList.add('playing');var p=v.play();if(p)p.catch(function(){s.classList.remove('playing')})}
    function off(){if(s.dataset.pin)return;v.pause();s.classList.remove('playing');try{v.currentTime=0}catch(e){}}
    if(fine){s.addEventListener('mouseenter',on);s.addEventListener('mouseleave',off)}
    var b=s.querySelector('.spec-play');
    if(b)b.addEventListener('click',function(){load(v);if(!s.dataset.pin){s.dataset.pin='1';s.classList.add('playing');v.play().catch(function(){});b.setAttribute('aria-label','Pause '+s.dataset.title)}else{delete s.dataset.pin;off();b.setAttribute('aria-label','Play '+s.dataset.title)}});
  });
  // Lightbox with sound
  var lb=d.querySelector('.rd-lb');
  if(lb&&lb.showModal){
    var lv=lb.querySelector('video'),last=null;
    d.querySelectorAll('.spec-open').forEach(function(b){b.addEventListener('click',function(){
      var s=b.closest('.spec'),pv=s.querySelector('video');if(pv)pv.pause();
      last=b;lb.setAttribute('aria-label',s.dataset.title);lv.src=s.dataset.full;lv.muted=false;lb.classList.add('ld');lv.addEventListener('loadedmetadata',function(){lb.classList.remove('ld')},{once:true});d.documentElement.classList.add('lb-open');lb.showModal();requestAnimationFrame(function(){lb.classList.add('on')});
      if(!rm)lv.play().catch(function(){});lb.querySelector('.rd-lb-x').focus();
    })});
    function close(){lv.pause();lv.removeAttribute('src');lv.load();if(lb.open)lb.close()}
    lb.querySelector('.rd-lb-x').addEventListener('click',close);
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    lb.addEventListener('close',function(){lv.pause();lb.classList.remove('on','ld');d.documentElement.classList.remove('lb-open');if(last)last.focus()});
  }
  // Approach sticky scene (desktop, motion allowed)
  var ap=d.querySelector('[data-scene]');
  if(ap&&!rm&&matchMedia('(min-width:1100px)').matches){
    ap.classList.add('scene');var cards=ap.querySelectorAll('.rd-card'),sc=ap.querySelector('.rd-scene');
    function st(){var r=sc.getBoundingClientRect(),h=r.height-innerHeight*.6,p=Math.min(Math.max((120-r.top)/Math.max(h,1),0),.999);var i=Math.floor(p*cards.length);cards.forEach(function(c,k){c.classList.toggle('on',k===i)})}
    addEventListener('scroll',st,{passive:true});st();
  }
  // Process line draws once
  var fl=d.querySelector('.flow');
  if(fl&&'IntersectionObserver' in window){var fo=new IntersectionObserver(function(es){if(es[0].isIntersecting){fl.classList.add('drawn');fo.disconnect()}},{threshold:.2});fo.observe(fl)}else if(fl)fl.classList.add('drawn');
  // Story rail
  var rail=d.querySelector('.rd-rail'),secs=[].slice.call(d.querySelectorAll('[data-step]')),fill=rail&&rail.querySelector('.rd-rail-fill'),hero=d.querySelector('.rd-hero');
  if(rail){
    secs.forEach(function(s,i){var b=d.createElement('a');b.className='dot';b.href='#'+s.id;b.tabIndex=-1;b.style.top=(i/(secs.length-1)*100)+'%';b.style.marginTop='-4px';var t=d.createElement('span');t.textContent=s.dataset.step+' '+s.dataset.name;b.appendChild(t);rail.appendChild(b)});
    var dots=rail.querySelectorAll('.dot');
    function rs(){var y=innerHeight*.4,a=-1;secs.forEach(function(s,i){if(s.getBoundingClientRect().top<y)a=i});
      var fq=d.getElementById('faq');rail.classList.toggle('show',hero.getBoundingClientRect().bottom<0&&(!fq||fq.getBoundingClientRect().top>innerHeight*.6));
      dots.forEach(function(x,i){x.classList.toggle('on',i<=a)});fill.style.transform='scaleY('+Math.max(a,0)/(secs.length-1)+')'}
    addEventListener('scroll',rs,{passive:true});rs();
  }
  // Sticky mobile CTA: after hero, hidden near the booking section
  var sk=d.querySelector('.rd-sticky'),bk=d.getElementById('contact');
  if(sk&&hero&&bk){function ss(){var show=hero.getBoundingClientRect().bottom<0&&bk.getBoundingClientRect().top>innerHeight*.9;sk.classList.toggle('show',show);sk.tabIndex=show?0:-1}addEventListener('scroll',ss,{passive:true});ss()}
  // Booking form: loading state (native validation stays on)
  var f=d.getElementById('book');
  if(f)f.addEventListener('submit',function(){var b=f.querySelector('[type=submit]');b.setAttribute('aria-busy','true');b.textContent='Sending your request'});
})();
