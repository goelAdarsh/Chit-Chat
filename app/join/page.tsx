'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

export default function JoinPage() {
    const [username, setUsername] = useState('');
    const [groupId, setGroupId] = useState('');
    const [error, setError] = useState('');

    const usernameRef = useRef<HTMLInputElement>(null);
    const groupIdRef = useRef<HTMLInputElement>(null);

    function createGroupId() {
        const newGroupId = uuidv4();
        if (groupIdRef.current) {
            groupIdRef.current.value = newGroupId;
        }
        // localStorage.setItem('groupId', newGroupId);
    }

    const router = useRouter();

    function handleJoinGroup() {
        if (username.trim().length < 3) {
            setError('Name should be at least 3 characters long');
        }

        if (!validateUUID(groupId)) {
            setError('Please enter a valid group Id');
        }

        setUsername(usernameRef.current ? usernameRef.current.value : '');
        setGroupId(groupIdRef.current ? groupIdRef.current.value : '');
        console.log('funct');

        console.log(username, groupId);

        router.push(
            `/chat/${groupIdRef.current?.value}?username=${encodeURIComponent(
                usernameRef.current?.value ?? ''
            )}`
            // `/chat/${groupId}?username=${encodeURIComponent(username)}`
        );
    }
    console.log('global');

    return (
        <div>
            <div>
                {/* Dynamic Name : TODO */}
                <h1>Join Group Chat</h1>

                <div>
                    {/* Name */}
                    <div>
                        <label htmlFor="name">Enter name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Adarsh Goel"
                            minLength={3}
                            ref={usernameRef}
                        />
                    </div>

                    {/* Group Id */}
                    <div>
                        <label htmlFor="groupId">Enter Group Id</label>
                        <div>
                            <input type="text" id="groupId" ref={groupIdRef} />
                            <button onClick={createGroupId}>New</button>
                        </div>
                    </div>

                    <button onClick={handleJoinGroup}>Join group</button>
                </div>
            </div>
        </div>
    );
}
