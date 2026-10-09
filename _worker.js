// Cloudflare Worker - copon.site proxy + CPA locker injection
const UPSTREAM = 'https://ani.pm';
const EMBED_HOST = 'embed.settlar.io';
const MEDIA_HOST = 'media.settlar.io';
const FALLBACK_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

const TRACKER_RE = [
  /<script[^>]*src="https:\/\/static\.cloudflareinsights\.com\/[^"]*"[^>]*>\s*<\/script>/g,
  /<script[^>]*src="https:\/\/static\.cloudflareinsights\.com\/[^"]*"[^>]*\/>/g,
  /<script[^>]*src="https?:\/\/llvpn\.com\/[^"]*"[^>]*>\s*<\/script>/g,
  /<script>\s*\(function\(\w+\)\{\w+\.dataset\.zone=[\s\S]*?<\/script>/g,
  /<script>\s*\(function\(\)\{var S="\/\/[^"]*"[^<]*?__anipmPopAd[\s\S]*?<\/script>/g,
  /<script[^>]*data-cfasync="false"[^>]*>[\s\S]*?<\/script>/g,
];

const REWARDED_BREAK = '" + <script>\n(function(){\n  try{console.log(\'[gate] v3 fullpage-locker appcomplete\');}catch(e){}\n  if(window.__rbd){return;}\n  window.__rbd=1;\n  var BREAK_AT=(location.search.indexOf(\'gatetest\')!==-1?10:120),BREAK_LEN=15,AD_HTML=\'\';\n  var passed=false,busy=false,disclosed=false;\n  function log(){try{if(location.search.indexOf(\'gatetest\')!==-1||location.search.indexOf(\'gatedebug\')!==-1)console.log.apply(console,[\'[gate]\'].concat([].slice.call(arguments)));}catch(e){}}\n  // The parent rotates the embed token every ~25s, which reloads this document\n  // and would otherwise reset the gate: keep both flags for the tab session,\n  // keyed by the episode page that embedded us so each episode gates on its own.\n  var KEY=\'rbd \'+(document.referrer||\'x\');\n  var fireAt=0;\n  try{\n    var S=JSON.parse(sessionStorage.getItem(KEY)||\'{}\');\n    if(S.passed){passed=true;}\n    if(S.disclosed){disclosed=true;}\n    fireAt=S.fireAt||0;\n  }catch(e){}\n  function save(k,v){try{var c=JSON.parse(sessionStorage.getItem(KEY)||\'{}\');c[k]=(v===undefined?1:v);sessionStorage.setItem(KEY,JSON.stringify(c));}catch(e){}}\n  function st(el,o){for(var k in o){el.style[k]=o[k];}}\n  function mk(t,x){var e=document.createElement(t);if(x!=null){e.textContent=x;}return e;}\n  function frame(){\n    var o=document.createElement(\'div\');\n    st(o,{position:\'fixed\',left:\'0\',top:\'0\',width:\'100%\',height:\'100%\',zIndex:\'2147483000\',\n      background:\'rgba(5,6,9,.95)\',display:\'flex\',flexDirection:\'column\',alignItems:\'center\',\n      justifyContent:\'center\',gap:\'14px\',textAlign:\'center\',padding:\'20px\',color:\'#fff\',\n      fontFamily:"system-ui,-apple-system,\'Segoe UI\',Roboto,sans-serif"});\n    return o;\n  }\n  function h(x,s,w,c){var e=mk(\'div\',x);st(e,{fontSize:s,fontWeight:w,color:c||\'#fff\',maxWidth:\'90%\',lineHeight:\'1.45\'});return e;}\n  function btn(x,fn){var b=mk(\'button\',x);b.type=\'button\';\n    st(b,{cursor:\'pointer\',border:\'0\',borderRadius:\'10px\',padding:\'12px 26px\',fontSize:\'15px\',\n      fontWeight:\'600\',fontFamily:\'inherit\',background:\'#fff\',color:\'#111\'});b.onclick=fn;return b;}\n  function play(v){var p=v.play();if(p&&p.catch){p.catch(function(){});}}\n  function disclose(v){return;}\n  function finish(o,v){\n    if(o.__done){return;} o.__done=true;\n    if(o.parentNode){o.parentNode.removeChild(o);}\n    passed=true;busy=false; save(\'passed\'); save(\'fireAt\',0);\n    try{v.currentTime=BREAK_AT;}catch(e){}\n    play(v);\n  }\n  function fire(v){\n    if(passed||busy){return;} busy=true;\n    try{v.pause();}catch(e){}\n    var td=null;\n    try{if(window.top&&window.top.document&&window.top!==window)td=window.top;}catch(e){}\n    var host=td||window;\n    function inject(w){\n      try{\n        var d=w.document;\n        if(!d.getElementById(\'ogjs\')){\n          var s=d.createElement(\'script\');\n          s.type=\'text/javascript\'; s.id=\'ogjs\';\n          s.src=\'https://appcomplete.org/cl/js/krn8e8\';\n          s.onload=function(){try{console.log(\'[gate] ogjs loaded\');}catch(e){}};\n          s.onerror=function(){try{console.log(\'[gate] ogjs FAILED\');}catch(e){}};\n          (d.head||d.documentElement).appendChild(s);\n        }\n        var tries=0;\n        var piv=setInterval(function(){\n          try{\n            if(typeof w.og_load===\'function\'){clearInterval(piv);w.og_load();console.log(\'[gate] og_load called\');}\n            else if(++tries>=50){clearInterval(piv);console.log(\'[gate] og_load never defined\');}\n          }catch(e){console.log(\'[gate] og_load err \'+e);}\n        },200);\n      }catch(e){}\n    }\n    inject(host);\n    try{\n      host.document.documentElement.style.overflow=\'hidden\';\n      host.document.body.style.overflow=\'hidden\';\n      document.documentElement.style.overflow=\'hidden\';\n      document.body.style.overflow=\'hidden\';\n    }catch(e){}\n    try{var hold=setInterval(function(){try{if(v&&!v.paused)v.pause();}catch(e){}},500);}catch(e){}\n  }\n  function wire(){\n    var vv=document.getElementById(\'player\')||document.querySelector(\'video\');\n    var v=vv||document.querySelector(\'video\');\n    if(!v){setTimeout(wire,300);return;}\n    if(v.__rbd){return;} v.__rbd=1;\n    // restore watch counter across token-rotation reloads (~25s)\n    var accumulated=0, lastTime=v.currentTime||0;\n    try{\n      var CC=JSON.parse(sessionStorage.getItem(KEY)||\'{}\');\n      if(typeof CC.acc===\'number\')accumulated=CC.acc;\n      if(typeof CC.lt===\'number\')lastTime=CC.lt;\n    }catch(e){}\n    function saveAcc(){save(\'acc\',accumulated);save(\'lt\',lastTime);}\n    disclose(v);\n    // a token rotation reloaded us mid-countdown: re-enter the same break so\n    // the remaining time carries over instead of the gate silently vanishing\n    if(!passed&&fireAt){\n      if(Date.now()>=fireAt){passed=true;busy=false;save(\'passed\');save(\'fireAt\',0);}\n      else{fire(v);return;}\n    }\n    // resume gate immediately if counter already reached 2:00 before reload\n    if(!passed&&!busy&&accumulated>=BREAK_AT){fire(v);return;}\n    v.addEventListener(\'timeupdate\',function(){\n      if(passed||busy)return;\n      var cur=v.currentTime;\n      var delta=cur-lastTime;\n      if(delta>5){lastTime=cur;saveAcc();fire(v);return;}\n      if(delta>0&&delta<2){\n        accumulated+=delta;\n        save(\'acc\',accumulated);\n        if(accumulated>=BREAK_AT){lastTime=cur;saveAcc();fire(v);return;}\n      } else if(delta<0){lastTime=cur;saveAcc();return;}\n      lastTime=cur;save(\'lt\',lastTime);\n      if(!passed&&!busy&&v.currentTime>=BREAK_AT){fire(v);}\n    });\n    v.addEventListener(\'seeking\',function(){\n      if(passed||busy)return;\n      var cur=v.currentTime;\n      var delta=cur-lastTime;\n      if(delta>5){lastTime=cur;saveAcc();fire(v);return;}\n      if(!passed&&!busy&&v.currentTime>=BREAK_AT){fire(v);return;}\n      lastTime=cur;save(\'lt\',lastTime);\n    });\n    var n=0;\n    var iv=setInterval(function(){\n      n++;\n      var hit=false;\n      var bs=document.querySelectorAll(\'button\');\n      for(var i=0;i<bs.length;i++){\n        var lab=(bs[i].getAttribute(\'aria-label\')||bs[i].textContent||\'\');\n        if(!/forward 10/i.test(lab)){continue;}\n        hit=true;\n        if(bs[i].__rbd){continue;}\n        bs[i].__rbd=1;\n        bs[i].addEventListener(\'click\',function(ev){\n          if(passed||busy){return;}\n          ev.preventDefault();ev.stopPropagation();fire(v);\n        },true);\n      }\n      if(n>80){clearInterval(iv);}\n      else if(hit&&n>8){/* keep watching a bit for late player buttons */ if(n>40)clearInterval(iv);}\n    },400);\n    // if player swaps <video> element (quality change), attach to the new one\n    try{\n      var obs=new MutationObserver(function(){\n        var nv=document.getElementById(\'player\')||document.querySelector(\'video\');\n        if(nv&&!nv.__rbd){nv.__rbd=1;\n          nv.addEventListener(\'timeupdate\',function(){\n            if(passed||busy)return;\n            var cur=nv.currentTime; var delta=cur-lastTime;\n            if(delta>5){lastTime=cur;saveAcc();fire(nv);return;}\n            if(delta>0&&delta<2){accumulated+=delta;save(\'acc\',accumulated);\n              if(accumulated>=BREAK_AT){lastTime=cur;saveAcc();fire(nv);return;}}\n            else if(delta<0){lastTime=cur;saveAcc();return;}\n            lastTime=cur;save(\'lt\',lastTime);\n          });\n        }\n      });\n      obs.observe(document.documentElement,{childList:true,subtree:true});\n    }catch(e){}\n    window.__gateFire=function(){fire(v);};\n    window.__gateReset=function(){try{sessionStorage.removeItem(KEY);}catch(e){} passed=false;busy=false;fireAt=0;accumulated=0;save(\'fireAt\',0);};\n    window.__gateState=function(){return {acc:accumulated,last:lastTime,passed:passed,busy:busy,breakAt:BREAK_AT,hasVideo:!!v,og:typeof window.og_load};};\n  }\n  if(document.readyState===\'loading\'){document.addEventListener(\'DOMContentLoaded\',wire);}\n  else{wire();}\n})();\n</script> + "';

async function fetchWithUA(url, options) {
  options = options || {};
  const headers = new Headers(options.headers || {});
  if (!headers.has('User-Agent')) headers.set('User-Agent', FALLBACK_UA);
  if (!headers.has('Accept-Language')) headers.set('Accept-Language', 'en-US,en;q=0.9');
  if (!headers.has('Referer')) headers.set('Referer', UPSTREAM + '/');
  return fetch(url, {
    method: options.method || 'GET',
    headers: headers,
    body: options.body,
    redirect: 'manual',
  });
}

async function proxyEmbed(request, env) {
  const url = new URL(request.url);
  const local = url.origin;
  const upstreamUrl = 'https://' + EMBED_HOST + url.pathname + url.search;

  const resp = await fetchWithUA(upstreamUrl, {
    method: request.method,
    headers: {
      'User-Agent': request.headers.get('User-Agent') || FALLBACK_UA,
      'Accept': request.headers.get('Accept') || 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Cookie': request.headers.get('Cookie') || '',
    },
  });

  const ctype = resp.headers.get('content-type') || '';
  let body = await resp.arrayBuffer();

  if (/text\/|javascript|json|xml|svg/.test(ctype)) {
    let s = new TextDecoder().decode(body);
    s = s.split('https://embed.settlar.io').join(local + '/__embed');
    s = s.split('https://media.settlar.io').join(local + '/__media');
    s = s.split('"/assets/').join('"/__embed/assets/');
    s = s.split("'/assets/").join("'/__embed/assets/");
    s = s.split('(/assets/').join('(/__embed/assets/');
    for (const re of TRACKER_RE) s = s.replace(re, '');
    s = s.split('https://static.cloudflareinsights.com').join('/_blocked');
    s = s.split('//static.cloudflareinsights.com').join('/_blocked');
    s = s.split('"/cdn-cgi/').join('"/_blocked/');
    s = s.split("'/cdn-cgi/").join("'_blocked/");
    s = s.split('(/cdn-cgi/').join('(/_blocked/');
    if (/^text\/html/.test(ctype) && s.indexOf('__rbd') === -1) {
      s = s.replace(/<\/body>/i, REWARDED_BREAK + '</body>');
    }
    body = new TextEncoder().encode(s);
  }

  const outHeaders = new Headers(resp.headers);
  outHeaders.delete('transfer-encoding');
  outHeaders.delete('connection');
  outHeaders.delete('content-security-policy');
  outHeaders.delete('content-security-policy-report-only');
  outHeaders.delete('x-frame-options');
  outHeaders.delete('content-encoding');
  outHeaders.set('content-length', String(body.byteLength));
  if (/^text\/html/.test(ctype)) {
    outHeaders.set('cache-control', 'no-store, no-cache, must-revalidate');
    outHeaders.set('pragma', 'no-cache');
  }

  return new Response(body, {
    status: resp.status,
    headers: outHeaders,
  });
}

async function proxyMedia(request) {
  const url = new URL(request.url);
  const upstreamUrl = 'https://' + MEDIA_HOST + url.pathname + url.search;
  const resp = await fetchWithUA(upstreamUrl, {
    method: request.method,
    headers: {
      'User-Agent': FALLBACK_UA,
      'Range': request.headers.get('Range') || '',
    },
  });
  const outHeaders = new Headers(resp.headers);
  outHeaders.delete('transfer-encoding');
  outHeaders.delete('connection');
  return new Response(resp.body, {
    status: resp.status,
    headers: outHeaders,
  });
}

async function proxyMcdn(request) {
  const url = new URL(request.url);
  const upstreamUrl = 'https://mcdn.ani.pm' + url.pathname + url.search;
  const resp = await fetchWithUA(upstreamUrl, {
    method: request.method,
    headers: {
      'User-Agent': FALLBACK_UA,
      'Accept': request.headers.get('Accept') || 'application/json',
      'Range': request.headers.get('Range') || '',
    },
  });
  const outHeaders = new Headers(resp.headers);
  outHeaders.delete('transfer-encoding');
  outHeaders.delete('connection');
  return new Response(resp.body, {
    status: resp.status,
    headers: outHeaders,
  });
}

async function proxyApi(request) {
  const url = new URL(request.url);
  const upstreamUrl = UPSTREAM + url.pathname + url.search;
  const clientUA = request.headers.get('User-Agent') || '';
  const ua = /bot|curl|wget|python|axios|go-http/i.test(clientUA) ? FALLBACK_UA : clientUA;
  const resp = await fetchWithUA(upstreamUrl, {
    method: request.method,
    headers: {
      'User-Agent': ua,
      'Accept': request.headers.get('Accept') || '*/*',
      'Cookie': request.headers.get('Cookie') || '',
    },
  });
  const outHeaders = new Headers(resp.headers);
  outHeaders.delete('transfer-encoding');
  outHeaders.delete('connection');
  outHeaders.delete('content-encoding');
  return new Response(resp.body, {
    status: resp.status,
    headers: outHeaders,
  });
}

async function proxyEmbedApi(request) {
  const url = new URL(request.url);
  const upstreamUrl = 'https://' + EMBED_HOST + url.pathname + url.search;
  const resp = await fetchWithUA(upstreamUrl, {
    method: request.method,
    headers: {
      'User-Agent': request.headers.get('User-Agent') || FALLBACK_UA,
      'Accept': request.headers.get('Accept') || 'application/json',
      'Cookie': request.headers.get('Cookie') || '',
    },
  });
  const outHeaders = new Headers(resp.headers);
  outHeaders.delete('transfer-encoding');
  outHeaders.delete('connection');
  outHeaders.delete('content-encoding');
  return new Response(resp.body, {
    status: resp.status,
    headers: outHeaders,
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Media proxy
    if (pathname.startsWith('/__media/')) {
      return proxyMedia(request);
    }

    // Embed proxy (with locker injection)
    if (pathname === '/embed/v1' || pathname.startsWith('/__embed/')) {
      const newPath = pathname.startsWith('/__embed/')
        ? pathname.slice('/__embed'.length) + url.search
        : pathname + url.search;
      const newUrl = new URL(request.url);
      newUrl.pathname = newPath;
      return proxyEmbed(new Request(newUrl.toString(), request), env);
    }
    if (pathname.startsWith('/embed/')) {
      return proxyEmbed(request, env);
    }

    // mcdn proxy
    if (pathname.startsWith('/v1/')) {
      return proxyMcdn(request);
    }

    // Embed API (player internal endpoints)
    if (pathname.startsWith('/api/embed/') || pathname.startsWith('/api/cast/')) {
      return proxyEmbedApi(request);
    }

    // API proxy to upstream
    if (pathname.startsWith('/api/')) {
      return proxyApi(request);
    }

    // Static assets - let Pages handle them (return null to pass through)
    return null;
  },
};