import React from 'react';

import WeightCalculator from 'app/calculators/general/weight';

export default class GeneralCalculators extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
        };

        this.setNumber = this.setNumber.bind(this);
    }

    setNumber(number) {
        this.setState({number: number});
    }

    render() {
        return (
            <div id="generalAccordion" className="padLeft">
                <div className="card">
                    <a className="card-header" id="weightConversion" data-toggle="collapse" data-target="#weightConversionCollapse" aria-controls="collapseWeightConversion">
                        <p className="mb-0">
                            Weight Conversion
                        </p>
                    </a>

                    <div id="weightConversionCollapse" className="collapse" aria-labelledby="weightConversion" data-parent="#generalAccordion">
                        <div className="card-body">
                            <WeightCalculator/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
