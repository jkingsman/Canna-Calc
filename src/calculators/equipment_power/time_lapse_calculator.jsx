import React from "react";

import { FixedUnitInput, GenericOutput, FixedUnitOutput } from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export class TimeLapseCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSizeMB: 1.8,
            captureInterval: 10,
        };
    }

    getPerDay() {
        const minutesInDay = 1440;
        const photosPerDay = minutesInDay / this.state.captureInterval;
        return photosPerDay * this.state.imageSizeMB;
    }

    render() {
        return (
            <div className="container">
                <h5>Image Frequency to Size</h5>
                <p>
                    Determine the storage space needed for a given image rate. Month assumes 31
                    days.
                </p>
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Image Size"
                            onChange={val => this.setState({ imageSizeMB: Number(val) })}
                            number={this.state.imageSizeMB}
                            unit="MB"
                        />
                        <FixedUnitInput
                            inputLabel="Capture Interval"
                            onChange={val => this.setState({ captureInterval: Number(val) })}
                            number={this.state.captureInterval}
                            unit="minutes"
                        />
                    </div>
                    <div className="col-sm">
                        <GenericOutput
                            outputLabel="Size per Day"
                            number={defaultRound(this.getPerDay())}
                            conversionFactors={ConversionFactors.basicData}
                            showSplitter={false}
                        />
                        <GenericOutput
                            outputLabel="Size per Week"
                            number={defaultRound(this.getPerDay() * 7)}
                            conversionFactors={ConversionFactors.basicData}
                            showSplitter={false}
                        />
                        <GenericOutput
                            outputLabel="Size per Month"
                            number={defaultRound(this.getPerDay() * 31)}
                            conversionFactors={ConversionFactors.basicData}
                            showSplitter={false}
                        />
                        <GenericOutput
                            outputLabel="Size per 4 Months"
                            number={defaultRound(this.getPerDay() * 124)}
                            conversionFactors={ConversionFactors.basicData}
                            showSplitter={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export class TimeLapseSizeLimit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSizeMB: 1.8,
            storageSpace: 32,
            lapseTime: 124,
        };
    }

    getInterval() {
        const totalImages = this.state.storageSpace * 1000 / this.state.imageSizeMB;
        const lapseTimeMinutes = this.state.lapseTime * 1440;
        return lapseTimeMinutes / totalImages;
    }

    render() {
        return (
            <div className="container">
                <h5>Capture Interval from Space Restriction</h5>
                <p>
                    Determine the fastest capture interval possible given a limited storage space.
                </p>
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Image Size"
                            onChange={val => this.setState({ imageSizeMB: Number(val) })}
                            number={this.state.imageSizeMB}
                            unit="MB"
                        />
                        <FixedUnitInput
                            inputLabel="Storage Space"
                            onChange={val => this.setState({ storageSpace: Number(val) })}
                            number={this.state.storageSpace}
                            unit="GB"
                        />
                        <FixedUnitInput
                            inputLabel="Total Lapse Time"
                            onChange={val => this.setState({ lapseTime: Number(val) })}
                            number={this.state.lapseTime}
                            unit="days"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Fastest Interval"
                            number={defaultRound(this.getInterval())}
                            unit="minutes"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
