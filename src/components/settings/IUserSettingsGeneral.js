import React, { useContext, useEffect, useState } from "react";
import { DefInput } from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";

export default function IUserSettingsGeneral() {
  const { userInfo } = useContext(ITopContext);
  const ComponentList = [
    {
      label: "Frist Name",
      name: "username",
      type: "text",
      disabled: true,
    },
    {
      label: "Last Name",
      name: "lastname",
      type: "text",
      disabled: true,
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      disabled: true,
    },
    {
      label: "Password",
      name: "password",
      type: "text",
      disabled: true,
    },
    {
      label: "Department",
      name: "Department",
      type: "text",
      disabled: true,
    },
    {
      label: "Cost Center",
      name: "CostCenter",
      type: "text",
      disabled: true,
    },
    {
      label: "Section",
      name: "Section",
      type: "text",
      disabled: true,
    },
  ];
  const [Componentvalues, setComponentvalues] = useState({});

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setComponentvalues((e) => ({ ...e, [name]: value }));
  };

  useEffect(() => {
    // setComponentvalues((e) => ({ ...e, }));
    // setComponentvalues((e) => ({ ...e, }));
    // setComponentvalues((e) => ({ ...e,  }));
    // setComponentvalues((e) => ({ ...e,  }));
    setComponentvalues({
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      username: userInfo.username,
      password: "******",
      Department: userInfo.Name,
      CostCenter: userInfo.costName,
      Section: userInfo.sectionname,
    });
  }, []);

  return (
    <div>
      <div className="frame pb-2">
        {ComponentList.map((item, index) => (
          <React.Fragment key={index}>
            <DefInput
              label={item.label}
              name={item.name}
              type={item.type}
              disabled={item.disabled}
              onChange={onChangeHandler}
              value={Componentvalues[item.name]}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
