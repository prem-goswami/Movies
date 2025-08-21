import React, { useState } from "react";
import "./ProjectAlert.css";

const ProjectAlert = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="project-alert-overlay">
      <div className="project-alert-box">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1px",
          }}
        >
          <span style={{ fontSize: "2.5rem", marginBottom: "2px" }}>🎬</span>
          <h2>Movies Discovery Website – Built with React + Vite</h2>
        </div>
        <p style={{ margin: "10px 0 0 0", fontWeight: 500 }}>
          This project is a full-featured movies discovery platform designed to
          highlight modern front-end engineering practices. Built using React,
          Vite, JavaScript, and CSS, the application integrates with a movies
          API to deliver real-time, dynamic content.
        </p>
        <ul>
          <li>
            <strong>API-Driven Content:</strong> Fetches trending and top-rated
            movies with live updates.
          </li>
          <li>
            <strong>Debounced Search Bar:</strong> Optimized search with
            debouncing to minimize API calls while typing.
          </li>
          <li>
            <strong>Recent Searches Section:</strong> Maintains a history of
            recent queries for quick access.
          </li>
          <li>
            <strong>Reusable Component Architecture:</strong> Modular design
            with shared UI elements for scalability.
          </li>
          <li>
            <strong>Performance-Oriented Setup:</strong> Developed with Vite for
            lightning-fast builds and HMR, with ESLint enforcing best practices.
          </li>
          <li>
            <strong>User Experience Enhancements:</strong> Smooth transitions
            and hover effects
          </li>
        </ul>
        <button className="project-alert-btn" onClick={() => setVisible(false)}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default ProjectAlert;
