(window["webpackJsonpeos-browser"]=window["webpackJsonpeos-browser"]||[]).push([[0],{111:function(e,t,n){},112:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(9),o=n(10),s=n(6),i=n(2),l=n.n(i),u=n(4),b=n(11),p=n(32),k=n(37),f=n(33),d=n(38),h=function(){return{type:"REQUEST_BLOCKS"}},m=function(e){return{type:"RECEIVED_BLOCK",block:e}},E=function(){return{type:"DONE_FETCHING_BLOCKS"}},v=function(e,t,n){return{type:"RECEIVED_DETAIL",blockId:e,actionIdx:t,contract:n}},y=n(7),O=n(34),B=function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(b.a)(this,e),this.getPrevBlock=function(){var e=Object(u.a)(l.a.mark((function e(n){var a,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=4;break}a=n.previous,e.next=8;break;case 4:return e.next=6,t.getInfo();case 6:r=e.sent,a=r.head_block_id;case 8:return e.next=10,t.getBlock(a);case 10:return(c=e.sent).actions=[],t.processBlock(c),e.abrupt("return",c);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.processBlock=function(e){e.actions=[],e.transactions.forEach((function(t){if("object"===typeof t.trx){var n,a=t.trx.transaction.actions;(n=e.actions).push.apply(n,Object(y.a)(a))}}))},this.wait=function(e){return new Promise((function(t){return setTimeout(t,e)}))},this.getInfo=function(){return t.retry((function(){return t.rpc.get_info()}))},this.getBlock=function(e){return t.retry((function(){return t.rpc.get_block(e)}))},this.getAbi=function(){var e=Object(u.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.abiCache[n]){e.next=2;break}return e.abrupt("return",t.abiCache[n]);case 2:return e.next=4,t.retry(Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.rpc.get_abi(n));case 1:case"end":return e.stop()}}),e)}))));case 4:return(a=e.sent).contracts={},a.abi&&a.abi.actions.forEach((function(e){a.contracts[e.name]=e.ricardian_contract})),t.abiCache[n]=a,e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.retry=function(){var e=Object(u.a)(l.a.mark((function e(n){var a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0;case 1:if(r||!(a<t.maxRetries)){e.next=15;break}return e.prev=2,e.next=5,n();case 5:r=e.sent,e.next=13;break;case 8:return e.prev=8,e.t0=e.catch(2),a++,e.next=13,t.wait(t.retryDelay);case 13:e.next=1;break;case 15:return e.abrupt("return",r);case 16:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t){return e.apply(this,arguments)}}(),Object.assign(this,{apiUrl:"https://api.eosnewyork.io",abiCache:{},retryDelay:1e3,maxRetries:10},n),this.rpc||(this.rpc=new O.JsonRpc(this.apiUrl))},I=n(35),g=n.n(I),w=n(36);var j=function(e){var t=e.label,n=e.value,a=e.onClick,c=r.a.createElement("span",{className:"eos-label"},t,":"),o=r.a.createElement("span",{className:"eos-value"},n);return a&&(c=r.a.createElement("button",{type:"button",className:"link-button",onClick:a},c),o=r.a.createElement("button",{type:"button",className:"link-button",onClick:a},o)),r.a.createElement("div",null,r.a.createElement("div",{className:"eos-label"},c),o)};var x=function(e){var t=e.block,n=e.onClick,a=0,c=t.actions.map((function(e){return r.a.createElement("div",{className:"eos-block",key:++a},r.a.createElement(j,{label:"action",value:e.name}),r.a.createElement(j,{label:"account",value:e.account}),r.a.createElement(j,{label:"contract"}),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.contract}}))})),o=r.a.createElement("button",{type:"button",className:"link-button",onClick:function(){return n(t)}},"hide actions"),s=r.a.createElement("div",{className:"eos-details"},o,c,o);return r.a.createElement("div",null,r.a.createElement("div",{className:"eos-block"},r.a.createElement(j,{label:"hash",value:t.id}),r.a.createElement(j,{label:"timestamp",value:t.timestamp}),r.a.createElement(j,{label:"actions",value:t.actions.length,onClick:function(){return n(t)}})),t.showDetails&&s,r.a.createElement("hr",null))},D=new(n.n(w).a),C=function(e,t){try{return D.render(g.a.render(e,t))}catch(n){return console.log("ERROR: failed to render contract"),console.log(n),""}},_=function(){var e=Object(u.a)(l.a.mark((function e(t,n,a){var r,c,o,s,i,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.actions,!t.isFetchingDetails){e.next=3;break}return e.abrupt("return");case 3:n({type:"REQUEST_DETAILS",blockId:t.id}),c=0;case 5:if(!(c<r.length)){e.next=17;break}if(!(o=r[c]).contract){e.next=9;break}return e.abrupt("continue",14);case 9:return e.next=11,a.getAbi(o.account);case 11:s=e.sent,(i=s.contracts[o.name])&&(o.contract=C(i,o.data),u=C(i,o.data),n(v(t.id,c,u)));case 14:c++,e.next=5;break;case 17:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),N=Object(s.b)((function(e,t){var n=e.blocksById,a=e.isFetchingDetails;return{block:n[t.block.id],isFetchingDetails:a}}),(function(e,t){return{onClick:function(n){return function(e,t,n){e.showDetails||_(e,t,n),t({type:"TOGGLE_DETAILS",blockId:e.id})}(n,e,t.eosClient)}}}))(x);var L=function(e){var t=e.blocks,n=e.blocksById,a=e.totalBlocks,c=e.eosClient,o=t.length<a,s=t.map((function(e){return r.a.createElement(N,{block:n[e],key:e,eosClient:c})})),i=r.a.createElement("div",{className:"spinner-container"},r.a.createElement("img",{alt:"spinner",className:"spinner",src:"spinner.gif"}));return r.a.createElement("div",{className:"eos-blockchain"},r.a.createElement("hr",null),r.a.createElement("div",null,s),o&&i)},S=new B,T=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(k.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).totalBlocks=2,n.loadData=Object(u.a)(l.a.mark((function e(){var t,a,r,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.props,a=t.dispatch,!t.isFetchingBlocks){e.next=3;break}return e.abrupt("return");case 3:a(h()),c=0;case 5:if(!(c<n.totalBlocks)){e.next=14;break}return o=r,e.next=9,S.getPrevBlock(o);case 9:r=e.sent,a(m(r));case 11:c++,e.next=5;break;case 14:a(E());case 15:case"end":return e.stop()}}),e)}))),n}return Object(d.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"render",value:function(){var e=this.props,t=e.blocks,n=e.blocksById;return r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"app-title"},"EOSIO Blockchain Browser"),r.a.createElement("button",{type:"button",className:"button",onClick:this.loadData},"LOAD"),r.a.createElement(L,{blocks:t,blocksById:n,totalBlocks:this.totalBlocks,eosClient:S}))}}]),t}(a.Component),R=Object(s.b)((function(e){return{blocks:e.blocks,blocksById:e.blocksById,isFetchingBlocks:e.isFetchingBlocks}}))(T),F=n(8);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(n,!0).forEach((function(t){Object(F.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var G={isFetchingBlocks:!1,blocks:[],blocksById:{}},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REQUEST_BLOCKS":return A({},e,{blocks:[],blocksById:{},isFetchingBlocks:!0});case"RECEIVED_BLOCK":var n=t.block,a=[].concat(Object(y.a)(e.blocks),[n.id]),r=A({},e.blocksById,Object(F.a)({},n.id,n));return A({},e,{blocks:a,blocksById:r});case"DONE_FETCHING_BLOCKS":return A({},e,{isFetchingBlocks:!1});case"REQUEST_DETAILS":var c=t.blockId,o=A({},e.blocksById[c],{isFetchingDetails:!0}),s=A({},e.blocksById,Object(F.a)({},o.id,o));return A({},e,{blocksById:s});case"RECEIVED_DETAIL":var i=t.blockId,l=t.actionIdx,u=t.contract,b=e.blocksById[i],p=b.actions,k=A({},p[l],{contract:u}),f=[].concat(Object(y.a)(p.slice(0,l)),[k],Object(y.a)(p.slice(l+1))),d=A({},b,{actions:f}),h=A({},e.blocksById,Object(F.a)({},d.id,d));return A({},e,{blocksById:h});case"TOGGLE_DETAILS":var m=t.blockId,E=e.blocksById[m],v=A({},E,{showDetails:!E.showDetails}),O=A({},e.blocksById,Object(F.a)({},v.id,v));return A({},e,{blocksById:O});default:return e}},U=(n(111),Object(o.b)(K));Object(c.render)(r.a.createElement(s.a,{store:U},r.a.createElement(R,null)),document.getElementById("root"))},39:function(e,t,n){e.exports=n(112)}},[[39,1,2]]]);
//# sourceMappingURL=main.cd1ca447.chunk.js.map