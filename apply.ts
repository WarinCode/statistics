// npm i -g typescript
// ts-node apply.ts
// tsc apply.ts

export class Statistics {
    public classinterval:number[];
    public mid_point:Function; 
    public data:number[];
    public sortdata:number[];
    public frequency:number[];
    public cumulative:Function;
    public cumulative_frequency:number[];
    public n:Function;
    public I:number;
    public W:number[];
        public constructor(
            xi:number[] = [],
            fi:number[] = [],
            ci:number[] = [],
            wi:number[] = [],
            cf:number[] = [fi[0]],
            ){
            this.classinterval = ci;                    
            this.data = xi;
            this.sortdata = [...this.data].sort((x:number , y:number) => x - y);                
            this.frequency = fi;
            this.mid_point = (middle:number[] = []) => {
                if(xi.length === 0){
                    for(let i:number = 0; i < ci.length / 2; i++){
                    let j:number = i;
                    if(i == 0) middle[i] = (ci[i] + ci[i + 1]) / 2;
                        else {
                            middle[i] = (ci[i + j] + ci[i + j + 1 ]) / 2;
                        }
                    }
                }        
                return middle;
            }
            this.n = (number:number = 0):number => {
                if(this.frequency.length == 0){
                    number = this.data.length;
                } else if(this.frequency.length != 0) {
                    this.frequency.map((i:number) => number += i);
                }
                return number;
            }
            this.cumulative = (f:number[] = [fi[0]]):number[] => {
                for(let c:number = 1; c < fi.length; c++){
                    f[c] = fi[c] += fi[c - 1];
                    cf.push(f[c]);
                }
                for(let ov:number = fi.length - 1; ov > 0;  ov--){
                    fi[ov] = fi[ov] - cf[ov - 1];
                }
                return cf;
            }
            this.cumulative_frequency = this.cumulative();
            this.W = wi;
            this.I = ci[1] - ci[0] + 1;
        }

        public Mean = (x̄:number = 0 , x:number[] = this.sortdata , Σx:number = 0 , n:number = this.n() , f:number[] = this.frequency , Σxf:number = 0 , w:number[] = this.W , Σwx:number = 0 , Σw:number = 0):number => {
            if(this.data.length === 0) x = this.mid_point();
            if(x.length > 0 && f.length === 0 && w.length === 0 ){
                for(let i:number = 0; n > i; i++){
                    Σx += x[i];
                }
                    x̄ = Σx / n; 
            } else if(f.length !== 0 && w.length === 0){
                for(let k in x){
                    Σxf += x[k] * f[k];
                }
                    x̄ = Σxf / n;
            } else if(w.length !== 0){
                x = this.data;
                for(let u in w){
                    Σwx += w[u] * x[u];
                    Σw += w[u];
                }
                    x̄ = Σwx / Σw;
            }
             return x̄; 
        }
        
        public Median = (Med:number = 0 , n:number = this.n() , l:number = 0 , i:number = this.I , x:number[] = this.sortdata , f:number[] = this.frequency , Σfl:number = 0 , fm:number = 0 , positionMed:(number|string) = 0):number => {
            if(x.length > 0 && f.length === 0){
                n % 2 !== 0 ? Med = this.sortdata[Math.floor(n / 2)] : Med = (this.sortdata[Math.floor((n - 1) / 2)] + this.sortdata[Math.floor((n + 1) / 2)]) / 2;
            } else {
                    positionMed = n / 2;         
                if(this.classinterval.length === 0){
                    let search:number[] = this.cumulative_frequency.filter(item => item < positionMed);
                        Med = x[search.length];
                } else {
                    let search:number[] = this.cumulative_frequency.filter(item => item < positionMed);
                    if(this.classinterval.length === 0) l = x[search.length * 2] - 0.5;   
                    else l = this.classinterval[search.length * 2] - 0.5;                   
                    Σfl = this.cumulative_frequency[search.length - 1];
                    fm = this.frequency[search.length];
                        Med = l + i * ((positionMed - Σfl) / fm);                    
                }
            }
            return Med;
        }

