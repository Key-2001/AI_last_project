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
        dataDefault.sort(() => {
        return Math.random() - 0.5
        })
        dispatch({type:'SET_DATA',payload:dataDefault});
        
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

    useEffect(() => {
        setDefaultData();
    },[])


    return(
        <AppContext.Provider value={{
            ...state,swapItem
        }}>{children}</AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext,AppProvider}