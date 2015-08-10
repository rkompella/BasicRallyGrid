Ext.define('CustomApp', {
    
    extend: 'Rally.app.App',
    
    componentCls: 'app',
    
    
     launch: function() {
        
       console.log("My first app, Woot!");
       //this._loadData();
       this._loadIterations();
      },
      
     _loadIterations: function() {
       console.log('in load iterations');
       this.IterComboBox = Ext.create('Rally.ui.combobox.IterationComboBox', {
        
        Listeners: {
           
           ready: function () {
           this._loadData();
        },
        scope: this
        }
       });
       this.add(this.IterComboBox);
       
    },
 
    _loadData: function() {
    console.log('in load data function');

    var selectedIterRef = this.iterComboBox.getRecord().get('_ref');      
    console.log('combobox',selectedIterRef);
    var myStore = Ext.create('Rally.data.wsapi.Store', {
             model: 'User story',
            autoLoad: true,
            filters: [{
              property: 'DirectChildrenCount',
              operator: '=',
              value:   '0'
             },
             {
             property:  'Iteration',
             operator: '=',
             value:  selectedIterRef  
	    }],
            listeners: {
            load: function(myStore, MyData, success) {
        console.log('Got data',myStore,MyData,success);
                this._loadGrid(myStore);
                
            },
        scope: this
             },
        fetch: ['FormattedID','Name','Iteration','PlanEstimate','Actuals']
        });
     },
     _loadGrid: function(myStorystore) {
         var myGrid = Ext.create('Rally.ui.grid.Grid', {
                    store: myStorystore,
            columnCfgs: [
	     'FormattedID',
	     'Name',
             'Iteration',
	     'PlanEstimate',
             'Actuals'
              ]
 
       });
           this.add(myGrid);
       console.log("what is this", this);
      }
});