        public Mode = (Mode:number = 0 , count:any = {} , max:number = 0 , x:number[] = this.sortdata , f:number[] = this.frequency , n:number = this.n() , d1:number = 0 , d2:number = 0  , l:number = 0 , i:number  = this.I):number => {
            if(x.length > 0 && f.length === 0){
                    let Mo:string[] = []; 
                    for(let i in this.sortdata){ 
                    count[this.sortdata[i]] = (count[this.sortdata[i]] || 0) + 1;
                if(count[this.sortdata[i]] > max) max = count[this.sortdata[i]];
            }
                for(let j in count){ 
                    if(count[j] == max) Mo.push(j);
            }
            } else if(f.length !== 0){
                if(this.classinterval.length === 0){
                    let Maximum_frequency:number = Math.max(...f);
                    Mode = x[f.indexOf(Maximum_frequency)];
                } else {
                    let Maximum_frequency:number = Math.max(...f);
                    l = this.classinterval[f.indexOf(Maximum_frequency) * 2] - 0.5;
                    d1 = f[f.indexOf(Maximum_frequency)] - f[f.indexOf(Maximum_frequency) - 1];
                    d2 = f[f.indexOf(Maximum_frequency)] - f[f.indexOf(Maximum_frequency) + 1]; 
                    Mode = l + i * (d1 / (d1 + d2));          
                }
            }
            return Mode;
        }
        
        public Mid_range = (range:number = 0 , x:number[] = this.sortdata , n:number = this.sortdata.length , Xmax:number = 0, Xmin:number = 0):number => {
            Xmax = x[n - 1];
            Xmin = x[n - n];
                range = (Xmax + Xmin) / 2; 
            return range;
        }

        public Range = (R:number = 0 , Xmax = 0 , Xmin = 0 , x:number[] = this.sortdata , f:number[] = this.frequency , c:number[] = this.classinterval):number=> {
            if(x.length > 0 && f.length === 0){
                Xmax = x[this.data.length - 1];
                Xmin = x[0];
            } else if(f.length !== 0 && c.length !== 0){
                Xmax = (Math.max(...c) + 0.5);
                Xmin = (Math.min(...c) - 0.5);
            }
                R = Xmax - Xmin;
            return R;
        }

        public Geometric_mean = (GM:number = 0 , x:number[] = this.data , n:number = this.data.length , Σx:number = 1):number => {
            for(let i in x){
                Σx *= x[i];
            }
                GM = Σx ** (1 / n);
            return GM;
        }

        public Harmonic_mean = (HM:number = 0 , x:number[] = this.data , n:number = this.n() , Σx:number = 0 , f:number[] = this.frequency , Σx2:number = 0):number => {
            if(f.length === 0){
                for(let k:number = 0; k < n; k++){
                    Σx += 1 / x[k];
                }
                    HM = n / Σx ;                
            } else if(f.length !== 0) {
                if(this.data.length === 0) x = this.mid_point();
                for(let g in x){
                    Σx2 += Number(f[g] / x[g]);
                }
                    HM = n / Σx2;
            }
            return HM;
        }        

        public Qr = (r:number = 0 , Qr:number = 0 , position_Qr:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , l:number = 0 , i:number  = this.I , Σfl:number = 0 , fq:number = 0):number => {
                if(x.length > 0 && this.classinterval.length === 0){
                    position_Qr = r *(n + 1) / 4;
                    if(x.length > 0 && Number.isInteger(position_Qr) && f.length === 0 ){
                        return x[position_Qr - 1]
                    } else if(x.length > 0 && f.length !== 0 && this.classinterval.length === 0){
                            let search:number[] = this.cumulative_frequency.filter(item => item < position_Qr);
                            let nearby = this.cumulative_frequency[Math.sqrt(Math.trunc(position_Qr)) - 1];
                            if(nearby < position_Qr && position_Qr < nearby + 1){
                                    let position1:number = x[search.length - 1]
                                    let position2:number =  x[search.length]
                                    let difference:number = position_Qr - Math.trunc(position_Qr);
                                        Qr = position1 + difference * (Math.abs(position2 - position1));
                                return Qr;
                          } else {
                                    Qr = x[search.length];
                                return Qr;
                          }
                    } else {
                            let position1:number = x[Math.floor(position_Qr) - 1];
                            let position2:number = x[Math.floor(position_Qr)];
                            let difference:number = position_Qr - Math.trunc(position_Qr);
                            Qr = position1 + difference * (Math.abs(position2 - position1));
                        return Qr;
                    } 
                } else {
                        position_Qr = (r * n) / 4;
                        let search:number[] = this.cumulative_frequency.filter(item => item < position_Qr);
                        l = this.classinterval[search.length * 2] - 0.5;
                        Σfl = this.cumulative_frequency[search.length - 1];
                        fq = this.frequency[search.length];
                        Qr = l + i * ((position_Qr - Σfl)  / fq);
                    return Qr;
        } 
    }

