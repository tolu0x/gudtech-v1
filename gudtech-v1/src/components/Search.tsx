import React, { useState } from "react";
import axios from "axios";
import {Input} from "./ui/input";
import {Button} from "./ui/button";

interface User {
  address: string,
  twitterUserId: number,
  twitterName: string,
  twitterUsername: string,
  twitterPfpUrl: string
}


const Search = ({}) => {
    const [searchData, setSearchData] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [isUser, setIsUser] = useState(false);
    
    
    const handleSearch = async () => {
      axios.get<{users: User[]}>(`https://prod-api.kosetto.com/search/users?username=${searchData}`)
      .then(res => {
        setUsers(res.data.users);
        setIsUser(!isUser)
        console.log(res.data.users);
      })
      .catch(error => {
        console.error("Error fetching data", error)
      })
  }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchData(e.target.value);
    };

    const handleReset = () => {
      setSearchData("");
      setIsUser(!isUser)
      setUsers([]);
    }

    return (
      <div className={`h-max pt-72 transition-all ${isUser && "users-active"}`}>
        <div className="flex justify-center items-center">
          <Input type="text" className="text-black font-medium text-lg" value={searchData} onChange={handleChange} placeholder="Search for a twitter username..." />
          <Button className="ml-3 bg-blue-600 rounded-xl" onClick={handleSearch} variant={'default'}>Search</Button>
      </div>

     <div>
     {
        users && users.map(user => (
          <div className="pt-16 lg:pt-20" key={user?.twitterUserId}>
           <div className="flex items-center justify-start gap-5">
           <img className="rounded-full w-20" src={user.twitterPfpUrl} alt={user.twitterUsername} />
            <div className="">
            <h2 className="font-semibold text-xl">{user.twitterName}</h2>
            <p className="font-medium">@{user.twitterUsername}</p>
            </div>
           </div>
            <p className="py-4 font-medium">{`Address: ${user.address}`}</p>
            <button className="bg-red-600 w-20 p-3 rounded-xl transition-all hover:scale-110" onClick={handleReset}>Reset</button>
          </div>
        ))
      }
     </div>

      <style>{`
        .users-active{
          padding-top: 10rem !important;
        }
      `}</style>
      </div>
    )
  }
  
  export default Search