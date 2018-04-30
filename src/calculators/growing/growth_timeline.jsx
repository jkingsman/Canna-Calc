import React from 'react';

import {FreeInput, FixedUnitInput, FreeOutput} from 'app/calculators/components/io';
import dayjs from 'dayjs';

export default class GrowthTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDateStr: dayjs().format('YYYY-MM-DD'),
            sprout: 6,
            vegetative: 28,
            flowering: 49,
            drying: 7,
            curing: 28,
            processing: 0
        }

        this.setStartDateStr = this.setStartDateStr.bind(this);
        this.setSprout = this.setSprout.bind(this);
        this.setVegetative = this.setVegetative.bind(this);
        this.setFlowering = this.setFlowering.bind(this);
        this.setDrying = this.setDrying.bind(this);
        this.setCuring = this.setCuring.bind(this);
        this.setProcessing = this.setProcessing.bind(this);
        this.getFinalDateISO = this.getFinalDateISO.bind(this);
    }

    setStartDateStr(startDateStr) {
        this.setState({startDateStr: startDateStr});
    }

    setSprout(sprout) {
        this.setState({sprout: Number(sprout)});
    }

    setVegetative(vegetative) {
        this.setState({vegetative: Number(vegetative)});
    }

    setFlowering(flowering) {
        this.setState({flowering: Number(flowering)});
    }

    setDrying(drying) {
        this.setState({drying: Number(drying)});
    }

    setCuring(curing) {
        this.setState({curing: Number(curing)});
    }

    setProcessing(processing) {
        this.setState({processing: Number(processing)});
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

    getFinalDateISO(add) {
        const original = dayjs(this.state.startDateStr);
        let adjusted;

        adjusted = original.add(add, 'day');

        return adjusted.toISOString().split('T')[0].substr(0, 10);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <FreeInput inputLabel="Plant Date (YYYY-MM-DD)" onChange={this.setStartDateStr} val={this.state.startDateStr} unit={this.isDateValid()}/>
                        <FixedUnitInput inputLabel="Days to Sprout" onChange={this.setSprout} number={this.state.sprout} unit="days"/>
                        <FixedUnitInput inputLabel="Days Vegetative" onChange={this.setVegetative} number={this.state.vegetative} unit="days"/>
                        <FixedUnitInput inputLabel="Days Flowering" onChange={this.setFlowering} number={this.state.flowering} unit="days"/>
                        <FixedUnitInput inputLabel="Days Drying" onChange={this.setDrying} number={this.state.drying} unit="days"/>
                        <FixedUnitInput inputLabel="Days Curing" onChange={this.setCuring} number={this.state.curing} unit="days"/>
                        <FixedUnitInput inputLabel="Days Processing" onChange={this.setProcessing} number={this.state.processing} unit="days"/>
                    </div>
                    <div className="col-sm">
                        <br/>
                        <br/>
                        <FreeOutput outputLabel="Sprouted" val={this.getFinalDateISO(this.state.sprout)}/>
                        <FreeOutput outputLabel="Flowering Begins" val={this.getFinalDateISO(this.state.sprout + this.state.vegetative)}/>
                        <FreeOutput outputLabel="Harvest" val={this.getFinalDateISO(this.state.sprout + this.state.vegetative + this.state.flowering)}/>
                        <FreeOutput outputLabel="Done Drying" val={this.getFinalDateISO(this.state.sprout + this.state.vegetative + this.state.flowering + this.state.drying)}/>
                        <FreeOutput outputLabel="Done Curing" val={this.getFinalDateISO(this.state.sprout + this.state.vegetative + this.state.flowering + this.state.drying + this.state.curing)}/>
                        <FreeOutput outputLabel="Done Processing" val={this.getFinalDateISO(this.state.sprout + this.state.vegetative + this.state.flowering + this.state.drying + this.state.curing + this.state.processing)}/>
                    </div>
                </div>
            </div>
        );
    }
}
