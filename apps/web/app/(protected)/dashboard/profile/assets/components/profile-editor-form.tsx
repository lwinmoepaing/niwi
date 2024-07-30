import NiwiProfileCard from "@/components/niwi-profile/niwi-profile-card/niwi-profile-card";
import { User } from "next-auth";

function ProfileEditor({ user }: { user?: User }) {
  return (
    <div className="pt-5">
      <NiwiProfileCard user={user}/>
    </div>
  );
}
export default ProfileEditor;