        public Dr = (r:number = 0 , Dr:number = 0 , position_Dr:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , l:number = 0 , i:number  = this.I , Σfl:number = 0 , fd:number = 0):number => {
                if(x.length > 0 && this.classinterval.length === 0){
                    position_Dr = r *(n + 1) / 10;
                    if(x.length > 0 && Number.isInteger(position_Dr) && f.length !== 0 ){
                        return x[position_Dr - 1];
                    } else if(x.length !== 0 && f.length !== 0 && this.classinterval.length === 0){
                            let search:number[] = this.cumulative_frequency.filter(item => item < position_Dr);
                            let nearby = this.cumulative_frequency[Math.sqrt(Math.trunc(position_Dr)) - 1];
                                if(nearby < position_Dr && position_Dr < nearby + 1){
                                        let position1:number = x[search.length - 1];
                                        let position2:number =  x[search.length];
                                        let difference:number = position_Dr - Math.trunc(position_Dr);
                                        Dr = position1 + difference * (Math.abs(position2 - position1));
                                    return Dr;
                                } else {
                                    Dr = x[search.length];
                                return Dr;
                          }
                    } else {
                            let position1:number = x[Math.floor(position_Dr) - 1];
                            let position2:number = x[Math.floor(position_Dr)];
                            let difference:number = position_Dr - Math.trunc(position_Dr);
                            Dr = position1 + difference * (Math.abs(position2 - position1));
                        return Dr;
                    }
                } else {
                        position_Dr = (r * n) / 10;
                        let search:number[] = this.cumulative_frequency.filter(item => item < position_Dr);
                        l = this.classinterval[search.length * 2] - 0.5;
                        Σfl = this.cumulative_frequency[search.length - 1];
                        fd = this.frequency[search.length];
                        Dr = l + i * ((position_Dr - Σfl)  / fd);                    
                    return Dr;            
        }
    }

        public Pr = (r:number = 0 , Pr:number = 0 , position_Pr:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , l:number = 0 , i:number  = this.I , Σfl:number = 0 , fp:number = 0):number => {
                if(x.length > 0 && this.classinterval.length === 0){
                    position_Pr = r *(n + 1) / 100;
                    if(x.length > 0 && Number.isInteger(position_Pr) && f.length !== 0 ) {
                        return x[position_Pr - 1];
                    } else if(x.length !== 0 && f.length !== 0 && this.classinterval.length === 0){
                            let search:number[] = this.cumulative_frequency.filter(item => item < position_Pr);
                            let nearby = this.cumulative_frequency[Math.sqrt(Math.trunc(position_Pr)) - 1];
                                if(nearby < position_Pr && position_Pr < nearby + 1){
                                    let position1:number = x[search.length - 1];
                                    let position2:number =  x[search.length];
                                    let difference:any = position_Pr - Math.trunc(position_Pr);
                                        Pr = position1 + difference * (Math.abs(position2 - position1));
                                return Pr;
                          } else {
                                Pr = x[search.length];
                            return Pr;
                          }
                            
                    } else {
                            let position1:number = x[Math.floor(position_Pr) - 1];
                            let position2:number = x[Math.floor(position_Pr)];
                            let difference:any = position_Pr - Math.trunc(position_Pr);
                            Pr = position1 + difference * (Math.abs(position2 - position1));
                        return Pr;
                    }
                } else {
                        position_Pr = (r * n) / 100;
                        let search:number[] = this.cumulative_frequency.filter(item => item < position_Pr);
                        l = this.classinterval[search.length * 2] - 0.5;
                        Σfl = this.cumulative_frequency[search.length - 1];
                        fp = this.frequency[search.length];
                        Pr = l + i * ((position_Pr - Σfl)  / fp);
                    return Pr;
                }                    
    }

