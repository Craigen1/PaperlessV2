import { DefButton } from "../ComponentList";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function GetTickets() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://ipic.zammad.com/api/v1/tickets",

        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          auth: {
            username: "dfamoleras@innovativepkg.com.ph",
            password: "@Lion34907L",
          },
          method: "Get",
          mode: "cors",
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <DefButton
        onClick={() => {
          fetchData();
        }}
      />
    </div>
  );
}
