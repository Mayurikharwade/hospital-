"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Star, 
  StarHalf, 
  Search,
  Filter,
  Download,
  Reply,
  Sparkles,
  Quote,
  Smile,
  Meh,
  CheckCircle,
  Trash2,
  ThumbsUp,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  Award,
  BarChart3,
  Eye,
  Send,
  X
} from "lucide-react";

// Default Reviews Data
const DEFAULT_REVIEWS = [
  {
    id: "rev_1",
    patientName: "Aarav Sharma",
    patientAvatar: "AS",
    patientImage: null,
    rating: 5,
    title: "Excellent doctor! Very caring",
    comment: "Dr. Mehta is extremely knowledgeable and patient. He listened to all my concerns and explained everything clearly. The treatment worked wonders. Highly recommended!",
    date: "2026-05-20",
    service: "Consultation",
    verified: true,
    replies: [{ id: "rep1", doctorReply: "Thank you Aarav! Glad to see you recovering well. Stay healthy! 👍", date: "2026-05-21" }],
    helpful: 24,
    likedByUser: false,
    sentiment: "positive"
  },
  {
    id: "rev_2",
    patientName: "Neha Verma",
    patientAvatar: "NV",
    patientImage: null,
    rating: 4.5,
    title: "Good experience, friendly staff",
    comment: "The doctor was very professional and the staff was courteous. Appointment was on time. Only downside is the waiting area could be better.",
    date: "2026-05-18",
    service: "Follow-up",
    verified: true,
    replies: [],
    helpful: 12,
    likedByUser: false,
    sentiment: "positive"
  },
  {
    id: "rev_3",
    patientName: "Rahul Gupta",
    patientAvatar: "RG",
    patientImage: null,
    rating: 5,
    title: "Best cardiologist in town",
    comment: "I had been to many doctors but Dr. Mehta's diagnosis was spot on. Got my father treated for angina. Excellent follow-up support.",
    date: "2026-05-15",
    service: "Surgery Follow-up",
    verified: true,
    replies: [{ id: "rep2", doctorReply: "Thank you Rahul. Wishing your father a speedy recovery. Take care!" , date: "2026-05-16" }],
    helpful: 41,
    likedByUser: false,
    sentiment: "positive"
  },
  {
    id: "rev_4",
    patientName: "Sneha Patel",
    patientAvatar: "SP",
    patientImage: null,
    rating: 3,
    title: "Average consultation, rushed",
    comment: "Doctor seemed to be in a hurry. Didn't get to ask all questions. The prescription was okay but felt a bit rushed.",
    date: "2026-05-10",
    service: "Consultation",
    verified: true,
    replies: [{ id: "rep3", doctorReply: "I apologize for the experience. We're improving our scheduling. Please feel free to book a longer session next time." , date: "2026-05-12" }],
    helpful: 6,
    likedByUser: false,
    sentiment: "neutral"
  },
  {
    id: "rev_5",
    patientName: "Vikram Singh",
    patientAvatar: "VS",
    patientImage: null,
    rating: 5,
    title: "Life-saving treatment!",
    comment: "Came with severe breathing issues. Doctor identified the problem immediately and provided emergency care. I'm forever grateful.",
    date: "2026-05-05",
    service: "Emergency",
    verified: true,
    replies: [],
    helpful: 57,
    likedByUser: false,
    sentiment: "positive"
  },
  {
    id: "rev_6",
    patientName: "Anjali Nair",
    patientAvatar: "AN",
    patientImage: null,
    rating: 4,
    title: "Very knowledgeable & humble",
    comment: "Explained the condition in simple words. The prescribed medication helped a lot. Would definitely recommend.",
    date: "2026-04-28",
    service: "Consultation",
    verified: true,
    replies: [],
    helpful: 18,
    likedByUser: false,
    sentiment: "positive"
  },
  {
    id: "rev_7",
    patientName: "Rajesh Khanna",
    patientAvatar: "RK",
    patientImage: null,
    rating: 2.5,
    title: "Long waiting time",
    comment: "Had to wait over 1 hour even with appointment. The consultation itself was fine but not worth the wait.",
    date: "2026-04-20",
    service: "Checkup",
    verified: true,
    replies: [{ id: "rep4", doctorReply: "We apologize for the delay. We've added more slots to reduce waiting time. Your feedback helps us improve." , date: "2026-04-22" }],
    helpful: 9,
    likedByUser: false,
    sentiment: "negative"
  }
];

// Helper functions
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatRelativeDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(dateStr);
};

// Star Rating Component
const StarRating = ({ rating, size = "sm" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <Star key={i} className={`${sizeClass} fill-amber-400 text-amber-400`} />;
        if (i === fullStars && hasHalfStar) return <StarHalf key={i} className={`${sizeClass} fill-amber-400 text-amber-400`} />;
        return <Star key={i} className={`${sizeClass} text-slate-300`} />;
      })}
    </div>
  );
};

