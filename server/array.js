function array(Arr,arr) {
    //验证获取的用户数据是否存在
    if(arr.length !==0){
        //forEach会改变元素组,找到用户数据里的name数据并放进arrname数组中
        var arrname=[];
        arr.forEach(value=>{
            arrname.push(value.name);
        });
    //通过遍历需要修改的数据，将它的hotstatus状态改为true
        Arr.forEach(value =>{
            //找到存在于用户数据中所有数据的那一条，修改它的状态为true
            if(arrname.indexOf(value.name) !== -1){
                value.hotstatus = "true"
            }
        });
        // console.log(Arr);
    }
    else{
        return false
    }
}
function pinjie(){

}
module.exports= {
    array:array,
    pinjie:pinjie
};