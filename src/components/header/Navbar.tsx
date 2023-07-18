import { Link } from "react-router-dom";

const Navbar = () => {
  const publicRoutes = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Books",
      route: "/books",
    },
    // {
    //   name: "About",
    //   route: "/profile",
    // },
  ];

  return (
    <>
      <div className="flex justify-between items-center gap-10">
        {publicRoutes.map((nav, i) => (
          <div
            className="text-primary_dark font-semibold border-b-2 border-b-transparent hover:border-b-primary_dark"
            key={i}
          >
            <Link to={nav.route}>{nav.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
