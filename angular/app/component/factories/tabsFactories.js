(function(){
    angular.module('primeiraApp').factory('tabs',[TabsFactories])

    function TabsFactories(){
        
        function show(owner, {
            tabList = false,
            tabCreate = false,
            tabUpdate = false,
            tabDelete = false

            
        }){
           
            console.log(owner)
            owner.tabList = tabList
            owner.tabCreate = tabCreate
            owner.tabUpdate = tabUpdate
            owner.tabDelete = tabDelete
        }
        
           

        return {show}
    }
})()
