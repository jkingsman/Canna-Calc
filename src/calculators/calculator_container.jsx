import React from "react";

import CardTemplate from "app/calculators/components/card_template";
import GeneralCalculatorTemplate from "app/calculators/general/general_calculator_template";

import Notes from "app/calculators/general/notes";
import PercentChange from "app/calculators/general/percentchange_calculator";
import CylinderCalculator from "app/calculators/general/cylinder_calculator";
import PercentConstituent from "app/calculators/general/percent_constituent";
import LinearProcess from "app/calculators/general/linear_process";
import DateCalculator from "app/calculators/general/date_calculator";
import ConversionFactors from "app/utils/conversion_factors";

import LightingCalculator from "app/calculators/equipment_power/lighting_calculator";
import CO2Calculator from "app/calculators/equipment_power/co2_calculator";
import BTUCalculator from "app/calculators/equipment_power/btu_calculator";
import ExhaustCalculator from "app/calculators/equipment_power/exhaust_calculator";
import AmperageCalculator from "app/calculators/equipment_power/amperage_calculator";
import WaterCalculator from "app/calculators/equipment_power/water_calculator";

import GrowthTimeline from "app/calculators/plants_consumables/growth_timeline";
import SoilCalculator from "app/calculators/plants_consumables/soil_calculator";
import PHCalculator from "app/calculators/plants_consumables/ph_solution";
import NpkToTDS from "app/calculators/plants_consumables/npkToTDS";
import TDStoNPK from "app/calculators/plants_consumables/tdsToNPK";
import TDSDilution from "app/calculators/plants_consumables/tds_dilution";
import YieldCalculator from "app/calculators/plants_consumables/yield_calculator";
import YieldDryWetCalculator from "app/calculators/plants_consumables/yielddrywet_calculator";
import PlantCount from "app/calculators/plants_consumables/plantcount_calculator";

import {
    PercentageToMG,
    MGToPercentage,
    Density,
    FreeWeight,
} from "app/calculators/concentratesedibles/thc_conversions";
import DecarbLoss from "app/calculators/concentratesedibles/decarb_loss";
import DecarbCurve from "app/calculators/concentratesedibles/decarb_curve";
import ExtractionEfficiency from "app/calculators/concentratesedibles/extraction_efficiency";
import EvapPrediction from "app/calculators/concentratesedibles/evap_prediction";
import CapsuleCalculator from "app/calculators/concentratesedibles/capsule_calculator";
import {
    EdiblePotency,
    EdibleProduct,
    EdibleServings,
    VariableServingPotency,
} from "app/calculators/concentratesedibles/edible_calculators";

