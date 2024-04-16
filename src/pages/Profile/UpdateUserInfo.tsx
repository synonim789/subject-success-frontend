import ProfileInput from '../../components/ProfileInput';
import SubmitButton from '../../components/SubmitButton';

const UpdateUserInfo = () => (
   <form className="flex w-full flex-col gap-10 rounded-xl  bg-white/80 p-8 drop-shadow-xl dark:bg-dark-600">
      <ProfileInput
         name="username"
         type="text"
         label="Username"
         id="username"
         placeholder="Enter Username"
         register=""
      />
      <ProfileInput
         name="Email"
         type="email"
         label="Email"
         id="email"
         placeholder="Enter Email"
         register=""
         disabled
      />
      <SubmitButton text="update user" disabled={false} />
   </form>
);
export default UpdateUserInfo;
