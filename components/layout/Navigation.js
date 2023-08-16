import SideBar from "./SideBar";
import Search from "./SearchBar";

function Navigation() {
    return (
        <div className="bg-transparent p-4 flex justify-between items-center h-fit">
            <div className="flex items-center justify-start space-x-2 md:w-1/3">
                <img className="h-[5vh] min-h-[2rem]" src="/images/logo.png"></img>
                <h1 className="text-green-500" style={{ fontSize: 'max(3vh, 1.5rem)' }}>Concertify</h1>
            </div>
            <div className="flex items-center justify-center md:w-1/3 invisible sm:visible">
                <Search />
            </div>
            <div className="flex items-center justify-end flex-shrink-0 md:w-1/3">
                <SideBar />
            </div>
        </div>
    );
}

export default Navigation;
