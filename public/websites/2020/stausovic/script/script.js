function sta(){function a(a){for(let b=a.length-1;0<b;b--){const c=Math.floor(Math.random()*(b+1));[a[b],a[c]]=[a[c],a[b]]}}function b(a,b,e){this.x=a,this.y=b,this.s=e,this.draw=function(){c.beginPath(),c.strokeStyle="#DFDFDF",c.moveTo(this.x+535,this.y+265),c.lineTo(this.x+665,this.y+265),c.stroke(),c.beginPath(),c.strokeStyle="#DFDFDF",c.moveTo(this.x+575,this.y+255),c.lineTo(this.x+625,this.y+255),c.stroke()},this.update=function(){this.x-=this.s,this.draw()}}function e(a,b,e){this.x=a,this.y=b,this.s=e,this.draw=function(){c.beginPath(),c.strokeStyle="#DFDFDF",c.moveTo(this.x+535,this.y+235),c.lineTo(this.x+565,this.y+235),c.stroke()},this.update=function(){this.x-=this.s,this.draw()}}function f(a,b,c){this.m=a,this.x=b,this.y=c,this.draw=function(){let b=Math.floor(G%2);C.drawImage(a,b*H,0,H,I,this.x,this.y,H,I),G+=K},this.update=function(){this.draw()}}function g(a,b,c,e){this.x=a,this.y=b,this.r=c,this.s=e,this.draw=function(){B.beginPath(),B.lineWidth="1",B.arc(this.x,this.y,this.r,0,2*Math.PI,!1),B.strokeStyle="#535353",B.stroke()},this.update=function(){this.x-=this.s,this.draw()}}function h(a,b,c){this.x=a,this.y=b,this.s=c,this.draw=function(){C.fillStyle="#535353",C.font="bold 18px Monospace",C.fillText("Igor Matovi\u010D",this.x,this.y)},this.update=function(){this.x-=this.s,this.draw()}}function j(a,b,c,e){this.x=a,this.y=b,this.s=c,this.t=e,this.draw=function(){C.font="14px Monospace",C.fillText(this.t,this.x,this.y)},this.update=function(){this.x-=this.s,this.draw()}}function k(a,b,c){this.x=a,this.y=b,this.s=c,this.draw=function(){B.strokeStyle="#535353",B.lineWidth="1",B.strokeRect(this.x,this.y,225,150)},this.update=function(){this.x-=this.s,this.draw()}}function n(a,b,c){this.x=a,this.y=b,this.s=c,this.draw=function(){B.fillStyle="#f7f7f7",B.fillRect(this.x,this.y,225,150)},this.update=function(){this.x-=this.s,this.draw()}}function o(a,b,c,e,f){this.x=a,this.y=b,this.sx=c,this.sy=e,this.s=f,this.draw=function(){B.fillStyle="#535353",B.fillRect(this.x,this.y,this.sx,this.sy)},this.update=function(){this.x-=this.s,this.draw()}}function p(a,b,c){this.cn=a,this.x=b,this.y=c,this.draw=function(){B.fillStyle="#535353",B.font="40px Monospace",B.fillText(this.cn,this.x,this.y)},this.update=function(){this.draw()}}function q(a,b,c){this.cn=a,this.x=b,this.y=c,this.draw=function(){B.fillStyle="#535353",B.font="15px Monospace",B.fillText(this.cn,this.x,this.y)},this.update=function(){this.draw()}}function r(a,b,c,e,f,g){this.cn_1=a,this.cn_2=b,this.cn_3=c,this.x=e,this.y=f,this.s=g,this.draw=function(){B.fillStyle="#535353",B.font="21px Monospace",B.fillText(this.cn_1,this.x,this.y),B.fillStyle="#535353",B.font="21px Monospace",B.fillText(this.cn_2,this.x,this.y+30),B.fillStyle="#535353",B.font="21px Monospace",B.fillText(this.cn_3,this.x,this.y+60)},this.update=function(){this.x-=this.s,this.draw()}}function t(a,b,c,e){return Math.sqrt(Math.pow(c-a,2)+Math.pow(e-b,2))}function u(){function b(){o||(K=0,requestAnimationFrame(b),X.y*=.88,10>X.y&&(o=!0,e()))}function e(){r||(requestAnimationFrame(e),X.y*=1.12,300<X.y&&(X.y=300,r=!0,K=.15))}function g(a){a=a||window.event,290<X.y&&("38"==a.keyCode&&b(),"32"==a.keyCode&&b())}if(!Y){requestAnimationFrame(u),B.clearRect(0,0,v.width,v.height),c.clearRect(0,0,v.width,v.height),C.clearRect(0,0,v.width,v.height),D.clearRect(0,0,A.width,A.height);for(var h=0;h<O.length;h++)M[h].update(),N[h].update(),S[h].update(),O[h].update(),P[h].update(),Q[h].update(),R[h].update(),T[h].update(),U[h].update(),a[h].update(),100>t(X.x,X.y,O[h].x,O[h].y)&&(Y=!0,document.getElementById("sc").style.display="flex",document.getElementById("ag").style.display="flex");for(var j=0,k="statusov",m=0;-100>O[m].x;m++)j+=1;var j=new p(j.toString(),660,100);j.update(),1<=m&&(k="status"),2<=m&&(k="statusy"),5<=m&&(k="statusov");var n=new q(k,710,90);n.update(),X.update(),l.update(),x.update(),x.end+=25,800<x.end&&(x.end=800);var o=!1,r=!1;document.onkeydown=g,document.body.addEventListener("touchstart",function(){290<X.y&&b()})}}document.getElementById("sc").style.display="none",document.getElementById("ag").style.display="none";var v=document.getElementById("ca_1"),w=document.getElementById("ca_2"),z=document.getElementById("ca_3"),A=document.getElementById("ca_4");v.width=800,v.height=500,w.width=800,w.height=500,z.width=800,z.height=500,A.width=800,A.height=500;var B=v.getContext("2d"),c=w.getContext("2d"),C=z.getContext("2d"),D=A.getContext("2d"),E=[{t1:"\xDAspe\u0161n\xFD de\u0148,",t2:"nasral som",t3:"kopu \u013Eud\xED."},{t1:"Zomknime sa",t2:"a vykr\xFA\u0165me",t3:"hnusobe krk."},{t1:"Pokazili sme ",t2:"si to.",t3:""},{t1:"NEVESTY, DOBRE",t2:"BUDE.",t3:""},{t1:"Idem si",t2:"postavi\u0165 krb.",t3:""},{t1:"Neser a podp\xED\u0161",t2:"mu to.",t3:""},{t1:"Zbehli sa v\u0161etci",t2:"m\xFAdrosr\xE1\u010Di sveta.",t3:""},{t1:"Mil\xED svalovci,",t2:"nikto na v\xE1s",t3:"nezabudo."},{t1:"Pelle testoval",t2:"denne 250 \u013Eud\xED.",t3:"Ja 2000."},{t1:"Tento primit\xEDv",t2:"sa tla\u010Dil na",t3:"na\u0161u kandid\xE1tku."},{t1:"Nem\xE1 na to",t2:"ment\xE1lnu v\xFDbavu.",t3:""},{t1:"Tento status by",t2:"som nenap\xEDsal,",t3:"ale..."},{t1:"Dilinko si",t2:"obtiera papulu",t3:"o moju Pavl\xEDnku."},{t1:"*Fotka chleb\xEDka",t2:"s cibu\u013Ekou*",t3:""},{t1:"*Fotka na",t2:"motorke",t3:"v Bruseli.*"},{t1:"Hi everybody,",t2:"I\u2019m Igor from",t3:"Slovakia."},{t1:"One time,",t2:"next time.",t3:""},{t1:"Lajf? Ou nou.",t2:"",t3:""},{t1:"Ri\u0161o si",t2:"v pohode odi\u0161iel",t3:"na obed\xEDk."},{t1:"Mus\xEDme sa",t2:"hraju\u0161ka\u0165 na",t3:"percent\xED\u010Dka?"},{t1:"Ri\u0161o bude",t2:"osobne kopa\u0165",t3:"hroby?"},{t1:"Mongolsko nebude",t2:"ma\u0165 pandemick\xFD",t3:"pl\xE1n."},{t1:"Ri\u0161o sa \u0161p\xE1ra",t2:"hrdzavou d\xFD\u010Dkou.",t3:""},{t1:"\u010Cak\xE1m",t2:"na splenenie",t3:"dom\xE1cej \xFAlohy."},{t1:"Ri\u0161o rob\xED",t2:"\u201Etr\xE1pnu\u010Dk\xE9 ",t3:"naschv\xE1ly.\u201C"},{t1:"Myslel som si",t2:"\u017Ee sa Ri\u0161o",t3:"pochlap\xED."},{t1:"Ri\u0161o je mal\xFD ",t2:"nezodpovedn\xFD",t3:"chlapec."},{t1:"Ri\u0161o, pom\xE1haj",t2:"a neubli\u017Euj.",t3:"D\xEDk."},{t1:"Ri\u0161o",t2:"tu odkazuje",t3:"spod slne\u010Dn\xEDka."}];a(E);let F=new Image;F.src="10kb_sulik.png";let m=new Image;m.src="10kb_matovic.png";let G=0,H=150,I=150,J=0;var K=.15,L=300,y=5,M=[],N=[],O=[],P=[],Q=[],R=[],S=[],T=[],U=[],a=[],V=0;for(d=0;2>d;d++)for(i=0;i<E.length;i++){1===d&&(V=O[E.length-1].x);var W=V+1e3+1200*i+Math.floor(400*Math.random());O.push(new k(W,L,y+=.2)),a.push(new r(E[i].t1,E[i].t2,E[i].t3,W+13,L+75,y)),M.push(new o(W-500,L+175,Math.floor(100*Math.random()),1,y)),N.push(new o(W-1e3,L+175,Math.floor(100*Math.random()),1,y)),P.push(new g(W+30,L+30,20,y)),Q.push(new h(W+60,L+25,y)),T.push(new b(W,50,3)),U.push(new e(W-1e3,50,2.8)),R.push(new j(W+60,L+45,y,Math.floor(23*Math.random())+1+" h")),S.push(new n(W,L,y))}var x=new function(a,b){this.str=a,this.end=b,this.draw=function(){c.beginPath(),c.strokeStyle="#535353",c.lineWidth="1",c.moveTo(this.str,425),c.lineTo(this.end,425),c.stroke()},this.update=function(){this.draw()}}(0,10),l=new function(a,b,c){this.m_2=a,this.x=b,this.y=c,this.draw=function(){let b=Math.floor(J%2);D.drawImage(a,b*H,0,H,I,this.x,this.y,H,I),J+=.15},this.update=function(){this.draw()}}(m,0,0);let X;var Y=!1;(function(){X=new f(F,50,300)})(),u()}sta();