# Next Route Create

Next Route Create is a CLI tool for creating new Next.js routes with optional layout, loading, not-found, and error pages.

## Installation

To install Next Route Create globally, use npm:

```bash
npm install -g next-route-create
```

## Usage

To create a new Next.js route, run:

```bash
nrc create <routePath> [options]
```

### Options

- -l, --layout: Create a layout.js file for the route.
- -lo, --loading: Create a loading.js file for the route.
- -nf, --notfound: Create a not-found.js file for the route.
- -e, --error: Create an error.js file for the route.

Examples
Create a new about page with layout and loading components:

```bash
nrc create about -l -lo
```

## License

This project is licensed under the MIT License - see the LICENSE file for details
