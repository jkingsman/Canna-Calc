import React from "react";

import { FixedUnitInput, FixedUnitOutput } from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class PercentChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            before: 110,
            after: 20,
        };
    }

    getChange() {
        return (this.state.after - this.state.before) / this.state.before * 100;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Before"
                            onChange={val => this.setState({ before: Number(val) })}
                            number={this.state.before}
                            unit="units"
                        />
                        <FixedUnitInput
                            inputLabel="After"
                            onChange={val => this.setState({ after: Number(val) })}
                            number={this.state.after}
                            unit="units"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Change"
                            number={defaultRound(this.getChange())}
                            unit="%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
