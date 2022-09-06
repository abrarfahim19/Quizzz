import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

const CreateUsername = () => {
    const userRef = useRef("");
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    const onSubmit = (data:any) => {
        console.log(data);
    } 
    return (
        <div className='card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100'>
            <div className='card-body'>
            
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">UserName</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Username"
                onChange={(e)=>{userRef.current=e.target.value}}
                className="input input-bordered input-info"
              />
              {errors.name && (
                <span className="text-error">Name is required</span>
              )}
            </div>
            {/*Live Validation */}
            <div>
                <h2>{userRef.current && `${userRef.current} is Available`}</h2>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Proceed
              </button>
            </div>
            </form>
            </div>
        </div>
    );
};

export default CreateUsername;