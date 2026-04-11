import React, { useEffect, useMemo, useState } from "react";
import API from "../../api/Api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";
import { FaCarSide } from "react-icons/fa";
import {
  FiUsers,
  FiTag,
  FiFileText,
  FiCalendar,
  FiTrendingUp,
  FiActivity,
  FiCreditCard,
} from "react-icons/fi";

const AnimatedNumber = ({ value, duration = 1200 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;
    if (end === 0) {
      setCount(0);
      return;
    }

    const incrementTime = Math.max(20, Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}</>;
};

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [payments, setPayments] = useState([]);

  const fetchData = async () => {
    try {
      const [carRes, userRes, offerRes, inspectionRes, testDriveRes, paymentRes] =
        await Promise.all([
          API.get("/car/cars"),
          API.get("/user/users"),
          API.get("/offer/"),
          API.get("/inspection/inspections"),
          API.get("/testdrive/"),
          API.get("/admin/payments"),
        ]);

      setCars(carRes.data?.data || []);
      setUsers(userRes.data?.data || []);
      setOffers(offerRes.data?.data || []);
      setInspections(inspectionRes.data?.data || []);
      setTestDrives(testDriveRes.data?.data || []);
      setPayments(paymentRes.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pendingOffers = offers.filter((o) => o.status === "pending").length;
  const acceptedOffers = offers.filter((o) => o.status === "accepted").length;
  const rejectedOffers = offers.filter((o) => o.status === "rejected").length;

  const pendingTestDrives = testDrives.filter((t) => t.status === "pending").length;
  const acceptedTestDrives = testDrives.filter((t) => t.status === "accepted").length;
  const completedTestDrives = testDrives.filter((t) => t.status === "completed").length;
  const rejectedTestDrives = testDrives.filter((t) => t.status === "rejected").length;

  const paidPayments = payments.filter((p) => p.status === "paid").length;
  const pendingPayments = payments.filter((p) => p.status === "created").length;
  const failedPayments = payments.filter((p) => p.status === "failed").length;

  const offerStats = [
    { name: "Pending", value: pendingOffers, color: "#22d3ee" },
    { name: "Accepted", value: acceptedOffers, color: "#10b981" },
    { name: "Rejected", value: rejectedOffers, color: "#f59e0b" },
  ];

  const testDriveStats = [
    { name: "Pending", value: pendingTestDrives, color: "#60a5fa" },
    { name: "Accepted", value: acceptedTestDrives, color: "#34d399" },
    { name: "Completed", value: completedTestDrives, color: "#22d3ee" },
    { name: "Rejected", value: rejectedTestDrives, color: "#f87171" },
  ];

  const activityTrend = [
    { name: "Cars", value: cars.length, fill: "#22d3ee" },
    { name: "Users", value: users.length, fill: "#10b981" },
    { name: "Offers", value: offers.length, fill: "#f59e0b" },
    { name: "Drives", value: testDrives.length, fill: "#60a5fa" },
    { name: "Inspect", value: inspections.length, fill: "#a78bfa" },
    { name: "Payments", value: payments.length, fill: "#34d399" },
  ];

  const recentCars = useMemo(() => cars.slice(0, 3), [cars]);
  const recentInspections = useMemo(() => inspections.slice(0, 3), [inspections]);
  const recentTestDrives = useMemo(() => testDrives.slice(0, 3), [testDrives]);

  const conversionRate =
    offers.length > 0
      ? Math.round((acceptedOffers / offers.length) * 100)
      : 0;

  const stats = [
    {
      title: "Cars",
      value: cars.length,
      subtitle: "Active inventory",
      icon: <FaCarSide size={18} />,
      color: "from-cyan-400 to-cyan-500",
      glow: "shadow-cyan-500/20",
    },
    {
      title: "Users",
      value: users.length,
      subtitle: "Registered members",
      icon: <FiUsers size={18} />,
      color: "from-emerald-400 to-emerald-500",
      glow: "shadow-emerald-500/20",
    },
    {
      title: "Offers",
      value: offers.length,
      subtitle: "Negotiation records",
      icon: <FiTag size={18} />,
      color: "from-amber-400 to-amber-500",
      glow: "shadow-amber-500/20",
    },
    {
      title: "Test Drives",
      value: testDrives.length,
      subtitle: "Buyer bookings",
      icon: <FiCalendar size={18} />,
      color: "from-blue-400 to-blue-500",
      glow: "shadow-blue-500/20",
    },
    {
      title: "Inspections",
      value: inspections.length,
      subtitle: "Quality reviews",
      icon: <FiFileText size={18} />,
      color: "from-violet-400 to-violet-500",
      glow: "shadow-violet-500/20",
    },
    {
      title: "Payments",
      value: payments.length,
      subtitle: "Token transactions",
      icon: <FiCreditCard size={18} />,
      color: "from-emerald-400 to-teal-500",
      glow: "shadow-emerald-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_left,rgba(16,185,129,0.10),transparent_24%),radial-gradient(circle_at_bottom,rgba(96,165,250,0.12),transparent_30%)]" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Admin Command Center
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              Live marketplace intelligence
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Track offers, payments, test drives, inspections, and platform growth from
              one premium dashboard built to feel active and decision-ready.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Data Feed
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                <FiTrendingUp />
                {conversionRate}% Offer Conversion
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                <FiCreditCard />
                {paidPayments} Successful Payments
              </div>
            </div>
          </div>

          <div className="grid min-w-[280px] gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-cyan-300">
                <FiActivity />
                <p className="text-sm uppercase tracking-[0.18em]">Demand Pulse</p>
              </div>
              <p className="mt-3 text-3xl font-bold text-white">
                <AnimatedNumber value={pendingOffers + pendingTestDrives + pendingPayments} />
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Pending platform actions need attention
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-emerald-300">
                <FiCreditCard />
                <p className="text-sm uppercase tracking-[0.18em]">Payment Health</p>
              </div>
              <p className="mt-3 text-3xl font-bold text-white">
                <AnimatedNumber value={paidPayments} />
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Successful token payments completed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        {stats.map((item, index) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111827] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.20)] transition duration-500 hover:-translate-y-1 hover:border-white/20"
            style={{ animation: `fadeUp 0.5s ease ${index * 0.08}s both` }}
          >
            <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-2xl transition duration-500 group-hover:opacity-20`} />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{item.title}</p>
                <h2 className="mt-2 text-3xl font-bold text-white">
                  <AnimatedNumber value={item.value} />
                </h2>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {item.subtitle}
                </p>
              </div>

              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-slate-950 shadow-lg ${item.glow}`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div
          className="rounded-[30px] border border-white/10 bg-[#111827] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          style={{ animation: "fadeUp 0.6s ease 0.2s both" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Offer Performance
          </p>
          <h2 className="mt-2 text-2xl font-bold">Negotiation Overview</h2>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={offerStats} barSize={52}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} animationDuration={1200}>
                  {offerStats.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="rounded-[30px] border border-white/10 bg-[#111827] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          style={{ animation: "fadeUp 0.6s ease 0.3s both" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
            Test Drive Mix
          </p>
          <h2 className="mt-2 text-2xl font-bold">Booking Status Split</h2>

          <div className="mt-6 h-[290px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={testDriveStats}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={100}
                  paddingAngle={4}
                  animationDuration={1200}
                >
                  {testDriveStats.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#cbd5e1" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div
          className="rounded-[30px] border border-white/10 bg-[#111827] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          style={{ animation: "fadeUp 0.6s ease 0.4s both" }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
                Quick Summary
              </p>
              <h2 className="mt-2 text-2xl font-bold">Operational Snapshot</h2>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              Live Metrics
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="group rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/10 to-transparent p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/10">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Pending Offers
              </p>
              <p className="mt-3 text-3xl font-bold text-cyan-300">
                <AnimatedNumber value={pendingOffers} />
              </p>
              <p className="mt-2 text-sm text-slate-500">
                New negotiations waiting for response
              </p>
            </div>

            <div className="group rounded-3xl border border-emerald-400/10 bg-gradient-to-br from-emerald-400/10 to-transparent p-4 transition duration-300 hover:border-emerald-400/20 hover:bg-emerald-400/10">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Accepted Offers
              </p>
              <p className="mt-3 text-3xl font-bold text-emerald-300">
                <AnimatedNumber value={acceptedOffers} />
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Deals currently moving forward
              </p>
            </div>

            <div className="group rounded-3xl border border-blue-400/10 bg-gradient-to-br from-blue-400/10 to-transparent p-4 transition duration-300 hover:border-blue-400/20 hover:bg-blue-400/10">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Drive Pipeline
              </p>
              <p className="mt-3 text-3xl font-bold text-blue-300">
                <AnimatedNumber value={pendingTestDrives + acceptedTestDrives} />
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Pending and approved drive requests
              </p>
            </div>

            <div className="group rounded-3xl border border-amber-400/10 bg-gradient-to-br from-amber-400/10 to-transparent p-4 transition duration-300 hover:border-amber-400/20 hover:bg-amber-400/10">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Payment Monitor
              </p>
              <p className="mt-3 text-3xl font-bold text-amber-300">
                <AnimatedNumber value={paidPayments + pendingPayments} />
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Successful and in-progress token payments
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Paid
              </p>
              <p className="mt-2 text-xl font-bold text-emerald-300">
                <AnimatedNumber value={paidPayments} />
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Pending
              </p>
              <p className="mt-2 text-xl font-bold text-amber-300">
                <AnimatedNumber value={pendingPayments} />
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Failed
              </p>
              <p className="mt-2 text-xl font-bold text-red-300">
                <AnimatedNumber value={failedPayments} />
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-[30px] border border-white/10 bg-[#111827] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          style={{ animation: "fadeUp 0.6s ease 0.5s both" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Platform Trend
          </p>
          <h2 className="mt-2 text-2xl font-bold">Live Volume Distribution</h2>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityTrend}>
                <defs>
                  <linearGradient id="trendStroke" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  fill="url(#trendStroke)"
                  animationDuration={1400}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div
          className="rounded-[30px] border border-white/10 bg-[#111827] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          style={{ animation: "fadeUp 0.6s ease 0.55s both" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Recent Cars
          </p>
          <h2 className="mt-2 text-2xl font-bold">Latest Listings</h2>

          <div className="mt-6 space-y-3">
            {recentCars.length > 0 ? (
              recentCars.map((car, index) => (
                <div
                  key={car._id}
                  className="flex items-center justify-between rounded-2xl bg-[#0f172a] p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-[#132033]"
                  style={{ animation: `fadeUp 0.4s ease ${0.6 + index * 0.08}s both` }}
                >
                  <div>
                    <p className="font-semibold text-white">
                      {car.brand} {car.model}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {car.year} • {car.fuelType}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-cyan-300">
                    ₹{Number(car.price || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No recent cars found.</p>
            )}
          </div>
        </div>

        <div
          className="rounded-[30px] border border-white/10 bg-[#111827] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          style={{ animation: "fadeUp 0.6s ease 0.6s both" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
            Recent Test Drives
          </p>
          <h2 className="mt-2 text-2xl font-bold">Booking Activity</h2>

          <div className="mt-6 space-y-3">
            {recentTestDrives.length > 0 ? (
              recentTestDrives.map((item, index) => (
                <div
                  key={item._id}
                  className="rounded-2xl bg-[#0f172a] p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-[#132033]"
                  style={{ animation: `fadeUp 0.4s ease ${0.65 + index * 0.08}s both` }}
                >
                  <p className="font-semibold text-white">
                    {item.carId?.brand || "Car"} {item.carId?.model || ""}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {item.buyerId?.firstName || "Buyer"} requested on {item.requestedDate} at {item.requestedTime}
                  </p>
                  <p className="mt-2 text-sm font-medium capitalize text-emerald-300">
                    {item.status}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No recent test drives found.</p>
            )}
          </div>
        </div>

        <div
          className="rounded-[30px] border border-white/10 bg-[#111827] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          style={{ animation: "fadeUp 0.6s ease 0.65s both" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
            Recent Inspections
          </p>
          <h2 className="mt-2 text-2xl font-bold">Inspection Activity</h2>

          <div className="mt-6 space-y-3">
            {recentInspections.length > 0 ? (
              recentInspections.map((item, index) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-2xl bg-[#0f172a] p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-[#132033]"
                  style={{ animation: `fadeUp 0.4s ease ${0.7 + index * 0.08}s both` }}
                >
                  <div>
                    <p className="font-semibold text-white">
                      {item.carId?.brand || "Car"} {item.carId?.model || ""}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Inspection completed
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-amber-300">
                    ⭐ {item.rating || 0}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No recent inspections found.</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
