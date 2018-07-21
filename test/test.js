// Copyright 2017, Venkat Peri.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

const json2Graphite = require( '../lib/json2Graphite' )
const fakeGraphiteServer = require( './fixture/fakeGraphiteServer' )
const assert = require( 'assert' );

const serverInfo = {
  port: 20003,
  host: '127.0.0.1',
}

const graphiteDsn = `plaintext://${serverInfo.host}:${serverInfo.port}/`


describe( 'json2Graphite', function () {
  let server = undefined
  beforeEach( function () {
    server = fakeGraphiteServer( serverInfo.port, serverInfo.host )
  } )

  it( 'sends flattened data to graphite with prefix', function ( done ) {
    const ts = Date.now()
    const ts2 = Math.floor( ts / 1000 )
    json2Graphite( { prefix: 'test', graphiteDsn }, {
      a: 1,
      b: { c: 3 },
    }, ts )

    server.then( res => {
      assert.equal( res, `test.a 1 ${ts2}\ntest.b.c 3 ${ts2}\n` )
      done()
    } ).catch( done )
  } )
} )

