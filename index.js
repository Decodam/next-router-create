#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

program
  .version('1.1.0')
  .description('Next.js Route Creator CLI');

program
  .command('create <routePath>')
  .description('Create a new Next.js route')
  .option('-l, --layout', 'Create a layout.jsx file')
  .option('-lo, --loading', 'Create a loading.jsx file')
  .option('-nf, --notfound', 'Create a not-found.jsx file')
  .option('-e, --error', 'Create an error.jsx file')
  .action((routePath, options) => {
    createRoute(routePath, options);
  });

program.parse(process.argv);

function createRoute(routePath, options) {
  const baseDirectory = fs.existsSync(path.join(process.cwd(), 'src')) 
    ? path.join(process.cwd(), 'src', 'app') 
    : path.join(process.cwd(), 'app');

  const routeFullPath = path.join(baseDirectory, routePath);
  
  // Create the directory structure if it doesn't exist
  fs.ensureDirSync(routeFullPath);

  // Derive the function name based on routePath
  const functionName = routePath.split(/[\/()\[\]]+/)
                                .filter(Boolean)
                                .map((part, index) => index === 0 ? `${part.charAt(0).toUpperCase()}${part.slice(1)}` : `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
                                .join('') + 'Page';

  // Create the page.jsx file
  const pagePath = path.join(routeFullPath, 'page.jsx');
  if (!fs.existsSync(pagePath)) {
    const pageContent = `
export default function ${functionName}() {
  return(
    <div>
      <p>Current Path: /${routePath}</p>
    </div>
  );
}
    `;
    fs.writeFileSync(pagePath, pageContent.trim());
    console.log(chalk.green(`Page created at:`, chalk.gray(pagePath)));
  } else {
    console.log(chalk.yellow(`Page already exists at:`, chalk.gray(pagePath)));
  }

  // Create layout.jsx if option is provided
  if (options.layout) {
    const layoutPath = path.join(routeFullPath, 'layout.jsx');
    if (!fs.existsSync(layoutPath)) {
      const layoutContent = `
export default function ${functionName}Layout({ children }) {
  return (
    <div>
      <p>Layout for: /${routePath}</p>
      {children}
    </div>
  );
}
      `;
      fs.writeFileSync(layoutPath, layoutContent.trim());
      console.log(chalk.green(`Layout created at:`, chalk.gray(layoutPath)));
    } else {
      console.log(chalk.yellow(`Layout file already exists at:`, chalk.gray(layoutPath)));
    }
  }

  // Create loading.jsx if option is provided
  if (options.loading) {
    const loadingPath = path.join(routeFullPath, 'loading.jsx');
    if (!fs.existsSync(loadingPath)) {
      const loadingContent = `
export default function ${functionName}Loading() {
  return (
    <div>
      <p>Loading for: /${routePath}</p>
    </div>
  );
}
      `;
      fs.writeFileSync(loadingPath, loadingContent.trim());
      console.log(chalk.green(`Loading created at:`, chalk.gray(loadingPath)));
    } else {
      console.log(chalk.yellow(`Loading file already exists at:`, chalk.gray(loadingPath)));
    }
  }

  // Create not-found.jsx if option is provided
  if (options.notfound) {
    const notFoundPath = path.join(routeFullPath, 'not-found.jsx');
    if (!fs.existsSync(notFoundPath)) {
      const notFoundContent = `
export default function ${functionName}NotFound() {
  return (
    <div>
      <p>404 Not Found for: /${routePath}</p>
    </div>
  );
}
      `;
      fs.writeFileSync(notFoundPath, notFoundContent.trim());
      console.log(chalk.green(`Not Found created at:`, chalk.gray(notFoundPath)));
    } else {
      console.log(chalk.yellow(`Not Found file already exists at:`, chalk.gray(notFoundPath)));
    }
  }

  // Create error.jsx if option is provided
  if (options.error) {
    const errorPath = path.join(routeFullPath, 'error.jsx');
    if (!fs.existsSync(errorPath)) {
      const errorContent = `
export default function ${functionName}Error() {
  return (
    <div>
      <p>505 Error for: /${routePath}</p>
    </div>
  );
}
      `;
      fs.writeFileSync(errorPath, errorContent.trim());
      console.log(chalk.green(`Error created at:`, chalk.gray(errorPath)));
    } else {
      console.log(chalk.yellow(`Error file already exists at:`, chalk.gray(errorPath)));
    }
  }
}
