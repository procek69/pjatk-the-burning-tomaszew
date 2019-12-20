import React, { useState } from "react";
import tomaszew95 from "./../images/tomaszew95.png";
import Window from "./Window";
import SystemBar from "./SystemBar";


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
                return (
                    <Window onClose={_ => closeWindow(key)} key={key} params={windowParams}>
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
            }} />
        </div>
    );
}