        public Quartile_deviation = (QD:number = 0 , Q1:any = 1 , Q3:any = 3  ,  n:number = this.n() , position_Qr:number[] = this.sortdata , f:number[] = this.frequency , l1:number = 0 , i1:number  = this.I , Σfl1:number = 0 , fq1:number = 0 , l3:number = 0 , i3:number  = this.I , Σfl3:number = 0 , fq3:number = 0 , x:number[] = this.sortdata):number => {
            if(f.length === 0){
                Q1 = (1 * (n + 1)) / 4;
                Q3 = (3 * (n + 1)) / 4;
                type Q_Obj =  {
                    Q1:{ r:number , decimal:number , difference:number , value:number , send_value:Function };
                    Q3:{ r:number , decimal:number , difference:number , value:number , send_value:Function };
                }
                let Q_value:Q_Obj = {
                    Q1:{ r: 1, 
                        decimal: 0, 
                        difference: 0, 
                        value: 0, 
                        send_value():number {
                            this.decimal = Math.abs(Q1 - Math.trunc(Q1)); 
                            this.difference = Math.abs(position_Qr[Math.trunc(Q1) - 1] - position_Qr[Math.trunc(Q1)]); 
                            this.value = position_Qr[Math.trunc(Q1) - 1] + (this.decimal * this.difference);  
                                return this.value;
                }},
                    Q3:{ r: 3, 
                        decimal: 0, 
                        difference: 0, 
                        value: 0,
                        send_value():number {
                            this.decimal = Math.abs(Q3 - Math.trunc(Q3)); 
                            this.difference = Math.abs(position_Qr[Math.trunc(Q3) - 1] - position_Qr[Math.trunc(Q3)]); 
                            this.value = position_Qr[Math.trunc(Q3) - 1] + (this.decimal * this.difference);  
                                return this.value;
                    }}
                }
                    if(Number.isInteger(Q1) && Number.isInteger(Q3)){
                        QD = (position_Qr[Q3 - 1] - position_Qr[Q1 - 1]) / 2;
                    } else if((Q1 && Q3).toFixed()){                    
                        QD = (Q_value.Q3.send_value() - Q_value.Q1.send_value()) / 2;
                    } else if((Q1 || Q3).toFixed()){
                        if(Number.isInteger(Q1)){  
                            QD = (Q_value.Q3.send_value() - Q1) / 2;
                        } else if(Number.isInteger(Q3)){
                            QD = (Q3 - Q_value.Q1.send_value()) / 2;
                        }
                    }
            } else if(f.length !== 0 && this.classinterval.length === 0) {
                let Position:{ Q1:number , Q3:number } = {
                    Q1: (1 * (n + 1)) / 4,
                    Q3: (3 * (n + 1)) / 4
                }
                let Search:{ Q1:number[] , Q3:number[] } = {
                    Q1: this.cumulative_frequency.filter(item => item < Position.Q1),
                    Q3: this.cumulative_frequency.filter(item => item < Position.Q3),
                }
                    Q1 = x[Search.Q1.length];
                    Q3 = x[Search.Q3.length];
                if(this.cumulative_frequency[this.cumulative_frequency.indexOf(Math.trunc(Position.Q1))]  === Math.trunc(Position.Q1) || this.cumulative_frequency[this.cumulative_frequency.indexOf(Math.trunc(Position.Q3))]  === Math.trunc(Position.Q3)){
                    if(this.cumulative_frequency[this.cumulative_frequency.indexOf(Math.trunc(Position.Q1))] === Math.trunc(Position.Q1)){
                        Q1 = x[Search.Q1.length - 1] + (Math.abs(Position.Q1 - Math.trunc(Position.Q1)) * Math.abs(x[Search.Q1.length - 1] - x[Search.Q1.length]));
                    } else if(this.cumulative_frequency[this.cumulative_frequency.indexOf(Math.trunc(Position.Q3))]  === Math.trunc(Position.Q3)){
                        Q3 = x[Search.Q3.length - 1] + (Math.abs(Position.Q3 - Math.trunc(Position.Q3)) * Math.abs(x[Search.Q3.length - 1] - x[Search.Q3.length]));                            
                    }            
                } 
            } else {
                    let Position:{ Q1:number , Q3:number } = {
                        Q1: (1 * n) / 4,
                        Q3: (3 * n) / 4,
                    }
                    let Search:{ Q1:number[] , Q3:number[] } = {
                        Q1: this.cumulative_frequency.filter(item => item < Position.Q1),
                        Q3: this.cumulative_frequency.filter(item => item < Position.Q3),
                    }
                        l1 = this.classinterval[Search.Q1.length * 2] - 0.5;
                        l3 = this.classinterval[Search.Q3.length * 2] - 0.5;   
                        Σfl1 = this.cumulative_frequency[Search.Q1.length - 1];
                        Σfl3 = this.cumulative_frequency[Search.Q3.length - 1];
                    if(l1 === undefined || Number.isNaN(l1)) l1 = 0;
                    if(l3 === undefined || Number.isNaN(l3)) l3 = 0;      
                    if(Σfl1  === undefined || Number.isNaN(Σfl1)) Σfl1 = 0;
                    if(Σfl3  === undefined || Number.isNaN(Σfl3)) Σfl3 = 0;                    
                        fq1 = this.frequency[Search.Q1.length];
                        fq3 = this.frequency[Search.Q3.length];                
                        Q1 = (l1 + i1 * ((Position.Q1 - Σfl1)  / fq1)).toFixed(2);
                        Q3 = (l3 + i3 * ((Position.Q3 - Σfl3)  / fq3)).toFixed(2);
            }
                QD = (Q3 - Q1) / 2;
            return QD;
        }

