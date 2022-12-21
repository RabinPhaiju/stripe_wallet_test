import { createContext, useState } from "react";
// initial state
const initialState = {price: 0};

// create context
export const UserContext = createContext(initialState);

// create provider
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const addUser = (item) => {
    setUser(item)
    fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ 
        username:item.username,
        email:item.email
      }),
    })
  };

  const updateprice = (price) => {
    setUser(prev=>({...prev,price:price}))
  };
  return (
    <UserContext.Provider
      value={{
        user: user,
        updateprice: updateprice,
        addUser: addUser,
        setUser:setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
