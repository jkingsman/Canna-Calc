import React from 'react';

import GenericCalculator from 'app/calculators/io';
import {weightConversionFactors, temperatureConversionFactors} from 'app/utils/conversion_factors';

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
                            <GenericCalculator conversionFactors={weightConversionFactors} labelSuffix="Weight"/>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <a className="card-header" id="temperatureConversion" data-toggle="collapse" data-target="#temperatureConversionCollapse" aria-controls="collapseWeightConversion">
                        <p className="mb-0">
                            Temperature Conversion
                        </p>
                    </a>

                    <div id="temperatureConversionCollapse" className="collapse" aria-labelledby="temperatureConversion" data-parent="#generalAccordion">
                        <div className="card-body">
                            <GenericCalculator conversionFactors={temperatureConversionFactors} labelSuffix="Temperature" negative/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
