Ext.define('Blathery.MessageGrid', {
  extend: 'Ext.grid.Panel',
  
  viewConfig: {
    stripeRows: true,
    enableTextSelection: true,
    loadMask: false
  },

  initComponent: function() {
    
    Ext.define('ChatMessage', {
      extend: 'Ext.data.Model',
      proxy: {
        type: 'ajax',
        reader: 'json'
      },
      fields: [ 'name', 'chat', { name: 'time', type: 'date', dateFormat: 'time'} ]
    });

    var store = Ext.create('Ext.data.Store', {
      model: 'ChatMessage',
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: 'api/messages',
        reader: { type: 'json' }
      }
    });

    Ext.apply(this, {
      store: store,
      columns: [
            {
              text: 'Time',
              flex: 1,
              sortable: false,
              dataIndex: 'time',
              xtype: 'datecolumn',
              format: 'g:i a'
            },      
            {
                text     : 'Name',
                flex     : 1,
                sortable : false,
                dataIndex: 'name'
            },
            {
                text     : 'Message',
                flex    : 4,
                sortable : false,
                dataIndex: 'chat'
            }
        ]
    });

    var poller = Ext.create('Blathery.MessagePoller', {
      pollFn: function(callbk, scp) {
        this.store.on({
          load: {fn: callbk, scope: scp, single: true}
        });
        this.store.reload();
      },
      scope: this
    });
    poller.start();

    this.callParent(arguments);

  },

  onMessageSubmit:function() {
    this.store.reload();
  }

});