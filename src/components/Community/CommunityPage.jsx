"use client";

import { useState } from "react";
import {
  Trophy,
  MessageSquare,
  Calendar,
  Heart,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function CommunityPage() {
  const [_, setActiveTab] = useState("feed");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Cộng Đồng QuitSmart
          </h1>
          <p className="text-xl text-white text-center opacity-90 max-w-2xl mx-auto">
            Kết nối, chia sẻ và hỗ trợ nhau trên hành trình bỏ thuốc lá của bạn
          </p>
          <div className="flex justify-center mt-8">
            <Button className="bg-white text-teal-600 hover:bg-gray-100 mr-4">
              Tham gia ngay
            </Button>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Tabs
          defaultValue="feed"
          className="mb-12"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="feed">Bài Đăng</TabsTrigger>
            <TabsTrigger value="achievements">Thành Tích</TabsTrigger>
            <TabsTrigger value="members">Thành Viên</TabsTrigger>
            <TabsTrigger value="events">Sự Kiện</TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Create Post */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage src="/placeholder.svg?height=36&width=36" />
                        <AvatarFallback>TN</AvatarFallback>
                      </Avatar>
                      <div className="w-full bg-gray-100 rounded-full px-4 py-2 text-gray-500">
                        Chia sẻ trải nghiệm của bạn...
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Bài viết
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Sự kiện
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Trophy className="h-4 w-4 mr-2" />
                      Thành tích
                    </Button>
                  </CardFooter>
                </Card>

                {/* Posts */}
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage
                              src={post.author.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {post.author.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {post.author.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {post.time}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="mb-4">{post.content}</p>
                      {post.image && (
                        <div className="rounded-md overflow-hidden mb-4">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                      {post.achievement && (
                        <div className="bg-green-50 border border-green-100 rounded-md p-4 flex items-center">
                          <div className="bg-green-500 p-2 rounded-full mr-3">
                            <Trophy className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-green-800">
                              {post.achievement.title}
                            </div>
                            <div className="text-sm text-green-600">
                              {post.achievement.description}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center mt-4 text-sm text-gray-500">
                        <div className="flex items-center mr-4">
                          <Heart className="h-4 w-4 mr-1" />
                          <span>{post.likes}</span>
                        </div>
                        <div>
                          <span>{post.comments} bình luận</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3 flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Thích
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Bình luận
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Chia sẻ
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Community Stats */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">
                      Thống kê cộng đồng
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thành viên</span>
                      <span className="font-medium">12,458</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bài đăng hôm nay</span>
                      <span className="font-medium">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thành tích mới</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày không thuốc</span>
                      <span className="font-medium">45,267</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Members */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">
                      Thành viên tích cực
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeMembers.map((member) => (
                      <div key={member.id} className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage
                            src={member.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {member.streak} ngày không thuốc
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="ml-2 bg-green-50 text-green-700 border-green-200"
                        >
                          {member.level}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      Xem tất cả
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Sự kiện sắp tới</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.date}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {event.participants} người tham gia
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      Xem tất cả
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Thành tích cộng đồng</h2>
              <p className="text-gray-600 mb-6">
                Cùng nhau, chúng ta đã đạt được những thành tích đáng kinh ngạc
                trong hành trình bỏ thuốc lá
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((item) => (
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

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">
                Thành tích cá nhân nổi bật
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalAchievements.map((achievement) => (
                  <Card key={achievement.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={achievement.user.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {achievement.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {achievement.user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {achievement.date}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="bg-green-50 border border-green-100 rounded-md p-4 flex items-center">
                        <div
                          className={`${achievement.color} p-2 rounded-full mr-3`}
                        >
                          <Trophy className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-green-800">
                            {achievement.title}
                          </div>
                          <div className="text-sm text-green-600">
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4">{achievement.message}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-3 flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Chúc mừng
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Bình luận
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Thành viên cộng đồng</h2>
              <p className="text-gray-600 mb-6">
                Kết nối với những người cùng chí hướng trong hành trình bỏ thuốc
                lá
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                <Card key={member.id} className="overflow-hidden pt-0">
                  <div className="h-24 bg-gradient-to-r from-teal-500 to-green-500"></div>
                  <CardContent className="pt-0">
                    <div className="flex flex-col items-center -mt-12">
                      <Avatar className="h-24 w-24 border-4 border-white">
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg mt-2">{member.name}</h3>
                      <div className="text-sm text-gray-500 mb-2">
                        {member.streak} ngày không thuốc
                      </div>
                      <Badge className={`${member.badgeColor} mb-4`}>
                        {member.level}
                      </Badge>
                      <p className="text-sm text-center text-gray-600 mb-4">
                        {member.bio}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Kết nối
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Sự kiện cộng đồng</h2>
              <p className="text-gray-600 mb-6">
                Tham gia các sự kiện và thách thức để duy trì động lực trên hành
                trình bỏ thuốc lá
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventsDetailed.map((event) => (
                <Card key={event.id} className="overflow-hidden pt-0">
                  {event.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-xl">{event.title}</h3>
                      <Badge className={event.badgeColor}>{event.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-3">
                        {[1, 2, 3].map((i) => (
                          <Avatar
                            key={i}
                            className="h-6 w-6 border-2 border-white"
                          >
                            <AvatarImage
                              src={`https://placehold.co/24x24?index=${i}`}
                            />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {event.participants} người tham gia
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <Button className="w-full">Tham gia ngay</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Sample data
const posts = [
  {
    id: 1,
    author: {
      name: "Nguyễn Văn A",
      avatar: "https://placehold.co/40x40",
      initials: "NA",
    },
    time: "2 giờ trước",
    content:
      "Hôm nay là ngày thứ 30 không hút thuốc! Cảm ơn mọi người đã luôn động viên và hỗ trợ tôi trong suốt hành trình này. Tôi cảm thấy sức khỏe đã cải thiện rất nhiều.",
    image: "https://placehold.co/600x400",
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    author: {
      name: "Trần Thị B",
      avatar: "https://placehold.co/40x40",
      initials: "TB",
    },
    time: "5 giờ trước",
    content:
      "Mọi người có mẹo nào để vượt qua cơn thèm thuốc không? Tôi đang gặp khó khăn vào buổi sáng sau khi uống cà phê.",
    likes: 15,
    comments: 12,
  },
  {
    id: 3,
    author: {
      name: "Lê Văn C",
      avatar: "https://placehold.co/40x40",
      initials: "LC",
    },
    time: "Hôm qua",
    content:
      "Vừa đạt được thành tích 1 tuần không hút thuốc! Cảm thấy tự hào về bản thân quá!",
    achievement: {
      title: "1 tuần không thuốc",
      description: "Đã vượt qua 7 ngày liên tiếp không hút thuốc",
    },
    likes: 42,
    comments: 8,
  },
];

const activeMembers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://placehold.co/32x32",
    initials: "NA",
    streak: 30,
    level: "Bạc",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "https://placehold.co/32x32",
    initials: "TB",
    streak: 45,
    level: "Vàng",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://placehold.co/32x32",
    initials: "LC",
    streak: 15,
    level: "Đồng",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    avatar: "https://placehold.co/32x32",
    initials: "PD",
    streak: 60,
    level: "Bạch kim",
  },
];

const events = [
  {
    id: 1,
    title: "Thách thức 30 ngày không thuốc",
    date: "Bắt đầu 15/06/2025",
    participants: 156,
  },
  {
    id: 2,
    title: "Hội thảo trực tuyến: Vượt qua cơn thèm thuốc",
    date: "10/06/2025, 19:30",
    participants: 89,
  },
  {
    id: 3,
    title: "Gặp mặt cộng đồng QuitSmart Hà Nội",
    date: "20/06/2025, 18:00",
    participants: 42,
  },
];

const achievements = [
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
];

const personalAchievements = [
  {
    id: 1,
    user: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg?height=40&width=40&index=1",
      initials: "NA",
    },
    date: "Hôm nay",
    title: "100 ngày không thuốc",
    description: "Đã vượt qua 100 ngày liên tiếp không hút thuốc",
    message:
      "Thật không thể tin được tôi đã đi được đến đây! Cảm ơn cộng đồng vì sự hỗ trợ tuyệt vời.",
    color: "bg-purple-500",
  },
  {
    id: 2,
    user: {
      name: "Trần Thị B",
      avatar: "/placeholder.svg?height=40&width=40&index=2",
      initials: "TB",
    },
    date: "Hôm qua",
    title: "Tiết kiệm 5 triệu",
    description: "Đã tiết kiệm được 5 triệu đồng từ việc bỏ thuốc lá",
    message:
      "Số tiền này tôi sẽ dùng để đi du lịch với gia đình. Thật tuyệt vời khi thấy những lợi ích cụ thể từ việc bỏ thuốc!",
    color: "bg-yellow-500",
  },
];

const members = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=96&width=96&index=1",
    initials: "NA",
    streak: 30,
    level: "Bạc",
    badgeColor: "bg-gray-200 text-gray-700",
    bio: "Đang trong hành trình bỏ thuốc lá để có sức khỏe tốt hơn cho gia đình.",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/placeholder.svg?height=96&width=96&index=2",
    initials: "TB",
    streak: 45,
    level: "Vàng",
    badgeColor: "bg-yellow-100 text-yellow-800",
    bio: "Huấn luyện viên thể dục, đã bỏ thuốc lá được 45 ngày và cảm thấy tuyệt vời!",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "/placeholder.svg?height=96&width=96&index=3",
    initials: "LC",
    streak: 15,
    level: "Đồng",
    badgeColor: "bg-amber-100 text-amber-800",
    bio: "Mới bắt đầu hành trình, quyết tâm bỏ thuốc vì sức khỏe bản thân.",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    avatar: "/placeholder.svg?height=96&width=96&index=4",
    initials: "PD",
    streak: 60,
    level: "Bạch kim",
    badgeColor: "bg-cyan-100 text-cyan-800",
    bio: "Đã bỏ thuốc lá được 2 tháng, sức khỏe cải thiện rõ rệt.",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    avatar: "/placeholder.svg?height=96&width=96&index=5",
    initials: "HE",
    streak: 90,
    level: "Kim cương",
    badgeColor: "bg-blue-100 text-blue-800",
    bio: "Cố vấn cộng đồng, đã bỏ thuốc lá được 3 năm và giúp đỡ người khác.",
  },
  {
    id: 6,
    name: "Vũ Thị F",
    avatar: "/placeholder.svg?height=96&width=96&index=6",
    initials: "VF",
    streak: 7,
    level: "Đồng",
    badgeColor: "bg-amber-100 text-amber-800",
    bio: "Mới bắt đầu hành trình, quyết tâm cao để bỏ thuốc lá.",
  },
  {
    id: 7,
    name: "Đặng Văn G",
    avatar: "/placeholder.svg?height=96&width=96&index=7",
    initials: "DG",
    streak: 120,
    level: "Kim cương",
    badgeColor: "bg-blue-100 text-blue-800",
    bio: "Bác sĩ, chia sẻ kiến thức y tế về lợi ích của việc bỏ thuốc lá.",
  },
  {
    id: 8,
    name: "Mai Thị H",
    avatar: "/placeholder.svg?height=96&width=96&index=8",
    initials: "MH",
    streak: 21,
    level: "Bạc",
    badgeColor: "bg-gray-200 text-gray-700",
    bio: "Giáo viên, bỏ thuốc lá để làm gương cho học sinh.",
  },
];

const eventsDetailed = [
  {
    id: 1,
    title: "Thách thức 30 ngày không thuốc",
    type: "Thách thức",
    badgeColor: "bg-green-100 text-green-800",
    date: "15/06/2025 - 15/07/2025",
    description:
      "Tham gia thách thức 30 ngày không hút thuốc cùng cộng đồng. Nhận hỗ trợ hàng ngày và phần thưởng khi hoàn thành.",
    participants: 156,
    image: "https://placehold.co/600x200?text=30-Day+Challenge",
  },
  {
    id: 2,
    title: "Hội thảo trực tuyến: Vượt qua cơn thèm thuốc",
    type: "Hội thảo",
    badgeColor: "bg-blue-100 text-blue-800",
    date: "10/06/2025, 19:30 - 21:00",
    description:
      "Bác sĩ Nguyễn Văn X sẽ chia sẻ các phương pháp khoa học để vượt qua cơn thèm thuốc và duy trì động lực.",
    participants: 89,
    image: "https://placehold.co/600x200?text=Online+Workshop",
  },
  {
    id: 3,
    title: "Gặp mặt cộng đồng QuitSmart Hà Nội",
    type: "Offline",
    badgeColor: "bg-purple-100 text-purple-800",
    date: "20/06/2025, 18:00 - 20:00",
    description:
      "Gặp gỡ trực tiếp các thành viên cộng đồng QuitSmart tại Hà Nội. Chia sẻ kinh nghiệm và kết nối với những người cùng chí hướng.",
    participants: 42,
    image: "https://placehold.co/600x200?text=Community+Meetup",
  },
  {
    id: 4,
    title: "Thử thách tiết kiệm: Từ thuốc lá đến du lịch",
    type: "Thách thức",
    badgeColor: "bg-green-100 text-green-800",
    date: "01/07/2025 - 30/09/2025",
    description:
      "Tiết kiệm số tiền bạn thường chi cho thuốc lá và theo dõi khoản tiết kiệm của bạn. Mục tiêu: Đủ tiền cho một kỳ nghỉ ngắn!",
    participants: 78,
    image: "https://placehold.co/600x200?text=Saving+Challenge",
  },
];
