Ext.define('Blathery.MessageGrid', {
  extend: 'Ext.grid.Panel',
  
  viewConfig: {
    stripeRows: true,
    enableTextSelection: true
  },

  initComponent: function() {
    
    Ext.define('ChatMessage', {
      extend: 'Ext.data.Model',
      proxy: {
        type: 'ajax',
        reader: 'json'
      },
      fields: [ 'name', 'chat' ]
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

    this.callParent(arguments);

  }

});