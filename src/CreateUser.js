import React, { useState } from "react";
import utilsForUsers from "./utilsForUsers";
import { useHistory } from "react-router-dom";
import "./background.css";

const CreateUser = (props) => {
  const [userInfo, setUserInfo] = useState({ userName: "", password: "" });
  const history = useHistory();

  const Login = async (e) => {
    e.preventDefault();
    var usersForMain = JSON.parse(localStorage.getItem("usersForMain"));
    let createUserObj;
    let userObj = usersForMain.filter((item) => {
      if (item.userName === userInfo.userName) {
        if (userInfo.password !== "") {
          return item;
        } else {
          alert("please creat an account with new password");
          console.log("20");
          return null;
        }
      }
      return null;
    });
    console.log(userObj);
    console.log(userObj.length);
    if (userObj.length > 0) {
      console.log(userObj[0]._id);

      var data = await utilsForUsers.getById(userObj[0]._id);

      console.log("data", data);
      createUserObj = [
        {
          userName: userInfo.userName,
          password: userInfo.password,
        },
        {
          FirstName: data[1].FirstName === "" ? "" : data[1].FirstName,
          LastName: data[1].LastName === "" ? "" : data[1].LastName,
          CreatedDate: data[1].CreatedDate === "" ? "" : data[1].CreatedDate,
          sessionTimeOut: 60,
        },
        {
          permissions: data[2].permissions === [] ? [] : data[2].permissions,
        },
      ];

      localStorage.setItem("userForMain", JSON.stringify(createUserObj));
      await utilsForUsers.updateUser(createUserObj, userObj[0]._id);

      props.history.push({
        pathname: `/MainPage/`,
      });
    } else {
      alert("User doesn't exist");
      console.log("63");
    }
  };

  const cancleFunc = () => {
    history.goBack();
  };
  return (
    <div className="grad">
      <h2>Create User</h2>
      <form onSubmit={Login}>
        userName:{" "}
        <input
          type="text"
          onChange={(e) =>
            setUserInfo({ ...userInfo, userName: e.target.value })
          }
        />{" "}
        <br />
        password:{" "}
        <input
          type="text"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />{" "}
        <br />
        <input type="submit" value="Create" />
        <input type="button" value="Cancle" onClick={cancleFunc} />
      </form>
    </div>
  );
};

export default CreateUser;
