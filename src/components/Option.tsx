const Option = (props: any) => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-row justify-between items-center">
            {props.selectType === "multi" ? (
              <input type="checkbox" className="checkbox checkbox-accent" />
            ) : (
              <input
                type="radio"
                name="radio-4"
                className="radio radio-accent"
              />
            )}
            <p className="card-title">{props.value}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Option;
