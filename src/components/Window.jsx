import React from "react";
import Draggable from 'react-draggable';

const PROCEK_CONST = 0.69;

const getRandomPointInScreen = () => {
    let {height, width} = window.screen;
    if (!height || !width) {
        return {x: 0, y: 0};
    }
    return {
        x: Math.random() * width * PROCEK_CONST,
        y: Math.random() * height * PROCEK_CONST,
    }
}

export default function ({ children, title, onClose }) {

    const startPosition = getRandomPointInScreen();
    console.log(title);

    return (
        <Draggable defaultPosition={startPosition}>
            <div className="window">
                <div className="titleBar">
                    <p>{title || "Window"}</p>
                    <div className="divider"></div>
                    <button onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </Draggable>
    );
}