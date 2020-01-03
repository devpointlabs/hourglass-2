import React from "react";
import axios from "axios";
import { UserConsumer, } from "../providers/UserProvider";

class FetchUser extends React.Component {

state = { loaded: false, };

componentDidMount() {
  if (this.props.auth.authenticated) {
    this.loaded() 
  }
  else {
    if (this.checkLocalToken()) {
      axios.get("/api/auth/validate_token")
        .then(res => {
          this.props.auth.setUser(res.data)
          this.loaded();
        })
        .catch(err => {
          this.loaded(); 
        })
    }
    else {
      this.loaded();
    }
  }
};

checkLocalToken = () => {
  const token = localStorage.getItem("access-token");
  return token; 
}

loaded = () => {
  this.setState({ loaded: true, });
}

  render() {
    return this.state.loaded ? this.props.children : null 
  };
};

const ConnectedFetchUser = (props) => (
  <UserConsumer> 
    {auth => (
      <FetchUser {...props} auth={auth} />
    )}
  </UserConsumer>
)

export default ConnectedFetchUser; 