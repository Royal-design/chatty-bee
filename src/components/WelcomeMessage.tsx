import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import logo from "../assets/BEEPME.png";
import { SearchDialog } from "./SearchDialog";
import { NavLink, useLocation } from "react-router-dom";

export const WelcomeMessage = () => {
  const location = useLocation();
  const chatPage = location.pathname === "/chats";
  const userPage = location.pathname === "/users";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#0c0900]   to-[#120902] flex flex-col items-center justify-center h-full text-center p-6"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <img src={logo} alt="logo" className="size-15 object-contain" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-xl md:text-2xl font-semibold text-heavy"
      >
        <p> Welcome to BeepME!</p>
      </motion.h2>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-sm md:text-xl font-semibold text-light"
      >
        No Chats Yet? Let’s Get the Buzz Going!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500 mt-4"
      >
        "Looks like it’s a little too quiet in here... but don’t worry, the hive
        is waiting for you to start buzzing!"
      </motion.p>
      {!chatPage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-gray-500 mt-2"
        >
          Click on a user to start buzzing
        </motion.p>
      )}
      {!userPage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-6 flex gap-4"
        >
          <SearchDialog
            trigger={
              <Button className="bg-background-heavy h-8 text-sm px-1 border border-border-color hover:bg-background-hover duration-200 text-heavy">
                Start a New Chat
              </Button>
            }
          />
          <NavLink to="/users">
            <Button
              variant="outline"
              className="border-yellow-500 h-8 text-sm px-1  text-yellow-500 hover:bg-background-heavy hover:text-heavy"
            >
              Discover People
            </Button>
          </NavLink>
        </motion.div>
      )}
    </motion.div>
  );
};
