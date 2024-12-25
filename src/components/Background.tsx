import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

function Background({ children }: BackgroundProps) {
  const location = useLocation(); // Get the current location
  const currPage = location.pathname;
  const isListPage = currPage === "/list"; // Check if the path is "/list"

  return (
    <div className="relative h-screen">
      {/* Image element filling the viewport */}

      <img
        src="https://images5.alphacoders.com/109/1091561.jpg"
        alt="Background"
        className="w-full h-full object-cover opacity-50 absolute top-0 left-0 -z-10"
      />

      {/* Gradient div with softer, longer transition */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `${
            isListPage
              ? "#272A37"
              : "linear-gradient(65deg, #272A37 55%, rgba(39, 42, 55, 0.7) 70%, rgba(39, 42, 55, 0.4) 80%, transparent 90%)"
          }`,
          zIndex: -10,
        }}
      />

      {children}
    </div>
  );
}

export default Background;
