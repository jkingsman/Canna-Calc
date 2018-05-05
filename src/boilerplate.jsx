import React from "react";
import CalculatorContainer from "app/calculators/calculator_container";

export default class Boilerplate extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="alert alert-success" role="alert">
                        <h4 className="text-center">
                            Canna-Calc{" "}
                            <span className="tagline">
                                has cannabis growing calculators, concentrate calculators, CO2 and
                                BTU math, and more!
                            </span>
                        </h4>
                        <p className="text-center tagline">
                            Click a header to get started or support us by sharing on social media!
                        </p>
                        <div id="share-buttons" className="text-center">
                            <a
                                href="http://www.facebook.com/sharer.php?u=https://canna-calc.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="static/img/facebook.png" alt="Facebook" />
                            </a>

                            <a
                                href="http://reddit.com/submit?url=https://canna-calc.com&amp;title=Cannabis Growing and Concentrate Calculators"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="static/img/reddit.png" alt="Reddit" />
                            </a>

                            <a
                                href="https://twitter.com/share?url=https://canna-calc.com&amp;text=Cannabis%20Growing%20and%20Concentrate%20Calculators"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="static/img/twitter.png" alt="Twitter" />
                            </a>

                            <a
                                href="https://plus.google.com/share?url=https://canna-calc.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="static/img/google.png" alt="Google+" />
                            </a>
                        </div>
                    </div>
                    <CalculatorContainer />
                </div>

                <footer className="footer">
                    <div className="container">
                        <span className="footer-text">
                            This project is open source and not for profit! Contribute, comment, or
                            ask questions at{" "}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://github.com/jkingsman/Canna-Calc"
                            >
                                GitHub
                            </a>. Usage of this service constitutes agreement to the{" "}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://opensource.org/licenses/MIT"
                            >
                                MIT License
                            </a>, which this work is licensed under.
                        </span>
                    </div>
                </footer>
            </div>
        );
    }
}
