(()=>{function t(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|CriOS/i.test(navigator.userAgent)||"ontouchstart"in window||window.innerWidth<=800&&window.innerHeight<=600||window.innerHeight<=800&&window.innerWidth<=600}class i{constructor(t,i){this.manager=i,this.index=i.nextIndex(),this.isMinimized=!1,this.isMaximized=!1,this.initPane=this.initPane.bind(this),this.initTitle=this.initTitle.bind(this),this.initContent=this.initContent.bind(this),this.initGhostPane=this.initGhostPane.bind(this),this.canMove=this.canMove.bind(this),this.calc=this.calc.bind(this),this.onDown=this.onDown.bind(this),this.onMove=this.onMove.bind(this),this.onUp=this.onUp.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchDown=this.onTouchDown.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.setBounds=this.setBounds.bind(this),this.hintHide=this.hintHide.bind(this),this.animate=this.animate.bind(this),this.onClick=this.onClick.bind(this),this.deconstruct=this.deconstruct.bind(this),this.maximize=this.maximize.bind(this),this.initPane(),this.initTitle(),this.initContent(t),this.initGhostPane(),document.addEventListener("click",this.onClick),document.addEventListener("mousemove",this.onMove),document.addEventListener("touchmove",this.onTouchMove),document.addEventListener("mouseup",this.onUp),document.addEventListener("touchend",this.onTouchEnd),this.ghostpane.style.opacity=0,this.animate()}deconstruct(){document.removeEventListener("click",this.onClick),document.removeEventListener("mousemove",this.onMove),document.removeEventListener("touchmove",this.onTouchMove),document.removeEventListener("mouseup",this.onUp),document.removeEventListener("touchend",this.onTouchEnd),this.pane.removeEventListener("touchstart",this.onTouchDown),this.pane.removeEventListener("mousedown",this.onMouseDown)}initPane(){this.pane=document.createElement("div"),this.pane.className="popbox-pane",document.body.appendChild(this.pane),this.pane.addEventListener("touchstart",this.onTouchDown),this.pane.addEventListener("mousedown",this.onMouseDown),window.addEventListener("resize",t=>{this.setBounds(this.pane)})}initTitle(){this.title=document.createElement("div"),this.title.className="popbox-title",this.title.innerHTML=" ",this.pane.appendChild(this.title),this.closeButton=document.createElement("button"),this.closeButton.className="popbox-button popbox-minimize-button",this.closeButton.innerHTML='<svg viewBox="0 0 16 16" width="16" height="16">\n  <g id="close-button-group">\n    <circle id="close-button-circle" cx="8" cy="8" r="6" fill="#ff5f57" stroke="#ff5f57" stroke-width="2"/>\n    <line class="close-button-line" x1="5" y1="5" x2="11" y2="11" stroke="#fff" stroke-width="2" stroke-dasharray="10 0" />\n    <line class="close-button-line" x1="5" y1="11" x2="11" y2="5" stroke="#fff" stroke-width="2" stroke-dasharray="10 0" />\n  </g>\n</svg>',this.closeButton.addEventListener("touchend",t=>{this.manager.closeWindow(this),t.stopPropagation(),t.preventDefault()}),this.closeButton.onclick=t=>{this.manager.closeWindow(this),t.stopPropagation(),t.preventDefault()},this.title.appendChild(this.closeButton),this.minButton=document.createElement("button"),this.minButton.className="popbox-button popbox-minimize-button",this.minButton.innerHTML='<svg width="16" height="16">\n  <g id="min-button-group">\n  <circle class="min-button-circle" cx="8" cy="8" r="7" fill="#FFC107" />\n  <path class="min-button-line" d="M 4 8 h 8" stroke="#fff" stroke-width="2" />\n  </g>\n</svg>',this.minButton.onclick=t=>{this.manager.minimizeWindow(this),this.isMaximized=!1,t.stopPropagation(),t.preventDefault()},this.title.appendChild(this.minButton),this.maxButton=document.createElement("button"),this.maxButton.className="popbox-button popbox-maximize-button",this.maxButton.innerHTML='<svg viewBox="0 0 16 16" width="16" height="16">\n  <g id="max-button-group">\n    <circle class="max-button-circle" cx="8" cy="8" r="6" fill="#8BC34A" stroke="#8BC34A" stroke-width="2"/>\n    <rect class="max-button-rect" x="4" y="4" width="8" height="8" fill="#FFF"/>\n  </g>\n</svg>',this.maxButton.onclick=t=>{this.maximize(),t.stopPropagation(),t.preventDefault()},this.title.appendChild(this.maxButton)}initContent(t){this.contentContainer=document.createElement("div"),this.contentContainer.className="popbox-content-container",this.pane.appendChild(this.contentContainer),this.content=document.createElement("div"),this.content.className="popbox-content",this.contentContainer.appendChild(this.content),t&&this.content.appendChild(t)}initGhostPane(){this.ghostpane=document.createElement("div"),this.ghostpane.className="popbox-ghostpane",document.body.appendChild(this.ghostpane)}maximize(){let t=this.pane.getBoundingClientRect();this.isMaximized=!this.isMaximized,this.onClick({clientX:t.left+120,clientY:t.top+20,detail:2})}canMove(){return!t()&&this.x>90&&this.x<this.boundingRect.width&&this.y>0&&this.y<this.boundingRect.height&&this.y<50}calc(t){let i=this.pane.getBoundingClientRect();this.boundingRect={bottom:i.bottom,height:i.height-16,left:i.left,right:i.right,width:i.width-16,top:i.top,x:i.x,y:i.y},this.x=t.clientX-this.boundingRect.left,this.y=t.clientY-this.boundingRect.top,this.onTopEdge=this.y-8<5,this.onLeftEdge=this.x-8<5,this.onRightEdge=this.x+8>=this.boundingRect.width-5,this.onBottomEdge=this.y+8>=this.boundingRect.height-5,this.rightScreenEdge=window.innerWidth-5,this.bottomScreenEdge=window.innerHeight-5,this.isResizing=this.onRightEdge||this.onBottomEdge||this.onTopEdge||this.onLeftEdge}onDown(i){t()||(this.calc(i),this.content.style.opacity=0,this.contentContainer.style.opacity=.5,this.clicked={x:this.x,y:this.y,cx:i.clientX,cy:i.clientY,w:this.boundingRect.width,h:this.boundingRect.height,isResizing:this.isResizing,isMoving:!this.isResizing&&this.canMove(),onTopEdge:this.onTopEdge,onLeftEdge:this.onLeftEdge,onRightEdge:this.onRightEdge,onBottomEdge:this.onBottomEdge})}onMove(t){this.calc(t),this.e=t,this.redraw=!0}onUp(t){if(this.calc(t),this.content.style.opacity=1,this.contentContainer.style.opacity=1,this.clicked&&this.clicked.isMoving&&!this.fullscreen&&!this.docked){// Snap
var i={x:this.boundingRect.left,y:this.boundingRect.top,width:this.boundingRect.width,height:this.boundingRect.height};this.boundingRect.top<-25||this.boundingRect.right-10<-25||this.boundingRect.left+10>window.innerWidth+-25||this.boundingRect.top-10>window.innerHeight- -25?(// hintFull();
this.setBounds(this.pane,0,0,window.innerWidth-32,window.innerHeight-32),this.preSnapped=i,this.fullscreen=!0):this.boundingRect.top<5?(// hintTop();
this.setBounds(this.pane,0,0,window.innerWidth-32,250),this.preSnapped=i,this.docked=!0):this.boundingRect.right-3*this.boundingRect.width/4<5?(// hintLeft();
this.setBounds(this.pane,0,0,328,window.innerHeight-32),this.preSnapped=i,this.docked=!0):this.boundingRect.left+3*this.boundingRect.width/4>this.rightScreenEdge?(// hintRight();
this.setBounds(this.pane,window.innerWidth-360,0,328,window.innerHeight-32),this.preSnapped=i,this.docked=!0):this.boundingRect.bottom-3*this.boundingRect.height/4>this.bottomScreenEdge?(// hintBottom();
this.setBounds(this.pane,0,window.innerHeight-268,window.innerWidth-32,250),this.preSnapped=i,this.docked=!0):(this.isMinimized&&this.manager.restoreMinimizedWindow(this),this.preSnapped=null,this.docked=!1,this.fullscreen=!1),this.hintHide()}this.clicked=null}onClick(t){this.calc(t);let i=t.detail>=2;if(i&&this.canMove()){if(this.preSnapped){let t=this.preSnapped.x<0||this.preSnapped.y<0||this.preSnapped.x>window.innerWidth||this.preSnapped.y>window.innerHeight;this.setBounds(this.pane,t?window.innerWidth/2-this.preSnapped.width/2:this.preSnapped.x,t?20:this.preSnapped.y,this.preSnapped.width,this.preSnapped.height),this.preSnapped=null,this.docked=!1,this.fullscreen=!1}else this.preSnapped={x:this.boundingRect.left,y:this.boundingRect.top,width:this.boundingRect.width,height:this.boundingRect.height},this.setBounds(this.pane,0,0,window.innerWidth-32,window.innerHeight-32),this.fullscreen=!0}}onTouchMove(t){this.onMove(t.touches[0])}onTouchDown(t){this.onDown(t.touches[0]),t.preventDefault()}onMouseDown(t){this.onDown(t),t.preventDefault()}onTouchEnd(t){0===t.touches.length&&this.onUp(t.changedTouches[0])}setBounds(i,e,n,s,o){t()?(i.style.left=0,i.style.top=0,i.style.width="100%",i.style.height="100%"):(i.style.left=e+"px",i.style.top=n+"px",i.style.width=s+"px",i.style.height=o+"px")}hintHide(){this.setBounds(this.ghostpane,this.boundingRect.left,this.boundingRect.top,this.boundingRect.width,this.boundingRect.height),this.ghostpane.style.opacity=0}animate(){if(requestAnimationFrame(this.animate),this.redraw){if(this.redraw=!1,this.clicked&&this.clicked.isResizing){if(this.clicked.onRightEdge&&(this.pane.style.width=Math.max(this.x,60)+"px"),this.clicked.onBottomEdge&&(this.pane.style.height=Math.max(this.y,40)+"px"),this.clicked.onLeftEdge){var t=Math.max(this.clicked.cx-this.e.clientX+this.clicked.w,60);t>60&&(this.pane.style.width=t+"px",this.pane.style.left=this.e.clientX+"px")}if(this.clicked.onTopEdge){var i=Math.max(this.clicked.cy-this.e.clientY+this.clicked.h,40);i>40&&(this.pane.style.height=i+"px",this.pane.style.top=this.e.clientY+"px")}this.hintHide();return}if(this.clicked&&this.clicked.isMoving){if(this.boundingRect.top<-25||this.boundingRect.right-10<-25||this.boundingRect.left+10>window.innerWidth+-25||this.boundingRect.top-10>window.innerHeight- -25?(// hintFull();
this.setBounds(this.ghostpane,0,0,window.innerWidth,window.innerHeight),this.ghostpane.style.opacity=.2):this.boundingRect.top<5?(// hintTop();
this.setBounds(this.ghostpane,0,0,window.innerWidth-12,250),this.ghostpane.style.opacity=.2):this.boundingRect.right-3*this.boundingRect.width/4<5?(// hintLeft();
this.setBounds(this.ghostpane,0,0,328,window.innerHeight),this.ghostpane.style.opacity=.2):this.boundingRect.left+3*this.boundingRect.width/4>this.rightScreenEdge?(// hintRight();
this.setBounds(this.ghostpane,window.innerWidth-340,0,328,window.innerHeight),this.ghostpane.style.opacity=.2):this.boundingRect.bottom-3*this.boundingRect.height/4>this.bottomScreenEdge?(// hintBottom();
this.setBounds(this.ghostpane,0,window.innerHeight-250,window.innerWidth-12,250),this.ghostpane.style.opacity=.2):this.hintHide(),this.preSnapped){this.setBounds(this.pane,this.e.clientX-this.preSnapped.width/2,this.e.clientY-Math.min(this.clicked.y,this.preSnapped.height),this.preSnapped.width,this.preSnapped.height),this.fullscreen=!1,this.docked=!1;return}// moving
this.pane.style.top=this.e.clientY-this.clicked.y+"px",this.pane.style.left=this.e.clientX-this.clicked.x+"px";return}this.onRightEdge&&this.onBottomEdge||this.onLeftEdge&&this.onTopEdge?this.pane.style.cursor="nwse-resize":this.onRightEdge&&this.onTopEdge||this.onBottomEdge&&this.onLeftEdge?this.pane.style.cursor="nesw-resize":this.onRightEdge||this.onLeftEdge?this.pane.style.cursor="ew-resize":this.onBottomEdge||this.onTopEdge?this.pane.style.cursor="ns-resize":this.canMove()?this.pane.style.cursor="move":this.pane.style.cursor="default"}}}var e=class{constructor(){this.windowIndex=0,this.windows=[],this.minimizedWindows=[],this.hasOpenWindows=this.hasOpenWindows.bind(this),this.minimizeWindow=this.minimizeWindow.bind(this),this.restoreMinimizedWindow=this.restoreMinimizedWindow.bind(this),this.nextIndex=this.nextIndex.bind(this),this.closeWindow=this.closeWindow.bind(this),this.closeAllWindows=this.closeAllWindows.bind(this),this.redrawMinimizedWindows=this.redrawMinimizedWindows.bind(this),this.createWindow=this.createWindow.bind(this)}createWindow(t){let e=new i(t,this);return this.windows.push(e),e}hasOpenWindows(){return this.windows.length>0}closeAllWindows(){this.windows.forEach(t=>{this.closeWindow(t)})}closeWindow(t){this.windows=this.windows.filter(i=>i.index!==t.index),this.minimizedWindows=this.minimizedWindows.filter(i=>i.index!==t.index),this.windows=this.windows.filter(i=>i.index!==t.index),this.redrawMinimizedWindows(),t.deconstruct(),document.body.removeChild(t.pane),document.body.removeChild(t.ghostpane)}minimizeWindow(t){t.isMinimized?this.restoreMinimizedWindow(t):(t.preSnapped={x:t.boundingRect.left,y:t.boundingRect.top,width:t.boundingRect.width,height:t.boundingRect.height},t.isMinimized=!0,this.minimizedWindows.push(t)),this.redrawMinimizedWindows()}restoreMinimizedWindow(t){t.preSnapped&&t.setBounds(t.pane,t.preSnapped.x,t.preSnapped.y,t.preSnapped.width,t.preSnapped.height),t.isMinimized=!1,this.minimizedWindows=this.minimizedWindows.filter(i=>i.index!==t.index)}redrawMinimizedWindows(){this.minimizedWindows.forEach((t,i)=>{let e=Math.min((window.innerWidth-250)/(this.minimizedWindows.length||1),300);t.setBounds(t.pane,i*e,window.innerHeight-55,e,55)})}nextIndex(){return this.windowIndex++}},n="https://sidecade.com";!function(){let t=new e;window.sidecade=new class{configs={};constructor(){this.init=this.init.bind(this),this.initCss=this.initCss.bind(this),this.initStaticSidebar=this.initStaticSidebar.bind(this),this.initWindowListener=this.initWindowListener.bind(this),this.initOnScreenButton=this.initOnScreenButton.bind(this),this.processConfigs=this.processConfigs.bind(this),this.handleMessage=this.handleMessage.bind(this),this.config=this.config.bind(this),this.open=this.open.bind(this),this.close=this.close.bind(this),this.staticSidebar=document.createElement("div"),this.configs={}}init(){this.initCss(),this.initStaticSidebar(),this.initWindowListener(),this.processConfigs()}initCss(){let t=document.createElement("style");t.innerHTML=`
.popbox-pane {
    position: fixed;
    overflow: hidden;
    width: 420px;
    bottom: 8px;
    right: 8px;
    height: 80%;
    margin: 0;
    padding: 8px;
    z-index: 2147483647;
    background: transparent;
    display: flex;
    flex-direction: column;
}
.popbox-content-container {
    position: absolute;
    left: 8px;
    right: 8px;
    top: 48px;
    bottom: 8px;
    background: #aaa;
    overflow: hidden;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.popbox-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    background: #fff;
    overflow: hidden;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.popbox-title {
    font-family: monospace;
    background: #2f2f2f;
    color: white;
    font-size: 24px;
    height: 40px;
    text-align: center;
    display: flex;
    align-content: center;
    margin: 0;
    padding: 0 0 0 4px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}

.popbox-title-label {
    font-size: 14px;
    background: transparent;
    display: flex;
    align-items: center;
    margin-left: 5px;
}


.popbox-ghostpane {
    background: #999;
    opacity: 0.2;

    width: 300px;
    height: 70%;
    top: 20%;
    right: 8px;

    position: fixed;
    margin: 0;
    padding: 0;
    z-index: 999999;

    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
    border-radius: 8px;
}
.popbox-button {
    margin: 0 2px;
    padding: 0;
    background: transparent;
    border: none;
}

#close-button-group:hover #close-button-circle {
    cursor: pointer;
}

#close-button-group:hover .close-button-line {
    stroke-dasharray: 10 10;
    visibility: visible;
}

#close-button-group .close-button-line {
    stroke-dasharray: 10 0;
    visibility: hidden;
}

#min-button-group:hover .min-button-circle {
    cursor: pointer;
}

#min-button-group:hover .min-button-line {
    stroke-dasharray: 10 10;
    visibility: visible;
}

#min-button-group .min-button-line {
    stroke-dasharray: 10 0;
    visibility: hidden;
}

#max-button-group:hover .max-button-circle {
    cursor: pointer;
}

#max-button-group:hover .max-button-rect {
    stroke-dasharray: 10 10;
    visibility: visible;
}

#max-button-group .max-button-rect {
    stroke-dasharray: 10 0;
    visibility: hidden;
}

@media only screen and (max-height: 640px) and (orientation: landscape) and (any-pointer: coarse){
    .popbox-pane {
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
    }

    .popbox-content-container {
        left: 0;
        right: 0;
        top: 40px;
        bottom: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .popbox-content {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .popbox-title {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }

    #min-button-group {
        display: none;
    }

    #max-button-group {
        display: none;
    }
}
@media only screen and (max-width: 640px) and (orientation: portrait) and (any-pointer: coarse) {
    .popbox-pane {
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
    }

    .popbox-content-container {
        left: 0;
        right: 0;
        top: 40px;
        bottom: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .popbox-title {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }

    #min-button-group {
        display: none;
    }

    #max-button-group {
        display: none;
    }

    .popbox-content {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
}

.vertical-button {
    border: none;
    position: fixed;
    background: #999;
    right: 0;
    bottom: 100px;
    height: 36px;
    width: 36px;
    margin: 0;
    z-index: 2147483646;
    color: #f7f7f7;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: right 200ms linear;
}
.vertical-button:hover {
    background: #777;
    cursor: pointer;
}
.helper-button-icon {
    width: 20px;
    height: 20px;
}

.popbox-static-sidebar {
    position: fixed;
    overflow: hidden;
    width: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    margin: 0;
    padding: 0;
    z-index: 2147483647;
    background: #fff;
    display: flex;
    flex-direction: column;
    transition: width 200ms linear;
}
.popbox-static-sidebar::-webkit-scrollbar {
    display: none;
}
.popbox-static-sidebar-open {
    width: 420px;
    box-shadow: 0 0 50px -5px #666;
    transition: width 100ms ease-in-out;
}

@media only screen and (max-width: 600px) {
    .popbox-static-sidebar-open {
        width: 100%;
    }

}`,document.head.appendChild(t)}initStaticSidebar(){this.staticSidebar.className="popbox-static-sidebar";let t=document.createElement("iframe");t.src=`${n}/arcades/${this.configs.arcadeId}/embed`,t.style.cssText="flex: 1; border: none; height: 100%; width: 100%;",t.seamless=!0,this.staticSidebar.appendChild(t),document.body.appendChild(this.staticSidebar),t.focus()}initWindowListener(){window.addEventListener("message",this.handleMessage)}processConfigs(){if(!this.configs.arcadeId){console.error("[Sidecade] Error: arcadeId is required");return}this.configs.openByDefault&&this.open(),(void 0==this.configs.showButton||this.configs.showButton)&&this.initOnScreenButton(this.configs.onScreenButton??{})}handleMessage(i){if("resizeWindow"===i.data.type){for(let e=0;e<t.windows.length;e++)if(t.windows[e].index===i.data.windowIndex){let n=t.windows[e];n.setBounds(n.pane,n.pane.getBoundingClientRect().x,n.pane.getBoundingClientRect().y,i.data.size.width,i.data.size.height)}}else if("launchGame"===i.data.type){let e=i.data.game,n=document.createElement("iframe");n.src=e.url,n.style.cssText="flex: 1; border: none; height: 100%;",n.seamless=!0;let s=t.createWindow(n);s.setBounds(s.pane,20*t.windows.length,25*t.windows.length,e.width,e.height);try{fetch(`/api/chrome/play/${e.id}`,{method:"POST",cache:"no-cache",headers:{"Content-Type":"application/json"},body:JSON.stringify({arcadeId:this.configs.arcadeId})})}catch(t){console.error("Error:",t)}}else"closeStaticPane"===i.data.type&&this.close()}config(t){this.configs=t}open(){if(!this.configs.arcadeId){console.error("[Sidecade] Error: arcadeId is required");return}this.staticSidebar.className="popbox-static-sidebar popbox-static-sidebar-open"}close(){if(!this.configs.arcadeId){console.error("[Sidecade] Error: arcadeId is required");return}this.staticSidebar.className="popbox-static-sidebar"}initOnScreenButton(t){let i="md"===t.size?"48px":"sm"===t.size?"32px":"64px",e=document.createElement("button");e.className="vertical-button",e.style.opacity=t.opacity??"0.8",e.style.width=i,e.style.height=i,e.style.margin="0 auto",e.style.borderTopLeftRadius="lg"===t.size?"8px":"4px",e.style.borderBottomLeftRadius="lg"===t.size?"8px":"4px",e.style.borderTopRightRadius="lg"===t.size?"8px":"4px",e.style.borderBottomRightRadius="lg"===t.size?"8px":"4px",e.style.left=t.left??void 0,e.style.right=t.right??"20px",e.style.top=t.top??void 0,e.style.bottom=t.bottom??"20px",e.onclick=()=>this.open();let s=document.createElement("img");s.src=`${n}/images/${t?.size==="sm"||t?.size==="md"?"icon32-t.png":"icon48-t.png"}`,e.appendChild(s),document.body.appendChild(e)}},window.onload=()=>window.sidecade.init()}()})();