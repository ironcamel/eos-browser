(window["webpackJsonpeos-browser"]=window["webpackJsonpeos-browser"]||[]).push([[0],{30:function(e,t,a){e.exports=a(99)},98:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(26),s=a.n(c),o=a(5),i=a(8),l=a(6),u=a(9),p=a(7),b=a(2),h=a.n(b),f=a(3),m=a(4),k=a(27),d=a(28),v=a.n(d),w=a(29),E=new(a.n(w).a),x=new function e(){var t=this;Object(m.a)(this,e),this.api_url="https://api.eosnewyork.io",this.rpc=new k.JsonRpc(this.api_url),this.abiCache={},this.retryDelay=1e3,this.maxRetries=10,this.getPrevBlock=function(){var e=Object(f.a)(h.a.mark((function e(a){var n,r,c,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=4;break}n=a.previous,e.next=9;break;case 4:return e.next=6,t.getInfo();case 6:r=e.sent,c=r.head_block_id,n=c;case 9:return e.next=11,t.getBlock(n);case 11:return(s=e.sent).actions=[],t.processBlock(s),console.log(s.actions),e.abrupt("return",s);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.processBlock=function(e){e.actions=[],e.transactions.forEach((function(t){if("object"===typeof t.trx){var a,n=t.trx.transaction.actions;(a=e.actions).push.apply(a,Object(p.a)(n))}}))},this.wait=function(e){return new Promise((function(t){return setTimeout(t,e)}))},this.getInfo=Object(f.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.retry(Object(f.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.rpc.get_info());case 1:case"end":return e.stop()}}),e)})))));case 1:case"end":return e.stop()}}),e)}))),this.getBlock=function(){var e=Object(f.a)(h.a.mark((function e(a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.retry(Object(f.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.rpc.get_block(a));case 1:case"end":return e.stop()}}),e)})))));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.getAbi=function(){var e=Object(f.a)(h.a.mark((function e(a){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.abiCache[a]){e.next=2;break}return e.abrupt("return",t.abiCache[a]);case 2:return e.next=4,t.retry(Object(f.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.rpc.get_abi(a));case 1:case"end":return e.stop()}}),e)}))));case 4:return(n=e.sent).contracts={},n.abi&&n.abi.actions.forEach((function(e){n.contracts[e.name]=e.ricardian_contract})),t.abiCache[a]=n,e.abrupt("return",n);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.retry=function(){var e=Object(f.a)(h.a.mark((function e(a){var n,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(r||!(n<t.maxRetries)){e.next=16;break}return e.prev=2,e.next=5,a();case 5:r=e.sent,e.next=14;break;case 8:return e.prev=8,e.t0=e.catch(2),n++,console.log("ERROR !!!!!!!!! retry: "+n),e.next=14,t.wait(t.retryDelay);case 14:e.next=1;break;case 16:return e.abrupt("return",r);case 17:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},O=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={blocks:[]},a.totalBlocks=10,a.loadData=Object(f.a)(h.a.mark((function e(){var t,n,r,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=[],a.setState({blocks:t}),n=0;case 3:if(!(n<a.totalBlocks)){e.next=13;break}return r=t[t.length-1],e.next=7,x.getPrevBlock(r);case 7:c=e.sent,t=[].concat(Object(p.a)(t),[c]),a.setState({blocks:t});case 10:n++,e.next=3;break;case 13:case 14:case"end":return e.stop()}}),e)}))),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"render",value:function(){var e=this.state.blocks;return r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"app-title"},"EOSIO Blockchain Browser"),r.a.createElement("button",{onClick:this.loadData},"LOAD"),r.a.createElement(g,{blocks:e,totalBlocks:this.totalBlocks}))}}]),t}(n.Component);function j(e){var t=r.a.createElement("span",{className:"eos-value"},e.value),a=r.a.createElement("div",{className:"eos-label"},e.label,":");return e.onClick&&(t=r.a.createElement("a",{href:"#",onClick:e.onClick},t),a=r.a.createElement("a",{href:"#",onClick:e.onClick},a)),r.a.createElement("div",null,a,t)}var y=function(e){function t(e){var a;Object(m.a)(this,t),(a=Object(i.a)(this,Object(l.a)(t).call(this,e))).handleClick=function(e){e.preventDefault(),a.state.showDetails||a.populateDetails(),a.setState((function(e){return{showDetails:!e.showDetails}}))},a.renderContract=function(e,t){try{return E.render(v.a.render(e,t))}catch(a){return console.log("ERROR: failed to render contract"),console.log(a),""}},a.populateDetails=Object(f.a)(h.a.mark((function e(){var t,n,r,c,s,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.state.detailsDownloaded){e.next=2;break}return e.abrupt("return");case 2:t=a.state.actions,n=0;case 4:if(!(n<t.length)){e.next=16;break}if(!(r=t[n]).contract){e.next=8;break}return e.abrupt("continue",13);case 8:return e.next=10,x.getAbi(r.account);case 10:c=e.sent,(s=c.contracts[r.name])&&((o=Object(p.a)(a.state.actions))[n].contract=a.renderContract(s,r.data),a.setState({actions:o}));case 13:n++,e.next=4;break;case 16:a.setState({detailsDownloaded:!0});case 17:case"end":return e.stop()}}),e)})));var n=a.props.block;return a.state={actions:n.actions,showDetails:!1,detailsDownloaded:!1},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.block,t=this.state.showDetails,a=0,n=this.state.actions.map((function(e){return r.a.createElement("div",{className:"eos-block",key:a++},r.a.createElement(j,{label:"action",value:e.name}),r.a.createElement(j,{label:"account",value:e.account}),r.a.createElement(j,{label:"contract"}),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.contract}}))})),c=r.a.createElement("a",{href:"#",onClick:this.handleClick},"hide actions"),s=r.a.createElement("div",{className:"eos-details"},c,n,c);return r.a.createElement("div",null,r.a.createElement("div",{className:"eos-block"},r.a.createElement(j,{label:"hash",value:e.id}),r.a.createElement(j,{label:"timestamp",value:e.timestamp}),r.a.createElement(j,{label:"actions",value:e.actions.length,onClick:this.handleClick})),t&&s,r.a.createElement("hr",null))}}]),t}(n.Component),g=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).isLoading=function(e){return e.length<a.props.totalBlocks},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.blocks.map((function(e){return r.a.createElement(y,{block:e,key:e.id})})),t=r.a.createElement("div",{className:"spinner-container"},r.a.createElement("img",{className:"spinner",src:"spinner.gif"}));return r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("div",{className:"eos-blockchain"},e),this.isLoading(e)&&t)}}]),t}(n.Component),C=O;a(98);s.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.7402c392.chunk.js.map