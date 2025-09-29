(function(){
  const C = window.COURSE || {};
  if (C.title) document.getElementById('curso-titulo').textContent = C.title;
  if (C.subtitle) document.getElementById('curso-sub').textContent = C.subtitle;
  if (C.footer) document.getElementById('footer-copy').textContent = C.footer;

  const pres = document.getElementById('presentacion-player');
  pres.innerHTML = C.presentation ? embedHTML(C.presentation) : '<div style="padding:18px;color:#9ca3af">Agregá tu video de presentación en data.js</div>';

  const grid = document.getElementById('grid');
  (C.modules || []).forEach((m,i)=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `<h3>${i+1}. ${escapeHTML(m.title||('Módulo '+(i+1)))}</h3>
      <div class="player player-16x9">${embedHTML(m.video)}</div>
      ${m.desc?`<p>${escapeHTML(m.desc)}</p>`:''}`;
    grid.appendChild(card);
  });

  const cl = document.getElementById('contacto-list');
  (C.contact||[]).forEach(html=>{ const li=document.createElement('li'); li.innerHTML=html; cl.appendChild(li); });

  function escapeHTML(s){return String(s).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
  function embedHTML(v){
    if(!v) return '<div style="padding:18px;color:#9ca3af">Video pendiente</div>';
    if(v.type==='youtube'){const id=ytId(v.url||v.id||'');return `<iframe src="https://www.youtube.com/embed/${id}" title="YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;}
    if(v.type==='drive'){const id=driveId(v.url||v.id||'');return `<iframe src="https://drive.google.com/file/d/${id}/preview" title="Drive" allowfullscreen></iframe>`;}
    if(v.type==='file'){return `<video controls preload="metadata" src="${v.src||''}"></video>`;}
    return '<div style="padding:18px;color:#9ca3af">Formato de video desconocido</div>';
  }
  function ytId(u){try{const url=new URL(u);if(url.hostname.includes('youtu.be'))return url.pathname.slice(1);if(url.searchParams.get('v'))return url.searchParams.get('v');const m=url.pathname.match(/\/embed\/([^\/?]+)/);if(m)return m[1];}catch(e){}return u;}
  function driveId(u){const m=(u||'').match(/\/d\/([^\/]+)\//);return m?m[1]:u;}
})();