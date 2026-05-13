import React, { useState } from 'react';
import axios from 'axios';

const StudentList = ({ students, fetchStudents, setEditingStudent }) => {
    const [deletingStudentId, setDeletingStudentId] = useState(null);
    
    // Lab 05: DELETE Request [cite: 2]
    const deleteStudent = async (id) => {
        try {
            await axios.delete(`/api/students/${id}`);
            setDeletingStudentId(null);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student._id} style={{ margin: "10px 0" }}>
                        <div>
                            <strong>{student.firstname} {student.lastname}</strong> | {student.course} | Year {student.year_level} | {student.section} | {student.gender}
                        </div>
                        {/* Lab 06: Edit Button  */}
                        <button onClick={() => setEditingStudent(student)} style={{ marginLeft: "10px" }}>Edit</button>
                        {/* Lab 05: Delete Button [cite: 2] */}
                        {deletingStudentId === student._id ? (
                            <>
                                <button onClick={() => deleteStudent(student._id)} style={{ marginLeft: "5px", color: "red" }}>Confirm Delete</button>
                                <button onClick={() => setDeletingStudentId(null)} style={{ marginLeft: "5px" }}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setDeletingStudentId(student._id)} style={{ marginLeft: "5px", color: "red" }}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;