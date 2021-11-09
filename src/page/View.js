import React,{useState,useEffect} from 'react'

import { useGlobalContext } from '../context';
const View = () => {

    const {data,swapItem,n,BFS,DFS,depthDeepening,bestFirstSearch,hillClimbing,beamSearch} = useGlobalContext();
   
    
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
                    <button className='option-item' onClick={() => BFS(data)}>
                        BFS
                    </button>
                    <button className='option-item' onClick={() => DFS(data)}>
                        DFS
                    </button>
                    <button className='option-item' onClick={() => depthDeepening(data)}>
                        Depth Deepening
                    </button>
                    <button className='option-item' onClick={() => bestFirstSearch(data)}>
                        Best First
                    </button>
                    <button className='option-item' onClick={() => hillClimbing(data)}>
                        Hill Climbing
                    </button><button className='option-item' onClick={() => beamSearch(data)}>
                        Beam
                    </button>
                </div>
            </div>
        </div>
    )
}

export default View
