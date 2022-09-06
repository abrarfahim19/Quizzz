import { useEffect, useState } from "react";

const useTokens = (user) => {
  const [tokens, setTokens] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const userName = user?.user?.displayName;
    const currentUser = { email: email, userName: userName };
    if (email) {
      fetch(`https://celestial123.herokuapp.com/user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data inside useToken", data);
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setTokens(accessToken);
        });
    }
  }, [user]);
  return [tokens];
};

export default useTokens;
