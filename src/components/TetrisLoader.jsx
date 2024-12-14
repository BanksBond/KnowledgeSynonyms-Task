import "./TetrisLoader.css";
function TetrisLoader() {
  return (
    <div className="flex flex-col   items-center">
      <span className="loader"></span>
      <h2 className=" text-white font-semibold text-xl mt-2">Loading...</h2>
    </div>
  );
}

export default TetrisLoader;
