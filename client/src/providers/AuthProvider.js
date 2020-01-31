import React from "react";
import axios from "axios";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { user: null, timer: null , time: 0, timerStart: 0, task_id: null, session_id: null};

  handleRegister = (user, history) => {
    axios.post("/api/auth", user)
      .then( res => {
        this.setState({ user: res.data.data, });
        history.push("/");
      })
    .catch( res => {
      console.log(res);
    })
  }
	
	startTimer = (task_id, session_id) => {
		const timerStart = Date.now() - this.state.time;
		const timer = setInterval(() => {
			this.setTime(Date.now() - timerStart);
		},1000);
		this.setState({
			user: this.state.user, 
			timer: timer, 
			timerStart: timerStart,
			task_id: task_id,
			session_id: session_id
		}); 
		
	}

	setTime = (time) => {
		this.setState({...this.state, time: time});
	}

	timerOn = () => {
		return this.state.timer !== null;
	}

	stopTimer = () => {
		const {timer} = this.state;
		clearInterval(timer);
		this.setState({...this.state, timer: null, timerOn: false});
  }
  
  resetTimer = () => {
		// this.submitTime();
		
    this.setState({
      timerStart: 0,
			time: 0,
			timer: null
    });
  };

	submitTime = () => {
		const{time, task_id} = this.state;
    axios.post(`/api/sessions`, {time, task_id})
      .then( res =>{
        this.setState({...this.state, timer: null, timerStart: 0, time: 0, task_id: null});
      }).catch(err => {
        console.log(err);
      })
	}
	updateTime = (id, minutes) => {
		axios.put(`/api/session/${id}`, {minutes})
			.then( res => {
				debugger
				this.setState({...this.state, timer: null, timerStart: 0, time: 0, task_id: null});
			})
			.catch( err => {
				console.log(err);
			})
	}
	
	getTime = () => {
		const{time} = this.state;
		const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
		const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
		return({hours,minutes,seconds});
	}
	
  handleLogin = (user, history) => {
    axios.post("/api/auth/sign_in", user)
      .then( res => {
        this.setState({ user: res.data.data, });
        history.push("/");
      })
      .catch( res => {
        console.log(res);
      })
  }
  
  handleLogout = (history) => {
    axios.delete("/api/auth/sign_out")
      .then( res => {
        this.setState({ user: null, });
        history.push('/login');
      })
      .catch( res => {
        console.log(res);
      })
  }
  
  render() {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        authenticated: this.state.user !== null,
        handleRegister: this.handleRegister,
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout,
				updateUser: this.updateUser,
				startTimer: this.startTimer,
        stopTimer: this.stopTimer,
        resetTimer: this.resetTimer,
				submitTime: this.submitTime,
        getTime: this.getTime,
        timerOn: this.timerOn,
        setUser: (user) => this.setState({ user, timer: this.state.timer}),
      }}>
        { this.props.children }
      </AuthContext.Provider>
    )
  }
};

export default AuthProvider;
