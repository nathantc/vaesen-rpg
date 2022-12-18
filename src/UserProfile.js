import {PropTypes} from 'prop-types';

export class UserProfile {
  constructor(name) {
    this.name = name;
  }
}

export function userAuthenticated() {
  return new Promise((resolve) => {
    (async () => {
      try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        console.log(`payload: ${JSON.stringify(payload)}`);
        resolve(payload.clientPrincipal != null);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    })();
  })
}

export function fetchUserProfile() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await fetch('api/user-profile');
        const data = await response.json();
        console.log(`Profile: ${JSON.stringify(data)}`);
        if (data.profile == null) {
          reject(new Error('User is not authenticated'))
        } else {
          resolve(new UserProfile(data.profile.name));
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
  return <div>Username: {userProfile.name}</div>
}

UserName.propTypes = {
  userProfile: PropTypes.instanceOf(UserProfile)
}
