import { Outlet, Link, useLocation } from "react-router";
import { Package, ShoppingBag } from "lucide-react";
import { useGroceryStore } from "../hooks/useGroceryStore";

export function Layout() {
  const location = useLocation();
  const { getShoppingList } = useGroceryStore();
  const shoppingCount = getShoppingList().length;

  const isShop = location.pathname === "/shopping-list";
  const isPantry = location.pathname === "/pantry";
  const isWelcome = location.pathname === "/welcome";

  return (
    <div
      className={`min-h-screen bg-violet-50/40 font-sans selection:bg-violet-100 ${
        isWelcome ? "" : "pb-24"
      }`}
    >
      <header
        className={`bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-violet-100/60 shadow-sm shadow-violet-100/20 ${
          isWelcome ? "hidden" : ""
        }`}
      >
        <div className="px-5 py-4 max-w-lg mx-auto flex items-center justify-center">
          <h1 className="text-[17px] font-bold tracking-tight text-slate-800">
            {isShop ? "Shopping List" : "Pantry"}
          </h1>
        </div>
      </header>

      <main className={isWelcome ? "max-w-lg mx-auto" : "p-4 max-w-lg mx-auto"}>
        <Outlet />
      </main>

      <nav
        id="footer-nav"
        className={`fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-violet-100/60 shadow-[0_-4px_20px_-4px_rgba(139,92,246,0.07)] z-20 ${
          isWelcome ? "hidden" : ""
        }`}
      >
        <div className="flex justify-around items-center h-[72px] max-w-lg mx-auto px-2">
          <Link
            to="/pantry"
            className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all ${
              isPantry
                ? "text-violet-600"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Package size={24} strokeWidth={isPantry ? 2.5 : 2} />
            <span className="text-[11px] font-bold tracking-wide">Pantry</span>
          </Link>

          <Link
            to="/shopping-list"
            className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all relative ${
              isShop ? "text-violet-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <div className="relative">
              <ShoppingBag size={24} strokeWidth={isShop ? 2.5 : 2} />
              {shoppingCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[10px] rounded-full min-w-[20px] h-[20px] flex items-center justify-center font-bold border-[2px] border-white shadow-sm px-1 z-10">
                  {shoppingCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold tracking-wide">Shop</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
