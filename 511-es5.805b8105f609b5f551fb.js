!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}(self.webpackChunktwenty_one=self.webpackChunktwenty_one||[]).push([[511],{1511:function(n,o,a){a.r(o),a.d(o,{AboutModule:function(){return v}});var i,r=a(8583),s=a(3423),l=a(2340),c=a(9765),g=a(6782),p=a(7716),d=a(9195),h=a(7988),u=["aboutFront"],m=["keyboard"],f=function(t){return{flip:t}},b=s.Bz.forChild([{path:"",component:(i=function(){function n(e,o){t(this,n),this.location=e,this.twentyone=o,this.flip=!1,this.destroyed$=new c.xQ,this.subScribeToSettings()}var o,a,i;return o=n,(a=[{key:"ngOnInit",value:function(){this.menuColor1="rgb(130, 132, 153)",this.timeout=this.animate()}},{key:"subScribeToSettings",value:function(){var t=this;this.twentyone.settings$.pipe((0,g.R)(this.destroyed$)).subscribe(function(e){return t.settings=e})}},{key:"onScroll",value:function(){var t=this.keyboard.nativeElement.offsetTop-this.aboutFront.nativeElement.scrollTop,e=this.aboutFront.nativeElement.offsetHeight,n=this.keyboard.nativeElement.offsetHeight;this.keyboardBackground=t>0-n&&t<e?((t+n)/((e+n)/100)).toString()+"% 0":"100% 0"}},{key:"work",value:function(){var t=this;this.flip=!0;var e=50,n=setInterval(function(){var o=e.toString();t.aboutColor="rgb("+o+","+o+","+o+")",t.titleColor="rgb("+e+","+e+","+e+")",e>=250&&(t.menuColor1="",t.menuColor2="rgb(130, 132, 153)",clearInterval(n)),e+=20},20)}},{key:"play",value:function(){var t=this;this.flip=!1;var e=250,n=setInterval(function(){t.aboutColor="rgb("+e+","+e+","+e+")",t.titleColor="rgb("+e+","+e+","+e+")",e<=50&&(t.menuColor1="rgb(130, 132, 153)",t.menuColor2="",clearInterval(n)),e-=20},20)}},{key:"animate",value:function(){var t=this,e=0,n=0;return setInterval(function(){switch(e++,n-=.03,t.backgroundPosition=n+"vw",n<=-100&&(n=.06),e){case 1:t.prop="prop1";break;case 2:t.prop="prop2";break;case 3:t.prop="prop",e=0}},10)}},{key:"back",value:function(){this.location.back()}},{key:"ngOnDestroy",value:function(){clearTimeout(this.timeout),this.destroyed$.next(),this.destroyed$.complete()}}])&&e(o.prototype,a),i&&e(o,i),n}(),i.\u0275fac=function(t){return new(t||i)(p.Y36(r.Ye),p.Y36(d.K))},i.\u0275cmp=p.Xpm({type:i,selectors:[["app-about"]],viewQuery:function(t,e){var n;1&t&&(p.Gf(u,5),p.Gf(m,5)),2&t&&(p.iGM(n=p.CRH())&&(e.aboutFront=n.first),p.iGM(n=p.CRH())&&(e.keyboard=n.first))},decls:103,vars:20,consts:[[1,"about"],[1,"nav-bar"],[1,"menu-item",3,"click"],[1,"menu-item",3,"matTooltip","click"],[1,"clear"],[1,"a-container",3,"ngClass"],[1,"a-flipper"],[1,"a-front"],[1,"work",3,"scroll"],["aboutFront",""],[1,"art"],[1,"left"],[1,"divKB"],[1,"keyboard"],["keyboard",""],[1,"right"],[1,"a-back"],[1,"play",3,"scroll"],[1,"heading"],[1,"gee-bee"],["src","/assets/img/Tom.jpg","alt","Tom",1,"tom"],["href","http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library","target","_blank"],[1,"myLists"],["href","http://diveintohtml5.info/storage.html","target","_blank"],[1,"footer"],["href","http://www.technicallytom.com","target","_blank"],["alt","technicallytom.com","src","/assets/img/logo.png?v=1",1,"wp-link"],["id","hideAbout","alt","Back to Game","src","/assets/img/egg.png",1,"egg",3,"matTooltip","click"]],template:function(t,e){1&t&&(p.TgZ(0,"div",0),p.TgZ(1,"header"),p.TgZ(2,"h1"),p._uU(3,"Tom Alperin"),p.qZA(),p.TgZ(4,"div",1),p.TgZ(5,"ul"),p.TgZ(6,"li",2),p.NdJ("click",function(){return e.play()}),p._uU(7," Work "),p.qZA(),p.TgZ(8,"li",2),p.NdJ("click",function(){return e.work()}),p._uU(9," Play "),p.qZA(),p.TgZ(10,"li",3),p.NdJ("click",function(){return e.back()}),p._uU(11," Back "),p.qZA(),p.qZA(),p.qZA(),p.qZA(),p._UZ(12,"div",4),p.TgZ(13,"div",5),p.TgZ(14,"div",6),p.TgZ(15,"div",7),p.TgZ(16,"article",8,9),p.NdJ("scroll",function(){return e.onScroll()}),p.TgZ(18,"div"),p._UZ(19,"div",10),p.TgZ(20,"h2",11),p._uU(21,"Traditional artistry..."),p.qZA(),p.qZA(),p.TgZ(22,"div"),p.TgZ(23,"p"),p._uU(24," Traditional artists use a variety of media including oil paints, watercolors, pen, pencil, and pastels. They use a wide variety of brushes, and tools to achieve the desired effect, mixing different media types if necessary to create their masterpieces. Multiple tools and techniques are seamlessly blended together to achieve their final goal. To be a true artist, many disciplines must be mastered. "),p.qZA(),p.TgZ(25,"p"),p._uU(26," Modern web design has its box of tools. PHP, JavaScript, HTML, and CSS work together to create an immersive user experience. Frameworks like Bootstrap and Angular JS help to quickly develop a website that is interactive, immersive, and ready for the mobile device generation. "),p.qZA(),p._UZ(27,"p"),p.qZA(),p.TgZ(28,"div",12),p._UZ(29,"div",13,14),p.TgZ(31,"h2",15),p._uU(32,"...meets the modern skill set."),p.qZA(),p.qZA(),p.TgZ(33,"div"),p.TgZ(34,"p"),p._uU(35," If the repair man you called shows up with only a hammer to do a complicated job, you probably don't want to let him in. If your doctor insists he can cure any problem with one medication, you should seek a second opinion. If your surgeon swears he can do the entire operation with only a scalpel, get another surgeon. Complex jobs require diverse skill sets. You want people with the necessary tools and skills. You want them to be able to understand and communicate with the rest of the team and knowing how the rest of the team works makes that easier. "),p.qZA(),p.TgZ(36,"p"),p._uU(37," You want your team to have access to all the modern tools. Combine them with some traditional tools and amazing things can be achieved. "),p.qZA(),p._UZ(38,"p"),p.qZA(),p.qZA(),p.qZA(),p.TgZ(39,"div",16),p.TgZ(40,"article",17),p.NdJ("scroll",function(){return e.onScroll()}),p.TgZ(41,"div",18),p._UZ(42,"div"),p._UZ(43,"div",19),p.qZA(),p._UZ(44,"img",20),p.TgZ(45,"p"),p._uU(46," \u201cPlay\u201d suggests recreation, but some of the most challenging coding sometimes involves creating a computer game. My name is Tom Alperin. This game was originally written in vanilla JavaScript with the only code not my own being "),p.TgZ(47,"a",21),p._uU(48,"howler.js"),p.qZA(),p._uU(49," written by James Simpson. My choice to do this was so the page could demonstrate my understanding of \u201cVanilla JavaScript\u201d, but also to hopefully achieve a little better performance. This version is however written using Angular, Ng Bootstrap, Angular Material and other libraries commonly used in Angular projects. "),p.qZA(),p.TgZ(50,"p"),p._uU(51," Animations have been expanded in this version using Angular animations combined with other CSS animations as well as some javaScript driven animations. Some techniques used to optimize performance include: "),p.qZA(),p.TgZ(52,"ul",22),p.TgZ(53,"li"),p._uU(54," Use of sprite sheets to arrange graphics and reduce web site load times. "),p.qZA(),p.TgZ(55,"li"),p._uU(56,"3D CSS animation to show the flipping of the dealers card."),p.qZA(),p.TgZ(57,"li"),p._uU(58," Responsive web design. Buttons are placed differently for portrait and landscape. In landscape, buttons are also placed differently for mobile and desktop. "),p.qZA(),p.TgZ(59,"li"),p._uU(60," Smaller mobile screens will display a different set of cards that is easier to read at the reduced size. These can now be permanently turned on from a settings modal that is triggered by the gear icon. "),p.qZA(),p.TgZ(61,"li"),p.TgZ(62,"a",23),p._uU(63,"LocalStorage"),p.qZA(),p._uU(64," not only holds the players score, but every stage of the game. It is possible for the player to close the game and return to exactly where they left off. Saving the game is done automatically on each move. Statistics about the game are also stored and display of this has been expanded to include sections based on how many decks the player has chosen for each shuffle. "),p.qZA(),p.TgZ(65,"li"),p._uU(66," The game has been updated to use Angular to dynamically display content. some animations are actually built into the card component so it automatically animates when it is added to the page. The animations have been expanded to include the cards spinning and dropping down. "),p.qZA(),p.qZA(),p.TgZ(67,"p"),p._uU(68," I have not done much to prevent cheating for someone familiar with JavaScript. It's your fake money, so have at it! If you want to cheat, you are going to have to learn a little JavaScript and figure things out. "),p.qZA(),p.TgZ(69,"p"),p._uU(70," My intentions for writing this page were to not only refresh my programming skills, but to also make a fun game my friends and relatives could play. It has grown from a single page with JavaScript to an Angular Web App that includes service workers which should allow more reliable offline play when added to a moble phone home screen. As with the original version, adding the page to some phone screens will remove the url bar making it look almost like a native App. "),p.qZA(),p.TgZ(71,"h2"),p._uU(72,"Rules"),p.qZA(),p.TgZ(73,"p"),p._uU(74,' Try to achieve highest hand with a value of 21 or less. Face cards have a value of 10. Aces have a value of 11 unless they cause the hand value to exceed 21 in which case they have a value of 1. All other cards have a value equal to the cards value. Player wins if their hand value exceeds the dealers hand and they have not "busted" by going over 21. Player also wins if they have not "busted" and the dealer has "busted." '),p.qZA(),p.TgZ(75,"ul",22),p.TgZ(76,"li"),p._uU(77,"Win pays 1:1 players bet."),p.qZA(),p.TgZ(78,"li"),p._uU(79,' Player hand value of 21, "blackjack" with only two cards pays 3:2. '),p.qZA(),p.TgZ(80,"li"),p._uU(81," All ties are called a push and results in the players bet being returned to the player. "),p.qZA(),p.TgZ(82,"li"),p._uU(83,' "Surrender" returns half the players bet and is only available as first choice in hand. '),p.qZA(),p.TgZ(84,"li"),p._uU(85,' Player hand value of 21, "blackjack" with only two cards pays 3:2. '),p.qZA(),p.TgZ(86,"li"),p._uU(87,' "Double" increases the bet to twice its original value and draws only one more card. This is only available after the initial deal '),p.qZA(),p.TgZ(88,"li"),p._uU(89,' The Player may also "Split" a hand into two independent hands if the two initial cards are of the same value. '),p.qZA(),p.TgZ(90,"li"),p._uU(91,"Splitting is only allowed once per hand."),p.qZA(),p.TgZ(92,"li"),p._uU(93,'Split hands may be "Doubled."'),p.qZA(),p.TgZ(94,"li"),p._uU(95,"This game is dealt from two decks by default but is not configurable from 1 to 9 decks. Game staticsts will be stored for every varition the user plays at leat one game with."),p.qZA(),p.qZA(),p.TgZ(96,"p"),p._uU(97,"Click the egg to return to the game."),p.qZA(),p._UZ(98,"p"),p.qZA(),p.qZA(),p.qZA(),p.qZA(),p.TgZ(99,"div",24),p.TgZ(100,"a",25),p._UZ(101,"img",26),p.qZA(),p.TgZ(102,"img",27),p.NdJ("click",function(){return e.back()}),p.qZA(),p.qZA(),p.qZA()),2&t&&(p.Udp("background",e.aboutColor),p.xp6(2),p.Udp("color",e.titleColor),p.xp6(4),p.Udp("background",e.menuColor1),p.xp6(2),p.Udp("background",e.menuColor2),p.xp6(2),p.Q6J("matTooltip",e.settings.toolTips?"Back to the game.":null),p.xp6(3),p.Q6J("ngClass",p.VKq(18,f,e.flip)),p.xp6(6),p.Udp("background-position",e.backgroundPosition),p.xp6(10),p.Udp("background-position",e.keyboardBackground),p.xp6(13),p.Gre("h-prop ",e.prop,""),p.xp6(60),p.Q6J("matTooltip",e.settings.toolTips?"Back to the game.":null))},directives:[h.gM,r.mk],styles:['.nav-bar[_ngcontent-%COMP%]{background-color:#838da182;border-top:1px solid rgba(0,0,0,.51);border-bottom:1px solid rgba(0,0,0,.51);width:100%;height:32px;box-shadow:inset 0 16px 16px -7px #f2f5fd78;z-index:100}.nav-bar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0 auto;padding:0;height:30px;width:300px}.nav-bar[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:100px;list-style-type:none;float:left;text-align:center;position:relative;cursor:pointer;padding:5px 0}.nav-bar[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:#b6bae2}.about[_ngcontent-%COMP%]{height:100%;width:100%;min-width:320px;min-height:320px;position:fixed;top:0;left:0;margin:0 auto;text-align:center;z-index:10;background-color:#323232;transition:1s;-webkit-transition:1s;-moz-transition:1s}.about[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:20px;line-height:22px;padding:5px;margin:0;background-color:#5d5b52}.about[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .myLists[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding-bottom:10px;font-family:"Roboto","Helvetica Neue",Helvetica,Arial,sans-serif;letter-spacing:1px}.about[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:Trebuchet MS,sans-serif;font-weight:normal}.work[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:3.6vw;color:#fff;padding:1% 8%}.play[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#000;text-align:center}.art[_ngcontent-%COMP%]{background-image:url(/assets/img/art.jpg);background-size:100vw;width:100%}.art[_ngcontent-%COMP%]:before{content:"";display:block;padding-top:18%}.keyboard[_ngcontent-%COMP%]{width:100%;background:url(/assets/img/kb.jpg);background-size:120%}.keyboard[_ngcontent-%COMP%]:before{content:"";display:block;padding-top:18%}.divKB[_ngcontent-%COMP%]{margin-top:20px}.left[_ngcontent-%COMP%]{text-align:left}.right[_ngcontent-%COMP%]{text-align:right}.about[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:1% auto;position:relative;float:none}.work[_ngcontent-%COMP%]{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch;text-align:justify;font-weight:lighter;padding-top:20px}.play[_ngcontent-%COMP%]{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch;text-align:justify;margin:5px auto;padding:25px}.work[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0 35px 15px;hyphens:auto;-webkit-hyphens:auto;-moz-hyphens:auto;color:#282828;font-size:20px;line-height:38px}.play[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0 10px 10px 5px;hyphens:auto;-webkit-hyphens:auto;-moz-hyphens:auto;color:#282828}.work[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], .play[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{width:80%;margin:0 auto;padding:0 10px 10px 5px}.work[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .play[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{text-indent:-1.7em;hyphens:auto;-webkit-hyphens:auto;-moz-hyphens:auto}.work[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .work[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{color:#fff}.play[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .play[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{color:#282828}.tom[_ngcontent-%COMP%]{border-radius:50%;padding:3px;margin:10px;background:white;width:70px;border:2px solid darkgreen;float:left;transition:1s;-webkit-transition:1s;-moz-transition:1s}.egg[_ngcontent-%COMP%]{position:absolute;bottom:-14px;right:3%;height:80px;cursor:pointer;z-index:10}.gee-bee[_ngcontent-%COMP%]{background:url(/assets/img/geebee.png) no-repeat 0;height:100%;background-size:auto 100%;width:98.5%;float:left}.heading[_ngcontent-%COMP%]{margin:10px auto;position:static;width:310px;height:59px}.prop[_ngcontent-%COMP%]{background:url(/assets/img/prop.png) no-repeat}.prop1[_ngcontent-%COMP%]{background:url(/assets/img/prop.png) no-repeat 52% 0}.prop2[_ngcontent-%COMP%]{background:url(/assets/img/prop.png) no-repeat 100% 0}.h-prop[_ngcontent-%COMP%]{height:100%;width:1.5%;position:relative;float:left;background-size:auto 100%}.a-container[_ngcontent-%COMP%]{position:fixed;perspective:1500px;-webkit-perspective:1500px;-moz-perspective:1500px;transform-style:preserve-3d;top:63px;bottom:35px}.a-container.flip[_ngcontent-%COMP%]   .a-flipper[_ngcontent-%COMP%]{transform:rotateY(180deg);-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);height:100%}.a-container.flip[_ngcontent-%COMP%]   .a-flipper[_ngcontent-%COMP%]   .a-back[_ngcontent-%COMP%]{z-index:100}.a-back[_ngcontent-%COMP%]{background-color:#fff;font-size:18px;line-height:28px}.a-container[_ngcontent-%COMP%], .a-front[_ngcontent-%COMP%], .a-back[_ngcontent-%COMP%]{position:fixed;width:100vw;margin:0 auto}.a-front[_ngcontent-%COMP%], .a-back[_ngcontent-%COMP%]{backface-visibility:hidden;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;position:absolute;height:100%;top:0;left:0}.a-flipper[_ngcontent-%COMP%]{transition:1s;-webkit-transition:1s;-moz-transition:1s;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;position:relative;height:100%}.a-front[_ngcontent-%COMP%]{z-index:11;transform:rotateY(0);-webkit-transform:rotateY(0deg);-moz-transform:rotateY(0deg)}.a-back[_ngcontent-%COMP%]{transform:rotateY(180deg);-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg)}.flip-container[_ngcontent-%COMP%]{perspective:1000px;-webkit-perspective:1000px;-moz-perspective:1000px;transform-style:preserve-3d;left:12.4%;height:calc(93% - 28px)}.flip-container.flip[_ngcontent-%COMP%]   .flipper[_ngcontent-%COMP%]{transform:rotateY(180deg);-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg)}.flip-container[_ngcontent-%COMP%], .front[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]{position:absolute}.flipper[_ngcontent-%COMP%]{transition:.4s;-webkit-transition:.4s;-moz-transition:.4s;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;position:relative;height:100%;will-change:transform}.front[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]{backface-visibility:hidden;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;position:absolute;top:0;height:100%}.front[_ngcontent-%COMP%]{z-index:2;transform:rotateY(0);-webkit-transform:rotateY(0deg);-moz-transform:rotateY(0deg)}.back[_ngcontent-%COMP%]{transform:rotateY(180deg);-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);position:absolute}.footer[_ngcontent-%COMP%]{height:37px;width:100%;background:#5d5b52;position:fixed;bottom:0}.wp-link[_ngcontent-%COMP%]{position:relative;float:left;margin:5px 10px;height:25px}@media (orientation: portrait){.play[_ngcontent-%COMP%]{width:96%}}@media (orientation: portrait) and (max-device-height: 480px){html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{min-height:372px}}@media (min-width: 900px){.about[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:28px}}@media (min-width: 1300px){.art[_ngcontent-%COMP%]{background-size:50vw}.art[_ngcontent-%COMP%]:before{content:"";display:block;padding-top:9%}}']}),i),data:{view:"about",seo:{title:"About | Technically Tom",metaTags:[{name:"description",content:"out page for Tom Alperin."},{property:"og:title",content:"About | Technically Tom | About Tom Alperin"},{proprety:"og:description",content:"About page for Tom Alperin."},{property:"og:image",content:l.N.appUrl+"assets/img/blackjack.jpg"},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:url",content:l.N.appUrl+"about"},{name:"twitter:card",content:"website"}]}}}]),y=a(5059),v=function(){var e=function e(){t(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p.oAB({type:e}),e.\u0275inj=p.cJS({imports:[[r.ez,y.m,b]]}),e}()}}])}();