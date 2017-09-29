import React from 'react';

export default function Lesson({ subject, teacher }) {
    return (
        <div>
            <div>{subject}</div>
            <div>{teacher}</div>
        </div>
    );
}