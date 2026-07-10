/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis, vt = it.ShadowRoot && (it.ShadyCSS === void 0 || it.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xt = Symbol(), Et = /* @__PURE__ */ new WeakMap();
let Gt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== xt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (vt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Et.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Et.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const re = (r) => new Gt(typeof r == "string" ? r : r + "", void 0, xt), Vt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, a) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[a + 1], r[0]);
  return new Gt(e, r, xt);
}, se = (r, t) => {
  if (vt) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = it.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, Mt = vt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return re(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ie, defineProperty: oe, getOwnPropertyDescriptor: ae, getOwnPropertyNames: ne, getOwnPropertySymbols: ce, getPrototypeOf: le } = Object, S = globalThis, Ct = S.trustedTypes, de = Ct ? Ct.emptyScript : "", ht = S.reactiveElementPolyfillSupport, K = (r, t) => r, ot = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? de : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, $t = (r, t) => !ie(r, t), Nt = { attribute: !0, type: String, converter: ot, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Nt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && oe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: a } = ae(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const n = i == null ? void 0 : i.call(this);
      a == null || a.call(this, o), this.requestUpdate(t, n, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties"))) return;
    const t = le(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
      const e = this.properties, s = [...ne(e), ...ce(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(Mt(i));
    } else t !== void 0 && e.push(Mt(t));
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
    return se(t, this.constructor.elementStyles), t;
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
    var a;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : ot).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((a = n.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? n.converter : ot;
      this._$Em = i;
      const l = c.fromAttribute(e, n.type);
      this[i] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, a) {
    var o;
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (a = this[t]), s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? $t)(a, e) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: a }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [a, o] of i) {
        const { wrapped: n } = o, c = this[a];
        n !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, o, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[K("elementProperties")] = /* @__PURE__ */ new Map(), H[K("finalized")] = /* @__PURE__ */ new Map(), ht == null || ht({ ReactiveElement: H }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, Dt = (r) => r, at = Y.trustedTypes, Pt = at ? at.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, qt = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Zt = "?" + k, he = `<${Zt}>`, F = document, J = () => F.createComment(""), X = (r) => r === null || typeof r != "object" && typeof r != "function", wt = Array.isArray, pe = (r) => wt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Tt = />/g, C = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ot = /'/g, Rt = /"/g, Kt = /^(?:script|style|textarea|title)$/i, Yt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = Yt(1), Q = Yt(2), B = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), N = F.createTreeWalker(F, 129);
function Jt(r, t) {
  if (!wt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(t) : t;
}
const ue = (r, t) => {
  const e = r.length - 1, s = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Z;
  for (let n = 0; n < e; n++) {
    const c = r[n];
    let l, d, u = -1, g = 0;
    for (; g < c.length && (o.lastIndex = g, d = o.exec(c), d !== null); ) g = o.lastIndex, o === Z ? d[1] === "!--" ? o = Ft : d[1] !== void 0 ? o = Tt : d[2] !== void 0 ? (Kt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = C) : d[3] !== void 0 && (o = C) : o === C ? d[0] === ">" ? (o = i ?? Z, u = -1) : d[1] === void 0 ? u = -2 : (u = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? C : d[3] === '"' ? Rt : Ot) : o === Rt || o === Ot ? o = C : o === Ft || o === Tt ? o = Z : (o = C, i = void 0);
    const f = o === C && r[n + 1].startsWith("/>") ? " " : "";
    a += o === Z ? c + he : u >= 0 ? (s.push(l), c.slice(0, u) + qt + c.slice(u) + k + f) : c + k + (u === -2 ? n : f);
  }
  return [Jt(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class tt {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const n = t.length - 1, c = this.parts, [l, d] = ue(t, e);
    if (this.el = tt.createElement(l, s), N.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = N.nextNode()) !== null && c.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(qt)) {
          const g = d[o++], f = i.getAttribute(u).split(k), b = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: a, name: b[2], strings: f, ctor: b[1] === "." ? me : b[1] === "?" ? fe : b[1] === "@" ? be : nt }), i.removeAttribute(u);
        } else u.startsWith(k) && (c.push({ type: 6, index: a }), i.removeAttribute(u));
        if (Kt.test(i.tagName)) {
          const u = i.textContent.split(k), g = u.length - 1;
          if (g > 0) {
            i.textContent = at ? at.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(u[f], J()), N.nextNode(), c.push({ type: 2, index: ++a });
            i.append(u[g], J());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Zt) c.push({ type: 2, index: a });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(k, u + 1)) !== -1; ) c.push({ type: 7, index: a }), u += k.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const s = F.createElement("template");
    return s.innerHTML = t, s;
  }
}
function j(r, t, e = r, s) {
  var o, n;
  if (t === B) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const a = X(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), a === void 0 ? i = void 0 : (i = new a(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = j(r, i._$AS(r, t.values), i, s)), t;
}
class ge {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? F).importNode(e, !0);
    N.currentNode = i;
    let a = N.nextNode(), o = 0, n = 0, c = s[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new et(a, a.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(a, c.name, c.strings, this, t) : c.type === 6 && (l = new _e(a, this, t)), this._$AV.push(l), c = s[++n];
      }
      o !== (c == null ? void 0 : c.index) && (a = N.nextNode(), o++);
    }
    return N.currentNode = F, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class et {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = j(this, t, e), X(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== B && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && X(this._$AH) ? this._$AA.nextSibling.data = t : this.T(F.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = tt.createElement(Jt(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(e);
    else {
      const o = new ge(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = zt.get(t.strings);
    return e === void 0 && zt.set(t.strings, e = new tt(t)), e;
  }
  k(t) {
    wt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const a of t) i === e.length ? e.push(s = new et(this.O(J()), this.O(J()), this, this.options)) : s = e[i], s._$AI(a), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = Dt(t).nextSibling;
      Dt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
let nt = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, a) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, i) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = j(this, t, e, 0), o = !X(t) || t !== this._$AH && t !== B, o && (this._$AH = t);
    else {
      const n = t;
      let c, l;
      for (t = a[0], c = 0; c < a.length - 1; c++) l = j(this, n[s + c], e, c), l === B && (l = this._$AH[c]), o || (o = !X(l) || l !== this._$AH[c]), l === h ? t = h : t !== h && (t += (l ?? "") + a[c + 1]), this._$AH[c] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
class me extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class fe extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class be extends nt {
  constructor(t, e, s, i, a) {
    super(t, e, s, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = j(this, t, e, 0) ?? h) === B) return;
    const s = this._$AH, i = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== h && (s === h || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _e {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    j(this, t);
  }
}
const ut = Y.litHtmlPolyfillSupport;
ut == null || ut(tt, et), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.3");
const ye = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new et(t.insertBefore(J(), a), a, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class L extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ye(e, this.renderRoot, this.renderOptions);
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
    return B;
  }
}
var Wt;
L._$litElement$ = !0, L.finalized = !0, (Wt = P.litElementHydrateSupport) == null || Wt.call(P, { LitElement: L });
const gt = P.litElementPolyfillSupport;
gt == null || gt({ LitElement: L });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ve = { attribute: !0, type: String, converter: ot, reflect: !1, hasChanged: $t }, xe = (r = ve, t, e) => {
  const { kind: s, metadata: i } = e;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), a.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(n) {
      const c = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(o, c, r, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, r, n), n;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(n) {
      const c = this[o];
      t.call(this, n), this.requestUpdate(o, c, r, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function kt(r) {
  return (t, e) => typeof e == "object" ? xe(r, t, e) : ((s, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, s), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function T(r) {
  return kt({ ...r, state: !0, attribute: !1 });
}
const yt = {
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
}, $e = Object.keys(yt);
function U(r) {
  if (r)
    return r === "primary" ? "var(--primary-color)" : r === "accent" ? "var(--accent-color)" : yt[r] ? `var(--${r}-color, ${yt[r]})` : r;
}
const D = {
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
}, Ht = ["teal", "orange", "pink", "cyan", "lime"], Ut = {
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
    stat_max: "Max",
    stat_trend: "Trend",
    goal_left: "To goal",
    period_week: "W",
    period_month: "M",
    period_quarter: "3M",
    period_year: "Y"
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
    stat_max: "Max",
    stat_trend: "Trend",
    goal_left: "Bis Ziel",
    period_week: "W",
    period_month: "M",
    period_quarter: "3M",
    period_year: "J"
  }
};
function I(r) {
  var e;
  return (((e = r == null ? void 0 : r.locale) == null ? void 0 : e.language) ?? (r == null ? void 0 : r.language) ?? "en").startsWith("de") ? "de" : "en";
}
function y(r, t) {
  return Ut[I(r)][t] ?? Ut.en[t] ?? t;
}
function v(r, t, e) {
  if (!Number.isFinite(t)) return "–";
  const s = I(r) === "de" ? "de-DE" : "en-US";
  return e === void 0 ? new Intl.NumberFormat(s, { maximumFractionDigits: 2 }).format(t) : new Intl.NumberFormat(s, {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  }).format(t);
}
function rt(r, t) {
  return t ? /^[%°'"]/.test(t) ? `${r}${t}` : `${r} ${t}` : r;
}
function st(r, t) {
  if (!Number.isFinite(r)) return "–";
  let e;
  const s = (t ?? "min").toLowerCase();
  s.startsWith("h") ? e = r * 60 : s === "s" || s.startsWith("sec") ? e = r / 60 : e = r;
  const i = Math.round(e * 60), a = Math.floor(i / 3600), o = Math.floor(i % 3600 / 60), n = i % 60;
  return a > 0 ? o ? `${a} h ${o} min` : `${a} h` : o > 0 ? n && o < 10 ? `${o} min ${n} s` : `${o} min` : `${n} s`;
}
function mt(r, t) {
  const e = new Date(t);
  if (isNaN(e.getTime())) return "";
  const s = I(r) === "de" ? "de-DE" : "en-US", i = /* @__PURE__ */ new Date(), a = (n, c) => n.getFullYear() === c.getFullYear() && n.getMonth() === c.getMonth() && n.getDate() === c.getDate();
  if (a(e, i))
    return e.toLocaleTimeString(s, { hour: "numeric", minute: "2-digit" });
  const o = new Date(i.getTime() - 864e5);
  return a(e, o) ? y(r, "yesterday") : e.toLocaleDateString(s, { day: "numeric", month: "short" });
}
async function we(r, t, e) {
  if (!t.length) return {};
  const s = /* @__PURE__ */ new Date(), i = /* @__PURE__ */ new Date();
  i.setHours(0, 0, 0, 0), i.setDate(i.getDate() - (e - 1));
  const a = await r.callWS({
    type: "history/history_during_period",
    start_time: i.toISOString(),
    end_time: s.toISOString(),
    entity_ids: t,
    minimal_response: !0,
    no_attributes: !0
  }), o = {};
  for (const n of t)
    o[n] = ((a == null ? void 0 : a[n]) ?? []).map((c) => ({ t: c.lu * 1e3, v: parseFloat(c.s) })).filter((c) => Number.isFinite(c.v));
  return o;
}
function ke(r, t, e) {
  const s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0);
  const i = s.getTime() - (t - 1) * 864e5, a = Array.from({ length: t }, () => []);
  for (const o of r) {
    const n = Math.floor((o.t - i) / 864e5);
    n >= 0 && n < t && a[n].push(o.v);
  }
  return a.map((o) => {
    if (!o.length) return NaN;
    switch (e) {
      case "min":
        return Math.min(...o);
      case "max":
        return Math.max(...o);
      case "sum":
        return o.reduce((n, c) => n + c, 0);
      case "last":
        return o[o.length - 1];
      default:
        return o.reduce((n, c) => n + c, 0) / o.length;
    }
  });
}
async function Se(r, t, e) {
  if (!t.length) return {};
  const s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (e - 1));
  const i = await r.callWS({
    type: "recorder/statistics_during_period",
    start_time: s.toISOString(),
    end_time: (/* @__PURE__ */ new Date()).toISOString(),
    statistic_ids: t,
    period: "day",
    types: ["mean", "min", "max", "state", "sum"]
  }), a = (n) => typeof n == "number" && Number.isFinite(n) ? n : null, o = {};
  for (const n of t)
    o[n] = ((i == null ? void 0 : i[n]) ?? []).map((c) => ({
      start: typeof c.start == "number" ? c.start : new Date(c.start).getTime(),
      mean: a(c.mean),
      min: a(c.min),
      max: a(c.max),
      state: a(c.state),
      sum: a(c.sum)
    }));
  return o;
}
function Ae(r, t, e) {
  const s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0);
  const i = s.getTime() - (t - 1) * 864e5, a = new Array(t).fill(NaN);
  for (const o of r) {
    const n = Math.floor((o.start - i) / 864e5);
    if (n < 0 || n >= t) continue;
    const c = e === "min" ? o.min : e === "max" || e === "sum" ? o.max ?? o.mean : e === "last" ? o.state ?? o.mean : o.mean;
    c !== null && (a[n] = c);
  }
  return a;
}
function Lt(r) {
  const t = [...r];
  let e = NaN;
  for (let i = 0; i < t.length; i++)
    Number.isFinite(t[i]) ? e = t[i] : t[i] = e;
  let s = NaN;
  for (let i = t.length - 1; i >= 0; i--)
    Number.isFinite(t[i]) ? s = t[i] : t[i] = s;
  return t;
}
function ft(r) {
  const t = r.filter(Number.isFinite);
  return t.length < 2 ? NaN : t[t.length - 1] - t[0];
}
const Qt = 220, te = 60, x = 7;
function Ee(r) {
  const t = r.filter(Number.isFinite), e = Math.min(...t), s = Math.max(...t), i = s - e || Math.abs(s) * 0.1 || 1;
  return { lo: e - i * 0.18, hi: s + i * 0.18 };
}
function Bt(r, t = {}) {
  const e = t.w ?? Qt, s = t.h ?? te, i = t.dots ?? !0, a = r.filter((g) => g.values.some(Number.isFinite));
  if (!a.length) return h;
  const { lo: o, hi: n } = Ee(a.flatMap((g) => g.values)), c = Math.max(...a.map((g) => g.values.length)), l = (g) => x + g * (e - 2 * x) / Math.max(c - 1, 1), d = (g) => s - x - (g - o) / (n - o) * (s - 2 * x), u = a.map((g) => {
    const f = g.values.map((_, m) => ({ x: l(m), y: d(_), ok: Number.isFinite(_) })).filter((_) => _.ok);
    if (!f.length) return h;
    let b = `M ${f[0].x} ${f[0].y}`;
    for (let _ = 1; _ < f.length; _++) {
      const m = (f[_ - 1].x + f[_].x) / 2;
      b += ` C ${m} ${f[_ - 1].y}, ${m} ${f[_].y}, ${f[_].x} ${f[_].y}`;
    }
    return Q`
      <path d=${b} fill="none" stroke=${g.color} stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
      ${i ? f.map(
      (_) => Q`<circle cx=${_.x} cy=${_.y} r="3.1" fill="var(--hc-dot-fill)"
                stroke=${g.color} stroke-width="2"/>`
    ) : h}
    `;
  });
  return p`<svg class="chart" viewBox="0 0 ${e} ${s}" aria-hidden="true">${u}</svg>`;
}
function jt(r, t, e, s = {}) {
  const i = s.w ?? Qt, a = s.h ?? te;
  if (!r.some((b) => Number.isFinite(b) && b > 0)) return h;
  const o = r.map((b) => Number.isFinite(b) && b > 0 ? b : 0), n = Math.max(...o, e ?? 0) || 1, c = o.length, l = (i - 2 * x) / c, d = Math.min(l * 0.55, 14), u = (b) => b / n * (a - 2 * x), g = o.map((b, _) => {
    const m = Math.max(u(b), b > 0 ? 3 : 1.5), w = x + _ * l + (l - d) / 2;
    return Q`<rect x=${w} y=${a - x - m} width=${d} height=${m}
      rx=${Math.min(d / 2, 4)} fill=${t} opacity=${b > 0 ? 1 : 0.25}/>`;
  }), f = Number.isFinite(e) ? Q`<line x1=${x} x2=${i - x} y1=${a - x - u(e)} y2=${a - x - u(e)}
        stroke=${t} stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>` : h;
  return p`<svg class="chart" viewBox="0 0 ${i} ${a}" aria-hidden="true">
    ${f}${g}
  </svg>`;
}
const It = [
  "var(--amber-color, #FFC107)",
  "var(--purple-color, #9C27B0)",
  "var(--pink-color, #E91E63)"
], Me = "color-mix(in srgb, var(--primary-text-color) 16%, transparent)";
function Ce(r, t) {
  const e = (i) => Math.abs(Math.sin(i * 127.1) * 43758.5453 % 1), s = [];
  for (let i = 0; i < 2; i++) {
    const a = i === 0 ? 74 : 88, o = i === 0 ? 26 : 32;
    for (let n = 0; n < o; n++) {
      const c = n / o, l = c * Math.PI * 2 - Math.PI / 2 + e(n + i * 100) * 0.12, d = a + (e(n * 3 + i * 7) - 0.5) * 6, u = 2.4 + e(n * 7 + i * 13) * 2.4, g = c < t ? It[Math.floor(e(n * 11 + i * 29) * It.length)] : Me;
      s.push(
        Q`<circle cx=${100 + Math.cos(l) * d} cy=${100 + Math.sin(l) * d}
          r=${u} fill=${g} opacity="0.75"/>`
      );
    }
  }
  return p`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="62" fill="color-mix(in srgb, ${r} 10%, transparent)" />
    ${s}
  </svg>`;
}
function bt(r, t, e = 10) {
  const i = 2 * Math.PI * 82;
  return p`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r=${82} fill="none" stroke=${r} opacity="0.16"
      stroke-width=${e}/>
    <circle cx="100" cy="100" r=${82} fill="none" stroke=${r} stroke-width=${e}
      stroke-linecap="round" stroke-dasharray="${i * Math.max(t, 0.02)} ${i}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}
function Ne(r, t, e) {
  const s = [];
  for (let n = 0; n <= 144; n++) {
    const c = n / 144 * 2 * Math.PI, l = 72 + 7 * Math.cos(12 * c);
    s.push(
      `${n ? "L" : "M"} ${(100 + Math.cos(c) * l).toFixed(1)} ${(100 + Math.sin(c) * l).toFixed(1)}`
    );
  }
  const a = 92, o = 2 * Math.PI * a;
  return p`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <path d="${s.join(" ")} Z" fill="color-mix(in srgb, ${r} 22%, transparent)"/>
    <circle cx="100" cy="100" r=${a} fill="none" stroke=${t} opacity="0.18"
      stroke-width="5"/>
    <circle cx="100" cy="100" r=${a} fill="none" stroke=${t} stroke-width="5"
      stroke-linecap="round" stroke-dasharray="${o * Math.max(e, 0.02)} ${o}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}
function De(r, t, e, s) {
  return r === "material" ? Ne(t, e, s) : r === "bubble" ? bt(e, s, 15) : r === "mirror" ? bt("#fff", s, 7) : r === "default" || r === "glass" ? bt(e, s, 10) : Ce(e, s);
}
var Pe = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, ct = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Fe(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Pe(t, e, i), i;
};
const Te = Object.keys(D), Oe = ["body_composition", "nutrition"], _t = {
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
    score_entity: "Score sensor (traffic-light badge)",
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
    score_entity: "Score-Sensor (Ampel-Badge)",
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
let W = class extends L {
  constructor() {
    super(...arguments), this._expanded = -1;
  }
  setConfig(r) {
    this._config = r;
  }
  _label(r) {
    return (_t[I(this.hass)] ?? _t.en)[r] ?? _t.en[r] ?? r;
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
    const t = r.type ?? "custom", e = (a, o) => a.map((n) => ({ value: n, label: this._label(`${o}_${n}`) })), s = !r.entities || r.entities.every((a) => typeof a == "string"), i = (a, o, n) => ({
      type: "expandable",
      name: "",
      flatten: !0,
      title: this._label(a),
      icon: o,
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
                options: Te.map((a) => ({ value: a, label: y(this.hass, a) }))
              }
            }
          },
          { name: "name", selector: { text: {} } }
        ]
      },
      { name: "entity", selector: { entity: {} } },
      ...t === "blood_pressure" ? [{ name: "entity2", selector: { entity: {} } }] : [],
      ...Oe.includes(t) && s ? [{ name: "entities", selector: { entity: { multiple: !0 } } }] : [],
      i("sec_display", "mdi:palette-outline", [
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
                  options: $e.map((a) => ({ value: a, label: a }))
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
            {
              name: "precision",
              selector: { number: { min: 0, max: 3, mode: "box" } }
            }
          ]
        },
        { name: "label", selector: { text: {} } }
      ]),
      i("sec_goal", "mdi:flag-checkered", [
        // rows pair same-height components: numbers, then pickers, then selects
        {
          type: "grid",
          name: "",
          schema: [
            { name: "goal", selector: { number: { mode: "box", step: "any" } } },
            { name: "start", selector: { number: { mode: "box", step: "any" } } }
          ]
        },
        {
          type: "grid",
          name: "",
          schema: [
            { name: "goal_entity", selector: { entity: {} } },
            { name: "start_entity", selector: { entity: {} } }
          ]
        },
        {
          type: "grid",
          name: "",
          schema: [
            {
              name: "goal_type",
              selector: {
                select: {
                  mode: "dropdown",
                  options: e(["atleast", "atmost"], "gt")
                }
              }
            },
            ...t === "score" ? [{ name: "max", selector: { number: { min: 1, mode: "box" } } }] : []
          ]
        }
      ]),
      i("sec_behavior", "mdi:gesture-tap", [
        {
          type: "grid",
          name: "",
          schema: [
            {
              name: "tap_action",
              selector: {
                select: {
                  mode: "dropdown",
                  options: e(["popup", "more-info", "link", "none"], "ta")
                }
              }
            },
            ...r.tap_action === "link" ? [{ name: "link", selector: { text: {} } }] : [],
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
        { name: "secondary", selector: { entity: { multiple: !0 } } },
        { name: "score_entity", selector: { entity: {} } }
      ]),
      ...t === "sleep" ? [
        i("sec_phases", "mdi:sleep", [
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
    return !this.hass || !this._config ? h : p`
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
        ${this._config.metrics.map((r, t) => this._renderMetricEditor(r, t))}
      </div>

      <button class="add" @click=${this._addMetric}>
        <ha-icon icon="mdi:plus"></ha-icon>
        ${this._label("add_metric")}
      </button>
    `;
  }
  _renderMetricEditor(r, t) {
    var o, n, c, l;
    const e = r.type ?? "custom", s = D[e] ?? D.custom, i = this._expanded === t, a = this._config.metrics.length;
    return p`
      <div class="metric ${i ? "open" : ""}">
        <div class="metric-head" @click=${() => this._expanded = i ? -1 : t}>
          <span
            class="chip"
            style="--c:${U(r.color) ?? U(s.color)}"
          >
            <ha-icon .icon=${r.icon ?? s.icon}></ha-icon>
          </span>
          <span class="metric-title">
            ${r.name ?? y(this.hass, e)}
            <span class="metric-entity">${r.entity ?? ""}</span>
          </span>
          <button
            class="icon-btn"
            .disabled=${t === 0}
            title="↑"
            @click=${(d) => this._move(d, t, -1)}
          >
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </button>
          <button
            class="icon-btn"
            .disabled=${t === a - 1}
            title="↓"
            @click=${(d) => this._move(d, t, 1)}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <button class="icon-btn danger" @click=${(d) => this._remove(d, t)}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
          <ha-icon
            class="expand"
            icon=${i ? "mdi:chevron-up" : "mdi:chevron-down"}
          ></ha-icon>
        </div>
        ${i ? p`<div class="metric-body">
              <ha-form
                .hass=${this.hass}
                .data=${{
      ...r,
      goal: typeof r.goal == "number" ? r.goal : void 0,
      goal_entity: typeof r.goal == "string" ? r.goal : void 0,
      start: typeof r.start == "number" ? r.start : void 0,
      start_entity: typeof r.start == "string" ? r.start : void 0,
      phases_deep: (o = r.phases) == null ? void 0 : o.deep,
      phases_light: (n = r.phases) == null ? void 0 : n.light,
      phases_rem: (c = r.phases) == null ? void 0 : c.rem,
      phases_awake: (l = r.phases) == null ? void 0 : l.awake
    }}
                .schema=${this._metricSchema(r)}
                .computeLabel=${(d) => this._label(d.name)}
                @value-changed=${(d) => this._metricChanged(d, t)}
              ></ha-form>
            </div>` : h}
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
    const t = {};
    for (const [e, s] of Object.entries(r))
      s === "" || s === null || s === void 0 || Array.isArray(s) && !s.length || (t[e] = s);
    return t;
  }
  _topChanged(r) {
    if (r.stopPropagation(), !this._config) return;
    const t = r.detail.value;
    this._emit(this._clean({ ...this._config, ...t, metrics: this._config.metrics }));
  }
  _metricChanged(r, t) {
    if (r.stopPropagation(), !this._config) return;
    const e = { ...r.detail.value }, s = {};
    for (const a of ["deep", "light", "rem", "awake"]) {
      const o = e[`phases_${a}`];
      delete e[`phases_${a}`], typeof o == "string" && o && (s[a] = o);
    }
    Object.keys(s).length ? e.phases = s : delete e.phases;
    for (const a of ["goal", "start"]) {
      const o = e[`${a}_entity`];
      delete e[`${a}_entity`], typeof o == "string" && o && (e[a] = o);
    }
    const i = [...this._config.metrics];
    i[t] = this._clean(e), this._emit({ ...this._config, metrics: i });
  }
  _addMetric() {
    if (!this._config) return;
    const r = [...this._config.metrics, { type: "weight" }];
    this._expanded = r.length - 1, this._emit({ ...this._config, metrics: r });
  }
  _remove(r, t) {
    if (r.stopPropagation(), !this._config) return;
    const e = this._config.metrics.filter((s, i) => i !== t);
    this._expanded === t && (this._expanded = -1), this._emit({ ...this._config, metrics: e });
  }
  _move(r, t, e) {
    if (r.stopPropagation(), !this._config) return;
    const s = [...this._config.metrics], i = t + e;
    i < 0 || i >= s.length || ([s[t], s[i]] = [s[i], s[t]], this._expanded === t && (this._expanded = i), this._emit({ ...this._config, metrics: s }));
  }
};
W.styles = Vt`
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
ct([
  kt({ attribute: !1 })
], W.prototype, "hass", 2);
ct([
  T()
], W.prototype, "_config", 2);
ct([
  T()
], W.prototype, "_expanded", 2);
W = ct([
  Xt("health-card-editor")
], W);
var Re = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, O = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ze(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Re(t, e, i), i;
};
const He = "0.4.0", Ue = 5 * 60 * 1e3, Le = 15 * 60 * 1e3, Be = ["default", "withings", "glass", "material", "bubble", "mirror"];
let $ = class extends L {
  constructor() {
    super(...arguments), this._history = {}, this._popup = null, this._popupDays = null, this._stats = null, this._statsFetching = !1, this._onKeydown = (r) => {
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
    const t = (a) => {
      var o;
      return (o = Object.values(r.states).find(
        (n) => n.entity_id.startsWith("sensor.") && n.attributes.device_class === a
      )) == null ? void 0 : o.entity_id;
    }, e = [], s = t("weight");
    s && e.push({ type: "weight", entity: s });
    const i = t("temperature");
    return i && e.push({ type: "temperature", entity: i }), e.length || e.push({ type: "weight", entity: "" }), { title: "Gesundheit", metrics: e };
  }
  setConfig(r) {
    if (!r || !Array.isArray(r.metrics) || !r.metrics.length)
      throw new Error("Please define at least one metric (metrics: [...])");
    this._config = r;
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
  updated(r) {
    var t;
    if (super.updated(r), (r.has("hass") || r.has("_config")) && this._maybeFetch(), this._maybeFetchStats(), r.has("_popup") || r.has("_popupDays") || r.has("_stats")) {
      const e = (t = this.renderRoot) == null ? void 0 : t.querySelector(".chart-scroll");
      e && (e.scrollLeft = e.scrollWidth);
    }
  }
  /** Long-term statistics for popup ranges beyond the recorder purge window. */
  _maybeFetchStats() {
    var a;
    if (!this.hass || this._popup === null || !this._config) return;
    const r = this._popupDays ?? 0;
    if (r <= 10) return;
    const t = this._config.metrics[this._popup];
    if (!t) return;
    const e = /* @__PURE__ */ new Set();
    for (const o of this._series(t)) o.entity && e.add(o.entity);
    for (const o of Object.values(t.phases ?? {})) o && e.add(o);
    t.score_entity && e.add(t.score_entity);
    const s = [...e].filter((o) => this.hass.states[o]), i = `${r}|${s.join(",")}`;
    !s.length || ((a = this._stats) == null ? void 0 : a.sig) === i || this._statsFetching || (this._statsFetching = !0, Se(this.hass, s, r).then((o) => {
      this._stats = { sig: i, data: o };
    }).catch((o) => console.warn("health-card: statistics fetch failed", o)).finally(() => {
      this._statsFetching = !1;
    }));
  }
  /** Day buckets for an entity, preferring long-term statistics when asked. */
  _bucketsFor(r, t, e, s) {
    if (s && this._stats) {
      const i = this._stats.data[r];
      if (i != null && i.length) return Ae(i, t, e);
    }
    return ke(this._history[r] ?? [], t, e);
  }
  _watchedEntities() {
    var t;
    const r = /* @__PURE__ */ new Set();
    for (const e of ((t = this._config) == null ? void 0 : t.metrics) ?? []) {
      for (const s of this._series(e)) s.entity && r.add(s.entity);
      for (const s of e.secondary ?? []) r.add(s);
      for (const s of Object.values(e.phases ?? {})) s && r.add(s);
      e.score_entity && r.add(e.score_entity);
    }
    return [...r].filter((e) => {
      var s;
      return (s = this.hass) == null ? void 0 : s.states[e];
    });
  }
  /** Goal can be a plain number, a numeric string or an entity id. */
  _resolveGoal(r) {
    if (typeof r == "number") return r;
    if (typeof r != "string" || !r) return NaN;
    const t = this.hass.states[r];
    return parseFloat(t ? t.state : r);
  }
  _handleTap(r, t, e) {
    const s = r.tap_action ?? "popup";
    if (s !== "none") {
      if (s === "link") {
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
      if (s === "more-info") {
        this._moreInfo(e);
        return;
      }
      this._popupDays = r.type === "sleep" && r.score_entity ? 30 : null, this._popup = t;
    }
  }
  _maybeFetch() {
    if (!this.hass || !this._config || this._fetching) return;
    const r = this._watchedEntities();
    if (!r.length) return;
    const t = Math.max(
      ...this._config.metrics.map((o) => o.days ?? this._config.days ?? 7)
    ), e = `${t}|${r.join(",")}`, s = r.map((o) => {
      var n;
      return ((n = this.hass.states[o]) == null ? void 0 : n.last_updated) ?? "";
    }).join("|"), i = Date.now();
    (e !== this._cfgSig || i - this._lastFetch > Le || s !== this._stateSig && i - this._lastFetch > Ue) && (this._fetching = !0, this._cfgSig = e, this._stateSig = s, we(this.hass, r, t).then((o) => {
      this._history = o, this._lastFetch = Date.now();
    }).catch((o) => console.warn("health-card: history fetch failed", o)).finally(() => {
      this._fetching = !1;
    }));
  }
  _series(r) {
    var e;
    if ((e = r.entities) != null && e.length)
      return r.entities.map((s) => typeof s == "string" ? { entity: s } : s);
    const t = [];
    return r.entity && t.push({ entity: r.entity }), r.entity2 && t.push({ entity: r.entity2 }), t;
  }
  _numeric(r, t) {
    if (!r) return NaN;
    const e = t ? r.attributes[t] : r.state;
    return typeof e == "number" ? e : parseFloat(e);
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
    var t;
    const r = ((t = this._config) == null ? void 0 : t.card_style) ?? "withings";
    return Be.includes(r) ? r : "withings";
  }
  render() {
    if (!this.hass || !this._config) return h;
    const r = this._config, e = [
      "cardroot",
      `s-${this._cardStyle()}`,
      r.tiles === !1 ? "flat" : "tiles",
      r.flush ? "flush" : ""
    ].join(" "), s = p`
      ${r.title ? p`<div class="header">
            <div class="title">${r.title}</div>
            ${r.subtitle ? p`<div class="subtitle">${r.subtitle}</div>` : h}
          </div>` : h}
      <div
        class="metrics ${r.layout === "carousel" ? "carousel" : ""}"
        style="--hc-columns:${r.columns ?? 1}"
      >
        ${r.metrics.map((i, a) => this._renderMetric(i, a))}
      </div>
    `;
    return p`
      ${r.background === !1 ? p`<div class="${e} nobg">${s}</div>` : p`<ha-card class=${e}>${s}</ha-card>`}
      ${this._renderPopup()}
    `;
  }
  /** Builds the shared render context for a metric (used by tile and popup). */
  _ctx(r, t) {
    var E, G, V;
    const e = r.type && D[r.type] ? r.type : "custom", s = D[e], i = U(r.color) ?? U(s.color), a = r.name ?? y(this.hass, e), o = r.icon ?? s.icon, n = Object.values(r.phases ?? {}).filter(Boolean);
    let c = this._series(r);
    !c.length && e === "sleep" && n.length && (c = [{ entity: n[0] }]);
    const l = (E = c[0]) != null && E.entity ? this.hass.states[c[0].entity] : void 0, d = Math.max(1, t ?? r.days ?? ((G = this._config) == null ? void 0 : G.days) ?? 7), u = (t ?? 0) > 10, g = r.graph ?? s.graph, f = r.aggregate ?? s.aggregate, b = r.trend ?? s.trend, _ = r.precision ?? s.precision, m = r.unit ?? ((V = c[0]) == null ? void 0 : V.unit) ?? (l == null ? void 0 : l.attributes.unit_of_measurement) ?? s.unit ?? "", w = c.map((M, R) => {
      const q = this._bucketsFor(M.entity, d, f, u);
      return {
        ...M,
        colorResolved: U(M.color) ?? (R === 0 ? i : U(Ht[(R - 1) % Ht.length])),
        buckets: q,
        filled: Lt(q)
      };
    });
    let A;
    if (e === "sleep" && !r.entity && r.phases && w.length) {
      const M = ["deep", "light", "rem"].map((R) => r.phases[R]).filter(Boolean);
      if (M.length) {
        const R = M.map(
          (z) => this._bucketsFor(z, d, f, u)
        ), q = Array.from({ length: d }, (z, lt) => {
          const At = R.map((dt) => dt[lt]).filter(Number.isFinite);
          return At.length ? At.reduce((dt, ee) => dt + ee, 0) : NaN;
        });
        w[0] = { ...w[0], buckets: q, filled: Lt(q) };
        const St = M.map((z) => this._numeric(this.hass.states[z])).filter(Number.isFinite);
        St.length && (A = St.reduce((z, lt) => z + lt, 0));
      }
    }
    return {
      m: r,
      type: e,
      preset: s,
      accent: i,
      name: a,
      icon: o,
      series: c,
      primaryState: l,
      days: d,
      graph: g,
      aggregate: f,
      trendMode: b,
      precision: _,
      unit: m,
      data: w,
      valueOverride: A,
      goalType: r.goal_type ?? s.goalType ?? "atleast",
      multi: !!r.entities && c.length > 1
    };
  }
  _renderMetric(r, t) {
    var n, c;
    const e = this._ctx(r);
    if (!e.series.length || !e.primaryState)
      return p`
        <div class="metric" style="--hc-accent:${e.accent}">
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${e.icon}></ha-icon></div>
            <div class="name">${e.name}</div>
          </div>
          <div class="missing">
            ${(n = e.series[0]) != null && n.entity ? p`${y(this.hass, "entity_missing")}: ${e.series[0].entity}` : y(this.hass, "no_data")}
          </div>
        </div>
      `;
    if (e.type === "score") return this._renderScore(e, t);
    const s = !e.multi || !!r.label, i = e.multi && e.graph !== "progress", a = !e.multi, o = e.multi && e.graph === "progress";
    return p`
      <div
        class="metric ${(r.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${e.accent}"
        @click=${() => this._handleTap(r, t, e.series[0].entity)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${e.icon}></ha-icon></div>
          <div class="name">${e.name}</div>
          ${this._renderScoreBadge(r)}
          <div class="time">
            ${mt(this.hass, e.primaryState.last_updated)}
          </div>
        </div>
        <div class="body ${o ? "stack" : ""}">
          ${s || i || a || (c = r.secondary) != null && c.length ? p`<div class="info">
                ${s ? this._renderValue(
      r,
      e.type,
      e.data,
      e.primaryState,
      e.unit,
      e.precision,
      e.preset.duration,
      e.valueOverride
    ) : h}
                ${i ? this._renderSeriesChips(e.data, e.precision, e.trendMode) : h}
                ${this._renderSecondary(r)}
                ${a ? this._renderStatus(
      r,
      e.data[0],
      e.primaryState,
      e.unit,
      e.precision,
      e.trendMode,
      e.goalType,
      e.valueOverride
    ) : h}
              </div>` : h}
          <div class="chartcell">
            ${this._renderChart(r, e.graph, e.data, e.unit, e.precision)}
          </div>
        </div>
        ${e.type === "sleep" && r.phases ? this._renderSleepPhases(r) : h}
      </div>
    `;
  }
  _renderScore(r, t) {
    const e = r.m, s = r.primaryState, i = this._numeric(s, e.attribute), a = e.max ?? 100;
    return p`
      <div
        class="metric score-metric ${(e.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${r.accent}"
        @click=${() => this._handleTap(e, t, s.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${r.icon}></ha-icon></div>
          <div class="name">${r.name}</div>
          <div class="time">
            ${mt(this.hass, s.last_updated)}
          </div>
        </div>
        <div class="scorewrap">
          ${De(this._cardStyle(), r.accent, this._scoreColor(i, a), Math.max(0, Math.min(Number.isFinite(i) ? i / a : 0, 1)))}
          <div class="scoreinner">
            <div class="scorenum">${v(this.hass, i, e.precision ?? 0)}</div>
            <div class="scoremax">${y(this.hass, "of")} ${a}</div>
          </div>
        </div>
        <div class="score-status">
          ${this._renderStatus(e, r.data[0], s, "", 0, e.trend ?? "up_good", "atleast")}
        </div>
      </div>
    `;
  }
  /** Traffic-light color for score visuals, driven by the score ratio. */
  _scoreColor(r, t) {
    const e = Number.isFinite(r) ? r / t : 0;
    return e >= 0.75 ? "var(--success-color, #43a047)" : e >= 0.45 ? "var(--warning-color, #fb8c00)" : "var(--error-color, #e53935)";
  }
  /** Traffic-light badge for a metric's score_entity (e.g. sleep score). */
  _renderScoreBadge(r) {
    if (!r.score_entity) return h;
    const t = this._numeric(this.hass.states[r.score_entity]);
    return Number.isFinite(t) ? p`<span class="scorebadge" style="background:${this._scoreColor(t, 100)}">
      ${v(this.hass, t, 0)}
    </span>` : h;
  }
  /** Calendar heatmap: one cell per day, tinted by the score entity's value. */
  _renderScoreCalendar(r, t) {
    const e = I(this.hass) === "de" ? "de-DE" : "en-US", s = /* @__PURE__ */ new Date();
    s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (t - 1));
    const i = (s.getDay() + 6) % 7, a = new Date(2024, 0, 1), o = Array.from(
      { length: 7 },
      (n, c) => new Date(a.getTime() + c * 864e5).toLocaleDateString(e, {
        weekday: "narrow"
      })
    );
    return p`<div class="cal">
      ${o.map((n) => p`<div class="cal-head">${n}</div>`)}
      ${Array.from({ length: i }, () => p`<div></div>`)}
      ${r.map((n, c) => {
      const l = new Date(s.getTime() + c * 864e5);
      if (!Number.isFinite(n))
        return p`<div class="cal-cell empty">${l.getDate()}</div>`;
      const d = this._scoreColor(n, 100);
      return p`<div
          class="cal-cell"
          title=${Math.round(n)}
          style="background: color-mix(in srgb, ${d} 30%, transparent); color: ${d}"
        >
          ${l.getDate()}
        </div>`;
    })}
    </div>`;
  }
  /** Formats a value the same way the metric's big value is formatted. */
  _fmtMetricValue(r, t) {
    var e;
    if (r.m.duration ?? r.preset.duration) {
      const s = Object.values(r.m.phases ?? {}).map((a) => {
        var o;
        return a ? (o = this.hass.states[a]) == null ? void 0 : o.attributes.unit_of_measurement : void 0;
      }).find(Boolean), i = r.m.unit ?? (r.valueOverride !== void 0 ? s : (e = r.primaryState) == null ? void 0 : e.attributes.unit_of_measurement);
      return st(t, i);
    }
    return rt(v(this.hass, t, r.precision), r.unit);
  }
  _dayLabels(r) {
    if (r > 14) return h;
    const t = I(this.hass) === "de" ? "de-DE" : "en-US", e = /* @__PURE__ */ new Date();
    e.setHours(0, 0, 0, 0);
    const s = Array.from(
      { length: r },
      (i, a) => new Date(e.getTime() - (r - 1 - a) * 864e5).toLocaleDateString(t, {
        weekday: r > 9 ? "narrow" : "short"
      })
    );
    return p`<div class="daylabels" style="--hc-days:${r}">
      ${s.map((i) => p`<span>${i}</span>`)}
    </div>`;
  }
  _renderPopup() {
    if (this._popup === null || !this._config) return h;
    const r = this._config.metrics[this._popup];
    if (!r) return h;
    const t = this._ctx(r, this._popupDays ?? void 0);
    if (!t.primaryState) return h;
    const e = t.primaryState, s = t.data[0].buckets.filter(Number.isFinite), i = ft(t.data[0].filled), a = this._resolveGoal(r.goal), o = t.valueOverride ?? this._numeric(e, r.attribute), n = [];
    if (s.length && (n.push(
      {
        label: y(this.hass, "stat_min"),
        value: this._fmtMetricValue(t, Math.min(...s))
      },
      {
        label: y(this.hass, "stat_avg"),
        value: this._fmtMetricValue(
          t,
          s.reduce((m, w) => m + w, 0) / s.length
        )
      },
      {
        label: y(this.hass, "stat_max"),
        value: this._fmtMetricValue(t, Math.max(...s))
      }
    ), Number.isFinite(i) && i !== 0 && n.push({
      label: y(this.hass, "stat_trend"),
      value: `${i > 0 ? "+" : ""}${this._fmtMetricValue(t, i)}`
    })), Number.isFinite(a) && Number.isFinite(o)) {
      const m = t.goalType === "atmost" ? o - a : a - o;
      n.push({
        label: y(this.hass, "goal_left"),
        value: m > 0 ? this._fmtMetricValue(t, m) : "✓"
      });
    }
    const c = t.days, l = c > 16, d = t.graph === "bar" || t.graph === "progress" ? "bar" : "line", u = l ? { w: c * 10, h: 90, dots: !1 } : {}, g = d === "bar" ? jt(
      t.data[0].buckets,
      t.data[0].colorResolved,
      Number.isFinite(a) ? a : void 0,
      u
    ) : Bt(
      t.data.map((m) => ({ values: m.filled, color: m.colorResolved })),
      u
    ), f = this._popupDays ?? t.days, b = Math.min(t.days, 91), _ = t.type === "sleep" && r.score_entity && this.hass.states[r.score_entity] ? this._renderScoreCalendar(
      this._bucketsFor(r.score_entity, b, "mean", (this._popupDays ?? 0) > 10),
      b
    ) : h;
    return p`
      <div class="backdrop s-${this._cardStyle()}" @click=${() => this._popup = null}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          style="--hc-accent:${t.accent}"
          @click=${(m) => m.stopPropagation()}
        >
          <div class="dialog-head">
            <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
            <div class="dialog-title">${t.name}</div>
            ${this._renderScoreBadge(r)}
            <button
              class="close"
              aria-label=${y(this.hass, "close")}
              @click=${() => this._popup = null}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-value">
            ${this._renderValue(
      r,
      t.type,
      t.data,
      e,
      t.unit,
      t.precision,
      t.preset.duration,
      t.valueOverride
    )}
            <div class="time">${mt(this.hass, e.last_updated)}</div>
          </div>
          ${this._renderStatus(
      r,
      t.data[0],
      e,
      t.unit,
      t.precision,
      t.trendMode,
      t.goalType,
      t.valueOverride
    )}
          <div class="periods">
            ${$.POPUP_PERIODS.map(
      (m) => p`<button
                class="period ${f === m.days ? "active" : ""}"
                @click=${() => {
        this._popupDays = m.days;
      }}
              >
                ${y(this.hass, `period_${m.key}`)}
              </button>`
    )}
          </div>
          ${t.graph === "progress" ? this._renderChart(r, "progress", t.data, t.unit, t.precision) : h}
          <div class="popup-chart">
            ${l ? p`<div class="chart-scroll">
                  <div style="width:${c * 12}px">${g}</div>
                </div>` : p`${g}${this._dayLabels(c)}`}
          </div>
          ${n.length ? p`<div class="stats">
                ${n.map(
      (m) => p`<div class="stat">
                    <div class="stat-label">${m.label}</div>
                    <div class="stat-value">${m.value}</div>
                  </div>`
    )}
              </div>` : h}
          ${_}
          ${t.multi ? this._renderSeriesChips(t.data, t.precision, t.trendMode) : h}
          ${t.type === "sleep" && r.phases ? this._renderSleepPhases(r) : h}
          ${this._renderSecondary(r)}
          <button
            class="openha"
            @click=${() => {
      var m;
      this._popup = null, this._moreInfo((m = t.series[0]) == null ? void 0 : m.entity);
    }}
          >
            <ha-icon icon="mdi:chart-box-outline"></ha-icon>
            ${y(this.hass, "open_ha")}
          </button>
        </div>
      </div>
    `;
  }
  _renderSleepPhases(r) {
    const t = {
      deep: "var(--deep-purple-color, #673AB7)",
      light: "var(--light-blue-color, #03A9F4)",
      rem: "var(--cyan-color, #00BCD4)",
      awake: "var(--amber-color, #FFC107)"
    }, e = ["deep", "light", "rem", "awake"].map((s) => {
      var n;
      const i = (n = r.phases) == null ? void 0 : n[s], a = i ? this.hass.states[i] : void 0, o = this._numeric(a);
      if (Number.isFinite(o))
        return { key: s, v: o, unit: a == null ? void 0 : a.attributes.unit_of_measurement, color: t[s] };
    }).filter((s) => !!s);
    return e.length ? p`
      <div class="segbar">
        ${e.map(
      (s) => p`<div class="seg" style="flex-grow:${s.v};background:${s.color}"></div>`
    )}
      </div>
      <div class="phases">
        ${e.map(
      (s) => p`<div class="phase">
            <span class="phasedot" style="background:${s.color}"></span>
            <span>${y(this.hass, `phase_${s.key}`)}</span>
            <span class="phaseval">${st(s.v, s.unit)}</span>
          </div>`
    )}
      </div>
    ` : h;
  }
  _renderValue(r, t, e, s, i, a, o, n) {
    if (r.label) return p`<div class="value">${r.label}</div>`;
    if (t === "blood_pressure" && e.length >= 2) {
      const l = this._numeric(s, r.attribute), d = this._numeric(this.hass.states[e[1].entity]);
      return p`<div class="value">
          ${v(this.hass, l, 0)}/${v(this.hass, d, 0)}
          <span class="unit">${i}</span>
        </div>
        <div class="bplabels">
          <span class="bpitem">
            <span class="bpdot" style="background:${e[0].colorResolved}"></span>SYS
            ${v(this.hass, l, 0)}
          </span>
          <span class="bpitem">
            <span class="bpdot" style="background:${e[1].colorResolved}"></span>DIA
            ${v(this.hass, d, 0)}
          </span>
        </div>`;
    }
    const c = n ?? this._numeric(s, r.attribute);
    if (!Number.isFinite(c))
      return p`<div class="value">${s.state}</div>`;
    if (r.duration ?? o) {
      const l = Object.values(r.phases ?? {}).map((d) => {
        var u;
        return d ? (u = this.hass.states[d]) == null ? void 0 : u.attributes.unit_of_measurement : void 0;
      }).find(Boolean);
      return p`<div class="value">
        ${st(
        c,
        r.unit ?? (n !== void 0 ? l : s.attributes.unit_of_measurement)
      )}
      </div>`;
    }
    return p`<div class="value">
      ${v(this.hass, c, a)}<span class="unit">${i}</span>
    </div>`;
  }
  _renderSeriesChips(r, t, e) {
    return p`<div class="serieslist">
      ${r.map((s) => {
      const i = this.hass.states[s.entity], a = this._numeric(i), o = s.unit ?? (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "", n = s.name ?? (i == null ? void 0 : i.attributes.friendly_name) ?? s.entity, c = ft(s.filled), l = Number.isFinite(c) ? c > 0 ? "mdi:arrow-top-right" : c < 0 ? "mdi:arrow-bottom-right" : "mdi:arrow-right" : "mdi:minus";
      return p`<div class="serieschip">
          ${e !== "none" ? p`<span class="dotarrow" style="background:${s.colorResolved}">
                <ha-icon .icon=${l}></ha-icon>
              </span>` : h}
          <span class="serieslabel">
            ${n}: ${Number.isFinite(a) ? rt(v(this.hass, a, t), o) : (i == null ? void 0 : i.state) ?? "–"}
          </span>
        </div>`;
    })}
    </div>`;
  }
  _renderSecondary(r) {
    var e;
    if (!((e = r.secondary) != null && e.length)) return h;
    const t = r.secondary.map((s) => {
      const i = this.hass.states[s];
      if (!i) return;
      const a = this._numeric(i), o = i.attributes.unit_of_measurement ?? "";
      return Number.isFinite(a) ? rt(v(this.hass, a), o) : i.state;
    }).filter(Boolean);
    return t.length ? p`<div class="secondary">${t.join(" • ")}</div>` : h;
  }
  _renderStatus(r, t, e, s, i, a, o = "atleast", n) {
    const c = n ?? this._numeric(e, r.attribute), l = this._resolveGoal(r.goal);
    if (Number.isFinite(l) && Number.isFinite(c)) {
      const A = this._resolveGoal(r.start);
      let E = NaN;
      if (Number.isFinite(A) && A !== l ? E = (A - c) / (A - l) * 100 : l > 0 && (E = o === "atmost" ? l / c * 100 : c / l * 100), !Number.isNaN(E)) {
        const G = Math.round(Math.min(Math.max(E, 0), 999)), V = G >= 100;
        return p`<div class="status ${V ? "good" : ""}">
          <ha-icon .icon=${V ? "mdi:check-circle" : "mdi:flag-outline"}></ha-icon>
          <span>${y(this.hass, "goal")}: ${G} %</span>
        </div>`;
      }
    }
    if (a === "none") return h;
    const d = ft(t.filled);
    if (!Number.isFinite(d)) return h;
    const u = t.filled.find(Number.isFinite) ?? 0, g = Math.abs(d) < Math.max(Math.abs(u) * 5e-3, 1e-9), f = g || a === "neutral" ? "neutral" : d > 0 == (a === "up_good") ? "good" : "bad", b = g ? "mdi:arrow-right" : d > 0 ? "mdi:arrow-top-right" : "mdi:arrow-bottom-right", _ = r.type && D[r.type] ? r.type : "custom", m = r.duration ?? D[_].duration, w = g ? y(this.hass, "stable") : m ? st(Math.abs(d), s || void 0) : `${v(this.hass, Math.abs(d), i)}${s ? ` ${s}` : ""}`;
    return p`<div class="status ${f}">
      <span class="dotarrow"><ha-icon .icon=${b}></ha-icon></span>
      <span>${w}</span>
    </div>`;
  }
  _renderChart(r, t, e, s, i) {
    if (t === "line")
      return p`${Bt(
        e.map((a) => ({ values: a.filled, color: a.colorResolved }))
      )}`;
    if (t === "bar") {
      const a = this._resolveGoal(r.goal);
      return p`${jt(
        e[0].buckets,
        e[0].colorResolved,
        Number.isFinite(a) ? a : void 0
      )}`;
    }
    if (t === "progress") {
      const a = e.map((o) => {
        const n = this.hass.states[o.entity], c = this._numeric(n), l = this._resolveGoal(o.goal ?? r.goal);
        if (!Number.isFinite(c) || !Number.isFinite(l) || l <= 0) return h;
        const d = Math.max(0, Math.min(c / l * 100, 100)), u = o.unit ?? (n == null ? void 0 : n.attributes.unit_of_measurement) ?? s;
        return p`<div class="pbar">
          ${e.length > 1 ? p`<div class="pbar-label">
                <span>${o.name ?? (n == null ? void 0 : n.attributes.friendly_name) ?? o.entity}</span>
                <span>${rt(v(this.hass, c, i), u)}</span>
              </div>` : h}
          <div class="ptrack" style="--hc-p:${o.colorResolved}">
            <div class="pfill" style="width:${d}%"></div>
          </div>
        </div>`;
      });
      return p`<div class="pbars">${a}</div>`;
    }
    return h;
  }
};
$.POPUP_PERIODS = [
  { key: "week", days: 7 },
  { key: "month", days: 30 },
  { key: "quarter", days: 90 },
  { key: "year", days: 365 }
];
$.styles = Vt`
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
    /* tiles off: no style may draw tile borders or shadows (e.g. mirror) */
    .cardroot.flat .metric {
      border: none;
      box-shadow: none;
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
      grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
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
    .scorebadge {
      min-width: 26px;
      height: 20px;
      padding: 0 7px;
      border-radius: 10px;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      box-sizing: border-box;
    }
    .periods {
      display: flex;
      gap: 6px;
    }
    .period {
      border: none;
      cursor: pointer;
      padding: 5px 14px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 12px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .period.active {
      background: var(--hc-accent);
      color: var(--hc-card-bg);
    }
    .s-mirror .period {
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.75);
    }
    .s-mirror .period.active {
      background: #fff;
      color: #000;
    }
    .chart-scroll {
      overflow-x: auto;
      scrollbar-width: thin;
    }
    .chart-scroll > div {
      min-width: 100%;
    }
    .cal {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }
    .cal-head {
      font-size: 10px;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .cal-cell {
      aspect-ratio: 1;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
    }
    .cal-cell.empty {
      background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    .s-mirror .cal-cell.empty {
      background: rgba(255, 255, 255, 0.08);
    }
  `;
O([
  kt({ attribute: !1 })
], $.prototype, "hass", 2);
O([
  T()
], $.prototype, "_config", 2);
O([
  T()
], $.prototype, "_history", 2);
O([
  T()
], $.prototype, "_popup", 2);
O([
  T()
], $.prototype, "_popupDays", 2);
O([
  T()
], $.prototype, "_stats", 2);
$ = O([
  Xt("health-card")
], $);
console.info(
  `%c HEALTH-CARD %c v${He} `,
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
  $ as HealthCard
};
