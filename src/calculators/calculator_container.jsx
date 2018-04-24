import React from 'react';
import GeneralCalculators from 'app/calculators/general/general_calculators';

export default class CalculatorContainer extends React.Component {
    render() {
        return (
            <div>
                <h3>General Conversions</h3>
                <GeneralCalculators />
                <h3>Growing &amp; Plant Production</h3>
                <h3>Harvest &amp; Potency</h3>
                <h3>Concentrates</h3>
                <h3>Profits</h3>
            </div>
        );
    }
}
