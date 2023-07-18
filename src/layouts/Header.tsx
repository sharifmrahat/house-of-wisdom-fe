import Navbar from "@/components/header/Navbar";
import SearchBar from "@/components/header/SearchBar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarImage from "@/assets/images/user-blank.png";
import {
  BookOpenIcon,
  CheckCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";
import { handleLogout, setUser } from "@/redux/features/users/userSlice";

const Header = () => {
  const { user: currentUser, loggedIn } = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogoutStore = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedIn");
    dispatch(handleLogout());
    dispatch(setUser({}));
    navigate("/");
  };

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
            {loggedIn && currentUser ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="border-2 border-primary_dark">
                      <AvatarImage src={currentUser?.photoUrl ?? avatarImage} />
                      <AvatarFallback>HW</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="text-primary_dark text-center">
                      {currentUser?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      {" "}
                      <HeartIcon className="w-4 h-5 mr-2 text-pink-600" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <BookOpenIcon className="w-4 h-5 mr-2 text-violet-600" />
                      Reading
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <CheckCircleIcon className="w-4 h-5 mr-2 text-teal-600" />
                      Finished
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="focus:bg-blue-300">
                      <Link to="/addBook">
                        <PlusCircleIcon className="w-4 h-5 mr-2 inline-block" />
                        Add Book
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogoutStore}
                      className="text-red-700 focus:bg-red-300"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                size="sm"
                asChild
                className="bg-primary_dark border-2 border-transparent rounded-sm shadow-sm hover:bg-transparent hover:border-primary_dark hover:text-primary_dark"
              >
                <Link to="/login">Login</Link>
              </Button>
            )}
          </section>
        </main>
      </header>
    </>
  );
};

export default Header;
