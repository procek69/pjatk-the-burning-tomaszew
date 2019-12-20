import React from "react";

export default function SystemBar({ onButtonClick }) {

    return (
        <div className="system-bar">
            <button onClick={onButtonClick}>Click me</button>
        </div>
    )
}