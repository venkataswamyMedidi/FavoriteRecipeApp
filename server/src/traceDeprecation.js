// process.traceDeprecation() Demo Example

// Importing the process module
const process = require('process');

// Initializing the traceDeprecation flag
process.traceDeprecation = false;

// Printing traceDeprecation
console.log(process.traceDeprecation);

// Initializing the traceDeprecation flag
process.traceDeprecation = true;

// Printing traceDeprecation
console.log(process.traceDeprecation);