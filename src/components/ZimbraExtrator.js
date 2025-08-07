import React, { useContext, useEffect, useState } from "react";
import { DefButton, DefInput, DefTable } from "./ComponentList";
import { ITopContext } from "../hooks/TopContext";

export default function ZimbraExtrator() {
  const { DateNow } = useContext(ITopContext);
  const [ThisDate, setThisDate] = useState(DateNow);
  const [ConvertedEpochTime, setConvertedEpochTime] = useState(
    Math.floor(new Date(DateNow) / 1000)
  );
  const [loading, setloading] = useState(false);
  const [rows, setrows] = useState([]);
  const [Users, setUsers] = useState([]);
  const [rowsDisplay, setrowsDisplay] = useState([]);
  const columns = [
    {
      name: "link",
    },
    {
      name: "id",
      disabled: true,
    },
    {
      name: "status",
      disabled: true,
    },
    {
      name: "from",
      disabled: true,
    },
    {
      name: "assigned",
      disabled: true,
    },
    {
      name: "created_at",
      disabled: true,
    },
    {
      name: "subject",
      disabled: true,
    },
    {
      name: "client",
      disabled: true,
    },
    {
      name: "branch",
      disabled: true,
    },
    {
      name: "SolvedDate",
      disabled: true,
    },
    {
      name: "SolvedTime",
      disabled: true,
    },
    {
      name: "SapRelated",
      disabled: true,
    },
    {
      name: "tags",
      disabled: true,
    },
  ];
  const checker = async (e) => {
    console.log(rows[0].via.source.from.name);
  };
  const updateTable = (e) => {
    try {
      const newBatch = rows.map((item, index) => {
        let iser;
        Users.map((i) => {
          if (i.id == item.assignee_id) {
            iser = i;
          }
        });
        let tagsx = "";
        item.tags.map((i) => {
          if (i != "undefined") tagsx = tagsx + i + ", ";
        });
        return {
          ...item,
          link: `https://ipichelpdesk.zendesk.com/agent/tickets/${item.id}`,
          from: item.via.source.from.name,

          client: item.fields[0].value,
          branch: item.fields[1].value,
          SolvedTime: item.fields[2].value,
          SolvedDate: item.fields[3].value,
          SapRelated: item.fields[4].value,
          tags: tagsx,
          assigned: iser ? iser.name : "",
        };
      });
      setrowsDisplay(newBatch);
    } catch (e) {
      console.log(e);
    }
  };

  const EpochTime = (date) => {
    setConvertedEpochTime(Math.floor(new Date(date) / 1000));
  };
  const onChangeHandler = (e) => {
    setThisDate(e.target.value);
    EpochTime(e.target.value);
  };
  const Checkticket = async (e) => {
    console.log(rows);
  };
  const Zimbra = async (e) => {
    setloading(true);
    try {
      const iDepList = await fetch("ZIMBRAAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          EPOCH: ConvertedEpochTime,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          return "error";
        });
      setrows(iDepList.tickets);
      console.log({ iDepList });
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const ZimbraGetUsers = async (e) => {
    try {
      const Get = await fetch("ZIMBRAAPIUSERS", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
      })
        .then((res) => res.json())
        .catch(() => {
          return "error";
        });
      setUsers(Get.users);
      console.log(Get.users);
    } catch (error) {
      console.log(error);
    }
  };

  const [Expand, setExpand] = useState(false);
  const onExpandHandler = (e) => {
    setExpand(!Expand);
  };
  useEffect(() => {
    updateTable();
  }, [rows]);
  useEffect(() => {
    ZimbraGetUsers();
  }, []);

  return (
    <>
      <div className="frame">
        <DefInput type="date" value={ThisDate} handler={onChangeHandler} />
        <DefButton
          type="2"
          text="Get Tickets"
          onClick={Zimbra}
          loading={loading}
        />
        {/* <DefButton type="2" text="Check Ticket " onClick={checker} /> */}
        <div
          className={
            Expand
              ? "fixed top-0 left-0 h-screen w-full   z-50 overflow-auto"
              : "overflow-auto"
          }
        >
          <div className="frame ">
            <div
              className={
                Expand ? "fixed w-full frame p-0 m-0" : "overflow-auto"
              }
            >
              <DefButton
                type="2B"
                text={Expand ? "Minimize" : "Maximize"}
                className={
                  Expand
                    ? "pb-4 w-fit float-right mr-10"
                    : "pb-4 w-fit float-right "
                }
                onClick={onExpandHandler}
              />
            </div>
            <br></br>
            <DefTable
              columns={columns}
              rows={rowsDisplay}
              btnCss="w-fit "
              btnLabel="Remove"
              spanCSS="w-full"
              maximize={Expand}
              // handleOption={handleOption}
              // onChange={handleCHange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
