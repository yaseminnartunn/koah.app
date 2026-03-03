import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Dumbbell, User } from "lucide-react";

const navItems = [
  { label: "Ana Sayfa", icon: Home, page: "Home" },
  { label: "Egzersizler", icon: Dumbbell, page: "Exercises" },
  { label: "Profil", icon: User, page: "Profile" },
];

export default function Layout({ children, currentPageName }) {
  const hideNav = ["ExerciseDetail"].includes(currentPageName);

  return (
    <div className="flex flex-col min-h-screen bg-[#fff0f6] max-w-md mx-auto relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        * { font-family: 'Nunito', system-ui, sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        body { background: #fff0f6; }
      `}</style>

      <div className="flex-1 pb-20">{children}</div>

      {!hideNav && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 shadow-lg z-50">
          <div className="flex justify-around py-2">
            {navItems.map(({ label, icon: Icon, page }) => {
              const active = currentPageName === page;
              return (
                <Link
                  key={page}
                  to={createPageUrl(page)}
                  className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors ${
                    active ? "text-[#e91e8c]" : "text-gray-400"
                  }`}
                >
                  <div className={`p-1.5 rounded-xl transition-all ${active ? "bg-pink-100" : ""}`}>
                    <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
                  </div>
                  <span className="text-xs font-bold">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}