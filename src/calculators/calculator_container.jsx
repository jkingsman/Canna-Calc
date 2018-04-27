import React from 'react';
import GeneralCalculators from 'app/calculators/general/general_calculators';
import GrowingCalculators from 'app/calculators/growing/growing_calculators';

const CalculatorContainer = () => {
    return (
        <div>
            <h5>General Conversions</h5>
            <GeneralCalculators/>
            <h5>Growing &amp; Plant Production</h5>
            <GrowingCalculators/>
            <h5>Harvest &amp; Potency</h5>
            <h5>Concentrates</h5>
            <h5>Profits</h5>
        </div>
    );
}

export default CalculatorContainer;
