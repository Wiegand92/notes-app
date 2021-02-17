(()=>{var t={484:function(t){t.exports=function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",a="week",o="month",s="quarter",u="year",c="date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,l={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},h=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},m={s:h,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+h(r,2,"0")+":"+h(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,o),a=n-i<0,s=e.clone().add(r+(a?-1:1),o);return+(-(r+(n-i)/(a?i-s:s-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(d){return{M:o,y:u,w:a,d:i,D:c,h:r,m:n,s:e,ms:t,Q:s}[d]||String(d||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",y={};y[v]=l;var p=function(t){return t instanceof w},$=function(t,e,n){var r;if(!t)return v;if("string"==typeof t)y[t]&&(r=t),e&&(y[t]=e,r=t);else{var i=t.name;y[i]=t,r=i}return!n&&r&&(v=r),r||!n&&v},g=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},M=m;M.l=$,M.i=p,M.w=function(t,e){return g(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function l(t){this.$L=$(t.locale,null,!0),this.parse(t)}var h=l.prototype;return h.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(d);if(r){var i=r[2]-1||0,a=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},h.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},h.$utils=function(){return M},h.isValid=function(){return!("Invalid Date"===this.$d.toString())},h.isSame=function(t,e){var n=g(t);return this.startOf(e)<=n&&n<=this.endOf(e)},h.isAfter=function(t,e){return g(t)<this.startOf(e)},h.isBefore=function(t,e){return this.endOf(e)<g(t)},h.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(t,s){var d=this,f=!!M.u(s)||s,l=M.p(t),h=function(t,e){var n=M.w(d.$u?Date.UTC(d.$y,e,t):new Date(d.$y,e,t),d);return f?n:n.endOf(i)},m=function(t,e){return M.w(d.toDate()[t].apply(d.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(e)),d)},v=this.$W,y=this.$M,p=this.$D,$="set"+(this.$u?"UTC":"");switch(l){case u:return f?h(1,0):h(31,11);case o:return f?h(1,y):h(0,y+1);case a:var g=this.$locale().weekStart||0,w=(v<g?v+7:v)-g;return h(f?p-w:p+(6-w),y);case i:case c:return m($+"Hours",0);case r:return m($+"Minutes",1);case n:return m($+"Seconds",2);case e:return m($+"Milliseconds",3);default:return this.clone()}},h.endOf=function(t){return this.startOf(t,!1)},h.$set=function(a,s){var d,f=M.p(a),l="set"+(this.$u?"UTC":""),h=(d={},d[i]=l+"Date",d[c]=l+"Date",d[o]=l+"Month",d[u]=l+"FullYear",d[r]=l+"Hours",d[n]=l+"Minutes",d[e]=l+"Seconds",d[t]=l+"Milliseconds",d)[f],m=f===i?this.$D+(s-this.$W):s;if(f===o||f===u){var v=this.clone().set(c,1);v.$d[h](m),v.init(),this.$d=v.set(c,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},h.set=function(t,e){return this.clone().$set(t,e)},h.get=function(t){return this[M.p(t)]()},h.add=function(t,s){var c,d=this;t=Number(t);var f=M.p(s),l=function(e){var n=g(d);return M.w(n.date(n.date()+Math.round(e*t)),d)};if(f===o)return this.set(o,this.$M+t);if(f===u)return this.set(u,this.$y+t);if(f===i)return l(1);if(f===a)return l(7);var h=(c={},c[n]=6e4,c[r]=36e5,c[e]=1e3,c)[f]||1,m=this.$d.getTime()+t*h;return M.w(m,this)},h.subtract=function(t,e){return this.add(-1*t,e)},h.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=M.z(this),i=this.$locale(),a=this.$H,o=this.$m,s=this.$M,u=i.weekdays,c=i.months,d=function(t,r,i,a){return t&&(t[r]||t(e,n))||i[r].substr(0,a)},l=function(t){return M.s(a%12||12,t,"0")},h=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:s+1,MM:M.s(s+1,2,"0"),MMM:d(i.monthsShort,s,c,3),MMMM:d(c,s),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:d(i.weekdaysMin,this.$W,u,2),ddd:d(i.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(a),HH:M.s(a,2,"0"),h:l(1),hh:l(2),a:h(a,o,!0),A:h(a,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:r};return n.replace(f,(function(t,e){return e||m[t]||r.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(t,c,d){var f,l=M.p(c),h=g(t),m=6e4*(h.utcOffset()-this.utcOffset()),v=this-h,y=M.m(this,h);return y=(f={},f[u]=y/12,f[o]=y,f[s]=y/3,f[a]=(v-m)/6048e5,f[i]=(v-m)/864e5,f[r]=v/36e5,f[n]=v/6e4,f[e]=v/1e3,f)[l]||v,d?y:M.a(y)},h.daysInMonth=function(){return this.endOf(o).$D},h.$locale=function(){return y[this.$L]},h.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=$(t,e,!0);return r&&(n.$L=r),n},h.clone=function(){return M.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},l}(),S=w.prototype;return g.prototype=S,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",o],["$y",u],["$D",c]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),g.extend=function(t,e){return t.$i||(t(e,w,g),t.$i=!0),g},g.locale=$,g.isDayjs=p,g.unix=function(t){return g(1e3*t)},g.en=y[v],g.Ls=y,g.p={},g}()},110:function(t){t.exports=function(){"use strict";return function(t,e,n){t=t||{};var r=e.prototype,i={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function a(t,e,n,i){return r.fromToBase(t,e,n,i)}n.en.relativeTime=i,r.fromToBase=function(e,r,a,o,s){for(var u,c,d,f=a.$locale().relativeTime||i,l=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],h=l.length,m=0;m<h;m+=1){var v=l[m];v.d&&(u=o?n(e).diff(a,v.d,!0):a.diff(e,v.d,!0));var y=(t.rounding||Math.round)(Math.abs(u));if(d=u>0,y<=v.r||!v.r){y<=1&&m>0&&(v=l[m-1]);var p=f[v.l];s&&(y=s(""+y)),c="string"==typeof p?p.replace("%d",y):p(y,r,v.l,d);break}}if(r)return c;var $=d?f.future:f.past;return"function"==typeof $?$(c):$.replace("%s",c)},r.to=function(t,e){return a(t,e,this,!0)},r.from=function(t,e){return a(t,e,this)};var o=function(t){return t.$u?n.utc():n()};r.toNow=function(t){return this.to(o(this),t)},r.fromNow=function(t){return this.from(o(this),t)}}}()}},e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t,e=n(484),r=n.n(e),i=n(110),a=n.n(i),o=new Uint8Array(16);function s(){if(!t&&!(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(o)}const u=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,c=function(t){return"string"==typeof t&&u.test(t)};for(var d=[],f=0;f<256;++f)d.push((f+256).toString(16).substr(1));const l=function(t,e,n){var r=(t=t||{}).random||(t.rng||s)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,e){n=n||0;for(var i=0;i<16;++i)e[n+i]=r[i];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(d[t[e+0]]+d[t[e+1]]+d[t[e+2]]+d[t[e+3]]+"-"+d[t[e+4]]+d[t[e+5]]+"-"+d[t[e+6]]+d[t[e+7]]+"-"+d[t[e+8]]+d[t[e+9]]+"-"+d[t[e+10]]+d[t[e+11]]+d[t[e+12]]+d[t[e+13]]+d[t[e+14]]+d[t[e+15]]).toLowerCase();if(!c(n))throw TypeError("Stringified UUID is invalid");return n}(r)};r().extend(a());var h=function(t){return t.lastEdit?r()(t.lastEdit).fromNow():r()(t.createdOn).fromNow()},m=function(t){var e=JSON.stringify(t);localStorage.setItem("userNotes",e)};function v(t,e){var n=t.title.toLowerCase(),r=e.title.toLowerCase();return n<r?-1:n>r?1:0}function y(t,e){var n=t.lastEdit||t.createdOn,r=e.lastEdit||e.createdOn;return n<r?1:n>r?-1:0}function p(t,e){var n=t.createdOn,r=e.createdOn;return n<r?1:n>r?-1:0}function $(t,e){var n=t.createdOn,r=e.createdOn;return n<r?-1:n>r?1:0}var g=function t(e,n){var r,i=document.querySelector("#notes");if(i.innerHTML="",void 0!==n.sortBy)switch(n.sortBy){case"alphabetical":e.sort(v);break;case"newest":e.sort(p);break;case"oldest":e.sort($);break;case"lastEdited":e.sort(y)}void 0!==n.text&&(r=e.filter((function(t){return t.title.toLowerCase().includes(n.text.toLowerCase())||t.body.toLowerCase().includes(n.text.toLowerCase())}))),r?r.forEach((function(t){var e=M(t);i.appendChild(e)})):e.forEach((function(t){var e=M(t);i.appendChild(e)})),document.querySelectorAll(".delete-note").forEach((function(r){var i=r.parentNode.parentNode.parentNode;r.addEventListener("click",(function(r){r.preventDefault(),function(t,e){var n;n=function(t,e){return e.findIndex((function(e){return e.uuid===t}))}(t.uuid,e),e.splice(n,1),m(e)}(i,e),t(e,n)}))}))},M=function(t){var e=document.createElement("div");e.className="note";var n=document.createElement("div");n.className="note-content";var r=document.createElement("div");r.className="date-container";var i=document.createElement("a");i.className="note-title";var a=document.createElement("p");a.className="note-body";var o=document.createElement("p");o.classList.add("note-date","created");var s=document.createElement("p");s.classList.add("note-date","edited");var u=document.createElement("button");return u.className="delete-note",u.innerText="Delete Note",i.innerText=t.title,i.href="/edit.html#".concat(t.uuid),o.innerHTML="Created on: <br> ".concat(t.userReadDate),s.innerHTML="Last Edited: <br> ".concat(h(t)),a.innerText=t.body.substring(0,100).trim()+" . . .",a.innerHTML+="<br>",a.append(u),e.uuid=t.uuid,window.setInterval((function(){s.innerText="Last Edited: ".concat(h(t))}),3e5),r.append(o,s),n.append(a,r),e.append(i,n),e},w=r()(),S={text:"",sortBy:""},D=[{title:"Hello World!",body:"testing, testing testing ...",createdOn:w,userReadDate:w.format("DD/MM/YY"),uuid:l()}],O=JSON.parse(localStorage.getItem("userNotes"))||!1;if(!O||0===O.length){O=[].concat(D);var b=JSON.stringify(O);localStorage.setItem("userNotes",b)}document.querySelector("#new-note").addEventListener("submit",(function(t){t.preventDefault(),function(t,e){var n=document.querySelector("#newTitle"),i=document.querySelector("#newBody");n.value?(t.push({title:n.value,body:i.value,createdOn:r()(),uuid:l(),userReadDate:r()().format("DD/MM/YY"),lastEdit:null}),n.value="",i.value="",m(t),g(t,e)):(alert("Sorry, your note must have a title."),n.className+="invalid",window.setTimeout((function(){n.className=""}),3e4))}(O,S)})),g(O,S),document.querySelector("#search").addEventListener("input",(function(t){S.text=t.target.value,g(O,S)})),document.querySelector("#sortBy").addEventListener("change",(function(t){S.sortBy=t.target.value,g(O,S)}))})()})();