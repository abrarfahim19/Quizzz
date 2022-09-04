import { useState } from "react";
import Option from "./Option";

const SingleQuiz = () => {
    const [options, setOptions] = useState([])
    const [option, setOption] = useState('')

    function addOption(){
        setOptions([
            ...options,
            {
                value:option
            }])
        
    }
    function removeOption(index){

    }
    console.log(options);
    return (
        <div className='container mx-auto  mb-9'>
            <h2 className='text-xl my-3'> Question </h2>
            <input className='text-2xl input input-bordered input-info w-full max-w-xs' placeholder='State your Question'/>
            
            <h2 className='text-xl my-3'> Question Type </h2>
            <div className='max-w-xs'>
                <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Sigle Answer</span> 
                    <input type="radio" name="radio-6" className="radio checked:bg-red-500" checked />
                </label>
                </div>
                
                <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Multiple Answer</span> 
                    <input type="radio" name="radio-6" className="radio checked:bg-blue-500" checked />
                </label>
                </div>
            </div>
            {
                options.map((option) => <Option value={option.value}/> )
            }
            <div className="flex flex-col my-10">
                <input className='text-2xl input input-bordered input-info w-full max-w-md my-3' placeholder='Add Option' type="text" onChange={e=>setOption(e.target.value)}/>
                <button onClick={addOption} className="btn max-w-md">add</button>
            </div>
            <button onClick={addOption} className="btn btn-primary max-w-md">Submit</button>
        </div>
    );
};

export default SingleQuiz;