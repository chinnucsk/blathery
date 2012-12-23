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
      buttons: [ { text: 'Submit' } ]
    });

    this.callParent(arguments);
  }

});