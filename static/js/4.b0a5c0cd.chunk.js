(this["webpackJsonpxml-to-ipld"]=this["webpackJsonpxml-to-ipld"]||[]).push([[4],{1018:function(t,n,e){"use strict";e.r(n);var r=e(1016),o=e(11),a=e(433),c=e(1017),i=e(0),u=e(108),f=e(4),s=c.h(c.i);n.default=function(t){var n=t.graph,e=Object(a.a)(t,["graph"]),d=Object(i.useState)(!0),l=Object(o.a)(d,2),p=l[0],g=l[1],h=Object(i.useRef)(),j=Object(i.useState)(),b=Object(o.a)(j,2),x=b[0],k=b[1];return Object(i.useEffect)((function(){k(function(t){var n=c.j(t).attr("viewBox",[-320,-240,640,480]).attr("width","100%").attr("height","100%"),e=c.d().force("charge",c.c().strength(-1e3)).force("link",c.b().id((function(t){return t.id})).distance(200)).force("x",c.e()).force("y",c.f()).on("tick",(function(){o.attr("cx",(function(t){return t.x})).attr("cy",(function(t){return t.y})),r.attr("x1",(function(t){return t.source.x})).attr("y1",(function(t){return t.source.y})).attr("x2",(function(t){return t.target.x})).attr("y2",(function(t){return t.target.y}))})),r=n.append("g").attr("stroke","#FFF").attr("stroke-width",1.5).selectAll("line"),o=n.append("g").attr("stroke","#FFF").attr("stroke-width",1.5).selectAll("circle"),a=function(){var t=n.node().getBBox(),e=t.x,r=t.y,o=t.width,a=t.height;n.attr("viewBox",[e,r,o,a])};return n.append("defs").append("style").text("circle:hover { stroke: orangered; fill: orangered; }"),Object.assign(n.node(),{update:function(t){var i=t.nodes,u=t.links,f=new Map(o.data().map((function(t){return[t.id,t]})));i=i.map((function(t){return Object.assign(f.get(t.id)||{},t)})),u=u.map((function(t){return Object.assign({},t)})),o=o.data(i,(function(t){return t.id})).join((function(t){return t.append("circle").attr("r",8).attr("fill",(function(t){return s(t.id)})).append("title").text((function(t){return"".concat(t.name," (").concat(t.id,")")})).select((function(){return this.parentNode}))})),r=r.data(u,(function(t){return[t.source,t.target]})).join("line");var d,l=c.g([0,1],[0,640]),p=c.g([0,1],[0,480]),g=(c.a.from(i,(function(t){return l(t[0])}),(function(t){return p(t[1])})),n.append("g")),h=c.k().on("zoom",(function(t){g.attr("transform",d=t.transform),g.style("stroke-width",3/Math.sqrt(d.k))}));n.call(h).call(h.transform,c.l).on("pointermove",(function(t){})).node(),e.nodes(i),e.force("link").links(u),e.alpha(1).restart(),a()},rezoom:a})}(h.current))}),[]),Object(i.useEffect)((function(){n&&p&&(null===x||void 0===x||x.update(n))}),[x,n]),Object(f.jsx)(u.a.svg,Object(r.a)(Object(r.a)({},e),{},{ref:h,onMouseDown:function(){return g(!1)},onMouseUp:function(){return g(!0)}}))}}}]);
//# sourceMappingURL=4.b0a5c0cd.chunk.js.map