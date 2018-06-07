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
                                aria-label="Button to Share on Facebook"
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
                                aria-label="Button to Share on Reddit"
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
                                aria-label="Button to Share on Twitter"
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
                                aria-label="Button to Share on Google Plus"
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
                                href="https://www.ilovegrowingmarijuana.com/"
                                aria-label="Link to I Love Growing Marijuana.com"
                            >
                                <img
                                    className="footerLogo"
                                    alt="I Love Growing Marijuana (by Robert Bergman) Logo"
                                    data-src="static/logos/ilgm.png"
                                />
                            </a>
                            <br />
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://overgrow.com/"
                                aria-label="Link to Overgrow.com"
                            >
                                <img
                                    className="footerLogo"
                                    alt="Overgrow.com Logo"
                                    data-src="static/logos/overgrow.png"
                                />
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
