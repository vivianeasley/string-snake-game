(()=>{var c=document.querySelector("main"),f=25,h=25,l,n;c.setAttribute("style","line-height:0.65rem;max-width:200px");x();function x(){let t={g:[],h:{x:Math.floor(f/2),y:Math.floor(h/2)},t:{x:Math.floor(f/2),y:Math.floor(h/2)},f:{x:Math.floor(f/2),y:Math.floor(h/2)+5},d:["D"]};for(let e=0;e<h;e++){t.g[e]=[];for(let o=0;o<f;o++)t.h.x===o&&t.h.y===e||t.t.x===o&&t.t.y===e?t.g[e][o]=2:t.f.x===o&&t.f.y===e?t.g[e][o]=3:t.g[e][o]=1}l=t,n=t,y(l),setTimeout(()=>{d()},1e3),document.addEventListener("keydown",e=>{a(e)},!1)}function d(){let t=!1,e={D:{x:0,y:1},L:{x:-1,y:0},R:{x:1,y:0},U:{x:0,y:-1}},o=l.h.x+e[l.d[l.d.length-1]].x,i=l.h.y+e[l.d[l.d.length-1]].y;if(!l.g[i]||!l.g[i][o]){window.alert("you lost");return}if(l.g[i][o]===2){window.alert("you lost");return}if(l.g[i][o]===3&&(t=!0),l={...n},n.g[i][o]=2,n.d.push(n.d[n.d.length-1]),n.h.x=o,n.h.y=i,t){let r=u(l);n.g[r.y][r.x]=3}else{let r=n.d.shift(),g=n.t.x+e[r].x,s=n.t.y+e[r].y;n.g[n.t.y][n.t.x]=1,n.t.x=g,n.t.y=s}y(n),setTimeout(()=>{d()},200)}function u(t){let e=!0;for(;e;){let o=Math.floor(Math.random()*25),i=Math.floor(Math.random()*25);if(t.g[i][o]===1)return e=!1,{x:o,y:i}}}function a(t){if(!t)return;let e={37:"L",38:"U",39:"R",40:"D"};n.d[n.d.length-1]=e[t.keyCode]}function y(t){let e={1:"\u25A1",2:"\u25A0",3:"\u25A0"},o="";for(let i=0;i<t.g.length;i++){o+=`

`;for(let r=0;r<t.g[i].length;r++)t.g[i][r]&&(o+=e[t.g[i][r]])}c.textContent=o}})();
