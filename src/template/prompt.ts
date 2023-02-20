const promptTemplate = (
  audience: string,
  introduce: string,
  experience: string,
  skills: string,
  projects: string,
) => `You're a hiring manager looking for a new ${audience} to join your team. Using the information below, generate 10 interview questions based on the resume that will help you assess the candidate's qualifications and fit for the role.

Instructions:
- Format: Markdown
- Question Difficulty: Challenging
- Question Quantity: 10
- Question Audience: Candidate
- Question Purpose: Assess candidate qualifications and fit for role
- Question Language: English

Resume Information:
- Introduce: [Candidate's self-introduction]
- Experience: [Number of years of experience, previous roles and responsibilities]
- Skills: [Skills and other relevant abilities]
- Projects: [Noteworthy projects and contributions]

Resume:
- Introduce: ${introduce}
- Experience: ${experience}
- Skills: ${skills}
- Projects: ${projects}`;

export { promptTemplate };
