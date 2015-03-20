'use strict';

var
  hookPlugin = require('mongoose-hook'),
  thisPlugin = {};

//pre-hook
thisPlugin.pre = function(p, callback) {
  var now = new Date();

  if (p.insert) {
    if (!p.insert[this.createdAtName])
      p.insert[this.createdAtName] = now;
    if (!p.insert[this.modifiedAtName])
      p.insert[this.modifiedAtName] = now;
  }

  if (p.update) {
    if (!p.update.$set) p.update.$set = {};
    p.update.$set[this.modifiedAtName] = now;
  }

  callback();
};

// Mongoose plugin

// opts = {
//   mongoose: Mongoose,
//   createdAtName: String, // optional; default: 'createdAt'
//   modifiedAtName: String // optional; default: 'modifiedAt'
// }

module.exports = function(schema, opts) {
  var
    hookOpts,
    schemaPaths = {};

  hookOpts = {
    name: 'mongoose-createdmodified-all',
    mongoose: opts.mongoose,
    pre: thisPlugin.pre,
    createdAtName: opts.createdAtName || 'createdAt',
    modifiedAtName: opts.modifiedAtName || 'modifiedAt'
  };

  // add paths to schema
  schemaPaths[hookOpts.createdAtName] = Date;
  schemaPaths[hookOpts.modifiedAtName] = Date;
  schema.add(schemaPaths);

  // enable initial createdAt+modifedAt to be set on model level
  schema.pre('save', function(next) {
    var now = new Date();
    if (this.isNew) this[hookOpts.createdAtName] = now;
    this[hookOpts.modifiedAtName] = now;
    next();
  });

  // register mongoose-hook'ing plugin
  schema.plugin(hookPlugin, hookOpts);
};
