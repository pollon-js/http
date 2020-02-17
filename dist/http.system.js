/* @pollon/http - v1.0.0
* https://github.com/pollon-js/http#readme
* 2020 Francesco Lasaracina. Licensed ISC */
System.register(["@pollon/message-broker"],(function(t){"use strict";var e,n;return{setters:[function(t){e=t.Event,n=t.Publisher}],execute:function(){function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}var l={REQUEST_ISSUED:"pollon.application.requestissued",REQUEST_REJECTED:"pollon.application.requestrejected",REQUEST_RESOLVED:"pollon.application.requestresolved",REQUEST_BLOCKED:"pollon.application.requestblocked",REQUEST_TIMEDOUT:"pollon.application.requesttimedout"},f=function(t){function e(t,n,o){var i;return r(this,e),(i=a(this,s(e).call(this,t))).reason=n,i.args=o,i}return u(e,t),e}(e),E=function(t){function e(t){var n;return r(this,e),(n=a(this,s(e).call(this,l.REQUEST_TIMEDOUT))).request=t,n}return u(e,t),e}(e),h=function(t){function e(t,n){var o;return r(this,e),(o=a(this,s(e).call(this,l.REQUEST_RESOLVED))).request=t,o.response=n,o}return u(e,t),e}(e),p=function(t){function e(t){var n;return r(this,e),(n=a(this,s(e).call(this,l.REQUEST_ISSUED))).request=t,n}return u(e,t),e}(e),T={method:"GET",headers:{},credentials:"omit"},S=function(){function t(e){r(this,t),this.publisher=new n(Object.values(l)),this.requestFilters=[],e.Bus.add(this.publisher)}return i(t,[{key:"EVENTS",get:function(){return l}}]),i(t,[{key:"addStatusCheck",value:function(t){this.requestFilters.push(t)}},{key:"checkStatus",value:function(t){return Array.isArray(this.requestFilters)?(e=this.requestFilters.map((function(t){return t instanceof Promise?t:t instanceof Function?t():t})),new Promise((function(n,r){Promise.all(e).then((function(t){for(var e=0;e<t.length;e++)t[e]||r();n(t)})).catch((function(e){r("Pollon: [transport:http:checkstatus] cannot execute ".concat(t,". Some filters blocked the request"))}))}))):Promise.reject("Pollon: [transport:http] Invalid Datalayer request filters");var e}},{key:"make",value:function(t,e,n){var r=this;if(!e||!e.url)throw new Error('Pollon: [transport:http:make] cannot make "'.concat(t,'". Configuration is missing or is incorrect.'));var o=Object.assign({},T,{name:t},e||{}),i=!1;return Promise.race([new Promise((function(u,s){var c,a;c=5,a=function(){(n?r.checkStatus(t):Promise.resolve(!0)).then((function(){fetch(e.url,o).then((function(t){u(t),i=!0,r.publisher.fire(l.REQUEST_RESOLVED,new h(o,t))})).catch((function(t){if(--c<=0)return i=!0,t="Pollon: [transport:http:make] Too many retry. ".concat(t),o.rerun=function(){},r.publisher.fire(l.REQUEST_BLOCKED,new f(l.REQUEST_BLOCKED,t,o)),void s(t);r.publisher.fire(l.REQUEST_REJECTED,new f(l.REQUEST_REJECTED,t,o))}))})).catch((function(t){i=!0,r.publisher.fire(l.REQUEST_BLOCKED,new f(l.REQUEST_BLOCKED,t,o)),s(t)}))},o.rerun=a,r.publisher.fire(l.REQUEST_ISSUED,new p(o)),a()})),new Promise((function(t,e){return setTimeout((function(){i||r.publisher.fire(l.REQUEST_TIMEDOUT,new E(l.REQUEST_TIMEDOUT,o))}),5e3)}))])}},{key:"get",value:function(t,e){return e.method="GET",this.make(t,e)}},{key:"post",value:function(t,e){return e.method="POST",this.make(t,e)}}]),t}();t("Http",{install:function(t,e){t.Http=new S(t)}})}}}));