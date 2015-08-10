Ext.define('CustomApp', {
    
    extend: 'Rally.app.App',
    
    componentCls: 'app',
    
    
     launch: function() {
        
       console.log("My first app, Woot!");
       //this._loadData();

       this.pulldownContainer = Ext.create('Ext.container.Container', {
	    layout: {
		type: 'hbox',
                align: 'stretch'
            },

       });
       this.add(this.pulldownContainer);
       this._loadIterations();
      },
      
      _loadIterations: function() {
  
       this.iterComboBox = Ext.create('Rally.ui.combobox.IterationComboBox',{
	   fieldLabel: 'Iteration ',
	   labelAlign: 'right',
	   width: 300,
       listeners: {
	   ready: function(combobox) {
            console.log("Ready: ", combobox);
	    //console.log("getrecord ", combobox.getRecord() 
            this._loadData();
           },
           select: function(combobox,records) {
		this._loadData();
          },
       scope: this

       }

      }); 
       this.pulldownContainer.add(this.iterComboBox);
      },
 
    _loadData: function() {     
     var selectedIterRef = this.iterComboBox.getRecord().get('_ref'); 
     console.log('iteration ', selectedIterRef);
     var myFilters = [
		    {
              property: 'DirectChildrenCount',
              operator: '=',
              value:   '0'
            },
            {
              property: 'Iteration',
              operator: '=',
              value:   selectedIterRef
            }
            ];
      if (this.myStore)
      {
		  this.myStore.setFilter(myFilters);
		  this.myStore.load();
      }
	  else {
      this.myStore = Ext.create('Rally.data.wsapi.Store', {
             model: 'User story',
            autoLoad: true,
		    filters: myFilters,
            listeners: {
            load: function(myStore, MyData, success) {
            console.log('Got data',myStore,MyData,success);
            if (!this.myGrid)
            {
                this._createGrid(myStore);
			}
                
            },
        scope: this
             },
        fetch: ['FormattedID','Name','Iteration','PlanEstimate','Actuals']
        });
	  }
     },
     _createGrid: function(myStorystore) {
          this.myGrid = Ext.create('Rally.ui.grid.Grid', {
                    store: myStorystore,
            columnCfgs: [
	     'FormattedID',
	     'Name',
             'Iteration',
	     'PlanEstimate',
             'Actuals'
              ]
       });
           this.add(this.myGrid);
       console.log("what is this", this);
      }
});