(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=globalThis,xe=Jt.ShadowRoot&&(Jt.ShadyCSS===void 0||Jt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Pe=Symbol(),Ce=new WeakMap;let rn=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Pe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(xe&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=Ce.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ce.set(n,t))}return t}toString(){return this.cssText}};const Pn=e=>new rn(typeof e=="string"?e:e+"",void 0,Pe),re=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,r,o)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[o+1],e[0]);return new rn(n,e,Pe)},_n=(e,t)=>{if(xe)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),r=Jt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}},Ee=xe?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Pn(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:kn,defineProperty:An,getOwnPropertyDescriptor:Sn,getOwnPropertyNames:Cn,getOwnPropertySymbols:En,getPrototypeOf:Tn}=Object,J=globalThis,Te=J.trustedTypes,On=Te?Te.emptyScript:"",ce=J.reactiveElementPolyfillSupport,St=(e,t)=>e,ne={toAttribute(e,t){switch(t){case Boolean:e=e?On:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},_e=(e,t)=>!kn(e,t),Oe={attribute:!0,type:String,converter:ne,reflect:!1,useDefault:!1,hasChanged:_e};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),J.litPropertyMetadata??(J.litPropertyMetadata=new WeakMap);let mt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Oe){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,n);r!==void 0&&An(this.prototype,t,r)}}static getPropertyDescriptor(t,n,i){const{get:r,set:o}=Sn(this.prototype,t)??{get(){return this[n]},set(s){this[n]=s}};return{get:r,set(s){const h=r==null?void 0:r.call(this);o==null||o.call(this,s),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Oe}static _$Ei(){if(this.hasOwnProperty(St("elementProperties")))return;const t=Tn(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(St("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(St("properties"))){const n=this.properties,i=[...Cn(n),...En(n)];for(const r of i)this.createProperty(r,n[r])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,r]of n)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const r=this._$Eu(n,i);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)n.unshift(Ee(r))}else t!==void 0&&n.push(Ee(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _n(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const s=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:ne).toAttribute(n,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,n){var o,s;const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const h=i.getPropertyOptions(r),l=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:ne;this._$Em=r;const p=l.fromAttribute(n,h.type);this[r]=p??((s=this._$Ej)==null?void 0:s.get(r))??p,this._$Em=null}}requestUpdate(t,n,i){var r;if(t!==void 0){const o=this.constructor,s=this[t];if(i??(i=o.getPropertyOptions(t)),!((i.hasChanged??_e)(s,n)||i.useDefault&&i.reflect&&s===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,s??n??this[t]),o!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),r===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,s]of r){const{wrapped:h}=s,l=this[o];h!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,s,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(n)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};mt.elementStyles=[],mt.shadowRootOptions={mode:"open"},mt[St("elementProperties")]=new Map,mt[St("finalized")]=new Map,ce==null||ce({ReactiveElement:mt}),(J.reactiveElementVersions??(J.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=globalThis,ie=Ct.trustedTypes,Me=ie?ie.createPolicy("lit-html",{createHTML:e=>e}):void 0,on="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,sn="?"+q,Mn=`<${sn}>`,dt=document,Ot=()=>dt.createComment(""),Mt=e=>e===null||typeof e!="object"&&typeof e!="function",ke=Array.isArray,Dn=e=>ke(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",de=`[ 	
\f\r]`,$t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,De=/-->/g,Le=/>/g,it=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Ne=/"/g,an=/^(?:script|style|textarea|title)$/i,Ln=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),k=Ln(1),Q=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Re=new WeakMap,lt=dt.createTreeWalker(dt,129);function ln(e,t){if(!ke(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Me!==void 0?Me.createHTML(t):t}const In=(e,t)=>{const n=e.length-1,i=[];let r,o=t===2?"<svg>":t===3?"<math>":"",s=$t;for(let h=0;h<n;h++){const l=e[h];let p,m,a=-1,d=0;for(;d<l.length&&(s.lastIndex=d,m=s.exec(l),m!==null);)d=s.lastIndex,s===$t?m[1]==="!--"?s=De:m[1]!==void 0?s=Le:m[2]!==void 0?(an.test(m[2])&&(r=RegExp("</"+m[2],"g")),s=it):m[3]!==void 0&&(s=it):s===it?m[0]===">"?(s=r??$t,a=-1):m[1]===void 0?a=-2:(a=s.lastIndex-m[2].length,p=m[1],s=m[3]===void 0?it:m[3]==='"'?Ne:Ie):s===Ne||s===Ie?s=it:s===De||s===Le?s=$t:(s=it,r=void 0);const u=s===it&&e[h+1].startsWith("/>")?" ":"";o+=s===$t?l+Mn:a>=0?(i.push(p),l.slice(0,a)+on+l.slice(a)+q+u):l+q+(a===-2?h:u)}return[ln(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Dt{constructor({strings:t,_$litType$:n},i){let r;this.parts=[];let o=0,s=0;const h=t.length-1,l=this.parts,[p,m]=In(t,n);if(this.el=Dt.createElement(p,i),lt.currentNode=this.el.content,n===2||n===3){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(r=lt.nextNode())!==null&&l.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(const a of r.getAttributeNames())if(a.endsWith(on)){const d=m[s++],u=r.getAttribute(a).split(q),x=/([.?@])?(.*)/.exec(d);l.push({type:1,index:o,name:x[2],strings:u,ctor:x[1]==="."?Rn:x[1]==="?"?Un:x[1]==="@"?Bn:oe}),r.removeAttribute(a)}else a.startsWith(q)&&(l.push({type:6,index:o}),r.removeAttribute(a));if(an.test(r.tagName)){const a=r.textContent.split(q),d=a.length-1;if(d>0){r.textContent=ie?ie.emptyScript:"";for(let u=0;u<d;u++)r.append(a[u],Ot()),lt.nextNode(),l.push({type:2,index:++o});r.append(a[d],Ot())}}}else if(r.nodeType===8)if(r.data===sn)l.push({type:2,index:o});else{let a=-1;for(;(a=r.data.indexOf(q,a+1))!==-1;)l.push({type:7,index:o}),a+=q.length-1}o++}}static createElement(t,n){const i=dt.createElement("template");return i.innerHTML=t,i}}function yt(e,t,n=e,i){var s,h;if(t===Q)return t;let r=i!==void 0?(s=n._$Co)==null?void 0:s[i]:n._$Cl;const o=Mt(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((h=r==null?void 0:r._$AO)==null||h.call(r,!1),o===void 0?r=void 0:(r=new o(e),r._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=r:n._$Cl=r),r!==void 0&&(t=yt(e,r._$AS(e,t.values),r,i)),t}class Nn{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,r=((t==null?void 0:t.creationScope)??dt).importNode(n,!0);lt.currentNode=r;let o=lt.nextNode(),s=0,h=0,l=i[0];for(;l!==void 0;){if(s===l.index){let p;l.type===2?p=new Bt(o,o.nextSibling,this,t):l.type===1?p=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(p=new zn(o,this,t)),this._$AV.push(p),l=i[++h]}s!==(l==null?void 0:l.index)&&(o=lt.nextNode(),s++)}return lt.currentNode=dt,r}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}class Bt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,r){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=yt(this,t,n),Mt(t)?t===S||t==null||t===""?(this._$AH!==S&&this._$AR(),this._$AH=S):t!==this._$AH&&t!==Q&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Dn(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==S&&Mt(this._$AH)?this._$AA.nextSibling.data=t:this.T(dt.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Dt.createElement(ln(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(n);else{const s=new Nn(r,this),h=s.u(this.options);s.p(n),this.T(h),this._$AH=s}}_$AC(t){let n=Re.get(t.strings);return n===void 0&&Re.set(t.strings,n=new Dt(t)),n}k(t){ke(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,r=0;for(const o of t)r===n.length?n.push(i=new Bt(this.O(Ot()),this.O(Ot()),this,this.options)):i=n[r],i._$AI(o),r++;r<n.length&&(this._$AR(i&&i._$AB.nextSibling,r),n.length=r)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,r,o){this.type=1,this._$AH=S,this._$AN=void 0,this.element=t,this.name=n,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=S}_$AI(t,n=this,i,r){const o=this.strings;let s=!1;if(o===void 0)t=yt(this,t,n,0),s=!Mt(t)||t!==this._$AH&&t!==Q,s&&(this._$AH=t);else{const h=t;let l,p;for(t=o[0],l=0;l<o.length-1;l++)p=yt(this,h[i+l],n,l),p===Q&&(p=this._$AH[l]),s||(s=!Mt(p)||p!==this._$AH[l]),p===S?t=S:t!==S&&(t+=(p??"")+o[l+1]),this._$AH[l]=p}s&&!r&&this.j(t)}j(t){t===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Rn extends oe{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===S?void 0:t}}class Un extends oe{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==S)}}class Bn extends oe{constructor(t,n,i,r,o){super(t,n,i,r,o),this.type=5}_$AI(t,n=this){if((t=yt(this,t,n,0)??S)===Q)return;const i=this._$AH,r=t===S&&i!==S||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==S&&(i===S||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}}class zn{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){yt(this,t)}}const he=Ct.litHtmlPolyfillSupport;he==null||he(Dt,Bt),(Ct.litHtmlVersions??(Ct.litHtmlVersions=[])).push("3.3.1");const Hn=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let r=i._$litPart$;if(r===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=r=new Bt(t.insertBefore(Ot(),o),o,void 0,n??{})}return r._$AI(e),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct=globalThis;let Z=class extends mt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Hn(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Q}};var nn;Z._$litElement$=!0,Z.finalized=!0,(nn=ct.litElementHydrateSupport)==null||nn.call(ct,{LitElement:Z});const pe=ct.litElementPolyfillSupport;pe==null||pe({LitElement:Z});(ct.litElementVersions??(ct.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const se=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jn={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:_e},Fn=(e=jn,t,n)=>{const{kind:i,metadata:r}=n;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:s}=n;return{set(h){const l=t.get.call(this);t.set.call(this,h),this.requestUpdate(s,l,e)},init(h){return h!==void 0&&this.C(s,void 0,e,h),h}}}if(i==="setter"){const{name:s}=n;return function(h){const l=this[s];t.call(this,h),this.requestUpdate(s,l,e)}}throw Error("Unsupported decorator location: "+i)};function et(e){return(t,n)=>typeof n=="object"?Fn(e,t,n):((i,r,o)=>{const s=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),s?Object.getOwnPropertyDescriptor(r,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function A(e){return et({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gn=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,n),n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ae(e,t){return(n,i,r)=>{const o=s=>{var h;return((h=s.renderRoot)==null?void 0:h.querySelector(e))??null};return Gn(n,i,{get(){return o(this)}})}}const O=[];for(let e=0;e<256;++e)O.push((e+256).toString(16).slice(1));function Yn(e,t=0){return(O[e[t+0]]+O[e[t+1]]+O[e[t+2]]+O[e[t+3]]+"-"+O[e[t+4]]+O[e[t+5]]+"-"+O[e[t+6]]+O[e[t+7]]+"-"+O[e[t+8]]+O[e[t+9]]+"-"+O[e[t+10]]+O[e[t+11]]+O[e[t+12]]+O[e[t+13]]+O[e[t+14]]+O[e[t+15]]).toLowerCase()}let ue;const Vn=new Uint8Array(16);function Wn(){if(!ue){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");ue=crypto.getRandomValues.bind(crypto)}return ue(Vn)}const Xn=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Ue={randomUUID:Xn};function qn(e,t,n){var r;e=e||{};const i=e.random??((r=e.rng)==null?void 0:r.call(e))??Wn();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,Yn(i)}function Lt(e,t,n){return Ue.randomUUID&&!e?Ue.randomUUID():qn(e)}const{floor:Kn,random:Jn}=Math,It="Trystero",Nt=(e,t)=>Array(e).fill().map(t),Be="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",cn=e=>Nt(e,()=>Be[Kn(Jn()*Be.length)]).join(""),K=cn(20),at=Promise.all.bind(Promise),dn=typeof window<"u",{entries:me,fromEntries:hn,keys:Zn}=Object,Y=()=>{},V=e=>new Error(`${It}: ${e}`),Qn=new TextEncoder,ti=new TextDecoder,bt=e=>Qn.encode(e),Zt=e=>ti.decode(e),Wt=(...e)=>e.join("@"),ei=(e,t,n,i)=>(e.relayUrls||t).slice(0,e.relayUrls?e.relayUrls.length:e.relayRedundancy||n),Rt=JSON.stringify,Ut=JSON.parse,ze=3333,ft={};let Et=null,Tt=null;const ni=()=>{Et||(Et=new Promise(e=>{Tt=e}).finally(()=>{Tt=null,Et=null}))},ii=()=>Tt==null?void 0:Tt(),ri=(e,t)=>{const n={},i=()=>{const r=new WebSocket(e);r.onclose=()=>{if(Et){Et.then(i);return}ft[e]??(ft[e]=ze),setTimeout(i,ft[e]),ft[e]*=2},r.onmessage=o=>t(o.data),n.socket=r,n.url=r.url,n.ready=new Promise(o=>r.onopen=()=>{o(n),ft[e]=ze}),n.send=o=>{r.readyState===1&&r.send(o)}};return i(),n},oi=()=>{if(dn){const e=new AbortController;return addEventListener("online",ii,{signal:e.signal}),addEventListener("offline",ni,{signal:e.signal}),()=>e.abort()}return Y},Se="AES-GCM",fe={},si=e=>btoa(String.fromCharCode.apply(null,new Uint8Array(e))),ai=e=>{const t=atob(e);return new Uint8Array(t.length).map((n,i)=>t.charCodeAt(i)).buffer},li=async(e,t)=>new Uint8Array(await crypto.subtle.digest(e,bt(t))),Pt=async e=>fe[e]||(fe[e]=Array.from(await li("SHA-1",e)).map(t=>t.toString(36)).join("")),ci=async(e,t,n)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},bt(`${e}:${t}:${n}`)),{name:Se},!1,["encrypt","decrypt"]),pn="$",un=",",di=async(e,t)=>{const n=crypto.getRandomValues(new Uint8Array(16));return n.join(un)+pn+si(await crypto.subtle.encrypt({name:Se,iv:n},await e,bt(t)))},hi=async(e,t)=>{const[n,i]=t.split(pn);return Zt(await crypto.subtle.decrypt({name:Se,iv:new Uint8Array(n.split(un))},await e,ai(i)))},pi=5e3,He="icegatheringstatechange",je="offer",ui="answer",Fe=(e,{rtcConfig:t,rtcPolyfill:n,turnConfig:i})=>{const r=new(n||RTCPeerConnection)({iceServers:fi.concat(i||[]),...t}),o={};let s=!1,h=!1,l=null;const p=a=>{a.binaryType="arraybuffer",a.bufferedAmountLowThreshold=65535,a.onmessage=d=>{var u;return(u=o.data)==null?void 0:u.call(o,d.data)},a.onopen=()=>{var d;return(d=o.connect)==null?void 0:d.call(o)},a.onclose=()=>{var d;return(d=o.close)==null?void 0:d.call(o)},a.onerror=d=>{var u;return(u=o.error)==null?void 0:u.call(o,d)}},m=a=>Promise.race([new Promise(d=>{const u=()=>{a.iceGatheringState==="complete"&&(a.removeEventListener(He,u),d())};a.addEventListener(He,u),u()}),new Promise(d=>setTimeout(d,pi))]).then(()=>({type:a.localDescription.type,sdp:a.localDescription.sdp.replace(/a=ice-options:trickle\s\n/g,"")}));return e?(l=r.createDataChannel("data"),p(l)):r.ondatachannel=({channel:a})=>{l=a,p(a)},r.onnegotiationneeded=async()=>{var a,d;try{s=!0,await r.setLocalDescription();const u=await m(r);(a=o.signal)==null||a.call(o,u)}catch(u){(d=o.error)==null||d.call(o,u)}finally{s=!1}},r.onconnectionstatechange=()=>{var a;["disconnected","failed","closed"].includes(r.connectionState)&&((a=o.close)==null||a.call(o))},r.ontrack=a=>{var d,u;(d=o.track)==null||d.call(o,a.track,a.streams[0]),(u=o.stream)==null||u.call(o,a.streams[0])},r.onremovestream=a=>{var d;return(d=o.stream)==null?void 0:d.call(o,a.stream)},e&&(r.canTrickleIceCandidates||r.onnegotiationneeded()),{created:Date.now(),connection:r,get channel(){return l},get isDead(){return r.connectionState==="closed"},async signal(a){var d,u,x;if(!((l==null?void 0:l.readyState)==="open"&&!((d=a.sdp)!=null&&d.includes("a=rtpmap"))))try{if(a.type===je){if(s||r.signalingState!=="stable"&&!h){if(e)return;await at([r.setLocalDescription({type:"rollback"}),r.setRemoteDescription(a)])}else await r.setRemoteDescription(a);await r.setLocalDescription();const D=await m(r);return(u=o.signal)==null||u.call(o,D),D}else if(a.type===ui){h=!0;try{await r.setRemoteDescription(a)}finally{h=!1}}}catch(D){(x=o.error)==null||x.call(o,D)}},sendData:a=>l.send(a),destroy:()=>{l==null||l.close(),r.close(),s=!1,h=!1},setHandlers:a=>Object.assign(o,a),offerPromise:e?new Promise(a=>o.signal=d=>{d.type===je&&a(d)}):Promise.resolve(),addStream:a=>a.getTracks().forEach(d=>r.addTrack(d,a)),removeStream:a=>r.getSenders().filter(d=>a.getTracks().includes(d.track)).forEach(d=>r.removeTrack(d)),addTrack:(a,d)=>r.addTrack(a,d),removeTrack:a=>{const d=r.getSenders().find(u=>u.track===a);d&&r.removeTrack(d)},replaceTrack:(a,d)=>{const u=r.getSenders().find(x=>x.track===a);if(u)return u.replaceTrack(d)}}},fi=[...Nt(3,(e,t)=>`stun:stun${t||""}.l.google.com:19302`),"stun:stun.cloudflare.com:3478"].map(e=>({urls:e})),gi=Object.getPrototypeOf(Uint8Array),Qt=12,fn=0,te=fn+Qt,ee=te+1,_t=ee+1,kt=_t+1,rt=16*2**10-kt,Xt=255,Ge="bufferedamountlow",gt=e=>"@_"+e,mi=(e,t,n)=>{const i={},r={},o={},s={},h={},l={},p={},m={onPeerJoin:Y,onPeerLeave:Y,onPeerStream:Y,onPeerTrack:Y},a=(c,f)=>(c?Array.isArray(c)?c:[c]:Zn(i)).flatMap(b=>{const w=i[b];return w?f(b,w):(console.warn(`${It}: no peer with id ${b} found`),[])}),d=c=>{i[c]&&(i[c].destroy(),delete i[c],delete s[c],delete h[c],m.onPeerLeave(c),t(c))},u=c=>{if(r[c])return o[c];if(!c)throw V("action type argument is required");const f=bt(c);if(f.byteLength>Qt)throw V(`action type string "${c}" (${f.byteLength}b) exceeds byte limit (${Qt}). Hint: choose a shorter name.`);const b=new Uint8Array(Qt);b.set(f);let w=0;return r[c]={onComplete:Y,onProgress:Y,setOnComplete:$=>r[c]={...r[c],onComplete:$},setOnProgress:$=>r[c]={...r[c],onProgress:$},send:async($,N,g,y)=>{if(g&&typeof g!="object")throw V("action meta argument must be an object");const _=typeof $;if(_==="undefined")throw V("action data cannot be undefined");const C=_!=="string",M=$ instanceof Blob,R=M||$ instanceof ArrayBuffer||$ instanceof gi;if(g&&!R)throw V("action meta argument can only be used with binary data");const v=R?new Uint8Array(M?await $.arrayBuffer():$):bt(C?Rt($):$),H=g?bt(Rt(g)):null,U=Math.ceil(v.byteLength/rt)+(g?1:0)||1,j=Nt(U,(L,E)=>{const F=E===U-1,T=g&&E===0,P=new Uint8Array(kt+(T?H.byteLength:F?v.byteLength-rt*(U-(g?2:1)):rt));return P.set(b),P.set([w],te),P.set([F|T<<1|R<<2|C<<3],ee),P.set([Math.round((E+1)/U*Xt)],_t),P.set(g?T?H:v.subarray((E-1)*rt,E*rt):v.subarray(E*rt,(E+1)*rt),kt),P});return w=w+1&Xt,at(a(N,async(L,E)=>{const{channel:F}=E;let T=0;for(;T<U;){const P=j[T];if(F.bufferedAmount>F.bufferedAmountLowThreshold&&await new Promise(ut=>{const Vt=()=>{F.removeEventListener(Ge,Vt),ut()};F.addEventListener(Ge,Vt)}),!i[L])break;E.sendData(P),T++,y==null||y(P[_t]/Xt,L,g)}}))}},o[c]||(o[c]=[r[c].send,r[c].setOnComplete,r[c].setOnProgress])},x=(c,f)=>{var U,j;const b=new Uint8Array(f),w=Zt(b.subarray(fn,te)).replaceAll("\0",""),[$]=b.subarray(te,ee),[N]=b.subarray(ee,_t),[g]=b.subarray(_t,kt),y=b.subarray(kt),_=!!(N&1),C=!!(N&2),M=!!(N&4),R=!!(N&8);if(!r[w]){console.warn(`${It}: received message with unregistered type (${w})`);return}s[c]||(s[c]={}),(U=s[c])[w]||(U[w]={});const v=(j=s[c][w])[$]||(j[$]={chunks:[]});if(C?v.meta=Ut(Zt(y)):v.chunks.push(y),r[w].onProgress(g/Xt,c,v.meta),!_)return;const H=new Uint8Array(v.chunks.reduce((L,E)=>L+E.byteLength,0));if(v.chunks.reduce((L,E)=>(H.set(E,L),L+E.byteLength),0),delete s[c][w][$],M)r[w].onComplete(H,c,v.meta);else{const L=Zt(H);r[w].onComplete(R?Ut(L):L,c)}},D=async()=>{await Gt(""),await new Promise(c=>setTimeout(c,99)),me(i).forEach(([c,f])=>{f.destroy(),delete i[c]}),n()},[X,nt]=u(gt("ping")),[ae,zt]=u(gt("pong")),[Ht,jt]=u(gt("signal")),[Ft,vt]=u(gt("stream")),[pt,le]=u(gt("track")),[Gt,Yt]=u(gt("leave"));return e((c,f)=>{i[f]||(i[f]=c,c.setHandlers({data:b=>x(f,b),stream:b=>{m.onPeerStream(b,f,l[f]),delete l[f]},track:(b,w)=>{m.onPeerTrack(b,w,f,p[f]),delete p[f]},signal:b=>Ht(b,f),close:()=>d(f),error:b=>{console.error(b),d(f)}}),m.onPeerJoin(f))}),nt((c,f)=>ae("",f)),zt((c,f)=>{var b;(b=h[f])==null||b.call(h),delete h[f]}),jt((c,f)=>{var b;return(b=i[f])==null?void 0:b.signal(c)}),vt((c,f)=>l[f]=c),le((c,f)=>p[f]=c),Yt((c,f)=>d(f)),dn&&addEventListener("beforeunload",D),{makeAction:u,leave:D,ping:async c=>{if(!c)throw V("ping() must be called with target peer ID");const f=Date.now();return X("",c),await new Promise(b=>h[c]=b),Date.now()-f},getPeers:()=>hn(me(i).map(([c,f])=>[c,f.connection])),addStream:(c,f,b)=>a(f,async(w,$)=>{b&&await Ft(b,w),$.addStream(c)}),removeStream:(c,f)=>a(f,(b,w)=>w.removeStream(c)),addTrack:(c,f,b,w)=>a(b,async($,N)=>{w&&await pt(w,$),N.addTrack(c,f)}),removeTrack:(c,f)=>a(f,(b,w)=>w.removeTrack(c)),replaceTrack:(c,f,b,w)=>a(b,async($,N)=>{w&&await pt(w,$),N.replaceTrack(c,f)}),onPeerJoin:c=>m.onPeerJoin=c,onPeerLeave:c=>m.onPeerLeave=c,onPeerStream:c=>m.onPeerStream=c,onPeerTrack:c=>m.onPeerTrack=c}},bi=20,yi=5333,Ye=57333,wi=({init:e,subscribe:t,announce:n})=>{const i={};let r=!1,o,s,h,l;return(p,m,a)=>{var N;const{appId:d}=p;if((N=i[d])!=null&&N[m])return i[d][m];const u={},x={},D=Wt(It,d,m),X=Pt(D),nt=Pt(Wt(D,K)),ae=ci(p.password||"",d,m),zt=g=>async y=>({type:y.type,sdp:await g(ae,y.sdp)}),Ht=zt(hi),jt=zt(di),Ft=()=>Fe(!0,p),vt=(g,y,_)=>{var C;if(x[y]){x[y]!==g&&g.destroy();return}x[y]=g,$(g,y),(C=u[y])==null||C.forEach((M,R)=>{R!==_&&M.destroy()}),delete u[y]},pt=(g,y)=>{x[y]===g&&delete x[y]},le=(g,y)=>{var C;if(x[g])return;const _=(C=u[g])==null?void 0:C[y];_&&(delete u[g][y],_.destroy())},Gt=g=>(s.push(...Nt(g,Ft)),at(s.splice(0,g).map(y=>y.offerPromise.then(jt).then(_=>({peer:y,offer:_}))))),Yt=(g,y)=>a==null?void 0:a({error:`incorrect password (${p.password}) when decrypting ${y}`,appId:d,peerId:g,roomId:m}),c=g=>async(y,_,C)=>{var L,E,F;const[M,R]=await at([X,nt]);if(y!==M&&y!==R)return;const{peerId:v,offer:H,answer:U,peer:j}=typeof _=="string"?Ut(_):_;if(!(v===K||x[v])){if(v&&!H&&!U){if((L=u[v])!=null&&L[g])return;const[[{peer:T,offer:P}],ut]=await at([Gt(1),Pt(Wt(D,v))]);u[v]||(u[v]=[]),u[v][g]=T,setTimeout(()=>le(v,g),f[g]*.9),T.setHandlers({connect:()=>vt(T,v,g),close:()=>pt(T,v)}),C(ut,Rt({peerId:K,offer:P}))}else if(H){if(((E=u[v])==null?void 0:E[g])&&K>v)return;const P=Fe(!1,p);P.setHandlers({connect:()=>vt(P,v,g),close:()=>pt(P,v)});let ut;try{ut=await Ht(H)}catch{Yt(v,"offer");return}if(P.isDead)return;const[Vt,xn]=await at([Pt(Wt(D,v)),P.signal(ut)]);C(Vt,Rt({peerId:K,answer:await jt(xn)}))}else if(U){let T;try{T=await Ht(U)}catch{Yt(v,"answer");return}if(j)j.setHandlers({connect:()=>vt(j,v,g),close:()=>pt(j,v)}),j.signal(T);else{const P=(F=u[v])==null?void 0:F[g];P&&!P.isDead&&P.signal(T)}}}};if(!p)throw V("requires a config map as the first argument");if(!d&&!p.firebaseApp)throw V("config map is missing appId field");if(!m)throw V("roomId argument required");if(!r){const g=e(p);s=Nt(bi,Ft),o=Array.isArray(g)?g:[g],r=!0,h=setInterval(()=>s=s.filter(y=>{const _=Date.now()-y.created<Ye;return _||y.destroy(),_}),Ye*1.03),l=p.manualRelayReconnection?Y:oi()}const f=o.map(()=>yi),b=[],w=o.map(async(g,y)=>t(await g,await X,await nt,c(y),Gt));at([X,nt]).then(([g,y])=>{const _=async(C,M)=>{const R=await n(C,g,y);typeof R=="number"&&(f[M]=R),b[M]=setTimeout(()=>_(C,M),f[M])};w.forEach(async(C,M)=>{await C,_(await o[M],M)})});let $=Y;return i[d]||(i[d]={}),i[d][m]=mi(g=>$=g,g=>delete x[g],()=>{delete i[d][m],b.forEach(clearTimeout),w.forEach(async g=>(await g)()),clearInterval(h),l(),r=!1})}},ge={},gn={},ot={},st={},xt={},Ve={},qt={},vi="announce",mn=20,We=10,$i=33333,xi=120333,Pi=3,_i=async e=>{if(ge[e])return ge[e];const t=(await Pt(e)).slice(0,mn);return ge[e]=t,gn[t]=e,t},Xe=async(e,t,n)=>e.send(Rt({action:vi,info_hash:await _i(t),peer_id:K,...n})),qe=(e,t,n)=>console.warn(`${It}: torrent tracker ${n?"failure":"warning"} from ${e} - ${t}`),ki=wi({init:e=>ei(e,Ai,Pi).map(t=>{const n=ri(t,r=>{var m,a;const o=Ut(r),s=o["failure reason"],h=o["warning message"],{interval:l}=o,p=gn[o.info_hash];if(s){qe(i,s,!0);return}if(h&&qe(i,h),l&&l*1e3>xt[i]&&st[i][p]){const d=Math.min(l*1e3,xi);clearInterval(ot[i][p]),xt[i]=d,ot[i][p]=setInterval(st[i][p],d)}Ve[o.offer_id]||(o.offer||o.answer)&&(Ve[o.offer_id]=!0,(a=(m=qt[i])[p])==null||a.call(m,o))}),{url:i}=n;return qt[i]={},n.ready}),subscribe:(e,t,n,i,r)=>{const{url:o}=e,s=async()=>{const h=hn((await r(We)).map(l=>[cn(mn),l]));qt[e.url][t]=l=>{if(l.offer)i(t,{offer:l.offer,peerId:l.peer_id},(p,m)=>Xe(e,t,{answer:Ut(m).answer,offer_id:l.offer_id,to_peer_id:l.peer_id}));else if(l.answer){const p=h[l.offer_id];p&&i(t,{answer:l.answer,peerId:l.peer_id,peer:p.peer})}},Xe(e,t,{numwant:We,offers:me(h).map(([l,{offer:p}])=>({offer_id:l,offer:p}))})};return xt[o]=$i,st[o]||(st[o]={}),st[o][t]=s,ot[o]||(ot[o]={}),ot[o][t]=setInterval(s,xt[o]),s(),()=>{clearInterval(ot[o][t]),delete qt[o][t],delete st[o][t]}},announce:e=>xt[e.url]}),Ai=["tracker.webtorrent.dev","tracker.openwebtorrent.com","tracker.btorrent.xyz","tracker.files.fm:7073/announce"].map(e=>"wss://"+e),Si="metro-retro:board:",be=e=>`${Si}${e}`;function Ci(e){if(typeof window>"u")return null;const t=window.localStorage.getItem(be(e));if(!t)return null;try{return JSON.parse(t)}catch(n){return console.warn("Failed to parse snapshot",n),window.localStorage.removeItem(be(e)),null}}function Ei(e,t){if(!(typeof window>"u"))try{window.localStorage.setItem(be(e),JSON.stringify(t))}catch(n){console.warn("Failed to persist snapshot",n)}}const Ke="wss://tracker.webtorrent.dev,wss://tracker.openwebtorrent.com".split(",").map(e=>e.trim()).filter(Boolean),Je="start-stop-continue",Ti=["start-stop-continue","mad-sad-glad"],Oi=e=>typeof e=="string"&&Ti.includes(e);class Mi extends EventTarget{constructor(t,n,i){var r;super(),this.status="connecting",this.notes=new Map,this.participants=new Map,this.background=Je,this.boardId=t,this.localParticipant={id:K,label:((r=n==null?void 0:n.label)==null?void 0:r.trim())||`Guest ${Lt().slice(0,4).toUpperCase()}`,color:(n==null?void 0:n.color)||this.randomAccent()},this.background=i??Je,this.participants.set(K,this.localParticipant),this.restoreSnapshot(),this.connectRoom()}dispose(){var t;typeof window<"u"&&window.clearTimeout(this.persistHandle),(t=this.room)==null||t.leave()}getNotes(){return Array.from(this.notes.values()).sort((t,n)=>t.createdAt-n.createdAt)}getParticipants(){return Array.from(this.participants.values())}getLocalParticipant(){return this.localParticipant}getBoardBackground(){return this.background}setBoardBackground(t){var i;if(!t)return;t!==this.background&&this.applyBackground(t),(i=this.sendSettingsMessage)==null||i.call(this,{type:"background",value:t})}fireConfetti(t){var n;this.dispatchEvent(new CustomEvent("confetti-fired",{detail:t})),(n=this.sendFunMessage)==null||n.call(this,{type:"confetti",shot:t})}createNote(t,n,i){const r=Date.now(),o={id:Lt(),columnId:t,text:"",...this.normalizePosition(n,i),color:this.localParticipant.color,authorId:this.localParticipant.id,createdAt:r,updatedAt:r};this.applyUpsert(o),this.broadcastNote({type:"upsert",note:o})}updateNote(t,n){const i=this.notes.get(t);if(!i)return;const r={...i,...n,updatedAt:Date.now()};this.applyUpsert(r),this.broadcastNote({type:"upsert",note:r})}moveNote(t,n,i,r){this.updateNote(t,{columnId:n,...this.normalizePosition(i,r)})}deleteNote(t){this.notes.get(t)&&(this.notes.delete(t),this.emitNotesChanged(),this.schedulePersist(),this.broadcastNote({type:"delete",id:t,updatedAt:Date.now()}))}connectRoom(){const t={appId:"metro-retro",relayUrls:Ke.length?Ke:void 0};this.room=ki(t,this.boardId),this.updateStatus("connected"),this.setupMessaging(),this.setupPresence(),this.setupFunChannel(),this.setupSettingsChannel()}setupMessaging(){if(!this.room)return;const[t,n]=this.room.makeAction("note");this.sendNoteMessage=(i,r)=>t(i,r),n((i,r)=>{var o;switch(i.type){case"upsert":this.applyUpsert(i.note);break;case"delete":this.applyDelete(i.id,i.updatedAt);break;case"sync-request":(o=this.sendNoteMessage)==null||o.call(this,{type:"sync-response",notes:this.getNotes()},r);break;case"sync-response":i.notes.forEach(s=>this.applyUpsert(s));break}}),this.room.onPeerJoin(i=>{var r,o;this.updateStatus("connected"),(r=this.sendPresenceMessage)==null||r.call(this,{participant:this.localParticipant},i),(o=this.sendNoteMessage)==null||o.call(this,{type:"sync-request"},i)}),this.room.onPeerLeave(i=>{this.participants.delete(i),this.emitParticipantsChanged()})}setupPresence(){var i;if(!this.room)return;const[t,n]=this.room.makeAction("presence");this.sendPresenceMessage=(r,o)=>t(r,o),n(r=>{r!=null&&r.participant&&(this.participants.set(r.participant.id,r.participant),this.emitParticipantsChanged())}),this.emitParticipantsChanged(),(i=this.sendPresenceMessage)==null||i.call(this,{participant:this.localParticipant})}setupFunChannel(){if(!this.room)return;const[t,n]=this.room.makeAction("fun");this.sendFunMessage=(i,r)=>t(i,r),n(i=>{(i==null?void 0:i.type)!=="confetti"||!i.shot||this.dispatchEvent(new CustomEvent("confetti-fired",{detail:i.shot}))})}setupSettingsChannel(){if(!this.room)return;const[t,n]=this.room.makeAction("settings");this.sendSettingsMessage=(i,r)=>t(i,r),n((i,r)=>{(i==null?void 0:i.type)==="background"&&Oi(i.value)?this.applyBackground(i.value):(i==null?void 0:i.type)==="background-request"&&this.respondWithBackground(r)}),this.requestBackgroundSync()}broadcastNote(t){var n;(n=this.sendNoteMessage)==null||n.call(this,t)}applyUpsert(t){const n=this.notes.get(t.id);n&&n.updatedAt>t.updatedAt||(this.notes.set(t.id,t),this.schedulePersist(),this.emitNotesChanged())}applyDelete(t,n){const i=this.notes.get(t);!i||i.updatedAt>n||(this.notes.delete(t),this.emitNotesChanged(),this.schedulePersist())}emitNotesChanged(){this.dispatchEvent(new CustomEvent("notes-changed",{detail:this.getNotes()}))}emitParticipantsChanged(){this.dispatchEvent(new CustomEvent("participants-changed",{detail:this.getParticipants()}))}applyBackground(t){!t||t===this.background||(this.background=t,this.dispatchEvent(new CustomEvent("background-changed",{detail:t})))}respondWithBackground(t){var n;(n=this.sendSettingsMessage)==null||n.call(this,{type:"background",value:this.background},t??null)}requestBackgroundSync(){var t;(t=this.sendSettingsMessage)==null||t.call(this,{type:"background-request"})}normalizePosition(t,n){const i=Number.isFinite(t)?Number(t):24,r=Number.isFinite(n)?Number(n):24;return{x:Math.max(12,i),y:Math.max(12,r)}}updateStatus(t){this.status=t,this.dispatchEvent(new CustomEvent("status-changed",{detail:t}))}restoreSnapshot(){const t=Ci(this.boardId);t!=null&&t.notes&&(t.notes.forEach(n=>this.notes.set(n.id,n)),this.emitNotesChanged())}schedulePersist(){typeof window>"u"||(window.clearTimeout(this.persistHandle),this.persistHandle=window.setTimeout(()=>{Ei(this.boardId,{notes:this.getNotes()})},400))}randomAccent(){const t=["#fbbf24","#ef4444","#22d3ee","#a855f7","#34d399","#f472b6"];return t[Math.floor(Math.random()*t.length)]}}const Di=[{id:"good",label:"Good",description:"Wins and bright spots worth repeating",accent:"#34d399"},{id:"bad",label:"Bad",description:"Pain points or risks we should address",accent:"#f87171"},{id:"start",label:"Start",description:"New ideas to try next sprint",accent:"#60a5fa"},{id:"stop",label:"Stop",description:"Habits that no longer serve us",accent:"#fbbf24"}],Li=110,Ii=70,bn="application/x-metro-note",ye=[{id:"start-stop-continue",label:"Start / Stop / Continue",description:"Three-part action board",asset:"start-stop-continue.png",columns:[{title:"Start",description:"Ideas to try",accent:"#0ea5e9"},{title:"Stop",description:"Habits to drop",accent:"#f97316"},{title:"Continue",description:"Keep doing these",accent:"#6366f1"}]},{id:"mad-sad-glad",label:"Mad / Sad / Glad",description:"Emotional check-in",asset:"mad-sad-glad.png",columns:[{title:"Mad",description:"Frustrations & annoyances",accent:"#f87171"},{title:"Sad",description:"Letdowns & concerns",accent:"#facc15"},{title:"Glad",description:"Highlights & celebrations",accent:"#34d399"}]}];/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yn={ATTRIBUTE:1,CHILD:2},wn=e=>(...t)=>({_$litDirective$:e,values:t});let vn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $n="important",Ni=" !"+$n,At=wn(class extends vn{constructor(e){var t;if(super(e),e.type!==yn.ATTRIBUTE||e.name!=="style"||((t=e.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{const i=e[n];return i==null?t:t+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(e,[t]){const{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?n.removeProperty(i):n[i]=null);for(const i in t){const r=t[i];if(r!=null){this.ft.add(i);const o=typeof r=="string"&&r.endsWith(Ni);i.includes("-")||o?n.setProperty(i,o?r.slice(0,-11):r,o?$n:""):n[i]=r}}return Q}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class we extends vn{constructor(t){if(super(t),this.it=S,t.type!==yn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===S||t==null)return this._t=void 0,this.it=t;if(t===Q)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}we.directiveName="unsafeHTML",we.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ve extends we{}ve.directiveName="unsafeSVG",ve.resultType=2;const Ri=wn(ve),Ui=`<svg
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
`;var Bi=Object.defineProperty,zi=Object.getOwnPropertyDescriptor,wt=(e,t,n,i)=>{for(var r=i>1?void 0:i?zi(t,n):t,o=e.length-1,s;o>=0;o--)(s=e[o])&&(r=(i?s(t,n,r):s(r))||r);return i&&r&&Bi(t,n,r),r};let tt=class extends Z{constructor(){super(...arguments),this.editing=!1,this.draft="",this.commitEdit=()=>{!this.controller||!this.editing||(this.controller.updateNote(this.note.id,{text:this.draft.trim()}),this.editing=!1)}}updated(e){var t;e.has("note")&&!this.editing&&(this.draft=((t=this.note)==null?void 0:t.text)??"")}render(){if(!this.note)return null;const e=this.getPaletteStyles(this.note.color);return k`
            <article
                class="note"
                draggable=${String(!this.editing)}
                style=${At({...e,"--tilt":`${this.getTilt(this.note.id)}deg`})}
                @dragstart=${this.handleDragStart}
                @dblclick=${this.beginEditing}
            >
                <div class="note-shell" aria-hidden="true">
                    ${Ri(Ui)}
                </div>
                <button
                    class="delete"
                    @click=${this.handleDelete}
                    title="Delete note"
                >
                    &times;
                </button>
                <div class="note-content">
                    ${this.editing?k`
                              <textarea
                                  .value=${this.draft}
                                  @input=${this.handleInput}
                                  @keydown=${this.handleKeyDown}
                                  @blur=${this.commitEdit}
                              ></textarea>
                          `:k`<p
                              ?empty=${this.note.text.length===0}
                              @click=${this.beginEditing}
                          >
                              ${this.note.text||"Double-click to add text"}
                          </p>`}
                </div>
            </article>
        `}getTilt(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return(t>>>0)%800/100-4}getPaletteStyles(e){const t=this.normalizeHex(e);if(!t)return{};const n=r=>this.mixHex(t,"#ffffff",r),i=r=>this.mixHex(t,"#000000",r);return{"--note-top":n(.35),"--note-bottom":i(.1),"--note-fold-light":n(.55),"--note-fold-dark":i(.05),"--note-stroke":i(.25),"--note-shadow":i(.7)}}normalizeHex(e){const t=e.trim().toLowerCase();if(/^#([0-9a-f]{3})$/i.test(t)){const[,n]=/^#([0-9a-f]{3})$/i.exec(t)??[];return n?`#${n.split("").map(i=>i+i).join("")}`:null}return/^#([0-9a-f]{6})$/i.test(t)?t:null}mixHex(e,t,n){const i=this.hexToRgb(e),r=this.hexToRgb(t);if(!i||!r)return e;const o=Math.min(Math.max(n,0),1),s=(h,l)=>Math.round(h+(l-h)*o);return this.rgbToHex({r:s(i.r,r.r),g:s(i.g,r.g),b:s(i.b,r.b)})}hexToRgb(e){const t=/^#([0-9a-f]{6})$/i.exec(e);if(!t)return null;const n=t[1],i=parseInt(n.slice(0,2),16),r=parseInt(n.slice(2,4),16),o=parseInt(n.slice(4,6),16);return{r:i,g:r,b:o}}rgbToHex({r:e,g:t,b:n}){const i=r=>r.toString(16).padStart(2,"0");return`#${i(Math.max(0,Math.min(255,e)))}${i(Math.max(0,Math.min(255,t)))}${i(Math.max(0,Math.min(255,n)))}`}beginEditing(e){e.stopPropagation(),!this.editing&&(this.editing=!0,this.draft=this.note.text,this.updateComplete.then(()=>{var t,n;(t=this.textarea)==null||t.focus(),(n=this.textarea)==null||n.select()}))}handleInput(e){const t=e.target;this.draft=t.value}handleKeyDown(e){e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.commitEdit()),e.key==="Escape"&&(e.preventDefault(),this.cancelEdit())}cancelEdit(){this.editing=!1,this.draft=this.note.text}handleDelete(e){var t;e.stopPropagation(),(t=this.controller)==null||t.deleteNote(this.note.id)}handleDragStart(e){if(!e.dataTransfer||this.editing)return;const t=this.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top;e.dataTransfer.setData(bn,JSON.stringify({noteId:this.note.id,offsetX:n,offsetY:i})),e.dataTransfer.effectAllowed="move"}};tt.styles=re`
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
    `;wt([et({attribute:!1})],tt.prototype,"note",2);wt([et({attribute:!1})],tt.prototype,"controller",2);wt([A()],tt.prototype,"editing",2);wt([A()],tt.prototype,"draft",2);wt([Ae("textarea")],tt.prototype,"textarea",2);tt=wt([se("sticky-note")],tt);var Hi=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,G=(e,t,n,i)=>{for(var r=i>1?void 0:i?ji(t,n):t,o=e.length-1,s;o>=0;o--)(s=e[o])&&(r=(i?s(t,n,r):s(r))||r);return i&&r&&Hi(t,n,r),r};let B=class extends Z{constructor(){super(...arguments),this.notes=[],this.zoom=1,this.panX=0,this.panY=0,this.isPanning=!1,this.highlightedParticipantId=null,this.background="start-stop-continue",this.panOrigin=null,this.zoomIn=()=>{this.setZoom(this.zoom+.1)},this.zoomOut=()=>{this.setZoom(this.zoom-.1)},this.resetView=()=>{this.zoom=1,this.panX=0,this.panY=0}}disconnectedCallback(){var e;(e=this.unsubscribe)==null||e.call(this),super.disconnectedCallback()}updated(e){e.has("controller")&&this.bindNotes()}render(){return k`
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
          style=${At({"--pan-x":`${this.panX}px`,"--pan-y":`${this.panY}px`})}
        >
          <div class="workspace" style=${At({"--scale":`${this.zoom}`})}>
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
        ${this.controller?null:k`<div class="board-placeholder">Connecting to board…</div>`}
      </section>
    `}bindNotes(){var t;if((t=this.unsubscribe)==null||t.call(this),!this.controller){this.notes=[];return}const e=n=>{const i=n.detail;this.notes=i};this.controller.addEventListener("notes-changed",e),this.unsubscribe=()=>{var n;return(n=this.controller)==null?void 0:n.removeEventListener("notes-changed",e)},this.notes=this.controller.getNotes()}renderNote(e){const t=!!(this.highlightedParticipantId&&e.authorId&&e.authorId!==this.highlightedParticipantId),n=!!(this.highlightedParticipantId&&!e.authorId);return k`
      <sticky-note
        style=${At({left:`${e.x}px`,top:`${e.y}px`})}
        ?dimmed=${t||n}
        .note=${e}
        .controller=${this.controller}
      ></sticky-note>
    `}renderTemplate(){const e=this.getBackgroundLayout();return e?k`
      <div
        class="board-template"
        style=${At({"--template-image":`url(${e.asset})`})}
        aria-hidden="true"
        role="presentation"
      ></div>
    `:null}handleDoubleClick(e){if(!this.controller||this.eventTargetsNote(e))return;const t=this.getWorkspaceRect();if(!t)return;const n=(e.clientX-t.left)/this.zoom-Li/2,i=(e.clientY-t.top)/this.zoom-Ii/2;this.controller.createNote(this.defaultColumnId,n,i)}handleDragOver(e){e.dataTransfer&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}handleDrop(e){var l;if(!e.dataTransfer||!this.controller)return;const t=e.dataTransfer.getData(bn);if(!t)return;e.preventDefault();const n=this.parsePayload(t);if(!n)return;const r=((l=this.notes.find(p=>p.id===n.noteId))==null?void 0:l.columnId)??this.defaultColumnId,o=this.getWorkspaceRect();if(!o)return;const s=(e.clientX-o.left)/this.zoom-n.offsetX,h=(e.clientY-o.top)/this.zoom-n.offsetY;this.controller.moveNote(n.noteId,r,s,h)}handleWheel(e){if(e.ctrlKey||e.metaKey){e.preventDefault();const t=-e.deltaY*.001;this.setZoom(this.zoom+t);return}this.panX-=e.deltaX,this.panY-=e.deltaY}handlePointerDown(e){var n;if(e.button!==0||this.eventTargetsNote(e))return;this.isPanning=!0,this.panOrigin={x:e.clientX,y:e.clientY};const t=e.currentTarget;(n=t.setPointerCapture)==null||n.call(t,e.pointerId)}handlePointerMove(e){if(!this.isPanning||!this.panOrigin)return;const t=e.clientX-this.panOrigin.x,n=e.clientY-this.panOrigin.y;this.panX+=t,this.panY+=n,this.panOrigin={x:e.clientX,y:e.clientY}}handlePointerUp(e){var n;if(!this.isPanning)return;this.isPanning=!1,this.panOrigin=null;const t=e.currentTarget;(n=t.releasePointerCapture)==null||n.call(t,e.pointerId)}setZoom(e){const t=Math.min(2,Math.max(.5,e));t!==this.zoom&&(this.zoom=Number(t.toFixed(2)))}getWorkspaceRect(){var e;return((e=this.noteLayer)==null?void 0:e.getBoundingClientRect())??this.getBoundingClientRect()}get defaultColumnId(){var e;return(e=Di[0])==null?void 0:e.id}getBackgroundLayout(){return ye.find(e=>e.id===this.background)}eventTargetsNote(e){return e.composedPath().some(t=>t instanceof HTMLElement&&t.tagName==="STICKY-NOTE")}parsePayload(e){try{const t=JSON.parse(e);return typeof t.noteId!="string"?null:{noteId:t.noteId,offsetX:Number(t.offsetX)||0,offsetY:Number(t.offsetY)||0}}catch{return null}}};B.styles=re`
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
      top: clamp(20px, 8vh, 100px);
      left: 50%;
      transform: translateX(-50%);
      width: min(2200px, calc(100% - 1rem));
      height: min(1240px, calc(100% - 80px));
      max-height: 1440px;
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
  `;G([et({attribute:!1})],B.prototype,"controller",2);G([A()],B.prototype,"notes",2);G([A()],B.prototype,"zoom",2);G([A()],B.prototype,"panX",2);G([A()],B.prototype,"panY",2);G([A()],B.prototype,"isPanning",2);G([et({attribute:!1})],B.prototype,"highlightedParticipantId",2);G([et({attribute:!1})],B.prototype,"background",2);G([Ae(".note-layer")],B.prototype,"noteLayer",2);B=G([se("retro-board")],B);var Fi=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,ht=(e,t,n,i)=>{for(var r=i>1?void 0:i?Gi(t,n):t,o=e.length-1,s;o>=0;o--)(s=e[o])&&(r=(i?s(t,n,r):s(r))||r);return i&&r&&Fi(t,n,r),r};const Ze=["#f87171","#fb923c","#facc15","#34d399","#38bdf8","#a855f7","#ec4899"];let W=class extends Z{constructor(){super(...arguments),this.active=!1,this.pulling=!1,this.pullVector={x:0,y:0},this.origin=null,this.ctx=null,this.lastTick=performance.now(),this.particles=[],this.onRemoteConfetti=e=>{const t=e.detail;t&&this.spawnConfetti(t)},this.handleResize=()=>{this.ensureCanvasSize()}}firstUpdated(){this.setupCanvas()}connectedCallback(){super.connectedCallback(),this.startLoop(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){var e;super.disconnectedCallback(),window.removeEventListener("resize",this.handleResize),this.stopLoop(),(e=this.controller)==null||e.removeEventListener("confetti-fired",this.onRemoteConfetti)}updated(e){var t;if(e.has("controller")){const n=e.get("controller");n==null||n.removeEventListener("confetti-fired",this.onRemoteConfetti),(t=this.controller)==null||t.addEventListener("confetti-fired",this.onRemoteConfetti)}e.has("active")&&!this.active&&this.resetPull()}render(){return k`
      <canvas part="canvas" aria-hidden="true"></canvas>
      <div
        class="sling-surface"
        data-active=${this.active?"true":"false"}
        data-pulling=${this.pulling?"true":"false"}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @pointerleave=${this.handlePointerUp}
      >
        ${this.renderReticle()}
      </div>
    `}renderReticle(){if(!this.pulling||!this.origin)return null;const e=this.origin.x+this.pullVector.x,t=this.origin.y+this.pullVector.y,n=Math.atan2(this.pullVector.y,this.pullVector.x),i=Math.min(this.maxPull,this.magnitude);return k`
      <div class="pull-reticle">
        <span
          class="reticle-band"
          style=${`left:${this.origin.x}px; top:${this.origin.y}px; width:${i}px; transform: translateY(-50%) rotate(${n}rad);`}
        ></span>
        <span
          class="reticle-origin"
          style=${`left:${this.origin.x}px; top:${this.origin.y}px;`}
        ></span>
        <span
          class="reticle-handle"
          style=${`left:${e}px; top:${t}px;`}
        ></span>
      </div>
    `}get magnitude(){return Math.hypot(this.pullVector.x,this.pullVector.y)}get maxPull(){return 160}getPointerLocal(e){const t=this.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}handlePointerDown(e){var n;if(!this.active)return;e.preventDefault(),this.pulling=!0,this.origin=this.getPointerLocal(e),this.pullVector={x:0,y:0};const t=e.currentTarget;(n=t.setPointerCapture)==null||n.call(t,e.pointerId),this.updatePull(e)}handlePointerMove(e){this.pulling&&(e.preventDefault(),this.updatePull(e))}handlePointerUp(e){var o;if(!this.pulling||!this.origin)return;e.preventDefault(),this.updatePull(e);const t=this.magnitude,n={...this.pullVector},i={...this.origin};this.pulling=!1;const r=e.currentTarget;(o=r.releasePointerCapture)==null||o.call(r,e.pointerId),this.pullVector={x:0,y:0},this.origin=null,!(t<12)&&this.launchConfetti(t,n,i)}updatePull(e){if(!this.origin)return;const t=this.getPointerLocal(e),n={x:t.x-this.origin.x,y:t.y-this.origin.y},i=Math.hypot(n.x,n.y)||1,o=Math.min(i,this.maxPull)/i;this.pullVector={x:n.x*o,y:n.y*o},this.requestUpdate()}launchConfetti(e,t,n){var a,d;const i=this.getCanvasWidth(),r=this.getCanvasHeight(),o=n.x/i,s=n.y/r,h={x:-t.x/i,y:-t.y/r},l=Math.min(1,e/this.maxPull),p=((d=(a=this.controller)==null?void 0:a.getLocalParticipant())==null?void 0:d.color)||"#34d399",m={id:Lt(),originX:o,originY:s,vectorX:h.x,vectorY:h.y,power:l,color:p,createdAt:Date.now()};this.controller?this.controller.fireConfetti(m):this.spawnConfetti(m),this.dispatchEvent(new CustomEvent("confetti-shot",{bubbles:!0,composed:!0}))}spawnConfetti(e){this.ensureCanvasSize();const t=this.getCanvasWidth(),n=this.getCanvasHeight(),i={x:e.originX*t,y:e.originY*n},r={x:e.vectorX*t,y:e.vectorY*n},o=Math.hypot(r.x,r.y)||1,s={x:r.x/o,y:r.y/o},h=400+e.power*650,l=Math.floor(80+e.power*70),p=this.buildPalette(e.color);for(let m=0;m<l;m++){const a=(Math.random()-.5)*.9,d=Math.atan2(s.y,s.x)+a,u=h*(.5+Math.random()*.9),x=Math.cos(d)*u+(Math.random()-.5)*120,D=Math.sin(d)*u+(Math.random()-.5)*120,X=2200+Math.random()*800,nt=2.8+Math.random()*2.8;this.particles.push({x:i.x,y:i.y,vx:x,vy:D,size:nt,rotation:Math.random()*Math.PI*2,rotationSpeed:(Math.random()-.5)*8,color:p[Math.floor(Math.random()*p.length)],life:X,ttl:X,shape:Math.random()>.4?"square":"circle"})}}buildPalette(e){if(!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e))return[...Ze];const t=e.replace("#",""),n=t.length===3?t.split("").map(s=>s+s).join(""):t,i=parseInt(n,16),r=s=>Math.min(255,Math.max(0,s)),o=s=>{const h=r((i>>16&255)+s),l=r((i>>8&255)+s),p=r((i&255)+s);return`#${((1<<24)+(h<<16)+(l<<8)+p).toString(16).slice(1)}`};return[o(70),o(30),e,o(-30),"#ffffff",...Ze]}setupCanvas(){this.canvas&&(this.ctx=this.canvas.getContext("2d"),this.ensureCanvasSize())}ensureCanvasSize(){if(!this.canvas)return;const e=this.getCanvasWidth(),t=this.getCanvasHeight();(this.canvas.width!==e||this.canvas.height!==t)&&(this.canvas.width=e,this.canvas.height=t)}getCanvasWidth(){return Math.floor(this.offsetWidth||window.innerWidth||1)}getCanvasHeight(){return Math.floor(this.offsetHeight||window.innerHeight||1)}startLoop(){if(this.frameHandle)return;const e=()=>{this.frameHandle=window.requestAnimationFrame(e),this.stepParticles(),this.drawParticles()};this.frameHandle=window.requestAnimationFrame(e)}stopLoop(){this.frameHandle&&(window.cancelAnimationFrame(this.frameHandle),this.frameHandle=void 0)}stepParticles(){const e=performance.now(),t=Math.min(32,e-this.lastTick),n=t/1e3;this.lastTick=e;const i=900;this.particles=this.particles.filter(r=>(r.life-=t,r.life<=0?!1:(r.vy+=i*n,r.x+=r.vx*n,r.y+=r.vy*n,r.rotation+=r.rotationSpeed*n,r.y<this.getCanvasHeight()+80)))}drawParticles(){if(!(!this.ctx||!this.canvas)){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);for(const e of this.particles){const t=Math.max(0,e.life/e.ttl);this.ctx.save(),this.ctx.globalAlpha=t,this.ctx.translate(e.x,e.y),this.ctx.rotate(e.rotation),this.ctx.fillStyle=e.color,e.shape==="circle"?(this.ctx.beginPath(),this.ctx.arc(0,0,e.size/2,0,Math.PI*2),this.ctx.fill()):this.ctx.fillRect(-e.size/2,-e.size/2,e.size,e.size*.6),this.ctx.restore()}}}resetPull(){this.pulling=!1,this.pullVector={x:0,y:0},this.origin=null}};W.styles=re`
    :host {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
      z-index: 3;
    }

    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .sling-surface {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .sling-surface[data-active='true'] {
      pointer-events: auto;
      cursor: crosshair;
      touch-action: none;
    }

    .sling-surface[data-active='true'][data-pulling='true'] {
      cursor: grabbing;
    }

    .pull-reticle {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .reticle-origin,
    .reticle-handle {
      position: absolute;
      width: 12px;
      height: 12px;
      margin-left: -6px;
      margin-top: -6px;
      border-radius: 50%;
      box-shadow: 0 10px 16px rgba(15, 23, 42, 0.2);
    }

    .reticle-origin {
      background: rgba(15, 23, 42, 0.8);
      border: 2px solid rgba(248, 250, 252, 0.8);
    }

    .reticle-handle {
      background: linear-gradient(135deg, #0ea5e9, #a855f7);
      border: 2px solid rgba(255, 255, 255, 0.9);
    }

    .reticle-band {
      position: absolute;
      height: 4px;
      border-radius: 999px;
      transform-origin: 0 50%;
      background: linear-gradient(90deg, rgba(14, 165, 233, 0.9), rgba(99, 102, 241, 0.95));
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
    }
  `;ht([et({attribute:!1})],W.prototype,"controller",2);ht([et({type:Boolean,reflect:!0})],W.prototype,"active",2);ht([A()],W.prototype,"pulling",2);ht([A()],W.prototype,"pullVector",2);ht([A()],W.prototype,"origin",2);ht([Ae("canvas")],W.prototype,"canvas",2);W=ht([se("confetti-sling")],W);var Yi=Object.defineProperty,Vi=Object.getOwnPropertyDescriptor,z=(e,t,n,i)=>{for(var r=i>1?void 0:i?Vi(t,n):t,o=e.length-1,s;o>=0;o--)(s=e[o])&&(r=(i?s(t,n,r):s(r))||r);return i&&r&&Yi(t,n,r),r};const Qe="metro-retro-profile",tn="metro-retro-background",en="libretro-onboarding",$e=["#fbbf24","#ef4444","#22d3ee","#a855f7","#34d399","#f472b6"],Kt={name:"",color:$e[0]};let I=class extends Z{constructor(){super(...arguments),this.boardId=null,this.copyState="idle",this.profile=null,this.profileDraft={...Kt},this.showProfileDialog=!1,this.participants=[],this.highlightedParticipantId=null,this.background="start-stop-continue",this.confettiEnabled=!1,this.showOnboarding=!0,this.onHashChange=()=>this.handleRoute(),this.onParticipantsChange=e=>{const t=e.detail;this.participants=t,this.highlightedParticipantId&&!t.some(n=>n.id===this.highlightedParticipantId)&&(this.highlightedParticipantId=null)},this.onBackgroundChange=e=>{const t=e.detail;t&&(this.background=t,this.persistBackground(t))},this.startFreshBoard=()=>{this.navigateToBoard(Lt())},this.handleFilterChange=e=>{const t=e.target.value;this.highlightedParticipantId=t||null},this.handleBackgroundChange=e=>{var n;const t=e.target.value;this.background=t,this.persistBackground(t),(n=this.controller)==null||n.setBoardBackground(t)},this.handleConfettiShortcut=e=>{!this.isReadyForConfetti||!this.isShortcutEvent(e)||(e.preventDefault(),this.confettiEnabled=!this.confettiEnabled)},this.handleConfettiShot=()=>{this.confettiEnabled=!1},this.handleProfileSubmit=e=>{e.preventDefault();const t=this.profileDraft.name.trim();if(!t)return;const n={name:t,color:this.profileDraft.color||Kt.color};this.profile=n,this.profileDraft={...n},this.showProfileDialog=!1,this.persistProfile(n),this.boardId?this.bootstrapBoard(this.boardId):this.handleRoute()},this.handleProfileNameInput=e=>{const t=e.target;this.profileDraft={...this.profileDraft,name:t.value}},this.handleProfileColorInput=e=>{const t=e.target;this.profileDraft={...this.profileDraft,color:t.value}},this.randomizeProfileColor=()=>{const e=$e[Math.floor(Math.random()*$e.length)];this.profileDraft={...this.profileDraft,color:e}},this.dismissOnboarding=()=>{if(this.showOnboarding=!1,!(typeof window>"u"))try{window.localStorage.setItem(en,"dismissed")}catch{}},this.openProfileDialog=()=>{this.profileDraft=this.profile?{...this.profile}:{...Kt},this.showProfileDialog=!0},this.closeProfileDialog=()=>{this.profile&&(this.profileDraft={...this.profile},this.showProfileDialog=!1)}}connectedCallback(){super.connectedCallback(),this.initializeProfile(),this.initializeBackground(),this.initializeOnboarding(),window.addEventListener("hashchange",this.onHashChange),window.addEventListener("keydown",this.handleConfettiShortcut),this.handleRoute()}disconnectedCallback(){var e,t,n;window.removeEventListener("hashchange",this.onHashChange),window.removeEventListener("keydown",this.handleConfettiShortcut),(e=this.controller)==null||e.removeEventListener("participants-changed",this.onParticipantsChange),(t=this.controller)==null||t.removeEventListener("background-changed",this.onBackgroundChange),(n=this.controller)==null||n.dispose(),super.disconnectedCallback()}render(){const e=!!(this.boardId&&this.controller&&this.profile);return k`
            <retro-board
                .controller=${this.controller}
                .highlightedParticipantId=${this.highlightedParticipantId}
                .background=${this.background}
            ></retro-board>
            <confetti-sling
                .controller=${this.controller}
                .active=${this.confettiEnabled&&e}
                @confetti-shot=${this.handleConfettiShot}
            ></confetti-sling>
            <div class="ui-overlay">
                ${e?k`
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
                          ${this.renderProfilePanel()}
                          ${this.renderOnboarding()}
                      `:k`<div class="loading">
                          Preparing your retro board…
                      </div>`}
                ${this.renderProfileDialog()}
            </div>
        `}get copyLabel(){switch(this.copyState){case"copied":return"Link copied";case"error":return"Copy failed";default:return"Copy link"}}get shortBoardId(){return this.boardId?this.boardId.slice(0,6).toUpperCase():"—"}handleRoute(){const e=this.extractBoardId();if(!e){this.navigateToBoard(Lt());return}e===this.boardId&&this.controller||this.bootstrapBoard(e)}extractBoardId(){const t=window.location.hash.replace(/^#/,"").match(/board\/([\w-]+)/i);return(t==null?void 0:t[1])??null}navigateToBoard(e){window.location.hash=`#/board/${e}`}bootstrapBoard(e){var n,i,r;if((n=this.controller)==null||n.removeEventListener("participants-changed",this.onParticipantsChange),(i=this.controller)==null||i.removeEventListener("background-changed",this.onBackgroundChange),(r=this.controller)==null||r.dispose(),this.boardId=e,!this.profile){this.controller=void 0,this.participants=[];return}const t=new Mi(e,this.profileToParticipant(this.profile),this.background);t.addEventListener("participants-changed",this.onParticipantsChange),t.addEventListener("background-changed",this.onBackgroundChange),this.controller=t,this.participants=t.getParticipants(),this.background=t.getBoardBackground(),this.persistBackground(this.background),this.copyState="idle"}async handleCopyLink(){try{await navigator.clipboard.writeText(window.location.href),this.copyState="copied"}catch{this.copyState="error"}finally{window.setTimeout(()=>this.copyState="idle",2e3)}}initializeProfile(){const e=this.readProfileFromStorage();if(e){this.profile=e,this.profileDraft={...e},this.showProfileDialog=!1;return}this.profile=null,this.profileDraft={...Kt},this.showProfileDialog=!0}initializeOnboarding(){if(typeof window>"u"){this.showOnboarding=!0;return}try{const e=window.localStorage.getItem(en);this.showOnboarding=e!=="dismissed"}catch{this.showOnboarding=!0}}readProfileFromStorage(){if(typeof window>"u")return null;try{const e=window.localStorage.getItem(Qe);if(!e)return null;const t=JSON.parse(e);return typeof(t==null?void 0:t.name)!="string"||typeof(t==null?void 0:t.color)!="string"?null:{name:t.name,color:t.color}}catch{return null}}persistProfile(e){if(!(typeof window>"u"))try{window.localStorage.setItem(Qe,JSON.stringify(e))}catch{}}renderProfileDialog(){if(!this.showProfileDialog&&this.profile)return null;const e=this.profileDraft.name.trim().length>0,t=!!this.profile;return k`
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
                                class="color-picker"
                                .value=${this.profileDraft.color}
                                @input=${this.handleProfileColorInput}
                            />
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
                        ${t?k`<button
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
        `}renderFilterControl(){return this.participants.length?k`
            <label class="filter-control">
                <select
                    @change=${this.handleFilterChange}
                    .value=${this.highlightedParticipantId??""}
                >
                    <option value="">All notes</option>
                    ${this.participants.map(e=>k`<option value=${e.id}>
                                ${e.label}
                            </option>`)}
                </select>
            </label>
        `:null}renderProfilePanel(){if(!this.profile)return null;const e=this.localParticipantId,t=this.participants.filter(n=>n.id!==e);return k`
            <div class="profile-panel">
                <button
                    type="button"
                    class="participant-circle self"
                    style=${`--circle:${this.profile.color}`}
                    @click=${this.openProfileDialog}
                    aria-label="Edit profile"
                    title="Edit profile"
                >
                    ${this.profileInitials}
                </button>
                <div class="participant-stack" role="list">
                    ${t.map(n=>k`
                            <span
                                class="participant-circle peer"
                                role="listitem"
                                style=${`--circle:${n.color}`}
                                title=${n.label}
                            >
                                ${this.participantInitials(n.label)}
                            </span>
                        `)}
                </div>
            </div>
        `}renderOnboarding(){return this.showOnboarding?k`
            <div class="onboarding-card" role="dialog" aria-live="polite">
                <div class="onboarding-header">
                    <p class="eyebrow">Quick guide</p>
                    <button
                        type="button"
                        class="ghost onboarding-dismiss"
                        aria-label="Dismiss onboarding"
                        @click=${this.dismissOnboarding}
                    >
                        ×
                    </button>
                </div>
                <h3>Welcome to libRetro</h3>
                <ul>
                    <li>Double-click anywhere on the board to drop a sticky.</li>
                    <li>Hold and drag to pan; use the +/- buttons to zoom.</li>
                    <li>Press <strong>Shift + C</strong> to fire one confetti sling.</li>
                </ul>
                <button class="primary" type="button" @click=${this.dismissOnboarding}>
                    Got it
                </button>
            </div>
        `:null}renderBackgroundControl(){return k`
            <label class="filter-control">
                <select
                    @change=${this.handleBackgroundChange}
                    .value=${this.background}
                >
                    ${ye.map(e=>k`<option value=${e.id}>
                                ${e.label}
                            </option>`)}
                </select>
            </label>
        `}get isReadyForConfetti(){return!!(this.boardId&&this.controller&&this.profile)}get localParticipantId(){var e,t;return((t=(e=this.controller)==null?void 0:e.getLocalParticipant())==null?void 0:t.id)??null}get profileInitials(){var n,i;const e=(i=(n=this.profile)==null?void 0:n.name)==null?void 0:i.trim();return e?(e.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("")||e.slice(0,2)).toUpperCase():"YOU"}participantInitials(e){const t=e==null?void 0:e.trim();return t?(t.split(/\s+/).filter(Boolean).slice(0,2).map(i=>i[0]).join("")||t.slice(0,2)).toUpperCase():"?"}isShortcutEvent(e){var r;if(!e.shiftKey||e.key.toLowerCase()!=="c")return!1;const t=e.target;if(!t)return!0;const n=t.tagName;return!(((r=t.getAttribute("contenteditable"))==null?void 0:r.toLowerCase())==="true"||n==="INPUT"||n==="TEXTAREA"||n==="SELECT")}profileToParticipant(e){return{label:e.name,color:e.color}}initializeBackground(){const e=this.readBackgroundFromStorage();this.background=e??"start-stop-continue"}readBackgroundFromStorage(){if(typeof window>"u")return null;const e=window.localStorage.getItem(tn);return e&&ye.some(t=>t.id===e)?e:null}persistBackground(e){typeof window>"u"||window.localStorage.setItem(tn,e)}};I.styles=re`
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

        .profile-panel {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            pointer-events: auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
        }

        .participant-stack {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            align-items: center;
        }

        .onboarding-card {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            width: min(280px, 90vw);
            background: rgba(255, 255, 255, 0.98);
            border-radius: 16px;
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 20px 45px rgba(15, 23, 42, 0.15);
            padding: 1rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
        }

        .onboarding-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
        }

        .onboarding-card h3 {
            margin: 0;
            font-size: 1.1rem;
        }

        .onboarding-card ul {
            margin: 0;
            padding-left: 1.1rem;
            color: #475569;
            font-size: 0.9rem;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
        }

        .onboarding-card strong {
            font-weight: 600;
            color: #0f172a;
        }

        .onboarding-dismiss {
            width: 28px;
            height: 28px;
            padding: 0;
            display: grid;
            place-items: center;
            font-size: 1.1rem;
            border-radius: 50%;
        }

        .participant-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--circle, #94a3b8);
            color: #0f172a;
            font-weight: 600;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(15, 23, 42, 0.18);
            box-shadow: 0 6px 12px rgba(15, 23, 42, 0.12);
        }

        .participant-circle.self {
            width: 48px;
            height: 48px;
            cursor: pointer;
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

        .color-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .color-picker {
            width: 52px;
            height: 44px;
            padding: 0;
            border: 1px solid rgba(148, 163, 184, 0.6);
            border-radius: 10px;
            background: #ffffff;
            cursor: pointer;
        }

        .color-picker::-webkit-color-swatch-wrapper {
            padding: 0;
            border-radius: 8px;
        }

        .color-picker::-webkit-color-swatch {
            border: none;
            border-radius: 8px;
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
    `;z([A()],I.prototype,"boardId",2);z([A()],I.prototype,"controller",2);z([A()],I.prototype,"copyState",2);z([A()],I.prototype,"profile",2);z([A()],I.prototype,"profileDraft",2);z([A()],I.prototype,"showProfileDialog",2);z([A()],I.prototype,"participants",2);z([A()],I.prototype,"highlightedParticipantId",2);z([A()],I.prototype,"background",2);z([A()],I.prototype,"confettiEnabled",2);z([A()],I.prototype,"showOnboarding",2);I=z([se("app-root")],I);
