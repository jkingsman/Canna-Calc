import React from "react";
import CalculatorContainer from "app/calculators/calculator_container";

export default class Boilerplate extends React.Component {
    render() {
        /* eslint-disable react/no-unknown-property */
        return (
            <div>
                <div className="container">
                    <div className="alert alert-success" role="alert">
                        <header>
                            <h1 className="text-center">
                                Canna-Calc{" "}
                                <span className="tagline">
                                    has cannabis growing calculators, concentrate calculators, CO2
                                    and BTU math, and more!
                                </span>
                            </h1>
                        </header>
                        <p className="text-center tagline">
                            Click a header to get started or support us by sharing on social media!
                        </p>
                        <div id="share-buttons" className="text-center">
                            <a
                                href="http://www.facebook.com/sharer.php?u=https://canna-calc.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-label="Facebook"
                                    role="img"
                                    viewBox="0 0 512 512"
                                >
                                    <rect width="512" height="512" rx="15%" fill="#3b5998" />
                                    <path
                                        fill="#fff"
                                        d="M330 512V322h64l9-74h-73v-47c0-22 6-36 37-36h39V99c-7-1-30-3-57-3-57 0-95 34-95 98v54h-64v74h64v190z"
                                    />
                                </svg>
                            </a>

                            <a
                                href="http://reddit.com/submit?url=https://canna-calc.com&amp;title=Cannabis Growing and Concentrate Calculators"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-label="Reddit"
                                    role="img"
                                    viewBox="0 0 512 512"
                                >
                                    <rect width="512" height="512" rx="15%" fill="#f40" />
                                    <g fill="#fff">
                                        <ellipse cx="256" cy="307" rx="166" ry="117" />
                                        <circle cx="106" cy="256" r="42" />
                                        <circle cx="407" cy="256" r="42" />
                                        <circle cx="375" cy="114" r="32" />
                                    </g>
                                    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
                                        <path
                                            d="m256 196 23-101 73 15"
                                            stroke="#fff"
                                            strokeWidth="16"
                                        />
                                        <path
                                            d="m191 359c33 25 97 26 130 0"
                                            stroke="#f40"
                                            strokeWidth="13"
                                        />
                                    </g>
                                    <g fill="#f40">
                                        <circle cx="191" cy="287" r="31" />
                                        <circle cx="321" cy="287" r="31" />
                                    </g>
                                </svg>
                            </a>

                            <a
                                href="https://twitter.com/share?url=https://canna-calc.com&amp;text=Cannabis%20Growing%20and%20Concentrate%20Calculators"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-label="Twitter"
                                    role="img"
                                    viewBox="0 0 512 512"
                                >
                                    <rect width="512" height="512" rx="15%" fill="#1da1f3" />
                                    <path
                                        fill="#fff"
                                        d="M437 152a72 72 0 0 1-40 12 72 72 0 0 0 32-40 72 72 0 0 1-45 17 72 72 0 0 0-122 65 200 200 0 0 1-145-74 72 72 0 0 0 22 94 72 72 0 0 1-32-7 72 72 0 0 0 56 69 72 72 0 0 1-32 1 72 72 0 0 0 67 50 200 200 0 0 1-105 29 200 200 0 0 0 309-179 200 200 0 0 0 35-37"
                                    />
                                </svg>
                            </a>

                            <a
                                href="https://plus.google.com/share?url=https://canna-calc.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-label="Google+"
                                    role="img"
                                    viewBox="0 0 512 512"
                                >
                                    <rect width="512" height="512" rx="15%" fill="#dc4639" />
                                    <path
                                        fill="#fff"
                                        d="M191 234v47h72c-2 19-21 55-72 55-43 0-78-36-78-80s33-80 76-80c25 0 42 10 51 19l35-33a125 125 0 0 0-211 94c0 70 57 127 127 127 74 0 122-53 122-125l-2-24"
                                    />
                                    <path
                                        stroke="#fff"
                                        strokeWidth="29"
                                        d="M404 192v118m59-59H345"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <CalculatorContainer />
                </div>

                <footer className="footer">
                    <div className="container">
                        <div className="footer-text">
                            A very special thank-you to to the following sites for helping get the
                            word out about Canna-Calc!<br />
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="http://www.ilovegrowingmarijuana.com/"
                            >
                                <img src="data:image/jpeg;base64,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" />
                            </a>
                            <hr />
                            This project is open source and not for profit! Contribute, comment, or
                            ask questions at{" "}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://github.com/jkingsman/Canna-Calc"
                            >
                                GitHub
                            </a>.
                            <br />Usage of this service constitutes agreement to the{" "}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://opensource.org/licenses/MIT"
                            >
                                MIT License
                            </a>, which this work is licensed under.
                        </div>
                    </div>
                </footer>
            </div>
        );
        /* eslint-enable react/no-unknown-property */
    }
}
