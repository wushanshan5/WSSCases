(function(window){var svgSprite='<svg><symbol id="icon-zhaoxiangji" viewBox="0 0 1024 1024"><path d="M512 288c-124.8 0-224 99.2-224 224s99.2 224 224 224 224-99.2 224-224-99.2-224-224-224z m0 400c-96 0-176-80-176-176s80-176 176-176 176 80 176 176-80 176-176 176zM768 371.2a1.6 1.6 0 1 0 102.4 0 1.6 1.6 0 1 0-102.4 0z" fill="" ></path><path d="M864 224h-96l-22.4-67.2c-6.4-16-25.6-28.8-41.6-28.8H320c-19.2 0-35.2 12.8-41.6 28.8L256 224h-96c-54.4 0-96 41.6-96 96v448c0 54.4 44.8 96 96 96h704c54.4 0 96-41.6 96-96V320c0-54.4-41.6-96-96-96z m48 544c0 25.6-22.4 48-48 48H160c-25.6 0-48-22.4-48-48V320c0-25.6 22.4-48 48-48h131.2l9.6-32 22.4-64h377.6l22.4 64 9.6 32H864c25.6 0 48 22.4 48 48v448z" fill="" ></path></symbol><symbol id="icon-search" viewBox="0 0 1024 1024"><path d="M709.086 639.625a46.476 46.476 0 0 1 4.335 3.89l104.926 104.927c19.32 19.32 19.456 50.483 0 69.939a49.323 49.323 0 0 1-69.94 0L643.482 713.455a51.268 51.268 0 0 1-3.892-4.335 296.79 296.79 0 1 1 69.496-69.495zM467.422 689.97a222.55 222.55 0 1 0 0-445.098 222.55 222.55 0 0 0 0 445.098z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)