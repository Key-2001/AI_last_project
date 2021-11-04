import React,{useState,useEffect} from 'react'

import { useGlobalContext } from '../context';
const View = () => {

    const {data,swapItem,n} = useGlobalContext();
    

    return (
        <div className='wrap-view'>
            <div className='header'>
                <h1 className='title'>
                    Ta-canh __ Bài cuối kì
                </h1>
            </div>
            <div className='underline'>
            </div>
            <div className='container'>
                <div className='center'>
                    {data.map((item,index) => {
                        return (
                            <div key={index} className='item' onClick={() => swapItem(index,n,data)}>
                                {`${item === 0 ? '': item}`}
                            </div>
                        )
                    })}
                </div>
                <div className='option'>

                </div>
            </div>
        </div>
    )
}

export default View
