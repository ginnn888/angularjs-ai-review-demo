(function () {
  'use strict';
  angular.module('taskApp').controller('TaskController', ['TaskService', function (TaskService) {
    var vm = this;
    vm.tasks = TaskService.list();
    vm.title = '';
    vm.filter = 'all';
    vm.error = '';
    vm.add = function () {
      try { vm.tasks = TaskService.add(vm.tasks, vm.title); vm.title = ''; vm.error = ''; }
      catch (error) { vm.error = error.message; }
    };
    vm.remove = function (id) {
      try { vm.tasks = TaskService.remove(vm.tasks, id); vm.error = ''; }
      catch (error) { vm.error = error.message; }
    };
    vm.toggle = function (task) {
      try { TaskService.save(vm.tasks); vm.error = ''; }
      catch (error) { task.done = !task.done; vm.error = error.message; }
    };
    vm.completed = function () { return vm.tasks.filter(function (task) { return task.done; }).length; };
    vm.matches = function (task) { return vm.filter === 'all' || (vm.filter === 'done' ? task.done : !task.done); };
  }]);
}());
