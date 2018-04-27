import React from 'react';

import {AccordionContainer, CardTemplate} from 'app/calculators/components/accordion';
import GeneralCalculatorTemplate from 'app/calculators/general/general_calculator_template';
import ConversionFactors from 'app/utils/conversion_factors';

const GeneralCalculators = () => {
    return (
        <AccordionContainer id="generalAccordion" padLeft>
            <CardTemplate id="weightConversion" title="Weight Conversion" parentID="generalAccordion">
                <GeneralCalculatorTemplate labelSuffix="Weight" conversionFactors={ConversionFactors.weight}/>
            </CardTemplate>

            <CardTemplate id="temperatureConversion" title="Temperature Conversion" parentID="generalAccordion">
                <GeneralCalculatorTemplate labelSuffix="Temperature" conversionFactors={ConversionFactors.temperature} negative hideSplitter/>
            </CardTemplate>

            <CardTemplate id="distanceConversion" title="Distance Conversion" parentID="generalAccordion">
                <GeneralCalculatorTemplate labelSuffix="Distance" conversionFactors={ConversionFactors.distance}/>
            </CardTemplate>

            <CardTemplate id="areaConversion" title="Area Conversion" parentID="generalAccordion">
                <GeneralCalculatorTemplate labelSuffix="Area" conversionFactors={ConversionFactors.area}/>
            </CardTemplate>

            <CardTemplate id="volumeConversion" title="Volume Conversion" parentID="generalAccordion">
                <GeneralCalculatorTemplate labelSuffix="Volume" conversionFactors={ConversionFactors.volume}/>
            </CardTemplate>

            <CardTemplate id="flowRateConversion" title="Flow Rate Conversion" parentID="generalAccordion">
                <GeneralCalculatorTemplate labelSuffix="Flow Rate" conversionFactors={ConversionFactors.flowRate} message="If your volume isn't already in cubic meters (m³), convert to cubic meters via the Volume converter, then enter it here to convert."/>
            </CardTemplate>
        </AccordionContainer>
    );
}

export default GeneralCalculators;
