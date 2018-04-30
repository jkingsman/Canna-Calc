import React from 'react';

import {FixedUnitInput, FixedUnitOutput} from 'app/calculators/components/io';
import {defaultRound} from 'app/utils/math';

export class PercentageToMG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 19,
        };
    }

    getMG() {
        return this.state.percent * 10;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel="Percentage THC" onChange={(val) => this.setState({percent: Number(val)})} number={this.state.percent} unit="%"/>
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
        };
    }

    getPercentage() {
        return this.state.mg / 10;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel="mg THC/gram" onChange={(val) => this.setState({mg: Number(val)})} number={this.state.mg} unit="mg/g"/>
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
        };
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
                        <FixedUnitInput inputLabel="Product Volume" onChange={(val) => this.setState({totalVolume: Number(val)})} number={this.state.totalVolume} unit="mL"/>
                        <FixedUnitInput inputLabel="Product Density" onChange={(val) => this.setState({density: Number(val)})} number={this.state.density} unit="g/mL"/>
                        <FixedUnitInput inputLabel="Total THC" onChange={(val) => this.setState({totalTHC: Number(val)})} number={this.state.totalTHC} unit="mg"/>
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
        };
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
                        <FixedUnitInput inputLabel="Product Weight" onChange={(val) => this.setState({totalWeight: Number(val)})} number={this.state.totalWeight} unit="g"/>
                        <FixedUnitInput inputLabel="Total THC" onChange={(val) => this.setState({totalTHC: Number(val)})} number={this.state.totalTHC} unit="mg"/>
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
