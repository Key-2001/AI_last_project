import React,{useContext, useState, useEffect,useReducer} from 'react'
import reducer from './reducer';
const AppContext = React.createContext();

const initialState = {
    data:[],
    n:4,
}

const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);
    

    const setDefaultData = () => {
        const n = state.n;
        let dataDefault=[];
        
        for (let i = 0; i < Math.pow(n,2); i++) {
            dataDefault.push(i);
        }
        // dataDefault.sort(() => {
        // return Math.random() - 0.5
        // })
        let indexZero = 0;
        let arrValueSwap = [];

        for(let i = 0;i<20;i++){
            let tempIndex=[]
            arrValueSwap.push(indexZero);
            if(indexZero === 0){
                 tempIndex = [indexZero+1,indexZero+4];
                 
                // console.log('th1')
            }
            else if(indexZero === 3){
                tempIndex = [indexZero-1,indexZero+4,]
            }
            else if(indexZero === 12){
                tempIndex = [indexZero-4,indexZero+1]
            }
            else if(indexZero === 15){
                tempIndex = [indexZero-4,indexZero-1]
            }
            else if(indexZero>0 && indexZero<3){
                tempIndex = [indexZero-1,indexZero+1,indexZero+4]
            }
            else if(indexZero%4 === 0){
                tempIndex = [indexZero-4,indexZero+1,indexZero+4]
            }
            else if(indexZero%4 === 3){
                tempIndex = [indexZero-4,indexZero-1,indexZero+4]
            }
            else if(indexZero>12 && indexZero<15){
                tempIndex = [indexZero-1,indexZero+1,indexZero-4]
            }
            else{
                tempIndex = [indexZero-4,indexZero-1,indexZero+1,indexZero+4];
            }

            tempIndex.sort(() => {
                return Math.random() - 0.5
            })
            if(tempIndex[0] !== arrValueSwap[arrValueSwap.length-2]){
                indexZero = tempIndex[0];
            }else{
                indexZero = tempIndex[1];
            }
            
        }

        console.log(arrValueSwap)
        for(let i=0;i<arrValueSwap.length-1;i++){
            swapPlus(arrValueSwap[i],arrValueSwap[i+1],dataDefault)
        }
        // dispatch({type:'SET_DATA',payload:dataDefault});
        
    }

    const swapItem = (index,n,data) => {
        const row = Math.floor(index/n);
        const column = index%n;
        console.log('row',row);
        console.log('column',column);
        if((data[index+1] === 0)&&((index !== 3)&&(index !== 7)&&(index !==11))){
            console.log(index);
            let temp = data[index];
            data[index] = data[index+1];
            data[index+1] = temp;
        }
        else if((data[index-1] === 0)&&(index !== 4)&&(index !== 8)&&(index !== 12)){
            let temp = data[index];
            data[index] = data[index-1];
            data[index-1] = temp;
        }
        else if(data[index-4] === 0){
            let temp = data[index];
            data[index] = data[index-4];
            data[index-4] = temp;
        }
        else if(data[index+4] === 0){
            let temp = data[index];
            data[index] = data[index+4];
            data[index+4] = temp;
        }
        dispatch({type:'SWAP_ITEM',payload:data})
    }

    const BFS = (data) => {
        const t0 = performance.now();
        let indexZero = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i] === 0){
                indexZero = i;
                break;
            }
        }
        
        
        const end = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        // console.log(data)
        let open = [{
            index:indexZero,
            data: [[...data]],
            father:[],
        }];
        
        let tempFather = [];
        let count = 1;
        let tempData = [];
        const finalAnswer = [];
        let X = []
        while(true){
            tempData = []
            X = open.shift();
            // console.log('X',X);
            // console.log(X.data)
            
            let tempIndex = [];
            tempFather = [...X.father];
            tempData = X.data;
            // console.log(tempData)
            if(X.index === 0){
                 tempIndex = [X.index+1,X.index+4];
                 
                // console.log('th1')
            }
            else if(X.index === 3) {
                 tempIndex = [X.index-1,X.index+4]
                // console.log('th2')
            }
            else if(X.index === 12) {
                 tempIndex = [X.index-4,X.index+1]
                // console.log('th3')

            }
            else if(X.index === 15) {
                 tempIndex = [X.index-4,X.index-1]
                // console.log('th4')

            }
            else if(0<X.index && X.index<3){
                 tempIndex = [X.index-1,X.index+1,X.index+4]
                // console.log('th5')

            }
            else if(X.index%4===0 ){
                 tempIndex = [X.index-4,X.index+1,X.index+4]
                // console.log('th6')

            }
            else if(X.index%4===3 ){
                 tempIndex = [X.index-4,X.index-1,X.index+4]
                // console.log('th7')

            }
            else if(12<X.index && X.index<15){
                 tempIndex = [X.index-1,X.index+1,X.index-4]
                // console.log('th8')

            }
            else{
                 tempIndex = [X.index-1,X.index+1,X.index-4,X.index+4]
                // console.log('th9')
            }

            tempIndex.sort(() => {
                return Math.random() - 0.5
            })

            
            for(let i=0;i<tempIndex.length;i++){
                if(tempIndex[i] === tempFather[tempFather.length-1]){
                    tempIndex.splice(i,1);
                }
            }
            tempFather.push(X.index)
            // console.log(tempData[tempData.length-1])
            
            let answer = setNewData(tempData[tempData.length-1],tempFather[tempFather.length-1],tempFather[tempFather.length-2]>(-1)?tempFather[tempFather.length-2]:tempFather[tempFather.length-1]);
            // console.log(answer)
            // console.log('father',tempFather);
            // console.log(tempFather[tempFather.length-1]);
            // console.log(tempFather[tempFather.length-2])

            for(let i=0;i<tempIndex.length;i++){
                open.push({
                    index:tempIndex[i],
                    data:[...tempData,
                        [...answer]
                    ],
                    father:[
                        ...tempFather,
                    ]
                })
            }
            
            // console.log('open',open);
            
            // answer = setNewData(X.data[X.data.length-1],tempFather.length-1,tempFather.length-2?tempFather.length-2:tempFather.length-1);
            // console.log('father',tempFather);
            // console.log('dataFinalFather',answer);
            // console.log('end',end);
            // console.log(checkValue(end,answer))
            // console.log(tempFather)
            if(checkValue(end,answer)){
                
                // for(let i=0;i<tempFather.length;i++){
                //     dispatch({type:'SWAP_ITEM',payload:X.data[i]})   
                // }
                console.log('found')
                break;
            }
            count +=1;
            if(count === 150000){
                console.log('not found answer')
                break
            }
            // console.log(X)
        }
        const t1=performance.now();
        console.log(X);
        console.log('Time: ',t1 - t0, 'miliseconds')
        let countX = 0;
        setInterval(() => {

            if(countX<X.data.length){
                    dispatch({type:'SWAP_ITEM',payload:X.data[countX]})   
            }
            countX +=1;
        },800)
        // console.log(indexZero)
    }

    const DFS = (data) => {
        const t0 = performance.now();
        let indexZero = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i] === 0){
                indexZero = i;
                break;
            }
        }
        
        
        const end = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        // console.log(data)
        let open = [{
            index:indexZero,
            data: [[...data]],
            father:[],
        }];
        
        let tempFather = [];
        let count = 1;
        let tempData = [];
        let X = []
        while(true){
            tempData = []
            X = open.shift();
            // console.log('X',X);
            // console.log(X.data)
            let tempIndex = [];
            tempFather = [...X.father];
            tempData = X.data;
            // console.log(tempData)
            if(X.index === 0){
                 tempIndex = [X.index+1,X.index+4];
                 
                // console.log('th1')
            }
            else if(X.index === 3) {
                 tempIndex = [X.index-1,X.index+4]
                // console.log('th2')
            }
            else if(X.index === 12) {
                 tempIndex = [X.index-4,X.index+1]
                // console.log('th3')

            }
            else if(X.index === 15) {
                 tempIndex = [X.index-4,X.index-1]
                // console.log('th4')

            }
            else if(0<X.index && X.index<3){
                 tempIndex = [X.index-1,X.index+1,X.index+4]
                // console.log('th5')

            }
            else if(X.index%4===0 ){
                 tempIndex = [X.index-4,X.index+1,X.index+4]
                // console.log('th6')

            }
            else if(X.index%4===3 ){
                 tempIndex = [X.index-4,X.index-1,X.index+4]
                // console.log('th7')

            }
            else if(12<X.index && X.index<15){
                 tempIndex = [X.index-1,X.index+1,X.index-4]
                // console.log('th8')

            }
            else{
                 tempIndex = [X.index-1,X.index+1,X.index-4,X.index+4]
                // console.log('th9')
            }

            tempIndex.sort(() => {
                return Math.random() - 0.5
            })

            
            

            // tempData.splice(1,1)
            for(let i=0;i<tempIndex.length;i++){
                if(tempIndex[i] === tempFather[tempFather.length-1]){
                    tempIndex.splice(i,1);
                }
            }
            tempFather.push(X.index)
            // console.log(tempData[tempData.length-1])
            
            let answer = setNewData(tempData[tempData.length-1],tempFather[tempFather.length-1],tempFather[tempFather.length-2]>(-1)?tempFather[tempFather.length-2]:tempFather[tempFather.length-1]);
            // console.log(answer)
            // console.log('father',tempFather);
            // console.log(tempFather[tempFather.length-1]);
            // console.log(tempFather[tempFather.length-2])

            for(let i=0;i<tempIndex.length;i++){
                open.unshift({
                    index:tempIndex[i],
                    data:[...tempData,
                        [...answer]
                    ],
                    father:[
                        ...tempFather,
                    ]
                })
            }
            
            // console.log('open',open);
            
            // answer = setNewData(X.data[X.data.length-1],tempFather.length-1,tempFather.length-2?tempFather.length-2:tempFather.length-1);
            // console.log('father',tempFather);
            // console.log('dataFinalFather',answer);
            // console.log('end',end);
            // console.log(checkValue(end,answer))
            // console.log(tempFather)
            if(checkValue(end,answer)){
                
                // for(let i=0;i<tempFather.length;i++){
                //     dispatch({type:'SWAP_ITEM',payload:X.data[i]})   
                // }
                console.log('found!!!')
                break;
            }
            count +=1;
            if(count === 10000){
                console.log('not found answer')
                break
            }
            // console.log(X)
        }
        const t1=performance.now();
        console.log(X);
        console.log('Time: ',t1 - t0, 'miliseconds')
        let countX = 0;
        setInterval(() => {

            if(countX<X.data.length){
                    dispatch({type:'SWAP_ITEM',payload:X.data[countX]})   
            }
            countX +=1;
        },800)
    }

    const depthDeepening = (data) => {
        const t0 = performance.now();
        let indexZero = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i] === 0){
                indexZero = i;
                break;
            }
        }
        
        
        const end = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        // console.log(data)
        
        const maxDepth = 40;
        let finalAnswer = false;
        let X = [];
        for(let i=0;i<=maxDepth;i++){
            let open = [{
                index:indexZero,
                data: [[...data]],
                father:[],
            }];
            let tempFather = [];
            let count = 1;
            let tempData = [];
            X = [];
            // console.log('start loop');
            // console.log(open)
            while(true){
                
                tempData = []
                X = open.shift();
                // console.log('X',X);
                // console.log(X.data)
                let tempIndex = [];
                tempFather = [...X.father];
                tempData = X.data;
                // console.log(tempData)
                if(X.index === 0){
                    tempIndex = [X.index+1,X.index+4];
                    
                    // console.log('th1')
                }
                else if(X.index === 3) {
                    tempIndex = [X.index-1,X.index+4]
                    // console.log('th2')
                }
                else if(X.index === 12) {
                    tempIndex = [X.index-4,X.index+1]
                    // console.log('th3')

                }
                else if(X.index === 15) {
                    tempIndex = [X.index-4,X.index-1]
                    // console.log('th4')

                }
                else if(0<X.index && X.index<3){
                    tempIndex = [X.index-1,X.index+1,X.index+4]
                    // console.log('th5')

                }
                else if(X.index%4===0 ){
                    tempIndex = [X.index-4,X.index+1,X.index+4]
                    // console.log('th6')

                }
                else if(X.index%4===3 ){
                    tempIndex = [X.index-4,X.index-1,X.index+4]
                    // console.log('th7')

                }
                else if(12<X.index && X.index<15){
                    tempIndex = [X.index-1,X.index+1,X.index-4]
                    // console.log('th8')

                }
                else{
                    tempIndex = [X.index-1,X.index+1,X.index-4,X.index+4]
                    // console.log('th9')
                }

                tempIndex.sort(() => {
                    return Math.random() - 0.5
                })

                for(let i=0;i<tempIndex.length;i++){
                if(tempIndex[i] === tempFather[tempFather.length-1]){
                    tempIndex.splice(i,1);
                    }
                }
                tempFather.push(X.index)

                let answer = setNewData(tempData[tempData.length-1],tempFather[tempFather.length-1],tempFather[tempFather.length-2]>(-1)?tempFather[tempFather.length-2]:tempFather[tempFather.length-1]);
                // console.log(answer)
                for(let i=0;i<tempIndex.length;i++){
                    open.unshift({
                        index:tempIndex[i],
                        data:[...tempData,
                            [...answer]
                        ],
                        father:[
                            ...tempFather,
                        ]
                    })
                }
                if(checkValue(end,answer)){
                    console.log('found!!!')
                    finalAnswer = true;
                    break;
                }
                
                
                // console.log('max',i)
                
                open = open.filter((item) => {
                    // console.log('father', item.father.length);
                    // console.log('i', i)
                    return item.father.length <= i
                });
                if(open.length === 0){
                    // console.log('111111')
                    break;
                }
                // console.log(i,open);
            }
            // console.log('end loop')

            if(finalAnswer){
                break
            }

        }
        const t1=performance.now();
        if(finalAnswer === false){
            console.log('not found answer!!!')
        }
        console.log(X);
        console.log('Time: ',t1 - t0, 'miliseconds')
        let countX = 0;
        setInterval(() => {

            if(countX<X.data.length){
                    dispatch({type:'SWAP_ITEM',payload:X.data[countX]})   
            }
            countX +=1;
        },800)
    }

    const bestFirstSearch = (data) => {
        const t0 = performance.now();
        let indexZero = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i] === 0){
                indexZero = i;
                break;
            }
        }
        
        
        const end = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        // console.log(data)
        let open = [{
            index:indexZero,
            data: [[...data]],
            father:[],
            status: setStatus(data,end),
        }];
        
        let tempFather = [];
        let count = 1;
        let tempData = [];
        
        let X = []
        while(true){
            tempData = [];
            X = open.shift();
            // console.log('X',X);
            // console.log(X.data)
            // X.status = setStatus(X.data[X.data.length-1],end);
            // console.log(X.data)
            // let lengthData = X.data.length
            // console.log(X.data.length)
            // console.log(X.data[X.data.length-1])
            // console.log(setStatus(end,X.data[X.data.length-1]))
            let tempIndex = [];
            tempFather = [...X.father];
            tempData = X.data;
            // console.log(tempData)
            if(X.index === 0){
                 tempIndex = [X.index+1,X.index+4];
                 
                // console.log('th1')
            }
            else if(X.index === 3) {
                 tempIndex = [X.index-1,X.index+4]
                // console.log('th2')
            }
            else if(X.index === 12) {
                 tempIndex = [X.index-4,X.index+1]
                // console.log('th3')

            }
            else if(X.index === 15) {
                 tempIndex = [X.index-4,X.index-1]
                // console.log('th4')

            }
            else if(0<X.index && X.index<3){
                 tempIndex = [X.index-1,X.index+1,X.index+4]
                // console.log('th5')

            }
            else if(X.index%4===0 ){
                 tempIndex = [X.index-4,X.index+1,X.index+4]
                // console.log('th6')

            }
            else if(X.index%4===3 ){
                 tempIndex = [X.index-4,X.index-1,X.index+4]
                // console.log('th7')

            }
            else if(12<X.index && X.index<15){
                 tempIndex = [X.index-1,X.index+1,X.index-4]
                // console.log('th8')

            }
            else{
                 tempIndex = [X.index-1,X.index+1,X.index-4,X.index+4]
                // console.log('th9')
            }

            tempIndex.sort(() => {
                return Math.random() - 0.5
            })

            
            for(let i=0;i<tempIndex.length;i++){
                if(tempIndex[i] === tempFather[tempFather.length-1]){
                    tempIndex.splice(i,1);
                }
            }
            tempFather.push(X.index)
            // console.log('1',tempData)
            
            // console.log(tempData[tempData.length-1]);

            let answer = setNewData(tempData[tempData.length-1],X.index,tempFather[tempFather.length-2]>(-1)?tempFather[tempFather.length-2]:tempFather[tempFather.length-1]);
            // console.log('X',X)
            // console.log('temp',tempData)
            // console.log('answer',answer)
            // console.log('end',end)
            // console.log(tempData[tempData.length-1]);

            // console.log('compare',setStatus(answer,end));
            // console.log('2',tempData)
            // console.log('father',tempFather);
            // console.log(tempFather[tempFather.length-1]);
            // console.log(tempFather[tempFather.length-2])
            // console.log('1',setStatus(tempData[tempData.length-1],end));
            // console.log('2',setStatus(answer,end));
            let answerTest = [...answer];

            // let compare = setStatus(answerTest,end);
            // console.log(compare)
            for(let i=0;i<tempIndex.length;i++){
                // console.log(answerTest)
                open.push({
                    index:tempIndex[i],
                    data:[...tempData,
                        [...answer]
                    ],
                    father:[
                        ...tempFather,
                    ],
                    status: setStatus(answerTest,end,tempIndex[i],X.index),
                })
            }
            // console.log('answer1',answer)
            // console.log('open',open);
            
            // answer = setNewData(X.data[X.data.length-1],tempFather.length-1,tempFather.length-2?tempFather.length-2:tempFather.length-1);
            // console.log('father',tempFather);
            // console.log('dataFinalFather',answer);
            // console.log('end',end);
            // console.log(checkValue(end,answer))
            // console.log(tempFather)
            if(checkValue(end,answer)){
                console.log('found!!')
                break;
            }
            count +=1;
            console.log(count)
            if(count === 20000){
                console.log('not found answer')
                break
            }

            
            open.sort((a,b) =>{
                if(a.status < b.status) return -1
                return 0 
            })
            
            // console.log(X)
        }
        const t1=performance.now();
        console.log('open',open)
        console.log('count',count)
        console.log(X);
        console.log('Time: ',t1 - t0, 'miliseconds')
        let countX = 0;
        setInterval(() => {

            if(countX<X.data.length){
                    dispatch({type:'SWAP_ITEM',payload:X.data[countX]})   
            }
            countX +=1;
        },800)
    }

    const hillClimbing = (data) => {
        const t0 = performance.now();
        let indexZero = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i] === 0){
                indexZero = i;
                break;
            }
        }
        
        
        const end = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        // console.log(data)
        let open = [{
            index:indexZero,
            data: [[...data]],
            father:[],
            status: setStatus(data,end),
        }];
        
        let tempFather = [];
        let count = 1;
        let tempData = [];
        
        let X = []
        while(true){
            tempData = [];
            X = open.shift();
            console.log('X',X);
            // console.log(X.data)
            // X.status = setStatus(X.data[X.data.length-1],end);
            // console.log(X.data)
            // let lengthData = X.data.length
            // console.log(X.data.length)
            // console.log(X.data[X.data.length-1])
            // console.log(setStatus(end,X.data[X.data.length-1]))
            let tempIndex = [];
            tempFather = [...X.father];
            tempData = X.data;
            // console.log(tempData)
            if(X.index === 0){
                 tempIndex = [X.index+1,X.index+4];
                 
                // console.log('th1')
            }
            else if(X.index === 3) {
                 tempIndex = [X.index-1,X.index+4]
                // console.log('th2')
            }
            else if(X.index === 12) {
                 tempIndex = [X.index-4,X.index+1]
                // console.log('th3')

            }
            else if(X.index === 15) {
                 tempIndex = [X.index-4,X.index-1]
                // console.log('th4')

            }
            else if(0<X.index && X.index<3){
                 tempIndex = [X.index-1,X.index+1,X.index+4]
                // console.log('th5')

            }
            else if(X.index%4===0 ){
                 tempIndex = [X.index-4,X.index+1,X.index+4]
                // console.log('th6')

            }
            else if(X.index%4===3 ){
                 tempIndex = [X.index-4,X.index-1,X.index+4]
                // console.log('th7')

            }
            else if(12<X.index && X.index<15){
                 tempIndex = [X.index-1,X.index+1,X.index-4]
                // console.log('th8')

            }
            else{
                 tempIndex = [X.index-1,X.index+1,X.index-4,X.index+4]
                // console.log('th9')
            }

            tempIndex.sort(() => {
                return Math.random() - 0.5
            })

            
            for(let i=0;i<tempIndex.length;i++){
                if(tempIndex[i] === tempFather[tempFather.length-1]){
                    tempIndex.splice(i,1);
                }
            }
            tempFather.push(X.index)
            // console.log('1',tempData)
            
            // console.log(tempData[tempData.length-1]);

            let answer = setNewData(tempData[tempData.length-1],X.index,tempFather[tempFather.length-2]>(-1)?tempFather[tempFather.length-2]:tempFather[tempFather.length-1]);
            // console.log('X',X)
            // console.log('temp',tempData)
            // console.log('answer',answer)
            // console.log('end',end)
            // console.log(tempData[tempData.length-1]);

            // console.log('compare',setStatus(answer,end));
            // console.log('2',tempData)
            // console.log('father',tempFather);
            // console.log(tempFather[tempFather.length-1]);
            // console.log(tempFather[tempFather.length-2])
            // console.log('1',setStatus(tempData[tempData.length-1],end));
            // console.log('2',setStatus(answer,end));
            let answerTest = [...answer];

            // let compare = setStatus(answerTest,end);
            // console.log(compare)
            let openTemp = [];
            for(let i=0;i<tempIndex.length;i++){
                // console.log(answerTest)
                openTemp.push({
                    index:tempIndex[i],
                    data:[...tempData,
                        [...answer]
                    ],
                    father:[
                        ...tempFather,
                    ],
                    status: setStatus(answerTest,end,tempIndex[i],X.index),
                })
            }
            openTemp.sort((a,b) =>{
                if(a.status < b.status) return -1
                return 0 
            })
            // console.log(openTemp)
            for(let i=0;i<openTemp.length;i++){
                open.unshift({
                    index:openTemp[i].index,
                    data:[...openTemp[i].data],
                    father:[...openTemp[i].father],
                    status:openTemp[i].status
                })
            }
            // console.log('answer1',answer)
            // console.log('open',open);
            
            // answer = setNewData(X.data[X.data.length-1],tempFather.length-1,tempFather.length-2?tempFather.length-2:tempFather.length-1);
            // console.log('father',tempFather);
            // console.log('dataFinalFather',answer);
            // console.log('end',end);
            // console.log(checkValue(end,answer))
            // console.log(tempFather)
            if(checkValue(end,answer)){
                console.log('found!!')
                break;
            }
            count +=1;
            // console.log(open)
            // console.log(count)
            if(count === 10000){
                console.log('not found answer')
                break
            }

            
           
            
            // console.log(X)
        }
        const t1=performance.now();
        console.log('open',open)
        console.log('count',count)
        console.log(X);
        console.log('Time: ',t1 - t0, 'miliseconds')
        let countX = 0;
        setInterval(() => {

            if(countX<X.data.length){
                    dispatch({type:'SWAP_ITEM',payload:X.data[countX]})   
            }
            countX +=1;
        },800)
    }

    const beamSearch = (data) => {
        const t0 = performance.now();
        let indexZero = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i] === 0){
                indexZero = i;
                break;
            }
        }
        console.log(data)
        
        const end = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        // console.log(data)
        let open = [{
            index:indexZero,
            data: [[...data]],
            father:[],
            status: setStatus(data,end),
        }];
        
        let tempFather = [];
        let count = 1;
        let tempData = [];
        let test = false;
        let X = []
        while(true){
           
            // console.log(open)
            X = [...open]
            open=[];
            console.log('X',X);
            // console.log(X.data)
            // X.status = setStatus(X.data[X.data.length-1],end);
            // console.log(X.data)
            // let lengthData = X.data.length
            // console.log(X.data.length)
            // console.log(X.data[X.data.length-1])
            // console.log(setStatus(end,X.data[X.data.length-1]))
            for(let i=0;i<X.length;i++){
                tempData = [];
                tempFather = [];
                let tempIndex = [];
                tempFather = [...X[i].father];
                tempData = X[i].data;
                // console.log(tempData)
                if(X[i].index === 0){
                     tempIndex = [X[i].index+1,X[i].index+4];
                     
                    // console.log('th1')
                }
                else if(X[i].index === 3) {
                     tempIndex = [X[i].index-1,X[i].index+4]
                    // console.log('th2')
                }
                else if(X[i].index === 12) {
                     tempIndex = [X[i].index-4,X[i].index+1]
                    // console.log('th3')
    
                }
                else if(X[i].index === 15) {
                     tempIndex = [X[i].index-4,X[i].index-1]
                    // console.log('th4')
    
                }
                else if(0<X[i].index && X[i].index<3){
                     tempIndex = [X[i].index-1,X[i].index+1,X[i].index+4]
                    // console.log('th5')
    
                }
                else if(X[i].index%4===0 ){
                     tempIndex = [X[i].index-4,X[i].index+1,X[i].index+4]
                    // console.log('th6')
    
                }
                else if(X[i].index%4===3 ){
                     tempIndex = [X[i].index-4,X[i].index-1,X[i].index+4]
                    // console.log('th7')
    
                }
                else if(12<X[i].index && X[i].index<15){
                     tempIndex = [X[i].index-1,X[i].index+1,X[i].index-4]
                    // console.log('th8')
    
                }
                else{
                     tempIndex = [X[i].index-1,X[i].index+1,X[i].index-4,X[i].index+4]
                    // console.log('th9')
                }
                // console.log(tempIndex)

                for(let j=0;j<tempIndex.length;j++){
                    if(tempIndex[j] === tempFather[tempFather.length-1]){
                        tempIndex.splice(j,1);
                    }
                }
                tempFather.push(X[i].index)
                let answerTest = [];
                let answer = setNewData(tempData[tempData.length-1],tempFather[tempFather.length-1],tempFather[tempFather.length-2]>(-1)?tempFather[tempFather.length-2]:tempFather[tempFather.length-1]);
                answerTest = [...answer];

                for(let j=0;j<tempIndex.length;j++){
                // console.log(answerTest)
                    open.push({
                        index:tempIndex[j],
                        data:[...tempData,
                            [...answer]
                        ],
                        father:[
                            ...tempFather,
                        ],
                        status: setStatus(answerTest,end,tempIndex[j],X[i].index),
                    })
                }
                if(checkValue(end,answer)){
                    console.log('found!!');
                    test = true;
                    break;
                }
            }

            if(test){
                break;
            }
            open.sort((a,b) =>{
                if(a.status < b.status) return -1
                return 0 
            })
            open = open.slice(0,2);

            count +=1;
            // console.log(open)
            // console.log(count)
            if(count === 10000){
                console.log('not found answer')
                break
            }
        }  
        const t1=performance.now();
        console.log('open',open)
        console.log('count',count)
        console.log(X);
        console.log('Time: ',t1 - t0, 'miliseconds')
        let finalX = X[0];
        for(let i=0;i<X.length;i++){
            if(X[i] === 0){
                finalX = X[i];
            }
        }
        let countX = 0;
        console.log('final X',finalX);
        setInterval(() => {

            if(countX<finalX.data.length){
                    dispatch({type:'SWAP_ITEM',payload:finalX.data[countX]})   
            }
            countX +=1;
        },800)  
    }

    const setStatus = (data,end,index1,index2) => {
        let count = 0;
        // console.log(data)
        let temp = data[index1]
        data[index1] = data[index2]
        data[index2] = temp;
        // console.log(data)
        for(let i=0;i<data.length;i++){
            if(data[i] !== end[i]){
                count +=1;
            }
        }
        return count;
    }

    const checkValue = (end,data) => {
        for(let i=0;i<data.length;i++){
            
            if(end[i] !== data[i]){
                
                return false
            }
        }
        
                return true
        
    }

    const setNewData = (dataOld,index0,index1) => {
        // console.log('index0',index0)
        // console.log('index1',index1)
        
        
        let temp = dataOld[index0];
        dataOld[index0] = dataOld[index1];
        dataOld[index1] = temp;
        
        return dataOld;
    }

    const swapPlus = (index0,indexY,data) => {
   
        let temp = data[index0];
        data[index0] = data[indexY];
        data[indexY] = temp;
        
        dispatch({type:'SWAP_ITEM',payload:data})
        
    }

    useEffect(() => {
        setDefaultData();
    },[])


    return(
        <AppContext.Provider value={{
            ...state,swapItem,BFS,DFS,depthDeepening,bestFirstSearch,hillClimbing,beamSearch
        }}>{children}</AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext,AppProvider}