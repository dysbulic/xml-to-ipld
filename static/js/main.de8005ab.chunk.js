(this["webpackJsonpxml-to-ipld"]=this["webpackJsonpxml-to-ipld"]||[]).push([[0],{229:function(e,t){},240:function(e,t){},257:function(e,t){},258:function(e,t){},463:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),c=n(175),o=n.n(c),i=n(477),s=n(1),u=n.n(s),l=n(30),d=n(27),f=n(9),h=n(181),p=n(473),b=n(474),v=n(478),j=n(476),x=n(475),O=n(67),m=n(55),g=n(176),N=n.n(g),y=n(7),w=n.n(y),E=N()({port:5001}),k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-";return e.split(t).map((function(e,t){return 0===t?e:e[0].toUpperCase()+e.slice(1)})).join("")},T=function(e){var t,n=e.node,r=e.children,a=e.depth,c=e.left,o=e.right,i={name:n.localName,children:r,depth:a,left:c,right:o};return i.type=function(){switch(n.nodeType){case Node.ELEMENT_NODE:return"element";case Node.TEXT_NODE:return"text";case Node.ATTRIBUTE_NODE:return"attribute";case Node.CDATA_SECTION_NODE:return"cdata";case Node.ENTITY_REFERENCE_NODE:return"reference";case Node.ENTITY_NODE:return"entity";case Node.PROCESSING_INSTRUCTION_NODE:return"instruction";case Node.COMMENT_NODE:return"comment";case Node.DOCUMENT_NODE:return"document";case Node.DOCUMENT_TYPE_NODE:return"doctype";case Node.DOCUMENT_FRAGMENT_NODE:return"fragment";case Node.NOTATION_NODE:return"notation";default:return"unknown"}}(),"text"!==i.type&&"cdata"!==i.type||(delete i.name,i.value=n.textContent,!/^\n\s*$/.test(i.value))?(0===r.length&&delete i.children,i.attributes=Object.fromEntries(Object(d.a)(null!==(t=n.attributes)&&void 0!==t?t:[]).map((function(e){var t=e.value;return"style"===e.name&&(t=Object.fromEntries(e.value.split(";").map((function(e){var t=e.split(":"),n=Object(m.a)(t),r=n[0],a=n.slice(1);return[k(r.trim()),a.join().trim()]})).filter((function(e){return e.some((function(e){return/\S/.test(e)}))})))),[e.name,t]}))),0===Object.keys(i.attributes).length&&delete i.attributes,i):null},D=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!w.a.isCID(t)){e.next=4;break}return e.next=3,E.dag.get(t);case 3:return e.abrupt("return",e.sent.value);case 4:return e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,r,a,c,o,i,s,l,d,h,p,b,v,j,x,O,m,g,N;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D(null!==(n=t)&&void 0!==n?n:{});case 2:t=e.sent,r={},a=0,c=Object.entries(t);case 5:if(!(a<c.length)){e.next=13;break}return o=Object(f.a)(c[a],2),i=o[0],s=o[1],e.next=9,D(s);case 9:r[i]=e.sent;case 10:a++,e.next=5;break;case 13:if(r.style){for(l={},d=0,h=Object.entries(r.style);d<h.length;d++)p=Object(f.a)(h[d],2),b=p[0],v=p[1],l[k(b,"-")]=v;r.style=l}for(r.class&&(r.className=r.class,delete r.class),j=0,x=["xml:space","xmlns:xlink","xlink:href"];j<x.length;j++)r[O=x[j]]&&(r[k(O,":")]=r[O],delete r[O]);for(m=0,g=["flood-opacity","flood-color","stop-color","clip-rule","stroke-miterlimit","stroke-linejoin","stroke-linecap","stroke-width","clip-path","fill-rule"];m<g.length;m++)r[N=g[m]]&&(r[k(N,"-")]=r[N],delete r[N]);return e.abrupt("return",r);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,r,c,o,i,s,l,d,f,h,p,b,v,j,x,m,g,N,y,w,E,k,T,F,I;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.root,c=t.key,o=void 0===c?{val:0}:c,i=t.onBuildStart,s=void 0===i?null:i,l=t.onBuildEnd,d=void 0===l?null:l,f=t.onDOMStart,h=void 0===f?null:f,p=t.onDOMFinish,b=void 0===p?null:p,v=t.onLeaf,j=void 0===v?null:v,"element"===r.type){e.next=3;break}throw new Error("Root Type: ".concat(r.type));case 3:return 1===r.depth&&1===r.left&&(null===s||void 0===s||s({root:r})),e.t0=Promise,e.t1=Object,e.next=8,D(null!==(n=r.children)&&void 0!==n?n:[]);case 8:return e.t2=e.sent,e.t3=e.t1.values.call(e.t1,e.t2).map(D),e.next=12,e.t0.all.call(e.t0,e.t3);case 12:r.children=e.sent,x=[],m=Object(O.a)(r.children),e.prev=15,m.s();case 17:if((g=m.n()).done){e.next=51;break}if("element"!==(N=g.value).type){e.next=48;break}return null===h||void 0===h||h({parent:r,child:N}),e.t4=Promise,e.t5=Object,e.next=25,D(null!==(y=N.children)&&void 0!==y?y:[]);case 25:return e.t6=e.sent,e.t7=e.t5.values.call(e.t5,e.t6).map(D),e.next=29,e.t4.all.call(e.t4,e.t7);case 29:if(N.children=e.sent,0!==N.children.length&&!N.children.some((function(e){return!["text","cdata"].includes(e.type)}))){e.next=38;break}return e.next=33,C({root:N,key:o,onBuildStart:s,onBuildEnd:d,onDOMStart:h,onDOMFinish:b,onLeaf:j});case 33:w=e.sent,null===b||void 0===b||b({parent:r,child:N,node:w}),x.push(w),e.next=46;break;case 38:return e.next=40,S(N.attributes);case 40:(E=e.sent).key=++o.val,k=N.children.map((function(e){return e.value})).join(),T=a.a.createElement(N.name,E,k),null===j||void 0===j||j({parent:r,child:N,elem:T}),x.push(T);case 46:e.next=49;break;case 48:N.value&&""!==N.value.trim()&&console.error("Child",N.value);case 49:e.next=17;break;case 51:e.next=56;break;case 53:e.prev=53,e.t8=e.catch(15),m.e(e.t8);case 56:return e.prev=56,m.f(),e.finish(56);case 59:return e.next=61,S(r.attributes);case 61:return(F=e.sent).key=++o.val,I=a.a.createElement(r.name,F,x.length>0?x:null),1===r.depth&&1===r.left&&(null===d||void 0===d||d(r,I)),e.abrupt("return",I);case 66:case"end":return e.stop()}}),e,null,[[15,53,56,59]])})));return function(t){return e.apply(this,arguments)}}(),F=(new DOMParser).parseFromString("INVALID","application/xml").getElementsByTagName("parsererror")[0].namespaceURI,I=function(e){return e.getElementsByTagNameNS(F,"parsererror").length>0},_=function(e){return new Promise((function(t,n){var r=new FileReader;r.onload=function(e){var n=new DOMParser,r=n.parseFromString(e.target.result.toString(),"application/xml");if(!I(r))return t(r);var a=n.parseFromString(e.target.result.toString(),"text/html");if(I(a))return t(null);if("html"===a.firstChild.localName&&function(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(Array.from(a.firstChild.childNodes).map((function(e){return e.localName})),["head","body"])){var c=a.firstChild.firstChild,o=a.firstChild.childNodes[1];if(0===c.childNodes.length&&function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return e.nodeType};return Array.from(e).all((function(e){return n(e)===t}))}(o.childNodes,Node.TEXT_NODE)){var i=Array.from(o.childNodes).map((function(e){return e.textContent})).join();return t(i)}return t(a)}},r.readAsText(e)}))},A=n(182),P=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,r,a,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.obj,r=t.leafFor,a=void 0===r?function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}():r,c={},e.next=4,Promise.all(Object.entries(n).map(function(){var e=Object(l.a)(u.a.mark((function e(t){var n,r,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=Object(f.a)(t,2),r=n[0],o=n[1],!Array.isArray(o)){e.next=7;break}return e.next=4,Promise.all(o.map(function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P({obj:t,leafFor:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:c[r]=e.sent,e.next=14;break;case 7:if("object"!==typeof o){e.next=13;break}return e.next=10,P({obj:o,leafFor:a});case 10:c[r]=e.sent,e.next=14;break;case 13:c[r]=o;case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:return e.next=6,a(c);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function e(t){var n=t.node,r=t.depth,a=void 0===r?1:r,c=t.count,o=void 0===c?{current:1}:c,i=t.pre,s=void 0===i?function(){}:i,u=t.step,l=void 0===u?function(){}:u,d=t.nodeFor,f=void 0===d?function(e){var t=e.node;Object(A.a)(e,["node"]);return t}:d,h=t.childrenOf,p=void 0===h?function(e){return Array.from(e.childNodes)}:h,b=o.current;s(n,a,b);var v=[];return p(n).forEach((function(t){o.current++;var r=e({node:t,pre:s,step:l,nodeFor:f,childrenOf:p,depth:a+1,count:o});r&&(v.push(r),l({node:n,children:v,depth:a,left:b,right:o.current}))})),f({node:n,children:v,depth:a,left:b,right:o.current})},B=n(14),R=Object(h.a)((function(){return Promise.all([n.e(4),n.e(3)]).then(n.bind(null,568))})),U=function(e){return/^(\d+\.?\d*)|(\d*\.?\d+)$/.test(e)},L=function(e){var t;if("http://www.w3.org/2000/svg"===(null===e||void 0===e||null===(t=e.attributes)||void 0===t?void 0:t.xmlns)){var n=null===e||void 0===e?void 0:e.attributes,r=n.width,a=n.height;!n.viewBox&&U(r)&&U(a)&&(e.attributes.viewBox=[0,0,r,a].join(" ")),!r&&(e.attributes.width="100%"),!a&&(e.attributes.height="100%")}},H=function(){var e=Object(r.useState)(null),t=Object(f.a)(e,2),n=t[0],a=t[1],c=[L],o=Object(r.useState)({nodes:[],links:[]}),i=Object(f.a)(o,2),s=i[0],h=i[1],O=Object(r.useState)(!1),m=Object(f.a)(O,2),g=m[0],N=m[1],y=Object(r.useState)(null),w=Object(f.a)(y,2),k=w[0],D=w[1],S=function(e){var t=e.root,n="".concat(t.left,":").concat(t.right);h({nodes:[{id:n}],links:[]})},F=function(e){var t=e.parent,n=e.child,r="".concat(t.left,":").concat(t.right),a="".concat(n.left,":").concat(n.right);h((function(e){var t=e.nodes,n=void 0===t?[]:t,c=e.links,o=void 0===c?[]:c;return{nodes:[].concat(Object(d.a)(n),[{id:a}]),links:[].concat(Object(d.a)(o),[{source:r,target:a}])}}))},I=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,r,o,i,s,d,f;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N(!0),n=t.target.files,r=t.target.value,0!==n.length){e.next=5;break}throw new Error("No file is selected");case 5:return e.next=7,_(n[0]);case 7:if(null!==(o=e.sent)){e.next=12;break}a(Object(B.jsxs)("h1",{children:[Object(B.jsx)("code",{children:"null"})," Document"]})),e.next=36;break;case 12:if("string"!==typeof o){e.next=16;break}/\x00/.test(o)?a(Object(B.jsx)("object",{data:"data:;base64,".concat(btoa(o)),children:Object(B.jsxs)("p",{children:["This was the binary object: ",r]})})):a(Object(B.jsx)("pre",{children:o})),e.next=36;break;case 16:return i=M({node:o.documentElement,nodeFor:T}),e.prev=17,c.forEach((function(e){return e(i)})),e.next=21,P({obj:i,leafFor:function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.dag.put(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()});case 21:return s=e.sent,e.next=24,E.dag.get(s);case 24:return d=e.sent.value,D(Object(B.jsxs)(p.a,{children:["CID for ",r,": ",s.toString()]})),e.next=28,C({root:d,onBuildStart:S,onDOMStart:F});case 28:f=e.sent,a(f),e.next=36;break;case 32:e.prev=32,e.t0=e.catch(17),console.warn("Error Building",e.t0),a(Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(p.a,{children:"Unable to create object."}),Object(B.jsxs)(p.a,{children:["Error: ",Object(B.jsx)("q",{children:e.t0.message})]}),Object(B.jsx)(p.a,{children:"If the error is with fetching, try the CORS solution above."})]}));case 36:N(!1);case 37:case"end":return e.stop()}}),e,null,[[17,32]])})));return function(t){return e.apply(this,arguments)}}();return Object(B.jsxs)(b.a,{align:"center",direction:"column",mt:25,children:[Object(B.jsxs)(p.a,{children:["This program requires write access to an IPFS endpoint. If you want to use it from the web, you'll need to whitelist ",Object(B.jsx)("code",{children:"dysbulic.github.io"}),"."]}),Object(B.jsxs)(v.b,{listStyleType:"none",children:[Object(B.jsx)(v.a,{_before:{content:'"$ "'},children:'ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin \'["http://localhost:3000", "http://localhost:5001", "https://webui.ipfs.io", "https://dysbulic.github.io"]\''}),Object(B.jsx)(v.a,{_before:{content:'"$ "'},children:'ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods \'["PUT", "POST"]\''})]}),Object(B.jsx)(j.a,{type:"file",onChange:I,minH:"1.8em",maxW:600,mt:6,fontSize:30}),k,n&&Object(B.jsx)(x.a,{h:"90vh",children:n}),Object(B.jsx)(R,{graph:s,generating:g})]})},$=function(e){e&&e instanceof Function&&n.e(5).then(n.bind(null,569)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))};o.a.render(Object(B.jsx)(a.a.StrictMode,{children:Object(B.jsx)(i.a,{children:Object(B.jsx)(H,{})})}),document.getElementById("root")),$()}},[[463,1,2]]]);
//# sourceMappingURL=main.de8005ab.chunk.js.map