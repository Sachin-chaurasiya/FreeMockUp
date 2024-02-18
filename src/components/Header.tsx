import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-5">
      <h2 className="font-bold cursor-pointer text-xl">
        Free<span className="text-brand-500">Mock</span>
        <span className="italic">Up</span>
      </h2>
      <div className="flex gap-8 items-center">
        <span>
          <a
            className="items-center inline-flex font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed rounded px-4 py-2 focus:ring-brand-500 border-transparent shadow-sm bg-gradient-to-br from-brand-600 to-brand-400 text-white"
            href="#create-mockup-section"
          >
            Get started today
          </a>
        </span>
        <span className="text-4xl cursor-pointer">
          <a
            href="https://github.com/Sachin-chaurasiya/FreeMockUp"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaGithub />
          </a>
        </span>
      </div>
    </header>
  );
};

export default Header;
