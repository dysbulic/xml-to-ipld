(this["webpackJsonpxml-to-ipld"]=this["webpackJsonpxml-to-ipld"]||[]).push([[0],{37:function(e,t,n){},39:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(29),c=n.n(a),i=(n(37),n(23)),u=n.n(i),s=n(30),l=n(5),d=n(50),f=n(8),N=(new DOMParser).parseFromString("INVALID","application/xml").getElementsByTagName("parsererror")[0].namespaceURI,m=function(e){return e.getElementsByTagNameNS(N,"parsererror").length>0},h=function(e){return new Promise((function(t,n){var r=new FileReader;r.onload=function(e){var n,r,o=new DOMParser,a=o.parseFromString(e.target.result,"application/xml");if(m(a)){var c=o.parseFromString(e.target.result,"text/html");if(m(c))t(null);else if(function(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(Array.from(c.firstChild.childNodes).map((function(e){return e.localName})),["head","body"])){var i=c.firstChild.firstChild,u=c.firstChild.childNodes[1];if(0===i.childNodes.length&&(n=u.childNodes,r=Node.TEXT_NODE,Array.from(n).map((function(e){return e.nodeType})).reduce((function(e,t){return e&&t===r}),!0))){var s=Array.from(u.childNodes).map((function(e){return e.textContent})).join();t(s)}else t(c)}else t(c)}else console.info("XML",a,m(a)),t(a)},console.info("t",r.readAsText(e))}))},O=function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=Array.from(t.childNodes).map((function(t){return e(t,n,r+1)})).filter((function(e){return!!e}));return n(t,o)},p=function(e,t){var n,r={name:e.localName,children:t};return r.type=function(){switch(e.nodeType){case Node.ELEMENT_NODE:return"element";case Node.TEXT_NODE:return"text";case Node.ATTRIBUTE_NODE:return"attribute";case Node.CDATA_SECTION_NODE:return"cdata";case Node.ENTITY_REFERENCE_NODE:return"reference";case Node.ENTITY_NODE:return"entity";case Node.PROCESSING_INSTRUCTION_NODE:return"instruction";case Node.COMMENT_NODE:return"comment";case Node.DOCUMENT_NODE:return"document";case Node.DOCUMENT_TYPE_NODE:return"doctype";case Node.DOCUMENT_FRAGMENT_NODE:return"fragment";case Node.NOTATION_NODE:return"notation";default:return"unknown"}}(),"text"===r.type&&(delete r.name,r.value=e.textContent,/^\n\s*$/.test(r.value))?null:(r.attributes=Object.fromEntries(Object(f.a)(null!==(n=e.attributes)&&void 0!==n?n:[]).map((function(e){return[e.name,e.value]}))),r)},E=(n(39),n(6)),T=function(){var e=Object(r.useState)(null),t=Object(l.a)(e,2),n=t[0],o=t[1],a=function(){var e=Object(s.a)(u.a.mark((function e(t){var n,r,a,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.target.files,r=t.target.value,0!==n.length){e.next=5;break}return console.warn("No file is selected"),e.abrupt("return");case 5:return e.next=7,h(n[0]);case 7:a=e.sent,console.info("DD",a),null===a?o(Object(E.jsx)("h1",{children:"null Document"})):"string"===typeof a?/\x00/.test(a)?o(Object(E.jsx)("object",{data:"data:;base64,".concat(btoa(a)),children:Object(E.jsxs)("p",{children:["This was the binary object: ",r]})})):o(Object(E.jsx)("pre",{children:a})):(c=O(a.documentElement,p),console.info("JSON",c),o(Object(E.jsxs)("h1",{children:["Doc ",a.nodeName]})));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(E.jsxs)(d.a,{align:"center",direction:"column",mt:25,children:[Object(E.jsx)("input",{type:"file",onChange:a}),n]})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,51)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),o(e),a(e),c(e)}))};c.a.render(Object(E.jsx)(o.a.StrictMode,{children:Object(E.jsx)(T,{})}),document.getElementById("root")),b()}},[[46,1,2]]]);
//# sourceMappingURL=main.8e74457e.chunk.js.map