(this["webpackJsonpxml-to-ipld"]=this["webpackJsonpxml-to-ipld"]||[]).push([[3],{568:function(t,e,n){"use strict";n.r(e);var r=n(9),c=n(567),a=n(2),i=n(113),u=n(14),o=c.f(c.g);e.default=function(t){var e=t.graph,n=t.generating,f=void 0!==n&&n,s=Object(a.useRef)(),d=Object(a.useState)(),l=Object(r.a)(d,2),p=l[0],g=l[1],h=Object(a.useState)(),b=Object(r.a)(h,2),j=b[0],v=b[1];return Object(a.useEffect)((function(){g(function(t){var e=c.h(t).attr("viewBox",[-320,-240,640,480]).attr("width","100%").attr("height","100%"),n=c.c().force("charge",c.b().strength(-1e3)).force("link",c.a().id((function(t){return t.id})).distance(200)).force("x",c.d()).force("y",c.e()).on("tick",(function(){a.attr("cx",(function(t){return t.x})).attr("cy",(function(t){return t.y})),r.attr("x1",(function(t){return t.source.x})).attr("y1",(function(t){return t.source.y})).attr("x2",(function(t){return t.target.x})).attr("y2",(function(t){return t.target.y}))})),r=e.append("g").attr("stroke","#000").attr("stroke-width",1.5).selectAll("line"),a=e.append("g").attr("stroke","#fff").attr("stroke-width",1.5).selectAll("circle");return Object.assign(e.node(),{update:function(t){var e=t.nodes,c=t.links,i=new Map(a.data().map((function(t){return[t.id,t]})));e=e.map((function(t){return Object.assign(i.get(t.id)||{},t)})),c=c.map((function(t){return Object.assign({},t)})),a=a.data(e,(function(t){return t.id})).join((function(t){return t.append("circle").attr("r",8).attr("fill",(function(t){return o(t.id)}))})),r=r.data(c,(function(t){return[t.source,t.target]})).join("line"),n.nodes(e),n.force("link").links(c),n.alpha(1).restart()},rezoom:function(){var t=e.node().getBBox(),n=t.x,r=t.y,c=t.width,a=t.height;e.attr("viewBox",[n,r,c,a])}})}(s.current))}),[]),Object(a.useEffect)((function(){e&&(null===p||void 0===p||p.update(e))}),[p,e]),Object(a.useEffect)((function(){f?(j&&clearInterval(j),v(setInterval((function(){return p.rezoom()}),100))):clearInterval(j)}),[p,f]),Object(u.jsx)(i.a.svg,{h:"90vh",ref:s})}}}]);
//# sourceMappingURL=3.489acb21.chunk.js.map