import React from 'react';

import {weightConversionFactors} from 'app/utils/conversion_factors';
import {GenericInput, GenericOutput} from 'app/calculators/io';

export default class WeightCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        };

        this.setNumber = this.setNumber.bind(this);
    }

    setNumber(number) {
        this.setState({number: number});
    }

    render() {
        return (
            <div>
                <GenericInput inputLabel="Input Weight" onChange={this.setNumber} conversionFactors={weightConversionFactors} />
                <GenericOutput outputLabel="Output Weight" number={this.state.number} conversionFactors={weightConversionFactors} />
            </div>
        );
    }
}
