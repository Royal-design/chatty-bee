import { useAppSelector } from "@/redux/store";

export const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <section className="max-w-2xl mx-auto h-full overflow-auto scrollbar-hidden p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-heavy">
        About ChattyBee 🐝
      </h1>
      <p className="text-light text-center mt-2">
        ChattyBee is a modern real-time chat application designed to provide a
        seamless and engaging messaging experience. Built with React and
        Firebase, it enables users to send and receive messages instantly while
        maintaining a clean and user-friendly interface.
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-heavy">Key Features 🚀</h2>
        <ul className="list-disc pl-5 mt-2 text-light">
          <li>💬 Real-time messaging with instant updates.</li>
          <li>🔒 Secure chat history with Firebase database.</li>
          <li>👤 Personalized user profiles with avatars.</li>
          <li>🎨 Modern and intuitive UI for a smooth experience.</li>
          <li>📱 Fully responsive design for all devices.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-heavy">Why ChattyBee? 🐝</h2>
        <p className="text-light mt-2">
          ChattyBee is built to offer a fast, lightweight, and reliable chat
          experience. Whether you're chatting with friends or staying connected
          with colleagues, ChattyBee ensures your messages are delivered
          instantly without any delay.
        </p>
      </div>
    </section>
  );
};
