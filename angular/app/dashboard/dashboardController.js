(function (){

    angular.module('primeiraApp').controller('DashboardCtrl',[
    
    '$http',
    'consts',
    DeshboardController
    ])

    function DeshboardController ($http,consts){
        const vm = this
        vm.getSummary = function(){
             const url = `${consts.apiUrl}/pagSummary`;
            $http.get(url).then(function(response){
                console.log(response)
                const {credit = 0, debt = 0} = response.data
            
                vm.credit   = credit
                vm.debt     = debt
                vm.total    = credit - debt
            })
        }
        vm.getSummary()
    }

})()
