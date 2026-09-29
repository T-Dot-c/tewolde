import { useState } from "react";

interface ProjectDemo {
  id: string;
  type: "Website" | "Web app";
  title: string;
  line: string;
  url: string;
  stack: string[];
}

const DEMO_PROJECTS: ProjectDemo[] = [
  {
    id: "derm",
    type: "Website",
    title: "Abed Dermatology",
    line: "Clinic site with online booking",
    url: "abed-dermatology.example",
    stack: ["React", "Tailwind", "Vite"],
  },
  {
    id: "quiz",
    type: "Web app",
    title: "QuizLab",
    line: "Take a quiz and see your score",
    url: "quiz.example/play",
    stack: ["React", "TypeScript"],
  },
  {
    id: "dash",
    type: "Web app",
    title: "YARC System",
    line: "Requests dashboard for staff",
    url: "yarc.example/overview",
    stack: ["React", "Charts", "REST"],
  },
];

const QUIZ_QUESTIONS = [
  {
    question: "Which tag holds the page's main content?",
    options: ["<main>", "<aside>", "<head>"],
    answerIndex: 0,
  },
  {
    question: "What does CSS stand for?",
    options: ["Color Style Sheets", "Cascading Style Sheets", "Code Style Syntax"],
    answerIndex: 1,
  },
  {
    question: "Which hook stores state in React?",
    options: ["useEffect", "useRef", "useState"],
    answerIndex: 2,
  },
];

