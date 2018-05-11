# Canna-Calc
#### The open source toolbox for growers large and small!


PR's and improvements very welcome.

Start in `index.js` and working your way backwards through components should give you a pretty good picture of how things fit together -- long story short, duplicate a calculator, import it into `calculator_container.jsx`, and make a PR.

Installation:
```
$ git clone https://github.com/jkingsman/Canna-Calc.git
$ yarn
```

Serve for development (hot reload enabled in dev; check your terminal output for bound address and port):
```
$ yarn watch
```

Canna-Calc is served from `dist` which is an ignored directory and populated by the CI tool on build, but if you want to make a local bundle for testing, you can put a final static build in the `dist` folder with:

```
$ yarn build
```

Before submitting a PR, please make sure you `yarn lint` to beautify (Prettier) the code in place and keep a consistent style.

## Spirit of the Calculators

It's important that these calculators remain democratized (open source), objective (no potentially competing financial interests or obligations), and empirical (math is not subjective). In this vein:

* I'm willing to add thank-you links to the bottom in an unobtrusive way in return for promotion, but not in return for money

* I'm only interested in calculators that have one right answer (e.g. amount of CO2 a plant needs is debatable, but how much flow you need to get from 300 to 1500ppm is not; how many mg belongs in an edible serving is super variable, but how much plant matter at X% THC to get to N mg/serving is not, etc.), so calculators should have firm science backing them up

* Canna-Calc is about helping with math, not pushing product -- answers should be in objective, industry standard units, and not in a product (e.g. Canna-Calc will tell you you need 300 watts of lights, not that you need GROWCORP INC. AMAZING 300W HID LAMP, nor suggesting it as an option) -- that's for the user to decide; we just offer facts.
