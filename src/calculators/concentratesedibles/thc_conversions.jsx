import React from 'react';

import {FixedUnitInput, FixedUnitOutput} from 'app/calculators/components/io';
import {defaultRound} from 'app/utils/math';

export class PercentageToMG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 19,
        }

        this.setPercent = this.setPercent.bind(this);
    }

    setPercent(percent) {
        this.setState({percent: Number(percent)});
    }

    getMG() {
        return this.state.percent * 10;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel="Percentage THC" onChange={this.setPercent} number={this.state.percent} unit="%"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="mg THC per Gram" number={defaultRound(this.getMG())} unit="mg/g"/>
                    </div>
                </div>
            </div>
        );
    }
}

export class MGToPercentage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mg: 19,
        }

        this.setMG = this.setMG.bind(this);
    }

    setMG(mg) {
        this.setState({mg: Number(mg)});
    }

    getPercentage() {
        return this.state.mg / 10;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel="mg THC/gram" onChange={this.setMG} number={this.state.percent} unit="mg/g"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="PercentageTHC" number={defaultRound(this.getPercentage())} unit="%"/>
                    </div>
                </div>
            </div>
        );
    }
}


export class Density extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalVolume: 10,
            totalTHC: 2500,
            density: 1.04,
        }

        this.setTotalVolume = this.setTotalVolume.bind(this);
        this.setTotalTHC = this.setTotalTHC.bind(this);
        this.setDensity = this.setDensity.bind(this);
    }

    setTotalVolume(totalVolume) {
        this.setState({totalVolume: Number(totalVolume)});
    }

    setTotalTHC(totalTHC) {
        this.setState({totalTHC: Number(totalTHC)});
    }

    setDensity(density) {
        this.setState({density: Number(density)});
    }

    getMGperML() {
        return this.state.totalTHC / this.state.totalVolume;
    }

    getMGperG() {
        return this.getMGperML() / this.state.density;
    }

    getPercentage() {
        return this.getMGperG() / 10;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel="Product Volume" onChange={this.setTotalVolume} number={this.state.totalVolume} unit="mL"/>
                        <FixedUnitInput inputLabel="Product Density" onChange={this.setDensity} number={this.state.density} unit="g/mL"/>
                        <FixedUnitInput inputLabel="Total THC" onChange={this.setTotalTHC} number={this.state.totalTHC} unit="mg"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="mg/mL THC" number={defaultRound(this.getMGperML())} unit="mg/mL"/>
                        <FixedUnitOutput outputLabel="mg/g THC" number={defaultRound(this.getMGperG())} unit="mg/g"/>
                        <FixedUnitOutput outputLabel="THC Percentage" number={defaultRound(this.getPercentage())} unit="%"/>
                    </div>
                </div>
            </div>
        );
    }
}

export class FreeWeight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalWeight: 1.2,
            totalTHC: 256
        }

        this.setTotalWeight = this.setTotalWeight.bind(this);
        this.setTotalTHC = this.setTotalTHC.bind(this);
    }

    setTotalWeight(totalWeight) {
        this.setState({totalWeight: Number(totalWeight)});
    }

    setTotalTHC(totalTHC) {
        this.setState({totalTHC: Number(totalTHC)});
    }

    getMG() {
        return this.state.totalTHC / this.state.totalWeight;
    }

    getPercentage() {
        return this.getMG() / 10;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel="Product Weight" onChange={this.setTotalWeight} number={this.state.totalWeight} unit="g"/>
                        <FixedUnitInput inputLabel="Total THC" onChange={this.setTotalTHC} number={this.state.totalTHC} unit="mg"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="mg THC per Gram" number={defaultRound(this.getMG())} unit="mg/g"/>
                        <FixedUnitOutput outputLabel="THC Percentage" number={defaultRound(this.getPercentage())} unit="%"/>
                    </div>
                </div>
            </div>
        );
    }
}
