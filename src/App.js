import React, { useState } from "react";
import { ChevronLeft, Search, Star, Clock, MapPin, Plus, Minus, ShoppingBag, CheckCircle2, Flame, Coffee, Soup, Sandwich } from "lucide-react";

// ---- Design tokens ----
// bg/header: #7cd9fb (charcoal) | card: #FFFFFF | page bg: #FBF7F0 (warm paper)
// accent: #ff1ad5 (saffron) | accent-deep: #8E5ACD (chili) | success: #2BA84A (mint)
// info: #2E6BD9 (cobalt, used sparingly for Café tag) | text-muted: #8A8579 | hairline: #ECE6D8

const restaurants = [
  {
    id: 1,
    name: "Bhavani Mess",
    cuisine: "South Indian • Thali",
    rating: 4.5,
    time: "20-25 min",
    tag: "Trending",
    tagTone: "saffron",
    gradient: "from-[#E2E1FC] to-[#CB94F7]",
    icon: Soup,
    menu: [
      { id: 101, name: "Masala Dosa", price: 60, desc: "Crisp rice crepe, potato masala, chutney + sambar", veg: true },
      { id: 102, name: "Mini Idli Platter", price: 70, desc: "12 steamed idlis tossed in podi & ghee", veg: true },
      { id: 103, name: "Filter Coffee", price: 25, desc: "Classic South Indian decoction coffee", veg: true },
      { id: 104, name: "Curd Rice Bowl", price: 55, desc: "Comfort bowl with tempering & pomegranate", veg: true },
    ],
  },
  {
    id: 2,
    name: "Campus Tandoor",
    cuisine: "North Indian • Rolls",
    rating: 4.3,
    time: "25-30 min",
    tag: "Fast",
    tagTone: "mint",
    gradient: "from-[#9A2A1F] to-[#9A2A1F]",
    icon: Sandwich,
    menu: [
      { id: 201, name: "Paneer Tikka Roll", price: 85, desc: "Char-grilled paneer, mint chutney, layered paratha", veg: true },
      { id: 202, name: "Chicken Seekh Roll", price: 110, desc: "Spiced minced chicken kebab roll", veg: false },
      { id: 203, name: "Chicken Curry Meal", price: 120, desc: "Rice, chicken curry, papad, pickle", veg: false },
      { id: 204, name: "Masala Chaas", price: 30, desc: "Spiced buttermilk, served chilled", veg: true },
    ],
  },
  {
    id: 3,
    name: "Delight Cafe",
    cuisine: "Snacks • Coffee",
    rating: 4.7,
    time: "10-15 min",
    tag: "Near you",
    tagTone: "info",
    gradient: "from-[#D6BEFA] to-[#A76EEE]",
    icon: Coffee,
    menu: [
      { id: 301, name: "Cold Brew", price: 90, desc: "Slow-steeped 18 hours, served over ice", veg: true },
      { id: 302, name: "Cheese Maggi", price: 50, desc: "Loaded with cheese & veggies", veg: true },
      { id: 303, name: "Club Sandwich", price: 95, desc: "Triple-layer veg sandwich with fries", veg: true },
      { id: 304, name: "Chocolate Croissant", price: 65, desc: "Buttery, flaky, freshly baked", veg: true },
    ],
  },
];

