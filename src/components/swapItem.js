export const swapItem = (index,n,data) => {
    const row = Math.floor(index/n);
    const column = index%n;
    console.log('row',row);
    console.log('column',column);
    if((data[index+1] === 0)){
        let temp = data[index];
        data[index] = data[index+1];
        data[index+1] = temp;
    }
    else if(data[index-1] === 0){
        let temp = data[index];
        data[index] = data[index+1];
        data[index+1] = temp;
    }
    else if(data[index-4] === 0){
        let temp = data[index];
        data[index] = data[index+1];
        data[index+1] = temp;
    }
    else if(data[index+4] === 0){
        let temp = data[index];
        data[index] = data[index+1];
        data[index+1] = temp;
    }
    console.log(data)
}
