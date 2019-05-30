!function() {

  if (!window.hasCookieConsent) {
    /** @type {boolean} */
    window.hasCookieConsent = true;
    /** @type {string} */
    var o = "cookieconsent_options";
    /** @type {string} */
    var k = "update_cookieconsent_options";
    /** @type {string} */
    var value = "cookieconsent_dismissed";
    /** @type {string} */
    var buff = "/preside/system/assets/extension/preside-ext-cookie-consent/assets/css/specific/cookie-consent/";

    if (!(document.cookie.indexOf(value) > -1 || window.navigator && window.navigator.CookiesOK)) {
      if ("function" != typeof String.prototype.trim) {
        /**
         * @return {string}
         */
        String.prototype.trim = function() {
          return this.replace(/^\s+|\s+$/g, "");
        };
      }
      var fn;
      var util = {
        /**
         * @param {string} obj
         * @return {?}
         */
        isArray : function(obj) {
          /** @type {string} */
          var keys = Object.prototype.toString.call(obj);
          return "[object Array]" == keys;
        },
        /**
         * @param {Object} arg
         * @return {?}
         */
        isObject : function(arg) {
          return "[object Object]" == Object.prototype.toString.call(arg);
        },
        /**
         * @param {Object} args
         * @param {Function} fn
         * @param {Object} scope
         * @param {boolean} dataAndEvents
         * @return {undefined}
         */
        each : function(args, fn, scope, dataAndEvents) {
          if (util.isObject(args) && !dataAndEvents) {
            var key;
            for (key in args) {
              if (args.hasOwnProperty(key)) {
                fn.call(scope, args[key], key, args);
              }
            }
          } else {
            /** @type {number} */
            var ind = 0;
            var i = args.length;
            for (;i > ind;ind++) {
              fn.call(scope, args[ind], ind, args);
            }
          }
        },
        /**
         * @param {Array} target
         * @param {Object} b
         * @return {undefined}
         */
        merge : function(target, b) {
          if (target) {
            util.each(b, function(s, name) {
              if (util.isObject(s) && util.isObject(target[name])) {
                util.merge(target[name], s);
              } else {
                /** @type {Object} */
                target[name] = s;
              }
            });
          }
        },
        /**
         * @param {Function} func
         * @param {Object} context
         * @return {?}
         */
        bind : function(func, context) {
          return function() {
            return func.apply(context, arguments);
          };
        },
        /**
         * @param {Object} var_args
         * @param {string} d
         * @return {?}
         */
        queryObject : function(var_args, d) {
          var part;
          /** @type {number} */
          var off = 0;
          /** @type {Object} */
          var root = var_args;
          d = d.split(".");
          for (;(part = d[off++]) && (root.hasOwnProperty(part) && (root = root[part]));) {
            if (off === d.length) {
              return root;
            }
          }
          return null;
        },
        /**
         * @param {string} path
         * @param {string} val
         * @param {number} exdays
         * @param {string} value
         * @param {string} name
         * @return {undefined}
         */
        setCookie : function(path, val, exdays, value, name) {
          if( exdays==0 ){
            var headers = [path + "=" + val, "path=" + name || "/"];
          } else {
            /** @type {Date} */
            var exdate = new Date;
            exdate.setDate(exdate.getDate() + exdays);
            /** @type {Array} */
            var headers = [path + "=" + val, "expires=" + exdate.toUTCString(), "path=" + name || "/"];
          }


          if (value) {
            headers.push("domain=" + value);
          }
          /** @type {string} */
          document.cookie = headers.join(";");
        },
        /**
         * @param {HTMLElement} el
         * @param {string} event
         * @param {string} fn
         * @return {undefined}
         */
        addEventListener : function(el, event, fn) {
          if (el.addEventListener) {
            el.addEventListener(event, fn);
          } else {
            el.attachEvent("on" + event, fn);
          }
        }
      };
      var $ = function() {
        /** @type {string} */
        var rvar = "data-cc-event";
        /** @type {string} */
        var modId = "data-cc-if";
        /**
         * @param {?} el
         * @param {string} ev
         * @param {string} f
         * @return {?}
         */
        var listen = function(el, ev, f) {
          return util.isArray(ev) ? util.each(ev, function(eventName) {
            listen(el, eventName, f);
          }) : void(el.addEventListener ? el.addEventListener(ev, f) : el.attachEvent("on" + ev, f));
        };
        /**
         * @param {string} template
         * @param {?} path
         * @return {?}
         */
        var compile = function(template, path) {
          return template.replace(/\{\{(.*?)\}\}/g, function(dataAndEvents, pair) {
            var result;
            var buffer;
            var pathConfig = pair.split("||");
            for (;buffer = pathConfig.shift();) {
              if (buffer = buffer.trim(), '"' === buffer[0]) {
                return buffer.slice(1, buffer.length - 1);
              }
              if (result = util.queryObject(path, buffer)) {
                return result;
              }
            }
            return "";
          });
        };
        /**
         * @param {string} node
         * @return {?}
         */
        var parse = function(node) {
          /** @type {Element} */
          var el = document.createElement("div");
          return el.innerHTML = node, el.children[0];
        };
        /**
         * @param {Node} target
         * @param {string} name
         * @param {Function} cb
         * @return {undefined}
         */
        var initialize = function(target, name, cb) {
          var args = target.parentNode.querySelectorAll("[" + name + "]");
          util.each(args, function(elem) {
            var store = elem.getAttribute(name);
            cb(elem, store);
          }, window, true);
        };
        /**
         * @param {Node} opts
         * @param {Object} value
         * @return {undefined}
         */
        var init = function(opts, value) {
          initialize(opts, rvar, function(el, pair) {
            var additional = pair.split(":");
            var iterator = util.queryObject(value, additional[1]);
            listen(el, additional[0], util.bind(iterator, value));
          });
        };
        /**
         * @param {Node} data
         * @param {?} arg
         * @return {undefined}
         */
        var fn = function(data, arg) {
          initialize(data, modId, function(t, data) {
            var keyName = util.queryObject(arg, data);
            if (!keyName) {
              t.parentNode.removeChild(t);
            }
          });
        };
        return{
          /**
           * @param {Text} content
           * @param {?} cb
           * @return {?}
           */
          build : function(content, cb) {
            if (util.isArray(content)) {
              content = content.join("");
            }
            content = compile(content, cb);
            var json = parse(content);
            return init(json, cb), fn(json, cb), json;
          }
        };
      }();
      var settings = {
        options : {
          message : "This website uses cookies to ensure you get the best experience on our website. ",
          dismiss : "Got it!",
          learnMore : "More info",
          link : null,
          target : "_self",
          container : null,
          theme : "dark-floating",
          domain : null,
          path : "/",
          expiryDays : 365,
          markup : ['<div class="cc_banner-wrapper {{containerClasses}}">', '<div class="cc_banner cc_container cc_container--open">', '<a href="#null" data-cc-event="click:dismiss" target="_blank" class="cc_btn cc_btn_accept_all">{{options.dismiss}}</a>', '<p class="cc_message">{{options.message}} <a data-cc-if="options.link" target="{{ options.target }}" class="cc_more_info" href="{{options.link || "#null"}}">{{options.learnMore}}</a></p>', "</div>", "</div>"]
        },
        /**
         * @return {undefined}
         */
        init : function() {
          var options = window[o];
          if (options) {
            this.setOptions(options);
          }
          this.setContainer();
          if (this.options.theme) {
            this.loadTheme(this.render);
          } else {
            this.render();
          }
        },
        /**
         * @param {?} options
         * @return {undefined}
         */
        setOptionsOnTheFly : function(options) {
          this.setOptions(options);
          this.render();
        },
        /**
         * @param {?} options
         * @return {undefined}
         */
        setOptions : function(options) {
          util.merge(this.options, options);
        },
        /**
         * @return {undefined}
         */
        setContainer : function() {
          if (this.options.container) {
            /** @type {(Element|null)} */
            this.container = document.querySelector(this.options.container);
          } else {
            /** @type {(HTMLElement|null)} */
            this.container = document.body;
          }
          /** @type {string} */
          this.containerClasses = "";
          if (navigator.appVersion.indexOf("MSIE 8") > -1) {
            this.containerClasses += " cc_ie8";
          }
        },
        /**
         * @param {Function} next_callback
         * @return {undefined}
         */
        loadTheme : function(next_callback) {
          var data = this.options.theme;
          if (-1 === data.indexOf(".css")) {
            /** @type {string} */
            data = buff + data + "min.css";
          }
          /** @type {Element} */
          var style = document.createElement("link");
          /** @type {string} */
          style.rel = "stylesheet";
          /** @type {string} */
          style.type = "text/css";
          style.href = data;
          /** @type {boolean} */
          var o = false;
          style.onload = util.bind(function() {
            if (!o) {
              if (next_callback) {
                next_callback.call(this);
                /** @type {boolean} */
                o = true;
              }
            }
          }, this);
          document.getElementsByTagName("head")[0].appendChild(style);
        },
        /**
         * @return {undefined}
         */
        render : function() {
          if (this.element) {
            if (this.element.parentNode) {
              this.element.parentNode.removeChild(this.element);
              delete this.element;
            }
          }
          this.element = $.build(this.options.markup, this);
          if (this.container.firstChild) {
            this.container.insertBefore(this.element, this.container.firstChild);
          } else {
            this.container.appendChild(this.element);
          }
        },
        /**
         * @param {Event} event
         * @return {undefined}
         */
        dismiss : function(event) {
          if (event.preventDefault) {
            event.preventDefault();
          }
          /** @type {boolean} */
          event.returnValue = false;
          this.setDismissedCookie();
          this.container.removeChild(this.element);
        },
        /**
         * @return {undefined}
         */
        setDismissedCookie : function() {
          util.setCookie(value, "yes", this.options.expiryDays, this.options.domain, this.options.path);
        }
      };
      /** @type {boolean} */
      var c = false;
      (fn = function() {
        if (!c) {
          if (!("complete" != document.readyState)) {
            settings.init();
            /** @type {boolean} */
            c = true;
            window[k] = util.bind(settings.setOptionsOnTheFly, settings);
          }
        }
      })();
      util.addEventListener(document, "readystatechange", fn);
    }
  }
}();
