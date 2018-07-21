const getStdin = require( 'get-stdin' );
const json2Graphite = require( './lib/json2Graphite' )

let args = require( 'yargs' )
  .option( 'prefix', {
    describe: 'Prefix added to each key. Can be nested (e.g. system.values)',
    required: true,
    alias: 'p',
  } )
  .option( 'graphite', {
    describe: 'Graphite URL. e.g. plaintext://graphite.example.org:2003/. See https://github.com/felixge/node-graphite',
    required: true,
    alias: 'g',
  } )
  .option( 'data', {
    describe: 'JSON data to send to graphite. Reads from STDIN by default.',
    alias: 'd',
    default: '-',
  } )
  .argv

const data = args.data === '-' ? getStdin() : Promise.resolve( args.data )

data.then( str => {
  return json2Graphite( {
    prefix: args.prefix,
    graphiteDsn: args.graphite,
  }, JSON.parse( str ) )
} ).then( () => {
  process.exit( 0 );
} ).catch( err => {
  console.log( err );
  process.exit( 1 );
} );

