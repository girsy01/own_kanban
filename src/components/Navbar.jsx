import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="wrapper">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/tasks/add-new">
          <button>Add Task</button>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
