import React, { useState, useEffect } from "react";

export default function App() {
  const [gameRoles, setGameRoles] = useState({});
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    fetch("/roles.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched JSON:", data);
        setGameRoles(data);
      })
      .catch((error) => {
        console.error("Error fetching roles.json:", error);
      });
  }, []);

  const initializeRoles = (game) => {
    const core = gameRoles[game]?.core.map((role) => role.id) || [];
    setSelectedRoles(core);
  };

  const handleRoleToggle = (roleId) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const roleTags = selectedRoles.map((id) => `<@&${id}>`).join(" ");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roleTags);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          padding: "1.5rem",
          background: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          Discord Role Tag Generator
        </h1>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontWeight: "500",
            }}
          >
            Select a Game
          </label>
          <select
            style={{
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "0.25rem",
              padding: "0.5rem",
            }}
            value={selectedGame}
            onChange={(e) => {
              setSelectedGame(e.target.value);
              initializeRoles(e.target.value);
            }}
          >
            <option value="">-- Choose a game --</option>
            {Object.keys(gameRoles).map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </select>
        </div>

        {selectedGame && (
          <>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.25rem",
                  fontWeight: "500",
                }}
              >
                Core Roles (pre-selected)
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem",
                }}
              >
                {gameRoles[selectedGame]?.core.map((role) => (
                  <label
                    key={role.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.5rem",
                      background: "#f9fafb",
                      border: "1px solid #ccc",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role.id)}
                      onChange={() => handleRoleToggle(role.id)}
                      style={{ marginRight: "0.5rem" }}
                    />
                    {role.name}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.25rem",
                  fontWeight: "500",
                }}
              >
                Optional Roles
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem",
                }}
              >
                {gameRoles[selectedGame]?.optional.map((role) => (
                  <label
                    key={role.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.5rem",
                      background: "#f9fafb",
                      border: "1px solid #ccc",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role.id)}
                      onChange={() => handleRoleToggle(role.id)}
                      style={{ marginRight: "0.5rem" }}
                    />
                    {role.name}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedRoles.length > 0 && (
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "0.25rem",
              }}
            >
              Generated Role Tags
            </label>
            <div
              style={{
                background: "#e5e7eb",
                borderRadius: "0.25rem",
                padding: "0.5rem",
                fontFamily: "monospace",
                fontSize: "0.875rem",
                whiteSpace: "pre-wrap",
                marginBottom: "0.5rem",
              }}
            >
              {roleTags}
            </div>
            <button
              onClick={copyToClipboard}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.5rem 1rem",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
