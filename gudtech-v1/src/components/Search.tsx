import React, { useState, useEffect } from "react";
import axios from "axios";
import {Input} from "./ui/input";
import {Button} from "./ui/button";

interface User {
  address: string,
  twitterUserId: number,
  twitterUsername: string,
  twitterPfpUrl: string
}


const Search = ({}) => {
    const [searchData, setSearchData] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    
    const handleSearch = () => {
      axios.get<{users: User[]}>(`https://prod-api.kosetto.com/search/users?username=${searchData}`)
      .then(res => {
        setUsers(res.data.users);
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

    return (
      <div className="h-max">
        <div className="flex justify-center items-center">
          <Input type="text" className="text-black font-medium text-lg" value={searchData} onChange={handleChange} placeholder="Search for a twitter username..." />
          <Button className="ml-3 bg-blue-600 rounded-xl" onClick={handleSearch} variant={'default'}>Search</Button>
      </div>

     <div>
     {
        users && users.map(user => (
          <div key={user?.twitterUserId}>
            <img src={user.twitterPfpUrl} alt={user.twitterUsername} />
            <p>{user.twitterUsername}</p>
            <p>{`Address: ${user.address}`}</p>
          </div>
        ))
      }
     </div>

      </div>
    )
  }
  
  export default Search