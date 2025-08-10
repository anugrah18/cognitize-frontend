import { FaUpload } from "react-icons/fa";

export default function UpdateWorkspace({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Update workspace"
      className="
        bg-cyan-600 bg-opacity-80 
        hover:bg-opacity-100 
        text-white 
        rounded-md 
        shadow-md 
        hover:shadow-lg 
        transition 
        duration-200 
        ease-in-out 
        transform 
        hover:scale-110 
        cursor-pointer
        p-2
        flex
        items-center
        justify-center
        w-10
        h-10
      "
    >
      <FaUpload className="w-5 h-5" />
    </button>
  );
}
