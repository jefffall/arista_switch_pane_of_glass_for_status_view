! function (t, e) {
	"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.xstate = e() : t.xstate = e()
}(this, function () {
	return function (t) {
		function e(r) {
			if (n[r]) return n[r].exports;
			var i = n[r] = {
				i: r,
				l: !1,
				exports: {}
			};
			return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports
		}
		var n = {};
		return e.m = t, e.c = n, e.d = function (t, n, r) {
			e.o(t, n) || Object.defineProperty(t, n, {
				configurable: !1,
				enumerable: !0,
				get: r
			})
		}, e.n = function (t) {
			var n = t && t.__esModule ? function () {
				return t.default
			} : function () {
				return t
			};
			return e.d(n, "a", n), n
		}, e.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e)
		}, e.p = "", e(e.s = 0)
	}([function (t, e, n) {
		"use strict";

		function r(t) {
			try {
				return "string" == typeof t || "number" == typeof t ? "" + t : t.type
			} catch (t) {
				throw new Error("Events must be strings or objects with a string event.type property.")
			}
		}

		function i(t) {
			try {
				return "string" == typeof t || "number" == typeof t ? "" + t : "function" == typeof t ? t.name : t.type
			} catch (t) {
				throw new Error("Events must be strings or objects with a string event.type property.")
			}
		}

		function a(t, e) {
			try {
				return Array.isArray(t) ? t : t.toString().split(e)
			} catch (e) {
				throw new Error("'" + t + "' is not a valid state path.")
			}
		}

		function o(t, e) {
			return t instanceof g ? t.value : "object" != typeof t || t instanceof g ? s(a(t, e)) : t
		}

		function s(t) {
			if (1 === t.length) return t[0];
			for (var e = {}, n = e, r = 0; r < t.length - 1; r++) r === t.length - 2 ? n[t[r]] = t[r + 1] : (n[t[r]] = {}, n = n[t[r]]);
			return e
		}

		function u(t, e) {
			var n = {};
			return Object.keys(t).forEach(function (r) {
				n[r] = e(t[r], r, t)
			}), n
		}

		function c(t, e, n) {
			var r = {};
			return Object.keys(t).forEach(function (i) {
				var a = t[i];
				n(a) && (r[i] = e(a, i, t))
			}), r
		}

		function h(t, e) {
			return function (n) {
				for (var r = n, i = 0, a = t; i < a.length; i++) {
					var o = a[i];
					r = r[e][o]
				}
				return r
			}
		}

		function f(t, e, n) {
			void 0 === n && (n = v);
			var r = o(t, n),
				i = o(e, n);
			return "string" == typeof i ? "string" == typeof r && i === r : "string" == typeof r ? r in i : Object.keys(r).every(function (t) {
				return t in i && f(r[t], i[t])
			})
		}

		function p(t, e) {
			var n;
			return Object.keys(t).forEach(function (t) {
				f(t, e) && (!n || e.length > n.length) && (n = t)
			}), t[n]
		}

		function l(t, e) {
			return new C(t, e)
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var y = {};
		n.d(y, "actionTypes", function () {
			return E
		}), n.d(y, "toEventObject", function () {
			return j
		}), n.d(y, "toActionObject", function () {
			return O
		}), n.d(y, "toActionObjects", function () {
			return _
		}), n.d(y, "raise", function () {
			return N
		}), n.d(y, "send", function () {
			return k
		}), n.d(y, "cancel", function () {
			return A
		}), n.d(y, "start", function () {
			return V
		}), n.d(y, "stop", function () {
			return P
		});
		var v = ".",
			d = {},
			g = function () {
				function t(t, e, n, r, i, a, o) {
					void 0 === r && (r = []), void 0 === i && (i = d), void 0 === a && (a = {}), void 0 === o && (o = []), this.value = t, this.historyValue = e, this.history = n, this.actions = r, this.activities = i, this.data = a, this.events = o
				}
				return t.from = function (e) {
					return e instanceof t ? e : new t(e)
				}, t.inert = function (e) {
					return e instanceof t ? e.actions.length ? new t(e.value, e.historyValue, e.history, [], e.activities) : e : t.from(e)
				}, t.prototype.toString = function () {
					if ("string" == typeof this.value) return this.value;
					for (var t = [], e = this.value;;) {
						if ("string" == typeof e) {
							t.push(e);
							break
						}
						var n = Object.keys(e),
							r = n[0];
						if (n.slice(1).length) return;
						t.push(r), e = e[r]
					}
					return t.join(v)
				}, t
			}(),
			m = function (t) {
				return function (e) {
					for (var n = e, r = 0, i = t; r < i.length; r++) {
						n = n[i[r]]
					}
					return n
				}
			},
			S = function (t) {
				return "string" == typeof t ? [
					[t]
				] : b(Object.keys(t).map(function (e) {
					return S(t[e]).map(function (t) {
						return [e].concat(t)
					})
				}))
			},
			x = function (t) {
				var e = {};
				if (t && 1 === t.length && 1 === t[0].length) return t[0][0];
				for (var n = 0, r = t; n < r.length; n++)
					for (var i = r[n], a = e, o = 0; o < i.length; o++) {
						var s = i[o];
						if (o === i.length - 2) {
							a[s] = i[o + 1];
							break
						}
						a[s] = a[s] || {}, a = a[s]
					}
				return e
			},
			b = function (t) {
				return t.reduce(function (t, e) {
					return t.concat(e)
				}, [])
			},
			E = {
				start: "xstate.start",
				stop: "xstate.stop",
				raise: "xstate.raise",
				send: "xstate.send",
				cancel: "xstate.cancel",
				null: "xstate.null"
			},
			w = function (t) {
				return function (e) {
					var n = "string" == typeof e || "number" == typeof e ? {
						type: e
					} : e;
					return {
						type: t,
						activity: r(e),
						data: n
					}
				}
			},
			j = function (t) {
				return "string" == typeof t || "number" == typeof t ? {
					type: t
				} : t
			},
			O = function (t) {
				var e;
				if ("string" == typeof t || "number" == typeof t) e = {
					type: t
				};
				else {
					if ("function" != typeof t) return t;
					e = {
						type: t.name
					}
				}
				return Object.defineProperty(e, "toString", {
					value: function () {
						return e.type
					}
				}), e
			},
			_ = function (t) {
				return t ? (Array.isArray(t) ? t : [t]).map(O) : []
			},
			N = function (t) {
				return {
					type: E.raise,
					event: t
				}
			},
			k = function (t, e) {
				return {
					type: E.send,
					event: j(t),
					delay: e ? e.delay : void 0,
					id: e && void 0 !== e.id ? e.id : r(t)
				}
			},
			A = function (t) {
				return {
					type: E.cancel,
					sendId: t
				}
			},
			V = w(E.start),
			P = w(E.stop),
			R = this && this.__assign || Object.assign || function (t) {
				for (var e, n = 1, r = arguments.length; n < r; n++) {
					e = arguments[n];
					for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
				}
				return t
			},
			M = ".",
			F = "",
			H = function (t) {
				return "#" === t[0]
			},
			T = {
				guards: {}
			},
			C = function () {
				function t(e, n) {
					void 0 === n && (n = T);
					var r = this;
					this.config = e, this.options = n, this.__cache = {
						events: void 0,
						relativeValue: new Map,
						initialState: void 0
					}, this.idMap = {}, this.key = e.key || "(machine)", this.parent = e.parent, this.machine = this.parent ? this.parent.machine : this, this.path = this.parent ? this.parent.path.concat(this.key) : [], this.delimiter = e.delimiter || (this.parent ? this.parent.delimiter : M), this.id = e.id || (this.machine ? [this.machine.key].concat(this.path).join(this.delimiter) : this.key), this.initial = e.initial, this.parallel = !!e.parallel, this.states = e.states ? u(e.states, function (e, n) {
						var i, a = new t(R({}, e, {
							key: n,
							parent: r
						}));
						return Object.assign(r.idMap, R((i = {}, i[a.id] = a, i), a.idMap)), a
					}) : {}, this.history = !0 === e.history ? "shallow" : e.history || !1, this.on = e.on ? this.formatTransitions(e.on) : {}, this.transient = !!this.on[F], this.strict = !!e.strict, this.onEntry = e.onEntry ? [].concat(e.onEntry) : [], this.onExit = e.onExit ? [].concat(e.onExit) : [], this.data = e.data, this.activities = e.activities
				}
				return t.prototype.getStateNodes = function (t) {
					var e, n = this;
					if (!t) return [];
					var r = t instanceof g ? t.value : o(t, this.delimiter);
					if ("string" == typeof r) {
						var i = this.getStateNode(r).initial;
						return i ? this.getStateNodes((e = {}, e[r] = i, e)) : [this.states[r]]
					}
					var a = Object.keys(r);
					return a.map(function (t) {
						return n.getStateNode(t)
					}).concat(a.reduce(function (t, e) {
						var i = n.getStateNode(e).getStateNodes(r[e]);
						return t.concat(i)
					}, []))
				}, t.prototype.handles = function (t) {
					var e = r(t);
					return -1 !== this.events.indexOf(e)
				}, t.prototype._transitionLeafNode = function (t, e, n, r) {
					var i = this.getStateNode(t),
						a = i._next(e, n, r);
					if (!a.value) {
						var o = this._next(e, n, r),
							s = o.value,
							u = o.entryExitStates,
							c = o.actions,
							h = o.paths;
						return {
							value: s,
							entryExitStates: {
								entry: u ? u.entry : new Set,
								exit: new Set([i].concat(u ? Array.from(u.exit) : []))
							},
							actions: c,
							paths: h
						}
					}
					return a
				}, t.prototype._transitionHierarchicalNode = function (t, e, n, r) {
					var i = Object.keys(t),
						a = this.getStateNode(i[0]),
						o = a._transition(t[i[0]], e, n, r);
					if (!o.value) {
						var s = this._next(e, n, r),
							u = s.value,
							c = s.entryExitStates,
							h = s.actions,
							f = s.paths;
						return {
							value: u,
							entryExitStates: {
								entry: c ? c.entry : new Set,
								exit: new Set((o.entryExitStates ? Array.from(o.entryExitStates.exit) : []).concat([a], c ? Array.from(c.exit) : []))
							},
							actions: h,
							paths: f
						}
					}
					return o
				}, t.prototype._transitionOrthogonalNode = function (t, e, n, r) {
					var i = this,
						a = [],
						o = {};
					if (Object.keys(t).forEach(function (s) {
							var u = t[s];
							if (u) {
								var c = i.getStateNode(s)._transition(u, e, n, r);
								c.value || a.push(s), o[s] = c
							}
						}), !Object.keys(o).some(function (t) {
							return void 0 !== o[t].value
						})) {
						var u = this._next(e, n, r),
							c = u.value,
							h = u.entryExitStates,
							p = u.actions,
							l = u.paths;
						return {
							value: c,
							entryExitStates: {
								entry: h ? h.entry : new Set,
								exit: new Set(Object.keys(this.states).map(function (t) {
									return i.states[t]
								}).concat(h ? Array.from(h.exit) : []))
							},
							actions: p,
							paths: l
						}
					}
					var y = b(Object.keys(o).map(function (t) {
						return o[t].paths
					}));
					if (1 === y.length && !f(s(this.path), s(y[0]))) return {
						value: this.machine.resolve(x(y)),
						entryExitStates: Object.keys(o).map(function (t) {
							return o[t].entryExitStates
						}).reduce(function (t, e) {
							var n = e,
								r = n.entry,
								i = n.exit;
							return {
								entry: new Set(Array.from(t.entry).concat(Array.from(r))),
								exit: new Set(Array.from(t.exit).concat(Array.from(i)))
							}
						}, {
							entry: new Set,
							exit: new Set
						}),
						actions: b(Object.keys(o).map(function (t) {
							return o[t].actions
						})),
						paths: y
					};
					var v = b(Object.keys(o).map(function (t) {
							var n = o[t],
								r = n.value || e.value;
							return S(m(i.path)(r)[t]).map(function (e) {
								return i.path.concat(t, e)
							})
						})),
						d = this.machine.resolve(x(v));
					return {
						value: d,
						entryExitStates: Object.keys(o).reduce(function (t, e) {
							var n = o[e],
								r = n.value,
								i = n.entryExitStates;
							if (!r || !i) return t;
							var a = i.entry,
								s = i.exit;
							return {
								entry: new Set(Array.from(t.entry).concat(Array.from(a))),
								exit: new Set(Array.from(t.exit).concat(Array.from(s)))
							}
						}, {
							entry: new Set,
							exit: new Set
						}),
						actions: b(Object.keys(o).map(function (t) {
							return o[t].actions
						})),
						paths: S(d)
					}
				}, t.prototype._transition = function (t, e, n, r) {
					return "string" == typeof t ? this._transitionLeafNode(t, e, n, r) : 1 === Object.keys(t).length ? this._transitionHierarchicalNode(t, e, n, r) : this._transitionOrthogonalNode(t, e, n, r)
				}, t.prototype._next = function (t, e, n) {
					var i = this,
						a = r(e),
						s = this.on[a],
						u = this.transient ? [{
							type: E.null
						}] : [];
					if (!s || !s.length) return {
						value: void 0,
						entryExitStates: void 0,
						actions: u,
						paths: []
					};
					for (var c, h = [], p = 0, l = s; p < l.length; p++) {
						var y = l[p],
							v = y,
							d = v.cond,
							g = v.in,
							S = n || {},
							w = j(e),
							O = !g || f(o(g, this.delimiter), m(this.path.slice(0, -2))(t.value));
						if ((!d || this._evaluateCond(d, S, w, t.value)) && (!g || O)) {
							h = Array.isArray(y.target) ? y.target : [y.target], u.push.apply(u, y.actions ? y.actions : []), c = y;
							break
						}
					}
					if (0 === h.length) return {
						value: void 0,
						entryExitStates: void 0,
						actions: u,
						paths: []
					};
					var _ = b(h.map(function (e) {
							return i.getRelativeStateNodes(e, t.historyValue)
						})),
						N = _.map(function (t) {
							return t.path
						}),
						k = _.reduce(function (t, e) {
							var n = i._getEntryExitStates(e, !!c.internal),
								r = n.entry,
								a = n.exit;
							return {
								entry: new Set(Array.from(t.entry).concat(Array.from(r))),
								exit: new Set(Array.from(t.exit).concat(Array.from(a)))
							}
						}, {
							entry: new Set,
							exit: new Set
						});
					return {
						value: this.machine.resolve(x(b(h.map(function (e) {
							return i.getRelativeStateNodes(e, t.historyValue).map(function (t) {
								return t.path
							})
						})))),
						entryExitStates: k,
						actions: u,
						paths: N
					}
				}, t.prototype._getEntryExitStates = function (t, e) {
					for (var n = {
							entry: [],
							exit: []
						}, r = this.path, i = t.path, a = this.machine, o = 0; o < Math.min(r.length, i.length); o++) {
						var s = r[o];
						if (s !== i[o]) break;
						a = a.getStateNode(s)
					}
					for (var u = a.path, c = a, h = 0, f = r.slice(u.length); h < f.length; h++) {
						var p = f[h];
						c = c.getStateNode(p), n.exit.unshift(c)
					}
					a === this && (e || (n.exit.push(this), n.entry.push(this))), c = a;
					for (var l = 0, y = i.slice(u.length); l < y.length; l++) {
						var p = y[l];
						c = c.getStateNode(p), n.entry.push(c)
					}
					return {
						entry: new Set(n.entry),
						exit: new Set(n.exit)
					}
				}, t.prototype._evaluateCond = function (t, e, n, r) {
					var i;
					if ("string" == typeof t) {
						if (!this.machine.options.guards[t]) throw new Error("String condition '" + t + "' is not defined on machine '" + this.machine.id + "'");
						i = this.machine.options.guards[t]
					} else i = t;
					return i(e, n, r)
				}, t.prototype._getActions = function (t) {
					var e = {
						entry: t.entryExitStates ? b(Array.from(t.entryExitStates.entry).map(function (t) {
							return t.onEntry.concat(t.activities ? t.activities.map(function (t) {
								return V(t)
							}) : [])
						})) : [],
						exit: t.entryExitStates ? b(Array.from(t.entryExitStates.exit).map(function (t) {
							return t.onExit.concat(t.activities ? t.activities.map(function (t) {
								return P(t)
							}) : [])
						})) : []
					};
					return (e.exit || []).concat(t.actions || []).concat(e.entry || [])
				}, t.prototype._getActivities = function (t, e) {
					if (!e.entryExitStates) return {};
					var n = R({}, t.activities);
					return Array.from(e.entryExitStates.exit).forEach(function (t) {
						t.activities && t.activities.forEach(function (t) {
							n[i(t)] = !1
						})
					}), Array.from(e.entryExitStates.entry).forEach(function (t) {
						t.activities && t.activities.forEach(function (t) {
							n[i(t)] = !0
						})
					}), n
				}, t.prototype.transition = function (e, n, i) {
					var a, o = "string" == typeof e ? this.resolve(s(this.getResolvedPath(e))) : e instanceof g ? e : this.resolve(e),
						u = r(n);
					if (this.strict && -1 === this.events.indexOf(u)) throw new Error("Machine '" + this.id + "' does not accept event '" + u + "'");
					var c = g.from(o),
						h = o instanceof g ? o.historyValue ? o.historyValue : this.machine.historyValue(o.value) : this.machine.historyValue(o),
						f = this._transition(c.value, c, n, i);
					try {
						this.ensureValidPaths(f.paths)
					} catch (t) {
						throw new Error("Event '" + u + "' leads to an invalid configuration: " + t.message)
					}
					var p = this._getActions(f),
						l = this._getActivities(c, f),
						y = p.filter(function (t) {
							return "object" == typeof t && (t.type === E.raise || t.type === E.null)
						}),
						v = p.filter(function (t) {
							return "object" != typeof t || t.type !== E.raise && t.type !== E.null
						}),
						d = f.value ? this.getStateNodes(f.value) : [];
					d.some(function (t) {
						return t.transient
					}) && y.push({
						type: E.null
					});
					var m = {};
					d.forEach(function (t) {
						m[t.id] = t.data
					});
					var S = f.value ? new g(f.value, t.updateHistoryValue(h, f.value), c, v, l, m, y) : void 0;
					if (!S) return g.inert(c);
					delete c.history;
					for (var x = S; y.length;) {
						var b = x.actions,
							w = y.shift();
						x = this.transition(x, w.type === E.null ? F : w.event, i), (a = x.actions).unshift.apply(a, b)
					}
					return x
				}, t.prototype.ensureValidPaths = function (t) {
					var e = this,
						n = new Map,
						r = b(t.map(function (t) {
							return e.getRelativeStateNodes(t)
						}));
					t: for (var i = 0, a = r; i < a.length; i++)
						for (var o = a[i], s = o; s.parent;) {
							if (n.has(s.parent)) {
								if (s.parent.parallel) continue t;
								throw new Error("State node '" + o.id + "' shares parent '" + s.parent.id + "' with state node '" + n.get(s.parent).map(function (t) {
									return t.id
								}) + "'")
							}
							n.get(s.parent) ? n.get(s.parent).push(o) : n.set(s.parent, [o]), s = s.parent
						}
				}, t.prototype.getStateNode = function (t) {
					if (H(t)) return this.machine.getStateNodeById(t);
					if (!this.states) throw new Error("Unable to retrieve child state '" + t + "' from '" + this.id + "'; no child states exist.");
					var e = this.states[t];
					if (!e) throw new Error("Child state '" + t + "' does not exist on '" + this.id + "'");
					return e
				}, t.prototype.getStateNodeById = function (t) {
					var e = H(t) ? t.slice("#".length) : t,
						n = this.machine.idMap[e];
					if (!n) throw new Error("Substate '#" + e + "' does not exist on '" + this.id + "'");
					return n
				}, t.prototype.getStateNodeByPath = function (t) {
					for (var e = a(t, this.delimiter), n = this; e.length;) {
						var r = e.shift();
						n = n.getStateNode(r)
					}
					return n
				}, t.prototype.resolve = function (t) {
					var e, n = this;
					if ("string" == typeof t) {
						var r = this.getStateNode(t);
						return r.initial ? (e = {}, e[t] = r.initialStateValue, e) : t
					}
					return this.parallel ? u(this.initialStateValue, function (e, r) {
						return e ? n.getStateNode(r).resolve(t[r] || e) : {}
					}) : u(t, function (t, e) {
						return t ? n.getStateNode(e).resolve(t) : {}
					})
				}, Object.defineProperty(t.prototype, "resolvedStateValue", {
					get: function () {
						var t, e, n = this.key;
						return this.parallel ? (t = {}, t[n] = c(this.states, function (t) {
							return t.resolvedStateValue[t.key]
						}, function (t) {
							return !t.history
						}), t) : this.initial ? (e = {}, e[n] = this.states[this.initial].resolvedStateValue, e) : n
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getResolvedPath = function (t) {
					if (H(t)) {
						var e = this.machine.idMap[t.slice("#".length)];
						if (!e) throw new Error("Unable to find state node '" + t + "'");
						return e.path
					}
					return a(t, this.delimiter)
				}, Object.defineProperty(t.prototype, "initialStateValue", {
					get: function () {
						if (this.__cache.initialState) return this.__cache.initialState;
						var t = this.parallel ? c(this.states, function (t) {
							return t.initialStateValue || {}
						}, function (t) {
							return !t.history
						}) : "string" == typeof this.resolvedStateValue ? void 0 : this.resolvedStateValue[this.key];
						return this.__cache.initialState = t, this.__cache.initialState
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "initialState", {
					get: function () {
						var t, e = this.initialStateValue;
						if (!e) throw new Error("Cannot retrieve initial state from simple state '" + this.id + ".'");
						var n = {},
							i = [];
						this.getStateNodes(e).forEach(function (t) {
							t.onEntry && i.push.apply(i, t.onEntry), t.activities && t.activities.forEach(function (t) {
								n[r(t)] = !0, i.push(V(t))
							})
						});
						for (var a = i.filter(function (t) {
								return "object" == typeof t && (t.type === E.raise || t.type === E.null)
							}), o = new g(e, void 0, void 0, i, n), s = o; a.length;) {
							var u = s.actions,
								c = a.shift();
							s = this.transition(s, c.type === E.null ? F : c.event, void 0), (t = s.actions).unshift.apply(t, u)
						}
						return s
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "target", {
					get: function () {
						var t;
						if (this.history) {
							var e = this.config;
							t = e.target && "string" == typeof e.target && H(e.target) ? s(this.machine.getStateNodeById(e.target).path.slice(this.path.length - 1)) : e.target
						}
						return t
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getStates = function (t) {
					var e = this;
					if ("string" == typeof t) return [this.states[t]];
					var n = [];
					return Object.keys(t).forEach(function (r) {
						n.push.apply(n, e.states[r].getStates(t[r]))
					}), n
				}, t.prototype.getRelativeStateNodes = function (t, e, n) {
					if (void 0 === n && (n = !0), "string" == typeof t && H(t)) {
						var r = this.getStateNodeById(t);
						return n ? r.history ? r.resolveHistory(e) : r.initialStateNodes : [r]
					}
					var i = a(t, this.delimiter),
						o = this.parent || this,
						s = o.getFromRelativePath(i, e);
					return n ? b(s.map(function (t) {
						return t.initialStateNodes
					})) : s
				}, Object.defineProperty(t.prototype, "initialStateNodes", {
					get: function () {
						var t = this;
						if (!this.parallel && !this.initial) return [this];
						var e = this.initialState,
							n = S(e.value);
						return b(n.map(function (e) {
							return t.getFromRelativePath(e)
						}))
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getFromRelativePath = function (t, e) {
					var n = this;
					if (!t.length) return [this];
					var r = t[0],
						i = t.slice(1);
					if (!this.states) throw new Error("Cannot retrieve subPath '" + r + "' from node with no states");
					if ("$history" === r) {
						if (!e) return [this];
						var a = h(this.path, "states")(e).current;
						return "string" == typeof a ? this.states[a].getFromRelativePath(i, e) : b(Object.keys(a).map(function (t) {
							return n.states[t].getFromRelativePath(i, e)
						}))
					}
					var o = this.getStateNode(r);
					if (o.history) return o.resolveHistory(e);
					if (!this.states[r]) throw new Error("Child state '" + r + "' does not exist on '" + this.id + "'");
					return this.states[r].getFromRelativePath(i, e)
				}, t.updateHistoryValue = function (t, e) {
					function n(t, e) {
						return u(t.states, function (t, r) {
							if (t) {
								var i = ("string" == typeof e ? void 0 : e[r]) || (t ? t.current : void 0);
								if (i) return {
									current: i,
									states: n(t, i)
								}
							}
						})
					}
					return {
						current: e,
						states: n(t, e)
					}
				}, t.prototype.historyValue = function (t) {
					if (Object.keys(this.states).length) return {
						current: t || this.initialStateValue,
						states: c(this.states, function (e, n) {
							if (!t) return e.historyValue();
							var r = "string" == typeof t ? void 0 : t[n];
							return e.historyValue(r || e.initialStateValue)
						}, function (t) {
							return !t.history
						})
					}
				}, t.prototype.resolveHistory = function (t) {
					var e = this;
					if (!this.history) return [this];
					var n = this.parent;
					if (!t) return this.target ? b(S(this.target).map(function (t) {
						return n.getFromRelativePath(t)
					})) : this.parent.initialStateNodes;
					var r = h(n.path, "states")(t).current;
					return "string" == typeof r ? [n.getStateNode(r)] : b(S(r).map(function (t) {
						return "deep" === e.history ? n.getFromRelativePath(t) : [n.states[t[0]]]
					}))
				}, Object.defineProperty(t.prototype, "events", {
					get: function () {
						if (this.__cache.events) return this.__cache.events;
						var t = this.states,
							e = new Set(Object.keys(this.on));
						return t && Object.keys(t).forEach(function (n) {
							var r = t[n];
							if (r.states)
								for (var i = 0, a = r.events; i < a.length; i++) {
									var o = a[i];
									e.add("" + o)
								}
						}), this.__cache.events = Array.from(e)
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.formatTransition = function (t, e) {
					var n = this,
						r = !!e && e.internal,
						i = t.map(function (t) {
							var e = "string" == typeof t && t[0] === n.delimiter;
							return r = r || e, e && !n.parent ? t.slice(1) : e ? n.key + t : t
						});
					return R({}, e, {
						target: i,
						internal: r
					})
				}, t.prototype.formatTransitions = function (t) {
					var e = this;
					return u(t, function (t) {
						return void 0 === t ? [] : Array.isArray(t) ? t.map(function (t) {
							return e.formatTransition([].concat(t.target), t)
						}) : "string" == typeof t ? [e.formatTransition([t])] : Object.keys(t).map(function (n) {
							return e.formatTransition([n], t[n])
						})
					})
				}, t
			}();
		n.d(e, "Machine", function () {
			return l
		}), n.d(e, "StateNode", function () {
			return C
		}), n.d(e, "State", function () {
			return g
		}), n.d(e, "matchesState", function () {
			return f
		}), n.d(e, "mapState", function () {
			return p
		}), n.d(e, "actions", function () {
			return y
		})
	}])
});