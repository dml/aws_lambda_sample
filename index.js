'use strict';

const pg = require('pg');
// const async = require('async');

var testFunction = function(event) {
  return new Promise(function(resolve, reject) {
    if (event.msg === 'right') {
      resolve();
    } else {
      reject('unexpected message');
    }
  });
}

exports.handler = function(event, context, callback) {

  var onSuccess = function(result) {
    callback(null, 'very successfull message');
  }

  var onFailure = function(err) {
    setTimeout(function() {
      callback('some error message');
    }, 2000);
  }

  testFunction(event).then(onSuccess).catch(onFailure);
};
