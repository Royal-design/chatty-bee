import BeepME from "../assets/BEEPME.png";

export const AboutPage = () => {
  return (
    <section className="max-w-2xl mx-auto flex flex-col h-full overflow-auto scrollbar-hidden px-4 max-md:pb-20  rounded-lg shadow-lg">
      <figure className="flex justify-center mb-2">
        <img src={BeepME} alt="logo" className="size-[7rem] object-contain" />
      </figure>
      <h1 className="text-xl md:text-2xl font-bold text-center text-heavy">
        About BeepME
      </h1>
      <p className="text-light text-sm md:text-base md:text-center mt-2">
        BeepME is a modern real-time chat application designed to provide a
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
        <h2 className="md:text-xl font-semibold text-heavy">Why BeepME? 🐝</h2>
        <p className="text-light text-sm mt-2">
          BeepME is built to offer a fast, lightweight, and reliable chat
          experience. Whether you're chatting with friends or staying connected
          with colleagues, BeepME ensures your messages are delivered instantly
          without any delay.
        </p>
      </div>
    </section>
  );
};
