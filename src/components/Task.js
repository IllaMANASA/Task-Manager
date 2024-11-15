import React, { useState } from 'react';
import './Task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function Task({ task, deleteTask, completeTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.taskName);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, editedTaskName);
    setIsEditing(false);
  };

  return (
    <div className={`Task ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={editedTaskName}
          onChange={(e) => setEditedTaskName(e.target.value)}
        />
      ) : (
        <span>{task.taskName} - <strong>{task.priority}</strong></span>
        
      )}
      <div className="buttons">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={() => completeTask(task.id)}>Completed</button>
            <button onClick={handleEdit} className="editButton">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
