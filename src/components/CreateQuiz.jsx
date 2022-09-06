import { useForm } from "react-hook-form";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../lib/firebase.init";
import Loader from "./Loader";
import { useState } from "react";

const CreateQuiz = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const storage = getStorage(app);
  const [isLoading, setIsLoading] = useState(false)
  
  const onSubmit = (data) => {
    setIsLoading(true)
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + data.name);
    const uploadTask = uploadBytesResumable(
      storageRef,
      data.image[0],
      metadata
    );

    // Listen for state changes, errors, and completion of the upload.
    if (data.image[0]) {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("working");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
            default:
              console.log("working");
              break;
            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            console.log({ ...data, imageURL: downloadURL });
            setIsLoading(false)
          });
        }
      );
    }
  };
  return (
    <div className="container mx-auto">
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
          <div className="card-body">
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Quizzz Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="name"
                className="input input-bordered input-info"
              />
              {errors.name && (
                <span className="text-error">Name is required</span>
              )}
            </div>

            {/* paid */}
            <div className="max-w-xs flex flex-row">
              <div className="form-control pr-5">
                <label className="label cursor-pointer">
                  <span className="label-text mr-3">Free </span>
                  <input
                    {...register("paid")}
                    type="radio"
                    value={false}
                    className="radio checked:bg-red-500"
                    defaultChecked
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-3">Paid </span>
                  <input
                    {...register("paid")}
                    type="radio"
                    value={true}
                    className="radio checked:bg-blue-500"
                  />
                </label>
              </div>
            </div>

            {/* Image */}
            <div className="form-control">
              <label className="">
                📸
                <input
                  type="file"
                  {...register("image", { required: true })}
                  accept="image/x-png,image/gif,image/jpeg"
                />
              </label>
              {errors.image && (
                <span className="text-error">Image is required</span>
              )}
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-info"
                placeholder="Descrption"
              ></textarea>
              {errors.description && (
                <span className="text-error">Description is required</span>
              )}
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
                    <input
                      {...register("single")}
                      type="radio"
                      value={true}
                      className="radio checked:bg-red-500"
                      defaultChecked
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-3">Total </span>
                    <input
                      {...register("single")}
                      type="radio"
                      value={false}
                      className="radio checked:bg-blue-500"
                    />
                  </label>
                </div>
              </div>
              <input
                type="Number"
                {...register("time", { required: true })}
                placeholder="Time in Minutes"
                className="input input-bordered input-info"
              />
              {errors.time && (
                <span className="text-error">Time is required</span>
              )}
            </div>

            {/* Number of Retake */}
            <div className="flex flex-row justify-around">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Retake Number</span>
                </label>
                <input
                  type="number"
                  {...register("retake", { required: true })}
                  placeholder="Number"
                  className="input input-bordered input-info max-w-sm"
                />
                {errors.retake && (
                  <span className="text-error">Retake No. is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Retake Period</span>
                </label>
                <input
                  type="number"
                  {...register("period", { required: true })}
                  placeholder="Month"
                  className="input input-bordered input-info max-w-sm"
                />
                {errors.period && (
                  <span className="text-error">Retake Period is required</span>
                )}
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
              <button type="submit" className="btn btn-primary">
                Proceed
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
