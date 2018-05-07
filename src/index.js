import React from "react";
import ReactDOM from "react-dom";
import * as OfflinePluginRuntime from "offline-plugin/runtime";

import Boilerplate from "app/boilerplate";
import "app/css/styles.css";
import "app/css/bootstrap-custom.min.scss";

ReactDOM.render(<Boilerplate />, document.getElementById("app"));

if (process.env.NODE_ENV == "development") {
    module.hot.accept();
} else {
    // prod
    OfflinePluginRuntime.install();
}
