/* Google Analytics 4 (G-777H7XTXG5) */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-777H7XTXG5');
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a,button');
  if (!a) return;
  var href = a.getAttribute('href') || '';
  var label = (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
  if (href.indexOf('mailto:') === 0) {
    gtag('event', 'contact_email_click', { link_url: href, link_text: label });
  } else if (/(^|\/)(brief|book)(\/|$)|#contact|#book/.test(href)) {
    gtag('event', 'contact_click', { link_url: href, link_text: label });
  } else if (a.closest('#packages, .packages, .pkg, .price-card, .package') || a.classList.contains('btn') || a.classList.contains('cta')) {
    gtag('event', 'cta_click', { link_url: href, link_text: label });
  }
}, true);