        public Mean_deviation = (MD:number = 0 , x̄:number = 0 , Σx:number = 0 , n:number = this.n() , x:number[] = this.sortdata , Σx2:number = 0 , f:number[] = this.frequency , Σxf:number = 0):number => {
            if(x.length > 0  && f.length === 0){
                for(let p in x){
                    Σx += x[p];
                }
                    x̄ = Σx / n;
                for(let k in x){
                    Σx2 += Math.abs(x[k] - x̄); 
                }
            } else if (f.length !== 0){
                    if(this.data.length === 0) x = this.mid_point();
                for(let y in x){
                    Σxf += (x[y] * f[y]);
                }
                    x̄ = Σxf / n;
                for(let a in x){
                    Σx2 += f[a] * (Math.abs(x[a] - x̄)); 
                }
            } 
                MD = Σx2 / n;
            return MD;
        }

        public Standard_deviation = (SD:number = 0 , x̄:number = 0 , Σx:number = 0 , n:number = this.n(), f:number[] = this.frequency , x:number[] = this.sortdata , Σx2:number = 0 , Σxf:number = 0 , Σxf2:number = 0):number => {
            if(x.length > 0 && f.length === 0){
                for(let i in x){
                    Σx += x[i];
                }
                    x̄ = Σx / n;
                try {
                    for(let j in x){
                        Σx2 += Math.pow(x[j] , 2); 
                    }
                        SD = Math.sqrt((Σx2 / n) - Math.pow(x̄ , 2));
                } catch {
                    for(let j in x){
                        Σx2 += Math.pow((x[j] - x̄) , 2);
                    }
                        SD = Math.sqrt(Σx2  / n);
                }
            } else if(f.length !== 0){
                if(this.data.length === 0) x = this.mid_point();
                for(let k in x){
                        Σxf += f[k] * x[k];
                    }
                        x̄ = Σxf / n;
                try {
                    for(let o in x){
                        Σxf2 +=  f[o] * Math.pow(x[o] , 2);
                    }
                        SD = Math.sqrt((Σxf2 / n) - Math.pow(x̄ , 2));
                } catch {
                    for(let z in x){
                        Σxf2 += f[z] * Math.pow((x[z] - x̄) , 2);
                    }
                        SD = Math.sqrt(Σxf2  / n);
                }
            }
            return SD;
        }

