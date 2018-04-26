import React from 'react';

import GeneralCalculatorTemplate from 'app/calculators/general/general_calculator_template';
import ConversionFactors from 'app/utils/conversion_factors';

export default class GeneralCalculators extends React.Component {
    render() {
        return (
            <div id="generalAccordion" className="padLeft">
                <GeneralCalculatorTemplate labelSuffix="Weight" conversionFactors={ConversionFactors.weight} negative={false}/>
                <GeneralCalculatorTemplate labelSuffix="Temperature" conversionFactors={ConversionFactors.temperature} negative={true}/>
                <GeneralCalculatorTemplate labelSuffix="Distance" conversionFactors={ConversionFactors.distance} negative={false}/>
                <GeneralCalculatorTemplate labelSuffix="Area" conversionFactors={ConversionFactors.area} negative={false}/>
                <GeneralCalculatorTemplate labelSuffix="Volume" conversionFactors={ConversionFactors.volume} negative={false}/>
                <GeneralCalculatorTemplate labelSuffix="Flow Rate" conversionFactors={ConversionFactors.flowRate} negative={false} message="If your volume isn't already in cubic meters (m³), convert to cubic meters via the Volume converter, then enter it here to convert."/>
            </div>
        );
    }
}
