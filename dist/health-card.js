/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, bt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), At = /* @__PURE__ */ new WeakMap();
let jt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (bt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = At.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && At.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Jt = (i) => new jt(typeof i == "string" ? i : i + "", void 0, yt), It = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new jt(e, i, yt);
}, Xt = (i, t) => {
  if (bt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = st.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, kt = bt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Jt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qt, defineProperty: te, getOwnPropertyDescriptor: ee, getOwnPropertyNames: ie, getOwnPropertySymbols: se, getPrototypeOf: re } = Object, x = globalThis, Et = x.trustedTypes, ne = Et ? Et.emptyScript : "", dt = x.reactiveElementPolyfillSupport, I = (i, t) => i, rt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? ne : null;
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
} }, vt = (i, t) => !Qt(i, t), Ct = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let F = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && te(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = ee(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = re(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, s = [...ie(e), ...se(e)];
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
      for (const r of s) e.unshift(kt(r));
    } else t !== void 0 && e.push(kt(t));
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
    return Xt(t, this.constructor.elementStyles), t;
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
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : rt).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = s.getPropertyOptions(r), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : rt;
      this._$Em = r;
      const d = c.fromAttribute(e, a.type);
      this[r] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, o) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? vt)(o, e) || s.useDefault && s.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
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
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[I("elementProperties")] = /* @__PURE__ */ new Map(), F[I("finalized")] = /* @__PURE__ */ new Map(), dt == null || dt({ ReactiveElement: F }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, Mt = (i) => i, nt = W.trustedTypes, Nt = nt ? nt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Wt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Gt = "?" + v, oe = `<${Gt}>`, M = document, V = () => M.createComment(""), K = (i) => i === null || typeof i != "object" && typeof i != "function", $t = Array.isArray, ae = (i) => $t(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", ht = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Tt = />/g, k = RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ot = /'/g, Ft = /"/g, Vt = /^(?:script|style|textarea|title)$/i, Kt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Kt(1), Z = Kt(2), H = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), Dt = /* @__PURE__ */ new WeakMap(), E = M.createTreeWalker(M, 129);
function Zt(i, t) {
  if (!$t(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Nt !== void 0 ? Nt.createHTML(t) : t;
}
const ce = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = j;
  for (let a = 0; a < e; a++) {
    const c = i[a];
    let d, h, l = -1, g = 0;
    for (; g < c.length && (n.lastIndex = g, h = n.exec(c), h !== null); ) g = n.lastIndex, n === j ? h[1] === "!--" ? n = Pt : h[1] !== void 0 ? n = Tt : h[2] !== void 0 ? (Vt.test(h[2]) && (r = RegExp("</" + h[2], "g")), n = k) : h[3] !== void 0 && (n = k) : n === k ? h[0] === ">" ? (n = r ?? j, l = -1) : h[1] === void 0 ? l = -2 : (l = n.lastIndex - h[2].length, d = h[1], n = h[3] === void 0 ? k : h[3] === '"' ? Ft : Ot) : n === Ft || n === Ot ? n = k : n === Pt || n === Tt ? n = j : (n = k, r = void 0);
    const m = n === k && i[a + 1].startsWith("/>") ? " " : "";
    o += n === j ? c + oe : l >= 0 ? (s.push(d), c.slice(0, l) + Wt + c.slice(l) + v + m) : c + v + (l === -2 ? a : m);
  }
  return [Zt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class q {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, c = this.parts, [d, h] = ce(t, e);
    if (this.el = q.createElement(d, s), E.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = E.nextNode()) !== null && c.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(Wt)) {
          const g = h[n++], m = r.getAttribute(l).split(v), y = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: o, name: y[2], strings: m, ctor: y[1] === "." ? de : y[1] === "?" ? he : y[1] === "@" ? pe : ot }), r.removeAttribute(l);
        } else l.startsWith(v) && (c.push({ type: 6, index: o }), r.removeAttribute(l));
        if (Vt.test(r.tagName)) {
          const l = r.textContent.split(v), g = l.length - 1;
          if (g > 0) {
            r.textContent = nt ? nt.emptyScript : "";
            for (let m = 0; m < g; m++) r.append(l[m], V()), E.nextNode(), c.push({ type: 2, index: ++o });
            r.append(l[g], V());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Gt) c.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(v, l + 1)) !== -1; ) c.push({ type: 7, index: o }), l += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = M.createElement("template");
    return s.innerHTML = t, s;
  }
}
function R(i, t, e = i, s) {
  var n, a;
  if (t === H) return t;
  let r = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = K(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = r : e._$Cl = r), r !== void 0 && (t = R(i, r._$AS(i, t.values), r, s)), t;
}
class le {
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
    const { el: { content: e }, parts: s } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? M).importNode(e, !0);
    E.currentNode = r;
    let o = E.nextNode(), n = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let d;
        c.type === 2 ? d = new J(o, o.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (d = new ue(o, this, t)), this._$AV.push(d), c = s[++a];
      }
      n !== (c == null ? void 0 : c.index) && (o = E.nextNode(), n++);
    }
    return E.currentNode = M, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class J {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = R(this, t, e), K(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== H && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ae(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && K(this._$AH) ? this._$AA.nextSibling.data = t : this.T(M.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = q.createElement(Zt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new le(r, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Dt.get(t.strings);
    return e === void 0 && Dt.set(t.strings, e = new q(t)), e;
  }
  k(t) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new J(this.O(V()), this.O(V()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = Mt(t).nextSibling;
      Mt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
let ot = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = R(this, t, e, 0), n = !K(t) || t !== this._$AH && t !== H, n && (this._$AH = t);
    else {
      const a = t;
      let c, d;
      for (t = o[0], c = 0; c < o.length - 1; c++) d = R(this, a[s + c], e, c), d === H && (d = this._$AH[c]), n || (n = !K(d) || d !== this._$AH[c]), d === p ? t = p : t !== p && (t += (d ?? "") + o[c + 1]), this._$AH[c] = d;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
class de extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class he extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class pe extends ot {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = R(this, t, e, 0) ?? p) === H) return;
    const s = this._$AH, r = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== p && (s === p || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ue {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const pt = W.litHtmlPolyfillSupport;
pt == null || pt(q, J), (W.litHtmlVersions ?? (W.litHtmlVersions = [])).push("3.3.3");
const ge = (i, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = r = new J(t.insertBefore(V(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis;
class D extends F {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ge(e, this.renderRoot, this.renderOptions);
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
    return H;
  }
}
var Bt;
D._$litElement$ = !0, D.finalized = !0, (Bt = C.litElementHydrateSupport) == null || Bt.call(C, { LitElement: D });
const ut = C.litElementPolyfillSupport;
ut == null || ut({ LitElement: D });
(C.litElementVersions ?? (C.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: vt }, fe = (i = me, t, e) => {
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
function xt(i) {
  return (t, e) => typeof e == "object" ? fe(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function X(i) {
  return xt({ ...i, state: !0, attribute: !1 });
}
const _t = {
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
}, _e = Object.keys(_t);
function et(i) {
  if (i)
    return i === "primary" ? "var(--primary-color)" : i === "accent" ? "var(--accent-color)" : _t[i] ? `var(--${i}-color, ${_t[i]})` : i;
}
const Y = {
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
}, Ht = ["teal", "orange", "pink", "cyan", "lime"], Rt = {
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
function Q(i) {
  var e;
  return (((e = i == null ? void 0 : i.locale) == null ? void 0 : e.language) ?? (i == null ? void 0 : i.language) ?? "en").startsWith("de") ? "de" : "en";
}
function f(i, t) {
  return Rt[Q(i)][t] ?? Rt.en[t] ?? t;
}
function b(i, t, e) {
  if (!Number.isFinite(t)) return "–";
  const s = Q(i) === "de" ? "de-DE" : "en-US";
  return e === void 0 ? new Intl.NumberFormat(s, { maximumFractionDigits: 2 }).format(t) : new Intl.NumberFormat(s, {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  }).format(t);
}
function it(i, t) {
  return t ? /^[%°'"]/.test(t) ? `${i}${t}` : `${i} ${t}` : i;
}
function gt(i, t) {
  if (!Number.isFinite(i)) return "–";
  let e;
  const s = (t ?? "min").toLowerCase();
  s.startsWith("h") ? e = i * 60 : s === "s" || s.startsWith("sec") ? e = i / 60 : e = i;
  const r = Math.round(e * 60), o = Math.floor(r / 3600), n = Math.floor(r % 3600 / 60), a = r % 60;
  return o > 0 ? n ? `${o} h ${n} min` : `${o} h` : n > 0 ? a && n < 10 ? `${n} min ${a} s` : `${n} min` : `${a} s`;
}
function mt(i, t) {
  const e = new Date(t);
  if (isNaN(e.getTime())) return "";
  const s = Q(i) === "de" ? "de-DE" : "en-US", r = /* @__PURE__ */ new Date(), o = (a, c) => a.getFullYear() === c.getFullYear() && a.getMonth() === c.getMonth() && a.getDate() === c.getDate();
  if (o(e, r))
    return e.toLocaleTimeString(s, { hour: "numeric", minute: "2-digit" });
  const n = new Date(r.getTime() - 864e5);
  return o(e, n) ? f(i, "yesterday") : e.toLocaleDateString(s, { day: "numeric", month: "short" });
}
async function be(i, t, e) {
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
function zt(i, t, e) {
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
function Ut(i) {
  const t = [...i];
  let e = NaN;
  for (let r = 0; r < t.length; r++)
    Number.isFinite(t[r]) ? e = t[r] : t[r] = e;
  let s = NaN;
  for (let r = t.length - 1; r >= 0; r--)
    Number.isFinite(t[r]) ? s = t[r] : t[r] = s;
  return t;
}
function Lt(i) {
  const t = i.filter(Number.isFinite);
  return t.length < 2 ? NaN : t[t.length - 1] - t[0];
}
const G = 220, $ = 60, _ = 7;
function ye(i) {
  const t = i.filter(Number.isFinite), e = Math.min(...t), s = Math.max(...t), r = s - e || Math.abs(s) * 0.1 || 1;
  return { lo: e - r * 0.18, hi: s + r * 0.18 };
}
function ve(i) {
  const t = i.filter((c) => c.values.some(Number.isFinite));
  if (!t.length) return p;
  const { lo: e, hi: s } = ye(t.flatMap((c) => c.values)), r = Math.max(...t.map((c) => c.values.length)), o = (c) => _ + c * (G - 2 * _) / Math.max(r - 1, 1), n = (c) => $ - _ - (c - e) / (s - e) * ($ - 2 * _), a = t.map((c) => {
    const d = c.values.map((l, g) => ({ x: o(g), y: n(l), ok: Number.isFinite(l) })).filter((l) => l.ok);
    if (!d.length) return p;
    let h = `M ${d[0].x} ${d[0].y}`;
    for (let l = 1; l < d.length; l++) {
      const g = (d[l - 1].x + d[l].x) / 2;
      h += ` C ${g} ${d[l - 1].y}, ${g} ${d[l].y}, ${d[l].x} ${d[l].y}`;
    }
    return Z`
      <path d=${h} fill="none" stroke=${c.color} stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
      ${d.map(
      (l) => Z`<circle cx=${l.x} cy=${l.y} r="3.1" fill="var(--hc-dot-fill)"
          stroke=${c.color} stroke-width="2"/>`
    )}
    `;
  });
  return u`<svg class="chart" viewBox="0 0 ${G} ${$}" aria-hidden="true">${a}</svg>`;
}
function $e(i, t, e) {
  if (!i.some((l) => Number.isFinite(l) && l > 0)) return p;
  const s = i.map((l) => Number.isFinite(l) && l > 0 ? l : 0), r = Math.max(...s, e ?? 0) || 1, o = s.length, n = (G - 2 * _) / o, a = Math.min(n * 0.55, 14), c = (l) => l / r * ($ - 2 * _), d = s.map((l, g) => {
    const m = Math.max(c(l), l > 0 ? 3 : 1.5), y = _ + g * n + (n - a) / 2;
    return Z`<rect x=${y} y=${$ - _ - m} width=${a} height=${m}
      rx=${Math.min(a / 2, 4)} fill=${t} opacity=${l > 0 ? 1 : 0.25}/>`;
  }), h = Number.isFinite(e) ? Z`<line x1=${_} x2=${G - _} y1=${$ - _ - c(e)} y2=${$ - _ - c(e)}
        stroke=${t} stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>` : p;
  return u`<svg class="chart" viewBox="0 0 ${G} ${$}" aria-hidden="true">
    ${h}${d}
  </svg>`;
}
function xe(i) {
  const t = [
    "var(--amber-color, #FFC107)",
    "var(--purple-color, #9C27B0)",
    "var(--pink-color, #E91E63)",
    "color-mix(in srgb, var(--primary-text-color) 16%, transparent)",
    "color-mix(in srgb, var(--primary-text-color) 16%, transparent)"
  ], e = (r) => Math.abs(Math.sin(r * 127.1) * 43758.5453 % 1), s = [];
  for (let r = 0; r < 2; r++) {
    const o = r === 0 ? 74 : 88, n = r === 0 ? 26 : 32;
    for (let a = 0; a < n; a++) {
      const c = a / n * Math.PI * 2 + e(a + r * 100) * 0.18 - Math.PI / 2, d = o + (e(a * 3 + r * 7) - 0.5) * 6, h = 2.4 + e(a * 7 + r * 13) * 2.4, l = t[Math.floor(e(a * 11 + r * 29) * t.length)];
      s.push(
        Z`<circle cx=${100 + Math.cos(c) * d} cy=${100 + Math.sin(c) * d}
          r=${h} fill=${l} opacity="0.75"/>`
      );
    }
  }
  return u`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="62" fill="color-mix(in srgb, ${i} 9%, transparent)" />
    ${s}
  </svg>`;
}
var we = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, at = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? Se(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && we(t, e, r), r;
};
const Ae = Object.keys(Y), ke = ["body_composition", "nutrition"], ft = {
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
let z = class extends D {
  constructor() {
    super(...arguments), this._expanded = -1;
  }
  setConfig(i) {
    this._config = i;
  }
  _label(i) {
    return (ft[Q(this.hass)] ?? ft.en)[i] ?? ft.en[i] ?? i;
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
                options: ["default", "withings", "glass", "material", "bubble"].map(
                  (i) => ({ value: i, label: this._label(`style_${i}`) })
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
  _metricSchema(i) {
    const t = i.type ?? "custom", e = (r, o) => r.map((n) => ({ value: n, label: this._label(`${o}_${n}`) })), s = !i.entities || i.entities.every((r) => typeof r == "string");
    return [
      {
        name: "type",
        selector: {
          select: {
            mode: "dropdown",
            options: Ae.map((r) => ({ value: r, label: f(this.hass, r) }))
          }
        }
      },
      { name: "entity", selector: { entity: {} } },
      ...t === "blood_pressure" ? [{ name: "entity2", selector: { entity: {} } }] : [],
      ...ke.includes(t) && s ? [{ name: "entities", selector: { entity: { multiple: !0 } } }] : [],
      ...t === "sleep" ? [
        { name: "phases_deep", selector: { entity: {} } },
        { name: "phases_light", selector: { entity: {} } },
        { name: "phases_rem", selector: { entity: {} } },
        { name: "phases_awake", selector: { entity: {} } }
      ] : [],
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
                options: _e.map((r) => ({ value: r, label: r }))
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
          { name: "goal_entity", selector: { entity: {} } },
          { name: "start", selector: { number: { mode: "box", step: "any" } } },
          { name: "start_entity", selector: { entity: {} } },
          {
            name: "goal_type",
            selector: {
              select: {
                mode: "dropdown",
                options: e(["atleast", "atmost"], "gt")
              }
            }
          },
          {
            name: "precision",
            selector: { number: { min: 0, max: 3, mode: "box" } }
          },
          ...t === "score" ? [{ name: "max", selector: { number: { min: 1, mode: "box" } } }] : [],
          {
            name: "tap_action",
            selector: {
              select: {
                mode: "dropdown",
                options: e(["popup", "more-info", "link", "none"], "ta")
              }
            }
          },
          ...i.tap_action === "link" ? [{ name: "link", selector: { text: {} } }] : [],
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
    var n, a, c, d;
    const e = i.type ?? "custom", s = Y[e] ?? Y.custom, r = this._expanded === t, o = this._config.metrics.length;
    return u`
      <div class="metric ${r ? "open" : ""}">
        <div class="metric-head" @click=${() => this._expanded = r ? -1 : t}>
          <ha-icon .icon=${i.icon ?? s.icon}></ha-icon>
          <span class="metric-title">
            ${i.name ?? f(this.hass, e)}
            <span class="metric-entity">${i.entity ?? ""}</span>
          </span>
          <button
            class="icon-btn"
            .disabled=${t === 0}
            title="↑"
            @click=${(h) => this._move(h, t, -1)}
          >
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </button>
          <button
            class="icon-btn"
            .disabled=${t === o - 1}
            title="↓"
            @click=${(h) => this._move(h, t, 1)}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <button class="icon-btn danger" @click=${(h) => this._remove(h, t)}>
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
                .data=${{
      ...i,
      goal: typeof i.goal == "number" ? i.goal : void 0,
      goal_entity: typeof i.goal == "string" ? i.goal : void 0,
      start: typeof i.start == "number" ? i.start : void 0,
      start_entity: typeof i.start == "string" ? i.start : void 0,
      phases_deep: (n = i.phases) == null ? void 0 : n.deep,
      phases_light: (a = i.phases) == null ? void 0 : a.light,
      phases_rem: (c = i.phases) == null ? void 0 : c.rem,
      phases_awake: (d = i.phases) == null ? void 0 : d.awake
    }}
                .schema=${this._metricSchema(i)}
                .computeLabel=${(h) => this._label(h.name)}
                @value-changed=${(h) => this._metricChanged(h, t)}
              ></ha-form>
            </div>` : p}
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
    const e = { ...i.detail.value }, s = {};
    for (const o of ["deep", "light", "rem", "awake"]) {
      const n = e[`phases_${o}`];
      delete e[`phases_${o}`], typeof n == "string" && n && (s[o] = n);
    }
    Object.keys(s).length ? e.phases = s : delete e.phases;
    for (const o of ["goal", "start"]) {
      const n = e[`${o}_entity`];
      delete e[`${o}_entity`], typeof n == "string" && n && (e[o] = n);
    }
    const r = [...this._config.metrics];
    r[t] = this._clean(e), this._emit({ ...this._config, metrics: r });
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
z.styles = It`
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
at([
  xt({ attribute: !1 })
], z.prototype, "hass", 2);
at([
  X()
], z.prototype, "_config", 2);
at([
  X()
], z.prototype, "_expanded", 2);
z = at([
  qt("health-card-editor")
], z);
var Ee = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, tt = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? Ce(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && Ee(t, e, r), r;
};
const Me = "0.2.0", Ne = 5 * 60 * 1e3, Pe = 15 * 60 * 1e3, Te = ["default", "withings", "glass", "material", "bubble"];
let N = class extends D {
  constructor() {
    super(...arguments), this._history = {}, this._popup = null, this._onKeydown = (i) => {
      i.key === "Escape" && this._popup !== null && (this._popup = null);
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
      for (const s of Object.values(e.phases ?? {})) s && i.add(s);
    }
    return [...i].filter((e) => {
      var s;
      return (s = this.hass) == null ? void 0 : s.states[e];
    });
  }
  /** Goal can be a plain number, a numeric string or an entity id. */
  _resolveGoal(i) {
    if (typeof i == "number") return i;
    if (typeof i != "string" || !i) return NaN;
    const t = this.hass.states[i];
    return parseFloat(t ? t.state : i);
  }
  _handleTap(i, t, e) {
    const s = i.tap_action ?? "popup";
    if (s !== "none") {
      if (s === "link") {
        if (!i.link) return;
        if (/^https?:\/\//.test(i.link)) {
          window.open(i.link, "_blank", "noopener");
          return;
        }
        history.pushState(null, "", i.link), this.dispatchEvent(
          new Event("location-changed", { bubbles: !0, composed: !0 })
        );
        return;
      }
      if (s === "more-info") {
        this._moreInfo(e);
        return;
      }
      this._popup = t;
    }
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
    (e !== this._cfgSig || r - this._lastFetch > Pe || s !== this._stateSig && r - this._lastFetch > Ne) && (this._fetching = !0, this._cfgSig = e, this._stateSig = s, be(this.hass, i, t).then((n) => {
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
    if (!this.hass || !this._config) return p;
    const i = this._config, e = [
      "cardroot",
      `s-${Te.includes(i.card_style ?? "") ? i.card_style : "withings"}`,
      i.tiles === !1 ? "flat" : "tiles",
      i.flush ? "flush" : ""
    ].join(" "), s = u`
      ${i.title ? u`<div class="header">
            <div class="title">${i.title}</div>
            ${i.subtitle ? u`<div class="subtitle">${i.subtitle}</div>` : p}
          </div>` : p}
      <div
        class="metrics ${i.layout === "carousel" ? "carousel" : ""}"
        style="--hc-columns:${i.columns ?? 1}"
      >
        ${i.metrics.map((r, o) => this._renderMetric(r, o))}
      </div>
    `;
    return u`
      ${i.background === !1 ? u`<div class="${e} nobg">${s}</div>` : u`<ha-card class=${e}>${s}</ha-card>`}
      ${this._renderPopup()}
    `;
  }
  /** Builds the shared render context for a metric (used by tile and popup). */
  _ctx(i) {
    var S, U, L;
    const t = i.type && Y[i.type] ? i.type : "custom", e = Y[t], s = et(i.color) ?? et(e.color), r = i.name ?? f(this.hass, t), o = i.icon ?? e.icon, n = Object.values(i.phases ?? {}).filter(Boolean);
    let a = this._series(i);
    !a.length && t === "sleep" && n.length && (a = [{ entity: n[0] }]);
    const c = (S = a[0]) != null && S.entity ? this.hass.states[a[0].entity] : void 0, d = Math.max(1, i.days ?? ((U = this._config) == null ? void 0 : U.days) ?? 7), h = i.graph ?? e.graph, l = i.aggregate ?? e.aggregate, g = i.trend ?? e.trend, m = i.precision ?? e.precision, y = i.unit ?? ((L = a[0]) == null ? void 0 : L.unit) ?? (c == null ? void 0 : c.attributes.unit_of_measurement) ?? e.unit ?? "", P = a.map((A, T) => {
      const B = zt(this._history[A.entity] ?? [], d, l);
      return {
        ...A,
        colorResolved: et(A.color) ?? (T === 0 ? s : et(Ht[(T - 1) % Ht.length])),
        buckets: B,
        filled: Ut(B)
      };
    });
    let w;
    if (t === "sleep" && !i.entity && i.phases && P.length) {
      const A = ["deep", "light", "rem"].map((T) => i.phases[T]).filter(Boolean);
      if (A.length) {
        const T = A.map(
          (O) => zt(this._history[O] ?? [], d, l)
        ), B = Array.from({ length: d }, (O, ct) => {
          const St = T.map((lt) => lt[ct]).filter(Number.isFinite);
          return St.length ? St.reduce((lt, Yt) => lt + Yt, 0) : NaN;
        });
        P[0] = { ...P[0], buckets: B, filled: Ut(B) };
        const wt = A.map((O) => this._numeric(this.hass.states[O])).filter(Number.isFinite);
        wt.length && (w = wt.reduce((O, ct) => O + ct, 0));
      }
    }
    return {
      m: i,
      type: t,
      preset: e,
      accent: s,
      name: r,
      icon: o,
      series: a,
      primaryState: c,
      days: d,
      graph: h,
      aggregate: l,
      trendMode: g,
      precision: m,
      unit: y,
      data: P,
      valueOverride: w,
      goalType: i.goal_type ?? e.goalType ?? "atleast",
      multi: !!i.entities && a.length > 1
    };
  }
  _renderMetric(i, t) {
    var a, c;
    const e = this._ctx(i);
    if (!e.series.length || !e.primaryState)
      return u`
        <div class="metric" style="--hc-accent:${e.accent}">
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${e.icon}></ha-icon></div>
            <div class="name">${e.name}</div>
          </div>
          <div class="missing">
            ${(a = e.series[0]) != null && a.entity ? u`${f(this.hass, "entity_missing")}: ${e.series[0].entity}` : f(this.hass, "no_data")}
          </div>
        </div>
      `;
    if (e.type === "score") return this._renderScore(e, t);
    const s = !e.multi || !!i.label, r = e.multi && e.graph !== "progress", o = !e.multi, n = e.multi && e.graph === "progress";
    return u`
      <div
        class="metric ${(i.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${e.accent}"
        @click=${() => this._handleTap(i, t, e.series[0].entity)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${e.icon}></ha-icon></div>
          <div class="name">${e.name}</div>
          <div class="time">
            ${mt(this.hass, e.primaryState.last_updated)}
          </div>
        </div>
        <div class="body ${n ? "stack" : ""}">
          ${s || r || o || (c = i.secondary) != null && c.length ? u`<div class="info">
                ${s ? this._renderValue(
      i,
      e.type,
      e.data,
      e.primaryState,
      e.unit,
      e.precision,
      e.preset.duration,
      e.valueOverride
    ) : p}
                ${r ? this._renderSeriesChips(e.data, e.precision, e.trendMode) : p}
                ${this._renderSecondary(i)}
                ${o ? this._renderStatus(
      i,
      e.data[0],
      e.primaryState,
      e.unit,
      e.precision,
      e.trendMode,
      e.goalType,
      e.valueOverride
    ) : p}
              </div>` : p}
          <div class="chartcell">
            ${this._renderChart(i, e.graph, e.data, e.unit, e.precision)}
          </div>
        </div>
        ${e.type === "sleep" && i.phases ? this._renderSleepPhases(i) : p}
      </div>
    `;
  }
  _renderScore(i, t) {
    const e = i.m, s = i.primaryState, r = this._numeric(s, e.attribute), o = e.max ?? 100;
    return u`
      <div
        class="metric score-metric ${(e.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${i.accent}"
        @click=${() => this._handleTap(e, t, s.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${i.icon}></ha-icon></div>
          <div class="name">${i.name}</div>
          <div class="time">
            ${mt(this.hass, s.last_updated)}
          </div>
        </div>
        <div class="scorewrap">
          ${xe(i.accent)}
          <div class="scoreinner">
            <div class="scorenum">${b(this.hass, r, e.precision ?? 0)}</div>
            <div class="scoremax">${f(this.hass, "of")} ${o}</div>
          </div>
        </div>
        <div class="score-status">
          ${this._renderStatus(e, i.data[0], s, "", 0, e.trend ?? "up_good", "atleast")}
        </div>
      </div>
    `;
  }
  /** Formats a value the same way the metric's big value is formatted. */
  _fmtMetricValue(i, t) {
    var e;
    if (i.m.duration ?? i.preset.duration) {
      const s = Object.values(i.m.phases ?? {}).map((o) => {
        var n;
        return o ? (n = this.hass.states[o]) == null ? void 0 : n.attributes.unit_of_measurement : void 0;
      }).find(Boolean), r = i.m.unit ?? (i.valueOverride !== void 0 ? s : (e = i.primaryState) == null ? void 0 : e.attributes.unit_of_measurement);
      return gt(t, r);
    }
    return it(b(this.hass, t, i.precision), i.unit);
  }
  _dayLabels(i) {
    if (i > 14) return p;
    const t = Q(this.hass) === "de" ? "de-DE" : "en-US", e = /* @__PURE__ */ new Date();
    e.setHours(0, 0, 0, 0);
    const s = Array.from(
      { length: i },
      (r, o) => new Date(e.getTime() - (i - 1 - o) * 864e5).toLocaleDateString(t, {
        weekday: i > 9 ? "narrow" : "short"
      })
    );
    return u`<div class="daylabels" style="--hc-days:${i}">
      ${s.map((r) => u`<span>${r}</span>`)}
    </div>`;
  }
  _renderPopup() {
    if (this._popup === null || !this._config) return p;
    const i = this._config.metrics[this._popup];
    if (!i) return p;
    const t = this._ctx(i);
    if (!t.primaryState) return p;
    const e = t.primaryState, s = t.data[0].buckets.filter(Number.isFinite), r = s.length ? {
      min: Math.min(...s),
      avg: s.reduce((a, c) => a + c, 0) / s.length,
      max: Math.max(...s)
    } : void 0, o = t.graph === "bar" || t.graph === "progress" ? "bar" : "line", n = u`
      ${t.graph === "progress" ? this._renderChart(i, "progress", t.data, t.unit, t.precision) : p}
      <div class="popup-chart">
        ${this._renderChart(i, o, t.data, t.unit, t.precision)}
        ${this._dayLabels(t.days)}
      </div>
    `;
    return u`
      <div class="backdrop" @click=${() => this._popup = null}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          style="--hc-accent:${t.accent}"
          @click=${(a) => a.stopPropagation()}
        >
          <div class="dialog-head">
            <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
            <div class="dialog-title">${t.name}</div>
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
      i,
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
      i,
      t.data[0],
      e,
      t.unit,
      t.precision,
      t.trendMode,
      t.goalType,
      t.valueOverride
    )}
          ${n}
          ${r ? u`<div class="stats">
                ${["min", "avg", "max"].map(
      (a) => u`<div class="stat">
                    <div class="stat-label">${f(this.hass, `stat_${a}`)}</div>
                    <div class="stat-value">${this._fmtMetricValue(t, r[a])}</div>
                  </div>`
    )}
              </div>` : p}
          ${t.multi ? this._renderSeriesChips(t.data, t.precision, t.trendMode) : p}
          ${t.type === "sleep" && i.phases ? this._renderSleepPhases(i) : p}
          ${this._renderSecondary(i)}
          <button
            class="openha"
            @click=${() => {
      var a;
      this._popup = null, this._moreInfo((a = t.series[0]) == null ? void 0 : a.entity);
    }}
          >
            <ha-icon icon="mdi:chart-box-outline"></ha-icon>
            ${f(this.hass, "open_ha")}
          </button>
        </div>
      </div>
    `;
  }
  _renderSleepPhases(i) {
    const t = {
      deep: "var(--deep-purple-color, #673AB7)",
      light: "var(--light-blue-color, #03A9F4)",
      rem: "var(--cyan-color, #00BCD4)",
      awake: "var(--amber-color, #FFC107)"
    }, e = ["deep", "light", "rem", "awake"].map((s) => {
      var a;
      const r = (a = i.phases) == null ? void 0 : a[s], o = r ? this.hass.states[r] : void 0, n = this._numeric(o);
      if (Number.isFinite(n))
        return { key: s, v: n, unit: o == null ? void 0 : o.attributes.unit_of_measurement, color: t[s] };
    }).filter((s) => !!s);
    return e.length ? u`
      <div class="segbar">
        ${e.map(
      (s) => u`<div class="seg" style="flex-grow:${s.v};background:${s.color}"></div>`
    )}
      </div>
      <div class="phases">
        ${e.map(
      (s) => u`<div class="phase">
            <span class="phasedot" style="background:${s.color}"></span>
            <span>${f(this.hass, `phase_${s.key}`)}</span>
            <span class="phaseval">${gt(s.v, s.unit)}</span>
          </div>`
    )}
      </div>
    ` : p;
  }
  _renderValue(i, t, e, s, r, o, n, a) {
    if (i.label) return u`<div class="value">${i.label}</div>`;
    if (t === "blood_pressure" && e.length >= 2) {
      const d = this._numeric(s, i.attribute), h = this._numeric(this.hass.states[e[1].entity]);
      return u`<div class="value">
          ${b(this.hass, d, 0)}/${b(this.hass, h, 0)}
          <span class="unit">${r}</span>
        </div>
        <div class="bplabels">
          <span class="bpitem">
            <span class="bpdot" style="background:${e[0].colorResolved}"></span>SYS
            ${b(this.hass, d, 0)}
          </span>
          <span class="bpitem">
            <span class="bpdot" style="background:${e[1].colorResolved}"></span>DIA
            ${b(this.hass, h, 0)}
          </span>
        </div>`;
    }
    const c = a ?? this._numeric(s, i.attribute);
    if (!Number.isFinite(c))
      return u`<div class="value">${s.state}</div>`;
    if (i.duration ?? n) {
      const d = Object.values(i.phases ?? {}).map((h) => {
        var l;
        return h ? (l = this.hass.states[h]) == null ? void 0 : l.attributes.unit_of_measurement : void 0;
      }).find(Boolean);
      return u`<div class="value">
        ${gt(
        c,
        i.unit ?? (a !== void 0 ? d : s.attributes.unit_of_measurement)
      )}
      </div>`;
    }
    return u`<div class="value">
      ${b(this.hass, c, o)}<span class="unit">${r}</span>
    </div>`;
  }
  _renderSeriesChips(i, t, e) {
    return u`<div class="serieslist">
      ${i.map((s) => {
      const r = this.hass.states[s.entity], o = this._numeric(r), n = s.unit ?? (r == null ? void 0 : r.attributes.unit_of_measurement) ?? "", a = s.name ?? (r == null ? void 0 : r.attributes.friendly_name) ?? s.entity, c = Lt(s.filled), d = Number.isFinite(c) ? c > 0 ? "mdi:arrow-top-right" : c < 0 ? "mdi:arrow-bottom-right" : "mdi:arrow-right" : "mdi:minus";
      return u`<div class="serieschip">
          ${e !== "none" ? u`<span class="dotarrow" style="background:${s.colorResolved}">
                <ha-icon .icon=${d}></ha-icon>
              </span>` : p}
          <span class="serieslabel">
            ${a}: ${Number.isFinite(o) ? it(b(this.hass, o, t), n) : (r == null ? void 0 : r.state) ?? "–"}
          </span>
        </div>`;
    })}
    </div>`;
  }
  _renderSecondary(i) {
    var e;
    if (!((e = i.secondary) != null && e.length)) return p;
    const t = i.secondary.map((s) => {
      const r = this.hass.states[s];
      if (!r) return;
      const o = this._numeric(r), n = r.attributes.unit_of_measurement ?? "";
      return Number.isFinite(o) ? it(b(this.hass, o), n) : r.state;
    }).filter(Boolean);
    return t.length ? u`<div class="secondary">${t.join(" • ")}</div>` : p;
  }
  _renderStatus(i, t, e, s, r, o, n = "atleast", a) {
    const c = a ?? this._numeric(e, i.attribute), d = this._resolveGoal(i.goal);
    if (Number.isFinite(d) && Number.isFinite(c)) {
      const w = this._resolveGoal(i.start);
      let S = NaN;
      if (Number.isFinite(w) && w !== d ? S = (w - c) / (w - d) * 100 : d > 0 && (S = n === "atmost" ? d / c * 100 : c / d * 100), !Number.isNaN(S)) {
        const U = Math.round(Math.min(Math.max(S, 0), 999)), L = U >= 100;
        return u`<div class="status ${L ? "good" : ""}">
          <ha-icon .icon=${L ? "mdi:check-circle" : "mdi:flag-outline"}></ha-icon>
          <span>${f(this.hass, "goal")}: ${U} %</span>
        </div>`;
      }
    }
    if (o === "none") return p;
    const h = Lt(t.filled);
    if (!Number.isFinite(h)) return p;
    const l = t.filled.find(Number.isFinite) ?? 0, g = Math.abs(h) < Math.max(Math.abs(l) * 5e-3, 1e-9), m = g || o === "neutral" ? "neutral" : h > 0 == (o === "up_good") ? "good" : "bad", y = g ? "mdi:arrow-right" : h > 0 ? "mdi:arrow-top-right" : "mdi:arrow-bottom-right", P = g ? f(this.hass, "stable") : `${b(this.hass, Math.abs(h), r)}${s ? ` ${s}` : ""}`;
    return u`<div class="status ${m}">
      <span class="dotarrow"><ha-icon .icon=${y}></ha-icon></span>
      <span>${P}</span>
    </div>`;
  }
  _renderChart(i, t, e, s, r) {
    if (t === "line")
      return u`${ve(
        e.map((o) => ({ values: o.filled, color: o.colorResolved }))
      )}`;
    if (t === "bar") {
      const o = this._resolveGoal(i.goal);
      return u`${$e(
        e[0].buckets,
        e[0].colorResolved,
        Number.isFinite(o) ? o : void 0
      )}`;
    }
    if (t === "progress") {
      const o = e.map((n) => {
        const a = this.hass.states[n.entity], c = this._numeric(a), d = this._resolveGoal(n.goal ?? i.goal);
        if (!Number.isFinite(c) || !Number.isFinite(d) || d <= 0) return p;
        const h = Math.max(0, Math.min(c / d * 100, 100)), l = n.unit ?? (a == null ? void 0 : a.attributes.unit_of_measurement) ?? s;
        return u`<div class="pbar">
          ${e.length > 1 ? u`<div class="pbar-label">
                <span>${n.name ?? (a == null ? void 0 : a.attributes.friendly_name) ?? n.entity}</span>
                <span>${it(b(this.hass, c, r), l)}</span>
              </div>` : p}
          <div class="ptrack" style="--hc-p:${n.colorResolved}">
            <div class="pfill" style="width:${h}%"></div>
          </div>
        </div>`;
      });
      return u`<div class="pbars">${o}</div>`;
    }
    return p;
  }
};
N.styles = It`
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

    /* ---- card styles ------------------------------------------------- */
    /* default: plain HA look following the active theme */
    .cardroot.s-default {
      --hc-tile-bg: var(
        --secondary-background-color,
        color-mix(in srgb, var(--primary-text-color) 5%, var(--hc-card-bg))
      );
      --hc-dot-fill: var(--secondary-background-color, var(--hc-card-bg));
      --hc-tile-radius: var(--ha-card-border-radius, 12px);
    }
    /* withings: soft tinted tiles (base tokens, nothing extra needed) */

    /* liquid glass: translucent, blurred, specular top edge */
    .cardroot.s-glass {
      --hc-tile-bg: color-mix(in srgb, var(--hc-card-bg) 42%, transparent);
      --hc-dot-fill: var(--hc-card-bg);
      --hc-tile-radius: 22px;
    }
    ha-card.cardroot.s-glass {
      background: color-mix(in srgb, var(--hc-card-bg) 55%, transparent);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      backdrop-filter: blur(18px) saturate(1.5);
    }
    .cardroot.s-glass .metric {
      border: 1px solid color-mix(in srgb, var(--primary-text-color) 12%, transparent);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, #fff 25%, transparent),
        0 8px 24px color-mix(in srgb, #000 10%, transparent);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      backdrop-filter: blur(18px) saturate(1.5);
    }

    /* material you: tonal surfaces, expressive radii */
    .cardroot.s-material {
      --hc-tile-bg: color-mix(in srgb, var(--primary-color) 10%, var(--hc-card-bg));
      --hc-dot-fill: color-mix(in srgb, var(--primary-color) 10%, var(--hc-card-bg));
      --hc-tile-radius: 24px;
    }
    ha-card.cardroot.s-material {
      border-radius: 28px;
    }
    .cardroot.s-material .iconchip {
      border-radius: 12px;
    }
    .cardroot.s-material .value {
      letter-spacing: 0;
    }

    /* bubble: free-floating solid modules with big icon bubbles */
    .cardroot.s-bubble {
      --hc-tile-bg: var(--hc-card-bg);
      --hc-dot-fill: var(--hc-card-bg);
      --hc-tile-radius: 32px;
    }
    ha-card.cardroot.s-bubble {
      background: none;
      box-shadow: none;
      border: none;
    }
    .cardroot.s-bubble .metric {
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.08));
      padding: 12px 16px;
    }
    .cardroot.s-bubble .iconchip {
      width: 42px;
      height: 42px;
      background: color-mix(in srgb, var(--hc-accent) 20%, transparent);
    }
    .cardroot.s-bubble .iconchip ha-icon {
      --mdc-icon-size: 22px;
    }
    .cardroot.s-bubble .name {
      font-weight: 700;
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
tt([
  xt({ attribute: !1 })
], N.prototype, "hass", 2);
tt([
  X()
], N.prototype, "_config", 2);
tt([
  X()
], N.prototype, "_history", 2);
tt([
  X()
], N.prototype, "_popup", 2);
N = tt([
  qt("health-card")
], N);
console.info(
  `%c HEALTH-CARD %c v${Me} `,
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
