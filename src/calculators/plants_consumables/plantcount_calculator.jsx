import React from "react";

import { GenericInput, FixedUnitOutput } from "app/calculators/components/io";
import { round } from "app/utils/math";
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
         * I wrote it jetlagged and hungover BUT hopefully
         * some liberal commenting will help you make some
         * sense of this.
         *
         * inb4 "someone already wrote a paper on this"
         */

         /* To start with, we do a naive block layout. 'std'
          * is where grow space width value is aligned with
          * plant width value and vice versa for length.
          * That relationship is inverted for 'swap'.
          * Basically, tile the plants one way, then the
          * other way.
          *
          * After the naive blocking, we'll see if there's
          * room to work in more plants around the edges,
          * which I'll call "crackfilling"
          *
          * We'll compile the results of the std + crackfilling
         * and swap + crackfilling, then pick the best at the end.
         */
         
        // compile std
        const resultsStd = {
            plantsLong: Math.floor(this.state.growSpaceLengthFt / this.state.plantLengthFt),
            plantsWide: Math.floor(this.state.growSpaceWidthFt / this.state.plantWidthFt),
        };

        /* After our naive layout, we have two cases for
         * possible crackfilling layout -- down one edge,
         * or down the other.
         *
         * We do a simple "how many can we fit" check
         * on both these options, then take the max.
         */
        const crackFillCandidateStdWide = this.simpleMaxLayout(
            // Hint: The edge space's dimensions will be the leftover space * how long that edge is
            //       Here, we check the "wide" leftover space.
            (this.state.growSpaceWidthFt - (this.state.plantWidthFt * resultsStd.plantsWide)),
            this.state.growSpaceLengthFt,
            this.state.plantWidthFt,
            this.state.plantLengthFt
        );

        const crackFillCandidateStdLong = this.simpleMaxLayout(
            // ...and here the "long" leftover space
            this.state.growSpaceWidthFt,
            (this.state.growSpaceLengthFt - (this.state.plantLengthFt * resultsStd.plantsLong )),
            this.state.plantWidthFt,
            this.state.plantLengthFt
        );

        /* I'm fairly certain one of these will always be zero; obv.
         * a non-zero result for both means we can fill both cracks
         * and that changes the whole game. HOWEVER, my mental/
         * back of the napkin proof (too drunken to post here)
         * and also some brute force testing would seem to 
         * indicate that isn't possible.
         * 
         * Prove me wrong and I'll buy you a beer.
         */
        resultsStd.crackFill = Math.max(crackFillCandidateStdWide, crackFillCandidateStdLong);

        // Same as above, but for the "swap" naive packing solution + crackfilling
        const resultsSwap = {
            plantsLong: Math.floor(this.state.growSpaceLengthFt / this.state.plantWidthFt),
            plantsWide: Math.floor(this.state.growSpaceWidthFt / this.state.plantLengthFt),
        };

        const crackFillCandidateSwapWide = this.simpleMaxLayout(
            (this.state.growSpaceWidthFt - (this.state.plantLengthFt * resultsSwap.plantsWide)),
            this.state.growSpaceLengthFt,
            this.state.plantWidthFt,
            this.state.plantLengthFt
        );

        const crackFillCandidateSwapLong = this.simpleMaxLayout(
            this.state.growSpaceWidthFt,
            (this.state.growSpaceLengthFt - (this.state.plantWidthFt * resultsSwap.plantsLong )),
            this.state.plantWidthFt,
            this.state.plantLengthFt
        );

        resultsSwap.crackFill = Math.max(crackFillCandidateSwapWide, crackFillCandidateSwapLong);

        /* We've compiled our std and swap orientation
         * along with their respective optimal crackfill
         * scenarios; time to prep for returning data.
         */

        // idiot filter; if there's no room return all zero
        if (resultsStd.plantsLong * resultsStd.plantsWide == 0 &&
            resultsSwap.plantsLong * resultsSwap.plantsWide == 0){
            return {
                plantsLong: 0,
                plantsWide: 0,
                crackFill: 0,
            };
        }

        // now choose the optimal result
        if ((resultsStd.plantsLong * resultsStd.plantsWide + resultsStd.crackFill) > 
           (resultsSwap.plantsLong * resultsSwap.plantsWide + resultsSwap.crackFill)){
            return resultsStd;
        } else if ((resultsSwap.plantsLong * resultsSwap.plantsWide + resultsSwap.crackFill) > 
          (resultsStd.plantsLong * resultsStd.plantsWide + resultsStd.crackFill)){
            return resultsSwap;
        } else {
            // prioritize minimum crackfilling if they're equal
            if (resultsStd.crackFill < resultsSwap.crackFill){
                return resultsStd;
            } else {
                return resultsSwap;
            }
        }
    }

    getUsedSpace() {
        let layout = this.getPlantLayout();
        return (layout.plantsLong * layout.plantsWide + layout.crackFill) *
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
                    This calculator provides near-optimal layouts for rectangular plants.
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
                            number={this.getPlantLayout().crackFill}
                            unit="plants in remaining space"
                        />
                        <hr />
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
                            outputLabel="Wasted Space"
                            number={this.getWastedSpace()}
                            unit="ft²"
                        />
                        <FixedUnitOutput
                            outputLabel="Space Efficiency"
                            number={round(this.getUsedSpace() / (this.state.growSpaceLengthFt * this.state.growSpaceWidthFt) * 100, 2)}
                            unit="%"
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
