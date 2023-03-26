import User from 'models/User';
import {faker} from "@faker-js/faker";

export const doTouristCreation = () => {
    const randomUserId = faker.datatype.number({ max: 10 });
    const randomUsername = faker.name.fullName();
    const randomToken = faker.datatype.number(20);

    const newUser = new User();
    newUser.id = randomUserId;
    newUser.token = randomToken;
    newUser.username = randomUsername;

    console.log('newUser =', newUser);

    const touristUser= JSON.stringify({randomUserId, randomUsername, randomToken});
    localStorage.setItem('touristUser'+randomUserId, touristUser);

    console.log('touristUser =', touristUser);

  return newUser;
};

