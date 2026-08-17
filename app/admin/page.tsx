"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Building2, MessageSquare, CheckCircle, Star, Plus, Eye } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalListings: 0,
    activeInquiries: 0,
    soldListings: 0,
    featuredListings: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [listingsRes, inquiriesRes] = await Promise.all([
          fetch("/api/listings"),
          fetch("/api/inquiries"),
        ]);

        const listingsData = await listingsRes.json();
        const inquiriesData = await inquiriesRes.json();

        if (listingsData.success) {
          const docs = listingsData.data;
          setStats((prev) => ({
            ...prev,
            totalListings: docs.length,
            featuredListings: docs.filter((d: any) => d.featured).length,
            soldListings: docs.filter((d: any) => d.status === "sold").length,
          }));
        }

        if (inquiriesData.success) {
          const inqDocs = inquiriesData.data;
          setStats((prev) => ({
            ...prev,
            activeInquiries: inqDocs.filter((i: any) => i.status === "new").length,
          }));
          setRecentInquiries(inqDocs.slice(0, 5));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-dim">
        <div>
          <span className="font-mono-custom text-xs text-gold tracking-widest block mb-1">
            EXECUTIVE OVERVIEW
          </span>
          <h1 className="font-fraunces text-3xl font-semibold text-stone-900">
            Admin Dashboard
          </h1>
        </div>
        <Link href="/admin/listings/new">
          <MagneticButton variant="primary" size="md">
            <Plus className="w-4 h-4 mr-1" />
            Add New Listing
          </MagneticButton>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-sand-dim">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono-custom text-stone-500">TOTAL LISTINGS</span>
            <div className="w-10 h-10 rounded-xl bg-clay/10 text-clay flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <span className="font-mono-custom font-bold text-4xl text-stone-900 block">
            {loading ? "..." : stats.totalListings}
          </span>
        </div>

        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-sand-dim">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono-custom text-stone-500">ACTIVE INQUIRIES</span>
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <span className="font-mono-custom font-bold text-4xl text-gold block">
            {loading ? "..." : stats.activeInquiries}
          </span>
        </div>

        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-sand-dim">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono-custom text-stone-500">PROPERTIES SOLD</span>
            <div className="w-10 h-10 rounded-xl bg-sage/15 text-sage flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <span className="font-mono-custom font-bold text-4xl text-sage block">
            {loading ? "..." : stats.soldListings}
          </span>
        </div>

        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-sand-dim">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono-custom text-stone-500">FEATURED PLOTS</span>
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-gold flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <span className="font-mono-custom font-bold text-4xl text-stone-900 block">
            {loading ? "..." : stats.featuredListings}
          </span>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-[20px] p-6 sm:p-8 shadow-sm border border-sand-dim">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-sand-dim">
          <h3 className="font-fraunces text-xl font-semibold text-stone-900">
            Recent Client Inquiries
          </h3>
          <Link href="/admin/inquiries" className="text-xs font-mono-custom text-clay hover:underline">
            View All Inquiries →
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-stone-400 font-mono-custom text-xs">
            Loading inquiries...
          </div>
        ) : recentInquiries.length === 0 ? (
          <div className="py-8 text-center text-stone-400 font-mono-custom text-xs">
            No inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sand-dim text-[11px] font-mono-custom text-stone-500">
                  <th className="pb-3 font-medium">NAME</th>
                  <th className="pb-3 font-medium">PHONE</th>
                  <th className="pb-3 font-medium">EMAIL</th>
                  <th className="pb-3 font-medium">STATUS</th>
                  <th className="pb-3 font-medium text-right">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-dim">
                {recentInquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-sand/40 transition-colors">
                    <td className="py-4 font-semibold text-stone-900">{inq.name}</td>
                    <td className="py-4 font-mono-custom text-xs text-stone-600">{inq.phone}</td>
                    <td className="py-4 text-xs text-stone-500">{inq.email}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono-custom ${
                        inq.status === "new" ? "bg-gold/20 text-gold font-bold" : "bg-sage/20 text-sage"
                      }`}>
                        {inq.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 text-xs font-mono-custom text-stone-400 text-right">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
