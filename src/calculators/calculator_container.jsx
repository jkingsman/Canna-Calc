import React from 'react';
import GeneralCalculators from 'app/calculators/general/general_container';
import GrowingCalculators from 'app/calculators/growing/growing_container';
import ConcentratesEdiblesCalculator from 'app/calculators/concentratesedibles/concentratesedibles_container';

const CalculatorContainer = () => {
    return (
        <div>
            <h5 className="group-header">General Conversions & Math</h5>
            <GeneralCalculators/>
            <h5 className="group-header">Growing &amp; Plant Production</h5>
            <GrowingCalculators/>
            <h5 className="group-header">Concentrates & Edibles</h5>
            <ConcentratesEdiblesCalculator />
            <h5 className="group-header">Profits</h5>
        </div>
    );
}

export default CalculatorContainer;
