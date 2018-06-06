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
                                    alt="I Love Growing Marijuana (by Robert Bergman) Logo"
                                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wgARCABEAMgDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAUDBAYBAgf/xAAZAQEBAAMBAAAAAAAAAAAAAAAAAQIDBQT/2gAMAwEAAhADEAAAAdnRvVStYWL9fqew5A0db6GrqSenh2PSi3lrla5+yWuLOlztCuOOKNEVecSj+ZDIXGHUppgAWsojPtrM0y+fXNXPo6tdBqoPRyMew0PRKm2nDMGnCio1PkxmgZ8M9U1XDFuH/sSLtJMewAUtqIolTzjj37RjrwnfC60pmPOlz9wjhL5Qgv1R2rq0zUIdTjC5pMw3FWq+f7YtAAqahk+6sM9Dpwy1jQglU7AMrY0VaVFoF882prNvkqmxemsoRXyVYX5CKrelsYAZaQAAAAAAAAAPHsAAAAOAefQHQAAP/8QAKBAAAgMAAQMDBAIDAAAAAAAAAwQBAgUAEhMUEBE1FSMkMCE0ICIx/9oACAEBAAEFAuMOBV4HQXYKdka8BdCaZ0gRatovU2kARBaS5in0ALE+rLewi0NRh8C919ADF7aqtLW1Fq0JqLCv9VWitdNa/B6ipCm0V1yCcCYP1dfi7Qmo9GY/GxvjtP38r0XJYOVkjqNAhVp0ta1SZcaqtFcsN108evcrs16B60fa0K+QyxbyRuR+Fk/HGB39B80M4+nPVwlwLCzLhB6unEEGMcXiNKwzQg7CuqpZixAVsrnt0XFey7GvsHDClSAZzUzd26Ra5xnS10Svh7iGX+TGX7kb0GBCWy2wVRC4vGtpR4/NMN5D9RSKDFpWfWw6X5AhxbhlxnitYrXlwiLyBDjkjpNq0pTlR0rNx0JFB0HHK1rSIrWs2pS09ofOyL2tSl/TxwdUVrX1elqlMx4zBNR0q3ELtGpoMXAHPZsyu/ZoVAfUWAItkY4Q+gJoUEgWgVtavVoysmV5oNGNCzrJvHWzWzGszDE0Q0DkOY2gJkfXAw6Jbvern9IP2JP99jO+PaPN9ZE001ND+gtXR8HPOACzfzLuhCt3jQxjR/GVj/HB+f1yTa9mLU05/wCLBkuZc0MPaR+wkXuRnLlg6/o7VklPCbslCblE16aAF01nlitKvMMGronAkNoQxZrUWIvoFaMsza5AuvRNKyIA30qKqnHeq+jDb67jdazpVGgu6ryucWmk4s8yYnnXWQA8rH7GI9w/zThInxY6qz/v1dRumItUpq+5eo3L2Jz3t1d0vB2t1/tmsT+ia1n/AB//xAAkEQABAwMDBAMAAAAAAAAAAAABAAIDERMxEiEwBAUVIkBBYf/aAAgBAwEBPwFdJCJpNLl42KqlZoeW8bHljtTU/uRMfqN1n5jRU0VrfKs/qMVPtWajKs7ZRhI5/wD/xAAdEQACAgIDAQAAAAAAAAAAAAAAEgECETADEyFA/9oACAECAQE/AS9lg7rFZzGdcxkjh9+5hhhhht//xAAyEAACAQMCBAMHBAIDAAAAAAABAgMAERIhMQQTQVEQInEyM0JSYWJyFCAwgSOhNIPB/9oACAEBAAY/AqXmkjL6Vy4mJPpXnO/SrA4n61bU/Wgym4NcvzSONwgvSxrlm3QjasJMgfxq/wDkt3woPG2SnrWDEs/yqL1yxdX+VhairMwI+2kclrObDSijlhb7aDHOx+2mxLHEX9mhEC2R7iikhYEfbTSgkIu5YWr2ZMfnx0pjEbhTbxk/E0nqa/rxkk7XtQlO7+ZjUXFLNFiF82tF1NwbWNKvmPltbGiX0yOQHapeJbV3feo+JXR0feuH4kbowqQAaRQXrgI/n1NTfgajri1X2woZfWll65C/rXC8Nssja0BIVRNheni50d3kuoU+LiRwpZTYd6WHMczXy12YbGsXFjXZOppoBoCtq/ScUeW6fN1qDlIpjGm2hpuHDDPTy06R2ZhFqP6rgokYnANmKk4XiDiuV0Y7VHwvDnMZXdhtUiD5dKnlI9oBP9Uikf8AHQj/AHUiO4DMhsO9KjSAMgJIqeQyDBlsDUkQ93MQ6evWoZ4xdoTe1Zuy/iRrU7lADnppt4jJA1u4rIIoPe3hZxtWKiwHh541b1FCyKMdtNqyKC/e1eVQL9hV1QAnsKs6BvUVZEC+g8LKAB9KJCgX3q7KDbuK92uv0q3LW3pQyUG21/DLlJfvajYAX38TLA6BUW5BG9NHPa9slpEgtm2p9KE0zpg66KBQEXvJGxWrye8U4tRmhdAiLqCKWYTxDIXAxqSOUASRGxtScNzIiZNjjtQErBn6kU08bpyx8JFc/nRezlbGudzIwCDYY0eF5kV1Fy2NPKfhFPFxFuYtmHpQ/TuqnrkKC8RbF7hSB1FRwcyImXY47UOYQWtqRQytyHYov7JvwNcBxHRhg1cZL8MMeAqH8aXGJpVg6L3qRGjaIT6hW71N+NIYpIgmOgtrSyHLOaSxJ71wnpQRYzI9rkdhRltjlbQ+tf8AT/5Uf91N+FQ8Mql7nJlWouIMDwqfIcvCQp7yOUstcBKPiBpyPaOgqOMcLKpiOWZFJKPiHiYoFTFxYljtX6V1j8mqMD1owKEJluZGJoRYQnEeU3pmIibmNdzfWlkAiXlnym9GIpCMtCb0IJlTBVsGU0kTYcqOTO/ek4nGIGPYXqPi0wE4FmToaEcyJDFfWxveuX8NrVyokSaO/lN7VNxMuJncaL0FHisYS5FrX2rlBYsdDe+t6xKQsRp7VctljMbNcm+1K4tyFJYfSl0iwja6i+9Y8uHJrhhfS1CJuWYr99R/KwtemIa3XQWvXmuSaIsQL6kCsvNfHTTejckG3QUpJZrimsPh+Wje43q2Rta5+le29su3SlPm6XFqFy2pO4/m1F7fwagH9v8A/8QAKBABAAICAgECBQUBAAAAAAAAAQARITFBUWEQcTCBkaHwILHB0eHx/9oACAEBAAE/IYwOEImFEsW71ALk0G2OkBmsZru6GIfDSSJj4gUdfI1WncWuAGxJ9Zwvu1QOmgIKZe8lhfPRi1KqlZgMqLM8cxLK6u1MaVbsr4l6LVo6qC7LQU5m8sravr6QdAZbF6nDDLE1v1BtB/qgLKz/ACQUXqtevIIuaNMyYPM4eDfGIEpyDnMfFoeEtQBi2VukIHbFuCHhDUN1MNUk+zKfFJ91uFv1nsBmBRR/hAa+/wB4uELPQqUkyA9cpu1BjyYizRi09oXaOtNnHqZUJt4RWFFdtyq3FLKpL84vwIKNofEbAShwEGsgEquX5wGC9DwRUa0BkYbDsPg8y0RcoEpGPCBALat8kzerMdGUKi5vtUKoZzwuVBcFw0oHDXEVG01o4JXBpeH4RMWovOD7SrE7Mh6vprTJU4HzQX6E7fBNwMDQD0qMT1M9h4wsw92UUVfbBcT7mNFyvL6uleX1V6eENCo4IzQbgpPo2VM65RTjknUbis2h10XXp+11uOJx3Q2+qsUW5jWq6CsTkYLi8IkrYo0lLlS3uYiW6eyW6wW6xQSxkXLbRj2yOISgGDQygFzkwpFL7NV1MWfOxwyjZ3oMf3DqF4PLxMA4oFWpSj21ZZHy1SPFMvYTAObwlCwS4OeTn9H5fqYjj7+anf0+7z/M+xyqbbTvKYfNTT+Mz7vNn4tonfTWL/WfdP5ipRWNeSGdgrojAviH3X7p+D7R01UFqENXeHVzZ7Tb0H5J3wg6eZZ7D89j4U+y+ZxqL8/VuFNMYMaA2nL/ALNsOxRf8gdxJHmADsxUPEa+Ok7TzKzdQPE58WAYitgC58I7sft5h+XvOL3gvLbOQ5eF9OouLEpcRKqsD8iK6iaVDxKg2I1TlDZKA2z5iNrBncNvszlPH1iZukX1TIEuBQNfOLb5HxdiCYKuWCwKpgOSpbGDOS6jOo30xXBGug9Gy8XG9sjGhvHECrUGPPMsGShdm33nNMGAXXXEIF93tPu+8MfbHyPbubEwOx7mWsAmg4+MmJ8FmvgKi4as/T//2gAMAwEAAgADAAAAEAKiEyCGPAPFGAFCRNfBEOIABMAFDODHLKKAKABAEIMIEA2esQn4QAAAAAAIQAHHQAP/xAAiEQEAAgECBgMAAAAAAAAAAAABABExIVEQIDBBofBAYXH/2gAIAQMBAT8QgVNKuFtVra8Qj2wU6YZKSACh5ex9nukVVufmUe6IAYKHv5MoXId/EKCZby+qnmDKp0LXTkVdOP8A/8QAHBEAAgMBAAMAAAAAAAAAAAAAAAERITEwQEFx/9oACAECAQE/EB0qKCA5kJDEK7ozzG4UmMPgUvRR4RnBI+//xAAoEAEAAgIBBAMAAQQDAAAAAAABABEhMUFRYXGREIGh8CAwscHR4fH/2gAIAQEAAT8QlDLKGgbVNbghNFPHeUjZuK3AQhNIsG6YrFVp/wDahxgvkE53BZebAilNhAtOiPLkZhLMJioetj9bn/SXs9mE0SxAncNReXF3/CvcY0vM0NYxmH2SFMgKHjJFl0auOzzGEUBVmFrjWSF2VBIVdYy5l6l+z0DepRdjKNSwBvEWIKKAou87My5GbTRe99Jaz9aCq7Op8l/XMvlBgArWs7QqXv2tZv8AYKZGvgG2WVxih9ykJz2S3b0AlCE2VonUdzKIlgFKSFGuiygKtxUeWBIFCizHEN8gZEKaPf4QrTRUleL8hLAaOroOfsPcJgAa0QPohNpv1wi376hcSKyu6aSyXxvOEiByZtivOvuUmFaMkoPcUAqbwooH6w83VVPHDxFGEWNQ4aca+V4WhksUH2Qr2mbVbN14hRiy9Ds9o2x+nSdTqQISvKb7dTAmFnuMPvMpWLynq4dcvkl54jwpgxVLJZriPNl6MBU7DHRWxW7IpEEhCxrocRFjRza4v6Pu5WSA5R8X9v5EeK5nXM/xDgos7CPbBkBin8gfyKjUVqJWPtlnuhRLbxkj9/SNLIGogZpxYGg82PqNnEQtcV9I/ZkgYxh0Iy8YjYJEFaFA6b+dhaZfRcPBph1Olh8W6CtVDtfSGoahUB8OJrRUPc38C0TLddLmELVQaeZlFIw+ytzSqjF5JAZroAPcRuuwB9RBKckzGpaAt20RZXUMX1es0vyheF6iz8h8nQcZIqW+Qwj8hg1ENvUvXxdZn3ynW6lr9EQ9Z6vyrKHaDOHxN/lWc9/5Jko4Jht/36hnWOk3hXxL8ZELyctfzcf0BAV3K4siEoPkjw+IVJsDcd2eb3xekPIw1eI1Qt2fU2yqaL4I9eKubrS39kq8kF95Mnr/AJgZ256w4TtcoSlZVxq6+Ev+JS60j2kU0UAUYmDpZ7mdpIzRo+4iWggCi15GWByrAAXD9doYmncEQ4JXCdQjjq3dT3/R/MdcG/A53C3v8mc5JDi58HB7LMALb0rHqEiJrAM39/D9cMsiovFpVxLwjzlY1l+/Gy5MVIG009GGanbMHvUa8aGpFfyM5+DJwQ8QcV7fqGJ1jR0J4K9TLzJemCTeNT7LJgeFfQD6bmGTC96PwtgoG4E2VPbP5FJwydOR9N/KwU82MYDeInEO2sbg2YKcvED5C0JaKM4Ge7EJJ8xOTxDthZmGdO7RMk/QhWGHb9YW1xly8FdIdS5SteBHsy1xzt2Kpxr9hy4bcG3bXNx6irGpcC7P8qFuceN6CtQ5Lmt6wf4lOXAgW6SWkdKrNJ+j1OEfI5f6deWGRmkQDTtaniI3AIIqld9QFmwORkCs6JUUzaDkn8VDWK+QpTj0P1gM0qRmUJ33+S3SJ2B2YZz/AHQvlADV8YIIAZ0JalyFZOpFJrUW0o1QcEB9BSGlgat3uOqvItM+PFlXqKFFFDwh0b6xDLtALGMOC3jUOuECwtcA06zFB2JPVOLg8ct5jBOKFRTgWmMCtzAyQXKso3+k7UxLqvVf7JXqGxnJuj+8+iVqy3b+xuQgBT+n/9k="
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
                                    src="data:image/jpeg;base64,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"
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
