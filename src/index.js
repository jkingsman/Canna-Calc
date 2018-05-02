import React from "react";
import ReactDOM from "react-dom";
import "app/css/styles.css";

import Boilerplate from "app/boilerplate";

ReactDOM.render(<Boilerplate />, document.getElementById("app"));

if (process.env.NODE_ENV == "development") {
    module.hot.accept();
}
