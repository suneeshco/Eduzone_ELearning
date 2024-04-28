import React, { useEffect, useState } from 'react'
import { adminApiRequest } from '../../../api/axios';
import { format } from "timeago.js"
import { Link } from 'react-router-dom';

interface Notification {
    _id: string;
    receiverId: string;
    senderId: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    category: string;
}

const Notification: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const changeStatus = async (id: any) => {
        try {
             await adminApiRequest({
                method: 'patch',
                url: `/changeIsRead/${id}`
            });

            fetchNotifications();

        } catch (error) {
            console.error("Error fetching sales data:", error);
        }

    }

    const fetchNotifications = async () => {
        try {
            const response = await adminApiRequest({
                method: 'get',
                url: `/getNotifications`
            });

            setNotifications(response.notification)

        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    useEffect(() => {
        

        fetchNotifications();
    }, []);

    return (
        <div className="flex flex-col md:flex-row bg-white min-h-screen  ">
            <div className="pt-14   w-full  py-8 ">
                <div className='m-10'>
                    <h1 className='text-2xl font-bold mb-5'>Notifications</h1>
                    {notifications.length > 0 ? (<>
                        {notifications.map((notificate, index) => (

                            <div key={index}
                                role="alert"
                                className="mx-auto m-1 rounded-lg border border-stone bg-stone-100 p-1 shadow-lg sm:p-2 lg:p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="shrink-0 rounded-full bg-emerald-400 p-1 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>

                                    <p className="font-medium sm:text-lg text-emerald-600">New notification!</p><span>{format(notificate.createdAt)}</span>
                                </div>

                                <p className="mt-1 text-xl font-bold  text-black">
                                    {notificate.message}
                                </p>

                                <div className="mt-2 sm:flex sm:gap-2">
                                    <Link to={notificate.category === 'CourseAdded' ? '/admin/courseList' : ''}><a
                                        href=""
                                        className="inline-block w-full rounded-lg bg-emerald-500 px-3 py-1.5 text-center text-sm font-semibold text-white sm:w-auto"
                                        onClick={() => { changeStatus(notificate._id) }}>
                                        View
                                    </a></Link>

                                    <p onClick={() => { changeStatus(notificate._id) }}
                                        className="cursor-pointer mt-1 inline-block w-full rounded-lg bg-stone-300 px-3 py-1.5 text-center text-sm font-semibold text-gray-800 sm:mt-0 sm:w-auto">
                                        Dismiss
                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
                    ) : (
                        <div>
                            <h1 className='text-xl font-bold text-red-800'>No Notifications Found..!</h1>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Notification
