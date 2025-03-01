import { UsersList } from "@/components/UsersList";
import { WelcomeMessage } from "@/components/WelcomeMessage";

export const UsersPage = () => {
  return (
    <section className="flex h-full">
      <div className="w-[250px]">
        <UsersList />
      </div>
      <div className="flex-1 h-full">{<WelcomeMessage />}</div>
    </section>
  );
};
