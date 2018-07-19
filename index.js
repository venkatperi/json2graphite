const graphite = require('graphite');
const getStdin = require('get-stdin');
const _ = require('lodash');

let args = require('yargs') 
  .option('prefix', {
    describe: "Prefix added to each key. Can be nested (e.g. system.values)",
    required: true,
    alias: 'p'
  })
  .option('graphite', {
    describe: "Graphite URL. e.g. plaintext://graphite.example.org:2003/. See https://github.com/felixge/node-graphite",
    required: true,
    alias: 'g'
  })
  .option('data', {
    describe: "JSON data to send to graphite. Reads from STDIN by default.",
    alias: 'd',
    default: "-"
  })
  .argv

let client = graphite.createClient(args.graphite);

let data = getStdin()
if (args.data != "-") {
  data = Promise.resolve(args.data)
}
 
data.then(str => {
  let data = JSON.parse(str);
  let metrics = _.set({}, args.prefix, data )
  return new Promise((resolve, reject) => {
    client.write( metrics , err => {
      if (err) 
        reject(err)
      else 
        resolve();
    });
  });
}).then( () => {
  process.exit(0);
}).catch( err => {
  console.log(err);
  process.exit(1);
});

