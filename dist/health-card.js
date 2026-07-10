/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, ft = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _t = Symbol(), kt = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== _t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ft && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = kt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && kt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ie = (s) => new Vt(typeof s == "string" ? s : s + "", void 0, _t), Zt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new Vt(e, s, _t);
}, re = (s, t) => {
  if (ft) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = Q.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, Ct = ft ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ie(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ne, defineProperty: oe, getOwnPropertyDescriptor: ae, getOwnPropertyNames: ce, getOwnPropertySymbols: le, getPrototypeOf: he } = Object, S = globalThis, Mt = S.trustedTypes, de = Mt ? Mt.emptyScript : "", lt = S.reactiveElementPolyfillSupport, I = (s, t) => s, tt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? de : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, yt = (s, t) => !ne(s, t), Nt = { attribute: !0, type: String, converter: tt, reflect: !1, useDefault: !1, hasChanged: yt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let F = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Nt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && oe(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = ae(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const a = r == null ? void 0 : r.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = he(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, i = [...ce(e), ...le(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(Ct(r));
    } else t !== void 0 && e.push(Ct(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return re(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : tt).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : tt;
      this._$Em = r;
      const h = c.fromAttribute(e, a.type);
      this[r] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, o) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? yt)(o, e) || i.useDefault && i.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var i;
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
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
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
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[I("elementProperties")] = /* @__PURE__ */ new Map(), F[I("finalized")] = /* @__PURE__ */ new Map(), lt == null || lt({ ReactiveElement: F }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, Pt = (s) => s, et = W.trustedTypes, Tt = et ? et.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Kt = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, qt = "?" + w, pe = `<${qt}>`, N = document, V = () => N.createComment(""), Z = (s) => s === null || typeof s != "object" && typeof s != "function", bt = Array.isArray, ue = (s) => bt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", ht = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Ot = />/g, k = RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rt = /'/g, Dt = /"/g, Yt = /^(?:script|style|textarea|title)$/i, Jt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), u = Jt(1), K = Jt(2), R = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), Ut = /* @__PURE__ */ new WeakMap(), C = N.createTreeWalker(N, 129);
function Xt(s, t) {
  if (!bt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Tt !== void 0 ? Tt.createHTML(t) : t;
}
const ge = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = j;
  for (let a = 0; a < e; a++) {
    const c = s[a];
    let h, d, l = -1, g = 0;
    for (; g < c.length && (n.lastIndex = g, d = n.exec(c), d !== null); ) g = n.lastIndex, n === j ? d[1] === "!--" ? n = Ft : d[1] !== void 0 ? n = Ot : d[2] !== void 0 ? (Yt.test(d[2]) && (r = RegExp("</" + d[2], "g")), n = k) : d[3] !== void 0 && (n = k) : n === k ? d[0] === ">" ? (n = r ?? j, l = -1) : d[1] === void 0 ? l = -2 : (l = n.lastIndex - d[2].length, h = d[1], n = d[3] === void 0 ? k : d[3] === '"' ? Dt : Rt) : n === Dt || n === Rt ? n = k : n === Ft || n === Ot ? n = j : (n = k, r = void 0);
    const m = n === k && s[a + 1].startsWith("/>") ? " " : "";
    o += n === j ? c + pe : l >= 0 ? (i.push(h), c.slice(0, l) + Kt + c.slice(l) + w + m) : c + w + (l === -2 ? a : m);
  }
  return [Xt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class q {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, c = this.parts, [h, d] = ge(t, e);
    if (this.el = q.createElement(h, i), C.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = C.nextNode()) !== null && c.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(Kt)) {
          const g = d[n++], m = r.getAttribute(l).split(w), f = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: o, name: f[2], strings: m, ctor: f[1] === "." ? fe : f[1] === "?" ? _e : f[1] === "@" ? ye : st }), r.removeAttribute(l);
        } else l.startsWith(w) && (c.push({ type: 6, index: o }), r.removeAttribute(l));
        if (Yt.test(r.tagName)) {
          const l = r.textContent.split(w), g = l.length - 1;
          if (g > 0) {
            r.textContent = et ? et.emptyScript : "";
            for (let m = 0; m < g; m++) r.append(l[m], V()), C.nextNode(), c.push({ type: 2, index: ++o });
            r.append(l[g], V());
          }
        }
      } else if (r.nodeType === 8) if (r.data === qt) c.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(w, l + 1)) !== -1; ) c.push({ type: 7, index: o }), l += w.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = N.createElement("template");
    return i.innerHTML = t, i;
  }
}
function D(s, t, e = s, i) {
  var n, a;
  if (t === R) return t;
  let r = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = Z(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = D(s, r._$AS(s, t.values), r, i)), t;
}
class me {
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
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? N).importNode(e, !0);
    C.currentNode = r;
    let o = C.nextNode(), n = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let h;
        c.type === 2 ? h = new J(o, o.nextSibling, this, t) : c.type === 1 ? h = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (h = new be(o, this, t)), this._$AV.push(h), c = i[++a];
      }
      n !== (c == null ? void 0 : c.index) && (o = C.nextNode(), n++);
    }
    return C.currentNode = N, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class J {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = D(this, t, e), Z(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ue(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && Z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = q.createElement(Xt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new me(r, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Ut.get(t.strings);
    return e === void 0 && Ut.set(t.strings, e = new q(t)), e;
  }
  k(t) {
    bt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new J(this.O(V()), this.O(V()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = Pt(t).nextSibling;
      Pt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
let st = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = D(this, t, e, 0), n = !Z(t) || t !== this._$AH && t !== R, n && (this._$AH = t);
    else {
      const a = t;
      let c, h;
      for (t = o[0], c = 0; c < o.length - 1; c++) h = D(this, a[i + c], e, c), h === R && (h = this._$AH[c]), n || (n = !Z(h) || h !== this._$AH[c]), h === p ? t = p : t !== p && (t += (h ?? "") + o[c + 1]), this._$AH[c] = h;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
class fe extends st {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class _e extends st {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class ye extends st {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = D(this, t, e, 0) ?? p) === R) return;
    const i = this._$AH, r = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== p && (i === p || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class be {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    D(this, t);
  }
}
const dt = W.litHtmlPolyfillSupport;
dt == null || dt(q, J), (W.litHtmlVersions ?? (W.litHtmlVersions = [])).push("3.3.3");
const $e = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new J(t.insertBefore(V(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis;
class O extends F {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = $e(e, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var Gt;
O._$litElement$ = !0, O.finalized = !0, (Gt = M.litElementHydrateSupport) == null || Gt.call(M, { LitElement: O });
const pt = M.litElementPolyfillSupport;
pt == null || pt({ LitElement: O });
(M.litElementVersions ?? (M.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ve = { attribute: !0, type: String, converter: tt, reflect: !1, hasChanged: yt }, xe = (s = ve, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, c, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(a) {
      const c = this[n];
      t.call(this, a), this.requestUpdate(n, c, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function $t(s) {
  return (t, e) => typeof e == "object" ? xe(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function it(s) {
  return $t({ ...s, state: !0, attribute: !1 });
}
const mt = {
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
}, we = Object.keys(mt);
function X(s) {
  if (s)
    return s === "primary" ? "var(--primary-color)" : s === "accent" ? "var(--accent-color)" : mt[s] ? `var(--${s}-color, ${mt[s]})` : s;
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
}, Ht = ["teal", "orange", "pink", "cyan", "lime"], zt = {
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
    phase_awake: "Awake"
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
    phase_awake: "Wach"
  }
};
function rt(s) {
  var e;
  return (((e = s == null ? void 0 : s.locale) == null ? void 0 : e.language) ?? (s == null ? void 0 : s.language) ?? "en").startsWith("de") ? "de" : "en";
}
function b(s, t) {
  return zt[rt(s)][t] ?? zt.en[t] ?? t;
}
function y(s, t, e) {
  if (!Number.isFinite(t)) return "–";
  const i = rt(s) === "de" ? "de-DE" : "en-US";
  return e === void 0 ? new Intl.NumberFormat(i, { maximumFractionDigits: 2 }).format(t) : new Intl.NumberFormat(i, {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  }).format(t);
}
function ut(s, t) {
  return t ? /^[%°'"]/.test(t) ? `${s}${t}` : `${s} ${t}` : s;
}
function Lt(s, t) {
  if (!Number.isFinite(s)) return "–";
  let e;
  const i = (t ?? "min").toLowerCase();
  i.startsWith("h") ? e = s * 60 : i === "s" || i.startsWith("sec") ? e = s / 60 : e = s;
  const r = Math.round(e * 60), o = Math.floor(r / 3600), n = Math.floor(r % 3600 / 60), a = r % 60;
  return o > 0 ? n ? `${o} h ${n} min` : `${o} h` : n > 0 ? a && n < 10 ? `${n} min ${a} s` : `${n} min` : `${a} s`;
}
function Bt(s, t) {
  const e = new Date(t);
  if (isNaN(e.getTime())) return "";
  const i = rt(s) === "de" ? "de-DE" : "en-US", r = /* @__PURE__ */ new Date(), o = (a, c) => a.getFullYear() === c.getFullYear() && a.getMonth() === c.getMonth() && a.getDate() === c.getDate();
  if (o(e, r))
    return e.toLocaleTimeString(i, { hour: "numeric", minute: "2-digit" });
  const n = new Date(r.getTime() - 864e5);
  return o(e, n) ? b(s, "yesterday") : e.toLocaleDateString(i, { day: "numeric", month: "short" });
}
async function Ae(s, t, e) {
  if (!t.length) return {};
  const i = /* @__PURE__ */ new Date(), r = /* @__PURE__ */ new Date();
  r.setHours(0, 0, 0, 0), r.setDate(r.getDate() - (e - 1));
  const o = await s.callWS({
    type: "history/history_during_period",
    start_time: r.toISOString(),
    end_time: i.toISOString(),
    entity_ids: t,
    minimal_response: !0,
    no_attributes: !0
  }), n = {};
  for (const a of t)
    n[a] = ((o == null ? void 0 : o[a]) ?? []).map((c) => ({ t: c.lu * 1e3, v: parseFloat(c.s) })).filter((c) => Number.isFinite(c.v));
  return n;
}
function jt(s, t, e) {
  const i = /* @__PURE__ */ new Date();
  i.setHours(0, 0, 0, 0);
  const r = i.getTime() - (t - 1) * 864e5, o = Array.from({ length: t }, () => []);
  for (const n of s) {
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
function It(s) {
  const t = [...s];
  let e = NaN;
  for (let r = 0; r < t.length; r++)
    Number.isFinite(t[r]) ? e = t[r] : t[r] = e;
  let i = NaN;
  for (let r = t.length - 1; r >= 0; r--)
    Number.isFinite(t[r]) ? i = t[r] : t[r] = i;
  return t;
}
function Wt(s) {
  const t = s.filter(Number.isFinite);
  return t.length < 2 ? NaN : t[t.length - 1] - t[0];
}
const G = 220, A = 60, _ = 7;
function Se(s) {
  const t = s.filter(Number.isFinite), e = Math.min(...t), i = Math.max(...t), r = i - e || Math.abs(i) * 0.1 || 1;
  return { lo: e - r * 0.18, hi: i + r * 0.18 };
}
function Ee(s) {
  const t = s.filter((c) => c.values.some(Number.isFinite));
  if (!t.length) return p;
  const { lo: e, hi: i } = Se(t.flatMap((c) => c.values)), r = Math.max(...t.map((c) => c.values.length)), o = (c) => _ + c * (G - 2 * _) / Math.max(r - 1, 1), n = (c) => A - _ - (c - e) / (i - e) * (A - 2 * _), a = t.map((c) => {
    const h = c.values.map((l, g) => ({ x: o(g), y: n(l), ok: Number.isFinite(l) })).filter((l) => l.ok);
    if (!h.length) return p;
    let d = `M ${h[0].x} ${h[0].y}`;
    for (let l = 1; l < h.length; l++) {
      const g = (h[l - 1].x + h[l].x) / 2;
      d += ` C ${g} ${h[l - 1].y}, ${g} ${h[l].y}, ${h[l].x} ${h[l].y}`;
    }
    return K`
      <path d=${d} fill="none" stroke=${c.color} stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
      ${h.map(
      (l) => K`<circle cx=${l.x} cy=${l.y} r="3.1" fill="var(--hc-dot-fill)"
          stroke=${c.color} stroke-width="2"/>`
    )}
    `;
  });
  return u`<svg class="chart" viewBox="0 0 ${G} ${A}" aria-hidden="true">${a}</svg>`;
}
function ke(s, t, e) {
  if (!s.some((l) => Number.isFinite(l) && l > 0)) return p;
  const i = s.map((l) => Number.isFinite(l) && l > 0 ? l : 0), r = Math.max(...i, e ?? 0) || 1, o = i.length, n = (G - 2 * _) / o, a = Math.min(n * 0.55, 14), c = (l) => l / r * (A - 2 * _), h = i.map((l, g) => {
    const m = Math.max(c(l), l > 0 ? 3 : 1.5), f = _ + g * n + (n - a) / 2;
    return K`<rect x=${f} y=${A - _ - m} width=${a} height=${m}
      rx=${Math.min(a / 2, 4)} fill=${t} opacity=${l > 0 ? 1 : 0.25}/>`;
  }), d = Number.isFinite(e) ? K`<line x1=${_} x2=${G - _} y1=${A - _ - c(e)} y2=${A - _ - c(e)}
        stroke=${t} stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>` : p;
  return u`<svg class="chart" viewBox="0 0 ${G} ${A}" aria-hidden="true">
    ${d}${h}
  </svg>`;
}
function Ce(s) {
  const t = [
    "var(--amber-color, #FFC107)",
    "var(--purple-color, #9C27B0)",
    "var(--pink-color, #E91E63)",
    "color-mix(in srgb, var(--primary-text-color) 16%, transparent)",
    "color-mix(in srgb, var(--primary-text-color) 16%, transparent)"
  ], e = (r) => Math.abs(Math.sin(r * 127.1) * 43758.5453 % 1), i = [];
  for (let r = 0; r < 2; r++) {
    const o = r === 0 ? 74 : 88, n = r === 0 ? 26 : 32;
    for (let a = 0; a < n; a++) {
      const c = a / n * Math.PI * 2 + e(a + r * 100) * 0.18 - Math.PI / 2, h = o + (e(a * 3 + r * 7) - 0.5) * 6, d = 2.4 + e(a * 7 + r * 13) * 2.4, l = t[Math.floor(e(a * 11 + r * 29) * t.length)];
      i.push(
        K`<circle cx=${100 + Math.cos(c) * h} cy=${100 + Math.sin(c) * h}
          r=${d} fill=${l} opacity="0.75"/>`
      );
    }
  }
  return u`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="62" fill="color-mix(in srgb, ${s} 9%, transparent)" />
    ${i}
  </svg>`;
}
var Me = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, nt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Ne(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Me(t, e, r), r;
};
const Pe = Object.keys(Y), Te = ["body_composition", "nutrition"], gt = {
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
    goal_type: "Goal direction",
    gt_atleast: "Reach at least",
    gt_atmost: "Stay at/below (e.g. lose weight)",
    goal_entity: "Goal sensor (overrides number)",
    start: "Start value (number)",
    start_entity: "Start sensor (overrides number)",
    tap_action: "Tap action",
    ta_popup: "Popup (more info)",
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
    goal_type: "Zielrichtung",
    gt_atleast: "Mindestens erreichen",
    gt_atmost: "Höchstens (z. B. abnehmen)",
    goal_entity: "Ziel-Sensor (hat Vorrang)",
    start: "Startwert (Zahl)",
    start_entity: "Start-Sensor (hat Vorrang)",
    tap_action: "Klick-Aktion",
    ta_popup: "Popup (Details)",
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
let U = class extends O {
  constructor() {
    super(...arguments), this._expanded = -1;
  }
  setConfig(s) {
    this._config = s;
  }
  _label(s) {
    return (gt[rt(this.hass)] ?? gt.en)[s] ?? gt.en[s] ?? s;
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
          }
        ]
      },
      { name: "tiles", selector: { boolean: {} } },
      { name: "background", selector: { boolean: {} } },
      { name: "flush", selector: { boolean: {} } }
    ];
  }
  _metricSchema(s) {
    const t = s.type ?? "custom", e = (r, o) => r.map((n) => ({ value: n, label: this._label(`${o}_${n}`) })), i = !s.entities || s.entities.every((r) => typeof r == "string");
    return [
      {
        name: "type",
        selector: {
          select: {
            mode: "dropdown",
            options: Pe.map((r) => ({ value: r, label: b(this.hass, r) }))
          }
        }
      },
      { name: "entity", selector: { entity: {} } },
      ...t === "blood_pressure" ? [{ name: "entity2", selector: { entity: {} } }] : [],
      ...Te.includes(t) && i ? [{ name: "entities", selector: { entity: { multiple: !0 } } }] : [],
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
                options: we.map((r) => ({ value: r, label: r }))
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
                options: e(["popup", "link", "none"], "ta")
              }
            }
          },
          ...s.tap_action === "link" ? [{ name: "link", selector: { text: {} } }] : [],
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
        .data=${{ tiles: !0, background: !0, layout: "grid", ...this._config }}
        .schema=${this._topSchema()}
        .computeLabel=${(s) => this._label(s.name)}
        @value-changed=${this._topChanged}
      ></ha-form>

      <div class="metrics">
        ${this._config.metrics.map((s, t) => this._renderMetricEditor(s, t))}
      </div>

      <button class="add" @click=${this._addMetric}>
        <ha-icon icon="mdi:plus"></ha-icon>
        ${this._label("add_metric")}
      </button>
    `;
  }
  _renderMetricEditor(s, t) {
    var n, a, c, h;
    const e = s.type ?? "custom", i = Y[e] ?? Y.custom, r = this._expanded === t, o = this._config.metrics.length;
    return u`
      <div class="metric ${r ? "open" : ""}">
        <div class="metric-head" @click=${() => this._expanded = r ? -1 : t}>
          <ha-icon .icon=${s.icon ?? i.icon}></ha-icon>
          <span class="metric-title">
            ${s.name ?? b(this.hass, e)}
            <span class="metric-entity">${s.entity ?? ""}</span>
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
            .disabled=${t === o - 1}
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
            icon=${r ? "mdi:chevron-up" : "mdi:chevron-down"}
          ></ha-icon>
        </div>
        ${r ? u`<div class="metric-body">
              <ha-form
                .hass=${this.hass}
                .data=${{
      ...s,
      goal: typeof s.goal == "number" ? s.goal : void 0,
      goal_entity: typeof s.goal == "string" ? s.goal : void 0,
      start: typeof s.start == "number" ? s.start : void 0,
      start_entity: typeof s.start == "string" ? s.start : void 0,
      phases_deep: (n = s.phases) == null ? void 0 : n.deep,
      phases_light: (a = s.phases) == null ? void 0 : a.light,
      phases_rem: (c = s.phases) == null ? void 0 : c.rem,
      phases_awake: (h = s.phases) == null ? void 0 : h.awake
    }}
                .schema=${this._metricSchema(s)}
                .computeLabel=${(d) => this._label(d.name)}
                @value-changed=${(d) => this._metricChanged(d, t)}
              ></ha-form>
            </div>` : p}
      </div>
    `;
  }
  _emit(s) {
    this._config = s, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _clean(s) {
    const t = {};
    for (const [e, i] of Object.entries(s))
      i === "" || i === null || i === void 0 || Array.isArray(i) && !i.length || (t[e] = i);
    return t;
  }
  _topChanged(s) {
    if (s.stopPropagation(), !this._config) return;
    const t = s.detail.value;
    this._emit(this._clean({ ...this._config, ...t, metrics: this._config.metrics }));
  }
  _metricChanged(s, t) {
    if (s.stopPropagation(), !this._config) return;
    const e = { ...s.detail.value }, i = {};
    for (const o of ["deep", "light", "rem", "awake"]) {
      const n = e[`phases_${o}`];
      delete e[`phases_${o}`], typeof n == "string" && n && (i[o] = n);
    }
    Object.keys(i).length ? e.phases = i : delete e.phases;
    for (const o of ["goal", "start"]) {
      const n = e[`${o}_entity`];
      delete e[`${o}_entity`], typeof n == "string" && n && (e[o] = n);
    }
    const r = [...this._config.metrics];
    r[t] = this._clean(e), this._emit({ ...this._config, metrics: r });
  }
  _addMetric() {
    if (!this._config) return;
    const s = [...this._config.metrics, { type: "weight" }];
    this._expanded = s.length - 1, this._emit({ ...this._config, metrics: s });
  }
  _remove(s, t) {
    if (s.stopPropagation(), !this._config) return;
    const e = this._config.metrics.filter((i, r) => r !== t);
    this._expanded === t && (this._expanded = -1), this._emit({ ...this._config, metrics: e });
  }
  _move(s, t, e) {
    if (s.stopPropagation(), !this._config) return;
    const i = [...this._config.metrics], r = t + e;
    r < 0 || r >= i.length || ([i[t], i[r]] = [i[r], i[t]], this._expanded === t && (this._expanded = r), this._emit({ ...this._config, metrics: i }));
  }
};
U.styles = Zt`
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
nt([
  $t({ attribute: !1 })
], U.prototype, "hass", 2);
nt([
  it()
], U.prototype, "_config", 2);
nt([
  it()
], U.prototype, "_expanded", 2);
U = nt([
  Qt("health-card-editor")
], U);
var Fe = Object.defineProperty, Oe = Object.getOwnPropertyDescriptor, ot = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Oe(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Fe(t, e, r), r;
};
const Re = "0.1.0", De = 5 * 60 * 1e3, Ue = 15 * 60 * 1e3;
let H = class extends O {
  constructor() {
    super(...arguments), this._history = {}, this._fetching = !1, this._cfgSig = "", this._stateSig = "", this._lastFetch = 0;
  }
  static getConfigElement() {
    return document.createElement("health-card-editor");
  }
  static getStubConfig(s) {
    const t = (o) => {
      var n;
      return (n = Object.values(s.states).find(
        (a) => a.entity_id.startsWith("sensor.") && a.attributes.device_class === o
      )) == null ? void 0 : n.entity_id;
    }, e = [], i = t("weight");
    i && e.push({ type: "weight", entity: i });
    const r = t("temperature");
    return r && e.push({ type: "temperature", entity: r }), e.length || e.push({ type: "weight", entity: "" }), { title: "Gesundheit", metrics: e };
  }
  setConfig(s) {
    if (!s || !Array.isArray(s.metrics) || !s.metrics.length)
      throw new Error("Please define at least one metric (metrics: [...])");
    this._config = s;
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
  updated(s) {
    super.updated(s), (s.has("hass") || s.has("_config")) && this._maybeFetch();
  }
  _watchedEntities() {
    var t;
    const s = /* @__PURE__ */ new Set();
    for (const e of ((t = this._config) == null ? void 0 : t.metrics) ?? []) {
      for (const i of this._series(e)) i.entity && s.add(i.entity);
      for (const i of e.secondary ?? []) s.add(i);
      for (const i of Object.values(e.phases ?? {})) i && s.add(i);
    }
    return [...s].filter((e) => {
      var i;
      return (i = this.hass) == null ? void 0 : i.states[e];
    });
  }
  /** Goal can be a plain number, a numeric string or an entity id. */
  _resolveGoal(s) {
    if (typeof s == "number") return s;
    if (typeof s != "string" || !s) return NaN;
    const t = this.hass.states[s];
    return parseFloat(t ? t.state : s);
  }
  _handleTap(s, t) {
    const e = s.tap_action ?? "popup";
    if (e !== "none") {
      if (e === "link") {
        if (!s.link) return;
        if (/^https?:\/\//.test(s.link)) {
          window.open(s.link, "_blank", "noopener");
          return;
        }
        history.pushState(null, "", s.link), this.dispatchEvent(
          new Event("location-changed", { bubbles: !0, composed: !0 })
        );
        return;
      }
      this._moreInfo(t);
    }
  }
  _maybeFetch() {
    if (!this.hass || !this._config || this._fetching) return;
    const s = this._watchedEntities();
    if (!s.length) return;
    const t = Math.max(
      ...this._config.metrics.map((n) => n.days ?? this._config.days ?? 7)
    ), e = `${t}|${s.join(",")}`, i = s.map((n) => {
      var a;
      return ((a = this.hass.states[n]) == null ? void 0 : a.last_updated) ?? "";
    }).join("|"), r = Date.now();
    (e !== this._cfgSig || r - this._lastFetch > Ue || i !== this._stateSig && r - this._lastFetch > De) && (this._fetching = !0, this._cfgSig = e, this._stateSig = i, Ae(this.hass, s, t).then((n) => {
      this._history = n, this._lastFetch = Date.now();
    }).catch((n) => console.warn("health-card: history fetch failed", n)).finally(() => {
      this._fetching = !1;
    }));
  }
  _series(s) {
    var e;
    if ((e = s.entities) != null && e.length)
      return s.entities.map((i) => typeof i == "string" ? { entity: i } : i);
    const t = [];
    return s.entity && t.push({ entity: s.entity }), s.entity2 && t.push({ entity: s.entity2 }), t;
  }
  _numeric(s, t) {
    if (!s) return NaN;
    const e = t ? s.attributes[t] : s.state;
    return typeof e == "number" ? e : parseFloat(e);
  }
  _moreInfo(s) {
    s && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    if (!this.hass || !this._config) return p;
    const s = this._config, t = [
      s.tiles === !1 ? "flat" : "tiles",
      s.background === !1 ? "nobg" : "",
      s.flush ? "flush" : ""
    ].join(" ");
    return u`
      <ha-card class=${t}>
        ${s.title ? u`<div class="header">
              <div class="title">${s.title}</div>
              ${s.subtitle ? u`<div class="subtitle">${s.subtitle}</div>` : p}
            </div>` : p}
        <div
          class="metrics ${s.layout === "carousel" ? "carousel" : ""}"
          style="--hc-columns:${s.columns ?? 1}"
        >
          ${s.metrics.map((e) => this._renderMetric(e))}
        </div>
      </ha-card>
    `;
  }
  _renderMetric(s) {
    var xt, wt, At;
    const t = s.type && Y[s.type] ? s.type : "custom", e = Y[t], i = X(s.color) ?? X(e.color), r = s.name ?? b(this.hass, t), o = s.icon ?? e.icon, n = Object.values(s.phases ?? {}).filter(Boolean);
    let a = this._series(s);
    !a.length && t === "sleep" && n.length && (a = [{ entity: n[0] }]);
    const c = (xt = a[0]) != null && xt.entity ? this.hass.states[a[0].entity] : void 0;
    if (!a.length || !c)
      return u`
        <div class="metric" style="--hc-accent:${i}">
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${o}></ha-icon></div>
            <div class="name">${r}</div>
          </div>
          <div class="missing">
            ${(wt = a[0]) != null && wt.entity ? u`${b(this.hass, "entity_missing")}: ${a[0].entity}` : b(this.hass, "no_data")}
          </div>
        </div>
      `;
    const h = Math.max(1, s.days ?? this._config.days ?? 7), d = s.graph ?? e.graph, l = s.aggregate ?? e.aggregate, g = s.trend ?? e.trend, m = s.precision ?? e.precision, f = s.unit ?? a[0].unit ?? c.attributes.unit_of_measurement ?? e.unit ?? "", $ = a.map((E, P) => {
      const B = jt(this._history[E.entity] ?? [], h, l);
      return {
        ...E,
        colorResolved: X(E.color) ?? (P === 0 ? i : X(Ht[(P - 1) % Ht.length])),
        buckets: B,
        filled: It(B)
      };
    });
    let x;
    if (t === "sleep" && !s.entity && s.phases) {
      const E = ["deep", "light", "rem"].map((P) => s.phases[P]).filter(Boolean);
      if (E.length) {
        const P = E.map(
          (T) => jt(this._history[T] ?? [], h, l)
        ), B = Array.from({ length: h }, (T, at) => {
          const Et = P.map((ct) => ct[at]).filter(Number.isFinite);
          return Et.length ? Et.reduce((ct, se) => ct + se, 0) : NaN;
        });
        $[0] = { ...$[0], buckets: B, filled: It(B) };
        const St = E.map((T) => this._numeric(this.hass.states[T])).filter(Number.isFinite);
        St.length && (x = St.reduce((T, at) => T + at, 0));
      }
    }
    if (t === "score")
      return this._renderScore(s, $[0], c, i, r, o);
    const v = !!s.entities && a.length > 1, z = !v || !!s.label, L = v && d !== "progress", vt = !v, te = v && d === "progress", ee = s.goal_type ?? e.goalType ?? "atleast";
    return u`
      <div
        class="metric ${(s.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${i}"
        @click=${() => this._handleTap(s, a[0].entity)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${o}></ha-icon></div>
          <div class="name">${r}</div>
          <div class="time">${Bt(this.hass, c.last_updated)}</div>
        </div>
        <div class="body ${te ? "stack" : ""}">
          ${z || L || vt || (At = s.secondary) != null && At.length ? u`<div class="info">
                ${z ? this._renderValue(
      s,
      t,
      $,
      c,
      f,
      m,
      e.duration,
      x
    ) : p}
                ${L ? this._renderSeriesChips($, m, g) : p}
                ${this._renderSecondary(s)}
                ${vt ? this._renderStatus(
      s,
      $[0],
      c,
      f,
      m,
      g,
      ee,
      x
    ) : p}
              </div>` : p}
          <div class="chartcell">
            ${this._renderChart(s, d, $, f, m)}
          </div>
        </div>
        ${t === "sleep" && s.phases ? this._renderSleepPhases(s) : p}
      </div>
    `;
  }
  _renderScore(s, t, e, i, r, o) {
    const n = this._numeric(e, s.attribute), a = s.max ?? 100, c = s.trend ?? "up_good";
    return u`
      <div
        class="metric score-metric ${(s.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${i}"
        @click=${() => this._handleTap(s, e.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${o}></ha-icon></div>
          <div class="name">${r}</div>
          <div class="time">${Bt(this.hass, e.last_updated)}</div>
        </div>
        <div class="scorewrap">
          ${Ce(i)}
          <div class="scoreinner">
            <div class="scorenum">${y(this.hass, n, s.precision ?? 0)}</div>
            <div class="scoremax">${b(this.hass, "of")} ${a}</div>
          </div>
        </div>
        <div class="score-status">
          ${this._renderStatus(s, t, e, "", 0, c, "atleast")}
        </div>
      </div>
    `;
  }
  _renderSleepPhases(s) {
    const t = {
      deep: "var(--deep-purple-color, #673AB7)",
      light: "var(--light-blue-color, #03A9F4)",
      rem: "var(--cyan-color, #00BCD4)",
      awake: "var(--amber-color, #FFC107)"
    }, e = ["deep", "light", "rem", "awake"].map((i) => {
      var a;
      const r = (a = s.phases) == null ? void 0 : a[i], o = r ? this.hass.states[r] : void 0, n = this._numeric(o);
      if (Number.isFinite(n))
        return { key: i, v: n, unit: o == null ? void 0 : o.attributes.unit_of_measurement, color: t[i] };
    }).filter((i) => !!i);
    return e.length ? u`
      <div class="segbar">
        ${e.map(
      (i) => u`<div class="seg" style="flex-grow:${i.v};background:${i.color}"></div>`
    )}
      </div>
      <div class="phases">
        ${e.map(
      (i) => u`<div class="phase">
            <span class="phasedot" style="background:${i.color}"></span>
            <span>${b(this.hass, `phase_${i.key}`)}</span>
            <span class="phaseval">${Lt(i.v, i.unit)}</span>
          </div>`
    )}
      </div>
    ` : p;
  }
  _renderValue(s, t, e, i, r, o, n, a) {
    if (s.label) return u`<div class="value">${s.label}</div>`;
    if (t === "blood_pressure" && e.length >= 2) {
      const h = this._numeric(i, s.attribute), d = this._numeric(this.hass.states[e[1].entity]);
      return u`<div class="value">
          ${y(this.hass, h, 0)}/${y(this.hass, d, 0)}
          <span class="unit">${r}</span>
        </div>
        <div class="bplabels">
          <span class="bpitem">
            <span class="bpdot" style="background:${e[0].colorResolved}"></span>SYS
            ${y(this.hass, h, 0)}
          </span>
          <span class="bpitem">
            <span class="bpdot" style="background:${e[1].colorResolved}"></span>DIA
            ${y(this.hass, d, 0)}
          </span>
        </div>`;
    }
    const c = a ?? this._numeric(i, s.attribute);
    if (!Number.isFinite(c))
      return u`<div class="value">${i.state}</div>`;
    if (s.duration ?? n) {
      const h = Object.values(s.phases ?? {}).map((d) => {
        var l;
        return d ? (l = this.hass.states[d]) == null ? void 0 : l.attributes.unit_of_measurement : void 0;
      }).find(Boolean);
      return u`<div class="value">
        ${Lt(
        c,
        s.unit ?? (a !== void 0 ? h : i.attributes.unit_of_measurement)
      )}
      </div>`;
    }
    return u`<div class="value">
      ${y(this.hass, c, o)}<span class="unit">${r}</span>
    </div>`;
  }
  _renderSeriesChips(s, t, e) {
    return u`<div class="serieslist">
      ${s.map((i) => {
      const r = this.hass.states[i.entity], o = this._numeric(r), n = i.unit ?? (r == null ? void 0 : r.attributes.unit_of_measurement) ?? "", a = i.name ?? (r == null ? void 0 : r.attributes.friendly_name) ?? i.entity, c = Wt(i.filled), h = Number.isFinite(c) ? c > 0 ? "mdi:arrow-top-right" : c < 0 ? "mdi:arrow-bottom-right" : "mdi:arrow-right" : "mdi:minus";
      return u`<div class="serieschip">
          ${e !== "none" ? u`<span class="dotarrow" style="background:${i.colorResolved}">
                <ha-icon .icon=${h}></ha-icon>
              </span>` : p}
          <span class="serieslabel">
            ${a}: ${Number.isFinite(o) ? ut(y(this.hass, o, t), n) : (r == null ? void 0 : r.state) ?? "–"}
          </span>
        </div>`;
    })}
    </div>`;
  }
  _renderSecondary(s) {
    var e;
    if (!((e = s.secondary) != null && e.length)) return p;
    const t = s.secondary.map((i) => {
      const r = this.hass.states[i];
      if (!r) return;
      const o = this._numeric(r), n = r.attributes.unit_of_measurement ?? "";
      return Number.isFinite(o) ? ut(y(this.hass, o), n) : r.state;
    }).filter(Boolean);
    return t.length ? u`<div class="secondary">${t.join(" • ")}</div>` : p;
  }
  _renderStatus(s, t, e, i, r, o, n = "atleast", a) {
    const c = a ?? this._numeric(e, s.attribute), h = this._resolveGoal(s.goal);
    if (Number.isFinite(h) && Number.isFinite(c)) {
      const x = this._resolveGoal(s.start);
      let v = NaN;
      if (Number.isFinite(x) && x !== h ? v = (x - c) / (x - h) * 100 : h > 0 && (v = n === "atmost" ? h / c * 100 : c / h * 100), !Number.isNaN(v)) {
        const z = Math.round(Math.min(Math.max(v, 0), 999)), L = z >= 100;
        return u`<div class="status ${L ? "good" : ""}">
          <ha-icon .icon=${L ? "mdi:check-circle" : "mdi:flag-outline"}></ha-icon>
          <span>${b(this.hass, "goal")}: ${z} %</span>
        </div>`;
      }
    }
    if (o === "none") return p;
    const d = Wt(t.filled);
    if (!Number.isFinite(d)) return p;
    const l = t.filled.find(Number.isFinite) ?? 0, g = Math.abs(d) < Math.max(Math.abs(l) * 5e-3, 1e-9), m = g || o === "neutral" ? "neutral" : d > 0 == (o === "up_good") ? "good" : "bad", f = g ? "mdi:arrow-right" : d > 0 ? "mdi:arrow-top-right" : "mdi:arrow-bottom-right", $ = g ? b(this.hass, "stable") : `${y(this.hass, Math.abs(d), r)}${i ? ` ${i}` : ""}`;
    return u`<div class="status ${m}">
      <span class="dotarrow"><ha-icon .icon=${f}></ha-icon></span>
      <span>${$}</span>
    </div>`;
  }
  _renderChart(s, t, e, i, r) {
    if (t === "line")
      return u`${Ee(
        e.map((o) => ({ values: o.filled, color: o.colorResolved }))
      )}`;
    if (t === "bar") {
      const o = this._resolveGoal(s.goal);
      return u`${ke(
        e[0].buckets,
        e[0].colorResolved,
        Number.isFinite(o) ? o : void 0
      )}`;
    }
    if (t === "progress") {
      const o = e.map((n) => {
        const a = this.hass.states[n.entity], c = this._numeric(a), h = this._resolveGoal(n.goal ?? s.goal);
        if (!Number.isFinite(c) || !Number.isFinite(h) || h <= 0) return p;
        const d = Math.max(0, Math.min(c / h * 100, 100)), l = n.unit ?? (a == null ? void 0 : a.attributes.unit_of_measurement) ?? i;
        return u`<div class="pbar">
          ${e.length > 1 ? u`<div class="pbar-label">
                <span>${n.name ?? (a == null ? void 0 : a.attributes.friendly_name) ?? n.entity}</span>
                <span>${ut(y(this.hass, c, r), l)}</span>
              </div>` : p}
          <div class="ptrack" style="--hc-p:${n.colorResolved}">
            <div class="pfill" style="width:${d}%"></div>
          </div>
        </div>`;
      });
      return u`<div class="pbars">${o}</div>`;
    }
    return p;
  }
};
H.styles = Zt`
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
    ha-card.nobg {
      background: none;
      box-shadow: none;
      border: none;
    }
    ha-card.flush {
      padding: 0;
    }
    ha-card.flush .header {
      padding: 0 0 14px 0;
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
  `;
ot([
  $t({ attribute: !1 })
], H.prototype, "hass", 2);
ot([
  it()
], H.prototype, "_config", 2);
ot([
  it()
], H.prototype, "_history", 2);
H = ot([
  Qt("health-card")
], H);
console.info(
  `%c HEALTH-CARD %c v${Re} `,
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
  H as HealthCard
};
