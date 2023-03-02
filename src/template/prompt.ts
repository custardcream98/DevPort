import type { QueryPrompt } from "types/prompt";

const promptTemplate = ({
  shouldGenerateTips,
  audience,
  introduce,
  experience,
  skills,
  projects,
}: QueryPrompt) => `You're a hiring manager looking for a new ${audience} to join your team. Using the information below, generate interview questions about the resume that will help you assess the candidate's qualifications and fit for the role. ${
  shouldGenerateTips
    ? "And give some brief tip on how to answer the each questions. DO NOT give what the type of question was."
    : ""
}

Instructions:
- Format: ${
  shouldGenerateTips
    ? `
1. [Question]
- Tip: [Tip]

2. [Question]
- Tip: [Tip]

...`
    : `Markdown`
}
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
