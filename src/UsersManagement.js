import React, { useState } from "react";
import UserMangeComp from "./UserMangeComp";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import AddUser from "./AddUser";
import utilsForUsers from "./utilsForUsers";

const UsersManagement = (props) => {
  const [usersShow, setUsersShow] = useState([]);
  const [usersManagementChecked, setUsersManagementChecked] = useState("false");
  const [getUsersManagementChecked, setGetUsersManagementChecked] = useState("false");
  const history = useHistory();

  const getUsers = async () => {
    if (getUsersManagementChecked === "false") {
      let temp = await utilsForUsers.getALL();
      localStorage.setItem("usersForMain", JSON.stringify(temp));
      let item = JSON.parse(localStorage.getItem("usersForMain")).map(
        (item, index) => {
          return <UserMangeComp key={index} user={item} />;
        }
      );
      setGetUsersManagementChecked("true");
      setUsersShow(item);
    } else {
      setGetUsersManagementChecked("false");
    }
  };

  const addUser = () => {
    if (usersManagementChecked === "false") {
      setUsersManagementChecked("true");
      setGetUsersManagementChecked("false");

      history.push({
        pathname: `/MainPage/UsersManagement/AddUser`,
      });
    } else {
      history.push({
        pathname: `/MainPage/UsersManagement/`,
      });
      setUsersManagementChecked("false");
    }
  };

  return (
    <div>
      <h4>Users Management</h4>

      <button onClick={getUsers}>All User's</button>
      <button onClick={addUser}>
        <Link to={`/MainPage/UsersManagement/AddUser`}>Add User</Link>
      </button>
      <br />
      <br />
      <div className="tbl">
        {getUsersManagementChecked === "true" ? usersShow : ""}

        <Switch>
          <Route path="/MainPage/UsersManagement/AddUser" component={AddUser} />
        </Switch>
      </div>
    </div>
  );
};

export default UsersManagement;
