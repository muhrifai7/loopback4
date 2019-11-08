// import {UserService} from '@loopback/authentication';
// import {repository} from '@loopback/repository';
// import {HttpErrors} from '@loopback/rest';
// // import {UserProfile, securityId} from '@loopback/security';
// import {inject} from '@loopback/context';

// import {PasswordHasher} from './hash.password.bcryptjs';
// import {PasswordHasherBindings} from '../keys';
// import {ProfileRepository,Credentials} from '../../repositories/profile.repository';
// import {Profile} from '../../models/profile.model';
// import {Credential }from '../types'

// export class MyUserService implements UserService <Profile,Credentials> {
//   constructor (
//     @repository(ProfileRepository) public profileRepository: ProfileRepository,
//     @inject(PasswordHasherBindings.PASSWORD_HASHER)
//     public passwordHasher: PasswordHasher,
//   ){}
//   async verifyCredentials(credentials: Credentials): Promise<Profile> {
//     const invalidCredentialsError = 'Invalid email or password.';

//     const foundUser = await this.profileRepository.findOne({
//       where: {email: credentials.email},
//     });

//     if (!foundUser) {
//       throw new HttpErrors.Unauthorized(invalidCredentialsError);
//     }
//     const passwordMatched = await this.passwordHasher.comparePassword(
//       credentials.password,
//       foundUser.password,
//     );

//     if (!passwordMatched) {
//       throw new HttpErrors.Unauthorized(invalidCredentialsError);
//     }

//     return foundUser;
//   }
//   // convertToUserProfile(user: Profile): UserProfile {
//   //   // since first name and lastName are optional, no error is thrown if not provided
//   //   let userName = '';
//   //   if (user.firstname) userName = `${user.firstname}`;
//   //   if (user.lastname)
//   //     userName = user.firstname
//   //       ? `${userName} ${user.lastname}`
//   //       : `${user.lastname}`;
//   //   return {[securityId]: user.id, name: userName};
//   // }
// }
