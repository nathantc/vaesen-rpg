import {Profile} from './api-data';

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
          resolve(new Profile(data.profile.name));
        }
      } catch (e) {
        reject(new Error('Unable to retrieve user profile.'));
      }
    })();
  })
}

export function submitProfileChanges(profile) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: profile.name })
        };
        await fetch('api/user-profile', requestOptions);
        resolve();
      } catch {
        reject(new Error('Unable to update profile data'));
      }
    })();
  });
}
