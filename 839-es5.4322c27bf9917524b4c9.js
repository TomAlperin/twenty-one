!function(){"use strict";function t(t,n){var a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=e(t))||n&&t&&"number"==typeof t.length){a&&(t=a);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,r=!0,c=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return r=t.done,t},e:function(t){c=!0,s=t},f:function(){try{r||null==a.return||a.return()}finally{if(c)throw s}}}}function n(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||e(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,n){if(t){if("string"==typeof t)return a(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?a(t,n):void 0}}function a(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,a=new Array(n);e<n;e++)a[e]=t[e];return a}function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function o(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function s(t,n,e){return n&&o(t.prototype,n),e&&o(t,e),t}(self.webpackChunktwenty_one=self.webpackChunktwenty_one||[]).push([[839],{1839:function(e,a,o){o.r(a),o.d(a,{SolitaireModule:function(){return nt}});var r=o(8583),c=o(3423),l=o(2340),u=o(4762),d=o(9765),g=o(6782),h=o(4394),p=o(3815),f=o(7716),m=o(7812),v=o(9195),b=o(1095),y=o(1306);function k(t,n){if(1&t&&(f.TgZ(0,"tr"),f.TgZ(1,"td"),f._uU(2),f.qZA(),f.TgZ(3,"td"),f._uU(4),f.qZA(),f.qZA()),2&t){var e=n.$implicit,a=f.oxw().$implicit;f.xp6(2),f.Oqu(e.name),f.xp6(2),f.Oqu(e.value(a))}}var w=function(t,n){return{"col-lg-6":t,"col-xl-4":n}};function x(t,n){if(1&t&&(f.TgZ(0,"div",18),f.ALo(1,"keyvalue"),f.ALo(2,"keyvalue"),f.TgZ(3,"h2"),f._uU(4),f.qZA(),f.TgZ(5,"table",19),f.TgZ(6,"tbody"),f.YNc(7,k,5,2,"tr",20),f.qZA(),f.qZA(),f.TgZ(8,"label"),f._uU(9,"Wins vs Losses"),f.qZA(),f.TgZ(10,"div",21),f.TgZ(11,"div",22),f.ALo(12,"percent"),f._uU(13),f.ALo(14,"percent"),f.qZA(),f.TgZ(15,"div",23),f.ALo(16,"percent"),f._uU(17),f.ALo(18,"percent"),f.qZA(),f.qZA(),f.TgZ(19,"label"),f._uU(20,"Wins : Best Winning Streak"),f.qZA(),f.TgZ(21,"div",21),f.TgZ(22,"div",24),f.ALo(23,"appPercentBar"),f.ALo(24,"percent"),f._uU(25),f.qZA(),f.qZA(),f.TgZ(26,"label"),f._uU(27,"Losses : Worst Losing Streak"),f.qZA(),f.TgZ(28,"div",21),f.TgZ(29,"div",24),f.ALo(30,"appPercentBar"),f.ALo(31,"percent"),f._uU(32),f.qZA(),f.qZA(),f.qZA()),2&t){var e=n.$implicit,a=f.oxw();f.Q6J("ngClass",f.WLB(44,w,!(null!=a.settings&&a.settings.sidebar)&&f.lcZ(1,24,a.stats).length>1,!(null!=a.settings&&a.settings.sidebar)&&f.lcZ(2,26,a.stats).length>2)),f.xp6(4),f.Oqu(e.key),f.xp6(3),f.Q6J("ngForOf",a.rows)("ngForTrackBy",a.trackByFn),f.xp6(4),f.Udp("width",e.value.totalWins+e.value.totalLosses===0?0:f.lcZ(12,28,e.value.totalWins/(e.value.totalWins+e.value.totalLosses))),f.xp6(2),f.hij(" Won: ",f.lcZ(14,30,e.value.totalWins/(e.value.totalWins+e.value.totalLosses))," "),f.xp6(2),f.Udp("width",e.value.totalWins+e.value.totalLosses===0?0:f.lcZ(16,32,e.value.totalLosses/(e.value.totalWins+e.value.totalLosses))),f.xp6(2),f.hij(" Lost: ",f.lcZ(18,34,e.value.totalLosses/(e.value.totalWins+e.value.totalLosses))," "),f.xp6(5),f.Gre("progress-bar ",0===e.value.maxWins?"bg-danger":f.lcZ(23,36,e.value.wins/e.value.maxWins),""),f.Udp("width",0===e.value.maxWins?0:f.lcZ(24,38,e.value.wins/e.value.maxWins)),f.xp6(3),f.AsE(" ",e.value.wins," : ",e.value.maxWins," "),f.xp6(4),f.Gre("progress-bar ",0===e.value.maxLose?"bg-success":f.lcZ(30,40,1-e.value.losses/e.value.maxLose),""),f.Udp("width",0===e.value.maxLose?0:f.lcZ(31,42,e.value.losses/e.value.maxLose)),f.xp6(3),f.AsE(" ",e.value.losses," : ",e.value.maxLose," ")}}var Z,C=function(t,n){return{show:t,sidebar:n}},T=function(t,n){return{"modal-xl":t,"modal-lg":n}},O=function(t){return{show:t}},_=((Z=function(){function t(n,e,a){var o=this;i(this,t),this.solitaire=n,this.twentyone=e,this.appRef=a,this.rows=[{name:"Total Hands Played",value:function(t){return"".concat(t.value.gamesPlayed)}},{name:"Winning Streak",value:function(t){return"".concat(t.value.wins||"")}},{name:"Best Winning Streak",value:function(t){return"".concat(t.value.maxWins||"")}},{name:"Losiing Streak",value:function(t){return"".concat(t.value.losses||"")}},{name:"Worst Losing Streak",value:function(t){return"".concat(t.value.maxLose||"")}},{name:"Total Games Won",value:function(t){return"".concat(t.value.totalWins)}},{name:"Total Games Lost",value:function(t){return"".concat(t.value.totalLosses)}}],this.destroyed$=new d.xQ,this.trackByFn=function(t){return t},this.solitaire.gameStats$.pipe((0,g.R)(this.destroyed$)).subscribe(function(t){return o.stats=t}),this.twentyone.settings$.pipe((0,g.R)(this.destroyed$)).subscribe(function(t){return o.settings=t})}return s(t,[{key:"ngOnInit",value:function(){var t=this;setTimeout(function(){return t.show=!0},0)}},{key:"close",value:function(){var t=this;this.show=!1,setTimeout(function(){t.appRef.detachView(t.componentRef.hostView),t.componentRef.destroy()},180)}},{key:"setSidebar",value:function(){this.settings.sidebar=!this.settings.sidebar,this.twentyone.saveSettings(this.settings)}},{key:"ngOnDestroy",value:function(){this.destroyed$.next(),this.destroyed$.complete()}}]),t}()).\u0275fac=function(t){return new(t||Z)(f.Y36(m.t),f.Y36(v.K),f.Y36(f.z2F))},Z.\u0275cmp=f.Xpm({type:Z,selectors:[["ng-component"]],inputs:{componentRef:"componentRef"},decls:26,vars:23,consts:[[1,"modal","fade",3,"ngClass","click"],[3,"ngClass","click"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["href","#",1,"tab-loop",3,"focus"],["mdAutoFocus","","type","button",1,"btn-resize",3,"click"],["first",""],["height","25px","alt","Window Resize",3,"src"],["type","button","aria-label","Close",1,"button-close",3,"click"],["src","~src/assets/img/close.svg","height","25px","alt","Window Resize"],[1,"modal-body"],[1,"row","d-flex","justify-content-center"],["class","col-sm-12",3,"ngClass",4,"ngFor","ngForOf","ngForTrackBy"],[1,"modal-footer"],["type","button","mat-stroked-button","","color","primary",3,"click"],["last",""],[1,"modal-backdrop","fade",3,"ngClass"],[1,"col-sm-12",3,"ngClass"],[1,"table","table-sm","w-100"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"progress"],["role","progressbar","aria-valuenow","0","aria-valuemin","0","aria-valuemax","100",1,"progress-bar","bg-info"],["role","progressbar","aria-valuenow","0","aria-valuemin","0","aria-valuemax","100",1,"progress-bar","bg-danger"],["role","progressbar","aria-valuenow","0","aria-valuemin","0","aria-valuemax","100"]],template:function(t,n){if(1&t){var e=f.EpF();f.TgZ(0,"div",0),f.NdJ("click",function(){return n.close()}),f.TgZ(1,"div",1),f.NdJ("click",function(t){return t.stopPropagation()}),f.ALo(2,"keyvalue"),f.ALo(3,"keyvalue"),f.TgZ(4,"div",2),f.TgZ(5,"div",3),f.TgZ(6,"h5",4),f._uU(7,"Solitaire Stats"),f.qZA(),f.TgZ(8,"a",5),f.NdJ("focus",function(){return f.CHM(e),f.MAs(21).focus()}),f._uU(9,"to last"),f.qZA(),f.TgZ(10,"button",6,7),f.NdJ("click",function(){return n.setSidebar()}),f._UZ(12,"img",8),f.qZA(),f.TgZ(13,"button",9),f.NdJ("click",function(){return n.close()}),f._UZ(14,"img",10),f.qZA(),f.qZA(),f.TgZ(15,"div",11),f.TgZ(16,"div",12),f.YNc(17,x,33,47,"div",13),f.ALo(18,"keyvalue"),f.qZA(),f.qZA(),f.TgZ(19,"div",14),f.TgZ(20,"button",15,16),f.NdJ("click",function(){return n.close()}),f._uU(22," Close "),f.qZA(),f.TgZ(23,"a",5),f.NdJ("focus",function(){return f.CHM(e),f.MAs(11).focus()}),f._uU(24,"to last"),f.qZA(),f.qZA(),f.qZA(),f.qZA(),f.qZA(),f._UZ(25,"div",17)}2&t&&(f.Q6J("ngClass",f.WLB(15,C,n.show,n.settings.sidebar)),f.xp6(1),f.Gre("modal-dialog modal-dialog-centered modal-dialog-scrollable",n.settings.sidebar?"":" modal-xl",""),f.Q6J("ngClass",f.WLB(18,T,!n.settings.sidebar&&f.lcZ(2,9,n.stats).length>2,!n.settings.sidebar&&f.lcZ(3,11,n.stats).length>1)),f.xp6(11),f.MGl("src","~src/assets/img/",null!=n.settings&&n.settings.sidebar?"dice-1.svg":"arrow-right-square.svg","",f.LSH),f.xp6(5),f.Q6J("ngForOf",f.lcZ(18,13,n.stats))("ngForTrackBy",n.trackByFn),f.xp6(8),f.Q6J("ngClass",f.VKq(21,O,n.show)))},directives:[r.mk,r.sg,b.lW],pipes:[r.Nd,r.Zx,y.g],styles:["h2[_ngcontent-%COMP%]{margin:0}label[_ngcontent-%COMP%]{font-weight:600}.progress[_ngcontent-%COMP%]{margin-bottom:12px}"]}),Z),M=o(9004),S=o(4252),P=o(3671),A=o(1026),q=o(3949),Y=["cardElement"];function F(t,n){1&t&&f._UZ(0,"app-card",6),2&t&&f.Q6J("card",n.$implicit||0)("animate",!1)}var L=function(t,n){return{"undo-drag":t,dragging:n}},W=function(t,n){return{top:t,left:n}},X=function(){var e=function(){function e(t,n,a){var o=this;i(this,e),this.window=t,this.solitaire=n,this.soundService=a,this.dragging=!1,this.dragged=!1,this.lastX=0,this.lastY=0,this.posX=0,this.posY=0,this.undoDrag=!1,this.tableau=[],this.foundation=[],this.cards=[],this.destroyed$=new d.xQ,this.trackByFn=function(t,n){return n},this.window.mousetouchmove$.pipe((0,g.R)(this.destroyed$)).subscribe(function(t){return o.doDrag(t)}),this.window.mousetouchend$.pipe((0,g.R)(this.destroyed$)).subscribe(function(t){return o.endDrag(t)})}return s(e,[{key:"start",value:function(t){t.preventDefault(),this.startElement=t.target,this.cards.length&&(document.body.classList.add("dragging"),this.dragging=!0,this.soundService.playSound("card-sound"))}},{key:"doDrag",value:function(t){t.preventDefault();var n=t.clientX||p.get(t,"touches[0].clientX"),e=t.clientY||p.get(t,"touches[0].clientY"),a=void 0!==t.clientX||!t.touches[1];(Math.abs(this.posX)>10||Math.abs(this.posY)>10)&&(this.dragged=!0),this.dragging&&a&&(this.lastX&&(this.posX+=n-this.lastX,this.posY+=e-this.lastY),this.lastX=n,this.lastY=e)}},{key:"endDrag",value:function(t){document.body.classList.remove("dragging");var e,a=!0,i=p.get(t,"changedTouches[0]");if(e=i?document.elementFromPoint(i.clientX,i.clientY):document.elementFromPoint(t.x,t.y),this.dragging)if(this.dragged){var o;if(e&&(o=e.getAttribute("data-column")),o){var s=this.cards[this.cards.length-1],r=Math.floor(s/4),c=s%4;if(+o>6){if(this.foundation[+o-7].length+1===r){var l=this.foundation[+o-7][this.foundation[+o-7].length-1];if(!l||c===p.get(l,"card",l)%4){var u=this.cards.pop();this.foundation[+o-7].push(u),a=!1}}this.dragging=!1,this.dragged=!1,this.posX=0,this.posY=0,this.lastX=0,this.lastY=0,this.solitaire.checkWin(this.foundation)}else{var d=this.tableau[o][this.tableau[o].length-1],g=0,h=0;if(d&&(g=Math.floor(d.card/4),h=d.card%4),r===g-1&&c%2!=h%2||0===g&&13===r){var f=this.cards.pop();this.tableau[o].push({card:f,flip:!1}),this.tableau[o]=n(this.tableau[o]),this.solitaire.checkWin(this.foundation),a=!1}}}a&&this.resetDrag()}else this.toFoundation();this.dragging=!1,this.dragged=!1,this.posX=0,this.posY=0,this.lastX=0,this.lastY=0}},{key:"resetDrag",value:function(){var t=this;setTimeout(function(){return t.soundService.playSound("card-sound")},180),this.undoDrag=!0,clearTimeout(this.timeout),this.timeout=setTimeout(function(){t.posX=0,t.posY=0,t.lastX=0,t.lastY=0,t.timeout=setTimeout(function(){return t.undoDrag=!1},180)},0)}},{key:"toFoundation",value:function(){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function n(){var e,a,i,o,s,r,c,l,u,d,g,h,f,m,v,b,y,k,w;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e=this.cards[this.cards.length-1],a=Math.floor(e/4),i=e%4,o=0,s=!0,r=t(this.foundation),n.prev=3,r.s();case 5:if((c=r.n()).done){n.next=16;break}if((l=c.value).length+1!==a){n.next=13;break}if((u=l[l.length-1])&&i!==p.get(u,"card",u)%4){n.next=13;break}return d=document.getElementsByClassName("foundation-".concat(o))[0],g=this.startElement.getBoundingClientRect(),h=g.left,f=g.top,m=d.getBoundingClientRect(),v=m.left,b=m.top,y=h-v,k=f-b,w=this.cards.pop(),this.foundation[o].push({card:w,offsetX:y,offsetY:k,deg:0,scale:1.1}),s=!1,this.solitaire.checkWin(this.foundation),n.abrupt("break",16);case 13:o++;case 14:n.next=5;break;case 16:n.next=21;break;case 18:n.prev=18,n.t0=n.catch(3),r.e(n.t0);case 21:return n.prev=21,r.f(),n.finish(21);case 24:s&&this.soundService.playSound("card-sound");case 25:case"end":return n.stop()}},n,this,[[3,18,21,24]])}))}},{key:"nativeElement",get:function(){return this.cardElement.nativeElement}},{key:"ngOnDestroy",value:function(){this.destroyed$.next(),this.destroyed$.complete()}}]),e}();return e.\u0275fac=function(t){return new(t||e)(f.Y36(M.u),f.Y36(m.t),f.Y36(S.y))},e.\u0275cmp=f.Xpm({type:e,selectors:[["app-card-talon"]],viewQuery:function(t,n){var e;(1&t&&f.Gf(Y,5),2&t)&&(f.iGM(e=f.CRH())&&(n.cardElement=e.first))},inputs:{tableau:"tableau",foundation:"foundation",cards:"cards",column:"column",animate:"animate"},decls:6,vars:12,consts:[[1,"text-center","position-relative"],["src","~src/assets/img/card-placeholder.png","alt","Card Placeholder","pos","relative",1,"card-placeholder"],["pos","absolute","class","card-stack",3,"card","animate",4,"ngFor","ngForOf","ngForTrackBy"],[1,"card-group","block","text-center","position-absolute","w-100",3,"ngClass","ngStyle"],["pos","relative",3,"card","animate","mousedown","touchstart"],["cardElement",""],["pos","absolute",1,"card-stack",3,"card","animate"]],template:function(t,n){1&t&&(f.TgZ(0,"div",0),f._UZ(1,"img",1),f.YNc(2,F,1,2,"app-card",2),f.TgZ(3,"div",3),f.TgZ(4,"app-card",4,5),f.NdJ("mousedown",function(t){return n.start(t)})("touchstart",function(t){return n.start(t)}),f.qZA(),f.qZA(),f.qZA()),2&t&&(f.xp6(2),f.Q6J("ngForOf",n.cards.slice(0,-1))("ngForTrackBy",n.trackByFn),f.xp6(1),f.Q6J("ngClass",f.WLB(6,L,n.undoDrag,n.dragging))("ngStyle",f.WLB(9,W,n.posY+"px",n.posX+"px")),f.xp6(1),f.Q6J("card",n.cards[n.cards.length-1]||0)("animate",n.animate))},directives:[r.sg,r.mk,r.PC,q.A],styles:[".card-group[_ngcontent-%COMP%]{position:relative}.card-group[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%]{margin:0 auto;display:inline-block}.card-placeholder[_ngcontent-%COMP%]{background:rgba(0,0,0,.15);margin:4px auto}.dragging[_ngcontent-%COMP%]{pointer-events:none;touch-action:none}.undo-drag[_ngcontent-%COMP%]{transition:all .18s ease-in-out}.dragging[_ngcontent-%COMP%], .undo-drag[_ngcontent-%COMP%]{z-index:100;transform:scale(1.1);-moz-filter:drop-shadow(-2px -2px 8px rgba(0,0,0,.5));filter:drop-shadow(-2px -2px 8px rgba(0,0,0,.5))}.card-stack[_ngcontent-%COMP%]{position:absolute;width:100%;top:0;left:0}"]}),e}(),$=o(166),R=["card"];function B(t,n){if(1&t&&(f._UZ(0,"app-card-group",4),f.ALo(1,"cardGroup")),2&t){var e=f.oxw();f.Q6J("tableau",e.tableau)("foundation",e.foundation)("cards",f.lcZ(1,7,e.cards))("column",e.column)("width",e.width)("animate",e.animate)("cardSound",e.cardSound)}}var J=function(t,n){return{dragging:t,"undo-drag":n}},U=function(t,n){return{top:t,left:n}},Q=function(t){return{select:t}},D=function(t){return{"z-index":t}},G=function(){var e=function(){function e(t,n,a,o){var s=this;i(this,e),this.window=t,this.solitaire=n,this.twentyone=a,this.soundService=o,this.dragging=!1,this.dragged=!1,this.lastX=0,this.lastY=0,this.posX=0,this.posY=0,this.undoDrag=!1,this.tableau=[],this.foundation=[],this.cards=[],this.destroyed$=new d.xQ,this.window.mousetouchmove$.pipe((0,g.R)(this.destroyed$)).subscribe(function(t){return s.doDrag(t)}),this.window.mousetouchend$.pipe((0,g.R)(this.destroyed$)).subscribe(function(t){return s.endDrag(t)})}return s(e,[{key:"start",value:function(t){t.preventDefault(),this.cards[0].flip||(this.startElement=t.target,this.dragging=!0,document.body.classList.add("dragging"),this.soundService.playSound("card-sound"))}},{key:"doDrag",value:function(t){if(this.dragging){var n=t.clientX||p.get(t,"touches[0].clientX"),e=t.clientY||p.get(t,"touches[0].clientY"),a=void 0!==t.clientX||!t.touches[1];(Math.abs(this.posX)>10||Math.abs(this.posY)>10)&&(this.dragged=!0),clearTimeout(this.timeout),a&&this.lastX&&!this.cards[0].flip&&(this.posX+=n-this.lastX,this.posY+=e-this.lastY),this.lastX=n,this.lastY=e}}},{key:"endDrag",value:function(t){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var a,i,o,s,r,c,l,u,d,g,h,f,m,v;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:document.body.classList.remove("dragging"),i=!0,(o=p.get(t,"changedTouches[0]"))?a=document.elementFromPoint(o.clientX,o.clientY):o||(a=document.elementFromPoint(t.clientX,t.clientY)),this.posX=0,this.posY=0,this.lastX=0,this.lastY=0,this.dragging&&a&&(this.dragged?(s=null,a&&(s=a.getAttribute("data-column")),null!==s&&(s=+s,r=this.cards[0].card,c=Math.floor(r/4),l=r%4,s>6?1===this.cards.length&&this.foundation[s-7].length+1===c&&((u=this.foundation[s-7][this.foundation[s-7].length-1])&&l!==p.get(u,"card",u)%4||(d=this.tableau[this.column].pop(),this.tableau[this.column]=n(this.tableau[this.column]),this.foundation[s-7].push(d.card),this.flipCard(),this.solitaire.checkWin(this.foundation),i=!1)):(g=this.tableau[s][this.tableau[s].length-1],h=0,f=0,g&&(h=Math.floor(g.card/4),f=g.card%4),(c===h-1&&l%2!=f%2||0===h&&13===c)&&(v=this.tableau[this.column].splice(-this.cards.length),this.tableau[this.column]=n(this.tableau[this.column]),(m=this.tableau[s]).push.apply(m,n(v)),this.tableau[s]=n(this.tableau[s]),this.flipCard(),this.solitaire.checkWin(this.foundation),i=!1))),i&&this.resetDrag()):this.toFoundation(),this.posX=0,this.posY=0,this.lastX=0,this.lastY=0),this.dragging=!1,this.dragged=!1;case 5:case"end":return e.stop()}},e,this)}))}},{key:"resetDrag",value:function(){var t=this;setTimeout(function(){return t.soundService.playSound("card-sound")},180),this.undoDrag=!0,clearTimeout(this.timeout),this.timeout=setTimeout(function(){t.posX=0,t.posY=0,t.lastX=0,t.lastY=0,t.timeout=setTimeout(function(){t.undoDrag=!1},180)},0)}},{key:"toFoundation",value:function(){var e,a=this.cards[this.cards.length-1].card,i=Math.floor(a/4),o=a%4,s=0,r=!0,c=t(this.foundation);try{for(c.s();!(e=c.n()).done;){var l=e.value;if(1===this.cards.length&&l.length+1===i){var u=l[l.length-1],d=p.get(u,"card",u);if(!d||o===d%4){var g=document.getElementsByClassName("foundation-".concat(s))[0],h=this.startElement.getBoundingClientRect(),f=h.left,m=h.top,v=g.getBoundingClientRect(),b=v.left,y=v.top,k=f-b,w=m-y,x=this.tableau[this.column].pop();this.tableau[this.column]=n(this.tableau[this.column]),this.foundation[s].push({card:x.card,offsetX:k,offsetY:w,deg:"neat"===this.twentyone.gameSettings.alignment?0:this.card.rand2,scale:1.4}),this.flipCard(),this.solitaire.checkWin(this.foundation),r=!1;break}}s++}}catch(Z){c.e(Z)}finally{c.f()}r&&this.soundService.playSound("card-sound")}},{key:"flipCard",value:function(){var t=this.tableau[this.column][this.tableau[this.column].length-1];t&&(t.flip=!1)}},{key:"ngOnDestroy",value:function(){this.destroyed$.next(),this.destroyed$.complete()}}]),e}();return e.\u0275fac=function(t){return new(t||e)(f.Y36(M.u),f.Y36(m.t),f.Y36(v.K),f.Y36(S.y))},e.\u0275cmp=f.Xpm({type:e,selectors:[["app-card-group"]],viewQuery:function(t,n){var e;(1&t&&f.Gf(R,5),2&t)&&(f.iGM(e=f.CRH())&&(n.card=e.first))},inputs:{tableau:"tableau",foundation:"foundation",cards:"cards",column:"column",animate:"animate",cardSound:"cardSound",width:"width",offset:"offset"},decls:4,vars:22,consts:[[1,"card-group","d-flex","flex-column",3,"ngClass","ngStyle"],["pos","relative",1,"align-self-center",3,"card","flip","width","animate","cardSound","column","ngClass","ngStyle","mousedown","touchstart"],["card",""],[3,"tableau","foundation","cards","column","width","animate","cardSound",4,"ngIf"],[3,"tableau","foundation","cards","column","width","animate","cardSound"]],template:function(t,n){1&t&&(f.TgZ(0,"div",0),f.TgZ(1,"app-card",1,2),f.NdJ("mousedown",function(t){return n.start(t)})("touchstart",function(t){return n.start(t)}),f.qZA(),f.YNc(3,B,2,9,"app-card-group",3),f.qZA()),2&t&&(f.Q6J("ngClass",f.WLB(12,J,n.dragging,n.undoDrag))("ngStyle",f.WLB(15,U,n.posY+"px",n.posX+"px")),f.uIk("data-column",n.column),f.xp6(1),f.Q6J("card",n.cards[0].card)("flip",n.cards[0].flip)("width",n.width)("animate",n.animate)("cardSound",n.cardSound&&1===n.cards.length)("column",n.column)("ngClass",f.VKq(18,Q,!n.cards[0].flip))("ngStyle",f.VKq(20,D,20-n.cards.length)),f.xp6(2),f.Q6J("ngIf",n.cards[1]))},directives:[r.mk,r.PC,q.A,r.O5,e],pipes:[$.T],styles:[".card-group[_ngcontent-%COMP%]{position:relative}app-card[_ngcontent-%COMP%]{height:3.5vh}app-card.select[_ngcontent-%COMP%]{cursor:pointer}.dragging[_ngcontent-%COMP%]{pointer-events:none;touch-action:none}.undo-drag[_ngcontent-%COMP%]{transition:all .18s ease-in-out}.dragging[_ngcontent-%COMP%], .undo-drag[_ngcontent-%COMP%]{z-index:100;transform:scale(1.1);-moz-filter:drop-shadow(-2px -2px 8px rgba(0,0,0,.5));filter:drop-shadow(-2px -2px 8px rgba(0,0,0,.5))}"]}),e}(),N=["drawStack"],E=["cardTalon"];function I(t,n){if(1&t&&f._UZ(0,"app-card",17),2&t){var e=n.$implicit,a=f.oxw().index,i=f.oxw();f.Udp("position","absolute"),f.Q6J("card",e)("cardSound",i.cardSound)("column",a+7)("animate",!1)("pos","relative")}}function z(t,n){if(1&t&&(f.TgZ(0,"div",14),f.TgZ(1,"div"),f._UZ(2,"img",15),f.YNc(3,I,1,7,"app-card",16),f.qZA(),f.qZA()),2&t){var e=n.$implicit,a=n.index;f.xp6(2),f.Gre("foundation-",a,""),f.uIk("data-column",a+7),f.xp6(1),f.Q6J("ngForOf",e)}}function j(t,n){if(1&t&&f._UZ(0,"app-card-group",20),2&t){var e=f.oxw(),a=e.$implicit,i=e.index,o=f.oxw();f.Q6J("tableau",o.tableau)("foundation",o.foundation)("cards",a)("column",i)("animate",o.animate)("cardSound",o.cardSound)}}function H(t,n){if(1&t&&(f.TgZ(0,"div",18),f.TgZ(1,"div"),f._UZ(2,"img",5),f.YNc(3,j,1,6,"app-card-group",19),f.qZA(),f.qZA()),2&t){var e=n.$implicit,a=n.index;f.uIk("data-column",a),f.xp6(2),f.Udp("position",e.length?"absolute":"relative"),f.uIk("data-column",a),f.xp6(1),f.Q6J("ngIf",e.length)}}var K=function(t,n){return{"d-flex":t,"flex-column":n}},V=c.Bz.forChild([{path:"",component:function(){var e=function(){function e(t,n,a,o,s){i(this,e),this.solitaire=t,this.window=n,this.soundService=a,this.cardService=o,this.twentyone=s,this.stock=[],this.talon=[],this.width=120,this.animate=!0,this.cardSound=!1,this.landscape=!1,this.hasStats=!1,this.dealing=!1,this.tableau=[[],[],[],[],[],[],[]],this.foundation=[[],[],[],[]],this.clicked=!1,this.won=!1,this.destroyed$=new d.xQ,this.trackByFn=function(t){return t},this.subscribeToOrientationResize()}return s(e,[{key:"ngOnInit",value:function(){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var n=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.setWidth(),this.subscribeToGame(),this.subscribeToSave(),this.subscribeToStats(),this.window.focus$.pipe((0,g.R)(this.destroyed$)).subscribe(function(t){return n.setWidth()});case 1:case"end":return t.stop()}},t,this)}))}},{key:"subscribeToGame",value:function(){var e=this;this.solitaire.game$.pipe((0,g.R)(this.destroyed$)).subscribe(function(a){return(0,u.mG)(e,void 0,void 0,regeneratorRuntime.mark(function e(){var i,o,s,r,c,l,u=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.foundation=a.foundation.map(function(t){return t.map(function(t){return t.card||t})}),Object.assign(this,a),52!==this.stock.length){e.next=29;break}this.dealing=!0,i=this.stock.splice(-28,28),this.animate=!0,this.cardSound=!0,o=0;case 5:if(!(o<7)){e.next=20;break}s=0;case 7:if(!(s<7)){e.next=17;break}if(e.t0=s>=o,!e.t0){e.next=14;break}return this.tableau[s].push({card:i.pop(),flip:!0}),this.tableau[s]=n(this.tableau[s]),e.next=14,new Promise(function(t){return setTimeout(t,200)});case 14:s++,e.next=7;break;case 17:o++,e.next=5;break;case 20:r=t(this.tableau);try{for(r.s();!(c=r.n()).done;)(l=c.value)[l.length-1].flip=!1}catch(d){r.e(d)}finally{r.f()}return e.next=24,new Promise(function(t){return setTimeout(t,150)});case 24:this.soundService.playSound("card-sound"),this.animate=!1,this.save(),e.next=30;break;case 29:this.animate=!1,this.cardSound=!1,setTimeout(function(){return u.cardSound=!0},0);case 30:return e.next=32,new Promise(function(t){return setTimeout(t,100)});case 32:this.cardSound=!0,this.dealing=!1;case 34:case"end":return e.stop()}},e,this)}))})}},{key:"subscribeToStats",value:function(){var t=this;this.solitaire.gameStats$.pipe((0,g.R)(this.destroyed$)).subscribe(function(n){return t.hasStats=!p.isEmpty(n)})}},{key:"subscribeToOrientationResize",value:function(){var t=this;this.window.orientationresize$.pipe((0,g.R)(this.destroyed$)).subscribe(function(n){return t.setWidth()})}},{key:"subscribeToSave",value:function(){var t=this;this.solitaire.triggerSave$.pipe((0,g.R)(this.destroyed$)).subscribe(function(){t.save()})}},{key:"doEvent",value:function(t){switch(t){case"restart":var n=this.foundation.reduce(function(t,n){return t+n.length},0);!this.solitaire.game.new&&n<52&&(this.solitaire.gameResult="lose");var e=new h.C;e.stock=this.cardService.shuffleCards(),delete e.new,this.solitaire.game=e;break;case"stats":this.window.loadComponent(_)}}},{key:"save",value:function(){this.solitaire.saveGame({stock:this.stock,tableau:this.tableau,talon:this.talon,foundation:this.foundation.map(function(t){return t.map(function(t){return p.get(t,"card",t)})}),won:this.won})}},{key:"setWidth",value:function(){this.landscape=window.matchMedia("(orientation: landscape)").matches}},{key:"draw",value:function(){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.clicked){t.next=23;break}this.clicked=!0,n=0;case 3:if(!(n<(this.twentyone.gameSettings.drawCount||1))){t.next=14;break}if(!this.stock.length){t.next=8;break}this.talon.push(this.stock.pop()),t.next=11;break;case 8:if(0===n){t.next=10;break}return t.abrupt("break",14);case 10:this.stock=this.talon.reverse(),this.talon=[];case 11:n++,t.next=3;break;case 14:if(this.save(),t.t0=this.stock.length||this.talon.length,!t.t0){t.next=22;break}return t.next=19,new Promise(function(t){return setTimeout(t,100)});case 19:return this.soundService.playSound("card-sound"),t.next=22,new Promise(function(t){return setTimeout(t,100)});case 22:this.clicked=!1;case 23:case"end":return t.stop()}},t,this)}))}},{key:"ngOnDestroy",value:function(){this.solitaire.game={stock:this.stock,tableau:this.tableau,talon:this.talon,foundation:this.foundation.map(function(t){return t.map(function(t){return p.get(t,"card",t)})}),won:this.won},this.destroyed$.next(),this.destroyed$.complete()}}]),e}();return e.\u0275fac=function(t){return new(t||e)(f.Y36(m.t),f.Y36(M.u),f.Y36(S.y),f.Y36(P.J),f.Y36(v.K))},e.\u0275cmp=f.Xpm({type:e,selectors:[["app-solitaire"]],viewQuery:function(t,n){var e;(1&t&&(f.Gf(N,5),f.Gf(E,5)),2&t)&&(f.iGM(e=f.CRH())&&(n.drawStack=e.first),f.iGM(e=f.CRH())&&(n.cardTalon=e.first))},decls:19,vars:23,consts:[[1,"solitaire-container","noselect","height-100","position-fixed"],["heading","Solitaire","restart","",3,"hasStats","restartDisabled","action"],[1,"container","height-100"],[1,"row"],[1,"col-stock",3,"ngClass"],["src","~src/assets/img/card-placeholder.png","alt","Card Placeholder",1,"card-placeholder"],["neat","","pos","relative",1,"stock","select","align-self-center",3,"card","cardSound","animate","cardClick"],["drawStack",""],[1,"col-talon","position-relative"],[3,"cards","tableau","foundation","animate"],["cardTalon",""],[1,"col-space"],["class","col-stock d-flex flex-direction-column col-foundation",4,"ngFor","ngForOf","ngForTrackBy"],["class","col-tableau d-flex flex-column height-100",4,"ngFor","ngForOf","ngForTrackBy"],[1,"col-stock","d-flex","flex-direction-column","col-foundation"],["src","~src/assets/img/card-placeholder.png","alt","Card Placeholder",1,"card-placeholder",2,"position","relative"],[3,"card","cardSound","column","animate","pos","position",4,"ngFor","ngForOf"],[3,"card","cardSound","column","animate","pos"],[1,"col-tableau","d-flex","flex-column","height-100"],[3,"tableau","foundation","cards","column","animate","cardSound",4,"ngIf"],[3,"tableau","foundation","cards","column","animate","cardSound"]],template:function(t,n){1&t&&(f.TgZ(0,"div",0),f.TgZ(1,"app-nav",1),f.NdJ("action",function(t){return n.doEvent(t)}),f.qZA(),f.TgZ(2,"div",2),f.TgZ(3,"div",3),f.TgZ(4,"div"),f.TgZ(5,"div",3),f.TgZ(6,"div",4),f.TgZ(7,"div"),f._UZ(8,"img",5),f.TgZ(9,"app-card",6,7),f.NdJ("cardClick",function(){return n.draw()}),f.qZA(),f.qZA(),f.qZA(),f.TgZ(11,"div",8),f._UZ(12,"app-card-talon",9,10),f.qZA(),f._UZ(14,"div",11),f.YNc(15,z,4,5,"div",12),f.qZA(),f.qZA(),f.TgZ(16,"div"),f.TgZ(17,"div",3),f.YNc(18,H,4,5,"div",13),f.qZA(),f.qZA(),f.qZA(),f.qZA(),f.qZA()),2&t&&(f.xp6(1),f.Q6J("hasStats",n.hasStats)("restartDisabled",n.dealing),f.xp6(3),f.Tol(n.landscape?"col-sm-2":"col-sm-12"),f.xp6(2),f.Q6J("ngClass",f.WLB(20,K,n.landscape,n.landscape)),f.xp6(3),f.Q6J("card",n.stock.length?"back":0)("cardSound",!1)("animate",!1),f.xp6(3),f.Q6J("cards",n.talon)("tableau",n.tableau)("foundation",n.foundation)("animate",n.animate),f.xp6(3),f.Q6J("ngForOf",n.foundation)("ngForTrackBy",n.trackByFn),f.xp6(1),f.Tol(n.landscape?"col-sm-10":"col-sm-12"),f.xp6(2),f.Q6J("ngForOf",n.tableau)("ngForTrackBy",n.trackByFn))},directives:[A.r,r.mk,q.A,X,r.sg,r.O5,G],styles:[".solitaire-container[_ngcontent-%COMP%]{background:url(felt.a4dde98dc3a5ebdef1f6.jpg);height:100%;width:100%;min-width:320px;min-height:320px;position:fixed;padding:50px 15px 15px;top:0;left:0}.solitaire-container[_ngcontent-%COMP%]     .card{width:100%}.solitaire-container[_ngcontent-%COMP%]     .card-placeholder{width:95%}.solitaire-container[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{padding:15px 0}.solitaire-container[_ngcontent-%COMP%]   .col-stock[_ngcontent-%COMP%]   .stock[_ngcontent-%COMP%]{cursor:pointer}.solitaire-container[_ngcontent-%COMP%]   .col-stock[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-talon[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-foundation[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-tableau[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-space[_ngcontent-%COMP%]{padding-left:1.5%;padding-right:1.5%;padding-bottom:1.5%;flex:0 0 auto;width:14.2857142857%}.solitaire-container[_ngcontent-%COMP%]   .col-stock[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-talon[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-foundation[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-tableau[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-space[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin:0 auto;position:relative}.solitaire-container[_ngcontent-%COMP%]   .col-stock[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-tableau[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-foundation[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%]{margin:0 auto;height:unset;top:0;left:0%}.solitaire-container[_ngcontent-%COMP%]   .card-placeholder[_ngcontent-%COMP%]{position:absolute;background:rgba(0,0,0,.15);margin:4px;top:0;left:0}@media (orientation: landscape){.solitaire-container[_ngcontent-%COMP%]   .col-stock[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-talon[_ngcontent-%COMP%], .solitaire-container[_ngcontent-%COMP%]   .col-foundation[_ngcontent-%COMP%]{width:50%;position:relative;padding-left:4%;padding-right:4%}.solitaire-container[_ngcontent-%COMP%]   .col-space[_ngcontent-%COMP%]{width:100%;height:20px}}@media only screen and (max-width: 600px){.solitaire-container[_ngcontent-%COMP%]     .card:not(.hide){background-image:url(cards-small.199df869b910abc1f9ab.png)!important}}"]}),e}(),data:{view:"solitaire",seo:{title:"Solitaire | Technically Tom",metaTags:[{name:"description",content:"Free card game web app with support for playing off line."},{property:"og:title",content:"Solitaire | Technically Tom | Technically Tom's Solitaire"},{proprety:"og:description",content:"Free card game web app with support for playing off line."},{property:"og:image",content:l.N.appUrl+"assets/img/solitaire.jpg"},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:url",content:l.N.appUrl+"solitaire"},{name:"twitter:card",content:"website"}]}}}]),tt=o(5059),nt=function(){var t=function t(){i(this,t)};return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=f.oAB({type:t}),t.\u0275inj=f.cJS({imports:[[r.ez,tt.m,V]]}),t}()}}])}();