        public Variance = (S:number = 0 , x̄:number = 0 , Σx:number = 0 , n:number = this.n() , f:number[] = this.frequency , x:number[] = this.sortdata , Σx2:number = 0 , Σxf:number = 0 , Σxf2:number = 0):number => {
            if(x.length > 0 && f.length === 0){
                for(let q in x){
                    Σx += x[q];
                }
                    x̄ = Σx / n;
                try {
                    for(let d in x){
                        Σx2 += Math.pow((x[d] - x̄) , 2);
                    }
                        S = Σx2  / n;
                } catch {
                    for(let p in x){
                        Σx2 += Math.pow(x[p] , 2); 
                    }
                        S = (Σx2 / n) - Math.pow(x̄ , 2);
                }
            } else if(f.length !== 0){
                    if(this.data.length === 0) x = this.mid_point();
                for(let b in x){
                        Σxf += f[b] * x[b]
                    }
                        x̄ = Σxf / n;
                try {
                    for(let t in x){
                        Σxf2 +=  f[t] * Math.pow(x[t] , 2)
                    }
                        S = (Σxf2 / n) - Math.pow(x̄ , 2);
                } catch {
                    for(let e in x){
                        Σxf2 += f[e] * Math.pow((x[e] - x̄) , 2);
                    }
                        S = Σxf2  / n;
                }
            }
            return S;
        }

        public Coefficient_of_range = (CR:number = 0 , Xmax = 0 , Xmin = 0 , x:number[] = this.sortdata , f:number[] = this.frequency , c:number[] = this.classinterval):number => {
            if(x.length > 0 && f.length === 0){
                Xmax = x[this.data.length - 1];
                Xmin = x[0];
            } else if(x.length !== 0 && f.length !== 0){
                Xmax = x[this.data.length - 1];
                Xmin = x[0];
            } else if(x.length === 0 && f.length !== 0 || f.length !== 0 && c.length !== 0){
                Xmax = (Math.max(...c) + 0.5);
                Xmin = (Math.min(...c) - 0.5);
            }
                CR = (Xmax - Xmin) / (Xmax + Xmin);
            return CR;
        }

        public Coefficient_of_quartile_deviation = (CQD:number = 0 , Q1:number = 0 , Q3:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , l1:number = 0 , i1:number  = this.I , Σfl1:number = 0 , fq1:number = 0 , l3:number = 0 , i3:number  = this.I , Σfl3:number = 0 , fq3:number = 0):number => {
            if(x.length > 0 && f.length === 0){
                let position_Q1 = 1 *(n + 1) / 4;
                    if(Number.isInteger(position_Q1)) Q1 = x[position_Q1 - 1];
                        else {
                            let position1:number = x[Math.floor(position_Q1) - 1];
                            let position2:number = x[Math.floor(position_Q1)];
                            let difference:any = (position_Q1 - Math.trunc(position_Q1)).toFixed(2);
                                Q1 = position1 + difference * (Math.abs(position2 - position1));
                        } 
                let position_Q3 = 3 *(n + 1) / 4;
                    if(Number.isInteger(position_Q3)) Q3 = x[position_Q3 - 1];
                        else {
                            let position1:number = x[Math.floor(position_Q3) - 1];
                            let position2:number = x[Math.floor(position_Q3)];
                            let difference:any = (position_Q3 - Math.trunc(position_Q3)).toFixed(2);
                                Q3 = position1 + difference * (Math.abs(position2 - position1));
                        } 
            } else if(x.length > 0 && f.length > 0 && this.classinterval.length === 0){
                let position_Q1 = 1 *(n + 1) / 4;
                let position_Q3 = 3 *(n + 1) / 4;                
                let Search:{ Q1:number[] , Q3:number[] } = {
                    Q1: this.cumulative_frequency.filter(item => item < position_Q1),
                    Q3: this.cumulative_frequency.filter(item => item < position_Q3),
                }
                    Q1 =  x[Search.Q1.length];
                    Q3 =  x[Search.Q3.length];
            }
             else if(x.length === 0 && f.length !== 0 && this.classinterval.length !== 0){
                let Position:{ Q1:number , Q3:number } = {
                    Q1: 1 *(n) / 4,
                    Q3: 3 *(n) / 4,
                }
                let Search:{ Q1:number[] , Q3:number[] } = {
                    Q1: this.cumulative_frequency.filter(item => item < Position.Q1),
                    Q3: this.cumulative_frequency.filter(item => item < Position.Q3),
                }
                    l1 = this.classinterval[Search.Q1.length * 2] - 0.5;
                    Σfl1 = this.cumulative_frequency[Search.Q1.length - 1];
                    fq1 = f[Search.Q1.length];
                    Q1 = l1 + i1 * ((Position.Q1 - Σfl1)  / fq1);
                    l3 = this.classinterval[Search.Q3.length * 2] - 0.5;
                    Σfl3 = this.cumulative_frequency[Search.Q3.length - 1];
                    fq3 = f[Search.Q3.length];
                    Q3 = l3 + i3 * ((Position.Q3 - Σfl3)  / fq3);
            }
                CQD = (Q3 - Q1) / (Q3 + Q1);
            return CQD;
        }

