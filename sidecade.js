var appDomain = "https://sidecade.com";

import WindowManager from "./window-manager"


(function(){
    const windowManager = new WindowManager();
    class Sidecade {
        configs = {}

        constructor() {
            this.init = this.init.bind(this);
            this.initCss = this.initCss.bind(this);
            this.initStaticSidebar = this.initStaticSidebar.bind(this);
            this.initWindowListener = this.initWindowListener.bind(this);
            this.initOnScreenButton = this.initOnScreenButton.bind(this);
            this.processConfigs = this.processConfigs.bind(this);
            this.handleMessage = this.handleMessage.bind(this);

            this.config = this.config.bind(this);
            this.open = this.open.bind(this);
            this.close = this.close.bind(this);
            this.staticSidebar = document.createElement('div');
            this.configs = {};
        }

        init() {
            this.initCss();
            this.initStaticSidebar();
            this.initWindowListener();
            this.processConfigs();
        }

        initCss() {
            const css = document.createElement('style')
            css.innerHTML = `
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

}`;
            document.head.appendChild(css);
        }

        initStaticSidebar() {
            this.staticSidebar.className = 'popbox-static-sidebar';

            const iframe = document.createElement('iframe');
            iframe.src = `${appDomain}/chrome/home`;
            iframe.style.cssText = "flex: 1; border: none; height: 100%; width: 100%;";
            iframe.seamless = true;
            this.staticSidebar.appendChild(iframe);
            document.body.appendChild(this.staticSidebar);
            iframe.focus();
        }
        initWindowListener() {
            window.addEventListener('message', this.handleMessage);
        }

        processConfigs() {
            if(!this.configs.arcadeId) {
                console.error('[Sidecade] Error: arcadeId is required');
                return;
            }

            if(this.configs.openByDefault){
                this.open();
            }

            if(this.configs.showButton == undefined || this.configs.showButton){
                this.initOnScreenButton(this.configs.onScreenButton ?? {});
            }
        }

        handleMessage(event) {
            if (event.data.type === 'resizeWindow') {
                for (let i = 0; i < windowManager.windows.length; i++) {
                    if (windowManager.windows[i].index === event.data.windowIndex) {
                        const popWindow = windowManager.windows[i];

                        popWindow.setBounds(
                            popWindow.pane,
                            popWindow.pane.getBoundingClientRect().x,
                            popWindow.pane.getBoundingClientRect().y,
                            event.data.size.width,
                            event.data.size.height,
                        );
                    }
                }
            } else if (event.data.type === 'launchGame') {
                const game = event.data.game;

                let iframe = document.createElement('iframe');
                iframe.src = game.url;
                iframe.style.cssText = 'flex: 1; border: none; height: 100%;';
                iframe.seamless = true;

                const newWindow = windowManager.createWindow(iframe);

                newWindow.setBounds(
                    newWindow.pane,
                    windowManager.windows.length * 20,
                    windowManager.windows.length * 25,
                    game.width,
                    game.height,
                );

                try {
                    fetch(`/api/chrome/play/${game.id}`, {
                        method: 'POST',
                        cache: 'no-cache',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            arcadeId: this.configs.arcadeId,
                        })
                    });
                } catch (error) {
                    console.error('Error:', error);
                }
            } else if (event.data.type === 'closeStaticPane') {
                this.close();
            }
        }

        config(options) {
            this.configs = options;
        }

        open() {
            if(!this.configs.arcadeId) {
                console.error('[Sidecade] Error: arcadeId is required');
                return;
            }

            this.staticSidebar.className = 'popbox-static-sidebar popbox-static-sidebar-open';
        }

        close() {
            if(!this.configs.arcadeId) {
                console.error('[Sidecade] Error: arcadeId is required');
                return;
            }

            this.staticSidebar.className = 'popbox-static-sidebar';
        }

        initOnScreenButton(buttonConfigs) {

            const size = buttonConfigs.size === 'md' ? '48px' : (buttonConfigs.size === 'sm' ? '32px' : '64px');

            const onScreenButton = document.createElement("button");
            onScreenButton.className = "vertical-button";
            onScreenButton.style.opacity = buttonConfigs.opacity ?? '0.8';
            onScreenButton.style.width = size;
            onScreenButton.style.height = size;
            onScreenButton.style.margin = '0 auto';
            onScreenButton.style.borderTopLeftRadius = buttonConfigs.size === 'lg' ? '8px' : '4px';
            onScreenButton.style.borderBottomLeftRadius = buttonConfigs.size === 'lg' ? '8px' : '4px';
            onScreenButton.style.borderTopRightRadius = buttonConfigs.size === 'lg' ? '8px' : '4px';
            onScreenButton.style.borderBottomRightRadius = buttonConfigs.size === 'lg' ? '8px' : '4px';
            onScreenButton.style.left = buttonConfigs.left ?? undefined;
            onScreenButton.style.right = buttonConfigs.right ?? "20px";
            onScreenButton.style.top = buttonConfigs.top ?? undefined;
            onScreenButton.style.bottom = buttonConfigs.bottom ?? "20px";
            onScreenButton.onclick = () => this.open();


            const logo = document.createElement("img");
            logo.src = `${appDomain}/images/${buttonConfigs?.size === 'sm' || buttonConfigs?.size === 'md' ? 'icon32-t.png': 'icon48-t.png'}`;

            onScreenButton.appendChild(logo);
            document.body.appendChild(onScreenButton);
        }
    }

    window.sidecade = new Sidecade();


    window.onload = () => window.sidecade.init();
})();