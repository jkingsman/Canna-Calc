import React from "react";
import ReactDOM from "react-dom";

import CalculatorContainer from "app/calculators/calculator_container";
import "app/css/styles.css";
import "app/css/bootstrap-custom.min.scss";

ReactDOM.render(<CalculatorContainer />, document.getElementById("app"));

if (process.env.NODE_ENV == "development") {
    module.hot.accept();
}
