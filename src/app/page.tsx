
import Searchbar from "./components/Searchbar";
import SnipsPreview from "./components/SnipsPreview";
export default async function Home() {
  return (
    <>
    <div className="homeBanner">
      <h1 className="homeBannerTitle">The pen-ultimate code snippet repository.</h1>
      <em className="homeBannerText">Not a pen. Also definitely not the best. </em>
    </div>
    <Searchbar></Searchbar>
    <SnipsPreview></SnipsPreview>
    </>

  
  )
};

//TODO: It would make sense for the edit and delete buttons to be included in the view-snip page, but it's currently not working. 
//You've also got a lot of type anys to fix.