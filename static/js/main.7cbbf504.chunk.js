(this["webpackJsonpxml-to-ipld"]=this["webpackJsonpxml-to-ipld"]||[]).push([[0],{238:function(e,t,n){"use strict";n.r(t);var r=n(140),c=n(7),a=n(113),i=n(54),o=n(0),s=n(84),u=n(8),l=i.f(i.g);t.default=function(e){var t=e.graph,n=e.generating,d=void 0!==n&&n,f=Object(a.a)(e,["graph","generating"]),h=Object(o.useRef)(),b=Object(o.useState)(),j=Object(c.a)(b,2),p=j[0],O=j[1],x=Object(o.useState)(),v=Object(c.a)(x,2),m=v[0],g=v[1];return Object(o.useEffect)((function(){O(function(e){var t=i.h(e).attr("viewBox",[-320,-240,640,480]).attr("width","100%").attr("height","100%"),n=i.c().force("charge",i.b().strength(-1e3)).force("link",i.a().id((function(e){return e.id})).distance(200)).force("x",i.d()).force("y",i.e()).on("tick",(function(){c.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})),r.attr("x1",(function(e){return e.source.x})).attr("y1",(function(e){return e.source.y})).attr("x2",(function(e){return e.target.x})).attr("y2",(function(e){return e.target.y}))})),r=t.append("g").attr("stroke","#FFF").attr("stroke-width",1.5).selectAll("line"),c=t.append("g").attr("stroke","#FFF").attr("stroke-width",1.5).selectAll("circle");return Object.assign(t.node(),{update:function(e){var t=e.nodes,a=e.links,i=new Map(c.data().map((function(e){return[e.id,e]})));t=t.map((function(e){return Object.assign(i.get(e.id)||{},e)})),a=a.map((function(e){return Object.assign({},e)})),c=c.data(t,(function(e){return e.id})).join((function(e){return e.append("circle").attr("r",8).attr("fill",(function(e){return l(e.id)}))})),r=r.data(a,(function(e){return[e.source,e.target]})).join("line"),n.nodes(t),n.force("link").links(a),n.alpha(1).restart()},rezoom:function(){var e=t.node().getBBox(),n=e.x,r=e.y,c=e.width,a=e.height;t.attr("viewBox",[n,r,c,a])}})}(h.current))}),[]),Object(o.useEffect)((function(){t&&(null===p||void 0===p||p.update(t))}),[p,t]),Object(o.useEffect)((function(){d?(m&&clearInterval(m),g(setInterval((function(){return p.rezoom()}),100))):clearInterval(m)}),[p,d]),Object(u.jsx)(s.a.svg,Object(r.a)(Object(r.a)({h:"90vh"},f),{},{ref:h}))}},340:function(e,t){},351:function(e,t){},368:function(e,t){},369:function(e,t){},579:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(235),i=n.n(a),o=n(606),s=n(112),u=n(20),l=n(599),d=n(600),f=n(603),h=n(605),b=n(601),j=n(602),p=n(1),O=n.n(p),x=n(31),v=n(19),m=n(7),g=n(242),k=n(596),y=n(597),w=n(607),N=n(604),E=n(598),T=n(34),S=n(68),D=n(236),C=n.n(D),F=n(9),I=n.n(F),A=C()({port:5001}),P=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-";return e.split(t).map((function(e,t){return 0===t?e:e[0].toUpperCase()+e.slice(1)})).join("")},_=function(e){var t,n=e.node,r=e.children,c=e.depth,a=e.left,i=e.right,o={name:n.localName,children:r,depth:c,left:a,right:i};return o.type=function(){switch(n.nodeType){case Node.ELEMENT_NODE:return"element";case Node.TEXT_NODE:return"text";case Node.ATTRIBUTE_NODE:return"attribute";case Node.CDATA_SECTION_NODE:return"cdata";case Node.ENTITY_REFERENCE_NODE:return"reference";case Node.ENTITY_NODE:return"entity";case Node.PROCESSING_INSTRUCTION_NODE:return"instruction";case Node.COMMENT_NODE:return"comment";case Node.DOCUMENT_NODE:return"document";case Node.DOCUMENT_TYPE_NODE:return"doctype";case Node.DOCUMENT_FRAGMENT_NODE:return"fragment";case Node.NOTATION_NODE:return"notation";default:return"unknown"}}(),"text"!==o.type&&"cdata"!==o.type||(delete o.name,o.value=n.textContent,!/^\n\s*$/.test(o.value))?(0===r.length&&delete o.children,o.attributes=Object.fromEntries(Object(v.a)(null!==(t=n.attributes)&&void 0!==t?t:[]).map((function(e){var t=e.value;return"style"===e.name&&(t=Object.fromEntries(e.value.split(";").map((function(e){var t=e.split(":"),n=Object(S.a)(t),r=n[0],c=n.slice(1);return[P(r.trim()),c.join().trim()]})).filter((function(e){return e.some((function(e){return/\S/.test(e)}))})))),[e.name,t]}))),0===Object.keys(o.attributes).length&&delete o.attributes,o):null},B=function(){var e=Object(x.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!I.a.isCID(t)){e.next=4;break}return e.next=3,A.dag.get(t);case 3:return e.abrupt("return",e.sent.value);case 4:return e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=Object(x.a)(O.a.mark((function e(t){var n,r,c,a,i,o,s,u,l,d,f,h,b,j,p,x,v,g,k;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B(null!==(n=t)&&void 0!==n?n:{});case 2:t=e.sent,r={},c=0,a=Object.entries(t);case 5:if(!(c<a.length)){e.next=13;break}return i=Object(m.a)(a[c],2),o=i[0],s=i[1],e.next=9,B(s);case 9:r[o]=e.sent;case 10:c++,e.next=5;break;case 13:if(r.style){for(u={},l=0,d=Object.entries(r.style);l<d.length;l++)f=Object(m.a)(d[l],2),h=f[0],b=f[1],u[P(h,"-")]=b;r.style=u}for(r.class&&(r.className=r.class,delete r.class),j=0,p=["xml:space","xmlns:xlink","xlink:href"];j<p.length;j++)r[x=p[j]]&&(r[P(x,":")]=r[x],delete r[x]);for(v=0,g=["flood-opacity","flood-color","stop-color","clip-rule","stroke-miterlimit","stroke-linejoin","stroke-linecap","stroke-width","clip-path","fill-rule"];v<g.length;v++)r[k=g[v]]&&(r[P(k,"-")]=r[k],delete r[k]);return e.abrupt("return",r);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(x.a)(O.a.mark((function e(t){var n,r,a,i,o,s,u,l,d,f,h,b,j,p,x,v,m,g,k,y,w,N,E,S,D;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.root,a=t.key,i=void 0===a?{val:0}:a,o=t.onBuildStart,s=void 0===o?null:o,u=t.onBuildEnd,l=void 0===u?null:u,d=t.onDOMStart,f=void 0===d?null:d,h=t.onDOMFinish,b=void 0===h?null:h,j=t.onLeaf,p=void 0===j?null:j,e.next=3,B(r);case 3:if("element"===(r=e.sent).type){e.next=6;break}throw new Error("Root Type: ".concat(r.type));case 6:return 1===r.depth&&1===r.left&&(null===s||void 0===s||s({root:r})),e.t0=Promise,e.t1=Object,e.next=11,B(null!==(n=r.children)&&void 0!==n?n:[]);case 11:return e.t2=e.sent,e.t3=e.t1.values.call(e.t1,e.t2).map(B),e.next=15,e.t0.all.call(e.t0,e.t3);case 15:r.children=e.sent,x=[],v=Object(T.a)(r.children),e.prev=18,v.s();case 20:if((m=v.n()).done){e.next=54;break}if("element"!==(g=m.value).type){e.next=51;break}return null===f||void 0===f||f({parent:r,child:g}),e.t4=Promise,e.t5=Object,e.next=28,B(null!==(k=g.children)&&void 0!==k?k:[]);case 28:return e.t6=e.sent,e.t7=e.t5.values.call(e.t5,e.t6).map(B),e.next=32,e.t4.all.call(e.t4,e.t7);case 32:if(g.children=e.sent,0!==g.children.length&&!g.children.some((function(e){return!["text","cdata"].includes(e.type)}))){e.next=41;break}return e.next=36,R({root:g,key:i,onBuildStart:s,onBuildEnd:l,onDOMStart:f,onDOMFinish:b,onLeaf:p});case 36:y=e.sent,null===b||void 0===b||b({parent:r,child:g,node:y}),x.push(y),e.next=49;break;case 41:return null===p||void 0===p||p({parent:r,child:g}),e.next=44,M(g.attributes);case 44:(w=e.sent).key=++i.val,N=g.children.map((function(e){return e.value})).join(),E=c.a.createElement(g.name,w,N),x.push(E);case 49:e.next=52;break;case 51:g.value&&""!==g.value.trim()&&console.error("Child",g.value);case 52:e.next=20;break;case 54:e.next=59;break;case 56:e.prev=56,e.t8=e.catch(18),v.e(e.t8);case 59:return e.prev=59,v.f(),e.finish(59);case 62:return e.next=64,M(r.attributes);case 64:return(S=e.sent).key=++i.val,D=c.a.createElement(r.name,S,x.length>0?x:null),1===r.depth&&1===r.left&&(null===l||void 0===l||l(r,D)),e.abrupt("return",D);case 69:case"end":return e.stop()}}),e,null,[[18,56,59,62]])})));return function(t){return e.apply(this,arguments)}}(),L=(new DOMParser).parseFromString("INVALID","application/xml").getElementsByTagName("parsererror")[0].namespaceURI,U=function(e){return e.getElementsByTagNameNS(L,"parsererror").length>0},H=function(e){return new Promise((function(t,n){var r=new FileReader;r.onload=function(e){var n=new DOMParser,r=n.parseFromString(e.target.result.toString(),"application/xml");if(!U(r))return t(r);var c=n.parseFromString(e.target.result.toString(),"text/html");if(U(c))return t(null);if("html"===c.firstChild.localName&&function(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(Array.from(c.firstChild.childNodes).map((function(e){return e.localName})),["head","body"])){var a=c.firstChild.firstChild,i=c.firstChild.childNodes[1];if(0===a.childNodes.length&&function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return e.nodeType};return Array.from(e).all((function(e){return n(e)===t}))}(i.childNodes,Node.TEXT_NODE)){var o=Array.from(i.childNodes).map((function(e){return e.textContent})).join();return t(o)}return t(c)}},r.readAsText(e)}))},$=n(113),z=function(){var e=Object(x.a)(O.a.mark((function e(t){var n,r,c,a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.obj,r=t.leafFor,c=void 0===r?function(){var e=Object(x.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}():r,a={},e.next=4,Promise.all(Object.entries(n).map(function(){var e=Object(x.a)(O.a.mark((function e(t){var n,r,i;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=Object(m.a)(t,2),r=n[0],i=n[1],!Array.isArray(i)){e.next=7;break}return e.next=4,Promise.all(i.map(function(){var e=Object(x.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z({obj:t,leafFor:c});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:a[r]=e.sent,e.next=14;break;case 7:if("object"!==typeof i){e.next=13;break}return e.next=10,z({obj:i,leafFor:c});case 10:a[r]=e.sent,e.next=14;break;case 13:a[r]=i;case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:return e.next=6,c(a);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),G=function e(t){var n=t.node,r=t.depth,c=void 0===r?1:r,a=t.count,i=void 0===a?{current:1}:a,o=t.pre,s=void 0===o?function(){}:o,u=t.step,l=void 0===u?function(){}:u,d=t.nodeFor,f=void 0===d?function(e){var t=e.node;Object($.a)(e,["node"]);return t}:d,h=t.childrenOf,b=void 0===h?function(e){return Array.from(e.childNodes)}:h,j=i.current;s(n,c,j);var p=[];return b(n).forEach((function(t){i.current++;var r=e({node:t,pre:s,step:l,nodeFor:f,childrenOf:b,depth:c+1,count:i});r&&(p.push(r),l({node:n,children:p,depth:c,left:j,right:i.current}))})),f({node:n,children:p,depth:c,left:j,right:i.current})},Y=n(8),q=Object(g.a)((function(){return Promise.resolve().then(n.bind(null,238))})),J=function(e){return/^(\d+\.?\d*)|(\d*\.?\d+)$/.test(e)},W=function(e){var t;if("http://www.w3.org/2000/svg"===(null===e||void 0===e||null===(t=e.attributes)||void 0===t?void 0:t.xmlns)){var n=null===e||void 0===e?void 0:e.attributes,r=n.width,c=n.height;!n.viewBox&&J(r)&&J(c)&&(e.attributes.viewBox=[0,0,r,c].join(" ")),!r&&(e.attributes.width="100%"),!c&&(e.attributes.height="100%")}},X=function(){var e=Object(r.useState)(null),t=Object(m.a)(e,2),n=t[0],c=t[1],a=[W],i=Object(r.useState)({nodes:[],links:[]}),o=Object(m.a)(i,2),s=o[0],u=o[1],l=Object(r.useState)(!1),d=Object(m.a)(l,2),f=d[0],h=d[1],b=Object(r.useState)(null),j=Object(m.a)(b,2),p=j[0],g=j[1],T=function(e){var t=e.root,n="".concat(t.left,":").concat(t.right);u({nodes:[{id:n}],links:[]})},S=function(e){var t=e.parent,n=e.child,r="".concat(t.left,":").concat(t.right),c="".concat(n.left,":").concat(n.right);u((function(e){var t=e.nodes,n=void 0===t?[]:t,a=e.links,i=void 0===a?[]:a;return{nodes:[].concat(Object(v.a)(n),[{id:c}]),links:[].concat(Object(v.a)(i),[{source:r,target:c}])}}))},D=function(){var e=Object(x.a)(O.a.mark((function e(t){var n,r,i,o,s,u,l;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h(!0),n=t.target.files,r=t.target.value,0!==n.length){e.next=5;break}throw new Error("No file is selected");case 5:return e.next=7,H(n[0]);case 7:if(null!==(i=e.sent)){e.next=12;break}c(Object(Y.jsxs)("h1",{children:[Object(Y.jsx)("code",{children:"null"})," Document"]})),e.next=36;break;case 12:if("string"!==typeof i){e.next=16;break}/\x00/.test(i)?c(Object(Y.jsx)("object",{data:"data:;base64,".concat(btoa(i)),children:Object(Y.jsxs)("p",{children:["This was the binary object: ",r]})})):c(Object(Y.jsx)("pre",{children:i})),e.next=36;break;case 16:return o=G({node:i.documentElement,nodeFor:_}),e.prev=17,a.forEach((function(e){return e(o)})),e.next=21,z({obj:o,leafFor:function(){var e=Object(x.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.dag.put(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()});case 21:return s=e.sent,e.next=24,A.dag.get(s);case 24:return u=e.sent.value,g(Object(Y.jsxs)(k.a,{children:["CID for ",r,": ",s.toString()]})),e.next=28,R({root:u,onBuildStart:T,onDOMStart:S,onLeaf:S});case 28:l=e.sent,c(l),e.next=36;break;case 32:e.prev=32,e.t0=e.catch(17),console.warn("Error Building",e.t0),c(Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(k.a,{children:"Unable to create object."}),Object(Y.jsxs)(k.a,{children:["Error: ",Object(Y.jsx)("q",{children:e.t0.message})]}),Object(Y.jsx)(k.a,{children:"If the error is with fetching, try the CORS solution above."})]}));case 36:h(!1);case 37:case"end":return e.stop()}}),e,null,[[17,32]])})));return function(t){return e.apply(this,arguments)}}();return Object(Y.jsxs)(y.a,{align:"center",direction:"column",mt:25,children:[Object(Y.jsxs)(k.a,{children:["This program requires write access to an IPFS endpoint. If you want to use it from the web, you'll need to whitelist ",Object(Y.jsx)("code",{children:"dysbulic.github.io"}),"."]}),Object(Y.jsxs)(w.b,{listStyleType:"none",children:[Object(Y.jsx)(w.a,{_before:{content:'"$ "'},children:'ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin \'["http://localhost:3000", "http://localhost:5001", "https://webui.ipfs.io", "https://dysbulic.github.io"]\''}),Object(Y.jsx)(w.a,{_before:{content:'"$ "'},children:'ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods \'["PUT", "POST"]\''})]}),Object(Y.jsx)(N.a,{type:"file",onChange:D,minH:"1.8em",maxW:600,mt:6,fontSize:30}),p,n&&Object(Y.jsx)(E.a,{h:"90vh",children:n}),Object(Y.jsx)(q,{graph:s,generating:f})]})},K=n(238),V=function(){var e=Object(r.useState)(null),t=Object(m.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)({nodes:[],links:[]}),i=Object(m.a)(a,2),o=i[0],s=i[1],l=Object(u.g)().cid;l||(l=new URLSearchParams(Object(u.f)().search).get("cid"),console.info({cid:l}));var d=function(e){var t=e.root,n="".concat(t.left,":").concat(t.right);s({nodes:[{id:n}],links:[]})},f=function(e){var t=e.parent,n=e.child,r="".concat(t.left,":").concat(t.right),c="".concat(n.left,":").concat(n.right);s((function(e){var t=e.nodes,n=void 0===t?[]:t,a=e.links,i=void 0===a?[]:a;return{nodes:[].concat(Object(v.a)(n),[{id:c}]),links:[].concat(Object(v.a)(i),[{source:r,target:c}])}}))},h=Object(r.useCallback)(Object(x.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!l){e.next=6;break}return e.t0=c,e.next=4,R({root:new I.a(l),onBuildStart:d,onDOMStart:f,onLeaf:f});case 4:e.t1=e.sent,(0,e.t0)(e.t1);case 6:case"end":return e.stop()}}),e)}))),[l]);return Object(r.useEffect)((function(){h()}),[h]),Object(Y.jsx)(y.a,{direction:"column",align:"center",children:l?Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsxs)(k.a,{children:["Loading: ",l]}),Object(Y.jsxs)(y.a,{w:"100%",children:[Object(Y.jsx)(K.default,{graph:o,flexGrow:1,mr:100}),n]})]}):Object(Y.jsx)(E.a,{as:"form",id:"cid",w:"100%",children:Object(Y.jsx)(N.a,{name:"cid",placeholder:"IPFS Content ID",bg:"white",color:"black",ml:20,mt:6,maxW:"93%",onKeyPress:function(e){"Enter"===e.key&&document.forms.cid.submit()},_placeholder:{color:"#333"}})})})},Q=Object(l.a)({config:{initialColorMode:"dark"},styles:{global:{body:{minH:"100vh"},a:{textDecoration:"underline"}}}}),Z=function(e){var t=e.children,n=e.to;return Object(Y.jsx)(d.a,{as:s.b,to:n,w:"100%",children:t})},ee=function(){return Object(Y.jsx)(o.a,{theme:Q,children:Object(Y.jsxs)(s.a,{basename:"/",children:[Object(Y.jsx)(f.a,{children:function(e){var t=e.isOpen;return Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(f.b,{isActive:t,as:h.a,position:"fixed",top:"1rem",left:"1rem",children:t?Object(Y.jsx)(b.a,{}):Object(Y.jsx)(j.a,{})}),Object(Y.jsxs)(f.d,{children:[Object(Y.jsx)(f.c,{children:Object(Y.jsx)(Z,{to:"/",children:"\ud83c\udfe1 Home"})}),Object(Y.jsx)(f.c,{children:Object(Y.jsxs)(Z,{to:"/cid",children:["\u270d By ",Object(Y.jsx)("acronym",{title:"Content Identifier",children:"CID"})]})}),Object(Y.jsx)(f.c,{children:Object(Y.jsx)(Z,{to:"/about",children:"\ud83d\udcf0 About"})})]})]})}}),Object(Y.jsxs)(u.c,{children:[Object(Y.jsx)(u.a,{path:"/cid/:cid",exact:!1,component:V}),Object(Y.jsx)(u.a,{path:"/",exact:!1,component:X})]})]})})},te=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,608)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),a(e),i(e)}))};i.a.render(Object(Y.jsx)(c.a.StrictMode,{children:Object(Y.jsx)(o.a,{children:Object(Y.jsx)(ee,{})})}),document.getElementById("root")),te()}},[[579,1,2]]]);
//# sourceMappingURL=main.7cbbf504.chunk.js.map