import React, { useState } from "react";
import tomaszew95 from "./../images/tomaszew95.png";
import Window from "./Window";
import SystemBar from "./SystemBar";
import WindowBrowser from './WindowBrowser';


export default () => {
    const [windows, setWindows] = useState([], []);

    const closeWindow = (id) => {
        let newWindowsState = [...windows];
        newWindowsState.splice(id, 1);
        setWindows(newWindowsState);
    }

    return (
        <div className="desktop tomaszew95">
            <img className="system-logo" src={tomaszew95} />
            {windows.map((windowParams, key) => {
                let children;
                switch(windowParams.title){
                    case('Tomaszew Internet Explorer'):
                        children = <WindowBrowser />;
                        break;
                }
                if(children != null){
                    return (
                        <Window onClose={_ => closeWindow(key)} key={key} params={windowParams} title={windowParams.title}>
                            {children}
                        </Window>
                    );
                }
                return (
                    <Window onClose={_ => closeWindow(key)} key={key} params={windowParams} title={windowParams.title || "Window"}>
                        To jest treść okna {key}
                    </Window>
                );

            })}
            <SystemBar onButtonClick={_ => {
                setWindows([
                    ...windows,
                    {
                        title: "Window #" + windows.length
                    }
                ])
            }} onBrowserButtonClick={_ => {
                setWindows([
                    ...windows,
                    {
                        title: "Tomaszew Internet Explorer"
                    }
                ])
            }}/>
        </div>
    );
}