(function () {
  'use strict';
  angular.module('taskApp').factory('TaskService', ['$window', function ($window) {
    var key = 'ai-review-tasks-v1';
    function validate(tasks) {
      return Array.isArray(tasks) && tasks.every(function (task) {
        return task && typeof task.id === 'string' && typeof task.title === 'string' &&
          task.title.trim().length > 0 && task.title.length <= 120 && typeof task.done === 'boolean';
      }) && new Set(tasks.map(function (task) { return task.id; })).size === tasks.length;
    }
    function load() {
      try {
        var tasks = JSON.parse($window.localStorage.getItem(key) || '[]');
        return validate(tasks) ? tasks : [];
      } catch (error) { return []; }
    }
    function save(tasks) {
      try { $window.localStorage.setItem(key, JSON.stringify(tasks)); }
      catch (error) { throw new Error('บันทึกไม่ได้ กรุณาตรวจสอบพื้นที่หรือสิทธิ์ของเบราว์เซอร์'); }
    }
    return {
      list: load,
      add: function (tasks, title) {
        var cleanTitle = typeof title === 'string' ? title.trim() : '';
        if (!cleanTitle || cleanTitle.length > 120) { throw new Error('กรุณาระบุชื่องาน 1–120 ตัวอักษร'); }
        var next = tasks.concat([{id: $window.crypto.randomUUID(), title: cleanTitle, done: false}]);
        save(next);
        return next;
      },
      remove: function (tasks, id) {
        var next = tasks.filter(function (task) { return task.id !== id; });
        save(next);
        return next;
      },
      save: save
    };
  }]);
}());
