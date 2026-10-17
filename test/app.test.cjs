const {test} = require('node:test');
const assert = require('node:assert/strict');
const {JSDOM} = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
function setup() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {url:'http://localhost', runScripts:'outside-only'});
  ['node_modules/angular/angular.js','src/app.js','src/task.service.js','src/task.controller.js'].forEach(file => dom.window.eval(fs.readFileSync(path.join(__dirname,'..',file),'utf8')));
  const injector = dom.window.angular.injector(['ng','taskApp']);
  return {dom, service:injector.get('TaskService'), controller:injector.get('$controller')('TaskController')};
}
test('add trims titles, persists tasks and creates unique IDs', () => {
  const {dom,service} = setup();
  const first = service.add([], '  Review code  ');
  const second = service.add(first,'Write tests');
  assert.equal(first[0].title,'Review code'); assert.equal(first[0].done,false);
  assert.notEqual(second[0].id,second[1].id); assert.equal(service.list().length,2); dom.window.close();
});
test('rejects blank and overlong titles without saving', () => {
  const {dom,service} = setup();
  for (const title of ['', '   ', 'a'.repeat(121), null]) assert.throws(() => service.add([], title));
  assert.equal(service.list().length,0); dom.window.close();
});
test('removes only the requested task', () => {
  const {dom,service} = setup(); const tasks = service.add(service.add([],'A'),'B');
  assert.equal(service.remove(tasks,tasks[0].id)[0].title,'B'); assert.equal(service.list().length,1); dom.window.close();
});
test('recovers from malformed or invalid saved data', () => {
  const {dom,service} = setup();
  for (const value of ['broken','{}','[null]','[{"id":"x","title":"","done":false}]']) {
    dom.window.localStorage.setItem('ai-review-tasks-v1',value); assert.equal(service.list().length,0);
  } dom.window.close();
});
test('controller counts and filters completed tasks', () => {
  const {dom,controller:vm} = setup(); vm.title='A'; vm.add(); vm.tasks[0].done=true; vm.toggle(vm.tasks[0]);
  assert.equal(vm.completed(),1); vm.filter='open'; assert.equal(vm.matches(vm.tasks[0]),false);
  vm.filter='done'; assert.equal(vm.matches(vm.tasks[0]),true); dom.window.close();
});
test('failed persistence preserves the title and rolls back checkbox changes', () => {
  const {dom,controller:vm} = setup(); vm.title='A'; vm.add();
  dom.window.Storage.prototype.setItem = function () { throw new Error('Quota exceeded'); };
  vm.title='B'; vm.add(); assert.equal(vm.tasks.length,1); assert.equal(vm.title,'B'); assert.ok(vm.error);
  vm.tasks[0].done=true; vm.toggle(vm.tasks[0]); assert.equal(vm.tasks[0].done,false); dom.window.close();
});
test('AngularJS compiles the actual page with strict dependency injection', () => {
  const {dom} = setup();
  const html = fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
  dom.window.document.body.innerHTML = html.match(/<body[^>]*>([\s\S]*?)<script/)[1];
  assert.doesNotThrow(() => dom.window.angular.bootstrap(dom.window.document.body,['taskApp'],{strictDi:true}));
  assert.ok(dom.window.document.querySelector('form')); dom.window.close();
});
