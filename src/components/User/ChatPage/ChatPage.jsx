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

  const posts = [
    {
      postId: 3,
      accountId: 1,
      title: "chia sẻ bí quyết",
      content: ".........",
      category: "chia sẻ",
      status: "Published",
      viewCount: 0,
      createdAt: "2025-06-27T04:02:48.8007885",
      updatedAt: "2025-06-27T04:02:48.8007886",
      authorName: "k123",
      authorUsername: "k123",
      likesCount: 0,
      commentsCount: 0,
      isLikedByCurrentUser: false,
    },
    {
      postId: 2,
      accountId: 1,
      title: "test",
      content: "qqqqqq",
      category: "string",
      status: "Published",
      viewCount: 0,
      createdAt: "2025-06-27T03:09:37.66547",
      updatedAt: "2025-06-27T03:09:37.66547",
      authorName: "k123",
      authorUsername: "k123",
      likesCount: 0,
      commentsCount: 0,
      isLikedByCurrentUser: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Tabs
          defaultValue="feed"
          className="mb-12"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-1 mb-8">
            <TabsTrigger value="feed">Bài Đăng</TabsTrigger>
          </TabsList>

          <TabsContent value="feed">
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.postId} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {post.authorName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{post.authorName}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleString("vi-VN")}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <h2 className="font-semibold text-lg mb-1">{post.title}</h2>
                    <p className="mb-4">{post.content}</p>
                    <div className="text-sm text-gray-500">
                      Chủ đề:{" "}
                      <span className="font-medium text-gray-700">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{post.likesCount}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{post.commentsCount} bình luận</span>
                      </div>
                      <div className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>{post.viewCount} lượt xem</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Heart className="h-4 w-4 mr-2" />
                      Thích
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Bình luận
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Share2 className="h-4 w-4 mr-2" />
                      Chia sẻ
                    </Button>
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
