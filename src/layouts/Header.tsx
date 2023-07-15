import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-primary_light text-primary_dark">
        <main className="flex flex-row justify-between items-center py-4 max-w-7xl mx-auto">
          <section className="flex">
            {/* <div>Logo</div> */}
            <div className="text-lg lg:text-xl font-semibold">
              House of Wisdom
            </div>
          </section>
          <section>
            <SearchBar />
          </section>
          <section>
            <Navbar />
          </section>
          <section>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </section>
        </main>
      </header>
    </>
  );
};

export default Header;
