(this.webpackJsonpmochimo_wallet=this.webpackJsonpmochimo_wallet||[]).push([[0],{237:function(e,t,a){"use strict";(function(e){var n=a(13),c=a(8),r=a(16),s=a(9),i=a(17),o=a(238),l=a(59),d=a(1),u=a(35),b=a(5),j=a(25),h=a(30),O=a(132),m=a(28),v=a(0);a(168).Wots;t.a=Object(r.b)(null,(function(e){return Object(n.a)({dispatch:e},Object(j.a)({SET_BALANCE:h.b},e))}))((function(t){var a=Object(d.useState)(void 0),n=Object(c.a)(a,2),j=n[0],h=n[1],f=Object(d.useState)(void 0),p=Object(c.a)(f,2),x=p[0],g=p[1],N=Object(d.useState)(),y=Object(c.a)(N,2),A=(y[0],y[1]),w=Object(d.useState)(),_=Object(c.a)(w,2),S=_[0],C=_[1],E=Object(r.c)((function(e){return e.wallet})),T=Object(s.g)(),L=(T.path,T.url),k=function(a){switch(a.target.id){case"newBalance":C(!S);break;case"balanceCreate":var n=Object(b.e)(Object(b.h)(Object(b.h)(E.secret+E.many_balances)+x),j);return j?Object(b.c)(e.from(n[0]).toString("hex")).then((function(e){return Object(O.isEmpty)(e)?Object(b.g)().then((function(e){return m.a.success(' TAG : "'.concat(j,'" is pending activation')),t.SET_BALANCE(E.many_balances,Object(b.h)(E.secret+E.many_balances),0,e,j,0,n,0),C(!S)})):m.a.error('Activation TAG : "'.concat(j,'" failed'))})):Object(b.g)().then((function(e){return t.SET_BALANCE(E.many_balances,Object(b.h)(E.secret+E.many_balances),0,e,j,"untagged",n,0),C(!S)}));case"random":h(Object(b.d)(12))}},B=function(e){switch(e.target.id){case"tag":h(e.target.value);break;case"walletPass":A(e.target.value);break;case"spent":g(e.target.value)}};return Object(v.jsxs)(i.a,{children:[Object(v.jsx)("section",{className:"hero",children:Object(v.jsxs)("div",{className:"hero-body",children:[Object(v.jsx)("div",{className:"level-right",children:Object(v.jsx)("div",{className:"level-item p-5",children:Object(v.jsxs)("div",{className:"buttons",children:[Object(v.jsx)("button",{className:"button is-medium",onClick:function(){var e=new Blob([JSON.stringify(E)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="wallet.json",document.body.appendChild(t),t.click(),document.body.removeChild(t)},children:" Download"}),Object(v.jsx)("button",{className:"button is-medium",id:"newBalance",onClick:k,children:" New Balance"})]})})}),Object(v.jsx)(s.c,{children:Object(v.jsx)(i.a,{exact:!1,path:L,children:Object(v.jsx)(o.a,{})})})]})}),Object(v.jsx)(l.a,{isActive:S,setActive:C,save:k,title:"Create a new balance",content:Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(u.a,{id:"tag",label:"Tag",type:"text",placeholder:"Enter a tag",onChange:B,value:j}),Object(v.jsx)(u.a,{id:"spent",label:"spent",type:"text",placeholder:"Enter spent times",onChange:B,value:x}),Object(v.jsx)("button",{onClick:k,id:"random",className:"button is-info",children:" random tag"})]}),children:Object(v.jsx)("button",{className:"button is-success",onClick:k,id:"balanceCreate",children:"Create"})})]})}))}).call(this,a(10).Buffer)},238:function(e,t,a){"use strict";var n=a(16),c=a(239),r=(a(5),a(0));t.a=Object(n.b)(null,null)((function(e){var t=Object(n.c)((function(e){return e.wallet}));return t.balances?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h1",{className:"title",children:" Balances "}),t.many_balances>0?Object.entries(t.balances).map((function(e,t){return Object(r.jsx)(c.a,{balance:e,index:t},e[1].id)})):""]}):Object(r.jsx)("div",{className:"box",children:Object(r.jsx)("p",{children:" no balances "})})}))},239:function(e,t,a){"use strict";(function(e){var n=a(13),c=a(8),r=a(5),s=a(59),i=a(35),o=a(1),l=a(16),d=a(25),u=a(30),b=a(28),j=a(0);a(168).Wots;t.a=Object(l.b)((function(e){return e}),(function(e){return Object(n.a)({dispatch:e},Object(d.a)({SET_BALANCE:u.b,DELETE_BALANCE:u.a,UPDATE_BALANCE:u.d},e))}))((function(t){var a=t.balance;a=a[1];var n=Object(o.useState)(),d=Object(c.a)(n,2),u=d[0],h=d[1],O=Object(o.useState)(""),m=Object(c.a)(O,2),v=m[0],f=m[1],p=Object(o.useState)(),x=Object(c.a)(p,2),g=x[0],N=x[1],y=Object(o.useState)(),A=Object(c.a)(y,2),w=A[0],_=A[1],S=Object(o.useState)(),C=Object(c.a)(S,2),E=(C[0],C[1],Object(o.useState)()),T=Object(c.a)(E,2),L=T[0],k=(T[1],Object(l.c)((function(e){return e.wallet}))),B=e.from(a.wots_address[0]).toString("hex"),D=Object(o.useState)(!0),I=Object(c.a)(D,2),M=I[0],U=I[1];Object(o.useEffect)((function(){a.tag&&1!==parseInt(a.status)&&Object(r.i)(a.tag).then((function(e){return console.log(a.blockStatus),e.success?e.addressConsensus===B?t.UPDATE_BALANCE(a.id,a,"status","1"):Object(r.g)().then((function(e){return e<parseInt(a.blockStatus)+3?console.log("less than 3 block",e):console.log("more than 3 block")}),setTimeout((function(){U(!M)}),4e4)):void U(!M)}))}),[M]);var P=function(e){if("send"===e.target.id){a.wots_address[0],a.wots_address[1];var n=Object(r.e)(Object(r.h)(Object(r.h)(k.secret+k.many_balances+1)+0),a.tag),c=L-(g+500),s=Object(r.b)(a.wots_address[0],a.wots_address,n[0],w.hexToByteArray(),g,c,500),i=Object(r.a)(s),o=JSON.stringify({transaction:i}),l=new XMLHttpRequest;l.open("POST","http://api.mochimo.org:8888/push"),l.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),l.onreadystatechange=function(){4===l.readyState&&(200===l.status?Object(r.g)().then((function(e){b.a.success("Transaction sent"),t.SET_BALANCE(k.many_balances,Object(r.h)(Object(r.h)(k.secret+k.many_balances+1)+0),0,e,a.tag?a.tag:"","2",n,0),t.DELETE_BALANCE(a.id,a)})):200!==l.status&&b.a.error("Failed to send transaction"))},l.send(o)}},W=function(e){switch(e.target.id){case"amount":N(parseInt(e.target.value));break;case"receiver":_(e.target.value)}},F=function(e){switch(e.type){case"mouseenter":f("is-active");break;case"mouseleave":f("")}};return Object(j.jsxs)("div",{className:"card mb-5",children:[Object(j.jsxs)("header",{className:"card-header",children:[Object(j.jsxs)("p",{className:"card-header-title",children:["TAG : ",a.tag]}),Object(j.jsx)("button",{className:"card-header-icon","aria-label":"more options",onClick:function(){Object(r.f)(B).then((function(e){return t.UPDATE_BALANCE(a.id,a,"amount_nmcm",e)}))},children:Object(j.jsx)("span",{className:"icon",children:Object(j.jsx)("i",{className:"fas fa-sync","aria-hidden":"true"})})})]}),Object(j.jsx)("div",{className:"card",children:Object(j.jsx)("div",{className:"card-content",children:Object(j.jsxs)("nav",{className:"level",children:[Object(j.jsx)("div",{className:"level-item has-text-centered",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{className:"heading",children:"Show QR code"}),Object(j.jsx)("p",{className:"title"})]})}),Object(j.jsx)("div",{className:"level-item has-text-centered",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{className:"heading",children:"Total nMCM"}),Object(j.jsx)("div",{className:"title",children:a.amount_nmcm?a.amount_nmcm:Object(j.jsx)("p",{className:"is-loading"})})]})}),Object(j.jsx)("div",{className:"level-item has-text-centered",children:a.name?Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{className:"heading",children:"Name"}),Object(j.jsx)("p",{className:"title",children:a.name})]}):Object(j.jsx)("div",{children:Object(j.jsx)("p",{className:"heading",children:"Un-named"})})}),Object(j.jsx)("div",{className:"level-item has-text-centered",children:Object(j.jsx)("div",{children:Object(j.jsx)("div",{className:"dropdown "+v,onMouseEnter:F,onMouseLeave:F,children:Object(j.jsxs)("div",{className:"dropdown-trigger",children:[Object(j.jsxs)("button",{className:"button","aria-haspopup":"true","data-id":t.index,"aria-controls":"dropdown-menu",children:[Object(j.jsx)("span",{children:"Action"}),Object(j.jsx)("span",{className:"icon is-small",children:Object(j.jsx)("i",{className:"fas fa-angle-down","aria-hidden":"true"})})]}),Object(j.jsx)("div",{className:"dropdown-menu",id:"dropdown-menu",role:"menu",children:Object(j.jsxs)("div",{className:"dropdown-content",children:[Object(j.jsx)("button",{className:"dropdown-item button",onClick:function(){navigator.clipboard.writeText(B)},children:"Copy Wots"}),Object(j.jsx)("hr",{className:"dropdown-divider"}),Object(j.jsx)("div",{className:"dropdown-item",onClick:function(){h(!u)},children:"Send"}),Object(j.jsx)("hr",{className:"dropdown-divider"}),Object(j.jsx)("div",{className:"dropdown-item button is-danger is-outlined",onClick:function(){t.DELETE_BALANCE(a.id,a)},children:"Delete"})]})})]})})})})]})})}),Object(j.jsx)(s.a,{isActive:u,setActive:h,save:P,title:"Send MCM",content:Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("p",{className:"label",children:" Source "}),Object(j.jsx)("div",{className:"select is-link",children:Object(j.jsx)("select",{children:Object(j.jsx)("option",{children:a.tag?a.tag:Object(r.h)(B)})})}),Object(j.jsx)(i.a,{id:"receiver",label:"Receiver",type:"text",placeholder:"********",onChange:W}),Object(j.jsx)(i.a,{id:"amount",label:"Amount",type:"number",placeholder:"********",onChange:W})]}),children:Object(j.jsx)("button",{className:"button is-success",onClick:P,id:"send",children:"Send"})})]})}))}).call(this,a(10).Buffer)},245:function(e,t,a){},247:function(e,t,a){},258:function(e,t){},30:function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"b",(function(){return c})),a.d(t,"d",(function(){return r})),a.d(t,"a",(function(){return s}));var n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,c=arguments.length>4?arguments[4]:void 0;return{type:"SET_WALLET",payload:{wallet_name:void 0,wallet_public:e,wallet_password_hash:t,secret:a,many_balances:n,balances:c,version:"1.0"}}},c=function(e,t,a,n,c,r,s,i){return{type:"SET_BALANCE",payload:{id:e,status:r,balance_hash:t,amount_nmcm:a,blockStatus:n,tag:c,wots_address:s,many_spent:i}}},r=function(e,t,a,n){return{type:"UPDATE_BALANCE",payload:{id:e,balance:t,key:a,value:n}}},s=function(e,t){return{type:"DELETE_BALANCE",payload:{id:e,balance:t}}}},35:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));a(1);var n=a(0),c=function(e){var t=e.id,a=e.label,c=e.type,r=e.placeholder,s=e.onChange,i=e.handleBlur,o=e.value;return Object(n.jsxs)("div",{className:"field",children:[Object(n.jsx)("label",{className:"label",children:a}),Object(n.jsx)("div",{className:"control",children:Object(n.jsx)("input",{className:"input",type:c,placeholder:r,id:t,onChange:function(e){return s(e)},onBlur:i,value:o})})]})}},424:function(e,t){},426:function(e,t){},436:function(e,t){},438:function(e,t){},465:function(e,t){},467:function(e,t){},468:function(e,t){},473:function(e,t){},475:function(e,t){},481:function(e,t){},483:function(e,t){},5:function(e,t,a){"use strict";a.d(t,"c",(function(){return S})),a.d(t,"i",(function(){return C})),a.d(t,"h",(function(){return E})),a.d(t,"j",(function(){return T})),a.d(t,"f",(function(){return L})),a.d(t,"g",(function(){return k})),a.d(t,"d",(function(){return B})),a.d(t,"e",(function(){return D})),a.d(t,"b",(function(){return I})),a.d(t,"a",(function(){return M}));var n=a(240),c=a(60),r=a.n(c),s=a(134),i=a(235),o=a.n(i);function l(e){function t(e,t){return e>>>t|e<<32-t}for(var a,n,c=Math.pow,r=c(2,32),s=[],i=8*e.length,o=l.h=l.h||[],d=l.k=l.k||[],u=d.length,b={},j=2;u<64;j++)if(!b[j]){for(a=0;a<313;a+=j)b[a]=j;o[u]=c(j,.5)*r|0,d[u++]=c(j,1/3)*r|0}for(e+="\x80";e.length%64-56;)e+="\0";for(a=0;a<e.length;a++){if((n=e.charCodeAt(a))>>8)return;s[a>>2]|=n<<(3-a)%4*8}for(s[s.length]=i/r|0,s[s.length]=i,n=0;n<s.length;){var h=s.slice(n,n+=16),O=o;for(o=o.slice(0,8),a=0;a<64;a++){var m=h[a-15],v=h[a-2],f=o[0],p=o[4],x=o[7]+(t(p,6)^t(p,11)^t(p,25))+(p&o[5]^~p&o[6])+d[a]+(h[a]=a<16?h[a]:h[a-16]+(t(m,7)^t(m,18)^m>>>3)+h[a-7]+(t(v,17)^t(v,19)^v>>>10)|0);(o=[x+((t(f,2)^t(f,13)^t(f,22))+(f&o[1]^f&o[2]^o[1]&o[2]))|0].concat(o))[4]=o[4]+x|0}for(a=0;a<8;a++)o[a]=o[a]+O[a]|0}var g=[];for(a=0;a<8;a++)for(n=3;n+1;n--){var N=o[a]>>8*n&255;g.push(N),N.toString(16)}return g}String.prototype.hexToByteArray=function(){for(var e=[],t=0;t<this.length;t+=2)e.push(parseInt(this.substr(t,2),16));return e},Array.prototype.toASCII=function(){for(var e="",t=0;t<this.length;t++)e+=String.fromCharCode(this[t]);return e},String.prototype.toBytes=function(){for(var e=[],t=0;t<this.length;t++)e.push(this.charCodeAt(t));return e},Array.prototype.pushArray=function(e){this.push.apply(this,e)};var d=32;function u(e,t,a){for(var n=w(a),c=b(e),r=[],s=0;s<67;s++){x(s,n);var i=v(c.slice(s*d,d+s*d),0,15,t,n);r.pushArray(i)}return r}function b(e){for(var t=[],a=[],n=0;n<67;n++)t=j(d,[n]),a.pushArray(h(t,e));return a}function j(e,t){for(var a=[],n=e-1;n>=0;n--){var c=t[n];void 0==c?a.push(0):a.push(c)}return a}function h(e,t){var a=[];a=j(d,[3]);var n=m(t,d);a.pushArray(n);var c=m(e,32);return a.pushArray(c),l(a.toASCII())}function O(e,t,a){var n=[];n=j(d,[0]);N(0,a);var c=h(A(a),t);n.pushArray(c),N(1,a);for(var r=h(A(a),t),s=[],i=0;i<d;i++)s.push(e[i]^r[i]);return n.pushArray(s),l(n.toASCII())}function m(e,t){for(var a=[],n=0;n<t;n++)void 0==e[n]?a.push(0):a.push(e[n]);return a}function v(e,t,a,n,c){for(var r=m(e,d),s=t;s<t+a&&s<16;s++)g(s,c),r=O(r,n,c);return r}function f(e,t){for(var a,n=0,c=0,r=0,s=[],i=0;i<e;i++)0==r&&(a=t[n],n++,r+=8),r-=4,s[c]=a>>r&15,c++;return s}function p(e){var t=f(64,e);return t.pushArray(function(e){for(var t=0,a=0;a<64;a++)t+=15-e[a];return t<<=4,f(3,j(Math.round(19/8),y(t)))}(t)),t}function x(e,t){t[5]=[0,0,0,e]}function g(e,t){t[6]=[0,0,0,e]}function N(e,t){t[7]=[0,0,0,e]}function y(e){var t=[];for(0==e&&t.push(e);0!=e;)t.push(255&e),e>>=8;return t}function A(e){for(var t=[],a=0;a<8;a++){void 0==e[a.toString()]&&(e[a.toString()]=[0,0,0,0]);var n=e[a.toString()];t.pushArray(n)}return t}function w(e){for(var t={0:[0,0,0,0],1:[0,0,0,0],2:[0,0,0,0],3:[0,0,0,0],4:[0,0,0,0],5:[0,0,0,0],6:[0,0,0,0],7:[0,0,0,0]},a=0;a<8;a++)t[a.toString()]=j(4,e.slice(4*a,4*a+4));return t}a(1);var _=a(95),S=function(e){return fetch("https://wallet.mochimo.com/fund/".concat(e)).then((function(e){return 200===e.status?null:e.json()}))},C=function(e){return fetch("http://api.mochimo.org:8888/net/resolve/".concat(e)).then((function(e){return e.json()}))};String.prototype.hexToByteArray=function(){for(var e=[],t=0;t<this.length;t+=2)e.push(parseInt(this.substr(t,2),16));return e};var E=function(e){return _(e.toString().replaceAll(","," ")).toString(o.a.enc.Hex).toUpperCase()},T=function(e,t){for(var a=[],n=0;n<32;n++)a.push(e[n]^t[n]);return a},L=function(){var e=Object(s.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://api.mochimo.org:8888/net/balance/".concat(t)).then((function(e){return e.json()})).then((function(e){return e.success?e.quorum[0].balance:L(t)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(s.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=fetch("http://api.mochimo.org:8888/net/chain").then((function(e){return e.json()})).then((function(e){return e.block.height})),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(e){for(var t=["0","2"],a=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],n=0;n<22;n++)t.push(a[Math.floor(16*Math.random())]);return t.join("").toUpperCase()};function D(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,a=l(e+"seed"),c=l(e+"publ"),r=l(e+"addr"),s=u(a,c,r),i=Object(n.a)(s);return i.pushArray(c),i.pushArray(r.slice(0,20)),void 0===t||24!==t.length?i.pushArray([66,0,0,0,14,0,0,0,1,0,0,0]):i.pushArray(t.hexToByteArray()),[i,a,c,r]}function I(e,t,a,n,c,r,s){function i(e){for(var t=[],a=0;a<e;a++)t.push(0);return t}var o=[];if(o.pushArray(i(2)),o.pushArray([57,5]),o.pushArray(i(4)),o.pushArray(m(y(3),2)),o.pushArray(i(16)),o.pushArray(i(96)),o.pushArray(i(2)),2208!==e.length||2208!==a.length||2208!==n.length)return console.log("the input parameters are wrong"),!1;o.pushArray(e),o.pushArray(n),o.pushArray(a);var u=m(y(c),8);o.pushArray(u);var j=m(y(r),8);o.pushArray(j);var h=m(y(s),8);o.pushArray(h);var O=function(e,t,a,n){var c=w(n),r=[],s=[];r=p(e),console.log("lenghts"),console.log(r.length),console.log(r.toString());for(var i=b(t),o=0;o<67;o++){x(o,c);var l=v(i.slice(o*d,d+o*d),0,r[o],a,c);s.pushArray(l)}return s}(l(o.slice(124,6772).toASCII()),t,e.slice(2144,2176),e.slice(2176,2208));return o.pushArray(O),o.pushArray(i(2)),o.pushArray([205,171]),o}function M(e){for(var t="",a=new Uint8Array(e),n=a.byteLength,c=0;c<n;c++)t+=String.fromCharCode(a[c]);return function(e){var t,a,n,c,r,s,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=0,l=0,d="",u=[];if(!e)return e;do{t=63&(r=e.charCodeAt(o++)<<16|e.charCodeAt(o++)<<8|e.charCodeAt(o++))>>18,a=63&r>>12,n=63&r>>6,c=63&r,u[l++]=i.charAt(t)+i.charAt(a)+i.charAt(n)+i.charAt(c)}while(o<e.length);return d=u.join(""),((s=e.length%3)?d.slice(0,s-3):d)+"===".slice(s||3)}(t)}},502:function(e,t){},514:function(e,t){},517:function(e,t){},525:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(42),s=a.n(r),i=(a(245),a(246),a(247),a(17)),o=a.p+"static/media/mochimo-pq-logo.0304aae2.svg",l=a(0),d=function(e){return Object(l.jsxs)("nav",{className:"navbar is-5",role:"navigation","aria-label":"main navigation",children:[Object(l.jsxs)("div",{className:"navbar-brand",children:[e.isAuthenticated?Object(l.jsx)(i.b,{to:"/logged",children:Object(l.jsx)("img",{src:o,style:{height:"60px"}})}):Object(l.jsx)(i.b,{to:"/",children:Object(l.jsx)("img",{src:o,style:{height:"60px"}})}),Object(l.jsxs)("a",{role:"button",className:"navbar-burger","aria-label":"menu","aria-expanded":"false","data-target":"navbarBasicExample",children:[Object(l.jsx)("span",{"aria-hidden":"true"}),Object(l.jsx)("span",{"aria-hidden":"true"}),Object(l.jsx)("span",{"aria-hidden":"true"})]})]}),Object(l.jsxs)("div",{className:"navbar-menu",children:[Object(l.jsx)(u,{}),Object(l.jsx)("div",{className:"navbar-end",children:Object(l.jsx)("div",{className:"navbar-item",children:Object(l.jsxs)("div",{className:"buttons",children:[Object(l.jsxs)(i.b,{to:"/",className:"button is-primary",children:["Current wallet : ",e.isAuthenticated?e.isAuthenticated.wallet_name?e.isAuthenticated.wallet_name:"Un-named":"Not Connected"]}),e.isAuthenticated?Object(l.jsx)(i.b,{to:"logged/settings",className:"button",children:" Settings "}):null]})})})]})]})},u=function(){return Object(l.jsxs)("div",{className:"navbar-start",children:[Object(l.jsx)(i.b,{to:"/",className:"navbar-item",children:"Home"}),Object(l.jsx)(i.b,{to:"/new",className:"navbar-item",children:"New"}),Object(l.jsxs)("div",{className:"navbar-item has-dropdown is-hoverable",children:[Object(l.jsx)("a",{className:"navbar-link",children:"More"}),Object(l.jsxs)("div",{className:"navbar-dropdown",children:[Object(l.jsx)("a",{className:"navbar-item",children:"About"}),Object(l.jsx)("hr",{className:"navbar-divider"}),Object(l.jsx)("a",{className:"navbar-item",children:"Report an issue"})]})]})]})},b=a(9),j=a(16),h=a(13),O=a(8),m=a(5),v=a(25),f=a(30),p=function(e){var t=e.file,a=e.handleInput;return Object(l.jsx)("div",{className:"file has-name is-fullwidth",children:Object(l.jsxs)("label",{className:"file-label",children:[Object(l.jsx)("input",{className:"file-input",type:"file",name:"resume",onChange:a}),Object(l.jsxs)("span",{className:"file-cta",children:[Object(l.jsx)("span",{className:"file-icon",children:Object(l.jsx)("i",{className:"fas fa-upload"})}),Object(l.jsx)("span",{className:"file-label",children:"Choose a file\u2026"})]}),Object(l.jsx)("span",{className:"file-name",children:t?t.name:"load wallet file"})]})})},x=a(35),g=function(e){var t=e.value,a=e.id,n=e.onChange;return Object(l.jsxs)("div",{className:"field",children:[Object(l.jsx)("label",{className:"label",children:"You're seed"}),Object(l.jsx)("div",{className:"control",children:Object(l.jsx)("textarea",{className:"textarea",placeholder:"Textarea",value:t,id:a,onChange:n})})]})};var N=Object(j.b)(null,(function(e){return Object(h.a)({dispatch:e},Object(v.a)({SET_WALLET:f.c},e))}))((function(e){var t=Object(n.useState)(),a=Object(O.a)(t,2),c=(a[0],a[1],Object(n.useState)(null)),r=Object(O.a)(c,2),s=r[0],i=r[1],o=Object(n.useState)(null),d=Object(O.a)(o,2),u=d[0],j=d[1],h=Object(n.useState)(),v=Object(O.a)(h,2),f=v[0],N=v[1],y=Object(n.useState)("file"),A=Object(O.a)(y,2),w=A[0],_=A[1],S=Object(b.f)(),C=function(t){switch(t.target.id){case"submit":switch(w){case"file":var a=u;0===a.wallet_password_hash.toString().localeCompare(Object(m.h)(f))&&(e.SET_WALLET(a.wallet_public,a.wallet_password_hash,a.secret,a.many_balances,a.balances),S.push("/logged"));break;case"recovery":e.SET_WALLET("","",Object(m.h)(f)),S.push("/logged")}break;case"recovery":_("recovery");break;case"file":_("file")}};Object(n.useEffect)((function(){var e=s||new Blob([]),t=new FileReader;t.readAsText(e),t.onload=function(e){return e.target.result?j(JSON.parse(e.target.result)):null}}),[s]);var E=function(e){e.target.files?i(e.target.files[0]):N(e.target.value)};return Object(l.jsx)("section",{className:"hero",children:Object(l.jsx)("div",{className:"hero-body",children:Object(l.jsxs)("div",{className:"box",children:[Object(l.jsx)("div",{className:"tabs",children:Object(l.jsxs)("ul",{onClick:C,children:[Object(l.jsx)("li",{children:Object(l.jsx)("a",{id:"file",children:"File"})}),Object(l.jsx)("li",{children:Object(l.jsx)("a",{id:"other",children:"Other method"})}),Object(l.jsx)("li",{children:Object(l.jsx)("a",{id:"recovery",children:"Mnemonic phrase"})})]})}),"file"===w?Object(l.jsxs)(l.Fragment,{children:[" ",Object(l.jsx)(p,{handleInput:E,file:s}),"  ",Object(l.jsx)(x.a,{type:"password",id:"input",label:"Password",placeholder:"*******",onChange:E})," "]}):Object(l.jsx)(g,{value:f,onChange:E}),Object(l.jsx)("button",{className:"button is-primary",onClick:C,id:"submit",children:"Sign in"})]})})})})),y=a(236),A=a.n(y),w=a(59);var _=Object(j.b)(null,(function(e){return Object(h.a)({dispatch:e},Object(v.a)({SET_WALLET:f.c},e))}))((function(e,t){var c=Object(n.useState)(void 0),r=Object(O.a)(c,2),s=r[0],o=r[1],d=Object(n.useState)(),u=Object(O.a)(d,2),b=u[0],j=u[1],h=Object(n.useState)(),v=Object(O.a)(h,2),f=(v[0],v[1],Object(n.useState)(!1)),p=Object(O.a)(f,2),x=p[0],N=p[1],y=a(401),_=(Math.floor(Math.random()*y.length),function(t){switch(t.target.id){case"random":o(A.a.sampleSize(y,12));break;case"confirmSeed":N(!x);break;case"submit":var a=Array.from(Object(m.h)(s).toUpperCase()),n=Array.from(Object(m.h)(b)),c=Object(m.j)(a,n),r=Object(m.h)(s).toUpperCase();e.SET_WALLET(c,Object(m.h)(b),r),N(!x)}}),S=function(e){switch(e.target.id){case"password":j(e.target.value);break;case"mnemonic":o(e.target.value)}};return Object(l.jsxs)("div",{className:"container",children:[Object(l.jsx)("section",{className:"hero",children:Object(l.jsx)("div",{className:"hero-body",children:Object(l.jsxs)("div",{className:"box",children:[Object(l.jsx)(g,{value:s,onChange:S,id:"mnemonic"}),Object(l.jsx)("button",{className:"button is-primary",onClick:_,id:"random",children:" Generate random seed"}),Object(l.jsxs)("div",{className:"field",children:[Object(l.jsx)("label",{className:"label",children:"Password"}),Object(l.jsx)("div",{className:"control",children:Object(l.jsx)("input",{className:"input",type:"password",placeholder:"********",id:"password",onChange:S})})]}),Object(l.jsx)("button",{className:"button is-primary",onClick:_,id:"confirmSeed",children:"Sign in"})]})})}),Object(l.jsx)(w.a,{isActive:x,setActive:N,content:s?s.toString():null,save:_,title:"Save you're mnemonic words !",children:Object(l.jsx)(i.b,{to:"/logged",className:"button is-success",onClick:_,id:"submit",children:"Words Saved"})})]})})),S=a(237),C=a(28);var E=Object(j.b)((function(e){return e}),null)((function(e){C.a.configure();var t=e.wallet?e.wallet:void 0;return Object(n.useEffect)((function(){window.onbeforeunload=function(){return C.a.error("Save you're wallet"),"You have attempted to leave this page. Are you sure?"}}),[]),Object(l.jsxs)(i.a,{children:[Object(l.jsx)(d,{isAuthenticated:t}),Object(l.jsxs)(b.c,{children:[Object(l.jsx)(b.a,{exact:!0,path:"/",children:Object(l.jsx)("div",{className:"container",children:Object(l.jsx)(N,{})})}),Object(l.jsx)(b.a,{exact:!0,path:"/new",children:Object(l.jsx)(_,{})}),Object(l.jsx)(b.a,{path:"/logged",children:Object(l.jsx)(S.a,{})})]})]})})),T=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,526)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))},L=a(90),k="SET_WALLET",B="UPDATE_WALLET_NAME",D="UPDATE_WALLET_NAME",I="SET_BALANCE",M="UPDATE_BALANCE",U="DELETE_BALANCE",P={password_hash:void 0,many_balances:void 0,red:void 0,green:void 0,blue:void 0,wallet_name:void 0,gift_cards:void 0,mnemonic_hash:void 0,settings:{many_resolve_nodes:void 0,allow_biometrics:void 0,many_balance_quorum:void 0,many_resolve_quorum:void 0,allow_notifications:void 0,many_balance_nodes:void 0,many_send_tx_nodes:void 0},balances:[{id:void 0,status:void 0,balance_hash:void 0,amount_nmcm:void 0,blockStatus:void 0,tag:void 0,wots_address:void 0,many_spent:void 0}]};var W=Object(v.b)({wallet:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case k:return t.payload;case B:Object(h.a)({},e);return Object(h.a)({},e);case I:return Object(h.a)(Object(h.a)({},e),{},{many_balances:e.many_balances+1,balances:Object(h.a)(Object(h.a)({},e.balances),{},Object(L.a)({},e.many_balances,t.payload))});case D:return Object(h.a)({},e);case M:C.a.success("Balance : ".concat(t.payload.id,", Key : ").concat(t.payload.key," updated"));var a=Object(h.a)({},e);return a.balances[t.payload.id][t.payload.key]=t.payload.value,Object(h.a)({},e);case U:var n=Object(h.a)({},e);return delete n.balances[t.payload.id],Object(h.a)({},e);default:return null}}}),F=Object(v.c)(W,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());a(523);s.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(j.a,{store:F,children:Object(l.jsx)(E,{})})}),document.getElementById("root")),T()},59:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(8),c=a(1),r=(a(524),a(42),a(132),a(0)),s=function(e){var t=e.isActive?"is-active":"none",a=Object(c.useState)(),s=Object(n.a)(a,2);s[0],s[1];return Object(r.jsxs)("div",{className:t+" modal",children:[Object(r.jsx)("div",{className:"modal-background",onClick:function(){e.setActive(!e.isActive)}}),Object(r.jsxs)("div",{className:"modal-card",children:[Object(r.jsxs)("header",{className:"modal-card-head",children:[Object(r.jsx)("p",{className:"modal-card-title",children:e.title}),Object(r.jsx)("button",{className:"delete","aria-label":"close",onClick:function(){e.setActive(!e.isActive)}})]}),Object(r.jsx)("section",{className:"modal-card-body",children:e.content}),Object(r.jsxs)("footer",{className:"modal-card-foot",children:[e.children,Object(r.jsx)("button",{className:"button",onClick:function(){e.setActive(!e.isActive)},children:"Cancel"})]})]})]})}}},[[525,1,2]]]);
//# sourceMappingURL=main.66a0c034.chunk.js.map