(function (){

    angular.module('primeiraApp').component('factoryComponent',{
    bindings:{
        grid:'@',
        colorClass: '@',
        valor:'@',
        text:'@',
        iconClass:'@'

    },
    controller:[
        'gridfactories',
        function (gridfactories) {
           this.$onInit = () => this.gridClasses = gridfactories.toCssClasses(this.grid)
        }
    ],
    template: `
     <div class="{{$ctrl.gridClasses}}">
        <div class="small-box {{$ctrl.colorClass}}">
            <div class="inner">
               <h3>{{$ctrl.valor}}</h3>
               <p>{{$ctrl.text}}</p>
            </div>
            <div class="icon">
                <i class="{{$ctrl.iconClass}}"></i>
            </div>
        </div>
    </div>
        
    `

})


})()

