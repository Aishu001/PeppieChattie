import React from 'react'
import '../Style/Chat.css'

function Chat({ userID }) {


  
  return (
 <>
 {/* Conditionally render different containers based on selectedUserId */}
 {userID ? (
        <div className="chatbarr">
          <div className="container">
            {/* Apply the container class */}
            <div className="navbar">{/* Content for when user is selected */}</div>
          </div>
        </div>
      ) : (
        <div className="chatbar">
          <div className="container">
            {/* Apply the container class */}
            <img src="chatttieeee.jpeg" alt="Profile" />
          </div>
        </div>
      )}
 </>
  )
}

export default Chat