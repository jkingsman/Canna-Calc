import React from 'react';

import {FixedUnitInput, FixedUnitOutput} from 'app/calculators/components/io';
import {defaultRound, round} from 'app/utils/math';

export default class WaterCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gphPerPlant: 2,
            hoursOnPerDay: 1,
            waterCost: 0.13,
            plantCount: 10
        }

        this.setGphPerPlant = this.setGphPerPlant.bind(this);
        this.setHoursOnPerDay = this.setHoursOnPerDay.bind(this);
        this.setWaterCost = this.setWaterCost.bind(this);
        this.setPlantCount = this.setPlantCount.bind(this);
    }

    setGphPerPlant(gphPerPlant) {
        this.setState({gphPerPlant: Number(gphPerPlant)});
    }

    setHoursOnPerDay(hoursOnPerDay) {
        this.setState({hoursOnPerDay: Number(hoursOnPerDay)});
    }

    setWaterCost(waterCost) {
        this.setState({waterCost: Number(waterCost)});
    }

    setPlantCount(plantCount) {
        this.setState({plantCount: Number(plantCount)});
    }

    getGallonsPerDay() {
        return this.state.gphPerPlant * this.state.hoursOnPerDay * this.state.plantCount;
    }

    getCubicFeetPerDay() {
        return this.getGallonsPerDay() * 0.133680556;
    }

    getCostPerDay() {
        return round(this.getCubicFeetPerDay() * this.state.waterCost, 2);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel={'Water Rate per Plant'} onChange={this.setGphPerPlant} number={this.state.gphPerPlant} unit="gal/hr (GPH)"/>
                        <FixedUnitInput inputLabel={'Hours On per Day'} onChange={this.setHoursOnPerDay} number={this.state.hoursOnPerDay} unit="hours"/>
                        <FixedUnitInput inputLabel={'Plant Count'} onChange={this.setPlantCount} number={this.state.plantCount} unit="plants"/>
                        <FixedUnitInput inputLabel={'Water Cost'} onChange={this.setWaterCost} number={this.state.waterCost} unit="dollars per ft³"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Water Used/Day" number={defaultRound(this.getGallonsPerDay())} unit="gal/day"/>
                        <FixedUnitOutput outputLabel="Cost/Day" prefix="$" number={this.getCostPerDay()}/>
                        <FixedUnitOutput outputLabel="Water Used/Month*" number={defaultRound(this.getGallonsPerDay() * 31)} unit="gal/mo"/>
                        <FixedUnitOutput outputLabel="Cost/Month*" prefix="$" number={this.getCostPerDay() * 31}/>
                        <i>*Month assumes 31 days</i>
                    </div>
                </div>
            </div>
        );
    }
}