// Sentiment Badge Component
const SentimentBadge = ({ sentiment }) => {
  const config = {
    positive: { icon: Smile, text: "Positive", color: "green" },
    neutral: { icon: Meh, text: "Neutral", color: "amber" },
    negative: { icon: MessageSquare, text: "Negative", color: "red" }
  };
  const { icon: Icon, text, color } = config[sentiment] || config.neutral;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-${color}-50 text-${color}-600`}>
      <Icon className="w-2.5 h-2.5" /> {text}
    </span>
  );
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [replyText, setReplyText] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  
  // Load reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("doctor_reviews_data");
    if (stored) {
      setReviews(JSON.parse(stored));
    } else {
      setReviews(DEFAULT_REVIEWS);
      localStorage.setItem("doctor_reviews_data", JSON.stringify(DEFAULT_REVIEWS));
    }
  }, []);
  
  // Save to localStorage
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem("doctor_reviews_data", JSON.stringify(reviews));
    }
  }, [reviews]);
  
  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setRatingFilter("all");
    setServiceFilter("all");
    setSentimentFilter("all");
    setSortBy("newest");
    showNotification("All filters reset");
  };
  
  // Like / helpful toggle
  const handleHelpful = (id) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        const newLiked = !rev.likedByUser;
        return {
          ...rev,
          helpful: newLiked ? rev.helpful + 1 : rev.helpful - 1,
          likedByUser: newLiked
        };
      }
      return rev;
    }));
    showNotification("Thanks for your feedback!");
  };
  
  // Add reply
  const handleReply = (reviewId, replyTextValue) => {
    if (!replyTextValue?.trim()) {
      showNotification("Please enter a reply message");
      return;
    }
    setReviews(prev => prev.map(rev => {
      if (rev.id === reviewId) {
        const newReply = {
          id: `rep_${Date.now()}`,
          doctorReply: replyTextValue,
          date: new Date().toISOString().split('T')[0]
        };
        const updatedReplies = rev.replies ? [...rev.replies, newReply] : [newReply];
        return { ...rev, replies: updatedReplies };
      }
      return rev;
    }));
    setReplyText(prev => ({ ...prev, [reviewId]: "" }));
    setShowReplyModal(false);
    setSelectedReview(null);
    showNotification("Reply posted successfully!");
  };
  
  // Delete review
  const handleDeleteReview = (id) => {
    if (window.confirm("Delete this review permanently?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
      showNotification("Review removed");
    }
  };
  
  // Filter + Search logic
  const filteredReviews = useMemo(() => {
    let filtered = [...reviews];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r => 
        r.patientName.toLowerCase().includes(term) || 
        r.title.toLowerCase().includes(term) ||
        r.comment.toLowerCase().includes(term)
      );
    }
    if (ratingFilter !== "all") {
      const min = parseInt(ratingFilter);
      filtered = filtered.filter(r => Math.floor(r.rating) === min);
    }
    if (serviceFilter !== "all") {
      filtered = filtered.filter(r => r.service === serviceFilter);
    }
    if (sentimentFilter !== "all") {
      filtered = filtered.filter(r => r.sentiment === sentimentFilter);
    }
    // Sorting
    if (sortBy === "newest") filtered.sort((a,b) => new Date(b.date) - new Date(a.date));
    if (sortBy === "oldest") filtered.sort((a,b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "highest") filtered.sort((a,b) => b.rating - a.rating);
    if (sortBy === "lowest") filtered.sort((a,b) => a.rating - b.rating);
    if (sortBy === "helpful") filtered.sort((a,b) => b.helpful - a.helpful);
    return filtered;
  }, [reviews, searchTerm, ratingFilter, serviceFilter, sentimentFilter, sortBy]);
  
  // Calculate stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : 0;
  const totalHelpful = reviews.reduce((sum, r) => sum + r.helpful, 0);
  const positivePercentage = totalReviews > 0 ? ((reviews.filter(r => r.rating >= 4).length / totalReviews) * 100).toFixed(0) : 0;
  const responseRate = totalReviews > 0 ? ((reviews.filter(r => r.replies?.length > 0).length / totalReviews) * 100).toFixed(0) : 0;
  
  const servicesList = useMemo(() => {
    const services = [...new Set(reviews.map(r => r.service))];
    return ["all", ...services];
  }, [reviews]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-500 text-white px-5 py-2.5 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-[#00A99D]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
              Reviews & Ratings
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-7">Honest feedback from your patients • Build trust & improve care</p>
        </div>

        {/* Stats Cards - Clean like Set Availability */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#013A63]">{avgRating}<span className="text-sm text-slate-400">/5</span></p>
                <p className="text-xs text-slate-500">Average Rating</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              </div>
            </div>
            <div className="mt-2"><StarRating rating={parseFloat(avgRating)} size="sm" /></div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#013A63]">{totalReviews}</p>
                <p className="text-xs text-slate-500">Total Reviews</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#013A63]">{totalHelpful}</p>
                <p className="text-xs text-slate-500">Helpful Votes</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <ThumbsUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#013A63]">{responseRate}%</p>
                <p className="text-xs text-slate-500">Response Rate</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <Reply className="w-4 h-4 text-teal-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar - Modern like Set Availability */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#00A99D]" />
              <h2 className="font-semibold text-[#013A63] text-sm">Filter & Search Reviews</h2>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by patient or keyword..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D]" 
                />
              </div>
              
              <select 
                value={ratingFilter} 
                onChange={(e) => setRatingFilter(e.target.value)} 
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Star ★</option>
                <option value="4">4 Star ★</option>
                <option value="3">3 Star ★</option>
                <option value="2">2 Star ★</option>
                <option value="1">1 Star ★</option>
              </select>
              
              <select 
                value={serviceFilter} 
                onChange={(e) => setServiceFilter(e.target.value)} 
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
              >
                {servicesList.map(s => (
                  <option key={s} value={s}>{s === "all" ? "All Services" : s}</option>
                ))}
              </select>
              
              <select 
                value={sentimentFilter} 
                onChange={(e) => setSentimentFilter(e.target.value)} 
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
              >
                <option value="all">All Sentiment</option>
                <option value="positive">Positive 😊</option>
                <option value="neutral">Neutral 😐</option>
                <option value="negative">Negative 😞</option>
              </select>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
              
              <button 
                onClick={handleResetFilters} 
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition flex items-center gap-2"
              >
                <Filter className="w-3.5 h-3.5" /> Reset
              </button>
              
              <button 
                onClick={() => { 
                  const dataStr = JSON.stringify(reviews, null, 2); 
                  const blob = new Blob([dataStr], {type: "application/json"}); 
                  const url = URL.createObjectURL(blob); 
                  const a = document.createElement("a"); 
                  a.href = url; 
                  a.download = "reviews_export.json"; 
                  a.click(); 
                  URL.revokeObjectURL(url); 
                  showNotification("Exported reviews"); 
                }} 
                className="px-4 py-2 rounded-lg bg-[#00A99D]/10 text-[#00A99D] text-sm font-medium hover:bg-[#00A99D] hover:text-white transition flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Feed */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500">No reviews match the filters. Try adjusting search.</p>
            </div>
          ) : (
            filteredReviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition duration-200">
                <div className="p-5">
                  {/* Review Header */}
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A99D] to-[#013A63] text-white flex items-center justify-center font-semibold text-sm shadow-sm">
                        {review.patientAvatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-800">{review.patientName}</h3>
                          <SentimentBadge sentiment={review.sentiment} />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          <StarRating rating={review.rating} />
                          <span className="text-xs text-slate-400">{formatRelativeDate(review.date)}</span>
                          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">{review.service}</span>
                          {review.verified && (
                            <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleHelpful(review.id)} 
                        className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full transition ${review.likedByUser ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        <ThumbsUp className="w-3 h-3" /> {review.helpful}
                      </button>
                      <button 
                        onClick={() => handleDeleteReview(review.id)} 
                        className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full hover:bg-red-100 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Review Content */}
                  <h4 className="font-semibold text-slate-800 text-base mt-2">“{review.title}”</h4>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">{review.comment}</p>
                  
                  {/* Doctor Replies Section */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="mt-4 bg-teal-50/50 rounded-lg p-3 border-l-4 border-[#00A99D]">
                      <div className="flex items-center gap-2 text-[#00A99D] text-xs font-semibold mb-2">
                        <Reply className="w-3 h-3" /> Doctor's Response
                      </div>
                      {review.replies.map(rep => (
                        <div key={rep.id} className="text-sm text-slate-700 bg-white rounded-lg p-2 shadow-sm mt-1">
                          <p>{rep.doctorReply}</p>
                          <p className="text-[10px] text-slate-400 mt-1">replied on {formatDate(rep.date)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Reply Button */}
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => {
                        setSelectedReview(review);
                        setShowReplyModal(true);
                      }} 
                      className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#00A99D]/10 text-[#00A99D] hover:bg-[#00A99D] hover:text-white transition"
                    >
                      <Reply className="w-3 h-3" /> Reply to Patient
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Reply Modal */}
        {showReplyModal && selectedReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowReplyModal(false)}>
            <div className="bg-white rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Reply className="w-4 h-4 text-[#00A99D]" />
                  <h3 className="font-semibold text-[#013A63] text-base">Reply to {selectedReview.patientName}</h3>
                </div>
                <button onClick={() => setShowReplyModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <textarea 
                  placeholder="Write your reply here..." 
                  rows="4" 
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:ring-1 focus:ring-[#00A99D] resize-none"
                  value={replyText[selectedReview.id] || ""}
                  onChange={(e) => setReplyText(prev => ({...prev, [selectedReview.id]: e.target.value}))}
                />
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setShowReplyModal(false)} className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium">
                    Cancel
                  </button>
                  <button onClick={() => handleReply(selectedReview.id, replyText[selectedReview.id])} className="flex-1 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link href="/doctor/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}