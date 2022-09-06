import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useForm } from 'react-hook-form';
import app from "../lib/firebase.init";

const UploadFile = () => {
  const {register, handleSubmit} = useForm();
  const storage = getStorage(app);
  
  const onSubmit = (data:any) => {
    const metadata = {
      contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + data.image[0].name);
    const uploadTask = uploadBytesResumable(storageRef, data.image[0], metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="">
            📸
            <input type="file" {...register("image", { required: true })} accept="image/x-png,image/gif,image/jpeg" />
          </label>
          <button className="Upload">Submit</button>
    </form>
  );
};

export default UploadFile;