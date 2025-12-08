import React, { useState, useEffect } from 'react';
import { get, post, put, del } from "../../axios/ultil.tsx"; 

interface ClassRoomInterface {
    _id: string; 
    roomId: string; 
    capacity: number;
    position: string;
    roomType: string;
    status: boolean;
}

const ClassRoom = () => {
    const [data, setData] = useState<ClassRoomInterface[]>([]);

    const fetchRoomData = async () => {
        const token = localStorage.getItem("accessToken");
        if(!token){
            console.error("No token found");
            return;
        }
        try {
            const response = await get("/classRoom/",{},{token});
            setData(response.data.data); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchRoomData();
    }, []);

    return (
        <div>
            <div className='ml-7 mt-7 text-3xl font-bold'>
                <h1>Class Room</h1>
            </div>
            <div className='flex gap-3 flex-col p-10'>
                <div>
                  
                    {data.length > 0 ? (
                        <ul>
                            {data.map((room) => (
                                <li key={room._id}>
                                    {room.roomId} - {room.position} ({room.capacity} chỗ)
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Đang tải dữ liệu...</p>
                    )}
                </div>
                <div>content B</div>
                <div>content C</div>
            </div>
        </div>
    );
};

export default ClassRoom;
