import React from "react";

import {
    GenericInput,
    FixedUnitInput,
    FixedUnitOutput,
    GenericOutput,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class LinearProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amountCompleted: 10,
            timeTaken: 2,
            amountLeft: 65,
        };
    }

    render() {
        return (
            <div className="container">
                <p>
                    This calculator generalizes to any linear task (i.e. if it takes you one hour to
                    do two, it will take two hours for four and three hours for six, etc.).
                </p>
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Amount Done"
                            onChange={val =>
                                this.setState({
                                    amountCompleted: Number(val),
                                })
                            }
                            number={this.state.amountCompleted}
                            unit="units"
                        />
                        <GenericInput
                            inputLabel="Time Taken So Far"
                            onChange={val => this.setState({ timeTaken: Number(val) })}
                            conversionFactors={ConversionFactors.basicTime}
                            number={this.state.timeTaken}
                        />
                        <FixedUnitInput
                            inputLabel="Amount Left"
                            onChange={val =>
                                this.setState({
                                    amountLeft: Number(val),
                                })
                            }
                            number={this.state.amountLeft}
                            unit="units"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Work Pace"
                            number={defaultRound(this.state.amountCompleted / this.state.timeTaken)}
                            unit="units/hr"
                        />
                        <GenericOutput
                            outputLabel="Time to Completion"
                            number={defaultRound(
                                this.state.amountLeft /
                                    (this.state.amountCompleted / this.state.timeTaken)
                            )}
                            conversionFactors={ConversionFactors.basicTime}
                            showSplitter={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
