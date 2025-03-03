import chattyBee from "../assets/chatty.png";

export const ProfilePage = () => {
  return (
    <section className="max-w-2xl mx-auto flex flex-col overflow-auto scrollbar-hidden p-6 rounded-lg shadow-lg">
      <figure className="flex justify-center mb-2">
        <img src={chattyBee} alt="logo" className="size-11" />
      </figure>
      <h1 className="text-xl md:text-2xl font-bold text-center text-heavy">
        About ChattyBee 🐝
      </h1>
      <p className="text-light text-sm md:text-base md:text-center mt-2">
        ChattyBee is a modern real-time chat application designed to provide a
        seamless and engaging messaging experience. Built with React and
        Firebase, it enables users to send and receive messages instantly while
        maintaining a clean and user-friendly interface.
      </p>

      <div className="mt-6">
        <h2 className=" md:text-xl font-semibold text-heavy">
          Key Features 🚀
        </h2>
        <ul className="list-disc flex flex-col gap-2 pl-5 mt-2 text-sm md:text-base text-light">
          <li>💬 Real-time messaging with instant updates.</li>
          <li>🔒 Secure chat history with Firebase database.</li>
          <li>👤 Personalized user profiles with avatars.</li>
          <li>🎨 Modern and intuitive UI for a smooth experience.</li>
          <li>📱 Fully responsive design for all devices.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="md:text-xl font-semibold text-heavy">
          Why ChattyBee? 🐝
        </h2>
        <p className="text-light text-sm mt-2">
          ChattyBee is built to offer a fast, lightweight, and reliable chat
          experience. Whether you're chatting with friends or staying connected
          with colleagues, ChattyBee ensures your messages are delivered
          instantly without any delay.
        </p>
      </div>
    </section>
  );
};
