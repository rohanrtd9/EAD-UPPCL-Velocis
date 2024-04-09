import { Link } from "react-router-dom";
import Button from "./Button";

function Header({ title, action }) {
  const { button, path } = action;
  console.log(title);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-3 p-4">
        <p className="font-semibold">{title}</p>
        {button !== "" && (
          <Link to={path}>
            <Button title={button} />
          </Link>
        )}
      </div>
      <hr />
    </div>
  );
}
export default Header;
