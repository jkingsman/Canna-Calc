import React from "react";

import { FixedUnitInput, FixedUnitOutput } from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class CylinderCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: 2,
            height: 5
        };
    }

    getVolume() {
        return Math.PI * Math.pow(this.state.radius, 2) * this.state.height;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Radius"
                            onChange={val =>
                                this.setState({ radius: Number(val) })
                            }
                            number={this.state.radius}
                            unit="units"
                        />
                        <FixedUnitInput
                            inputLabel="Height*"
                            onChange={val =>
                                this.setState({ height: Number(val) })
                            }
                            number={this.state.height}
                            unit="units"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Volume"
                            number={defaultRound(this.getVolume())}
                            unit="units³"
                        />
                    </div>
                </div>
                <i>
                    *When using cylinder volume to determine total ducting
                    volume, use the total ducting length as the Height. For more
                    in-depth ducting assistance, use our Ducting Calculator
                </i>
            </div>
        );
    }
}
