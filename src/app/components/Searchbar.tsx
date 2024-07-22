
export default function Searchbar(){
    return(
        <>
        <form action="#" method="get" className="searchBar">
            <label htmlFor="searchBar"></label>
            <div className="inputWrapper">
                <input type="text" autoComplete="off" name="query" placeholder="Search for snips..." aria-label="Search" />
                <button type="submit"><div className="searchIcon"></div></button>
            </div>
        </form>
        </>
    )
}