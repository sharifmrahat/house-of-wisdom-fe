import Navbar from "@/components/header/Navbar";
import SearchBar from "@/components/header/SearchBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-primary_light text-primary_dark">
        <main className="flex flex-row justify-between items-center py-4 max-w-7xl mx-auto">
          <section className="flex">
            {/* <div>Logo</div> */}
            <Link
              to="/"
              className="text-xl lg:text-2xl font-semibold font-heading cursor-pointer"
            >
              House of Wisdom
            </Link>
          </section>
          <section>
            <SearchBar />
          </section>
          <section>
            <Navbar />
          </section>
          <section>
            <Button
              size="sm"
              asChild
              className="bg-primary_dark border-2 border-transparent rounded-sm shadow-sm hover:bg-transparent hover:border-primary_dark hover:text-primary_dark"
            >
              <Link to="/login">Login</Link>
            </Button>
          </section>
        </main>
      </header>
    </>
  );
};

export default Header;
