import React from 'react';
import './styles.css';
import CalculatorContainer from 'app/calculators/calculator_container';

export default class Boilerplate extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="alert alert-success" role="alert">
                    <h4 className="text-center">Canna-Calc has the calculators you need for growing, concentrates, yield, and more! Click the header to open a calculator.</h4>
                </div>
                <CalculatorContainer />
            </div>
        );
    }
}
