import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const SearchBar = () => {
  return (
    <>
      <Command className="w-[500px] bg-white shadow rounded">
        <CommandInput placeholder="Search books, genres, authors" />
        <CommandList className="absolute w-[500px] bg-white shadow rounded top-16">
          {/* <CommandEmpty>
            No books found!
          </CommandEmpty> */}
          {/* <CommandGroup heading="Books">
            <CommandItem>
              <span>Book Name</span>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </Command>
    </>
  );
};

export default SearchBar;
