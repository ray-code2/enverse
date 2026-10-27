// Phone/tablet menu: burger button + slide-in panel built from the existing primary nav.
// Without this script the normal nav stays visible (CSS only hides it under .js-nav).
(function(){
  var nav=document.querySelector('header .nav-in > nav');
  if(!nav)return;
  var root=document.documentElement, header=nav.closest('.nav-in');
  var svg=function(d){return '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="'+d+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';};
  var links=[].slice.call(nav.querySelectorAll('a'));
  var cta=links.filter(function(a){return a.classList.contains('btn');})[0];

  var bar=document.createElement('div');bar.className='menu-bar';
  if(cta){var c=cta.cloneNode(true);c.classList.add('menu-cta');bar.appendChild(c);}
  var btn=document.createElement('button');
  btn.type='button';btn.className='menu-btn';btn.setAttribute('aria-expanded','false');
  btn.setAttribute('aria-controls','mobile-menu');btn.setAttribute('aria-label','Open menu');
  btn.innerHTML=svg('M4 7h16M4 12h16M4 17h16');
  bar.appendChild(btn);header.appendChild(bar);

  var back=document.createElement('div');back.className='menu-backdrop';
  var panel=document.createElement('div');
  panel.id='mobile-menu';panel.className='menu-panel';
  panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Menu');
  var head=document.createElement('div');head.className='menu-head';
  var t=document.createElement('p');t.className='eyebrow';t.textContent='Menu';
  var close=document.createElement('button');close.type='button';close.className='menu-close';
  close.setAttribute('aria-label','Close menu');close.innerHTML=svg('M6 6l12 12M18 6L6 18');
  head.appendChild(t);head.appendChild(close);panel.appendChild(head);
  var ul=document.createElement('ul');
  links.forEach(function(a){if(a===cta)return;var li=document.createElement('li');li.appendChild(a.cloneNode(true));ul.appendChild(li);});
  panel.appendChild(ul);
  if(cta){var c2=cta.cloneNode(true);c2.className='btn';panel.appendChild(c2);}
  document.body.appendChild(back);document.body.appendChild(panel);
  root.classList.add('js-nav');

  var mq=window.matchMedia('(max-width:860px)'), last=null;
  var focusables=function(){return [].slice.call(panel.querySelectorAll('a[href],button'));};
  function open(){
    last=document.activeElement;root.classList.add('menu-open','menu-lock');
    btn.setAttribute('aria-expanded','true');btn.setAttribute('aria-label','Close menu');
    close.focus();
  }
  function shut(restore){
    if(!root.classList.contains('menu-open'))return;
    root.classList.remove('menu-open','menu-lock');
    btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open menu');
    if(restore!==false)(last&&last.focus?last:btn).focus();
  }
  btn.addEventListener('click',function(){root.classList.contains('menu-open')?shut():open();});
  close.addEventListener('click',function(){shut();});
  back.addEventListener('click',function(){shut();});
  panel.addEventListener('click',function(e){if(e.target.closest('a'))shut(false);});
  document.addEventListener('keydown',function(e){
    if(!root.classList.contains('menu-open'))return;
    if(e.key==='Escape'){e.preventDefault();shut();return;}
    if(e.key==='Tab'){
      var f=focusables(),first=f[0],end=f[f.length-1];
      if(!panel.contains(document.activeElement)){e.preventDefault();first.focus();}
      else if(e.shiftKey&&document.activeElement===first){e.preventDefault();end.focus();}
      else if(!e.shiftKey&&document.activeElement===end){e.preventDefault();first.focus();}
    }
  });
  var onMq=function(){if(!mq.matches)shut(false);};
  mq.addEventListener?mq.addEventListener('change',onMq):mq.addListener(onMq);
})();
