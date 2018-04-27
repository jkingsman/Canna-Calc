import React from 'react';

import {FixedUnitInput} from 'app/calculators/components/io';
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
                <p>Month assumes 31 days.</p>
                <hr/>
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel={'Water Rate per Plant'} onChange={this.setGphPerPlant} number={this.state.gphPerPlant} unit="gal/hr (GPH)"/>
                        <FixedUnitInput inputLabel={'Hours On per Day'} onChange={this.setHoursOnPerDay} number={this.state.hoursOnPerDay} unit="hours"/>
                        <FixedUnitInput inputLabel={'Plant Count'} onChange={this.setPlantCount} number={this.state.plantCount} unit="plants"/>
                        <FixedUnitInput inputLabel={'Water Cost'} onChange={this.setWaterCost} number={this.state.waterCost} unit="dollars per ft³"/>
                    </div>
                    <div className="col-sm">
                        <div className='form-group'>
                            <label htmlFor="waterPerDay" className="text-label">Water per Day:&nbsp;</label>
                            <input type='number' value={defaultRound(this.getGallonsPerDay())} disabled className='calc-input-width' id="waterPerDay"/>{' '}
                             gallons/day
                        </div>
                        <div className='form-group'>
                            <label htmlFor="costPerDay" className="text-label">Cost/Day:&nbsp;</label>
                            <input value={`$${this.getCostPerDay()}`} disabled className='calc-input-width' id="costPerDay"/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="waterPerMonth" className="text-label">Water per Day:&nbsp;</label>
                            <input type='number' value={defaultRound(this.getGallonsPerDay() * 31)} disabled className='calc-input-width' id="waterPerMonth"/>{' '}
                             gallons/mo
                        </div>
                        <div className='form-group'>
                            <label htmlFor="costPerMonth" className="text-label">Cost/Month:&nbsp;</label>
                            <input value={`$${this.getCostPerDay() * 31}`} disabled className='calc-input-width' id="costPerMonth"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
