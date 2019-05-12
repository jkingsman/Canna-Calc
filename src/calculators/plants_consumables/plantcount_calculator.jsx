import React from "react";

import { GenericInput, FixedUnitOutput } from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";

export default class PlantCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growSpaceWidthFt: 10,
            growSpaceLengthFt: 7,
            plantWidthFt: 3,
            plantLengthFt: 1,
        };
    }

    simpleMaxLayout(areaWidth, areaLength, objWidth, objLength) {
        const stdWCount = Math.floor(areaWidth / objWidth);
        const stdLCount = Math.floor(areaLength / objLength);

        const swapWCount = Math.floor(areaWidth / objLength);
        const swapLCount = Math.floor(areaLength / objWidth);

        if (stdWCount * stdLCount > swapWCount * swapLCount) {
            return stdWCount * stdLCount;
        } else {
            return swapWCount * swapLCount;
        }
    }

    getPlantLayout() {
        /* Okay, this is a bit of a dumpster fire because
         * I wrote it at 35kft and jetlagged BUT hopefully
         * some liberal commenting will help you make some
         * sense of this.
         */

         /* To start with, we do a naive block layout. 'std'
          * is where grow space width value is aligned with
          * plant width value and vice versa for length.
          * That relationship is inverted for 'swap'.
          * Basically, tile the plants one way, then the
          * other way.
          */
        const stdWCount = Math.floor(this.state.growSpaceWidthFt / this.state.plantWidthFt);
        const stdLCount = Math.floor(this.state.growSpaceLengthFt / this.state.plantLengthFt);

        const swapWCount = Math.floor(this.state.growSpaceWidthFt / this.state.plantLengthFt);
        const swapLCount = Math.floor(this.state.growSpaceLengthFt / this.state.plantWidthFt);

        let results = {
            plantsLong: 0,
            plantsWide: 0,
            wastedSpacePlants: 0,
        };

        /* If we can't permute either way (e.g. dimensions
         * are too small),. return the default value set
         * (zero everything)
         */
        if (stdWCount * stdLCount == 0 && swapWCount * swapLCount == 0) {
            return results;
        }

        /* Two big cases: out std layout was the superior
         * naive layout, or the swap was.
         */
        if (stdWCount * stdLCount > swapWCount * swapLCount) {
            results.plantsLong = stdLCount;
            results.plantsWide = stdWCount;

            /* After our naive layout, we have two cases for
             * possible "fill-in-the-gaps" layout -- down
             * one edge, or down the other.
             *
             * We do a simple "how many can we fit" check
             * on both these options, then take the max.
             */

            let leftoverCandidate1 = this.simpleMaxLayout(
                // Hint: The edge space's dimensions will be the leftover space * how long that edge is
                //       Here, we check the "wide" leftover space.
                (this.state.growSpaceWidthFt - (this.state.plantWidthFt * results.plantsWide)),
                this.state.growSpaceLengthFt,
                this.state.plantWidthFt,
                this.state.plantLengthFt
            );

            let leftoverCandidate2 = this.simpleMaxLayout(
                // ...and here the "long" leftover space
                this.state.growSpaceWidthFt,
                (this.state.growSpaceLengthFt - (this.state.plantLengthFt * results.plantsLong )),
                this.state.plantWidthFt,
                this.state.plantLengthFt
            );

            results.wastedSpacePlants = Math.max(leftoverCandidate1, leftoverCandidate2)
        } else {
            // Same as above, but for the "swap" naive packing solution
            results.plantsLong = swapLCount;
            results.plantsWide = swapWCount;

            let leftoverCandidate1 = this.simpleMaxLayout(
                (this.state.growSpaceWidthFt - (this.state.plantLengthFt * results.plantsWide)),
                this.state.growSpaceLengthFt,
                this.state.plantWidthFt,
                this.state.plantLengthFt
            );

            let leftoverCandidate2 = this.simpleMaxLayout(
                this.state.growSpaceWidthFt,
                (this.state.growSpaceLengthFt - (this.state.plantWidthFt * results.plantsLong )),
                this.state.plantWidthFt,
                this.state.plantLengthFt
            );

            results.wastedSpacePlants = Math.max(leftoverCandidate1, leftoverCandidate2)
        }

        return results;
    }

    getUsedSpace() {
        let layout = this.getPlantLayout();
        return (layout.plantsLong * layout.plantsWide + layout.wastedSpacePlants) *
            (this.state.plantWidthFt * this.state.plantLengthFt);
    }

    getWastedSpace() {
        const totalSpace = this.state.growSpaceLengthFt * this.state.growSpaceWidthFt;
        return totalSpace - this.getUsedSpace();
    }

    render() {
        return (
            <div>
                <p>
                    This calculator provides best layouts for square or near-square plants. For
                    non-square plants, it may be possible to place additional plants in the leftover
                    space.
                </p>
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Grow Space Width"
                            onChange={val => this.setState({ growSpaceWidthFt: Number(val) })}
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.growSpaceWidthFt}
                        />
                        <GenericInput
                            inputLabel="Grow Space Length"
                            onChange={val =>
                                this.setState({
                                    growSpaceLengthFt: Number(val),
                                })
                            }
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.growSpaceLengthFt}
                        />
                        <GenericInput
                            inputLabel="Plant Width*"
                            onChange={val => this.setState({ plantLengthFt: Number(val) })}
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.plantWidthFt}
                        />
                        <GenericInput
                            inputLabel="Plant Length*"
                            onChange={val => this.setState({ plantWidthFt: Number(val) })}
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.plantLengthFt}
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Total Area"
                            number={this.state.growSpaceLengthFt * this.state.growSpaceWidthFt}
                            unit="ft²"
                        />
                        <FixedUnitOutput
                            outputLabel="Total Plants"
                            number={this.getPlantLayout().plantsLong * this.getPlantLayout().plantsWide}
                            unit="plants"
                        />
                        <FixedUnitOutput
                            outputLabel="Grid Layout"
                            number={this.getPlantLayout().plantsWide}
                            unit="plants wide by"
                        />
                        <FixedUnitOutput
                            noColon
                            number={this.getPlantLayout().plantsLong}
                            unit="plants long"
                        />
                        <FixedUnitOutput
                            outputLabel="with"
                            number={this.getPlantLayout().wastedSpacePlants}
                            unit="plants in remaining space"
                        />
                        <FixedUnitOutput
                            outputLabel="Wasted Space"
                            number={this.getWastedSpace()}
                            unit="ft²"
                        />
                    </div>
                </div>
                <i>
                    *Remember to add the appropriate spacing between plants, which is counted as
                    part of its size
                </i>
            </div>
        );
    }
}
