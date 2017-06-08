'use strict'

const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();

let lambda,
    context,
    pgData = { rows: [] },
    pgStub = {};

describe('upload', function() {

  before(function() {
    lambda = proxyquire('./index', {'pg': pgStub});
  })

  it('eventually returns the results', function(done) {
    pgStub = {
      Client: function(host) {
        this.connect = function(callback) { callback(); };
        this.query = function(query, callback) {
          expect(query).to.eq('SELECT some');
          return callback(null, pgData);
        };
      }
    };

    lambda.handler({ "msg" : "right" }, context, function(err, message) {
      expect(message).to.deep.equal('very successfull message');
      done();
    });
  });

  it('eventually returns the results', function(done) {
    pgStub = {
      Client: function(host) {
        this.connect = function(callback) { callback('failed to connect'); };
        this.query = function(query, callback) {  };
      }
    };

    lambda.handler({ "msg" : "wrong" }, context, function(err, message) {
      expect(err).to.deep.equal('some error message');
      done();
    });
  });

});
