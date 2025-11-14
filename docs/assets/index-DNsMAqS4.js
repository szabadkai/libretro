(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=globalThis,ye=Jt.ShadowRoot&&(Jt.ShadyCSS===void 0||Jt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,be=Symbol(),Pe=new WeakMap;let Ke=class{constructor(t,r,n){if(this._$cssResult$=!0,n!==be)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o;const r=this.t;if(ye&&t===void 0){const n=r!==void 0&&r.length===1;n&&(t=Pe.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Pe.set(r,t))}return t}toString(){return this.cssText}};const mr=e=>new Ke(typeof e=="string"?e:e+"",void 0,be),we=(e,...t)=>{const r=e.length===1?e[0]:t.reduce((n,s,o)=>n+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new Ke(r,e,be)},gr=(e,t)=>{if(ye)e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of t){const n=document.createElement("style"),s=Jt.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=r.cssText,e.appendChild(n)}},Ae=ye?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const n of t.cssRules)r+=n.cssText;return mr(r)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:yr,defineProperty:br,getOwnPropertyDescriptor:wr,getOwnPropertyNames:$r,getOwnPropertySymbols:vr,getPrototypeOf:_r}=Object,J=globalThis,Se=J.trustedTypes,xr=Se?Se.emptyScript:"",oe=J.reactiveElementPolyfillSupport,xt=(e,t)=>e,Qt={toAttribute(e,t){switch(t){case Boolean:e=e?xr:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},$e=(e,t)=>!yr(e,t),Ee={attribute:!0,type:String,converter:Qt,reflect:!1,useDefault:!1,hasChanged:$e};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),J.litPropertyMetadata??(J.litPropertyMetadata=new WeakMap);let ht=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=Ee){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(t,n,r);s!==void 0&&br(this.prototype,t,s)}}static getPropertyDescriptor(t,r,n){const{get:s,set:o}=wr(this.prototype,t)??{get(){return this[r]},set(i){this[r]=i}};return{get:s,set(i){const d=s==null?void 0:s.call(this);o==null||o.call(this,i),this.requestUpdate(t,d,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ee}static _$Ei(){if(this.hasOwnProperty(xt("elementProperties")))return;const t=_r(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(xt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(xt("properties"))){const r=this.properties,n=[...$r(r),...vr(r)];for(const s of n)this.createProperty(s,r[s])}const t=this[Symbol.metadata];if(t!==null){const r=litPropertyMetadata.get(t);if(r!==void 0)for(const[n,s]of r)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[r,n]of this.elementProperties){const s=this._$Eu(r,n);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const r=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const s of n)r.unshift(Ae(s))}else t!==void 0&&r.push(Ae(t));return r}static _$Eu(t,r){const n=r.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(r=>r(this))}addController(t){var r;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((r=t.hostConnected)==null||r.call(t))}removeController(t){var r;(r=this._$EO)==null||r.delete(t)}_$E_(){const t=new Map,r=this.constructor.elementProperties;for(const n of r.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gr(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(r=>{var n;return(n=r.hostConnected)==null?void 0:n.call(r)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(r=>{var n;return(n=r.hostDisconnected)==null?void 0:n.call(r)})}attributeChangedCallback(t,r,n){this._$AK(t,n)}_$ET(t,r){var o;const n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){const i=(((o=n.converter)==null?void 0:o.toAttribute)!==void 0?n.converter:Qt).toAttribute(r,n.type);this._$Em=t,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,r){var o,i;const n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const d=n.getPropertyOptions(s),c=typeof d.converter=="function"?{fromAttribute:d.converter}:((o=d.converter)==null?void 0:o.fromAttribute)!==void 0?d.converter:Qt;this._$Em=s;const m=c.fromAttribute(r,d.type);this[s]=m??((i=this._$Ej)==null?void 0:i.get(s))??m,this._$Em=null}}requestUpdate(t,r,n){var s;if(t!==void 0){const o=this.constructor,i=this[t];if(n??(n=o.getPropertyOptions(t)),!((n.hasChanged??$e)(i,r)||n.useDefault&&n.reflect&&i===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(o._$Eu(t,n))))return;this.C(t,r,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,r,{useDefault:n,reflect:s,wrapped:o},i){n&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,i??r??this[t]),o!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(r=void 0),this._$AL.set(t,r)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,i]of s){const{wrapped:d}=i,c=this[o];d!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,i,c)}}let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(n=this._$EO)==null||n.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(r)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(r)}willUpdate(t){}_$AE(t){var r;(r=this._$EO)==null||r.forEach(n=>{var s;return(s=n.hostUpdated)==null?void 0:s.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(t){}firstUpdated(t){}};ht.elementStyles=[],ht.shadowRootOptions={mode:"open"},ht[xt("elementProperties")]=new Map,ht[xt("finalized")]=new Map,oe==null||oe({ReactiveElement:ht}),(J.reactiveElementVersions??(J.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=globalThis,te=Pt.trustedTypes,ke=te?te.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ye="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,Ze="?"+G,Pr=`<${Ze}>`,ot=document,Et=()=>ot.createComment(""),kt=e=>e===null||typeof e!="object"&&typeof e!="function",ve=Array.isArray,Ar=e=>ve(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",ie=`[ 	
\f\r]`,bt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Te=/>/g,Z=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),De=/'/g,Ne=/"/g,Xe=/^(?:script|style|textarea|title)$/i,Sr=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),N=Sr(1),V=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Oe=new WeakMap,rt=ot.createTreeWalker(ot,129);function Qe(e,t){if(!ve(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ke!==void 0?ke.createHTML(t):t}const Er=(e,t)=>{const r=e.length-1,n=[];let s,o=t===2?"<svg>":t===3?"<math>":"",i=bt;for(let d=0;d<r;d++){const c=e[d];let m,g,a=-1,h=0;for(;h<c.length&&(i.lastIndex=h,g=i.exec(c),g!==null);)h=i.lastIndex,i===bt?g[1]==="!--"?i=Ce:g[1]!==void 0?i=Te:g[2]!==void 0?(Xe.test(g[2])&&(s=RegExp("</"+g[2],"g")),i=Z):g[3]!==void 0&&(i=Z):i===Z?g[0]===">"?(i=s??bt,a=-1):g[1]===void 0?a=-2:(a=i.lastIndex-g[2].length,m=g[1],i=g[3]===void 0?Z:g[3]==='"'?Ne:De):i===Ne||i===De?i=Z:i===Ce||i===Te?i=bt:(i=Z,s=void 0);const f=i===Z&&e[d+1].startsWith("/>")?" ":"";o+=i===bt?c+Pr:a>=0?(n.push(m),c.slice(0,a)+Ye+c.slice(a)+G+f):c+G+(a===-2?d:f)}return[Qe(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]};class Ct{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,i=0;const d=t.length-1,c=this.parts,[m,g]=Er(t,r);if(this.el=Ct.createElement(m,n),rt.currentNode=this.el.content,r===2||r===3){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(s=rt.nextNode())!==null&&c.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(const a of s.getAttributeNames())if(a.endsWith(Ye)){const h=g[i++],f=s.getAttribute(a).split(G),P=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:P[2],strings:f,ctor:P[1]==="."?Cr:P[1]==="?"?Tr:P[1]==="@"?Dr:re}),s.removeAttribute(a)}else a.startsWith(G)&&(c.push({type:6,index:o}),s.removeAttribute(a));if(Xe.test(s.tagName)){const a=s.textContent.split(G),h=a.length-1;if(h>0){s.textContent=te?te.emptyScript:"";for(let f=0;f<h;f++)s.append(a[f],Et()),rt.nextNode(),c.push({type:2,index:++o});s.append(a[h],Et())}}}else if(s.nodeType===8)if(s.data===Ze)c.push({type:2,index:o});else{let a=-1;for(;(a=s.data.indexOf(G,a+1))!==-1;)c.push({type:7,index:o}),a+=G.length-1}o++}}static createElement(t,r){const n=ot.createElement("template");return n.innerHTML=t,n}}function pt(e,t,r=e,n){var i,d;if(t===V)return t;let s=n!==void 0?(i=r._$Co)==null?void 0:i[n]:r._$Cl;const o=kt(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((d=s==null?void 0:s._$AO)==null||d.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=pt(e,s._$AS(e,t.values),s,n)),t}class kr{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:r},parts:n}=this._$AD,s=((t==null?void 0:t.creationScope)??ot).importNode(r,!0);rt.currentNode=s;let o=rt.nextNode(),i=0,d=0,c=n[0];for(;c!==void 0;){if(i===c.index){let m;c.type===2?m=new Mt(o,o.nextSibling,this,t):c.type===1?m=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(m=new Nr(o,this,t)),this._$AV.push(m),c=n[++d]}i!==(c==null?void 0:c.index)&&(o=rt.nextNode(),i++)}return rt.currentNode=ot,s}p(t){let r=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}}class Mt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=pt(this,t,r),kt(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==V&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ar(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&kt(this._$AH)?this._$AA.nextSibling.data=t:this.T(ot.createTextNode(t)),this._$AH=t}$(t){var o;const{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Ct.createElement(Qe(n.h,n.h[0]),this.options)),n);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(r);else{const i=new kr(s,this),d=i.u(this.options);i.p(r),this.T(d),this._$AH=i}}_$AC(t){let r=Oe.get(t.strings);return r===void 0&&Oe.set(t.strings,r=new Ct(t)),r}k(t){ve(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let n,s=0;for(const o of t)s===r.length?r.push(n=new Mt(this.O(Et()),this.O(Et()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,r);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var r;this._$AM===void 0&&(this._$Cv=t,(r=this._$AP)==null||r.call(this,t))}}class re{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=A}_$AI(t,r=this,n,s){const o=this.strings;let i=!1;if(o===void 0)t=pt(this,t,r,0),i=!kt(t)||t!==this._$AH&&t!==V,i&&(this._$AH=t);else{const d=t;let c,m;for(t=o[0],c=0;c<o.length-1;c++)m=pt(this,d[n+c],r,c),m===V&&(m=this._$AH[c]),i||(i=!kt(m)||m!==this._$AH[c]),m===A?t=A:t!==A&&(t+=(m??"")+o[c+1]),this._$AH[c]=m}i&&!s&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Cr extends re{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class Tr extends re{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class Dr extends re{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=pt(this,t,r,0)??A)===V)return;const n=this._$AH,s=t===A&&n!==A||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==A&&(n===A||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,t):this._$AH.handleEvent(t)}}class Nr{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){pt(this,t)}}const ae=Pt.litHtmlPolyfillSupport;ae==null||ae(Ct,Mt),(Pt.litHtmlVersions??(Pt.litHtmlVersions=[])).push("3.3.1");const Or=(e,t,r)=>{const n=(r==null?void 0:r.renderBefore)??t;let s=n._$litPart$;if(s===void 0){const o=(r==null?void 0:r.renderBefore)??null;n._$litPart$=s=new Mt(t.insertBefore(Et(),o),o,void 0,r??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt=globalThis;let st=class extends ht{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;const t=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=t.firstChild),t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Or(r,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return V}};var Ve;st._$litElement$=!0,st.finalized=!0,(Ve=nt.litElementHydrateSupport)==null||Ve.call(nt,{LitElement:st});const ce=nt.litElementPolyfillSupport;ce==null||ce({LitElement:st});(nt.litElementVersions??(nt.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=e=>(t,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mr={attribute:!0,type:String,converter:Qt,reflect:!1,hasChanged:$e},Ir=(e=Mr,t,r)=>{const{kind:n,metadata:s}=r;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),n==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(r.name,e),n==="accessor"){const{name:i}=r;return{set(d){const c=t.get.call(this);t.set.call(this,d),this.requestUpdate(i,c,e)},init(d){return d!==void 0&&this.C(i,void 0,e,d),d}}}if(n==="setter"){const{name:i}=r;return function(d){const c=this[i];t.call(this,d),this.requestUpdate(i,c,e)}}throw Error("Unsupported decorator location: "+n)};function It(e){return(t,r)=>typeof r=="object"?Ir(e,t,r):((n,s,o)=>{const i=s.hasOwnProperty(o);return s.constructor.createProperty(o,n),i?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function L(e){return It({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ur=(e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,r),r);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function tr(e,t){return(r,n,s)=>{const o=i=>{var d;return((d=i.renderRoot)==null?void 0:d.querySelector(e))??null};return Ur(r,n,{get(){return o(this)}})}}const C=[];for(let e=0;e<256;++e)C.push((e+256).toString(16).slice(1));function Lr(e,t=0){return(C[e[t+0]]+C[e[t+1]]+C[e[t+2]]+C[e[t+3]]+"-"+C[e[t+4]]+C[e[t+5]]+"-"+C[e[t+6]]+C[e[t+7]]+"-"+C[e[t+8]]+C[e[t+9]]+"-"+C[e[t+10]]+C[e[t+11]]+C[e[t+12]]+C[e[t+13]]+C[e[t+14]]+C[e[t+15]]).toLowerCase()}let le;const Rr=new Uint8Array(16);function Hr(){if(!le){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");le=crypto.getRandomValues.bind(crypto)}return le(Rr)}const zr=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Me={randomUUID:zr};function Br(e,t,r){var s;e=e||{};const n=e.random??((s=e.rng)==null?void 0:s.call(e))??Hr();if(n.length<16)throw new Error("Random bytes length must be >= 16");return n[6]=n[6]&15|64,n[8]=n[8]&63|128,Lr(n)}function ee(e,t,r){return Me.randomUUID&&!e?Me.randomUUID():Br(e)}const{floor:jr,random:Fr}=Math,Tt="Trystero",Dt=(e,t)=>Array(e).fill().map(t),Ie="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",er=e=>Dt(e,()=>Ie[jr(Fr()*Ie.length)]).join(""),q=er(20),et=Promise.all.bind(Promise),rr=typeof window<"u",{entries:pe,fromEntries:nr,keys:Wr}=Object,j=()=>{},F=e=>new Error(`${Tt}: ${e}`),Gr=new TextEncoder,qr=new TextDecoder,dt=e=>Gr.encode(e),Vt=e=>qr.decode(e),Ft=(...e)=>e.join("@"),Jr=(e,t,r,n)=>(e.relayUrls||t).slice(0,e.relayUrls?e.relayUrls.length:e.relayRedundancy||r),Nt=JSON.stringify,Ot=JSON.parse,Ue=3333,ct={};let At=null,St=null;const Vr=()=>{At||(At=new Promise(e=>{St=e}).finally(()=>{St=null,At=null}))},Kr=()=>St==null?void 0:St(),Yr=(e,t)=>{const r={},n=()=>{const s=new WebSocket(e);s.onclose=()=>{if(At){At.then(n);return}ct[e]??(ct[e]=Ue),setTimeout(n,ct[e]),ct[e]*=2},s.onmessage=o=>t(o.data),r.socket=s,r.url=s.url,r.ready=new Promise(o=>s.onopen=()=>{o(r),ct[e]=Ue}),r.send=o=>{s.readyState===1&&s.send(o)}};return n(),r},Zr=()=>{if(rr){const e=new AbortController;return addEventListener("online",Kr,{signal:e.signal}),addEventListener("offline",Vr,{signal:e.signal}),()=>e.abort()}return j},xe="AES-GCM",he={},Xr=e=>btoa(String.fromCharCode.apply(null,new Uint8Array(e))),Qr=e=>{const t=atob(e);return new Uint8Array(t.length).map((r,n)=>t.charCodeAt(n)).buffer},tn=async(e,t)=>new Uint8Array(await crypto.subtle.digest(e,dt(t))),$t=async e=>he[e]||(he[e]=Array.from(await tn("SHA-1",e)).map(t=>t.toString(36)).join("")),en=async(e,t,r)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},dt(`${e}:${t}:${r}`)),{name:xe},!1,["encrypt","decrypt"]),sr="$",or=",",rn=async(e,t)=>{const r=crypto.getRandomValues(new Uint8Array(16));return r.join(or)+sr+Xr(await crypto.subtle.encrypt({name:xe,iv:r},await e,dt(t)))},nn=async(e,t)=>{const[r,n]=t.split(sr);return Vt(await crypto.subtle.decrypt({name:xe,iv:new Uint8Array(r.split(or))},await e,Qr(n)))},sn=5e3,Le="icegatheringstatechange",Re="offer",on="answer",He=(e,{rtcConfig:t,rtcPolyfill:r,turnConfig:n})=>{const s=new(r||RTCPeerConnection)({iceServers:an.concat(n||[]),...t}),o={};let i=!1,d=!1,c=null;const m=a=>{a.binaryType="arraybuffer",a.bufferedAmountLowThreshold=65535,a.onmessage=h=>{var f;return(f=o.data)==null?void 0:f.call(o,h.data)},a.onopen=()=>{var h;return(h=o.connect)==null?void 0:h.call(o)},a.onclose=()=>{var h;return(h=o.close)==null?void 0:h.call(o)},a.onerror=h=>{var f;return(f=o.error)==null?void 0:f.call(o,h)}},g=a=>Promise.race([new Promise(h=>{const f=()=>{a.iceGatheringState==="complete"&&(a.removeEventListener(Le,f),h())};a.addEventListener(Le,f),f()}),new Promise(h=>setTimeout(h,sn))]).then(()=>({type:a.localDescription.type,sdp:a.localDescription.sdp.replace(/a=ice-options:trickle\s\n/g,"")}));return e?(c=s.createDataChannel("data"),m(c)):s.ondatachannel=({channel:a})=>{c=a,m(a)},s.onnegotiationneeded=async()=>{var a,h;try{i=!0,await s.setLocalDescription();const f=await g(s);(a=o.signal)==null||a.call(o,f)}catch(f){(h=o.error)==null||h.call(o,f)}finally{i=!1}},s.onconnectionstatechange=()=>{var a;["disconnected","failed","closed"].includes(s.connectionState)&&((a=o.close)==null||a.call(o))},s.ontrack=a=>{var h,f;(h=o.track)==null||h.call(o,a.track,a.streams[0]),(f=o.stream)==null||f.call(o,a.streams[0])},s.onremovestream=a=>{var h;return(h=o.stream)==null?void 0:h.call(o,a.stream)},e&&(s.canTrickleIceCandidates||s.onnegotiationneeded()),{created:Date.now(),connection:s,get channel(){return c},get isDead(){return s.connectionState==="closed"},async signal(a){var h,f,P;if(!((c==null?void 0:c.readyState)==="open"&&!((h=a.sdp)!=null&&h.includes("a=rtpmap"))))try{if(a.type===Re){if(i||s.signalingState!=="stable"&&!d){if(e)return;await et([s.setLocalDescription({type:"rollback"}),s.setRemoteDescription(a)])}else await s.setRemoteDescription(a);await s.setLocalDescription();const M=await g(s);return(f=o.signal)==null||f.call(o,M),M}else if(a.type===on){d=!0;try{await s.setRemoteDescription(a)}finally{d=!1}}}catch(M){(P=o.error)==null||P.call(o,M)}},sendData:a=>c.send(a),destroy:()=>{c==null||c.close(),s.close(),i=!1,d=!1},setHandlers:a=>Object.assign(o,a),offerPromise:e?new Promise(a=>o.signal=h=>{h.type===Re&&a(h)}):Promise.resolve(),addStream:a=>a.getTracks().forEach(h=>s.addTrack(h,a)),removeStream:a=>s.getSenders().filter(h=>a.getTracks().includes(h.track)).forEach(h=>s.removeTrack(h)),addTrack:(a,h)=>s.addTrack(a,h),removeTrack:a=>{const h=s.getSenders().find(f=>f.track===a);h&&s.removeTrack(h)},replaceTrack:(a,h)=>{const f=s.getSenders().find(P=>P.track===a);if(f)return f.replaceTrack(h)}}},an=[...Dt(3,(e,t)=>`stun:stun${t||""}.l.google.com:19302`),"stun:stun.cloudflare.com:3478"].map(e=>({urls:e})),cn=Object.getPrototypeOf(Uint8Array),Kt=12,ir=0,Yt=ir+Kt,Zt=Yt+1,vt=Zt+1,_t=vt+1,X=16*2**10-_t,Wt=255,ze="bufferedamountlow",lt=e=>"@_"+e,ln=(e,t,r)=>{const n={},s={},o={},i={},d={},c={},m={},g={onPeerJoin:j,onPeerLeave:j,onPeerStream:j,onPeerTrack:j},a=(l,p)=>(l?Array.isArray(l)?l:[l]:Wr(n)).flatMap(y=>{const w=n[y];return w?p(y,w):(console.warn(`${Tt}: no peer with id ${y} found`),[])}),h=l=>{n[l]&&(n[l].destroy(),delete n[l],delete i[l],delete d[l],g.onPeerLeave(l),t(l))},f=l=>{if(s[l])return o[l];if(!l)throw F("action type argument is required");const p=dt(l);if(p.byteLength>Kt)throw F(`action type string "${l}" (${p.byteLength}b) exceeds byte limit (${Kt}). Hint: choose a shorter name.`);const y=new Uint8Array(Kt);y.set(p);let w=0;return s[l]={onComplete:j,onProgress:j,setOnComplete:v=>s[l]={...s[l],onComplete:v},setOnProgress:v=>s[l]={...s[l],onProgress:v},send:async(v,O,u,b)=>{if(u&&typeof u!="object")throw F("action meta argument must be an object");const x=typeof v;if(x==="undefined")throw F("action data cannot be undefined");const S=x!=="string",T=v instanceof Blob,I=T||v instanceof ArrayBuffer||v instanceof cn;if(u&&!I)throw F("action meta argument can only be used with binary data");const $=I?new Uint8Array(T?await v.arrayBuffer():v):dt(S?Nt(v):v),H=u?dt(Nt(u)):null,U=Math.ceil($.byteLength/X)+(u?1:0)||1,z=Dt(U,(D,E)=>{const B=E===U-1,k=u&&E===0,_=new Uint8Array(_t+(k?H.byteLength:B?$.byteLength-X*(U-(u?2:1)):X));return _.set(y),_.set([w],Yt),_.set([B|k<<1|I<<2|S<<3],Zt),_.set([Math.round((E+1)/U*Wt)],vt),_.set(u?k?H:$.subarray((E-1)*X,E*X):$.subarray(E*X,(E+1)*X),_t),_});return w=w+1&Wt,et(a(O,async(D,E)=>{const{channel:B}=E;let k=0;for(;k<U;){const _=z[k];if(B.bufferedAmount>B.bufferedAmountLowThreshold&&await new Promise(at=>{const jt=()=>{B.removeEventListener(ze,jt),at()};B.addEventListener(ze,jt)}),!n[D])break;E.sendData(_),k++,b==null||b(_[vt]/Wt,D,u)}}))}},o[l]||(o[l]=[s[l].send,s[l].setOnComplete,s[l].setOnProgress])},P=(l,p)=>{var U,z;const y=new Uint8Array(p),w=Vt(y.subarray(ir,Yt)).replaceAll("\0",""),[v]=y.subarray(Yt,Zt),[O]=y.subarray(Zt,vt),[u]=y.subarray(vt,_t),b=y.subarray(_t),x=!!(O&1),S=!!(O&2),T=!!(O&4),I=!!(O&8);if(!s[w]){console.warn(`${Tt}: received message with unregistered type (${w})`);return}i[l]||(i[l]={}),(U=i[l])[w]||(U[w]={});const $=(z=i[l][w])[v]||(z[v]={chunks:[]});if(S?$.meta=Ot(Vt(b)):$.chunks.push(b),s[w].onProgress(u/Wt,l,$.meta),!x)return;const H=new Uint8Array($.chunks.reduce((D,E)=>D+E.byteLength,0));if($.chunks.reduce((D,E)=>(H.set(E,D),D+E.byteLength),0),delete i[l][w][v],T)s[w].onComplete(H,l,$.meta);else{const D=Vt(H);s[w].onComplete(I?Ot(D):D,l)}},M=async()=>{await zt(""),await new Promise(l=>setTimeout(l,99)),pe(n).forEach(([l,p])=>{p.destroy(),delete n[l]}),r()},[mt,gt]=f(lt("ping")),[ne,Ut]=f(lt("pong")),[Lt,Rt]=f(lt("signal")),[Ht,yt]=f(lt("stream")),[it,se]=f(lt("track")),[zt,Bt]=f(lt("leave"));return e((l,p)=>{n[p]||(n[p]=l,l.setHandlers({data:y=>P(p,y),stream:y=>{g.onPeerStream(y,p,c[p]),delete c[p]},track:(y,w)=>{g.onPeerTrack(y,w,p,m[p]),delete m[p]},signal:y=>Lt(y,p),close:()=>h(p),error:y=>{console.error(y),h(p)}}),g.onPeerJoin(p))}),gt((l,p)=>ne("",p)),Ut((l,p)=>{var y;(y=d[p])==null||y.call(d),delete d[p]}),Rt((l,p)=>{var y;return(y=n[p])==null?void 0:y.signal(l)}),yt((l,p)=>c[p]=l),se((l,p)=>m[p]=l),Bt((l,p)=>h(p)),rr&&addEventListener("beforeunload",M),{makeAction:f,leave:M,ping:async l=>{if(!l)throw F("ping() must be called with target peer ID");const p=Date.now();return mt("",l),await new Promise(y=>d[l]=y),Date.now()-p},getPeers:()=>nr(pe(n).map(([l,p])=>[l,p.connection])),addStream:(l,p,y)=>a(p,async(w,v)=>{y&&await Ht(y,w),v.addStream(l)}),removeStream:(l,p)=>a(p,(y,w)=>w.removeStream(l)),addTrack:(l,p,y,w)=>a(y,async(v,O)=>{w&&await it(w,v),O.addTrack(l,p)}),removeTrack:(l,p)=>a(p,(y,w)=>w.removeTrack(l)),replaceTrack:(l,p,y,w)=>a(y,async(v,O)=>{w&&await it(w,v),O.replaceTrack(l,p)}),onPeerJoin:l=>g.onPeerJoin=l,onPeerLeave:l=>g.onPeerLeave=l,onPeerStream:l=>g.onPeerStream=l,onPeerTrack:l=>g.onPeerTrack=l}},hn=20,dn=5333,Be=57333,pn=({init:e,subscribe:t,announce:r})=>{const n={};let s=!1,o,i,d,c;return(m,g,a)=>{var O;const{appId:h}=m;if((O=n[h])!=null&&O[g])return n[h][g];const f={},P={},M=Ft(Tt,h,g),mt=$t(M),gt=$t(Ft(M,q)),ne=en(m.password||"",h,g),Ut=u=>async b=>({type:b.type,sdp:await u(ne,b.sdp)}),Lt=Ut(nn),Rt=Ut(rn),Ht=()=>He(!0,m),yt=(u,b,x)=>{var S;if(P[b]){P[b]!==u&&u.destroy();return}P[b]=u,v(u,b),(S=f[b])==null||S.forEach((T,I)=>{I!==x&&T.destroy()}),delete f[b]},it=(u,b)=>{P[b]===u&&delete P[b]},se=(u,b)=>{var S;if(P[u])return;const x=(S=f[u])==null?void 0:S[b];x&&(delete f[u][b],x.destroy())},zt=u=>(i.push(...Dt(u,Ht)),et(i.splice(0,u).map(b=>b.offerPromise.then(Rt).then(x=>({peer:b,offer:x}))))),Bt=(u,b)=>a==null?void 0:a({error:`incorrect password (${m.password}) when decrypting ${b}`,appId:h,peerId:u,roomId:g}),l=u=>async(b,x,S)=>{var D,E,B;const[T,I]=await et([mt,gt]);if(b!==T&&b!==I)return;const{peerId:$,offer:H,answer:U,peer:z}=typeof x=="string"?Ot(x):x;if(!($===q||P[$])){if($&&!H&&!U){if((D=f[$])!=null&&D[u])return;const[[{peer:k,offer:_}],at]=await et([zt(1),$t(Ft(M,$))]);f[$]||(f[$]=[]),f[$][u]=k,setTimeout(()=>se($,u),p[u]*.9),k.setHandlers({connect:()=>yt(k,$,u),close:()=>it(k,$)}),S(at,Nt({peerId:q,offer:_}))}else if(H){if(((E=f[$])==null?void 0:E[u])&&q>$)return;const _=He(!1,m);_.setHandlers({connect:()=>yt(_,$,u),close:()=>it(_,$)});let at;try{at=await Lt(H)}catch{Bt($,"offer");return}if(_.isDead)return;const[jt,fr]=await et([$t(Ft(M,$)),_.signal(at)]);S(jt,Nt({peerId:q,answer:await Rt(fr)}))}else if(U){let k;try{k=await Lt(U)}catch{Bt($,"answer");return}if(z)z.setHandlers({connect:()=>yt(z,$,u),close:()=>it(z,$)}),z.signal(k);else{const _=(B=f[$])==null?void 0:B[u];_&&!_.isDead&&_.signal(k)}}}};if(!m)throw F("requires a config map as the first argument");if(!h&&!m.firebaseApp)throw F("config map is missing appId field");if(!g)throw F("roomId argument required");if(!s){const u=e(m);i=Dt(hn,Ht),o=Array.isArray(u)?u:[u],s=!0,d=setInterval(()=>i=i.filter(b=>{const x=Date.now()-b.created<Be;return x||b.destroy(),x}),Be*1.03),c=m.manualRelayReconnection?j:Zr()}const p=o.map(()=>dn),y=[],w=o.map(async(u,b)=>t(await u,await mt,await gt,l(b),zt));et([mt,gt]).then(([u,b])=>{const x=async(S,T)=>{const I=await r(S,u,b);typeof I=="number"&&(p[T]=I),y[T]=setTimeout(()=>x(S,T),p[T])};w.forEach(async(S,T)=>{await S,x(await o[T],T)})});let v=j;return n[h]||(n[h]={}),n[h][g]=ln(u=>v=u,u=>delete P[u],()=>{delete n[h][g],y.forEach(clearTimeout),w.forEach(async u=>(await u)()),clearInterval(d),c(),s=!1})}},de={},ar={},Q={},tt={},wt={},je={},Gt={},un="announce",cr=20,Fe=10,fn=33333,mn=120333,gn=3,yn=async e=>{if(de[e])return de[e];const t=(await $t(e)).slice(0,cr);return de[e]=t,ar[t]=e,t},We=async(e,t,r)=>e.send(Nt({action:un,info_hash:await yn(t),peer_id:q,...r})),Ge=(e,t,r)=>console.warn(`${Tt}: torrent tracker ${r?"failure":"warning"} from ${e} - ${t}`),bn=pn({init:e=>Jr(e,wn,gn).map(t=>{const r=Yr(t,s=>{var g,a;const o=Ot(s),i=o["failure reason"],d=o["warning message"],{interval:c}=o,m=ar[o.info_hash];if(i){Ge(n,i,!0);return}if(d&&Ge(n,d),c&&c*1e3>wt[n]&&tt[n][m]){const h=Math.min(c*1e3,mn);clearInterval(Q[n][m]),wt[n]=h,Q[n][m]=setInterval(tt[n][m],h)}je[o.offer_id]||(o.offer||o.answer)&&(je[o.offer_id]=!0,(a=(g=Gt[n])[m])==null||a.call(g,o))}),{url:n}=r;return Gt[n]={},r.ready}),subscribe:(e,t,r,n,s)=>{const{url:o}=e,i=async()=>{const d=nr((await s(Fe)).map(c=>[er(cr),c]));Gt[e.url][t]=c=>{if(c.offer)n(t,{offer:c.offer,peerId:c.peer_id},(m,g)=>We(e,t,{answer:Ot(g).answer,offer_id:c.offer_id,to_peer_id:c.peer_id}));else if(c.answer){const m=d[c.offer_id];m&&n(t,{answer:c.answer,peerId:c.peer_id,peer:m.peer})}},We(e,t,{numwant:Fe,offers:pe(d).map(([c,{offer:m}])=>({offer_id:c,offer:m}))})};return wt[o]=fn,tt[o]||(tt[o]={}),tt[o][t]=i,Q[o]||(Q[o]={}),Q[o][t]=setInterval(i,wt[o]),i(),()=>{clearInterval(Q[o][t]),delete Gt[o][t],delete tt[o][t]}},announce:e=>wt[e.url]}),wn=["tracker.webtorrent.dev","tracker.openwebtorrent.com","tracker.btorrent.xyz","tracker.files.fm:7073/announce"].map(e=>"wss://"+e),$n="metro-retro:board:",ue=e=>`${$n}${e}`;function vn(e){if(typeof window>"u")return null;const t=window.localStorage.getItem(ue(e));if(!t)return null;try{return JSON.parse(t)}catch(r){return console.warn("Failed to parse snapshot",r),window.localStorage.removeItem(ue(e)),null}}function _n(e,t){if(!(typeof window>"u"))try{window.localStorage.setItem(ue(e),JSON.stringify(t))}catch(r){console.warn("Failed to persist snapshot",r)}}const qe="wss://tracker.webtorrent.dev,wss://tracker.openwebtorrent.com".split(",").map(e=>e.trim()).filter(Boolean);class xn extends EventTarget{constructor(t,r){var n;super(),this.status="connecting",this.notes=new Map,this.participants=new Map,this.boardId=t,this.localParticipant={id:q,label:((n=r==null?void 0:r.label)==null?void 0:n.trim())||`Guest ${ee().slice(0,4).toUpperCase()}`,color:(r==null?void 0:r.color)||this.randomAccent()},this.participants.set(q,this.localParticipant),this.restoreSnapshot(),this.connectRoom()}dispose(){var t;typeof window<"u"&&window.clearTimeout(this.persistHandle),(t=this.room)==null||t.leave()}getNotes(){return Array.from(this.notes.values()).sort((t,r)=>t.createdAt-r.createdAt)}getParticipants(){return Array.from(this.participants.values())}createNote(t,r,n){const s=Date.now(),o={id:ee(),columnId:t,text:"",...this.normalizePosition(r,n),color:this.localParticipant.color,authorId:this.localParticipant.id,createdAt:s,updatedAt:s};this.applyUpsert(o),this.broadcastNote({type:"upsert",note:o})}updateNote(t,r){const n=this.notes.get(t);if(!n)return;const s={...n,...r,updatedAt:Date.now()};this.applyUpsert(s),this.broadcastNote({type:"upsert",note:s})}moveNote(t,r,n,s){this.updateNote(t,{columnId:r,...this.normalizePosition(n,s)})}deleteNote(t){this.notes.get(t)&&(this.notes.delete(t),this.emitNotesChanged(),this.schedulePersist(),this.broadcastNote({type:"delete",id:t,updatedAt:Date.now()}))}connectRoom(){const t={appId:"metro-retro",relayUrls:qe.length?qe:void 0};this.room=bn(t,this.boardId),this.updateStatus("connected"),this.setupMessaging(),this.setupPresence()}setupMessaging(){if(!this.room)return;const[t,r]=this.room.makeAction("note");this.sendNoteMessage=(n,s)=>t(n,s),r((n,s)=>{var o;switch(n.type){case"upsert":this.applyUpsert(n.note);break;case"delete":this.applyDelete(n.id,n.updatedAt);break;case"sync-request":(o=this.sendNoteMessage)==null||o.call(this,{type:"sync-response",notes:this.getNotes()},s);break;case"sync-response":n.notes.forEach(i=>this.applyUpsert(i));break}}),this.room.onPeerJoin(n=>{var s,o;this.updateStatus("connected"),(s=this.sendPresenceMessage)==null||s.call(this,{participant:this.localParticipant},n),(o=this.sendNoteMessage)==null||o.call(this,{type:"sync-request"},n)}),this.room.onPeerLeave(n=>{this.participants.delete(n),this.emitParticipantsChanged()})}setupPresence(){var n;if(!this.room)return;const[t,r]=this.room.makeAction("presence");this.sendPresenceMessage=(s,o)=>t(s,o),r(s=>{s!=null&&s.participant&&(this.participants.set(s.participant.id,s.participant),this.emitParticipantsChanged())}),this.emitParticipantsChanged(),(n=this.sendPresenceMessage)==null||n.call(this,{participant:this.localParticipant})}broadcastNote(t){var r;(r=this.sendNoteMessage)==null||r.call(this,t)}applyUpsert(t){const r=this.notes.get(t.id);r&&r.updatedAt>t.updatedAt||(this.notes.set(t.id,t),this.schedulePersist(),this.emitNotesChanged())}applyDelete(t,r){const n=this.notes.get(t);!n||n.updatedAt>r||(this.notes.delete(t),this.emitNotesChanged(),this.schedulePersist())}emitNotesChanged(){this.dispatchEvent(new CustomEvent("notes-changed",{detail:this.getNotes()}))}emitParticipantsChanged(){this.dispatchEvent(new CustomEvent("participants-changed",{detail:this.getParticipants()}))}normalizePosition(t,r){const n=Number.isFinite(t)?Number(t):24,s=Number.isFinite(r)?Number(r):24;return{x:Math.max(12,n),y:Math.max(12,s)}}updateStatus(t){this.status=t,this.dispatchEvent(new CustomEvent("status-changed",{detail:t}))}restoreSnapshot(){const t=vn(this.boardId);t!=null&&t.notes&&(t.notes.forEach(r=>this.notes.set(r.id,r)),this.emitNotesChanged())}schedulePersist(){typeof window>"u"||(window.clearTimeout(this.persistHandle),this.persistHandle=window.setTimeout(()=>{_n(this.boardId,{notes:this.getNotes()})},400))}randomAccent(){const t=["#fbbf24","#ef4444","#22d3ee","#a855f7","#34d399","#f472b6"];return t[Math.floor(Math.random()*t.length)]}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lr={ATTRIBUTE:1,CHILD:2},hr=e=>(...t)=>({_$litDirective$:e,values:t});let dr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pr="important",Pn=" !"+pr,fe=hr(class extends dr{constructor(e){var t;if(super(e),e.type!==lr.ATTRIBUTE||e.name!=="style"||((t=e.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,r)=>{const n=e[r];return n==null?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(e,[t]){const{style:r}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?r.removeProperty(n):r[n]=null);for(const n in t){const s=t[n];if(s!=null){this.ft.add(n);const o=typeof s=="string"&&s.endsWith(Pn);n.includes("-")||o?r.setProperty(n,o?s.slice(0,-11):s,o?pr:""):r[n]=s}}return V}}),An=[{id:"good",label:"Good",description:"Wins and bright spots worth repeating",accent:"#34d399"},{id:"bad",label:"Bad",description:"Pain points or risks we should address",accent:"#f87171"},{id:"start",label:"Start",description:"New ideas to try next sprint",accent:"#60a5fa"},{id:"stop",label:"Stop",description:"Habits that no longer serve us",accent:"#fbbf24"}],Sn=110,En=70,ur="application/x-metro-note";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class me extends dr{constructor(t){if(super(t),this.it=A,t.type!==lr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===A||t==null)return this._t=void 0,this.it=t;if(t===V)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}me.directiveName="unsafeHTML",me.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ge extends me{}ge.directiveName="unsafeSVG",ge.resultType=2;const kn=hr(ge),Cn=`<svg
  width="140"
  height="140"
  viewBox="0 0 140 140"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <!-- Paper gradient -->
    <linearGradient id="noteGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--note-top, #fff79a)" />
      <stop offset="100%" stop-color="var(--note-bottom, #ffd34a)" />
    </linearGradient>

    <!-- Fold gradient -->
    <linearGradient id="foldGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="var(--note-fold-light, #fffde2)" />
      <stop offset="100%" stop-color="var(--note-fold-dark, #ffd768)" />
    </linearGradient>

    <filter id="noteShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow
        dx="0"
        dy="6"
        stdDeviation="6"
        flood-color="var(--note-shadow, rgba(0, 0, 0, 0.3))"
        flood-opacity="0.35"
      />
    </filter>
  </defs>

  <g filter="url(#noteShadow)">
    <path
      id="note-body"
      d="M4 4 H112 L136 28 V136 H4 Z"
      fill="url(#noteGradient)"
      stroke="var(--note-stroke, #e0a800)"
      stroke-width="1.5"
    />

    <path
      id="note-fold"
      d="M112 4 L136 28 H112 Z"
      fill="url(#foldGradient)"
      stroke="var(--note-stroke, #e0a800)"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </g>
</svg>
`;var Tn=Object.defineProperty,Dn=Object.getOwnPropertyDescriptor,ut=(e,t,r,n)=>{for(var s=n>1?void 0:n?Dn(t,r):t,o=e.length-1,i;o>=0;o--)(i=e[o])&&(s=(n?i(t,r,s):i(s))||s);return n&&s&&Tn(t,r,s),s};let K=class extends st{constructor(){super(...arguments),this.editing=!1,this.draft="",this.commitEdit=()=>{!this.controller||!this.editing||(this.controller.updateNote(this.note.id,{text:this.draft.trim()}),this.editing=!1)}}updated(e){var t;e.has("note")&&!this.editing&&(this.draft=((t=this.note)==null?void 0:t.text)??"")}render(){if(!this.note)return null;const e=this.getPaletteStyles(this.note.color);return N`
      <article
        class="note"
        draggable=${String(!this.editing)}
        style=${fe({...e,"--tilt":`${this.getTilt(this.note.id)}deg`})}
        @dragstart=${this.handleDragStart}
        @dblclick=${this.beginEditing}
      >
        <div class="note-shell" aria-hidden="true">${kn(Cn)}</div>
        <button class="delete" @click=${this.handleDelete} title="Delete note">
          &times;
        </button>
        <div class="note-content">
          ${this.editing?N`
                <textarea
                  .value=${this.draft}
                  @input=${this.handleInput}
                  @keydown=${this.handleKeyDown}
                  @blur=${this.commitEdit}
                ></textarea>
              `:N`<p ?empty=${this.note.text.length===0} @click=${this.beginEditing}>
                ${this.note.text||"Double-click to add text"}
              </p>`}
        </div>
      </article>
    `}getTilt(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;return(t>>>0)%800/100-4}getPaletteStyles(e){const t=this.normalizeHex(e);if(!t)return{};const r=s=>this.mixHex(t,"#ffffff",s),n=s=>this.mixHex(t,"#000000",s);return{"--note-top":r(.35),"--note-bottom":n(.1),"--note-fold-light":r(.55),"--note-fold-dark":n(.05),"--note-stroke":n(.25),"--note-shadow":n(.7)}}normalizeHex(e){const t=e.trim().toLowerCase();if(/^#([0-9a-f]{3})$/i.test(t)){const[,r]=/^#([0-9a-f]{3})$/i.exec(t)??[];return r?`#${r.split("").map(n=>n+n).join("")}`:null}return/^#([0-9a-f]{6})$/i.test(t)?t:null}mixHex(e,t,r){const n=this.hexToRgb(e),s=this.hexToRgb(t);if(!n||!s)return e;const o=Math.min(Math.max(r,0),1),i=(d,c)=>Math.round(d+(c-d)*o);return this.rgbToHex({r:i(n.r,s.r),g:i(n.g,s.g),b:i(n.b,s.b)})}hexToRgb(e){const t=/^#([0-9a-f]{6})$/i.exec(e);if(!t)return null;const r=t[1],n=parseInt(r.slice(0,2),16),s=parseInt(r.slice(2,4),16),o=parseInt(r.slice(4,6),16);return{r:n,g:s,b:o}}rgbToHex({r:e,g:t,b:r}){const n=s=>s.toString(16).padStart(2,"0");return`#${n(Math.max(0,Math.min(255,e)))}${n(Math.max(0,Math.min(255,t)))}${n(Math.max(0,Math.min(255,r)))}`}beginEditing(e){e.stopPropagation(),!this.editing&&(this.editing=!0,this.draft=this.note.text,this.updateComplete.then(()=>{var t,r;(t=this.textarea)==null||t.focus(),(r=this.textarea)==null||r.select()}))}handleInput(e){const t=e.target;this.draft=t.value}handleKeyDown(e){e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.commitEdit()),e.key==="Escape"&&(e.preventDefault(),this.cancelEdit())}cancelEdit(){this.editing=!1,this.draft=this.note.text}handleDelete(e){var t;e.stopPropagation(),(t=this.controller)==null||t.deleteNote(this.note.id)}handleDragStart(e){if(!e.dataTransfer||this.editing)return;const t=this.getBoundingClientRect(),r=e.clientX-t.left,n=e.clientY-t.top;e.dataTransfer.setData(ur,JSON.stringify({noteId:this.note.id,offsetX:r,offsetY:n})),e.dataTransfer.effectAllowed="move"}};K.styles=we`
    :host {
      position: absolute;
      display: block;
      width: 110px;
      min-height: 70px;
    }

    .note {
      position: absolute;
      width: 110px;
      min-height: 70px;
      color: #4c3100;
      cursor: grab;
      transition: transform 120ms ease;
      transform-origin: center;
      transform: rotate(var(--tilt, 0deg));
    }

    .note:active {
      cursor: grabbing;
      transform: rotate(var(--tilt, 0deg)) scale(1.02);
    }

    .note-shell {
      pointer-events: none;
    }

    .note-shell svg {
      width: 100%;
      height: auto;
      display: block;
    }

    :host([dimmed]) {
      opacity: 0.25;
      filter: saturate(0.3);
    }

    .note-content {
      position: absolute;
      inset: 0.8rem 0.6rem 1.1rem;
      display: flex;
      align-items: flex-start;
      overflow: hidden;
    }

    .note-content :is(p, textarea) {
      flex: 1;
      max-height: 100%;
    }

    p {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-size: 0.95rem;
      line-height: 1.3;
      overflow: hidden;
    }

    p[empty] {
      opacity: 0.7;
    }

    textarea {
      width: 100%;
      min-height: 45px;
      height: 100%;
      max-height: 100%;
      border: none;
      resize: none;
      background: transparent;
      font: inherit;
      color: inherit;
      outline: none;
      overflow: auto;
    }

    .delete {
      position: absolute;
      top: 6px;
      right: 6px;
      border: none;
      background: rgba(15, 23, 42, 0.25);
      color: #2f1a00;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1;
    }
  `;ut([It({attribute:!1})],K.prototype,"note",2);ut([It({attribute:!1})],K.prototype,"controller",2);ut([L()],K.prototype,"editing",2);ut([L()],K.prototype,"draft",2);ut([tr("textarea")],K.prototype,"textarea",2);K=ut([_e("sticky-note")],K);var Nn=Object.defineProperty,On=Object.getOwnPropertyDescriptor,ft=(e,t,r,n)=>{for(var s=n>1?void 0:n?On(t,r):t,o=e.length-1,i;o>=0;o--)(i=e[o])&&(s=(n?i(t,r,s):i(s))||s);return n&&s&&Nn(t,r,s),s};let Y=class extends st{constructor(){super(...arguments),this.notes=[],this.zoom=1,this.highlightedParticipantId=null,this.zoomIn=()=>{this.setZoom(this.zoom+.1)},this.zoomOut=()=>{this.setZoom(this.zoom-.1)}}disconnectedCallback(){var e;(e=this.unsubscribe)==null||e.call(this),super.disconnectedCallback()}updated(e){e.has("controller")&&this.bindNotes()}render(){return N`
      <section
        class="board"
        @dblclick=${this.handleDoubleClick}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
        @wheel=${this.handleWheel}
      >
        <div class="workspace" style=${fe({"--scale":`${this.zoom}`})}>
          <div class="note-layer">
          ${this.notes.map(e=>this.renderNote(e))}
          </div>
        </div>
        <div class="canvas-controls" @click=${e=>e.stopPropagation()}>
          <button @click=${this.zoomOut} aria-label="Zoom out">−</button>
          <span>${Math.round(this.zoom*100)}%</span>
          <button @click=${this.zoomIn} aria-label="Zoom in">+</button>
        </div>
        ${this.controller?null:N`<div class="board-placeholder">Connecting to board…</div>`}
      </section>
    `}bindNotes(){var t;if((t=this.unsubscribe)==null||t.call(this),!this.controller){this.notes=[];return}const e=r=>{const n=r.detail;this.notes=n};this.controller.addEventListener("notes-changed",e),this.unsubscribe=()=>{var r;return(r=this.controller)==null?void 0:r.removeEventListener("notes-changed",e)},this.notes=this.controller.getNotes()}renderNote(e){const t=!!(this.highlightedParticipantId&&e.authorId&&e.authorId!==this.highlightedParticipantId),r=!!(this.highlightedParticipantId&&!e.authorId);return N`
      <sticky-note
        style=${fe({left:`${e.x}px`,top:`${e.y}px`})}
        ?dimmed=${t||r}
        .note=${e}
        .controller=${this.controller}
      ></sticky-note>
    `}handleDoubleClick(e){if(!this.controller||this.eventTargetsNote(e))return;const t=this.getWorkspaceRect();if(!t)return;const r=(e.clientX-t.left)/this.zoom-Sn/2,n=(e.clientY-t.top)/this.zoom-En/2;this.controller.createNote(this.defaultColumnId,r,n)}handleDragOver(e){e.dataTransfer&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}handleDrop(e){var c;if(!e.dataTransfer||!this.controller)return;const t=e.dataTransfer.getData(ur);if(!t)return;e.preventDefault();const r=this.parsePayload(t);if(!r)return;const s=((c=this.notes.find(m=>m.id===r.noteId))==null?void 0:c.columnId)??this.defaultColumnId,o=this.getWorkspaceRect();if(!o)return;const i=(e.clientX-o.left)/this.zoom-r.offsetX,d=(e.clientY-o.top)/this.zoom-r.offsetY;this.controller.moveNote(r.noteId,s,i,d)}handleWheel(e){if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();const t=-e.deltaY*.001;this.setZoom(this.zoom+t)}setZoom(e){const t=Math.min(2,Math.max(.5,e));t!==this.zoom&&(this.zoom=Number(t.toFixed(2)))}getWorkspaceRect(){var e;return((e=this.noteLayer)==null?void 0:e.getBoundingClientRect())??this.getBoundingClientRect()}get defaultColumnId(){var e;return(e=An[0])==null?void 0:e.id}eventTargetsNote(e){return e.composedPath().some(t=>t instanceof HTMLElement&&t.tagName==="STICKY-NOTE")}parsePayload(e){try{const t=JSON.parse(e);return typeof t.noteId!="string"?null:{noteId:t.noteId,offsetX:Number(t.offsetX)||0,offsetY:Number(t.offsetY)||0}}catch{return null}}};Y.styles=we`
    :host {
      position: fixed;
      inset: 0;
      display: block;
      z-index: 0;
    }

    .board {
      position: absolute;
      inset: 0;
      background: #ffffff;
      overflow: hidden;
    }

    .workspace {
      position: absolute;
      inset: 0;
      transform-origin: 0 0;
      transform: scale(var(--scale, 1));
    }

    .note-layer {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
    }

    .note-layer sticky-note {
      pointer-events: auto;
    }

    .board-placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 1rem 1.5rem;
      text-align: center;
      color: #475569;
      border: 1px dashed rgba(15, 23, 42, 0.2);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.9);
    }

    .canvas-controls {
      position: absolute;
      bottom: 1.5rem;
      right: 2rem;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(15, 23, 42, 0.12);
      border-radius: 999px;
      padding: 0.25rem 0.75rem;
      font-size: 0.9rem;
      color: #0f172a;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
      pointer-events: auto;
    }

    .canvas-controls button {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: rgba(15, 23, 42, 0.06);
      color: inherit;
      font-size: 1.1rem;
      cursor: pointer;
      line-height: 1;
      display: grid;
      place-items: center;
    }

    .canvas-controls span {
      min-width: 3rem;
      text-align: center;
    }

    @media (max-width: 900px) {
      .canvas-controls {
        right: 1rem;
        bottom: 1rem;
      }
    }
  `;ft([It({attribute:!1})],Y.prototype,"controller",2);ft([L()],Y.prototype,"notes",2);ft([L()],Y.prototype,"zoom",2);ft([It({attribute:!1})],Y.prototype,"highlightedParticipantId",2);ft([tr(".note-layer")],Y.prototype,"noteLayer",2);Y=ft([_e("retro-board")],Y);var Mn=Object.defineProperty,In=Object.getOwnPropertyDescriptor,W=(e,t,r,n)=>{for(var s=n>1?void 0:n?In(t,r):t,o=e.length-1,i;o>=0;o--)(i=e[o])&&(s=(n?i(t,r,s):i(s))||s);return n&&s&&Mn(t,r,s),s};const Je="metro-retro-profile",Xt=["#fbbf24","#ef4444","#22d3ee","#a855f7","#34d399","#f472b6"],qt={name:"",color:Xt[0]};let R=class extends st{constructor(){super(...arguments),this.boardId=null,this.copyState="idle",this.profile=null,this.profileDraft={...qt},this.showProfileDialog=!1,this.participants=[],this.highlightedParticipantId=null,this.onHashChange=()=>this.handleRoute(),this.onParticipantsChange=e=>{const t=e.detail;this.participants=t,this.highlightedParticipantId&&!t.some(r=>r.id===this.highlightedParticipantId)&&(this.highlightedParticipantId=null)},this.startFreshBoard=()=>{this.navigateToBoard(ee())},this.handleFilterChange=e=>{const t=e.target.value;this.highlightedParticipantId=t||null},this.handleProfileSubmit=e=>{e.preventDefault();const t=this.profileDraft.name.trim();if(!t)return;const r={name:t,color:this.profileDraft.color||qt.color};this.profile=r,this.profileDraft={...r},this.showProfileDialog=!1,this.persistProfile(r),this.boardId?this.bootstrapBoard(this.boardId):this.handleRoute()},this.handleProfileNameInput=e=>{const t=e.target;this.profileDraft={...this.profileDraft,name:t.value}},this.handleProfileColorInput=e=>{const t=e.target;this.profileDraft={...this.profileDraft,color:t.value}},this.randomizeProfileColor=()=>{const e=Xt[Math.floor(Math.random()*Xt.length)];this.profileDraft={...this.profileDraft,color:e}},this.openProfileDialog=()=>{this.profileDraft=this.profile?{...this.profile}:{...qt},this.showProfileDialog=!0},this.closeProfileDialog=()=>{this.profile&&(this.profileDraft={...this.profile},this.showProfileDialog=!1)}}connectedCallback(){super.connectedCallback(),this.initializeProfile(),window.addEventListener("hashchange",this.onHashChange),this.handleRoute()}disconnectedCallback(){var e,t;window.removeEventListener("hashchange",this.onHashChange),(e=this.controller)==null||e.removeEventListener("participants-changed",this.onParticipantsChange),(t=this.controller)==null||t.dispose(),super.disconnectedCallback()}render(){const e=!!(this.boardId&&this.controller&&this.profile);return N`
            <retro-board
                .controller=${this.controller}
                .highlightedParticipantId=${this.highlightedParticipantId}
            ></retro-board>
            <div class="ui-overlay">
                ${e?N`
                          <div class="toolbar">
                              <div class="toolbar-brand">
                                  <p class="eyebrow">libRetro</p>
                                  <p class="title">Board ${this.boardId}</p>
                              </div>
                              <div class="toolbar-controls">
                                  ${this.renderFilterControl()}
                                  <div class="toolbar-actions">
                                      <button
                                          class="ghost"
                                          @click=${this.openProfileDialog}
                                      >
                                          Profile
                                      </button>
                                      <button
                                          class="ghost"
                                          @click=${this.handleCopyLink}
                                      >
                                          ${this.copyLabel}
                                      </button>
                                      <button
                                          class="primary"
                                          @click=${this.startFreshBoard}
                                      >
                                          New
                                      </button>
                                  </div>
                              </div>
                          </div>
                      `:N`<div class="loading">
                          Preparing your retro board…
                      </div>`}
                ${this.renderProfileDialog()}
            </div>
        `}get copyLabel(){switch(this.copyState){case"copied":return"Link copied";case"error":return"Copy failed";default:return"Copy link"}}handleRoute(){const e=this.extractBoardId();if(!e){this.navigateToBoard(ee());return}e===this.boardId&&this.controller||this.bootstrapBoard(e)}extractBoardId(){const t=window.location.hash.replace(/^#/,"").match(/board\/([\w-]+)/i);return(t==null?void 0:t[1])??null}navigateToBoard(e){window.location.hash=`#/board/${e}`}bootstrapBoard(e){var r,n;if((r=this.controller)==null||r.removeEventListener("participants-changed",this.onParticipantsChange),(n=this.controller)==null||n.dispose(),this.boardId=e,!this.profile){this.controller=void 0,this.participants=[];return}const t=new xn(e,this.profileToParticipant(this.profile));t.addEventListener("participants-changed",this.onParticipantsChange),this.controller=t,this.participants=t.getParticipants(),this.copyState="idle"}async handleCopyLink(){try{await navigator.clipboard.writeText(window.location.href),this.copyState="copied"}catch{this.copyState="error"}finally{window.setTimeout(()=>this.copyState="idle",2e3)}}initializeProfile(){const e=this.readProfileFromStorage();if(e){this.profile=e,this.profileDraft={...e},this.showProfileDialog=!1;return}this.profile=null,this.profileDraft={...qt},this.showProfileDialog=!0}readProfileFromStorage(){if(typeof window>"u")return null;try{const e=window.localStorage.getItem(Je);if(!e)return null;const t=JSON.parse(e);return typeof(t==null?void 0:t.name)!="string"||typeof(t==null?void 0:t.color)!="string"?null:{name:t.name,color:t.color}}catch{return null}}persistProfile(e){if(!(typeof window>"u"))try{window.localStorage.setItem(Je,JSON.stringify(e))}catch{}}renderProfileDialog(){if(!this.showProfileDialog&&this.profile)return null;const e=this.profileDraft.name.trim().length>0,t=!!this.profile;return N`
            <div class="profile-overlay">
                <form class="profile-card" @submit=${this.handleProfileSubmit}>
                    <header>
                        <p class="eyebrow">Welcome</p>
                        <h2>Set up your marker</h2>
                        <p class="note">
                            Pick a display name and sticky color so teammates
                            know who is who.
                        </p>
                    </header>
                    <label>
                        <span>Name</span>
                        <input
                            type="text"
                            .value=${this.profileDraft.name}
                            @input=${this.handleProfileNameInput}
                            placeholder="e.g. Casey"
                            required
                        />
                    </label>
                    <label>
                        <span>Color</span>
                        <div class="color-row">
                            <input
                                type="color"
                                .value=${this.profileDraft.color}
                                @input=${this.handleProfileColorInput}
                            />
                            <div class="color-swatches">
                                ${Xt.map(r=>N`
                                        <button
                                            type="button"
                                            class="swatch"
                                            style=${`--swatch:${r}`}
                                            @click=${()=>this.setProfileColor(r)}
                                            aria-label=${`Use ${r}`}
                                        ></button>
                                    `)}
                            </div>
                            <button
                                type="button"
                                class="ghost"
                                @click=${this.randomizeProfileColor}
                            >
                                Random
                            </button>
                        </div>
                    </label>
                    <div class="profile-actions">
                        ${t?N`<button
                                  type="button"
                                  class="ghost"
                                  @click=${this.closeProfileDialog}
                              >
                                  Cancel
                              </button>`:null}
                        <button
                            class="primary"
                            type="submit"
                            ?disabled=${!e}
                        >
                            ${this.profile?"Save":"Enter board"}
                        </button>
                    </div>
                </form>
            </div>
        `}renderFilterControl(){return this.participants.length?N`
            <label class="filter-control">
                <select
                    @change=${this.handleFilterChange}
                    .value=${this.highlightedParticipantId??""}
                >
                    <option value="">All notes</option>
                    ${this.participants.map(e=>N`<option value=${e.id}>
                                ${e.label}
                            </option>`)}
                </select>
            </label>
        `:null}setProfileColor(e){this.profileDraft={...this.profileDraft,color:e}}profileToParticipant(e){return{label:e.name,color:e.color}}};R.styles=we`
        :host {
            display: block;
            font-family:
                "Inter",
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                sans-serif;
            color: #0f172a;
        }

        retro-board {
            position: fixed;
            inset: 0;
            z-index: 0;
        }

        .ui-overlay {
            position: fixed;
            inset: 0;
            z-index: 2;
            pointer-events: none;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            justify-content: flex-start;
        }

        .loading {
            margin-top: 20vh;
            font-size: 1.125rem;
            background: rgba(255, 255, 255, 0.85);
            padding: 1rem 1.5rem;
            border-radius: 16px;
            display: inline-block;
            pointer-events: auto;
        }

        .toolbar {
            pointer-events: auto;
            display: flex;
            align-items: stretch;
            justify-content: space-between;
            gap: 1.25rem;
            padding: 1rem 1.25rem;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
            width: min(100%, 960px);
        }

        .toolbar-brand {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }

        .title {
            margin: 0;
            font-size: 1.15rem;
            font-weight: 600;
            color: #111827;
        }

        .toolbar-controls {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 0.75rem;
            flex-wrap: wrap;
            flex: 1;
        }

        .toolbar-actions {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }

        .filter-control {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            font-size: 0.75rem;
            color: #64748b;
        }

        .filter-control span {
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 0.7rem;
            color: #94a3b8;
        }

        .filter-control select {
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.6);
            padding: 0.35rem 0.9rem;
            font-size: 0.85rem;
            background: #ffffff;
        }

        .eyebrow {
            font-size: 0.75rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin: 0;
            color: #94a3b8;
        }

        button {
            border-radius: 8px;
            padding: 0.45rem 1.1rem;
            font-size: 0.9rem;
            cursor: pointer;
            transition:
                background 120ms ease,
                color 120ms ease;
            pointer-events: auto;
            border: 1px solid transparent;
        }

        .primary {
            background: #111827;
            color: #f8fafc;
            border-color: #111827;
        }

        .ghost {
            background: #ffffff;
            color: #111827;
            border-color: rgba(15, 23, 42, 0.15);
        }

        .profile-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.3);
            display: grid;
            place-items: center;
            pointer-events: auto;
            padding: 1.5rem;
        }

        .profile-card {
            width: min(420px, 100%);
            background: #ffffff;
            border-radius: 16px;
            padding: 1.75rem;
            box-shadow: 0 25px 60px rgba(15, 23, 42, 0.15);
            border: 1px solid rgba(15, 23, 42, 0.08);
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .profile-card header {
            margin-bottom: 0.5rem;
        }

        .profile-card h2 {
            margin: 0.15rem 0 0.25rem;
            font-size: 1.4rem;
        }

        .profile-card .note {
            margin: 0;
            color: #64748b;
            font-size: 0.9rem;
        }

        label {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            font-size: 0.9rem;
            color: #475569;
        }

        input[type="text"] {
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.6);
            padding: 0.65rem 0.9rem;
            font-size: 1rem;
        }

        input[type="color"] {
            width: 44px;
            height: 44px;
            border: none;
            border-radius: 8px;
            background: transparent;
            padding: 0;
            cursor: pointer;
        }

        .color-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .color-swatches {
            display: flex;
            gap: 0.35rem;
            flex-wrap: wrap;
        }

        .swatch {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: 1px solid rgba(15, 23, 42, 0.2);
            background: var(--swatch, #fbbf24);
            cursor: pointer;
        }

        .swatch:focus-visible {
            outline: 2px solid #0ea5e9;
            outline-offset: 2px;
        }

        .profile-actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
        }

        .profile-actions .primary[disabled] {
            opacity: 0.4;
            cursor: not-allowed;
        }

        @media (max-width: 768px) {
            .ui-overlay {
                padding: 1rem;
            }

            .toolbar {
                flex-direction: column;
                align-items: flex-start;
                border-radius: 18px;
            }

            .toolbar-actions {
                width: 100%;
            }

            .profile-card {
                padding: 1.25rem;
            }
        }
    `;W([L()],R.prototype,"boardId",2);W([L()],R.prototype,"controller",2);W([L()],R.prototype,"copyState",2);W([L()],R.prototype,"profile",2);W([L()],R.prototype,"profileDraft",2);W([L()],R.prototype,"showProfileDialog",2);W([L()],R.prototype,"participants",2);W([L()],R.prototype,"highlightedParticipantId",2);R=W([_e("app-root")],R);
