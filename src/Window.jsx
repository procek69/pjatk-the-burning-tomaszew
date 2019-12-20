import React from "react";
import Draggable from 'react-draggable';

export default function ({ children }) {
    return (
        <Draggable>
            <div>I can now be moved around!</div>
            <div>{children}</div>
        </Draggable>
    );
}