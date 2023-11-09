import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-blue-600 p-4">
      <div className="container mx-auto">
        {/* Desktop/Tablet */}
        <div className="hidden md:flex justify-between items-center">
          <Link to="/">
            <span className="text-white font-bold text-xl">HelpHopper</span>
          </Link>

          <div className="space-x-4">
            <Link to="/skill-gap-analysis">
              <span className="text-white">Skill Gap Analysis</span>
            </Link>
            <Link to="/cover-letter">
              <span className="text-white">Cover Letter</span>
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">
            HelpHopper
          </Link>
          <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
              <>
                <Menu.Button>
                  <Bars3Icon className="w-6 h-6 text-white" />
                </Menu.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  >
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/skill-gap-analysis"
                            className={`${
                              active
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-900'
                            } block px-4 py-2 text-sm`}
                          >
                            Skill Gap Analysis
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/cover-letter"
                            className={`${
                              active
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-900'
                            } block px-4 py-2 text-sm`}
                          >
                            Cover Letter
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
}
