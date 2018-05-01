import React from 'react';
import CalculatorContainer from 'app/calculators/calculator_container';

export default class Boilerplate extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="alert alert-success" role="alert">
                        <h4 className="text-center">Canna-Calc has the calculators you need for growing, concentrates, yield, and more! Click the header to open a calculator.</h4>
                    </div>
                    <CalculatorContainer/>
                </div>

                <footer className="footer">
                    <div className="container">
                        <span className="text-muted">This project is open source and not for profit! Contribute, comment, or ask questions at <a rel="noopener noreferrer" target="_blank" href="https://github.com/jkingsman/Canna-Calc">Github</a>.</span>
                    </div>
                </footer>
            </div>
        );
    }
}