function Badge({ children, tone = "saffron" }) {
  const tones = {
    saffron: "bg-[#FF7A1A] text-white",
    mint: "bg-[#2BA84A] text-white",
    info: "bg-[#2E6BD9] text-white",
    dark: "bg-[#1C1B19] text-white",
  };
  return <span className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-sm ${tones[tone]}`}>{children}</span>;
}

function VegDot({ veg }) {
  return (
    <span className={`inline-flex items-center justify-center w-3.5 h-3.5 border-2 rounded-sm shrink-0 ${veg ? "border-[#2BA84A]" : "border-[#8E5ACD]"}`}>
      <span className={`block w-1.5 h-1.5 rounded-full ${veg ? "bg-[#2BA84A]" : "bg-[#8E5ACD]"}`} />
    </span>
  );
}

// Signature element: a chai cup that fills to represent order progress
function ChaiProgress({ step }) {
  const pct = [20, 50, 80, 100][step];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-28">
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm">
          <path d="M15 20 L85 20 L75 100 Q50 112 25 100 Z" fill="#FBF7F0" stroke="#1C1B19" strokeWidth="4" />
          <clipPath id="cup">
            <path d="M15 20 L85 20 L75 100 Q50 112 25 100 Z" />
          </clipPath>
         <rect
  x="15"
  y={120 - pct}
  width="70"
  height={pct}
  fill="#B57EDC"
  clipPath="url(#cup)"
  style={{ transition: "all 0.6s ease" }}
/>

<rect
  x="15"
  y={120 - pct}
  width="70"
  height="4"
  fill="#E9D5FF"
  clipPath="url(#cup)"
  style={{ transition: "all 0.6s ease" }}
/>
          <ellipse cx="50" cy="20" rx="35" ry="6" fill="#FBF7F0" stroke="#1C1B19" strokeWidth="4" />
          <path d="M85 35 Q105 35 105 55 Q105 75 85 70" fill="none" stroke="#1C1B19" strokeWidth="4" />
        </svg>
      </div>
      <div className="text-xs font-bold text-[#8A8579] uppercase tracking-wide">{pct}% brewed</div>
    </div>
  );
}
const Phone = ({ children }) => (
  <div className="w-[380px] h-[760px] bg-[#915FF0] rounded-[40px] overflow-hidden shadow-2xl">
    {children}
  </div>
);

export default function CampusBite() {
  const [screen, setScreen] = useState("login"); // home | menu | cart | tracking
 const [isLogin, setIsLogin] = useState(true);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
 const [selectedId, setSelectedId] = useState(restaurants[0].id);
  const [cart, setCart] = useState({});
  const [trackStep, setTrackStep] = useState(1);

  const selected = restaurants.find((r) => r.id === selectedId);
  const menuItems = selected.menu;

  const openRestaurant = (id) => {
    setSelectedId(id);
    setCart({});
    setScreen("menu");
  };

  const addItem = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeItem = (id) => setCart((c) => { const n = { ...c }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => sum + menuItems.find((m) => m.id === Number(id)).price * qty, 0);
  const TopBar = ({ title, onBack }) => (
    <div className="flex items-center gap-3 px-5 pt-6 pb-4 bg-[#C2C9FA] text-white">
      {onBack && (
        <button onClick={onBack} className="w-8 h-8 -ml-1 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
          <ChevronLeft size={18} />
        </button>
      )}
      <h1 className="font-black text-xl tracking-tight" style={{ fontFamily: "Georgia, serif" }}>{title}</h1>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#94A1EE] flex items-center justify-center p-8" style={{ fontFamily: "system-ui, sans-serif" }}>
      <div className="flex flex-col items-center gap-4">
        <Phone>
        {screen === "login" && (
<div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[#F8F2FF] to-white px-6">

<div className="w-full max-w-md bg-white rounded-[35px] shadow-2xl p-8">

<h3
style={{
color:"#B57EDC",
textAlign:"center",
fontWeight:"700",
fontSize:"28px",
marginBottom:"5px"
}}
>
CodeAlpha Internship Mini Project
</h3>

<p
style={{
textAlign:"center",
color:"#8E5ACD",
marginBottom:"35px",
fontWeight:"500"
}}
>
Developed by Sathwika Chukkapalli
</p>

<h1
style={{
color:"#B57EDC",
fontSize:"60px",
fontWeight:"900",
textAlign:"center",
fontFamily:"Georgia"
}}
>
CampusBite
</h1>

<p
style={{
textAlign:"center",
color:"#8E5ACD",
fontSize:"20px",
marginBottom:"35px"
}}
>
Campus Food Ordering
</p>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"16px",
borderRadius:"14px",
border:"2px solid #E5D3FF",
marginBottom:"18px",
fontSize:"17px"
}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"16px",
borderRadius:"14px",
border:"2px solid #E5D3FF",
marginBottom:"25px",
fontSize:"17px"
}}
/>

<button
onClick={()=>{
if(email!=="" && password!==""){
setScreen("home");
}
}}
style={{
width:"100%",
padding:"16px",
background:"#8E5ACD",
color:"white",
fontWeight:"700",
fontSize:"20px",
border:"none",
borderRadius:"15px",
cursor:"pointer"
}}
>
Login
</button>

<p
style={{
textAlign:"center",
marginTop:"25px",
color:"#8E5ACD"
}}
>
Don't have an account?

<span
onClick={()=>setScreen("signup")}
style={{
fontWeight:"700",
cursor:"pointer",
marginLeft:"6px"
}}
>
Sign Up
</span>

</p>

</div>

</div>
)}
{screen === "signup" && (

<div className="flex-1 flex items-center justify-center">
  <div
    style={{
      width: "100%",
      maxWidth: "420px",
      background: "white",
      padding: "30px",
      borderRadius: "20px"
    }}
  >

    <h2 style={{textAlign:"center",color:"#B57EDC"}}>
      Sign Up
    </h2>

    <input
      type="text"
      placeholder="Full Name"
      style={{
        width:"100%",
        padding:"14px",
        marginTop:"20px",
        marginBottom:"15px"
      }}
    />

    <input
      type="email"
      placeholder="Email"
      style={{
        width:"100%",
        padding:"14px",
        marginBottom:"15px"
      }}
    />

    <input
      type="password"
      placeholder="Password"
      style={{
        width:"100%",
        padding:"14px",
        marginBottom:"20px"
      }}
    />

    <button
      onClick={() => setScreen("home")}
      style={{
        width:"100%",
        padding:"15px",
        background:"#B57EDC",
        color:"white",
        border:"none",
        borderRadius:"12px"
      }}
    >
      Create Account
    </button>

  </div>
</div>

)}
          {screen === "home" && (
            <>
              <div className="px-5 pt-7 pb-4 bg-[#1C1B19] text-white">
                <div className="flex items-center gap-1 text-[#7183F2] text-xs font-bold uppercase tracking-widest mb-1">
                  <MapPin size={12} /> SBIT, Pakabanda bazar
                </div>
                <h1 className="font-black text-2xl" style={{ fontFamily: "Georgia, serif" }}>What are you craving?</h1>
              </div>
              <div className="px-5 -mt-1 pb-3 bg-[#1C1B19]">
                <div className="bg-[#FBF7F0] rounded-2xl px-4 py-3 flex items-center gap-2 mb-4 shadow-inner">
                  <Search size={18} className="text-[#8A8579]" />
                  <span className="text-sm text-[#8A8579]">Search canteens, dishes...</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                <div className="flex items-center gap-2 text-[#1C1B19] font-bold text-sm">
                  <Flame size={16} className="text-[#FF7A1A]" /> Open near you
                </div>
                {restaurants.map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      onClick={() => openRestaurant(r.id)}
                      className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-md border border-black/5 active:scale-[0.98] transition"
                    >
                      <div className={`h-28 bg-gradient-to-br ${r.gradient} relative flex items-center justify-center`}>
                        <Icon size={40} className="text-white/30" />
                        <div className="absolute top-2 left-2"><Badge tone={r.tagTone}>{r.tag}</Badge></div>
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="p-3">
                        <div className="font-bold text-[#1C1B19]">{r.name}</div>
                        <div className="text-xs text-[#8A8579] mb-1">{r.cuisine}</div>
                        <div className="flex items-center gap-3 text-xs text-[#1C1B19] font-semibold">
                          <span className="flex items-center gap-1"><Star size={12} className="fill-[#FF7A1A] text-[#FF7A1A]" /> {r.rating}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {r.time}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {screen === "menu" && (
            <>
              <TopBar title={selected.name} onBack={() => setScreen("home")} />
              <div className="px-5 py-2 bg-[#1C1B19]">
                <div className="text-xs text-[#7C3AED] font-semibold flex items-center gap-3 pb-3">
                  <span className="flex items-center gap-1"><Star size={12} className="fill-[#7C3AED] text-[#7C3AED]" /> {selected.rating}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {selected.time}</span>
                  <span className="text-white/60">{selected.cuisine}</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-3 flex justify-between gap-3 border border-[#ECE6D8] shadow-sm">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1"><VegDot veg={item.veg} /><span className="font-bold text-sm text-[#1C1B19]">{item.name}</span></div>
                      <div className="text-xs text-[#8A8579] mb-2 leading-snug">{item.desc}</div>
                      <div className="font-bold text-sm text-[#8E5ACD]">₹{item.price}</div>
                    </div>
                    <div className="flex items-center">
                      {cart[item.id] ? (
                        <div className="flex items-center gap-2 bg-[#FF7A1A] rounded-full px-1 py-1 shadow">
                          <button onClick={() => removeItem(item.id)} className="w-6 h-6 bg-white rounded-full flex items-center justify-center"><Minus size={12} /></button>
                          <span className="text-white text-xs font-bold w-3 text-center">{cart[item.id]}</span>
                          <button onClick={() => addItem(item.id)} className="w-6 h-6 bg-white rounded-full flex items-center justify-center"><Plus size={12} /></button>
                        </div>
                      ) : (
                        <button onClick={() => addItem(item.id)} className="px-4 py-2 rounded-full border-2 border-[#FF7A1A] text-[#FF7A1A] text-xs font-bold uppercase hover:bg-[#FF7A1A] hover:text-white transition">
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {cartCount > 0 && (
                <button onClick={() => setScreen("cart")} className="mx-5 mb-6 bg-[#1C1B19] text-white rounded-2xl px-5 py-4 flex items-center justify-between font-bold shadow-lg">
                  <span className="flex items-center gap-2"><ShoppingBag size={18} className="text-[#FF7A1A]" /> {cartCount} item{cartCount > 1 ? "s" : ""}</span>
                  <span>View Cart · ₹{cartTotal} →</span>
                </button>
              )}
            </>
          )}

          {screen === "cart" && (
            <>
              <TopBar title="Your Cart" onBack={() => setScreen("menu")} />
              <div className="px-5 pt-3 text-xs text-[#8A8579] font-semibold">{selected.name}</div>
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = menuItems.find((m) => m.id === Number(id));
                  return (
                    <div key={id} className="flex justify-between items-center bg-white rounded-xl p-3 border border-[#ECE6D8] shadow-sm">
                      <div className="flex items-center gap-2">
                        <VegDot veg={item.veg} />
                        <div>
                          <div className="font-bold text-sm text-[#1C1B19]">{item.name}</div>
                          <div className="text-xs text-[#8A8579]">Qty {qty} · ₹{item.price} each</div>
                        </div>
                      </div>
                      <div className="font-bold text-sm text-[#8E5ACD]">₹{item.price * qty}</div>
                    </div>
                  );
                })}
                <div className="bg-[#FFEFE2] border border-[#FF7A1A]/30 rounded-xl p-3 text-xs font-semibold text-[#1C1B19] mt-4 flex items-center gap-2">
                  🎓 Student offer applied: FREE delivery on orders above ₹99
                </div>
                <div className="border-t border-dashed border-[#ECE6D8] pt-3 mt-3 space-y-1 text-sm">
                  <div className="flex justify-between text-[#8A8579]"><span>Item total</span><span>₹{cartTotal}</span></div>
                  <div className="flex justify-between text-[#8A8579]"><span>Delivery fee</span><span className="text-[#2BA84A] font-bold">FREE</span></div>
                  <div className="flex justify-between font-bold text-[#1C1B19] text-base pt-1 border-t border-[#ECE6D8] mt-1"><span>To pay</span><span>₹{cartTotal}</span></div>
                </div>
              </div>
              <button
                onClick={() => {
                  setScreen("tracking");
                  setTrackStep(0);
                  setTimeout(() => setTrackStep(1), 600);
                  setTimeout(() => setTrackStep(2), 1600);
                  setTimeout(() => setTrackStep(3), 2600);
                }}
                className="mx-5 mb-6 bg-[#FF7A1A] text-white rounded-2xl px-5 py-4 font-bold uppercase tracking-wide shadow-lg hover:bg-[#8E5ACD] transition"
              >
                Place Order · ₹{cartTotal}
              </button>
            </>
          )}

          {screen === "tracking" && (
            <>
              <TopBar title="Order Tracking" />
              <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 bg-gradient-to-b from-[#FBF7F0] to-white">
                <ChaiProgress step={trackStep} />
                <div className="text-center">
                  <div className="font-black text-lg text-[#1C1B19]">
                    {trackStep < 1 && "Order placed"}
                    {trackStep === 1 && `${selected.name} is preparing your food`}
                    {trackStep === 2 && "Out for delivery"}
                    {trackStep >= 3 && "Delivered — enjoy! 🎉"}
                  </div>
                  <div className="text-xs text-[#8A8579] mt-1">Estimated arrival: 18 min</div>
                </div>
                <div className="w-full space-y-3">
                  {["Order placed", "Preparing", "Out for delivery", "Delivered"].map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className={i <= trackStep ? "text-[#2BA84A]" : "text-[#D8D3C7]"} />
                      <span className={`text-sm font-semibold ${i <= trackStep ? "text-[#1C1B19]" : "text-[#B5AFA0]"}`}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { setScreen("home"); setCart({}); }}
                className="mx-5 mb-6 bg-[#1C1B19] text-white rounded-2xl px-5 py-3 font-bold uppercase text-sm hover:bg-black transition"
              >
                Back to Home
              </button>
            </>
          )}
        </Phone>
        </div>
        </div>
  );
}