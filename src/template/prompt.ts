import type { QueryPrompt } from "types/prompt";

const promptTemplate = ({
  audience,
  introduce,
  experience,
  skills,
  projects,
}: QueryPrompt) => `You're a hiring manager looking for a new ${audience} to join your team. Using the information below, generate interview questions based on the resume that will help you assess the candidate's qualifications and fit for the role. And give some brief tip on how to answer the each questions, but do not give what the question sample type was.

Instructions:
- Format: Markdown
- Question Difficulty: Challenging
- Question Quantity: 15
- Question Audience: Candidate
- Question Purpose: Assess candidate qualifications and fit for role
- Question Language: English

Sample Question Types:
- Behavioral: Ask the candidate to describe a specific scenario they faced and how they responded.
${
  audience.toLowerCase().includes("developer")
    ? "- Technical: Ask the candidate to explain how they would approach a specific technical challenge."
    : ""
}

Resume Information:
${introduce ? "- Introduce: [Candidate's self-introduction]" : ""}
${
  experience
    ? "- Experience: [Number of years of experience, previous roles and responsibilities]"
    : ""
}
${skills ? "- Skills: [Skills and other relevant abilities]" : ""}
${projects ? "- Projects: [Noteworthy projects and contributions]" : ""}

Resume:
${introduce ? `- Introduce: ${introduce}` : ""}
${experience ? `- Experience: ${experience}` : ""}
${skills ? `- Skills: ${skills}` : ""}
${projects ? `- Projects: ${projects}` : ""}`;

export { promptTemplate };
