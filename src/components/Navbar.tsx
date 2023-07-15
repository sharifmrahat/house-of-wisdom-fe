import { Link } from "react-router-dom";

const Navbar = () => {
  const publicRoutes = [
    {
      name: "Books",
      route: "/books",
    },
    {
      name: "About",
      route: "/about",
    },
    {
      name: "Contact",
      route: "/contact",
    },
  ];

  return (
    <>
      {publicRoutes.map((nav, i) => (
        <div
          className="text-primary_dark font-semibold border-b-2 border-b-transparent hover:border-b-primary_dark"
          key={i}
        >
          <Link to={nav.route}>{nav.name}</Link>
        </div>
      ))}
    </>
  );
};

export default Navbar;
