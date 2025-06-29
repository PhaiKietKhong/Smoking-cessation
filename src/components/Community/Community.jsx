"use client";

import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function Community() {
  const [rankingData] = useState([
    {
      label: "1 ngày không thuốc",
      value: "2,847",
      desc: "người đạt được",
      color: "bg-green-500",
    },
    {
      label: "1 tuần không thuốc",
      value: "1,234",
      desc: "người đạt được",
      color: "bg-blue-500",
    },
    {
      label: "1 tháng không thuốc",
      value: "567",
      desc: "người đạt được",
      color: "bg-purple-500",
    },
    {
      label: "Tiết kiệm 1 triệu",
      value: "890",
      desc: "người đạt được",
      color: "bg-yellow-500",
    },
  ]);

  return (
    <div className="bg-slate-50 min-h-screen py-12 mt-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-black text-center mb-2 text-primary">
          Bảng xếp hạng thành tích
        </h1>
        <p className="text-xl text-gray-500 text-center mb-12">
          Những thành tích nổi bật của cộng đồng QuitSmart
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {rankingData.map((item) => (
            <Card
              key={item.label}
              className="shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-8 text-center min-h-[220px] flex flex-col items-center justify-center">
                <div
                  className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}
                >
                  <Trophy className="text-white w-8 h-8" />
                </div>

                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  {item.label}
                </h3>

                <div className="text-4xl font-black text-gray-900 mb-1">
                  {item.value}
                </div>

                <p className="text-gray-500 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
