import React, { useState } from "react";
import tomaszew95 from "./images/tomaszew95.png";
import Window from "./Window";
import SystemBar from "./components/SystemBar";


export default () => {
    const [windows, setWindows] = useState([], []);
    return (
        <div className="desktop tomaszew95">
            <img src={tomaszew95} />
            {windows.map((windowParams, key) => {
                let onClose = () => {
                    setWindows(windows.splice(key, 1));
                }
                return (
                    <Window onClose={onClose} key={key} params={windowParams}>
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