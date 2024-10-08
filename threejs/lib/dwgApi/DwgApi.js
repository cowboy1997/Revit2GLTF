/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={})}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,i=286,n=30,s=15,r=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),l=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),o=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);e(d);const _=new Array(60);e(_);const f=new Array(512);e(f);const c=new Array(256);e(c);const u=new Array(29);e(u);const w=new Array(n);function b(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}let g,p,m;function k(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(w);const v=t=>t<256?f[t]:f[256+(t>>>7)],y=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},x=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,y(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},z=(t,e,a)=>{x(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const i=new Array(16);let n,r,l=0;for(n=1;n<=s;n++)i[n]=l=l+a[n-1]<<1;for(r=0;r<=e;r++){let e=t[2*r+1];0!==e&&(t[2*r]=A(i[e]++,e))}},R=t=>{let e;for(e=0;e<i;e++)t.dyn_ltree[2*e]=0;for(e=0;e<n;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},Z=t=>{t.bi_valid>8?y(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},U=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},S=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&U(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!U(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i},D=(t,e,i)=>{let n,s,o,h,d=0;if(0!==t.last_lit)do{n=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],s=t.pending_buf[t.l_buf+d],d++,0===n?z(t,s,e):(o=c[s],z(t,o+a+1,e),h=r[o],0!==h&&(s-=u[o],x(t,s,h)),n--,o=v(n),z(t,o,i),h=l[o],0!==h&&(n-=w[o],x(t,n,h)))}while(d<t.last_lit);z(t,256,e)},T=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,r=e.stat_desc.elems;let l,o,h,d=-1;for(t.heap_len=0,t.heap_max=573,l=0;l<r;l++)0!==a[2*l]?(t.heap[++t.heap_len]=d=l,t.depth[l]=0):a[2*l+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=d<2?++d:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,n&&(t.static_len-=i[2*h+1]);for(e.max_code=d,l=t.heap_len>>1;l>=1;l--)S(t,a,l);h=r;do{l=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),o=t.heap[1],t.heap[--t.heap_max]=l,t.heap[--t.heap_max]=o,a[2*h]=a[2*l]+a[2*o],t.depth[h]=(t.depth[l]>=t.depth[o]?t.depth[l]:t.depth[o])+1,a[2*l+1]=a[2*o+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,l=e.stat_desc.extra_bits,o=e.stat_desc.extra_base,h=e.stat_desc.max_length;let d,_,f,c,u,w,b=0;for(c=0;c<=s;c++)t.bl_count[c]=0;for(a[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=a[2*a[2*_+1]+1]+1,c>h&&(c=h,b++),a[2*_+1]=c,_>i||(t.bl_count[c]++,u=0,_>=o&&(u=l[_-o]),w=a[2*_],t.opt_len+=w*(c+u),r&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==b){do{for(c=h-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[h]--,b-=2}while(b>0);for(c=h;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>i||(a[2*f+1]!==c&&(t.opt_len+=(c-a[2*f+1])*a[2*f],a[2*f+1]=c),_--)}})(t,e),E(a,d,t.bl_count)},O=(t,e,a)=>{let i,n,s=-1,r=e[1],l=0,o=7,h=4;for(0===r&&(o=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++l<o&&n===r||(l<h?t.bl_tree[2*n]+=l:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):l<=10?t.bl_tree[34]++:t.bl_tree[36]++,l=0,s=n,0===r?(o=138,h=3):n===r?(o=6,h=3):(o=7,h=4))},I=(t,e,a)=>{let i,n,s=-1,r=e[1],l=0,o=7,h=4;for(0===r&&(o=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++l<o&&n===r)){if(l<h)do{z(t,n,t.bl_tree)}while(0!=--l);else 0!==n?(n!==s&&(z(t,n,t.bl_tree),l--),z(t,16,t.bl_tree),x(t,l-3,2)):l<=10?(z(t,17,t.bl_tree),x(t,l-3,3)):(z(t,18,t.bl_tree),x(t,l-11,7));l=0,s=n,0===r?(o=138,h=3):n===r?(o=6,h=3):(o=7,h=4)}};let F=!1;const L=(t,e,a,i)=>{x(t,0+(i?1:0),3),((t,e,a,i)=>{Z(t),i&&(y(t,a),y(t,~a)),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a})(t,e,a,!0)};var N={_tr_init:t=>{F||((()=>{let t,e,a,h,k;const v=new Array(16);for(a=0,h=0;h<28;h++)for(u[h]=a,t=0;t<1<<r[h];t++)c[a++]=h;for(c[a-1]=h,k=0,h=0;h<16;h++)for(w[h]=k,t=0;t<1<<l[h];t++)f[k++]=h;for(k>>=7;h<n;h++)for(w[h]=k<<7,t=0;t<1<<l[h]-7;t++)f[256+k++]=h;for(e=0;e<=s;e++)v[e]=0;for(t=0;t<=143;)d[2*t+1]=8,t++,v[8]++;for(;t<=255;)d[2*t+1]=9,t++,v[9]++;for(;t<=279;)d[2*t+1]=7,t++,v[7]++;for(;t<=287;)d[2*t+1]=8,t++,v[8]++;for(E(d,287,v),t=0;t<n;t++)_[2*t+1]=5,_[2*t]=A(t,5);g=new b(d,r,257,i,s),p=new b(_,l,0,n,s),m=new b(new Array(0),o,0,19,7)})(),F=!0),t.l_desc=new k(t.dyn_ltree,g),t.d_desc=new k(t.dyn_dtree,p),t.bl_desc=new k(t.bl_tree,m),t.bi_buf=0,t.bi_valid=0,R(t)},_tr_stored_block:L,_tr_flush_block:(t,e,i,n)=>{let s,r,l=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),T(t,t.l_desc),T(t,t.d_desc),l=(t=>{let e;for(O(t,t.dyn_ltree,t.l_desc.max_code),O(t,t.dyn_dtree,t.d_desc.max_code),T(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),s=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=s&&(s=r)):s=r=i+5,i+4<=s&&-1!==e?L(t,e,i,n):4===t.strategy||r===s?(x(t,2+(n?1:0),3),D(t,d,_)):(x(t,4+(n?1:0),3),((t,e,a,i)=>{let n;for(x(t,e-257,5),x(t,a-1,5),x(t,i-4,4),n=0;n<i;n++)x(t,t.bl_tree[2*h[n]+1],3);I(t,t.dyn_ltree,e-1),I(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,l+1),D(t,t.dyn_ltree,t.dyn_dtree)),R(t),n&&Z(t)},_tr_tally:(t,e,i)=>(t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&i,t.last_lit++,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(c[i]+a+1)]++,t.dyn_dtree[2*v(e)]++),t.last_lit===t.lit_bufsize-1),_tr_align:t=>{x(t,2,3),z(t,256,d),(t=>{16===t.bi_valid?(y(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var B=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const C=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var M=(t,e,a,i)=>{const n=C,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},H={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},j={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:K,_tr_stored_block:P,_tr_flush_block:Y,_tr_tally:G,_tr_align:X}=N,{Z_NO_FLUSH:W,Z_PARTIAL_FLUSH:q,Z_FULL_FLUSH:J,Z_FINISH:Q,Z_BLOCK:V,Z_OK:$,Z_STREAM_END:tt,Z_STREAM_ERROR:et,Z_DATA_ERROR:at,Z_BUF_ERROR:it,Z_DEFAULT_COMPRESSION:nt,Z_FILTERED:st,Z_HUFFMAN_ONLY:rt,Z_RLE:lt,Z_FIXED:ot,Z_DEFAULT_STRATEGY:ht,Z_UNKNOWN:dt,Z_DEFLATED:_t}=j,ft=258,ct=262,ut=103,wt=113,bt=666,gt=(t,e)=>(t.msg=H[e],e),pt=t=>(t<<1)-(t>4?9:0),mt=t=>{let e=t.length;for(;--e>=0;)t[e]=0};let kt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const vt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},yt=(t,e)=>{Y(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,vt(t.strm)},xt=(t,e)=>{t.pending_buf[t.pending++]=e},zt=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},At=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=B(t.adler,e,n,a):2===t.state.wrap&&(t.adler=M(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},Et=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,l=t.nice_match;const o=t.strstart>t.w_size-ct?t.strstart-(t.w_size-ct):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+ft;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),l>t.lookahead&&(l=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=ft-(f-s),s=f-ft,i>r){if(t.match_start=e,r=i,i>=l)break;c=h[s+r-1],u=h[s+r]}}}while((e=_[e&d])>o&&0!=--n);return r<=t.lookahead?r:t.lookahead},Rt=t=>{const e=t.w_size;let a,i,n,s,r;do{if(s=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ct)){t.window.set(t.window.subarray(e,e+e),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,i=t.hash_size,a=i;do{n=t.head[--a],t.head[a]=n>=e?n-e:0}while(--i);i=e,a=i;do{n=t.prev[--a],t.prev[a]=n>=e?n-e:0}while(--i);s+=e}if(0===t.strm.avail_in)break;if(i=At(t.strm,t.window,t.strstart+t.lookahead,s),t.lookahead+=i,t.lookahead+t.insert>=3)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=kt(t,t.ins_h,t.window[r+1]);t.insert&&(t.ins_h=kt(t,t.ins_h,t.window[r+3-1]),t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ct&&0!==t.strm.avail_in)},Zt=(t,e)=>{let a,i;for(;;){if(t.lookahead<ct){if(Rt(t),t.lookahead<ct&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ct&&(t.match_length=Et(t,a)),t.match_length>=3)if(i=G(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=kt(t,t.ins_h,t.window[t.strstart+1]);else i=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2},Ut=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<ct){if(Rt(t),t.lookahead<ct&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ct&&(t.match_length=Et(t,a),t.match_length<=5&&(t.strategy===st||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=G(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(yt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=G(t,0,t.window[t.strstart-1]),i&&yt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=G(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2};function St(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}const Dt=[new St(0,0,0,0,((t,e)=>{let a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Rt(t),0===t.lookahead&&e===W)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;const i=t.block_start+a;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,yt(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-ct&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(yt(t,!1),t.strm.avail_out),1)})),new St(4,4,8,4,Zt),new St(4,5,16,8,Zt),new St(4,6,32,32,Zt),new St(4,4,16,16,Ut),new St(8,16,32,32,Ut),new St(8,16,128,128,Ut),new St(8,32,128,256,Ut),new St(32,128,258,1024,Ut),new St(32,258,258,4096,Ut)];function Tt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=_t,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),mt(this.dyn_ltree),mt(this.dyn_dtree),mt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),mt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),mt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Ot=t=>{if(!t||!t.state)return gt(t,et);t.total_in=t.total_out=0,t.data_type=dt;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:wt,t.adler=2===e.wrap?0:1,e.last_flush=W,K(e),$},It=t=>{const e=Ot(t);var a;return e===$&&((a=t.state).window_size=2*a.w_size,mt(a.head),a.max_lazy_match=Dt[a.level].max_lazy,a.good_match=Dt[a.level].good_length,a.nice_match=Dt[a.level].nice_length,a.max_chain_length=Dt[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ft=(t,e,a,i,n,s)=>{if(!t)return et;let r=1;if(e===nt&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==_t||i<8||i>15||e<0||e>9||s<0||s>ot)return gt(t,et);8===i&&(i=9);const l=new Tt;return t.state=l,l.strm=t,l.wrap=r,l.gzhead=null,l.w_bits=i,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=n+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+3-1)/3),l.window=new Uint8Array(2*l.w_size),l.head=new Uint16Array(l.hash_size),l.prev=new Uint16Array(l.w_size),l.lit_bufsize=1<<n+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new Uint8Array(l.pending_buf_size),l.d_buf=1*l.lit_bufsize,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=s,l.method=a,It(t)};var Lt={deflateInit:(t,e)=>Ft(t,e,_t,15,8,ht),deflateInit2:Ft,deflateReset:It,deflateResetKeep:Ot,deflateSetHeader:(t,e)=>t&&t.state?2!==t.state.wrap?et:(t.state.gzhead=e,$):et,deflate:(t,e)=>{let a,i;if(!t||!t.state||e>V||e<0)return t?gt(t,et):et;const n=t.state;if(!t.output||!t.input&&0!==t.avail_in||n.status===bt&&e!==Q)return gt(t,0===t.avail_out?it:et);n.strm=t;const s=n.last_flush;if(n.last_flush=e,42===n.status)if(2===n.wrap)t.adler=0,xt(n,31),xt(n,139),xt(n,8),n.gzhead?(xt(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),xt(n,255&n.gzhead.time),xt(n,n.gzhead.time>>8&255),xt(n,n.gzhead.time>>16&255),xt(n,n.gzhead.time>>24&255),xt(n,9===n.level?2:n.strategy>=rt||n.level<2?4:0),xt(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(xt(n,255&n.gzhead.extra.length),xt(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(t.adler=M(t.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(xt(n,0),xt(n,0),xt(n,0),xt(n,0),xt(n,0),xt(n,9===n.level?2:n.strategy>=rt||n.level<2?4:0),xt(n,3),n.status=wt);else{let e=_t+(n.w_bits-8<<4)<<8,a=-1;a=n.strategy>=rt||n.level<2?0:n.level<6?1:6===n.level?2:3,e|=a<<6,0!==n.strstart&&(e|=32),e+=31-e%31,n.status=wt,zt(n,e),0!==n.strstart&&(zt(n,t.adler>>>16),zt(n,65535&t.adler)),t.adler=1}if(69===n.status)if(n.gzhead.extra){for(a=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),vt(t),a=n.pending,n.pending!==n.pending_buf_size));)xt(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){a=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),vt(t),a=n.pending,n.pending===n.pending_buf_size)){i=1;break}i=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,xt(n,i)}while(0!==i);n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),0===i&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){a=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),vt(t),a=n.pending,n.pending===n.pending_buf_size)){i=1;break}i=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,xt(n,i)}while(0!==i);n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),0===i&&(n.status=ut)}else n.status=ut;if(n.status===ut&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&vt(t),n.pending+2<=n.pending_buf_size&&(xt(n,255&t.adler),xt(n,t.adler>>8&255),t.adler=0,n.status=wt)):n.status=wt),0!==n.pending){if(vt(t),0===t.avail_out)return n.last_flush=-1,$}else if(0===t.avail_in&&pt(e)<=pt(s)&&e!==Q)return gt(t,it);if(n.status===bt&&0!==t.avail_in)return gt(t,it);if(0!==t.avail_in||0!==n.lookahead||e!==W&&n.status!==bt){let a=n.strategy===rt?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Rt(t),0===t.lookahead)){if(e===W)return 1;break}if(t.match_length=0,a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2})(n,e):n.strategy===lt?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=ft){if(Rt(t),t.lookahead<=ft&&e===W)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+ft;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=ft-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=G(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2})(n,e):Dt[n.level].func(n,e);if(3!==a&&4!==a||(n.status=bt),1===a||3===a)return 0===t.avail_out&&(n.last_flush=-1),$;if(2===a&&(e===q?X(n):e!==V&&(P(n,0,0,!1),e===J&&(mt(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),vt(t),0===t.avail_out))return n.last_flush=-1,$}return e!==Q?$:n.wrap<=0?tt:(2===n.wrap?(xt(n,255&t.adler),xt(n,t.adler>>8&255),xt(n,t.adler>>16&255),xt(n,t.adler>>24&255),xt(n,255&t.total_in),xt(n,t.total_in>>8&255),xt(n,t.total_in>>16&255),xt(n,t.total_in>>24&255)):(zt(n,t.adler>>>16),zt(n,65535&t.adler)),vt(t),n.wrap>0&&(n.wrap=-n.wrap),0!==n.pending?$:tt)},deflateEnd:t=>{if(!t||!t.state)return et;const e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==ut&&e!==wt&&e!==bt?gt(t,et):(t.state=null,e===wt?gt(t,at):$)},deflateSetDictionary:(t,e)=>{let a=e.length;if(!t||!t.state)return et;const i=t.state,n=i.wrap;if(2===n||1===n&&42!==i.status||i.lookahead)return et;if(1===n&&(t.adler=B(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(mt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size}const s=t.avail_in,r=t.next_in,l=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Rt(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=kt(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++}while(--e);i.strstart=t,i.lookahead=2,Rt(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=l,t.avail_in=s,i.wrap=n,$},deflateInfo:"pako deflate (from Nodeca project)"};const Nt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Bt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Nt(a,e)&&(t[e]=a[e])}}return t},Ct=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length}return a};let Mt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Mt=!1}const Ht=new Uint8Array(256);for(let t=0;t<256;t++)Ht[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Ht[254]=Ht[254]=1;var jt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,i,n,s,r=t.length,l=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),l+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(l),s=0,n=0;s<l;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},Kt=(t,e)=>{const a=e||t.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(t.subarray(0,e));let i,n;const s=new Array(2*a);for(n=0,i=0;i<a;){let e=t[i++];if(e<128){s[n++]=e;continue}let r=Ht[e];if(r>4)s[n++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<a;)e=e<<6|63&t[i++],r--;r>1?s[n++]=65533:e<65536?s[n++]=e:(e-=65536,s[n++]=55296|e>>10&1023,s[n++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Mt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,n)},Pt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Ht[t[a]]>e?a:e};var Yt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Gt=Object.prototype.toString,{Z_NO_FLUSH:Xt,Z_SYNC_FLUSH:Wt,Z_FULL_FLUSH:qt,Z_FINISH:Jt,Z_OK:Qt,Z_STREAM_END:Vt,Z_DEFAULT_COMPRESSION:$t,Z_DEFAULT_STRATEGY:te,Z_DEFLATED:ee}=j;function ae(t){this.options=Bt({level:$t,method:ee,chunkSize:16384,windowBits:15,memLevel:8,strategy:te},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Yt,this.strm.avail_out=0;let a=Lt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==Qt)throw new Error(H[a]);if(e.header&&Lt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?jt(e.dictionary):"[object ArrayBuffer]"===Gt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Lt.deflateSetDictionary(this.strm,t),a!==Qt)throw new Error(H[a]);this._dict_set=!0}}function ie(t,e){const a=new ae(e);if(a.push(t,!0),a.err)throw a.msg||H[a.err];return a.result}ae.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?Jt:Xt,"string"==typeof t?a.input=jt(t):"[object ArrayBuffer]"===Gt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===Wt||s===qt)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=Lt.deflate(a,s),n===Vt)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=Lt.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===Qt;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},ae.prototype.onData=function(t){this.chunks.push(t)},ae.prototype.onEnd=function(t){t===Qt&&(this.result=Ct(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var ne={Deflate:ae,deflate:ie,deflateRaw:function(t,e){return(e=e||{}).raw=!0,ie(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,ie(t,e)},constants:j};var se=function(t,e){let a,i,n,s,r,l,o,h,d,_,f,c,u,w,b,g,p,m,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),l=E.dmax,o=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,b=(1<<E.lenbits)-1,g=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),p=u[f&b];e:for(;;){if(m=p>>>24,f>>>=m,c-=m,m=p>>>16&255,0===m)A[n++]=65535&p;else{if(!(16&m)){if(0==(64&m)){p=u[(65535&p)+(f&(1<<m)-1)];continue e}if(32&m){E.mode=12;break t}t.msg="invalid literal/length code",E.mode=30;break t}k=65535&p,m&=15,m&&(c<m&&(f+=z[a++]<<c,c+=8),k+=f&(1<<m)-1,f>>>=m,c-=m),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),p=w[f&g];a:for(;;){if(m=p>>>24,f>>>=m,c-=m,m=p>>>16&255,!(16&m)){if(0==(64&m)){p=w[(65535&p)+(f&(1<<m)-1)];continue a}t.msg="invalid distance code",E.mode=30;break t}if(v=65535&p,m&=15,c<m&&(f+=z[a++]<<c,c+=8,c<m&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<m)-1,v>l){t.msg="invalid distance too far back",E.mode=30;break t}if(f>>>=m,c-=m,m=n-s,v>m){if(m=v-m,m>h&&E.sane){t.msg="invalid distance too far back",E.mode=30;break t}if(y=0,x=_,0===d){if(y+=o-m,m<k){k-=m;do{A[n++]=_[y++]}while(--m);y=n-v,x=A}}else if(d<m){if(y+=o+d-m,m-=d,m<k){k-=m;do{A[n++]=_[y++]}while(--m);if(y=0,d<k){m=d,k-=m;do{A[n++]=_[y++]}while(--m);y=n-v,x=A}}}else if(y+=d-m,m<k){k-=m;do{A[n++]=_[y++]}while(--m);y=n-v,x=A}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]))}else{y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]))}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c};const re=15,le=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),oe=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),he=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),de=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var _e=(t,e,a,i,n,s,r,l)=>{const o=l.bits;let h,d,_,f,c,u,w=0,b=0,g=0,p=0,m=0,k=0,v=0,y=0,x=0,z=0,A=null,E=0;const R=new Uint16Array(16),Z=new Uint16Array(16);let U,S,D,T=null,O=0;for(w=0;w<=re;w++)R[w]=0;for(b=0;b<i;b++)R[e[a+b]]++;for(m=o,p=re;p>=1&&0===R[p];p--);if(m>p&&(m=p),0===p)return n[s++]=20971520,n[s++]=20971520,l.bits=1,0;for(g=1;g<p&&0===R[g];g++);for(m<g&&(m=g),y=1,w=1;w<=re;w++)if(y<<=1,y-=R[w],y<0)return-1;if(y>0&&(0===t||1!==p))return-1;for(Z[1]=0,w=1;w<re;w++)Z[w+1]=Z[w]+R[w];for(b=0;b<i;b++)0!==e[a+b]&&(r[Z[e[a+b]]++]=b);if(0===t?(A=T=r,u=19):1===t?(A=le,E-=257,T=oe,O-=257,u=256):(A=he,T=de,u=-1),z=0,b=0,w=g,c=s,k=m,v=0,_=-1,x=1<<m,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){U=w-v,r[b]<u?(S=0,D=r[b]):r[b]>u?(S=T[O+r[b]],D=A[E+r[b]]):(S=96,D=0),h=1<<w-v,d=1<<k,g=d;do{d-=h,n[c+(z>>v)+d]=U<<24|S<<16|D|0}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,b++,0==--R[w]){if(w===p)break;w=e[a+r[b]]}if(w>m&&(z&f)!==_){for(0===v&&(v=m),c+=g,k=w-v,y=1<<k;k+v<p&&(y-=R[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=m<<24|k<<16|c-s|0}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),l.bits=m,0};const{Z_FINISH:fe,Z_BLOCK:ce,Z_TREES:ue,Z_OK:we,Z_STREAM_END:be,Z_NEED_DICT:ge,Z_STREAM_ERROR:pe,Z_DATA_ERROR:me,Z_MEM_ERROR:ke,Z_BUF_ERROR:ve,Z_DEFLATED:ye}=j,xe=12,ze=30,Ae=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Ee(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Re=t=>{if(!t||!t.state)return pe;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=1,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,we},Ze=t=>{if(!t||!t.state)return pe;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Re(t)},Ue=(t,e)=>{let a;if(!t||!t.state)return pe;const i=t.state;return e<0?(a=0,e=-e):(a=1+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?pe:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,Ze(t))},Se=(t,e)=>{if(!t)return pe;const a=new Ee;t.state=a,a.window=null;const i=Ue(t,e);return i!==we&&(t.state=null),i};let De,Te,Oe=!0;const Ie=t=>{if(Oe){De=new Int32Array(512),Te=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(_e(1,t.lens,0,288,De,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;_e(2,t.lens,0,32,Te,0,t.work,{bits:5}),Oe=!1}t.lencode=De,t.lenbits=9,t.distcode=Te,t.distbits=5},Fe=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var Le={inflateReset:Ze,inflateReset2:Ue,inflateResetKeep:Re,inflateInit:t=>Se(t,15),inflateInit2:Se,inflate:(t,e)=>{let a,i,n,s,r,l,o,h,d,_,f,c,u,w,b,g,p,m,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return pe;a=t.state,a.mode===xe&&(a.mode=13),r=t.next_out,n=t.output,o=t.avail_out,s=t.next_in,i=t.input,l=t.avail_in,h=a.hold,d=a.bits,_=l,f=o,x=we;t:for(;;)switch(a.mode){case 1:if(0===a.wrap){a.mode=13;break}for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(2&a.wrap&&35615===h){a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0),h=0,d=0,a.mode=2;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=ze;break}if((15&h)!==ye){t.msg="unknown compression method",a.mode=ze;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits)a.wbits=y;else if(y>a.wbits){t.msg="invalid window size",a.mode=ze;break}a.dmax=1<<a.wbits,t.adler=a.check=1,a.mode=512&h?10:xe,h=0,d=0;break;case 2:for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(a.flags=h,(255&a.flags)!==ye){t.msg="unknown compression method",a.mode=ze;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=ze;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0)),h=0,d=0,a.mode=3;case 3:for(;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=M(a.check,A,4,0)),h=0,d=0,a.mode=4;case 4:for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0)),h=0,d=0,a.mode=5;case 5:if(1024&a.flags){for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0)),h=0,d=0}else a.head&&(a.head.extra=null);a.mode=6;case 6:if(1024&a.flags&&(c=a.length,c>l&&(c=l),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&(a.check=M(a.check,i,c,s)),l-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=7;case 7:if(2048&a.flags){if(0===l)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y))}while(y&&c<l);if(512&a.flags&&(a.check=M(a.check,i,c,s)),l-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=8;case 8:if(4096&a.flags){if(0===l)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y))}while(y&&c<l);if(512&a.flags&&(a.check=M(a.check,i,c,s)),l-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=9;case 9:if(512&a.flags){for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=ze;break}h=0,d=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=xe;break;case 10:for(;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}t.adler=a.check=Ae(h),h=0,d=0,a.mode=11;case 11:if(0===a.havedict)return t.next_out=r,t.avail_out=o,t.next_in=s,t.avail_in=l,a.hold=h,a.bits=d,ge;t.adler=a.check=1,a.mode=xe;case xe:if(e===ce||e===ue)break t;case 13:if(a.last){h>>>=7&d,d-=7&d,a.mode=27;break}for(;d<3;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=14;break;case 1:if(Ie(a),a.mode=20,e===ue){h>>>=2,d-=2;break t}break;case 2:a.mode=17;break;case 3:t.msg="invalid block type",a.mode=ze}h>>>=2,d-=2;break;case 14:for(h>>>=7&d,d-=7&d;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=ze;break}if(a.length=65535&h,h=0,d=0,a.mode=15,e===ue)break t;case 15:a.mode=16;case 16:if(c=a.length,c){if(c>l&&(c=l),c>o&&(c=o),0===c)break t;n.set(i.subarray(s,s+c),r),l-=c,s+=c,o-=c,r+=c,a.length-=c;break}a.mode=xe;break;case 17:for(;d<14;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=ze;break}a.have=0,a.mode=18;case 18:for(;a.have<a.ncode;){for(;d<3;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=_e(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=ze;break}a.have=0,a.mode=19;case 19:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],b=z>>>24,g=z>>>16&255,p=65535&z,!(b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(p<16)h>>>=b,d-=b,a.lens[a.have++]=p;else{if(16===p){for(R=b+2;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(h>>>=b,d-=b,0===a.have){t.msg="invalid bit length repeat",a.mode=ze;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2}else if(17===p){for(R=b+3;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}h>>>=b,d-=b,y=0,c=3+(7&h),h>>>=3,d-=3}else{for(R=b+7;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}h>>>=b,d-=b,y=0,c=11+(127&h),h>>>=7,d-=7}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=ze;break}for(;c--;)a.lens[a.have++]=y}}if(a.mode===ze)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=ze;break}if(a.lenbits=9,E={bits:a.lenbits},x=_e(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=ze;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=_e(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=ze;break}if(a.mode=20,e===ue)break t;case 20:a.mode=21;case 21:if(l>=6&&o>=258){t.next_out=r,t.avail_out=o,t.next_in=s,t.avail_in=l,a.hold=h,a.bits=d,se(t,f),r=t.next_out,n=t.output,o=t.avail_out,s=t.next_in,i=t.input,l=t.avail_in,h=a.hold,d=a.bits,a.mode===xe&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],b=z>>>24,g=z>>>16&255,p=65535&z,!(b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(g&&0==(240&g)){for(m=b,k=g,v=p;z=a.lencode[v+((h&(1<<m+k)-1)>>m)],b=z>>>24,g=z>>>16&255,p=65535&z,!(m+b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,a.back+=m}if(h>>>=b,d-=b,a.back+=b,a.length=p,0===g){a.mode=26;break}if(32&g){a.back=-1,a.mode=xe;break}if(64&g){t.msg="invalid literal/length code",a.mode=ze;break}a.extra=15&g,a.mode=22;case 22:if(a.extra){for(R=a.extra;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=23;case 23:for(;z=a.distcode[h&(1<<a.distbits)-1],b=z>>>24,g=z>>>16&255,p=65535&z,!(b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(0==(240&g)){for(m=b,k=g,v=p;z=a.distcode[v+((h&(1<<m+k)-1)>>m)],b=z>>>24,g=z>>>16&255,p=65535&z,!(m+b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,a.back+=m}if(h>>>=b,d-=b,a.back+=b,64&g){t.msg="invalid distance code",a.mode=ze;break}a.offset=p,a.extra=15&g,a.mode=24;case 24:if(a.extra){for(R=a.extra;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=ze;break}a.mode=25;case 25:if(0===o)break t;if(c=f-o,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=ze;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window}else w=n,u=r-a.offset,c=a.length;c>o&&(c=o),o-=c,a.length-=c;do{n[r++]=w[u++]}while(--c);0===a.length&&(a.mode=21);break;case 26:if(0===o)break t;n[r++]=a.length,o--,a.mode=21;break;case 27:if(a.wrap){for(;d<32;){if(0===l)break t;l--,h|=i[s++]<<d,d+=8}if(f-=o,t.total_out+=f,a.total+=f,f&&(t.adler=a.check=a.flags?M(a.check,n,f,r-f):B(a.check,n,f,r-f)),f=o,(a.flags?h:Ae(h))!==a.check){t.msg="incorrect data check",a.mode=ze;break}h=0,d=0}a.mode=28;case 28:if(a.wrap&&a.flags){for(;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=ze;break}h=0,d=0}a.mode=29;case 29:x=be;break t;case ze:x=me;break t;case 31:return ke;case 32:default:return pe}return t.next_out=r,t.avail_out=o,t.next_in=s,t.avail_in=l,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<ze&&(a.mode<27||e!==fe))&&Fe(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,a.wrap&&f&&(t.adler=a.check=a.flags?M(a.check,n,f,t.next_out-f):B(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(a.mode===xe?128:0)+(20===a.mode||15===a.mode?256:0),(0===_&&0===f||e===fe)&&x===we&&(x=ve),x},inflateEnd:t=>{if(!t||!t.state)return pe;let e=t.state;return e.window&&(e.window=null),t.state=null,we},inflateGetHeader:(t,e)=>{if(!t||!t.state)return pe;const a=t.state;return 0==(2&a.wrap)?pe:(a.head=e,e.done=!1,we)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return t&&t.state?(i=t.state,0!==i.wrap&&11!==i.mode?pe:11===i.mode&&(n=1,n=B(n,e,a,0),n!==i.check)?me:(s=Fe(t,e,a,a),s?(i.mode=31,ke):(i.havedict=1,we))):pe},inflateInfo:"pako inflate (from Nodeca project)"};var Ne=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const Be=Object.prototype.toString,{Z_NO_FLUSH:Ce,Z_FINISH:Me,Z_OK:He,Z_STREAM_END:je,Z_NEED_DICT:Ke,Z_STREAM_ERROR:Pe,Z_DATA_ERROR:Ye,Z_MEM_ERROR:Ge}=j;function Xe(t){this.options=Bt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Yt,this.strm.avail_out=0;let a=Le.inflateInit2(this.strm,e.windowBits);if(a!==He)throw new Error(H[a]);if(this.header=new Ne,Le.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=jt(e.dictionary):"[object ArrayBuffer]"===Be.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=Le.inflateSetDictionary(this.strm,e.dictionary),a!==He)))throw new Error(H[a])}function We(t,e){const a=new Xe(e);if(a.push(t),a.err)throw a.msg||H[a.err];return a.result}Xe.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,l;if(this.ended)return!1;for(r=e===~~e?e:!0===e?Me:Ce,"[object ArrayBuffer]"===Be.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=Le.inflate(a,r),s===Ke&&n&&(s=Le.inflateSetDictionary(a,n),s===He?s=Le.inflate(a,r):s===Ye&&(s=Ke));a.avail_in>0&&s===je&&a.state.wrap>0&&0!==t[a.next_in];)Le.inflateReset(a),s=Le.inflate(a,r);switch(s){case Pe:case Ye:case Ke:case Ge:return this.onEnd(s),this.ended=!0,!1}if(l=a.avail_out,a.next_out&&(0===a.avail_out||s===je))if("string"===this.options.to){let t=Pt(a.output,a.next_out),e=a.next_out-t,n=Kt(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n)}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==He||0!==l){if(s===je)return s=Le.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return!0},Xe.prototype.onData=function(t){this.chunks.push(t)},Xe.prototype.onEnd=function(t){t===He&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Ct(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var qe={Inflate:Xe,inflate:We,inflateRaw:function(t,e){return(e=e||{}).raw=!0,We(t,e)},ungzip:We,constants:j};const{Deflate:Je,deflate:Qe,deflateRaw:Ve,gzip:$e}=ne,{Inflate:ta,inflate:ea,inflateRaw:aa,ungzip:ia}=qe;var na=Je,sa=Qe,ra=Ve,la=$e,oa=ta,ha=ea,da=aa,_a=ia,fa=j,ca={Deflate:na,deflate:sa,deflateRaw:ra,gzip:la,Inflate:oa,inflate:ha,inflateRaw:da,ungzip:_a,constants:fa};t.Deflate=na,t.Inflate=oa,t.constants=fa,t.default=ca,t.deflate=sa,t.deflateRaw=ra,t.gzip=la,t.inflate=ha,t.inflateRaw=da,t.ungzip=_a,Object.defineProperty(t,"__esModule",{value:!0})}));


var DwgApi = typeof DwgApi !== "undefined" ? DwgApi : {};
var moduleOverrides = {};
var key;
for (key in DwgApi) {
  if (DwgApi.hasOwnProperty(key)) {
    moduleOverrides[key] = DwgApi[key];
  }
}
var arguments_ = [];
var thisProgram = "./this.program";
var quit_ = function (status, toThrow) {
  throw toThrow;
};
var ENVIRONMENT_IS_WEB = typeof window === "object";
var ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
var ENVIRONMENT_IS_NODE =
  typeof process === "object" &&
  typeof process.versions === "object" &&
  typeof process.versions.node === "string";
var scriptDirectory = "";
function locateFile(path) {
  if (DwgApi["locateFile"]) {
    return DwgApi["locateFile"](path, scriptDirectory);
  }
  return scriptDirectory + path;
}
var read_, readAsync, readBinary, setWindowTitle;
function logExceptionOnExit(e) {
  if (e instanceof ExitStatus) return;
  var toLog = e;
  err("exiting due to exception: " + toLog);
}
var nodeFS;
var nodePath;
if (ENVIRONMENT_IS_NODE) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require("path").dirname(scriptDirectory) + "/";
  } else {
    scriptDirectory = __dirname + "/";
  }
  read_ = function shell_read(filename, binary) {
    if (!nodeFS) nodeFS = require("fs");
    if (!nodePath) nodePath = require("path");
    filename = nodePath["normalize"](filename);
    return nodeFS["readFileSync"](filename, binary ? null : "utf8");
  };
  readBinary = function readBinary(filename) {
    var ret = read_(filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };
  readAsync = function readAsync(filename, onload, onerror) {
    if (!nodeFS) nodeFS = require("fs");
    if (!nodePath) nodePath = require("path");
    filename = nodePath["normalize"](filename);
    nodeFS["readFile"](filename, function (err, data) {
      if (err) onerror(err);
      else onload(data.buffer);
    });
  };
  if (process["argv"].length > 1) {
    thisProgram = process["argv"][1].replace(/\\/g, "/");
  }
  arguments_ = process["argv"].slice(2);
  if (typeof module !== "undefined") {
    module["exports"] = DwgApi;
  }
  process["on"]("uncaughtException", function (ex) {
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });
  process["on"]("unhandledRejection", function (reason) {
    throw reason;
  });
  quit_ = function (status, toThrow) {
    if (keepRuntimeAlive()) {
      process["exitCode"] = status;
      throw toThrow;
    }
    logExceptionOnExit(toThrow);
    process["exit"](status);
  };
  DwgApi["inspect"] = function () {
    return "[Emscripten DwgApi object]";
  };
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = self.location.href;
  } else if (typeof document !== "undefined" && document.currentScript) {
    scriptDirectory = document.currentScript.src;
  }
  if (scriptDirectory.indexOf("blob:") !== 0) {
    scriptDirectory = scriptDirectory.substr(
      0,
      scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1
    );
  } else {
    scriptDirectory = "";
  }
  {
    read_ = function (url) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.send(null);
      return xhr.responseText;
    };
    if (ENVIRONMENT_IS_WORKER) {
      readBinary = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
        return new Uint8Array(xhr.response);
      };
    }
    readAsync = function (url, onload, onerror) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function () {
        if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
          onload(xhr.response);
          return;
        }
        onerror();
      };
      xhr.onerror = onerror;
      xhr.send(null);
    };
  }
  setWindowTitle = function (title) {
    document.title = title;
  };
} else {
}
var out = DwgApi["print"] || console.log.bind(console);
var err = DwgApi["printErr"] || console.warn.bind(console);
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    DwgApi[key] = moduleOverrides[key];
  }
}
moduleOverrides = null;
if (DwgApi["arguments"]) arguments_ = DwgApi["arguments"];
if (DwgApi["thisProgram"]) thisProgram = DwgApi["thisProgram"];
if (DwgApi["quit"]) quit_ = DwgApi["quit"];
var tempRet0 = 0;
var setTempRet0 = function (value) {
  tempRet0 = value;
};
var wasmBinary;
if (DwgApi["wasmBinary"]) wasmBinary = DwgApi["wasmBinary"];
var noExitRuntime = DwgApi["noExitRuntime"] || true;
if (typeof WebAssembly !== "object") {
  abort("no native wasm support detected");
}
var wasmMemory;
var ABORT = false;
var EXITSTATUS;
function assert(condition, text) {
  if (!condition) {
    abort("Assertion failed: " + text);
  }
}
var UTF8Decoder =
  typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
function UTF8ArrayToString(heap, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(heap.subarray(idx, endPtr));
  } else {
    var str = "";
    while (idx < endPtr) {
      var u0 = heap[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      var u1 = heap[idx++] & 63;
      if ((u0 & 224) == 192) {
        str += String.fromCharCode(((u0 & 31) << 6) | u1);
        continue;
      }
      var u2 = heap[idx++] & 63;
      if ((u0 & 240) == 224) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 65536;
        str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
      }
    }
  }
  return str;
}
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}
function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) return 0;
  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1;
  for (var i = 0; i < str.length; ++i) {
    var u = str.charCodeAt(i);
    if (u >= 55296 && u <= 57343) {
      var u1 = str.charCodeAt(++i);
      u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
    }
    if (u <= 127) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 192 | (u >> 6);
      heap[outIdx++] = 128 | (u & 63);
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 224 | (u >> 12);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      heap[outIdx++] = 240 | (u >> 18);
      heap[outIdx++] = 128 | ((u >> 12) & 63);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
    }
  }
  heap[outIdx] = 0;
  return outIdx - startIdx;
}
function stringToUTF8(str, outPtr, maxBytesToWrite) {
  return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    var u = str.charCodeAt(i);
    if (u >= 55296 && u <= 57343)
      u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023);
    if (u <= 127) ++len;
    else if (u <= 2047) len += 2;
    else if (u <= 65535) len += 3;
    else len += 4;
  }
  return len;
}
var UTF16Decoder =
  typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
