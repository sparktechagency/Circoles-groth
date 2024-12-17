'use client'
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";


const sessions = [
    { day: "Saturday", slots: ["10:00 am-12 pm", "10:00 am-12 pm", "10:00 am-12 pm", "10:00 am-12 pm"] },
    { day: "Sunday", slots: ["10:00 am-12 pm", "10:00 am-12 pm", "10:00 am-12 pm", "10:00 am-12 pm"] },
    { day: "Wednesday", slots: ["10:00 am-12 pm", "10:00 am-12 pm", "10:00 am-12 pm", "10:00 am-12 pm"] },
    { day: "Thursday", slots: ["10:00 am-12 pm", "10:00 am-12 pm", "10:00 am-12 pm", "10:00 am-12 pm"] },
];

export default function ViewSession() {

    const rourter = useRouter()
    return (
        <div className="p-8 bg-white">
            <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <span onClick={() => rourter.back()} className="cursor-pointer"> <LeftOutlined /> Back</span>
                <span>/</span>
                <span>My tutor</span>
                <span>/</span>
                <span className="text-black font-semibold">View session</span>
            </div>

            <div className="bg-white shadow rounded-lg p-6 border">
                <h2 className="text-lg font-semibold mb-4">Available Schedule</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="py-3 text-gray-600">Days</th>
                            <th className="py-3 text-gray-600">Time slots</th>
                            <th className="py-3">

                                <div className="text-right mt-4">
                                    <Link href={'/UserDashboard/TutorSchedul'}>

                                        <Button style={{ backgroundColor: '#14698A', color: 'white', height: '44px', width: '145px' }} type="primary"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33333 1.16602V3.49935M3.66667 1.16602V3.49935M0.75 5.83268H11.25M1.91667 2.33268H10.0833C10.7277 2.33268 11.25 2.85502 11.25 3.49935V11.666C11.25 12.3103 10.7277 12.8327 10.0833 12.8327H1.91667C1.27233 12.8327 0.75 12.3103 0.75 11.666V3.49935C0.75 2.85502 1.27233 2.33268 1.91667 2.33268Z" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                            Book All</Button>
                                    </Link>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-3">{session.day}</td>
                                <td className="py-3">
                                    <div className="flex space-x-2">
                                        {session.slots.map((slot, idx) => (
                                            <div
                                                key={idx}
                                                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg"
                                            >
                                                {slot}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-3 flex items-center justify-end">
                                    <Link href={'/UserDashboard/TutorSchedul'}>
                                        <Button style={{ backgroundColor: 'transparent', border: '1px solid #98A2B3', color: '#195671', fontWeight: '600', fontSize: '14px', height: '44px' }} type="primary"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33333 1.16602V3.49935M3.66667 1.16602V3.49935M0.75 5.83268H11.25M1.91667 2.33268H10.0833C10.7277 2.33268 11.25 2.85502 11.25 3.49935V11.666C11.25 12.3103 10.7277 12.8327 10.0833 12.8327H1.91667C1.27233 12.8327 0.75 12.3103 0.75 11.666V3.49935C0.75 2.85502 1.27233 2.33268 1.91667 2.33268Z" stroke="#195671" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                            Book a Session</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
