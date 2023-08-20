import Navbar from "./components/Navbar";
import Search from "./components/Search";



function App() {
  return (
    <>
    <Navbar />
    <main className="w-3/5 mx-auto">
      <Search />
    </main>
    </>
    
  );
}

export default App;