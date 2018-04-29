import React from 'react';

import {FixedUnitInput, FixedUnitOutput} from 'app/calculators/components/io';
import {defaultRound, round} from 'app/utils/math';

export default class AmperageCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watts: 700,
            voltage: 120,
            kWhCost: 0.12,
            hoursOnPerDay: 12,
            plantCount: 1
        }

        this.setWatts = this.setWatts.bind(this);
        this.setVoltage = this.setVoltage.bind(this);
        this.setKWhCost = this.setKWhCost.bind(this);
        this.setHoursOnPerDay = this.setHoursOnPerDay.bind(this);
        this.setPlantCount = this.setPlantCount.bind(this);
    }

    setWatts(watts) {
        this.setState({watts: Number(watts)});
    }

    setVoltage(voltage) {
        this.setState({voltage: Number(voltage)});
    }

    setKWhCost(kWhCost) {
        this.setState({kWhCost: Number(kWhCost)});
    }

    setHoursOnPerDay(hoursOnPerDay) {
        this.setState({hoursOnPerDay: Number(hoursOnPerDay)});
    }

    setPlantCount(plantCount) {
        this.setState({plantCount: Number(plantCount)});
    }

    getAmps() {
        return this.state.watts / this.state.voltage;
    }

    getKWhPerDay() {
        return ((this.state.watts * this.state.hoursOnPerDay) * this.state.plantCount) / 1000;
    }

    getCostPerDay() {
        return round((this.getKWhPerDay() * this.state.kWhCost), 2);
    }

    render() {
        return (
            <div className="container">
                <p>
                    <strong>
                        Important note:{' '}
                    </strong>
                    the wattage referred to here is not the light output wattage (i.e. how bright the lights are). This is wattage in the true sense of power consumed by the lights. This information can usually be found in the datasheet for your lights. If no wattage is found, you can calculate it by multiplying the amperage the lights consume by the voltage (usually 120 in the US). For example, a light consuming 5 amps of power would consume 600 watts (5 amps * 120 volts).</p>
                <p>Month assumes 31 days.</p>
                <hr/>
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel="Total Light Wattage" onChange={this.setWatts} number={this.state.watts} unit="watts"/>
                        <FixedUnitInput inputLabel="Voltage" onChange={this.setVoltage} number={this.state.voltage} unit="volts"/>
                        <FixedUnitInput inputLabel="Dollar Cost per kWh" onChange={this.setKWhCost} number={this.state.kWhCost} unit="dollars"/>
                        <FixedUnitInput inputLabel="Hours On per Day" onChange={this.setHoursOnPerDay} number={this.state.hoursOnPerDay} unit="hours"/>
                        <hr/>
                        <i>Leave Plant Count set to 1 to input Total Light Wattage for all lights used; if Plant Count is set to greater than 1, Total Light Wattage is assumed to be per-plant (kWh and cost will by multiplied by Plant Count).</i>
                        <br/><br/>
                        <FixedUnitInput inputLabel="Plant Count" onChange={this.setPlantCount} number={this.state.plantCount} unit="plants"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Total Amperage" number={defaultRound(this.getAmps())} unit="amps"/>
                        <FixedUnitOutput outputLabel="Power per Day" number={defaultRound(this.getKWhPerDay())} unit="kWh/day"/>
                        <FixedUnitOutput outputLabel="Cost/Day" number={defaultRound(this.getKWhPerDay())} unit="" prefix="$"/>
                        <FixedUnitOutput outputLabel="Power per Month" number={defaultRound(this.getKWhPerDay() * 31)} unit="kWh/mo"/>
                        <FixedUnitOutput outputLabel="Cost/Month" number={defaultRound(this.getCostPerDay() * 31)} unit="" prefix="$"/>
                    </div>
                </div>
            </div>
        );
    }
}
