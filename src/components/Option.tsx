const Option = (props: any) => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl my-3">
        <div className="card-body">
          <div className="flex flex-row justify-around items-center">
            {props.selectType === true ? (
              <input type="checkbox" className="checkbox checkbox-accent" />
            ) : (
              <input
                type="radio"
                name="radio-4"
                className="radio radio-accent"
              />
            )}
            <p className="pl-5 card-title">{props.value}</p>
            <button className="pl-5 card-title text-primary" onClick={()=>props.removeOption(props.index)}>X</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Option;
