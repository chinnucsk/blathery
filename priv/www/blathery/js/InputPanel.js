Ext.define('Blathery.InputPanel', {
  extend: 'Ext.panel.Panel',

  bodyPadding: 10,
  layout: {
    type: 'hbox',
    align: 'middle'
  },

  initComponent: function() {

    Ext.apply(this, {
      items: [
        { 
          xtype: 'textfield',
          fieldLabel: 'Name',
          labelWidth: 50,
          width: 150,
          padding: '0 20 0 0'
        }, {
          xtype: 'textfield',
          fieldLabel: 'Message',
          labelWidth: 50,
          width: 300
        }
      ],
      buttons: [ { 
        text: 'Submit',
        handler: function() {
          var name = this.items.getAt(0).getValue();
          var msg = this.items.getAt(1).getValue();
          Ext.Ajax.request({
            url: 'api/messages',
            params: {
              sender: name,
              message: msg
            },
            success: function(response) {
              this.items.getAt(0).setRawValue('');
              this.items.getAt(1).setRawValue('');
              this.fireEvent('messageSubmit')
            },
            scope: this
          });
        },
        scope: this 
      } ]
    });

    this.callParent(arguments);
  }

});