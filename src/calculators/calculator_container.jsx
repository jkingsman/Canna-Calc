import React from 'react';

import CardTemplate from 'app/calculators/components/card_template';
import GeneralCalculatorTemplate from 'app/calculators/general/general_calculator_template';

import PercentChange from 'app/calculators/general/percentchange_calculator';
import CylinderCalculator from 'app/calculators/general/cylinder_calculator';
import DateCalculator from 'app/calculators/general/date_calculator';
import ConversionFactors from 'app/utils/conversion_factors';

import GrowthTimeline from 'app/calculators/growing/growth_timeline.jsx';
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
import {EdiblePotency, EdibleProduct, EdibleServings, VariableServingPotency} from 'app/calculators/concentratesedibles/edible_calculators';

export default class CalculatorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }

        this.setSearchTerm = this.setSearchTerm.bind(this);
    }

    isSearching() {
        return this.state.searchTerm.length > 0;
    }

    setSearchTerm(ev) {
        this.setState({searchTerm: ev.target.value});
    }

    render() {
        return (
            <div id="mainAccordion">
                <input aria-label="search for calculators" value={this.state.searchTerm} onChange={this.setSearchTerm} placeholder="Enter a keyword or term to search for a calculator..." id="searchBar"/> {this.isSearching()
                    ? ""
                    : <h5>General Conversions & Math</h5>}

                <CardTemplate id="weightConversion" keywords="weight mass grams ounces oz pounds lbs milligrams mg stone st kilograms kilos kg" searchTerm={this.state.searchTerm} title="Weight Conversion" parentID="mainAccordion">
                    <GeneralCalculatorTemplate labelSuffix="Weight" conversionFactors={ConversionFactors.weight}/>
                </CardTemplate>

                <CardTemplate id="temperatureConversion" keywords="temperature heat celsius centigrade farenheit kelvin" searchTerm={this.state.searchTerm} title="Temperature Conversion" parentID="mainAccordion">
                    <GeneralCalculatorTemplate labelSuffix="Temperature" conversionFactors={ConversionFactors.temperature} negative hideSplitter/>
                </CardTemplate>

                <CardTemplate id="distanceConversion" keywords="distance length height width meters millimeters mm centimeters cm kilometers km inches feet ft yards yd miles" searchTerm={this.state.searchTerm} title="Distance Conversion" parentID="mainAccordion">
                    <GeneralCalculatorTemplate labelSuffix="Distance" conversionFactors={ConversionFactors.distance}/>
                </CardTemplate>

                <CardTemplate id="speedConversion" keywords="speed velocity pace meters miles feet ft per second hour mph kph m/s" searchTerm={this.state.searchTerm} title="Speed Conversion" parentID="mainAccordion">
                    <GeneralCalculatorTemplate labelSuffix="Speed" conversionFactors={ConversionFactors.speed} hideSplitter/>
                </CardTemplate>

                <CardTemplate id="timeConversion" keywords="time hours hrs minutes mins seconds secs days weeks wks months" searchTerm={this.state.searchTerm} title="Time Conversion" parentID="mainAccordion">
                    <GeneralCalculatorTemplate labelSuffix="Time" conversionFactors={ConversionFactors.basicTime} hideSplitter/>
                </CardTemplate>

                <CardTemplate id="dateCalculator" keywords="add subtract datetime years yrs hours hrs minutes mins seconds secs days weeks wks months" searchTerm={this.state.searchTerm} title="Add/Subtract to Date/Time" parentID="mainAccordion">
                    <DateCalculator/>
                </CardTemplate>

                <CardTemplate id="areaConversion" keywords="area squared sqft ^2 kilometers km^2 m^2 millimeters mm^2 centimeters cm^2 inches in^2 feet ft^2 yards yd^2 miles mi^2 hectares acres" searchTerm={this.state.searchTerm} title="Area Conversion" parentID="mainAccordion">
                    <GeneralCalculatorTemplate labelSuffix="Area" conversionFactors={ConversionFactors.area}/>
                </CardTemplate>

                <CardTemplate id="volumeConversion" keywords="volume amount cubic ^3 meters m^3 cc centimeters cm^2 cups fluid ounces fl oz floz feet ft^3 gallons in^3 inches kilometers km^3 liters milliliters ml miles mi^3 millimeters mm^3 pints quarts qts tablespoons tbsp teaspoons tsp yards yd^3" searchTerm={this.state.searchTerm} title="Volume Conversion" parentID="mainAccordion">
                    <GeneralCalculatorTemplate labelSuffix="Volume" conversionFactors={ConversionFactors.volume}/>
                </CardTemplate>

                <CardTemplate id="flowRateConversion" keywords="flow rate speed volume cubic standard ^3 per minute second hour hr day centimeters cm minutes gallons gpm inches liters scfm scfh" searchTerm={this.state.searchTerm} title="Flow Rate Conversion" parentID="mainAccordion" hideSplitter>
                    <GeneralCalculatorTemplate labelSuffix="Flow Rate" conversionFactors={ConversionFactors.flowRate} message="If your volume isn't already in cubic meters (m³), convert to cubic meters via the Volume converter, then enter it here to convert."/>
                </CardTemplate>

                <CardTemplate id="percentChange" keywords="% percent change after" searchTerm={this.state.searchTerm} title="Percent Change" parentID="mainAccordion">
                    <PercentChange/>
                </CardTemplate>

                <CardTemplate id="cylinderVolume" keywords="cylinder fan exhaust ducting volume" searchTerm={this.state.searchTerm} title="Cylinder (Ducting) Volume" parentID="mainAccordion">
                    <CylinderCalculator/>
                </CardTemplate>

                {this.isSearching()
                    ? ""
                    : <h5 className="group-header">Growing &amp; Plant Production</h5>}

                <CardTemplate id="growthTimeline" keywords="growing growth calculator timeline planning years yrs months days projection projected" searchTerm={this.state.searchTerm} title="Projected Growth Timeline/Calendar" parentID="mainAccordion">
                    <GrowthTimeline/>
                </CardTemplate>

                <CardTemplate id="lighting" keywords="lighting lights led hid wattage power watts lumens" searchTerm={this.state.searchTerm} title="Light Wattage" parentID="mainAccordion">
                    <LightingCalculator/>
                </CardTemplate>

                <CardTemplate id="co2FlowRate" keywords="co2 fan carbon dioxide ppm scfh scfm regulator gas" searchTerm={this.state.searchTerm} title="CO₂ Flow Rate" parentID="mainAccordion">
                    <CO2Calculator/>
                </CardTemplate>

                <CardTemplate id="exhaustCFM" keywords="fan air flow exchange exhaust scfm power" searchTerm={this.state.searchTerm} title="Exhaust CFM Calculator" parentID="mainAccordion">
                    <ExhaustCalculator/>
                </CardTemplate>

                <CardTemplate id="amperageCalculator" keywords="lighting lights led hid kwh power cost hours amps amperage electricity volts voltage" searchTerm={this.state.searchTerm} title="Light kWh &amp; Cost" parentID="mainAccordion">
                    <AmperageCalculator/>
                </CardTemplate>

                <CardTemplate id="waterCalculator" keywords="water usage cost gallon gal cubic foot unit" searchTerm={this.state.searchTerm} title="Water Usage &amp; Cost" parentID="mainAccordion">
                    <WaterCalculator/>
                </CardTemplate>

                <CardTemplate id="yieldCalculator" keywords="yield plants ounces oz grams pounds lbs harvest projection projected" searchTerm={this.state.searchTerm} title="General Crop Yield" parentID="mainAccordion">
                    <YieldCalculator/>
                </CardTemplate>

                <CardTemplate id="yieldDryWetCalculator" keywords="yield plants ounces oz grams pounds lbs harvest drying wet cure curing projection projected" searchTerm={this.state.searchTerm} title="Dry/Wet Yield" parentID="mainAccordion">
                    <YieldDryWetCalculator/>
                </CardTemplate>

                <CardTemplate id="plantCountCalculator" keywords="growing layout grid space sqft square footage feet width length size" searchTerm={this.state.searchTerm} title="Plant Layout" parentID="mainAccordion">
                    <PlantCount/>
                </CardTemplate>

                {this.isSearching()
                    ? ""
                    : <h5 className="group-header">Edibles & Concentrates</h5>}

                <CardTemplate id="ediblePotency" keywords="thc potency mg milligrams grams ml ejuice vape vaporizer liquid wax oil concentrate extract baking cannaoil cannabutter servings size medibles" searchTerm={this.state.searchTerm} title="Edible Potency" parentID="mainAccordion">
                    <p>Note that these calculators do not take into account THCa to THC weight loss; to correct for this, use our Decarboxylation Loss calculator to adjust Product Weight or multiply your potency by .877. This assumes perfect yield (e.g. all THC is removed from plant material) and is therefore most accurate for oils baked into the goods.</p>
                    <hr/>
                    <VariableServingPotency/>
                    <hr/>
                    <EdiblePotency/>
                    <hr/>
                    <EdibleProduct/>
                    <hr/>
                    <EdibleServings/>
                </CardTemplate>

                <CardTemplate id="potency" keywords="medibles thc potency mg milligrams grams ml ejuice vape vaporizer liquid wax oil concentrate extract baking cannaoil cannabutter" searchTerm={this.state.searchTerm} title="THC/Potency Conversions" parentID="mainAccordion">
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

                <CardTemplate id="decarbLoss" keywords="decarboxylation thca" searchTerm={this.state.searchTerm} title="Decarboxylation Loss" parentID="mainAccordion">
                    <DecarbLoss/>
                </CardTemplate>

                <CardTemplate id="extractionEfficiency" keywords="extract concentrate wax oil shatter bho efficiency feedstock" searchTerm={this.state.searchTerm} title="Extraction Efficiency" parentID="mainAccordion">
                    <ExtractionEfficiency/>
                </CardTemplate>

                <CardTemplate id="evapPrediction" keywords="solvent evaporation concentrate extract wax oil shatter bho" searchTerm={this.state.searchTerm} title="Solvent Evaporation Time Estimate" parentID="mainAccordion">
                    <EvapPrediction/>
                </CardTemplate>

                {!this.isSearching()
                    ? ""
                    : <h5 className="text-center"><br/><br/>End of Results</h5>}
            </div>
        );
    }
}
