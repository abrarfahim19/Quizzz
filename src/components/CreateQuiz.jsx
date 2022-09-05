import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateQuiz = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [paid,setPaid] = useState(false);
  const [single,setSingle] = useState(false);

  const onSubmit = (data) => console.log(data);
  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
      <div className="card-body">

        {/* name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Quizzz Name</span>
          </label>
          <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered input-info" />
        </div>

        {/* paid */}
        <div className="max-w-xs flex flex-row">
            <div className="form-control pr-5">
                <label className="label cursor-pointer">
                    <span className="label-text mr-3">Free </span> 
                    <input {...register("paid")} type="radio" value={false} className="radio checked:bg-red-500" />
                </label>
            </div>
            
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text mr-3">Paid </span> 
                    <input {...register("paid")} type="radio" value={true} className="radio checked:bg-blue-500" onClick={()=>{setPaid(true)}}/>
                </label>
            </div>
        </div>

        {/* Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Image</span>
          </label>
          <input type="file"  />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea {...register("description", { required: true })} className="textarea textarea-info" placeholder="Descrption"></textarea>
        </div>

        {/* Time */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Answer Time</span>
          </label>
        <div className="max-w-xs flex flex-row">
            <div className="form-control pr-5">
                <label className="label cursor-pointer">
                    <span className="label-text mr-3">Single </span> 
                    <input {...register("single")} type="radio" value={true} className="radio checked:bg-red-500" defaultChecked onClick={()=>{setSingle(false)}} />
                </label>
            </div>
            
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text mr-3">Total </span> 
                    <input {...register("single")} type="radio" value={false} className="radio checked:bg-blue-500" onClick={()=>{setSingle(true)}}/>
                </label>
            </div>
        </div>
          <input type="Number" {...register("time", { required: true })} placeholder="Time in Minutes" className="input input-bordered input-info" />
        </div>

        {/* Number of Retake */}
        <div className="flex flex-row justify-around">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Retake Number</span>
            </label>
            <input type="number" {...register("retake", { required: true })} placeholder="Number" className="input input-bordered input-info max-w-sm" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Retake Period</span>
            </label>
            <input type="number" {...register("period", { required: true })} placeholder="Month" className="input input-bordered input-info max-w-sm" />
          </div>
        </div>

        {/* Difficulty */}
        {/* <input type="range" min="0" max="100" value="25" className="range" step="25" />
        <div className="w-full flex justify-between text-xs px-2">
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div> */}

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">Proceed</button>
        </div>
      </div>
    </div>
    </form>
    </div>
  );
};

export default CreateQuiz;
