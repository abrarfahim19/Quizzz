const CreateQuiz = () => {
  return (
    <div className="flex flex-col items-start justify-center">
      <h2 className="text-bg">Quiz Name</h2>
      <input
        type="text"
        placeholder="Quiz Name"
        className="input input-bordered input-info w-full max-w-xs"
      />
      <textarea className="textarea textarea-info" placeholder="Bio"></textarea>
      <select className="select select-info w-full max-w-xs">
        <option disabled selected>
          Select language
        </option>
        <option>Paid</option>
        <option>Unpaid</option>
        <option>Italian</option>
      </select>
    </div>
  );
};

export default CreateQuiz;
