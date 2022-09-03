import React from "react";

const QuizCard = () => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Quizzz" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Quiz Name
          <div className="badge badge-secondary">Paid</div></h2>
          <p>This is Quizzz Description... Intended to make you think...</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Try Quiz</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
