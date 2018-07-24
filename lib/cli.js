const getStdin = require( 'get-stdin' );
const json2Graphite = require( './json2Graphite' )
const _ = require( 'lodash' );

let args = require( 'yargs' )
  .option( 'prefix', {
    describe: 'Prefix added to each key. Can be nested (e.g. systems.host1)',
    alias: 'x',
  } )
  .option( 'host', {
    describe: 'Graphite host.',
    required: true,
    alias: 'h',
  } )
  .option( 'port', {
    describe: 'Graphite port.',
    default: 2003,
    alias: 'p',
  } )
  .option( 'metrics', {
    describe: 'Metrics in JSON format. Reads from STDIN by default.',
    alias: 'm',
    default: '-',
  } )
  .option( 'Timestamp to use with metrics.', {
    describe: 'Timestamp',
    alias: 't',
  } )
  .argv

const metrics = args.metrics === '-' ? getStdin() : Promise.resolve( args.metrics )

metrics.then( str => {
  let opts = _.pick( args, ['tags', 'prefix', 'host', 'port', 'timestamp'] )
  opts.metrics = JSON.parse( str )
  return json2Graphite( opts )
} ).catch( err => {
  console.error( err );
  process.exit( 1 );
} );

