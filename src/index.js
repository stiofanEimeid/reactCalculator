import React, { Fragment } from "react";
import ReactDOM from "react-dom";
// import Calculator from "./components/Calculator";
import HookCalculator from "./components/HookCalculator";

const App = () => {
    return (
        <Fragment>
            <HookCalculator />
        </Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)