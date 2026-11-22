import{mkdirSync as M,readdirSync as D,readFileSync as R,writeFileSync as W}from'node:fs'
const T='AJZCDEFG        EEEEEEECEEECEEE EEE             QSSQA           CE              CCBC'
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',A=Int32Array
function exec(id){
const g=R(`${I}/${id}/program.bin`),x=R(`${I}/${id}/input.bin`),n=g.length,d=`${O}/${id}`
const s=new A(256),w=new A(256),c=new A(64),out=new Uint8Array(65536)
let p=0,r=0,o=0,k=0,i=0,st=0,t=0
const F=e=>{M(d,{recursive:true});W(d+'/stdout.bin',out.subarray(0,o));W(d+'/exit.txt',e+'\n')}
for(;;){
if(st===1e6)return F(10)
if(i<0||i>=n)return F(9)
const op=g[i],m=T.charCodeAt(op)-65
if(!(m>=0))return F(5)
const im=[0,1,2,4][m>>3]
if(i+im>=n)return F(9)
st++
if(p<((m>>1)&3))return F(2)
if((m&1)&&p===256)return F(3)
const q=i+1;i+=1+im
if(op>15&&op<35){
if(op===23||op===27){s[p-1]=op<24?-s[p-1]:~s[p-1];continue}
const b=s[p-1],a=s[p-2],u=a>>>0,v=b>>>0
if(op>18&&op<23&&!b)return F(4)
s[--p-1]=op<17?a+b:op<18?a-b:op<19?Math.imul(a,b):op<20?a/b:op<21?a%b:op<22?u/v:op<23?u%v:op<25?a&b:op<26?a|b:op<27?a^b:op<29?a<<b:op<30?a>>b:op<31?a>>>b:op<33?+(a===b):op<34?+(a<b):+(u<v)
continue
}

switch(op){
case 0:return F(0)
case 1:case 2:s[p++]=op<2?g.readInt8(q):g.readInt32LE(q);break
case 3:p--;break
case 4:case 6:s[p]=s[p-(op<5?1:2)];p++;break
case 5:t=s[p-1];s[p-1]=s[p-2];s[p-2]=t;break
case 7:t=s[p-3];s[p-3]=s[p-2];s[p-2]=s[p-1];s[p-1]=t;break
case 48:case 49:case 50:if(op<49||(op<50?!s[--p]:s[--p]))i+=g.readInt16LE(q);break
case 51:if(r>63)return F(7);c[r++]=i;i=g.readUInt16LE(q);break
case 52:if(!r)return F(8);i=c[--r];break
case 64:case 65:if((t=s[p-1])&-256)return F(6);op<65?s[p-1]=w[t]:(w[t]=s[p-2],p-=2);break
case 80:{const z=Buffer.from(''+s[p-1]);if(o+z.length>65536)return F(11);p--;out.set(z,o);o+=z.length;break}
case 81:if(o>65535)return F(11);out[o++]=s[--p];break
case 82:s[p++]=k<x.length?x[k++]:-1;break
case 83:return F(s[--p]&255)
}}}
for(const id of D(I).sort())exec(id)
