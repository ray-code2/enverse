// Scroll-reveal and text motion. Content stays visible without JS or with reduced motion.
(function(){
  var d=document,root=d.documentElement;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  root.classList.add('mo');
  // Hero headline: word-by-word mask slide-up.
  d.querySelectorAll('main h1').forEach(function(h){
    if(h.querySelector('*'))return;var acc=(h.dataset.accent||'').split(/\s+/);
    var words=h.textContent.trim().split(/\s+/);h.setAttribute('aria-label',h.textContent.trim());
    h.innerHTML=words.map(function(w,i){return '<span class="w'+(acc.indexOf(w)>-1?' ac':'')+'" aria-hidden="true"><span style="transition-delay:'+(150+i*90)+'ms">'+w.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</span></span>'}).join(' ');
    h.classList.add('split');
  });
  var sel='main .eyebrow,main h1,main h2,main .lead,main .sub,main .cta,main section > p,.about-copy > *,.about-media,.hero-media,.faq details,main fieldset';
  var groups='.rd-ads,.rd-3,.rd-stack,.benefits,.tiers,.flow,.journey,.steps,.grid,.starter-grid,.logos';
  var els=[];
  d.querySelectorAll(sel).forEach(function(e){e.classList.add('rv');els.push(e)});
  d.querySelectorAll(groups).forEach(function(g){
    Array.prototype.forEach.call(g.children,function(c,i){if(c.classList.contains('rv'))return;c.classList.add('rv');c.style.setProperty('--dl',Math.min(i,6)*110+'ms');els.push(c)});
  });
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  els.forEach(function(e){io.observe(e)});
  // Safety net: never leave content hidden.
  // Hero backdrop: shapes trail the cursor (lerp 0.08, rAF, transform only). Touch: slow ambient drift.
  var sp=d.querySelector('.hero-splash');
  if(sp){
    var L=[[sp.querySelector('.b1'),.06,1],[sp.querySelector('.b2'),-.035,.7],[sp.querySelector('.b3'),1,0]];
    var hero=sp.parentNode,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
    var tx=0,ty=0,cx=0,cy=0,mx=0,my=0,on=true,raf=0,t0=performance.now(),sy=0;
    function size(){var r=hero.getBoundingClientRect();return r}
    if(fine){hero.addEventListener('pointermove',function(e){var r=size();mx=e.clientX-r.left;my=e.clientY-r.top;tx=mx-r.width/2;ty=my-r.height/2;sp.classList.add('live')},{passive:true});
      hero.addEventListener('pointerleave',function(){tx=0;ty=0;sp.classList.remove('live')})}
    else{hero.addEventListener('pointerdown',function(e){var r=size();tx=(e.clientX-r.left-r.width/2)*.6;ty=(e.clientY-r.top-r.height/2)*.6},{passive:true})}
    addEventListener('scroll',function(){sy=Math.min(scrollY,1200)},{passive:true});
    function loop(t){
      if(!fine){var k=(t-t0)/1000;tx+=(Math.sin(k*.25)*90-tx)*.01;ty+=(Math.cos(k*.2)*60-ty)*.01}
      cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;
      L[0][0].style.transform='translate3d('+(cx*L[0][1]*4)+'px,'+(cy*L[0][1]*4+sy*.18)+'px,0)';
      L[1][0].style.transform='translate3d('+(cx*L[1][1]*4)+'px,'+(cy*L[1][1]*4-sy*.1)+'px,0)';
      if(fine){var r=hero.getBoundingClientRect();L[2][0].style.transform='translate3d('+(cx+r.width/2-200)+'px,'+(cy+r.height/2-200)+'px,0)'}
      raf=on&&!d.hidden?requestAnimationFrame(loop):0}
    function start(){if(!raf&&on&&!d.hidden)raf=requestAnimationFrame(loop)}
    new IntersectionObserver(function(es){on=es[0].isIntersecting;start()}).observe(hero);
    d.addEventListener('visibilitychange',start);
    start();
  }
  addEventListener('beforeprint',function(){els.forEach(function(e){e.classList.add('in')})});
})();
