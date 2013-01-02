Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

Ext.onReady(function() {
    Ext.QuickTips.init();
    
    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var messageGrid = Ext.create('Blathery.MessageGrid', { region: 'center'});
    var inputPanel = Ext.create('Blathery.InputPanel', {
                                region: 'south',
                                height: 150
                              });

    var main = Ext.create('Ext.panel.Panel', {
        height: 650,
        width: 550,
        title: 'Messages',
        renderTo: 'app-cmp',
        layout: 'border',
        items: [
            messageGrid,
            inputPanel
        ]
    });

    messageGrid.mon(inputPanel, 'messageSubmit', messageGrid.onMessageSubmit, messageGrid);

});
