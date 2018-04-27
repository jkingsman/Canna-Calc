import React from 'react';

import {AccordionContainer, CardTemplate} from 'app/calculators/components/accordion';
import LightingCalculator from 'app/calculators/growing/lighting_calculator.jsx';
import CO2Calculator from 'app/calculators/growing/co2_calculator.jsx';

const GrowingCalculators = () => {
    return (
        <AccordionContainer id="growingAccordion" padLeft>
            <CardTemplate id="lighting" title="Light Wattage" parentID="growingAccordion">
                <LightingCalculator/>
            </CardTemplate>
            <CardTemplate id="co2FlowRate" title="CO₂ Flow Rate" parentID="growingAccordion">
                <CO2Calculator/>
            </CardTemplate>
        </AccordionContainer>
    );
}

export default GrowingCalculators;
