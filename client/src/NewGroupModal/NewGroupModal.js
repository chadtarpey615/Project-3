import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./NewGroupModal.css";
import { Avatar } from "@material-ui/core";
import { UserContext } from "../utils/UserStore";
import { GroupContext } from "../utils/GroupStore";
import API from "../utils/API";

function NewGroupModal() {

  const [newSubGroup, setNewSubGroup] = useState({});
  const [ userFormState, setUserFormState ] = useState([]);
  const { groupState, setGroupState } = useContext(GroupContext);
  


// console.log(groupState.groupMembers)
console.log("after rata")
// access array, .map
  let subGroupData = {}

//   useEffect(() => {
//       loadSubGroup(users)
//   }, [])

function buildUserForm(event) {
    console.log(event.target)
    const id = event.target.value;
    const name = event.target.innerHTML
    const userObject = {name: name, _id: id }
    setUserFormState([ ...userFormState, userObject])
    console.log(userFormState)
}


  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewSubGroup({ ...newSubGroup, [name]: value });
  }

    function handleFormSubmit(e) {
      e.preventDefault();
      console.log(newSubGroup);
      console.log(userFormState)
      API.createSubGroup(newSubGroup.subGroupName, userFormState) 
        .then((res) => {
            subGroupData = {
                _id: res.data._id,
                name: res.data.name    
            };
           
        
        })
        .catch((err) => console.log(err));
    }

    function addSubGroup(subGroupData, users) {
        API.addSubGroup(subGroupData, users).then((res) => {
      console.log(res);
    //   loadSubGroup(users);
    });
    }

    //   function loadSubGroup(users) {
    //     // console.log("before");
    //     // console.log(username);
    //     API.getUser(users)
    //       .then((res) => {
    //         console.log(res.data);
    //         setGroupState(res.data);
    //       })
    //       .catch((err) => console.log(err));
    //   }

  return (
    <Popup
      className="popup__content"
      trigger={<button className="button"> Add New Group </button>}
      position="bottom center"
      closeOnDocumentClick
      nested
    >
      <div modal__container>
        <div modal__content>
          {/* Enter Group Name */}
          <form>
            <input
              name="subGroupName"
              onSubmit={handleFormSubmit}
              className="modal__group__name"
              onChange={handleInputChange}
              placeholder="Enter Group Name"
            />
          </form>
        </div>

        <div>{userFormState.map((user) => (
        
            <p>
                {user.name}
            </p>
      
        ))}</div>
        <br></br>
        <div className="modal__group__members">
          Click to Add to Group
          
          {groupState.groupMembers.map((groupMembers) => (
            <button
              key={groupMembers._id}
              className="sub__btn"
              value={groupMembers._id}
              onClick={buildUserForm}
            >
              {groupMembers.name}
              {/* <Avatar /> */}
            </button>
          ))}
        </div>

        <button
          className="modal__submit__button"
          onClick={handleFormSubmit}
          type="submit"
        >
          Submit
        </button>
      </div>
    </Popup>
  );
}

export default NewGroupModal;