export default function LiveDemos() {
  const [filter, setFilter] = useState<"all" | "Website" | "Web app">("all");
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  const [currentId, setCurrentId] = useState<string>("derm");

  // Interactive Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>("Choose an answer.");

  const filteredProjects = DEMO_PROJECTS.filter(
    (p) => filter === "all" || p.type === filter
  );

  const activeProject =
    DEMO_PROJECTS.find((p) => p.id === currentId) || DEMO_PROJECTS[0];

  const handleSelectProject = (id: string) => {
    setCurrentId(id);
    if (id === "quiz") {
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedbackText("Choose an answer.");
  };

  const handleAnswerClick = (optionIndex: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(optionIndex);

    const isCorrect = optionIndex === QUIZ_QUESTIONS[quizStep].answerIndex;
    const newScore = isCorrect ? quizScore + 1 : quizScore;
    if (isCorrect) {
      setQuizScore(newScore);
      setFeedbackText("Correct!");
    } else {
      setFeedbackText("Not quite. The right answer is highlighted.");
    }

    setTimeout(() => {
      setQuizStep((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedbackText("Choose an answer.");
    }, 1100);
  };

  return (
    <section className="demos-wrapper border-b border-token-border" id="demos">
      <div className="demos-container">
        <h2 className="demos-title">Try the work, not screenshots.</h2>
        <p className="demos-lead">
          Pick a project and use it here. Switch between desktop and phone to see how each one responds.
        </p>

        {/* Filter and Device Switcher Controls */}
        <div className="demos-tools">
          {/* Project Type Filter */}
          <div className="demos-seg" role="group" aria-label="Project type">
            <button
              type="button"
              aria-pressed={filter === "all"}
              onClick={() => {
                setFilter("all");
                if (!DEMO_PROJECTS.some((p) => p.id === currentId)) {
                  setCurrentId(DEMO_PROJECTS[0].id);
                }
              }}
            >
              All
            </button>
            <button
              type="button"
              aria-pressed={filter === "Website"}
              onClick={() => {
                setFilter("Website");
                const matched = DEMO_PROJECTS.filter((p) => p.type === "Website");
                if (!matched.some((p) => p.id === currentId) && matched.length > 0) {
                  setCurrentId(matched[0].id);
                }
              }}
            >
              Websites
            </button>
            <button
              type="button"
              aria-pressed={filter === "Web app"}
              onClick={() => {
                setFilter("Web app");
                const matched = DEMO_PROJECTS.filter((p) => p.type === "Web app");
                if (!matched.some((p) => p.id === currentId) && matched.length > 0) {
                  setCurrentId(matched[0].id);
                }
              }}
            >
              Web apps
            </button>
          </div>

          {/* Device Size Switcher */}
          <div className="demos-seg" role="group" aria-label="Screen size">
            <button
              type="button"
              aria-pressed={device === "desktop"}
              onClick={() => setDevice("desktop")}
            >
              Desktop
            </button>
            <button
              type="button"
              aria-pressed={device === "phone"}
              onClick={() => setDevice("phone")}
            >
              Phone
            </button>
          </div>
        </div>

        {/* Interactive Grid: List on Left, Frame on Right */}
        <div className="demos-grid">
          {/* Left Selection List */}
          <div className="demos-list">
            {filteredProjects.map((p) => (
              <button
                key={p.id}
                type="button"
                className="demos-item"
                aria-current={p.id === currentId}
                onClick={() => handleSelectProject(p.id)}
              >
                <b>{p.title}</b>
                <span>{p.line}</span>
                <small>{p.type}</small>
              </button>
            ))}
          </div>

          {/* Right Live Device Mockup Frame */}
          <div>
            <div className="demos-frame" data-device={device}>
              {/* Window Header Bar */}
              <div className="demos-bar">
                <i />
                <i />
                <i />
                <em>{activeProject.url}</em>
              </div>

              {/* Dynamic Screen Output */}
              <div className="demos-screen" aria-live="polite">
                {/* 1. Abed Dermatology Screen */}
                {activeProject.id === "derm" && (
                  <div className="demos-m">
                    <div className="demos-nav">
                      <b>Abed Skin</b>
                      <span>Services &nbsp; Book</span>
                    </div>
                    <h2>Clear skin starts with a plan.</h2>
                    <p>Book a visit in two taps and see a doctor this week.</p>
                    <button type="button" className="demos-pill">
                      Book a visit
                    </button>
                    <div className="demos-img" />
                    <div className="demos-cards">
                      <div>
                        Acne care
                        <small>Diagnosis and treatment</small>
                      </div>
                      <div>
                        Laser
                        <small>Scars and spots</small>
                      </div>
                      <div>
                        Kids
                        <small>Gentle, family friendly</small>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. QuizLab Interactive Game */}
                {activeProject.id === "quiz" && (
                  <div className="demos-m" id="quiz">
                    <div className="demos-nav">
                      <b>QuizLab</b>
                      <span>
                        {quizStep < QUIZ_QUESTIONS.length
                          ? `Question ${quizStep + 1} of ${QUIZ_QUESTIONS.length}`
                          : "Done"}
                      </span>
                    </div>

                    <div className="demos-prog">
                      <i
                        style={{
                          width: `${
                            quizStep < QUIZ_QUESTIONS.length
                              ? (quizStep / QUIZ_QUESTIONS.length) * 100
                              : 100
                          }%`,
                        }}
                      />
                    </div>

                    {quizStep < QUIZ_QUESTIONS.length ? (
                      <>
                        <h2 style={{ maxWidth: "none", fontSize: "1.4rem" }}>
                          {QUIZ_QUESTIONS[quizStep].question}
                        </h2>
                        <div>
                          {QUIZ_QUESTIONS[quizStep].options.map((optText, k) => {
                            const isCorrectAnswer =
                              k === QUIZ_QUESTIONS[quizStep].answerIndex;
                            const isSelected = selectedAnswer === k;

                            let optClass = "demos-opt";
                            if (isAnswered) {
                              if (isCorrectAnswer) optClass += " ok";
                              else if (isSelected) optClass += " no";
                            }

                            return (
                              <button
                                key={k}
                                type="button"
                                disabled={isAnswered}
                                className={optClass}
                                onClick={() => handleAnswerClick(k)}
                              >
                                {optText}
                              </button>
                            );
                          })}
                        </div>
                        <p>{feedbackText}</p>
                      </>
                    ) : (
                      <>
                        <h2 style={{ maxWidth: "none", fontSize: "1.4rem" }}>
                          You scored {quizScore} of {QUIZ_QUESTIONS.length}
                        </h2>
                        <div>
                          <button
                            type="button"
                            className="demos-pill"
                            onClick={resetQuiz}
                          >
                            Play again
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 3. YARC System Interactive Dashboard */}
                {activeProject.id === "dash" && (
                  <div className="demos-dash">
                    <div className="demos-side">
                      <b>YARC</b>
                      <span>Overview</span>
                      <span>Requests</span>
                      <span>Reports</span>
                    </div>
                    <div className="demos-m">
                      <div className="demos-nav">
                        <b style={{ color: "var(--demos-ink)" }}>Overview</b>
                        <span>This week</span>
                      </div>
                      <div className="demos-stats">
                        <div>
                          <b>128</b>Requests
                        </div>
                        <div>
                          <b>94%</b>Resolved
                        </div>
                        <div>
                          <b>7</b>Waiting
                        </div>
                      </div>
                      <div className="demos-bars">
                        <i style={{ height: "45%" }} />
                        <i style={{ height: "70%" }} />
                        <i style={{ height: "55%" }} />
                        <i style={{ height: "90%" }} />
                        <i style={{ height: "65%" }} />
                        <i style={{ height: "80%" }} />
                      </div>
                      <table className="demos-table">
                        <tbody>
                          <tr>
                            <td>Request 1042</td>
                            <td>
                              <span className="demos-tag">Done</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Request 1043</td>
                            <td>
                              <span className="demos-tag w">Waiting</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Request 1044</td>
                            <td>
                              <span className="demos-tag">Done</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stack Tags Metadata */}
            <div className="demos-meta">
              Built with{" "}
              {activeProject.stack.map((tech) => (
                <code key={tech}>{tech}</code>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
