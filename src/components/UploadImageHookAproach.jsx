import { getStorage, ref } from 'firebase/storage';
import { useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { useForm } from 'react-hook-form';
import app from '../lib/firebase.init';

const storage = getStorage(app);

const UploadImageHookAprach = () => {
  const {register, handleSubmit} = useForm();
  
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const storageRef = ref(storage, 'images.jpg');
  const [selectedFile, setSelectedFile] = useState();

  const onSubmit = (data) => {
    const result = uploadFile(storageRef, selectedFile, {
        contentType: 'image/jpeg'
      });
      alert(`Result: ${JSON.stringify(result)}`);
}

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        {error && <strong>Error: {error.message}</strong>}
        {uploading && <span>Uploading file...</span>}
        {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>}
        {selectedFile && <span>Selected file: {selectedFile.name}</span>}
      <label className="">
            📸
            <input type="file" {...register("image", { required: true })} accept="image/x-png,image/gif,image/jpeg" />
          </label>
          <button className="Upload">Submit</button>
      </p>
    </form>
    </div>
  )
}

export default UploadImageHookAprach;