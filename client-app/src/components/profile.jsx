import React from "react";
import Header from "./layout/header";
import Button from "@material-ui/core/Button";

export default class Profile extends React.Component {
    render() {
        return (
            <>
                <Header/>
                <div className="md:max-w-3xl lg:max-w-6xl mx-auto max-w-xs md:mt-8 xl:mt-28">
                    <div>
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <form>
                                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="first_name"
                                                           className="block text-sm font-medium text-gray-700">First
                                                        name</label>
                                                    <input type="text" name="first_name" id="first_name"
                                                           autoComplete="given-name"
                                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="last_name"
                                                           className="block text-sm font-medium text-gray-700">Last
                                                        name</label>
                                                    <input type="text" name="last_name" id="last_name"
                                                           autoComplete="family-name"
                                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                </div>
                                                <div className="col-span-6 sm:col-span-4">
                                                    <label htmlFor="email_address"
                                                           className="block text-sm font-medium text-gray-700">Email
                                                        address</label>
                                                    <input disabled={true} type="text" name="email_address" id="email_address"
                                                           autoComplete="email"
                                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label htmlFor="company_website"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Website
                                                    </label>
                                                    <div className="mt-1 flex rounded-md shadow-sm">
                                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                            http://
                                                        </span>
                                                        <input type="text" name="company_website" id="company_website"
                                                               className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                               placeholder="www.example.com"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Photo
                                                </label>
                                                <div className="mt-2 flex items-center">
                           <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                 <path
                                     d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                              </svg>
                           </span>
                                                    <button type="button"
                                                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        Change
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <Button variant="contained" color="primary" type="submit"
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
