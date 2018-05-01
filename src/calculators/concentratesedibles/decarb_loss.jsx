import React from 'react';

import {FixedUnitInput, FixedUnitOutput} from 'app/calculators/components/io';
import {defaultRound} from 'app/utils/math';

export default class DecarbLoss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalWeight: 25
        }
    }

    getPostDecarbWeight() {
        const decarbConstant = 314.45 / 358.4733;
        return this.state.totalWeight * decarbConstant;
    }

    render() {
        return (
            <div className="container">
                <p>When decarboxylating cannabis, the important reaction is the conversion of tetrahydrocannabinolic acid (THCa) to tetrahydrocannabinol (THC), the actual chemical that is psychoactive. Decarboxylation results in the loss of a carbon dioxide, causing a drop in molecular weight (358.4733 g/mol - 314.45 g/mol = 44.0233 g/mol loss (~12.22% loss)). This calculator allows you to determine the remaining THC after decarboxylation given pre-decarb THCa levels.</p>
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput inputLabel="Product THCa Content" onChange={(val) => this.setState({totalWeight: Number(val)})} number={this.state.totalWeight} unit="mg"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Post-Decarb THC Content" number={defaultRound(this.getPostDecarbWeight())} unit="mg/g"/>
                    </div>
                </div>
            </div>
        );
    }
}
