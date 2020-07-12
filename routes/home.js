const {Router} = require("express");
// console.log('Router', Router);
/*
Router [Function] {
  param: [Function: param],
  handle: [Function: handle],
  process_params: [Function: process_params],
  use: [Function: use],
  route: [Function: route],
  acl: [Function],
  bind: [Function],
  checkout: [Function],
  connect: [Function],
  copy: [Function],
  delete: [Function],
  get: [Function],
  head: [Function],
  link: [Function],
  lock: [Function],
  'm-search': [Function],
  merge: [Function],
  mkactivity: [Function],
  mkcalendar: [Function],
  mkcol: [Function],
  move: [Function],
  notify: [Function],
  options: [Function],
  patch: [Function],
  post: [Function],
  propfind: [Function],
  proppatch: [Function],
  purge: [Function],
  put: [Function],
  rebind: [Function],
  report: [Function],
  search: [Function],
  source: [Function],
  subscribe: [Function],
  trace: [Function],
  unbind: [Function],
  unlink: [Function],
  unlock: [Function],
  unsubscribe: [Function],
  all: [Function]
}
*/


//The top-level express object has a Router() method that creates a new router object.
const router = Router();//instance of middleware
// console.log('router', router);
/*
route [Function: router] {
  params: {},
  _params: [],
  caseSensitive: undefined,
  mergeParams: undefined,
  strict: undefined,
  stack: []
}
*/
router.get('/', (req, res) => {
    res.render("index", { title: "Home", isHome: true });
});

module.exports = router;