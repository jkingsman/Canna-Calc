import React from 'react';

import {WeightInput} from 'app/io/inputs';
import {WeightOutput} from 'app/io/outputs';

export default class Temperature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        };

        this.setNumber = this.setNumber.bind(this);
    }

    setNumber(number) {
        this.setState({number: number});
    }

    render() {
        return (
            <div>
                <WeightInput inputLabel="Input Weight" onChange={this.setNumber}/>
                <WeightOutput outputLabel="Output Weight" weight={this.state.number}/>
            </div>
        );
    }
}
