Ext.define('Blathery.MessagePoller', {
  extend: 'Ext.util.Observable',

  interval: 2000,

  stopped: true,

  start: function() {
    this.stopped = false;
    Ext.defer(this.callFn, this.interval, this);
  },

  stop: function() {
    this.stopped = true;
  },

  callFn: function() {
    this.pollFn.call(this.scope, function() {
      if (!this.stopped) {
        Ext.defer(this.callFn, this.interval, this);
      }
    }, this);
  }

});