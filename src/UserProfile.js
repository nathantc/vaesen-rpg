import {PropTypes} from 'prop-types';

export class UserProfile {
  constructor(username) {
    this.username = username;
  }
}

export function fetchUserProfile() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await fetch('api/user');
        const data = await response.json();
        if (data.username == null) {
          reject(new Error('User is not authenticated'))
        } else {
          resolve(new UserProfile(data.username));
        }
      } catch (e) {
        reject(new Error('Unable to retrieve user profile.'));
      }
    })();
  })
}

export function UserName({userProfile}) {
  if (userProfile == null) {
    return <div></div>;
  }
  console.log('userProfile', userProfile);
  return <div>Username: {userProfile.username}</div>
}

UserName.propTypes = {
  userProfile: PropTypes.instanceOf(UserProfile)
}
