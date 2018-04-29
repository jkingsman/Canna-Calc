import React from 'react';

import {FixedUnitInput, GenericInput, FixedUnitOutput, GenericOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';
import {defaultRound} from 'app/utils/math';

export class EdiblePotency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productWeight: 1,
            productPotency: 25,
            servings: 25
        }

        this.setProductWeight = this.setProductWeight.bind(this);
        this.setProductPotency = this.setProductPotency.bind(this);
        this.setServings = this.setServings.bind(this);
    }

    setProductWeight(productWeight) {
        this.setState({productWeight: Number(productWeight)});
    }

    setProductPotency(productPotency) {
        this.setState({productPotency: Number(productPotency)});
    }

    setServings(servings) {
        this.setState({servings: Number(servings)});
    }

    getMGPerServing() {
        return (this.state.productWeight * (this.state.productPotency / 100) / this.state.servings) * 1000;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Product Amount" onChange={this.setProductWeight} conversionFactors={ConversionFactors.basicWeight} number={this.state.productWeight}/>
                        <FixedUnitInput inputLabel="Product Potency" onChange={this.setProductPotency} number={this.state.productPotency} unit="% THC"/>
                        <FixedUnitInput inputLabel="Servings" onChange={this.setServings} number={this.state.servings} unit="servings"/></div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="mg THC/serving" number={defaultRound(this.getMGPerServing())} unit="mg"/>
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
            mgPerServing: 10
        }

        this.setProductPotency = this.setProductPotency.bind(this);
        this.setServings = this.setServings.bind(this);
        this.setMGPerServing = this.setMGPerServing.bind(this);
    }

    setProductPotency(productPotency) {
        this.setState({productPotency: Number(productPotency)});
    }

    setMGPerServing(mgPerServing) {
        this.setState({mgPerServing: Number(mgPerServing)});
    }

    setServings(servings) {
        this.setState({servings: Number(servings)});
    }

    getTHCNeeded() {
        // returns grams
        return (this.state.servings * this.state.mgPerServing) / 1000;
    }

    getProductWeightNeeded() {
        return this.getTHCNeeded() / (this.state.productPotency / 100);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel="Product Potency" onChange={this.setProductPotency} number={this.state.productPotency} unit="% THC"/>
                        <FixedUnitInput inputLabel="mg THC/serving" onChange={this.setMGPerServing} number={this.state.mgPerServing} unit="mg"/>
                        <FixedUnitInput inputLabel="Servings" onChange={this.setServings} number={this.state.servings} unit="servings"/>
                    </div>
                    <div className="col-sm">
                        <GenericOutput outputLabel="Product Needed" number={defaultRound(this.getProductWeightNeeded())} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
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
            productWeight: 1,
            productPotency: 25,
            mgPerServing: 10
        }

        this.setProductWeight = this.setProductWeight.bind(this);
        this.setProductPotency = this.setProductPotency.bind(this);
        this.setMGPerServing = this.setMGPerServing.bind(this);
    }

    setProductWeight(productWeight) {
        this.setState({productWeight: Number(productWeight)});
    }

    setProductPotency(productPotency) {
        this.setState({productPotency: Number(productPotency)});
    }

    setMGPerServing(mgPerServing) {
        this.setState({mgPerServing: Number(mgPerServing)});
    }

    getServings() {
        return ((this.state.productWeight * (this.state.productPotency / 100)) * 1000) / this.state.mgPerServing;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Product Amount" onChange={this.setProductWeight} conversionFactors={ConversionFactors.basicWeight} number={this.state.productWeight}/>
                        <FixedUnitInput inputLabel="Product Potency" onChange={this.setProductPotency} number={this.state.productPotency} unit="% THC"/>
                        <FixedUnitInput inputLabel="mg THC/serving" onChange={this.setMGPerServing} number={this.state.mgPerServing} unit="mg"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Servings" number={defaultRound(this.getServings())} unit="servings"/>
                    </div>
                </div>
            </div>
        );
    }
}
