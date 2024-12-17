'use client'

import { useState } from 'react'
import { Calendar, Button, ConfigProvider, Dropdown, Menu, Modal, DatePicker } from 'antd'
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react'
import Link from 'next/link'

export default function TutorSchedul() {
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [endDate, setEndDate] = useState(null)
    const timeSlots = [
        '10:00 am-12 pm',
        '2:00 pm-4 pm',
        '6:00 pm-8 pm',
    ]

    const availableDates = [18, 19, 22, 23, 24, 25]
    const today = 17

    const onSelect = (date) => {
        setSelectedDate(date)
        setSelectedTime('') // Reset time when a new date is selected
    }

    const isDateAvailable = (date) => availableDates.includes(date.date())

    const handleModalCancel = () => {
        setIsModalOpen(false)
    }

    // Handle Modal for Continuous Occurrence
    const handleSetRecurrence = () => {
        setIsModalOpen(true)
    }

    const handleSaveEndDate = () => {
        // Save or process the selected end date
        console.log('End Date:', endDate?.format('DD MM YY'))
        setIsModalOpen(false)
    }

    const dateFullCellRender = (date) => {
        const isAvailable = isDateAvailable(date)
        const isSelected = selectedDate?.isSame(date, 'day')
        const isToday = date.date() === today
        return (
            <div
                className={`
          h-12 w-full flex items-center justify-center rounded-full
          ${isAvailable ? 'bg-green-100' : ''}
          ${isSelected ? '!bg-blue-500 text-white' : ''}
          ${isToday && !isSelected ? 'border-2 border-blue-500' : ''}
        `}
            >
                {date.date()}
            </div>
        )
    }

    // Menu for "Select Occurrence" Dropdown
    const occurrenceMenu = (
        <Menu
            items={[
                { key: '1', label: 'Once' },
                { key: '2', label: 'Weekly' },
                { key: '3', label: 'Monthly' },
            ]}
        />
    )

    // Menu for "Set Recurrence" Dropdown
    const recurrenceMenu = (
        <Menu
            items={[
                { key: '1', label: 'Every Monday' },
                { key: '2', label: 'Every Wednesday' },
                { key: '3', label: 'Every Friday' },
            ]}
        />
    )

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0284c7',
                    borderRadius: 8,
                },
            }}
        >
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,300px]">
                        {/* Left Section */}
                        <div className="p-6 border-r border-gray-100">
                            <div className="space-y-6 flex justify-around">
                                {/* Calendar */}
                                <div className="max-w-lg">
                                    <Calendar
                                        fullscreen={false}
                                        onSelect={onSelect}
                                        headerRender={({ value, onChange }) => (
                                            <div className="flex items-center justify-between px-2 py-4">
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => onChange(value.subtract(1, 'month'))}
                                                        className="p-2 hover:bg-gray-100 rounded-full"
                                                    >
                                                        <ChevronLeft className="h-5 w-5" />
                                                    </button>
                                                    <span className="text-base font-medium">
                                                        {value.format('MMMM YYYY')}
                                                    </span>
                                                    <button
                                                        onClick={() => onChange(value.add(1, 'month'))}
                                                        className="p-2 hover:bg-gray-100 rounded-full"
                                                    >
                                                        <ChevronRight className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                <h2 className="text-base font-medium">Time</h2>
                                            </div>
                                        )}
                                        dateFullCellRender={dateFullCellRender}
                                    />
                                </div>

                                {/* Time Slots */}
                                {selectedDate && (
                                    <div className="space-y-2">
                                        {timeSlots.map((slot, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedTime(slot)}
                                                className={`w-full p-3 rounded-lg text-left transition-colors
                          ${selectedTime === slot
                                                        ? 'bg-[#0E68E7] text-white'
                                                        : 'bg-[#F2F4F7]'
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Legend */}
                            <div className="flex gap-6 w-fit pl-6">
                                <span className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 rounded-full bg-green-100"></div>
                                    Session available
                                </span>
                                <span className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    Selected
                                </span>
                                <span className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 rounded-full border-2 border-blue-500"></div>
                                    Today
                                </span>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-base font-medium mb-4">Manage session</h2>
                                    <Dropdown overlay={occurrenceMenu} trigger={['click']}>
                                        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-blue-500">
                                            <span className="text-gray-500">Select occurrence</span>
                                            <ChevronRight className="h-5 w-5 text-gray-400" />
                                        </button>
                                    </Dropdown>
                                </div>

                                <div>

                                    <button onClick={handleSetRecurrence} className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-blue-500">
                                        <span className="text-gray-500">Set recurrence</span>
                                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                                    </button>

                                </div>

                                <div className="!mt-auto pt-6">
                                   <Link href={'/UserDashboard/BookingSummary'}>
                                   <Button
                                        type="primary"
                                        className="w-full h-11 bg-[#0284c7] mb-3 text-base font-medium"
                                    >
                                        Confirm Booking
                                    </Button>
                                   </Link>
                                    <Button className="w-full h-11 text-base font-medium">
                                        Cancel
                                    </Button>
                                </div>


                                {/* Modal for Continuous Occurrence */}
                                <Modal
                                    title="Set End Date"
                                    open={isModalOpen}
                                    onCancel={handleModalCancel}
                                    footer={[
                                        <Button key="cancel" onClick={handleModalCancel}>
                                            Cancel
                                        </Button>,
                                        <Button key="save" type="primary" onClick={handleSaveEndDate}>
                                            Save
                                        </Button>,
                                    ]}
                                >
                                    <p className="mb-4">Please select the end date in the format DD MM YY:</p>
                                    <DatePicker
                                        format="DD MM YY"
                                        onChange={(date) => setEndDate(date)}
                                        className="w-full"
                                    />
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}
