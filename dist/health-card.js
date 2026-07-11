/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, we = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ke = Symbol(), Ne = /* @__PURE__ */ new WeakMap();
let Qe = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (we && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ne.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ne.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ht = (r) => new Qe(typeof r == "string" ? r : r + "", void 0, ke), et = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[a + 1], r[0]);
  return new Qe(t, r, ke);
}, pt = (r, e) => {
  if (we) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = ne.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, De = we ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ht(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ut, defineProperty: mt, getOwnPropertyDescriptor: gt, getOwnPropertyNames: ft, getOwnPropertySymbols: bt, getPrototypeOf: yt } = Object, T = globalThis, Pe = T.trustedTypes, _t = Pe ? Pe.emptyScript : "", ge = T.reactiveElementPolyfillSupport, J = (r, e) => r, ce = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? _t : null;
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
} }, Se = (r, e) => !ut(r, e), Te = { attribute: !0, type: String, converter: ce, reflect: !1, useDefault: !1, hasChanged: Se };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let V = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Te) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && mt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: a } = gt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: s, set(o) {
      const n = s == null ? void 0 : s.call(this);
      a == null || a.call(this, o), this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Te;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const e = yt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const t = this.properties, i = [...ft(t), ...bt(t)];
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
      for (const s of i) t.unshift(De(s));
    } else e !== void 0 && t.push(De(e));
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
    return pt(e, this.constructor.elementStyles), e;
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
    var a;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : ce).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, o;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((a = n.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? n.converter : ce;
      this._$Em = s;
      const d = c.fromAttribute(t, n.type);
      this[s] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, a) {
    var o;
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (a = this[e]), i ?? (i = n.getPropertyOptions(e)), !((i.hasChanged ?? Se)(a, t) || i.useDefault && i.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: a }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [a, o] of s) {
        const { wrapped: n } = o, c = this[a];
        n !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, o, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((s) => {
        var a;
        return (a = s.hostUpdate) == null ? void 0 : a.call(s);
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
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[J("elementProperties")] = /* @__PURE__ */ new Map(), V[J("finalized")] = /* @__PURE__ */ new Map(), ge == null || ge({ ReactiveElement: V }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, Re = (r) => r, le = Q.trustedTypes, ze = le ? le.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, tt = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, rt = "?" + P, vt = `<${rt}>`, j = document, ee = () => j.createComment(""), te = (r) => r === null || typeof r != "object" && typeof r != "function", Ae = Array.isArray, xt = (r) => Ae(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", fe = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oe = /-->/g, Le = />/g, O = RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), He = /'/g, Be = /"/g, it = /^(?:script|style|textarea|title)$/i, st = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), u = st(1), w = st(2), K = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), Ue = /* @__PURE__ */ new WeakMap(), L = j.createTreeWalker(j, 129);
function ot(r, e) {
  if (!Ae(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ze !== void 0 ? ze.createHTML(e) : e;
}
const $t = (r, e) => {
  const t = r.length - 1, i = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Z;
  for (let n = 0; n < t; n++) {
    const c = r[n];
    let d, l, h = -1, g = 0;
    for (; g < c.length && (o.lastIndex = g, l = o.exec(c), l !== null); ) g = o.lastIndex, o === Z ? l[1] === "!--" ? o = Oe : l[1] !== void 0 ? o = Le : l[2] !== void 0 ? (it.test(l[2]) && (s = RegExp("</" + l[2], "g")), o = O) : l[3] !== void 0 && (o = O) : o === O ? l[0] === ">" ? (o = s ?? Z, h = -1) : l[1] === void 0 ? h = -2 : (h = o.lastIndex - l[2].length, d = l[1], o = l[3] === void 0 ? O : l[3] === '"' ? Be : He) : o === Be || o === He ? o = O : o === Oe || o === Le ? o = Z : (o = O, s = void 0);
    const f = o === O && r[n + 1].startsWith("/>") ? " " : "";
    a += o === Z ? c + vt : h >= 0 ? (i.push(d), c.slice(0, h) + tt + c.slice(h) + P + f) : c + P + (h === -2 ? n : f);
  }
  return [ot(r, a + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class re {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let a = 0, o = 0;
    const n = e.length - 1, c = this.parts, [d, l] = $t(e, t);
    if (this.el = re.createElement(d, i), L.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = L.nextNode()) !== null && c.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(tt)) {
          const g = l[o++], f = s.getAttribute(h).split(P), _ = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: a, name: _[2], strings: f, ctor: _[1] === "." ? kt : _[1] === "?" ? St : _[1] === "@" ? At : he }), s.removeAttribute(h);
        } else h.startsWith(P) && (c.push({ type: 6, index: a }), s.removeAttribute(h));
        if (it.test(s.tagName)) {
          const h = s.textContent.split(P), g = h.length - 1;
          if (g > 0) {
            s.textContent = le ? le.emptyScript : "";
            for (let f = 0; f < g; f++) s.append(h[f], ee()), L.nextNode(), c.push({ type: 2, index: ++a });
            s.append(h[g], ee());
          }
        }
      } else if (s.nodeType === 8) if (s.data === rt) c.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(P, h + 1)) !== -1; ) c.push({ type: 7, index: a }), h += P.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = j.createElement("template");
    return i.innerHTML = e, i;
  }
}
function q(r, e, t = r, i) {
  var o, n;
  if (e === K) return e;
  let s = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const a = te(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== a && ((n = s == null ? void 0 : s._$AO) == null || n.call(s, !1), a === void 0 ? s = void 0 : (s = new a(r), s._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = q(r, s._$AS(r, e.values), s, i)), e;
}
class wt {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? j).importNode(t, !0);
    L.currentNode = s;
    let a = L.nextNode(), o = 0, n = 0, c = i[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let d;
        c.type === 2 ? d = new ie(a, a.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (d = new Mt(a, this, e)), this._$AV.push(d), c = i[++n];
      }
      o !== (c == null ? void 0 : c.index) && (a = L.nextNode(), o++);
    }
    return L.currentNode = j, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class ie {
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
    e = q(this, e, t), te(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== K && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : xt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && te(this._$AH) ? this._$AA.nextSibling.data = e : this.T(j.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = re.createElement(ot(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === s) this._$AH.p(t);
    else {
      const o = new wt(s, this), n = o.u(this.options);
      o.p(t), this.T(n), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Ue.get(e.strings);
    return t === void 0 && Ue.set(e.strings, t = new re(e)), t;
  }
  k(e) {
    Ae(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const a of e) s === t.length ? t.push(i = new ie(this.O(ee()), this.O(ee()), this, this.options)) : i = t[s], i._$AI(a), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = Re(e).nextSibling;
      Re(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
let he = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, a) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(e, t = this, i, s) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = q(this, e, t, 0), o = !te(e) || e !== this._$AH && e !== K, o && (this._$AH = e);
    else {
      const n = e;
      let c, d;
      for (e = a[0], c = 0; c < a.length - 1; c++) d = q(this, n[i + c], t, c), d === K && (d = this._$AH[c]), o || (o = !te(d) || d !== this._$AH[c]), d === p ? e = p : e !== p && (e += (d ?? "") + a[c + 1]), this._$AH[c] = d;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
class kt extends he {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class St extends he {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class At extends he {
  constructor(e, t, i, s, a) {
    super(e, t, i, s, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = q(this, e, t, 0) ?? p) === K) return;
    const i = this._$AH, s = e === p && i !== p || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== p && (i === p || s);
    s && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Mt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    q(this, e);
  }
}
const be = Q.litHtmlPolyfillSupport;
be == null || be(re, ie), (Q.litHtmlVersions ?? (Q.litHtmlVersions = [])).push("3.3.3");
const Et = (r, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const a = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new ie(e.insertBefore(ee(), a), a, void 0, t ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis;
class W extends V {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Et(t, this.renderRoot, this.renderOptions);
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
    return K;
  }
}
var Je;
W._$litElement$ = !0, W.finalized = !0, (Je = B.litElementHydrateSupport) == null || Je.call(B, { LitElement: W });
const ye = B.litElementPolyfillSupport;
ye == null || ye({ LitElement: W });
(B.litElementVersions ?? (B.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = (r) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, e);
  }) : customElements.define(r, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = { attribute: !0, type: String, converter: ce, reflect: !1, hasChanged: Se }, Ft = (r = Ct, e, t) => {
  const { kind: i, metadata: s } = t;
  let a = globalThis.litPropertyMetadata.get(s);
  if (a === void 0 && globalThis.litPropertyMetadata.set(s, a = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), a.set(t.name, r), i === "accessor") {
    const { name: o } = t;
    return { set(n) {
      const c = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(o, c, r, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, r, n), n;
    } };
  }
  if (i === "setter") {
    const { name: o } = t;
    return function(n) {
      const c = this[o];
      e.call(this, n), this.requestUpdate(o, c, r, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Me(r) {
  return (e, t) => typeof t == "object" ? Ft(r, e, t) : ((i, s, a) => {
    const o = s.hasOwnProperty(a);
    return s.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(s, a) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(r) {
  return Me({ ...r, state: !0, attribute: !1 });
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
function D(r) {
  if (r)
    return r === "primary" ? "var(--primary-color)" : r === "accent" ? "var(--accent-color)" : $e[r] ? `var(--${r}-color, ${$e[r]})` : r;
}
const H = {
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
}, Ie = ["amber", "indigo", "pink", "teal", "purple"], se = ["teal", "orange", "pink", "cyan", "lime"], Nt = {
  // [slim, regular, full]
  female: [
    { shoulder: 22, arm: 30, hand: 28, waist: 17, belly: 18, hip: 28, knee: 11, ankle: 7 },
    { shoulder: 24, arm: 33, hand: 31, waist: 21, belly: 22, hip: 32, knee: 13, ankle: 8 },
    { shoulder: 28, arm: 41, hand: 38, waist: 32, belly: 35, hip: 40, knee: 17, ankle: 10 }
  ],
  male: [
    { shoulder: 27, arm: 34, hand: 31, waist: 19, belly: 19, hip: 24, knee: 12, ankle: 8 },
    { shoulder: 30, arm: 38, hand: 34, waist: 24, belly: 25, hip: 27, knee: 14, ankle: 9 },
    { shoulder: 34, arm: 46, hand: 42, waist: 36, belly: 40, hip: 35, knee: 18, ankle: 11 }
  ]
};
function Ge(r, e, t) {
  const i = {};
  for (const s of Object.keys(r))
    i[s] = r[s] + (e[s] - r[s]) * t;
  return i;
}
function Dt(r) {
  const e = r.length, t = (s) => r[(s % e + e) % e];
  let i = `M ${t(0)[0].toFixed(1)} ${t(0)[1].toFixed(1)}`;
  for (let s = 0; s < e; s++) {
    const a = t(s - 1), o = t(s), n = t(s + 1), c = t(s + 2), d = [o[0] + (n[0] - a[0]) / 6, o[1] + (n[1] - a[1]) / 6], l = [n[0] - (c[0] - o[0]) / 6, n[1] - (c[1] - o[1]) / 6];
    i += ` C ${d[0].toFixed(1)} ${d[1].toFixed(1)}, ${l[0].toFixed(1)} ${l[1].toFixed(1)}, ${n[0].toFixed(1)} ${n[1].toFixed(1)}`;
  }
  return `${i} Z`;
}
function Pt(r) {
  const e = Math.max(-0.35, Math.min(r.shape, 1.1)), t = Nt[r.gender], i = e <= 0 ? Ge(t[1], t[0], Math.min(-e / 0.35, 1)) : Ge(t[1], t[2], Math.min(e / 0.85, 1)), s = i.shoulder, a = [
    // head + neck (right side)
    [100, 10],
    [112, 14],
    [116.5, 29],
    [111, 43],
    [105.5, 51],
    [105, 60],
    // neck notch
    // trapezius + marked shoulder; the flexed arm is drawn as an overlay,
    // keeping the silhouette path free of self-intersections
    [100 + s * 0.55, 66],
    [100 + s + 4, 78],
    // round shoulder cap
    [100 + i.waist + 6, 106],
    [100 + i.waist + 1, 130],
    [100 + i.waist, 152],
    // free waist on the flexing side
    [100 + i.belly + 2, 180],
    [100 + i.hip, 200],
    // right leg
    [100 + i.hip - 2, 228],
    [100 + i.knee + 3, 262],
    [100 + i.ankle + 3, 298],
    [100 + i.ankle + 8, 313],
    [103, 316],
    [103, 290],
    [103.5, 258],
    [102, 230],
    [100, 220],
    // crotch
    // left leg (mirrored)
    [98, 230],
    [96.5, 258],
    [97, 290],
    [97, 316],
    [100 - i.ankle - 8, 313],
    [100 - i.ankle - 3, 298],
    [100 - i.knee - 3, 262],
    [100 - i.hip + 2, 228],
    [100 - i.hip, 200],
    // left side with resting arm (hand, waist notch)
    [100 - i.belly - 3, 182],
    [100 - i.waist - 4, 170],
    [100 - i.hand + 2, 176],
    [100 - i.hand - 1, 155],
    [100 - i.arm, 120],
    [100 - s - 5, 80],
    [100 - s * 0.55, 66],
    // neck + head (left side)
    [95, 60],
    [94.5, 51],
    [89, 43],
    [83.5, 29],
    [88, 14]
  ], o = (f) => [200 - f[0], f[1]], n = Dt(a.map(o)), c = 12 + e * 3, l = [
    [100 + s - 6, 80],
    // shoulder
    [100 + s + 20, 92],
    // elbow, out to the side
    [100 + s + 13, 50]
    // raised fist
  ].map(o).map((f, _) => `${_ ? "L" : "M"} ${f[0].toFixed(1)} ${f[1].toFixed(1)}`).join(" "), h = 100 + (s + 7);
  return u`<svg
    class="bodyfig"
    viewBox="0 0 200 330"
    preserveAspectRatio="xMidYMin meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="hc-body-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style="stop-color: var(--hc-body-top)" />
        <stop offset="100%" style="stop-color: var(--hc-body-bottom)" />
      </linearGradient>
      <radialGradient id="hc-body-glow">
        <stop offset="0%" style="stop-color:${r.glowColor}" stop-opacity="0.5" />
        <stop offset="70%" style="stop-color:${r.glowColor}" stop-opacity="0.12" />
        <stop offset="100%" style="stop-color:${r.glowColor}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="hc-fever-glow">
        <stop offset="0%" style="stop-color:var(--error-color, #e53935)" stop-opacity="0.5" />
        <stop offset="100%" style="stop-color:var(--error-color, #e53935)" stop-opacity="0" />
      </radialGradient>
    </defs>

    ${r.glow > 0 ? w`<ellipse cx="100" cy="165" rx="96" ry="150"
          fill="url(#hc-body-glow)" opacity=${r.glow}/>` : p}

    <g class="bodyshape">
      <path class="solid" fill="url(#hc-body-fill)" d=${n} />
      <path class="flexarm-outline" d=${l} style="stroke-width:${c + 3}px" />
      <path class="flexarm" d=${l} style="stroke-width:${c}px" />
    </g>

    ${p}

    ${p}

    ${r.cuff ? w`<rect x=${h - 10} y="82" width="20" height="13" rx="4"
          fill="var(--hc-accent)" stroke="color-mix(in srgb, #fff 35%, transparent)"
          stroke-width="1" transform="rotate(${14} ${h} 88)"/>` : p}
  </svg>`;
}
const Ve = {
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
function U(r) {
  var t;
  return (((t = r == null ? void 0 : r.locale) == null ? void 0 : t.language) ?? (r == null ? void 0 : r.language) ?? "en").startsWith("de") ? "de" : "en";
}
function x(r, e) {
  return Ve[U(r)][e] ?? Ve.en[e] ?? e;
}
function S(r, e, t) {
  if (!Number.isFinite(e)) return "–";
  const i = U(r) === "de" ? "de-DE" : "en-US";
  return t === void 0 ? new Intl.NumberFormat(i, { maximumFractionDigits: 2 }).format(e) : new Intl.NumberFormat(i, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }).format(e);
}
function X(r, e) {
  return e ? /^[%°'"]/.test(e) ? `${r}${e}` : `${r} ${e}` : r;
}
function oe(r, e) {
  if (!Number.isFinite(r)) return "–";
  let t;
  const i = (e ?? "min").toLowerCase();
  i.startsWith("h") ? t = r * 60 : i === "s" || i.startsWith("sec") ? t = r / 60 : t = r;
  const s = Math.round(t * 60), a = Math.floor(s / 3600), o = Math.floor(s % 3600 / 60), n = s % 60;
  return a > 0 ? o ? `${a} h ${o} min` : `${a} h` : o > 0 ? n && o < 10 ? `${o} min ${n} s` : `${o} min` : `${n} s`;
}
function G(r, e) {
  const t = new Date(e);
  if (isNaN(t.getTime())) return "";
  const i = U(r) === "de" ? "de-DE" : "en-US", s = /* @__PURE__ */ new Date(), a = (n, c) => n.getFullYear() === c.getFullYear() && n.getMonth() === c.getMonth() && n.getDate() === c.getDate();
  if (a(t, s))
    return t.toLocaleTimeString(i, { hour: "numeric", minute: "2-digit" });
  const o = new Date(s.getTime() - 864e5);
  return a(t, o) ? x(r, "yesterday") : t.toLocaleDateString(i, { day: "numeric", month: "short" });
}
async function Tt(r, e, t) {
  if (!e.length) return {};
  const i = /* @__PURE__ */ new Date(), s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (t - 1));
  const a = await r.callWS({
    type: "history/history_during_period",
    start_time: s.toISOString(),
    end_time: i.toISOString(),
    entity_ids: e,
    minimal_response: !0,
    no_attributes: !0
  }), o = {};
  for (const n of e)
    o[n] = ((a == null ? void 0 : a[n]) ?? []).map((c) => ({ t: c.lu * 1e3, v: parseFloat(c.s) })).filter((c) => Number.isFinite(c.v));
  return o;
}
function Rt(r, e, t) {
  const i = /* @__PURE__ */ new Date();
  i.setHours(0, 0, 0, 0);
  const s = i.getTime() - (e - 1) * 864e5, a = Array.from({ length: e }, () => []);
  for (const o of r) {
    const n = Math.floor((o.t - s) / 864e5);
    n >= 0 && n < e && a[n].push(o.v);
  }
  return a.map((o) => {
    if (!o.length) return NaN;
    switch (t) {
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
async function zt(r, e, t, i = "day") {
  if (!e.length) return {};
  const s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0), i === "month" ? (s.setDate(1), s.setMonth(s.getMonth() - (t - 1))) : s.setDate(s.getDate() - (t - 1));
  const a = await r.callWS({
    type: "recorder/statistics_during_period",
    start_time: s.toISOString(),
    end_time: (/* @__PURE__ */ new Date()).toISOString(),
    statistic_ids: e,
    period: i,
    types: ["mean", "min", "max", "state", "sum"]
  }), o = (c) => typeof c == "number" && Number.isFinite(c) ? c : null, n = {};
  for (const c of e)
    n[c] = ((a == null ? void 0 : a[c]) ?? []).map((d) => ({
      start: typeof d.start == "number" ? d.start : new Date(d.start).getTime(),
      mean: o(d.mean),
      min: o(d.min),
      max: o(d.max),
      state: o(d.state),
      sum: o(d.sum)
    }));
  return n;
}
function We(r, e) {
  return e === "min" ? r.min : e === "max" || e === "sum" ? r.max ?? r.mean : e === "last" ? r.state ?? r.mean : r.mean;
}
function Ke(r, e, t, i = "day") {
  const s = new Array(e).fill(NaN);
  if (i === "month") {
    const n = /* @__PURE__ */ new Date(), c = n.getFullYear() * 12 + n.getMonth();
    for (const d of r) {
      const l = new Date(d.start), h = l.getFullYear() * 12 + l.getMonth() - (c - (e - 1));
      if (h < 0 || h >= e) continue;
      const g = We(d, t);
      g !== null && (s[h] = g);
    }
    return s;
  }
  const a = /* @__PURE__ */ new Date();
  a.setHours(0, 0, 0, 0);
  const o = a.getTime() - (e - 1) * 864e5;
  for (const n of r) {
    const c = Math.floor((n.start - o) / 864e5);
    if (c < 0 || c >= e) continue;
    const d = We(n, t);
    d !== null && (s[c] = d);
  }
  return s;
}
function Ot(r, e, t) {
  const i = /* @__PURE__ */ new Date();
  i.setMinutes(0, 0, 0);
  const s = i.getTime() - (e - 1) * 36e5, a = Array.from({ length: e }, () => []);
  for (const o of r) {
    const n = Math.floor((o.t - s) / 36e5);
    n >= 0 && n < e && a[n].push(o.v);
  }
  return a.map((o) => {
    if (!o.length) return NaN;
    switch (t) {
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
function qe(r) {
  const e = [...r];
  let t = NaN;
  for (let s = 0; s < e.length; s++)
    Number.isFinite(e[s]) ? t = e[s] : e[s] = t;
  let i = NaN;
  for (let s = e.length - 1; s >= 0; s--)
    Number.isFinite(e[s]) ? i = e[s] : e[s] = i;
  return e;
}
function _e(r) {
  const e = r.filter(Number.isFinite);
  return e.length < 2 ? NaN : e[e.length - 1] - e[0];
}
const nt = 220, ct = 60, F = 7, de = "color-mix(in srgb, var(--primary-text-color) 14%, transparent)";
function lt(r, e) {
  var s;
  const t = r.yFmt ? Math.max(26, ...e.map((a) => r.yFmt(a).length * 5.6 + 10)) : F, i = (s = r.xMarks) != null && s.some((a) => a.label) ? 15 : F;
  return { padL: t, padB: i };
}
function Lt(r) {
  const e = r.filter(Number.isFinite), t = Math.min(...e), i = Math.max(...e), s = i - t || Math.abs(i) * 0.1 || 1;
  return { lo: t - s * 0.18, hi: i + s * 0.18 };
}
function Ye(r, e = {}) {
  const t = e.w ?? nt, i = e.h ?? ct, s = e.dots ?? !0, a = r.filter((b) => b.values.some(Number.isFinite));
  if (!a.length) return p;
  const { lo: o, hi: n } = Lt(a.flatMap((b) => b.values)), c = Math.max(...a.map((b) => b.values.length)), d = e.yFmt ? [n - (n - o) * 0.08, (o + n) / 2, o + (n - o) * 0.08] : [], { padL: l, padB: h } = lt(e, d), g = (b) => l + b * (t - l - F) / Math.max(c - 1, 1), f = (b) => i - h - (b - o) / (n - o) * (i - h - F), _ = d.map(
    (b) => w`
      <line x1=${l} x2=${t - F} y1=${f(b)} y2=${f(b)}
        stroke=${de} stroke-width="1" stroke-dasharray="2 3"/>
      <text class="axis" x=${l - 5} y=${f(b)} text-anchor="end"
        dominant-baseline="middle">${e.yFmt(b)}</text>`
  ), k = (e.xMarks ?? []).map(
    (b) => w`
      ${b.line ? w`<line x1=${g(b.i)} x2=${g(b.i)} y1=${F} y2=${i - h}
              stroke=${de} stroke-width="1"/>` : p}
      ${b.label ? w`<text class="axis" x=${g(b.i)} y=${i - 3} text-anchor="middle">${b.label}</text>` : p}`
  ), $ = a.map((b) => {
    const v = b.values.map((y, A) => ({ x: g(A), y: f(y), ok: Number.isFinite(y) })).filter((y) => y.ok);
    if (!v.length) return p;
    let m = `M ${v[0].x} ${v[0].y}`;
    for (let y = 1; y < v.length; y++) {
      const A = (v[y - 1].x + v[y].x) / 2;
      m += ` C ${A} ${v[y - 1].y}, ${A} ${v[y].y}, ${v[y].x} ${v[y].y}`;
    }
    return w`
      <path d=${m} fill="none" stroke=${b.color} stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
      ${s ? v.map(
      (y) => w`<circle cx=${y.x} cy=${y.y} r="3.1" fill="var(--hc-dot-fill)"
                stroke=${b.color} stroke-width="2"/>`
    ) : p}
    `;
  });
  return u`<svg class="chart" viewBox="0 0 ${t} ${i}" aria-hidden="true">
    ${_}${k}${$}
  </svg>`;
}
function Ze(r, e, t, i = {}) {
  const s = i.w ?? nt, a = i.h ?? ct;
  if (!r.some((m) => Number.isFinite(m) && m > 0)) return p;
  const o = r.map((m) => Number.isFinite(m) && m > 0 ? m : 0), n = Math.max(...o, t ?? 0) || 1, c = o.length, d = i.yFmt ? [n, n / 2] : [], { padL: l, padB: h } = lt(i, d), g = (s - l - F) / c, f = Math.min(g * 0.55, 14), _ = (m) => m / n * (a - h - F), k = d.map(
    (m) => w`
      <line x1=${l} x2=${s - F} y1=${a - h - _(m)} y2=${a - h - _(m)}
        stroke=${de} stroke-width="1" stroke-dasharray="2 3"/>
      <text class="axis" x=${l - 5} y=${a - h - _(m)} text-anchor="end"
        dominant-baseline="middle">${i.yFmt(m)}</text>`
  ), $ = (i.xMarks ?? []).map((m) => {
    const y = l + m.i * g + g / 2;
    return w`
      ${m.line ? w`<line x1=${y} x2=${y} y1=${F} y2=${a - h}
              stroke=${de} stroke-width="1"/>` : p}
      ${m.label ? w`<text class="axis" x=${y} y=${a - 3} text-anchor="middle">${m.label}</text>` : p}`;
  }), b = o.map((m, y) => {
    const A = Math.max(_(m), m > 0 ? 3 : 1.5), C = l + y * g + (g - f) / 2;
    return w`<rect x=${C} y=${a - h - A} width=${f} height=${A}
      rx=${Math.min(f / 2, 4)} fill=${e} opacity=${m > 0 ? 1 : 0.25}/>`;
  }), v = Number.isFinite(t) ? w`<line x1=${l} x2=${s - F} y1=${a - h - _(t)} y2=${a - h - _(t)}
        stroke=${e} stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>` : p;
  return u`<svg class="chart" viewBox="0 0 ${s} ${a}" aria-hidden="true">
    ${k}${$}${v}${b}
  </svg>`;
}
const Xe = [
  "var(--amber-color, #FFC107)",
  "var(--purple-color, #9C27B0)",
  "var(--pink-color, #E91E63)"
], Ht = "color-mix(in srgb, var(--primary-text-color) 16%, transparent)";
function Bt(r, e, t) {
  const i = (o) => Math.abs(Math.sin(o * 127.1) * 43758.5453 % 1), s = (o) => {
    if (!(t != null && t.length))
      return Xe[Math.floor(i(o) * Xe.length)];
    const n = i(o);
    let c = 0;
    for (const d of t)
      if (c += d.share, n <= c) return d.color;
    return t[t.length - 1].color;
  }, a = [];
  for (let o = 0; o < 2; o++) {
    const n = o === 0 ? 74 : 88, c = o === 0 ? 26 : 32;
    for (let d = 0; d < c; d++) {
      const l = d / c, h = l * Math.PI * 2 - Math.PI / 2 + i(d + o * 100) * 0.12, g = n + (i(d * 3 + o * 7) - 0.5) * 6, f = 2.4 + i(d * 7 + o * 13) * 2.4, _ = l < e ? s(d * 11 + o * 29) : Ht;
      a.push(
        w`<circle cx=${100 + Math.cos(h) * g} cy=${100 + Math.sin(h) * g}
          r=${f} fill=${_} opacity="0.75"/>`
      );
    }
  }
  return u`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="62" fill="color-mix(in srgb, ${r} 10%, transparent)" />
    ${a}
  </svg>`;
}
function Ee(r, e, t, i) {
  const s = 2 * Math.PI * r;
  return w`<circle cx="100" cy="100" r=${r} fill="none" stroke=${i}
    stroke-width=${e} stroke-linecap="round"
    stroke-dasharray="${s * Math.max(t, 0.02)} ${s}"
    transform="rotate(-90 100 100)"/>`;
}
function ve(r, e, t = 10) {
  return u`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r=${82} fill="none" stroke=${r} opacity="0.16"
      stroke-width=${t}/>
    ${Ee(82, t, e, r)}
  </svg>`;
}
function Ut(r, e, t) {
  const a = 2 * Math.PI * 78, o = `${a * Math.max(e, 0.02)} ${a}`, n = 78 + 13 * 0.27, c = 2 * Math.PI * n, d = 0.18 + e * 0.5, l = e >= 0.95;
  return u`<svg class="scorering" viewBox="-14 -14 228 228" aria-hidden="true">
    <defs>
      <filter id="hc-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <filter id="hc-blur-heavy" x="-90%" y="-90%" width="280%" height="280%">
        <feGaussianBlur stdDeviation="15" />
      </filter>
    </defs>
    ${l ? w`<circle cx="100" cy="100" r="93" fill="none" stroke=${r}
          stroke-width="2.5" opacity="0.4" filter="url(#hc-glow)" class="glowpulse"/>` : p}
    <circle cx="100" cy="100" r=${78} fill="none" stroke=${r}
      stroke-width=${20} stroke-linecap="round" stroke-dasharray=${o}
      transform="rotate(-90 100 100)" filter="url(#hc-glow)" opacity=${d}
      class=${l ? "glowpulse" : ""}/>
    ${// sub-goals melt into a heavily blurred color wash behind the number
  t != null && t.length ? t.map((h, g) => {
    const f = g / t.length * 2 * Math.PI - Math.PI / 2;
    return w`<circle cx=${100 + Math.cos(f) * 24} cy=${100 + Math.sin(f) * 24}
              r=${16 + h.share * 26} fill=${h.color}
              filter="url(#hc-blur-heavy)" opacity="0.5"/>`;
  }) : p}
    <circle cx="100" cy="100" r=${78} fill="none" stroke-width=${13}
      stroke="color-mix(in srgb, ${r} 13%, transparent)"/>
    <circle cx="100" cy="100" r=${78 + 13 / 2 - 0.6} fill="none" stroke-width="1"
      stroke="color-mix(in srgb, #fff 30%, transparent)"/>
    <circle cx="100" cy="100" r=${78 - 13 / 2 + 0.6} fill="none" stroke-width="1"
      stroke="color-mix(in srgb, #fff 12%, transparent)"/>
    ${Ee(78, 13, e, r)}
    <circle cx="100" cy="100" r=${n} fill="none" stroke="rgba(255, 255, 255, 0.55)"
      stroke-width="1.6" stroke-linecap="round"
      stroke-dasharray="${c * Math.max(e, 0.02)} ${c}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}
function jt(r, e, t) {
  const i = [];
  for (let o = 0; o <= 144; o++) {
    const n = o / 144 * 2 * Math.PI, c = 72 + 7 * Math.cos(12 * n);
    i.push(
      `${o ? "L" : "M"} ${(100 + Math.cos(n) * c).toFixed(1)} ${(100 + Math.sin(n) * c).toFixed(1)}`
    );
  }
  const a = 92;
  return u`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <path d="${i.join(" ")} Z" fill="color-mix(in srgb, ${r} 22%, transparent)"/>
    <circle cx="100" cy="100" r=${a} fill="none" stroke=${e} opacity="0.18"
      stroke-width="5"/>
    ${Ee(a, 5, t, e)}
  </svg>`;
}
function It(r, e, t) {
  const a = 2 * Math.PI * 80, o = t.map((l) => {
    const h = Math.max(0, l.to - (l.from - 1)), g = a * h / e, f = a * (l.from - 1) / e;
    return w`<circle cx="100" cy="100" r=${80} fill="none" stroke=${l.color}
      stroke-width=${15} stroke-linecap="butt"
      stroke-dasharray="${Math.max(g - 1.5, 0.1)} ${a}" stroke-dashoffset=${-f}
      transform="rotate(-90 100 100)"/>`;
  }), n = (r - 0.5) / e * 2 * Math.PI - Math.PI / 2, c = 100 + Math.cos(n) * 80, d = 100 + Math.sin(n) * 80;
  return u`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r=${80} fill="none"
      stroke="color-mix(in srgb, var(--primary-text-color) 8%, transparent)"
      stroke-width=${15}/>
    ${o}
    <circle cx=${c} cy=${d} r="10" fill="var(--hc-card-bg)"
      stroke="var(--primary-text-color)" stroke-width="2.5"/>
    <circle cx=${c} cy=${d} r="3.5" fill="var(--primary-text-color)"/>
  </svg>`;
}
function Gt(r, e, t, i, s) {
  return r === "material" ? jt(e, t, i) : r === "bubble" ? ve(t, i, 15) : r === "mirror" ? ve("#fff", i, 7) : r === "glass" ? Ut(t, i, s) : r === "default" ? ve(t, i, 10) : Bt(t, i, s);
}
var Vt = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, pe = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Wt(e, t) : e, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (s = (i ? o(e, t, s) : o(s)) || s);
  return i && s && Vt(e, t, s), s;
};
const Kt = Object.keys(H), qt = ["body_composition", "nutrition"], xe = {
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
    fs_svg: "Drawn (SVG)",
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
    fs_svg: "Gezeichnet (SVG)",
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
let Y = class extends W {
  constructor() {
    super(...arguments), this._expanded = -1;
  }
  setConfig(r) {
    this._config = r;
  }
  _label(r) {
    return (xe[U(this.hass)] ?? xe.en)[r] ?? xe.en[r] ?? r;
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
    const e = r.type ?? "custom", t = (a, o) => a.map((n) => ({ value: n, label: this._label(`${o}_${n}`) })), i = !r.entities || r.entities.every((a) => typeof a == "string"), s = (a, o, n) => ({
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
                options: Kt.map((a) => ({ value: a, label: x(this.hass, a) }))
              }
            }
          },
          { name: "name", selector: { text: {} } }
        ]
      },
      { name: "entity", selector: { entity: {} } },
      ...e === "blood_pressure" ? [{ name: "entity2", selector: { entity: {} } }] : [],
      ...qt.includes(e) && i ? [{ name: "entities", selector: { entity: { multiple: !0 } } }] : [],
      ...e === "score" && (!r.breakdown || r.breakdown.every((a) => typeof a == "string")) ? [{ name: "breakdown", selector: { entity: { multiple: !0 } } }] : [],
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
                  options: je.map((a) => ({ value: a, label: a }))
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
        { name: "label", selector: { text: {} } },
        { name: "expanded", selector: { boolean: {} } }
      ]),
      s("sec_goal", "mdi:flag-checkered", [
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
        { name: "secondary", selector: { entity: { multiple: !0 } } },
        { name: "score_entity", selector: { entity: {} } }
      ]),
      ...e === "body" ? [
        s("sec_body", "mdi:human", [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "gender",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: t(["female", "male"], "gender")
                  }
                }
              },
              {
                name: "figure_style",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: t(
                      ["svg", "flat", "glass", "mannequin", "pixar"],
                      "fs"
                    )
                  }
                }
              },
              {
                name: "body_crop",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: t(["full", "upper"], "bc")
                  }
                }
              },
              {
                name: "figure_zoom",
                selector: {
                  number: { min: 0.5, max: 3, step: 0.1, mode: "slider" }
                }
              },
              {
                name: "figure_offset_y",
                selector: {
                  number: { min: -40, max: 40, step: 1, mode: "slider" }
                }
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
          { name: "fade_figure", selector: { boolean: {} } }
        ])
      ] : [],
      ...e === "cycle" ? [
        s("sec_cycle", "mdi:calendar-heart", [
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
        ])
      ] : [],
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
    var o, n, c, d;
    const t = r.type ?? "custom", i = H[t] ?? H.custom, s = this._expanded === e, a = this._config.metrics.length;
    return u`
      <div class="metric ${s ? "open" : ""}">
        <div class="metric-head" @click=${() => this._expanded = s ? -1 : e}>
          <span
            class="chip"
            style="--c:${D(r.color) ?? D(i.color)}"
          >
            <ha-icon .icon=${r.icon ?? i.icon}></ha-icon>
          </span>
          <span class="metric-title">
            ${r.name ?? x(this.hass, t)}
            <span class="metric-entity">${r.entity ?? ""}</span>
          </span>
          <button
            class="icon-btn"
            .disabled=${e === 0}
            title="↑"
            @click=${(l) => this._move(l, e, -1)}
          >
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </button>
          <button
            class="icon-btn"
            .disabled=${e === a - 1}
            title="↓"
            @click=${(l) => this._move(l, e, 1)}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <button class="icon-btn danger" @click=${(l) => this._remove(l, e)}>
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
      phases_deep: (o = r.phases) == null ? void 0 : o.deep,
      phases_light: (n = r.phases) == null ? void 0 : n.light,
      phases_rem: (c = r.phases) == null ? void 0 : c.rem,
      phases_awake: (d = r.phases) == null ? void 0 : d.awake
    }}
                .schema=${this._metricSchema(r)}
                .computeLabel=${(l) => this._label(l.name)}
                @value-changed=${(l) => this._metricChanged(l, e)}
              ></ha-form>
              ${t === "body" ? this._renderAnchorEditor(r, e) : p}
            </div>` : p}
      </div>
    `;
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
                options: je.map((r) => ({ value: r, label: r }))
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
  _renderAnchorEditor(r, e) {
    const t = r.anchors ?? [];
    return u`
      <div class="anchor-editor">
        <div class="anchor-editor-title">${this._label("anchors")}</div>
        ${t.map(
      (i, s) => u`
            <div class="anchor-row">
              <ha-form
                .hass=${this.hass}
                .data=${{ ...i, anchor_x: i.x, anchor_y: i.y }}
                .schema=${this._anchorSchema()}
                .computeLabel=${(a) => this._label(a.name)}
                @value-changed=${(a) => this._anchorChanged(a, e, s)}
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
  _anchorChanged(r, e, t) {
    if (r.stopPropagation(), !this._config) return;
    const i = { ...r.detail.value }, s = {};
    i.entity && (s.entity = i.entity), i.entity2 && (s.entity2 = i.entity2), i.name && (s.name = i.name), i.color && (s.color = i.color), i.anchor_x !== void 0 && i.anchor_x !== null && (s.x = i.anchor_x), i.anchor_y !== void 0 && i.anchor_y !== null && (s.y = i.anchor_y), i.dot && (s.dot = i.dot);
    const a = [...this._config.metrics], o = [...a[e].anchors ?? []];
    o[t] = s, a[e] = { ...a[e], anchors: o }, this._emit({ ...this._config, metrics: a });
  }
  _addAnchor(r) {
    if (!this._config) return;
    const e = [...this._config.metrics], t = [...e[r].anchors ?? [], { entity: "", x: 50, y: 40 }];
    e[r] = { ...e[r], anchors: t }, this._emit({ ...this._config, metrics: e });
  }
  _removeAnchor(r, e) {
    if (!this._config) return;
    const t = [...this._config.metrics], i = (t[r].anchors ?? []).filter((s, a) => a !== e);
    t[r] = { ...t[r], anchors: i }, this._emit({ ...this._config, metrics: t });
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
    for (const a of ["deep", "light", "rem", "awake"]) {
      const o = t[`phases_${a}`];
      delete t[`phases_${a}`], typeof o == "string" && o && (i[a] = o);
    }
    Object.keys(i).length ? t.phases = i : delete t.phases;
    for (const a of ["goal", "start"]) {
      const o = t[`${a}_entity`];
      delete t[`${a}_entity`], typeof o == "string" && o && (t[a] = o);
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
Y.styles = et`
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
pe([
  Me({ attribute: !1 })
], Y.prototype, "hass", 2);
pe([
  R()
], Y.prototype, "_config", 2);
pe([
  R()
], Y.prototype, "_expanded", 2);
Y = pe([
  at("health-card-editor")
], Y);
var Yt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, z = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Zt(e, t) : e, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (s = (i ? o(e, t, s) : o(s)) || s);
  return i && s && Yt(e, t, s), s;
};
const Xt = "0.11.2", Jt = 5 * 60 * 1e3, Qt = 15 * 60 * 1e3, er = ["default", "withings", "glass", "material", "bubble", "mirror"], ae = [
  { key: "day", kind: "hour", count: 24 },
  { key: "week", kind: "day", count: 7 },
  { key: "month", kind: "day", count: 30 },
  { key: "quarter", kind: "day", count: 90 },
  { key: "year", kind: "day", count: 365 },
  { key: "max", kind: "month", count: 60 }
];
let E = class extends W {
  constructor() {
    super(...arguments), this._history = {}, this._popup = null, this._popupRange = null, this._tileRanges = {}, this._statsCache = {}, this._statsCacheTime = {}, this._statsFetching = /* @__PURE__ */ new Set(), this._onKeydown = (r) => {
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
    const e = (a) => {
      var o;
      return (o = Object.values(r.states).find(
        (n) => n.entity_id.startsWith("sensor.") && n.attributes.device_class === a
      )) == null ? void 0 : o.entity_id;
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
    var e;
    super.updated(r), (r.has("hass") || r.has("_config")) && this._maybeFetch(), this._syncStats(), (r.has("_popup") || r.has("_popupRange") || r.has("_tileRanges") || r.has("_statsCache")) && ((e = this.renderRoot) == null || e.querySelectorAll(".chart-scroll").forEach((t) => t.scrollLeft = t.scrollWidth));
  }
  _activeRange() {
    return ae.find((r) => r.key === this._popupRange) ?? null;
  }
  /** Long-term statistics for every active range (popup + expanded tiles). */
  _syncStats() {
    if (!this.hass || !this._config) return;
    const r = [];
    if (this._popup !== null) {
      const e = this._activeRange();
      e && r.push(e);
    }
    this._config.metrics.forEach((e, t) => {
      if (!e.expanded) return;
      const i = ae.find((s) => s.key === this._tileRanges[t]);
      i && r.push(i);
    });
    for (const e of r) {
      const t = e.kind === "month" ? "month" : e.kind === "day" && e.count > 10 ? "day" : null;
      t && this._ensureStats(t, e.count);
    }
  }
  _ensureStats(r, e) {
    const t = `${r}|${e}`;
    if (this._statsCache[t] && Date.now() - (this._statsCacheTime[t] ?? 0) < 18e5 || this._statsFetching.has(t)) return;
    const s = this._watchedEntities();
    s.length && (this._statsFetching.add(t), zt(this.hass, s, e, r).then((a) => {
      this._statsCacheTime[t] = Date.now(), this._statsCache = { ...this._statsCache, [t]: a };
    }).catch((a) => console.warn("health-card: statistics fetch failed", a)).finally(() => {
      this._statsFetching.delete(t);
    }));
  }
  /** Buckets for an entity: hourly/daily from history, long ranges from LTS. */
  _bucketsFor(r, e, t, i) {
    var s, a;
    if (e === "hour")
      return Ot(this._history[r] ?? [], t, i);
    if (e === "month") {
      const o = (s = this._statsCache[`month|${t}`]) == null ? void 0 : s[r];
      return o != null && o.length ? Ke(o, t, i, "month") : new Array(t).fill(NaN);
    }
    if (t > 10) {
      const o = (a = this._statsCache[`day|${t}`]) == null ? void 0 : a[r];
      if (o != null && o.length) return Ke(o, t, i, "day");
    }
    return Rt(this._history[r] ?? [], t, i);
  }
  _watchedEntities() {
    var e;
    const r = /* @__PURE__ */ new Set();
    for (const t of ((e = this._config) == null ? void 0 : e.metrics) ?? []) {
      for (const i of this._series(t)) i.entity && r.add(i.entity);
      for (const i of t.secondary ?? []) r.add(i);
      for (const i of Object.values(t.phases ?? {})) i && r.add(i);
      t.score_entity && r.add(t.score_entity), t.sleep_entity && r.add(t.sleep_entity), t.temperature_entity && r.add(t.temperature_entity);
      for (const i of t.anchors ?? [])
        r.add(i.entity), i.entity2 && r.add(i.entity2);
      for (const i of t.breakdown ?? []) r.add(typeof i == "string" ? i : i.entity);
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
      this._popupRange = r.type === "heart_rate" ? "day" : r.type === "sleep" && r.score_entity ? "month" : null, this._popup = e;
    }
  }
  _maybeFetch() {
    if (!this.hass || !this._config || this._fetching) return;
    const r = this._watchedEntities();
    if (!r.length) return;
    const e = Math.max(
      ...this._config.metrics.map((o) => o.days ?? this._config.days ?? 7)
    ), t = `${e}|${r.join(",")}`, i = r.map((o) => {
      var n;
      return ((n = this.hass.states[o]) == null ? void 0 : n.last_updated) ?? "";
    }).join("|"), s = Date.now();
    (t !== this._cfgSig || s - this._lastFetch > Qt || i !== this._stateSig && s - this._lastFetch > Jt) && (this._fetching = !0, this._cfgSig = t, this._stateSig = i, Tt(this.hass, r, e).then((o) => {
      this._history = o, this._lastFetch = Date.now();
    }).catch((o) => console.warn("health-card: history fetch failed", o)).finally(() => {
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
    return er.includes(r) ? r : "withings";
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
        ${r.metrics.map((s, a) => this._renderMetric(s, a))}
      </div>
    `;
    return u`
      ${r.background === !1 ? u`<div class="${t} nobg">${i}</div>` : u`<ha-card class=${t}>${i}</ha-card>`}
      ${this._renderPopup()}
    `;
  }
  /** Builds the shared render context for a metric (used by tile and popup). */
  _ctx(r, e) {
    var m, y, A;
    const t = r.type && H[r.type] ? r.type : "custom", i = H[t], s = D(r.color) ?? D(i.color), a = r.name ?? x(this.hass, t), o = r.icon ?? i.icon, n = Object.values(r.phases ?? {}).filter(Boolean);
    let c = this._series(r);
    !c.length && t === "sleep" && n.length && (c = [{ entity: n[0] }]);
    const d = (m = c[0]) != null && m.entity ? this.hass.states[c[0].entity] : void 0, l = (e == null ? void 0 : e.kind) ?? "day", h = Math.max(1, (e == null ? void 0 : e.count) ?? r.days ?? ((y = this._config) == null ? void 0 : y.days) ?? 7), g = r.graph ?? i.graph, f = r.aggregate ?? i.aggregate, _ = r.trend ?? i.trend, k = r.precision ?? i.precision, $ = r.unit ?? ((A = c[0]) == null ? void 0 : A.unit) ?? (d == null ? void 0 : d.attributes.unit_of_measurement) ?? i.unit ?? "", b = c.map((C, M) => {
      const N = this._bucketsFor(C.entity, l, h, f);
      return {
        ...C,
        colorResolved: D(C.color) ?? (M === 0 ? s : D(se[(M - 1) % se.length])),
        buckets: N,
        filled: qe(N)
      };
    });
    let v;
    if (t === "sleep" && !r.entity && r.phases && b.length) {
      const C = ["deep", "light", "rem"].map((M) => r.phases[M]).filter(Boolean);
      if (C.length) {
        const M = C.map(
          (I) => this._bucketsFor(I, l, h, f)
        ), N = Array.from({ length: h }, (I, ue) => {
          const Fe = M.map((me) => me[ue]).filter(Number.isFinite);
          return Fe.length ? Fe.reduce((me, dt) => me + dt, 0) : NaN;
        });
        b[0] = { ...b[0], buckets: N, filled: qe(N) };
        const Ce = C.map((I) => this._numeric(this.hass.states[I])).filter(Number.isFinite);
        Ce.length && (v = Ce.reduce((I, ue) => I + ue, 0));
      }
    }
    return {
      m: r,
      type: t,
      preset: i,
      accent: s,
      name: a,
      icon: o,
      series: c,
      primaryState: d,
      days: h,
      kind: l,
      graph: g,
      aggregate: f,
      trendMode: _,
      precision: k,
      unit: $,
      data: b,
      valueOverride: v,
      goalType: r.goal_type ?? i.goalType ?? "atleast",
      multi: !!r.entities && c.length > 1
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
            ${(n = t.series[0]) != null && n.entity ? u`${x(this.hass, "entity_missing")}: ${t.series[0].entity}` : x(this.hass, "no_data")}
          </div>
        </div>
      `;
    if (t.type === "score") return this._renderScore(t, e);
    if (t.type === "body") return this._renderBody(t, e);
    if (t.type === "cycle") return this._renderCycle(t, e);
    if (r.expanded) {
      const d = ae.find((g) => g.key === this._tileRanges[e]) ?? null, l = d ? this._ctx(r, d) : t, h = this._tileRanges[e] ?? (l.days === 7 && l.kind === "day" ? "week" : "");
      return u`
        <div
          class="metric expanded ${(r.tap_action ?? "popup") === "none" ? "noclick" : ""}"
          style="--hc-accent:${t.accent}"
          @click=${() => this._handleTap(r, e, t.series[0].entity)}
        >
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
            <div class="name">${t.name}</div>
            ${this._renderScoreBadge(r)}
            <div class="time">
              ${G(this.hass, t.primaryState.last_updated)}
            </div>
          </div>
          <div class="exp-value">
            ${this._renderValue(
        r,
        l.type,
        l.data,
        l.primaryState,
        l.unit,
        l.precision,
        l.preset.duration,
        l.valueOverride
      )}
            ${this._renderStatus(
        r,
        l.data[0],
        l.primaryState,
        l.unit,
        l.precision,
        l.trendMode,
        l.goalType,
        l.valueOverride
      )}
          </div>
          ${this._renderDetails(r, l, h, (g) => {
        this._tileRanges = { ...this._tileRanges, [e]: g };
      })}
        </div>
      `;
    }
    const i = !t.multi || !!r.label, s = t.multi && t.graph !== "progress", a = !t.multi, o = t.multi && t.graph === "progress";
    return u`
      <div
        class="metric ${(r.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${t.accent}"
        @click=${() => this._handleTap(r, e, t.series[0].entity)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${t.icon}></ha-icon></div>
          <div class="name">${t.name}</div>
          ${this._renderScoreBadge(r)}
          <div class="time">
            ${G(this.hass, t.primaryState.last_updated)}
          </div>
        </div>
        <div class="body ${o ? "stack" : ""}">
          ${i || s || a || (c = r.secondary) != null && c.length ? u`<div class="info">
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
                ${a ? this._renderStatus(
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
  /** Resolved breakdown categories for a score metric (sub-goals). */
  _breakdown(r) {
    return (r.breakdown ?? []).map((e, t) => {
      const i = typeof e == "string" ? { entity: e } : e, s = this.hass.states[i.entity];
      return {
        ...i,
        state: s,
        value: this._numeric(s),
        name: i.name ?? (s == null ? void 0 : s.attributes.friendly_name) ?? i.entity,
        colorResolved: D(i.color) ?? D(Ie[t % Ie.length])
      };
    }).filter((e) => e.state);
  }
  _renderScore(r, e) {
    const t = r.m, i = r.primaryState, s = this._numeric(i, t.attribute), a = t.max ?? 100, o = this._breakdown(t), n = o.filter((l) => Number.isFinite(l.value) && l.value > 0), c = n.reduce((l, h) => l + h.value, 0), d = c > 0 ? n.map((l) => ({ color: l.colorResolved, share: l.value / c })) : void 0;
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
            ${G(this.hass, i.last_updated)}
          </div>
        </div>
        <div class="scorewrap">
          ${Gt(
      this._cardStyle(),
      r.accent,
      this._scoreColor(s, a),
      Math.max(0, Math.min(Number.isFinite(s) ? s / a : 0, 1)),
      d
    )}
          <div class="scoreinner">
            <div class="scorenum">${S(this.hass, s, t.precision ?? 0)}</div>
            <div class="scoremax">${x(this.hass, "of")} ${a}</div>
          </div>
        </div>
        ${o.length ? u`<div class="score-bars">
              ${o.map((l) => {
      const h = Number.isFinite(l.value) ? Math.max(0, Math.min(l.value / a * 100, 100)) : 0;
      return u`<div class="sbar">
                  <span class="sbar-name">${l.name}</span>
                  <div class="sbar-track">
                    <div
                      class="sbar-fill"
                      style="width:${h}%;background:${l.colorResolved}"
                    ></div>
                  </div>
                  <span class="sbar-val">
                    ${Number.isFinite(l.value) ? S(this.hass, l.value, 0) : "–"}
                  </span>
                </div>`;
    })}
            </div>` : p}
        <div class="score-status">
          ${this._renderStatus(t, r.data[0], i, "", 0, t.trend ?? "up_good", "atleast")}
        </div>
      </div>
    `;
  }
  /** Menstrual cycle ring with phase arcs, current-day marker and phase label. */
  _renderCycle(r, e) {
    var y;
    const t = r.m, i = r.primaryState, s = Math.max(2, Math.round(t.cycle_length ?? 28)), a = Math.max(1, Math.round(t.period_length ?? 5)), o = Math.round(t.ovulation_day ?? s - 14), n = this._numeric(i, t.attribute), c = Number.isFinite(n) ? Math.max(1, Math.min(Math.round(n), s)) : 1, d = Math.max(a + 1, o - 4), l = Math.min(s, o + 1), h = "var(--red-color, #e53935)", g = "var(--teal-color, #009688)", f = "color-mix(in srgb, var(--purple-color, #9C27B0) 35%, transparent)", _ = "color-mix(in srgb, var(--amber-color, #FFC107) 45%, transparent)", k = [{ from: 1, to: a, color: h }];
    d > a + 1 && k.push({ from: a + 1, to: d - 1, color: f }), k.push({ from: d, to: l, color: g }), l < s && k.push({ from: l + 1, to: s, color: _ });
    let $;
    c <= a ? $ = "menstruation" : c === o ? $ = "ovulation" : c >= d && c <= l ? $ = "fertile" : c < d ? $ = "follicular" : $ = "luteal";
    const b = t.phase_entity ? ((y = this.hass.states[t.phase_entity]) == null ? void 0 : y.state) ?? x(this.hass, `phase_${$}`) : x(this.hass, `phase_${$}`), v = (s - c + 1) % s || s, m = c >= s ? x(this.hass, "period_today") : x(this.hass, "period_in").replace("{n}", String(v));
    return u`
      <div
        class="metric cycle-metric ${(t.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${r.accent}"
        @click=${() => this._handleTap(t, e, i.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${r.icon}></ha-icon></div>
          <div class="name">${r.name}</div>
          <div class="time">
            ${G(this.hass, i.last_updated)}
          </div>
        </div>
        <div class="scorewrap">
          ${It(c, s, k)}
          <div class="scoreinner">
            <div class="scoremax">${x(this.hass, "cycle_day")}</div>
            <div class="scorenum">${S(this.hass, c, 0)}</div>
            <div class="scoremax">${x(this.hass, "cycle_of")} ${s}</div>
          </div>
        </div>
        <div class="cycle-phase" style="color:${r.accent}">${b}</div>
        <div class="cycle-note">${m}</div>
      </div>
    `;
  }
  /** Avatar tile: stylized figure with state-driven effects and anchors. */
  _renderBody(r, e) {
    const t = r.m, i = r.primaryState, s = this._numeric(i, t.attribute), a = this._resolveGoal(t.goal);
    let o = 0;
    Number.isFinite(s) && Number.isFinite(a) && a > 0 && (o = Math.max(-0.35, Math.min((s / a - 1) * 2.5, 1.1)));
    const n = !!t.preview_effects, c = t.sleep_entity ? this._numeric(this.hass.states[t.sleep_entity]) : NaN, d = t.tired_below ?? 60;
    let l = Number.isFinite(c) && c < d ? Math.min((d - c) / 45 + 0.15, 1) : 0;
    const h = t.temperature_entity ? this._numeric(this.hass.states[t.temperature_entity]) : NaN, g = t.fever_from ?? 37.8;
    let f = Number.isFinite(h) && h >= g ? Math.min((h - g) / 2 + 0.4, 1) : 0;
    n && (l = Math.max(l, 0.85), f = Math.max(f, 0.75));
    const _ = t.score_entity ? this._numeric(this.hass.states[t.score_entity]) : NaN, k = t.max ?? 100, $ = Number.isFinite(_) ? 0.25 + _ / k * 0.55 : 0, b = Number.isFinite(_) ? this._scoreColor(_, k) : "transparent", v = (t.anchors ?? []).filter((M) => this.hass.states[M.entity]), m = v.find((M) => {
      var N;
      return M.entity2 && ((N = M.position) == null ? void 0 : N.startsWith("arm"));
    }), y = (m == null ? void 0 : m.position) === "arm-left" ? "left" : (m == null ? void 0 : m.position) === "arm-right" ? "right" : void 0, A = !!this._bodyImage(t, o), C = t.fade_figure !== !1;
    return u`
      <div
        class="metric body-metric ${(t.tap_action ?? "popup") === "none" ? "noclick" : ""}"
        style="--hc-accent:${r.accent}"
        @click=${() => this._handleTap(t, e, i.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${r.icon}></ha-icon></div>
          <div class="name">${r.name}</div>
          ${this._renderScoreBadge(t)}
          <div class="time">
            ${G(this.hass, i.last_updated)}
          </div>
        </div>
        <div class="bodywrap">
          ${$ > 0 && A ? u`<div
                class="body-glow"
                style="--hc-glow:${b};opacity:${$}"
              ></div>` : p}
          ${f > 0 ? u`<div
                class="body-fever"
                style="left:${t.fever_x ?? 50}%;top:${t.fever_y ?? 14}%;opacity:${f}"
              ></div>` : p}
          ${l > 0 ? u`<div
                class="body-tired"
                style="left:${t.tired_x ?? 50}%;top:${t.tired_y ?? 15}%;opacity:${0.25 + l * 0.6}"
              >
                <span></span><span></span>
              </div>` : p}
          <div
            class="bodyframe ${t.body_crop === "upper" ? "crop-upper" : ""} ${C ? "fade" : ""}"
            style="--hc-frame-ar:${this._frameAspect(t)}"
          >
            <div
              class="bodystage"
              style="--hc-zoom:${t.figure_zoom ?? 1};--hc-oy:${t.figure_offset_y ?? (A ? -3 : 0)}%"
            >
              ${A ? u`<img class="bodyimg" src=${this._bodyImage(t, o)} alt="" />` : Pt({
      gender: t.gender ?? "female",
      shape: o,
      glow: $,
      glowColor: b,
      cuff: y
    })}
            </div>
          </div>
          ${v.map((M, N) => this._renderAnchor(M, N, t))}
        </div>
        <div class="body-foot">
          ${this._renderValue(t, r.type, r.data, i, r.unit, r.precision, !1)}
          ${this._renderStatus(
      t,
      r.data[0],
      i,
      r.unit,
      r.precision,
      r.trendMode,
      r.goalType
    )}
        </div>
      </div>
    `;
  }
  /**
   * Effective figure style. Default is mannequin, but the liquid-glass card
   * style defaults to the matching glass figures. `svg` draws the silhouette.
   */
  _figStyle(r) {
    return r.figure_style ? r.figure_style : this._cardStyle() === "glass" ? "glass" : "mannequin";
  }
  /** Figure image URL for the current weight state, if any is configured. */
  _bodyImage(r, e) {
    const t = e < -0.12 ? "slim" : e < 0.35 ? "regular" : "full", i = this._figStyle(r);
    if (i !== "svg") {
      const a = r.gender ?? "female", o = t === "slim" ? "underweight" : t === "full" ? "overweight" : "normal";
      return `${this._figureBase(r)}${i}/${a}_${o}.png`;
    }
    return r.images ? (t === "slim" ? r.images.slim : t === "full" ? r.images.full : r.images.regular) ?? r.images.regular ?? r.images.slim ?? r.images.full : void 0;
  }
  /**
   * Frame aspect ratio (width/height). The frame is fixed-height so zooming
   * (a transform on the inner stage) magnifies in place instead of growing
   * the card. Full fits the whole portrait figure; upper is a wide band.
   */
  _frameAspect(r) {
    return r.body_crop === "upper" ? 1.15 : 0.68;
  }
  /** Base URL for bundled figure images (served next to the card by default). */
  _figureBase(r) {
    if (r.figure_base) return r.figure_base.endsWith("/") ? r.figure_base : `${r.figure_base}/`;
    try {
      return new URL("figures/", import.meta.url).href;
    } catch {
      return "/figures/";
    }
  }
  _renderAnchor(r, e, t) {
    const i = E.ANCHOR_POS[r.position ?? "chest"], s = this.hass.states[r.entity];
    if (!i || !s) return p;
    let a;
    if (r.dot)
      a = r.dot;
    else {
      let g = r.x !== void 0 && !r.position ? r.x >= 50 ? "right" : "left" : i.side;
      r.flip && (g = g === "right" ? "left" : "right"), a = g;
    }
    const o = r.x ?? i.x, n = r.y ?? i.y, c = D(r.color) ?? D(se[e % se.length]), d = this._numeric(s);
    let l;
    if (r.entity2) {
      const g = this._numeric(this.hass.states[r.entity2]);
      l = `${S(this.hass, d, 0)}/${S(this.hass, g, 0)}`;
    } else
      l = Number.isFinite(d) ? X(
        S(this.hass, d),
        s.attributes.unit_of_measurement ?? ""
      ) : s.state;
    const h = t.label_opacity ?? 1;
    return u`<div
      class="anchor dot-${a}"
      style="left:${o}%;top:${n}%;--ac:${c};--hc-label-op:${h}"
    >
      <span class="anchor-dot"></span>
      <div class="anchor-chip">
        <span class="anchor-name">${r.name ?? s.attributes.friendly_name ?? ""}</span>
        <span class="anchor-val">${l}</span>
      </div>
    </div>`;
  }
  /** Traffic-light color for score visuals, driven by the score ratio. */
  _scoreColor(r, e) {
    const t = Number.isFinite(r) ? r / e : 0;
    return t >= 0.75 ? "var(--success-color, #43a047)" : t >= 0.45 ? "var(--warning-color, #fb8c00)" : "var(--error-color, #e53935)";
  }
  /** Traffic-light badge for a metric's score_entity (e.g. sleep score). */
  _renderScoreBadge(r) {
    if (!r.score_entity) return p;
    const e = this._numeric(this.hass.states[r.score_entity]);
    return Number.isFinite(e) ? u`<span class="scorebadge" style="background:${this._scoreColor(e, 100)}">
      ${S(this.hass, e, 0)}
    </span>` : p;
  }
  /** Calendar heatmap: one cell per day, tinted by the score entity's value. */
  _renderScoreCalendar(r, e) {
    const t = U(this.hass) === "de" ? "de-DE" : "en-US", i = /* @__PURE__ */ new Date();
    i.setHours(0, 0, 0, 0), i.setDate(i.getDate() - (e - 1));
    const s = (i.getDay() + 6) % 7, a = new Date(2024, 0, 1), o = Array.from(
      { length: 7 },
      (n, c) => new Date(a.getTime() + c * 864e5).toLocaleDateString(t, {
        weekday: "narrow"
      })
    );
    return u`<div class="cal">
      ${o.map((n) => u`<div class="cal-head">${n}</div>`)}
      ${Array.from({ length: s }, () => u`<div></div>`)}
      ${r.map((n, c) => {
      const d = new Date(i.getTime() + c * 864e5);
      if (!Number.isFinite(n))
        return u`<div class="cal-cell empty">${d.getDate()}</div>`;
      const l = this._scoreColor(n, 100);
      return u`<div
          class="cal-cell"
          title=${Math.round(n)}
          style="background: color-mix(in srgb, ${l} 30%, transparent); color: ${l}"
        >
          ${d.getDate()}
        </div>`;
    })}
    </div>`;
  }
  /** Formats a value the same way the metric's big value is formatted. */
  _fmtMetricValue(r, e) {
    var t;
    if (r.m.duration ?? r.preset.duration) {
      const i = Object.values(r.m.phases ?? {}).map((a) => {
        var o;
        return a ? (o = this.hass.states[a]) == null ? void 0 : o.attributes.unit_of_measurement : void 0;
      }).find(Boolean), s = r.m.unit ?? (r.valueOverride !== void 0 ? i : (t = r.primaryState) == null ? void 0 : t.attributes.unit_of_measurement);
      return oe(e, s);
    }
    return X(S(this.hass, e, r.precision), r.unit);
  }
  /** Axis marks for the popup chart: gridlines and labels per range kind. */
  _xMarks(r, e) {
    const t = U(this.hass) === "de" ? "de-DE" : "en-US", i = [];
    if (r === "hour") {
      const n = /* @__PURE__ */ new Date();
      n.setMinutes(0, 0, 0);
      const c = n.getTime() - (e - 1) * 36e5;
      for (let d = 0; d < e; d++) {
        const l = new Date(c + d * 36e5).getHours();
        l % 6 === 0 && i.push({ i: d, label: String(l), line: l === 0 });
      }
      return i;
    }
    if (r === "month") {
      const n = /* @__PURE__ */ new Date();
      for (let c = 0; c < e; c++) {
        const d = new Date(n.getFullYear(), n.getMonth() - (e - 1 - c), 1);
        d.getMonth() === 0 && i.push({ i: c, label: String(d.getFullYear()), line: !0 });
      }
      return i;
    }
    const s = /* @__PURE__ */ new Date();
    if (s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (e - 1)), e <= 14) {
      for (let n = 0; n < e; n++) {
        const c = new Date(s.getTime() + n * 864e5);
        i.push({ i: n, label: c.toLocaleDateString(t, { weekday: "narrow" }) });
      }
      return i;
    }
    let a = 0, o = 0;
    for (let n = 0; n < e; n++) {
      const c = new Date(s.getTime() + n * 864e5);
      e <= 45 ? c.getDay() === 1 && i.push({
        i: n,
        label: a++ % 2 === 0 ? c.toLocaleDateString(t, { day: "numeric", month: "numeric" }) : void 0,
        line: !0
      }) : c.getDate() === 1 && (i.push({
        i: n,
        label: e <= 120 || o % 2 === 0 ? c.toLocaleDateString(t, { month: "short" }) : void 0,
        line: !0
      }), o++);
    }
    return i;
  }
  /** Toothbrush popup: when was brushed — one 24h track per day with dots. */
  _renderEventTimes(r) {
    const e = (this._history[r] ?? []).filter((o) => o.v > 0);
    if (!e.length) return p;
    const t = U(this.hass) === "de" ? "de-DE" : "en-US", i = /* @__PURE__ */ new Date();
    i.setHours(0, 0, 0, 0);
    const s = i.getTime() - 6 * 864e5, a = Array.from({ length: 7 }, (o, n) => {
      const c = s + n * 864e5;
      return {
        date: new Date(c),
        events: e.filter((d) => d.t >= c && d.t < c + 864e5)
      };
    });
    return u`<div class="times">
      <div class="times-title">${x(this.hass, "event_times")}</div>
      ${a.map(
      (o) => u`<div class="times-row">
          <span class="times-day">
            ${o.date.toLocaleDateString(t, { weekday: "short" })}
          </span>
          <div class="times-track">
            ${o.events.map(
        (n) => u`<span
                class="times-dot"
                style="left:${(n.t - o.date.getTime()) / 864e5 * 100}%"
                title=${new Date(n.t).toLocaleTimeString(t, {
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
  /**
   * Detail view shared by the popup and expanded tiles: period picker, big
   * chart with axes, stats grid and metric-specific extras.
   */
  _renderDetails(r, e, t, i) {
    var v;
    const s = e.data[0].buckets.filter(Number.isFinite), a = _e(e.data[0].filled), o = this._resolveGoal(r.goal), n = e.valueOverride ?? this._numeric(e.primaryState, r.attribute), c = [];
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
    ), Number.isFinite(a) && a !== 0 && c.push({
      label: x(this.hass, "stat_trend"),
      value: `${a > 0 ? "+" : ""}${this._fmtMetricValue(e, a)}`
    })), Number.isFinite(o) && Number.isFinite(n)) {
      const m = e.goalType === "atmost" ? n - o : o - n;
      c.push({
        label: x(this.hass, "goal_left"),
        value: m > 0 ? this._fmtMetricValue(e, m) : "✓"
      });
    }
    const d = e.days, l = e.kind === "month" || e.kind === "day" && d > 16, h = e.graph === "bar" || e.graph === "progress" ? "bar" : "line", g = r.duration ?? e.preset.duration, f = (m) => g ? this._fmtMetricValue(e, m) : S(this.hass, m, e.precision), _ = {
      w: l ? d * (e.kind === "month" ? 14 : 10) : 340,
      h: l ? 110 : 130,
      dots: e.kind === "day" && d <= 14,
      yFmt: f,
      xMarks: this._xMarks(e.kind, d)
    }, k = h === "bar" ? Ze(
      e.data[0].buckets,
      e.data[0].colorResolved,
      Number.isFinite(o) ? o : void 0,
      _
    ) : Ye(
      e.data.map((m) => ({ values: m.filled, color: m.colorResolved })),
      _
    ), $ = Math.min(d, 91), b = e.type === "sleep" && e.kind === "day" && r.score_entity && this.hass.states[r.score_entity] ? this._renderScoreCalendar(
      this._bucketsFor(r.score_entity, "day", $, "mean"),
      $
    ) : p;
    return u`
      <div class="periods">
        ${ae.map(
      (m) => u`<button
            class="period ${t === m.key ? "active" : ""}"
            @click=${(y) => {
        y.stopPropagation(), i(m.key);
      }}
          >
            ${x(this.hass, `period_${m.key}`)}
          </button>`
    )}
      </div>
      ${e.graph === "progress" ? this._renderChart(r, "progress", e.data, e.unit, e.precision) : p}
      <div class="popup-chart">
        ${l ? u`<div class="chart-scroll">
              <div style="width:${_.w}px">${k}</div>
            </div>` : k}
      </div>
      ${c.length ? u`<div class="stats">
            ${c.map(
      (m) => u`<div class="stat">
                <div class="stat-label">${m.label}</div>
                <div class="stat-value">${m.value}</div>
              </div>`
    )}
          </div>` : p}
      ${b}
      ${e.type === "toothbrush" && ((v = e.series[0]) != null && v.entity) ? this._renderEventTimes(e.series[0].entity) : p}
      ${e.multi ? this._renderSeriesChips(e.data, e.precision, e.trendMode) : p}
      ${e.type === "sleep" && r.phases ? this._renderSleepPhases(r) : p}
      ${this._renderSecondary(r)}
    `;
  }
  _renderPopup() {
    if (this._popup === null || !this._config) return p;
    const r = this._config.metrics[this._popup];
    if (!r) return p;
    const e = this._ctx(r, this._activeRange());
    if (!e.primaryState) return p;
    const t = e.primaryState, i = this._popupRange ?? (e.days === 7 && e.kind === "day" ? "week" : "");
    return u`
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
            ${this._renderScoreBadge(r)}
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
      r,
      e.type,
      e.data,
      t,
      e.unit,
      e.precision,
      e.preset.duration,
      e.valueOverride
    )}
            <div class="time">${G(this.hass, t.last_updated)}</div>
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
          ${this._renderDetails(r, e, i, (s) => {
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
  _renderSleepPhases(r) {
    const e = {
      deep: "var(--deep-purple-color, #673AB7)",
      light: "var(--light-blue-color, #03A9F4)",
      rem: "var(--cyan-color, #00BCD4)",
      awake: "var(--amber-color, #FFC107)"
    }, t = ["deep", "light", "rem", "awake"].map((i) => {
      var n;
      const s = (n = r.phases) == null ? void 0 : n[i], a = s ? this.hass.states[s] : void 0, o = this._numeric(a);
      if (Number.isFinite(o))
        return { key: i, v: o, unit: a == null ? void 0 : a.attributes.unit_of_measurement, color: e[i] };
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
            <span>${x(this.hass, `phase_${i.key}`)}</span>
            <span class="phaseval">${oe(i.v, i.unit)}</span>
          </div>`
    )}
      </div>
    ` : p;
  }
  _renderValue(r, e, t, i, s, a, o, n) {
    if (r.label) return u`<div class="value">${r.label}</div>`;
    if (e === "blood_pressure" && t.length >= 2) {
      const d = this._numeric(i, r.attribute), l = this._numeric(this.hass.states[t[1].entity]);
      return u`<div class="value">
          ${S(this.hass, d, 0)}/${S(this.hass, l, 0)}
          <span class="unit">${s}</span>
        </div>
        <div class="bplabels">
          <span class="bpitem">
            <span class="bpdot" style="background:${t[0].colorResolved}"></span>SYS
            ${S(this.hass, d, 0)}
          </span>
          <span class="bpitem">
            <span class="bpdot" style="background:${t[1].colorResolved}"></span>DIA
            ${S(this.hass, l, 0)}
          </span>
        </div>`;
    }
    const c = n ?? this._numeric(i, r.attribute);
    if (!Number.isFinite(c))
      return u`<div class="value">${i.state}</div>`;
    if (r.duration ?? o) {
      const d = Object.values(r.phases ?? {}).map((l) => {
        var h;
        return l ? (h = this.hass.states[l]) == null ? void 0 : h.attributes.unit_of_measurement : void 0;
      }).find(Boolean);
      return u`<div class="value">
        ${oe(
        c,
        r.unit ?? (n !== void 0 ? d : i.attributes.unit_of_measurement)
      )}
      </div>`;
    }
    return u`<div class="value">
      ${S(this.hass, c, a)}<span class="unit">${s}</span>
    </div>`;
  }
  _renderSeriesChips(r, e, t) {
    return u`<div class="serieslist">
      ${r.map((i) => {
      const s = this.hass.states[i.entity], a = this._numeric(s), o = i.unit ?? (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "", n = i.name ?? (s == null ? void 0 : s.attributes.friendly_name) ?? i.entity, c = _e(i.filled), d = Number.isFinite(c) ? c > 0 ? "mdi:arrow-top-right" : c < 0 ? "mdi:arrow-bottom-right" : "mdi:arrow-right" : "mdi:minus";
      return u`<div class="serieschip">
          ${t !== "none" ? u`<span class="dotarrow" style="background:${i.colorResolved}">
                <ha-icon .icon=${d}></ha-icon>
              </span>` : p}
          <span class="serieslabel">
            ${n}: ${Number.isFinite(a) ? X(S(this.hass, a, e), o) : (s == null ? void 0 : s.state) ?? "–"}
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
      const a = this._numeric(s), o = s.attributes.unit_of_measurement ?? "";
      return Number.isFinite(a) ? X(S(this.hass, a), o) : s.state;
    }).filter(Boolean);
    return e.length ? u`<div class="secondary">${e.join(" • ")}</div>` : p;
  }
  _renderStatus(r, e, t, i, s, a, o = "atleast", n) {
    const c = n ?? this._numeric(t, r.attribute), d = this._resolveGoal(r.goal);
    if (Number.isFinite(d) && Number.isFinite(c)) {
      const v = this._resolveGoal(r.start);
      let m = NaN;
      if (Number.isFinite(v) && v !== d ? m = (v - c) / (v - d) * 100 : d > 0 && (m = o === "atmost" ? d / c * 100 : c / d * 100), !Number.isNaN(m)) {
        const y = Math.round(Math.min(Math.max(m, 0), 999)), A = y >= 100;
        return u`<div class="status ${A ? "good" : ""}">
          <ha-icon .icon=${A ? "mdi:check-circle" : "mdi:flag-outline"}></ha-icon>
          <span>${x(this.hass, "goal")}: ${y} %</span>
        </div>`;
      }
    }
    if (a === "none") return p;
    const l = _e(e.filled);
    if (!Number.isFinite(l)) return p;
    const h = e.filled.find(Number.isFinite) ?? 0, g = Math.abs(l) < Math.max(Math.abs(h) * 5e-3, 1e-9), f = g || a === "neutral" ? "neutral" : l > 0 == (a === "up_good") ? "good" : "bad", _ = g ? "mdi:arrow-right" : l > 0 ? "mdi:arrow-top-right" : "mdi:arrow-bottom-right", k = r.type && H[r.type] ? r.type : "custom", $ = r.duration ?? H[k].duration, b = g ? x(this.hass, "stable") : $ ? oe(Math.abs(l), i || void 0) : `${S(this.hass, Math.abs(l), s)}${i ? ` ${i}` : ""}`;
    return u`<div class="status ${f}">
      <span class="dotarrow"><ha-icon .icon=${_}></ha-icon></span>
      <span>${b}</span>
    </div>`;
  }
  _renderChart(r, e, t, i, s) {
    if (e === "line")
      return u`${Ye(
        t.map((a) => ({ values: a.filled, color: a.colorResolved }))
      )}`;
    if (e === "bar") {
      const a = this._resolveGoal(r.goal);
      return u`${Ze(
        t[0].buckets,
        t[0].colorResolved,
        Number.isFinite(a) ? a : void 0
      )}`;
    }
    if (e === "progress") {
      const a = t.map((o) => {
        const n = this.hass.states[o.entity], c = this._numeric(n), d = this._resolveGoal(o.goal ?? r.goal);
        if (!Number.isFinite(c) || !Number.isFinite(d) || d <= 0) return p;
        const l = Math.max(0, Math.min(c / d * 100, 100)), h = o.unit ?? (n == null ? void 0 : n.attributes.unit_of_measurement) ?? i;
        return u`<div class="pbar">
          ${t.length > 1 ? u`<div class="pbar-label">
                <span>${o.name ?? (n == null ? void 0 : n.attributes.friendly_name) ?? o.entity}</span>
                <span>${X(S(this.hass, c, s), h)}</span>
              </div>` : p}
          <div class="ptrack" style="--hc-p:${o.colorResolved}">
            <div class="pfill" style="width:${l}%"></div>
          </div>
        </div>`;
      });
      return u`<div class="pbars">${a}</div>`;
    }
    return p;
  }
};
E.ANCHOR_POS = {
  head: { x: 50, y: 9, side: "right" },
  chest: { x: 44, y: 32, side: "left" },
  // flex arm is on the viewer-left, resting arm (cuff) on the right
  "arm-left": { x: 30, y: 20, side: "left" },
  "arm-right": { x: 69, y: 27, side: "right" },
  belly: { x: 50, y: 54, side: "right" },
  legs: { x: 57, y: 75, side: "right" }
};
E.styles = et`
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
       the fill vars live on .body-metric because --hc-accent is an inline
       style on the tile — defined higher up, var() would not resolve */
    .body-metric {
      --hc-body-top: color-mix(in srgb, var(--hc-accent) 28%, var(--hc-card-bg));
      --hc-body-bottom: color-mix(in srgb, var(--hc-accent) 12%, var(--hc-card-bg));
      --hc-body-stroke: color-mix(in srgb, var(--hc-accent) 26%, transparent);
    }
    .bodywrap {
      position: relative;
      width: min(300px, 100%);
      margin: 0 auto;
    }
    /* fixed-height, playing-card-ish frame. the frame clips the FIGURE (so
       feet never spill onto the value text) with a soft bottom fade; the
       energy / fever / eye-shadow glows live outside the frame (bodywrap
       siblings) so they can spill freely over the edges. zoom magnifies the
       inner stage in place, keeping the card height constant. */
    .bodyframe {
      position: relative;
      width: 100%;
      aspect-ratio: var(--hc-frame-ar, 0.68);
      overflow: hidden;
    }
    .bodyframe.fade {
      -webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
      mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
    }
    .bodyframe.fade.crop-upper {
      -webkit-mask-image: linear-gradient(to bottom, #000 66%, transparent 100%);
      mask-image: linear-gradient(to bottom, #000 66%, transparent 100%);
    }
    .bodystage {
      position: absolute;
      inset: 0;
      transform: translateY(var(--hc-oy, 0%)) scale(var(--hc-zoom, 1));
      transform-origin: 50% 0;
    }
    /* figure fits the frame (head-aligned to the top); nearly no letterbox
       since the images and the drawn svg are both portrait */
    .bodyimg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 50% 0;
      display: block;
    }
    .bodyfig {
      width: 100%;
      height: 100%;
      display: block;
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
    .bodyshape .solid {
      stroke: var(--hc-body-stroke);
      stroke-width: 1.5;
      stroke-linejoin: round;
    }
    .bodyshape .flexarm {
      fill: none;
      stroke: var(--hc-body-top);
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .bodyshape .flexarm-outline {
      fill: none;
      stroke: var(--hc-body-stroke);
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .s-glass .body-metric {
      --hc-body-top: color-mix(in srgb, var(--hc-accent) 26%, transparent);
      --hc-body-bottom: color-mix(in srgb, var(--hc-accent) 10%, transparent);
      --hc-body-stroke: color-mix(in srgb, #fff 55%, transparent);
    }
    .s-material .body-metric {
      --hc-body-top: color-mix(in srgb, var(--hc-accent) 40%, var(--hc-card-bg));
      --hc-body-bottom: color-mix(in srgb, var(--hc-accent) 22%, var(--hc-card-bg));
      --hc-body-stroke: transparent;
    }
    .s-bubble .body-metric {
      --hc-body-top: color-mix(in srgb, var(--hc-accent) 32%, var(--hc-card-bg));
      --hc-body-bottom: color-mix(in srgb, var(--hc-accent) 16%, var(--hc-card-bg));
      --hc-body-stroke: transparent;
    }
    .s-mirror .body-metric {
      --hc-body-top: rgba(255, 255, 255, 0.12);
      --hc-body-bottom: rgba(255, 255, 255, 0.06);
      --hc-body-stroke: #fff;
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
z([
  Me({ attribute: !1 })
], E.prototype, "hass", 2);
z([
  R()
], E.prototype, "_config", 2);
z([
  R()
], E.prototype, "_history", 2);
z([
  R()
], E.prototype, "_popup", 2);
z([
  R()
], E.prototype, "_popupRange", 2);
z([
  R()
], E.prototype, "_tileRanges", 2);
z([
  R()
], E.prototype, "_statsCache", 2);
E = z([
  at("health-card")
], E);
console.info(
  `%c HEALTH-CARD %c v${Xt} `,
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
  E as HealthCard
};
