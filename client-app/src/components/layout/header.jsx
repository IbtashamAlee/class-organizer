/* eslint-disable */
import React, { useState } from "react";
import {Button} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import auth from "../../auth";

export default function Header(props) {
    const [show, setShow] = useState(null);
    const [profile, setProfile] = useState(false);

    let history = useHistory();
    function goToSignInPage() {
        history.push('/signin');
    }

    function signOut() {
        auth.logout();
        history.push('/');
    }

    return (
        <>

            <div className={"bg-gray-200 h-full w-full " + (auth.isAuthenticated() && 'shadow')}>
                {/* Code block starts */}
                <nav className="bg-white xl:block hidden">
                    <div className="mx-auto container px-6 py-2 xl:py-0">
                        <div className="flex items-center justify-between">
                            <div className="inset-y-0 left-0 flex items-center xl:hidden">
                                <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                    <div className="visible xl:hidden">
                                        <ul className="p-2 border-r bg-white absolute rounded left-0 right-0 shadow mt-8 md:mt-8 hidden">
                                            <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <rect x={4} y={4} width={6} height={6} rx={1} />
                                                        <rect x={14} y={4} width={6} height={6} rx={1} />
                                                        <rect x={4} y={14} width={6} height={6} rx={1} />
                                                        <rect x={14} y={14} width={6} height={6} rx={1} />
                                                    </svg>
                                                    <span className="ml-2 font-bold">Dashboard</span>
                                                </div>
                                            </li>
                                            <li className="flex xl:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                                    </svg>
                                                    <span className="ml-2 font-bold">Products</span>
                                                </div>
                                            </li>
                                            <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="8 16 10 10 16 8 14 14 8 16" />
                                                    <circle cx={12} cy={12} r={9} />
                                                </svg>
                                                <span className="ml-2 font-bold">Performance</span>
                                            </li>
                                            <li className="border-b border-gray-300 flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="7 8 3 12 7 16" />
                                                    <polyline points="17 8 21 12 17 16" />
                                                    <line x1={14} y1={4} x2={10} y2={20} />
                                                </svg>
                                                <span className="ml-2 font-bold">Deliverables</span>
                                            </li>
                                            <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                <div className="flex items-center">
                                                    <div className="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                                                        <img className="rounded h-10 w-10 object-cover" src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_1.png" alt="logo" />
                                                    </div>
                                                    <p className="text-sm ml-2 cursor-pointer">Jane Doe</p>
                                                    <div className="sm:ml-2 text-white relative">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down cursor-pointer" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <circle cx={12} cy={7} r={4} />
                                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                    </svg>
                                                    <span className="ml-2">Profile</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={44} data-name="Layer 1" viewBox="0 0 64 64"><circle cx="23" cy="26" r="4" fill="#3b3c3d"/><path fill="#3b3c3d" d="M37,42a1,1,0,0,1-1-1V34.8027A2.8059,2.8059,0,0,0,33.1973,32H30.8027A2.8059,2.8059,0,0,0,28,34.8027V41a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V36.8027A4.8079,4.8079,0,0,1,21.8027,32H23a1,1,0,0,1,0,2H21.8027A2.8059,2.8059,0,0,0,19,36.8027V40h7V34.8027A4.8079,4.8079,0,0,1,30.8027,30h2.3946A4.8079,4.8079,0,0,1,38,34.8027V41A1,1,0,0,1,37,42Z"/><path fill="#3b3c3d" d="M46 42H31a1 1 0 0 1 0-2H45V36.8027A2.8059 2.8059 0 0 0 42.1973 34H41a1 1 0 0 1 0-2h1.1973A4.8079 4.8079 0 0 1 47 36.8027V41A1 1 0 0 1 46 42zM48 49H43a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2z"/><path fill="#3b3c3d" d="M54,8H10a2.0059,2.0059,0,0,0-2,2V54a2.0059,2.0059,0,0,0,2,2H54a2.0059,2.0059,0,0,0,2-2V10A2.0059,2.0059,0,0,0,54,8ZM51,51H13V13H51Z"/><path fill="#3b3c3d" d="M37,42a1,1,0,0,1-1-1V34.8027A2.8059,2.8059,0,0,0,33.1973,32H30.8027A2.8059,2.8059,0,0,0,28,34.8027V41a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V36.8027A4.8079,4.8079,0,0,1,21.8027,32H23a1,1,0,0,1,0,2H21.8027A2.8059,2.8059,0,0,0,19,36.8027V40h7V34.8027A4.8079,4.8079,0,0,1,30.8027,30h2.3946A4.8079,4.8079,0,0,1,38,34.8027V41A1,1,0,0,1,37,42Z"/><path fill="#3b3c3d" d="M46,42H31a1,1,0,0,1,0-2H45V36.8027A2.8059,2.8059,0,0,0,42.1973,34H41a1,1,0,0,1,0-2h1.1973A4.8079,4.8079,0,0,1,47,36.8027V41A1,1,0,0,1,46,42Z"/><circle cx="32" cy="24" r="4" fill="#3b3c3d"/><circle cx="41" cy="26" r="4" fill="#3b3c3d"/><path fill="#3b3c3d" d="M48,49H43a1,1,0,0,1,0-2h5a1,1,0,0,1,0,2Z"/></svg>
                                    <h2 className="hidden sm:block text-base text-gray-700 font-bold leading-normal pl-3">Class Organizer</h2>
                                </div>
                                <div className="hidden xl:flex md:ml-6 xl:ml-16 space-x-4">
                                    <Button className="my-4" style={{marginTop: "1rem",marginBottom: "1rem"}}>
                                        <Link to="#product">Product</Link>
                                    </Button>
                                    <Button className="my-4" style={{marginTop: "1rem",marginBottom: "1rem"}}>
                                        <Link to="#features">Features</Link>
                                    </Button>
                                </div>
                            </div>
                            {auth.isAuthenticated()? <div>
                                    <div className="hidden xl:flex items-center">
                                        <div className="ml-6 relative">
                                            <div className="flex items-center relative" onClick={() => setProfile(!profile)}>
                                                {profile && (
                                                    <ul className="p-2 w-40 border-r bg-white absolute rounded right-0 shadow top-0 mt-16 ">
                                                        <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal hover:text-indigo-700 flex items-start focus:text-indigo-700 focus:outline-none">
                                                            <Button className="w-full hover:text-indigo-700">Profile</Button>
                                                        </li>
                                                        <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 hover:text-indigo-700 flex items-start focus:text-indigo-700 focus:outline-none">
                                                            <Button className="w-full hover:text-indigo-700">Help center</Button>
                                                        </li>
                                                        <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 hover:text-indigo-700 flex items-start focus:text-indigo-700 focus:outline-none">
                                                            <Button className="w-full hover:text-indigo-700" onClick={signOut}>Sign out</Button>
                                                        </li>
                                                    </ul>
                                                )}
                                                <div className="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                                                    <img className="rounded-full h-10 w-10 object-cover" src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_2.png" alt="logo" />
                                                </div>
                                                <div className="ml-2 text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down cursor-pointer" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <polyline points="6 9 12 15 18 9" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>:
                                <div className="flex">
                                    <Button variant="contained" color="primary" type="button" onClick={goToSignInPage}>Sign in</Button>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
                <nav>
                    <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white fixed top-0 z-40">
                        <div className="flex">
                            <div className="flex items-center">

                                <Button aria-controls="simple-menu" aria-haspopup="true"
                                        id="menu"
                                        className="text-gray-800"
                                        onClick={() => setShow(!show)}
                                        style={{minWidth: "30px"}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1={4} y1={6} x2={20} y2={6} />
                                        <line x1={4} y1={12} x2={20} y2={12} />
                                        <line x1={4} y1={18} x2={20} y2={18} />
                                    </svg>
                                </Button>
                            </div>
                            <div className="w-24">
                                <svg xmlns="http://www.w3.org/2000/svg" width={44} data-name="Layer 1" viewBox="0 0 64 64"><circle cx="23" cy="26" r="4" fill="#3b3c3d"/><path fill="#3b3c3d" d="M37,42a1,1,0,0,1-1-1V34.8027A2.8059,2.8059,0,0,0,33.1973,32H30.8027A2.8059,2.8059,0,0,0,28,34.8027V41a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V36.8027A4.8079,4.8079,0,0,1,21.8027,32H23a1,1,0,0,1,0,2H21.8027A2.8059,2.8059,0,0,0,19,36.8027V40h7V34.8027A4.8079,4.8079,0,0,1,30.8027,30h2.3946A4.8079,4.8079,0,0,1,38,34.8027V41A1,1,0,0,1,37,42Z"/><path fill="#3b3c3d" d="M46 42H31a1 1 0 0 1 0-2H45V36.8027A2.8059 2.8059 0 0 0 42.1973 34H41a1 1 0 0 1 0-2h1.1973A4.8079 4.8079 0 0 1 47 36.8027V41A1 1 0 0 1 46 42zM48 49H43a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2z"/><path fill="#3b3c3d" d="M54,8H10a2.0059,2.0059,0,0,0-2,2V54a2.0059,2.0059,0,0,0,2,2H54a2.0059,2.0059,0,0,0,2-2V10A2.0059,2.0059,0,0,0,54,8ZM51,51H13V13H51Z"/><path fill="#3b3c3d" d="M37,42a1,1,0,0,1-1-1V34.8027A2.8059,2.8059,0,0,0,33.1973,32H30.8027A2.8059,2.8059,0,0,0,28,34.8027V41a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V36.8027A4.8079,4.8079,0,0,1,21.8027,32H23a1,1,0,0,1,0,2H21.8027A2.8059,2.8059,0,0,0,19,36.8027V40h7V34.8027A4.8079,4.8079,0,0,1,30.8027,30h2.3946A4.8079,4.8079,0,0,1,38,34.8027V41A1,1,0,0,1,37,42Z"/><path fill="#3b3c3d" d="M46,42H31a1,1,0,0,1,0-2H45V36.8027A2.8059,2.8059,0,0,0,42.1973,34H41a1,1,0,0,1,0-2h1.1973A4.8079,4.8079,0,0,1,47,36.8027V41A1,1,0,0,1,46,42Z"/><circle cx="32" cy="24" r="4" fill="#3b3c3d"/><circle cx="41" cy="26" r="4" fill="#3b3c3d"/><path fill="#3b3c3d" d="M48,49H43a1,1,0,0,1,0-2h5a1,1,0,0,1,0,2Z"/></svg>
                            </div>
                        </div>
                        <div>
                                <Button variant="contained" color="primary" type="button" onClick={goToSignInPage}>Sign in</Button>
                        </div>
                    </div>
                    {/*{// TODO Mobile responsive header}*/}
                    <div className={false ? "w-full fixed xl:hidden h-full z-40  transform delay-300 duration-300  translate-x-0 " : "   w-full xl:hidden h-full absolute z-40  transform -translate-x-full"}>
                        <div className="bg-gray-800 opacity-50 w-full h-full" onClick={() => setShow(!show)} />
                        <div className="w-64 z-40 fixed overflow-y-auto z-40 top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                            <div className="px-6 h-full">
                                <div className="flex flex-col justify-between h-full w-full">
                                    <div>
                                        <div className="mt-6 flex w-full items-center justify-between">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={40}  viewBox="0 0 64 64">
                                                        <circle cx="23" cy="26" r="4" fill="#3b3c3d"/>
                                                        <path fill="#3b3c3d" d="M37,42a1,1,0,0,1-1-1V34.8027A2.8059,2.8059,0,0,0,33.1973,32H30.8027A2.8059,2.8059,0,0,0,28,34.8027V41a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V36.8027A4.8079,4.8079,0,0,1,21.8027,32H23a1,1,0,0,1,0,2H21.8027A2.8059,2.8059,0,0,0,19,36.8027V40h7V34.8027A4.8079,4.8079,0,0,1,30.8027,30h2.3946A4.8079,4.8079,0,0,1,38,34.8027V41A1,1,0,0,1,37,42Z"/>
                                                        <path fill="#3b3c3d" d="M46 42H31a1 1 0 0 1 0-2H45V36.8027A2.8059 2.8059 0 0 0 42.1973 34H41a1 1 0 0 1 0-2h1.1973A4.8079 4.8079 0 0 1 47 36.8027V41A1 1 0 0 1 46 42zM48 49H43a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2z"/>
                                                        <path fill="#3b3c3d" d="M54,8H10a2.0059,2.0059,0,0,0-2,2V54a2.0059,2.0059,0,0,0,2,2H54a2.0059,2.0059,0,0,0,2-2V10A2.0059,2.0059,0,0,0,54,8ZM51,51H13V13H51Z"/>
                                                        <path fill="#3b3c3d" d="M37,42a1,1,0,0,1-1-1V34.8027A2.8059,2.8059,0,0,0,33.1973,32H30.8027A2.8059,2.8059,0,0,0,28,34.8027V41a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V36.8027A4.8079,4.8079,0,0,1,21.8027,32H23a1,1,0,0,1,0,2H21.8027A2.8059,2.8059,0,0,0,19,36.8027V40h7V34.8027A4.8079,4.8079,0,0,1,30.8027,30h2.3946A4.8079,4.8079,0,0,1,38,34.8027V41A1,1,0,0,1,37,42Z"/><path fill="#3b3c3d" d="M46,42H31a1,1,0,0,1,0-2H45V36.8027A2.8059,2.8059,0,0,0,42.1973,34H41a1,1,0,0,1,0-2h1.1973A4.8079,4.8079,0,0,1,47,36.8027V41A1,1,0,0,1,46,42Z"/><circle cx="32" cy="24" r="4" fill="#3b3c3d"/>
                                                        <circle cx="41" cy="26" r="4" fill="#3b3c3d"/>
                                                        <path fill="#3b3c3d" d="M48,49H43a1,1,0,0,1,0-2h5a1,1,0,0,1,0,2Z"/>
                                                    </svg>
                                                    <p className="text-base md:text-2xl text-gray-800 ml-3">Class Organizer</p>
                                                </div>
                                                <div id="cross" className="text-gray-800" onClick={() => setShow(!show)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="f-m-m">
                                            <a className="cursor-pointer">
                                                <li className="text-gray-800 pt-10">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-indigo-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <rect x={4} y={4} width={6} height={6} rx={1} />
                                                                <rect x={14} y={4} width={6} height={6} rx={1} />
                                                                <rect x={4} y={14} width={6} height={6} rx={1} />
                                                                <rect x={14} y={14} width={6} height={6} rx={1} />
                                                            </svg>
                                                        </div>
                                                        <p className="text-indigo-700 xl:text-base text-base ml-3">Dashboard</p>
                                                    </div>
                                                </li>
                                            </a>
                                            <a className="cursor-pointer">
                                                <li className="text-gray-800 pt-8">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                                                </svg>
                                                            </div>
                                                            <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">Products</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </a>
                                            <a className="cursor-pointer">
                                                <li className="text-gray-800 pt-8">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <polyline points="8 16 10 10 16 8 14 14 8 16" />
                                                                <circle cx={12} cy={12} r={9} />
                                                            </svg>
                                                        </div>
                                                        <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">Performance</p>
                                                    </div>
                                                </li>
                                            </a>
                                            <li className="text-gray-800 pt-8 cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <polyline points="7 8 3 12 7 16" />
                                                                <polyline points="17 8 21 12 17 16" />
                                                                <line x1={14} y1={4} x2={10} y2={20} />
                                                            </svg>
                                                        </div>
                                                        <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">Deliverables</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-full pt-4">
                                        <div className="flex justify-center mb-4 w-full">
                                            <div className="relative w-full">
                                                <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth={1} stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <circle cx={10} cy={10} r={7} />
                                                        <line x1={21} y1={21} x2={15} y2={15} />
                                                    </svg>
                                                </div>
                                                <input className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2" type="text" placeholder="Search" />
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-300">
                                            <div className="w-full flex items-center justify-between pt-1">
                                                <div className="flex items-center">
                                                    <img alt="profile-pic" src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png" className="w-8 h-8 rounded-md" />
                                                    <p className=" text-gray-800 text-base leading-4 ml-2">Jane Doe</p>
                                                </div>
                                                <ul className="flex">
                                                    <li className="cursor-pointer text-gray-800 pt-5 pb-3">
                                                        <div className="w-6 h-6 md:w-8 md:h-8">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                                                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                                            </svg>
                                                        </div>
                                                    </li>
                                                    <li className="cursor-pointer text-gray-800 pt-5 pb-3 pl-3">
                                                        <div className="w-6 h-6 md:w-8 md:h-8">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                                                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                                            </svg>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* Code block ends */}
            </div>
        </>
    );
}
