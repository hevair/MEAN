(function () {
    angular.module('primeiraApp').controller('pagamentosCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        'consts',
        pagamentosController
    ])
    function pagamentosController($http, $location, msgs, tabs, consts) {
        const vm = this
        const url = `${consts.apiUrl}/cicloPag`

        vm.refresh = function () {
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function (response) {
                vm.pagamento = { credits: [{}], debits: [{}] }
                vm.pagamentos = response.data
                vm.calcularValor()
                $http.get(`${url}/count`).then(function (response) {
                    vm.pages = Math.ceil(response.data.result / 10)
                    tabs.show(vm, { tabList: true, tabCreate: true })
                })
            })
        }

        vm.create = function () {
            $http.post(url, vm.pagamento).then(function (response) {
                console.log(response)
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function (response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.showTabUpdate = function (pagamento) {
            vm.pagamento = pagamento
            vm.calcularValor()
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = function (pagamento) {
            vm.calcularValor()
            vm.pagamento = pagamento
            tabs.show(vm, { tabDelete: true })

        }
        vm.update = function () {
            const updateUrl = `${url}/${vm.pagamento._id}`
            $http.put(updateUrl, vm.pagamento).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function (response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.delete = function () {
            const deleteUrl = `${url}/${vm.pagamento._id}`
            $http.delete(deleteUrl, vm.pagamento).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function (response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.addCredits = function (index) {
            vm.pagamento.credits.splice(index + 1, 0, {})
        }

        vm.cloneCredits = function (index, { name, value }) {
            vm.pagamento.credits.splice(index + 1, 0, { name, value })
            vm.calcularValor()
        }

        vm.deleteCredits = function (index) {
            if (vm.pagamento.credits.length > 1) {
                vm.pagamento.credits.splice(index, 1)
                vm.calcularValor()
            }
        }

        vm.addDebits = function (index) {
            vm.pagamento.debits.splice(index + 1, 0, {})
        }

        vm.cloneDebits = function (index, { name, value }) {
            vm.pagamento.debits.splice(index + 1, 0, { name, value })
            vm.calcularValor()
        }

        vm.deleteDebits = function (index) {
            if (vm.pagamento.debits.length > 1) {
                vm.pagamento.debits.splice(index, 1)
                vm.calcularValor()
            }
        }

        vm.calcularValor = function () {
            vm.credit = 0
            vm.debit = 0

            if (vm.pagamento) {
                vm.pagamento.credits.forEach(function ({ value }) {
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
                })

                vm.pagamento.debits.forEach(function ({ value }) {
                    vm.debit += !value || isNaN(value) ? 0 : parseFloat(value)

                })
            }

            vm.total = vm.credit - vm.debit
        }


        vm.refresh()
    }

})()