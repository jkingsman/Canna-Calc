import React from "react";

import { FixedUnitInput, FixedUnitOutput } from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class PercentConstituent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 200,
            percent: 5,
        };
    }

    getAdditive() {
        return this.state.start / (1 - this.state.percent / 100);
    }

    render() {
        return (
            <div className="container">
                <p>
                    This solves for additive amount in cases where the additive
                    can be, at a maximum, a given percentage of final
                    constituency (e.g. many terpene additives recommend no more
                    than 5% final consitituency of the mixture; given 200g of
                    concentrate, you can therefore add 10.526g of terpenes).
                </p>
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Start Amount"
                            onChange={val =>
                                this.setState({ start: Number(val) })
                            }
                            number={this.state.start}
                            unit="units"
                        />
                        <FixedUnitInput
                            inputLabel="Final % of Additive"
                            onChange={val =>
                                this.setState({ percent: Number(val) })
                            }
                            number={this.state.percent}
                            unit="%"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Additive Amt."
                            number={defaultRound(this.getAdditive())}
                            unit="units"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
