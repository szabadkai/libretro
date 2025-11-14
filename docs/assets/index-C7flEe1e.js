(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kt=globalThis,be=Kt.ShadowRoot&&(Kt.ShadyCSS===void 0||Kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),Ae=new WeakMap;let Ve=class{constructor(t,n,r){if(this._$cssResult$=!0,r!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(be&&t===void 0){const r=n!==void 0&&n.length===1;r&&(t=Ae.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Ae.set(n,t))}return t}toString(){return this.cssText}};const bn=e=>new Ve(typeof e=="string"?e:e+"",void 0,we),$e=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((r,o,s)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[s+1],e[0]);return new Ve(n,e,we)},wn=(e,t)=>{if(be)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const r=document.createElement("style"),o=Kt.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=n.cssText,e.appendChild(r)}},ke=be?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const r of t.cssRules)n+=r.cssText;return bn(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:$n,defineProperty:vn,getOwnPropertyDescriptor:xn,getOwnPropertyNames:_n,getOwnPropertySymbols:Pn,getPrototypeOf:An}=Object,q=globalThis,Se=q.trustedTypes,kn=Se?Se.emptyScript:"",ie=q.reactiveElementPolyfillSupport,At=(e,t)=>e,te={toAttribute(e,t){switch(t){case Boolean:e=e?kn:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ve=(e,t)=>!$n(e,t),Ee={attribute:!0,type:String,converter:te,reflect:!1,useDefault:!1,hasChanged:ve};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),q.litPropertyMetadata??(q.litPropertyMetadata=new WeakMap);let ht=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Ee){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(t,r,n);o!==void 0&&vn(this.prototype,t,o)}}static getPropertyDescriptor(t,n,r){const{get:o,set:s}=xn(this.prototype,t)??{get(){return this[n]},set(i){this[n]=i}};return{get:o,set(i){const h=o==null?void 0:o.call(this);s==null||s.call(this,i),this.requestUpdate(t,h,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ee}static _$Ei(){if(this.hasOwnProperty(At("elementProperties")))return;const t=An(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(At("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(At("properties"))){const n=this.properties,r=[..._n(n),...Pn(n)];for(const o of r)this.createProperty(o,n[o])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[r,o]of n)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[n,r]of this.elementProperties){const o=this._$Eu(n,r);o!==void 0&&this._$Eh.set(o,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const o of r)n.unshift(ke(o))}else t!==void 0&&n.push(ke(t));return n}static _$Eu(t,n){const r=n.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const r of n.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return wn(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var r;return(r=n.hostConnected)==null?void 0:r.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var r;return(r=n.hostDisconnected)==null?void 0:r.call(n)})}attributeChangedCallback(t,n,r){this._$AK(t,r)}_$ET(t,n){var s;const r=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,r);if(o!==void 0&&r.reflect===!0){const i=(((s=r.converter)==null?void 0:s.toAttribute)!==void 0?r.converter:te).toAttribute(n,r.type);this._$Em=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,n){var s,i;const r=this.constructor,o=r._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const h=r.getPropertyOptions(o),c=typeof h.converter=="function"?{fromAttribute:h.converter}:((s=h.converter)==null?void 0:s.fromAttribute)!==void 0?h.converter:te;this._$Em=o;const g=c.fromAttribute(n,h.type);this[o]=g??((i=this._$Ej)==null?void 0:i.get(o))??g,this._$Em=null}}requestUpdate(t,n,r){var o;if(t!==void 0){const s=this.constructor,i=this[t];if(r??(r=s.getPropertyOptions(t)),!((r.hasChanged??ve)(i,n)||r.useDefault&&r.reflect&&i===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,n,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:r,reflect:o,wrapped:s},i){r&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,i??n??this[t]),s!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(n=void 0),this._$AL.set(t,n)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[s,i]of o){const{wrapped:h}=i,c=this[s];h!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,i,c)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(r=this._$EO)==null||r.forEach(o=>{var s;return(s=o.hostUpdate)==null?void 0:s.call(o)}),this.update(n)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(r=>{var o;return(o=r.hostUpdated)==null?void 0:o.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};ht.elementStyles=[],ht.shadowRootOptions={mode:"open"},ht[At("elementProperties")]=new Map,ht[At("finalized")]=new Map,ie==null||ie({ReactiveElement:ht}),(q.reactiveElementVersions??(q.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=globalThis,ee=kt.trustedTypes,Ce=ee?ee.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ze="$lit$",X=`lit$${Math.random().toFixed(9).slice(2)}$`,Qe="?"+X,Sn=`<${Qe}>`,it=document,Ct=()=>it.createComment(""),Tt=e=>e===null||typeof e!="object"&&typeof e!="function",xe=Array.isArray,En=e=>xe(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",ae=`[ 	
\f\r]`,wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Te=/-->/g,De=/>/g,Z=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oe=/'/g,Ne=/"/g,tn=/^(?:script|style|textarea|title)$/i,Cn=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),T=Cn(1),J=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Me=new WeakMap,rt=it.createTreeWalker(it,129);function en(e,t){if(!xe(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ce!==void 0?Ce.createHTML(t):t}const Tn=(e,t)=>{const n=e.length-1,r=[];let o,s=t===2?"<svg>":t===3?"<math>":"",i=wt;for(let h=0;h<n;h++){const c=e[h];let g,m,a=-1,d=0;for(;d<c.length&&(i.lastIndex=d,m=i.exec(c),m!==null);)d=i.lastIndex,i===wt?m[1]==="!--"?i=Te:m[1]!==void 0?i=De:m[2]!==void 0?(tn.test(m[2])&&(o=RegExp("</"+m[2],"g")),i=Z):m[3]!==void 0&&(i=Z):i===Z?m[0]===">"?(i=o??wt,a=-1):m[1]===void 0?a=-2:(a=i.lastIndex-m[2].length,g=m[1],i=m[3]===void 0?Z:m[3]==='"'?Ne:Oe):i===Ne||i===Oe?i=Z:i===Te||i===De?i=wt:(i=Z,o=void 0);const f=i===Z&&e[h+1].startsWith("/>")?" ":"";s+=i===wt?c+Sn:a>=0?(r.push(g),c.slice(0,a)+Ze+c.slice(a)+X+f):c+X+(a===-2?h:f)}return[en(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class Dt{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0;const h=t.length-1,c=this.parts,[g,m]=Tn(t,n);if(this.el=Dt.createElement(g,r),rt.currentNode=this.el.content,n===2||n===3){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(o=rt.nextNode())!==null&&c.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(const a of o.getAttributeNames())if(a.endsWith(Ze)){const d=m[i++],f=o.getAttribute(a).split(X),P=/([.?@])?(.*)/.exec(d);c.push({type:1,index:s,name:P[2],strings:f,ctor:P[1]==="."?On:P[1]==="?"?Nn:P[1]==="@"?Mn:re}),o.removeAttribute(a)}else a.startsWith(X)&&(c.push({type:6,index:s}),o.removeAttribute(a));if(tn.test(o.tagName)){const a=o.textContent.split(X),d=a.length-1;if(d>0){o.textContent=ee?ee.emptyScript:"";for(let f=0;f<d;f++)o.append(a[f],Ct()),rt.nextNode(),c.push({type:2,index:++s});o.append(a[d],Ct())}}}else if(o.nodeType===8)if(o.data===Qe)c.push({type:2,index:s});else{let a=-1;for(;(a=o.data.indexOf(X,a+1))!==-1;)c.push({type:7,index:s}),a+=X.length-1}s++}}static createElement(t,n){const r=it.createElement("template");return r.innerHTML=t,r}}function ut(e,t,n=e,r){var i,h;if(t===J)return t;let o=r!==void 0?(i=n._$Co)==null?void 0:i[r]:n._$Cl;const s=Tt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==s&&((h=o==null?void 0:o._$AO)==null||h.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=ut(e,o._$AS(e,t.values),o,r)),t}class Dn{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:r}=this._$AD,o=((t==null?void 0:t.creationScope)??it).importNode(n,!0);rt.currentNode=o;let s=rt.nextNode(),i=0,h=0,c=r[0];for(;c!==void 0;){if(i===c.index){let g;c.type===2?g=new Lt(s,s.nextSibling,this,t):c.type===1?g=new c.ctor(s,c.name,c.strings,this,t):c.type===6&&(g=new In(s,this,t)),this._$AV.push(g),c=r[++h]}i!==(c==null?void 0:c.index)&&(s=rt.nextNode(),i++)}return rt.currentNode=it,o}p(t){let n=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}}class Lt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=ut(this,t,n),Tt(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==J&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):En(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&Tt(this._$AH)?this._$AA.nextSibling.data=t:this.T(it.createTextNode(t)),this._$AH=t}$(t){var s;const{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Dt.createElement(en(r.h,r.h[0]),this.options)),r);if(((s=this._$AH)==null?void 0:s._$AD)===o)this._$AH.p(n);else{const i=new Dn(o,this),h=i.u(this.options);i.p(n),this.T(h),this._$AH=i}}_$AC(t){let n=Me.get(t.strings);return n===void 0&&Me.set(t.strings,n=new Dt(t)),n}k(t){xe(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let r,o=0;for(const s of t)o===n.length?n.push(r=new Lt(this.O(Ct()),this.O(Ct()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,n);t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}}class re{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=A}_$AI(t,n=this,r,o){const s=this.strings;let i=!1;if(s===void 0)t=ut(this,t,n,0),i=!Tt(t)||t!==this._$AH&&t!==J,i&&(this._$AH=t);else{const h=t;let c,g;for(t=s[0],c=0;c<s.length-1;c++)g=ut(this,h[r+c],n,c),g===J&&(g=this._$AH[c]),i||(i=!Tt(g)||g!==this._$AH[c]),g===A?t=A:t!==A&&(t+=(g??"")+s[c+1]),this._$AH[c]=g}i&&!o&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class On extends re{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class Nn extends re{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class Mn extends re{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=ut(this,t,n,0)??A)===J)return;const r=this._$AH,o=t===A&&r!==A||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==A&&(r===A||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}}class In{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){ut(this,t)}}const ce=kt.litHtmlPolyfillSupport;ce==null||ce(Dt,Lt),(kt.litHtmlVersions??(kt.litHtmlVersions=[])).push("3.3.1");const Ln=(e,t,n)=>{const r=(n==null?void 0:n.renderBefore)??t;let o=r._$litPart$;if(o===void 0){const s=(n==null?void 0:n.renderBefore)??null;r._$litPart$=o=new Lt(t.insertBefore(Ct(),s),s,void 0,n??{})}return o._$AI(e),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot=globalThis;let st=class extends ht{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ln(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return J}};var Je;st._$litElement$=!0,st.finalized=!0,(Je=ot.litElementHydrateSupport)==null||Je.call(ot,{LitElement:st});const le=ot.litElementPolyfillSupport;le==null||le({LitElement:st});(ot.litElementVersions??(ot.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Un={attribute:!0,type:String,converter:te,reflect:!1,hasChanged:ve},Rn=(e=Un,t,n)=>{const{kind:r,metadata:o}=n;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(n.name,e),r==="accessor"){const{name:i}=n;return{set(h){const c=t.get.call(this);t.set.call(this,h),this.requestUpdate(i,c,e)},init(h){return h!==void 0&&this.C(i,void 0,e,h),h}}}if(r==="setter"){const{name:i}=n;return function(h){const c=this[i];t.call(this,h),this.requestUpdate(i,c,e)}}throw Error("Unsupported decorator location: "+r)};function ft(e){return(t,n)=>typeof n=="object"?Rn(e,t,n):((r,o,s)=>{const i=o.hasOwnProperty(s);return o.constructor.createProperty(s,r),i?Object.getOwnPropertyDescriptor(o,s):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function O(e){return ft({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hn=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,n),n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function nn(e,t){return(n,r,o)=>{const s=i=>{var h;return((h=i.renderRoot)==null?void 0:h.querySelector(e))??null};return Hn(n,r,{get(){return s(this)}})}}const C=[];for(let e=0;e<256;++e)C.push((e+256).toString(16).slice(1));function zn(e,t=0){return(C[e[t+0]]+C[e[t+1]]+C[e[t+2]]+C[e[t+3]]+"-"+C[e[t+4]]+C[e[t+5]]+"-"+C[e[t+6]]+C[e[t+7]]+"-"+C[e[t+8]]+C[e[t+9]]+"-"+C[e[t+10]]+C[e[t+11]]+C[e[t+12]]+C[e[t+13]]+C[e[t+14]]+C[e[t+15]]).toLowerCase()}let de;const Bn=new Uint8Array(16);function jn(){if(!de){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");de=crypto.getRandomValues.bind(crypto)}return de(Bn)}const Fn=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Ie={randomUUID:Fn};function Gn(e,t,n){var o;e=e||{};const r=e.random??((o=e.rng)==null?void 0:o.call(e))??jn();if(r.length<16)throw new Error("Random bytes length must be >= 16");return r[6]=r[6]&15|64,r[8]=r[8]&63|128,zn(r)}function ne(e,t,n){return Ie.randomUUID&&!e?Ie.randomUUID():Gn(e)}const{floor:Wn,random:Yn}=Math,Ot="Trystero",Nt=(e,t)=>Array(e).fill().map(t),Le="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",rn=e=>Nt(e,()=>Le[Wn(Yn()*Le.length)]).join(""),K=rn(20),nt=Promise.all.bind(Promise),on=typeof window<"u",{entries:ue,fromEntries:sn,keys:Xn}=Object,W=()=>{},Y=e=>new Error(`${Ot}: ${e}`),Kn=new TextEncoder,qn=new TextDecoder,pt=e=>Kn.encode(e),qt=e=>qn.decode(e),Gt=(...e)=>e.join("@"),Jn=(e,t,n,r)=>(e.relayUrls||t).slice(0,e.relayUrls?e.relayUrls.length:e.relayRedundancy||n),Mt=JSON.stringify,It=JSON.parse,Ue=3333,lt={};let St=null,Et=null;const Vn=()=>{St||(St=new Promise(e=>{Et=e}).finally(()=>{Et=null,St=null}))},Zn=()=>Et==null?void 0:Et(),Qn=(e,t)=>{const n={},r=()=>{const o=new WebSocket(e);o.onclose=()=>{if(St){St.then(r);return}lt[e]??(lt[e]=Ue),setTimeout(r,lt[e]),lt[e]*=2},o.onmessage=s=>t(s.data),n.socket=o,n.url=o.url,n.ready=new Promise(s=>o.onopen=()=>{s(n),lt[e]=Ue}),n.send=s=>{o.readyState===1&&o.send(s)}};return r(),n},tr=()=>{if(on){const e=new AbortController;return addEventListener("online",Zn,{signal:e.signal}),addEventListener("offline",Vn,{signal:e.signal}),()=>e.abort()}return W},Pe="AES-GCM",he={},er=e=>btoa(String.fromCharCode.apply(null,new Uint8Array(e))),nr=e=>{const t=atob(e);return new Uint8Array(t.length).map((n,r)=>t.charCodeAt(r)).buffer},rr=async(e,t)=>new Uint8Array(await crypto.subtle.digest(e,pt(t))),vt=async e=>he[e]||(he[e]=Array.from(await rr("SHA-1",e)).map(t=>t.toString(36)).join("")),or=async(e,t,n)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},pt(`${e}:${t}:${n}`)),{name:Pe},!1,["encrypt","decrypt"]),an="$",cn=",",sr=async(e,t)=>{const n=crypto.getRandomValues(new Uint8Array(16));return n.join(cn)+an+er(await crypto.subtle.encrypt({name:Pe,iv:n},await e,pt(t)))},ir=async(e,t)=>{const[n,r]=t.split(an);return qt(await crypto.subtle.decrypt({name:Pe,iv:new Uint8Array(n.split(cn))},await e,nr(r)))},ar=5e3,Re="icegatheringstatechange",He="offer",cr="answer",ze=(e,{rtcConfig:t,rtcPolyfill:n,turnConfig:r})=>{const o=new(n||RTCPeerConnection)({iceServers:lr.concat(r||[]),...t}),s={};let i=!1,h=!1,c=null;const g=a=>{a.binaryType="arraybuffer",a.bufferedAmountLowThreshold=65535,a.onmessage=d=>{var f;return(f=s.data)==null?void 0:f.call(s,d.data)},a.onopen=()=>{var d;return(d=s.connect)==null?void 0:d.call(s)},a.onclose=()=>{var d;return(d=s.close)==null?void 0:d.call(s)},a.onerror=d=>{var f;return(f=s.error)==null?void 0:f.call(s,d)}},m=a=>Promise.race([new Promise(d=>{const f=()=>{a.iceGatheringState==="complete"&&(a.removeEventListener(Re,f),d())};a.addEventListener(Re,f),f()}),new Promise(d=>setTimeout(d,ar))]).then(()=>({type:a.localDescription.type,sdp:a.localDescription.sdp.replace(/a=ice-options:trickle\s\n/g,"")}));return e?(c=o.createDataChannel("data"),g(c)):o.ondatachannel=({channel:a})=>{c=a,g(a)},o.onnegotiationneeded=async()=>{var a,d;try{i=!0,await o.setLocalDescription();const f=await m(o);(a=s.signal)==null||a.call(s,f)}catch(f){(d=s.error)==null||d.call(s,f)}finally{i=!1}},o.onconnectionstatechange=()=>{var a;["disconnected","failed","closed"].includes(o.connectionState)&&((a=s.close)==null||a.call(s))},o.ontrack=a=>{var d,f;(d=s.track)==null||d.call(s,a.track,a.streams[0]),(f=s.stream)==null||f.call(s,a.streams[0])},o.onremovestream=a=>{var d;return(d=s.stream)==null?void 0:d.call(s,a.stream)},e&&(o.canTrickleIceCandidates||o.onnegotiationneeded()),{created:Date.now(),connection:o,get channel(){return c},get isDead(){return o.connectionState==="closed"},async signal(a){var d,f,P;if(!((c==null?void 0:c.readyState)==="open"&&!((d=a.sdp)!=null&&d.includes("a=rtpmap"))))try{if(a.type===He){if(i||o.signalingState!=="stable"&&!h){if(e)return;await nt([o.setLocalDescription({type:"rollback"}),o.setRemoteDescription(a)])}else await o.setRemoteDescription(a);await o.setLocalDescription();const I=await m(o);return(f=s.signal)==null||f.call(s,I),I}else if(a.type===cr){h=!0;try{await o.setRemoteDescription(a)}finally{h=!1}}}catch(I){(P=s.error)==null||P.call(s,I)}},sendData:a=>c.send(a),destroy:()=>{c==null||c.close(),o.close(),i=!1,h=!1},setHandlers:a=>Object.assign(s,a),offerPromise:e?new Promise(a=>s.signal=d=>{d.type===He&&a(d)}):Promise.resolve(),addStream:a=>a.getTracks().forEach(d=>o.addTrack(d,a)),removeStream:a=>o.getSenders().filter(d=>a.getTracks().includes(d.track)).forEach(d=>o.removeTrack(d)),addTrack:(a,d)=>o.addTrack(a,d),removeTrack:a=>{const d=o.getSenders().find(f=>f.track===a);d&&o.removeTrack(d)},replaceTrack:(a,d)=>{const f=o.getSenders().find(P=>P.track===a);if(f)return f.replaceTrack(d)}}},lr=[...Nt(3,(e,t)=>`stun:stun${t||""}.l.google.com:19302`),"stun:stun.cloudflare.com:3478"].map(e=>({urls:e})),dr=Object.getPrototypeOf(Uint8Array),Jt=12,ln=0,Vt=ln+Jt,Zt=Vt+1,xt=Zt+1,_t=xt+1,Q=16*2**10-_t,Wt=255,Be="bufferedamountlow",dt=e=>"@_"+e,hr=(e,t,n)=>{const r={},o={},s={},i={},h={},c={},g={},m={onPeerJoin:W,onPeerLeave:W,onPeerStream:W,onPeerTrack:W},a=(l,p)=>(l?Array.isArray(l)?l:[l]:Xn(r)).flatMap(y=>{const w=r[y];return w?p(y,w):(console.warn(`${Ot}: no peer with id ${y} found`),[])}),d=l=>{r[l]&&(r[l].destroy(),delete r[l],delete i[l],delete h[l],m.onPeerLeave(l),t(l))},f=l=>{if(o[l])return s[l];if(!l)throw Y("action type argument is required");const p=pt(l);if(p.byteLength>Jt)throw Y(`action type string "${l}" (${p.byteLength}b) exceeds byte limit (${Jt}). Hint: choose a shorter name.`);const y=new Uint8Array(Jt);y.set(p);let w=0;return o[l]={onComplete:W,onProgress:W,setOnComplete:v=>o[l]={...o[l],onComplete:v},setOnProgress:v=>o[l]={...o[l],onProgress:v},send:async(v,M,u,b)=>{if(u&&typeof u!="object")throw Y("action meta argument must be an object");const _=typeof v;if(_==="undefined")throw Y("action data cannot be undefined");const k=_!=="string",D=v instanceof Blob,L=D||v instanceof ArrayBuffer||v instanceof dr;if(u&&!L)throw Y("action meta argument can only be used with binary data");const $=L?new Uint8Array(D?await v.arrayBuffer():v):pt(k?Mt(v):v),z=u?pt(Mt(u)):null,U=Math.ceil($.byteLength/Q)+(u?1:0)||1,B=Nt(U,(N,S)=>{const j=S===U-1,E=u&&S===0,x=new Uint8Array(_t+(E?z.byteLength:j?$.byteLength-Q*(U-(u?2:1)):Q));return x.set(y),x.set([w],Vt),x.set([j|E<<1|L<<2|k<<3],Zt),x.set([Math.round((S+1)/U*Wt)],xt),x.set(u?E?z:$.subarray((S-1)*Q,S*Q):$.subarray(S*Q,(S+1)*Q),_t),x});return w=w+1&Wt,nt(a(M,async(N,S)=>{const{channel:j}=S;let E=0;for(;E<U;){const x=B[E];if(j.bufferedAmount>j.bufferedAmountLowThreshold&&await new Promise(ct=>{const Ft=()=>{j.removeEventListener(Be,Ft),ct()};j.addEventListener(Be,Ft)}),!r[N])break;S.sendData(x),E++,b==null||b(x[xt]/Wt,N,u)}}))}},s[l]||(s[l]=[o[l].send,o[l].setOnComplete,o[l].setOnProgress])},P=(l,p)=>{var U,B;const y=new Uint8Array(p),w=qt(y.subarray(ln,Vt)).replaceAll("\0",""),[v]=y.subarray(Vt,Zt),[M]=y.subarray(Zt,xt),[u]=y.subarray(xt,_t),b=y.subarray(_t),_=!!(M&1),k=!!(M&2),D=!!(M&4),L=!!(M&8);if(!o[w]){console.warn(`${Ot}: received message with unregistered type (${w})`);return}i[l]||(i[l]={}),(U=i[l])[w]||(U[w]={});const $=(B=i[l][w])[v]||(B[v]={chunks:[]});if(k?$.meta=It(qt(b)):$.chunks.push(b),o[w].onProgress(u/Wt,l,$.meta),!_)return;const z=new Uint8Array($.chunks.reduce((N,S)=>N+S.byteLength,0));if($.chunks.reduce((N,S)=>(z.set(S,N),N+S.byteLength),0),delete i[l][w][v],D)o[w].onComplete(z,l,$.meta);else{const N=qt(z);o[w].onComplete(L?It(N):N,l)}},I=async()=>{await Bt(""),await new Promise(l=>setTimeout(l,99)),ue(r).forEach(([l,p])=>{p.destroy(),delete r[l]}),n()},[mt,yt]=f(dt("ping")),[oe,Ut]=f(dt("pong")),[Rt,Ht]=f(dt("signal")),[zt,bt]=f(dt("stream")),[at,se]=f(dt("track")),[Bt,jt]=f(dt("leave"));return e((l,p)=>{r[p]||(r[p]=l,l.setHandlers({data:y=>P(p,y),stream:y=>{m.onPeerStream(y,p,c[p]),delete c[p]},track:(y,w)=>{m.onPeerTrack(y,w,p,g[p]),delete g[p]},signal:y=>Rt(y,p),close:()=>d(p),error:y=>{console.error(y),d(p)}}),m.onPeerJoin(p))}),yt((l,p)=>oe("",p)),Ut((l,p)=>{var y;(y=h[p])==null||y.call(h),delete h[p]}),Ht((l,p)=>{var y;return(y=r[p])==null?void 0:y.signal(l)}),bt((l,p)=>c[p]=l),se((l,p)=>g[p]=l),jt((l,p)=>d(p)),on&&addEventListener("beforeunload",I),{makeAction:f,leave:I,ping:async l=>{if(!l)throw Y("ping() must be called with target peer ID");const p=Date.now();return mt("",l),await new Promise(y=>h[l]=y),Date.now()-p},getPeers:()=>sn(ue(r).map(([l,p])=>[l,p.connection])),addStream:(l,p,y)=>a(p,async(w,v)=>{y&&await zt(y,w),v.addStream(l)}),removeStream:(l,p)=>a(p,(y,w)=>w.removeStream(l)),addTrack:(l,p,y,w)=>a(y,async(v,M)=>{w&&await at(w,v),M.addTrack(l,p)}),removeTrack:(l,p)=>a(p,(y,w)=>w.removeTrack(l)),replaceTrack:(l,p,y,w)=>a(y,async(v,M)=>{w&&await at(w,v),M.replaceTrack(l,p)}),onPeerJoin:l=>m.onPeerJoin=l,onPeerLeave:l=>m.onPeerLeave=l,onPeerStream:l=>m.onPeerStream=l,onPeerTrack:l=>m.onPeerTrack=l}},pr=20,ur=5333,je=57333,fr=({init:e,subscribe:t,announce:n})=>{const r={};let o=!1,s,i,h,c;return(g,m,a)=>{var M;const{appId:d}=g;if((M=r[d])!=null&&M[m])return r[d][m];const f={},P={},I=Gt(Ot,d,m),mt=vt(I),yt=vt(Gt(I,K)),oe=or(g.password||"",d,m),Ut=u=>async b=>({type:b.type,sdp:await u(oe,b.sdp)}),Rt=Ut(ir),Ht=Ut(sr),zt=()=>ze(!0,g),bt=(u,b,_)=>{var k;if(P[b]){P[b]!==u&&u.destroy();return}P[b]=u,v(u,b),(k=f[b])==null||k.forEach((D,L)=>{L!==_&&D.destroy()}),delete f[b]},at=(u,b)=>{P[b]===u&&delete P[b]},se=(u,b)=>{var k;if(P[u])return;const _=(k=f[u])==null?void 0:k[b];_&&(delete f[u][b],_.destroy())},Bt=u=>(i.push(...Nt(u,zt)),nt(i.splice(0,u).map(b=>b.offerPromise.then(Ht).then(_=>({peer:b,offer:_}))))),jt=(u,b)=>a==null?void 0:a({error:`incorrect password (${g.password}) when decrypting ${b}`,appId:d,peerId:u,roomId:m}),l=u=>async(b,_,k)=>{var N,S,j;const[D,L]=await nt([mt,yt]);if(b!==D&&b!==L)return;const{peerId:$,offer:z,answer:U,peer:B}=typeof _=="string"?It(_):_;if(!($===K||P[$])){if($&&!z&&!U){if((N=f[$])!=null&&N[u])return;const[[{peer:E,offer:x}],ct]=await nt([Bt(1),vt(Gt(I,$))]);f[$]||(f[$]=[]),f[$][u]=E,setTimeout(()=>se($,u),p[u]*.9),E.setHandlers({connect:()=>bt(E,$,u),close:()=>at(E,$)}),k(ct,Mt({peerId:K,offer:x}))}else if(z){if(((S=f[$])==null?void 0:S[u])&&K>$)return;const x=ze(!1,g);x.setHandlers({connect:()=>bt(x,$,u),close:()=>at(x,$)});let ct;try{ct=await Rt(z)}catch{jt($,"offer");return}if(x.isDead)return;const[Ft,yn]=await nt([vt(Gt(I,$)),x.signal(ct)]);k(Ft,Mt({peerId:K,answer:await Ht(yn)}))}else if(U){let E;try{E=await Rt(U)}catch{jt($,"answer");return}if(B)B.setHandlers({connect:()=>bt(B,$,u),close:()=>at(B,$)}),B.signal(E);else{const x=(j=f[$])==null?void 0:j[u];x&&!x.isDead&&x.signal(E)}}}};if(!g)throw Y("requires a config map as the first argument");if(!d&&!g.firebaseApp)throw Y("config map is missing appId field");if(!m)throw Y("roomId argument required");if(!o){const u=e(g);i=Nt(pr,zt),s=Array.isArray(u)?u:[u],o=!0,h=setInterval(()=>i=i.filter(b=>{const _=Date.now()-b.created<je;return _||b.destroy(),_}),je*1.03),c=g.manualRelayReconnection?W:tr()}const p=s.map(()=>ur),y=[],w=s.map(async(u,b)=>t(await u,await mt,await yt,l(b),Bt));nt([mt,yt]).then(([u,b])=>{const _=async(k,D)=>{const L=await n(k,u,b);typeof L=="number"&&(p[D]=L),y[D]=setTimeout(()=>_(k,D),p[D])};w.forEach(async(k,D)=>{await k,_(await s[D],D)})});let v=W;return r[d]||(r[d]={}),r[d][m]=hr(u=>v=u,u=>delete P[u],()=>{delete r[d][m],y.forEach(clearTimeout),w.forEach(async u=>(await u)()),clearInterval(h),c(),o=!1})}},pe={},dn={},tt={},et={},$t={},Fe={},Yt={},gr="announce",hn=20,Ge=10,mr=33333,yr=120333,br=3,wr=async e=>{if(pe[e])return pe[e];const t=(await vt(e)).slice(0,hn);return pe[e]=t,dn[t]=e,t},We=async(e,t,n)=>e.send(Mt({action:gr,info_hash:await wr(t),peer_id:K,...n})),Ye=(e,t,n)=>console.warn(`${Ot}: torrent tracker ${n?"failure":"warning"} from ${e} - ${t}`),$r=fr({init:e=>Jn(e,vr,br).map(t=>{const n=Qn(t,o=>{var m,a;const s=It(o),i=s["failure reason"],h=s["warning message"],{interval:c}=s,g=dn[s.info_hash];if(i){Ye(r,i,!0);return}if(h&&Ye(r,h),c&&c*1e3>$t[r]&&et[r][g]){const d=Math.min(c*1e3,yr);clearInterval(tt[r][g]),$t[r]=d,tt[r][g]=setInterval(et[r][g],d)}Fe[s.offer_id]||(s.offer||s.answer)&&(Fe[s.offer_id]=!0,(a=(m=Yt[r])[g])==null||a.call(m,s))}),{url:r}=n;return Yt[r]={},n.ready}),subscribe:(e,t,n,r,o)=>{const{url:s}=e,i=async()=>{const h=sn((await o(Ge)).map(c=>[rn(hn),c]));Yt[e.url][t]=c=>{if(c.offer)r(t,{offer:c.offer,peerId:c.peer_id},(g,m)=>We(e,t,{answer:It(m).answer,offer_id:c.offer_id,to_peer_id:c.peer_id}));else if(c.answer){const g=h[c.offer_id];g&&r(t,{answer:c.answer,peerId:c.peer_id,peer:g.peer})}},We(e,t,{numwant:Ge,offers:ue(h).map(([c,{offer:g}])=>({offer_id:c,offer:g}))})};return $t[s]=mr,et[s]||(et[s]={}),et[s][t]=i,tt[s]||(tt[s]={}),tt[s][t]=setInterval(i,$t[s]),i(),()=>{clearInterval(tt[s][t]),delete Yt[s][t],delete et[s][t]}},announce:e=>$t[e.url]}),vr=["tracker.webtorrent.dev","tracker.openwebtorrent.com","tracker.btorrent.xyz","tracker.files.fm:7073/announce"].map(e=>"wss://"+e),xr="metro-retro:board:",fe=e=>`${xr}${e}`;function _r(e){if(typeof window>"u")return null;const t=window.localStorage.getItem(fe(e));if(!t)return null;try{return JSON.parse(t)}catch(n){return console.warn("Failed to parse snapshot",n),window.localStorage.removeItem(fe(e)),null}}function Pr(e,t){if(!(typeof window>"u"))try{window.localStorage.setItem(fe(e),JSON.stringify(t))}catch(n){console.warn("Failed to persist snapshot",n)}}const Xe="wss://tracker.webtorrent.dev,wss://tracker.openwebtorrent.com".split(",").map(e=>e.trim()).filter(Boolean);class Ar extends EventTarget{constructor(t,n){var r;super(),this.status="connecting",this.notes=new Map,this.participants=new Map,this.boardId=t,this.localParticipant={id:K,label:((r=n==null?void 0:n.label)==null?void 0:r.trim())||`Guest ${ne().slice(0,4).toUpperCase()}`,color:(n==null?void 0:n.color)||this.randomAccent()},this.participants.set(K,this.localParticipant),this.restoreSnapshot(),this.connectRoom()}dispose(){var t;typeof window<"u"&&window.clearTimeout(this.persistHandle),(t=this.room)==null||t.leave()}getNotes(){return Array.from(this.notes.values()).sort((t,n)=>t.createdAt-n.createdAt)}getParticipants(){return Array.from(this.participants.values())}createNote(t,n,r){const o=Date.now(),s={id:ne(),columnId:t,text:"",...this.normalizePosition(n,r),color:this.localParticipant.color,authorId:this.localParticipant.id,createdAt:o,updatedAt:o};this.applyUpsert(s),this.broadcastNote({type:"upsert",note:s})}updateNote(t,n){const r=this.notes.get(t);if(!r)return;const o={...r,...n,updatedAt:Date.now()};this.applyUpsert(o),this.broadcastNote({type:"upsert",note:o})}moveNote(t,n,r,o){this.updateNote(t,{columnId:n,...this.normalizePosition(r,o)})}deleteNote(t){this.notes.get(t)&&(this.notes.delete(t),this.emitNotesChanged(),this.schedulePersist(),this.broadcastNote({type:"delete",id:t,updatedAt:Date.now()}))}connectRoom(){const t={appId:"metro-retro",relayUrls:Xe.length?Xe:void 0};this.room=$r(t,this.boardId),this.updateStatus("connected"),this.setupMessaging(),this.setupPresence()}setupMessaging(){if(!this.room)return;const[t,n]=this.room.makeAction("note");this.sendNoteMessage=(r,o)=>t(r,o),n((r,o)=>{var s;switch(r.type){case"upsert":this.applyUpsert(r.note);break;case"delete":this.applyDelete(r.id,r.updatedAt);break;case"sync-request":(s=this.sendNoteMessage)==null||s.call(this,{type:"sync-response",notes:this.getNotes()},o);break;case"sync-response":r.notes.forEach(i=>this.applyUpsert(i));break}}),this.room.onPeerJoin(r=>{var o,s;this.updateStatus("connected"),(o=this.sendPresenceMessage)==null||o.call(this,{participant:this.localParticipant},r),(s=this.sendNoteMessage)==null||s.call(this,{type:"sync-request"},r)}),this.room.onPeerLeave(r=>{this.participants.delete(r),this.emitParticipantsChanged()})}setupPresence(){var r;if(!this.room)return;const[t,n]=this.room.makeAction("presence");this.sendPresenceMessage=(o,s)=>t(o,s),n(o=>{o!=null&&o.participant&&(this.participants.set(o.participant.id,o.participant),this.emitParticipantsChanged())}),this.emitParticipantsChanged(),(r=this.sendPresenceMessage)==null||r.call(this,{participant:this.localParticipant})}broadcastNote(t){var n;(n=this.sendNoteMessage)==null||n.call(this,t)}applyUpsert(t){const n=this.notes.get(t.id);n&&n.updatedAt>t.updatedAt||(this.notes.set(t.id,t),this.schedulePersist(),this.emitNotesChanged())}applyDelete(t,n){const r=this.notes.get(t);!r||r.updatedAt>n||(this.notes.delete(t),this.emitNotesChanged(),this.schedulePersist())}emitNotesChanged(){this.dispatchEvent(new CustomEvent("notes-changed",{detail:this.getNotes()}))}emitParticipantsChanged(){this.dispatchEvent(new CustomEvent("participants-changed",{detail:this.getParticipants()}))}normalizePosition(t,n){const r=Number.isFinite(t)?Number(t):24,o=Number.isFinite(n)?Number(n):24;return{x:Math.max(12,r),y:Math.max(12,o)}}updateStatus(t){this.status=t,this.dispatchEvent(new CustomEvent("status-changed",{detail:t}))}restoreSnapshot(){const t=_r(this.boardId);t!=null&&t.notes&&(t.notes.forEach(n=>this.notes.set(n.id,n)),this.emitNotesChanged())}schedulePersist(){typeof window>"u"||(window.clearTimeout(this.persistHandle),this.persistHandle=window.setTimeout(()=>{Pr(this.boardId,{notes:this.getNotes()})},400))}randomAccent(){const t=["#fbbf24","#ef4444","#22d3ee","#a855f7","#34d399","#f472b6"];return t[Math.floor(Math.random()*t.length)]}}const kr=[{id:"good",label:"Good",description:"Wins and bright spots worth repeating",accent:"#34d399"},{id:"bad",label:"Bad",description:"Pain points or risks we should address",accent:"#f87171"},{id:"start",label:"Start",description:"New ideas to try next sprint",accent:"#60a5fa"},{id:"stop",label:"Stop",description:"Habits that no longer serve us",accent:"#fbbf24"}],Sr=110,Er=70,pn="application/x-metro-note",ge=[{id:"good-bad",label:"Good vs Bad",description:"Classic two-column retro",asset:"/good-bad.png",columns:[{title:"Good",description:"Wins and bright spots",accent:"#22c55e"},{title:"Bad",description:"Issues or blockers",accent:"#ef4444"}]},{id:"start-stop-continue",label:"Start / Stop / Continue",description:"Three-part action board",asset:"/start-stop-continue.png",columns:[{title:"Start",description:"Ideas to try",accent:"#0ea5e9"},{title:"Stop",description:"Habits to drop",accent:"#f97316"},{title:"Continue",description:"Keep doing these",accent:"#6366f1"}]},{id:"mad-sad-glad",label:"Mad / Sad / Glad",description:"Emotional check-in",asset:"/mad-sad-glad.png",columns:[{title:"Mad",description:"Frustrations & annoyances",accent:"#f87171"},{title:"Sad",description:"Letdowns & concerns",accent:"#facc15"},{title:"Glad",description:"Highlights & celebrations",accent:"#34d399"}]},{id:"four-ls",label:"4Ls",description:"Liked, Learned, Lacked, Longed for",asset:"/4Ls.png",columns:[{title:"Liked",description:"What worked well",accent:"#22c55e"},{title:"Learned",description:"New insights",accent:"#3b82f6"},{title:"Lacked",description:"Missing pieces",accent:"#fbbf24"},{title:"Longed for",description:"Wish we had…",accent:"#a855f7"}]}];/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const un={ATTRIBUTE:1,CHILD:2},fn=e=>(...t)=>({_$litDirective$:e,values:t});let gn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mn="important",Cr=" !"+mn,Pt=fn(class extends gn{constructor(e){var t;if(super(e),e.type!==un.ATTRIBUTE||e.name!=="style"||((t=e.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{const r=e[n];return r==null?t:t+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){const{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?n.removeProperty(r):n[r]=null);for(const r in t){const o=t[r];if(o!=null){this.ft.add(r);const s=typeof o=="string"&&o.endsWith(Cr);r.includes("-")||s?n.setProperty(r,s?o.slice(0,-11):o,s?mn:""):n[r]=o}}return J}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class me extends gn{constructor(t){if(super(t),this.it=A,t.type!==un.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===A||t==null)return this._t=void 0,this.it=t;if(t===J)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}me.directiveName="unsafeHTML",me.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ye extends me{}ye.directiveName="unsafeSVG",ye.resultType=2;const Tr=fn(ye),Dr=`<svg
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
`;var Or=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,gt=(e,t,n,r)=>{for(var o=r>1?void 0:r?Nr(t,n):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=(r?i(t,n,o):i(o))||o);return r&&o&&Or(t,n,o),o};let V=class extends st{constructor(){super(...arguments),this.editing=!1,this.draft="",this.commitEdit=()=>{!this.controller||!this.editing||(this.controller.updateNote(this.note.id,{text:this.draft.trim()}),this.editing=!1)}}updated(e){var t;e.has("note")&&!this.editing&&(this.draft=((t=this.note)==null?void 0:t.text)??"")}render(){if(!this.note)return null;const e=this.getPaletteStyles(this.note.color);return T`
      <article
        class="note"
        draggable=${String(!this.editing)}
        style=${Pt({...e,"--tilt":`${this.getTilt(this.note.id)}deg`})}
        @dragstart=${this.handleDragStart}
        @dblclick=${this.beginEditing}
      >
        <div class="note-shell" aria-hidden="true">${Tr(Dr)}</div>
        <button class="delete" @click=${this.handleDelete} title="Delete note">
          &times;
        </button>
        <div class="note-content">
          ${this.editing?T`
                <textarea
                  .value=${this.draft}
                  @input=${this.handleInput}
                  @keydown=${this.handleKeyDown}
                  @blur=${this.commitEdit}
                ></textarea>
              `:T`<p ?empty=${this.note.text.length===0} @click=${this.beginEditing}>
                ${this.note.text||"Double-click to add text"}
              </p>`}
        </div>
      </article>
    `}getTilt(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return(t>>>0)%800/100-4}getPaletteStyles(e){const t=this.normalizeHex(e);if(!t)return{};const n=o=>this.mixHex(t,"#ffffff",o),r=o=>this.mixHex(t,"#000000",o);return{"--note-top":n(.35),"--note-bottom":r(.1),"--note-fold-light":n(.55),"--note-fold-dark":r(.05),"--note-stroke":r(.25),"--note-shadow":r(.7)}}normalizeHex(e){const t=e.trim().toLowerCase();if(/^#([0-9a-f]{3})$/i.test(t)){const[,n]=/^#([0-9a-f]{3})$/i.exec(t)??[];return n?`#${n.split("").map(r=>r+r).join("")}`:null}return/^#([0-9a-f]{6})$/i.test(t)?t:null}mixHex(e,t,n){const r=this.hexToRgb(e),o=this.hexToRgb(t);if(!r||!o)return e;const s=Math.min(Math.max(n,0),1),i=(h,c)=>Math.round(h+(c-h)*s);return this.rgbToHex({r:i(r.r,o.r),g:i(r.g,o.g),b:i(r.b,o.b)})}hexToRgb(e){const t=/^#([0-9a-f]{6})$/i.exec(e);if(!t)return null;const n=t[1],r=parseInt(n.slice(0,2),16),o=parseInt(n.slice(2,4),16),s=parseInt(n.slice(4,6),16);return{r,g:o,b:s}}rgbToHex({r:e,g:t,b:n}){const r=o=>o.toString(16).padStart(2,"0");return`#${r(Math.max(0,Math.min(255,e)))}${r(Math.max(0,Math.min(255,t)))}${r(Math.max(0,Math.min(255,n)))}`}beginEditing(e){e.stopPropagation(),!this.editing&&(this.editing=!0,this.draft=this.note.text,this.updateComplete.then(()=>{var t,n;(t=this.textarea)==null||t.focus(),(n=this.textarea)==null||n.select()}))}handleInput(e){const t=e.target;this.draft=t.value}handleKeyDown(e){e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.commitEdit()),e.key==="Escape"&&(e.preventDefault(),this.cancelEdit())}cancelEdit(){this.editing=!1,this.draft=this.note.text}handleDelete(e){var t;e.stopPropagation(),(t=this.controller)==null||t.deleteNote(this.note.id)}handleDragStart(e){if(!e.dataTransfer||this.editing)return;const t=this.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top;e.dataTransfer.setData(pn,JSON.stringify({noteId:this.note.id,offsetX:n,offsetY:r})),e.dataTransfer.effectAllowed="move"}};V.styles=$e`
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
  `;gt([ft({attribute:!1})],V.prototype,"note",2);gt([ft({attribute:!1})],V.prototype,"controller",2);gt([O()],V.prototype,"editing",2);gt([O()],V.prototype,"draft",2);gt([nn("textarea")],V.prototype,"textarea",2);V=gt([_e("sticky-note")],V);var Mr=Object.defineProperty,Ir=Object.getOwnPropertyDescriptor,F=(e,t,n,r)=>{for(var o=r>1?void 0:r?Ir(t,n):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=(r?i(t,n,o):i(o))||o);return r&&o&&Mr(t,n,o),o};let R=class extends st{constructor(){super(...arguments),this.notes=[],this.zoom=1,this.panX=0,this.panY=0,this.isPanning=!1,this.highlightedParticipantId=null,this.background="good-bad",this.panOrigin=null,this.zoomIn=()=>{this.setZoom(this.zoom+.1)},this.zoomOut=()=>{this.setZoom(this.zoom-.1)},this.resetView=()=>{this.zoom=1,this.panX=0,this.panY=0}}disconnectedCallback(){var e;(e=this.unsubscribe)==null||e.call(this),super.disconnectedCallback()}updated(e){e.has("controller")&&this.bindNotes()}render(){return T`
      <section
        class="board"
        @dblclick=${this.handleDoubleClick}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @pointerleave=${this.handlePointerUp}
      >
        <div
          class="pan-layer"
          style=${Pt({"--pan-x":`${this.panX}px`,"--pan-y":`${this.panY}px`})}
        >
          <div class="workspace" style=${Pt({"--scale":`${this.zoom}`})}>
            ${this.renderTemplate()}
            <div class="note-layer">
              ${this.notes.map(e=>this.renderNote(e))}
            </div>
          </div>
        </div>
        <div class="canvas-controls" @click=${e=>e.stopPropagation()}>
          <button class="icon" @click=${this.zoomOut} aria-label="Zoom out">−</button>
          <span>${Math.round(this.zoom*100)}%</span>
          <button class="icon" @click=${this.zoomIn} aria-label="Zoom in">+</button>
          <button class="reset" @click=${this.resetView} aria-label="Reset view">Reset</button>
        </div>
        ${this.controller?null:T`<div class="board-placeholder">Connecting to board…</div>`}
      </section>
    `}bindNotes(){var t;if((t=this.unsubscribe)==null||t.call(this),!this.controller){this.notes=[];return}const e=n=>{const r=n.detail;this.notes=r};this.controller.addEventListener("notes-changed",e),this.unsubscribe=()=>{var n;return(n=this.controller)==null?void 0:n.removeEventListener("notes-changed",e)},this.notes=this.controller.getNotes()}renderNote(e){const t=!!(this.highlightedParticipantId&&e.authorId&&e.authorId!==this.highlightedParticipantId),n=!!(this.highlightedParticipantId&&!e.authorId);return T`
      <sticky-note
        style=${Pt({left:`${e.x}px`,top:`${e.y}px`})}
        ?dimmed=${t||n}
        .note=${e}
        .controller=${this.controller}
      ></sticky-note>
    `}renderTemplate(){const e=this.getBackgroundLayout();return e?T`
      <div
        class="board-template"
        style=${Pt({"--template-image":`url(${e.asset})`})}
        aria-hidden="true"
        role="presentation"
      ></div>
    `:null}handleDoubleClick(e){if(!this.controller||this.eventTargetsNote(e))return;const t=this.getWorkspaceRect();if(!t)return;const n=(e.clientX-t.left)/this.zoom-Sr/2,r=(e.clientY-t.top)/this.zoom-Er/2;this.controller.createNote(this.defaultColumnId,n,r)}handleDragOver(e){e.dataTransfer&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}handleDrop(e){var c;if(!e.dataTransfer||!this.controller)return;const t=e.dataTransfer.getData(pn);if(!t)return;e.preventDefault();const n=this.parsePayload(t);if(!n)return;const o=((c=this.notes.find(g=>g.id===n.noteId))==null?void 0:c.columnId)??this.defaultColumnId,s=this.getWorkspaceRect();if(!s)return;const i=(e.clientX-s.left)/this.zoom-n.offsetX,h=(e.clientY-s.top)/this.zoom-n.offsetY;this.controller.moveNote(n.noteId,o,i,h)}handleWheel(e){if(e.ctrlKey||e.metaKey){e.preventDefault();const t=-e.deltaY*.001;this.setZoom(this.zoom+t);return}this.panX-=e.deltaX,this.panY-=e.deltaY}handlePointerDown(e){var n;if(e.button!==0||this.eventTargetsNote(e))return;this.isPanning=!0,this.panOrigin={x:e.clientX,y:e.clientY};const t=e.currentTarget;(n=t.setPointerCapture)==null||n.call(t,e.pointerId)}handlePointerMove(e){if(!this.isPanning||!this.panOrigin)return;const t=e.clientX-this.panOrigin.x,n=e.clientY-this.panOrigin.y;this.panX+=t,this.panY+=n,this.panOrigin={x:e.clientX,y:e.clientY}}handlePointerUp(e){var n;if(!this.isPanning)return;this.isPanning=!1,this.panOrigin=null;const t=e.currentTarget;(n=t.releasePointerCapture)==null||n.call(t,e.pointerId)}setZoom(e){const t=Math.min(2,Math.max(.5,e));t!==this.zoom&&(this.zoom=Number(t.toFixed(2)))}getWorkspaceRect(){var e;return((e=this.noteLayer)==null?void 0:e.getBoundingClientRect())??this.getBoundingClientRect()}get defaultColumnId(){var e;return(e=kr[0])==null?void 0:e.id}getBackgroundLayout(){return ge.find(e=>e.id===this.background)}eventTargetsNote(e){return e.composedPath().some(t=>t instanceof HTMLElement&&t.tagName==="STICKY-NOTE")}parsePayload(e){try{const t=JSON.parse(e);return typeof t.noteId!="string"?null:{noteId:t.noteId,offsetX:Number(t.offsetX)||0,offsetY:Number(t.offsetY)||0}}catch{return null}}};R.styles=$e`
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

    .pan-layer {
      position: absolute;
      inset: 0;
      transform: translate(var(--pan-x, 0px), var(--pan-y, 0px));
    }

    .workspace {
      position: absolute;
      inset: 0;
      transform-origin: 0 0;
      transform: scale(var(--scale, 1));
    }

    .board-template {
      position: absolute;
      top: clamp(40px, 10vh, 120px);
      left: 50%;
      transform: translateX(-50%);
      width: min(1100px, calc(100% - 2rem));
      height: min(620px, calc(100% - 120px));
      max-height: 720px;
      background-image: var(--template-image);
      background-size: cover;
      background-position: center;
      border-radius: 28px;
      border: 1px solid rgba(15, 23, 42, 0.1);
      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.15);
      pointer-events: none;
      z-index: 1;
      opacity: 0.95;
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
      padding: 0.35rem 0.75rem;
      font-size: 0.9rem;
      color: #0f172a;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
      pointer-events: auto;
    }

    .canvas-controls button {
      border: none;
      background: rgba(15, 23, 42, 0.06);
      color: inherit;
      font-size: 0.85rem;
      cursor: pointer;
      line-height: 1;
    }

    .canvas-controls button.icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 1.1rem;
    }

    .canvas-controls button.reset {
      border-radius: 8px;
      padding: 0.2rem 0.7rem;
      background: rgba(15, 23, 42, 0.08);
      font-size: 0.8rem;
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
  `;F([ft({attribute:!1})],R.prototype,"controller",2);F([O()],R.prototype,"notes",2);F([O()],R.prototype,"zoom",2);F([O()],R.prototype,"panX",2);F([O()],R.prototype,"panY",2);F([O()],R.prototype,"isPanning",2);F([ft({attribute:!1})],R.prototype,"highlightedParticipantId",2);F([ft({attribute:!1})],R.prototype,"background",2);F([nn(".note-layer")],R.prototype,"noteLayer",2);R=F([_e("retro-board")],R);var Lr=Object.defineProperty,Ur=Object.getOwnPropertyDescriptor,G=(e,t,n,r)=>{for(var o=r>1?void 0:r?Ur(t,n):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=(r?i(t,n,o):i(o))||o);return r&&o&&Lr(t,n,o),o};const Ke="metro-retro-profile",qe="metro-retro-background",Qt=["#fbbf24","#ef4444","#22d3ee","#a855f7","#34d399","#f472b6"],Xt={name:"",color:Qt[0]};let H=class extends st{constructor(){super(...arguments),this.boardId=null,this.copyState="idle",this.profile=null,this.profileDraft={...Xt},this.showProfileDialog=!1,this.participants=[],this.highlightedParticipantId=null,this.background="good-bad",this.onHashChange=()=>this.handleRoute(),this.onParticipantsChange=e=>{const t=e.detail;this.participants=t,this.highlightedParticipantId&&!t.some(n=>n.id===this.highlightedParticipantId)&&(this.highlightedParticipantId=null)},this.startFreshBoard=()=>{this.navigateToBoard(ne())},this.handleFilterChange=e=>{const t=e.target.value;this.highlightedParticipantId=t||null},this.handleBackgroundChange=e=>{const t=e.target.value;this.background=t,this.persistBackground(t)},this.handleProfileSubmit=e=>{e.preventDefault();const t=this.profileDraft.name.trim();if(!t)return;const n={name:t,color:this.profileDraft.color||Xt.color};this.profile=n,this.profileDraft={...n},this.showProfileDialog=!1,this.persistProfile(n),this.boardId?this.bootstrapBoard(this.boardId):this.handleRoute()},this.handleProfileNameInput=e=>{const t=e.target;this.profileDraft={...this.profileDraft,name:t.value}},this.handleProfileColorInput=e=>{const t=e.target;this.profileDraft={...this.profileDraft,color:t.value}},this.randomizeProfileColor=()=>{const e=Qt[Math.floor(Math.random()*Qt.length)];this.profileDraft={...this.profileDraft,color:e}},this.openProfileDialog=()=>{this.profileDraft=this.profile?{...this.profile}:{...Xt},this.showProfileDialog=!0},this.closeProfileDialog=()=>{this.profile&&(this.profileDraft={...this.profile},this.showProfileDialog=!1)}}connectedCallback(){super.connectedCallback(),this.initializeProfile(),this.initializeBackground(),window.addEventListener("hashchange",this.onHashChange),this.handleRoute()}disconnectedCallback(){var e,t;window.removeEventListener("hashchange",this.onHashChange),(e=this.controller)==null||e.removeEventListener("participants-changed",this.onParticipantsChange),(t=this.controller)==null||t.dispose(),super.disconnectedCallback()}render(){const e=!!(this.boardId&&this.controller&&this.profile);return T`
            <retro-board
                .controller=${this.controller}
                .highlightedParticipantId=${this.highlightedParticipantId}
                .background=${this.background}
            ></retro-board>
            <div class="ui-overlay">
                ${e?T`
                          <div class="toolbar">
                              <div class="toolbar-brand">
                                  <span class="logo-dot"></span>
                                  <div class="brand-text">
                                      <p class="title">libRetro</p>
                                      <p class="meta">
                                          Board #${this.shortBoardId}
                                      </p>
                                  </div>
                              </div>
                              <div class="toolbar-controls">
                                  ${this.renderBackgroundControl()}
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
                      `:T`<div class="loading">
                          Preparing your retro board…
                      </div>`}
                ${this.renderProfileDialog()}
            </div>
        `}get copyLabel(){switch(this.copyState){case"copied":return"Link copied";case"error":return"Copy failed";default:return"Copy link"}}get shortBoardId(){return this.boardId?this.boardId.slice(0,6).toUpperCase():"—"}handleRoute(){const e=this.extractBoardId();if(!e){this.navigateToBoard(ne());return}e===this.boardId&&this.controller||this.bootstrapBoard(e)}extractBoardId(){const t=window.location.hash.replace(/^#/,"").match(/board\/([\w-]+)/i);return(t==null?void 0:t[1])??null}navigateToBoard(e){window.location.hash=`#/board/${e}`}bootstrapBoard(e){var n,r;if((n=this.controller)==null||n.removeEventListener("participants-changed",this.onParticipantsChange),(r=this.controller)==null||r.dispose(),this.boardId=e,!this.profile){this.controller=void 0,this.participants=[];return}const t=new Ar(e,this.profileToParticipant(this.profile));t.addEventListener("participants-changed",this.onParticipantsChange),this.controller=t,this.participants=t.getParticipants(),this.copyState="idle"}async handleCopyLink(){try{await navigator.clipboard.writeText(window.location.href),this.copyState="copied"}catch{this.copyState="error"}finally{window.setTimeout(()=>this.copyState="idle",2e3)}}initializeProfile(){const e=this.readProfileFromStorage();if(e){this.profile=e,this.profileDraft={...e},this.showProfileDialog=!1;return}this.profile=null,this.profileDraft={...Xt},this.showProfileDialog=!0}readProfileFromStorage(){if(typeof window>"u")return null;try{const e=window.localStorage.getItem(Ke);if(!e)return null;const t=JSON.parse(e);return typeof(t==null?void 0:t.name)!="string"||typeof(t==null?void 0:t.color)!="string"?null:{name:t.name,color:t.color}}catch{return null}}persistProfile(e){if(!(typeof window>"u"))try{window.localStorage.setItem(Ke,JSON.stringify(e))}catch{}}renderProfileDialog(){if(!this.showProfileDialog&&this.profile)return null;const e=this.profileDraft.name.trim().length>0,t=!!this.profile;return T`
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
                                ${Qt.map(n=>T`
                                        <button
                                            type="button"
                                            class="swatch"
                                            style=${`--swatch:${n}`}
                                            @click=${()=>this.setProfileColor(n)}
                                            aria-label=${`Use ${n}`}
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
                        ${t?T`<button
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
        `}renderFilterControl(){return this.participants.length?T`
            <label class="filter-control">
                <select
                    @change=${this.handleFilterChange}
                    .value=${this.highlightedParticipantId??""}
                >
                    <option value="">All notes</option>
                    ${this.participants.map(e=>T`<option value=${e.id}>
                                ${e.label}
                            </option>`)}
                </select>
            </label>
        `:null}renderBackgroundControl(){return T`
            <label class="filter-control">
                <select
                    @change=${this.handleBackgroundChange}
                    .value=${this.background}
                >
                    ${ge.map(e=>T`<option value=${e.id}>
                                ${e.label}
                            </option>`)}
                </select>
            </label>
        `}setProfileColor(e){this.profileDraft={...this.profileDraft,color:e}}profileToParticipant(e){return{label:e.name,color:e.color}}initializeBackground(){const e=this.readBackgroundFromStorage();this.background=e??"good-bad"}readBackgroundFromStorage(){if(typeof window>"u")return null;const e=window.localStorage.getItem(qe);return e&&ge.some(t=>t.id===e)?e:null}persistBackground(e){typeof window>"u"||window.localStorage.setItem(qe,e)}};H.styles=$e`
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
            align-items: center;
            gap: 1.5rem;
            padding: 0.85rem 1.25rem;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.98);
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
            width: min(100%, 960px);
        }

        .toolbar-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            min-width: 0;
        }

        .logo-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: linear-gradient(120deg, #0ea5e9, #6366f1);
        }

        .brand-text {
            display: flex;
            flex-direction: column;
            line-height: 1.2;
        }

        .title {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
            color: #111827;
        }

        .meta {
            margin: 0;
            font-size: 0.8rem;
            color: #6b7280;
        }

        .toolbar-controls {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .toolbar-actions {
            display: flex;
            gap: 0.45rem;
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
                align-items: stretch;
                gap: 0.85rem;
            }

            .toolbar-controls {
                width: 100%;
                justify-content: flex-start;
            }

            .toolbar-actions {
                width: 100%;
                justify-content: flex-start;
                flex-wrap: wrap;
            }

            .profile-card {
                padding: 1.25rem;
            }
        }
    `;G([O()],H.prototype,"boardId",2);G([O()],H.prototype,"controller",2);G([O()],H.prototype,"copyState",2);G([O()],H.prototype,"profile",2);G([O()],H.prototype,"profileDraft",2);G([O()],H.prototype,"showProfileDialog",2);G([O()],H.prototype,"participants",2);G([O()],H.prototype,"highlightedParticipantId",2);G([O()],H.prototype,"background",2);H=G([_e("app-root")],H);
