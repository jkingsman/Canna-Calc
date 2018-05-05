import React from "react";

import {
    FixedUnitInput,
    GenericInput,
    FixedUnitOutput,
    GenericOutput,
    EquationBlock,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export class VariableServingPotency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productWeight: 10,
            productPotency: 25,
            infuserVolume: 10,
            bakedGoodOil: 1,
            bakedGoodServings: 12,
        };
    }

    getTotalTHC() {
        return this.state.productWeight * (this.state.productPotency / 100) * 1000;
    }

    getTHCperTblsp() {
        const infuserVolumeInTblsp = this.state.infuserVolume * 16;
        return this.getTotalTHC() / infuserVolumeInTblsp;
    }

    getTHCinBakedGood() {
        const thcPerCup = this.getTHCperTblsp() * 16;
        return thcPerCup * this.state.bakedGoodOil;
    }

    getTHCperServing() {
        return this.getTHCinBakedGood() / this.state.bakedGoodServings;
    }

    render() {
        return (
            <div className="container">
                <p>
                    Determine serving and potency breakdown of an oil or butter prepared
                    specifically for a recipe assuming 100% THC extraction.
                </p>
                <EquationBlock equations={[
                    "Oil/Butter Total THC = Product Amount * Potency",
                    "Oil/Butter THC/tbsp = Oil/Butter Total THC / Oil/Butter Infused",
                    "Baked Good Total THC = Oil/Butter THC/tbsp * Baked Good Oil Amt. (in tbsp.)",
                    "THC/Serving = Baked Good Total THC / Servings"
                ]} />
                <hr />
                <h5>Complete Recipe</h5>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Product Amount"
                            onChange={val => this.setState({ productWeight: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
                            number={this.state.productWeight}
                        />
                        <FixedUnitInput
                            inputLabel="Product Potency"
                            onChange={val => this.setState({ productPotency: Number(val) })}
                            number={this.state.productPotency}
                            unit="% THC"
                        />
                        <GenericInput
                            inputLabel="Oil/Butter Infused"
                            onChange={val => this.setState({ infuserVolume: Number(val) })}
                            conversionFactors={ConversionFactors.cookingVolume}
                            number={this.state.infuserVolume}
                        />
                        <GenericInput
                            inputLabel="Baked Good Oil Amt."
                            onChange={val => this.setState({ bakedGoodOil: Number(val) })}
                            conversionFactors={ConversionFactors.cookingVolume}
                            number={this.state.bakedGoodOil}
                        />
                        <FixedUnitInput
                            inputLabel="Baked Good Servings"
                            onChange={val =>
                                this.setState({
                                    bakedGoodServings: Number(val),
                                })
                            }
                            number={this.state.bakedGoodServings}
                            unit="servings"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Oil/Butter Total THC"
                            number={defaultRound(this.getTotalTHC())}
                            unit="mg"
                        />
                        <FixedUnitOutput
                            outputLabel="Oil/Butter THC/tbsp"
                            number={defaultRound(this.getTHCperTblsp())}
                            unit="mg/tbsp"
                        />
                        <FixedUnitOutput
                            outputLabel="Baked Good Total THC"
                            number={defaultRound(this.getTHCinBakedGood())}
                            unit="mg"
                        />
                        <FixedUnitOutput
                            outputLabel="THC/Serving"
                            number={defaultRound(this.getTHCperServing())}
                            unit="mg/serving"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export class EdiblePotency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productWeight: 10,
            productPotency: 25,
            servings: 25,
        };
    }

    getMGPerServing() {
        return (
            this.state.productWeight *
            (this.state.productPotency / 100) /
            this.state.servings *
            1000
        );
    }

    render() {
        return (
            <div className="container">
                <h5>mg/Serving</h5>
                <p>
                    Determine serving potency given product/potency used assuming 100% THC
                    extraction.
                </p>
                <EquationBlock equations={[
                    "mg THC/serving = (Product Amount * Product Potency) / Servings"
                ]} />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Product Amount"
                            onChange={val => this.setState({ productWeight: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
                            number={this.state.productWeight}
                        />
                        <FixedUnitInput
                            inputLabel="Product Potency"
                            onChange={val => this.setState({ productPotency: Number(val) })}
                            number={this.state.productPotency}
                            unit="% THC"
                        />
                        <FixedUnitInput
                            inputLabel="Servings"
                            onChange={val => this.setState({ servings: Number(val) })}
                            number={this.state.servings}
                            unit="servings"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="mg THC/serving"
                            number={defaultRound(this.getMGPerServing())}
                            unit="mg"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export class EdibleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productPotency: 25,
            servings: 25,
            mgPerServing: 10,
        };
    }

    getTHCNeeded() {
        // returns grams
        return this.state.servings * this.state.mgPerServing / 1000;
    }

    getProductWeightNeeded() {
        return this.getTHCNeeded() / (this.state.productPotency / 100);
    }

    render() {
        return (
            <div className="container">
                <h5>Product Amount</h5>
                <p>Determine needed product for given potency assuming 100% THC extraction.</p>
                <EquationBlock equations={[
                    "THC Needed = Servings * mg Per Serving",
                    "Product Needed = THC Needed / Product Potency"
                ]} />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Product Potency"
                            onChange={val => this.setState({ productPotency: Number(val) })}
                            number={this.state.productPotency}
                            unit="% THC"
                        />
                        <FixedUnitInput
                            inputLabel="mg THC/serving"
                            onChange={val => this.setState({ mgPerServing: Number(val) })}
                            number={this.state.mgPerServing}
                            unit="mg"
                        />
                        <FixedUnitInput
                            inputLabel="Servings"
                            onChange={val => this.setState({ servings: Number(val) })}
                            number={this.state.servings}
                            unit="servings"
                        />
                    </div>
                    <div className="col-sm">
                        <GenericOutput
                            outputLabel="Product Needed"
                            number={defaultRound(this.getProductWeightNeeded())}
                            conversionFactors={ConversionFactors.basicWeight}
                            showSplitter={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export class EdibleServings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productWeight: 10,
            productPotency: 25,
            mgPerServing: 100,
        };
    }

    getServings() {
        return (
            this.state.productWeight *
            (this.state.productPotency / 100) *
            1000 /
            this.state.mgPerServing
        );
    }

    render() {
        return (
            <div className="container">
                <h5>Serving Count</h5>
                <p>
                    Determine serving count given desired serving potency and product amount/potency
                    assuming 100% THC extraction.
                </p>
                <EquationBlock equations={[
                    "Servings = (Product Amount * Potency) / mg THC per Serving"
                ]} />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Product Amount"
                            onChange={val => this.setState({ productWeight: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
                            number={this.state.productWeight}
                        />
                        <FixedUnitInput
                            inputLabel="Product Potency"
                            onChange={val => this.setState({ productPotency: Number(val) })}
                            number={this.state.productPotency}
                            unit="% THC"
                        />
                        <FixedUnitInput
                            inputLabel="mg THC/serving"
                            onChange={val => this.setState({ mgPerServing: Number(val) })}
                            number={this.state.mgPerServing}
                            unit="mg"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Servings"
                            number={defaultRound(this.getServings())}
                            unit="servings"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
