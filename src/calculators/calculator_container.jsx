import React from 'react';
import GeneralCalculators from 'app/calculators/general/general_calculators';

export default class CalculatorContainer extends React.Component {
    render() {
        return (
            <div>
                <h5>General Conversions</h5>
                <GeneralCalculators />
                <h5>Growing &amp; Plant Production</h5>
                <h5>Harvest &amp; Potency</h5>
                <h5>Concentrates</h5>
                <h5>Profits</h5>
            </div>
        );
    }
}
