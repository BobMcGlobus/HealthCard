/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = globalThis, we = ce.ShadowRoot && (ce.ShadyCSS === void 0 || ce.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ke = Symbol(), Fe = /* @__PURE__ */ new WeakMap();
let Je = class {
  constructor(e, r, i) {
    if (this._$cssResult$ = !0, i !== ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (we && e === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (e = Fe.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Fe.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (t) => new Je(typeof t == "string" ? t : t + "", void 0, ke), Qe = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((i, s, o) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[o + 1], t[0]);
  return new Je(r, t, ke);
}, ht = (t, e) => {
  if (we) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const i = document.createElement("style"), s = ce.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = r.cssText, t.appendChild(i);
  }
}, De = we ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const i of e.cssRules) r += i.cssText;
  return dt(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pt, defineProperty: ut, getOwnPropertyDescriptor: mt, getOwnPropertyNames: gt, getOwnPropertySymbols: ft, getPrototypeOf: bt } = Object, T = globalThis, Te = T.trustedTypes, yt = Te ? Te.emptyScript : "", ge = T.reactiveElementPolyfillSupport, J = (t, e) => t, le = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? yt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, Se = (t, e) => !pt(t, e), Pe = { attribute: !0, type: String, converter: le, reflect: !1, useDefault: !1, hasChanged: Se };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let V = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = Pe) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, r);
      s !== void 0 && ut(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, r, i) {
    const { get: s, set: o } = mt(this.prototype, e) ?? { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get: s, set(a) {
      const n = s == null ? void 0 : s.call(this);
      o == null || o.call(this, a), this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Pe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const e = bt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const r = this.properties, i = [...gt(r), ...ft(r)];
      for (const s of i) this.createProperty(s, r[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0) for (const [i, s] of r) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, i] of this.elementProperties) {
      const s = this._$Eu(r, i);
      s !== void 0 && this._$Eh.set(s, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) r.unshift(De(s));
    } else e !== void 0 && r.push(De(e));
    return r;
  }
  static _$Eu(e, r) {
    const i = r.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((r) => r(this));
  }
  addController(e) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((r = e.hostConnected) == null || r.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$EO) == null || r.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const i of r.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ht(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((r) => {
      var i;
      return (i = r.hostConnected) == null ? void 0 : i.call(r);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var i;
      return (i = r.hostDisconnected) == null ? void 0 : i.call(r);
    });
  }
  attributeChangedCallback(e, r, i) {
    this._$AK(e, i);
  }
  _$ET(e, r) {
    var o;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : le).toAttribute(r, i.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, r) {
    var o, a;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : le;
      this._$Em = s;
      const l = c.fromAttribute(r, n.type);
      this[s] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, r, i, s = !1, o) {
    var a;
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (o = this[e]), i ?? (i = n.getPropertyOptions(e)), !((i.hasChanged ?? Se)(o, r) || i.useDefault && i.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: i, reflect: s, wrapped: o }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? r ?? this[e]), o !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (r = void 0), this._$AL.set(e, r)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
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
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(r)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var r;
    (r = this._$EO) == null || r.forEach((i) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[J("elementProperties")] = /* @__PURE__ */ new Map(), V[J("finalized")] = /* @__PURE__ */ new Map(), ge == null || ge({ ReactiveElement: V }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, Re = (t) => t, de = Q.trustedTypes, ze = de ? de.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, et = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, tt = "?" + D, _t = `<${tt}>`, B = document, ee = () => B.createComment(""), te = (t) => t === null || typeof t != "object" && typeof t != "function", Ae = Array.isArray, vt = (t) => Ae(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", fe = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oe = /-->/g, Le = />/g, R = RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), He = /'/g, Be = /"/g, rt = /^(?:script|style|textarea|title)$/i, it = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), p = it(1), S = it(2), q = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ue = /* @__PURE__ */ new WeakMap(), z = B.createTreeWalker(B, 129);
function st(t, e) {
  if (!Ae(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ze !== void 0 ? ze.createHTML(e) : e;
}
const xt = (t, e) => {
  const r = t.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Z;
  for (let n = 0; n < r; n++) {
    const c = t[n];
    let l, d, h = -1, g = 0;
    for (; g < c.length && (a.lastIndex = g, d = a.exec(c), d !== null); ) g = a.lastIndex, a === Z ? d[1] === "!--" ? a = Oe : d[1] !== void 0 ? a = Le : d[2] !== void 0 ? (rt.test(d[2]) && (s = RegExp("</" + d[2], "g")), a = R) : d[3] !== void 0 && (a = R) : a === R ? d[0] === ">" ? (a = s ?? Z, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? R : d[3] === '"' ? Be : He) : a === Be || a === He ? a = R : a === Oe || a === Le ? a = Z : (a = R, s = void 0);
    const b = a === R && t[n + 1].startsWith("/>") ? " " : "";
    o += a === Z ? c + _t : h >= 0 ? (i.push(l), c.slice(0, h) + et + c.slice(h) + D + b) : c + D + (h === -2 ? n : b);
  }
  return [st(t, o + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class re {
  constructor({ strings: e, _$litType$: r }, i) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const n = e.length - 1, c = this.parts, [l, d] = xt(e, r);
    if (this.el = re.createElement(l, i), z.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = z.nextNode()) !== null && c.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(et)) {
          const g = d[a++], b = s.getAttribute(h).split(D), _ = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: o, name: _[2], strings: b, ctor: _[1] === "." ? wt : _[1] === "?" ? kt : _[1] === "@" ? St : pe }), s.removeAttribute(h);
        } else h.startsWith(D) && (c.push({ type: 6, index: o }), s.removeAttribute(h));
        if (rt.test(s.tagName)) {
          const h = s.textContent.split(D), g = h.length - 1;
          if (g > 0) {
            s.textContent = de ? de.emptyScript : "";
            for (let b = 0; b < g; b++) s.append(h[b], ee()), z.nextNode(), c.push({ type: 2, index: ++o });
            s.append(h[g], ee());
          }
        }
      } else if (s.nodeType === 8) if (s.data === tt) c.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(D, h + 1)) !== -1; ) c.push({ type: 7, index: o }), h += D.length - 1;
      }
      o++;
    }
  }
  static createElement(e, r) {
    const i = B.createElement("template");
    return i.innerHTML = e, i;
  }
}
function K(t, e, r = t, i) {
  var a, n;
  if (e === q) return e;
  let s = i !== void 0 ? (a = r._$Co) == null ? void 0 : a[i] : r._$Cl;
  const o = te(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((n = s == null ? void 0 : s._$AO) == null || n.call(s, !1), o === void 0 ? s = void 0 : (s = new o(t), s._$AT(t, r, i)), i !== void 0 ? (r._$Co ?? (r._$Co = []))[i] = s : r._$Cl = s), s !== void 0 && (e = K(t, s._$AS(t, e.values), s, i)), e;
}
class $t {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: r }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? B).importNode(r, !0);
    z.currentNode = s;
    let o = z.nextNode(), a = 0, n = 0, c = i[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new ie(o, o.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (l = new At(o, this, e)), this._$AV.push(l), c = i[++n];
      }
      a !== (c == null ? void 0 : c.index) && (o = z.nextNode(), a++);
    }
    return z.currentNode = B, s;
  }
  p(e) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, r), r += i.strings.length - 2) : i._$AI(e[r])), r++;
  }
}
class ie {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, r, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = K(this, e, r), te(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : vt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && te(this._$AH) ? this._$AA.nextSibling.data = e : this.T(B.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: r, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = re.createElement(st(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(r);
    else {
      const a = new $t(s, this), n = a.u(this.options);
      a.p(r), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let r = Ue.get(e.strings);
    return r === void 0 && Ue.set(e.strings, r = new re(e)), r;
  }
  k(e) {
    Ae(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, s = 0;
    for (const o of e) s === r.length ? r.push(i = new ie(this.O(ee()), this.O(ee()), this, this.options)) : i = r[s], i._$AI(o), s++;
    s < r.length && (this._$AR(i && i._$AB.nextSibling, s), r.length = s);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, r); e !== this._$AB; ) {
      const s = Re(e).nextSibling;
      Re(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cv = e, (r = this._$AP) == null || r.call(this, e));
  }
}
let pe = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, i, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = r, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, r = this, i, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = K(this, e, r, 0), a = !te(e) || e !== this._$AH && e !== q, a && (this._$AH = e);
    else {
      const n = e;
      let c, l;
      for (e = o[0], c = 0; c < o.length - 1; c++) l = K(this, n[i + c], r, c), l === q && (l = this._$AH[c]), a || (a = !te(l) || l !== this._$AH[c]), l === u ? e = u : e !== u && (e += (l ?? "") + o[c + 1]), this._$AH[c] = l;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
class wt extends pe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class kt extends pe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class St extends pe {
  constructor(e, r, i, s, o) {
    super(e, r, i, s, o), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = K(this, e, r, 0) ?? u) === q) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class At {
  constructor(e, r, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    K(this, e);
  }
}
const be = Q.litHtmlPolyfillSupport;
be == null || be(re, ie), (Q.litHtmlVersions ?? (Q.litHtmlVersions = [])).push("3.3.3");
const Mt = (t, e, r) => {
  const i = (r == null ? void 0 : r.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (r == null ? void 0 : r.renderBefore) ?? null;
    i._$litPart$ = s = new ie(e.insertBefore(ee(), o), o, void 0, r ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis;
class W extends V {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const e = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = e.firstChild), e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Mt(r, this.renderRoot, this.renderOptions);
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
    return q;
  }
}
var Xe;
W._$litElement$ = !0, W.finalized = !0, (Xe = L.litElementHydrateSupport) == null || Xe.call(L, { LitElement: W });
const ye = L.litElementPolyfillSupport;
ye == null || ye({ LitElement: W });
(L.litElementVersions ?? (L.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = (t) => (e, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = { attribute: !0, type: String, converter: le, reflect: !1, hasChanged: Se }, Ct = (t = Et, e, r) => {
  const { kind: i, metadata: s } = r;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(r.name, t), i === "accessor") {
    const { name: a } = r;
    return { set(n) {
      const c = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(a, c, t, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(a, void 0, t, n), n;
    } };
  }
  if (i === "setter") {
    const { name: a } = r;
    return function(n) {
      const c = this[a];
      e.call(this, n), this.requestUpdate(a, c, t, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Me(t) {
  return (e, r) => typeof r == "object" ? Ct(t, e, r) : ((i, s, o) => {
    const a = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), a ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(t, e, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(t) {
  return Me({ ...t, state: !0, attribute: !1 });
}
const $e = {
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
}, je = Object.keys($e);
function C(t) {
  if (t)
    return t === "primary" ? "var(--primary-color)" : t === "accent" ? "var(--accent-color)" : $e[t] ? `var(--${t}-color, ${$e[t]})` : t;
}
const O = {
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
  body: {
    icon: "mdi:human",
    color: "indigo",
    graph: "none",
    aggregate: "mean",
    trend: "down_good",
    precision: 1,
    goalType: "atmost"
  },
  cycle: {
    icon: "mdi:calendar-heart",
    color: "pink",
    graph: "none",
    aggregate: "last",
    trend: "none",
    precision: 0
  },
  custom: {
    icon: "mdi:chart-line",
    color: "primary",
    graph: "line",
    aggregate: "mean",
    trend: "neutral"
  }
}, Ie = ["amber", "indigo", "pink", "teal", "purple"], ae = ["teal", "orange", "pink", "cyan", "lime"], Ge = {
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
    body: "Body",
    cycle: "Cycle",
    custom: "Sensor",
    cycle_day: "Day",
    cycle_of: "of",
    phase_menstruation: "Period",
    phase_follicular: "Follicular",
    phase_ovulation: "Ovulation",
    phase_fertile: "Fertile window",
    phase_luteal: "Luteal",
    period_in: "Period in {n} days",
    period_today: "Period expected today",
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
    body: "Körper",
    cycle: "Zyklus",
    custom: "Sensor",
    cycle_day: "Tag",
    cycle_of: "von",
    phase_menstruation: "Periode",
    phase_follicular: "Follikelphase",
    phase_ovulation: "Eisprung",
    phase_fertile: "Fruchtbare Tage",
    phase_luteal: "Lutealphase",
    period_in: "Periode in {n} Tagen",
    period_today: "Periode heute erwartet",
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
function H(t) {
  var r;
  return (((r = t == null ? void 0 : t.locale) == null ? void 0 : r.language) ?? (t == null ? void 0 : t.language) ?? "en").startsWith("de") ? "de" : "en";
}
function x(t, e) {
  return Ge[H(t)][e] ?? Ge.en[e] ?? e;
}
function k(t, e, r) {
  if (!Number.isFinite(e)) return "–";
  const i = H(t) === "de" ? "de-DE" : "en-US";
  return r === void 0 ? new Intl.NumberFormat(i, { maximumFractionDigits: 2 }).format(e) : new Intl.NumberFormat(i, {
    minimumFractionDigits: r,
    maximumFractionDigits: r
  }).format(e);
}
function X(t, e) {
  return e ? /^[%°'"]/.test(e) ? `${t}${e}` : `${t} ${e}` : t;
}
function oe(t, e) {
  if (!Number.isFinite(t)) return "–";
  let r;
  const i = (e ?? "min").toLowerCase();
  i.startsWith("h") ? r = t * 60 : i === "s" || i.startsWith("sec") ? r = t / 60 : r = t;
  const s = Math.round(r * 60), o = Math.floor(s / 3600), a = Math.floor(s % 3600 / 60), n = s % 60;
  return o > 0 ? a ? `${o} h ${a} min` : `${o} h` : a > 0 ? n && a < 10 ? `${a} min ${n} s` : `${a} min` : `${n} s`;
}
function G(t, e) {
  const r = new Date(e);
  if (isNaN(r.getTime())) return "";
  const i = H(t) === "de" ? "de-DE" : "en-US", s = /* @__PURE__ */ new Date(), o = (n, c) => n.getFullYear() === c.getFullYear() && n.getMonth() === c.getMonth() && n.getDate() === c.getDate();
  if (o(r, s))
    return r.toLocaleTimeString(i, { hour: "numeric", minute: "2-digit" });
  const a = new Date(s.getTime() - 864e5);
  return o(r, a) ? x(t, "yesterday") : r.toLocaleDateString(i, { day: "numeric", month: "short" });
}
async function Nt(t, e, r) {
  if (!e.length) return {};
  const i = /* @__PURE__ */ new Date(), s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (r - 1));
  const o = await t.callWS({
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
function Ft(t, e, r) {
  const i = /* @__PURE__ */ new Date();
  i.setHours(0, 0, 0, 0);
  const s = i.getTime() - (e - 1) * 864e5, o = Array.from({ length: e }, () => []);
  for (const a of t) {
    const n = Math.floor((a.t - s) / 864e5);
    n >= 0 && n < e && o[n].push(a.v);
  }
  return o.map((a) => {
    if (!a.length) return NaN;
    switch (r) {
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
async function Dt(t, e, r, i = "day") {
  if (!e.length) return {};
  const s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0), i === "month" ? (s.setDate(1), s.setMonth(s.getMonth() - (r - 1))) : s.setDate(s.getDate() - (r - 1));
  const o = await t.callWS({
    type: "recorder/statistics_during_period",
    start_time: s.toISOString(),
    end_time: (/* @__PURE__ */ new Date()).toISOString(),
    statistic_ids: e,
    period: i,
    types: ["mean", "min", "max", "state", "sum"]
  }), a = (c) => typeof c == "number" && Number.isFinite(c) ? c : null, n = {};
  for (const c of e)
    n[c] = ((o == null ? void 0 : o[c]) ?? []).map((l) => ({
      start: typeof l.start == "number" ? l.start : new Date(l.start).getTime(),
      mean: a(l.mean),
      min: a(l.min),
      max: a(l.max),
      state: a(l.state),
      sum: a(l.sum)
    }));
  return n;
}
function Ve(t, e) {
  return e === "min" ? t.min : e === "max" || e === "sum" ? t.max ?? t.mean : e === "last" ? t.state ?? t.mean : t.mean;
}
function We(t, e, r, i = "day") {
  const s = new Array(e).fill(NaN);
  if (i === "month") {
    const n = /* @__PURE__ */ new Date(), c = n.getFullYear() * 12 + n.getMonth();
    for (const l of t) {
      const d = new Date(l.start), h = d.getFullYear() * 12 + d.getMonth() - (c - (e - 1));
      if (h < 0 || h >= e) continue;
      const g = Ve(l, r);
      g !== null && (s[h] = g);
    }
    return s;
  }
  const o = /* @__PURE__ */ new Date();
  o.setHours(0, 0, 0, 0);
  const a = o.getTime() - (e - 1) * 864e5;
  for (const n of t) {
    const c = Math.floor((n.start - a) / 864e5);
    if (c < 0 || c >= e) continue;
    const l = Ve(n, r);
    l !== null && (s[c] = l);
  }
  return s;
}
function Tt(t, e, r) {
  const i = /* @__PURE__ */ new Date();
  i.setMinutes(0, 0, 0);
  const s = i.getTime() - (e - 1) * 36e5, o = Array.from({ length: e }, () => []);
  for (const a of t) {
    const n = Math.floor((a.t - s) / 36e5);
    n >= 0 && n < e && o[n].push(a.v);
  }
  return o.map((a) => {
    if (!a.length) return NaN;
    switch (r) {
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
function qe(t) {
  const e = [...t];
  let r = NaN;
  for (let s = 0; s < e.length; s++)
    Number.isFinite(e[s]) ? r = e[s] : e[s] = r;
  let i = NaN;
  for (let s = e.length - 1; s >= 0; s--)
    Number.isFinite(e[s]) ? i = e[s] : e[s] = i;
  return e;
}
function _e(t) {
  const e = t.filter(Number.isFinite);
  return e.length < 2 ? NaN : e[e.length - 1] - e[0];
}
const ot = 220, nt = 60, E = 7, he = "color-mix(in srgb, var(--primary-text-color) 14%, transparent)";
function ct(t, e) {
  var s;
  const r = t.yFmt ? Math.max(26, ...e.map((o) => t.yFmt(o).length * 5.6 + 10)) : E, i = (s = t.xMarks) != null && s.some((o) => o.label) ? 15 : E;
  return { padL: r, padB: i };
}
function Pt(t) {
  const e = t.filter(Number.isFinite), r = Math.min(...e), i = Math.max(...e), s = i - r || Math.abs(i) * 0.1 || 1;
  return { lo: r - s * 0.18, hi: i + s * 0.18 };
}
function Ke(t, e = {}) {
  const r = e.w ?? ot, i = e.h ?? nt, s = e.dots ?? !0, o = t.filter((f) => f.values.some(Number.isFinite));
  if (!o.length) return u;
  const { lo: a, hi: n } = Pt(o.flatMap((f) => f.values)), c = Math.max(...o.map((f) => f.values.length)), l = e.yFmt ? [n - (n - a) * 0.08, (a + n) / 2, a + (n - a) * 0.08] : [], { padL: d, padB: h } = ct(e, l), g = (f) => d + f * (r - d - E) / Math.max(c - 1, 1), b = (f) => i - h - (f - a) / (n - a) * (i - h - E), _ = l.map(
    (f) => S`
      <line x1=${d} x2=${r - E} y1=${b(f)} y2=${b(f)}
        stroke=${he} stroke-width="1" stroke-dasharray="2 3"/>
      <text class="axis" x=${d - 5} y=${b(f)} text-anchor="end"
        dominant-baseline="middle">${e.yFmt(f)}</text>`
  ), w = (e.xMarks ?? []).map(
    (f) => S`
      ${f.line ? S`<line x1=${g(f.i)} x2=${g(f.i)} y1=${E} y2=${i - h}
              stroke=${he} stroke-width="1"/>` : u}
      ${f.label ? S`<text class="axis" x=${g(f.i)} y=${i - 3} text-anchor="middle">${f.label}</text>` : u}`
  ), $ = o.map((f) => {
    const v = f.values.map((y, A) => ({ x: g(A), y: b(y), ok: Number.isFinite(y) })).filter((y) => y.ok);
    if (!v.length) return u;
    let m = `M ${v[0].x} ${v[0].y}`;
    for (let y = 1; y < v.length; y++) {
      const A = (v[y - 1].x + v[y].x) / 2;
      m += ` C ${A} ${v[y - 1].y}, ${A} ${v[y].y}, ${v[y].x} ${v[y].y}`;
    }
    return S`
      <path d=${m} fill="none" stroke=${f.color} stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
      ${s ? v.map(
      (y) => S`<circle cx=${y.x} cy=${y.y} r="3.1" fill="var(--hc-dot-fill)"
                stroke=${f.color} stroke-width="2"/>`
    ) : u}
    `;
  });
  return p`<svg class="chart" viewBox="0 0 ${r} ${i}" aria-hidden="true">
    ${_}${w}${$}
  </svg>`;
}
function Ye(t, e, r, i = {}) {
  const s = i.w ?? ot, o = i.h ?? nt;
  if (!t.some((m) => Number.isFinite(m) && m > 0)) return u;
  const a = t.map((m) => Number.isFinite(m) && m > 0 ? m : 0), n = Math.max(...a, r ?? 0) || 1, c = a.length, l = i.yFmt ? [n, n / 2] : [], { padL: d, padB: h } = ct(i, l), g = (s - d - E) / c, b = Math.min(g * 0.55, 14), _ = (m) => m / n * (o - h - E), w = l.map(
    (m) => S`
      <line x1=${d} x2=${s - E} y1=${o - h - _(m)} y2=${o - h - _(m)}
        stroke=${he} stroke-width="1" stroke-dasharray="2 3"/>
      <text class="axis" x=${d - 5} y=${o - h - _(m)} text-anchor="end"
        dominant-baseline="middle">${i.yFmt(m)}</text>`
  ), $ = (i.xMarks ?? []).map((m) => {
    const y = d + m.i * g + g / 2;
    return S`
      ${m.line ? S`<line x1=${y} x2=${y} y1=${E} y2=${o - h}
              stroke=${he} stroke-width="1"/>` : u}
      ${m.label ? S`<text class="axis" x=${y} y=${o - 3} text-anchor="middle">${m.label}</text>` : u}`;
  }), f = a.map((m, y) => {
    const A = Math.max(_(m), m > 0 ? 3 : 1.5), N = d + y * g + (g - b) / 2;
    return S`<rect x=${N} y=${o - h - A} width=${b} height=${A}
      rx=${Math.min(b / 2, 4)} fill=${e} opacity=${m > 0 ? 1 : 0.25}/>`;
  }), v = Number.isFinite(r) ? S`<line x1=${d} x2=${s - E} y1=${o - h - _(r)} y2=${o - h - _(r)}
        stroke=${e} stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>` : u;
  return p`<svg class="chart" viewBox="0 0 ${s} ${o}" aria-hidden="true">
    ${w}${$}${v}${f}
  </svg>`;
}
const Ze = [
  "var(--amber-color, #FFC107)",
  "var(--purple-color, #9C27B0)",
  "var(--pink-color, #E91E63)"
], Rt = "color-mix(in srgb, var(--primary-text-color) 16%, transparent)";
function zt(t, e, r) {
  const i = (a) => Math.abs(Math.sin(a * 127.1) * 43758.5453 % 1), s = (a) => {
    if (!(r != null && r.length))
      return Ze[Math.floor(i(a) * Ze.length)];
    const n = i(a);
    let c = 0;
    for (const l of r)
      if (c += l.share, n <= c) return l.color;
    return r[r.length - 1].color;
  }, o = [];
  for (let a = 0; a < 2; a++) {
    const n = a === 0 ? 74 : 88, c = a === 0 ? 26 : 32;
    for (let l = 0; l < c; l++) {
      const d = l / c, h = d * Math.PI * 2 - Math.PI / 2 + i(l + a * 100) * 0.12, g = n + (i(l * 3 + a * 7) - 0.5) * 6, b = 2.4 + i(l * 7 + a * 13) * 2.4, _ = d < e ? s(l * 11 + a * 29) : Rt;
      o.push(
        S`<circle cx=${100 + Math.cos(h) * g} cy=${100 + Math.sin(h) * g}
          r=${b} fill=${_} opacity="0.75"/>`
      );
    }
  }
  return p`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="62" fill="color-mix(in srgb, ${t} 10%, transparent)" />
    ${o}
  </svg>`;
}
function Ee(t, e, r, i) {
  const s = 2 * Math.PI * t;
  return S`<circle cx="100" cy="100" r=${t} fill="none" stroke=${i}
    stroke-width=${e} stroke-linecap="round"
    stroke-dasharray="${s * Math.max(r, 0.02)} ${s}"
    transform="rotate(-90 100 100)"/>`;
}
function ve(t, e, r = 10) {
  return p`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r=${82} fill="none" stroke=${t} opacity="0.16"
      stroke-width=${r}/>
    ${Ee(82, r, e, t)}
  </svg>`;
}
function Ot(t, e, r) {
  const o = 2 * Math.PI * 78, a = `${o * Math.max(e, 0.02)} ${o}`, n = 78 + 13 * 0.27, c = 2 * Math.PI * n, l = 0.18 + e * 0.5, d = e >= 0.95;
  return p`<svg class="scorering" viewBox="-14 -14 228 228" aria-hidden="true">
    <defs>
      <filter id="hc-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <filter id="hc-blur-heavy" x="-90%" y="-90%" width="280%" height="280%">
        <feGaussianBlur stdDeviation="15" />
      </filter>
    </defs>
    ${d ? S`<circle cx="100" cy="100" r="93" fill="none" stroke=${t}
          stroke-width="2.5" opacity="0.4" filter="url(#hc-glow)" class="glowpulse"/>` : u}
    <circle cx="100" cy="100" r=${78} fill="none" stroke=${t}
      stroke-width=${20} stroke-linecap="round" stroke-dasharray=${a}
      transform="rotate(-90 100 100)" filter="url(#hc-glow)" opacity=${l}
      class=${d ? "glowpulse" : ""}/>
    ${// sub-goals melt into a heavily blurred color wash behind the number
  r != null && r.length ? r.map((h, g) => {
    const b = g / r.length * 2 * Math.PI - Math.PI / 2;
    return S`<circle cx=${100 + Math.cos(b) * 24} cy=${100 + Math.sin(b) * 24}
              r=${16 + h.share * 26} fill=${h.color}
              filter="url(#hc-blur-heavy)" opacity="0.5"/>`;
  }) : u}
    <circle cx="100" cy="100" r=${78} fill="none" stroke-width=${13}
      stroke="color-mix(in srgb, ${t} 13%, transparent)"/>
    <circle cx="100" cy="100" r=${78 + 13 / 2 - 0.6} fill="none" stroke-width="1"
      stroke="color-mix(in srgb, #fff 30%, transparent)"/>
    <circle cx="100" cy="100" r=${78 - 13 / 2 + 0.6} fill="none" stroke-width="1"
      stroke="color-mix(in srgb, #fff 12%, transparent)"/>
    ${Ee(78, 13, e, t)}
    <circle cx="100" cy="100" r=${n} fill="none" stroke="rgba(255, 255, 255, 0.55)"
      stroke-width="1.6" stroke-linecap="round"
      stroke-dasharray="${c * Math.max(e, 0.02)} ${c}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}
function Lt(t, e, r) {
  const i = [];
  for (let a = 0; a <= 144; a++) {
    const n = a / 144 * 2 * Math.PI, c = 72 + 7 * Math.cos(12 * n);
    i.push(
      `${a ? "L" : "M"} ${(100 + Math.cos(n) * c).toFixed(1)} ${(100 + Math.sin(n) * c).toFixed(1)}`
    );
  }
  const o = 92;
  return p`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <path d="${i.join(" ")} Z" fill="color-mix(in srgb, ${t} 22%, transparent)"/>
    <circle cx="100" cy="100" r=${o} fill="none" stroke=${e} opacity="0.18"
      stroke-width="5"/>
    ${Ee(o, 5, r, e)}
  </svg>`;
}
function Ht(t, e, r) {
  const o = 2 * Math.PI * 80, a = r.map((d) => {
    const h = Math.max(0, d.to - (d.from - 1)), g = o * h / e, b = o * (d.from - 1) / e;
    return S`<circle cx="100" cy="100" r=${80} fill="none" stroke=${d.color}
      stroke-width=${15} stroke-linecap="butt"
      stroke-dasharray="${Math.max(g - 1.5, 0.1)} ${o}" stroke-dashoffset=${-b}
      transform="rotate(-90 100 100)"/>`;
  }), n = (t - 0.5) / e * 2 * Math.PI - Math.PI / 2, c = 100 + Math.cos(n) * 80, l = 100 + Math.sin(n) * 80;
  return p`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r=${80} fill="none"
      stroke="color-mix(in srgb, var(--primary-text-color) 8%, transparent)"
      stroke-width=${15}/>
    ${a}
    <circle cx=${c} cy=${l} r="10" fill="var(--hc-card-bg)"
      stroke="var(--primary-text-color)" stroke-width="2.5"/>
    <circle cx=${c} cy=${l} r="3.5" fill="var(--primary-text-color)"/>
  </svg>`;
}
function Bt(t, e, r, i, s) {
  return t === "material" ? Lt(e, r, i) : t === "bubble" ? ve(r, i, 15) : t === "mirror" ? ve("#fff", i, 7) : t === "glass" ? Ot(r, i, s) : t === "default" ? ve(r, i, 10) : zt(r, i, s);
}
var Ut = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, se = (t, e, r, i) => {
  for (var s = i > 1 ? void 0 : i ? jt(e, r) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (s = (i ? a(e, r, s) : a(s)) || s);
  return i && s && Ut(e, r, s), s;
};
const It = Object.keys(O), Gt = ["body_composition", "nutrition"], xe = {
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
    breakdown: "Sub-scores (category colors)",
    expanded: "Expanded tile (details inline)",
    sec_body: "Body figure",
    gender: "Build",
    gender_female: "Female",
    gender_male: "Male",
    sleep_entity: "Sleep score sensor (eye shadows)",
    temperature_entity: "Temperature sensor (fever glow)",
    fever_from: "Fever from (°C)",
    anchors: "Value labels on the figure",
    add_anchor: "Add label",
    anchor_x: "X %",
    anchor_y: "Y %",
    figure_style: "Figure style",
    tab_general: "General",
    figure_offset_x: "Horizontal offset %",
    fs_flat: "Flat silhouette",
    fs_glass: "Liquid Glass",
    fs_mannequin: "Mannequin",
    fs_pixar: "Soft 3D",
    body_crop: "Crop",
    bc_full: "Full body",
    bc_upper: "Upper body",
    figure_zoom: "Zoom",
    figure_offset_y: "Vertical offset %",
    tired_below: "Eye shadows below score",
    dot: "Dot position",
    dot_left: "left",
    dot_right: "right",
    dot_top: "top",
    dot_bottom: "bottom",
    tired_x: "Eye shadows X %",
    tired_y: "Eye shadows Y %",
    fever_x: "Fever X %",
    fever_y: "Fever Y %",
    preview_effects: "Preview fever + eye shadows",
    fade_figure: "Fade figure bottom",
    fade_height: "Fade height (px)",
    label_opacity: "Label opacity",
    sec_cycle: "Cycle",
    cycle_length: "Cycle length (days)",
    period_length: "Period length (days)",
    ovulation_day: "Ovulation day",
    phase_entity: "Phase sensor (optional)",
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
    breakdown: "Sub-Scores (Kategoriefarben)",
    expanded: "Erweiterte Kachel (Details eingeblendet)",
    sec_body: "Körperfigur",
    gender: "Körperbau",
    gender_female: "Weiblich",
    gender_male: "Männlich",
    sleep_entity: "Schlafwert-Sensor (Augenringe)",
    temperature_entity: "Temperatur-Sensor (Fieber-Glow)",
    fever_from: "Fieber ab (°C)",
    anchors: "Wert-Labels auf der Figur",
    add_anchor: "Label hinzufügen",
    anchor_x: "X %",
    anchor_y: "Y %",
    figure_style: "Figur-Stil",
    tab_general: "Allgemein",
    figure_offset_x: "Horizontaler Versatz %",
    fs_flat: "Flache Silhouette",
    fs_glass: "Liquid Glass",
    fs_mannequin: "Schaufensterpuppe",
    fs_pixar: "Weiches 3D",
    body_crop: "Ausschnitt",
    bc_full: "Ganzer Körper",
    bc_upper: "Oberkörper",
    figure_zoom: "Zoom",
    figure_offset_y: "Vertikaler Versatz %",
    tired_below: "Augenringe unter Score",
    dot: "Punkt-Position",
    dot_left: "links",
    dot_right: "rechts",
    dot_top: "oben",
    dot_bottom: "unten",
    tired_x: "Augenringe X %",
    tired_y: "Augenringe Y %",
    fever_x: "Fieber X %",
    fever_y: "Fieber Y %",
    preview_effects: "Fieber + Augenringe testen",
    fade_figure: "Figur unten ausblenden",
    fade_height: "Ausblendhöhe (px)",
    label_opacity: "Label-Deckkraft",
    sec_cycle: "Zyklus",
    cycle_length: "Zykluslänge (Tage)",
    period_length: "Periodenlänge (Tage)",
    ovulation_day: "Eisprung-Tag",
    phase_entity: "Phasen-Sensor (optional)",
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
let U = class extends W {
  constructor() {
    super(...arguments), this._expanded = -1, this._tab = "general";
  }
  setConfig(t) {
    this._config = t;
  }
  _label(t) {
    return (xe[H(this.hass)] ?? xe.en)[t] ?? xe.en[t] ?? t;
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
                  (t) => ({ value: t, label: this._label(`style_${t}`) })
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
  /** Tabs shown for a metric — AlertTicker-style hub navigation. */
  _metricTabs(t) {
    const e = [
      { id: "general", icon: "mdi:tune-variant", label: this._label("tab_general") },
      { id: "display", icon: "mdi:palette-outline", label: this._label("sec_display") },
      { id: "goal", icon: "mdi:flag-checkered", label: this._label("sec_goal") },
      { id: "behavior", icon: "mdi:gesture-tap", label: this._label("sec_behavior") }
    ];
    return t === "body" && e.push({ id: "body", icon: "mdi:human", label: this._label("sec_body") }), t === "sleep" && e.push({ id: "sleep", icon: "mdi:sleep", label: this._label("sec_phases") }), t === "cycle" && e.push({ id: "cycle", icon: "mdi:calendar-heart", label: this._label("sec_cycle") }), e;
  }
  _metricSchema(t, e) {
    const r = t.type ?? "custom", i = (o, a) => o.map((n) => ({ value: n, label: this._label(`${a}_${n}`) })), s = !t.entities || t.entities.every((o) => typeof o == "string");
    switch (e) {
      case "display":
        return [
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
                    options: je.map((o) => ({ value: o, label: o }))
                  }
                }
              },
              { name: "unit", selector: { text: {} } },
              {
                name: "graph",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: i(["line", "bar", "progress", "none"], "graph")
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
          { name: "label", selector: { text: {} } },
          { name: "expanded", selector: { boolean: {} } }
        ];
      case "goal":
        return [
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
                    options: i(["atleast", "atmost"], "gt")
                  }
                }
              },
              ...r === "score" ? [{ name: "max", selector: { number: { min: 1, mode: "box" } } }] : []
            ]
          }
        ];
      case "behavior":
        return [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "tap_action",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: i(["popup", "more-info", "link", "none"], "ta")
                  }
                }
              },
              ...t.tap_action === "link" ? [{ name: "link", selector: { text: {} } }] : [],
              {
                name: "aggregate",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: i(["mean", "min", "max", "sum", "last"], "agg")
                  }
                }
              },
              {
                name: "trend",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: i(["up_good", "down_good", "neutral", "none"], "trend")
                  }
                }
              }
            ]
          },
          { name: "secondary", selector: { entity: { multiple: !0 } } },
          { name: "score_entity", selector: { entity: {} } }
        ];
      case "body":
        return [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "gender",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: i(["female", "male"], "gender")
                  }
                }
              },
              {
                name: "figure_style",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: i(["flat", "glass", "mannequin", "pixar"], "fs")
                  }
                }
              },
              {
                name: "body_crop",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: i(["full", "upper"], "bc")
                  }
                }
              },
              {
                name: "figure_zoom",
                selector: { number: { min: 0.5, max: 3, step: 0.1, mode: "slider" } }
              },
              {
                name: "figure_offset_x",
                selector: { number: { min: -40, max: 40, step: 1, mode: "slider" } }
              },
              {
                name: "figure_offset_y",
                selector: { number: { min: -40, max: 40, step: 1, mode: "slider" } }
              }
            ]
          },
          {
            type: "grid",
            name: "",
            schema: [
              { name: "sleep_entity", selector: { entity: {} } },
              { name: "temperature_entity", selector: { entity: {} } },
              {
                name: "tired_below",
                selector: { number: { min: 0, max: 100, mode: "box" } }
              },
              {
                name: "fever_from",
                selector: { number: { mode: "box", step: "any" } }
              },
              { name: "tired_x", selector: { number: { min: 0, max: 100, mode: "box" } } },
              { name: "tired_y", selector: { number: { min: 0, max: 100, mode: "box" } } },
              { name: "fever_x", selector: { number: { min: 0, max: 100, mode: "box" } } },
              { name: "fever_y", selector: { number: { min: 0, max: 100, mode: "box" } } }
            ]
          },
          {
            name: "label_opacity",
            selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
          },
          { name: "preview_effects", selector: { boolean: {} } },
          { name: "fade_figure", selector: { boolean: {} } },
          {
            name: "fade_height",
            selector: { number: { min: 0, max: 400, step: 5, mode: "slider" } }
          }
        ];
      case "cycle":
        return [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "cycle_length",
                selector: { number: { min: 15, max: 60, mode: "box" } }
              },
              {
                name: "period_length",
                selector: { number: { min: 1, max: 15, mode: "box" } }
              },
              {
                name: "ovulation_day",
                selector: { number: { min: 1, max: 45, mode: "box" } }
              }
            ]
          },
          { name: "phase_entity", selector: { entity: {} } }
        ];
      case "sleep":
        return [
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
        ];
      default:
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
                    options: It.map((o) => ({
                      value: o,
                      label: x(this.hass, o)
                    }))
                  }
                }
              },
              { name: "name", selector: { text: {} } }
            ]
          },
          { name: "entity", selector: { entity: {} } },
          ...r === "blood_pressure" ? [{ name: "entity2", selector: { entity: {} } }] : [],
          ...Gt.includes(r) && s ? [{ name: "entities", selector: { entity: { multiple: !0 } } }] : [],
          ...r === "score" && (!t.breakdown || t.breakdown.every((o) => typeof o == "string")) ? [{ name: "breakdown", selector: { entity: { multiple: !0 } } }] : []
        ];
    }
  }
  render() {
    return !this.hass || !this._config ? u : p`
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
        .computeLabel=${(t) => this._label(t.name)}
        @value-changed=${this._topChanged}
      ></ha-form>

      <div class="metrics">
        ${this._config.metrics.map((t, e) => this._renderMetricEditor(t, e))}
      </div>

      <button class="add" @click=${this._addMetric}>
        <ha-icon icon="mdi:plus"></ha-icon>
        ${this._label("add_metric")}
      </button>
    `;
  }
  _renderMetricEditor(t, e) {
    const r = t.type ?? "custom", i = O[r] ?? O.custom, s = this._expanded === e, o = this._config.metrics.length;
    return p`
      <div class="metric ${s ? "open" : ""}">
        <div
          class="metric-head"
          @click=${() => {
      this._expanded = s ? -1 : e, this._tab = "general";
    }}
        >
          <span
            class="chip"
            style="--c:${C(t.color) ?? C(i.color)}"
          >
            <ha-icon .icon=${t.icon ?? i.icon}></ha-icon>
          </span>
          <span class="metric-title">
            ${t.name ?? x(this.hass, r)}
            <span class="metric-entity">${t.entity ?? ""}</span>
          </span>
          <button
            class="icon-btn"
            .disabled=${e === 0}
            title="↑"
            @click=${(a) => this._move(a, e, -1)}
          >
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </button>
          <button
            class="icon-btn"
            .disabled=${e === o - 1}
            title="↓"
            @click=${(a) => this._move(a, e, 1)}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <button class="icon-btn danger" @click=${(a) => this._remove(a, e)}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
          <ha-icon
            class="expand"
            icon=${s ? "mdi:chevron-up" : "mdi:chevron-down"}
          ></ha-icon>
        </div>
        ${s ? this._renderMetricBody(t, e, r) : u}
      </div>
    `;
  }
  _renderMetricBody(t, e, r) {
    var o, a, n, c;
    const i = this._metricTabs(r), s = i.some((l) => l.id === this._tab) ? this._tab : "general";
    return p`<div class="metric-body">
      <div class="tabs">
        ${i.map(
      (l) => p`<button
            class="tab ${s === l.id ? "active" : ""}"
            @click=${() => this._tab = l.id}
          >
            <ha-icon .icon=${l.icon}></ha-icon>
            <span>${l.label}</span>
          </button>`
    )}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${{
      ...t,
      goal: typeof t.goal == "number" ? t.goal : void 0,
      goal_entity: typeof t.goal == "string" ? t.goal : void 0,
      start: typeof t.start == "number" ? t.start : void 0,
      start_entity: typeof t.start == "string" ? t.start : void 0,
      phases_deep: (o = t.phases) == null ? void 0 : o.deep,
      phases_light: (a = t.phases) == null ? void 0 : a.light,
      phases_rem: (n = t.phases) == null ? void 0 : n.rem,
      phases_awake: (c = t.phases) == null ? void 0 : c.awake
    }}
        .schema=${this._metricSchema(t, s)}
        .computeLabel=${(l) => this._label(l.name)}
        @value-changed=${(l) => this._metricChanged(l, e)}
      ></ha-form>
      ${s === "body" ? this._renderAnchorEditor(t, e) : u}
    </div>`;
  }
  _anchorSchema() {
    return [
      { name: "entity", selector: { entity: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "name", selector: { text: {} } },
          {
            name: "color",
            selector: {
              select: {
                mode: "dropdown",
                custom_value: !0,
                options: je.map((t) => ({ value: t, label: t }))
              }
            }
          },
          { name: "anchor_x", selector: { number: { min: 0, max: 100, mode: "box" } } },
          { name: "anchor_y", selector: { number: { min: 0, max: 100, mode: "box" } } },
          {
            name: "dot",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "left", label: "← " + this._label("dot_left") },
                  { value: "right", label: "→ " + this._label("dot_right") },
                  { value: "top", label: "↑ " + this._label("dot_top") },
                  { value: "bottom", label: "↓ " + this._label("dot_bottom") },
                  { value: "top-left", label: "↖" },
                  { value: "top-right", label: "↗" },
                  { value: "bottom-left", label: "↙" },
                  { value: "bottom-right", label: "↘" }
                ]
              }
            }
          }
        ]
      },
      { name: "entity2", selector: { entity: {} } }
    ];
  }
  _renderAnchorEditor(t, e) {
    const r = t.anchors ?? [];
    return p`
      <div class="anchor-editor">
        <div class="anchor-editor-title">${this._label("anchors")}</div>
        ${r.map(
      (i, s) => p`
            <div class="anchor-row">
              <ha-form
                .hass=${this.hass}
                .data=${{ ...i, anchor_x: i.x, anchor_y: i.y }}
                .schema=${this._anchorSchema()}
                .computeLabel=${(o) => this._label(o.name)}
                @value-changed=${(o) => this._anchorChanged(o, e, s)}
              ></ha-form>
              <button
                class="icon-btn danger"
                title="✕"
                @click=${() => this._removeAnchor(e, s)}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
          `
    )}
        <button class="add small" @click=${() => this._addAnchor(e)}>
          <ha-icon icon="mdi:plus"></ha-icon>
          ${this._label("add_anchor")}
        </button>
      </div>
    `;
  }
  _anchorChanged(t, e, r) {
    if (t.stopPropagation(), !this._config) return;
    const i = { ...t.detail.value }, s = {};
    i.entity && (s.entity = i.entity), i.entity2 && (s.entity2 = i.entity2), i.name && (s.name = i.name), i.color && (s.color = i.color), i.anchor_x !== void 0 && i.anchor_x !== null && (s.x = i.anchor_x), i.anchor_y !== void 0 && i.anchor_y !== null && (s.y = i.anchor_y), i.dot && (s.dot = i.dot);
    const o = [...this._config.metrics], a = [...o[e].anchors ?? []];
    a[r] = s, o[e] = { ...o[e], anchors: a }, this._emit({ ...this._config, metrics: o });
  }
  _addAnchor(t) {
    if (!this._config) return;
    const e = [...this._config.metrics], r = [...e[t].anchors ?? [], { entity: "", x: 50, y: 40 }];
    e[t] = { ...e[t], anchors: r }, this._emit({ ...this._config, metrics: e });
  }
  _removeAnchor(t, e) {
    if (!this._config) return;
    const r = [...this._config.metrics], i = (r[t].anchors ?? []).filter((s, o) => o !== e);
    r[t] = { ...r[t], anchors: i }, this._emit({ ...this._config, metrics: r });
  }
  _emit(t) {
    this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _clean(t) {
    const e = {};
    for (const [r, i] of Object.entries(t))
      i === "" || i === null || i === void 0 || Array.isArray(i) && !i.length || (e[r] = i);
    return e;
  }
  _topChanged(t) {
    if (t.stopPropagation(), !this._config) return;
    const e = t.detail.value;
    this._emit(this._clean({ ...this._config, ...e, metrics: this._config.metrics }));
  }
  _metricChanged(t, e) {
    if (t.stopPropagation(), !this._config) return;
    const r = { ...t.detail.value }, i = {};
    for (const o of ["deep", "light", "rem", "awake"]) {
      const a = r[`phases_${o}`];
      delete r[`phases_${o}`], typeof a == "string" && a && (i[o] = a);
    }
    Object.keys(i).length ? r.phases = i : delete r.phases;
    for (const o of ["goal", "start"]) {
      const a = r[`${o}_entity`];
      delete r[`${o}_entity`], typeof a == "string" && a && (r[o] = a);
    }
    const s = [...this._config.metrics];
    s[e] = this._clean(r), this._emit({ ...this._config, metrics: s });
  }
  _addMetric() {
    if (!this._config) return;
    const t = [...this._config.metrics, { type: "weight" }];
    this._expanded = t.length - 1, this._emit({ ...this._config, metrics: t });
  }
  _remove(t, e) {
    if (t.stopPropagation(), !this._config) return;
    const r = this._config.metrics.filter((i, s) => s !== e);
    this._expanded === e && (this._expanded = -1), this._emit({ ...this._config, metrics: r });
  }
  _move(t, e, r) {
    if (t.stopPropagation(), !this._config) return;
    const i = [...this._config.metrics], s = e + r;
    s < 0 || s >= i.length || ([i[e], i[s]] = [i[s], i[e]], this._expanded === e && (this._expanded = s), this._emit({ ...this._config, metrics: i }));
  }
};
U.styles = Qe`
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
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--divider-color);
    }
    .tab {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 6px 11px;
      border: none;
      border-radius: 999px;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 12px;
      font-weight: 500;
      font-family: inherit;
    }
    .tab ha-icon {
      --mdc-icon-size: 15px;
    }
    .tab:hover {
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .tab.active {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      color: var(--primary-color);
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
    .add.small {
      margin-top: 8px;
      padding: 6px 12px;
      font-size: 13px;
    }
    .anchor-editor {
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .anchor-editor-title {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 8px;
      color: var(--primary-text-color);
    }
    .anchor-row {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      padding: 8px;
      margin-bottom: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
    }
    .anchor-row ha-form {
      flex: 1;
      min-width: 0;
    }
  `;
se([
  Me({ attribute: !1 })
], U.prototype, "hass", 2);
se([
  F()
], U.prototype, "_config", 2);
se([
  F()
], U.prototype, "_expanded", 2);
se([
  F()
], U.prototype, "_tab", 2);
U = se([
  at("health-card-editor")
], U);
var Vt = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, P = (t, e, r, i) => {
  for (var s = i > 1 ? void 0 : i ? Wt(e, r) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (s = (i ? a(e, r, s) : a(s)) || s);
  return i && s && Vt(e, r, s), s;
};
const qt = "0.13.0", Kt = 5 * 60 * 1e3, Yt = 15 * 60 * 1e3, Zt = ["default", "withings", "glass", "material", "bubble", "mirror"], ne = [
  { key: "day", kind: "hour", count: 24 },
  { key: "week", kind: "day", count: 7 },
  { key: "month", kind: "day", count: 30 },
  { key: "quarter", kind: "day", count: 90 },
  { key: "year", kind: "day", count: 365 },
  { key: "max", kind: "month", count: 60 }
];
let M = class extends W {
  constructor() {
    super(...arguments), this._history = {}, this._popup = null, this._popupRange = null, this._tileRanges = {}, this._statsCache = {}, this._statsCacheTime = {}, this._statsFetching = /* @__PURE__ */ new Set(), this._onKeydown = (t) => {
      t.key === "Escape" && this._popup !== null && (this._popup = null);
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
  static getStubConfig(t) {
    const e = (o) => {
      var a;
      return (a = Object.values(t.states).find(
        (n) => n.entity_id.startsWith("sensor.") && n.attributes.device_class === o
      )) == null ? void 0 : a.entity_id;
    }, r = [], i = e("weight");
    i && r.push({ type: "weight", entity: i });
    const s = e("temperature");
    return s && r.push({ type: "temperature", entity: s }), r.length || r.push({ type: "weight", entity: "" }), { title: "Gesundheit", metrics: r };
  }
  setConfig(t) {
    if (!t || !Array.isArray(t.metrics) || !t.metrics.length)
      throw new Error("Please define at least one metric (metrics: [...])");
    this._config = t;
  }
  getCardSize() {
    var e, r;
    return 1 + Math.ceil(
      (((e = this._config) == null ? void 0 : e.metrics.length) ?? 1) / (((r = this._config) == null ? void 0 : r.columns) ?? 1)
    ) * 2;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  updated(t) {
    var e;
    super.updated(t), (t.has("hass") || t.has("_config")) && this._maybeFetch(), this._syncStats(), (t.has("_popup") || t.has("_popupRange") || t.has("_tileRanges") || t.has("_statsCache")) && ((e = this.renderRoot) == null || e.querySelectorAll(".chart-scroll").forEach((r) => r.scrollLeft = r.scrollWidth));
  }
  _activeRange() {
    return ne.find((t) => t.key === this._popupRange) ?? null;
  }
  /** Long-term statistics for every active range (popup + expanded tiles). */
  _syncStats() {
    if (!this.hass || !this._config) return;
    const t = [];
    if (this._popup !== null) {
      const e = this._activeRange();
      e && t.push(e);
    }
    this._config.metrics.forEach((e, r) => {
      if (!e.expanded) return;
      const i = ne.find((s) => s.key === this._tileRanges[r]);
      i && t.push(i);
    });
    for (const e of t) {
      const r = e.kind === "month" ? "month" : e.kind === "day" && e.count > 10 ? "day" : null;
      r && this._ensureStats(r, e.count);
    }
  }
  _ensureStats(t, e) {
    const r = `${t}|${e}`;
    if (this._statsCache[r] && Date.now() - (this._statsCacheTime[r] ?? 0) < 18e5 || this._statsFetching.has(r)) return;
    const s = this._watchedEntities();
    s.length && (this._statsFetching.add(r), Dt(this.hass, s, e, t).then((o) => {
      this._statsCacheTime[r] = Date.now(), this._statsCache = { ...this._statsCache, [r]: o };
    }).catch((o) => console.warn("health-card: statistics fetch failed", o)).finally(() => {
      this._statsFetching.delete(r);
    }));
  }
  /** Buckets for an entity: hourly/daily from history, long ranges from LTS. */
  _bucketsFor(t, e, r, i) {
    var s, o;
    if (e === "hour")
      return Tt(this._history[t] ?? [], r, i);
    if (e === "month") {
      const a = (s = this._statsCache[`month|${r}`]) == null ? void 0 : s[t];
      return a != null && a.length ? We(a, r, i, "month") : new Array(r).fill(NaN);
    }
    if (r > 10) {
      const a = (o = this._statsCache[`day|${r}`]) == null ? void 0 : o[t];
      if (a != null && a.length) return We(a, r, i, "day");
    }
    return Ft(this._history[t] ?? [], r, i);
  }
  _watchedEntities() {
    var e;
    const t = /* @__PURE__ */ new Set();
    for (const r of ((e = this._config) == null ? void 0 : e.metrics) ?? []) {
      for (const i of this._series(r)) i.entity && t.add(i.entity);
      for (const i of r.secondary ?? []) t.add(i);
      for (const i of Object.values(r.phases ?? {})) i && t.add(i);
      r.score_entity && t.add(r.score_entity), r.sleep_entity && t.add(r.sleep_entity), r.temperature_entity && t.add(r.temperature_entity);
      for (const i of r.anchors ?? [])
        t.add(i.entity), i.entity2 && t.add(i.entity2);
      for (const i of r.breakdown ?? []) t.add(typeof i == "string" ? i : i.entity);
    }
    return [...t].filter((r) => {
      var i;
      return (i = this.hass) == null ? void 0 : i.states[r];
    });
  }
  /** Goal can be a plain number, a numeric string or an entity id. */
  _resolveGoal(t) {
    if (typeof t == "number") return t;
    if (typeof t != "string" || !t) return NaN;
    const e = this.hass.states[t];
    return parseFloat(e ? e.state : t);
  }
  _handleTap(t, e, r) {
    const i = t.tap_action ?? "popup";
    if (i !== "none") {
      if (i === "link") {
        if (!t.link) return;
        if (/^https?:\/\//.test(t.link)) {
          window.open(t.link, "_blank", "noopener");
          return;
        }
        history.pushState(null, "", t.link), this.dispatchEvent(
          new Event("location-changed", { bubbles: !0, composed: !0 })
        );
        return;
      }
      if (i === "more-info") {
        this._moreInfo(r);
        return;
      }
      this._popupRange = t.type === "heart_rate" ? "day" : t.type === "sleep" && t.score_entity ? "month" : null, this._popup = e;
    }
  }
  _maybeFetch() {
    if (!this.hass || !this._config || this._fetching) return;
    const t = this._watchedEntities();
    if (!t.length) return;
    const e = Math.max(
      ...this._config.metrics.map((a) => a.days ?? this._config.days ?? 7)
    ), r = `${e}|${t.join(",")}`, i = t.map((a) => {
      var n;
      return ((n = this.hass.states[a]) == null ? void 0 : n.last_updated) ?? "";
    }).join("|"), s = Date.now();
    (r !== this._cfgSig || s - this._lastFetch > Yt || i !== this._stateSig && s - this._lastFetch > Kt) && (this._fetching = !0, this._cfgSig = r, this._stateSig = i, Nt(this.hass, t, e).then((a) => {
      this._history = a, this._lastFetch = Date.now();
    }).catch((a) => console.warn("health-card: history fetch failed", a)).finally(() => {
      this._fetching = !1;
    }));
  }
  _series(t) {
    var r;
    if ((r = t.entities) != null && r.length)
      return t.entities.map((i) => typeof i == "string" ? { entity: i } : i);
    const e = [];
    return t.entity && e.push({ entity: t.entity }), t.entity2 && e.push({ entity: t.entity2 }), e;
  }
  _numeric(t, e) {
    if (!t) return NaN;
    const r = e ? t.attributes[e] : t.state;
    return typeof r == "number" ? r : parseFloat(r);
  }
  _moreInfo(t) {
    t && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _cardStyle() {
    var e;
    const t = ((e = this._config) == null ? void 0 : e.card_style) ?? "withings";
    return Zt.includes(t) ? t : "withings";
  }
  render() {
    if (!this.hass || !this._config) return u;
    const t = this._config, r = [
      "cardroot",
      `s-${this._cardStyle()}`,
      t.tiles === !1 ? "flat" : "tiles",
      t.flush ? "flush" : ""
    ].join(" "), i = p`
      ${t.title ? p`<div class="header">
            <div class="title">${t.title}</div>
            ${t.subtitle ? p`<div class="subtitle">${t.subtitle}</div>` : u}
          </div>` : u}
      <div
        class="metrics ${t.layout === "carousel" ? "carousel" : ""}"
        style="--hc-columns:${t.columns ?? 1}"
      >
        ${t.metrics.map((s, o) => this._renderMetric(s, o))}
      </div>
    `;
    return p`
      ${t.background === !1 ? p`<div class="${r} nobg">${i}</div>` : p`<ha-card class=${r}>${i}</ha-card>`}
      ${this._renderPopup()}
    `;
  }
  /** Builds the shared render context for a metric (used by tile and popup). */
  _ctx(t, e) {
    var m, y, A;
    const r = t.type && O[t.type] ? t.type : "custom", i = O[r], s = C(t.color) ?? C(i.color), o = t.name ?? x(this.hass, r), a = t.icon ?? i.icon, n = Object.values(t.phases ?? {}).filter(Boolean);
    let c = this._series(t);
    !c.length && r === "sleep" && n.length && (c = [{ entity: n[0] }]);
    const l = (m = c[0]) != null && m.entity ? this.hass.states[c[0].entity] : void 0, d = (e == null ? void 0 : e.kind) ?? "day", h = Math.max(1, (e == null ? void 0 : e.count) ?? t.days ?? ((y = this._config) == null ? void 0 : y.days) ?? 7), g = t.graph ?? i.graph, b = t.aggregate ?? i.aggregate, _ = t.trend ?? i.trend, w = t.precision ?? i.precision, $ = t.unit ?? ((A = c[0]) == null ? void 0 : A.unit) ?? (l == null ? void 0 : l.attributes.unit_of_measurement) ?? i.unit ?? "", f = c.map((N, j) => {
      const Y = this._bucketsFor(N.entity, d, h, b);
      return {
        ...N,
        colorResolved: C(N.color) ?? (j === 0 ? s : C(ae[(j - 1) % ae.length])),
        buckets: Y,
        filled: qe(Y)
      };
    });
    let v;
    if (r === "sleep" && !t.entity && t.phases && f.length) {
      const N = ["deep", "light", "rem"].map((j) => t.phases[j]).filter(Boolean);
      if (N.length) {
        const j = N.map(
          (I) => this._bucketsFor(I, d, h, b)
        ), Y = Array.from({ length: h }, (I, ue) => {
          const Ne = j.map((me) => me[ue]).filter(Number.isFinite);
          return Ne.length ? Ne.reduce((me, lt) => me + lt, 0) : NaN;
        });
        f[0] = { ...f[0], buckets: Y, filled: qe(Y) };
        const Ce = N.map((I) => this._numeric(this.hass.states[I])).filter(Number.isFinite);
        Ce.length && (v = Ce.reduce((I, ue) => I + ue, 0));
      }
    }
    return {
      m: t,
      type: r,
      preset: i,
      accent: s,
      name: o,
      icon: a,
      series: c,
      primaryState: l,
      days: h,
      kind: d,
      graph: g,
      aggregate: b,
      trendMode: _,
      precision: w,
      unit: $,
      data: f,
      valueOverride: v,
      goalType: t.goal_type ?? i.goalType ?? "atleast",
      multi: !!t.entities && c.length > 1
    };
  }
  _renderMetric(t, e) {
    var n, c;
    const r = this._ctx(t);
    if (!r.series.length || !r.primaryState)
      return p`
        <div class="metric" style="--hc-accent:${r.accent}">
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${r.icon}></ha-icon></div>
            <div class="name">${r.name}</div>
          </div>
          <div class="missing">
            ${(n = r.series[0]) != null && n.entity ? p`${x(this.hass, "entity_missing")}: ${r.series[0].entity}` : x(this.hass, "no_data")}
          </div>
        </div>
      `;
    if (r.type === "score") return this._renderScore(r, e);
    if (r.type === "body") return this._renderBody(r, e);
    if (r.type === "cycle") return this._renderCycle(r, e);
    if (t.expanded) {
      const l = ne.find((g) => g.key === this._tileRanges[e]) ?? null, d = l ? this._ctx(t, l) : r, h = this._tileRanges[e] ?? (d.days === 7 && d.kind === "day" ? "week" : "");
      return p`
        <div
          class="metric expanded ${(t.tap_action ?? "popup") === "none" ? "noclick" : ""}"
          style="--hc-accent:${r.accent}"
          @click=${() => this._handleTap(t, e, r.series[0].entity)}
        >
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${r.icon}></ha-icon></div>
            <div class="name">${r.name}</div>
            ${this._renderScoreBadge(t)}
            <div class="time">
              ${G(this.hass, r.primaryState.last_updated)}
            </div>
          </div>
          <div class="exp-value">
            ${this._renderValue(
        t,
        d.type,
        d.data,
        d.primaryState,
        d.unit,
        d.precision,
        d.preset.duration,
        d.valueOverride
      )}
            ${this._renderStatus(
        t,
        d.data[0],
        d.primaryState,
        d.unit,
        d.precision,
        d.trendMode,
        d.goalType,
        d.valueOverride
      )}
          </div>
          ${this._renderDetails(t, d, h, (g) => {
        this._tileRanges = { ...this._tileRanges, [e]: g };
      })}
        </div>
      `;
    }
    const i = !r.multi || !!t.label, s = r.multi && r.graph !== "progress", o = !r.multi, a = r.multi && r.graph === "progress";
    return p`
      <div
        class="metric ${(t.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${r.accent}"
        @click=${() => this._handleTap(t, e, r.series[0].entity)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${r.icon}></ha-icon></div>
          <div class="name">${r.name}</div>
          ${this._renderScoreBadge(t)}
          <div class="time">
            ${G(this.hass, r.primaryState.last_updated)}
          </div>
        </div>
        <div class="body ${a ? "stack" : ""}">
          ${i || s || o || (c = t.secondary) != null && c.length ? p`<div class="info">
                ${i ? this._renderValue(
      t,
      r.type,
      r.data,
      r.primaryState,
      r.unit,
      r.precision,
      r.preset.duration,
      r.valueOverride
    ) : u}
                ${s ? this._renderSeriesChips(r.data, r.precision, r.trendMode) : u}
                ${this._renderSecondary(t)}
                ${o ? this._renderStatus(
      t,
      r.data[0],
      r.primaryState,
      r.unit,
      r.precision,
      r.trendMode,
      r.goalType,
      r.valueOverride
    ) : u}
              </div>` : u}
          <div class="chartcell">
            ${this._renderChart(t, r.graph, r.data, r.unit, r.precision)}
          </div>
        </div>
        ${r.type === "sleep" && t.phases ? this._renderSleepPhases(t) : u}
      </div>
    `;
  }
  /** Resolved breakdown categories for a score metric (sub-goals). */
  _breakdown(t) {
    return (t.breakdown ?? []).map((e, r) => {
      const i = typeof e == "string" ? { entity: e } : e, s = this.hass.states[i.entity];
      return {
        ...i,
        state: s,
        value: this._numeric(s),
        name: i.name ?? (s == null ? void 0 : s.attributes.friendly_name) ?? i.entity,
        colorResolved: C(i.color) ?? C(Ie[r % Ie.length])
      };
    }).filter((e) => e.state);
  }
  _renderScore(t, e) {
    const r = t.m, i = t.primaryState, s = this._numeric(i, r.attribute), o = r.max ?? 100, a = this._breakdown(r), n = a.filter((d) => Number.isFinite(d.value) && d.value > 0), c = n.reduce((d, h) => d + h.value, 0), l = c > 0 ? n.map((d) => ({ color: d.colorResolved, share: d.value / c })) : void 0;
    return p`
      <div
        class="metric score-metric ${(r.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${t.accent}"
        @click=${() => this._handleTap(r, e, i.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
          <div class="name">${t.name}</div>
          <div class="time">
            ${G(this.hass, i.last_updated)}
          </div>
        </div>
        <div class="scorewrap">
          ${Bt(
      this._cardStyle(),
      t.accent,
      this._scoreColor(s, o),
      Math.max(0, Math.min(Number.isFinite(s) ? s / o : 0, 1)),
      l
    )}
          <div class="scoreinner">
            <div class="scorenum">${k(this.hass, s, r.precision ?? 0)}</div>
            <div class="scoremax">${x(this.hass, "of")} ${o}</div>
          </div>
        </div>
        ${a.length ? p`<div class="score-bars">
              ${a.map((d) => {
      const h = Number.isFinite(d.value) ? Math.max(0, Math.min(d.value / o * 100, 100)) : 0;
      return p`<div class="sbar">
                  <span class="sbar-name">${d.name}</span>
                  <div class="sbar-track">
                    <div
                      class="sbar-fill"
                      style="width:${h}%;background:${d.colorResolved}"
                    ></div>
                  </div>
                  <span class="sbar-val">
                    ${Number.isFinite(d.value) ? k(this.hass, d.value, 0) : "–"}
                  </span>
                </div>`;
    })}
            </div>` : u}
        <div class="score-status">
          ${this._renderStatus(r, t.data[0], i, "", 0, r.trend ?? "up_good", "atleast")}
        </div>
      </div>
    `;
  }
  /** Menstrual cycle ring with phase arcs, current-day marker and phase label. */
  _renderCycle(t, e) {
    var y;
    const r = t.m, i = t.primaryState, s = Math.max(2, Math.round(r.cycle_length ?? 28)), o = Math.max(1, Math.round(r.period_length ?? 5)), a = Math.round(r.ovulation_day ?? s - 14), n = this._numeric(i, r.attribute), c = Number.isFinite(n) ? Math.max(1, Math.min(Math.round(n), s)) : 1, l = Math.max(o + 1, a - 4), d = Math.min(s, a + 1), h = "var(--red-color, #e53935)", g = "var(--teal-color, #009688)", b = "color-mix(in srgb, var(--purple-color, #9C27B0) 35%, transparent)", _ = "color-mix(in srgb, var(--amber-color, #FFC107) 45%, transparent)", w = [{ from: 1, to: o, color: h }];
    l > o + 1 && w.push({ from: o + 1, to: l - 1, color: b }), w.push({ from: l, to: d, color: g }), d < s && w.push({ from: d + 1, to: s, color: _ });
    let $;
    c <= o ? $ = "menstruation" : c === a ? $ = "ovulation" : c >= l && c <= d ? $ = "fertile" : c < l ? $ = "follicular" : $ = "luteal";
    const f = r.phase_entity ? ((y = this.hass.states[r.phase_entity]) == null ? void 0 : y.state) ?? x(this.hass, `phase_${$}`) : x(this.hass, `phase_${$}`), v = (s - c + 1) % s || s, m = c >= s ? x(this.hass, "period_today") : x(this.hass, "period_in").replace("{n}", String(v));
    return p`
      <div
        class="metric cycle-metric ${(r.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${t.accent}"
        @click=${() => this._handleTap(r, e, i.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
          <div class="name">${t.name}</div>
          <div class="time">
            ${G(this.hass, i.last_updated)}
          </div>
        </div>
        <div class="scorewrap">
          ${Ht(c, s, w)}
          <div class="scoreinner">
            <div class="scoremax">${x(this.hass, "cycle_day")}</div>
            <div class="scorenum">${k(this.hass, c, 0)}</div>
            <div class="scoremax">${x(this.hass, "cycle_of")} ${s}</div>
          </div>
        </div>
        <div class="cycle-phase" style="color:${t.accent}">${f}</div>
        <div class="cycle-note">${m}</div>
      </div>
    `;
  }
  /** Avatar tile: stylized figure with state-driven effects and anchors. */
  _renderBody(t, e) {
    const r = t.m, i = t.primaryState, s = this._numeric(i, r.attribute), o = this._resolveGoal(r.goal);
    let a = 0;
    Number.isFinite(s) && Number.isFinite(o) && o > 0 && (a = Math.max(-0.35, Math.min((s / o - 1) * 2.5, 1.1)));
    const n = !!r.preview_effects, c = r.sleep_entity ? this._numeric(this.hass.states[r.sleep_entity]) : NaN, l = r.tired_below ?? 60;
    let d = Number.isFinite(c) && c < l ? Math.min((l - c) / 45 + 0.15, 1) : 0;
    const h = r.temperature_entity ? this._numeric(this.hass.states[r.temperature_entity]) : NaN, g = r.fever_from ?? 37.8;
    let b = Number.isFinite(h) && h >= g ? Math.min((h - g) / 2 + 0.4, 1) : 0;
    n && (d = Math.max(d, 0.85), b = Math.max(b, 0.75));
    const _ = r.score_entity ? this._numeric(this.hass.states[r.score_entity]) : NaN, w = r.max ?? 100, $ = Number.isFinite(_) ? 0.25 + _ / w * 0.55 : 0, f = Number.isFinite(_) ? this._scoreColor(_, w) : "transparent", v = (r.anchors ?? []).filter((y) => this.hass.states[y.entity]), m = r.fade_figure !== !1;
    return p`
      <div
        class="metric body-metric ${(r.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${t.accent}"
        @click=${() => this._handleTap(r, e, i.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
          <div class="name">${t.name}</div>
          ${this._renderScoreBadge(r)}
          <div class="time">
            ${G(this.hass, i.last_updated)}
          </div>
        </div>
        <div class="bodywrap">
          ${$ > 0 ? p`<div
                class="body-glow"
                style="--hc-glow:${f};opacity:${$}"
              ></div>` : u}
          <div
            class="bodyframe ${r.body_crop === "upper" ? "crop-upper" : ""} ${m ? "fade" : ""}"
            style="--hc-frame-ar:${this._frameAspect(r)};--hc-fade:${r.fade_height ?? (r.body_crop === "upper" ? 150 : 200)}px"
          >
            <div
              class="bodystage"
              style="--hc-zoom:${r.figure_zoom ?? 1};--hc-oy:${r.figure_offset_y ?? -3}%;--hc-ox:${r.figure_offset_x ?? 0}%"
            >
              ${r.image_remove_black ? p`<svg class="unblack-defs" aria-hidden="true">
                    <filter id="hc-unblack">
                      <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1.2 1.8 0.7 0 -0.18"
                      />
                    </filter>
                  </svg>` : u}
              <img
                class="bodyimg"
                src=${this._bodyImage(r, a)}
                style=${r.image_remove_black ? "filter: url(#hc-unblack)" : ""}
                alt=""
              />
            </div>
          </div>
          ${b > 0 ? p`<div
                class="body-fever"
                style="left:${r.fever_x ?? 50}%;top:${r.fever_y ?? 14}%;opacity:${b}"
              ></div>` : u}
          ${d > 0 ? p`<div
                class="body-tired"
                style="left:${r.tired_x ?? 50}%;top:${r.tired_y ?? 15}%;opacity:${0.25 + d * 0.6}"
              >
                <span></span><span></span>
              </div>` : u}
          ${v.map((y, A) => this._renderAnchor(y, A, r))}
        </div>
        <div class="body-foot">
          ${this._renderValue(r, t.type, t.data, i, t.unit, t.precision, !1)}
          ${this._renderStatus(
      r,
      t.data[0],
      i,
      t.unit,
      t.precision,
      t.trendMode,
      t.goalType
    )}
        </div>
      </div>
    `;
  }
  /**
   * Effective figure set. Default is mannequin; the liquid-glass card style
   * defaults to the matching glass figures. Unknown values (e.g. the removed
   * svg style from old configs) fall back to the default.
   */
  _figStyle(t) {
    const e = ["flat", "glass", "mannequin", "pixar"];
    return t.figure_style && e.includes(t.figure_style) ? t.figure_style : this._cardStyle() === "glass" ? "glass" : "mannequin";
  }
  /** Figure image URL for the current weight state. */
  _bodyImage(t, e) {
    const r = e < -0.12 ? "slim" : e < 0.35 ? "regular" : "full";
    if (t.images) {
      const a = (r === "slim" ? t.images.slim : r === "full" ? t.images.full : t.images.regular) ?? t.images.regular ?? t.images.slim ?? t.images.full;
      if (a) return a;
    }
    const i = t.gender ?? "female", s = r === "slim" ? "underweight" : r === "full" ? "overweight" : "normal";
    return `${this._figureBase(t)}${this._figStyle(t)}/${i}_${s}.png`;
  }
  /**
   * Frame aspect ratio (width/height). The frame is fixed-height so zooming
   * (a transform on the inner stage) magnifies in place instead of growing
   * the card. Full fits the whole portrait figure; upper is a wide band.
   */
  _frameAspect(t) {
    return t.body_crop === "upper" ? 1.15 : 0.68;
  }
  /** Base URL for bundled figure images (served next to the card by default). */
  _figureBase(t) {
    if (t.figure_base) return t.figure_base.endsWith("/") ? t.figure_base : `${t.figure_base}/`;
    try {
      return new URL("figures/", import.meta.url).href;
    } catch {
      return "/figures/";
    }
  }
  _renderAnchor(t, e, r) {
    const i = M.ANCHOR_POS[t.position ?? "chest"], s = this.hass.states[t.entity];
    if (!i || !s) return u;
    let o;
    if (t.dot)
      o = t.dot;
    else {
      let g = t.x !== void 0 && !t.position ? t.x >= 50 ? "right" : "left" : i.side;
      t.flip && (g = g === "right" ? "left" : "right"), o = g;
    }
    const a = t.x ?? i.x, n = t.y ?? i.y, c = C(t.color) ?? C(ae[e % ae.length]), l = this._numeric(s);
    let d;
    if (t.entity2) {
      const g = this._numeric(this.hass.states[t.entity2]);
      d = `${k(this.hass, l, 0)}/${k(this.hass, g, 0)}`;
    } else
      d = Number.isFinite(l) ? X(
        k(this.hass, l),
        s.attributes.unit_of_measurement ?? ""
      ) : s.state;
    const h = r.label_opacity ?? 1;
    return p`<div
      class="anchor dot-${o}"
      style="left:${a}%;top:${n}%;--ac:${c};--hc-label-op:${h}"
    >
      <span class="anchor-dot"></span>
      <div class="anchor-chip">
        <span class="anchor-name">${t.name ?? s.attributes.friendly_name ?? ""}</span>
        <span class="anchor-val">${d}</span>
      </div>
    </div>`;
  }
  /** Traffic-light color for score visuals, driven by the score ratio. */
  _scoreColor(t, e) {
    const r = Number.isFinite(t) ? t / e : 0;
    return r >= 0.75 ? "var(--success-color, #43a047)" : r >= 0.45 ? "var(--warning-color, #fb8c00)" : "var(--error-color, #e53935)";
  }
  /** Traffic-light badge for a metric's score_entity (e.g. sleep score). */
  _renderScoreBadge(t) {
    if (!t.score_entity) return u;
    const e = this._numeric(this.hass.states[t.score_entity]);
    return Number.isFinite(e) ? p`<span class="scorebadge" style="background:${this._scoreColor(e, 100)}">
      ${k(this.hass, e, 0)}
    </span>` : u;
  }
  /** Calendar heatmap: one cell per day, tinted by the score entity's value. */
  _renderScoreCalendar(t, e) {
    const r = H(this.hass) === "de" ? "de-DE" : "en-US", i = /* @__PURE__ */ new Date();
    i.setHours(0, 0, 0, 0), i.setDate(i.getDate() - (e - 1));
    const s = (i.getDay() + 6) % 7, o = new Date(2024, 0, 1), a = Array.from(
      { length: 7 },
      (n, c) => new Date(o.getTime() + c * 864e5).toLocaleDateString(r, {
        weekday: "narrow"
      })
    );
    return p`<div class="cal">
      ${a.map((n) => p`<div class="cal-head">${n}</div>`)}
      ${Array.from({ length: s }, () => p`<div></div>`)}
      ${t.map((n, c) => {
      const l = new Date(i.getTime() + c * 864e5);
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
  _fmtMetricValue(t, e) {
    var r;
    if (t.m.duration ?? t.preset.duration) {
      const i = Object.values(t.m.phases ?? {}).map((o) => {
        var a;
        return o ? (a = this.hass.states[o]) == null ? void 0 : a.attributes.unit_of_measurement : void 0;
      }).find(Boolean), s = t.m.unit ?? (t.valueOverride !== void 0 ? i : (r = t.primaryState) == null ? void 0 : r.attributes.unit_of_measurement);
      return oe(e, s);
    }
    return X(k(this.hass, e, t.precision), t.unit);
  }
  /** Axis marks for the popup chart: gridlines and labels per range kind. */
  _xMarks(t, e) {
    const r = H(this.hass) === "de" ? "de-DE" : "en-US", i = [];
    if (t === "hour") {
      const n = /* @__PURE__ */ new Date();
      n.setMinutes(0, 0, 0);
      const c = n.getTime() - (e - 1) * 36e5;
      for (let l = 0; l < e; l++) {
        const d = new Date(c + l * 36e5).getHours();
        d % 6 === 0 && i.push({ i: l, label: String(d), line: d === 0 });
      }
      return i;
    }
    if (t === "month") {
      const n = /* @__PURE__ */ new Date();
      for (let c = 0; c < e; c++) {
        const l = new Date(n.getFullYear(), n.getMonth() - (e - 1 - c), 1);
        l.getMonth() === 0 && i.push({ i: c, label: String(l.getFullYear()), line: !0 });
      }
      return i;
    }
    const s = /* @__PURE__ */ new Date();
    if (s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (e - 1)), e <= 14) {
      for (let n = 0; n < e; n++) {
        const c = new Date(s.getTime() + n * 864e5);
        i.push({ i: n, label: c.toLocaleDateString(r, { weekday: "narrow" }) });
      }
      return i;
    }
    let o = 0, a = 0;
    for (let n = 0; n < e; n++) {
      const c = new Date(s.getTime() + n * 864e5);
      e <= 45 ? c.getDay() === 1 && i.push({
        i: n,
        label: o++ % 2 === 0 ? c.toLocaleDateString(r, { day: "numeric", month: "numeric" }) : void 0,
        line: !0
      }) : c.getDate() === 1 && (i.push({
        i: n,
        label: e <= 120 || a % 2 === 0 ? c.toLocaleDateString(r, { month: "short" }) : void 0,
        line: !0
      }), a++);
    }
    return i;
  }
  /** Toothbrush popup: when was brushed — one 24h track per day with dots. */
  _renderEventTimes(t) {
    const e = (this._history[t] ?? []).filter((a) => a.v > 0);
    if (!e.length) return u;
    const r = H(this.hass) === "de" ? "de-DE" : "en-US", i = /* @__PURE__ */ new Date();
    i.setHours(0, 0, 0, 0);
    const s = i.getTime() - 6 * 864e5, o = Array.from({ length: 7 }, (a, n) => {
      const c = s + n * 864e5;
      return {
        date: new Date(c),
        events: e.filter((l) => l.t >= c && l.t < c + 864e5)
      };
    });
    return p`<div class="times">
      <div class="times-title">${x(this.hass, "event_times")}</div>
      ${o.map(
      (a) => p`<div class="times-row">
          <span class="times-day">
            ${a.date.toLocaleDateString(r, { weekday: "short" })}
          </span>
          <div class="times-track">
            ${a.events.map(
        (n) => p`<span
                class="times-dot"
                style="left:${(n.t - a.date.getTime()) / 864e5 * 100}%"
                title=${new Date(n.t).toLocaleTimeString(r, {
          hour: "2-digit",
          minute: "2-digit"
        })}
              ></span>`
      )}
          </div>
          <span class="times-count">${a.events.length}×</span>
        </div>`
    )}
      <div class="times-hours">
        <span>0</span><span>6</span><span>12</span><span>18</span><span>24</span>
      </div>
    </div>`;
  }
  /**
   * Detail view shared by the popup and expanded tiles: period picker, big
   * chart with axes, stats grid and metric-specific extras.
   */
  _renderDetails(t, e, r, i) {
    var v;
    const s = e.data[0].buckets.filter(Number.isFinite), o = _e(e.data[0].filled), a = this._resolveGoal(t.goal), n = e.valueOverride ?? this._numeric(e.primaryState, t.attribute), c = [];
    if (s.length && (c.push(
      {
        label: x(this.hass, "stat_min"),
        value: this._fmtMetricValue(e, Math.min(...s))
      },
      {
        label: x(this.hass, "stat_avg"),
        value: this._fmtMetricValue(
          e,
          s.reduce((m, y) => m + y, 0) / s.length
        )
      },
      {
        label: x(this.hass, "stat_max"),
        value: this._fmtMetricValue(e, Math.max(...s))
      }
    ), Number.isFinite(o) && o !== 0 && c.push({
      label: x(this.hass, "stat_trend"),
      value: `${o > 0 ? "+" : ""}${this._fmtMetricValue(e, o)}`
    })), Number.isFinite(a) && Number.isFinite(n)) {
      const m = e.goalType === "atmost" ? n - a : a - n;
      c.push({
        label: x(this.hass, "goal_left"),
        value: m > 0 ? this._fmtMetricValue(e, m) : "✓"
      });
    }
    const l = e.days, d = e.kind === "month" || e.kind === "day" && l > 16, h = e.graph === "bar" || e.graph === "progress" ? "bar" : "line", g = t.duration ?? e.preset.duration, b = (m) => g ? this._fmtMetricValue(e, m) : k(this.hass, m, e.precision), _ = {
      w: d ? l * (e.kind === "month" ? 14 : 10) : 340,
      h: d ? 110 : 130,
      dots: e.kind === "day" && l <= 14,
      yFmt: b,
      xMarks: this._xMarks(e.kind, l)
    }, w = h === "bar" ? Ye(
      e.data[0].buckets,
      e.data[0].colorResolved,
      Number.isFinite(a) ? a : void 0,
      _
    ) : Ke(
      e.data.map((m) => ({ values: m.filled, color: m.colorResolved })),
      _
    ), $ = Math.min(l, 91), f = e.type === "sleep" && e.kind === "day" && t.score_entity && this.hass.states[t.score_entity] ? this._renderScoreCalendar(
      this._bucketsFor(t.score_entity, "day", $, "mean"),
      $
    ) : u;
    return p`
      <div class="periods">
        ${ne.map(
      (m) => p`<button
            class="period ${r === m.key ? "active" : ""}"
            @click=${(y) => {
        y.stopPropagation(), i(m.key);
      }}
          >
            ${x(this.hass, `period_${m.key}`)}
          </button>`
    )}
      </div>
      ${e.graph === "progress" ? this._renderChart(t, "progress", e.data, e.unit, e.precision) : u}
      <div class="popup-chart">
        ${d ? p`<div class="chart-scroll">
              <div style="width:${_.w}px">${w}</div>
            </div>` : w}
      </div>
      ${c.length ? p`<div class="stats">
            ${c.map(
      (m) => p`<div class="stat">
                <div class="stat-label">${m.label}</div>
                <div class="stat-value">${m.value}</div>
              </div>`
    )}
          </div>` : u}
      ${f}
      ${e.type === "toothbrush" && ((v = e.series[0]) != null && v.entity) ? this._renderEventTimes(e.series[0].entity) : u}
      ${e.multi ? this._renderSeriesChips(e.data, e.precision, e.trendMode) : u}
      ${e.type === "sleep" && t.phases ? this._renderSleepPhases(t) : u}
      ${this._renderSecondary(t)}
    `;
  }
  _renderPopup() {
    if (this._popup === null || !this._config) return u;
    const t = this._config.metrics[this._popup];
    if (!t) return u;
    const e = this._ctx(t, this._activeRange());
    if (!e.primaryState) return u;
    const r = e.primaryState, i = this._popupRange ?? (e.days === 7 && e.kind === "day" ? "week" : "");
    return p`
      <div class="backdrop s-${this._cardStyle()}" @click=${() => this._popup = null}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          style="--hc-accent:${e.accent}"
          @click=${(s) => s.stopPropagation()}
        >
          <div class="dialog-head">
            <div class="iconchip"><ha-icon .icon=${e.icon}></ha-icon></div>
            <div class="dialog-title">${e.name}</div>
            ${this._renderScoreBadge(t)}
            <button
              class="close"
              aria-label=${x(this.hass, "close")}
              @click=${() => this._popup = null}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-value">
            ${this._renderValue(
      t,
      e.type,
      e.data,
      r,
      e.unit,
      e.precision,
      e.preset.duration,
      e.valueOverride
    )}
            <div class="time">${G(this.hass, r.last_updated)}</div>
          </div>
          ${this._renderStatus(
      t,
      e.data[0],
      r,
      e.unit,
      e.precision,
      e.trendMode,
      e.goalType,
      e.valueOverride
    )}
          ${this._renderDetails(t, e, i, (s) => {
      this._popupRange = s;
    })}
          <button
            class="openha"
            @click=${() => {
      var s;
      this._popup = null, this._moreInfo((s = e.series[0]) == null ? void 0 : s.entity);
    }}
          >
            <ha-icon icon="mdi:chart-box-outline"></ha-icon>
            ${x(this.hass, "open_ha")}
          </button>
        </div>
      </div>
    `;
  }
  _renderSleepPhases(t) {
    const e = {
      deep: "var(--deep-purple-color, #673AB7)",
      light: "var(--light-blue-color, #03A9F4)",
      rem: "var(--cyan-color, #00BCD4)",
      awake: "var(--amber-color, #FFC107)"
    }, r = ["deep", "light", "rem", "awake"].map((i) => {
      var n;
      const s = (n = t.phases) == null ? void 0 : n[i], o = s ? this.hass.states[s] : void 0, a = this._numeric(o);
      if (Number.isFinite(a))
        return { key: i, v: a, unit: o == null ? void 0 : o.attributes.unit_of_measurement, color: e[i] };
    }).filter((i) => !!i);
    return r.length ? p`
      <div class="segbar">
        ${r.map(
      (i) => p`<div class="seg" style="flex-grow:${i.v};background:${i.color}"></div>`
    )}
      </div>
      <div class="phases">
        ${r.map(
      (i) => p`<div class="phase">
            <span class="phasedot" style="background:${i.color}"></span>
            <span>${x(this.hass, `phase_${i.key}`)}</span>
            <span class="phaseval">${oe(i.v, i.unit)}</span>
          </div>`
    )}
      </div>
    ` : u;
  }
  _renderValue(t, e, r, i, s, o, a, n) {
    if (t.label) return p`<div class="value">${t.label}</div>`;
    if (e === "blood_pressure" && r.length >= 2) {
      const l = this._numeric(i, t.attribute), d = this._numeric(this.hass.states[r[1].entity]);
      return p`<div class="value">
          ${k(this.hass, l, 0)}/${k(this.hass, d, 0)}
          <span class="unit">${s}</span>
        </div>
        <div class="bplabels">
          <span class="bpitem">
            <span class="bpdot" style="background:${r[0].colorResolved}"></span>SYS
            ${k(this.hass, l, 0)}
          </span>
          <span class="bpitem">
            <span class="bpdot" style="background:${r[1].colorResolved}"></span>DIA
            ${k(this.hass, d, 0)}
          </span>
        </div>`;
    }
    const c = n ?? this._numeric(i, t.attribute);
    if (!Number.isFinite(c))
      return p`<div class="value">${i.state}</div>`;
    if (t.duration ?? a) {
      const l = Object.values(t.phases ?? {}).map((d) => {
        var h;
        return d ? (h = this.hass.states[d]) == null ? void 0 : h.attributes.unit_of_measurement : void 0;
      }).find(Boolean);
      return p`<div class="value">
        ${oe(
        c,
        t.unit ?? (n !== void 0 ? l : i.attributes.unit_of_measurement)
      )}
      </div>`;
    }
    return p`<div class="value">
      ${k(this.hass, c, o)}<span class="unit">${s}</span>
    </div>`;
  }
  _renderSeriesChips(t, e, r) {
    return p`<div class="serieslist">
      ${t.map((i) => {
      const s = this.hass.states[i.entity], o = this._numeric(s), a = i.unit ?? (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "", n = i.name ?? (s == null ? void 0 : s.attributes.friendly_name) ?? i.entity, c = _e(i.filled), l = Number.isFinite(c) ? c > 0 ? "mdi:arrow-top-right" : c < 0 ? "mdi:arrow-bottom-right" : "mdi:arrow-right" : "mdi:minus";
      return p`<div class="serieschip">
          ${r !== "none" ? p`<span class="dotarrow" style="background:${i.colorResolved}">
                <ha-icon .icon=${l}></ha-icon>
              </span>` : u}
          <span class="serieslabel">
            ${n}: ${Number.isFinite(o) ? X(k(this.hass, o, e), a) : (s == null ? void 0 : s.state) ?? "–"}
          </span>
        </div>`;
    })}
    </div>`;
  }
  _renderSecondary(t) {
    var r;
    if (!((r = t.secondary) != null && r.length)) return u;
    const e = t.secondary.map((i) => {
      const s = this.hass.states[i];
      if (!s) return;
      const o = this._numeric(s), a = s.attributes.unit_of_measurement ?? "";
      return Number.isFinite(o) ? X(k(this.hass, o), a) : s.state;
    }).filter(Boolean);
    return e.length ? p`<div class="secondary">${e.join(" • ")}</div>` : u;
  }
  _renderStatus(t, e, r, i, s, o, a = "atleast", n) {
    const c = n ?? this._numeric(r, t.attribute), l = this._resolveGoal(t.goal);
    if (Number.isFinite(l) && Number.isFinite(c)) {
      const v = this._resolveGoal(t.start);
      let m = NaN;
      if (Number.isFinite(v) && v !== l ? m = (v - c) / (v - l) * 100 : l > 0 && (m = a === "atmost" ? l / c * 100 : c / l * 100), !Number.isNaN(m)) {
        const y = Math.round(Math.min(Math.max(m, 0), 999)), A = y >= 100;
        return p`<div class="status ${A ? "good" : ""}">
          <ha-icon .icon=${A ? "mdi:check-circle" : "mdi:flag-outline"}></ha-icon>
          <span>${x(this.hass, "goal")}: ${y} %</span>
        </div>`;
      }
    }
    if (o === "none") return u;
    const d = _e(e.filled);
    if (!Number.isFinite(d)) return u;
    const h = e.filled.find(Number.isFinite) ?? 0, g = Math.abs(d) < Math.max(Math.abs(h) * 5e-3, 1e-9), b = g || o === "neutral" ? "neutral" : d > 0 == (o === "up_good") ? "good" : "bad", _ = g ? "mdi:arrow-right" : d > 0 ? "mdi:arrow-top-right" : "mdi:arrow-bottom-right", w = t.type && O[t.type] ? t.type : "custom", $ = t.duration ?? O[w].duration, f = g ? x(this.hass, "stable") : $ ? oe(Math.abs(d), i || void 0) : `${k(this.hass, Math.abs(d), s)}${i ? ` ${i}` : ""}`;
    return p`<div class="status ${b}">
      <span class="dotarrow"><ha-icon .icon=${_}></ha-icon></span>
      <span>${f}</span>
    </div>`;
  }
  _renderChart(t, e, r, i, s) {
    if (e === "line")
      return p`${Ke(
        r.map((o) => ({ values: o.filled, color: o.colorResolved }))
      )}`;
    if (e === "bar") {
      const o = this._resolveGoal(t.goal);
      return p`${Ye(
        r[0].buckets,
        r[0].colorResolved,
        Number.isFinite(o) ? o : void 0
      )}`;
    }
    if (e === "progress") {
      const o = r.map((a) => {
        const n = this.hass.states[a.entity], c = this._numeric(n), l = this._resolveGoal(a.goal ?? t.goal);
        if (!Number.isFinite(c) || !Number.isFinite(l) || l <= 0) return u;
        const d = Math.max(0, Math.min(c / l * 100, 100)), h = a.unit ?? (n == null ? void 0 : n.attributes.unit_of_measurement) ?? i;
        return p`<div class="pbar">
          ${r.length > 1 ? p`<div class="pbar-label">
                <span>${a.name ?? (n == null ? void 0 : n.attributes.friendly_name) ?? a.entity}</span>
                <span>${X(k(this.hass, c, s), h)}</span>
              </div>` : u}
          <div class="ptrack" style="--hc-p:${a.colorResolved}">
            <div class="pfill" style="width:${d}%"></div>
          </div>
        </div>`;
      });
      return p`<div class="pbars">${o}</div>`;
    }
    return u;
  }
};
M.ANCHOR_POS = {
  head: { x: 50, y: 9, side: "right" },
  chest: { x: 44, y: 32, side: "left" },
  // flex arm is on the viewer-left, resting arm (cuff) on the right
  "arm-left": { x: 30, y: 20, side: "left" },
  "arm-right": { x: 69, y: 27, side: "right" },
  belly: { x: 50, y: 54, side: "right" },
  legs: { x: 57, y: 75, side: "right" }
};
M.styles = Qe`
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
      --hc-tile-bg: #0d0d0d;
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
      /* keep the fade overlay (var consumer) in sync with the hover tint so
         no sharp rectangle shows inside the tile */
      background: color-mix(in srgb, var(--primary-text-color) 7%, var(--hc-card-bg));
      --hc-tile-bg: color-mix(in srgb, var(--primary-text-color) 7%, var(--hc-card-bg));
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
    .cycle-phase {
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }
    .cycle-note {
      text-align: center;
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-top: -2px;
    }
    .score-bars {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      max-width: 260px;
      margin: 0 auto;
    }
    .sbar {
      display: grid;
      grid-template-columns: minmax(56px, auto) 1fr auto;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }
    .sbar-name {
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sbar-track {
      height: 6px;
      border-radius: 3px;
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      overflow: hidden;
    }
    .sbar-fill {
      height: 100%;
      border-radius: 3px;
    }
    .sbar-val {
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .s-mirror .sbar-fill {
      filter: grayscale(1) brightness(1.75);
    }
    .exp-value {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px 10px;
    }

    /* ---- body / avatar tile -------------------------------------------
       no clip-path: the figure fades out (mask) before the bottom and the
       frame clips its own overflow, so nothing reaches the rounded card
       corners or spills below. the glows may still overflow the top/sides. */
    .body-metric {
      position: relative;
    }
    .bodywrap {
      position: relative;
      width: min(300px, 100%);
      margin: 0 auto;
    }
    /* fixed-height, playing-card-ish frame. nothing is ever hard-clipped:
       the figure may spill toward the card edges (top/sides), only the lower
       edge is covered by a soft gradient overlay so feet melt into the tile
       before the value text. zoom magnifies the inner stage in place, keeping
       the card height constant. the upper-body crop is the one exception —
       cropping is its purpose. */
    .bodyframe {
      position: relative;
      width: 100%;
      aspect-ratio: var(--hc-frame-ar, 0.68);
    }
    /* the frame clips the figure to its box (so the lower body, which the
       fade dissolves, and any zoom overflow never reach the rounded card
       corners or the value label) */
    .bodyframe {
      overflow: hidden;
    }
    .bodystage {
      position: absolute;
      inset: 0;
      transform: translate(var(--hc-ox, 0%), var(--hc-oy, 0%))
        scale(var(--hc-zoom, 1));
      transform-origin: 50% 0;
    }
    /* figure fits the frame, head-aligned to the top */
    .bodyimg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 50% 0;
      display: block;
    }
    .bodyframe.crop-upper .bodyimg {
      height: auto;
      object-fit: unset;
    }
    /* bottom fade: the FIGURE ITSELF fades to transparent over the lowest
       --hc-fade px of the frame (a mask, not a colour overlay). true
       transparency dissolves the figure into whatever is behind on ANY theme
       — solid or translucent, no hover dependency, no coloured band, and the
       rounded card corners show through where the figure has faded out. it is
       frame-relative (not image-relative) so it never lands too low. */
    .bodyframe.fade {
      -webkit-mask-image: linear-gradient(
        to bottom,
        #000 calc(100% - var(--hc-fade, 200px)),
        transparent calc(100% - var(--hc-fade, 200px) * 0.18)
      );
      mask-image: linear-gradient(
        to bottom,
        #000 calc(100% - var(--hc-fade, 200px)),
        transparent calc(100% - var(--hc-fade, 200px) * 0.18)
      );
    }
    .unblack-defs {
      position: absolute;
      width: 0;
      height: 0;
    }
    .body-glow {
      position: absolute;
      inset: -8%;
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        color-mix(in srgb, var(--hc-glow) 45%, transparent),
        transparent
      );
      pointer-events: none;
    }
    .body-fever {
      position: absolute;
      width: 52%;
      aspect-ratio: 1.1;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        color-mix(in srgb, var(--error-color, #e53935) 45%, transparent),
        transparent
      );
      pointer-events: none;
    }
    .body-tired {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      gap: 5%;
      width: 20%;
      pointer-events: none;
    }
    .body-tired span {
      flex: 1;
      aspect-ratio: 1.7;
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        color-mix(in srgb, #3a2a4a 85%, transparent),
        transparent
      );
      filter: blur(1px);
    }
    /* the anchor is pinned to the point (x/y); the dot sits at that point and
       the chip is offset to one of 8 directions via a translate */
    .anchor {
      position: absolute;
      pointer-events: none;
      --gap: 9px;
      --dg: 2px;
    }
    .anchor-dot {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: var(--ac);
      border: 2px solid var(--hc-card-bg);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    }
    .anchor-chip {
      position: absolute;
      top: 0;
      left: 0;
      background: color-mix(
        in srgb,
        var(--hc-card-bg) calc(var(--hc-label-op, 1) * 100%),
        transparent
      );
      border-radius: 10px;
      padding: 4px 9px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, calc(var(--hc-label-op, 1) * 0.16));
      display: flex;
      flex-direction: column;
      line-height: 1.25;
      white-space: nowrap;
    }
    /* dot-<dir> = dot is on that side of the chip → chip offset the other way.
       diagonals sit closer (smaller gap) so the label hugs the point. */
    .anchor.dot-right .anchor-chip {
      transform: translate(calc(-100% - var(--gap)), -50%);
    }
    .anchor.dot-left .anchor-chip {
      transform: translate(var(--gap), -50%);
    }
    .anchor.dot-bottom .anchor-chip {
      transform: translate(-50%, calc(-100% - var(--gap)));
    }
    .anchor.dot-top .anchor-chip {
      transform: translate(-50%, var(--gap));
    }
    .anchor.dot-bottom-right .anchor-chip {
      transform: translate(calc(-100% - var(--dg)), calc(-100% - var(--dg)));
    }
    .anchor.dot-bottom-left .anchor-chip {
      transform: translate(var(--dg), calc(-100% - var(--dg)));
    }
    .anchor.dot-top-right .anchor-chip {
      transform: translate(calc(-100% - var(--dg)), var(--dg));
    }
    .anchor.dot-top-left .anchor-chip {
      transform: translate(var(--dg), var(--dg));
    }
    /* design-language chip styling */
    .s-glass .anchor-chip {
      border: 1px solid color-mix(in srgb, #fff 30%, transparent);
      -webkit-backdrop-filter: blur(8px) saturate(1.4);
      backdrop-filter: blur(8px) saturate(1.4);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent),
        0 4px 14px rgba(0, 0, 0, 0.16);
    }
    .s-material .anchor-chip {
      border-radius: 14px;
      background: color-mix(
        in srgb,
        color-mix(in srgb, var(--hc-accent) 16%, var(--hc-card-bg))
          calc(var(--hc-label-op, 1) * 100%),
        transparent
      );
    }
    .s-bubble .anchor-chip {
      border-radius: 14px;
    }
    .anchor-name {
      font-size: 10px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .anchor-val {
      font-size: 12px;
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .s-mirror .anchor-chip {
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: none;
    }
    .s-mirror .anchor-dot {
      border-color: #000;
    }
    .body-foot {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      /* lift the value above the (absolutely positioned) figure and fade */
      position: relative;
      z-index: 4;
    }
    .body-foot .value {
      font-size: 24px;
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
P([
  Me({ attribute: !1 })
], M.prototype, "hass", 2);
P([
  F()
], M.prototype, "_config", 2);
P([
  F()
], M.prototype, "_history", 2);
P([
  F()
], M.prototype, "_popup", 2);
P([
  F()
], M.prototype, "_popupRange", 2);
P([
  F()
], M.prototype, "_tileRanges", 2);
P([
  F()
], M.prototype, "_statsCache", 2);
M = P([
  at("health-card")
], M);
console.info(
  `%c HEALTH-CARD %c v${qt} `,
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
  M as HealthCard
};
