import React, { useState } from 'react'
import  Data  from "./Data.json";
function Practice() {

    let [arry , setArry] = useState([]);

    const StoreToArray = (data) =>{
        if (arry.length == 2) {
            arry.pop()
            setArry((previousItems)=>{
                return [data,...previousItems];
            })
        }else{
            setArry((previousItems)=>{
                return [...previousItems, data];
            })
        }
    }

    return (
        <>
            <div>
                {
                    Data.map((employe)=>{
                        return <div className='cardsOne' id={employe.id}>
                            Name : {employe.name} <br />
                            id : {employe.id} <br />
                            passion : {employe.passion} <br />
                            <button onClick={()=>{
                                StoreToArray({employe})
                            }}>Save to Array</button>
                        </div>
                    })
                }
            </div>


            <div>"[" {
                    arry.length === 0 ? "No item is here" : arry.map((emp)=>{
                        console.log(emp);
                        return <div id={emp.employe.id}>
                                Name : {emp.employe.name} <br />
                     </div>
                    })
                } "]"</div>

        </>
    )
}

export default Practice
