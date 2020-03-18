(this["webpackJsonpubi-map"]=this["webpackJsonpubi-map"]||[]).push([[0],{11:function(e){e.exports=JSON.parse('{"version":8,"id":"ubi-experiments","name":"UBI Experiment Map","sprite":"https://tiles.evictionlab.org/sprites","sources":{"composite":{"url":"mapbox://mapbox.mapbox-streets-v7","type":"vector"},"us-cities-10":{"type":"vector","maxzoom":10,"tiles":["https://tiles.evictionlab.org/evictions-cities-10/{z}/{x}/{y}.pbf"],"attribution":""},"us-states-10":{"type":"vector","maxzoom":10,"tiles":["https://tiles.evictionlab.org/evictions-states-10/{z}/{x}/{y}.pbf"],"attribution":""},"experiments":{"type":"geojson","data":{"type":"FeatureCollection","features":[]}}},"glyphs":"https://openmaptiles.evictionlab.org/fonts/{fontstack}/{range}.pbf","layers":[{"id":"background","type":"background","minzoom":1,"paint":{"background-color":"#f8f8f9"}},{"id":"water","type":"fill","source":"composite","source-layer":"water","filter":["==","$type","Polygon"],"layout":{"visibility":"visible"},"paint":{"fill-color":"#ececef","fill-outline-color":"#e3e3e7"}},{"id":"roads","type":"line","source":"composite","source-layer":"road","minzoom":10,"filter":["all",["==","$type","LineString"],["in","class","primary","secondary","tertiary","trunk"]],"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-color":"rgba(150,150,150,1)","line-width":{"stops":[[10,0],[13,1],[14,2]]},"line-opacity":{"stops":[[10,0],[14,1]]}}},{"id":"highways","type":"line","source":"composite","source-layer":"road","minzoom":7,"filter":["all",["==","$type","LineString"],["all",["==","class","motorway"]]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgba(150,150,150,1)","line-width":{"stops":[[10,0],[12,1],[14,3]]},"line-opacity":{"stops":[[10,0],[12,1],[14,1]]}}},{"id":"boundary_state","type":"line","source":"us-states-10","source-layer":"states","layout":{"line-cap":"round","line-join":"bevel","visibility":"visible"},"paint":{"line-color":"rgba(248, 153, 156, 1)","line-width":{"stops":[[3,1],[7,2]]},"line-blur":0.4,"line-opacity":0.8}},{"id":"roads-highways_text","type":"symbol","source":"composite","source-layer":"road_label","minzoom":11,"filter":["in","class","motorway","primary","secondary","tertiary","trunk"],"layout":{"text-size":13,"text-max-angle":45,"text-transform":"none","symbol-spacing":250,"text-font":["Lato+Bold"],"symbol-placement":"line","text-rotation-alignment":"map","text-pitch-alignment":"viewport","text-field":"{name}","text-letter-spacing":0.05,"text-keep-upright":true},"paint":{"text-color":"rgba(5, 4, 3, 1)","text-halo-color":"rgba(255,255,255,1)","text-translate":[0,0],"text-halo-width":2,"text-halo-blur":1}},{"id":"experimentSites","type":"circle","source":"experiments","paint":{"circle-color":["case",["==",["get","type"],"past"],"rgb(0,80,92)",["==",["get","type"],"proposed"],"rgb(223,70,73)",["==",["get","type"],"ongoing"],"rgb(175,105,12)","gray"],"circle-opacity":["case",["boolean",["feature-state","selected"],false],1,["boolean",["feature-state","hover"],false],0.7,0.4],"circle-radius":6,"circle-stroke-width":0}},{"id":"cluster_count","type":"symbol","source":"experiments","filter":["has","point_count"],"layout":{"text-field":"{point_count_abbreviated}","text-font":["Lato+Bold"],"text-size":11},"paint":{"text-color":"rgb(255,255,255)"}},{"id":"city_extra_small_labels","type":"symbol","source":"us-cities-10","source-layer":"cities-centers","minzoom":10,"filter":["all",[">=","p-10",50000],["<","p-10",75000]],"layout":{"text-size":{"stops":[[10,10],[12,14]]},"text-transform":"uppercase","text-font":["Lato+Bold"],"text-justify":"left","text-offset":[-2,-1],"text-anchor":"left","text-field":"{n}","text-padding":0.5,"text-letter-spacing":0.13},"paint":{"text-color":"rgba(102, 102, 102, 1)","text-halo-color":"rgba(255, 255, 255, 1)","text-halo-width":{"stops":[[1,2],[11,3]]},"text-halo-blur":1,"text-opacity":1}},{"id":"city_small_labels","type":"symbol","source":"us-cities-10","source-layer":"cities-centers","minzoom":8,"filter":["all",[">=","p-10",75000],["<","p-10",100000]],"layout":{"text-size":{"stops":[[6,12],[10,16]]},"text-transform":"uppercase","text-font":["Lato+Bold"],"text-justify":"left","text-field":"{n}","text-letter-spacing":{"stops":[[6,0.12],[10,0.12]]},"text-padding":2,"text-offset":["interpolate",["linear"],["zoom"],6,["literal",[-1,-0.5]],12,["literal",[-2,-1]]]},"paint":{"text-color":"rgba(102, 102, 102, 1)","text-halo-color":"rgba(255, 255, 255, 1)","text-halo-width":{"stops":[[6,1],[10,2]]},"text-halo-blur":1,"icon-opacity":0,"text-opacity":1}},{"id":"city_mid_labels","type":"symbol","source":"us-cities-10","source-layer":"cities-centers","minzoom":6,"maxzoom":14,"filter":["all",[">=","p-10",100000],["<","p-10",500000]],"layout":{"text-size":{"stops":[[5,12],[10,15]]},"text-transform":"uppercase","text-font":["Lato+Bold"],"text-justify":"center","text-anchor":"center","text-field":"{n}","text-padding":0,"text-letter-spacing":0.12,"icon-allow-overlap":true,"icon-ignore-placement":true,"text-offset":["interpolate",["linear"],["zoom"],6,["literal",[-1,-0.5]],10,["literal",[-2,-1]]]},"paint":{"text-color":{"stops":[[5,"rgba(5, 4, 3, 1)"],[10,"rgba(102, 102, 102, 1)"]]},"text-halo-color":"rgba(255, 255, 255, 1)","text-halo-width":{"stops":[[5,2],[6,2]]},"text-halo-blur":1,"icon-opacity":1,"icon-color":"rgba(0, 0, 0, 1)"}},{"id":"city_large_labels","type":"symbol","source":"us-cities-10","source-layer":"cities-centers","minzoom":6,"maxzoom":14,"filter":[">=","p-10",500000],"layout":{"text-size":{"stops":[[6,14],[10,20]]},"text-transform":"uppercase","text-font":["Lato+Bold"],"text-justify":"center","text-anchor":"center","text-field":"{n}","text-padding":0,"text-letter-spacing":0.12,"icon-allow-overlap":true,"icon-ignore-placement":true,"text-offset":["interpolate",["linear"],["zoom"],6,["literal",[-1,-0.5]],10,["literal",[-2,-1]]]},"paint":{"text-color":"rgba(5, 4, 3, 1)","text-halo-color":"rgba(255, 255, 255, 1)","text-halo-width":{"stops":[[5,2],[6,2]]},"text-halo-blur":1,"icon-opacity":1,"icon-color":"rgba(0, 0, 0, 1)"}}]}')},13:function(e,t,a){e.exports=a(20)},18:function(e,t,a){},19:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var i=a(0),o=a.n(i),n=a(10),r=a.n(n),s=(a(18),a(8)),l=a(2),c=a(3),p=a(5),u=a(4),d=a(1),m=a(6),f=a(12),y=["Implementation Dates","Location","Number of Recipients","Implementing Agency","Research Agency","Funding Agency","Type of Targeting","Unit of Recipient","Amount of Transfer","Frequency of Payment","Method of Evaluation","Additional Notes of Interest","Link to Website","Links to Related Resources"],x=["Location","Implementing Agency","Research Agency","Funding Agency","Type of Targeting","Amount of Transfer","Additional Notes of Interest","Link to Website","Links to Related Resources"],g=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={minimized:!0,expandedProperties:{}},a.removeCard=a.removeCard.bind(Object(d.a)(a)),a.toggleDock=a.toggleDock.bind(Object(d.a)(a)),a.toggleProperty=a.toggleProperty.bind(Object(d.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"removeCard",value:function(e){this.props.removeCard(e)}},{key:"toggleDock",value:function(){this.setState((function(e){return{minimized:!e.minimized}}))}},{key:"toggleProperty",value:function(e,t){var a=Object(f.a)({},this.state.expandedProperties);a[e]=!t,this.setState({expandedProperties:a})}},{key:"getNames",value:function(){var e=this;return this.props.cardData.map((function(t){return o.a.createElement("td",{key:"name"+t.expid,className:"name"},t.name||"(none)",o.a.createElement("p",{onClick:e.removeCard.bind(e,t.expid),className:"remove"},"\u2715"))}))}},{key:"getRows",value:function(){var e=this;return y.map((function(t){var a=x.includes(t),i=!!e.state.expandedProperties[t],n=null;a&&(n=o.a.createElement("p",{onClick:e.toggleProperty.bind(e,t,i),className:"expand-icon"},i?"-":"+"));var r="property-cell";a&&(r+=" expandible");var s="property-value";i&&(s+=" expanded");var l=e.props.cardData.map((function(e){return o.a.createElement("td",{className:r,key:t+"-td-"+e.expid},o.a.createElement("div",{className:"property-name"},t,n),o.a.createElement("p",{className:s},e[function(e){return e.split("").map((function(e){return" "===e?"":e.toLowerCase()})).join("")}(t)]||"(none)"))}));return o.a.createElement("tr",{className:"property-row",key:t},l)}))}},{key:"render",value:function(){var e="card-dock";return this.state.minimized||(e+=" maximized"),o.a.createElement("div",{onDoubleClick:this.toggleDock},o.a.createElement("table",{className:e},o.a.createElement("thead",null,o.a.createElement("tr",null,this.getNames())),o.a.createElement("tbody",null,this.getRows())))}}]),t}(o.a.PureComponent),h=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={expanded:!0},a.toggleExpand=a.toggleExpand.bind(Object(d.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"toggleExpand",value:function(){this.setState((function(e){return{expanded:!e.expanded}}))}},{key:"render",value:function(){var e="legend";return this.state.expanded||(e+=" hidden"),o.a.createElement("div",{className:e},o.a.createElement("p",{onClick:this.toggleExpand,className:"expand-icon"},"[",this.state.expanded?"-":"+","]"),o.a.createElement("div",{className:"content"},o.a.createElement("div",null,o.a.createElement("i",{className:"past"}),"Past Experiments"),o.a.createElement("div",null,o.a.createElement("i",{className:"ongoing"}),"Ongoing Experiments"),o.a.createElement("div",null,o.a.createElement("i",{className:"proposed"}),"Proposed Experiments")))}}]),t}(o.a.Component),b=function(e){function t(){return Object(l.a)(this,t),Object(p.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.id,a=e.name,i=e.location,n=e.x,r=e.y;return t?o.a.createElement("div",{className:"tooltip",style:{left:n+"px",top:r+5+"px"}},o.a.createElement("div",{className:"name"},a||"(none)"),o.a.createElement("div",{className:"detail"},o.a.createElement("p",{className:"location"},"Location:"),i),o.a.createElement("p",{className:"click-hint"},"click point for more info")):null}}]),t}(o.a.Component),v=a(7),k=a.n(v),E=a(11);a(19);k.a.accessToken="pk.eyJ1IjoiZXZpY3Rpb24tbGFiIiwiYSI6ImNqY20zamVpcTBwb3gzM28yb292YzM3dXoifQ.uKgAjsMd4qkJNqEtr3XyPQ";function j(){var e=this;String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{value:function(e,t){var a=t>0?0|t:0;return this.substring(a,a+e.length)===e}});var t={type:"FeatureCollection",features:[]},a=new XMLHttpRequest;a.addEventListener("load",(function(){!function(a,i){var o=JSON.parse(i.responseText).feed.entry,n=Object.keys(o[0]).filter((function(e){return e.startsWith("gsx$")&!e.endsWith("_db1zf")})).map((function(e){return e.substr(4)})),r=o.map((function(e,t){var a={};return n.forEach((function(t){a[t]=""===e["gsx$"+t].$t?null:e["gsx$"+t].$t,-1!==["latitude","longitude","expid","uid"].indexOf(t)&&(a[t]=+a[t]),null===a[t]&&(a[t]="")})),{type:"Feature",id:a.expid,geometry:{type:"Point",coordinates:[a.longitude,a.latitude]},properties:a}}));t={type:"FeatureCollection",features:r},e.map.getSource("experiments").setData(t)}(0,a)})),a.open("GET","https://spreadsheets.google.com/feeds/list/1gyAdUp3tekxAtz8fibILM-zHyX5CXh5OuY0Xbjxhijw/1/public/full?alt=json"),a.send()}var O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).state={lat:40.66995747013945,lng:-103.59179687498357,zoom:3,hovered:{},selectedIds:[]},a.map=null,a.getCardDock=a.getCardDock.bind(Object(d.a)(a)),a.removeCard=a.removeCard.bind(Object(d.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.map=new k.a.Map({container:this.mapContainer,style:E,center:[this.state.lng,this.state.lat],zoom:this.state.zoom}),this.map.on("move",(function(){e.setState({lng:e.map.getCenter().lng.toFixed(4),lat:e.map.getCenter().lat.toFixed(4),zoom:e.map.getZoom().toFixed(2)})})),this.map.on("click","experimentSites",this.featuresOnClick.bind(this)),this.map.on("mouseenter","experimentSites",this.featuresOnHover.bind(this)),this.map.on("mouseleave","experimentSites",this.featuresOnUnhover.bind(this)),j.call(this)}},{key:"featuresOnClick",value:function(e){var t=e.features[0].id,a=Object(s.a)(this.state.selectedIds),i=a.indexOf(t),o=i>-1;if(o)a.splice(i,1);else{if(a.length>=3)return void console.log("OH SHET!");a.push(t)}this.setState({selectedIds:a}),this.map.setFeatureState({source:"experiments",id:t},{selected:!o})}},{key:"featuresOnHover",value:function(e){this.map.getCanvas().style.cursor="pointer";var t=e.features[0],a=t.id,i=t.properties,o=i.name,n=i.location,r=e.point,s=r.x,l=r.y;this.setState({hovered:{id:a,name:o,location:n,x:s,y:l}}),this.map.setFeatureState({source:"experiments",id:a},{hover:!0})}},{key:"featuresOnUnhover",value:function(){this.map.getCanvas().style.cursor="",this.map.setFeatureState({source:"experiments",id:this.state.hovered.id},{hover:!1}),this.setState({hovered:{}})}},{key:"removeCard",value:function(e){var t=Object(s.a)(this.state.selectedIds),a=t.indexOf(e);t.splice(a,1),this.setState({selectedIds:t}),this.map.setFeatureState({source:"experiments",id:e},{selected:!1})}},{key:"getCardDock",value:function(){if(!this.map||!this.state.selectedIds.length)return null;var e=this.map.getSource("experiments")._data.features,t=this.state.selectedIds.map((function(t){return e.find((function(e){return e.id===t})).properties}));return o.a.createElement(g,{removeCard:this.removeCard,cardData:t})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"app"},this.getCardDock(),o.a.createElement("div",{ref:function(t){return e.mapContainer=t},className:"map-container"}),o.a.createElement(b,this.state.hovered),o.a.createElement(h,null))}}]),t}(o.a.Component);r.a.render(o.a.createElement(O,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.f4652081.chunk.js.map