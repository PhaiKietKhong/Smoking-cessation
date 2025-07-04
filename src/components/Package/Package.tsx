"use client"

import { Check, MessageCircle, Calendar, Users, FileText, Home, Crown, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const basicFeatures = [
    { icon: <Home className="w-5 h-5" />, text: "Xem trang chủ", included: true },
    { icon: <FileText className="w-5 h-5" />, text: "Tạo kế hoạch cai thuốc cá nhân", included: true },
    { icon: <Users className="w-5 h-5" />, text: "Hỗ trợ với coach chuyên nghiệp", included: false },
    { icon: <MessageCircle className="w-5 h-5" />, text: "Chat trực tiếp với coach", included: false },
    { icon: <Calendar className="w-5 h-5" />, text: "Đặt lịch meeting với coach", included: false },
    { icon: <Star className="w-5 h-5" />, text: "Tư vấn cá nhân hóa", included: false },
]

const premiumFeatures = basicFeatures.map(f => ({ ...f, included: true }))

export default function PricingPage() {
    return (
        <div className="h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
            <div className="bg-white/90 rounded-3xl shadow-xl p-10 max-w-6xl w-full">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Chọn Gói Dịch Vụ</h2>
                    <p className="text-gray-600">So sánh và lựa chọn gói phù hợp với nhu cầu của bạn</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic */}
                    <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
                        <div className="text-center mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Gói Basic</h3>
                            <p className="text-sm text-gray-500">Khởi đầu hoàn hảo cho hành trình của bạn</p>
                            <div className="mt-4">
                                <div className="text-3xl font-bold text-green-600">Miễn phí</div>
                                <p className="text-sm text-gray-400">Sử dụng vĩnh viễn</p>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            {basicFeatures.map((f, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${f.included ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"}`}>
                                        {f.included ? <Check className="w-4 h-4" /> : f.icon}
                                    </div>
                                    <span className={`text-sm font-medium ${f.included ? "text-gray-900" : "text-gray-400"}`}>{f.text}</span>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 active:scale-95">
                            <Zap className="w-4 h-4 mr-2" /> Bắt Đầu Ngay
                        </Button>
                    </div>

                    {/* Premium */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 relative overflow-hidden">
                        <div className="text-center mb-6">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Crown className="w-7 h-7 text-yellow-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Gói Premium</h3>
                            <p className="text-sm text-green-100">Trải nghiệm cao cấp với hỗ trợ toàn diện</p>
                            <div className="mt-4">
                                <div className="text-3xl font-bold">299,000₫ <span className="text-sm font-normal">/tháng</span></div>
                                <p className="text-sm text-green-100">Hoặc 2,990,000₫/năm (tiết kiệm 17%)</p>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            {premiumFeatures.map((f, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Check className="w-4 h-4 text-yellow-300" />
                                    </div>
                                    <span className="text-sm font-medium">{f.text}</span>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full bg-white text-green-700 hover:bg-gray-100 font-semibold rounded-xl transition-all duration-300 active:scale-95">
                            <Crown className="w-4 h-4 mr-2" /> Nâng Cấp Premium
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )

