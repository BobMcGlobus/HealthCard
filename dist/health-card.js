/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis, vt = it.ShadowRoot && (it.ShadyCSS === void 0 || it.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = Symbol(), Et = /* @__PURE__ */ new WeakMap();
let Kt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== $t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
const ne = (r) => new Kt(typeof r == "string" ? r : r + "", void 0, $t), Yt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, a) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[a + 1], r[0]);
  return new Kt(e, r, $t);
}, ce = (r, t) => {
  if (vt) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = it.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, Ct = vt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ne(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: le, defineProperty: de, getOwnPropertyDescriptor: he, getOwnPropertyNames: pe, getOwnPropertySymbols: ue, getPrototypeOf: me } = Object, D = globalThis, Nt = D.trustedTypes, ge = Nt ? Nt.emptyScript : "", pt = D.reactiveElementPolyfillSupport, Y = (r, t) => r, ot = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ge : null;
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
} }, wt = (r, t) => !le(r, t), Dt = { attribute: !0, type: String, converter: ot, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), D.litPropertyMetadata ?? (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let j = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Dt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && de(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: a } = he(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Dt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Y("elementProperties"))) return;
    const t = me(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Y("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Y("properties"))) {
      const e = this.properties, s = [...pe(e), ...ue(e)];
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
      for (const i of s) e.unshift(Ct(i));
    } else t !== void 0 && e.push(Ct(t));
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
    return ce(t, this.constructor.elementStyles), t;
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
      if (i === !1 && (a = this[t]), s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? wt)(a, e) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
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
j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, j[Y("elementProperties")] = /* @__PURE__ */ new Map(), j[Y("finalized")] = /* @__PURE__ */ new Map(), pt == null || pt({ ReactiveElement: j }), (D.reactiveElementVersions ?? (D.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, Ft = (r) => r, at = J.trustedTypes, Tt = at ? at.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Jt = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + N, fe = `<${Xt}>`, z = document, X = () => z.createComment(""), Q = (r) => r === null || typeof r != "object" && typeof r != "function", kt = Array.isArray, be = (r) => kt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", ut = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Rt = />/g, F = RegExp(`>|${ut}(?:([^\\s"'>=/]+)(${ut}*=${ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ot = /'/g, zt = /"/g, Qt = /^(?:script|style|textarea|title)$/i, te = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), m = te(1), $ = te(2), W = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), T = z.createTreeWalker(z, 129);
function ee(r, t) {
  if (!kt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Tt !== void 0 ? Tt.createHTML(t) : t;
}
const ye = (r, t) => {
  const e = r.length - 1, s = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = K;
  for (let n = 0; n < e; n++) {
    const c = r[n];
    let l, d, p = -1, f = 0;
    for (; f < c.length && (o.lastIndex = f, d = o.exec(c), d !== null); ) f = o.lastIndex, o === K ? d[1] === "!--" ? o = Pt : d[1] !== void 0 ? o = Rt : d[2] !== void 0 ? (Qt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = F) : d[3] !== void 0 && (o = F) : o === F ? d[0] === ">" ? (o = i ?? K, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? F : d[3] === '"' ? zt : Ot) : o === zt || o === Ot ? o = F : o === Pt || o === Rt ? o = K : (o = F, i = void 0);
    const y = o === F && r[n + 1].startsWith("/>") ? " " : "";
    a += o === K ? c + fe : p >= 0 ? (s.push(l), c.slice(0, p) + Jt + c.slice(p) + N + y) : c + N + (p === -2 ? n : y);
  }
  return [ee(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class tt {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const n = t.length - 1, c = this.parts, [l, d] = ye(t, e);
    if (this.el = tt.createElement(l, s), T.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = T.nextNode()) !== null && c.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Jt)) {
          const f = d[o++], y = i.getAttribute(p).split(N), x = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: a, name: x[2], strings: y, ctor: x[1] === "." ? xe : x[1] === "?" ? ve : x[1] === "@" ? $e : ct }), i.removeAttribute(p);
        } else p.startsWith(N) && (c.push({ type: 6, index: a }), i.removeAttribute(p));
        if (Qt.test(i.tagName)) {
          const p = i.textContent.split(N), f = p.length - 1;
          if (f > 0) {
            i.textContent = at ? at.emptyScript : "";
            for (let y = 0; y < f; y++) i.append(p[y], X()), T.nextNode(), c.push({ type: 2, index: ++a });
            i.append(p[f], X());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Xt) c.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(N, p + 1)) !== -1; ) c.push({ type: 7, index: a }), p += N.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const s = z.createElement("template");
    return s.innerHTML = t, s;
  }
}
function V(r, t, e = r, s) {
  var o, n;
  if (t === W) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const a = Q(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), a === void 0 ? i = void 0 : (i = new a(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = V(r, i._$AS(r, t.values), i, s)), t;
}
class _e {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? z).importNode(e, !0);
    T.currentNode = i;
    let a = T.nextNode(), o = 0, n = 0, c = s[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new et(a, a.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(a, c.name, c.strings, this, t) : c.type === 6 && (l = new we(a, this, t)), this._$AV.push(l), c = s[++n];
      }
      o !== (c == null ? void 0 : c.index) && (a = T.nextNode(), o++);
    }
    return T.currentNode = z, i;
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
    t = V(this, t, e), Q(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== W && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : be(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && Q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = tt.createElement(ee(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(e);
    else {
      const o = new _e(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ht.get(t.strings);
    return e === void 0 && Ht.set(t.strings, e = new tt(t)), e;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const a of t) i === e.length ? e.push(s = new et(this.O(X()), this.O(X()), this, this.options)) : s = e[i], s._$AI(a), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = Ft(t).nextSibling;
      Ft(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
let ct = class {
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
    if (a === void 0) t = V(this, t, e, 0), o = !Q(t) || t !== this._$AH && t !== W, o && (this._$AH = t);
    else {
      const n = t;
      let c, l;
      for (t = a[0], c = 0; c < a.length - 1; c++) l = V(this, n[s + c], e, c), l === W && (l = this._$AH[c]), o || (o = !Q(l) || l !== this._$AH[c]), l === h ? t = h : t !== h && (t += (l ?? "") + a[c + 1]), this._$AH[c] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
class xe extends ct {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class ve extends ct {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class $e extends ct {
  constructor(t, e, s, i, a) {
    super(t, e, s, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = V(this, t, e, 0) ?? h) === W) return;
    const s = this._$AH, i = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== h && (s === h || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class we {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const mt = J.litHtmlPolyfillSupport;
mt == null || mt(tt, et), (J.litHtmlVersions ?? (J.litHtmlVersions = [])).push("3.3.3");
const ke = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new et(t.insertBefore(X(), a), a, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis;
class G extends j {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ke(e, this.renderRoot, this.renderOptions);
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
    return W;
  }
}
var Zt;
G._$litElement$ = !0, G.finalized = !0, (Zt = R.litElementHydrateSupport) == null || Zt.call(R, { LitElement: G });
const gt = R.litElementPolyfillSupport;
gt == null || gt({ LitElement: G });
(R.litElementVersions ?? (R.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = { attribute: !0, type: String, converter: ot, reflect: !1, hasChanged: wt }, Ae = (r = Se, t, e) => {
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
function St(r) {
  return (t, e) => typeof e == "object" ? Ae(r, t, e) : ((s, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, s), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function H(r) {
  return St({ ...r, state: !0, attribute: !1 });
}
const xt = {
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
}, Me = Object.keys(xt);
function I(r) {
  if (r)
    return r === "primary" ? "var(--primary-color)" : r === "accent" ? "var(--accent-color)" : xt[r] ? `var(--${r}-color, ${xt[r]})` : r;
}
const P = {
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
}, Lt = ["teal", "orange", "pink", "cyan", "lime"], Ut = {
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
    period_day: "D",
    period_week: "W",
    period_month: "M",
    period_quarter: "3M",
    period_year: "Y",
    period_max: "Max",
    event_times: "Times of day (7 days)"
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
    period_day: "T",
    period_week: "W",
    period_month: "M",
    period_quarter: "3M",
    period_year: "J",
    period_max: "Max",
    event_times: "Uhrzeiten (7 Tage)"
  }
};
function O(r) {
  var e;
  return (((e = r == null ? void 0 : r.locale) == null ? void 0 : e.language) ?? (r == null ? void 0 : r.language) ?? "en").startsWith("de") ? "de" : "en";
}
function v(r, t) {
  return Ut[O(r)][t] ?? Ut.en[t] ?? t;
}
function k(r, t, e) {
  if (!Number.isFinite(t)) return "–";
  const s = O(r) === "de" ? "de-DE" : "en-US";
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
function ft(r, t) {
  const e = new Date(t);
  if (isNaN(e.getTime())) return "";
  const s = O(r) === "de" ? "de-DE" : "en-US", i = /* @__PURE__ */ new Date(), a = (n, c) => n.getFullYear() === c.getFullYear() && n.getMonth() === c.getMonth() && n.getDate() === c.getDate();
  if (a(e, i))
    return e.toLocaleTimeString(s, { hour: "numeric", minute: "2-digit" });
  const o = new Date(i.getTime() - 864e5);
  return a(e, o) ? v(r, "yesterday") : e.toLocaleDateString(s, { day: "numeric", month: "short" });
}
async function Ee(r, t, e) {
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
function Ce(r, t, e) {
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
async function Ne(r, t, e, s = "day") {
  if (!t.length) return {};
  const i = /* @__PURE__ */ new Date();
  i.setHours(0, 0, 0, 0), s === "month" ? (i.setDate(1), i.setMonth(i.getMonth() - (e - 1))) : i.setDate(i.getDate() - (e - 1));
  const a = await r.callWS({
    type: "recorder/statistics_during_period",
    start_time: i.toISOString(),
    end_time: (/* @__PURE__ */ new Date()).toISOString(),
    statistic_ids: t,
    period: s,
    types: ["mean", "min", "max", "state", "sum"]
  }), o = (c) => typeof c == "number" && Number.isFinite(c) ? c : null, n = {};
  for (const c of t)
    n[c] = ((a == null ? void 0 : a[c]) ?? []).map((l) => ({
      start: typeof l.start == "number" ? l.start : new Date(l.start).getTime(),
      mean: o(l.mean),
      min: o(l.min),
      max: o(l.max),
      state: o(l.state),
      sum: o(l.sum)
    }));
  return n;
}
function Bt(r, t) {
  return t === "min" ? r.min : t === "max" || t === "sum" ? r.max ?? r.mean : t === "last" ? r.state ?? r.mean : r.mean;
}
function jt(r, t, e, s = "day") {
  const i = new Array(t).fill(NaN);
  if (s === "month") {
    const n = /* @__PURE__ */ new Date(), c = n.getFullYear() * 12 + n.getMonth();
    for (const l of r) {
      const d = new Date(l.start), p = d.getFullYear() * 12 + d.getMonth() - (c - (t - 1));
      if (p < 0 || p >= t) continue;
      const f = Bt(l, e);
      f !== null && (i[p] = f);
    }
    return i;
  }
  const a = /* @__PURE__ */ new Date();
  a.setHours(0, 0, 0, 0);
  const o = a.getTime() - (t - 1) * 864e5;
  for (const n of r) {
    const c = Math.floor((n.start - o) / 864e5);
    if (c < 0 || c >= t) continue;
    const l = Bt(n, e);
    l !== null && (i[c] = l);
  }
  return i;
}
function De(r, t, e) {
  const s = /* @__PURE__ */ new Date();
  s.setMinutes(0, 0, 0);
  const i = s.getTime() - (t - 1) * 36e5, a = Array.from({ length: t }, () => []);
  for (const o of r) {
    const n = Math.floor((o.t - i) / 36e5);
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
function It(r) {
  const t = [...r];
  let e = NaN;
  for (let i = 0; i < t.length; i++)
    Number.isFinite(t[i]) ? e = t[i] : t[i] = e;
  let s = NaN;
  for (let i = t.length - 1; i >= 0; i--)
    Number.isFinite(t[i]) ? s = t[i] : t[i] = s;
  return t;
}
function bt(r) {
  const t = r.filter(Number.isFinite);
  return t.length < 2 ? NaN : t[t.length - 1] - t[0];
}
const se = 220, ie = 60, S = 7, nt = "color-mix(in srgb, var(--primary-text-color) 14%, transparent)";
function oe(r, t) {
  var i;
  const e = r.yFmt ? Math.max(26, ...t.map((a) => r.yFmt(a).length * 5.6 + 10)) : S, s = (i = r.xMarks) != null && i.some((a) => a.label) ? 15 : S;
  return { padL: e, padB: s };
}
function Fe(r) {
  const t = r.filter(Number.isFinite), e = Math.min(...t), s = Math.max(...t), i = s - e || Math.abs(s) * 0.1 || 1;
  return { lo: e - i * 0.18, hi: s + i * 0.18 };
}
function Gt(r, t = {}) {
  const e = t.w ?? se, s = t.h ?? ie, i = t.dots ?? !0, a = r.filter((g) => g.values.some(Number.isFinite));
  if (!a.length) return h;
  const { lo: o, hi: n } = Fe(a.flatMap((g) => g.values)), c = Math.max(...a.map((g) => g.values.length)), l = t.yFmt ? [n - (n - o) * 0.08, (o + n) / 2, o + (n - o) * 0.08] : [], { padL: d, padB: p } = oe(t, l), f = (g) => d + g * (e - d - S) / Math.max(c - 1, 1), y = (g) => s - p - (g - o) / (n - o) * (s - p - S), x = l.map(
    (g) => $`
      <line x1=${d} x2=${e - S} y1=${y(g)} y2=${y(g)}
        stroke=${nt} stroke-width="1" stroke-dasharray="2 3"/>
      <text class="axis" x=${d - 5} y=${y(g)} text-anchor="end"
        dominant-baseline="middle">${t.yFmt(g)}</text>`
  ), M = (t.xMarks ?? []).map(
    (g) => $`
      ${g.line ? $`<line x1=${f(g.i)} x2=${f(g.i)} y1=${S} y2=${s - p}
              stroke=${nt} stroke-width="1"/>` : h}
      ${g.label ? $`<text class="axis" x=${f(g.i)} y=${s - 3} text-anchor="middle">${g.label}</text>` : h}`
  ), A = a.map((g) => {
    const _ = g.values.map((b, w) => ({ x: f(w), y: y(b), ok: Number.isFinite(b) })).filter((b) => b.ok);
    if (!_.length) return h;
    let u = `M ${_[0].x} ${_[0].y}`;
    for (let b = 1; b < _.length; b++) {
      const w = (_[b - 1].x + _[b].x) / 2;
      u += ` C ${w} ${_[b - 1].y}, ${w} ${_[b].y}, ${_[b].x} ${_[b].y}`;
    }
    return $`
      <path d=${u} fill="none" stroke=${g.color} stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
      ${i ? _.map(
      (b) => $`<circle cx=${b.x} cy=${b.y} r="3.1" fill="var(--hc-dot-fill)"
                stroke=${g.color} stroke-width="2"/>`
    ) : h}
    `;
  });
  return m`<svg class="chart" viewBox="0 0 ${e} ${s}" aria-hidden="true">
    ${x}${M}${A}
  </svg>`;
}
function Wt(r, t, e, s = {}) {
  const i = s.w ?? se, a = s.h ?? ie;
  if (!r.some((u) => Number.isFinite(u) && u > 0)) return h;
  const o = r.map((u) => Number.isFinite(u) && u > 0 ? u : 0), n = Math.max(...o, e ?? 0) || 1, c = o.length, l = s.yFmt ? [n, n / 2] : [], { padL: d, padB: p } = oe(s, l), f = (i - d - S) / c, y = Math.min(f * 0.55, 14), x = (u) => u / n * (a - p - S), M = l.map(
    (u) => $`
      <line x1=${d} x2=${i - S} y1=${a - p - x(u)} y2=${a - p - x(u)}
        stroke=${nt} stroke-width="1" stroke-dasharray="2 3"/>
      <text class="axis" x=${d - 5} y=${a - p - x(u)} text-anchor="end"
        dominant-baseline="middle">${s.yFmt(u)}</text>`
  ), A = (s.xMarks ?? []).map((u) => {
    const b = d + u.i * f + f / 2;
    return $`
      ${u.line ? $`<line x1=${b} x2=${b} y1=${S} y2=${a - p}
              stroke=${nt} stroke-width="1"/>` : h}
      ${u.label ? $`<text class="axis" x=${b} y=${a - 3} text-anchor="middle">${u.label}</text>` : h}`;
  }), g = o.map((u, b) => {
    const w = Math.max(x(u), u > 0 ? 3 : 1.5), E = d + b * f + (f - y) / 2;
    return $`<rect x=${E} y=${a - p - w} width=${y} height=${w}
      rx=${Math.min(y / 2, 4)} fill=${t} opacity=${u > 0 ? 1 : 0.25}/>`;
  }), _ = Number.isFinite(e) ? $`<line x1=${d} x2=${i - S} y1=${a - p - x(e)} y2=${a - p - x(e)}
        stroke=${t} stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>` : h;
  return m`<svg class="chart" viewBox="0 0 ${i} ${a}" aria-hidden="true">
    ${M}${A}${_}${g}
  </svg>`;
}
const Vt = [
  "var(--amber-color, #FFC107)",
  "var(--purple-color, #9C27B0)",
  "var(--pink-color, #E91E63)"
], Te = "color-mix(in srgb, var(--primary-text-color) 16%, transparent)";
function Pe(r, t) {
  const e = (i) => Math.abs(Math.sin(i * 127.1) * 43758.5453 % 1), s = [];
  for (let i = 0; i < 2; i++) {
    const a = i === 0 ? 74 : 88, o = i === 0 ? 26 : 32;
    for (let n = 0; n < o; n++) {
      const c = n / o, l = c * Math.PI * 2 - Math.PI / 2 + e(n + i * 100) * 0.12, d = a + (e(n * 3 + i * 7) - 0.5) * 6, p = 2.4 + e(n * 7 + i * 13) * 2.4, f = c < t ? Vt[Math.floor(e(n * 11 + i * 29) * Vt.length)] : Te;
      s.push(
        $`<circle cx=${100 + Math.cos(l) * d} cy=${100 + Math.sin(l) * d}
          r=${p} fill=${f} opacity="0.75"/>`
      );
    }
  }
  return m`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="62" fill="color-mix(in srgb, ${r} 10%, transparent)" />
    ${s}
  </svg>`;
}
function yt(r, t, e = 10) {
  const i = 2 * Math.PI * 82;
  return m`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r=${82} fill="none" stroke=${r} opacity="0.16"
      stroke-width=${e}/>
    <circle cx="100" cy="100" r=${82} fill="none" stroke=${r} stroke-width=${e}
      stroke-linecap="round" stroke-dasharray="${i * Math.max(t, 0.02)} ${i}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}
function Re(r, t) {
  const i = 2 * Math.PI * 79, a = `${i * Math.max(t, 0.02)} ${i}`, o = 79 + 13 * 0.27, n = 2 * Math.PI * o, c = 0.18 + t * 0.5, l = t >= 0.95;
  return m`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <defs>
      <filter id="hc-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
    ${l ? $`<circle cx="100" cy="100" r="96" fill="none" stroke=${r}
          stroke-width="2.5" opacity="0.4" filter="url(#hc-glow)" class="glowpulse"/>` : h}
    <circle cx="100" cy="100" r=${79} fill="none" stroke=${r}
      stroke-width=${20} stroke-linecap="round" stroke-dasharray=${a}
      transform="rotate(-90 100 100)" filter="url(#hc-glow)" opacity=${c}
      class=${l ? "glowpulse" : ""}/>
    <circle cx="100" cy="100" r=${79} fill="none" stroke-width=${13}
      stroke="color-mix(in srgb, ${r} 13%, transparent)"/>
    <circle cx="100" cy="100" r=${79 + 13 / 2 - 0.6} fill="none" stroke-width="1"
      stroke="color-mix(in srgb, #fff 30%, transparent)"/>
    <circle cx="100" cy="100" r=${79 - 13 / 2 + 0.6} fill="none" stroke-width="1"
      stroke="color-mix(in srgb, #fff 12%, transparent)"/>
    <circle cx="100" cy="100" r=${79} fill="none" stroke=${r} stroke-width=${13}
      stroke-linecap="round" stroke-dasharray=${a} transform="rotate(-90 100 100)"/>
    <circle cx="100" cy="100" r=${o} fill="none" stroke="rgba(255, 255, 255, 0.55)"
      stroke-width="1.6" stroke-linecap="round"
      stroke-dasharray="${n * Math.max(t, 0.02)} ${n}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}
function Oe(r, t, e) {
  const s = [];
  for (let n = 0; n <= 144; n++) {
    const c = n / 144 * 2 * Math.PI, l = 72 + 7 * Math.cos(12 * c);
    s.push(
      `${n ? "L" : "M"} ${(100 + Math.cos(c) * l).toFixed(1)} ${(100 + Math.sin(c) * l).toFixed(1)}`
    );
  }
  const a = 92, o = 2 * Math.PI * a;
  return m`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <path d="${s.join(" ")} Z" fill="color-mix(in srgb, ${r} 22%, transparent)"/>
    <circle cx="100" cy="100" r=${a} fill="none" stroke=${t} opacity="0.18"
      stroke-width="5"/>
    <circle cx="100" cy="100" r=${a} fill="none" stroke=${t} stroke-width="5"
      stroke-linecap="round" stroke-dasharray="${o * Math.max(e, 0.02)} ${o}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}
function ze(r, t, e, s) {
  return r === "material" ? Oe(t, e, s) : r === "bubble" ? yt(e, s, 15) : r === "mirror" ? yt("#fff", s, 7) : r === "glass" ? Re(e, s) : r === "default" ? yt(e, s, 10) : Pe(e, s);
}
var He = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, lt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Le(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && He(t, e, i), i;
};
const Ue = Object.keys(P), Be = ["body_composition", "nutrition"], _t = {
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
let q = class extends G {
  constructor() {
    super(...arguments), this._expanded = -1;
  }
  setConfig(r) {
    this._config = r;
  }
  _label(r) {
    return (_t[O(this.hass)] ?? _t.en)[r] ?? _t.en[r] ?? r;
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
                options: Ue.map((a) => ({ value: a, label: v(this.hass, a) }))
              }
            }
          },
          { name: "name", selector: { text: {} } }
        ]
      },
      { name: "entity", selector: { entity: {} } },
      ...t === "blood_pressure" ? [{ name: "entity2", selector: { entity: {} } }] : [],
      ...Be.includes(t) && s ? [{ name: "entities", selector: { entity: { multiple: !0 } } }] : [],
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
                  options: Me.map((a) => ({ value: a, label: a }))
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
    return !this.hass || !this._config ? h : m`
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
    const e = r.type ?? "custom", s = P[e] ?? P.custom, i = this._expanded === t, a = this._config.metrics.length;
    return m`
      <div class="metric ${i ? "open" : ""}">
        <div class="metric-head" @click=${() => this._expanded = i ? -1 : t}>
          <span
            class="chip"
            style="--c:${I(r.color) ?? I(s.color)}"
          >
            <ha-icon .icon=${r.icon ?? s.icon}></ha-icon>
          </span>
          <span class="metric-title">
            ${r.name ?? v(this.hass, e)}
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
        ${i ? m`<div class="metric-body">
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
q.styles = Yt`
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
lt([
  St({ attribute: !1 })
], q.prototype, "hass", 2);
lt([
  H()
], q.prototype, "_config", 2);
lt([
  H()
], q.prototype, "_expanded", 2);
q = lt([
  re("health-card-editor")
], q);
var je = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, L = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Ie(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && je(t, e, i), i;
};
const Ge = "0.5.1", We = 5 * 60 * 1e3, Ve = 15 * 60 * 1e3, qe = ["default", "withings", "glass", "material", "bubble", "mirror"], qt = [
  { key: "day", kind: "hour", count: 24 },
  { key: "week", kind: "day", count: 7 },
  { key: "month", kind: "day", count: 30 },
  { key: "quarter", kind: "day", count: 90 },
  { key: "year", kind: "day", count: 365 },
  { key: "max", kind: "month", count: 60 }
];
let C = class extends G {
  constructor() {
    super(...arguments), this._history = {}, this._popup = null, this._popupRange = null, this._stats = null, this._statsFetching = !1, this._onKeydown = (r) => {
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
    if (super.updated(r), (r.has("hass") || r.has("_config")) && this._maybeFetch(), this._maybeFetchStats(), r.has("_popup") || r.has("_popupRange") || r.has("_stats")) {
      const e = (t = this.renderRoot) == null ? void 0 : t.querySelector(".chart-scroll");
      e && (e.scrollLeft = e.scrollWidth);
    }
  }
  _activeRange() {
    return qt.find((r) => r.key === this._popupRange) ?? null;
  }
  /** Long-term statistics for popup ranges beyond the recorder purge window. */
  _maybeFetchStats() {
    var o;
    if (!this.hass || this._popup === null || !this._config) return;
    const r = this._activeRange();
    if (!r) return;
    const t = r.kind === "month" ? "month" : r.kind === "day" && r.count > 10 ? "day" : null;
    if (!t) return;
    const e = this._config.metrics[this._popup];
    if (!e) return;
    const s = /* @__PURE__ */ new Set();
    for (const n of this._series(e)) n.entity && s.add(n.entity);
    for (const n of Object.values(e.phases ?? {})) n && s.add(n);
    e.score_entity && s.add(e.score_entity);
    const i = [...s].filter((n) => this.hass.states[n]), a = `${t}|${r.count}|${i.join(",")}`;
    !i.length || ((o = this._stats) == null ? void 0 : o.sig) === a || this._statsFetching || (this._statsFetching = !0, Ne(this.hass, i, r.count, t).then((n) => {
      this._stats = { sig: a, period: t, data: n };
    }).catch((n) => console.warn("health-card: statistics fetch failed", n)).finally(() => {
      this._statsFetching = !1;
    }));
  }
  /** Buckets for an entity: hourly/daily from history, long ranges from LTS. */
  _bucketsFor(r, t, e, s) {
    var i, a;
    if (t === "hour")
      return De(this._history[r] ?? [], e, s);
    if (t === "month") {
      const o = ((i = this._stats) == null ? void 0 : i.period) === "month" ? this._stats.data[r] : void 0;
      return o != null && o.length ? jt(o, e, s, "month") : new Array(e).fill(NaN);
    }
    if (e > 10 && ((a = this._stats) == null ? void 0 : a.period) === "day") {
      const o = this._stats.data[r];
      if (o != null && o.length) return jt(o, e, s, "day");
    }
    return Ce(this._history[r] ?? [], e, s);
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
      this._popupRange = r.type === "heart_rate" ? "day" : r.type === "sleep" && r.score_entity ? "month" : null, this._popup = t;
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
    (e !== this._cfgSig || i - this._lastFetch > Ve || s !== this._stateSig && i - this._lastFetch > We) && (this._fetching = !0, this._cfgSig = e, this._stateSig = s, Ee(this.hass, r, t).then((o) => {
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
    return qe.includes(r) ? r : "withings";
  }
  render() {
    if (!this.hass || !this._config) return h;
    const r = this._config, e = [
      "cardroot",
      `s-${this._cardStyle()}`,
      r.tiles === !1 ? "flat" : "tiles",
      r.flush ? "flush" : ""
    ].join(" "), s = m`
      ${r.title ? m`<div class="header">
            <div class="title">${r.title}</div>
            ${r.subtitle ? m`<div class="subtitle">${r.subtitle}</div>` : h}
          </div>` : h}
      <div
        class="metrics ${r.layout === "carousel" ? "carousel" : ""}"
        style="--hc-columns:${r.columns ?? 1}"
      >
        ${r.metrics.map((i, a) => this._renderMetric(i, a))}
      </div>
    `;
    return m`
      ${r.background === !1 ? m`<div class="${e} nobg">${s}</div>` : m`<ha-card class=${e}>${s}</ha-card>`}
      ${this._renderPopup()}
    `;
  }
  /** Builds the shared render context for a metric (used by tile and popup). */
  _ctx(r, t) {
    var u, b, w;
    const e = r.type && P[r.type] ? r.type : "custom", s = P[e], i = I(r.color) ?? I(s.color), a = r.name ?? v(this.hass, e), o = r.icon ?? s.icon, n = Object.values(r.phases ?? {}).filter(Boolean);
    let c = this._series(r);
    !c.length && e === "sleep" && n.length && (c = [{ entity: n[0] }]);
    const l = (u = c[0]) != null && u.entity ? this.hass.states[c[0].entity] : void 0, d = (t == null ? void 0 : t.kind) ?? "day", p = Math.max(1, (t == null ? void 0 : t.count) ?? r.days ?? ((b = this._config) == null ? void 0 : b.days) ?? 7), f = r.graph ?? s.graph, y = r.aggregate ?? s.aggregate, x = r.trend ?? s.trend, M = r.precision ?? s.precision, A = r.unit ?? ((w = c[0]) == null ? void 0 : w.unit) ?? (l == null ? void 0 : l.attributes.unit_of_measurement) ?? s.unit ?? "", g = c.map((E, U) => {
      const Z = this._bucketsFor(E.entity, d, p, y);
      return {
        ...E,
        colorResolved: I(E.color) ?? (U === 0 ? i : I(Lt[(U - 1) % Lt.length])),
        buckets: Z,
        filled: It(Z)
      };
    });
    let _;
    if (e === "sleep" && !r.entity && r.phases && g.length) {
      const E = ["deep", "light", "rem"].map((U) => r.phases[U]).filter(Boolean);
      if (E.length) {
        const U = E.map(
          (B) => this._bucketsFor(B, d, p, y)
        ), Z = Array.from({ length: p }, (B, dt) => {
          const Mt = U.map((ht) => ht[dt]).filter(Number.isFinite);
          return Mt.length ? Mt.reduce((ht, ae) => ht + ae, 0) : NaN;
        });
        g[0] = { ...g[0], buckets: Z, filled: It(Z) };
        const At = E.map((B) => this._numeric(this.hass.states[B])).filter(Number.isFinite);
        At.length && (_ = At.reduce((B, dt) => B + dt, 0));
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
      days: p,
      kind: d,
      graph: f,
      aggregate: y,
      trendMode: x,
      precision: M,
      unit: A,
      data: g,
      valueOverride: _,
      goalType: r.goal_type ?? s.goalType ?? "atleast",
      multi: !!r.entities && c.length > 1
    };
  }
  _renderMetric(r, t) {
    var n, c;
    const e = this._ctx(r);
    if (!e.series.length || !e.primaryState)
      return m`
        <div class="metric" style="--hc-accent:${e.accent}">
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${e.icon}></ha-icon></div>
            <div class="name">${e.name}</div>
          </div>
          <div class="missing">
            ${(n = e.series[0]) != null && n.entity ? m`${v(this.hass, "entity_missing")}: ${e.series[0].entity}` : v(this.hass, "no_data")}
          </div>
        </div>
      `;
    if (e.type === "score") return this._renderScore(e, t);
    const s = !e.multi || !!r.label, i = e.multi && e.graph !== "progress", a = !e.multi, o = e.multi && e.graph === "progress";
    return m`
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
            ${ft(this.hass, e.primaryState.last_updated)}
          </div>
        </div>
        <div class="body ${o ? "stack" : ""}">
          ${s || i || a || (c = r.secondary) != null && c.length ? m`<div class="info">
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
    return m`
      <div
        class="metric score-metric ${(e.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${r.accent}"
        @click=${() => this._handleTap(e, t, s.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${r.icon}></ha-icon></div>
          <div class="name">${r.name}</div>
          <div class="time">
            ${ft(this.hass, s.last_updated)}
          </div>
        </div>
        <div class="scorewrap">
          ${ze(this._cardStyle(), r.accent, this._scoreColor(i, a), Math.max(0, Math.min(Number.isFinite(i) ? i / a : 0, 1)))}
          <div class="scoreinner">
            <div class="scorenum">${k(this.hass, i, e.precision ?? 0)}</div>
            <div class="scoremax">${v(this.hass, "of")} ${a}</div>
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
    return Number.isFinite(t) ? m`<span class="scorebadge" style="background:${this._scoreColor(t, 100)}">
      ${k(this.hass, t, 0)}
    </span>` : h;
  }
  /** Calendar heatmap: one cell per day, tinted by the score entity's value. */
  _renderScoreCalendar(r, t) {
    const e = O(this.hass) === "de" ? "de-DE" : "en-US", s = /* @__PURE__ */ new Date();
    s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (t - 1));
    const i = (s.getDay() + 6) % 7, a = new Date(2024, 0, 1), o = Array.from(
      { length: 7 },
      (n, c) => new Date(a.getTime() + c * 864e5).toLocaleDateString(e, {
        weekday: "narrow"
      })
    );
    return m`<div class="cal">
      ${o.map((n) => m`<div class="cal-head">${n}</div>`)}
      ${Array.from({ length: i }, () => m`<div></div>`)}
      ${r.map((n, c) => {
      const l = new Date(s.getTime() + c * 864e5);
      if (!Number.isFinite(n))
        return m`<div class="cal-cell empty">${l.getDate()}</div>`;
      const d = this._scoreColor(n, 100);
      return m`<div
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
    return rt(k(this.hass, t, r.precision), r.unit);
  }
  /** Axis marks for the popup chart: gridlines and labels per range kind. */
  _xMarks(r, t) {
    const e = O(this.hass) === "de" ? "de-DE" : "en-US", s = [];
    if (r === "hour") {
      const n = /* @__PURE__ */ new Date();
      n.setMinutes(0, 0, 0);
      const c = n.getTime() - (t - 1) * 36e5;
      for (let l = 0; l < t; l++) {
        const d = new Date(c + l * 36e5).getHours();
        d % 6 === 0 && s.push({ i: l, label: String(d), line: d === 0 });
      }
      return s;
    }
    if (r === "month") {
      const n = /* @__PURE__ */ new Date();
      for (let c = 0; c < t; c++) {
        const l = new Date(n.getFullYear(), n.getMonth() - (t - 1 - c), 1);
        l.getMonth() === 0 && s.push({ i: c, label: String(l.getFullYear()), line: !0 });
      }
      return s;
    }
    const i = /* @__PURE__ */ new Date();
    if (i.setHours(0, 0, 0, 0), i.setDate(i.getDate() - (t - 1)), t <= 14) {
      for (let n = 0; n < t; n++) {
        const c = new Date(i.getTime() + n * 864e5);
        s.push({ i: n, label: c.toLocaleDateString(e, { weekday: "narrow" }) });
      }
      return s;
    }
    let a = 0, o = 0;
    for (let n = 0; n < t; n++) {
      const c = new Date(i.getTime() + n * 864e5);
      t <= 45 ? c.getDay() === 1 && s.push({
        i: n,
        label: a++ % 2 === 0 ? c.toLocaleDateString(e, { day: "numeric", month: "numeric" }) : void 0,
        line: !0
      }) : c.getDate() === 1 && (s.push({
        i: n,
        label: t <= 120 || o % 2 === 0 ? c.toLocaleDateString(e, { month: "short" }) : void 0,
        line: !0
      }), o++);
    }
    return s;
  }
  /** Toothbrush popup: when was brushed — one 24h track per day with dots. */
  _renderEventTimes(r) {
    const t = (this._history[r] ?? []).filter((o) => o.v > 0);
    if (!t.length) return h;
    const e = O(this.hass) === "de" ? "de-DE" : "en-US", s = /* @__PURE__ */ new Date();
    s.setHours(0, 0, 0, 0);
    const i = s.getTime() - 6 * 864e5, a = Array.from({ length: 7 }, (o, n) => {
      const c = i + n * 864e5;
      return {
        date: new Date(c),
        events: t.filter((l) => l.t >= c && l.t < c + 864e5)
      };
    });
    return m`<div class="times">
      <div class="times-title">${v(this.hass, "event_times")}</div>
      ${a.map(
      (o) => m`<div class="times-row">
          <span class="times-day">
            ${o.date.toLocaleDateString(e, { weekday: "short" })}
          </span>
          <div class="times-track">
            ${o.events.map(
        (n) => m`<span
                class="times-dot"
                style="left:${(n.t - o.date.getTime()) / 864e5 * 100}%"
                title=${new Date(n.t).toLocaleTimeString(e, {
          hour: "2-digit",
          minute: "2-digit"
        })}
              ></span>`
      )}
          </div>
          <span class="times-count">${o.events.length}×</span>
        </div>`
    )}
      <div class="times-hours">
        <span>0</span><span>6</span><span>12</span><span>18</span><span>24</span>
      </div>
    </div>`;
  }
  _renderPopup() {
    var _;
    if (this._popup === null || !this._config) return h;
    const r = this._config.metrics[this._popup];
    if (!r) return h;
    const t = this._ctx(r, this._activeRange());
    if (!t.primaryState) return h;
    const e = t.primaryState, s = t.data[0].buckets.filter(Number.isFinite), i = bt(t.data[0].filled), a = this._resolveGoal(r.goal), o = t.valueOverride ?? this._numeric(e, r.attribute), n = [];
    if (s.length && (n.push(
      {
        label: v(this.hass, "stat_min"),
        value: this._fmtMetricValue(t, Math.min(...s))
      },
      {
        label: v(this.hass, "stat_avg"),
        value: this._fmtMetricValue(
          t,
          s.reduce((u, b) => u + b, 0) / s.length
        )
      },
      {
        label: v(this.hass, "stat_max"),
        value: this._fmtMetricValue(t, Math.max(...s))
      }
    ), Number.isFinite(i) && i !== 0 && n.push({
      label: v(this.hass, "stat_trend"),
      value: `${i > 0 ? "+" : ""}${this._fmtMetricValue(t, i)}`
    })), Number.isFinite(a) && Number.isFinite(o)) {
      const u = t.goalType === "atmost" ? o - a : a - o;
      n.push({
        label: v(this.hass, "goal_left"),
        value: u > 0 ? this._fmtMetricValue(t, u) : "✓"
      });
    }
    const c = t.days, l = t.kind === "month" || t.kind === "day" && c > 16, d = t.graph === "bar" || t.graph === "progress" ? "bar" : "line", p = r.duration ?? t.preset.duration, f = (u) => p ? this._fmtMetricValue(t, u) : k(this.hass, u, t.precision), y = {
      w: l ? c * (t.kind === "month" ? 14 : 10) : 340,
      h: l ? 110 : 130,
      dots: t.kind === "day" && c <= 14,
      yFmt: f,
      xMarks: this._xMarks(t.kind, c)
    }, x = d === "bar" ? Wt(
      t.data[0].buckets,
      t.data[0].colorResolved,
      Number.isFinite(a) ? a : void 0,
      y
    ) : Gt(
      t.data.map((u) => ({ values: u.filled, color: u.colorResolved })),
      y
    ), M = this._popupRange ?? (c === 7 && t.kind === "day" ? "week" : ""), A = Math.min(c, 91), g = t.type === "sleep" && t.kind === "day" && r.score_entity && this.hass.states[r.score_entity] ? this._renderScoreCalendar(
      this._bucketsFor(r.score_entity, "day", A, "mean"),
      A
    ) : h;
    return m`
      <div class="backdrop s-${this._cardStyle()}" @click=${() => this._popup = null}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          style="--hc-accent:${t.accent}"
          @click=${(u) => u.stopPropagation()}
        >
          <div class="dialog-head">
            <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
            <div class="dialog-title">${t.name}</div>
            ${this._renderScoreBadge(r)}
            <button
              class="close"
              aria-label=${v(this.hass, "close")}
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
            <div class="time">${ft(this.hass, e.last_updated)}</div>
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
            ${qt.map(
      (u) => m`<button
                class="period ${M === u.key ? "active" : ""}"
                @click=${() => {
        this._popupRange = u.key;
      }}
              >
                ${v(this.hass, `period_${u.key}`)}
              </button>`
    )}
          </div>
          ${t.graph === "progress" ? this._renderChart(r, "progress", t.data, t.unit, t.precision) : h}
          <div class="popup-chart">
            ${l ? m`<div class="chart-scroll">
                  <div style="width:${y.w}px">${x}</div>
                </div>` : x}
          </div>
          ${n.length ? m`<div class="stats">
                ${n.map(
      (u) => m`<div class="stat">
                    <div class="stat-label">${u.label}</div>
                    <div class="stat-value">${u.value}</div>
                  </div>`
    )}
              </div>` : h}
          ${g}
          ${t.type === "toothbrush" && ((_ = t.series[0]) != null && _.entity) ? this._renderEventTimes(t.series[0].entity) : h}
          ${t.multi ? this._renderSeriesChips(t.data, t.precision, t.trendMode) : h}
          ${t.type === "sleep" && r.phases ? this._renderSleepPhases(r) : h}
          ${this._renderSecondary(r)}
          <button
            class="openha"
            @click=${() => {
      var u;
      this._popup = null, this._moreInfo((u = t.series[0]) == null ? void 0 : u.entity);
    }}
          >
            <ha-icon icon="mdi:chart-box-outline"></ha-icon>
            ${v(this.hass, "open_ha")}
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
    return e.length ? m`
      <div class="segbar">
        ${e.map(
      (s) => m`<div class="seg" style="flex-grow:${s.v};background:${s.color}"></div>`
    )}
      </div>
      <div class="phases">
        ${e.map(
      (s) => m`<div class="phase">
            <span class="phasedot" style="background:${s.color}"></span>
            <span>${v(this.hass, `phase_${s.key}`)}</span>
            <span class="phaseval">${st(s.v, s.unit)}</span>
          </div>`
    )}
      </div>
    ` : h;
  }
  _renderValue(r, t, e, s, i, a, o, n) {
    if (r.label) return m`<div class="value">${r.label}</div>`;
    if (t === "blood_pressure" && e.length >= 2) {
      const l = this._numeric(s, r.attribute), d = this._numeric(this.hass.states[e[1].entity]);
      return m`<div class="value">
          ${k(this.hass, l, 0)}/${k(this.hass, d, 0)}
          <span class="unit">${i}</span>
        </div>
        <div class="bplabels">
          <span class="bpitem">
            <span class="bpdot" style="background:${e[0].colorResolved}"></span>SYS
            ${k(this.hass, l, 0)}
          </span>
          <span class="bpitem">
            <span class="bpdot" style="background:${e[1].colorResolved}"></span>DIA
            ${k(this.hass, d, 0)}
          </span>
        </div>`;
    }
    const c = n ?? this._numeric(s, r.attribute);
    if (!Number.isFinite(c))
      return m`<div class="value">${s.state}</div>`;
    if (r.duration ?? o) {
      const l = Object.values(r.phases ?? {}).map((d) => {
        var p;
        return d ? (p = this.hass.states[d]) == null ? void 0 : p.attributes.unit_of_measurement : void 0;
      }).find(Boolean);
      return m`<div class="value">
        ${st(
        c,
        r.unit ?? (n !== void 0 ? l : s.attributes.unit_of_measurement)
      )}
      </div>`;
    }
    return m`<div class="value">
      ${k(this.hass, c, a)}<span class="unit">${i}</span>
    </div>`;
  }
  _renderSeriesChips(r, t, e) {
    return m`<div class="serieslist">
      ${r.map((s) => {
      const i = this.hass.states[s.entity], a = this._numeric(i), o = s.unit ?? (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "", n = s.name ?? (i == null ? void 0 : i.attributes.friendly_name) ?? s.entity, c = bt(s.filled), l = Number.isFinite(c) ? c > 0 ? "mdi:arrow-top-right" : c < 0 ? "mdi:arrow-bottom-right" : "mdi:arrow-right" : "mdi:minus";
      return m`<div class="serieschip">
          ${e !== "none" ? m`<span class="dotarrow" style="background:${s.colorResolved}">
                <ha-icon .icon=${l}></ha-icon>
              </span>` : h}
          <span class="serieslabel">
            ${n}: ${Number.isFinite(a) ? rt(k(this.hass, a, t), o) : (i == null ? void 0 : i.state) ?? "–"}
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
      return Number.isFinite(a) ? rt(k(this.hass, a), o) : i.state;
    }).filter(Boolean);
    return t.length ? m`<div class="secondary">${t.join(" • ")}</div>` : h;
  }
  _renderStatus(r, t, e, s, i, a, o = "atleast", n) {
    const c = n ?? this._numeric(e, r.attribute), l = this._resolveGoal(r.goal);
    if (Number.isFinite(l) && Number.isFinite(c)) {
      const _ = this._resolveGoal(r.start);
      let u = NaN;
      if (Number.isFinite(_) && _ !== l ? u = (_ - c) / (_ - l) * 100 : l > 0 && (u = o === "atmost" ? l / c * 100 : c / l * 100), !Number.isNaN(u)) {
        const b = Math.round(Math.min(Math.max(u, 0), 999)), w = b >= 100;
        return m`<div class="status ${w ? "good" : ""}">
          <ha-icon .icon=${w ? "mdi:check-circle" : "mdi:flag-outline"}></ha-icon>
          <span>${v(this.hass, "goal")}: ${b} %</span>
        </div>`;
      }
    }
    if (a === "none") return h;
    const d = bt(t.filled);
    if (!Number.isFinite(d)) return h;
    const p = t.filled.find(Number.isFinite) ?? 0, f = Math.abs(d) < Math.max(Math.abs(p) * 5e-3, 1e-9), y = f || a === "neutral" ? "neutral" : d > 0 == (a === "up_good") ? "good" : "bad", x = f ? "mdi:arrow-right" : d > 0 ? "mdi:arrow-top-right" : "mdi:arrow-bottom-right", M = r.type && P[r.type] ? r.type : "custom", A = r.duration ?? P[M].duration, g = f ? v(this.hass, "stable") : A ? st(Math.abs(d), s || void 0) : `${k(this.hass, Math.abs(d), i)}${s ? ` ${s}` : ""}`;
    return m`<div class="status ${y}">
      <span class="dotarrow"><ha-icon .icon=${x}></ha-icon></span>
      <span>${g}</span>
    </div>`;
  }
  _renderChart(r, t, e, s, i) {
    if (t === "line")
      return m`${Gt(
        e.map((a) => ({ values: a.filled, color: a.colorResolved }))
      )}`;
    if (t === "bar") {
      const a = this._resolveGoal(r.goal);
      return m`${Wt(
        e[0].buckets,
        e[0].colorResolved,
        Number.isFinite(a) ? a : void 0
      )}`;
    }
    if (t === "progress") {
      const a = e.map((o) => {
        const n = this.hass.states[o.entity], c = this._numeric(n), l = this._resolveGoal(o.goal ?? r.goal);
        if (!Number.isFinite(c) || !Number.isFinite(l) || l <= 0) return h;
        const d = Math.max(0, Math.min(c / l * 100, 100)), p = o.unit ?? (n == null ? void 0 : n.attributes.unit_of_measurement) ?? s;
        return m`<div class="pbar">
          ${e.length > 1 ? m`<div class="pbar-label">
                <span>${o.name ?? (n == null ? void 0 : n.attributes.friendly_name) ?? o.entity}</span>
                <span>${rt(k(this.hass, c, i), p)}</span>
              </div>` : h}
          <div class="ptrack" style="--hc-p:${o.colorResolved}">
            <div class="pfill" style="width:${d}%"></div>
          </div>
        </div>`;
      });
      return m`<div class="pbars">${a}</div>`;
    }
    return h;
  }
};
C.styles = Yt`
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
    /* apple-style lens: frosted disc lit from the top left, deep shadow */
    .s-glass .scorewrap::before {
      content: '';
      grid-area: 1 / 1;
      place-self: center;
      width: 58%;
      aspect-ratio: 1;
      border-radius: 50%;
      background:
        radial-gradient(
          120% 120% at 30% 18%,
          color-mix(in srgb, #fff 38%, transparent),
          transparent 62%
        ),
        color-mix(in srgb, var(--hc-card-bg) 38%, transparent);
      border: 1px solid color-mix(in srgb, #fff 45%, transparent);
      box-shadow:
        inset 0 1.5px 1px color-mix(in srgb, #fff 55%, transparent),
        inset 0 -10px 18px color-mix(in srgb, var(--hc-accent) 12%, transparent),
        0 12px 28px color-mix(in srgb, #000 20%, transparent);
      -webkit-backdrop-filter: blur(14px) saturate(1.6);
      backdrop-filter: blur(14px) saturate(1.6);
    }
    /* specular gleam sweeping over the upper left of the lens */
    .s-glass .scorewrap::after {
      content: '';
      grid-area: 1 / 1;
      place-self: center;
      width: 58%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(
        48% 32% at 32% 16%,
        rgba(255, 255, 255, 0.5),
        transparent 72%
      );
      pointer-events: none;
      position: relative;
      z-index: 2;
    }
    /* the frosted disc forms a stacking context that would otherwise paint
       above the in-flow number/ring — lift both above it */
    .s-glass .scorering,
    .s-glass .scoreinner {
      position: relative;
      z-index: 1;
    }
    .s-glass .scorenum {
      text-shadow: 0 1px 3px color-mix(in srgb, #000 18%, transparent);
    }
    @keyframes hc-pulse {
      0%,
      100% {
        opacity: 0.45;
      }
      50% {
        opacity: 0.9;
      }
    }
    .scorering .glowpulse {
      animation: hc-pulse 2.6s ease-in-out infinite;
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
    .chart .axis {
      fill: var(--secondary-text-color);
      font-size: 9px;
      font-weight: 500;
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
    .times {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .times-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }
    .times-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .times-day {
      width: 30px;
      flex: none;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .times-track {
      position: relative;
      flex: 1;
      height: 14px;
      border-radius: 7px;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .times-dot {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--hc-accent);
    }
    .times-count {
      width: 26px;
      flex: none;
      text-align: right;
      font-size: 11px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .times-hours {
      display: flex;
      justify-content: space-between;
      margin: 0 34px 0 38px;
      font-size: 9px;
      color: var(--secondary-text-color);
    }
    .s-mirror .times-track {
      background: rgba(255, 255, 255, 0.12);
    }
    .s-mirror .times-dot {
      background: #fff;
    }
  `;
L([
  St({ attribute: !1 })
], C.prototype, "hass", 2);
L([
  H()
], C.prototype, "_config", 2);
L([
  H()
], C.prototype, "_history", 2);
L([
  H()
], C.prototype, "_popup", 2);
L([
  H()
], C.prototype, "_popupRange", 2);
L([
  H()
], C.prototype, "_stats", 2);
C = L([
  re("health-card")
], C);
console.info(
  `%c HEALTH-CARD %c v${Ge} `,
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
  C as HealthCard
};
