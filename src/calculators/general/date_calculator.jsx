import React from 'react';

import {FreeInput, FreeOutput} from 'app/calculators/components/io';
import dayjs from 'dayjs';

export default class DateCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDateStr: dayjs().format('YYYY-MM-DD'),
            startTimeStr: dayjs().format('HH:MM:ss'),
            action: "add",
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    isDateValid() {
        const components = this.state.startDateStr.split("-");

        if (components.length !== 3) {
            return '❌';
        }

        if (components.some((component) => isNaN(component))) {
            return '❌';
        }

        if (components[0].length != 4 || components[1].length != 2 || components[2].length != 2) {
            return '❌';
        }

        if (!dayjs(this.state.startDateStr).isValid()) {
            return '❌';
        }

        return '✅';
    }

    isTimeValid() {
        const components = this.state.startTimeStr.split(":");

        if (components.length !== 3) {
            return '❌';
        }

        if (components.some((component) => isNaN(component) || component.length !== 2)) {
            return '❌';
        }

        if (Number(components[0]) >= 24 || Number(components[1]) >= 60 || Number(components[2]) >= 60) {
            return '❌';
        }

        return '✅';
    }

    getFinalDateISO() {
        const original = dayjs(this.state.startDateStr + 'T' + this.state.startTimeStr + 'Z');
        let adjusted;

        if(this.state.action === 'add'){
            adjusted = original.add(this.state.years, 'year').add(this.state.months, 'month').add(this.state.days, 'day').add(this.state.hours, 'hour').add(this.state.minutes, 'minute').add(this.state.seconds, 'second');
        } else {
            adjusted = original.subtract(this.state.years, 'year').subtract(this.state.months, 'month').subtract(this.state.days, 'day').subtract(this.state.hours, 'hour').subtract(this.state.minutes, 'minute').subtract(this.state.seconds, 'second');
        }

        return adjusted.toISOString();
    }

    getFinalDate() {
        try {
            return this.getFinalDateISO().split('T')[0];
        } catch (e) {
            return "Invalid input";
        }
    }

    getFinalTime() {
        try {
            return this.getFinalDateISO().split('T')[1].substr(0, 8);
        } catch (e) {
            return "Invalid input";
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FreeInput inputLabel="Start Date (YYYY-MM-DD)" onChange={(val) => this.setState({radius: val})} val={this.state.startDateStr} unit={this.isDateValid()}/>
                        <FreeInput inputLabel="Start Time (HH:MM:SS)" onChange={(val) => this.setState({radius: val})} val={this.state.startTimeStr} unit={this.isTimeValid()}/>
                        <div className="form-group">
                            <input type="radio" id="addRadio" name="addSubRadioGroup" value="add" checked={this.state.action === 'add'} onChange={() => this.setState({action: 'add'})}/>
                            <label htmlFor="addRadio">Add</label><br/>
                            <input type="radio" id="subRadio" name="addSubRadioGroup" value="sub" checked={this.state.action === 'sub'} onChange={() => this.setState({action: 'sub'})}/>
                            <label htmlFor="subRadio">Subtract</label>
                        </div>

                        <FreeInput inputLabel="Years" onChange={(val) => this.setState({years: Number(val)})} val={this.state.years}/>
                        <FreeInput inputLabel="Months" onChange={(val) => this.setState({months: Number(val)})} val={this.state.months}/>
                        <FreeInput inputLabel="Days" onChange={(val) => this.setState({days: Number(val)})} val={this.state.days}/>
                        <FreeInput inputLabel="Hours" onChange={(val) => this.setState({hours: Number(val)})} val={this.state.hours}/>
                        <FreeInput inputLabel="Minutes" onChange={(val) => this.setState({minutes: Number(val)})} val={this.state.minutes}/>
                        <FreeInput inputLabel="Seconds" onChange={(val) => this.setState({seconds: Number(val)})} val={this.state.seconds}/>
                    </div>
                    <div className="col-sm">
                        <FreeOutput outputLabel="Adjusted Date" val={this.getFinalDate()}/>
                        <FreeOutput outputLabel="Adjusted Time" val={this.getFinalTime()}/>
                    </div>
                </div>
            </div>
        );
    }
}
