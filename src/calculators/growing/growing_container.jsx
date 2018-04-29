import React from 'react';

import {AccordionContainer, CardTemplate} from 'app/calculators/components/accordion';
import LightingCalculator from 'app/calculators/growing/lighting_calculator.jsx';
import CO2Calculator from 'app/calculators/growing/co2_calculator.jsx';
import ExhaustCalculator from 'app/calculators/growing/exhaust_calculator.jsx';
import AmperageCalculator from 'app/calculators/growing/amperage_calculator.jsx';
import YieldCalculator from 'app/calculators/growing/yield_calculator.jsx';
import YieldDryWetCalculator from 'app/calculators/growing/yielddrywet_calculator.jsx';
import WaterCalculator from 'app/calculators/growing/water_calculator.jsx';
import PlantCount from 'app/calculators/growing/plantcount_calculator.jsx';

const GrowingCalculators = () => {
    return (
        <AccordionContainer id="growingAccordion" padLeft>
            <CardTemplate id="lighting" title="Light Wattage" parentID="growingAccordion">
                <LightingCalculator/>
            </CardTemplate>
            <CardTemplate id="co2FlowRate" title="CO₂ Flow Rate" parentID="growingAccordion">
                <CO2Calculator/>
            </CardTemplate>
            <CardTemplate id="exhaustCFM" title="Exhaust CFM Calculator" parentID="growingAccordion">
                <ExhaustCalculator/>
            </CardTemplate>
            <CardTemplate id="amperageCalculator" title="Light kWh &amp; Cost" parentID="growingAccordion">
                <AmperageCalculator/>
            </CardTemplate>
            <CardTemplate id="waterCalculator" title="Water Usage &amp; Cost" parentID="growingAccordion">
                <WaterCalculator/>
            </CardTemplate>
            <CardTemplate id="yieldCalculator" title="General Crop Yield" parentID="growingAccordion">
                <YieldCalculator/>
            </CardTemplate>
            <CardTemplate id="yieldDryWetCalculator" title="Dry/Wet Yield" parentID="growingAccordion">
                <YieldDryWetCalculator/>
            </CardTemplate>
            <CardTemplate id="plantCountCalculator" title="Plant Layout" parentID="growingAccordion">
                <PlantCount/>
            </CardTemplate>
        </AccordionContainer>
    );
}

export default GrowingCalculators;