export default class CalculatorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            hasLoaded: false,
        };

        this.setSearchTerm = this.setSearchTerm.bind(this);
    }

    componentDidMount() {
        // hacky way to make anchor links work even though page "load" is complete from browser's perspective
        // only does it on first load since the anchors are ids with a `_a` attached to them
        // we load the page, wait for render, set the hash to actually match the anchor, then flip it back again
        // this prevents opening accordions from scrolling the page to them (since it sets the anchor and then the page jumps)
        // this makes page usage much smoother
        if (window.location.hash.length > 1) {
            // don't do this on bare URL lest you redirect loop
            setTimeout(() => {
                window.location = `${window.location.href}_a`;
                setTimeout(() => {
                    window.location = window.location.href.substr(
                        0,
                        window.location.href.length - 2
                    );
                }, 1000);
            }, 500);
        }
    }

    isSearching() {
        return this.state.searchTerm.length > 0;
    }

    setSearchTerm(ev) {
        this.setState({
            searchTerm: ev.target.value,
        });
    }

    render() {
        return (
            <div id="mainAccordion">
                <input
                    aria-label="search for calculators"
                    value={this.state.searchTerm}
                    onChange={this.setSearchTerm}
                    placeholder="Enter a keyword to search..."
                    id="searchBar"
                    type="search"
                />{" "}
                {this.isSearching() ? "" : <h2>General Cannabis Conversions &amp; Math</h2>}
                <CardTemplate
                    id="notes"
                    keywords="notes text save"
                    searchTerm={this.state.searchTerm}
                    title="Freeform Notes"
                    parentID="mainAccordion"
                >
                    <Notes />
                </CardTemplate>
                <CardTemplate
                    id="weightConversion"
                    keywords="weight mass grams ounces oz pounds lbs milligrams mg stone st kilograms kilos kg"
                    searchTerm={this.state.searchTerm}
                    title="Weight Conversion"
                    parentID="mainAccordion"
                >
                    <GeneralCalculatorTemplate
                        labelSuffix="Weight"
                        conversionFactors={ConversionFactors.weight}
                    />
                </CardTemplate>
                <CardTemplate
                    id="ecVConversion"
                    keywords="conductivity tds ppm tds"
                    searchTerm={this.state.searchTerm}
                    title="EC/TDS Conversion"
                    parentID="mainAccordion"
                >
                    <GeneralCalculatorTemplate
                        labelSuffix="Conductivity"
                        conversionFactors={ConversionFactors.conductivity}
                    />
                </CardTemplate>
                <CardTemplate
                    id="temperatureConversion"
                    keywords="temperature heat celsius centigrade farenheit kelvin"
                    searchTerm={this.state.searchTerm}
                    title="Temperature Conversion"
                    parentID="mainAccordion"
                >
                    <GeneralCalculatorTemplate
                        labelSuffix="Temperature"
                        conversionFactors={ConversionFactors.temperature}
                        negative
                        hideSplitter
                    />
                </CardTemplate>
                <CardTemplate
                    id="distanceConversion"
                    keywords="distance length height width meters millimeters mm centimeters cm kilometers km inches feet ft yards yd miles"
                    searchTerm={this.state.searchTerm}
                    title="Distance Conversion"
                    parentID="mainAccordion"
                >
                    <GeneralCalculatorTemplate
                        labelSuffix="Distance"
                        conversionFactors={ConversionFactors.distance}
                    />
                </CardTemplate>
                <CardTemplate
                    id="speedConversion"
                    keywords="speed velocity pace meters miles feet ft per second hour mph kph m/s"
                    searchTerm={this.state.searchTerm}
                    title="Speed Conversion"
                    parentID="mainAccordion"
                >
                    <GeneralCalculatorTemplate
                        labelSuffix="Speed"
                        conversionFactors={ConversionFactors.speed}
                        hideSplitter
                    />
                </CardTemplate>
                <CardTemplate
                    id="timeConversion"
                    keywords="time hours hrs minutes mins seconds secs days weeks wks months"
                    searchTerm={this.state.searchTerm}
                    title="Time Conversion"
                    parentID="mainAccordion"
                >
                    <GeneralCalculatorTemplate
                        labelSuffix="Time"
                        conversionFactors={ConversionFactors.basicTime}
                        hideSplitter
                    />
                </CardTemplate>
                <CardTemplate
                    id="dateCalculator"
                    keywords="add subtract datetime years yrs hours hrs minutes mins seconds secs days weeks wks months"
                    searchTerm={this.state.searchTerm}
                    title="Add/Subtract to Date/Time"
                    parentID="mainAccordion"
                >
                    <DateCalculator />
                </CardTemplate>
                <CardTemplate
                    id="areaConversion"
                    keywords="area squared sqft ^2 kilometers km^2 m^2 millimeters mm^2 centimeters cm^2 inches in^2 feet ft^2 yards yd^2 miles mi^2 hectares acres"
                    searchTerm={this.state.searchTerm}
                    title="Area Conversion"
                    parentID="mainAccordion"
                >
                    <GeneralCalculatorTemplate
                        labelSuffix="Area"
                        conversionFactors={ConversionFactors.area}
                    />
                </CardTemplate>
                <CardTemplate
                    id="volumeConversion"
                    keywords="volume amount cubic ^3 meters m^3 cc centimeters cm^2 cups fluid ounces fl oz floz feet ft^3 gallons in^3 inches kilometers km^3 liters milliliters ml miles mi^3 millimeters mm^3 pints quarts qts tablespoons tbsp teaspoons tsp yards yd^3"
                    searchTerm={this.state.searchTerm}
                    title="Volume Conversion"
                    parentID="mainAccordion"
                >
                    <GeneralCalculatorTemplate
                        labelSuffix="Volume"
                        conversionFactors={ConversionFactors.volume}
                    />
                </CardTemplate>
                <CardTemplate
                    id="flowRateConversion"
                    keywords="flow rate speed volume cubic standard ^3 per minute second hour hr day centimeters cm minutes gallons gpm inches liters scfm scfh"
                    searchTerm={this.state.searchTerm}
                    title="Flow Rate Conversion"
                    parentID="mainAccordion"
                    hideSplitter="hideSplitter"
                >
                    <GeneralCalculatorTemplate
                        labelSuffix="Flow Rate"
                        conversionFactors={ConversionFactors.flowRate}
                        message="If your volume isn't already in cubic meters (m³), convert to cubic meters via the Volume converter, then enter it here to convert."
                    />
                </CardTemplate>
                <CardTemplate
                    id="linearProcess"
                    keywords="% percent linear process days hours minutes time solvent evaporation drying trimming"
                    searchTerm={this.state.searchTerm}
                    title="Trimming Time Prediction Calculator"
                    parentID="mainAccordion"
                >
                    <LinearProcess />
                </CardTemplate>
                <CardTemplate
                    id="percentChange"
                    keywords="% percent change after"
                    searchTerm={this.state.searchTerm}
                    title="Percent Change"
                    parentID="mainAccordion"
                >
                    <PercentChange />
                </CardTemplate>
                <CardTemplate
                    id="percentConstituent"
                    keywords="% percent additive terpense after"
                    searchTerm={this.state.searchTerm}
                    title="Max Percent Constituent (Terpene Addition)"
                    parentID="mainAccordion"
                >
                    <PercentConstituent />
                </CardTemplate>
                <CardTemplate
                    id="cylinderVolume"
                    keywords="cylinder fan exhaust ducting volume"
                    searchTerm={this.state.searchTerm}
                    title="Cylinder (Ducting) Volume"
                    parentID="mainAccordion"
                >
                    <CylinderCalculator />
                </CardTemplate>
                {this.isSearching() ? (
                    ""
                ) : (
                    <h2 className="group-header">
                        Cannabis Growing (Equipment &amp; Power Calculators)
                    </h2>
                )}
                <CardTemplate
                    id="lighting"
                    keywords="lighting lights led hid wattage power watts lumens"
                    searchTerm={this.state.searchTerm}
                    title="Light Wattage"
                    parentID="mainAccordion"
                >
                    <LightingCalculator />
                </CardTemplate>
                <CardTemplate
                    id="btus"
                    keywords="btus thermal energy power temperature"
                    searchTerm={this.state.searchTerm}
                    title="BTU/AC Unit Calculator"
                    parentID="mainAccordion"
                >
                    <BTUCalculator />
                </CardTemplate>
                <CardTemplate
                    id="co2FlowRate"
                    keywords="co2 fan carbon dioxide ppm scfh scfm regulator gas"
                    searchTerm={this.state.searchTerm}
                    title="CO₂ Flow Rate"
                    parentID="mainAccordion"
                >
                    <CO2Calculator />
                </CardTemplate>
                <CardTemplate
                    id="exhaustCFM"
                    keywords="fan air flow exchange exhaust scfm power"
                    searchTerm={this.state.searchTerm}
                    title="Exhaust CFM Calculator"
                    parentID="mainAccordion"
                >
                    <ExhaustCalculator />
                </CardTemplate>
                <CardTemplate
                    id="amperageCalculator"
                    keywords="lighting lights led hid kwh power cost hours amps amperage electricity volts voltage"
                    searchTerm={this.state.searchTerm}
                    title="Light kWh &amp; Cost"
                    parentID="mainAccordion"
                >
                    <AmperageCalculator />
                </CardTemplate>
                <CardTemplate
                    id="waterCalculator"
                    keywords="water usage cost gallon gal cubic foot unit"
                    searchTerm={this.state.searchTerm}
                    title="Water Usage/Drip Tip Flow &amp; Cost"
                    parentID="mainAccordion"
                >
                    <WaterCalculator />
                </CardTemplate>
                {this.isSearching() ? (
                    ""
                ) : (
                    <h2 className="group-header">
                        Cannabis Growing (Consumables &amp; Nutrient Calculators)
                    </h2>
                )}
                <CardTemplate
                    id="growthTimeline"
                    keywords="growing growth calculator timeline planning years yrs months days projection projected"
                    searchTerm={this.state.searchTerm}
                    title="Projected Growth Timeline/Calendar"
                    parentID="mainAccordion"
                >
                    <GrowthTimeline />
                </CardTemplate>
                <CardTemplate
                    id="plantCountCalculator"
                    keywords="growing layout grid space sqft square footage feet width length size"
                    searchTerm={this.state.searchTerm}
                    title="Plant Layout"
                    parentID="mainAccordion"
                >
                    <PlantCount />
                </CardTemplate>
                <CardTemplate
                    id="soilCalculator"
                    keywords="soil dirt loam peat worm casings bat guano bone meal kelp dirt potting"
                    searchTerm={this.state.searchTerm}
                    title="Soil Proportions"
                    parentID="mainAccordion"
                >
                    <SoilCalculator />
                </CardTemplate>
                <CardTemplate
                    id="phCalculator"
                    keywords="ph acid base buffer"
                    searchTerm={this.state.searchTerm}
                    title="pH/Water Adjustment"
                    parentID="mainAccordion"
                >
                    <PHCalculator />
                </CardTemplate>
                <CardTemplate
                    id="NPKtoTDS"
                    keywords="npk tds ppm potassium nitrogen phosphorus specific gravity"
                    searchTerm={this.state.searchTerm}
                    title="NPK to PPM TDS"
                    parentID="mainAccordion"
                >
                    <NpkToTDS />
                </CardTemplate>
                <CardTemplate
                    id="TDStoNPK"
                    keywords="npk tds ppm potassium nitrogen phosphorus specific gravity"
                    searchTerm={this.state.searchTerm}
                    title="PPM TDS to NPM"
                    parentID="mainAccordion"
                >
                    <TDStoNPK />
                </CardTemplate>
                <CardTemplate
                    id="TDSDilution"
                    keywords="tds dilution water ppm"
                    searchTerm={this.state.searchTerm}
                    title="Dilution to TDS Target"
                    parentID="mainAccordion"
                >
                    <TDSDilution />
                </CardTemplate>
                <CardTemplate
                    id="yieldCalculator"
                    keywords="yield plants ounces oz grams pounds lbs harvest projection projected"
                    searchTerm={this.state.searchTerm}
                    title="General Crop Yield"
                    parentID="mainAccordion"
                >
                    <YieldCalculator />
                </CardTemplate>
                <CardTemplate
                    id="yieldDryWetCalculator"
                    keywords="yield plants ounces oz grams pounds lbs harvest drying wet cure curing projection projected"
                    searchTerm={this.state.searchTerm}
                    title="Dry/Wet Yield"
                    parentID="mainAccordion"
                >
                    <YieldDryWetCalculator />
                </CardTemplate>
                {this.isSearching() ? (
                    ""
                ) : (
                    <h2 className="group-header">Edible Calculators & Cannabis Concentrate Help</h2>
                )}
                <CardTemplate
                    id="ediblePotency"
                    keywords="thc potency mg milligrams grams ml ejuice vape vaporizer liquid wax oil concentrate extract baking cannaoil cannabutter servings size medibles"
                    searchTerm={this.state.searchTerm}
                    title="Edible Potency"
                    parentID="mainAccordion"
                >
                    <p>
                        Note that these calculators do not consider THCa to THC weight loss; to
                        correct for this, use our Decarboxylation Loss calculator to adjust Product
                        Weight or multiply your potency by .877. This assumes perfect yield (e.g.
                        all THC is removed from plant material) and is therefore most accurate for
                        oils baked into the goods.
                    </p>
                    <hr />
                    <VariableServingPotency />
                    <hr />
                    <EdiblePotency />
                    <hr />
                    <EdibleProduct />
                    <hr />
                    <EdibleServings />
                </CardTemplate>
                <CardTemplate
                    id="potency"
                    keywords="medibles thc potency mg milligrams grams ml ejuice vape vaporizer liquid wax oil concentrate extract baking cannaoil cannabutter"
                    searchTerm={this.state.searchTerm}
                    title="THC/Potency Conversions"
                    parentID="mainAccordion"
                >
                    <p>
                        Choose the appropriate calculator section for your units. mg and g are used
                        as standard analyte units; if your starting values are in a different unit,
                        use our Weight Conversion calculator.
                    </p>
                    <hr />
                    <PercentageToMG />
                    <hr />
                    <MGToPercentage />
                    <hr />
                    <Density />
                    <hr />
                    <FreeWeight />
                </CardTemplate>
                <CardTemplate
                    id="decarbLoss"
                    keywords="decarboxylation thca"
                    searchTerm={this.state.searchTerm}
                    title="Decarboxylation Loss"
                    parentID="mainAccordion"
                >
                    <DecarbLoss />
                </CardTemplate>
                <CardTemplate
                    id="decarbLoss"
                    keywords="decarboxylation thca time temperature"
                    searchTerm={this.state.searchTerm}
                    title="Decarboxylation Curve Prediction"
                    parentID="mainAccordion"
                >
                    <DecarbCurve />
                </CardTemplate>
                <CardTemplate
                    id="extractionEfficiency"
                    keywords="extract concentrate wax oil shatter bho efficiency feedstock"
                    searchTerm={this.state.searchTerm}
                    title="Extraction Efficiency"
                    parentID="mainAccordion"
                >
                    <ExtractionEfficiency />
                </CardTemplate>
                <CardTemplate
                    id="evapPrediction"
                    keywords="solvent evaporation concentrate extract wax oil shatter bho"
                    searchTerm={this.state.searchTerm}
                    title="Solvent Evaporation Time Estimate"
                    parentID="mainAccordion"
                >
                    <EvapPrediction />
                </CardTemplate>
                <CardTemplate
                    id="capsuleCalculator"
                    keywords="capsule coconut oil filler thca cbda extract cartridge"
                    searchTerm={this.state.searchTerm}
                    title="Concentrate to Capsule THC Breakdown"
                    parentID="mainAccordion"
                >
                    <CapsuleCalculator />
                </CardTemplate>
                {!this.isSearching() ? (
                    ""
                ) : (
                    <h2 className="text-center">
                        <br />
                        <br />End of Results
                    </h2>
                )}
            </div>
        );
    }
}
