import Image from "next/image";
import { useRouter } from 'next/router';
import Link from "next/link";
import {useState, useEffect, Fragment} from "react";
import { signOutUser, getCurrentUser, } from "../../../libs/firebase/firebase";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {

  const router = useRouter();
  const [users, setUsers] = useState({});  
  useEffect(()=>{
    const handleGetUser = async () => {
      const currentUser = await getCurrentUser();
      if(currentUser !== null) {
        setUsers(currentUser)
      } else {setUsers({})}
    }
    handleGetUser()
  },[router])

  const handleLogOut = async () => {
    await signOutUser();
    setUsers({})
  }
  
  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="shadow bg-white py-2">
      <div className="h-17 my-3 pb-3 mx-auto px-5 flex items-center justify-between">
          <a className="text-2xl  transition-colors cursor-pointer" onClick={handleOnClickHome}>
            <Image src='/icons/favicon_io/favicon-32x32.png' height={32} width={32} alt='eldari temporary icon'/>
          </a>
          
          <div className="flex items-center gap-5">
            <Menu as="div" className="relative px-2 inline-block text-left ml-3 ">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Eldari Lore
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2  w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* <div className="px-4 py-3">
                      <p className="text-sm">Signed in as</p>
                      <p className="truncate text-sm font-medium text-gray-900">{users.email}</p>
                    </div> */}
                    <div className="py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href='locations'
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Locations
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="npcs"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            NPCS
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="deities"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Deities
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    
                  </Menu.Items>
                </Transition>
              </Menu>
          {/* {pageLinks.map((links) => ( 
            <li key={links.name}>
              <Link href={`/${links.name.toLowerCase()}`} className="ml-2 hover:text-teal-400 transition-colors cursor-pointer">
                {links.name}
              </Link>
            </li>
          ))} */}
          { users.email? (
            <></>
          )
          :
          (<li>
            <Link href={`/login`} className="ml-2 hover:text-teal-400 transition-colors cursor-pointer">
              Login
            </Link>
          </li>)
          }
          {
            users.email && (
              <>
              <Menu as="div" className="relative inline-block text-left ml-3 ">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    My Profile
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm">Signed in as</p>
                      <p className="truncate text-sm font-medium text-gray-900">{users.email}</p>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="notes"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            My Notes
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="sessions"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            My Sessions
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <form onSubmit={handleLogOut}>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="submit"
                              conclick={handleLogOut}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full px-4 py-2 text-left text-sm'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
             </>
            )
          }
          </div>
      </div>
    </div>
  )
}

export default NavBar;