function UTF16ToString(ptr, maxBytesToRead) {
  var endPtr = ptr;
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
  endPtr = idx << 1;
  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var str = "";
    for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
      var codeUnit = HEAP16[(ptr + i * 2) >> 1];
      if (codeUnit == 0) break;
      str += String.fromCharCode(codeUnit);
    }
    return str;
  }
}
function stringToUTF16(str, outPtr, maxBytesToWrite) {
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 2147483647;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2;
  var startPtr = outPtr;
  var numCharsToWrite =
    maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    var codeUnit = str.charCodeAt(i);
    HEAP16[outPtr >> 1] = codeUnit;
    outPtr += 2;
  }
  HEAP16[outPtr >> 1] = 0;
  return outPtr - startPtr;
}
function lengthBytesUTF16(str) {
  return str.length * 2;
}
function UTF32ToString(ptr, maxBytesToRead) {
  var i = 0;
  var str = "";
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = HEAP32[(ptr + i * 4) >> 2];
    if (utf32 == 0) break;
    ++i;
    if (utf32 >= 65536) {
      var ch = utf32 - 65536;
      str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
}
function stringToUTF32(str, outPtr, maxBytesToWrite) {
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 2147483647;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 55296 && codeUnit <= 57343) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = (65536 + ((codeUnit & 1023) << 10)) | (trailSurrogate & 1023);
    }
    HEAP32[outPtr >> 2] = codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  HEAP32[outPtr >> 2] = 0;
  return outPtr - startPtr;
}
function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
    len += 4;
  }
  return len;
}
function writeArrayToMemory(array, buffer) {
  HEAP8.set(array, buffer);
}
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    HEAP8[buffer++ >> 0] = str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[buffer >> 0] = 0;
}
function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  DwgApi["HEAP8"] = HEAP8 = new Int8Array(buf);
  DwgApi["HEAP16"] = HEAP16 = new Int16Array(buf);
  DwgApi["HEAP32"] = HEAP32 = new Int32Array(buf);
  DwgApi["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
  DwgApi["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
  DwgApi["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
  DwgApi["HEAPF32"] = HEAPF32 = new Float32Array(buf);
  DwgApi["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}
var INITIAL_MEMORY = DwgApi["INITIAL_MEMORY"] || 16777216;
var wasmTable;
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
var runtimeKeepaliveCounter = 0;
function keepRuntimeAlive() {
  return noExitRuntime || runtimeKeepaliveCounter > 0;
}
function preRun() {
  if (DwgApi["preRun"]) {
    if (typeof DwgApi["preRun"] == "function")
      DwgApi["preRun"] = [DwgApi["preRun"]];
    while (DwgApi["preRun"].length) {
      addOnPreRun(DwgApi["preRun"].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}
function initRuntime() {
  runtimeInitialized = true;
  if (!DwgApi["noFSInit"] && !FS.init.initialized) FS.init();
  FS.ignorePermissions = false;
  TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}
function postRun() {
  if (DwgApi["postRun"]) {
    if (typeof DwgApi["postRun"] == "function")
      DwgApi["postRun"] = [DwgApi["postRun"]];
    while (DwgApi["postRun"].length) {
      addOnPostRun(DwgApi["postRun"].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;
function getUniqueRunDependency(id) {
  return id;
}
function addRunDependency(id) {
  runDependencies++;
  if (DwgApi["monitorRunDependencies"]) {
    DwgApi["monitorRunDependencies"](runDependencies);
  }
}
function removeRunDependency(id) {
  runDependencies--;
  if (DwgApi["monitorRunDependencies"]) {
    DwgApi["monitorRunDependencies"](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback();
    }
  }
}
DwgApi["preloadedImages"] = {};
DwgApi["preloadedAudios"] = {};
function abort(what) {
  {
    if (DwgApi["onAbort"]) {
      DwgApi["onAbort"](what);
    }
  }
  what = "Aborted(" + what + ")";
  err(what);
  ABORT = true;
  EXITSTATUS = 1;
  what += ". Build with -s ASSERTIONS=1 for more info.";
  var e = new WebAssembly.RuntimeError(what);
  throw e;
}
var dataURIPrefix = "data:application/octet-stream;base64,";
function isDataURI(filename) {
  return filename.startsWith(dataURIPrefix);
}
function isFileURI(filename) {
  return filename.startsWith("file://");
}
var wasmBinaryFile;
wasmBinaryFile = "DwgApi.wasm";
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}
function getBinary(file) {
  try {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    if (readBinary) {
      return readBinary(file);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  } catch (err) {
    abort(err);
  }
}
function getBinaryPromise() {
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
      return fetch(wasmBinaryFile, { credentials: "same-origin" })
        .then(function (response) {
          if (!response["ok"]) {
            throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
          }
          return response["arrayBuffer"]();
        })
        .catch(function () {
          return getBinary(wasmBinaryFile);
        });
    } else {
      if (readAsync) {
        return new Promise(function (resolve, reject) {
          readAsync(
            wasmBinaryFile,
            function (response) {
              resolve(new Uint8Array(response));
            },
            reject
          );
        });
      }
    }
  }
  return Promise.resolve().then(function () {
    return getBinary(wasmBinaryFile);
  });
}
function createWasm() {
  var info = { a: asmLibraryArg };
  function receiveInstance(instance, module) {
    var exports = instance.exports;
    DwgApi["asm"] = exports;
    wasmMemory = DwgApi["asm"]["F"];
    updateGlobalBufferAndViews(wasmMemory.buffer);
    wasmTable = DwgApi["asm"]["I"];
    addOnInit(DwgApi["asm"]["G"]);
    removeRunDependency("wasm-instantiate");
  }
  addRunDependency("wasm-instantiate");
  function receiveInstantiationResult(result) {
    receiveInstance(result["instance"]);
  }
  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise()
      .then(function (binary) {
        var wasmbin= pako.inflate(binary);
        return WebAssembly.instantiate(wasmbin, info);
      })
      .then(function (instance) {
        return instance;
      })
      .then(receiver, function (reason) {
        err("failed to asynchronously prepare wasm: " + reason);
        abort(reason);
      });
  }
  function instantiateAsync() {
    if (
      !wasmBinary &&
      typeof WebAssembly.instantiateStreaming === "function" &&
      !isDataURI(wasmBinaryFile) &&
      !isFileURI(wasmBinaryFile) &&
      typeof fetch === "function"
    ) {
      return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(
        function (response) {
            return instantiateArrayBuffer(receiveInstantiationResult);
        }
      );
    } else {
      return instantiateArrayBuffer(receiveInstantiationResult);
    }
  }
  if (DwgApi["instantiateWasm"]) {
    try {
      var exports = DwgApi["instantiateWasm"](info, receiveInstance);
      return exports;
    } catch (e) {
      err("DwgApi.instantiateWasm callback failed with error: " + e);
      return false;
    }
  }
  instantiateAsync();
  return {};
}
var tempDouble;
var tempI64;
function callRuntimeCallbacks(callbacks) {
  while (callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == "function") {
      callback(DwgApi);
      continue;
    }
    var func = callback.func;
    if (typeof func === "number") {
      if (callback.arg === undefined) {
        getWasmTableEntry(func)();
      } else {
        getWasmTableEntry(func)(callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}
var wasmTableMirror = [];
function getWasmTableEntry(funcPtr) {
  var func = wasmTableMirror[funcPtr];
  if (!func) {
    if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
    wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
  }
  return func;
}
function ___assert_fail(condition, filename, line, func) {
  abort(
    "Assertion failed: " +
      UTF8ToString(condition) +
      ", at: " +
      [
        filename ? UTF8ToString(filename) : "unknown filename",
        line,
        func ? UTF8ToString(func) : "unknown function",
      ]
  );
}
function setErrNo(value) {
  HEAP32[___errno_location() >> 2] = value;
  return value;
}
var PATH = {
  splitPath: function (filename) {
    var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  },
  normalizeArray: function (parts, allowAboveRoot) {
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
    if (allowAboveRoot) {
      for (; up; up--) {
        parts.unshift("..");
      }
    }
    return parts;
  },
  normalize: function (path) {
    var isAbsolute = path.charAt(0) === "/",
      trailingSlash = path.substr(-1) === "/";
    path = PATH.normalizeArray(
      path.split("/").filter(function (p) {
        return !!p;
      }),
      !isAbsolute
    ).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  },
  dirname: function (path) {
    var result = PATH.splitPath(path),
      root = result[0],
      dir = result[1];
    if (!root && !dir) {
      return ".";
    }
    if (dir) {
      dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
  },
  basename: function (path) {
    if (path === "/") return "/";
    path = PATH.normalize(path);
    path = path.replace(/\/$/, "");
    var lastSlash = path.lastIndexOf("/");
    if (lastSlash === -1) return path;
    return path.substr(lastSlash + 1);
  },
  extname: function (path) {
    return PATH.splitPath(path)[3];
  },
  join: function () {
    var paths = Array.prototype.slice.call(arguments, 0);
    return PATH.normalize(paths.join("/"));
  },
  join2: function (l, r) {
    return PATH.normalize(l + "/" + r);
  },
};
function getRandomDevice() {
  if (
    typeof crypto === "object" &&
    typeof crypto["getRandomValues"] === "function"
  ) {
    var randomBuffer = new Uint8Array(1);
    return function () {
      crypto.getRandomValues(randomBuffer);
      return randomBuffer[0];
    };
  } else if (ENVIRONMENT_IS_NODE) {
    try {
      var crypto_module = require("crypto");
      return function () {
        return crypto_module["randomBytes"](1)[0];
      };
    } catch (e) {}
  }
  return function () {
    abort("randomDevice");
  };
}
var PATH_FS = {
  resolve: function () {
    var resolvedPath = "",
      resolvedAbsolute = false;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : FS.cwd();
      if (typeof path !== "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = path.charAt(0) === "/";
    }
    resolvedPath = PATH.normalizeArray(
      resolvedPath.split("/").filter(function (p) {
        return !!p;
      }),
      !resolvedAbsolute
    ).join("/");
    return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
  },
  relative: function (from, to) {
    from = PATH_FS.resolve(from).substr(1);
    to = PATH_FS.resolve(to).substr(1);
    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== "") break;
      }
      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== "") break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  },
};
var TTY = {
  ttys: [],
  init: function () {},
  shutdown: function () {},
  register: function (dev, ops) {
    TTY.ttys[dev] = { input: [], output: [], ops: ops };
    FS.registerDevice(dev, TTY.stream_ops);
  },
  stream_ops: {
    open: function (stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    },
    close: function (stream) {
      stream.tty.ops.flush(stream.tty);
    },
    flush: function (stream) {
      stream.tty.ops.flush(stream.tty);
    },
    read: function (stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === undefined && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === undefined) break;
        bytesRead++;
        buffer[offset + i] = result;
      }
      if (bytesRead) {
        stream.node.timestamp = Date.now();
      }
      return bytesRead;
    },
    write: function (stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.timestamp = Date.now();
      }
      return i;
    },
  },
  default_tty_ops: {
    get_char: function (tty) {
      if (!tty.input.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
          try {
            bytesRead = nodeFS.readSync(
              process.stdin.fd,
              buf,
              0,
              BUFSIZE,
              null
            );
          } catch (e) {
            if (e.toString().includes("EOF")) bytesRead = 0;
            else throw e;
          }
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString("utf-8");
          } else {
            result = null;
          }
        } else if (
          typeof window != "undefined" &&
          typeof window.prompt == "function"
        ) {
          result = window.prompt("Input: ");
          if (result !== null) {
            result += "\n";
          }
        } else if (typeof readline == "function") {
          result = readline();
          if (result !== null) {
            result += "\n";
          }
        }
        if (!result) {
          return null;
        }
        tty.input = intArrayFromString(result, true);
      }
      return tty.input.shift();
    },
    put_char: function (tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    flush: function (tty) {
      if (tty.output && tty.output.length > 0) {
        out(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    },
  },
  default_tty1_ops: {
    put_char: function (tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    flush: function (tty) {
      if (tty.output && tty.output.length > 0) {
        err(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    },
  },
};
function mmapAlloc(size) {
  abort();
}
var MEMFS = {
  ops_table: null,
  mount: function (mount) {
    return MEMFS.createNode(null, "/", 16384 | 511, 0);
  },
  createNode: function (parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      throw new FS.ErrnoError(63);
    }
    if (!MEMFS.ops_table) {
      MEMFS.ops_table = {
        dir: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            lookup: MEMFS.node_ops.lookup,
            mknod: MEMFS.node_ops.mknod,
            rename: MEMFS.node_ops.rename,
            unlink: MEMFS.node_ops.unlink,
            rmdir: MEMFS.node_ops.rmdir,
            readdir: MEMFS.node_ops.readdir,
            symlink: MEMFS.node_ops.symlink,
          },
          stream: { llseek: MEMFS.stream_ops.llseek },
        },
        file: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
          },
          stream: {
            llseek: MEMFS.stream_ops.llseek,
            read: MEMFS.stream_ops.read,
            write: MEMFS.stream_ops.write,
            allocate: MEMFS.stream_ops.allocate,
            mmap: MEMFS.stream_ops.mmap,
            msync: MEMFS.stream_ops.msync,
          },
        },
        link: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            readlink: MEMFS.node_ops.readlink,
          },
          stream: {},
        },
        chrdev: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
          },
          stream: FS.chrdev_stream_ops,
        },
      };
    }
    var node = FS.createNode(parent, name, mode, dev);
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      node.usedBytes = 0;
      node.contents = null;
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }
    node.timestamp = Date.now();
    if (parent) {
      parent.contents[name] = node;
      parent.timestamp = node.timestamp;
    }
    return node;
  },
  getFileDataAsTypedArray: function (node) {
    if (!node.contents) return new Uint8Array(0);
    if (node.contents.subarray)
      return node.contents.subarray(0, node.usedBytes);
    return new Uint8Array(node.contents);
  },
  expandFileStorage: function (node, newCapacity) {
    var prevCapacity = node.contents ? node.contents.length : 0;
    if (prevCapacity >= newCapacity) return;
    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(
      newCapacity,
      (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0
    );
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
    var oldContents = node.contents;
    node.contents = new Uint8Array(newCapacity);
    if (node.usedBytes > 0)
      node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  },
  resizeFileStorage: function (node, newSize) {
    if (node.usedBytes == newSize) return;
    if (newSize == 0) {
      node.contents = null;
      node.usedBytes = 0;
    } else {
      var oldContents = node.contents;
      node.contents = new Uint8Array(newSize);
      if (oldContents) {
        node.contents.set(
          oldContents.subarray(0, Math.min(newSize, node.usedBytes))
        );
      }
      node.usedBytes = newSize;
    }
  },
  node_ops: {
    getattr: function (node) {
      var attr = {};
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.timestamp);
      attr.mtime = new Date(node.timestamp);
      attr.ctime = new Date(node.timestamp);
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    },
    setattr: function (node, attr) {
      if (attr.mode !== undefined) {
        node.mode = attr.mode;
      }
      if (attr.timestamp !== undefined) {
        node.timestamp = attr.timestamp;
      }
      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    },
    lookup: function (parent, name) {
      throw FS.genericErrors[44];
    },
    mknod: function (parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    },
    rename: function (old_node, new_dir, new_name) {
      if (FS.isDir(old_node.mode)) {
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {}
        if (new_node) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
      }
      delete old_node.parent.contents[old_node.name];
      old_node.parent.timestamp = Date.now();
      old_node.name = new_name;
      new_dir.contents[new_name] = old_node;
      new_dir.timestamp = old_node.parent.timestamp;
      old_node.parent = new_dir;
    },
    unlink: function (parent, name) {
      delete parent.contents[name];
      parent.timestamp = Date.now();
    },
    rmdir: function (parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.timestamp = Date.now();
    },
    readdir: function (node) {
      var entries = [".", ".."];
      for (var key in node.contents) {
        if (!node.contents.hasOwnProperty(key)) {
          continue;
        }
        entries.push(key);
      }
      return entries;
    },
    symlink: function (parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    },
    readlink: function (node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    },
  },
  stream_ops: {
    read: function (stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      if (size > 8 && contents.subarray) {
        buffer.set(contents.subarray(position, position + size), offset);
      } else {
        for (var i = 0; i < size; i++)
          buffer[offset + i] = contents[position + i];
      }
      return size;
    },
    write: function (stream, buffer, offset, length, position, canOwn) {
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length) return 0;
      var node = stream.node;
      node.timestamp = Date.now();
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        if (canOwn) {
          node.contents = buffer.subarray(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (node.usedBytes === 0 && position === 0) {
          node.contents = buffer.slice(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (position + length <= node.usedBytes) {
          node.contents.set(buffer.subarray(offset, offset + length), position);
          return length;
        }
      }
      MEMFS.expandFileStorage(node, position + length);
      if (node.contents.subarray && buffer.subarray) {
        node.contents.set(buffer.subarray(offset, offset + length), position);
      } else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i];
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length);
      return length;
    },
    llseek: function (stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    },
    allocate: function (stream, offset, length) {
      MEMFS.expandFileStorage(stream.node, offset + length);
      stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
    },
    mmap: function (stream, address, length, position, prot, flags) {
      if (address !== 0) {
        throw new FS.ErrnoError(28);
      }
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      if (!(flags & 2) && contents.buffer === buffer) {
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        if (position > 0 || position + length < contents.length) {
          if (contents.subarray) {
            contents = contents.subarray(position, position + length);
          } else {
            contents = Array.prototype.slice.call(
              contents,
              position,
              position + length
            );
          }
        }
        allocated = true;
        ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        HEAP8.set(contents, ptr);
      }
      return { ptr: ptr, allocated: allocated };
    },
    msync: function (stream, buffer, offset, length, mmapFlags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (mmapFlags & 2) {
        return 0;
      }
      var bytesWritten = MEMFS.stream_ops.write(
        stream,
        buffer,
        0,
        length,
        offset,
        false
      );
      return 0;
    },
  },
};
function asyncLoad(url, onload, onerror, noRunDep) {
  var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
  readAsync(
    url,
    function (arrayBuffer) {
      assert(
        arrayBuffer,
        'Loading data file "' + url + '" failed (no arrayBuffer).'
      );
      onload(new Uint8Array(arrayBuffer));
      if (dep) removeRunDependency(dep);
    },
    function (event) {
      if (onerror) {
        onerror();
      } else {
        throw 'Loading data file "' + url + '" failed.';
      }
    }
  );
  if (dep) addRunDependency(dep);
}
var FS = {
  root: null,
  mounts: [],
  devices: {},
  streams: [],
  nextInode: 1,
  nameTable: null,
  currentPath: "/",
  initialized: false,
  ignorePermissions: true,
  ErrnoError: null,
  genericErrors: {},
  filesystems: null,
  syncFSRequests: 0,
  lookupPath: function (path, opts) {
    path = PATH_FS.resolve(FS.cwd(), path);
    opts = opts || {};
    if (!path) return { path: "", node: null };
    var defaults = { follow_mount: true, recurse_count: 0 };
    for (var key in defaults) {
      if (opts[key] === undefined) {
        opts[key] = defaults[key];
      }
    }
    if (opts.recurse_count > 8) {
      throw new FS.ErrnoError(32);
    }
    var parts = PATH.normalizeArray(
      path.split("/").filter(function (p) {
        return !!p;
      }),
      false
    );
    var current = FS.root;
    var current_path = "/";
    for (var i = 0; i < parts.length; i++) {
      var islast = i === parts.length - 1;
      if (islast && opts.parent) {
        break;
      }
      current = FS.lookupNode(current, parts[i]);
      current_path = PATH.join2(current_path, parts[i]);
      if (FS.isMountpoint(current)) {
        if (!islast || (islast && opts.follow_mount)) {
          current = current.mounted.root;
        }
      }
      if (!islast || opts.follow) {
        var count = 0;
        while (FS.isLink(current.mode)) {
          var link = FS.readlink(current_path);
          current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
          var lookup = FS.lookupPath(current_path, {
            recurse_count: opts.recurse_count,
          });
          current = lookup.node;
          if (count++ > 40) {
            throw new FS.ErrnoError(32);
          }
        }
      }
    }
    return { path: current_path, node: current };
  },
  getPath: function (node) {
    var path;
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/"
          ? mount + "/" + path
          : mount + path;
      }
      path = path ? node.name + "/" + path : node.name;
      node = node.parent;
    }
  },
  hashName: function (parentid, name) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
    }
    return ((parentid + hash) >>> 0) % FS.nameTable.length;
  },
  hashAddNode: function (node) {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  },
  hashRemoveNode: function (node) {
    var hash = FS.hashName(node.parent.id, node.name);
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }
        current = current.name_next;
      }
    }
  },
  lookupNode: function (parent, name) {
    var errCode = FS.mayLookup(parent);
    if (errCode) {
      throw new FS.ErrnoError(errCode, parent);
    }
    var hash = FS.hashName(parent.id, name);
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;
      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }
    return FS.lookup(parent, name);
  },
  createNode: function (parent, name, mode, rdev) {
    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  },
  destroyNode: function (node) {
    FS.hashRemoveNode(node);
  },
  isRoot: function (node) {
    return node === node.parent;
  },
  isMountpoint: function (node) {
    return !!node.mounted;
  },
  isFile: function (mode) {
    return (mode & 61440) === 32768;
  },
  isDir: function (mode) {
    return (mode & 61440) === 16384;
  },
  isLink: function (mode) {
    return (mode & 61440) === 40960;
  },
  isChrdev: function (mode) {
    return (mode & 61440) === 8192;
  },
  isBlkdev: function (mode) {
    return (mode & 61440) === 24576;
  },
  isFIFO: function (mode) {
    return (mode & 61440) === 4096;
  },
  isSocket: function (mode) {
    return (mode & 49152) === 49152;
  },
  flagModes: { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 },
  modeStringToFlags: function (str) {
    var flags = FS.flagModes[str];
    if (typeof flags === "undefined") {
      throw new Error("Unknown file open mode: " + str);
    }
    return flags;
  },
  flagsToPermissionString: function (flag) {
    var perms = ["r", "w", "rw"][flag & 3];
    if (flag & 512) {
      perms += "w";
    }
    return perms;
  },
  nodePermissions: function (node, perms) {
    if (FS.ignorePermissions) {
      return 0;
    }
    if (perms.includes("r") && !(node.mode & 292)) {
      return 2;
    } else if (perms.includes("w") && !(node.mode & 146)) {
      return 2;
    } else if (perms.includes("x") && !(node.mode & 73)) {
      return 2;
    }
    return 0;
  },
  mayLookup: function (dir) {
    var errCode = FS.nodePermissions(dir, "x");
    if (errCode) return errCode;
    if (!dir.node_ops.lookup) return 2;
    return 0;
  },
  mayCreate: function (dir, name) {
    try {
      var node = FS.lookupNode(dir, name);
      return 20;
    } catch (e) {}
    return FS.nodePermissions(dir, "wx");
  },
  mayDelete: function (dir, name, isdir) {
    var node;
    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }
    var errCode = FS.nodePermissions(dir, "wx");
    if (errCode) {
      return errCode;
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54;
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10;
      }
    } else {
      if (FS.isDir(node.mode)) {
        return 31;
      }
    }
    return 0;
  },
  mayOpen: function (node, flags) {
    if (!node) {
      return 44;
    }
    if (FS.isLink(node.mode)) {
      return 32;
    } else if (FS.isDir(node.mode)) {
      if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
        return 31;
      }
    }
    return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
  },
  MAX_OPEN_FDS: 4096,
  nextfd: function (fd_start, fd_end) {
    fd_start = fd_start || 0;
    fd_end = fd_end || FS.MAX_OPEN_FDS;
    for (var fd = fd_start; fd <= fd_end; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }
    throw new FS.ErrnoError(33);
  },
  getStream: function (fd) {
    return FS.streams[fd];
  },
  createStream: function (stream, fd_start, fd_end) {
    if (!FS.FSStream) {
      FS.FSStream = function () {};
      FS.FSStream.prototype = {
        object: {
          get: function () {
            return this.node;
          },
          set: function (val) {
            this.node = val;
          },
        },
        isRead: {
          get: function () {
            return (this.flags & 2097155) !== 1;
          },
        },
        isWrite: {
          get: function () {
            return (this.flags & 2097155) !== 0;
          },
        },
        isAppend: {
          get: function () {
            return this.flags & 1024;
          },
        },
      };
    }
    var newStream = new FS.FSStream();
    for (var p in stream) {
      newStream[p] = stream[p];
    }
    stream = newStream;
    var fd = FS.nextfd(fd_start, fd_end);
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  },
  closeStream: function (fd) {
    FS.streams[fd] = null;
  },
  chrdev_stream_ops: {
    open: function (stream) {
      var device = FS.getDevice(stream.node.rdev);
      stream.stream_ops = device.stream_ops;
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
    },
    llseek: function () {
      throw new FS.ErrnoError(70);
    },
  },
  major: function (dev) {
    return dev >> 8;
  },
  minor: function (dev) {
    return dev & 255;
  },
  makedev: function (ma, mi) {
    return (ma << 8) | mi;
  },
  registerDevice: function (dev, ops) {
    FS.devices[dev] = { stream_ops: ops };
  },
  getDevice: function (dev) {
    return FS.devices[dev];
  },
  getMounts: function (mount) {
    var mounts = [];
    var check = [mount];
    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push.apply(check, m.mounts);
    }
    return mounts;
  },
  syncfs: function (populate, callback) {
    if (typeof populate === "function") {
      callback = populate;
      populate = false;
    }
    FS.syncFSRequests++;
    if (FS.syncFSRequests > 1) {
      err(
        "warning: " +
          FS.syncFSRequests +
          " FS.syncfs operations in flight at once, probably just doing extra work"
      );
    }
    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;
    function doCallback(errCode) {
      FS.syncFSRequests--;
      return callback(errCode);
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true;
          return doCallback(errCode);
        }
        return;
      }
      if (++completed >= mounts.length) {
        doCallback(null);
      }
    }
    mounts.forEach(function (mount) {
      if (!mount.type.syncfs) {
        return done(null);
      }
      mount.type.syncfs(mount, populate, done);
    });
  },
  mount: function (type, opts, mountpoint) {
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;
    if (root && FS.root) {
      throw new FS.ErrnoError(10);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      mountpoint = lookup.path;
      node = lookup.node;
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
    }
    var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] };
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;
    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      node.mounted = mount;
      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }
    return mountRoot;
  },
  unmount: function (mountpoint) {
    var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28);
    }
    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    Object.keys(FS.nameTable).forEach(function (hash) {
      var current = FS.nameTable[hash];
      while (current) {
        var next = current.name_next;
        if (mounts.includes(current.mount)) {
          FS.destroyNode(current);
        }
        current = next;
      }
    });
    node.mounted = null;
    var idx = node.mount.mounts.indexOf(mount);
    node.mount.mounts.splice(idx, 1);
  },
  lookup: function (parent, name) {
    return parent.node_ops.lookup(parent, name);
  },
  mknod: function (path, mode, dev) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    if (!name || name === "." || name === "..") {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.mayCreate(parent, name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.mknod(parent, name, mode, dev);
  },
  create: function (path, mode) {
    mode = mode !== undefined ? mode : 438;
    mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  },
  mkdir: function (path, mode) {
    mode = mode !== undefined ? mode : 511;
    mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  },
  mkdirTree: function (path, mode) {
    var dirs = path.split("/");
    var d = "";
    for (var i = 0; i < dirs.length; ++i) {
      if (!dirs[i]) continue;
      d += "/" + dirs[i];
      try {
        FS.mkdir(d, mode);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
    }
  },
  mkdev: function (path, mode, dev) {
    if (typeof dev === "undefined") {
      dev = mode;
      mode = 438;
    }
    mode |= 8192;
    return FS.mknod(path, mode, dev);
  },
  symlink: function (oldpath, newpath) {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44);
    }
    var lookup = FS.lookupPath(newpath, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var errCode = FS.mayCreate(parent, newname);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.symlink(parent, newname, oldpath);
  },
  rename: function (old_path, new_path) {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    var lookup, old_dir, new_dir;
    lookup = FS.lookupPath(old_path, { parent: true });
    old_dir = lookup.node;
    lookup = FS.lookupPath(new_path, { parent: true });
    new_dir = lookup.node;
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75);
    }
    var old_node = FS.lookupNode(old_dir, old_name);
    var relative = PATH_FS.relative(old_path, new_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28);
    }
    relative = PATH_FS.relative(new_path, old_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55);
    }
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (old_node === new_node) {
      return;
    }
    var isdir = FS.isDir(old_node.mode);
    var errCode = FS.mayDelete(old_dir, old_name, isdir);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    errCode = new_node
      ? FS.mayDelete(new_dir, new_name, isdir)
      : FS.mayCreate(new_dir, new_name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
      throw new FS.ErrnoError(10);
    }
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    FS.hashRemoveNode(old_node);
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
    } catch (e) {
      throw e;
    } finally {
      FS.hashAddNode(old_node);
    }
  },
  rmdir: function (path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, true);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);
  },
  readdir: function (path) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    if (!node.node_ops.readdir) {
      throw new FS.ErrnoError(54);
    }
    return node.node_ops.readdir(node);
  },
  unlink: function (path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, false);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);
  },
  readlink: function (path) {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;
    if (!link) {
      throw new FS.ErrnoError(44);
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28);
    }
    return PATH_FS.resolve(
      FS.getPath(link.parent),
      link.node_ops.readlink(link)
    );
  },
  stat: function (path, dontFollow) {
    var lookup = FS.lookupPath(path, { follow: !dontFollow });
    var node = lookup.node;
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (!node.node_ops.getattr) {
      throw new FS.ErrnoError(63);
    }
    return node.node_ops.getattr(node);
  },
  lstat: function (path) {
    return FS.stat(path, true);
  },
  chmod: function (path, mode, dontFollow) {
    var node;
    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, {
      mode: (mode & 4095) | (node.mode & ~4095),
      timestamp: Date.now(),
    });
  },
  lchmod: function (path, mode) {
    FS.chmod(path, mode, true);
  },
  fchmod: function (fd, mode) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    FS.chmod(stream.node, mode);
  },
  chown: function (path, uid, gid, dontFollow) {
    var node;
    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, { timestamp: Date.now() });
  },
  lchown: function (path, uid, gid) {
    FS.chown(path, uid, gid, true);
  },
  fchown: function (fd, uid, gid) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    FS.chown(stream.node, uid, gid);
  },
  truncate: function (path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(28);
    }
    var node;
    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, { follow: true });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.nodePermissions(node, "w");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
  },
  ftruncate: function (fd, len) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28);
    }
    FS.truncate(stream.node, len);
  },
  utime: function (path, atime, mtime) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) });
  },
  open: function (path, flags, mode, fd_start, fd_end) {
    if (path === "") {
      throw new FS.ErrnoError(44);
    }
    flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
    mode = typeof mode === "undefined" ? 438 : mode;
    if (flags & 64) {
      mode = (mode & 4095) | 32768;
    } else {
      mode = 0;
    }
    var node;
    if (typeof path === "object") {
      node = path;
    } else {
      path = PATH.normalize(path);
      try {
        var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
        node = lookup.node;
      } catch (e) {}
    }
    var created = false;
    if (flags & 64) {
      if (node) {
        if (flags & 128) {
          throw new FS.ErrnoError(20);
        }
      } else {
        node = FS.mknod(path, mode, 0);
        created = true;
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (FS.isChrdev(node.mode)) {
      flags &= ~512;
    }
    if (flags & 65536 && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54);
    }
    if (!created) {
      var errCode = FS.mayOpen(node, flags);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    if (flags & 512) {
      FS.truncate(node, 0);
    }
    flags &= ~(128 | 512 | 131072);
    var stream = FS.createStream(
      {
        node: node,
        path: FS.getPath(node),
        id: node.id,
        flags: flags,
        mode: node.mode,
        seekable: true,
        position: 0,
        stream_ops: node.stream_ops,
        node_ops: node.node_ops,
        ungotten: [],
        error: false,
      },
      fd_start,
      fd_end
    );
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }
    if (DwgApi["logReadFiles"] && !(flags & 1)) {
      if (!FS.readFiles) FS.readFiles = {};
      if (!(path in FS.readFiles)) {
        FS.readFiles[path] = 1;
      }
    }
    return stream;
  },
  close: function (stream) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (stream.getdents) stream.getdents = null;
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream);
      }
    } catch (e) {
      throw e;
    } finally {
      FS.closeStream(stream.fd);
    }
    stream.fd = null;
  },
  isClosed: function (stream) {
    return stream.fd === null;
  },
  llseek: function (stream, offset, whence) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70);
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28);
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence);
    stream.ungotten = [];
    return stream.position;
  },
  read: function (stream, buffer, offset, length, position) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28);
    }
    var seeking = typeof position !== "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesRead = stream.stream_ops.read(
      stream,
      buffer,
      offset,
      length,
      position
    );
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  },
  write: function (stream, buffer, offset, length, position, canOwn) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28);
    }
    if (stream.seekable && stream.flags & 1024) {
      FS.llseek(stream, 0, 2);
    }
    var seeking = typeof position !== "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesWritten = stream.stream_ops.write(
      stream,
      buffer,
      offset,
      length,
      position,
      canOwn
    );
    if (!seeking) stream.position += bytesWritten;
    return bytesWritten;
  },
  allocate: function (stream, offset, length) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (offset < 0 || length <= 0) {
      throw new FS.ErrnoError(28);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (!stream.stream_ops.allocate) {
      throw new FS.ErrnoError(138);
    }
    stream.stream_ops.allocate(stream, offset, length);
  },
  mmap: function (stream, address, length, position, prot, flags) {
    if (
      (prot & 2) !== 0 &&
      (flags & 2) === 0 &&
      (stream.flags & 2097155) !== 2
    ) {
      throw new FS.ErrnoError(2);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2);
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43);
    }
    return stream.stream_ops.mmap(
      stream,
      address,
      length,
      position,
      prot,
      flags
    );
  },
  msync: function (stream, buffer, offset, length, mmapFlags) {
    if (!stream || !stream.stream_ops.msync) {
      return 0;
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
  },
  munmap: function (stream) {
    return 0;
  },
  ioctl: function (stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59);
    }
    return stream.stream_ops.ioctl(stream, cmd, arg);
  },
  readFile: function (path, opts) {
    opts = opts || {};
    opts.flags = opts.flags || 0;
    opts.encoding = opts.encoding || "binary";
    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      throw new Error('Invalid encoding type "' + opts.encoding + '"');
    }
    var ret;
    var stream = FS.open(path, opts.flags);
    var stat = FS.stat(path);
    var length = stat.size;
    var buf = new Uint8Array(length);
    FS.read(stream, buf, 0, length, 0);
    if (opts.encoding === "utf8") {
      ret = UTF8ArrayToString(buf, 0);
    } else if (opts.encoding === "binary") {
      ret = buf;
    }
    FS.close(stream);
    return ret;
  },
  writeFile: function (path, data, opts) {
    opts = opts || {};
    opts.flags = opts.flags || 577;
    var stream = FS.open(path, opts.flags, opts.mode);
    if (typeof data === "string") {
      var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
      var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
      FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
    } else if (ArrayBuffer.isView(data)) {
      FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
    } else {
      throw new Error("Unsupported data type");
    }
    FS.close(stream);
  },
  cwd: function () {
    return FS.currentPath;
  },
  chdir: function (path) {
    var lookup = FS.lookupPath(path, { follow: true });
    if (lookup.node === null) {
      throw new FS.ErrnoError(44);
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54);
    }
    var errCode = FS.nodePermissions(lookup.node, "x");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.currentPath = lookup.path;
  },
  createDefaultDirectories: function () {
    FS.mkdir("/tmp");
    FS.mkdir("/home");
    FS.mkdir("/home/web_user");
  },
  createDefaultDevices: function () {
    FS.mkdir("/dev");
    FS.registerDevice(FS.makedev(1, 3), {
      read: function () {
        return 0;
      },
      write: function (stream, buffer, offset, length, pos) {
        return length;
      },
    });
    FS.mkdev("/dev/null", FS.makedev(1, 3));
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
    FS.mkdev("/dev/tty", FS.makedev(5, 0));
    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
    var random_device = getRandomDevice();
    FS.createDevice("/dev", "random", random_device);
    FS.createDevice("/dev", "urandom", random_device);
    FS.mkdir("/dev/shm");
    FS.mkdir("/dev/shm/tmp");
  },
  createSpecialDirectories: function () {
    FS.mkdir("/proc");
    var proc_self = FS.mkdir("/proc/self");
    FS.mkdir("/proc/self/fd");
    FS.mount(
      {
        mount: function () {
          var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
          node.node_ops = {
            lookup: function (parent, name) {
              var fd = +name;
              var stream = FS.getStream(fd);
              if (!stream) throw new FS.ErrnoError(8);
              var ret = {
                parent: null,
                mount: { mountpoint: "fake" },
                node_ops: {
                  readlink: function () {
                    return stream.path;
                  },
                },
              };
              ret.parent = ret;
              return ret;
            },
          };
          return node;
        },
      },
      {},
      "/proc/self/fd"
    );
  },
  createStandardStreams: function () {
    if (DwgApi["stdin"]) {
      FS.createDevice("/dev", "stdin", DwgApi["stdin"]);
    } else {
      FS.symlink("/dev/tty", "/dev/stdin");
    }
    if (DwgApi["stdout"]) {
      FS.createDevice("/dev", "stdout", null, DwgApi["stdout"]);
    } else {
      FS.symlink("/dev/tty", "/dev/stdout");
    }
    if (DwgApi["stderr"]) {
      FS.createDevice("/dev", "stderr", null, DwgApi["stderr"]);
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr");
    }
    var stdin = FS.open("/dev/stdin", 0);
    var stdout = FS.open("/dev/stdout", 1);
    var stderr = FS.open("/dev/stderr", 1);
  },
  ensureErrnoError: function () {
    if (FS.ErrnoError) return;
    FS.ErrnoError = function ErrnoError(errno, node) {
      this.node = node;
      this.setErrno = function (errno) {
        this.errno = errno;
      };
      this.setErrno(errno);
      this.message = "FS error";
    };
    FS.ErrnoError.prototype = new Error();
    FS.ErrnoError.prototype.constructor = FS.ErrnoError;
    [44].forEach(function (code) {
      FS.genericErrors[code] = new FS.ErrnoError(code);
      FS.genericErrors[code].stack = "<generic error, no stack>";
    });
  },
  staticInit: function () {
    FS.ensureErrnoError();
    FS.nameTable = new Array(4096);
    FS.mount(MEMFS, {}, "/");
    FS.createDefaultDirectories();
    FS.createDefaultDevices();
    FS.createSpecialDirectories();
    FS.filesystems = { MEMFS: MEMFS };
  },
  init: function (input, output, error) {
    FS.init.initialized = true;
    FS.ensureErrnoError();
    DwgApi["stdin"] = input || DwgApi["stdin"];
    DwgApi["stdout"] = output || DwgApi["stdout"];
    DwgApi["stderr"] = error || DwgApi["stderr"];
    FS.createStandardStreams();
  },
  quit: function () {
    FS.init.initialized = false;
    var fflush = DwgApi["_fflush"];
    if (fflush) fflush(0);
    for (var i = 0; i < FS.streams.length; i++) {
      var stream = FS.streams[i];
      if (!stream) {
        continue;
      }
      FS.close(stream);
    }
  },
  getMode: function (canRead, canWrite) {
    var mode = 0;
    if (canRead) mode |= 292 | 73;
    if (canWrite) mode |= 146;
    return mode;
  },
  findObject: function (path, dontResolveLastLink) {
    var ret = FS.analyzePath(path, dontResolveLastLink);
    if (ret.exists) {
      return ret.object;
    } else {
      return null;
    }
  },
  analyzePath: function (path, dontResolveLastLink) {
    try {
      var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      path = lookup.path;
    } catch (e) {}
    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null,
    };
    try {
      var lookup = FS.lookupPath(path, { parent: true });
      ret.parentExists = true;
      ret.parentPath = lookup.path;
      ret.parentObject = lookup.node;
      ret.name = PATH.basename(path);
      lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      ret.exists = true;
      ret.path = lookup.path;
      ret.object = lookup.node;
      ret.name = lookup.node.name;
      ret.isRoot = lookup.path === "/";
    } catch (e) {
      ret.error = e.errno;
    }
    return ret;
  },
  createPath: function (parent, path, canRead, canWrite) {
    parent = typeof parent === "string" ? parent : FS.getPath(parent);
    var parts = path.split("/").reverse();
    while (parts.length) {
      var part = parts.pop();
      if (!part) continue;
      var current = PATH.join2(parent, part);
      try {
        FS.mkdir(current);
      } catch (e) {}
      parent = current;
    }
    return current;
  },
  createFile: function (parent, name, properties, canRead, canWrite) {
    var path = PATH.join2(
      typeof parent === "string" ? parent : FS.getPath(parent),
      name
    );
    var mode = FS.getMode(canRead, canWrite);
    return FS.create(path, mode);
  },
  createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
    var path = name
      ? PATH.join2(
          typeof parent === "string" ? parent : FS.getPath(parent),
          name
        )
      : parent;
    var mode = FS.getMode(canRead, canWrite);
    var node = FS.create(path, mode);
    if (data) {
      if (typeof data === "string") {
        var arr = new Array(data.length);
        for (var i = 0, len = data.length; i < len; ++i)
          arr[i] = data.charCodeAt(i);
        data = arr;
      }
      FS.chmod(node, mode | 146);
      var stream = FS.open(node, 577);
      FS.write(stream, data, 0, data.length, 0, canOwn);
      FS.close(stream);
      FS.chmod(node, mode);
    }
    return node;
  },
  createDevice: function (parent, name, input, output) {
    var path = PATH.join2(
      typeof parent === "string" ? parent : FS.getPath(parent),
      name
    );
    var mode = FS.getMode(!!input, !!output);
    if (!FS.createDevice.major) FS.createDevice.major = 64;
    var dev = FS.makedev(FS.createDevice.major++, 0);
    FS.registerDevice(dev, {
      open: function (stream) {
        stream.seekable = false;
      },
      close: function (stream) {
        if (output && output.buffer && output.buffer.length) {
          output(10);
        }
      },
      read: function (stream, buffer, offset, length, pos) {
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === undefined) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now();
        }
        return bytesRead;
      },
      write: function (stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.timestamp = Date.now();
        }
        return i;
      },
    });
    return FS.mkdev(path, mode, dev);
  },
  forceLoadFile: function (obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
    if (typeof XMLHttpRequest !== "undefined") {
      throw new Error(
        "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
      );
    } else if (read_) {
      try {
        obj.contents = intArrayFromString(read_(obj.url), true);
        obj.usedBytes = obj.contents.length;
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
    } else {
      throw new Error("Cannot load without read() or XMLHttpRequest.");
    }
  },
  createLazyFile: function (parent, name, url, canRead, canWrite) {
    function LazyUint8Array() {
      this.lengthKnown = false;
      this.chunks = [];
    }
    LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
      if (idx > this.length - 1 || idx < 0) {
        return undefined;
      }
      var chunkOffset = idx % this.chunkSize;
      var chunkNum = (idx / this.chunkSize) | 0;
      return this.getter(chunkNum)[chunkOffset];
    };
    LazyUint8Array.prototype.setDataGetter =
      function LazyUint8Array_setDataGetter(getter) {
        this.getter = getter;
      };
    LazyUint8Array.prototype.cacheLength =
      function LazyUint8Array_cacheLength() {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing =
          (header = xhr.getResponseHeader("Accept-Ranges")) &&
          header === "bytes";
        var usesGzip =
          (header = xhr.getResponseHeader("Content-Encoding")) &&
          header === "gzip";
        var chunkSize = 1024 * 1024;
        if (!hasByteServing) chunkSize = datalength;
        var doXHR = function (from, to) {
          if (from > to)
            throw new Error(
              "invalid range (" + from + ", " + to + ") or no bytes requested!"
            );
          if (to > datalength - 1)
            throw new Error(
              "only " + datalength + " bytes available! programmer error!"
            );
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          if (datalength !== chunkSize)
            xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
          if (typeof Uint8Array != "undefined")
            xhr.responseType = "arraybuffer";
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr.send(null);
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          if (xhr.response !== undefined) {
            return new Uint8Array(xhr.response || []);
          } else {
            return intArrayFromString(xhr.responseText || "", true);
          }
        };
        var lazyArray = this;
        lazyArray.setDataGetter(function (chunkNum) {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          end = Math.min(end, datalength - 1);
          if (typeof lazyArray.chunks[chunkNum] === "undefined") {
            lazyArray.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray.chunks[chunkNum] === "undefined")
            throw new Error("doXHR failed!");
          return lazyArray.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1;
          datalength = this.getter(0).length;
          chunkSize = datalength;
          out(
            "LazyFiles on gzip forces download of the whole file when length is accessed"
          );
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      };
    if (typeof XMLHttpRequest !== "undefined") {
      if (!ENVIRONMENT_IS_WORKER)
        throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
      var lazyArray = new LazyUint8Array();
      Object.defineProperties(lazyArray, {
        length: {
          get: function () {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          },
        },
        chunkSize: {
          get: function () {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          },
        },
      });
      var properties = { isDevice: false, contents: lazyArray };
    } else {
      var properties = { isDevice: false, url: url };
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite);
    if (properties.contents) {
      node.contents = properties.contents;
    } else if (properties.url) {
      node.contents = null;
      node.url = properties.url;
    }
    Object.defineProperties(node, {
      usedBytes: {
        get: function () {
          return this.contents.length;
        },
      },
    });
    var stream_ops = {};
    var keys = Object.keys(node.stream_ops);
    keys.forEach(function (key) {
      var fn = node.stream_ops[key];
      stream_ops[key] = function forceLoadLazyFile() {
        FS.forceLoadFile(node);
        return fn.apply(null, arguments);
      };
    });
    stream_ops.read = function stream_ops_read(
      stream,
      buffer,
      offset,
      length,
      position
    ) {
      FS.forceLoadFile(node);
      var contents = stream.node.contents;
      if (position >= contents.length) return 0;
      var size = Math.min(contents.length - position, length);
      if (contents.slice) {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i];
        }
      } else {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents.get(position + i);
        }
      }
      return size;
    };
    node.stream_ops = stream_ops;
    return node;
  },
  createPreloadedFile: function (
    parent,
    name,
    url,
    canRead,
    canWrite,
    onload,
    onerror,
    dontCreateFile,
    canOwn,
    preFinish
  ) {
    Browser.init();
    var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
    var dep = getUniqueRunDependency("cp " + fullname);
    function processData(byteArray) {
      function finish(byteArray) {
        if (preFinish) preFinish();
        if (!dontCreateFile) {
          FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
        }
        if (onload) onload();
        removeRunDependency(dep);
      }
      var handled = false;
      DwgApi["preloadPlugins"].forEach(function (plugin) {
        if (handled) return;
        if (plugin["canHandle"](fullname)) {
          plugin["handle"](byteArray, fullname, finish, function () {
            if (onerror) onerror();
            removeRunDependency(dep);
          });
          handled = true;
        }
      });
      if (!handled) finish(byteArray);
    }
    addRunDependency(dep);
    if (typeof url == "string") {
      asyncLoad(
        url,
        function (byteArray) {
          processData(byteArray);
        },
        onerror
      );
    } else {
      processData(url);
    }
  },
  indexedDB: function () {
    return (
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB
    );
  },
  DB_NAME: function () {
    return "EM_FS_" + window.location.pathname;
  },
  DB_VERSION: 20,
  DB_STORE_NAME: "FILE_DATA",
  saveFilesToDB: function (paths, onload, onerror) {
    onload = onload || function () {};
    onerror = onerror || function () {};
    var indexedDB = FS.indexedDB();
    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
    } catch (e) {
      return onerror(e);
    }
    openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
      out("creating db");
      var db = openRequest.result;
      db.createObjectStore(FS.DB_STORE_NAME);
    };
    openRequest.onsuccess = function openRequest_onsuccess() {
      var db = openRequest.result;
      var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
      var files = transaction.objectStore(FS.DB_STORE_NAME);
      var ok = 0,
        fail = 0,
        total = paths.length;
      function finish() {
        if (fail == 0) onload();
        else onerror();
      }
      paths.forEach(function (path) {
        var putRequest = files.put(FS.analyzePath(path).object.contents, path);
        putRequest.onsuccess = function putRequest_onsuccess() {
          ok++;
          if (ok + fail == total) finish();
        };
        putRequest.onerror = function putRequest_onerror() {
          fail++;
          if (ok + fail == total) finish();
        };
      });
      transaction.onerror = onerror;
    };
    openRequest.onerror = onerror;
  },
  loadFilesFromDB: function (paths, onload, onerror) {
    onload = onload || function () {};
    onerror = onerror || function () {};
    var indexedDB = FS.indexedDB();
    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
    } catch (e) {
      return onerror(e);
    }
    openRequest.onupgradeneeded = onerror;
    openRequest.onsuccess = function openRequest_onsuccess() {
      var db = openRequest.result;
      try {
        var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
      } catch (e) {
        onerror(e);
        return;
      }
      var files = transaction.objectStore(FS.DB_STORE_NAME);
      var ok = 0,
        fail = 0,
        total = paths.length;
      function finish() {
        if (fail == 0) onload();
        else onerror();
      }
      paths.forEach(function (path) {
        var getRequest = files.get(path);
        getRequest.onsuccess = function getRequest_onsuccess() {
          if (FS.analyzePath(path).exists) {
            FS.unlink(path);
          }
          FS.createDataFile(
            PATH.dirname(path),
            PATH.basename(path),
            getRequest.result,
            true,
            true,
            true
          );
          ok++;
          if (ok + fail == total) finish();
        };
        getRequest.onerror = function getRequest_onerror() {
          fail++;
          if (ok + fail == total) finish();
        };
      });
      transaction.onerror = onerror;
    };
    openRequest.onerror = onerror;
  },
};
var SYSCALLS = {
  mappings: {},
  DEFAULT_POLLMASK: 5,
  calculateAt: function (dirfd, path, allowEmpty) {
    if (path[0] === "/") {
      return path;
    }
    var dir;
    if (dirfd === -100) {
      dir = FS.cwd();
    } else {
      var dirstream = FS.getStream(dirfd);
      if (!dirstream) throw new FS.ErrnoError(8);
      dir = dirstream.path;
    }
    if (path.length == 0) {
      if (!allowEmpty) {
        throw new FS.ErrnoError(44);
      }
      return dir;
    }
    return PATH.join2(dir, path);
  },
  doStat: function (func, path, buf) {
    try {
      var stat = func(path);
    } catch (e) {
      if (
        e &&
        e.node &&
        PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))
      ) {
        return -54;
      }
      throw e;
    }
    HEAP32[buf >> 2] = stat.dev;
    HEAP32[(buf + 4) >> 2] = 0;
    HEAP32[(buf + 8) >> 2] = stat.ino;
    HEAP32[(buf + 12) >> 2] = stat.mode;
    HEAP32[(buf + 16) >> 2] = stat.nlink;
    HEAP32[(buf + 20) >> 2] = stat.uid;
    HEAP32[(buf + 24) >> 2] = stat.gid;
    HEAP32[(buf + 28) >> 2] = stat.rdev;
    HEAP32[(buf + 32) >> 2] = 0;
    (tempI64 = [
      stat.size >>> 0,
      ((tempDouble = stat.size),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0),
    ]),
      (HEAP32[(buf + 40) >> 2] = tempI64[0]),
      (HEAP32[(buf + 44) >> 2] = tempI64[1]);
    HEAP32[(buf + 48) >> 2] = 4096;
    HEAP32[(buf + 52) >> 2] = stat.blocks;
    HEAP32[(buf + 56) >> 2] = (stat.atime.getTime() / 1e3) | 0;
    HEAP32[(buf + 60) >> 2] = 0;
    HEAP32[(buf + 64) >> 2] = (stat.mtime.getTime() / 1e3) | 0;
    HEAP32[(buf + 68) >> 2] = 0;
    HEAP32[(buf + 72) >> 2] = (stat.ctime.getTime() / 1e3) | 0;
    HEAP32[(buf + 76) >> 2] = 0;
    (tempI64 = [
      stat.ino >>> 0,
      ((tempDouble = stat.ino),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0),
    ]),
      (HEAP32[(buf + 80) >> 2] = tempI64[0]),
      (HEAP32[(buf + 84) >> 2] = tempI64[1]);
    return 0;
  },
  doMsync: function (addr, stream, len, flags, offset) {
    var buffer = HEAPU8.slice(addr, addr + len);
    FS.msync(stream, buffer, offset, len, flags);
  },
  doMkdir: function (path, mode) {
    path = PATH.normalize(path);
    if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
    FS.mkdir(path, mode, 0);
    return 0;
  },
  doMknod: function (path, mode, dev) {
    switch (mode & 61440) {
      case 32768:
      case 8192:
      case 24576:
      case 4096:
      case 49152:
        break;
      default:
        return -28;
    }
    FS.mknod(path, mode, dev);
    return 0;
  },
  doReadlink: function (path, buf, bufsize) {
    if (bufsize <= 0) return -28;
    var ret = FS.readlink(path);
    var len = Math.min(bufsize, lengthBytesUTF8(ret));
    var endChar = HEAP8[buf + len];
    stringToUTF8(ret, buf, bufsize + 1);
    HEAP8[buf + len] = endChar;
    return len;
  },
  doAccess: function (path, amode) {
    if (amode & ~7) {
      return -28;
    }
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    if (!node) {
      return -44;
    }
    var perms = "";
    if (amode & 4) perms += "r";
    if (amode & 2) perms += "w";
    if (amode & 1) perms += "x";
    if (perms && FS.nodePermissions(node, perms)) {
      return -2;
    }
    return 0;
  },
  doDup: function (path, flags, suggestFD) {
    var suggest = FS.getStream(suggestFD);
    if (suggest) FS.close(suggest);
    return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
  },
  doReadv: function (stream, iov, iovcnt, offset) {
    var ret = 0;
    for (var i = 0; i < iovcnt; i++) {
      var ptr = HEAP32[(iov + i * 8) >> 2];
      var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
      var curr = FS.read(stream, HEAP8, ptr, len, offset);
      if (curr < 0) return -1;
      ret += curr;
      if (curr < len) break;
    }
    return ret;
  },
  doWritev: function (stream, iov, iovcnt, offset) {
    var ret = 0;
    for (var i = 0; i < iovcnt; i++) {
      var ptr = HEAP32[(iov + i * 8) >> 2];
      var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
      var curr = FS.write(stream, HEAP8, ptr, len, offset);
      if (curr < 0) return -1;
      ret += curr;
    }
    return ret;
  },
  varargs: undefined,
  get: function () {
    SYSCALLS.varargs += 4;
    var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2];
    return ret;
  },
  getStr: function (ptr) {
    var ret = UTF8ToString(ptr);
    return ret;
  },
  getStreamFromFD: function (fd) {
    var stream = FS.getStream(fd);
    if (!stream) throw new FS.ErrnoError(8);
    return stream;
  },
  get64: function (low, high) {
    return low;
  },
};
function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (cmd) {
      case 0: {
        var arg = SYSCALLS.get();
        if (arg < 0) {
          return -28;
        }
        var newStream;
        newStream = FS.open(stream.path, stream.flags, 0, arg);
        return newStream.fd;
      }
      case 1:
      case 2:
        return 0;
      case 3:
        return stream.flags;
      case 4: {
        var arg = SYSCALLS.get();
        stream.flags |= arg;
        return 0;
      }
      case 5: {
        var arg = SYSCALLS.get();
        var offset = 0;
        HEAP16[(arg + offset) >> 1] = 2;
        return 0;
      }
      case 6:
      case 7:
        return 0;
      case 16:
      case 8:
        return -28;
      case 9:
        setErrNo(28);
        return -1;
      default: {
        return -28;
      }
    }
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
}
function ___syscall_fstat64(fd, buf) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    return SYSCALLS.doStat(FS.stat, stream.path, buf);
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
}
function ___syscall_fstatat64(dirfd, path, buf, flags) {
  try {
    path = SYSCALLS.getStr(path);
    var nofollow = flags & 256;
    var allowEmpty = flags & 4096;
    flags = flags & ~4352;
    path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
    return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
}
function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (op) {
      case 21509:
      case 21505: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21510:
      case 21511:
      case 21512:
      case 21506:
      case 21507:
      case 21508: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21519: {
        if (!stream.tty) return -59;
        var argp = SYSCALLS.get();
        HEAP32[argp >> 2] = 0;
        return 0;
      }
      case 21520: {
        if (!stream.tty) return -59;
        return -28;
      }
      case 21531: {
        var argp = SYSCALLS.get();
        return FS.ioctl(stream, op, argp);
      }
      case 21523: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21524: {
        if (!stream.tty) return -59;
        return 0;
      }
      default:
        abort("bad ioctl syscall " + op);
    }
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
}
function ___syscall_lstat64(path, buf) {
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.doStat(FS.lstat, path, buf);
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
}
function ___syscall_open(path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var pathname = SYSCALLS.getStr(path);
    var mode = varargs ? SYSCALLS.get() : 0;
    var stream = FS.open(pathname, flags, mode);
    return stream.fd;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
}
function ___syscall_rmdir(path) {
  try {
    path = SYSCALLS.getStr(path);
    FS.rmdir(path);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
}
function ___syscall_stat64(path, buf) {
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.doStat(FS.stat, path, buf);
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
}
function ___syscall_unlink(path) {
  try {
    path = SYSCALLS.getStr(path);
    FS.unlink(path);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
}
function __embind_register_bigint(
  primitiveType,
  name,
  size,
  minRange,
  maxRange
) {}
function getShiftFromSize(size) {
  switch (size) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 4:
      return 2;
    case 8:
      return 3;
    default:
      throw new TypeError("Unknown type size: " + size);
  }
}
function embind_init_charCodes() {
  var codes = new Array(256);
  for (var i = 0; i < 256; ++i) {
    codes[i] = String.fromCharCode(i);
  }
  embind_charCodes = codes;
}
var embind_charCodes = undefined;
function readLatin1String(ptr) {
  var ret = "";
  var c = ptr;
  while (HEAPU8[c]) {
    ret += embind_charCodes[HEAPU8[c++]];
  }
  return ret;
}
var awaitingDependencies = {};
var registeredTypes = {};
var typeDependencies = {};
var char_0 = 48;
var char_9 = 57;
function makeLegalFunctionName(name) {
  if (undefined === name) {
    return "_unknown";
  }
  name = name.replace(/[^a-zA-Z0-9_]/g, "$");
  var f = name.charCodeAt(0);
  if (f >= char_0 && f <= char_9) {
    return "_" + name;
  } else {
    return name;
  }
}
function createNamedFunction(name, body) {
  name = makeLegalFunctionName(name);
  return new Function(
    "body",
    "return function " +
      name +
      "() {\n" +
      '    "use strict";' +
      "    return body.apply(this, arguments);\n" +
      "};\n"
  )(body);
}
function extendError(baseErrorType, errorName) {
  var errorClass = createNamedFunction(errorName, function (message) {
    this.name = errorName;
    this.message = message;
    var stack = new Error(message).stack;
    if (stack !== undefined) {
      this.stack =
        this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
    }
  });
  errorClass.prototype = Object.create(baseErrorType.prototype);
  errorClass.prototype.constructor = errorClass;
  errorClass.prototype.toString = function () {
    if (this.message === undefined) {
      return this.name;
    } else {
      return this.name + ": " + this.message;
    }
  };
  return errorClass;
}
var BindingError = undefined;
function throwBindingError(message) {
  throw new BindingError(message);
}
var InternalError = undefined;
function throwInternalError(message) {
  throw new InternalError(message);
}
function whenDependentTypesAreResolved(
  myTypes,
  dependentTypes,
  getTypeConverters
) {
  myTypes.forEach(function (type) {
    typeDependencies[type] = dependentTypes;
  });
  function onComplete(typeConverters) {
    var myTypeConverters = getTypeConverters(typeConverters);
    if (myTypeConverters.length !== myTypes.length) {
      throwInternalError("Mismatched type converter count");
    }
    for (var i = 0; i < myTypes.length; ++i) {
      registerType(myTypes[i], myTypeConverters[i]);
    }
  }
  var typeConverters = new Array(dependentTypes.length);
  var unregisteredTypes = [];
  var registered = 0;
  dependentTypes.forEach(function (dt, i) {
    if (registeredTypes.hasOwnProperty(dt)) {
      typeConverters[i] = registeredTypes[dt];
    } else {
      unregisteredTypes.push(dt);
      if (!awaitingDependencies.hasOwnProperty(dt)) {
        awaitingDependencies[dt] = [];
      }
      awaitingDependencies[dt].push(function () {
        typeConverters[i] = registeredTypes[dt];
        ++registered;
        if (registered === unregisteredTypes.length) {
          onComplete(typeConverters);
        }
      });
    }
  });
  if (0 === unregisteredTypes.length) {
    onComplete(typeConverters);
  }
}
function registerType(rawType, registeredInstance, options) {
  options = options || {};
  if (!("argPackAdvance" in registeredInstance)) {
    throw new TypeError(
      "registerType registeredInstance requires argPackAdvance"
    );
  }
  var name = registeredInstance.name;
  if (!rawType) {
    throwBindingError(
      'type "' + name + '" must have a positive integer typeid pointer'
    );
  }
  if (registeredTypes.hasOwnProperty(rawType)) {
    if (options.ignoreDuplicateRegistrations) {
      return;
    } else {
      throwBindingError("Cannot register type '" + name + "' twice");
    }
  }
  registeredTypes[rawType] = registeredInstance;
  delete typeDependencies[rawType];
  if (awaitingDependencies.hasOwnProperty(rawType)) {
    var callbacks = awaitingDependencies[rawType];
    delete awaitingDependencies[rawType];
    callbacks.forEach(function (cb) {
      cb();
    });
  }
}
function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
  var shift = getShiftFromSize(size);
  name = readLatin1String(name);
  registerType(rawType, {
    name: name,
    fromWireType: function (wt) {
      return !!wt;
    },
    toWireType: function (destructors, o) {
      return o ? trueValue : falseValue;
    },
    argPackAdvance: 8,
    readValueFromPointer: function (pointer) {
      var heap;
      if (size === 1) {
        heap = HEAP8;
      } else if (size === 2) {
        heap = HEAP16;
      } else if (size === 4) {
        heap = HEAP32;
      } else {
        throw new TypeError("Unknown boolean type size: " + name);
      }
      return this["fromWireType"](heap[pointer >> shift]);
    },
    destructorFunction: null,
  });
}
var emval_free_list = [];
var emval_handle_array = [
  {},
  { value: undefined },
  { value: null },
  { value: true },
  { value: false },
];
function __emval_decref(handle) {
  if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
    emval_handle_array[handle] = undefined;
    emval_free_list.push(handle);
  }
}
function count_emval_handles() {
  var count = 0;
  for (var i = 5; i < emval_handle_array.length; ++i) {
    if (emval_handle_array[i] !== undefined) {
      ++count;
    }
  }
  return count;
}
function get_first_emval() {
  for (var i = 5; i < emval_handle_array.length; ++i) {
    if (emval_handle_array[i] !== undefined) {
      return emval_handle_array[i];
    }
  }
  return null;
}
function init_emval() {
  DwgApi["count_emval_handles"] = count_emval_handles;
  DwgApi["get_first_emval"] = get_first_emval;
}
var Emval = {
  toValue: function (handle) {
    if (!handle) {
      throwBindingError("Cannot use deleted val. handle = " + handle);
    }
    return emval_handle_array[handle].value;
  },
  toHandle: function (value) {
    switch (value) {
      case undefined: {
        return 1;
      }
      case null: {
        return 2;
      }
      case true: {
        return 3;
      }
      case false: {
        return 4;
      }
      default: {
        var handle = emval_free_list.length
          ? emval_free_list.pop()
          : emval_handle_array.length;
        emval_handle_array[handle] = { refcount: 1, value: value };
        return handle;
      }
    }
  },
};
function simpleReadValueFromPointer(pointer) {
  return this["fromWireType"](HEAPU32[pointer >> 2]);
}
function __embind_register_emval(rawType, name) {
  name = readLatin1String(name);
  registerType(rawType, {
    name: name,
    fromWireType: function (handle) {
      var rv = Emval.toValue(handle);
      __emval_decref(handle);
      return rv;
    },
    toWireType: function (destructors, value) {
      return Emval.toHandle(value);
    },
    argPackAdvance: 8,
    readValueFromPointer: simpleReadValueFromPointer,
    destructorFunction: null,
  });
}
function _embind_repr(v) {
  if (v === null) {
    return "null";
  }
  var t = typeof v;
  if (t === "object" || t === "array" || t === "function") {
    return v.toString();
  } else {
    return "" + v;
  }
}
function floatReadValueFromPointer(name, shift) {
  switch (shift) {
    case 2:
      return function (pointer) {
        return this["fromWireType"](HEAPF32[pointer >> 2]);
      };
    case 3:
      return function (pointer) {
        return this["fromWireType"](HEAPF64[pointer >> 3]);
      };
    default:
      throw new TypeError("Unknown float type: " + name);
  }
}
function __embind_register_float(rawType, name, size) {
  var shift = getShiftFromSize(size);
  name = readLatin1String(name);
  registerType(rawType, {
    name: name,
    fromWireType: function (value) {
      return value;
    },
    toWireType: function (destructors, value) {
      return value;
    },
    argPackAdvance: 8,
    readValueFromPointer: floatReadValueFromPointer(name, shift),
    destructorFunction: null,
  });
}
function new_(constructor, argumentList) {
  if (!(constructor instanceof Function)) {
    throw new TypeError(
      "new_ called with constructor type " +
        typeof constructor +
        " which is not a function"
    );
  }
  var dummy = createNamedFunction(
    constructor.name || "unknownFunctionName",
    function () {}
  );
  dummy.prototype = constructor.prototype;
  var obj = new dummy();
  var r = constructor.apply(obj, argumentList);
  return r instanceof Object ? r : obj;
}
function runDestructors(destructors) {
  while (destructors.length) {
    var ptr = destructors.pop();
    var del = destructors.pop();
    del(ptr);
  }
}
function craftInvokerFunction(
  humanName,
  argTypes,
  classType,
  cppInvokerFunc,
  cppTargetFunc
) {
  var argCount = argTypes.length;
  if (argCount < 2) {
    throwBindingError(
      "argTypes array size mismatch! Must at least get return value and 'this' types!"
    );
  }
  var isClassMethodFunc = argTypes[1] !== null && classType !== null;
  var needsDestructorStack = false;
  for (var i = 1; i < argTypes.length; ++i) {
    if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
      needsDestructorStack = true;
      break;
    }
  }
  var returns = argTypes[0].name !== "void";
  var argsList = "";
  var argsListWired = "";
  for (var i = 0; i < argCount - 2; ++i) {
    argsList += (i !== 0 ? ", " : "") + "arg" + i;
    argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
  }
  var invokerFnBody =
    "return function " +
    makeLegalFunctionName(humanName) +
    "(" +
    argsList +
    ") {\n" +
    "if (arguments.length !== " +
    (argCount - 2) +
    ") {\n" +
    "throwBindingError('function " +
    humanName +
    " called with ' + arguments.length + ' arguments, expected " +
    (argCount - 2) +
    " args!');\n" +
    "}\n";
  if (needsDestructorStack) {
    invokerFnBody += "var destructors = [];\n";
  }
  var dtorStack = needsDestructorStack ? "destructors" : "null";
  var args1 = [
    "throwBindingError",
    "invoker",
    "fn",
    "runDestructors",
    "retType",
    "classParam",
  ];
  var args2 = [
    throwBindingError,
    cppInvokerFunc,
    cppTargetFunc,
    runDestructors,
    argTypes[0],
    argTypes[1],
  ];
  if (isClassMethodFunc) {
    invokerFnBody +=
      "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
  }
  for (var i = 0; i < argCount - 2; ++i) {
    invokerFnBody +=
      "var arg" +
      i +
      "Wired = argType" +
      i +
      ".toWireType(" +
      dtorStack +
      ", arg" +
      i +
      "); // " +
      argTypes[i + 2].name +
      "\n";
    args1.push("argType" + i);
    args2.push(argTypes[i + 2]);
  }
  if (isClassMethodFunc) {
    argsListWired =
      "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
  }
  invokerFnBody +=
    (returns ? "var rv = " : "") +
    "invoker(fn" +
    (argsListWired.length > 0 ? ", " : "") +
    argsListWired +
    ");\n";
  if (needsDestructorStack) {
    invokerFnBody += "runDestructors(destructors);\n";
  } else {
    for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
      var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
      if (argTypes[i].destructorFunction !== null) {
        invokerFnBody +=
          paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
        args1.push(paramName + "_dtor");
        args2.push(argTypes[i].destructorFunction);
      }
    }
  }
  if (returns) {
    invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n";
  } else {
  }
  invokerFnBody += "}\n";
  args1.push(invokerFnBody);
  var invokerFunction = new_(Function, args1).apply(null, args2);
  return invokerFunction;
}
function ensureOverloadTable(proto, methodName, humanName) {
  if (undefined === proto[methodName].overloadTable) {
    var prevFunc = proto[methodName];
    proto[methodName] = function () {
      if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
        throwBindingError(
          "Function '" +
            humanName +
            "' called with an invalid number of arguments (" +
            arguments.length +
            ") - expects one of (" +
            proto[methodName].overloadTable +
            ")!"
        );
      }
      return proto[methodName].overloadTable[arguments.length].apply(
        this,
        arguments
      );
    };
    proto[methodName].overloadTable = [];
    proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
  }
}
function exposePublicSymbol(name, value, numArguments) {
  if (DwgApi.hasOwnProperty(name)) {
    if (
      undefined === numArguments ||
      (undefined !== DwgApi[name].overloadTable &&
        undefined !== DwgApi[name].overloadTable[numArguments])
    ) {
      throwBindingError("Cannot register public name '" + name + "' twice");
    }
    ensureOverloadTable(DwgApi, name, name);
    if (DwgApi.hasOwnProperty(numArguments)) {
      throwBindingError(
        "Cannot register multiple overloads of a function with the same number of arguments (" +
          numArguments +
          ")!"
      );
    }
    DwgApi[name].overloadTable[numArguments] = value;
  } else {
    DwgApi[name] = value;
    if (undefined !== numArguments) {
      DwgApi[name].numArguments = numArguments;
    }
  }
}
function heap32VectorToArray(count, firstElement) {
  var array = [];
  for (var i = 0; i < count; i++) {
    array.push(HEAP32[(firstElement >> 2) + i]);
  }
  return array;
}
function replacePublicSymbol(name, value, numArguments) {
  if (!DwgApi.hasOwnProperty(name)) {
    throwInternalError("Replacing nonexistant public symbol");
  }
  if (undefined !== DwgApi[name].overloadTable && undefined !== numArguments) {
    DwgApi[name].overloadTable[numArguments] = value;
  } else {
    DwgApi[name] = value;
    DwgApi[name].argCount = numArguments;
  }
}
function dynCallLegacy(sig, ptr, args) {
  var f = DwgApi["dynCall_" + sig];
  return args && args.length
    ? f.apply(null, [ptr].concat(args))
    : f.call(null, ptr);
}
function dynCall(sig, ptr, args) {
  if (sig.includes("j")) {
    return dynCallLegacy(sig, ptr, args);
  }
  return getWasmTableEntry(ptr).apply(null, args);
}
function getDynCaller(sig, ptr) {
  var argCache = [];
  return function () {
    argCache.length = arguments.length;
    for (var i = 0; i < arguments.length; i++) {
      argCache[i] = arguments[i];
    }
    return dynCall(sig, ptr, argCache);
  };
}
function embind__requireFunction(signature, rawFunction) {
  signature = readLatin1String(signature);
  function makeDynCaller() {
    if (signature.includes("j")) {
      return getDynCaller(signature, rawFunction);
    }
    return getWasmTableEntry(rawFunction);
  }
  var fp = makeDynCaller();
  if (typeof fp !== "function") {
    throwBindingError(
      "unknown function pointer with signature " +
        signature +
        ": " +
        rawFunction
    );
  }
  return fp;
}
var UnboundTypeError = undefined;
function getTypeName(type) {
  var ptr = ___getTypeName(type);
  var rv = readLatin1String(ptr);
  _free(ptr);
  return rv;
}
function throwUnboundTypeError(message, types) {
  var unboundTypes = [];
  var seen = {};
  function visit(type) {
    if (seen[type]) {
      return;
    }
    if (registeredTypes[type]) {
      return;
    }
    if (typeDependencies[type]) {
      typeDependencies[type].forEach(visit);
      return;
    }
    unboundTypes.push(type);
    seen[type] = true;
  }
  types.forEach(visit);
  throw new UnboundTypeError(
    message + ": " + unboundTypes.map(getTypeName).join([", "])
  );
}
function __embind_register_function(
  name,
  argCount,
  rawArgTypesAddr,
  signature,
  rawInvoker,
  fn
) {
  var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
  name = readLatin1String(name);
  rawInvoker = embind__requireFunction(signature, rawInvoker);
  exposePublicSymbol(
    name,
    function () {
      throwUnboundTypeError(
        "Cannot call " + name + " due to unbound types",
        argTypes
      );
    },
    argCount - 1
  );
  whenDependentTypesAreResolved([], argTypes, function (argTypes) {
    var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1));
    replacePublicSymbol(
      name,
      craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn),
      argCount - 1
    );
    return [];
  });
}
function integerReadValueFromPointer(name, shift, signed) {
  switch (shift) {
    case 0:
      return signed
        ? function readS8FromPointer(pointer) {
            return HEAP8[pointer];
          }
        : function readU8FromPointer(pointer) {
            return HEAPU8[pointer];
          };
    case 1:
      return signed
        ? function readS16FromPointer(pointer) {
            return HEAP16[pointer >> 1];
          }
        : function readU16FromPointer(pointer) {
            return HEAPU16[pointer >> 1];
          };
    case 2:
      return signed
        ? function readS32FromPointer(pointer) {
            return HEAP32[pointer >> 2];
          }
        : function readU32FromPointer(pointer) {
            return HEAPU32[pointer >> 2];
          };
    default:
      throw new TypeError("Unknown integer type: " + name);
  }
}
function __embind_register_integer(
  primitiveType,
  name,
  size,
  minRange,
  maxRange
) {
  name = readLatin1String(name);
  if (maxRange === -1) {
    maxRange = 4294967295;
  }
  var shift = getShiftFromSize(size);
  var fromWireType = function (value) {
    return value;
  };
  if (minRange === 0) {
    var bitshift = 32 - 8 * size;
    fromWireType = function (value) {
      return (value << bitshift) >>> bitshift;
    };
  }
  var isUnsignedType = name.includes("unsigned");
  registerType(primitiveType, {
    name: name,
    fromWireType: fromWireType,
    toWireType: function (destructors, value) {
      if (typeof value !== "number" && typeof value !== "boolean") {
        throw new TypeError(
          'Cannot convert "' + _embind_repr(value) + '" to ' + this.name
        );
      }
      if (value < minRange || value > maxRange) {
        throw new TypeError(
          'Passing a number "' +
            _embind_repr(value) +
            '" from JS side to C/C++ side to an argument of type "' +
            name +
            '", which is outside the valid range [' +
            minRange +
            ", " +
            maxRange +
            "]!"
        );
      }
      return isUnsignedType ? value >>> 0 : value | 0;
    },
    argPackAdvance: 8,
    readValueFromPointer: integerReadValueFromPointer(
      name,
      shift,
      minRange !== 0
    ),
    destructorFunction: null,
  });
}
function __embind_register_memory_view(rawType, dataTypeIndex, name) {
  var typeMapping = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
  ];
  var TA = typeMapping[dataTypeIndex];
  function decodeMemoryView(handle) {
    handle = handle >> 2;
    var heap = HEAPU32;
    var size = heap[handle];
    var data = heap[handle + 1];
    return new TA(buffer, data, size);
  }
  name = readLatin1String(name);
  registerType(
    rawType,
    {
      name: name,
      fromWireType: decodeMemoryView,
      argPackAdvance: 8,
      readValueFromPointer: decodeMemoryView,
    },
    { ignoreDuplicateRegistrations: true }
  );
}
function __embind_register_std_string(rawType, name) {
  name = readLatin1String(name);
  var stdStringIsUTF8 = name === "std::string";
  registerType(rawType, {
    name: name,
    fromWireType: function (value) {
      var length = HEAPU32[value >> 2];
      var str;
      if (stdStringIsUTF8) {
        var decodeStartPtr = value + 4;
        for (var i = 0; i <= length; ++i) {
          var currentBytePtr = value + 4 + i;
          if (i == length || HEAPU8[currentBytePtr] == 0) {
            var maxRead = currentBytePtr - decodeStartPtr;
            var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
            if (str === undefined) {
              str = stringSegment;
            } else {
              str += String.fromCharCode(0);
              str += stringSegment;
            }
            decodeStartPtr = currentBytePtr + 1;
          }
        }
      } else {
        var a = new Array(length);
        for (var i = 0; i < length; ++i) {
          a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
        }
        str = a.join("");
      }
      _free(value);
      return str;
    },
    toWireType: function (destructors, value) {
      if (value instanceof ArrayBuffer) {
        value = new Uint8Array(value);
      }
      var getLength;
      var valueIsOfTypeString = typeof value === "string";
      if (
        !(
          valueIsOfTypeString ||
          value instanceof Uint8Array ||
          value instanceof Uint8ClampedArray ||
          value instanceof Int8Array
        )
      ) {
        throwBindingError("Cannot pass non-string to std::string");
      }
      if (stdStringIsUTF8 && valueIsOfTypeString) {
        getLength = function () {
          return lengthBytesUTF8(value);
        };
      } else {
        getLength = function () {
          return value.length;
        };
      }
      var length = getLength();
      var ptr = _malloc(4 + length + 1);
      HEAPU32[ptr >> 2] = length;
      if (stdStringIsUTF8 && valueIsOfTypeString) {
        stringToUTF8(value, ptr + 4, length + 1);
      } else {
        if (valueIsOfTypeString) {
          for (var i = 0; i < length; ++i) {
            var charCode = value.charCodeAt(i);
            if (charCode > 255) {
              _free(ptr);
              throwBindingError(
                "String has UTF-16 code units that do not fit in 8 bits"
              );
            }
            HEAPU8[ptr + 4 + i] = charCode;
          }
        } else {
          for (var i = 0; i < length; ++i) {
            HEAPU8[ptr + 4 + i] = value[i];
          }
        }
      }
      if (destructors !== null) {
        destructors.push(_free, ptr);
      }
      return ptr;
    },
    argPackAdvance: 8,
    readValueFromPointer: simpleReadValueFromPointer,
    destructorFunction: function (ptr) {
      _free(ptr);
    },
  });
}
function __embind_register_std_wstring(rawType, charSize, name) {
  name = readLatin1String(name);
  var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
  if (charSize === 2) {
    decodeString = UTF16ToString;
    encodeString = stringToUTF16;
    lengthBytesUTF = lengthBytesUTF16;
    getHeap = function () {
      return HEAPU16;
    };
    shift = 1;
  } else if (charSize === 4) {
    decodeString = UTF32ToString;
    encodeString = stringToUTF32;
    lengthBytesUTF = lengthBytesUTF32;
    getHeap = function () {
      return HEAPU32;
    };
    shift = 2;
  }
  registerType(rawType, {
    name: name,
    fromWireType: function (value) {
      var length = HEAPU32[value >> 2];
      var HEAP = getHeap();
      var str;
      var decodeStartPtr = value + 4;
      for (var i = 0; i <= length; ++i) {
        var currentBytePtr = value + 4 + i * charSize;
        if (i == length || HEAP[currentBytePtr >> shift] == 0) {
          var maxReadBytes = currentBytePtr - decodeStartPtr;
          var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
          if (str === undefined) {
            str = stringSegment;
          } else {
            str += String.fromCharCode(0);
            str += stringSegment;
          }
          decodeStartPtr = currentBytePtr + charSize;
        }
      }
      _free(value);
      return str;
    },
    toWireType: function (destructors, value) {
      if (!(typeof value === "string")) {
        throwBindingError("Cannot pass non-string to C++ string type " + name);
      }
      var length = lengthBytesUTF(value);
      var ptr = _malloc(4 + length + charSize);
      HEAPU32[ptr >> 2] = length >> shift;
      encodeString(value, ptr + 4, length + charSize);
      if (destructors !== null) {
        destructors.push(_free, ptr);
      }
      return ptr;
    },
    argPackAdvance: 8,
    readValueFromPointer: simpleReadValueFromPointer,
    destructorFunction: function (ptr) {
      _free(ptr);
    },
  });
}
function __embind_register_void(rawType, name) {
  name = readLatin1String(name);
  registerType(rawType, {
    isVoid: true,
    name: name,
    argPackAdvance: 0,
    fromWireType: function () {
      return undefined;
    },
    toWireType: function (destructors, o) {
      return undefined;
    },
  });
}
function _abort() {
  abort("");
}
function _emscripten_memcpy_big(dest, src, num) {
  HEAPU8.copyWithin(dest, src, src + num);
}
function emscripten_realloc_buffer(size) {
  try {
    wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16);
    updateGlobalBufferAndViews(wasmMemory.buffer);
    return 1;
  } catch (e) {}
}
function _emscripten_resize_heap(requestedSize) {
  var oldSize = HEAPU8.length;
  requestedSize = requestedSize >>> 0;
  var maxHeapSize = 2147483648;
  if (requestedSize > maxHeapSize) {
    return false;
  }
  for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
    var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
    var newSize = Math.min(
      maxHeapSize,
      alignUp(Math.max(requestedSize, overGrownHeapSize), 65536)
    );
    var replacement = emscripten_realloc_buffer(newSize);
    if (replacement) {
      return true;
    }
  }
  return false;
}
var ENV = {};
function getExecutableName() {
  return thisProgram || "./this.program";
}
function getEnvStrings() {
  if (!getEnvStrings.strings) {
    var lang =
      (
        (typeof navigator === "object" &&
          navigator.languages &&
          navigator.languages[0]) ||
        "C"
      ).replace("-", "_") + ".UTF-8";
    var env = {
      USER: "web_user",
      LOGNAME: "web_user",
      PATH: "/",
      PWD: "/",
      HOME: "/home/web_user",
      LANG: lang,
      _: getExecutableName(),
    };
    for (var x in ENV) {
      if (ENV[x] === undefined) delete env[x];
      else env[x] = ENV[x];
    }
    var strings = [];
    for (var x in env) {
      strings.push(x + "=" + env[x]);
    }
    getEnvStrings.strings = strings;
  }
  return getEnvStrings.strings;
}
function _environ_get(__environ, environ_buf) {
  var bufSize = 0;
  getEnvStrings().forEach(function (string, i) {
    var ptr = environ_buf + bufSize;
    HEAP32[(__environ + i * 4) >> 2] = ptr;
    writeAsciiToMemory(string, ptr);
    bufSize += string.length + 1;
  });
  return 0;
}
function _environ_sizes_get(penviron_count, penviron_buf_size) {
  var strings = getEnvStrings();
  HEAP32[penviron_count >> 2] = strings.length;
  var bufSize = 0;
  strings.forEach(function (string) {
    bufSize += string.length + 1;
  });
  HEAP32[penviron_buf_size >> 2] = bufSize;
  return 0;
}
function _fd_close(fd) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.close(stream);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return e.errno;
  }
}
function _fd_read(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = SYSCALLS.doReadv(stream, iov, iovcnt);
    HEAP32[pnum >> 2] = num;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return e.errno;
  }
}
function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var HIGH_OFFSET = 4294967296;
    var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
    var DOUBLE_LIMIT = 9007199254740992;
    if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
      return -61;
    }
    FS.llseek(stream, offset, whence);
    (tempI64 = [
      stream.position >>> 0,
      ((tempDouble = stream.position),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0),
    ]),
      (HEAP32[newOffset >> 2] = tempI64[0]),
      (HEAP32[(newOffset + 4) >> 2] = tempI64[1]);
    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return e.errno;
  }
}
function _fd_write(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = SYSCALLS.doWritev(stream, iov, iovcnt);
    HEAP32[pnum >> 2] = num;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) throw e;
    return e.errno;
  }
}
function _setTempRet0(val) {
  setTempRet0(val);
}
function __isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function __arraySum(array, index) {
  var sum = 0;
  for (var i = 0; i <= index; sum += array[i++]) {}
  return sum;
}
var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function __addDays(date, days) {
  var newDate = new Date(date.getTime());
  while (days > 0) {
    var leap = __isLeapYear(newDate.getFullYear());
    var currentMonth = newDate.getMonth();
    var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[
      currentMonth
    ];
    if (days > daysInCurrentMonth - newDate.getDate()) {
      days -= daysInCurrentMonth - newDate.getDate() + 1;
      newDate.setDate(1);
      if (currentMonth < 11) {
        newDate.setMonth(currentMonth + 1);
      } else {
        newDate.setMonth(0);
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
    } else {
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    }
  }
  return newDate;
}
function _strftime(s, maxsize, format, tm) {
  var tm_zone = HEAP32[(tm + 40) >> 2];
  var date = {
    tm_sec: HEAP32[tm >> 2],
    tm_min: HEAP32[(tm + 4) >> 2],
    tm_hour: HEAP32[(tm + 8) >> 2],
    tm_mday: HEAP32[(tm + 12) >> 2],
    tm_mon: HEAP32[(tm + 16) >> 2],
    tm_year: HEAP32[(tm + 20) >> 2],
    tm_wday: HEAP32[(tm + 24) >> 2],
    tm_yday: HEAP32[(tm + 28) >> 2],
    tm_isdst: HEAP32[(tm + 32) >> 2],
    tm_gmtoff: HEAP32[(tm + 36) >> 2],
    tm_zone: tm_zone ? UTF8ToString(tm_zone) : "",
  };
  var pattern = UTF8ToString(format);
  var EXPANSION_RULES_1 = {
    "%c": "%a %b %d %H:%M:%S %Y",
    "%D": "%m/%d/%y",
    "%F": "%Y-%m-%d",
    "%h": "%b",
    "%r": "%I:%M:%S %p",
    "%R": "%H:%M",
    "%T": "%H:%M:%S",
    "%x": "%m/%d/%y",
    "%X": "%H:%M:%S",
    "%Ec": "%c",
    "%EC": "%C",
    "%Ex": "%m/%d/%y",
    "%EX": "%H:%M:%S",
    "%Ey": "%y",
    "%EY": "%Y",
    "%Od": "%d",
    "%Oe": "%e",
    "%OH": "%H",
    "%OI": "%I",
    "%Om": "%m",
    "%OM": "%M",
    "%OS": "%S",
    "%Ou": "%u",
    "%OU": "%U",
    "%OV": "%V",
    "%Ow": "%w",
    "%OW": "%W",
    "%Oy": "%y",
  };
  for (var rule in EXPANSION_RULES_1) {
    pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
  }
  var WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function leadingSomething(value, digits, character) {
    var str = typeof value === "number" ? value.toString() : value || "";
    while (str.length < digits) {
      str = character[0] + str;
    }
    return str;
  }
  function leadingNulls(value, digits) {
    return leadingSomething(value, digits, "0");
  }
  function compareByDay(date1, date2) {
    function sgn(value) {
      return value < 0 ? -1 : value > 0 ? 1 : 0;
    }
    var compare;
    if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
      if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
        compare = sgn(date1.getDate() - date2.getDate());
      }
    }
    return compare;
  }
  function getFirstWeekStartDate(janFourth) {
    switch (janFourth.getDay()) {
      case 0:
        return new Date(janFourth.getFullYear() - 1, 11, 29);
      case 1:
        return janFourth;
      case 2:
        return new Date(janFourth.getFullYear(), 0, 3);
      case 3:
        return new Date(janFourth.getFullYear(), 0, 2);
      case 4:
        return new Date(janFourth.getFullYear(), 0, 1);
      case 5:
        return new Date(janFourth.getFullYear() - 1, 11, 31);
      case 6:
        return new Date(janFourth.getFullYear() - 1, 11, 30);
    }
  }
  function getWeekBasedYear(date) {
    var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
    var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
    var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
    var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
    var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
    if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
      if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
        return thisDate.getFullYear() + 1;
      } else {
        return thisDate.getFullYear();
      }
    } else {
      return thisDate.getFullYear() - 1;
    }
  }
  var EXPANSION_RULES_2 = {
    "%a": function (date) {
      return WEEKDAYS[date.tm_wday].substring(0, 3);
    },
    "%A": function (date) {
      return WEEKDAYS[date.tm_wday];
    },
    "%b": function (date) {
      return MONTHS[date.tm_mon].substring(0, 3);
    },
    "%B": function (date) {
      return MONTHS[date.tm_mon];
    },
    "%C": function (date) {
      var year = date.tm_year + 1900;
      return leadingNulls((year / 100) | 0, 2);
    },
    "%d": function (date) {
      return leadingNulls(date.tm_mday, 2);
    },
    "%e": function (date) {
      return leadingSomething(date.tm_mday, 2, " ");
    },
    "%g": function (date) {
      return getWeekBasedYear(date).toString().substring(2);
    },
    "%G": function (date) {
      return getWeekBasedYear(date);
    },
    "%H": function (date) {
      return leadingNulls(date.tm_hour, 2);
    },
    "%I": function (date) {
      var twelveHour = date.tm_hour;
      if (twelveHour == 0) twelveHour = 12;
      else if (twelveHour > 12) twelveHour -= 12;
      return leadingNulls(twelveHour, 2);
    },
    "%j": function (date) {
      return leadingNulls(
        date.tm_mday +
          __arraySum(
            __isLeapYear(date.tm_year + 1900)
              ? __MONTH_DAYS_LEAP
              : __MONTH_DAYS_REGULAR,
            date.tm_mon - 1
          ),
        3
      );
    },
    "%m": function (date) {
      return leadingNulls(date.tm_mon + 1, 2);
    },
    "%M": function (date) {
      return leadingNulls(date.tm_min, 2);
    },
    "%n": function () {
      return "\n";
    },
    "%p": function (date) {
      if (date.tm_hour >= 0 && date.tm_hour < 12) {
        return "AM";
      } else {
        return "PM";
      }
    },
    "%S": function (date) {
      return leadingNulls(date.tm_sec, 2);
    },
    "%t": function () {
      return "\t";
    },
    "%u": function (date) {
      return date.tm_wday || 7;
    },
    "%U": function (date) {
      var janFirst = new Date(date.tm_year + 1900, 0, 1);
      var firstSunday =
        janFirst.getDay() === 0
          ? janFirst
          : __addDays(janFirst, 7 - janFirst.getDay());
      var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
      if (compareByDay(firstSunday, endDate) < 0) {
        var februaryFirstUntilEndMonth =
          __arraySum(
            __isLeapYear(endDate.getFullYear())
              ? __MONTH_DAYS_LEAP
              : __MONTH_DAYS_REGULAR,
            endDate.getMonth() - 1
          ) - 31;
        var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
        var days =
          firstSundayUntilEndJanuary +
          februaryFirstUntilEndMonth +
          endDate.getDate();
        return leadingNulls(Math.ceil(days / 7), 2);
      }
      return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
    },
    "%V": function (date) {
      var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
      var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
      var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
      var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
      var endDate = __addDays(
        new Date(date.tm_year + 1900, 0, 1),
        date.tm_yday
      );
      if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
        return "53";
      }
      if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
        return "01";
      }
      var daysDifference;
      if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
        daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate();
      } else {
        daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate();
      }
      return leadingNulls(Math.ceil(daysDifference / 7), 2);
    },
    "%w": function (date) {
      return date.tm_wday;
    },
    "%W": function (date) {
      var janFirst = new Date(date.tm_year, 0, 1);
      var firstMonday =
        janFirst.getDay() === 1
          ? janFirst
          : __addDays(
              janFirst,
              janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1
            );
      var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
      if (compareByDay(firstMonday, endDate) < 0) {
        var februaryFirstUntilEndMonth =
          __arraySum(
            __isLeapYear(endDate.getFullYear())
              ? __MONTH_DAYS_LEAP
              : __MONTH_DAYS_REGULAR,
            endDate.getMonth() - 1
          ) - 31;
        var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
        var days =
          firstMondayUntilEndJanuary +
          februaryFirstUntilEndMonth +
          endDate.getDate();
        return leadingNulls(Math.ceil(days / 7), 2);
      }
      return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
    },
    "%y": function (date) {
      return (date.tm_year + 1900).toString().substring(2);
    },
    "%Y": function (date) {
      return date.tm_year + 1900;
    },
    "%z": function (date) {
      var off = date.tm_gmtoff;
      var ahead = off >= 0;
      off = Math.abs(off) / 60;
      off = (off / 60) * 100 + (off % 60);
      return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
    },
    "%Z": function (date) {
      return date.tm_zone;
    },
    "%%": function () {
      return "%";
    },
  };
  for (var rule in EXPANSION_RULES_2) {
    if (pattern.includes(rule)) {
      pattern = pattern.replace(
        new RegExp(rule, "g"),
        EXPANSION_RULES_2[rule](date)
      );
    }
  }
  var bytes = intArrayFromString(pattern, false);
  if (bytes.length > maxsize) {
    return 0;
  }
  writeArrayToMemory(bytes, s);
  return bytes.length - 1;
}
function _strftime_l(s, maxsize, format, tm) {
  return _strftime(s, maxsize, format, tm);
}
var FSNode = function (parent, name, mode, rdev) {
  if (!parent) {
    parent = this;
  }
  this.parent = parent;
  this.mount = parent.mount;
  this.mounted = null;
  this.id = FS.nextInode++;
  this.name = name;
  this.mode = mode;
  this.node_ops = {};
  this.stream_ops = {};
  this.rdev = rdev;
};
var readMode = 292 | 73;
var writeMode = 146;
Object.defineProperties(FSNode.prototype, {
  read: {
    get: function () {
      return (this.mode & readMode) === readMode;
    },
    set: function (val) {
      val ? (this.mode |= readMode) : (this.mode &= ~readMode);
    },
  },
  write: {
    get: function () {
      return (this.mode & writeMode) === writeMode;
    },
    set: function (val) {
      val ? (this.mode |= writeMode) : (this.mode &= ~writeMode);
    },
  },
  isFolder: {
    get: function () {
      return FS.isDir(this.mode);
    },
  },
  isDevice: {
    get: function () {
      return FS.isChrdev(this.mode);
    },
  },
});
FS.FSNode = FSNode;
FS.staticInit();
embind_init_charCodes();
BindingError = DwgApi["BindingError"] = extendError(Error, "BindingError");
InternalError = DwgApi["InternalError"] = extendError(Error, "InternalError");
init_emval();
UnboundTypeError = DwgApi["UnboundTypeError"] = extendError(
  Error,
  "UnboundTypeError"
);
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}
var asmLibraryArg = {
  a: ___assert_fail,
  j: ___syscall_fcntl64,
  E: ___syscall_fstat64,
  C: ___syscall_fstatat64,
  x: ___syscall_ioctl,
  B: ___syscall_lstat64,
  A: ___syscall_open,
  y: ___syscall_rmdir,
  D: ___syscall_stat64,
  z: ___syscall_unlink,
  p: __embind_register_bigint,
  m: __embind_register_bool,
  l: __embind_register_emval,
  g: __embind_register_float,
  f: __embind_register_function,
  c: __embind_register_integer,
  b: __embind_register_memory_view,
  h: __embind_register_std_string,
  e: __embind_register_std_wstring,
  o: __embind_register_void,
  d: _abort,
  r: _emscripten_memcpy_big,
  s: _emscripten_resize_heap,
  u: _environ_get,
  v: _environ_sizes_get,
  k: _fd_close,
  w: _fd_read,
  n: _fd_seek,
  i: _fd_write,
  q: _setTempRet0,
  t: _strftime_l,
};
var asm = createWasm();
var ___wasm_call_ctors = (DwgApi["___wasm_call_ctors"] = function () {
  return (___wasm_call_ctors = DwgApi["___wasm_call_ctors"] =
    DwgApi["asm"]["G"]).apply(null, arguments);
});
var _malloc = (DwgApi["_malloc"] = function () {
  return (_malloc = DwgApi["_malloc"] = DwgApi["asm"]["H"]).apply(
    null,
    arguments
  );
});
var _free = (DwgApi["_free"] = function () {
  return (_free = DwgApi["_free"] = DwgApi["asm"]["J"]).apply(null, arguments);
});
var ___errno_location = (DwgApi["___errno_location"] = function () {
  return (___errno_location = DwgApi["___errno_location"] =
    DwgApi["asm"]["K"]).apply(null, arguments);
});
var ___getTypeName = (DwgApi["___getTypeName"] = function () {
  return (___getTypeName = DwgApi["___getTypeName"] = DwgApi["asm"]["L"]).apply(
    null,
    arguments
  );
});
var ___embind_register_native_and_builtin_types = (DwgApi[
  "___embind_register_native_and_builtin_types"
] = function () {
  return (___embind_register_native_and_builtin_types = DwgApi[
    "___embind_register_native_and_builtin_types"
  ] =
    DwgApi["asm"]["M"]).apply(null, arguments);
});
var dynCall_jiji = (DwgApi["dynCall_jiji"] = function () {
  return (dynCall_jiji = DwgApi["dynCall_jiji"] = DwgApi["asm"]["N"]).apply(
    null,
    arguments
  );
});
var dynCall_viijii = (DwgApi["dynCall_viijii"] = function () {
  return (dynCall_viijii = DwgApi["dynCall_viijii"] = DwgApi["asm"]["O"]).apply(
    null,
    arguments
  );
});
var dynCall_iiiiij = (DwgApi["dynCall_iiiiij"] = function () {
  return (dynCall_iiiiij = DwgApi["dynCall_iiiiij"] = DwgApi["asm"]["P"]).apply(
    null,
    arguments
  );
});
var dynCall_iiiiijj = (DwgApi["dynCall_iiiiijj"] = function () {
  return (dynCall_iiiiijj = DwgApi["dynCall_iiiiijj"] =
    DwgApi["asm"]["Q"]).apply(null, arguments);
});
var dynCall_iiiiiijj = (DwgApi["dynCall_iiiiiijj"] = function () {
  return (dynCall_iiiiiijj = DwgApi["dynCall_iiiiiijj"] =
    DwgApi["asm"]["R"]).apply(null, arguments);
});
var calledRun;
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}
dependenciesFulfilled = function runCaller() {
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller;
};
function run(args) {
  args = args || arguments_;
  if (runDependencies > 0) {
    return;
  }
  preRun();
  if (runDependencies > 0) {
    return;
  }
  function doRun() {
    if (calledRun) return;
    calledRun = true;
    DwgApi["calledRun"] = true;
    if (ABORT) return;
    initRuntime();
    if (DwgApi["onRuntimeInitialized"]) DwgApi["onRuntimeInitialized"]();
    postRun();
  }
  if (DwgApi["setStatus"]) {
    DwgApi["setStatus"]("Running...");
    setTimeout(function () {
      setTimeout(function () {
        DwgApi["setStatus"]("");
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
}
DwgApi["run"] = run;
if (DwgApi["preInit"]) {
  if (typeof DwgApi["preInit"] == "function")
    DwgApi["preInit"] = [DwgApi["preInit"]];
  while (DwgApi["preInit"].length > 0) {
    DwgApi["preInit"].pop()();
  }
}
run();

//export default DwgApi;
