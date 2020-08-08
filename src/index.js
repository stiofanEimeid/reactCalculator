import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Calculator from "./components/Calculator";

const App = () => {
    return (
        <Fragment>
            <Calculator />
        </Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)