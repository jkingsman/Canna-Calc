import React from 'react';
import GeneralCalculators from 'app/calculators/general/general_calculators';
import GrowingCalculators from 'app/calculators/growing/growing_calculators';

const CalculatorContainer = () => {
    return (
        <div>
            <h5 className="group-header">General Conversions</h5>
            <GeneralCalculators/>
            <h5 className="group-header">Growing &amp; Plant Production</h5>
            <GrowingCalculators/>
            <h5 className="group-header">Harvest &amp; Potency</h5>
            <h5 className="group-header">Concentrates</h5>
            <h5 className="group-header">Profits</h5>
        </div>
    );
}

export default CalculatorContainer;
