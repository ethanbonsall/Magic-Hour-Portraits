const Courses = () => {
  const courses = [
    {
      name: "Foundations of Programming",
      description:
        "Learned how to reason about how my code is structured, identify whether a given structure is effective in a given context, and look at ways of organizing units of code that support larger programs.",
    },
    {
      name: "Computer Organization",
      description:
        "Learned the fundamentals of computer hardware design, transistors and logic gates, progressing through basic combinational and sequential components, culminating in the conceptual design CPU.",
    },
    {
      name: "Modern Web Programming",
      description:
        "Developing applications for the World Wide Web including both client-side and server-side programming. Emphasis on Model-View-Controller architecture, AJAX, RESTful Web services, and database interaction.",
    },
    {
      name: "Foundations of Software Engineering",
      description:
        "Learned how to set up a Python Dev Container in VS Code, create a GitHub-hosted static site with Material for MkDocs, and deploy it using GitHub Actions, gaining insight into open-source tools and workflows.",
    },
    {
      name: "Introduction to Probability",
      description:
        "Learned the mathematical theory of probability covering random variables; moments; binomial, Poisson, and normal distributions; generating functions; sums of random variables; and statistical applications.",
    },
    {
      name: "Discrete Mathematics",
      description:
        "Learned the foundations of mathematics: logic, set theory, relations and functions, induction, permutations and combinations, recurrence.",
    },
    {
      name: "Linear Algebra",
      description:
        "Algebra of matrices with applications: determinants, solution of linear systems by Gaussian elimination, Gram-Schmidt procedure, and eigenvalues.",
    },
  ];

  type Course = {
    name: string;
    description: string;
  };

  const CourseList = ({ courses }: { courses: Course[] }) => {
    return (
      <div className="w-full bg-secondary overflow-x-auto py-6 px-4">
        <div className="flex overflow-y-visible pb-10 space-x-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-primary text-text rounded-xl p-4 w-[80vw] md:w-[300px] shadow-lg transition-transform hover:scale-105"
            >
              <h3 className="text-reverse font-bold text-xl mb-2">
                {course.name}
              </h3>
              <p className="text-reverse">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return <CourseList courses={courses} />;
};

export default Courses;
