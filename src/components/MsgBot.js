import React, { useState } from "react";

function MsgBot() {
  const [message, setMessage] = useState("");
  const [groups, setGroups] = useState(["Friends", "Family", "Coworkers"]);
  const [selectedGroup, setSelectedGroup] = useState("Friends");

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(message);
    // Here you can send the message to a server or other component to handle it
  }

  function handleGroupSelect(event) {
    setSelectedGroup(event.target.value);
  }

  function handleNewGroup(event) {
    event.preventDefault();
    if (selectedGroup && !groups.includes(selectedGroup)) {
      setGroups([...groups, selectedGroup]);
    }
  }

  return (
    <div className="messaging-module">
      <div className="message-header">
        <h2>{selectedGroup}</h2>
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {groups.map((group) => (
              <a
                key={group}
                className="dropdown-item"
                href="#"
                onClick={() => setSelectedGroup(group)}
              >
                {group}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="message-list">
        <div className="message-item from-me">
          <div className="message-content">
            <p>Hey, how's it going?</p>
          </div>
        </div>
        <div className="message-item from-others">
          <div className="message-avatar">
            <img src="https://via.placeholder.com/50" alt="avatar" />
          </div>
          <div className="message-content">
            <p>Not bad, you?</p>
          </div>
        </div>
      </div>
      <div className="message-footer">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Type a message..."
              value={message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default MsgBot;
