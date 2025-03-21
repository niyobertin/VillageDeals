import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../features/counter/counterSlice";
import { RootState } from "../store/store";

const Home: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Home Page</h1>
      <p>Counter: {count}</p>
      <button
        onClick={() => dispatch(increment())}
        className="m-2 p-2 bg-blue-500 text-white"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        className="m-2 p-2 bg-red-500 text-white"
      >
        Decrement
      </button>
    </div>
  );
};

export default Home;
