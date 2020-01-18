import React from "react";
//Assets
import ie95icon from "./../images/ie95icon.png";


export default function SystemBar({ onButtonClick, onBrowserButtonClick }) {

    return (
        <div className="system-bar">
            <button onClick={onButtonClick}>Click me</button>
            <button onClick={onBrowserButtonClick}>
                <img className="system-bar-icon" src={ie95icon} />
                Tomaszew Internet Explorer
                </button>
        </div>
    )
}