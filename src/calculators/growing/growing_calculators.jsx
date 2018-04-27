import React from 'react';

import {AccordionContainer, CardTemplate} from 'app/calculators/components/accordion';
import LightingCalculator from 'app/calculators/growing/lighting_calculator.jsx';
import CO2Calculator from 'app/calculators/growing/co2_calculator.jsx';
import AmperageCalculator from 'app/calculators/growing/amperage_calculator.jsx';
import YieldCalculator from 'app/calculators/growing/yield_calculator.jsx';
import WaterCalculator from 'app/calculators/growing/water_calculator.jsx';

const GrowingCalculators = () => {
    return (
        <AccordionContainer id="growingAccordion" padLeft>
            <CardTemplate id="lighting" title="Light Wattage" parentID="growingAccordion">
                <LightingCalculator/>
            </CardTemplate>
            <CardTemplate id="co2FlowRate" title="CO₂ Flow Rate" parentID="growingAccordion">
                <CO2Calculator/>
            </CardTemplate>
            <CardTemplate id="amperageCalculator" title="Light kWh &amp; Cost" parentID="growingAccordion">
                <AmperageCalculator/>
            </CardTemplate>
            <CardTemplate id="waterCalculator" title="Water Usage &amp; Cost" parentID="growingAccordion">
                <WaterCalculator/>
            </CardTemplate>
            <CardTemplate id="yieldCalculator" title="Crop Yield" parentID="growingAccordion">
                <YieldCalculator/>
            </CardTemplate>
        </AccordionContainer>
    );
}

export default GrowingCalculators;
