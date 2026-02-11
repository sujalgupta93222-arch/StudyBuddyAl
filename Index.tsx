import { useState } from "react";
import { motion } from "framer-motion";
import StudentForm from "@/components/StudentForm";
import StudyPlanView from "@/components/StudyPlanView";
import { StudentData, StudyPlan } from "@/types/student";
import { generateStudyPlan } from "@/lib/generatePlan";
import studyHero from "@/assets/study-hero.png";
import { GraduationCap } from "lucide-react";

const Index = () => {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleSubmit = (data: StudentData) => {
    setStudentData(data);
    setPlan(generateStudyPlan(data));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setPlan(null);
    setStudentData(null);
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-5xl mx-auto flex items-center gap-3 py-3 px-4">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display leading-tight">StudyBuddy AI</h1>
            <p className="text-xs text-muted-foreground">Your personal study mentor 📚</p>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
        {!plan ? (
          <div>
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <img src={studyHero} alt="Student studying" className="w-32 h-32 mx-auto mb-4 animate-float rounded-2xl" />
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
                Study Smarter, Not Harder 💪
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tell me about yourself and I'll create a personalized study plan that actually works. No generic advice — just YOU.
              </p>
            </motion.div>

            <StudentForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <StudyPlanView plan={plan} studentName={studentData?.name || "Student"} onBack={handleBack} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Made with ❤️ by StudyBuddy AI — Your long-term study partner
        </p>
      </footer>
    </div>
  );
};

export default Index;
