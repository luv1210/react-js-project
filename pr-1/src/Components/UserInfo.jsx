import React from "react";
import '../Css/UserInfo.css'
class UserInfo extends React.Component {
    constructor(props){
        super()
    }

    render () {
        return(
          <div className="profile-card">
         <img src={this.props.image} alt='img' className="profile-img" />

        <div className="profile-details">
          <h2>{this.props.name}</h2>
          <hr />
          <h3 className="work">Occupation:{this.props.occupation}</h3>

          <p><strong>Email:</strong> {this.props.email}</p>
          <p><strong>City:</strong> {this.props.city}</p>
          <p><strong>Age:</strong> {this.props.age}</p>
        </div>
      </div>
        )
    }
}
export default UserInfo;