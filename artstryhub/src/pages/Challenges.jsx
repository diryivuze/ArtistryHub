import React from "react";

const Challenges = () => {
  const challenges = [
    { title: "Digital Painting Contest", deadline: "Dec 10, 2024" },
    { title: "Photography Challenge", deadline: "Jan 20, 2025" },
  ];

  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Challenges</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge, index) => (
          <li
            key={index}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{challenge.title}</h2>
            <p className="mt-2 text-gray-600">
              Deadline: {challenge.deadline}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Challenges;
