import { useState } from "react";
import { useNavigate } from "react-router-dom";

const skillsList = [
    "Design", "Creativity", "Tech", "Math", "Marketing", "Finance",
    "Fine Art", "Writing", "Sales", "Teaching", "Coding", "Research",
    "Fashion", "Hair", "Pottery", "Cooking", "Photography", "Music",
    "Video Editing", "Public Speaking", "Leadership", "UI/UX",
    "Animation", "Game Dev", "AI", "Data Science", "Fitness",
    "Nutrition", "Languages", "Entrepreneurship",
];

function SkillMatching() {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const navigate = useNavigate();

    function toggleSkill(skill: string) {
        setSelectedSkills((prev) =>
            prev.includes(skill)
                ? prev.filter((s) => s !== skill)
                : [...prev, skill]
        );
    }

    function handleConfirm() {
        if (selectedSkills.length === 0) {
            alert("Please select at least one skill");
            return;
        }

        const isDone = window.confirm("Are you done selecting skills?");

        if (isDone) {
            localStorage.setItem("skills", JSON.stringify(selectedSkills));

            navigate("/course");
        }
    }

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "390px",
                margin: "0 auto",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <div
                className="screen-header"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <h2 className="header-title">Skill Matching</h2>
                <p className="header-subtitle">What are your Skills?</p>
            </div>

            {/* Card */}
            <div
                className="purple-card"
                style={{
                    height: "75vh",
                    maxHeight: "720px",
                    margin: "0 10px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                {/* Scrollable skills */}
                <div
                    className="skills-scroll"
                    style={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "5px",
                        }}
                    >
                        {skillsList.map((skill) => {
                            const isSelected = selectedSkills.includes(skill);

                            return (
                                <span
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    style={{
                                        width: "80%",
                                        padding: "10px",
                                        borderRadius: "20px",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        background: isSelected ? "#facc15" : "#1a1a1a",
                                        color: isSelected ? "#000" : "#fff",
                                        transition: "0.2s",
                                    }}
                                >
                                    {skill}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Button */}
                <button
                    className="primary-button"
                    onClick={handleConfirm}
                    style={{
                        width: "80%",
                        alignSelf: "center",
                        flexShrink: 0,
                    }}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default SkillMatching;