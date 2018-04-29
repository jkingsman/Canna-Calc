import React from 'react';

import {AccordionContainer, CardTemplate} from 'app/calculators/components/accordion';
import GeneralCalculatorTemplate from 'app/calculators/general/general_calculator_template';

import PercentChange from 'app/calculators/general/percentchange_calculator';
import CylinderCalculator from 'app/calculators/general/cylinder_calculator';
import ConversionFactors from 'app/utils/conversion_factors';

import LightingCalculator from 'app/calculators/growing/lighting_calculator.jsx';
import CO2Calculator from 'app/calculators/growing/co2_calculator.jsx';
import ExhaustCalculator from 'app/calculators/growing/exhaust_calculator.jsx';
import AmperageCalculator from 'app/calculators/growing/amperage_calculator.jsx';
import YieldCalculator from 'app/calculators/growing/yield_calculator.jsx';
import YieldDryWetCalculator from 'app/calculators/growing/yielddrywet_calculator.jsx';
import WaterCalculator from 'app/calculators/growing/water_calculator.jsx';
import PlantCount from 'app/calculators/growing/plantcount_calculator.jsx';

import {PercentageToMG, MGToPercentage, Density, FreeWeight} from 'app/calculators/concentratesedibles/thc_conversions';
import DecarbLoss from 'app/calculators/concentratesedibles/decarb_loss';
import ExtractionEfficiency from 'app/calculators/concentratesedibles/extraction_efficiency';
import EvapPrediction from 'app/calculators/concentratesedibles/evap_prediction';
import {EdiblePotency, EdibleProduct, EdibleServings} from 'app/calculators/concentratesedibles/edible_calculators';

const CalculatorContainer = () => {
    return (
        <div>
            <h5 className="group-header">General Conversions & Math</h5>
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

                <CardTemplate id="percentChange" title="Percent Change" parentID="generalAccordion">
                    <PercentChange/>
                </CardTemplate>

                <CardTemplate id="cylinderVolume" title="Cylinder (Ducting) Volume" parentID="generalAccordion">
                    <CylinderCalculator/>
                </CardTemplate>
            </AccordionContainer>

            <h5 className="group-header">Growing &amp; Plant Production</h5>
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

            <h5 className="group-header">Concentrates & Edibles</h5>
            <AccordionContainer id="concentratesEdiblesAccordion" padLeft>
                <CardTemplate id="potency" title="THC/Potency Conversions" parentID="concentratesEdiblesAccordion">
                    <p>Choose the appropriate calculator section for your units. mg and g are used as standard analyte units; if your starting values are in a different unit, use our Weight Conversion calculator.</p>
                    <hr/>
                    <PercentageToMG/>
                    <hr/>
                    <MGToPercentage/>
                    <hr/>
                    <Density/>
                    <hr/>
                    <FreeWeight/>
                </CardTemplate>

                <CardTemplate id="decarbLoss" title="Decarboxylation Loss" parentID="concentratesEdiblesAccordion">
                    <DecarbLoss/>
                </CardTemplate>

                <CardTemplate id="extractionEfficiency" title="Extraction Efficiency" parentID="concentratesEdiblesAccordion">
                    <ExtractionEfficiency/>
                </CardTemplate>

                <CardTemplate id="evapPrediction" title="Solvent Evaporation Time Estimate" parentID="concentratesEdiblesAccordion">
                    <EvapPrediction/>
                </CardTemplate>

                <CardTemplate id="ediblePotency" title="Edible Potency" parentID="concentratesEdiblesAccordion">
                    <p>Note that these calculators do not take into account THCa to THC weight loss; to correct for this, use our Decarboxylation Loss calculator to adjust Product Weight or multiply your potency by .877. This assumes perfect yield (e.g. all THC is removed from plant material) and is therefore most accurate for oils baked into the goods.</p>
                    <hr/>
                    <EdiblePotency/>
                    <hr/>
                    <EdibleProduct/>
                    <hr/>
                    <EdibleServings/>
                </CardTemplate>
            </AccordionContainer>
        </div>
    );
}

export default CalculatorContainer;
