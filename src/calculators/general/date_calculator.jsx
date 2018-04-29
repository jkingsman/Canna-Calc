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
            seconds: 0
        }

        this.setStartDateStr = this.setStartDateStr.bind(this);
        this.setStartTimeStr = this.setStartTimeStr.bind(this);
        this.setAction = this.setAction.bind(this);
        this.setYears = this.setYears.bind(this);
        this.setMonths = this.setMonths.bind(this);
        this.setDays = this.setDays.bind(this);
        this.setHours = this.setHours.bind(this);
        this.setMinutes = this.setMinutes.bind(this);
        this.setSeconds = this.setSeconds.bind(this);
        this.isDateValid = this.isDateValid.bind(this);
        this.isTimeValid = this.isTimeValid.bind(this);
    }

    setStartDateStr(startDateStr) {
        this.setState({startDateStr: startDateStr});
    }

    setStartTimeStr(startTimeStr) {
        this.setState({startTimeStr: startTimeStr});
    }

    setAction(str) {
        this.setState({action: str});
    }

    setYears(years) {
        this.setState({years: Number(years)});
    }

    setMonths(months) {
        this.setState({months: Number(months)});
    }

    setDays(days) {
        this.setState({days: Number(days)});
    }

    setHours(hours) {
        this.setState({hours: Number(hours)});
    }

    setMinutes(minutes) {
        this.setState({minutes: Number(minutes)});
    }

    setSeconds(seconds) {
        this.setState({seconds: Number(seconds)});
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
                        <FreeInput inputLabel="Start Date (YYYY-MM-DD)" onChange={this.setStartDateStr} val={this.state.startDateStr} units={this.isDateValid()}/>
                        <FreeInput inputLabel="Start Time (HH:MM:SS)" onChange={this.setStartTimeStr} val={this.state.startTimeStr} units={this.isTimeValid()}/>
                        <div className="form-group">
                            <input type="radio" id="addRadio" name="addSubRadioGroup" value="add" checked={this.state.action === 'add'} onChange={() => this.setAction('add')}/>
                            <label htmlFor="addRadio">Add</label><br/>
                            <input type="radio" id="subRadio" name="addSubRadioGroup" value="sub" checked={this.state.action === 'sub'} onChange={() => this.setAction('sub')}/>
                            <label htmlFor="subRadio">Subtract</label>
                        </div>

                        <FreeInput inputLabel="Years" onChange={this.setYears} val={this.state.years}/>
                        <FreeInput inputLabel="Months" onChange={this.setMonths} val={this.state.months}/>
                        <FreeInput inputLabel="Days" onChange={this.setDays} val={this.state.days}/>
                        <FreeInput inputLabel="Hours" onChange={this.setHours} val={this.state.hours}/>
                        <FreeInput inputLabel="Minutes" onChange={this.setMinutes} val={this.state.minutes}/>
                        <FreeInput inputLabel="Seconds" onChange={this.setSeconds} val={this.state.seconds}/>
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
