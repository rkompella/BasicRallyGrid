Ext.define('CustomApp', {
    
    extend: 'Rally.app.App',
    
    componentCls: 'app',
    
    
     launch: function() {
        
       console.log("My first app, Woot!");
       this._loadData();
      },
      
 
      _loadData: function() {      
         
    var myStore = Ext.create('Rally.data.wsapi.Store', {
             model: 'Task',
        autoLoad: true,
            listeners: {
            load: function(myStore, MyData, success) {
        console.log('Got data',myStore,MyData,success);
                this._loadGrid(myStore);
                
            },
        scope: this
             },
        fetch: ['FormattedID','Name','TaskEstimateTotal','TaskRemainingTotal', 'TaskActualTotal' ]
        });
     },
     _loadGrid: function(myStorystore) {
         var myGrid = Ext.create('Rally.ui.grid.Grid', {
                    store: myStorystore,
            columnCfgs: [
            'FormattedID',
            'Name',
            'TaskEstimateTotal',
            'TaskRemainingTotal',
            'TaskActualTotal'
                 ]
       });
           this.add(myGrid);
       console.log("what is this", this);
      }
});