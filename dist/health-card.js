/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, at = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ct = Symbol(), bt = /* @__PURE__ */ new WeakMap();
let Dt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (at && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = bt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && bt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Wt = (i) => new Dt(typeof i == "string" ? i : i + "", void 0, ct), Ut = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new Dt(e, i, ct);
}, Vt = (i, t) => {
  if (at) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = W.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, vt = at ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Wt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Gt, defineProperty: qt, getOwnPropertyDescriptor: Kt, getOwnPropertyNames: Zt, getOwnPropertySymbols: Yt, getPrototypeOf: Jt } = Object, v = globalThis, xt = v.trustedTypes, Xt = xt ? xt.emptyScript : "", tt = v.reactiveElementPolyfillSupport, F = (i, t) => i, V = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Xt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, lt = (i, t) => !Gt(i, t), wt = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: lt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let C = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = wt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && qt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = Kt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const a = r == null ? void 0 : r.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(F("elementProperties"))) return;
    const t = Jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(F("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
      const e = this.properties, s = [...Zt(e), ...Yt(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(vt(r));
    } else t !== void 0 && e.push(vt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Vt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var o;
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : V).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = s.getPropertyOptions(r), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : V;
      this._$Em = r;
      const h = c.fromAttribute(e, a.type);
      this[r] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, o) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? lt)(o, e) || s.useDefault && s.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, n] of r) {
        const { wrapped: a } = n, c = this[o];
        a !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, n, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostUpdated) == null ? void 0 : r.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[F("elementProperties")] = /* @__PURE__ */ new Map(), C[F("finalized")] = /* @__PURE__ */ new Map(), tt == null || tt({ ReactiveElement: C }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, At = (i) => i, G = D.trustedTypes, Et = G ? G.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ht = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Rt = "?" + $, Qt = `<${Rt}>`, S = document, H = () => S.createComment(""), R = (i) => i === null || typeof i != "object" && typeof i != "function", ht = Array.isArray, te = (i) => ht(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", et = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, St = /-->/g, Ct = />/g, x = RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Mt = /'/g, Nt = /"/g, zt = /^(?:script|style|textarea|title)$/i, Lt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Lt(1), q = Lt(2), N = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), Pt = /* @__PURE__ */ new WeakMap(), A = S.createTreeWalker(S, 129);
function jt(i, t) {
  if (!ht(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Et !== void 0 ? Et.createHTML(t) : t;
}
const ee = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = O;
  for (let a = 0; a < e; a++) {
    const c = i[a];
    let h, p, l = -1, m = 0;
    for (; m < c.length && (n.lastIndex = m, p = n.exec(c), p !== null); ) m = n.lastIndex, n === O ? p[1] === "!--" ? n = St : p[1] !== void 0 ? n = Ct : p[2] !== void 0 ? (zt.test(p[2]) && (r = RegExp("</" + p[2], "g")), n = x) : p[3] !== void 0 && (n = x) : n === x ? p[0] === ">" ? (n = r ?? O, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, h = p[1], n = p[3] === void 0 ? x : p[3] === '"' ? Nt : Mt) : n === Nt || n === Mt ? n = x : n === St || n === Ct ? n = O : (n = x, r = void 0);
    const g = n === x && i[a + 1].startsWith("/>") ? " " : "";
    o += n === O ? c + Qt : l >= 0 ? (s.push(h), c.slice(0, l) + Ht + c.slice(l) + $ + g) : c + $ + (l === -2 ? a : g);
  }
  return [jt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, c = this.parts, [h, p] = ee(t, e);
    if (this.el = z.createElement(h, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = A.nextNode()) !== null && c.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(Ht)) {
          const m = p[n++], g = r.getAttribute(l).split($), f = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: o, name: f[2], strings: g, ctor: f[1] === "." ? se : f[1] === "?" ? re : f[1] === "@" ? ne : K }), r.removeAttribute(l);
        } else l.startsWith($) && (c.push({ type: 6, index: o }), r.removeAttribute(l));
        if (zt.test(r.tagName)) {
          const l = r.textContent.split($), m = l.length - 1;
          if (m > 0) {
            r.textContent = G ? G.emptyScript : "";
            for (let g = 0; g < m; g++) r.append(l[g], H()), A.nextNode(), c.push({ type: 2, index: ++o });
            r.append(l[m], H());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Rt) c.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf($, l + 1)) !== -1; ) c.push({ type: 7, index: o }), l += $.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = S.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(i, t, e = i, s) {
  var n, a;
  if (t === N) return t;
  let r = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = R(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = r : e._$Cl = r), r !== void 0 && (t = P(i, r._$AS(i, t.values), r, s)), t;
}
class ie {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    A.currentNode = r;
    let o = A.nextNode(), n = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let h;
        c.type === 2 ? h = new j(o, o.nextSibling, this, t) : c.type === 1 ? h = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (h = new oe(o, this, t)), this._$AV.push(h), c = s[++a];
      }
      n !== (c == null ? void 0 : c.index) && (o = A.nextNode(), n++);
    }
    return A.currentNode = S, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class j {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = P(this, t, e), R(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : te(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = z.createElement(jt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new ie(r, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Pt.get(t.strings);
    return e === void 0 && Pt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    ht(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new j(this.O(H()), this.O(H()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = At(t).nextSibling;
      At(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
let K = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = P(this, t, e, 0), n = !R(t) || t !== this._$AH && t !== N, n && (this._$AH = t);
    else {
      const a = t;
      let c, h;
      for (t = o[0], c = 0; c < o.length - 1; c++) h = P(this, a[s + c], e, c), h === N && (h = this._$AH[c]), n || (n = !R(h) || h !== this._$AH[c]), h === d ? t = d : t !== d && (t += (h ?? "") + o[c + 1]), this._$AH[c] = h;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
class se extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class re extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class ne extends K {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? d) === N) return;
    const s = this._$AH, r = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class oe {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const it = D.litHtmlPolyfillSupport;
it == null || it(z, j), (D.litHtmlVersions ?? (D.litHtmlVersions = [])).push("3.3.3");
const ae = (i, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = r = new j(t.insertBefore(H(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
class M extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ae(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return N;
  }
}
var Ft;
M._$litElement$ = !0, M.finalized = !0, (Ft = E.litElementHydrateSupport) == null || Ft.call(E, { LitElement: M });
const st = E.litElementPolyfillSupport;
st == null || st({ LitElement: M });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = { attribute: !0, type: String, converter: V, reflect: !1, hasChanged: lt }, le = (i = ce, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, c, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, i, a), a;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(a) {
      const c = this[n];
      t.call(this, a), this.requestUpdate(n, c, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function dt(i) {
  return (t, e) => typeof e == "object" ? le(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Z(i) {
  return dt({ ...i, state: !0, attribute: !1 });
}
const ot = {
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
}, he = Object.keys(ot);
function I(i) {
  if (i)
    return i === "primary" ? "var(--primary-color)" : i === "accent" ? "var(--accent-color)" : ot[i] ? `var(--${i}-color, ${ot[i]})` : i;
}
const L = {
  weight: {
    icon: "mdi:scale-bathroom",
    color: "indigo",
    graph: "line",
    aggregate: "mean",
    trend: "down_good",
    precision: 1
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
  custom: {
    icon: "mdi:chart-line",
    color: "primary",
    graph: "line",
    aggregate: "mean",
    trend: "neutral"
  }
}, kt = ["teal", "orange", "pink", "cyan", "lime"], Tt = {
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
    custom: "Sensor"
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
    custom: "Sensor"
  }
};
function Y(i) {
  var e;
  return (((e = i == null ? void 0 : i.locale) == null ? void 0 : e.language) ?? (i == null ? void 0 : i.language) ?? "en").startsWith("de") ? "de" : "en";
}
function y(i, t) {
  return Tt[Y(i)][t] ?? Tt.en[t] ?? t;
}
function w(i, t, e) {
  if (!Number.isFinite(t)) return "–";
  const s = Y(i) === "de" ? "de-DE" : "en-US";
  return e === void 0 ? new Intl.NumberFormat(s, { maximumFractionDigits: 2 }).format(t) : new Intl.NumberFormat(s, {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  }).format(t);
}
function rt(i, t) {
  return t ? /^[%°'"]/.test(t) ? `${i}${t}` : `${i} ${t}` : i;
}
function de(i, t) {
  if (!Number.isFinite(i)) return "–";
  let e;
  const s = (t ?? "min").toLowerCase();
  s.startsWith("h") ? e = i * 60 : s === "s" || s.startsWith("sec") ? e = i / 60 : e = i;
  const r = Math.floor(e / 60), o = Math.round(e % 60);
  return r <= 0 ? `${o} min` : o === 0 ? `${r} h` : `${r} h ${o} min`;
}
function ue(i, t) {
  const e = new Date(t);
  if (isNaN(e.getTime())) return "";
  const s = Y(i) === "de" ? "de-DE" : "en-US", r = /* @__PURE__ */ new Date(), o = (a, c) => a.getFullYear() === c.getFullYear() && a.getMonth() === c.getMonth() && a.getDate() === c.getDate();
  if (o(e, r))
    return e.toLocaleTimeString(s, { hour: "numeric", minute: "2-digit" });
  const n = new Date(r.getTime() - 864e5);
  return o(e, n) ? y(i, "yesterday") : e.toLocaleDateString(s, { day: "numeric", month: "short" });
}
async function pe(i, t, e) {
  if (!t.length) return {};
  const s = /* @__PURE__ */ new Date(), r = /* @__PURE__ */ new Date();
  r.setHours(0, 0, 0, 0), r.setDate(r.getDate() - (e - 1));
  const o = await i.callWS({
    type: "history/history_during_period",
    start_time: r.toISOString(),
    end_time: s.toISOString(),
    entity_ids: t,
    minimal_response: !0,
    no_attributes: !0
  }), n = {};
  for (const a of t)
    n[a] = ((o == null ? void 0 : o[a]) ?? []).map((c) => ({ t: c.lu * 1e3, v: parseFloat(c.s) })).filter((c) => Number.isFinite(c.v));
  return n;
}
function me(i, t, e) {
  const s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0);
  const r = s.getTime() - (t - 1) * 864e5, o = Array.from({ length: t }, () => []);
  for (const n of i) {
    const a = Math.floor((n.t - r) / 864e5);
    a >= 0 && a < t && o[a].push(n.v);
  }
  return o.map((n) => {
    if (!n.length) return NaN;
    switch (e) {
      case "min":
        return Math.min(...n);
      case "max":
        return Math.max(...n);
      case "sum":
        return n.reduce((a, c) => a + c, 0);
      case "last":
        return n[n.length - 1];
      default:
        return n.reduce((a, c) => a + c, 0) / n.length;
    }
  });
}
function ge(i) {
  const t = [...i];
  let e = NaN;
  for (let r = 0; r < t.length; r++)
    Number.isFinite(t[r]) ? e = t[r] : t[r] = e;
  let s = NaN;
  for (let r = t.length - 1; r >= 0; r--)
    Number.isFinite(t[r]) ? s = t[r] : t[r] = s;
  return t;
}
function Ot(i) {
  const t = i.filter(Number.isFinite);
  return t.length < 2 ? NaN : t[t.length - 1] - t[0];
}
const U = 220, b = 60, _ = 7;
function fe(i) {
  const t = i.filter(Number.isFinite), e = Math.min(...t), s = Math.max(...t), r = s - e || Math.abs(s) * 0.1 || 1;
  return { lo: e - r * 0.18, hi: s + r * 0.18 };
}
function _e(i) {
  const t = i.filter((c) => c.values.some(Number.isFinite));
  if (!t.length) return d;
  const { lo: e, hi: s } = fe(t.flatMap((c) => c.values)), r = Math.max(...t.map((c) => c.values.length)), o = (c) => _ + c * (U - 2 * _) / Math.max(r - 1, 1), n = (c) => b - _ - (c - e) / (s - e) * (b - 2 * _), a = t.map((c) => {
    const h = c.values.map((l, m) => ({ x: o(m), y: n(l), ok: Number.isFinite(l) })).filter((l) => l.ok);
    if (!h.length) return d;
    let p = `M ${h[0].x} ${h[0].y}`;
    for (let l = 1; l < h.length; l++) {
      const m = (h[l - 1].x + h[l].x) / 2;
      p += ` C ${m} ${h[l - 1].y}, ${m} ${h[l].y}, ${h[l].x} ${h[l].y}`;
    }
    return q`
      <path d=${p} fill="none" stroke=${c.color} stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
      ${h.map(
      (l) => q`<circle cx=${l.x} cy=${l.y} r="3.1" fill="var(--hc-dot-fill)"
          stroke=${c.color} stroke-width="2"/>`
    )}
    `;
  });
  return u`<svg class="chart" viewBox="0 0 ${U} ${b}" aria-hidden="true">${a}</svg>`;
}
function $e(i, t, e) {
  if (!i.some((l) => Number.isFinite(l) && l > 0)) return d;
  const s = i.map((l) => Number.isFinite(l) && l > 0 ? l : 0), r = Math.max(...s, e ?? 0) || 1, o = s.length, n = (U - 2 * _) / o, a = Math.min(n * 0.55, 14), c = (l) => l / r * (b - 2 * _), h = s.map((l, m) => {
    const g = Math.max(c(l), l > 0 ? 3 : 1.5), f = _ + m * n + (n - a) / 2;
    return q`<rect x=${f} y=${b - _ - g} width=${a} height=${g}
      rx=${Math.min(a / 2, 4)} fill=${t} opacity=${l > 0 ? 1 : 0.25}/>`;
  }), p = Number.isFinite(e) ? q`<line x1=${_} x2=${U - _} y1=${b - _ - c(e)} y2=${b - _ - c(e)}
        stroke=${t} stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>` : d;
  return u`<svg class="chart" viewBox="0 0 ${U} ${b}" aria-hidden="true">
    ${p}${h}
  </svg>`;
}
var ye = Object.defineProperty, be = Object.getOwnPropertyDescriptor, J = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? be(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && ye(t, e, r), r;
};
const ve = Object.keys(L), xe = ["body_composition", "nutrition"], nt = {
  en: {
    title: "Title",
    subtitle: "Subtitle",
    days: "History (days)",
    columns: "Columns",
    tiles: "Show metrics as tiles",
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
    goal: "Goal",
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
    goal: "Ziel",
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
let k = class extends M {
  constructor() {
    super(...arguments), this._expanded = -1;
  }
  setConfig(i) {
    this._config = i;
  }
  _label(i) {
    return (nt[Y(this.hass)] ?? nt.en)[i] ?? nt.en[i] ?? i;
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
          { name: "columns", selector: { number: { min: 1, max: 3, mode: "box" } } }
        ]
      },
      { name: "tiles", selector: { boolean: {} } }
    ];
  }
  _metricSchema(i) {
    const t = i.type ?? "custom", e = (r, o) => r.map((n) => ({ value: n, label: this._label(`${o}_${n}`) })), s = !i.entities || i.entities.every((r) => typeof r == "string");
    return [
      {
        name: "type",
        selector: {
          select: {
            mode: "dropdown",
            options: ve.map((r) => ({ value: r, label: y(this.hass, r) }))
          }
        }
      },
      { name: "entity", selector: { entity: {} } },
      ...t === "blood_pressure" ? [{ name: "entity2", selector: { entity: {} } }] : [],
      ...xe.includes(t) && s ? [{ name: "entities", selector: { entity: { multiple: !0 } } }] : [],
      { name: "secondary", selector: { entity: { multiple: !0 } } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} } },
          {
            name: "color",
            selector: {
              select: {
                mode: "dropdown",
                custom_value: !0,
                options: he.map((r) => ({ value: r, label: r }))
              }
            }
          },
          { name: "unit", selector: { text: {} } },
          {
            name: "graph",
            selector: {
              select: {
                mode: "dropdown",
                options: e(["line", "bar", "progress", "none"], "graph")
              }
            }
          },
          { name: "days", selector: { number: { min: 1, max: 60, mode: "box" } } },
          { name: "goal", selector: { number: { mode: "box", step: "any" } } },
          {
            name: "precision",
            selector: { number: { min: 0, max: 3, mode: "box" } }
          },
          {
            name: "aggregate",
            selector: {
              select: {
                mode: "dropdown",
                options: e(["mean", "min", "max", "sum", "last"], "agg")
              }
            }
          },
          {
            name: "trend",
            selector: {
              select: {
                mode: "dropdown",
                options: e(["up_good", "down_good", "neutral", "none"], "trend")
              }
            }
          }
        ]
      },
      { name: "label", selector: { text: {} } }
    ];
  }
  render() {
    return !this.hass || !this._config ? d : u`
      <ha-form
        .hass=${this.hass}
        .data=${{ tiles: !0, ...this._config }}
        .schema=${this._topSchema()}
        .computeLabel=${(i) => this._label(i.name)}
        @value-changed=${this._topChanged}
      ></ha-form>

      <div class="metrics">
        ${this._config.metrics.map((i, t) => this._renderMetricEditor(i, t))}
      </div>

      <button class="add" @click=${this._addMetric}>
        <ha-icon icon="mdi:plus"></ha-icon>
        ${this._label("add_metric")}
      </button>
    `;
  }
  _renderMetricEditor(i, t) {
    const e = i.type ?? "custom", s = L[e] ?? L.custom, r = this._expanded === t, o = this._config.metrics.length;
    return u`
      <div class="metric ${r ? "open" : ""}">
        <div class="metric-head" @click=${() => this._expanded = r ? -1 : t}>
          <ha-icon .icon=${i.icon ?? s.icon}></ha-icon>
          <span class="metric-title">
            ${i.name ?? y(this.hass, e)}
            <span class="metric-entity">${i.entity ?? ""}</span>
          </span>
          <button
            class="icon-btn"
            .disabled=${t === 0}
            title="↑"
            @click=${(n) => this._move(n, t, -1)}
          >
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </button>
          <button
            class="icon-btn"
            .disabled=${t === o - 1}
            title="↓"
            @click=${(n) => this._move(n, t, 1)}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <button class="icon-btn danger" @click=${(n) => this._remove(n, t)}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
          <ha-icon
            class="expand"
            icon=${r ? "mdi:chevron-up" : "mdi:chevron-down"}
          ></ha-icon>
        </div>
        ${r ? u`<div class="metric-body">
              <ha-form
                .hass=${this.hass}
                .data=${i}
                .schema=${this._metricSchema(i)}
                .computeLabel=${(n) => this._label(n.name)}
                @value-changed=${(n) => this._metricChanged(n, t)}
              ></ha-form>
            </div>` : d}
      </div>
    `;
  }
  _emit(i) {
    this._config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _clean(i) {
    const t = {};
    for (const [e, s] of Object.entries(i))
      s === "" || s === null || s === void 0 || Array.isArray(s) && !s.length || (t[e] = s);
    return t;
  }
  _topChanged(i) {
    if (i.stopPropagation(), !this._config) return;
    const t = i.detail.value;
    this._emit(this._clean({ ...this._config, ...t, metrics: this._config.metrics }));
  }
  _metricChanged(i, t) {
    if (i.stopPropagation(), !this._config) return;
    const e = [...this._config.metrics];
    e[t] = this._clean(i.detail.value), this._emit({ ...this._config, metrics: e });
  }
  _addMetric() {
    if (!this._config) return;
    const i = [...this._config.metrics, { type: "weight" }];
    this._expanded = i.length - 1, this._emit({ ...this._config, metrics: i });
  }
  _remove(i, t) {
    if (i.stopPropagation(), !this._config) return;
    const e = this._config.metrics.filter((s, r) => r !== t);
    this._expanded === t && (this._expanded = -1), this._emit({ ...this._config, metrics: e });
  }
  _move(i, t, e) {
    if (i.stopPropagation(), !this._config) return;
    const s = [...this._config.metrics], r = t + e;
    r < 0 || r >= s.length || ([s[t], s[r]] = [s[r], s[t]], this._expanded === t && (this._expanded = r), this._emit({ ...this._config, metrics: s }));
  }
};
k.styles = Ut`
    .metrics {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
    }
    .metric {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      overflow: hidden;
    }
    .metric-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .metric-head > ha-icon {
      color: var(--secondary-text-color);
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
J([
  dt({ attribute: !1 })
], k.prototype, "hass", 2);
J([
  Z()
], k.prototype, "_config", 2);
J([
  Z()
], k.prototype, "_expanded", 2);
k = J([
  Bt("health-card-editor")
], k);
var we = Object.defineProperty, Ae = Object.getOwnPropertyDescriptor, X = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? Ae(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && we(t, e, r), r;
};
const Ee = "0.1.0", Se = 5 * 60 * 1e3, Ce = 15 * 60 * 1e3;
let T = class extends M {
  constructor() {
    super(...arguments), this._history = {}, this._fetching = !1, this._cfgSig = "", this._stateSig = "", this._lastFetch = 0;
  }
  static getConfigElement() {
    return document.createElement("health-card-editor");
  }
  static getStubConfig(i) {
    const t = (o) => {
      var n;
      return (n = Object.values(i.states).find(
        (a) => a.entity_id.startsWith("sensor.") && a.attributes.device_class === o
      )) == null ? void 0 : n.entity_id;
    }, e = [], s = t("weight");
    s && e.push({ type: "weight", entity: s });
    const r = t("temperature");
    return r && e.push({ type: "temperature", entity: r }), e.length || e.push({ type: "weight", entity: "" }), { title: "Gesundheit", metrics: e };
  }
  setConfig(i) {
    if (!i || !Array.isArray(i.metrics) || !i.metrics.length)
      throw new Error("Please define at least one metric (metrics: [...])");
    this._config = i;
  }
  getCardSize() {
    var t, e;
    return 1 + Math.ceil(
      (((t = this._config) == null ? void 0 : t.metrics.length) ?? 1) / (((e = this._config) == null ? void 0 : e.columns) ?? 1)
    ) * 2;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  updated(i) {
    super.updated(i), (i.has("hass") || i.has("_config")) && this._maybeFetch();
  }
  _watchedEntities() {
    var t;
    const i = /* @__PURE__ */ new Set();
    for (const e of ((t = this._config) == null ? void 0 : t.metrics) ?? []) {
      for (const s of this._series(e)) s.entity && i.add(s.entity);
      for (const s of e.secondary ?? []) i.add(s);
    }
    return [...i].filter((e) => {
      var s;
      return (s = this.hass) == null ? void 0 : s.states[e];
    });
  }
  _maybeFetch() {
    if (!this.hass || !this._config || this._fetching) return;
    const i = this._watchedEntities();
    if (!i.length) return;
    const t = Math.max(
      ...this._config.metrics.map((n) => n.days ?? this._config.days ?? 7)
    ), e = `${t}|${i.join(",")}`, s = i.map((n) => {
      var a;
      return ((a = this.hass.states[n]) == null ? void 0 : a.last_updated) ?? "";
    }).join("|"), r = Date.now();
    (e !== this._cfgSig || r - this._lastFetch > Ce || s !== this._stateSig && r - this._lastFetch > Se) && (this._fetching = !0, this._cfgSig = e, this._stateSig = s, pe(this.hass, i, t).then((n) => {
      this._history = n, this._lastFetch = Date.now();
    }).catch((n) => console.warn("health-card: history fetch failed", n)).finally(() => {
      this._fetching = !1;
    }));
  }
  _series(i) {
    var e;
    if ((e = i.entities) != null && e.length)
      return i.entities.map((s) => typeof s == "string" ? { entity: s } : s);
    const t = [];
    return i.entity && t.push({ entity: i.entity }), i.entity2 && t.push({ entity: i.entity2 }), t;
  }
  _numeric(i, t) {
    if (!i) return NaN;
    const e = t ? i.attributes[t] : i.state;
    return typeof e == "number" ? e : parseFloat(e);
  }
  _moreInfo(i) {
    i && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    if (!this.hass || !this._config) return d;
    const i = this._config;
    return u`
      <ha-card class=${i.tiles === !1 ? "flat" : "tiles"}>
        ${i.title ? u`<div class="header">
              <div class="title">${i.title}</div>
              ${i.subtitle ? u`<div class="subtitle">${i.subtitle}</div>` : d}
            </div>` : d}
        <div class="metrics" style="--hc-columns:${i.columns ?? 1}">
          ${i.metrics.map((t) => this._renderMetric(t))}
        </div>
      </ha-card>
    `;
  }
  _renderMetric(i) {
    var gt, ft, _t;
    const t = i.type && L[i.type] ? i.type : "custom", e = L[t], s = I(i.color) ?? I(e.color), r = i.name ?? y(this.hass, t), o = i.icon ?? e.icon, n = this._series(i), a = (gt = n[0]) != null && gt.entity ? this.hass.states[n[0].entity] : void 0;
    if (!n.length || !a)
      return u`
        <div class="metric" style="--hc-accent:${s}">
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${o}></ha-icon></div>
            <div class="name">${r}</div>
          </div>
          <div class="missing">
            ${(ft = n[0]) != null && ft.entity ? u`${y(this.hass, "entity_missing")}: ${n[0].entity}` : y(this.hass, "no_data")}
          </div>
        </div>
      `;
    const c = Math.max(1, i.days ?? this._config.days ?? 7), h = i.graph ?? e.graph, p = i.aggregate ?? e.aggregate, l = i.trend ?? e.trend, m = i.precision ?? e.precision, g = i.unit ?? n[0].unit ?? a.attributes.unit_of_measurement ?? e.unit ?? "", f = n.map((Q, $t) => {
      const yt = me(this._history[Q.entity] ?? [], c, p);
      return {
        ...Q,
        colorResolved: I(Q.color) ?? ($t === 0 ? s : I(kt[($t - 1) % kt.length])),
        buckets: yt,
        filled: ge(yt)
      };
    }), B = !!i.entities && n.length > 1, ut = !B || !!i.label, pt = B && h !== "progress", mt = !B, It = B && h === "progress";
    return u`
      <div
        class="metric"
        style="--hc-accent:${s}"
        @click=${() => this._moreInfo(n[0].entity)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${o}></ha-icon></div>
          <div class="name">${r}</div>
          <div class="time">${ue(this.hass, a.last_updated)}</div>
        </div>
        <div class="body ${It ? "stack" : ""}">
          ${ut || pt || mt || (_t = i.secondary) != null && _t.length ? u`<div class="info">
                ${ut ? this._renderValue(i, t, n, a, g, m, e.duration) : d}
                ${pt ? this._renderSeriesChips(f, m, l) : d}
                ${this._renderSecondary(i)}
                ${mt ? this._renderStatus(i, f[0], a, g, m, l) : d}
              </div>` : d}
          <div class="chartcell">
            ${this._renderChart(i, h, f, g, m)}
          </div>
        </div>
      </div>
    `;
  }
  _renderValue(i, t, e, s, r, o, n) {
    if (i.label) return u`<div class="value">${i.label}</div>`;
    if (t === "blood_pressure" && e.length >= 2) {
      const c = this._numeric(s, i.attribute), h = this._numeric(this.hass.states[e[1].entity]);
      return u`<div class="value">
        ${w(this.hass, c, 0)}/${w(this.hass, h, 0)}
        <span class="unit">${r}</span>
      </div>`;
    }
    const a = this._numeric(s, i.attribute);
    return Number.isFinite(a) ? i.duration ?? n ? u`<div class="value">
        ${de(a, i.unit ?? s.attributes.unit_of_measurement)}
      </div>` : u`<div class="value">
      ${w(this.hass, a, o)}<span class="unit">${r}</span>
    </div>` : u`<div class="value">${s.state}</div>`;
  }
  _renderSeriesChips(i, t, e) {
    return u`<div class="serieslist">
      ${i.map((s) => {
      const r = this.hass.states[s.entity], o = this._numeric(r), n = s.unit ?? (r == null ? void 0 : r.attributes.unit_of_measurement) ?? "", a = s.name ?? (r == null ? void 0 : r.attributes.friendly_name) ?? s.entity, c = Ot(s.filled), h = Number.isFinite(c) ? c > 0 ? "mdi:arrow-top-right" : c < 0 ? "mdi:arrow-bottom-right" : "mdi:arrow-right" : "mdi:minus";
      return u`<div class="serieschip">
          ${e !== "none" ? u`<span class="dotarrow" style="background:${s.colorResolved}">
                <ha-icon .icon=${h}></ha-icon>
              </span>` : d}
          <span class="serieslabel">
            ${a}: ${Number.isFinite(o) ? rt(w(this.hass, o, t), n) : (r == null ? void 0 : r.state) ?? "–"}
          </span>
        </div>`;
    })}
    </div>`;
  }
  _renderSecondary(i) {
    var e;
    if (!((e = i.secondary) != null && e.length)) return d;
    const t = i.secondary.map((s) => {
      const r = this.hass.states[s];
      if (!r) return;
      const o = this._numeric(r), n = r.attributes.unit_of_measurement ?? "";
      return Number.isFinite(o) ? rt(w(this.hass, o), n) : r.state;
    }).filter(Boolean);
    return t.length ? u`<div class="secondary">${t.join(" • ")}</div>` : d;
  }
  _renderStatus(i, t, e, s, r, o) {
    const n = this._numeric(e, i.attribute);
    if (Number.isFinite(i.goal) && Number.isFinite(n)) {
      const g = Math.round(n / i.goal * 100), f = g >= 100;
      return u`<div class="status ${f ? "good" : ""}">
        <ha-icon .icon=${f ? "mdi:check-circle" : "mdi:flag-outline"}></ha-icon>
        <span>${y(this.hass, "goal")}: ${g} %</span>
      </div>`;
    }
    if (o === "none") return d;
    const a = Ot(t.filled);
    if (!Number.isFinite(a)) return d;
    const c = t.filled.find(Number.isFinite) ?? 0, h = Math.abs(a) < Math.max(Math.abs(c) * 5e-3, 1e-9), p = h || o === "neutral" ? "neutral" : a > 0 == (o === "up_good") ? "good" : "bad", l = h ? "mdi:arrow-right" : a > 0 ? "mdi:arrow-top-right" : "mdi:arrow-bottom-right", m = h ? y(this.hass, "stable") : `${w(this.hass, Math.abs(a), r)}${s ? ` ${s}` : ""}`;
    return u`<div class="status ${p}">
      <span class="dotarrow"><ha-icon .icon=${l}></ha-icon></span>
      <span>${m}</span>
    </div>`;
  }
  _renderChart(i, t, e, s, r) {
    if (t === "line")
      return u`${_e(
        e.map((o) => ({ values: o.filled, color: o.colorResolved }))
      )}`;
    if (t === "bar")
      return u`${$e(e[0].buckets, e[0].colorResolved, i.goal)}`;
    if (t === "progress") {
      const o = e.map((n) => {
        const a = this.hass.states[n.entity], c = this._numeric(a), h = n.goal ?? i.goal;
        if (!Number.isFinite(c) || !h) return d;
        const p = Math.max(0, Math.min(c / h * 100, 100)), l = n.unit ?? (a == null ? void 0 : a.attributes.unit_of_measurement) ?? s;
        return u`<div class="pbar">
          ${e.length > 1 ? u`<div class="pbar-label">
                <span>${n.name ?? (a == null ? void 0 : a.attributes.friendly_name) ?? n.entity}</span>
                <span>${rt(w(this.hass, c, r), l)}</span>
              </div>` : d}
          <div class="ptrack" style="--hc-p:${n.colorResolved}">
            <div class="pfill" style="width:${p}%"></div>
          </div>
        </div>`;
      });
      return u`<div class="pbars">${o}</div>`;
    }
    return d;
  }
};
T.styles = Ut`
    :host {
      --hc-card-bg: var(--ha-card-background, var(--card-background-color, #fff));
      --hc-tile-bg: color-mix(in srgb, var(--primary-text-color) 4%, var(--hc-card-bg));
      --hc-dot-fill: var(--hc-tile-bg);
    }
    ha-card {
      padding: 16px;
    }
    ha-card.flat {
      --hc-tile-bg: transparent;
      --hc-dot-fill: var(--hc-card-bg);
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
    ha-card.flat .metrics {
      gap: 4px;
    }
    .metric {
      background: var(--hc-tile-bg);
      border-radius: var(--hc-tile-radius, 16px);
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
  `;
X([
  dt({ attribute: !1 })
], T.prototype, "hass", 2);
X([
  Z()
], T.prototype, "_config", 2);
X([
  Z()
], T.prototype, "_history", 2);
T = X([
  Bt("health-card")
], T);
console.info(
  `%c HEALTH-CARD %c v${Ee} `,
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
  T as HealthCard
};
