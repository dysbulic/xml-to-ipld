(this["webpackJsonpxml-to-ipld"]=this["webpackJsonpxml-to-ipld"]||[]).push([[0],{175:function(e,t,n){},215:function(e,t){},226:function(e,t){},243:function(e,t){},244:function(e,t){},449:function(e,t,n){"use strict";n.r(t);var r=n(5),a=n.n(r),c=n(165),s=n.n(c),o=(n(175),n(1)),i=n.n(o),u=n(38),l=n(19),f=n(167),d=n(457),p=n(459),b=n(458),h=n(169),m=n(49),x=n(30),j=n(166),O=n.n(j),v=n(7),N=n.n(v),g=O()({port:5001}),E=function(){var e=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={},e.next=3,Promise.all(Object.entries(t).map(function(){var e=Object(u.a)(i.a.mark((function e(t){var r,a,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Object(l.a)(t,2),a=r[0],"object"!==typeof(c=r[1])){e.next=7;break}return e.next=4,E(c);case 4:n[a]=e.sent,e.next=8;break;case 7:n[a]=c;case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:return e.next=5,g.dag.put(n);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=(new DOMParser).parseFromString("INVALID","application/xml").getElementsByTagName("parsererror")[0].namespaceURI,T=function(e){return e.getElementsByTagNameNS(y,"parsererror").length>0},k=function(e){return new Promise((function(t,n){var r=new FileReader;r.onload=function(e){var n=new DOMParser,r=n.parseFromString(e.target.result,"application/xml");if(!T(r))return t(r);var a=n.parseFromString(e.target.result,"text/html");if(T(a))return t(null);if(function(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(Array.from(a.firstChild.childNodes).map((function(e){return e.localName})),["head","body"])){var c=a.firstChild.firstChild,s=a.firstChild.childNodes[1];if(0===c.childNodes.length&&function(e,t){return Array.from(e).all((function(e){return e.nodeType===t}))}(s.childNodes,Node.TEXT_NODE)){var o=Array.from(s.childNodes).map((function(e){return e.textContent})).join();return t(o)}return t(a)}},r.readAsText(e)}))},w=function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,c=a,s=Array.from(t.childNodes).map((function(t){return e(t,n,r+1,++a)})).filter((function(e){return!!e}));return n(t,s,r,c,a)},C=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-";return e.split(t).map((function(e,t){return 0===t?e:e[0].toUpperCase()+e.slice(1)})).join("")},D=function(e,t,n,r,a){var c,s={name:e.localName,children:t};return s.type=function(){switch(e.nodeType){case Node.ELEMENT_NODE:return"element";case Node.TEXT_NODE:return"text";case Node.ATTRIBUTE_NODE:return"attribute";case Node.CDATA_SECTION_NODE:return"cdata";case Node.ENTITY_REFERENCE_NODE:return"reference";case Node.ENTITY_NODE:return"entity";case Node.PROCESSING_INSTRUCTION_NODE:return"instruction";case Node.COMMENT_NODE:return"comment";case Node.DOCUMENT_NODE:return"document";case Node.DOCUMENT_TYPE_NODE:return"doctype";case Node.DOCUMENT_FRAGMENT_NODE:return"fragment";case Node.NOTATION_NODE:return"notation";default:return"unknown"}}(),"text"!==s.type&&"cdata"!==s.type||(delete s.name,s.value=e.textContent,!/^\n\s*$/.test(s.value))?(0===t.length&&delete s.children,s.attributes=Object.fromEntries(Object(x.a)(null!==(c=e.attributes)&&void 0!==c?c:[]).map((function(e){var t=e.value;return"style"===e.name&&(t=Object.fromEntries(e.value.split(";").map((function(e){var t=e.split(":"),n=Object(m.a)(t),r=n[0],a=n.slice(1);return[C(r.trim()),a.join().trim()]})).filter((function(e){return e.some((function(e){return/\S/.test(e)}))})))),[e.name,t]}))),0===Object.keys(s.attributes).length&&delete s.attributes,s):null},_=function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!N.a.isCID(t)){e.next=6;break}return e.next=3,g.dag.get(t);case 3:return e.abrupt("return",e.sent.value);case 6:return e.abrupt("return",t);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(u.a)(i.a.mark((function e(t){var n,r,a,c,s,o,u,f,d,p,b,h,m,x,j,O,v,N,g;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_(null!==(n=t)&&void 0!==n?n:{});case 2:t=e.sent,r={},a=0,c=Object.entries(t);case 5:if(!(a<c.length)){e.next=13;break}return s=Object(l.a)(c[a],2),o=s[0],u=s[1],e.next=9,_(u);case 9:r[o]=e.sent;case 10:a++,e.next=5;break;case 13:if(r.style){for(f={},d=0,p=Object.entries(r.style);d<p.length;d++)b=Object(l.a)(p[d],2),h=b[0],m=b[1],f[C(h,"-")]=m;r.style=f}for(r.class&&(r.className=r.class,delete r.class),x=0,j=["xml:space","xmlns:xlink","xlink:href"];x<j.length;x++)r[O=j[x]]&&(r[C(O,":")]=r[O],delete r[O]);for(v=0,N=["flood-opacity","flood-color","stop-color"];v<N.length;v++)r[g=N[v]]&&(r[C(g,"-")]=r[g],delete r[g]);return e.abrupt("return",r);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(u.a)(i.a.mark((function e(t){var n,r,c,s,o,u,l,f,d,p,b,h=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=h.length>1&&void 0!==h[1]?h[1]:{val:0},"element"===t.type){e.next=3;break}throw new Error("Root Type: ".concat(t.type));case 3:return r=[],c=0,e.t0=Object,e.next=8,_(null!==(o=t.children)&&void 0!==o?o:[]);case 8:e.t1=e.sent,s=e.t0.values.call(e.t0,e.t1);case 10:if(!(c<s.length)){e.next=45;break}return u=s[c],e.next=14,_(u);case 14:if("element"!==(u=e.sent).type){e.next=41;break}return e.t2=Promise,e.t3=Object,e.next=20,_(null!==(l=u.children)&&void 0!==l?l:[]);case 20:return e.t4=e.sent,e.t5=e.t3.values.call(e.t3,e.t4).map(_),e.next=24,e.t2.all.call(e.t2,e.t5);case 24:if(0!==(f=e.sent).length&&!f.some((function(e){return!["text","cdata"].includes(e.type)}))){e.next=33;break}return e.t6=r,e.next=29,A(u,n);case 29:e.t7=e.sent,e.t6.push.call(e.t6,e.t7),e.next=39;break;case 33:return e.next=35,I(u.attributes);case 35:(d=e.sent).key=++n.val,p=f.map((function(e){return e.value})).join(),r.push(a.a.createElement(u.name,d,p));case 39:e.next=42;break;case 41:u.value&&""!==u.value.trim()&&console.error("Child",u.value);case 42:c++,e.next=10;break;case 45:return e.next=47,I(t.attributes);case 47:return(b=e.sent).key=++n.val,e.abrupt("return",a.a.createElement(t.name,b,r.length>0?r:null));case 50:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=n(16),P=Object(f.a)((function(){return n.e(3).then(n.bind(null,461))})),F=function(){var e=Object(r.useState)(null),t=Object(l.a)(e,2),n=t[0],a=t[1],c=function(){var e=Object(u.a)(i.a.mark((function e(t){var n,r,c,s,o,u,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.target.files,r=t.target.value,0!==n.length){e.next=5;break}return console.warn("No file is selected"),e.abrupt("return");case 5:return e.next=7,k(n[0]);case 7:if(null!==(c=e.sent)){e.next=12;break}a(Object(S.jsx)("h1",{children:"null Document"})),e.next=35;break;case 12:if("string"!==typeof c){e.next=16;break}/\x00/.test(c)?a(Object(S.jsx)("object",{data:"data:;base64,".concat(btoa(c)),children:Object(S.jsxs)("p",{children:["This was the binary object: ",r]})})):a(Object(S.jsx)("pre",{children:c})),e.next=35;break;case 16:return s=w(c.documentElement,D),e.prev=17,e.next=20,E(s);case 20:return o=e.sent,e.next=23,g.dag.get(o);case 23:return u=e.sent.value,console.info("CID for ".concat(r,": ").concat(o.toString())),e.next=27,A(u);case 27:l=e.sent,a(l),e.next=35;break;case 31:e.prev=31,e.t0=e.catch(17),console.warn("Error Building",e.t0),a(Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)(d.a,{children:"Unable to create object."}),Object(S.jsxs)(d.a,{children:["Error: ",Object(S.jsx)("q",{children:e.t0.message})]}),Object(S.jsx)(d.a,{children:"If the error is with CORS, try running the following from the command line:"}),Object(S.jsxs)(p.b,{listStyleType:"none",children:[Object(S.jsx)(p.a,{_before:{content:'"$ "'},children:'ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin \'["http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io"]\''}),Object(S.jsx)(p.a,{_before:{content:'"$ "'},children:'ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods \'["PUT", "POST"]\''})]})]}));case 35:case"end":return e.stop()}}),e,null,[[17,31]])})));return function(t){return e.apply(this,arguments)}}();return Object(S.jsxs)(b.a,{align:"center",direction:"column",mt:25,children:[Object(S.jsx)(h.a.input,{type:"file",onChange:c,fontSize:30}),n,Object(S.jsx)(P,{})]})},M=function(e){e&&e instanceof Function&&n.e(4).then(n.bind(null,460)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};s.a.render(Object(S.jsx)(a.a.StrictMode,{children:Object(S.jsx)(F,{})}),document.getElementById("root")),M()}},[[449,1,2]]]);
//# sourceMappingURL=main.453f5a03.chunk.js.map