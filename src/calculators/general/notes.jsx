import React from "react";
import Editor from "react-pell";

export default class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    getContents() {
        if (localStorage.getItem("notesData")) {
            return localStorage.getItem("notesData");
        } else {
            return "This field will save notes for you; they will stay here even when you close the site and are local to this browser -- they never leave your computer.";
        }
    }

    handleChange(html) {
        localStorage.setItem("notesData", html);
    }

    render() {
        return <Editor defaultContent={this.getContents()} onChange={this.handleChange} />;
    }
}