        public Coefficient_of_mean_deviation = (CMD:number = 0 , MD:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , x̄:number = 0 , Σx:number = 0 , Σxf:number = 0 , Σx2:number = 0 , Σxf2:number = 0):number => {
            if(x.length > 0 && f.length === 0){
                for(let t in x){
                    Σx += x[t];
                }
                    x̄ = Σx / n;
                for(let u in x){
                    Σx2 += Math.abs(x[u] - x̄);
                }
                    MD = Σx2 / n;
            }  else if(f.length !== 0){
                    if(this.data.length === 0) x = this.mid_point();
                for(let w in x){
                    Σxf += (x[w] * f[w]);
                }
                    x̄ = Σxf / n;
                for(let r in x){
                    Σxf2 += f[r] * (Math.abs(x[r] - x̄)); 
                }
                    MD = Σxf2 / n;
            }
                CMD = MD / x̄;
            return CMD;
        }

        public Coefficient_of_deviation = (CSD:number = 0 , SD:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , x̄:number = 0 , Σx:number = 0 , Σxf:number = 0 , Σx2:number = 0 , Σxf2:number = 0):number => {
            if(x.length > 0 && f.length === 0){
                for(let i in x){
                    Σx += x[i];
                }
                    x̄ = Σx / n;
                try {
                    for(let j in x){
                        Σx2 += Math.pow(x[j] , 2); 
                    }
                        SD = Math.sqrt((Σx2 / n) - Math.pow(x̄ , 2));
                } catch {
                    for(let j in x){
                        Σx2 += Math.pow((x[j] - x̄) , 2);
                    }
                        SD = Math.sqrt(Σx2  / n);
                }
            } else if(f.length !== 0){
                    if(this.data.length === 0) x = this.mid_point();
                for(let k in x){
                        Σxf += f[k] * x[k];
                    }
                        x̄ = Σxf / n;
                try {
                    for(let o in x){
                        Σxf2 +=  f[o] * Math.pow(x[o] , 2)
                    }
                        SD = Math.sqrt((Σxf2 / n) - Math.pow(x̄ , 2));
                } catch {
                    for(let z in x){
                        Σxf2 += f[z] * Math.pow((x[z] - x̄) , 2);
                    }
                        SD = Math.sqrt(Σxf2  / n);
                }
            }
                CSD = SD / x̄;
            return CSD;
        }

        public Standard_scores = (score:any = null , name:string[] = [] , Z:number = 0 , x:number[] = this.sortdata , x̄:number = 0 , Σx:number = 0 , n:number = this.n() , S:number = 0 , Σx2:number = 0):number => {
            x.map((index:number) => {
                Σx += index;
            });
                x̄ = Σx / n;
            for(let xi of x){
                Σx2 +=  Math.pow(xi - x̄ , 2);
            }
                S = Math.sqrt(Σx2 / n);
                Z = (score - x̄) / S;
            return Z;    
        }
}
