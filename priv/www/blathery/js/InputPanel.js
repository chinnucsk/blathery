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
          enableKeyEvents: true,
          labelWidth: 50,
          width: 300,
          listeners: {
            specialkey: function(field, e){
              if (e.getKey() == e.ENTER) {
                this.handleSubmit();
              }
            },
            scope: this
          }
        }
      ],
      buttons: [ { 
        text: 'Submit',
        handler: this.handleSubmit,
        scope: this 
      } ]
    });

    this.callParent(arguments);
  },

  handleSubmit: function() {
    var name = this.items.getAt(0).getValue();
    var msg = this.items.getAt(1).getValue();
    Ext.Ajax.request({
      url: 'api/messages',
      params: {
        sender: name,
        message: msg
      },
      success: function(response) {
        this.items.getAt(1).setRawValue('');
        this.fireEvent('messageSubmit')
      },
      scope: this
    });
  }

});