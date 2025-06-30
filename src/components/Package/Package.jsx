"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Star, MessageCircle, Calendar, Users, FileText, Home, Crown, Sparkles, Zap } from "lucide-react"

export function PricingPage() {
    const basicFeatures = [
        {
            icon: <Home className="w-5 h-5" />,
            text: "Xem trang chủ",
            included: true,
        },
        {
            icon: <FileText className="w-5 h-5" />,
            text: "Tạo kế hoạch cai thuốc cá nhân",
            included: true,
        },
        {
            icon: <Users className="w-5 h-5" />,
            text: "Hỗ trợ với coach chuyên nghiệp",
            included: false,
        },
        {
            icon: <MessageCircle className="w-5 h-5" />,
            text: "Chat trực tiếp với coach",
            included: false,
        },
        {
            icon: <Calendar className="w-5 h-5" />,
            text: "Đặt lịch meeting với coach",
            included: false,
        },
        {
            icon: <Star className="w-5 h-5" />,
            text: "Tư vấn cá nhân hóa",
            included: false,
        },
    ]

    const premiumFeatures = [
        {
            icon: <Home className="w-5 h-5" />,
            text: "Xem trang chủ",
            included: true,
        },
        {
            icon: <FileText className="w-5 h-5" />,
            text: "Tạo kế hoạch cai thuốc cá nhân",
            included: true,
        },
        {
            icon: <Users className="w-5 h-5" />,
            text: "Hỗ trợ với coach chuyên nghiệp",
            included: true,
        },
        {
            icon: <MessageCircle className="w-5 h-5" />,
            text: "Chat trực tiếp với coach",
            included: true,
        },
        {
            icon: <Calendar className="w-5 h-5" />,
            text: "Đặt lịch meeting với coach",
            included: true,
        },
        {
            icon: <Star className="w-5 h-5" />,
            text: "Tư vấn cá nhân hóa",
            included: true,
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl py-20 px-4">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-indigo-700 mb-6">
                        <Sparkles className="w-4 h-4" />
                        Chọn gói phù hợp với bạn
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-tight">
                        Bắt Đầu Hành Trình
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Cai Thuốc Lá
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Với sự hỗ trợ chuyên nghiệp từ đội ngũ coach giàu kinh nghiệm, bạn sẽ có động lực và phương pháp hiệu quả
                        nhất để thành công
                    </p>
                </div>

                {/* Main Pricing Container */}
                <div className="max-w-6xl mx-auto">
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                        <div className="p-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Chọn Gói Dịch Vụ</h2>
                                <p className="text-gray-600 text-lg">So sánh và lựa chọn gói phù hợp với nhu cầu của bạn</p>
                            </div>

                            {/* Pricing Cards Inside Container */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Basic Package */}
                                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 group">
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <FileText className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Gói Basic</h3>
                                        <p className="text-gray-600">Khởi đầu hoàn hảo cho hành trình của bạn</p>
                                        <div className="mt-6">
                                            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                Miễn phí
                                            </span>
                                            <p className="text-gray-500 mt-2">Sử dụng vĩnh viễn</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        {basicFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div
                                                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${feature.included
                                                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                                                        : "bg-gray-200 text-gray-400"
                                                        }`}
                                                >
                                                    {feature.included ? <Check className="w-4 h-4" /> : feature.icon}
                                                </div>
                                                <span className={`font-medium ${feature.included ? "text-gray-900" : "text-gray-400"}`}>
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl">
                                        <Zap className="w-4 h-4 mr-2" />
                                        Bắt Đầu Ngay
                                    </Button>
                                </div>

                                {/* Premium Package */}
                                <div className="relative bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 rounded-2xl p-8 text-white group overflow-hidden">
                                    {/* Animated background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-indigo-400/20 to-blue-400/20 animate-pulse"></div>

                                    <div className="relative z-10">
                                        <div className="text-center mb-8">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <Crown className="w-8 h-8 text-yellow-300" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2">Gói Premium</h3>
                                            <p className="text-purple-100">Trải nghiệm cao cấp với hỗ trợ toàn diện</p>
                                            <div className="mt-6">
                                                <span className="text-4xl font-bold">299,000₫</span>
                                                <span className="text-purple-200 ml-2">/tháng</span>
                                                <p className="text-purple-200 mt-2">Hoặc 2,990,000₫/năm (tiết kiệm 17%)</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            {premiumFeatures.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                                        <Check className="w-4 h-4 text-yellow-300" />
                                                    </div>
                                                    <span className="font-medium">{feature.text}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button className="w-full h-12 bg-white text-purple-600 hover:bg-gray-50 font-semibold rounded-xl">
                                            <Crown className="w-4 h-4 mr-2" />
                                            Nâng Cấp Premium
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-white/20 shadow-xl">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Chưa chắc chắn gói nào phù hợp?</h3>
                        <p className="text-gray-600 mb-8 text-lg">
                            Bắt đầu với gói Basic miễn phí và nâng cấp bất cứ lúc nào. Không có ràng buộc, không có phí ẩn!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-gray-700 border-2 border-gray-300 hover:bg-gray-50 bg-white/80 backdrop-blur-sm rounded-xl px-8 py-4 font-semibold"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                So Sánh Chi Tiết
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-gray-700 border-2 border-gray-300 hover:bg-gray-50 bg-white/80 backdrop-blur-sm rounded-xl px-8 py-4 font-semibold"
                            >
                                <Users className="w-5 h-5 mr-2" />
                                Liên Hệ Tư Vấn
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PricingPage