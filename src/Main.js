import React, { useEffect, useState } from "react";
import axios from "axios";

const Main=()=>{
    const [value,setValue]=useState('')
    const [names,setNames]=useState([])
 
    async function getNames(){
        const response= await axios.get('http://localhost:8080/todos')
        // const realData = await response.json();
        console.log('respponse',response.data);
        setNames(response.data)
    }
    
    async function postNames(){
        axios.post('http://localhost:8080/todos',{
            name : value,
        }).then(res=>{
            setNames([...names,{
                name : value,
            }])
        }).catch(err => {
            console.log(" request ghalat zadi")
        })
    }
    
    useEffect(function(){
        console.log('app loaded');
        getNames()
    },[])
    
    
    const handleClick=()=>{
        postNames()
        console.log('value',value);
        
    }
    return(
        <div>
           <input type='text' value={value} onChange={(e)=>setValue(e.target.value)} />
           <button onClick={()=>handleClick()} >add</button>
           <Card value={value} names={names} getNames={getNames} setNames={setNames}/>
        </div>
    )
}
const Card =({value,names,getNames,setNames})=>{

    async function deleteData(id){
       await axios.delete(`http://localhost:8080/todos/${id}`)
        getNames()
    }

    async function editData(id){
        let  x = window.prompt()
        await axios.put(`http://localhost:8080/todos/${id}`,{
            name : x,
        }).then(res=>{
            setNames([...names,{
                name : x,
            }])
        })
         getNames()
     }
 

    return(
        <div>
            {
                names.map((el,index)=>{
                    return <div key={index}>{el.name} {index}
                      <button onClick={()=>deleteData(el.id)} >delete</button>
                      <button onClick={()=>editData(el.id)} >edit</button>
                    </div>
                })
            }
        </div>
    )
}   

export default Main


// 2 => number
// "tara" => string
// ["hasan"] => array
// {
//     name : "mahdi"  => object 
// }
// {
//     "name" : "mahdi"
// }