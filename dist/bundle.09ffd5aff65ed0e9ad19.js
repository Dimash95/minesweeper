!function(){"use strict";const t=document.body,e=document.createElement("header");e.classList.add("header"),t.appendChild(e);const n=document.createElement("h1");n.classList.add("title"),e.appendChild(n),n.textContent="Minesweeper";const a=document.createElement("main");a.classList.add("main"),t.appendChild(a);const d=document.createElement("div");d.classList.add("desk"),a.appendChild(d);const s=document.createElement("div");s.classList.add("mins"),s.textContent="10 💣",d.appendChild(s);const c=document.createElement("div");c.classList.add("reset"),d.appendChild(c);const o=document.createElement("a");o.classList.add("smile"),c.appendChild(o),o.textContent="😎",o.href="#",o.addEventListener("click",(()=>(location.reload(),!1)));const i=document.createElement("div");i.classList.add("timer"),d.appendChild(i),i.textContent="10:00";const r=document.createElement("div");r.classList.add("minesweeper"),a.appendChild(r);const l=document.createElement("div");l.classList.add("field"),r.appendChild(l);const u=document.createElement("div");u.classList.add("click"),r.appendChild(u);const m=10,f=10;let p=10,C=0,L=10,h=0,v=0;const x=m*f;l.innerHTML='<button class="button"></button>'.repeat(x);const E=[...l.children];document.querySelectorAll(".button");let g=x,$=[];l.addEventListener("click",(function(t){const e=E.indexOf(t.target);b(e),"10:00"===i.textContent&&function(){const t=setInterval((function(){1==c.clicked&&(clearInterval(t),console.log(5));let e="";0===h&&(L-=1,h=60),h--,e=h<10?`0${L}:0${h}`:`0${L}:${h}`,v=60*L+h,i.textContent=e,0===L&&0===h&&(clearInterval(t),alert("Game over. Try again")),0===L&&0===h&&clearInterval(t)}),1e3)}()}),{once:!0});const b=t=>{let e=[];for(let t=0;t<100;t++)e.push(`${t}`);e.splice(t,1);for(let t=0;t<10;t++){let n=Math.floor(100*Math.random());e[n]?($.push(e[n]),e.splice(n,1)):t--}$=Array.from($,Number)};function k(t,e){return t>=0&&t<f&&e>=0&&e<m}function M(t,e){if(!k(t,e))return;const n=E[t*m+e];if(!0===n.disabled)return;if(n.classList.add("opened"),n.disabled=!0,T(t,e))return n.innerHTML="💣",void alert("Game over. Try again");if(g--,g<=10)return void alert(`Hooray! You found all mines in ${v} seconds and ${C} moves!`);const a=function(t,e){let n=0;for(let a=-1;a<=1;a++)for(let d=-1;d<=1;d++)T(t+d,e+a)&&n++;return n}(t,e);if(0!==a)return n.innerHTML=a,void(1===a?n.classList.add("one"):2===a?n.classList.add("two"):3===a?n.classList.add("three"):4===a&&n.classList.add("four"));for(let n=-1;n<=1;n++)for(let a=-1;a<=1;a++)M(t+a,e+n)}function T(t,e){if(!k(t,e))return!1;const n=t*m+e;return $.includes(n)}l.addEventListener("click",(function(t){if("BUTTON"!==t.target.tagName)return;const e=E.indexOf(t.target),n=e%m;M(Math.floor(e/m),n),H()})),l.addEventListener("contextmenu",(function(t){t.preventDefault(),t.target.classList.contains("opened")||(""===t.target.textContent&&p>0?(t.target.textContent="🚩",p-=1):"🚩"===t.target.textContent&&(t.target.textContent="",p+=1),y())}));const y=()=>{s.textContent=`${p} 💣`},H=()=>{C+=1,u.textContent=`Click - ${C}`}}();