import React from "react";

const defaultUrl = "https://www.pja.edu.pl/";

export default function () {

    return (
        <div>
            <iframe src={defaultUrl} height={500} width={800} />
        </div>
    );
}