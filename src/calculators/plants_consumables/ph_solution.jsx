import React from 'react';

import {
    GenericInput,
    FixedUnitInput,
    FixedUnitOutput
} from 'app/calculators/components/io';

import ConversionFactors from 'app/utils/conversion_factors';

export default class pHConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startpH: 8,
            startVolume: 10,
            desiredpH: 2,
            adjusterpH: 3,
        };
    }

    render() {
        return (
            <div>
                <p>Some common adjuster pHs:</p>
                <table >
                    <tr>
                        <th>name</th>
                        <th>pH</th>
                    </tr>
                    <tr>
                        <td>Lemon (down)</td>
                        <td>~1</td>
                    </tr>
                    <tr>
                        <td>Vinegar (down)</td>
                        <td>~2.4</td>
                    </tr>
                    <tr>
                        <td>Calcium nitrate (down)</td>
                        <td>~5.75</td>
                    </tr>
                    <tr>
                        <td>Baking soda (sodium bicarbonate) (up)</td>
                        <td>~9</td>
                    </tr>
                </table>
                <hr/>
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput outputLabel="Start pH" number={this.state.startpH}/>
                        <GenericInput inputLabel="Start Volume" onChange={(val) => this.setState({startVolume: Number(val)})} conversionFactors={ConversionFactors.basicVolume} number={this.state.startVolume}/>
                        <FixedUnitInput outputLabel="Desired pH" number={this.state.desiredpH}/>
                        <FixedUnitInput outputLabel="Adjuster pH" number={this.state.adjusterpH}/>
                    </div>
                    <div className="col-sm">

                        <FixedUnitOutput outputLabel="Wasted Space" number={2} unit="ft²"/>
                    </div>
                </div>
            </div>
        );
    }
}
