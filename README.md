# Canna-Calc
#### The open source toolbox for growers large and small!


PR's and improvements welcome.

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
