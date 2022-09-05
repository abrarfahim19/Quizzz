import { useState } from "react";
import { useForm } from "react-hook-form";
import Option from "./Option";

const SingleQuiz = () => {
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState('');
    const [multi,setMulti] = useState(false);

    function addOption(){
        setOptions([
            ...options,
            {
                value:option
            }])
        
    }
    function removeOption(index){
        console.log(index);
        let popedOption = options.pop(index);
        setOptions((options)=>options)
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className='container mx-auto  mb-9'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-xl my-3'> Question </h2>
                <input className='text-2xl input input-bordered input-info w-full max-w-full' placeholder='State your Question' {...register("question",{ required: true })}/>
                {errors.question && <span>This field is required</span>}
                <h2 className='text-xl my-3'> Question Type </h2>
                <div className="max-w-xs flex flex-row">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-3">Sigle </span> 
                            <input type="radio" name="radio-6" className="radio checked:bg-red-500" defaultChecked onClick={()=>{setMulti(false)}} />
                        </label>
                    </div>
                    
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-3">Multiple </span> 
                            <input type="radio" name="radio-6" className="radio checked:bg-blue-500" onClick={()=>{setMulti(true)}}/>
                        </label>
                    </div>
                </div>
                
                {
                    options.map((option,index) => <Option key={index} selectType={multi} value={option.value} removeOption={removeOption} index={index}/> )
                }
                <div className="flex flex-col my-10">
                    <input className='text-2xl input input-bordered input-info w-full max-w-md my-3' placeholder='Add Option' type="text" onChange={e=>setOption(e.target.value)}/>
                    <button onClick={addOption} className="btn max-w-md">add</button>
                </div>
                <input type="submit" className="btn btn-primary max-w-md" />
            </form>
        </div>
    );
};

export default SingleQuiz;