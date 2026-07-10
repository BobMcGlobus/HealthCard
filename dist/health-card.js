/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = globalThis, ye = ie.ShadowRoot && (ie.ShadyCSS === void 0 || ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ve = Symbol(), Ae = /* @__PURE__ */ new WeakMap();
let We = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ye && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ae.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ae.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Qe = (r) => new We(typeof r == "string" ? r : r + "", void 0, ve), Ge = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new We(t, r, ve);
}, et = (r, e) => {
  if (ye) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = ie.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, Ee = ye ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Qe(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: tt, defineProperty: rt, getOwnPropertyDescriptor: it, getOwnPropertyNames: st, getOwnPropertySymbols: ot, getPrototypeOf: at } = Object, $ = globalThis, Me = $.trustedTypes, nt = Me ? Me.emptyScript : "", de = $.reactiveElementPolyfillSupport, W = (r, e) => r, se = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? nt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, xe = (r, e) => !tt(r, e), Ce = { attribute: !0, type: String, converter: se, reflect: !1, useDefault: !1, hasChanged: xe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ce) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && rt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = it(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const n = s == null ? void 0 : s.call(this);
      o == null || o.call(this, a), this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ce;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const e = at(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const t = this.properties, i = [...st(t), ...ot(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(Ee(s));
    } else e !== void 0 && t.push(Ee(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return et(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var o;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : se).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, a;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : se;
      this._$Em = s;
      const l = c.fromAttribute(t, n.type);
      this[s] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, o) {
    var a;
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (o = this[e]), i ?? (i = n.getPropertyOptions(e)), !((i.hasChanged ?? xe)(o, t) || i.useDefault && i.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), o !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, a] of s) {
        const { wrapped: n } = a, c = this[o];
        n !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, a, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[W("elementProperties")] = /* @__PURE__ */ new Map(), O[W("finalized")] = /* @__PURE__ */ new Map(), de == null || de({ ReactiveElement: O }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, Ne = (r) => r, oe = G.trustedTypes, Pe = oe ? oe.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ve = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Ze = "?" + v, ct = `<${Ze}>`, C = document, Z = () => C.createComment(""), K = (r) => r === null || typeof r != "object" && typeof r != "function", $e = Array.isArray, lt = (r) => $e(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", he = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Te = /-->/g, Fe = />/g, A = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Oe = /'/g, Re = /"/g, Ke = /^(?:script|style|textarea|title)$/i, qe = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), u = qe(1), q = qe(2), H = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), De = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function Ye(r, e) {
  if (!$e(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pe !== void 0 ? Pe.createHTML(e) : e;
}
const dt = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = I;
  for (let n = 0; n < t; n++) {
    const c = r[n];
    let l, h, d = -1, g = 0;
    for (; g < c.length && (a.lastIndex = g, h = a.exec(c), h !== null); ) g = a.lastIndex, a === I ? h[1] === "!--" ? a = Te : h[1] !== void 0 ? a = Fe : h[2] !== void 0 ? (Ke.test(h[2]) && (s = RegExp("</" + h[2], "g")), a = A) : h[3] !== void 0 && (a = A) : a === A ? h[0] === ">" ? (a = s ?? I, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, l = h[1], a = h[3] === void 0 ? A : h[3] === '"' ? Re : Oe) : a === Re || a === Oe ? a = A : a === Te || a === Fe ? a = I : (a = A, s = void 0);
    const m = a === A && r[n + 1].startsWith("/>") ? " " : "";
    o += a === I ? c + ct : d >= 0 ? (i.push(l), c.slice(0, d) + Ve + c.slice(d) + v + m) : c + v + (d === -2 ? n : m);
  }
  return [Ye(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Y {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const n = e.length - 1, c = this.parts, [l, h] = dt(e, t);
    if (this.el = Y.createElement(l, i), E.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = E.nextNode()) !== null && c.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Ve)) {
          const g = h[a++], m = s.getAttribute(d).split(v), y = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: o, name: y[2], strings: m, ctor: y[1] === "." ? pt : y[1] === "?" ? ut : y[1] === "@" ? gt : ae }), s.removeAttribute(d);
        } else d.startsWith(v) && (c.push({ type: 6, index: o }), s.removeAttribute(d));
        if (Ke.test(s.tagName)) {
          const d = s.textContent.split(v), g = d.length - 1;
          if (g > 0) {
            s.textContent = oe ? oe.emptyScript : "";
            for (let m = 0; m < g; m++) s.append(d[m], Z()), E.nextNode(), c.push({ type: 2, index: ++o });
            s.append(d[g], Z());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ze) c.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(v, d + 1)) !== -1; ) c.push({ type: 7, index: o }), d += v.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = C.createElement("template");
    return i.innerHTML = e, i;
  }
}
function z(r, e, t = r, i) {
  var a, n;
  if (e === H) return e;
  let s = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const o = K(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((n = s == null ? void 0 : s._$AO) == null || n.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = z(r, s._$AS(r, e.values), s, i)), e;
}
class ht {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? C).importNode(t, !0);
    E.currentNode = s;
    let o = E.nextNode(), a = 0, n = 0, c = i[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new X(o, o.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (l = new mt(o, this, e)), this._$AV.push(l), c = i[++n];
      }
      a !== (c == null ? void 0 : c.index) && (o = E.nextNode(), a++);
    }
    return E.currentNode = C, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class X {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = z(this, e, t), K(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== H && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : lt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && K(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Y.createElement(Ye(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const a = new ht(s, this), n = a.u(this.options);
      a.p(t), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = De.get(e.strings);
    return t === void 0 && De.set(e.strings, t = new Y(e)), t;
  }
  k(e) {
    $e(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new X(this.O(Z()), this.O(Z()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = Ne(e).nextSibling;
      Ne(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
let ae = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = z(this, e, t, 0), a = !K(e) || e !== this._$AH && e !== H, a && (this._$AH = e);
    else {
      const n = e;
      let c, l;
      for (e = o[0], c = 0; c < o.length - 1; c++) l = z(this, n[i + c], t, c), l === H && (l = this._$AH[c]), a || (a = !K(l) || l !== this._$AH[c]), l === p ? e = p : e !== p && (e += (l ?? "") + o[c + 1]), this._$AH[c] = l;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
class pt extends ae {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class ut extends ae {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class gt extends ae {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = z(this, e, t, 0) ?? p) === H) return;
    const i = this._$AH, s = e === p && i !== p || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== p && (i === p || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class mt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    z(this, e);
  }
}
const pe = G.litHtmlPolyfillSupport;
pe == null || pe(Y, X), (G.litHtmlVersions ?? (G.litHtmlVersions = [])).push("3.3.3");
const ft = (r, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new X(e.insertBefore(Z(), o), o, void 0, t ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis;
class D extends O {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ft(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return H;
  }
}
var Ie;
D._$litElement$ = !0, D.finalized = !0, (Ie = M.litElementHydrateSupport) == null || Ie.call(M, { LitElement: D });
const ue = M.litElementPolyfillSupport;
ue == null || ue({ LitElement: D });
(M.litElementVersions ?? (M.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = (r) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, e);
  }) : customElements.define(r, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = { attribute: !0, type: String, converter: se, reflect: !1, hasChanged: xe }, _t = (r = bt, e, t) => {
  const { kind: i, metadata: s } = t;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(t.name, r), i === "accessor") {
    const { name: a } = t;
    return { set(n) {
      const c = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(a, c, r, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(a, void 0, r, n), n;
    } };
  }
  if (i === "setter") {
    const { name: a } = t;
    return function(n) {
      const c = this[a];
      e.call(this, n), this.requestUpdate(a, c, r, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function we(r) {
  return (e, t) => typeof t == "object" ? _t(r, e, t) : ((i, s, o) => {
    const a = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), a ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Q(r) {
  return we({ ...r, state: !0, attribute: !1 });
}
const _e = {
  red: "#F44336",
  pink: "#E91E63",
  purple: "#9C27B0",
  "deep-purple": "#673AB7",
  indigo: "#3F51B5",
  blue: "#2196F3",
  "light-blue": "#03A9F4",
  cyan: "#00BCD4",
  teal: "#009688",
  green: "#4CAF50",
  "light-green": "#8BC34A",
  lime: "#CDDC39",
  yellow: "#FFEB3B",
  amber: "#FFC107",
  orange: "#FF9800",
  "deep-orange": "#FF5722",
  brown: "#795548",
  grey: "#9E9E9E",
  "blue-grey": "#607D8B"
}, yt = Object.keys(_e);
function R(r) {
  if (r)
    return r === "primary" ? "var(--primary-color)" : r === "accent" ? "var(--accent-color)" : _e[r] ? `var(--${r}-color, ${_e[r]})` : r;
}
const J = {
  weight: {
    icon: "mdi:scale-bathroom",
    color: "indigo",
    graph: "line",
    aggregate: "mean",
    trend: "down_good",
    precision: 1,
    goalType: "atmost"
  },
  heart_rate: {
    icon: "mdi:heart-pulse",
    color: "red",
    graph: "line",
    unit: "bpm",
    aggregate: "mean",
    trend: "neutral",
    precision: 0
  },
  blood_pressure: {
    icon: "mdi:heart-cog",
    color: "pink",
    graph: "line",
    unit: "mmHg",
    aggregate: "mean",
    trend: "neutral",
    precision: 0
  },
  temperature: {
    icon: "mdi:thermometer",
    color: "amber",
    graph: "line",
    unit: "°C",
    aggregate: "mean",
    trend: "neutral",
    precision: 1
  },
  body_composition: {
    icon: "mdi:human",
    color: "purple",
    graph: "line",
    unit: "%",
    aggregate: "mean",
    trend: "neutral",
    precision: 1
  },
  steps: {
    icon: "mdi:walk",
    color: "orange",
    graph: "bar",
    aggregate: "max",
    trend: "up_good",
    precision: 0
  },
  workout: {
    icon: "mdi:run",
    color: "deep-orange",
    graph: "bar",
    unit: "min",
    aggregate: "max",
    trend: "up_good",
    precision: 0
  },
  calories: {
    icon: "mdi:fire",
    color: "deep-orange",
    graph: "progress",
    unit: "kcal",
    aggregate: "max",
    trend: "neutral",
    precision: 0
  },
  nutrition: {
    icon: "mdi:food-apple",
    color: "green",
    graph: "progress",
    aggregate: "max",
    trend: "neutral",
    precision: 0
  },
  water: {
    icon: "mdi:cup-water",
    color: "light-blue",
    graph: "progress",
    unit: "ml",
    aggregate: "max",
    trend: "up_good",
    precision: 0
  },
  sleep: {
    icon: "mdi:sleep",
    color: "deep-purple",
    graph: "bar",
    aggregate: "max",
    trend: "up_good",
    duration: !0,
    precision: 1
  },
  score: {
    icon: "mdi:heart-flash",
    color: "amber",
    graph: "none",
    aggregate: "mean",
    trend: "up_good",
    precision: 0
  },
  toothbrush: {
    icon: "mdi:toothbrush-electric",
    color: "cyan",
    graph: "bar",
    aggregate: "max",
    trend: "up_good",
    duration: !0,
    precision: 0
  },
  custom: {
    icon: "mdi:chart-line",
    color: "primary",
    graph: "line",
    aggregate: "mean",
    trend: "neutral"
  }
}, He = ["teal", "orange", "pink", "cyan", "lime"], ze = {
  en: {
    goal: "Goal",
    rising: "rising",
    falling: "falling",
    stable: "stable",
    today: "Today",
    yesterday: "Yesterday",
    no_data: "No data",
    entity_missing: "Entity not found",
    weight: "Weight",
    heart_rate: "Heart rate",
    blood_pressure: "Blood pressure",
    temperature: "Body temperature",
    body_composition: "Body composition",
    steps: "Steps",
    workout: "Workout",
    calories: "Calories",
    nutrition: "Nutrition",
    water: "Water",
    sleep: "Sleep",
    score: "Health score",
    toothbrush: "Tooth brushing",
    custom: "Sensor",
    of: "of",
    phase_deep: "Deep",
    phase_light: "Light",
    phase_rem: "REM",
    phase_awake: "Awake",
    close: "Close",
    open_ha: "Open in Home Assistant",
    stat_min: "Min",
    stat_avg: "Avg",
    stat_max: "Max"
  },
  de: {
    goal: "Ziel",
    rising: "steigend",
    falling: "fallend",
    stable: "stabil",
    today: "Heute",
    yesterday: "Gestern",
    no_data: "Keine Daten",
    entity_missing: "Entität nicht gefunden",
    weight: "Gewicht",
    heart_rate: "Puls",
    blood_pressure: "Blutdruck",
    temperature: "Körpertemperatur",
    body_composition: "Körperzusammensetzung",
    steps: "Schritte",
    workout: "Sport",
    calories: "Kalorien",
    nutrition: "Nährstoffe",
    water: "Wasser",
    sleep: "Schlaf",
    score: "Gesamt-Score",
    toothbrush: "Zähneputzen",
    custom: "Sensor",
    of: "von",
    phase_deep: "Tiefschlaf",
    phase_light: "Leichter Schlaf",
    phase_rem: "REM",
    phase_awake: "Wach",
    close: "Schließen",
    open_ha: "In Home Assistant öffnen",
    stat_min: "Min",
    stat_avg: "Ø",
    stat_max: "Max"
  }
};
function ee(r) {
  var t;
  return (((t = r == null ? void 0 : r.locale) == null ? void 0 : t.language) ?? (r == null ? void 0 : r.language) ?? "en").startsWith("de") ? "de" : "en";
}
function f(r, e) {
  return ze[ee(r)][e] ?? ze.en[e] ?? e;
}
function _(r, e, t) {
  if (!Number.isFinite(e)) return "–";
  const i = ee(r) === "de" ? "de-DE" : "en-US";
  return t === void 0 ? new Intl.NumberFormat(i, { maximumFractionDigits: 2 }).format(e) : new Intl.NumberFormat(i, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }).format(e);
}
function re(r, e) {
  return e ? /^[%°'"]/.test(e) ? `${r}${e}` : `${r} ${e}` : r;
}
function ge(r, e) {
  if (!Number.isFinite(r)) return "–";
  let t;
  const i = (e ?? "min").toLowerCase();
  i.startsWith("h") ? t = r * 60 : i === "s" || i.startsWith("sec") ? t = r / 60 : t = r;
  const s = Math.round(t * 60), o = Math.floor(s / 3600), a = Math.floor(s % 3600 / 60), n = s % 60;
  return o > 0 ? a ? `${o} h ${a} min` : `${o} h` : a > 0 ? n && a < 10 ? `${a} min ${n} s` : `${a} min` : `${n} s`;
}
function me(r, e) {
  const t = new Date(e);
  if (isNaN(t.getTime())) return "";
  const i = ee(r) === "de" ? "de-DE" : "en-US", s = /* @__PURE__ */ new Date(), o = (n, c) => n.getFullYear() === c.getFullYear() && n.getMonth() === c.getMonth() && n.getDate() === c.getDate();
  if (o(t, s))
    return t.toLocaleTimeString(i, { hour: "numeric", minute: "2-digit" });
  const a = new Date(s.getTime() - 864e5);
  return o(t, a) ? f(r, "yesterday") : t.toLocaleDateString(i, { day: "numeric", month: "short" });
}
async function vt(r, e, t) {
  if (!e.length) return {};
  const i = /* @__PURE__ */ new Date(), s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (t - 1));
  const o = await r.callWS({
    type: "history/history_during_period",
    start_time: s.toISOString(),
    end_time: i.toISOString(),
    entity_ids: e,
    minimal_response: !0,
    no_attributes: !0
  }), a = {};
  for (const n of e)
    a[n] = ((o == null ? void 0 : o[n]) ?? []).map((c) => ({ t: c.lu * 1e3, v: parseFloat(c.s) })).filter((c) => Number.isFinite(c.v));
  return a;
}
function Ue(r, e, t) {
  const i = /* @__PURE__ */ new Date();
  i.setHours(0, 0, 0, 0);
  const s = i.getTime() - (e - 1) * 864e5, o = Array.from({ length: e }, () => []);
  for (const a of r) {
    const n = Math.floor((a.t - s) / 864e5);
    n >= 0 && n < e && o[n].push(a.v);
  }
  return o.map((a) => {
    if (!a.length) return NaN;
    switch (t) {
      case "min":
        return Math.min(...a);
      case "max":
        return Math.max(...a);
      case "sum":
        return a.reduce((n, c) => n + c, 0);
      case "last":
        return a[a.length - 1];
      default:
        return a.reduce((n, c) => n + c, 0) / a.length;
    }
  });
}
function Le(r) {
  const e = [...r];
  let t = NaN;
  for (let s = 0; s < e.length; s++)
    Number.isFinite(e[s]) ? t = e[s] : e[s] = t;
  let i = NaN;
  for (let s = e.length - 1; s >= 0; s--)
    Number.isFinite(e[s]) ? i = e[s] : e[s] = i;
  return e;
}
function Be(r) {
  const e = r.filter(Number.isFinite);
  return e.length < 2 ? NaN : e[e.length - 1] - e[0];
}
const V = 220, x = 60, b = 7;
function xt(r) {
  const e = r.filter(Number.isFinite), t = Math.min(...e), i = Math.max(...e), s = i - t || Math.abs(i) * 0.1 || 1;
  return { lo: t - s * 0.18, hi: i + s * 0.18 };
}
function $t(r) {
  const e = r.filter((c) => c.values.some(Number.isFinite));
  if (!e.length) return p;
  const { lo: t, hi: i } = xt(e.flatMap((c) => c.values)), s = Math.max(...e.map((c) => c.values.length)), o = (c) => b + c * (V - 2 * b) / Math.max(s - 1, 1), a = (c) => x - b - (c - t) / (i - t) * (x - 2 * b), n = e.map((c) => {
    const l = c.values.map((d, g) => ({ x: o(g), y: a(d), ok: Number.isFinite(d) })).filter((d) => d.ok);
    if (!l.length) return p;
    let h = `M ${l[0].x} ${l[0].y}`;
    for (let d = 1; d < l.length; d++) {
      const g = (l[d - 1].x + l[d].x) / 2;
      h += ` C ${g} ${l[d - 1].y}, ${g} ${l[d].y}, ${l[d].x} ${l[d].y}`;
    }
    return q`
      <path d=${h} fill="none" stroke=${c.color} stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
      ${l.map(
      (d) => q`<circle cx=${d.x} cy=${d.y} r="3.1" fill="var(--hc-dot-fill)"
          stroke=${c.color} stroke-width="2"/>`
    )}
    `;
  });
  return u`<svg class="chart" viewBox="0 0 ${V} ${x}" aria-hidden="true">${n}</svg>`;
}
function wt(r, e, t) {
  if (!r.some((d) => Number.isFinite(d) && d > 0)) return p;
  const i = r.map((d) => Number.isFinite(d) && d > 0 ? d : 0), s = Math.max(...i, t ?? 0) || 1, o = i.length, a = (V - 2 * b) / o, n = Math.min(a * 0.55, 14), c = (d) => d / s * (x - 2 * b), l = i.map((d, g) => {
    const m = Math.max(c(d), d > 0 ? 3 : 1.5), y = b + g * a + (a - n) / 2;
    return q`<rect x=${y} y=${x - b - m} width=${n} height=${m}
      rx=${Math.min(n / 2, 4)} fill=${e} opacity=${d > 0 ? 1 : 0.25}/>`;
  }), h = Number.isFinite(t) ? q`<line x1=${b} x2=${V - b} y1=${x - b - c(t)} y2=${x - b - c(t)}
        stroke=${e} stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>` : p;
  return u`<svg class="chart" viewBox="0 0 ${V} ${x}" aria-hidden="true">
    ${h}${l}
  </svg>`;
}
const je = [
  "var(--amber-color, #FFC107)",
  "var(--purple-color, #9C27B0)",
  "var(--pink-color, #E91E63)"
], kt = "color-mix(in srgb, var(--primary-text-color) 16%, transparent)";
function St(r, e) {
  const t = (s) => Math.abs(Math.sin(s * 127.1) * 43758.5453 % 1), i = [];
  for (let s = 0; s < 2; s++) {
    const o = s === 0 ? 74 : 88, a = s === 0 ? 26 : 32;
    for (let n = 0; n < a; n++) {
      const c = n / a, l = c * Math.PI * 2 - Math.PI / 2 + t(n + s * 100) * 0.12, h = o + (t(n * 3 + s * 7) - 0.5) * 6, d = 2.4 + t(n * 7 + s * 13) * 2.4, g = c < e ? je[Math.floor(t(n * 11 + s * 29) * je.length)] : kt;
      i.push(
        q`<circle cx=${100 + Math.cos(l) * h} cy=${100 + Math.sin(l) * h}
          r=${d} fill=${g} opacity="0.75"/>`
      );
    }
  }
  return u`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="62" fill="color-mix(in srgb, ${r} 10%, transparent)" />
    ${i}
  </svg>`;
}
function fe(r, e, t = 10) {
  const s = 2 * Math.PI * 82;
  return u`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r=${82} fill="none" stroke=${r} opacity="0.16"
      stroke-width=${t}/>
    <circle cx="100" cy="100" r=${82} fill="none" stroke=${r} stroke-width=${t}
      stroke-linecap="round" stroke-dasharray="${s * Math.max(e, 0.02)} ${s}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}
function At(r, e, t) {
  const i = [];
  for (let n = 0; n <= 144; n++) {
    const c = n / 144 * 2 * Math.PI, l = 72 + 7 * Math.cos(12 * c);
    i.push(
      `${n ? "L" : "M"} ${(100 + Math.cos(c) * l).toFixed(1)} ${(100 + Math.sin(c) * l).toFixed(1)}`
    );
  }
  const o = 92, a = 2 * Math.PI * o;
  return u`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <path d="${i.join(" ")} Z" fill="color-mix(in srgb, ${r} 22%, transparent)"/>
    <circle cx="100" cy="100" r=${o} fill="none" stroke=${e} opacity="0.18"
      stroke-width="5"/>
    <circle cx="100" cy="100" r=${o} fill="none" stroke=${e} stroke-width="5"
      stroke-linecap="round" stroke-dasharray="${a * Math.max(t, 0.02)} ${a}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}
function Et(r, e, t, i) {
  return r === "material" ? At(e, t, i) : r === "bubble" ? fe(t, i, 15) : r === "mirror" ? fe("#fff", i, 7) : r === "default" || r === "glass" ? fe(t, i, 10) : St(t, i);
}
var Mt = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, ne = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Ct(e, t) : e, o = r.length - 1, a; o >= 0; o--)
    (a = r[o]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && Mt(e, t, s), s;
};
const Nt = Object.keys(J), Pt = ["body_composition", "nutrition"], be = {
  en: {
    title: "Title",
    subtitle: "Subtitle",
    days: "History (days)",
    columns: "Columns",
    tiles: "Show metrics as tiles",
    layout: "Layout",
    layout_grid: "Grid",
    layout_carousel: "Carousel (scrollable)",
    background: "Card background",
    flush: "Edge to edge (no outer padding)",
    card_style: "Style",
    style_default: "HA default",
    style_withings: "Withings",
    style_glass: "Liquid Glass",
    style_material: "Material You",
    style_bubble: "Bubble",
    style_mirror: "Magic Mirror",
    sec_display: "Appearance",
    sec_goal: "Goal & progress",
    sec_behavior: "Behavior & data",
    sec_phases: "Sleep phases",
    goal_type: "Goal direction",
    gt_atleast: "Reach at least",
    gt_atmost: "Stay at/below (e.g. lose weight)",
    goal_entity: "Goal sensor (overrides number)",
    start: "Start value (number)",
    start_entity: "Start sensor (overrides number)",
    tap_action: "Tap action",
    ta_popup: "Popup (detail view)",
    "ta_more-info": "More-info (HA dialog)",
    ta_link: "Link",
    ta_none: "Nothing",
    link: "Link (path or URL)",
    max: "Maximum (score)",
    phase_deep: "Deep sleep entity",
    phase_light: "Light sleep entity",
    phase_rem: "REM sleep entity",
    phase_awake: "Awake entity",
    type: "Type",
    entity: "Entity",
    entity2: "Second entity (e.g. diastolic)",
    entities: "Entities (multiple series)",
    secondary: "Extra entities (info line)",
    name: "Name",
    icon: "Icon",
    color: "Color",
    unit: "Unit",
    graph: "Chart",
    goal: "Goal (number)",
    precision: "Decimals",
    aggregate: "Aggregation",
    trend: "Trend",
    label: "Text instead of value",
    add_metric: "Add metric",
    graph_line: "Line",
    graph_bar: "Bars",
    graph_progress: "Progress",
    graph_none: "None",
    agg_mean: "Average",
    agg_min: "Minimum",
    agg_max: "Maximum",
    agg_sum: "Sum",
    agg_last: "Last value",
    trend_up_good: "Rising is good",
    trend_down_good: "Falling is good",
    trend_neutral: "Neutral",
    trend_none: "Hide"
  },
  de: {
    title: "Titel",
    subtitle: "Untertitel",
    days: "Verlauf (Tage)",
    columns: "Spalten",
    tiles: "Metriken als Kacheln anzeigen",
    layout: "Layout",
    layout_grid: "Raster",
    layout_carousel: "Slideshow (scrollbar)",
    background: "Kartenhintergrund",
    flush: "Randlos (kein Außenabstand)",
    card_style: "Stil",
    style_default: "HA-Standard",
    style_withings: "Withings",
    style_glass: "Liquid Glass",
    style_material: "Material You",
    style_bubble: "Bubble",
    style_mirror: "Magic Mirror",
    sec_display: "Darstellung",
    sec_goal: "Ziel & Fortschritt",
    sec_behavior: "Verhalten & Daten",
    sec_phases: "Schlafphasen",
    goal_type: "Zielrichtung",
    gt_atleast: "Mindestens erreichen",
    gt_atmost: "Höchstens (z. B. abnehmen)",
    goal_entity: "Ziel-Sensor (hat Vorrang)",
    start: "Startwert (Zahl)",
    start_entity: "Start-Sensor (hat Vorrang)",
    tap_action: "Klick-Aktion",
    ta_popup: "Popup (Detailansicht)",
    "ta_more-info": "More-Info (HA-Dialog)",
    ta_link: "Link",
    ta_none: "Nichts",
    link: "Link (Pfad oder URL)",
    max: "Maximum (Score)",
    phase_deep: "Tiefschlaf-Entität",
    phase_light: "Leichtschlaf-Entität",
    phase_rem: "REM-Schlaf-Entität",
    phase_awake: "Wachphasen-Entität",
    type: "Typ",
    entity: "Entität",
    entity2: "Zweite Entität (z. B. diastolisch)",
    entities: "Entitäten (mehrere Serien)",
    secondary: "Zusatz-Entitäten (Infozeile)",
    name: "Name",
    icon: "Icon",
    color: "Farbe",
    unit: "Einheit",
    graph: "Diagramm",
    goal: "Ziel (Zahl)",
    precision: "Nachkommastellen",
    aggregate: "Aggregation",
    trend: "Trend",
    label: "Text statt Wert",
    add_metric: "Metrik hinzufügen",
    graph_line: "Linie",
    graph_bar: "Balken",
    graph_progress: "Fortschritt",
    graph_none: "Kein",
    agg_mean: "Mittelwert",
    agg_min: "Minimum",
    agg_max: "Maximum",
    agg_sum: "Summe",
    agg_last: "Letzter Wert",
    trend_up_good: "Steigen ist gut",
    trend_down_good: "Fallen ist gut",
    trend_neutral: "Neutral",
    trend_none: "Ausblenden"
  }
};
let U = class extends D {
  constructor() {
    super(...arguments), this._expanded = -1;
  }
  setConfig(r) {
    this._config = r;
  }
  _label(r) {
    return (be[ee(this.hass)] ?? be.en)[r] ?? be.en[r] ?? r;
  }
  _topSchema() {
    return [
      { name: "title", selector: { text: {} } },
      { name: "subtitle", selector: { text: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "days", selector: { number: { min: 1, max: 60, mode: "box" } } },
          { name: "columns", selector: { number: { min: 1, max: 3, mode: "box" } } },
          {
            name: "layout",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "grid", label: this._label("layout_grid") },
                  { value: "carousel", label: this._label("layout_carousel") }
                ]
              }
            }
          },
          {
            name: "card_style",
            selector: {
              select: {
                mode: "dropdown",
                options: ["default", "withings", "glass", "material", "bubble", "mirror"].map(
                  (r) => ({ value: r, label: this._label(`style_${r}`) })
                )
              }
            }
          }
        ]
      },
      { name: "tiles", selector: { boolean: {} } },
      { name: "background", selector: { boolean: {} } },
      { name: "flush", selector: { boolean: {} } }
    ];
  }
  _metricSchema(r) {
    const e = r.type ?? "custom", t = (o, a) => o.map((n) => ({ value: n, label: this._label(`${a}_${n}`) })), i = !r.entities || r.entities.every((o) => typeof o == "string"), s = (o, a, n) => ({
      type: "expandable",
      name: "",
      flatten: !0,
      title: this._label(o),
      icon: a,
      schema: n
    });
    return [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "type",
            selector: {
              select: {
                mode: "dropdown",
                options: Nt.map((o) => ({ value: o, label: f(this.hass, o) }))
              }
            }
          },
          { name: "name", selector: { text: {} } }
        ]
      },
      { name: "entity", selector: { entity: {} } },
      ...e === "blood_pressure" ? [{ name: "entity2", selector: { entity: {} } }] : [],
      ...Pt.includes(e) && i ? [{ name: "entities", selector: { entity: { multiple: !0 } } }] : [],
      s("sec_display", "mdi:palette-outline", [
        {
          type: "grid",
          name: "",
          schema: [
            { name: "icon", selector: { icon: {} } },
            {
              name: "color",
              selector: {
                select: {
                  mode: "dropdown",
                  custom_value: !0,
                  options: yt.map((o) => ({ value: o, label: o }))
                }
              }
            },
            { name: "unit", selector: { text: {} } },
            {
              name: "graph",
              selector: {
                select: {
                  mode: "dropdown",
                  options: t(["line", "bar", "progress", "none"], "graph")
                }
              }
            },
            { name: "days", selector: { number: { min: 1, max: 60, mode: "box" } } },
            {
              name: "precision",
              selector: { number: { min: 0, max: 3, mode: "box" } }
            }
          ]
        },
        { name: "label", selector: { text: {} } }
      ]),
      s("sec_goal", "mdi:flag-checkered", [
        {
          type: "grid",
          name: "",
          schema: [
            { name: "goal", selector: { number: { mode: "box", step: "any" } } },
            { name: "goal_entity", selector: { entity: {} } },
            { name: "start", selector: { number: { mode: "box", step: "any" } } },
            { name: "start_entity", selector: { entity: {} } },
            {
              name: "goal_type",
              selector: {
                select: {
                  mode: "dropdown",
                  options: t(["atleast", "atmost"], "gt")
                }
              }
            },
            ...e === "score" ? [{ name: "max", selector: { number: { min: 1, mode: "box" } } }] : []
          ]
        }
      ]),
      s("sec_behavior", "mdi:gesture-tap", [
        {
          type: "grid",
          name: "",
          schema: [
            {
              name: "tap_action",
              selector: {
                select: {
                  mode: "dropdown",
                  options: t(["popup", "more-info", "link", "none"], "ta")
                }
              }
            },
            ...r.tap_action === "link" ? [{ name: "link", selector: { text: {} } }] : [],
            {
              name: "aggregate",
              selector: {
                select: {
                  mode: "dropdown",
                  options: t(["mean", "min", "max", "sum", "last"], "agg")
                }
              }
            },
            {
              name: "trend",
              selector: {
                select: {
                  mode: "dropdown",
                  options: t(["up_good", "down_good", "neutral", "none"], "trend")
                }
              }
            }
          ]
        },
        { name: "secondary", selector: { entity: { multiple: !0 } } }
      ]),
      ...e === "sleep" ? [
        s("sec_phases", "mdi:sleep", [
          {
            type: "grid",
            name: "",
            schema: [
              { name: "phases_deep", selector: { entity: {} } },
              { name: "phases_light", selector: { entity: {} } },
              { name: "phases_rem", selector: { entity: {} } },
              { name: "phases_awake", selector: { entity: {} } }
            ]
          }
        ])
      ] : []
    ];
  }
  render() {
    return !this.hass || !this._config ? p : u`
      <ha-form
        .hass=${this.hass}
        .data=${{
      tiles: !0,
      background: !0,
      layout: "grid",
      card_style: "withings",
      ...this._config
    }}
        .schema=${this._topSchema()}
        .computeLabel=${(r) => this._label(r.name)}
        @value-changed=${this._topChanged}
      ></ha-form>

      <div class="metrics">
        ${this._config.metrics.map((r, e) => this._renderMetricEditor(r, e))}
      </div>

      <button class="add" @click=${this._addMetric}>
        <ha-icon icon="mdi:plus"></ha-icon>
        ${this._label("add_metric")}
      </button>
    `;
  }
  _renderMetricEditor(r, e) {
    var a, n, c, l;
    const t = r.type ?? "custom", i = J[t] ?? J.custom, s = this._expanded === e, o = this._config.metrics.length;
    return u`
      <div class="metric ${s ? "open" : ""}">
        <div class="metric-head" @click=${() => this._expanded = s ? -1 : e}>
          <span
            class="chip"
            style="--c:${R(r.color) ?? R(i.color)}"
          >
            <ha-icon .icon=${r.icon ?? i.icon}></ha-icon>
          </span>
          <span class="metric-title">
            ${r.name ?? f(this.hass, t)}
            <span class="metric-entity">${r.entity ?? ""}</span>
          </span>
          <button
            class="icon-btn"
            .disabled=${e === 0}
            title="↑"
            @click=${(h) => this._move(h, e, -1)}
          >
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </button>
          <button
            class="icon-btn"
            .disabled=${e === o - 1}
            title="↓"
            @click=${(h) => this._move(h, e, 1)}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <button class="icon-btn danger" @click=${(h) => this._remove(h, e)}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
          <ha-icon
            class="expand"
            icon=${s ? "mdi:chevron-up" : "mdi:chevron-down"}
          ></ha-icon>
        </div>
        ${s ? u`<div class="metric-body">
              <ha-form
                .hass=${this.hass}
                .data=${{
      ...r,
      goal: typeof r.goal == "number" ? r.goal : void 0,
      goal_entity: typeof r.goal == "string" ? r.goal : void 0,
      start: typeof r.start == "number" ? r.start : void 0,
      start_entity: typeof r.start == "string" ? r.start : void 0,
      phases_deep: (a = r.phases) == null ? void 0 : a.deep,
      phases_light: (n = r.phases) == null ? void 0 : n.light,
      phases_rem: (c = r.phases) == null ? void 0 : c.rem,
      phases_awake: (l = r.phases) == null ? void 0 : l.awake
    }}
                .schema=${this._metricSchema(r)}
                .computeLabel=${(h) => this._label(h.name)}
                @value-changed=${(h) => this._metricChanged(h, e)}
              ></ha-form>
            </div>` : p}
      </div>
    `;
  }
  _emit(r) {
    this._config = r, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _clean(r) {
    const e = {};
    for (const [t, i] of Object.entries(r))
      i === "" || i === null || i === void 0 || Array.isArray(i) && !i.length || (e[t] = i);
    return e;
  }
  _topChanged(r) {
    if (r.stopPropagation(), !this._config) return;
    const e = r.detail.value;
    this._emit(this._clean({ ...this._config, ...e, metrics: this._config.metrics }));
  }
  _metricChanged(r, e) {
    if (r.stopPropagation(), !this._config) return;
    const t = { ...r.detail.value }, i = {};
    for (const o of ["deep", "light", "rem", "awake"]) {
      const a = t[`phases_${o}`];
      delete t[`phases_${o}`], typeof a == "string" && a && (i[o] = a);
    }
    Object.keys(i).length ? t.phases = i : delete t.phases;
    for (const o of ["goal", "start"]) {
      const a = t[`${o}_entity`];
      delete t[`${o}_entity`], typeof a == "string" && a && (t[o] = a);
    }
    const s = [...this._config.metrics];
    s[e] = this._clean(t), this._emit({ ...this._config, metrics: s });
  }
  _addMetric() {
    if (!this._config) return;
    const r = [...this._config.metrics, { type: "weight" }];
    this._expanded = r.length - 1, this._emit({ ...this._config, metrics: r });
  }
  _remove(r, e) {
    if (r.stopPropagation(), !this._config) return;
    const t = this._config.metrics.filter((i, s) => s !== e);
    this._expanded === e && (this._expanded = -1), this._emit({ ...this._config, metrics: t });
  }
  _move(r, e, t) {
    if (r.stopPropagation(), !this._config) return;
    const i = [...this._config.metrics], s = e + t;
    s < 0 || s >= i.length || ([i[e], i[s]] = [i[s], i[e]], this._expanded === e && (this._expanded = s), this._emit({ ...this._config, metrics: i }));
  }
};
U.styles = Ge`
    .metrics {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
    }
    .metric {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .metric:hover {
      border-color: color-mix(in srgb, var(--primary-color) 50%, var(--divider-color));
    }
    .metric.open {
      border-color: var(--primary-color);
      box-shadow: 0 2px 12px color-mix(in srgb, var(--primary-color) 12%, transparent);
    }
    .metric-head {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .chip {
      width: 30px;
      height: 30px;
      flex: none;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--c, var(--primary-color));
      background: color-mix(in srgb, var(--c, var(--primary-color)) 15%, transparent);
    }
    .chip ha-icon {
      --mdc-icon-size: 17px;
    }
    .metric-title {
      flex: 1;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .metric-entity {
      color: var(--secondary-text-color);
      font-size: 12px;
      margin-left: 6px;
    }
    .metric-body {
      padding: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .icon-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      color: var(--secondary-text-color);
      display: flex;
      border-radius: 6px;
    }
    .icon-btn:hover {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .icon-btn[disabled] {
      opacity: 0.3;
      cursor: default;
    }
    .icon-btn.danger:hover {
      color: var(--error-color, #db4437);
    }
    .icon-btn ha-icon {
      --mdc-icon-size: 18px;
    }
    .expand {
      color: var(--secondary-text-color);
    }
    .add {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    }
    .add ha-icon {
      --mdc-icon-size: 18px;
    }
  `;
ne([
  we({ attribute: !1 })
], U.prototype, "hass", 2);
ne([
  Q()
], U.prototype, "_config", 2);
ne([
  Q()
], U.prototype, "_expanded", 2);
U = ne([
  Je("health-card-editor")
], U);
var Tt = Object.defineProperty, Ft = Object.getOwnPropertyDescriptor, te = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Ft(e, t) : e, o = r.length - 1, a; o >= 0; o--)
    (a = r[o]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && Tt(e, t, s), s;
};
const Ot = "0.3.0", Rt = 5 * 60 * 1e3, Dt = 15 * 60 * 1e3, Ht = ["default", "withings", "glass", "material", "bubble", "mirror"];
let N = class extends D {
  constructor() {
    super(...arguments), this._history = {}, this._popup = null, this._onKeydown = (r) => {
      r.key === "Escape" && this._popup !== null && (this._popup = null);
    }, this._fetching = !1, this._cfgSig = "", this._stateSig = "", this._lastFetch = 0;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKeydown);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKeydown), super.disconnectedCallback();
  }
  static getConfigElement() {
    return document.createElement("health-card-editor");
  }
  static getStubConfig(r) {
    const e = (o) => {
      var a;
      return (a = Object.values(r.states).find(
        (n) => n.entity_id.startsWith("sensor.") && n.attributes.device_class === o
      )) == null ? void 0 : a.entity_id;
    }, t = [], i = e("weight");
    i && t.push({ type: "weight", entity: i });
    const s = e("temperature");
    return s && t.push({ type: "temperature", entity: s }), t.length || t.push({ type: "weight", entity: "" }), { title: "Gesundheit", metrics: t };
  }
  setConfig(r) {
    if (!r || !Array.isArray(r.metrics) || !r.metrics.length)
      throw new Error("Please define at least one metric (metrics: [...])");
    this._config = r;
  }
  getCardSize() {
    var e, t;
    return 1 + Math.ceil(
      (((e = this._config) == null ? void 0 : e.metrics.length) ?? 1) / (((t = this._config) == null ? void 0 : t.columns) ?? 1)
    ) * 2;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  updated(r) {
    super.updated(r), (r.has("hass") || r.has("_config")) && this._maybeFetch();
  }
  _watchedEntities() {
    var e;
    const r = /* @__PURE__ */ new Set();
    for (const t of ((e = this._config) == null ? void 0 : e.metrics) ?? []) {
      for (const i of this._series(t)) i.entity && r.add(i.entity);
      for (const i of t.secondary ?? []) r.add(i);
      for (const i of Object.values(t.phases ?? {})) i && r.add(i);
    }
    return [...r].filter((t) => {
      var i;
      return (i = this.hass) == null ? void 0 : i.states[t];
    });
  }
  /** Goal can be a plain number, a numeric string or an entity id. */
  _resolveGoal(r) {
    if (typeof r == "number") return r;
    if (typeof r != "string" || !r) return NaN;
    const e = this.hass.states[r];
    return parseFloat(e ? e.state : r);
  }
  _handleTap(r, e, t) {
    const i = r.tap_action ?? "popup";
    if (i !== "none") {
      if (i === "link") {
        if (!r.link) return;
        if (/^https?:\/\//.test(r.link)) {
          window.open(r.link, "_blank", "noopener");
          return;
        }
        history.pushState(null, "", r.link), this.dispatchEvent(
          new Event("location-changed", { bubbles: !0, composed: !0 })
        );
        return;
      }
      if (i === "more-info") {
        this._moreInfo(t);
        return;
      }
      this._popup = e;
    }
  }
  _maybeFetch() {
    if (!this.hass || !this._config || this._fetching) return;
    const r = this._watchedEntities();
    if (!r.length) return;
    const e = Math.max(
      ...this._config.metrics.map((a) => a.days ?? this._config.days ?? 7)
    ), t = `${e}|${r.join(",")}`, i = r.map((a) => {
      var n;
      return ((n = this.hass.states[a]) == null ? void 0 : n.last_updated) ?? "";
    }).join("|"), s = Date.now();
    (t !== this._cfgSig || s - this._lastFetch > Dt || i !== this._stateSig && s - this._lastFetch > Rt) && (this._fetching = !0, this._cfgSig = t, this._stateSig = i, vt(this.hass, r, e).then((a) => {
      this._history = a, this._lastFetch = Date.now();
    }).catch((a) => console.warn("health-card: history fetch failed", a)).finally(() => {
      this._fetching = !1;
    }));
  }
  _series(r) {
    var t;
    if ((t = r.entities) != null && t.length)
      return r.entities.map((i) => typeof i == "string" ? { entity: i } : i);
    const e = [];
    return r.entity && e.push({ entity: r.entity }), r.entity2 && e.push({ entity: r.entity2 }), e;
  }
  _numeric(r, e) {
    if (!r) return NaN;
    const t = e ? r.attributes[e] : r.state;
    return typeof t == "number" ? t : parseFloat(t);
  }
  _moreInfo(r) {
    r && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _cardStyle() {
    var e;
    const r = ((e = this._config) == null ? void 0 : e.card_style) ?? "withings";
    return Ht.includes(r) ? r : "withings";
  }
  render() {
    if (!this.hass || !this._config) return p;
    const r = this._config, t = [
      "cardroot",
      `s-${this._cardStyle()}`,
      r.tiles === !1 ? "flat" : "tiles",
      r.flush ? "flush" : ""
    ].join(" "), i = u`
      ${r.title ? u`<div class="header">
            <div class="title">${r.title}</div>
            ${r.subtitle ? u`<div class="subtitle">${r.subtitle}</div>` : p}
          </div>` : p}
      <div
        class="metrics ${r.layout === "carousel" ? "carousel" : ""}"
        style="--hc-columns:${r.columns ?? 1}"
      >
        ${r.metrics.map((s, o) => this._renderMetric(s, o))}
      </div>
    `;
    return u`
      ${r.background === !1 ? u`<div class="${t} nobg">${i}</div>` : u`<ha-card class=${t}>${i}</ha-card>`}
      ${this._renderPopup()}
    `;
  }
  /** Builds the shared render context for a metric (used by tile and popup). */
  _ctx(r) {
    var k, L, B;
    const e = r.type && J[r.type] ? r.type : "custom", t = J[e], i = R(r.color) ?? R(t.color), s = r.name ?? f(this.hass, e), o = r.icon ?? t.icon, a = Object.values(r.phases ?? {}).filter(Boolean);
    let n = this._series(r);
    !n.length && e === "sleep" && a.length && (n = [{ entity: a[0] }]);
    const c = (k = n[0]) != null && k.entity ? this.hass.states[n[0].entity] : void 0, l = Math.max(1, r.days ?? ((L = this._config) == null ? void 0 : L.days) ?? 7), h = r.graph ?? t.graph, d = r.aggregate ?? t.aggregate, g = r.trend ?? t.trend, m = r.precision ?? t.precision, y = r.unit ?? ((B = n[0]) == null ? void 0 : B.unit) ?? (c == null ? void 0 : c.attributes.unit_of_measurement) ?? t.unit ?? "", P = n.map((S, T) => {
      const j = Ue(this._history[S.entity] ?? [], l, d);
      return {
        ...S,
        colorResolved: R(S.color) ?? (T === 0 ? i : R(He[(T - 1) % He.length])),
        buckets: j,
        filled: Le(j)
      };
    });
    let w;
    if (e === "sleep" && !r.entity && r.phases && P.length) {
      const S = ["deep", "light", "rem"].map((T) => r.phases[T]).filter(Boolean);
      if (S.length) {
        const T = S.map(
          (F) => Ue(this._history[F] ?? [], l, d)
        ), j = Array.from({ length: l }, (F, ce) => {
          const Se = T.map((le) => le[ce]).filter(Number.isFinite);
          return Se.length ? Se.reduce((le, Xe) => le + Xe, 0) : NaN;
        });
        P[0] = { ...P[0], buckets: j, filled: Le(j) };
        const ke = S.map((F) => this._numeric(this.hass.states[F])).filter(Number.isFinite);
        ke.length && (w = ke.reduce((F, ce) => F + ce, 0));
      }
    }
    return {
      m: r,
      type: e,
      preset: t,
      accent: i,
      name: s,
      icon: o,
      series: n,
      primaryState: c,
      days: l,
      graph: h,
      aggregate: d,
      trendMode: g,
      precision: m,
      unit: y,
      data: P,
      valueOverride: w,
      goalType: r.goal_type ?? t.goalType ?? "atleast",
      multi: !!r.entities && n.length > 1
    };
  }
  _renderMetric(r, e) {
    var n, c;
    const t = this._ctx(r);
    if (!t.series.length || !t.primaryState)
      return u`
        <div class="metric" style="--hc-accent:${t.accent}">
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
            <div class="name">${t.name}</div>
          </div>
          <div class="missing">
            ${(n = t.series[0]) != null && n.entity ? u`${f(this.hass, "entity_missing")}: ${t.series[0].entity}` : f(this.hass, "no_data")}
          </div>
        </div>
      `;
    if (t.type === "score") return this._renderScore(t, e);
    const i = !t.multi || !!r.label, s = t.multi && t.graph !== "progress", o = !t.multi, a = t.multi && t.graph === "progress";
    return u`
      <div
        class="metric ${(r.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${t.accent}"
        @click=${() => this._handleTap(r, e, t.series[0].entity)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
          <div class="name">${t.name}</div>
          <div class="time">
            ${me(this.hass, t.primaryState.last_updated)}
          </div>
        </div>
        <div class="body ${a ? "stack" : ""}">
          ${i || s || o || (c = r.secondary) != null && c.length ? u`<div class="info">
                ${i ? this._renderValue(
      r,
      t.type,
      t.data,
      t.primaryState,
      t.unit,
      t.precision,
      t.preset.duration,
      t.valueOverride
    ) : p}
                ${s ? this._renderSeriesChips(t.data, t.precision, t.trendMode) : p}
                ${this._renderSecondary(r)}
                ${o ? this._renderStatus(
      r,
      t.data[0],
      t.primaryState,
      t.unit,
      t.precision,
      t.trendMode,
      t.goalType,
      t.valueOverride
    ) : p}
              </div>` : p}
          <div class="chartcell">
            ${this._renderChart(r, t.graph, t.data, t.unit, t.precision)}
          </div>
        </div>
        ${t.type === "sleep" && r.phases ? this._renderSleepPhases(r) : p}
      </div>
    `;
  }
  _renderScore(r, e) {
    const t = r.m, i = r.primaryState, s = this._numeric(i, t.attribute), o = t.max ?? 100;
    return u`
      <div
        class="metric score-metric ${(t.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${r.accent}"
        @click=${() => this._handleTap(t, e, i.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${r.icon}></ha-icon></div>
          <div class="name">${r.name}</div>
          <div class="time">
            ${me(this.hass, i.last_updated)}
          </div>
        </div>
        <div class="scorewrap">
          ${Et(this._cardStyle(), r.accent, this._scoreColor(s, o), Math.max(0, Math.min(Number.isFinite(s) ? s / o : 0, 1)))}
          <div class="scoreinner">
            <div class="scorenum">${_(this.hass, s, t.precision ?? 0)}</div>
            <div class="scoremax">${f(this.hass, "of")} ${o}</div>
          </div>
        </div>
        <div class="score-status">
          ${this._renderStatus(t, r.data[0], i, "", 0, t.trend ?? "up_good", "atleast")}
        </div>
      </div>
    `;
  }
  /** Traffic-light color for score visuals, driven by the score ratio. */
  _scoreColor(r, e) {
    const t = Number.isFinite(r) ? r / e : 0;
    return t >= 0.75 ? "var(--success-color, #43a047)" : t >= 0.45 ? "var(--warning-color, #fb8c00)" : "var(--error-color, #e53935)";
  }
  /** Formats a value the same way the metric's big value is formatted. */
  _fmtMetricValue(r, e) {
    var t;
    if (r.m.duration ?? r.preset.duration) {
      const i = Object.values(r.m.phases ?? {}).map((o) => {
        var a;
        return o ? (a = this.hass.states[o]) == null ? void 0 : a.attributes.unit_of_measurement : void 0;
      }).find(Boolean), s = r.m.unit ?? (r.valueOverride !== void 0 ? i : (t = r.primaryState) == null ? void 0 : t.attributes.unit_of_measurement);
      return ge(e, s);
    }
    return re(_(this.hass, e, r.precision), r.unit);
  }
  _dayLabels(r) {
    if (r > 14) return p;
    const e = ee(this.hass) === "de" ? "de-DE" : "en-US", t = /* @__PURE__ */ new Date();
    t.setHours(0, 0, 0, 0);
    const i = Array.from(
      { length: r },
      (s, o) => new Date(t.getTime() - (r - 1 - o) * 864e5).toLocaleDateString(e, {
        weekday: r > 9 ? "narrow" : "short"
      })
    );
    return u`<div class="daylabels" style="--hc-days:${r}">
      ${i.map((s) => u`<span>${s}</span>`)}
    </div>`;
  }
  _renderPopup() {
    if (this._popup === null || !this._config) return p;
    const r = this._config.metrics[this._popup];
    if (!r) return p;
    const e = this._ctx(r);
    if (!e.primaryState) return p;
    const t = e.primaryState, i = e.data[0].buckets.filter(Number.isFinite), s = i.length ? {
      min: Math.min(...i),
      avg: i.reduce((n, c) => n + c, 0) / i.length,
      max: Math.max(...i)
    } : void 0, o = e.graph === "bar" || e.graph === "progress" ? "bar" : "line", a = u`
      ${e.graph === "progress" ? this._renderChart(r, "progress", e.data, e.unit, e.precision) : p}
      <div class="popup-chart">
        ${this._renderChart(r, o, e.data, e.unit, e.precision)}
        ${this._dayLabels(e.days)}
      </div>
    `;
    return u`
      <div class="backdrop s-${this._cardStyle()}" @click=${() => this._popup = null}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          style="--hc-accent:${e.accent}"
          @click=${(n) => n.stopPropagation()}
        >
          <div class="dialog-head">
            <div class="iconchip"><ha-icon .icon=${e.icon}></ha-icon></div>
            <div class="dialog-title">${e.name}</div>
            <button
              class="close"
              aria-label=${f(this.hass, "close")}
              @click=${() => this._popup = null}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-value">
            ${this._renderValue(
      r,
      e.type,
      e.data,
      t,
      e.unit,
      e.precision,
      e.preset.duration,
      e.valueOverride
    )}
            <div class="time">${me(this.hass, t.last_updated)}</div>
          </div>
          ${this._renderStatus(
      r,
      e.data[0],
      t,
      e.unit,
      e.precision,
      e.trendMode,
      e.goalType,
      e.valueOverride
    )}
          ${a}
          ${s ? u`<div class="stats">
                ${["min", "avg", "max"].map(
      (n) => u`<div class="stat">
                    <div class="stat-label">${f(this.hass, `stat_${n}`)}</div>
                    <div class="stat-value">${this._fmtMetricValue(e, s[n])}</div>
                  </div>`
    )}
              </div>` : p}
          ${e.multi ? this._renderSeriesChips(e.data, e.precision, e.trendMode) : p}
          ${e.type === "sleep" && r.phases ? this._renderSleepPhases(r) : p}
          ${this._renderSecondary(r)}
          <button
            class="openha"
            @click=${() => {
      var n;
      this._popup = null, this._moreInfo((n = e.series[0]) == null ? void 0 : n.entity);
    }}
          >
            <ha-icon icon="mdi:chart-box-outline"></ha-icon>
            ${f(this.hass, "open_ha")}
          </button>
        </div>
      </div>
    `;
  }
  _renderSleepPhases(r) {
    const e = {
      deep: "var(--deep-purple-color, #673AB7)",
      light: "var(--light-blue-color, #03A9F4)",
      rem: "var(--cyan-color, #00BCD4)",
      awake: "var(--amber-color, #FFC107)"
    }, t = ["deep", "light", "rem", "awake"].map((i) => {
      var n;
      const s = (n = r.phases) == null ? void 0 : n[i], o = s ? this.hass.states[s] : void 0, a = this._numeric(o);
      if (Number.isFinite(a))
        return { key: i, v: a, unit: o == null ? void 0 : o.attributes.unit_of_measurement, color: e[i] };
    }).filter((i) => !!i);
    return t.length ? u`
      <div class="segbar">
        ${t.map(
      (i) => u`<div class="seg" style="flex-grow:${i.v};background:${i.color}"></div>`
    )}
      </div>
      <div class="phases">
        ${t.map(
      (i) => u`<div class="phase">
            <span class="phasedot" style="background:${i.color}"></span>
            <span>${f(this.hass, `phase_${i.key}`)}</span>
            <span class="phaseval">${ge(i.v, i.unit)}</span>
          </div>`
    )}
      </div>
    ` : p;
  }
  _renderValue(r, e, t, i, s, o, a, n) {
    if (r.label) return u`<div class="value">${r.label}</div>`;
    if (e === "blood_pressure" && t.length >= 2) {
      const l = this._numeric(i, r.attribute), h = this._numeric(this.hass.states[t[1].entity]);
      return u`<div class="value">
          ${_(this.hass, l, 0)}/${_(this.hass, h, 0)}
          <span class="unit">${s}</span>
        </div>
        <div class="bplabels">
          <span class="bpitem">
            <span class="bpdot" style="background:${t[0].colorResolved}"></span>SYS
            ${_(this.hass, l, 0)}
          </span>
          <span class="bpitem">
            <span class="bpdot" style="background:${t[1].colorResolved}"></span>DIA
            ${_(this.hass, h, 0)}
          </span>
        </div>`;
    }
    const c = n ?? this._numeric(i, r.attribute);
    if (!Number.isFinite(c))
      return u`<div class="value">${i.state}</div>`;
    if (r.duration ?? a) {
      const l = Object.values(r.phases ?? {}).map((h) => {
        var d;
        return h ? (d = this.hass.states[h]) == null ? void 0 : d.attributes.unit_of_measurement : void 0;
      }).find(Boolean);
      return u`<div class="value">
        ${ge(
        c,
        r.unit ?? (n !== void 0 ? l : i.attributes.unit_of_measurement)
      )}
      </div>`;
    }
    return u`<div class="value">
      ${_(this.hass, c, o)}<span class="unit">${s}</span>
    </div>`;
  }
  _renderSeriesChips(r, e, t) {
    return u`<div class="serieslist">
      ${r.map((i) => {
      const s = this.hass.states[i.entity], o = this._numeric(s), a = i.unit ?? (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "", n = i.name ?? (s == null ? void 0 : s.attributes.friendly_name) ?? i.entity, c = Be(i.filled), l = Number.isFinite(c) ? c > 0 ? "mdi:arrow-top-right" : c < 0 ? "mdi:arrow-bottom-right" : "mdi:arrow-right" : "mdi:minus";
      return u`<div class="serieschip">
          ${t !== "none" ? u`<span class="dotarrow" style="background:${i.colorResolved}">
                <ha-icon .icon=${l}></ha-icon>
              </span>` : p}
          <span class="serieslabel">
            ${n}: ${Number.isFinite(o) ? re(_(this.hass, o, e), a) : (s == null ? void 0 : s.state) ?? "–"}
          </span>
        </div>`;
    })}
    </div>`;
  }
  _renderSecondary(r) {
    var t;
    if (!((t = r.secondary) != null && t.length)) return p;
    const e = r.secondary.map((i) => {
      const s = this.hass.states[i];
      if (!s) return;
      const o = this._numeric(s), a = s.attributes.unit_of_measurement ?? "";
      return Number.isFinite(o) ? re(_(this.hass, o), a) : s.state;
    }).filter(Boolean);
    return e.length ? u`<div class="secondary">${e.join(" • ")}</div>` : p;
  }
  _renderStatus(r, e, t, i, s, o, a = "atleast", n) {
    const c = n ?? this._numeric(t, r.attribute), l = this._resolveGoal(r.goal);
    if (Number.isFinite(l) && Number.isFinite(c)) {
      const w = this._resolveGoal(r.start);
      let k = NaN;
      if (Number.isFinite(w) && w !== l ? k = (w - c) / (w - l) * 100 : l > 0 && (k = a === "atmost" ? l / c * 100 : c / l * 100), !Number.isNaN(k)) {
        const L = Math.round(Math.min(Math.max(k, 0), 999)), B = L >= 100;
        return u`<div class="status ${B ? "good" : ""}">
          <ha-icon .icon=${B ? "mdi:check-circle" : "mdi:flag-outline"}></ha-icon>
          <span>${f(this.hass, "goal")}: ${L} %</span>
        </div>`;
      }
    }
    if (o === "none") return p;
    const h = Be(e.filled);
    if (!Number.isFinite(h)) return p;
    const d = e.filled.find(Number.isFinite) ?? 0, g = Math.abs(h) < Math.max(Math.abs(d) * 5e-3, 1e-9), m = g || o === "neutral" ? "neutral" : h > 0 == (o === "up_good") ? "good" : "bad", y = g ? "mdi:arrow-right" : h > 0 ? "mdi:arrow-top-right" : "mdi:arrow-bottom-right", P = g ? f(this.hass, "stable") : `${_(this.hass, Math.abs(h), s)}${i ? ` ${i}` : ""}`;
    return u`<div class="status ${m}">
      <span class="dotarrow"><ha-icon .icon=${y}></ha-icon></span>
      <span>${P}</span>
    </div>`;
  }
  _renderChart(r, e, t, i, s) {
    if (e === "line")
      return u`${$t(
        t.map((o) => ({ values: o.filled, color: o.colorResolved }))
      )}`;
    if (e === "bar") {
      const o = this._resolveGoal(r.goal);
      return u`${wt(
        t[0].buckets,
        t[0].colorResolved,
        Number.isFinite(o) ? o : void 0
      )}`;
    }
    if (e === "progress") {
      const o = t.map((a) => {
        const n = this.hass.states[a.entity], c = this._numeric(n), l = this._resolveGoal(a.goal ?? r.goal);
        if (!Number.isFinite(c) || !Number.isFinite(l) || l <= 0) return p;
        const h = Math.max(0, Math.min(c / l * 100, 100)), d = a.unit ?? (n == null ? void 0 : n.attributes.unit_of_measurement) ?? i;
        return u`<div class="pbar">
          ${t.length > 1 ? u`<div class="pbar-label">
                <span>${a.name ?? (n == null ? void 0 : n.attributes.friendly_name) ?? a.entity}</span>
                <span>${re(_(this.hass, c, s), d)}</span>
              </div>` : p}
          <div class="ptrack" style="--hc-p:${a.colorResolved}">
            <div class="pfill" style="width:${h}%"></div>
          </div>
        </div>`;
      });
      return u`<div class="pbars">${o}</div>`;
    }
    return p;
  }
};
N.styles = Ge`
    :host {
      --hc-card-bg: var(--ha-card-background, var(--card-background-color, #fff));
      --hc-tile-bg: color-mix(in srgb, var(--primary-text-color) 4%, var(--hc-card-bg));
      --hc-dot-fill: var(--hc-tile-bg);
    }
    .cardroot {
      display: block;
      padding: 16px;
    }
    .cardroot.flat {
      --hc-tile-bg: transparent;
      --hc-dot-fill: var(--hc-card-bg);
    }
    .cardroot.nobg {
      background: none;
      box-shadow: none;
      border: none;
    }
    .cardroot.flush {
      padding: 0;
    }
    .cardroot.flush .header {
      padding: 0 0 14px 0;
    }

    /* ---- card styles ---------------------------------------------------
       .s-* rules use plain descendant selectors so they style both the card
       tiles and the detail popup (the backdrop carries the same class). */

    /* default: plain HA look following the active theme */
    .s-default {
      --hc-tile-bg: var(
        --secondary-background-color,
        color-mix(in srgb, var(--primary-text-color) 5%, var(--hc-card-bg))
      );
      --hc-dot-fill: var(--secondary-background-color, var(--hc-card-bg));
      --hc-tile-radius: var(--ha-card-border-radius, 12px);
    }
    /* withings: soft tinted tiles (base tokens, nothing extra needed) */

    /* liquid glass: translucent, blurred, specular top edge */
    .s-glass {
      --hc-tile-bg: color-mix(in srgb, var(--hc-card-bg) 42%, transparent);
      --hc-dot-fill: var(--hc-card-bg);
      --hc-tile-radius: 22px;
    }
    ha-card.cardroot.s-glass {
      background: color-mix(in srgb, var(--hc-card-bg) 55%, transparent);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      backdrop-filter: blur(18px) saturate(1.5);
    }
    .s-glass .metric {
      border: 1px solid color-mix(in srgb, var(--primary-text-color) 12%, transparent);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, #fff 25%, transparent),
        0 8px 24px color-mix(in srgb, #000 10%, transparent);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      backdrop-filter: blur(18px) saturate(1.5);
    }
    .s-glass .iconchip {
      background: color-mix(in srgb, var(--hc-accent) 24%, transparent);
      border: 1px solid color-mix(in srgb, #fff 30%, transparent);
      box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 40%, transparent);
      -webkit-backdrop-filter: blur(10px) saturate(1.4);
      backdrop-filter: blur(10px) saturate(1.4);
    }
    .s-glass .scorewrap::before {
      content: '';
      grid-area: 1 / 1;
      place-self: center;
      width: 58%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: color-mix(in srgb, var(--hc-card-bg) 45%, transparent);
      border: 1px solid color-mix(in srgb, #fff 28%, transparent);
      box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 35%, transparent);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }
    .s-glass .dialog {
      background: color-mix(in srgb, var(--hc-card-bg) 55%, transparent);
      -webkit-backdrop-filter: blur(26px) saturate(1.5);
      backdrop-filter: blur(26px) saturate(1.5);
      border: 1px solid color-mix(in srgb, #fff 25%, transparent);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent),
        0 12px 48px rgba(0, 0, 0, 0.35);
    }

    /* material you: per-metric tonal tiles, filled icon, top-left color orb */
    .s-material {
      --hc-tile-radius: 24px;
    }
    ha-card.cardroot.s-material {
      border-radius: 28px;
    }
    .s-material .metric {
      position: relative;
      overflow: hidden;
      background: color-mix(in srgb, var(--hc-accent) 12%, var(--hc-card-bg));
      --hc-dot-fill: color-mix(in srgb, var(--hc-accent) 12%, var(--hc-card-bg));
    }
    .s-material .metric::before {
      content: '';
      position: absolute;
      top: -70px;
      left: -70px;
      width: 190px;
      height: 190px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--hc-accent) 22%, transparent);
      pointer-events: none;
    }
    .s-material .metric > * {
      position: relative;
    }
    .s-material .iconchip {
      border-radius: 14px;
      background: var(--hc-accent);
      color: var(--hc-card-bg);
    }
    .s-material .value {
      letter-spacing: 0;
    }
    .s-material .dialog {
      border-radius: 28px;
      background:
        radial-gradient(
          circle at -30px -30px,
          color-mix(in srgb, var(--hc-accent) 24%, transparent) 0 130px,
          transparent 131px
        ),
        color-mix(in srgb, var(--hc-accent) 9%, var(--hc-card-bg));
      --hc-tile-bg: color-mix(in srgb, var(--hc-accent) 14%, var(--hc-card-bg));
      --hc-dot-fill: color-mix(in srgb, var(--hc-accent) 14%, var(--hc-card-bg));
    }
    .s-material .dialog .iconchip {
      background: var(--hc-accent);
      color: var(--hc-card-bg);
    }

    /* bubble: free-floating solid modules with big icon bubbles */
    .s-bubble {
      --hc-tile-bg: var(--hc-card-bg);
      --hc-dot-fill: var(--hc-card-bg);
      --hc-tile-radius: 32px;
    }
    ha-card.cardroot.s-bubble {
      background: none;
      box-shadow: none;
      border: none;
    }
    .s-bubble .metric {
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.08));
      padding: 12px 16px;
    }
    .s-bubble .iconchip {
      width: 42px;
      height: 42px;
      background: color-mix(in srgb, var(--hc-accent) 20%, transparent);
    }
    .s-bubble .iconchip ha-icon {
      --mdc-icon-size: 22px;
    }
    .s-bubble .name {
      font-weight: 700;
    }
    .s-bubble .dialog {
      border-radius: 32px;
    }

    /* magic mirror: pure black, high contrast, monochrome graphics */
    .s-mirror {
      --hc-tile-bg: #000;
      --hc-dot-fill: #000;
      --hc-tile-radius: 14px;
      color: #fff;
    }
    ha-card.cardroot.s-mirror {
      background: #000;
      box-shadow: none;
      border: none;
    }
    .s-mirror .metric {
      border: 1px solid rgba(255, 255, 255, 0.28);
    }
    .s-mirror .metric:hover {
      background: #0d0d0d;
    }
    .s-mirror .title,
    .s-mirror .name,
    .s-mirror .value,
    .s-mirror .scorenum,
    .s-mirror .dialog-title,
    .s-mirror .phaseval,
    .s-mirror .serieschip,
    .s-mirror .stat-value {
      color: #fff;
    }
    .s-mirror .subtitle,
    .s-mirror .time,
    .s-mirror .unit,
    .s-mirror .secondary,
    .s-mirror .scoremax,
    .s-mirror .stat-label,
    .s-mirror .phase,
    .s-mirror .pbar-label,
    .s-mirror .daylabels {
      color: rgba(255, 255, 255, 0.72);
    }
    .s-mirror .status {
      color: rgba(255, 255, 255, 0.85);
    }
    .s-mirror .iconchip {
      background: rgba(255, 255, 255, 0.14);
      color: #fff;
    }
    .s-mirror .chart,
    .s-mirror .segbar,
    .s-mirror .phasedot,
    .s-mirror .bpdot {
      filter: grayscale(1) brightness(1.75);
    }
    .s-mirror .serieschip .dotarrow {
      background: rgba(255, 255, 255, 0.2) !important;
    }
    .s-mirror .pfill {
      background: #fff;
    }
    .s-mirror .ptrack {
      background: rgba(255, 255, 255, 0.18);
    }
    .s-mirror .missing {
      color: rgba(255, 255, 255, 0.8);
    }
    .s-mirror .dialog {
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .s-mirror .popup-chart,
    .s-mirror .stat {
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .s-mirror .close {
      background: rgba(255, 255, 255, 0.16);
      color: #fff;
    }
    .s-mirror .openha {
      color: #fff;
    }
    .header {
      padding: 4px 4px 16px 4px;
    }
    .title {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--primary-text-color);
    }
    .subtitle {
      font-size: 14px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(var(--hc-columns, 1), minmax(0, 1fr));
      gap: 12px;
    }
    .cardroot.flat .metrics {
      gap: 4px;
    }
    .metrics.carousel {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }
    .metrics.carousel::-webkit-scrollbar {
      display: none;
    }
    .metrics.carousel > .metric {
      flex: 0 0 min(85%, 320px);
      scroll-snap-align: center;
    }
    .metric {
      background: var(--hc-tile-bg);
      border-radius: var(--hc-tile-radius, 16px);
      box-sizing: border-box;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .metric:hover {
      background: color-mix(in srgb, var(--primary-text-color) 7%, var(--hc-card-bg));
    }
    .metric.noclick {
      cursor: default;
    }
    .metric.noclick:hover {
      background: var(--hc-tile-bg);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .iconchip {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--hc-accent);
      background: color-mix(in srgb, var(--hc-accent) 14%, transparent);
    }
    .iconchip ha-icon {
      --mdc-icon-size: 18px;
    }
    .name {
      flex: 1;
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      font-size: 12px;
      color: var(--secondary-text-color);
      flex: none;
    }
    .body {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
      gap: 14px;
      align-items: center;
    }
    .body.stack {
      grid-template-columns: minmax(0, 1fr);
      gap: 8px;
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .value {
      font-size: 30px;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.5px;
      color: var(--primary-text-color);
    }
    .unit {
      font-size: 14px;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-left: 2px;
      letter-spacing: 0;
    }
    .secondary {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .status ha-icon {
      --mdc-icon-size: 16px;
    }
    .status.good {
      color: var(--success-color, #43a047);
    }
    .status.bad {
      color: var(--error-color, #db4437);
    }
    .status .dotarrow {
      background: color-mix(in srgb, currentColor 15%, transparent);
      color: inherit;
    }
    .dotarrow {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .dotarrow ha-icon {
      --mdc-icon-size: 12px;
    }
    .serieslist {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .serieschip {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 13px;
      color: var(--primary-text-color);
      min-width: 0;
    }
    .serieslabel {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chartcell {
      min-width: 0;
    }
    .chart {
      width: 100%;
      height: auto;
      display: block;
    }
    .pbars {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }
    .pbar-label {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 3px;
    }
    .ptrack {
      height: 8px;
      border-radius: 4px;
      background: color-mix(in srgb, var(--hc-p, var(--hc-accent)) 18%, transparent);
      overflow: hidden;
    }
    .pfill {
      height: 100%;
      border-radius: 4px;
      background: var(--hc-p, var(--hc-accent));
      transition: width 0.3s ease;
    }
    .missing {
      font-size: 13px;
      color: var(--error-color, #db4437);
      word-break: break-all;
    }
    .bplabels {
      display: flex;
      gap: 12px;
      margin-top: 2px;
    }
    .bpitem {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.6px;
      color: var(--secondary-text-color);
    }
    .bpdot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .segbar {
      display: flex;
      gap: 2px;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      margin-top: 2px;
    }
    .seg {
      min-width: 4px;
      border-radius: 2px;
    }
    .phases {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
      margin-top: 6px;
    }
    .phase {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .phasedot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .phaseval {
      color: var(--primary-text-color);
      font-weight: 600;
    }
    .scorewrap {
      display: grid;
      place-items: center;
      width: min(210px, 100%);
      margin: 0 auto;
    }
    .scorewrap > * {
      grid-area: 1 / 1;
    }
    .scorering {
      width: 100%;
      height: auto;
      display: block;
    }
    .scoreinner {
      text-align: center;
    }
    .scorenum {
      font-size: 46px;
      font-weight: 800;
      letter-spacing: -1px;
      line-height: 1;
      color: var(--primary-text-color);
    }
    .scoremax {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .score-status {
      display: flex;
      justify-content: center;
    }

    /* ---- detail popup -------------------------------------------------- */
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: hc-fadein 0.15s ease;
    }
    @keyframes hc-fadein {
      from {
        opacity: 0;
      }
    }
    .dialog {
      width: min(440px, 100%);
      max-height: 86vh;
      overflow-y: auto;
      box-sizing: border-box;
      background: var(--hc-card-bg);
      color: var(--primary-text-color);
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      gap: 12px;
      --hc-tile-bg: color-mix(in srgb, var(--primary-text-color) 4%, var(--hc-card-bg));
      --hc-dot-fill: var(--hc-card-bg);
    }
    .dialog-head {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dialog-title {
      flex: 1;
      font-size: 17px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .close {
      width: 32px;
      height: 32px;
      flex: none;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    }
    .close ha-icon {
      --mdc-icon-size: 18px;
    }
    .dialog-value {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .dialog-value .value {
      font-size: 36px;
    }
    .popup-chart {
      background: var(--hc-tile-bg);
      border-radius: 16px;
      padding: 12px 10px 8px;
    }
    .daylabels {
      display: grid;
      grid-template-columns: repeat(var(--hc-days, 7), 1fr);
      padding: 2px 2% 0;
      font-size: 10px;
      color: var(--secondary-text-color);
      text-align: center;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .stat {
      background: var(--hc-tile-bg);
      border-radius: 12px;
      padding: 8px 10px;
      text-align: center;
    }
    .stat-label {
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .stat-value {
      font-size: 14px;
      font-weight: 700;
    }
    .openha {
      align-self: center;
      display: flex;
      align-items: center;
      gap: 6px;
      border: none;
      background: none;
      color: var(--primary-color);
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      padding: 8px 14px;
      border-radius: 10px;
    }
    .openha:hover {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }
    .openha ha-icon {
      --mdc-icon-size: 16px;
    }
  `;
te([
  we({ attribute: !1 })
], N.prototype, "hass", 2);
te([
  Q()
], N.prototype, "_config", 2);
te([
  Q()
], N.prototype, "_history", 2);
te([
  Q()
], N.prototype, "_popup", 2);
N = te([
  Je("health-card")
], N);
console.info(
  `%c HEALTH-CARD %c v${Ot} `,
  "color: white; background: #6c5ce7; font-weight: 700; border-radius: 4px 0 0 4px; padding: 2px 6px;",
  "color: #6c5ce7; background: #f1effd; font-weight: 700; border-radius: 0 4px 4px 0; padding: 2px 6px;"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "health-card",
  name: "Health Card",
  description: "Withings-style health dashboard: weight, heart rate, blood pressure, body composition, activity, nutrition, sleep and more.",
  preview: !0,
  documentationURL: "https://github.com/BobMcGlobus/HealthCard"
});
export {
  N as HealthCard
};
