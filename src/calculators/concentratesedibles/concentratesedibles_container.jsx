import React from 'react';

import {AccordionContainer, CardTemplate} from 'app/calculators/components/accordion';

import {PercentageToMG, MGToPercentage, Density, FreeWeight} from 'app/calculators/concentratesedibles/thc_conversions';
import DecarbLoss from 'app/calculators/concentratesedibles/decarb_loss';
import ExtractionEfficiency from 'app/calculators/concentratesedibles/extraction_efficiency';
import EvapPrediction from 'app/calculators/concentratesedibles/evap_prediction';
import {EdiblePotency, EdibleProduct, EdibleServings} from 'app/calculators/concentratesedibles/edible_calculators';

const ConcentrateEdiblesCalculators = () => {
    return (
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
    );
}

export default ConcentrateEdiblesCalculators;
