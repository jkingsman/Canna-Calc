import React from 'react';

import {WeightInput} from 'app/io/inputs';
import {WeightOutput} from 'app/io/outputs';

export default class GeneralCalculators extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
        };

        this.setNumber = this.setNumber.bind(this);
    }

    setNumber(number) {
        this.setState({number: number});
    }

    render() {
        return (
            <div id="generalAccordion">
                <div className="card">
                    <a className="card-header" id="weightConversion" data-toggle="collapse" data-target="#weightConversionCollapse" aria-controls="collapseWeightConversion">
                        <p className="mb-0">
                            Weight Conversion
                        </p>
                    </a>

                    <div id="weightConversionCollapse" className="collapse show" aria-labelledby="weightConversion" data-parent="#generalAccordion">
                        <div className="card-body">
                            <WeightInput inputLabel="Input Weight" onChange={this.setNumber}/>
                            <WeightOutput outputLabel="Output Weight" weight={this.state.number}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
