import React from "react";

import {
    FixedUnitInput,
    GenericInput,
    FixedUnitOutput,
    GenericOutput,
    EquationBlock,
    Checkbox,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export class VariableServingPotencyVolume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productWeight: 10,
            productPotency: 25,
            infuserVolume: 10,
            bakedGoodOil: 1,
            bakedGoodServings: 12,
            decarbCorrection: true,
        };
    }

    decarbLoss() {
        if (this.state.decarbCorrection) {
            return 314.45 / 358.4733;
        }

        return 1;
    }

    getTotalTHC() {
        return (
            this.state.productWeight * (this.state.productPotency / 100) * 1000 * this.decarbLoss()
        );
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
                <h5>Complete Recipe (Flowers, Volume)</h5>
                <p>
                    Determine serving and potency breakdown of an oil or butter prepared
                    specifically for a recipe assuming 100% THC extraction.
                </p>
                <EquationBlock
                    equations={[
                        "Oil Total THC = Product Amount * Potency",
                        "Oil THC per tbsp = Oil Total THC / Oil Infused",
                        "Baked Good Total THC = Oil THC per tbsp * Baked Good Oil Amt. (in tbsp.)",
                        "THC per Serving = Baked Good Total THC / Servings",
                    ]}
                />
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
                        <Checkbox
                            label="Correct for decarboxylation losses"
                            onChange={val =>
                                this.setState({
                                    decarbCorrection: val,
                                })
                            }
                            checked
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

export class VariableServingPotencyWeight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productWeight: 10,
            productPotency: 25,
            infuserWeight: 100,
            bakedGoodOil: 25,
            bakedGoodServings: 12,
            decarbCorrection: true,
        };
    }

    decarbLoss() {
        if (this.state.decarbCorrection) {
            return 314.45 / 358.4733;
        }

        return 1;
    }

    getTotalTHC() {
        return (
            this.state.productWeight * (this.state.productPotency / 100) * 1000 * this.decarbLoss()
        );
    }

    getTHCperG() {
        return this.getTotalTHC() / this.state.infuserWeight;
    }

    getTHCinBakedGood() {
        return this.getTHCperG() * this.state.bakedGoodOil;
    }

    getTHCperServing() {
        return this.getTHCinBakedGood() / this.state.bakedGoodServings;
    }

    render() {
        return (
            <div className="container">
                <h5>Complete Recipe (Flowers, Weight)</h5>
                <p>
                    Determine serving and potency breakdown of an oil or butter prepared
                    specifically for a recipe assuming 100% THC extraction.
                </p>
                <EquationBlock
                    equations={[
                        "Oil Total THC = Product Amount * Potency",
                        "Oil THC per g = Oil Total THC / Oil Infused",
                        "Baked Good Total THC = Oil THC per g * Baked Good Oil Amt. (in tbsp.)",
                        "THC per Serving = Baked Good Total THC / Servings",
                    ]}
                />
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
                        <GenericInput
                            inputLabel="Oil/Butter Infused"
                            onChange={val => this.setState({ infuserWeight: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
                            number={this.state.infuserWeight}
                        />
                        <GenericInput
                            inputLabel="Baked Good Oil Amt."
                            onChange={val => this.setState({ bakedGoodOil: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
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
                        <Checkbox
                            label="Correct for decarboxylation losses"
                            onChange={val =>
                                this.setState({
                                    decarbCorrection: val,
                                })
                            }
                            checked
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Oil/Butter Total THC"
                            number={defaultRound(this.getTotalTHC())}
                            unit="mg"
                        />
                        <FixedUnitOutput
                            outputLabel="Oil/Butter THC/gram"
                            number={defaultRound(this.getTHCperG())}
                            unit="mg/g"
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

export class VariableServingPotencyVolumeButter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            potencyPerCup: 1000,
            bakedGoodOil: 1,
            bakedGoodServings: 12,
        };
    }

    getTHCinBakedGood() {
        return this.state.potencyPerCup * this.state.bakedGoodOil;
    }

    getTHCperServing() {
        return this.getTHCinBakedGood() / this.state.bakedGoodServings;
    }

    render() {
        return (
            <div className="container">
                <h5>Complete Recipe (Oil/Butter, Volume)</h5>
                <p>
                    Determine serving and potency breakdown of an edible made with a known medicated
                    oil/butter.
                </p>
                <EquationBlock
                    equations={[
                        "Baked Good Total THC = Oil THC per amount * Baked Good Oil Amt.",
                        "THC per Serving = Baked Good Total THC / Servings",
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Oil/Butter Potency"
                            onChange={val => this.setState({ potencyPerCup: Number(val) })}
                            number={this.state.potencyPerCup}
                            unit="mg/cup"
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
            decarbCorrection: true,
        };
    }

    decarbLoss() {
        if (this.state.decarbCorrection) {
            return 314.45 / 358.4733;
        }

        return 1;
    }

    getMGPerServing() {
        return (
            this.state.productWeight *
            (this.state.productPotency / 100) /
            this.state.servings *
            1000 *
            this.decarbLoss()
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
                <EquationBlock
                    equations={["mg THC/serving = (Product Amount * Product Potency) / Servings"]}
                />
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
                        <Checkbox
                            label="Correct for decarboxylation losses"
                            onChange={val =>
                                this.setState({
                                    decarbCorrection: val,
                                })
                            }
                            checked
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
            decarbCorrection: true,
        };
    }

    decarbCorrection() {
        if (this.state.decarbCorrection) {
            return 358.4733 / 314.45;
        }

        return 1;
    }

    getTHCNeeded() {
        // returns grams
        return this.state.servings * this.state.mgPerServing / 1000 * this.decarbCorrection();
    }

    getProductWeightNeeded() {
        return this.getTHCNeeded() / (this.state.productPotency / 100);
    }

    render() {
        return (
            <div className="container">
                <h5>Product Amount</h5>
                <p>Determine needed product for given potency assuming 100% THC extraction.</p>
                <EquationBlock
                    equations={[
                        "THC Needed = Servings * mg Per Serving",
                        "Product Needed = THC Needed / Product Potency",
                    ]}
                />
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
                        <Checkbox
                            label="Correct for decarboxylation losses"
                            onChange={val =>
                                this.setState({
                                    decarbCorrection: val,
                                })
                            }
                            checked
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
            decarbCorrection: true,
        };
    }

    decarbLoss() {
        if (this.state.decarbCorrection) {
            return 314.45 / 358.4733;
        }

        return 1;
    }

    getServings() {
        return (
            this.state.productWeight *
            (this.state.productPotency / 100) *
            1000 *
            this.decarbLoss() /
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
                <EquationBlock
                    equations={["Servings = (Product Amount * Potency) / mg THC per Serving"]}
                />
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
                        <Checkbox
                            label="Correct for decarboxylation losses"
                            onChange={val =>
                                this.setState({
                                    decarbCorrection: val,
                                })
                            }
                            checked
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

export class OilButterPotency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productWeight: 10,
            productPotency: 25,
            infuserVolume: 10,
            bakedGoodOil: 1,
            bakedGoodServings: 12,
            decarbCorrection: true,
        };
    }

    decarbLoss() {
        if (this.state.decarbCorrection) {
            return 314.45 / 358.4733;
        }

        return 1;
    }

    getTotalTHC() {
        return (
            this.state.productWeight * (this.state.productPotency / 100) * 1000 * this.decarbLoss()
        );
    }

    getTHCperTblsp() {
        const infuserVolumeInTblsp = this.state.infuserVolume * 16;
        return this.getTotalTHC() / infuserVolumeInTblsp;
    }

    getTHCperTsp() {
        return this.getTHCperTblsp() / 3;
    }

    render() {
        return (
            <div className="container">
                <h5>Oil/Butter Potency</h5>
                <p>
                    Determine potency of an oil or butter prepared specifically for a recipe
                    assuming 100% THC extraction.
                </p>
                <EquationBlock
                    equations={[
                        "Oil Total THC = Product Amount * Potency",
                        "Oil THC per amt = Oil Total THC / Oil Infused",
                    ]}
                />
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
                        <GenericInput
                            inputLabel="Oil/Butter Infused"
                            onChange={val => this.setState({ infuserVolume: Number(val) })}
                            conversionFactors={ConversionFactors.cookingVolume}
                            number={this.state.infuserVolume}
                        />
                        <Checkbox
                            label="Correct for decarboxylation losses"
                            onChange={val =>
                                this.setState({
                                    decarbCorrection: val,
                                })
                            }
                            checked
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
                            outputLabel="Oil/Butter THC/tsp"
                            number={defaultRound(this.getTHCperTsp())}
                            unit="mg/tsp"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export class PartialOilButter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oilPotency: 65,
            totalOil: 25,
            servings: 20,
            finalPotency: 15,
        };
    }

    getMedicatedAmt() {
        return this.state.servings * this.state.finalPotency / this.state.oilPotency;
    }

    render() {
        return (
            <div className="container">
                <h5>Partial Oil/Butter Blend</h5>
                <p>
                    Determine the blend of medicated butter/oil with regular butter/oil for recipes
                    with a known desired dosage, but where using solely medicated butter/oil would
                    result in too potent of a dosage.
                </p>
                <EquationBlock
                    equations={[
                        "Medicated Oil Amount = Serving Count * Serving THC / Medicated Oil Potency",
                        "Regular Oil = Total Oil Needed - Medicated Oil Amount"
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Medicated Oil Potency"
                            onChange={val => this.setState({ oilPotency: Number(val) })}
                            number={this.state.oilPotency}
                            unit="mg THC/tbsp"
                        />
                        <FixedUnitInput
                            inputLabel="Recipe Oil Called For"
                            onChange={val => this.setState({ totalOil: Number(val) })}
                            number={this.state.totalOil}
                            unit="tbsp"
                        />
                        <FixedUnitInput
                            inputLabel="Desired Servings"
                            onChange={val => this.setState({ servings: Number(val) })}
                            number={this.state.servings}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Desired Potency"
                            onChange={val => this.setState({ finalPotency: Number(val) })}
                            number={this.state.finalPotency}
                            unit="mg/serving"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Medicated Oil Amount"
                            number={defaultRound(this.getMedicatedAmt())}
                            unit="tbsp"
                        />
                        <FixedUnitOutput
                            outputLabel="Regular Oil Amount"
                            number={defaultRound(
                                Math.max(this.state.totalOil - this.getMedicatedAmt(), 0)
                            )}
                            unit="tbsp"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
